import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { Sourcing } from 'openland-api';

export const SourcingTileSource = graphQLTileSource(Sourcing.OpportunityTileOverlayQuery, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});