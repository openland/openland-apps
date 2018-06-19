import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Sourcing } from 'openland-api';

export const withAddOpportunity = graphqlMutation(Sourcing.AddOpportunityMutation, 'add', { refetchQueries: [Sourcing.OpportunityStatsQuery] });