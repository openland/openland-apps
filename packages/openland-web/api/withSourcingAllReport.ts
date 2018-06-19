import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Sourcing } from 'openland-api';

export const withSourcingAllReport = graphqlRouted(Sourcing.SourcingAllReportQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });