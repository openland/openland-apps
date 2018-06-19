import { graphQLMapSearchSource } from 'openland-x-graphql/graphqlMapSearchSource';
import { Parcels } from 'openland-api';

export const ParcelMapSearch = graphQLMapSearchSource(Parcels.ParcelsMapSearchQuery);