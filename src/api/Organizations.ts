import gql from 'graphql-tag';
import { graphqlRouted } from '../utils/graphqlRouted';
import { MutationFunc } from 'react-apollo';
import { graphqlCompose3 } from '../utils/graphqlCompose';
import { BuildingProject } from './BuildingProjects';
import { graphqlMutation } from '../utils/graphqlMutation';

export interface Organization {
    id: string;
    slug: string;
    title: string;
    comments?: string;
    logo?: string;
    url?: string;
    city?: string;
    address?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    isDeveloper?: boolean;
    isConstructor?: boolean;
    developerIn?: BuildingProject[];
    constructorIn?: BuildingProject[];
    partners: Organization[];
}

const OrganizationsQuery = gql`
    query Organizations {
        organizations {
            id
            slug
            title
            comments
            logo
            url
        }
    }
`;

const OrganizationQuery = gql`
    query Organization($orgId: String!) {
        organization(slug: $orgId) {
            id
            slug
            title
            comments
            logo
            url
            address
            city
            twitter
            linkedin
            facebook
            isDeveloper
            isConstructor
            developerIn {
                id
                slug
                name
                description
            }
            constructorIn {
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

export const OrganizationMutationAdd = gql`
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

export const OrganizationMutationRemove = gql`
    mutation developerRemove($orgId: String!) {
        organizationRemove(slug: $orgId)
    }
`;

export const OrganizationMutationAlter = gql`
    mutation organizationAlter(
    $orgId: String!, $title: String,
    $comments: String, $logo: String, $url: String, $city: String, $address: String,
    $twitter: String, $linkedin: String, $facebook: String, $isDeveloper: Boolean, $isConstructor: Boolean
    ) {
        organizationAlter(slug: $orgId, title: $title, comments: $comments, logo: $logo, url: $url, city: $city,
            address:$address, twitter: $twitter, linkedin: $linkedin, facebook: $facebook, isDeveloper: $isDeveloper, isConstructor: $isConstructor) {
            id
            slug
            title
            logo
            url
            city
            address
            comments
            twitter
            linkedin
            facebook
            isDeveloper
            isConstructor
        }
    }
`;

export const withOrganizationsQuery = graphqlRouted<{ organizations: Organization[] }>(OrganizationsQuery);
export const withOrganizationQuery = graphqlRouted<{ organization: Organization }>(OrganizationQuery, ['orgId']);

export const withOrganizationAddMutation = graphqlMutation<{ add: MutationFunc<{}> }>(OrganizationMutationAdd, {
    name: 'add',
    refetchQueries: [OrganizationsQuery]
});
export const withOrganizationRemoveMutation = graphqlMutation<{ remove: MutationFunc<{}> }>(OrganizationMutationRemove, {
    name: 'remove',
    refetchQueries: [OrganizationsQuery],
    params: ['orgId']
});
export const withOrganizationAlterMutation = graphqlMutation<{ alter: MutationFunc<{}> }>(OrganizationMutationAlter, {
    name: 'alter',
    params: ['orgId']
});

export const withOrganizationAlter = graphqlCompose3(
    withOrganizationQuery,
    withOrganizationAlterMutation,
    withOrganizationRemoveMutation);