import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Sourcing } from 'openland-api';

export const withApproveOpportunity = graphqlMutation(Sourcing.ApproveOpportunityMutation, 'approve', { refetchQueries: [Sourcing.OpportunityStatsQuery] });