import gql from 'graphql-tag';
import { graphqlRouted } from '../utils/graphqlRouted';
import { Geo } from './Geo';

export interface Parcels {
    id: string;
    title: string;
    geometry: Geo[][];
}

// 37.806778, -122.420847
// 37.805878, -122.418487

const ParcelsQuery = gql`
    query Parcels($latitude1: Float!, $longitude1: Float!, $latitude2: Float!, $longitude2: Float!) {
        parcels(envelope: {leftTop: {latitude: $latitude1, longitude: $longitude1}, rightBottom: {latitude: $latitude2, longitude: $longitude2}}) {
            id
            title
            geometry {
                latitude
                longitude
            }
        }
    }
`

export const withParcelsQuery = graphqlRouted<{ parcels: Parcels[] }>(ParcelsQuery, [
    { key: 'latitude1', default: '-122.420847' },
    { key: 'longitude1', default: '37.806778' },
    { key: 'latitude2', default: '-122.418487' },
    { key: 'longitude2', default: '37.805878' },
]);