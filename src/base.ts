import { borderPreprocessor } from './preprocessors/border';
import { borderSideRadiusPreprocessor } from './preprocessors/border-side-radius';
import { colorPreprocessor } from './preprocessors/color';
import { distancePreprocessor } from './preprocessors/distance';
import { numeralPreprocessor } from './preprocessors/numeral';
import type { BaseOptions, Preprocessor, Alias } from './types';

const defaultBreakpoints = [576, 768, 1200];
const defaultPreprocessors = {
  _numeral: numeralPreprocessor,
  _color: colorPreprocessor,

  margin: distancePreprocessor,
  padding: distancePreprocessor,

  border: borderPreprocessor,
  borderRadius: distancePreprocessor,
  borderTopRadius: borderSideRadiusPreprocessor,
  borderBottomRadius: borderSideRadiusPreprocessor,
};

const defaultAliases: Alias = {
  paddingX: ['paddingHorizontal'],
  paddingY: ['paddingVertical'],
  marginX: ['marginHorizontal'],
  marginY: ['marginVertical'],
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
