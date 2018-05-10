import gql from 'graphql-tag';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { OrganizationFull } from '../fragments/OrganizationFull';

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

export const OrganizationCreateMutation = gql`
    mutation OrganizationCreate($slug: String!, $title: String!) {
        organizationAdd(slug: $slug, title: $title) {
            ...OrganizationShort
        }
    }
    ${OrganizationShort}
`;

export const OrganizationRemoveMutation = gql`
    mutation OrganizationRemove($orgId: String!) {
        organizationRemove(slug: $orgId)
    }
`;

export const OrganizationAlterMutation = gql`
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