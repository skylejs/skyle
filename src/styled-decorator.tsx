import React, { Component } from 'react';

import { deepEquals } from './utils/values';
import type { RecursivePartial, StyleSheetStyles, StylesProps, Theme } from './types';
import { computeStyles } from './hooks/useStyles';
import { Context, defaultTheme } from './context';

type Constructor = { new (...args: any[]): Component<any, any> };
type StyleConstructor = ((styles?: StylesProps) => StyleSheetStyles) | StyleSheetStyles;

/** @see https://skyle.js.org/docs/api/decorator */
export function styled<T extends Constructor>(WrappedComponent: T): T {
  class StyledComponent extends WrappedComponent {
    __styleSheet?: StyleConstructor;
    __theme?: RecursivePartial<Theme> = defaultTheme;
    private __styles: StyleSheetStyles = {};

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
      const prevStyles = Object.assign({}, this.__styles);
      const newStyles = computeStyles(this);
      if (!deepEquals(prevStyles, newStyles)) {
        this.__styles = newStyles;
        this.forceUpdate();
      }
      super.componentDidUpdate?.(prevProps, prevState, snapshot);
    }

    constructor(...args: any[]) {
      super(...args);

      // @ts-ignore
      this.__styleSheet = this.styles || {};
      this.__styles = computeStyles(this);

      // Override `styles` with computed object styles in order to allow passing it to children.
      Object.defineProperty(this, 'styles', {
        get: () => this.__styles,
      });
    }

    render() {
      return (
        <Context.Consumer>
          {({ theme }) => {
            this.__theme = theme;
            return super.render();
          }}
        </Context.Consumer>
      );
    }
  }

  // Return themed HOC.
  return StyledComponent;
}
