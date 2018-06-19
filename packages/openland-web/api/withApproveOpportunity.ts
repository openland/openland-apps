import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ApproveOpportunityMutation } from 'openland-api/ApproveOpportunityMutation';
import { OpportunityStatsQuery } from 'openland-api/OpportunityStatsQuery';

export const withApproveOpportunity = graphqlMutation(ApproveOpportunityMutation, 'approve', { refetchQueries: [OpportunityStatsQuery] });