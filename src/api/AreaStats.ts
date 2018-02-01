import gql from 'graphql-tag';
import { Chart } from './Chart';
import { Picture } from './Picture';
import { graphqlRouted } from '../utils/graphqlRouted';

const AreaStatsQuery = gql`
    query areaStatsQuery($areaId: String!) {
        area(slug: $areaId) {
            id
            slug
            stats {
                totalProjects
                totalProjectsVerified
                totalDevelopers
                totalConstructors
                totalOrganizations
                totalPermits
                year2017NewUnits
                year2017NewUnitsVerified
                year2018NewUnits
                year2018NewUnitsVerified

                fastestApprovalProject {
                    id
                    slug
                    name
                    approvalTime
                    preview: picture(width: 310, height: 181) {
                        url
                        retina
                    }
                }
                slowestApprovalProject {
                    id
                    slug
                    name
                    approvalTime
                    preview: picture(width: 310, height: 181) {
                        url
                        retina
                    }
                }
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
export interface AreaStats {
    totalProjects: number;
    totalProjectsVerified: number;
    totalDevelopers: number;
    totalConstructors: number;
    totalPermits: number;
    totalOrganizations: number;
    year2017NewUnits: number;
    year2017NewUnitsVerified: number;
    year2018NewUnits: number;
    year2018NewUnitsVerified: number;
    fastestApprovalProject: BuildingShortProject;
    slowestApprovalProject: BuildingShortProject;
}

export interface BuildingShortProject {
    id: string;
    slug: string;
    name: string;
    preview?: Picture;
    approvalTime: number;
}

export const withAreaStats = graphqlRouted<{
    area: { slug: string, stats: AreaStats },
    permitsUnitsFiledStats: Chart,
    permitsUnitsIssuedStats: Chart,
    permitsUnitsCompletedStats: Chart
}>(AreaStatsQuery, []);