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
    logo?: string;
    buildingProjects?: BuildingProject[];
    partners: Developer[];
}

const DevelopersQuery = gql`
    query Developers {
        organizations {
            id
            slug
            title
            comments
            logo
        }
    }
`;

const DeveloperQuery = gql`
    query Developer($developerId: String!) {
        organization(slug: $developerId) {
            id
            slug
            title
            comments
            logo
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
    mutation organizationAdd($slug: String!, $title: String!) {
        organizationAdd(slug: $slug, title: $title) {
            id
            slug
            title
            logo
            comments
        }
    }
`;

export const DeveloperRemoveMutation = gql`
    mutation developerRemove($slug: String!) {
        organizationRemove(slug: $slug)
    }
`;

export const DeveloperAlterMutation = gql`
    mutation organizationAlter($developerId: String!, $title: String, $comments: String, $logo: String) {
        organizationAlter(slug: $developerId, title: $title, comments: $comments, logo: $logo) {
            id
            slug
            title
            logo
            comments
        }
    }
`;

export const withDevelopersQuery = graphqlRouted<{ organizations: Developer[] }>(DevelopersQuery);
export const withDeveloperQuery = graphqlRouted<{ organization: Developer }>(DeveloperQuery, ['developerId']);

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
export const withDeveloperAlter = graphqlCompose<{ organization: Developer }>(withDeveloperAlterMutation, withDeveloperQuery);