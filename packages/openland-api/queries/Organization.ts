import gql from 'graphql-tag';
import { OrganizationProfile } from '../fragments/OrganizationProfile';
import { OrganizationFull } from '../fragments/OrganizationFull';

export const MyOrganizationQuery = gql`
    query MyOrganization {
        myOrganization {
            ...OrganizationFull
        }
    }${OrganizationFull}
`;

export const OrganizationQuery = gql`
    query Organization($organizationId: ID!) {
        organization(id: $organizationId) {
            ...OrganizationFull
        }
    }${OrganizationFull}
`;

// Deprecated

export const CurrentOrganizationProfileQuery = gql`
    query CurrentOrganizationProfile {
        alphaCurrentOrganizationProfile {
            ...OrganizationProfile
        }
    }${OrganizationProfile}
`;

export const OrganizationProfileQuery = gql`
    query OrganizationProfile($id: ID!) {
        alphaOrganizationProfile(id: $id) {
            ...OrganizationProfile
        }
    }${OrganizationProfile}
`;

//
// query FolderItemsConnection($folderId: ID!, $cursor: String, $page: Int) {
//     items: alphaFolderItems(folderId: $folderId, first: 50, after: $cursor, page: $page) {
//

export const EditOrganizationProfileMutation = gql`
mutation EditOrganizationProfile($title: String, $website: String, $role: String, $logo: ImageRefInput, $data: AlphaOrganizationProfileInput) {
    alphaEditOrganizationProfile(title: $title, website: $website, role: $role, logo: $logo, extras: $data)
}
`;

export const FollowOrganizationMutation = gql`
mutation FollowOrganization($id: ID!, $follow: Boolean!) {
    alphaAlterOrganizationFollow(orgId: $id, follow: $follow){
        id
        followed
    }
}
`;