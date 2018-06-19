import { graphQLMapSearchSource } from 'openland-x-graphql/graphqlMapSearchSource';
import { ParcelsMapSearchQuery } from 'openland-api/ParcelsMapSearchQuery';

export const ParcelMapSearch = graphQLMapSearchSource(ParcelsMapSearchQuery);