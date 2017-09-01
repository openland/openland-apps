import { gql, graphql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';
import graphqlCompose from './graphqlCompose';

export interface ProjectShort {
  id: string;
  name: string;
  slug: string;
  isPrivate: boolean;
}

export interface Project extends ProjectShort {
  intro?: string;
  description?: string;
  findings?: string;
  outputs: Link[];
  sources: Link[];
}

export interface Link {
  title: string;
  url: string;
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
    isPrivate
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
    sources {
       title
       url
    }
    outputs {
      title
      url
    }
    isPrivate
  }
}
`;

const ProjectEdit = gql`
  mutation editProject($id: ID!, $name: String, $slug: String, $intro: String, $description: String, $findings: String) {
    alterProject(id: $id, name: $name, slug: $slug, intro: $intro, description: $description, findings: $findings) {
      id
      name
      slug
      intro
      description
      findings
    }
  }
`;

export const withProjectsQuery = graphqlRouted<ProjectsResponse>(ProjectsQuery);
export const withProjectQuery = graphqlRouted<ProjectResponse>(ProjectQuery);
const withProjectEditQuery = graphql(ProjectEdit);
export const withProjectEdit = graphqlCompose<ProjectResponse>(withProjectQuery, withProjectEditQuery);