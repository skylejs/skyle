import React from 'react';
import StyleSheet from './StyleSheet';
import { createComponent } from './Animated';
import { validStyles } from './utils/valid-styles';
import BoxShadow from './components/BoxShadow';

export function overrideNative(nativeComp: any) {
  const NativeComp = Object.assign({}, nativeComp);
  const AnimatedComp = createComponent(NativeComp);
  nativeComp.render = (props: any, ref: any) => {
    nativeComp.render.displayName = nativeComp.displayName;
    if (
      props?.suppressHydrationWarning ||
      Object.keys(StyleSheet.flatten(props.style) || {})?.every(
        (k) =>
          validStyles.includes(k) && !k.includes('&:') && !(k.includes('shadow') && !BoxShadow.isNativelySupported()),
      )
    ) {
      return <NativeComp ref={ref} {...props} />;
    }
    return <AnimatedComp forwardRef={ref} {...props} />;
  };
}
