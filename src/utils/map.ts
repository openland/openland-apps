import * as Turf from '@turf/turf';
import { parceGeometryToGeoJSON } from './Serializers';

export function findCenter(src: string) {
    let res = Turf.centerOfMass(parceGeometryToGeoJSON(src));
    return { latitude: res.geometry!!.coordinates[1], longitude: res.geometry!!.coordinates[0] };
}

export function sourceFromGeometry(src: string) {
    return parceGeometryToGeoJSON(src);
}

export function sourceFromPoint(latitude: number, longitude: number) {
    return { 'type': 'Point', 'coordinates': [longitude, latitude] };
}