import * as Map from 'mapbox-gl';
import * as GeoLib from 'geolib';
export interface MapViewport {
    isEnabled: boolean;
    center?: { latitude: number, longitude: number };
    bounds?: {
        sw: { latitude: number, longitude: number };
        ne: { latitude: number, longitude: number };
    };
    zoom?: number;
    pitch?: number;
    bearing?: number;
    width?: number;
    height?: number;
    map?: Map.Map;
    navigateTo?: (v: { latitude: number, longitude: number, zoom: number }) => void;
}

type SimplePoint = number[];
type Polygon = SimplePoint[];
type PolygonCollection = Polygon[];

export function convertMapPatch(src: string) {
    return JSON.parse(src) as PolygonCollection;
}

export function findCenter(src: PolygonCollection) {
    let coords: { latitude: number, longitude: number }[] = [];
    for (let p of src) {
        for (let pt of p) {
            coords.push({ latitude: pt[1], longitude: pt[0] });
        }
    }
    return GeoLib.getCenterOfBounds(coords);
}