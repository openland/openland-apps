import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { Parcels } from 'openland-api';

export const ParcelPointSource = graphQLTileSource(Parcels.ParcelsPointOverlayQuery, { cluster: true });