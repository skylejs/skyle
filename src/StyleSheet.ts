import * as RN from 'react-native';
import type { NativeStyles, Styles, StyleSheetStyles, StylesProps } from './types';

/** @see https://skyle.js.org/docs/api/StyleSheet */
class StyleSheet {
  // React Native StyleSheet inheritance.
  public static compose = RN.StyleSheet.compose;
  public static flatten = RN.StyleSheet.flatten;

  public static absoluteFill = RN.StyleSheet.absoluteFill;
  public static absoluteFillObject = RN.StyleSheet.absoluteFillObject;
  public static hairlineWidth = RN.StyleSheet.hairlineWidth;

  /**
   * A very common pattern is to create overlays with position fixed and zero positioning,
   * so `fixedFill` can be used for convenience and to reduce duplication of these repeated
   * styles.
   */
  public static fixedFill: Styles = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  /**
   * A very common pattern is to center children, so `flexCenter` can be used for
   * convenience and to reduce duplication of these repeated styles.
   */
  public static flexCenter: Styles = {
    alignItems: 'center',
    justifyContent: 'center',
  };
  /**
   * `flexStart` can be used to place children at the start of the parent.
   */
  public static flexStart: Styles = {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  };
  /**
   * `flexEnd` can be used to place children at the end of the parent.
   */
  public static flexEnd: Styles = {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  };

  /**
   * Creates an extended StyleSheet style reference from the given object.
   */
  public static create(
    styles: ((props: StylesProps) => StyleSheetStyles) | StyleSheetStyles,
  ): { [key: string]: NativeStyles } {
    return styles as any;
  }
}

type StyleSheetType = Omit<typeof RN.StyleSheet, 'create'> & typeof StyleSheet;
export default StyleSheet as StyleSheetType;
