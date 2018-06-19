import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { OpportunityTileOverlayQuery } from 'openland-api/OpportunityTileOverlayQuery';

export const SourcingTileSource = graphQLTileSource(OpportunityTileOverlayQuery, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});