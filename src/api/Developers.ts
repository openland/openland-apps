import gql from 'graphql-tag';
import { graphqlRouted } from '../utils/graphqlRouted';
import { graphql } from 'react-apollo';
import { graphqlCompose } from '../utils/graphqlCompose';
import { BuildingProject } from './BuildingProjects';

export interface Developer {
    id: string;
    slug: string;
    title: string;
    comments?: string;
    buildingProjects?: BuildingProject[];
    partners: Developer[];
}

const DevelopersQuery = gql`
query Developers {
    developers {
        id
        slug
        title
        comments
    }
}
`;

const DeveloperQuery = gql`
query Developer($developerId: String!) {
    developer(slug: $developerId) {
        id
        slug
        title
        comments
        buildingProjects {
            id
            slug
            name
            description
        }
        partners {
            id
            slug
            title
        }
    }
}
`;

export const DeveloperAddMutation = gql`
mutation addDeveloper($slug: String!, $title: String!) {
  addDeveloper(slug: $slug, title: $title) {
    id
    slug
    title
    comments
  }
}
`;

export const DeveloperRemoveMutation = gql`
mutation removeDeveloper($slug: String!) {
  removeDeveloper(slug: $slug)
}
`;

export const DeveloperAlterMutation = gql`
mutation alterDeveloper($developerId: String!, $title: String!, $comments: String!) {
  alterDeveloper(slug: $developerId, title: $title, comments: $comments) {
    id
    slug
    title
    comments
  }
}
`;

export const withDevelopersQuery = graphqlRouted<{ developers: Developer[] }>(DevelopersQuery);
export const withDeveloperQuery = graphqlRouted<{ developer: Developer }>(DeveloperQuery, ['developerId']);

export const withDeveloperAddMutation = graphql(DeveloperAddMutation, {
    options: {
        refetchQueries: [{
            query: DevelopersQuery
        }]
    }
});

export const withDeveloperRemoveMutation = graphql<{}, { slug: string }>(DeveloperRemoveMutation, {
    options: (props: { slug: string }) => ({
        variables: {
            slug: props.slug
        },
        refetchQueries: [{
            query: DevelopersQuery
        }]
    })
});

export const withDeveloperAlterMutation = graphqlRouted(DeveloperAlterMutation, ['developerId']);
export const withDeveloperAlter = graphqlCompose<{ developer: Developer }>(graphqlRouted(DeveloperAlterMutation, ['developerId']), withDeveloperQuery);