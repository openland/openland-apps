import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Deals } from 'openland-api';

export const withDealsMap = graphqlRouted(Deals.AllDealsMapQuery);