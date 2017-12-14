import gql from 'graphql-tag';
import { graphqlRouted } from '../utils/graphqlRouted';
import { graphql } from 'react-apollo';
import { graphqlCompose } from '../utils/graphqlCompose';

export interface Developer {
    id: string;
    slug: string;
    title: string;
}

const DevelopersQuery = gql`
query Developers {
    developers {
        id
        slug
        title
    }
}
`;

const DeveloperQuery = gql`
query Developers($developerId: String!) {
    developer(slug: $developerId) {
        id
        slug
        title
    }
}
`;

export const DeveloperAddMutation = gql`
mutation addDeveloper($slug: String!, $title: String!) {
  addDeveloper(slug: $slug, title: $title) {
    id
    slug
    title
  }
}
`;

export const DeveloperRemoveMutation = gql`
mutation removeDeveloper($slug: String!) {
  removeDeveloper(slug: $slug)
}
`;

export const DeveloperAlterMutation = gql`
mutation alterDeveloper($developerId: String!, $title: String!) {
  alterDeveloper(slug: $developerId, title: $title) {
    id
    slug
    title
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