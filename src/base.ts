import { aliasPreprocessor } from './preprocessors/alias';
import { borderPreprocessor } from './preprocessors/border';
import { borderSideRadiusPreprocessor } from './preprocessors/border-side-radius';
import { boxShadowPreprocessor } from './preprocessors/box-shadow';
import { colorPreprocessor } from './preprocessors/color';
import { distancePreprocessor } from './preprocessors/distance';
import { numeralPreprocessor } from './preprocessors/numeral';
import { placeContentPreprocessor } from './preprocessors/place-content';
import { textShadowPreprocessor } from './preprocessors/text-shadow';
import type { BaseOptions, Preprocessor, Alias } from './types';

const defaultBreakpoints = [576, 768, 1200];
const defaultPreprocessors = {
  _alias: aliasPreprocessor,
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

  placeContent: placeContentPreprocessor,
};

const defaultAliases: Alias = {
  paddingHorizontal: ['paddingX'],
  paddingVertical: ['paddingY'],
  marginHorizontal: ['marginX'],
  marginVertical: ['marginY'],
};

class Base {
  static breakpoints = defaultBreakpoints;
  static preprocessors: Preprocessor = defaultPreprocessors;
  static aliases = defaultAliases;

  public static configure(options?: BaseOptions) {
    Base.breakpoints = options?.breakpoints || defaultBreakpoints;
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
