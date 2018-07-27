import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { HitsPopularQuery } from 'openland-api/HitsPopularQuery';

export const withHits = graphqlRouted(HitsPopularQuery);