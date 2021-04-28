import { getMediaQueryProps } from './useStyles';
import type { BreakpointKeys } from '../types';
import { matchMedia } from '../media';
import Base from '../base';
import { useState } from 'react';
import { Dimensions } from 'react-native';

export const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const getBreakpoint = (breakpoint: BreakpointKeys) => {
  const value = Base.breakpoints[breakpoint];
  const media = getMediaQueryProps()[breakpoint];
  const active = matchMedia(media.replace('@media ', '')).matches;

  return { name: breakpoint, media, active, value };
};

export const useBreakpoint = (breakpoint: BreakpointKeys) => {
  const [active, setActive] = useState(false);
  Dimensions.addEventListener('change', () => {
    setActive(getBreakpoint(breakpoint).active);
  });
  return active;
};
