import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AllDealsMapQuery } from 'openland-api/AllDealsMapQuery';

export const withDealsMap = graphqlRouted(AllDealsMapQuery);