import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Sourcing } from 'openland-api';

export const withProspectingStats = graphqlRouted(Sourcing.OpportunityStatsQuery);