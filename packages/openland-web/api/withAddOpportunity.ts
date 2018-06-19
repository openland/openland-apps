import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AddOpportunityMutation } from 'openland-api/AddOpportunityMutation';
import { OpportunityStatsQuery } from 'openland-api/OpportunityStatsQuery';

export const withAddOpportunity = graphqlMutation(AddOpportunityMutation, 'add', { refetchQueries: [OpportunityStatsQuery] });