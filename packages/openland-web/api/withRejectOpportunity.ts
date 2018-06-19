import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RejectOpportunityMutation } from 'openland-api/RejectOpportunityMutation';
import { OpportunityStatsQuery } from 'openland-api/OpportunityStatsQuery';

export const withRejectOpportunity = graphqlMutation(RejectOpportunityMutation, 'reject', { refetchQueries: [OpportunityStatsQuery] });