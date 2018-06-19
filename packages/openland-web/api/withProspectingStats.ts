import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OpportunityStatsQuery } from 'openland-api/OpportunityStatsQuery';

export const withProspectingStats = graphqlRouted(OpportunityStatsQuery);