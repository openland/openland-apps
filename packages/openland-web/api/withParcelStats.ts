import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withParcelStats = graphqlRouted(Queries.Parcels.ParcelsStatsQuery);