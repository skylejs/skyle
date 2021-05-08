import Color from 'color';
import GradientParser from 'gradient-parser';
import { toCamelCase } from './values';

type Orientation = GradientParser.DirectionalNode | GradientParser.AngularNode;

const positionsForOrientation = (orientation: Orientation = { type: 'angular', value: '180' }) => {
  const positions = {
    x1: '0%',
    x2: '0%',
    y1: '0%',
    y2: '0%',
  };

  if (orientation?.type === 'angular') {
    const anglePI = +orientation.value * (Math.PI / 180);
    positions.x1 = Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%';
    positions.y1 = Math.round(50 + Math.cos(anglePI) * 50) + '%';
    positions.x2 = Math.round(50 + Math.sin(anglePI) * 50) + '%';
    positions.y2 = Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%';
  } else if (orientation?.type === 'directional') {
    switch (orientation?.value) {
      case 'left':
        positions.x1 = '100%';
        break;
      case 'top':
        positions.y1 = '100%';
        break;
      case 'right':
        positions.x2 = '100%';
        break;
      case 'bottom':
        positions.y2 = '100%';
        break;
      default:
        throw new Error(`Invalid orientation value: ${orientation.value}`);
    }
  }

  return positions;
};

export default (css: string, props: any = {}) => {
  if (!css) return "<linearGradient id='grad' />";

  const { type, orientation, colorStops } = GradientParser.parse(css)[0];
  const { x1, x2, y1, y2 } = positionsForOrientation(orientation as Orientation);

  const getColorStops = (colorStop: GradientParser.ColorStop, index: number) => {
    const offset = (index / (colorStops.length - 1)) * 100 + '%';
    let stopColor = 'rgb(0,0,0,0)';
    let stopOpacity = 1.0;

    switch (colorStop.type) {
      case 'rgb':
        const [r2, g2, b2] = colorStop.value;
        stopColor = Color.rgb([+r2, +g2, +b2]).string();
        break;
      case 'rgba':
        const [r3, g3, b3, a3] = colorStop.value;
        stopColor = Color.rgb([+r3, +g3, +b3]).string();
        stopOpacity = +(a3 || 0);
        break;
      case 'hex':
        stopColor = `#${colorStop.value}`;
        break;
      case 'literal':
        stopColor = colorStop.value;
        break;
    }

    return `<stop offset="${offset}" style="stop-color:${stopColor};stop-opacity:${stopOpacity}" />`;
  };

  const name = toCamelCase(type);
  const gradient = `<${name} id="grad" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${colorStops
    .map(getColorStops)
    .join('')}</${name}>`;

  const htmlProps = Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    return `${acc} ${key}="${value}"`;
  }, '');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" ${htmlProps}>
      <defs>
      ${gradient}
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#grad)"/>
    </svg>
    `;
};
