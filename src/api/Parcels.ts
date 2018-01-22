import gql from 'graphql-tag';
import { Geo } from './Geo';
import { graphqlMapOverlay } from '../utils/graphqlMapOverlay';

export interface Parcel {
    id: string;
    title: string;
    geometry: string;
}

const ParcelsQuery = gql`
    query Parcels($latitude1: Float!, $longitude1: Float!, $latitude2: Float!, $longitude2: Float!) {
        points: parcels(envelope: {leftTop: {latitude: $latitude1, longitude: $longitude1}, rightBottom: {latitude: $latitude2, longitude: $longitude2}}) {
            id
            title
            geometry
        }
    }
`

export const withParcelsQuery = graphqlMapOverlay<Parcel>(ParcelsQuery);