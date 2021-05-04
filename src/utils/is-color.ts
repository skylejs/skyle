import Color from 'color';

export default function isColor(str = '') {
  try {
    Color(str);
    return true;
  } catch (err) {
    return false;
  }
}
