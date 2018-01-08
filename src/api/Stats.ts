import gql from 'graphql-tag';
import { Chart } from './Chart';
import { graphqlRouted } from '../utils/graphqlRouted';

const StatsQuery = gql`
    query {
        permitsApprovalStats: permitsApprovalStats {
            labels
            datasets {
                label
                values
            }
        }
        permitsApprovalUnits: permitsApprovalUnits {
            labels
            datasets {
                label
                values
            }
        }
    }
`;

export const withStatsQuery = graphqlRouted<{ permitsApprovalStats: Chart, permitsApprovalUnits: Chart }>(StatsQuery, []);