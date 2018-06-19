import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Parcels } from 'openland-api';

export const withParcelStats = graphqlRouted(Parcels.ParcelsStatsQuery);