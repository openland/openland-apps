import * as Map from 'mapbox-gl';
export interface MapViewport {
    isEnabled: boolean;
    center?: { latitude: number, longitude: number };
    bounds?: {
        sw: { latitude: number, longitude: number };
        ne: { latitude: number, longitude: number };
    }
    zoom?: number;
    pitch?: number;
    bearing?: number;
    width?: number;
    height?: number;
    map?: Map.Map;
    navigateTo?: (v: { latitude: number, longitude: number }) => void;
}