import React, { Component } from 'react';
import { ViewProps, View, ImageSourcePropType, ImageResizeMode, ImageStyle, Image, Platform } from 'react-native';
import StyleSheet from '../StyleSheet';
import { styled } from '../styled-decorator';
import { deepEquals, isLength } from '../utils/values';
import { SvgUri, SvgXml } from 'react-native-svg';
import serializeSvg from '../utils/svg-serializer';
import type { BackgroundPosition, BackgroundRepeat, BackgroundSize, Styles } from '../types';
import { validStyles } from '../utils/valid-styles';

interface BackgroundImageProps extends ViewProps {
  children?: React.ReactNode;
}

type BackgroundImageOptions = {
  source?: ImageSourcePropType;
  svgUri?: string;
  xml?: string;
  resizeMode: ImageResizeMode;
  style: ImageStyle;
};

class BackgroundImage extends Component<BackgroundImageProps> {
  styles = styles;
  state = {
    backgrounds: [] as BackgroundImageOptions[],
  };

  componentDidMount() {
    this._recalculate();
  }

  componentDidUpdate(prevProps: BackgroundImageProps) {
    if (!deepEquals(prevProps.style || {}, this.props.style || {})) {
      this._recalculate();
    }
  }

  private _recalculate = () => {
    const { style: rawStyle = {} } = this.props;
    const style = StyleSheet.flatten(rawStyle);

    const backgrounds: BackgroundImageOptions[] = [];

    const images = [style.backgroundImage].flat();
    images?.forEach((_val, i) => {
      const repeat = (style.backgroundRepeat as BackgroundRepeat[])?.[i] as string;
      const bgPos = style.backgroundPosition as BackgroundPosition[][];
      const bgSize = style.backgroundSize as BackgroundSize[][];
      const size = bgSize?.[i]?.[0] || bgSize?.[i]?.[1];

      // TODO: repeat-x and repeat-y
      const resizeMode = repeat?.includes('repeat') ? 'repeat' : (size as ImageResizeMode);

      const src = `${(style.backgroundImage as string[])?.[i]}`;
      const uri = src.replace('url(', '').replace(')', '') || '';

      let source = '' as ImageSourcePropType;
      let svgUri = '';
      let xml = '';

      if (uri.startsWith('http') || uri.startsWith('data:')) {
        if (uri.includes('.svg')) {
          svgUri = uri;
        } else {
          source = { uri };
        }
      } else if (src.includes('<svg')) {
        xml = src;
      } else if (src.includes('gradient')) {
        xml = serializeSvg(src);
      } else {
        source = +uri;
      }

      const sizeArr = [bgSize?.[i]].flat() as any;
      const posArr = [bgPos?.[i]].flat() as any;

      backgrounds[i] = {
        source,
        svgUri,
        xml,
        resizeMode,
        style: {
          position: 'absolute',
          ...this._getPositionStyle(posArr),
          ...this._getTransitionStyle(style as Styles),
          width: (sizeArr?.[0] as number | string) || style.width,
          height: (sizeArr?.[1] as number | string) || (sizeArr?.[0] as number | string) || style.height,
          backgroundColor: style.backgroundColor,
          pointerEvents: 'none',
          zIndex: -i,
        },
      };
    });

    this.setState({ backgrounds });
  };

  private _getPositionStyle(pos?: (number | string)[]) {
    if (!pos) {
      return {};
    }
    let positionStyle: any = {};
    for (let i = 0; i <= pos.length; i++) {
      if (typeof pos[i] === 'string' && validStyles.includes(`${pos[i]}`)) {
        positionStyle[pos[i]] = pos[i + 1];
        i++;
        continue;
      }
      if (isLength(pos[i])) {
        positionStyle[pos[i]] = pos[i] || 0;
      }
    }
    return positionStyle;
  }

  private _getTransitionStyle(style: Styles) {
    const transitionStyle: any = {
      transitionProperty: [],
      transitionDuration: [],
      transitionTimingFunction: [],
      transitionDelay: [],
    };
    [style.transition?.[0] || style.transitionProperty].flat().map((t, i) => {
      if (t === 'background') {
        transitionStyle.transitionProperty.push('width', 'height', 'top', 'left', 'backgroundColor');
      } else if (t === 'backgroundSize') {
        transitionStyle.transitionProperty.push('width', 'height');
      } else if (t === 'backgroundPosition') {
        transitionStyle.transitionProperty.push('top', 'left');
      } else if (t === 'backgroundColor') {
        transitionStyle.transitionProperty.push('backgroundColor');
      }
      const duration = [style.transitionDuration]?.flat(2)?.[i];
      const timing = [style.transitionTimingFunction]?.flat(2)?.[i];
      const delay = [style.transitionDelay]?.flat(2)?.[i];

      if (duration) transitionStyle.transitionDuration[i] = duration;
      if (timing) transitionStyle.transitionTimingFunction[i] = timing;
      if (delay) transitionStyle.transitionDelay[i] = delay;
    });
    return transitionStyle;
  }

  render() {
    const { backgrounds } = this.state;

    return backgrounds.map((bg, i) => (
      <View key={`bg-${i}`} style={bg.style}>
        {!!bg.source && <Image source={bg.source} style={this.styles.image} resizeMode={bg.resizeMode} />}
        {!!bg.svgUri && <SvgUri uri={bg.svgUri} disabled />}
        {!!bg.xml &&
          (Platform.OS === 'web' ? (
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(bg.xml)}`} style={this.styles.image} />
          ) : (
            <SvgXml xml={bg.xml} disabled />
          ))}
      </View>
    ));
  }
}

const styles = StyleSheet.create(() => ({
  image: {
    width: '100%',
    height: '100%',
  },
}));

export default styled(BackgroundImage);
