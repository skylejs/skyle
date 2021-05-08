import React from 'react';
import StyleSheet from './StyleSheet';
import { createComponent } from './Animated';
import BoxShadow from './components/BoxShadow';

export function overrideNative(nativeComp: any) {
  const NativeComp = Object.assign({}, nativeComp);
  const AnimatedComp = createComponent(NativeComp);
  nativeComp.render = (props: any, ref: any) => {
    nativeComp.render.displayName = nativeComp.displayName;
    const styles = StyleSheet.flatten(props.style);
    if (
      props?.suppressHydrationWarning ||
      Object.keys(styles || {})?.every(
        (k) =>
          !styles?.[k]?.animate &&
          !k.includes('backgroundImage') &&
          !k.includes('transition') &&
          !k.includes('&') &&
          !(k.includes('shadow') && !BoxShadow.isNativelySupported()),
      )
    ) {
      return <NativeComp ref={ref} {...props} />;
    }
    return <AnimatedComp forwardRef={ref} {...props} />;
  };
}
