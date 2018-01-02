import gql from 'graphql-tag';
import { graphqlRouted } from '../utils/graphqlRouted';
import { MutationFunc } from 'react-apollo';
import { graphqlCompose3 } from '../utils/graphqlCompose';
import { BuildingProject } from './BuildingProjects';
import { graphqlMutation } from '../utils/graphqlMutation';

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

export const withDeveloperAddMutation = graphqlMutation<{ add: MutationFunc<{}> }>(DeveloperAddMutation, {
    name: 'add',
    refetchQueries: [DevelopersQuery]
});
export const withDeveloperRemoveMutation = graphqlMutation<{ remove: MutationFunc<{}> }>(DeveloperRemoveMutation, {
    name: 'remove',
    refetchQueries: [DevelopersQuery],
    params: ['orgId']
});
export const withDeveloperAlterMutation = graphqlMutation<{ alter: MutationFunc<{}> }>(DeveloperAlterMutation, {
    name: 'alter',
    params: ['orgId']
});

export const withDeveloperAlter = graphqlCompose3(
    withDeveloperQuery,
    withDeveloperAlterMutation,
    withDeveloperRemoveMutation);