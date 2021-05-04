import Color from 'color';
import isColor from '../utils/is-color';

// Convert to rgba for transitions
export const colorPreprocessor = (key: string, value: any) => {
  if (key.toLowerCase().indexOf('color') >= 0 && isColor(value)) {
    const c = Color(value);
    const colorVal = `rgba(${c.red()}, ${c.green()}, ${c.blue()}, ${c.alpha()})`;

    return {
      [key]: colorVal,
    };
  }
  return null;
};
