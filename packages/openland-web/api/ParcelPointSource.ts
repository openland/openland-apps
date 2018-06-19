import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { ParcelsPointOverlayQuery } from 'openland-api/ParcelsPointOverlayQuery';

export const ParcelPointSource = graphQLTileSource(ParcelsPointOverlayQuery, { cluster: true });