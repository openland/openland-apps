import { graphqlRouted } from '../utils/graphqlRouted';
import * as Queries from './queries/Projects';
import * as Types from './queries/Types';

export const withBuildingProjectsPagedQuery = graphqlRouted<Types.ProjectsConnectionQuery>(
    Queries.ProjectsConnection,
    ['page', 'minUnits', { key: 'year', default: '2018' }, 'filter']);

export const withBuildingProjectQuery = graphqlRouted<Types.ProjectQuery>(Queries.ProjectQuery, ['projectId']);