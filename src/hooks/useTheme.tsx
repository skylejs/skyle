import { useMemo, useContext } from 'react';
import { Context } from '../context';
import type { Theme } from '../types';

export const useTheme = (overrides?: Theme) => {
  const theme = useContext(Context);
  const result = useMemo(() => (theme && overrides ? Object.assign({}, theme, overrides) : theme || overrides), [
    theme,
    overrides,
  ]);
  return result.theme;
};
