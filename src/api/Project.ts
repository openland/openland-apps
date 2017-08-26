import { gql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';

export interface ProjectShort {
  id: string;
  name: string;
  slug: string;
}

export interface Project extends ProjectShort {
  intro?: string;
  description?: string;
  findings?: string;
}

export interface ProjectsResponse {
  projects: [ProjectShort];
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
    intro
    description,
    findings
  }
}
`;

export const withProjectsQuery = graphqlRouted<ProjectsResponse>(ProjectsQuery);
export const withProjectQuery = graphqlRouted<ProjectResponse>(ProjectQuery);