import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AddOpportunityFromSearchMutation } from 'openland-api/AddOpportunityFromSearchMutation';
import { OpportunityStatsQuery } from 'openland-api/OpportunityStatsQuery';

export const withAddFromSearchOpportunity = graphqlMutation(
    AddOpportunityFromSearchMutation,
    'addFromSearch',
    { refetchQueries: [OpportunityStatsQuery] });