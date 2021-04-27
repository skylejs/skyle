import Color from 'color';

export default function validateColor(str: string) {
  try {
    Color(str);
    return true;
  } catch (err) {
    return false;
  }
}
