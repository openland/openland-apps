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
        permitsUnitsFiledStats: permitsUnitsFiledStats {
            labels
            datasets {
                label
                values
            }
        }
        permitsUnitsIssuedStats: permitsUnitsIssuedStats {
            labels
            datasets {
                label
                values
            }   
        }
        permitsUnitsCompletedStats: permitsUnitsCompletedStats {
            labels
            datasets {
                label
                values
            }   
        }

    }
`;

export const withStatsQuery = graphqlRouted<{
    permitsApprovalStats: Chart,
    permitsApprovalUnits: Chart,
    permitsUnitsFiledStats: Chart,
    permitsUnitsIssuedStats: Chart,
    permitsUnitsCompletedStats: Chart
}>(StatsQuery, []);