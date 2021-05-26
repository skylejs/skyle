import type { TransitionShorthand } from '../types';

export const transitionPreprocessor = (key: string, value: TransitionShorthand): any => {
  if (value?.length) {
    let transitions = (typeof value === 'string'
      ? [value.split(',')?.map((t) => t.split(' ').filter((x) => !!x)) ?? value].flat()
      : value?.every((v) => Array.isArray(v))
      ? value
      : [value]) as TransitionShorthand[];

    const property = [transitions.map((t) => t?.[0])].flat(2).filter((t) => !!t);
    const duration = [transitions.map((t) => t?.[1])].flat(2).filter((t) => !!t);
    const easing = [transitions.map((t) => t?.[2])].flat(2).filter((t) => !!t);
    const delay = [transitions.map((t) => t?.[3])].flat(2).filter((t) => !!t);

    return {
      [key]: undefined,
      transitionProperty: property.length ? property : undefined,
      transitionDuration: duration.length ? duration : undefined,
      transitionTimingFunction: easing.length ? easing : undefined,
      transitionDelay: delay.length ? delay : undefined,
    };
  }

  return null;
};
