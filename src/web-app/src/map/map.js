import { fromJS } from 'immutable';
import MAP_STYLE from './style.json';

export const defaultMapStyle = fromJS(MAP_STYLE);

// generates fill type of layer
export const fillLayer = (source, interactive) => fromJS({
  id: source,
  source,
  type: 'fill',
  interactive
});

// generates circle type of layer
export const circleLayer = (source, interactive) => fromJS({
  id: source,
  source,
  type: 'circle',
  interactive
});

// generates line type of layer
export const lineLayer = (source, interactive) => fromJS({
  id: source,
  source,
  type: 'line',
  interactive
});

// generates heatmap type of layer
export const heatmapLayer = (source, interactive) => fromJS({
  id: source,
  source,
  type: 'heatmap',
  interactive
});

// sets the passed layer's paint properties
export const setLayerStyle = (layer, properties) => layer.set('paint', fromJS(properties));

export const generateMapStyle = (style, id, data, layer) => style
  .setIn(['sources', id], fromJS({
    type: 'geojson',
    data
  }))
  .set('layers', style.get('layers').push(layer));