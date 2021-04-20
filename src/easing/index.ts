import { Easing } from 'react-native';
import type { EasingNameDashed, ExtendedEasingProps } from '../types';

export const easingFunctions = {
  // Standard CSS easings

  linear: Easing.linear,
  ease: Easing.ease,
  'ease-in': Easing.bezier(0.42, 0, 1, 1),
  'ease-out': Easing.bezier(0, 0, 0.58, 1),
  'ease-in-out': Easing.bezier(0.42, 0, 0.58, 1),

  // Default react-native easings

  quad: Easing.quad,
  cubic: Easing.cubic,
  sin: Easing.sin,
  circle: Easing.circle,
  exp: Easing.exp,
  bounce: Easing.bounce,

  // Penner Equations - http://matthewlein.com/ceaser/ & http://easings.net

  'ease-in-cubic': Easing.bezier(0.55, 0.055, 0.675, 0.19),
  'ease-out-cubic': Easing.bezier(0.215, 0.61, 0.355, 1.0),
  'ease-in-out-cubic': Easing.bezier(0.645, 0.045, 0.355, 1.0),

  'ease-in-circ': Easing.bezier(0.6, 0.04, 0.98, 0.335),
  'ease-out-circ': Easing.bezier(0.075, 0.82, 0.165, 1.0),
  'ease-in-out-circ': Easing.bezier(0.785, 0.135, 0.15, 0.86),

  'ease-in-expo': Easing.bezier(0.95, 0.05, 0.795, 0.035),
  'ease-out-expo': Easing.bezier(0.19, 1.0, 0.22, 1.0),
  'ease-in-out-expo': Easing.bezier(1.0, 0.0, 0.0, 1.0),

  'ease-in-quad': Easing.bezier(0.55, 0.085, 0.68, 0.53),
  'ease-out-quad': Easing.bezier(0.25, 0.46, 0.45, 0.94),
  'ease-in-out-quad': Easing.bezier(0.455, 0.03, 0.515, 0.955),

  'ease-in-quart': Easing.bezier(0.895, 0.03, 0.685, 0.22),
  'ease-out-quart': Easing.bezier(0.165, 0.84, 0.44, 1.0),
  'ease-in-out-quart': Easing.bezier(0.77, 0.0, 0.175, 1.0),

  'ease-in-quint': Easing.bezier(0.755, 0.05, 0.855, 0.06),
  'ease-out-quint': Easing.bezier(0.23, 1.0, 0.32, 1.0),
  'ease-in-out-quint': Easing.bezier(0.86, 0.0, 0.07, 1.0),

  'ease-in-sine': Easing.bezier(0.47, 0.0, 0.745, 0.715),
  'ease-out-sine': Easing.bezier(0.39, 0.575, 0.565, 1.0),
  'ease-in-out-sine': Easing.bezier(0.445, 0.05, 0.55, 0.95),

  'ease-in-back': Easing.bezier(0.6, -0.28, 0.735, 0.045),
  'ease-out-back': Easing.bezier(0.175, 0.885, 0.32, 1.275),
  'ease-in-out-back': Easing.bezier(0.68, -0.55, 0.265, 1.55),
};

const easingNames = Object.keys(easingFunctions) as EasingNameDashed[];

const toCamelCase = (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

const ExtendedEasing: ExtendedEasingProps = Object.assign(
  { functions: easingFunctions },
  ...easingNames.map((key) => ({
    [toCamelCase(key)]: easingFunctions[key],
  })),
  {
    step0: Easing.step0,
    step1: Easing.step1,
    poly: Easing.poly,
    elastic: Easing.elastic,
    back: Easing.back,
    bezier: Easing.bezier,
    in: Easing.in,
    out: Easing.out,
    inOut: Easing.inOut,
  },
);

export default ExtendedEasing;
