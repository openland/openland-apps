import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SourcingAllReportQuery } from 'openland-api/SourcingAllReportQuery';

export const withSourcingAllReport = graphqlRouted(SourcingAllReportQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });