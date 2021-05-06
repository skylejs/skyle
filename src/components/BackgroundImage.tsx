import React, { PureComponent, Fragment } from 'react';
import { ViewProps, ImageSourcePropType, ImageResizeMode, ImageStyle, Image, Platform } from 'react-native';
import StyleSheet from '../StyleSheet';
import { styled } from '../styled-decorator';
import { deepEquals } from '../utils/values';
import { SvgUri, SvgXml } from 'react-native-svg';
import serializeSvg from '../utils/svg-serializer';
import type { BackgroundPosition, BackgroundRepeat, BackgroundSize } from '../types';
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

class BackgroundImage extends PureComponent<BackgroundImageProps> {
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

      backgrounds[i] = {
        source,
        svgUri,
        xml,
        resizeMode,
        style: {
          ...StyleSheet.flatten(StyleSheet.absoluteFill),
          ...this._getPositionStyle(bgPos?.[i]),
          width:
            (bgSize?.[i]?.[0] as number | string) ||
            ((bgSize?.[i] as BackgroundSize) as number | string) ||
            style.width,
          height:
            (bgSize?.[i]?.[1] as number | string) ||
            ((bgSize?.[i] as BackgroundSize) as number | string) ||
            style.height,
          backgroundColor: style.backgroundColor,
          pointerEvents: 'none',
          zIndex: -i,
        },
      };
    });

    this.setState({ backgrounds });
  };

  private _getPositionStyle(pos?: BackgroundPosition | BackgroundPosition[]) {
    if (!pos) {
      return {};
    }
    let positionStyle: any = {
      top: pos,
      left: pos,
    };
    pos = [pos].flat().filter((p) => !!p);
    for (let i = 0; i <= pos.length; i++) {
      if (typeof pos === 'string' && validStyles.includes(pos) && validStyles.includes(pos[i])) {
        if (!validStyles.includes(pos[i + 1])) {
          positionStyle[pos] = pos[i + 1];
          i++;
          continue;
        }
        positionStyle[pos] = 0;
      }
    }
    return positionStyle;
  }

  render() {
    const { backgrounds } = this.state;

    return backgrounds.map((bg, i) => (
      <Fragment key={`bg-${i}`}>
        {!!bg.source && <Image source={bg.source} style={bg.style} resizeMode={bg.resizeMode} />}
        {!!bg.svgUri && <SvgUri uri={bg.svgUri} style={bg.style} disabled />}
        {!!bg.xml &&
          (Platform.OS === 'web' ? (
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(bg.xml)}`} style={bg.style as any} />
          ) : (
            <SvgXml xml={bg.xml} style={bg.style} disabled />
          ))}
      </Fragment>
    ));
  }
}

const styles = StyleSheet.create(() => ({}));

export default styled(BackgroundImage);
