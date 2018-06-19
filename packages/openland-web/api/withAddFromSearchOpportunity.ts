import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Sourcing } from 'openland-api';

export const withAddFromSearchOpportunity = graphqlMutation(Sourcing.AddOpportunityFromSearchMutation, 'addFromSearch', { refetchQueries: [Sourcing.OpportunityStatsQuery] });