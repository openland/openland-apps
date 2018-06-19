import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Sourcing } from 'openland-api';

export const withOpportunityByIdGet = graphqlRouted(Sourcing.OpportunityQuery, { params: ['opportunityId'] });