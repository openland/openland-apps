import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ResetOpportunityMutation } from 'openland-api/ResetOpportunityMutation';
import { OpportunityStatsQuery } from 'openland-api/OpportunityStatsQuery';

export const withResetOpportunity = graphqlMutation(ResetOpportunityMutation, 'reset', { refetchQueries: [OpportunityStatsQuery] });