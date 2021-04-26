import { Platform, Dimensions, I18nManager, Appearance } from 'react-native';
import mediaQuery from './parser';

type Listener = (context: MediaQueryList) => any;

class MediaQueryList {
  private _listeners: Listener[] = [];
  private _query = '';

  constructor(query: string) {
    this._query = query;
    Dimensions.addEventListener('change', this._handleDimensionsChange);
  }

  get matches() {
    const dims = Dimensions.get('window');
    const deviceDims = Dimensions.get('screen');
    return mediaQuery.match(this._query, {
      type: Platform.OS,
      ...dims,
      orientation: dims.width > dims.height ? 'landscape' : 'portrait',
      'device-width': deviceDims.width,
      'device-height': deviceDims.height,
      'aspect-ratio': dims.width / dims.height,
      direction: I18nManager.isRTL ? 'rtl' : 'ltr',
      'prefers-color-scheme': Appearance.getColorScheme() || 'light',
    });
  }

  get media() {
    return this._query;
  }

  _handleDimensionsChange = () => {
    this._notifyListeners();
  };

  _notifyListeners() {
    this._listeners.forEach((listener) => {
      (listener as Listener)(this);
    });
  }

  _unmount() {
    Dimensions.removeEventListener('change', this._handleDimensionsChange);
  }

  addListener(listener: Listener) {
    this._listeners.push(listener);
  }

  removeListener(listener: Listener) {
    const index = this._listeners.indexOf(listener);
    if (index === -1) return;
    this._listeners.splice(index);
  }
}

export default MediaQueryList;
