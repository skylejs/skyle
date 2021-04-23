import React, { Component } from 'react';

import { deepEquals } from './utils/values';
import type { StyleSheetStyles, StylesProps } from './types';
import { useTheme } from './hooks/useTheme';
import { computeStyles } from './hooks/useStyles';

type Constructor = { new (...args: any[]): Component<any, any> };
type StyleConstructor = ((styles?: StylesProps) => StyleSheetStyles) | StyleSheetStyles;

/** @see https://skyle.js.org/docs/api/styled */
export function styled<T extends Constructor>(WrappedComponent: T): T {
  class StyledComponent extends WrappedComponent {
    styles?: StyleConstructor;
    __styleSheet?: StyleConstructor;
    private __styles: StyleSheetStyles = {};

    componentDidUpdate(prevProps: any, prevState: any) {
      if (!deepEquals(prevProps, this.props) || !deepEquals(prevState, this.state)) {
        this.__styles = computeStyles(this);
        this.forceUpdate();
      }
    }

    constructor(...args: any[]) {
      super(...args);

      this.__styleSheet = this.styles || {};
      this.__styles = computeStyles(this);

      // Override `styles` with computed object styles in order to allow passing it to children.
      Object.defineProperty(this, 'styles', {
        get: () => this.__styles,
      });
    }
  }

  // Return themed HOC.
  return (((props: any) => {
    const theme = useTheme();
    return <StyledComponent theme={theme} {...props} />;
  }) as unknown) as T;
}
