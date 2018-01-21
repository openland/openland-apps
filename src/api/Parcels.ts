import gql from 'graphql-tag';
import { Geo } from './Geo';
import { graphqlMapOverlay } from '../utils/graphqlMapOverlay';

export interface Parcels {
    id: string;
    title: string;
    geometry: Geo[][];
}

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

export const withParcelsQuery = graphqlMapOverlay<{ parcels: Parcels[] }>(ParcelsQuery);