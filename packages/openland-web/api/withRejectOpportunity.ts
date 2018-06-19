import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Sourcing } from 'openland-api';

export const withRejectOpportunity = graphqlMutation(Sourcing.RejectOpportunityMutation, 'reject', { refetchQueries: [Sourcing.OpportunityStatsQuery] });