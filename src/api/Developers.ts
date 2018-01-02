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
    query Developer($orgId: String!) {
        organization(slug: $orgId) {
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
    mutation organizationAdd($orgId: String!, $title: String!) {
        organizationAdd(slug: $orgId, title: $title) {
            id
            slug
            title
            logo
            comments
        }
    }
`;

export const DeveloperRemoveMutation = gql`
    mutation developerRemove($orgId: String!) {
        organizationRemove(slug: $orgId)
    }
`;

export const DeveloperAlterMutation = gql`
    mutation organizationAlter($orgId: String!, $title: String, $comments: String, $logo: String) {
        organizationAlter(slug: $orgId, title: $title, comments: $comments, logo: $logo) {
            id
            slug
            title
            logo
            comments
        }
    }
`;

export const withDevelopersQuery = graphqlRouted<{ organizations: Developer[] }>(DevelopersQuery);
export const withDeveloperQuery = graphqlRouted<{ organization: Developer }>(DeveloperQuery, ['orgId']);

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

export const withDeveloperAlterMutation = graphqlRouted(DeveloperAlterMutation, ['orgId']);
export const withDeveloperAlter = graphqlCompose<{ organization: Developer }>(withDeveloperAlterMutation, withDeveloperQuery);