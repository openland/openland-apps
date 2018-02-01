import { graphqlList } from '../utils/graphqlList';
import { graphqlRouted } from '../utils/graphqlRouted';
import * as Queries from './queries/Projects';
import * as Types from './queries/Types';

export interface BuildingProjectsQueryStats {
    stats: {
        newUnits: number,
        newUnitsVerified: number,
        totalProjects: number,
        totalProjectsVerified: number
    };
}

export const withBuildingProjectsQuery = graphqlList<Types.ProjectShortFragment, BuildingProjectsQueryStats>(Queries.ProjectsConnection, {
    params: ['cursor', 'minUnits', { key: 'year', default: '2018' }, 'filter']
});

export const withBuildingProjectQuery = graphqlRouted<Types.ProjectQuery>(Queries.ProjectQuery, ['projectId']);