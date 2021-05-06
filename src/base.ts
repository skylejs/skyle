import { StatusBar } from 'react-native';
import { aliasPreprocessor } from './preprocessors/alias';
import { backgroundPreprocessor } from './preprocessors/background';
import { borderPreprocessor } from './preprocessors/border';
import { borderSideRadiusPreprocessor } from './preprocessors/border-side-radius';
import { boxShadowPreprocessor } from './preprocessors/box-shadow';
import { colorPreprocessor } from './preprocessors/color';
import { distancePreprocessor } from './preprocessors/distance';
import { fontPreprocessor } from './preprocessors/font';
import { keywordPreprocessor } from './preprocessors/keyword';
import { numeralPreprocessor } from './preprocessors/numeral';
import { placeContentPreprocessor } from './preprocessors/place-content';
import { textShadowPreprocessor } from './preprocessors/text-shadow';
import { transitionPreprocessor } from './preprocessors/transition';
import type { BaseOptions, Preprocessor, Alias, EnvVariables, BreakpointsKeyValue } from './types';

const defaultEnvVariables: EnvVariables = {
  'safe-area-inset-top': StatusBar.currentHeight || 0,
  'safe-area-inset-right': 0,
  'safe-area-inset-bottom': 0,
  'safe-area-inset-left': 0,
};

const defaultBreakpoints: BreakpointsKeyValue = {
  xs: 360,
  sm: 576,
  md: 768,
  lg: 1280,
  xl: 1920,
};

const defaultPreprocessors = {
  _alias: aliasPreprocessor,
  _keyword: keywordPreprocessor,
  _numeral: numeralPreprocessor,
  _color: colorPreprocessor,

  margin: distancePreprocessor,
  padding: distancePreprocessor,

  border: borderPreprocessor,
  borderRadius: distancePreprocessor,
  borderTopRadius: borderSideRadiusPreprocessor,
  borderBottomRadius: borderSideRadiusPreprocessor,

  boxShadow: boxShadowPreprocessor,
  textShadow: textShadowPreprocessor,
  font: fontPreprocessor,

  background: backgroundPreprocessor,
  placeContent: placeContentPreprocessor,
  transition: transitionPreprocessor,
};

const defaultAliases: Alias = {
  paddingHorizontal: ['paddingX'],
  paddingVertical: ['paddingY'],
  marginHorizontal: ['marginX'],
  marginVertical: ['marginY'],
};

class Base {
  static envVariables = defaultEnvVariables;
  static breakpoints = defaultBreakpoints;
  static preprocessors: Preprocessor = defaultPreprocessors;
  static aliases = defaultAliases;

  public static configure(options?: BaseOptions) {
    Base.envVariables = Object.assign({}, this.envVariables, options?.env);
    Base.breakpoints = Object.assign({}, this.breakpoints, options?.breakpoints);
  }

  // Preprocessors
  /**
   * WARNING: EXPERIMENTAL.
   */
  public static setPreprocessor(preprocessors: Preprocessor) {
    this.preprocessors = Object.assign({}, this.preprocessors, preprocessors);
  }

  // Aliases

  public static addAlias(aliases: Alias) {
    // TODO: add unique validation.
    Object.keys(aliases).map((alias) => {
      this.aliases[alias] = this.aliases[alias].concat([aliases[alias]].flat());
    });
  }

  public static removeAlias(aliases: Alias) {
    Object.keys(aliases).map((alias) => {
      this.aliases[alias] = this.aliases[alias].filter((a) => ![aliases[alias]].flat().includes(a));
    });
  }
}

export default Base;
