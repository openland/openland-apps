import gql from 'graphql-tag';
import { graphqlRouted } from '../utils/graphqlRouted';
import { graphql } from 'react-apollo';

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

export const withDevelopersQuery = graphqlRouted<{ developers: Developer[] }>(DevelopersQuery);

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