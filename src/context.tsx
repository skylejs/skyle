import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import configureFonts from './config/defaultFonts';
import type * as SafeAreaContextType from 'react-native-safe-area-context';

import type { RecursivePartial, Theme } from './types';

let SafeAreaContext: typeof SafeAreaContextType;
try {
  SafeAreaContext = require('react-native-safe-area-context');
} catch (err) {}

export type InsetsType = SafeAreaContextType.EdgeInsets;

export const defaultTheme = {
  colors: {
    primary: '#4394f7',
    secondary: '#7cf743',
    accent: '#03dac4',
    background: '#f6f6f6',
    error: '#B00020',
    text: '#000',
  },
  fonts: configureFonts(),
};

export let safeAreaInsets: InsetsType = {
  top: StatusBar.currentHeight || 0,
  right: 0,
  bottom: 0,
  left: 0,
};

/**
 * Set global theme and update styles.
 * By default, the passed theme overrides the current one.
 * You can set merging by passing the `merge` argument.
 *
 * ```ts
 * setTheme({
 *    primary: 'yellow',
 *    accent: '#ff0000',
 * });
 * ```
 */
export let setTheme: (theme: RecursivePartial<Theme>, merge?: boolean) => void = () => {};

export interface ContextProps {
  theme?: RecursivePartial<Theme>;
  setTheme?: (theme: Theme) => void;
}

export const Context = React.createContext<ContextProps>({
  theme: defaultTheme,
  setTheme: () => {},
});

export interface ProviderProps {
  value?: ContextProps;
  children?: React.ReactNode;
}

export const Provider = (props: ProviderProps) => {
  const { value } = props;
  const [theme, setThemeState] = useState<RecursivePartial<Theme>>(value?.theme || defaultTheme);

  setTheme = (newTheme?: RecursivePartial<Theme>, merge = false) =>
    setThemeState(Object.assign({}, merge ? theme : {}, newTheme));

  const SafeAreaProvider = SafeAreaContext?.SafeAreaProvider || React.Fragment;
  const SafeAreaConsumer = SafeAreaContext?.SafeAreaInsetsContext?.Consumer || React.Fragment;

  return (
    <SafeAreaProvider>
      <SafeAreaConsumer>
        {(safeAreas) => {
          if (safeAreas) {
            safeAreaInsets = safeAreas;
          }
          return null;
        }}
      </SafeAreaConsumer>

      <Context.Provider value={{ theme, setTheme }} {...props} />
    </SafeAreaProvider>
  );
};
export const Consumer = Context.Consumer;
