import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Sourcing } from 'openland-api';

export const withSnoozeOpportunity = graphqlMutation(Sourcing.SnoozeOpportunityMutation, 'snooze', { refetchQueries: [Sourcing.OpportunityStatsQuery] });