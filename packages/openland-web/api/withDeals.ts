import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AllDealsQuery } from 'openland-api/AllDealsQuery';

export const withDeals = graphqlRouted(AllDealsQuery);