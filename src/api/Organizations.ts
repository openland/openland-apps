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
    cover?: string,
    url?: string;
    city?: string;
    address?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    isDeveloper?: boolean;
    isConstructor?: boolean;
    description?: string;
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
            isDeveloper
            isConstructor
            developerIn {
                id
                slug
                name
                description
                verified
                existingUnits
                proposedUnits
                existingAffordableUnits
                proposedAffordableUnits
                extrasYearEnd
                extrasUrl

                preview: picture(width: 170, height: 116) {
                    url
                    retina
                }
            }
            constructorIn {
                id
                slug
                name
                description
                verified
                existingUnits
                proposedUnits
                existingAffordableUnits
                proposedAffordableUnits
                extrasYearEnd
                extrasUrl

                preview: picture(width: 170, height: 116) {
                    url
                    retina
                }
            }
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
            cover
            url
            address
            city
            twitter
            linkedin
            facebook
            isDeveloper
            isConstructor
            description
            developerIn {
                id
                slug
                name
                description
                verified
                existingUnits
                proposedUnits
                existingAffordableUnits
                proposedAffordableUnits
                extrasYearEnd
                extrasUrl

                preview: picture(width: 224, height: 164) {
                    url
                    retina
                }
            }
            constructorIn {
                id
                slug
                name
                description
                verified
                existingUnits
                proposedUnits
                existingAffordableUnits
                proposedAffordableUnits
                extrasYearEnd
                extrasUrl

                preview: picture(width: 224, height: 164) {
                    url
                    retina
                }
            }
            partners {
                id
                slug
                title
                logo
                isDeveloper
                isConstructor
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
    $comments: String, $logo: String, $cover: String, $url: String, $city: String, $address: String,
    $twitter: String, $linkedin: String, $facebook: String, $isDeveloper: Boolean, $isConstructor: Boolean,
    $description: String
    ) {
        organizationAlter(slug: $orgId, title: $title, comments: $comments, logo: $logo, cover: $cover, url: $url, city: $city,
            address:$address, twitter: $twitter, linkedin: $linkedin, facebook: $facebook, isDeveloper: $isDeveloper, isConstructor: $isConstructor,
            description: $description) {
            id
            slug
            title
            logo
            cover
            url
            city
            address
            comments
            twitter
            linkedin
            facebook
            isDeveloper
            isConstructor
            description
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