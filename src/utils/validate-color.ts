import Color from 'color';

export function validateColor(str: string) {
  try {
    Color(str);
    return true;
  } catch (err) {
    return false;
  }
}
