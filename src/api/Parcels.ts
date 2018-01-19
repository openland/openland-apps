import gql from 'graphql-tag';
import { graphqlRouted } from '../utils/graphqlRouted';
import { Geo } from './Geo';

export interface Parcels {
    id: string;
    title: string;
    geometry: Geo[][];
}

const ParcelsQuery = gql`
    query Parcels {
        parcels {
            id
            title
            geometry {
                latitude
                longitude
            }
        }
    }
`

export const withParcelsQuery = graphqlRouted<{ parcels: Parcels[] }>(ParcelsQuery);