import type { NativeComponents, AnimatableComponentProps } from '../Animated';
import { calc } from './values';

type StateCallbackType = Readonly<{
  focused: boolean;
  hovered: boolean;
  pressed: boolean;
}>;

export function isValidPseudoClass(
  pseudo: string,
  ref?: NativeComponents,
  props = {} as AnimatableComponentProps,
  internal?: any,
  events = {} as StateCallbackType,
) {
  const ownerChildCount = internal?._debugOwner?._debugOwner?.memoizedState?.last + 1;
  const index = internal._debugOwner?.type?.name === 'CellRenderer' ? internal._debugOwner?.index : internal.index;
  const name = pseudo.split('(')[0] || pseudo;
  const value = pseudo.split('(').pop()?.split(')')[0] || '';

  switch (name) {
    case 'focus':
    case 'focus-visible':
    case 'focus-within':
      return events.focused || ref?.isFocused?.();
    case 'hover':
      return events.hovered;
    case 'active':
      return events.pressed;
    case 'empty':
      return !props.children && !props.value && !props.defaultValue;
    case 'optional':
      return typeof props.required === undefined ? false : !props.required;
    case 'required':
      return typeof props.required === undefined ? false : !props.required;
    case 'disabled':
    case 'read-only':
      return typeof props.editable === undefined ? false : !props.editable;
    case 'enabled':
    case 'read-write':
      return typeof props.editable === undefined ? true : props.editable;
    case 'placeholder-shown':
      return !!ref?.props.placeholder && !props.children && !props.value && !props.defaultValue;
    case 'first-child':
      return index === 0;
    case 'last-child':
      return index !== 0 && !internal.sibling;
    case 'nth-child':
      if (value === 'odd') {
        return index !== 0 && index % 2 !== 0;
      }
      if (value === 'even') {
        return index % 2 === 0;
      }
      if (value.includes('n')) {
        const vals = value.split('+');
        const m = vals[0]
          .replace(/ /g, '')
          .replace(/-n/g, '-1')
          .replace(/\+n/g, '+1')
          .replace(/^n/g, '1')
          .replace(/n/g, '*1');
        const b = +(vals[1] || 0);
        const num = (index + 1 - b) / calc(m);
        return Number.isInteger(num) && num >= 0;
      }
      return index === +value - 1;
    case 'nth-last-child':
      const rIndex = ownerChildCount - index - 1;
      if (value === 'odd') {
        return rIndex !== 0 && rIndex % 2 !== 0;
      }
      if (value === 'even') {
        return rIndex % 2 === 0;
      }
      if (value.includes('n')) {
        const vals = value.split('+');
        const m = vals[0]
          .replace(/ /g, '')
          .replace(/-n/g, '-1')
          .replace(/\+n/g, '+1')
          .replace(/^n/g, '1')
          .replace(/n/g, '*1');
        const b = +(vals[1] || 0);
        const num = (rIndex + 1 - b) / calc(m);
        return Number.isInteger(num) && num >= 0;
      }
      return rIndex === +value - 1;
    case 'only-child':
      return ownerChildCount === 1;
    default:
      return false;
  }
}
