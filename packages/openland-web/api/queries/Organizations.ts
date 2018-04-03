import gql from 'graphql-tag';
import { ProjectShort } from './ProjectShort';

export const OrganizationShort = gql`
    fragment OrganizationShort on Organization {
        id
        slug
        title
        comments
        logo
        url
        isDeveloper
        isConstructor
        developerIn {
            ...ProjectShort
        }
        constructorIn {
            ...ProjectShort
        }
    }
    ${ProjectShort}
`;

export const OrganizationFull = gql`
    fragment OrganizationFull on Organization {
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
            ...ProjectShort
        }
        constructorIn {
            ...ProjectShort
        }
        partners {
            ...OrganizationShort
        }
    }
    ${ProjectShort}
    ${OrganizationShort}
`;

export const OrganizationsQuery = gql`
    query Organizations {
        organizations {
            ...OrganizationShort      
        }
    }
    ${OrganizationShort}
`;

export const OrganizationQuery = gql`
    query Organization($orgId: String!) {
        organization(slug: $orgId) {
            ...OrganizationFull
        }
    }
    ${OrganizationFull}
`;

export const OrganizationMutationAdd = gql`
    mutation OrganizationMutationAdd($slug: String!, $title: String!) {
        organizationAdd(slug: $slug, title: $title) {
            ...OrganizationShort
        }
    }
    ${OrganizationShort}
`;

export const OrganizationMutationRemove = gql`
    mutation OrganizationMutationRemove($orgId: String!) {
        organizationRemove(slug: $orgId)
    }
`;

export const OrganizationMutationAlter = gql`
    mutation OrganizationAlter
        ($orgId: String!, $title: String,
        $comments: String, $logo: String, $cover: String, $url: String, $city: String, $address: String,
        $twitter: String, $linkedin: String, $facebook: String, $isDeveloper: Boolean, $isConstructor: Boolean,
        $description: String) 
    {
        organizationAlter(slug: $orgId, title: $title, comments: $comments, logo: $logo, cover: $cover, url: $url, city: $city,
            address:$address, twitter: $twitter, linkedin: $linkedin, facebook: $facebook, isDeveloper: $isDeveloper, isConstructor: $isConstructor,
            description: $description) {
            ...OrganizationFull
        }
    }
    ${OrganizationFull}
`;