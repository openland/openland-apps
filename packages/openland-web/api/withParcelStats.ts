import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ParcelsStatsQuery } from 'openland-api/ParcelsStatsQuery';

export const withParcelStats = graphqlRouted(ParcelsStatsQuery);