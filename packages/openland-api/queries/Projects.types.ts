import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Projects from './Projects';

export const ProjectQuery = typedQuery<Types.ProjectQuery, Types.ProjectQueryVariables>(Projects.ProjectQuery);
export const ProjectsConnectionQuery = typedQuery<Types.ProjectsConnectionQuery, Types.ProjectsConnectionQueryVariables>(Projects.ProjectsConnectionQuery);

export const ProjectsSFConnectionQuery = typedQuery<Types.ProjectsSFConnectionQuery, Types.ProjectsSFConnectionQueryVariables>(Projects.ProjectsConnectionQuery);
export const ProjectSFQuery = typedQuery<Types.ProjectSFQuery, Types.ProjectSFQueryVariables>(Projects.ProjectSFQuery);