import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OpportunityQuery } from 'openland-api/OpportunityQuery';

export const withOpportunityByIdGet = graphqlRouted(OpportunityQuery, { params: ['opportunityId'] });