import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { Queries } from 'openland-api';

export const ParcelPointSource = graphQLTileSource(Queries.Parcels.ParcelsPointOverlayQuery, { cluster: true });