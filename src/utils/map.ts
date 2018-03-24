import * as Turf from '@turf/turf';
import { parceGeometryToGeoJSON } from './Serializers';

export function findCenter(src: string) {
    let res = Turf.centerOfMass(parceGeometryToGeoJSON(src));
    return { latitude: res.geometry!!.coordinates[1], longitude: res.geometry!!.coordinates[0] };
}