import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Sourcing } from 'openland-api';

export const withResetOpportunity = graphqlMutation(Sourcing.ResetOpportunityMutation, 'reset', { refetchQueries: [Sourcing.OpportunityStatsQuery] });