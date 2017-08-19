import { gql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';

export interface Project {
  id: string;
  name: string;
  slug: string;
}

export interface ProjectsResponse {
  projects: [Project];
}

export interface ProjectResponse {
  project: Project;
}

const ProjectsQuery = gql`
query {
  projects {
    id
    name
    slug
  }
}
`;

const ProjectQuery = gql`
query project($projectId: String!){
  project(slug: $projectId) {
    id
    name
    slug
  }
}
`;

export const withProjectsQuery = graphqlRouted<ProjectsResponse>(ProjectsQuery);
export const withProjectQuery = graphqlRouted<ProjectResponse>(ProjectQuery);