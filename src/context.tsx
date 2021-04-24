import React, { useState } from 'react';
import configureFonts from './config/defaultFonts';

import type { RecursivePartial, Theme } from './types';

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

  return <Context.Provider value={{ theme, setTheme }} {...props} />;
};
export const Consumer = Context.Consumer;
