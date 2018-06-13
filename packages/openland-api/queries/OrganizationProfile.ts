import gql from 'graphql-tag';
import { OrganizationProfile } from '../fragments/OrganizationProfile';

export const CurrentOrganizationProfileQuery = gql`
    query CurrentOrganizationProfile {
        alphaCurrentOrganizationProfile {
            ...OrganizationProfile
        }
    }${OrganizationProfile}
`;

//
// query FolderItemsConnection($folderId: ID!, $cursor: String, $page: Int) {
//     items: alphaFolderItems(folderId: $folderId, first: 50, after: $cursor, page: $page) {
//

export const OrganizationProfileQuery = gql`
    query OrganizationProfile($id: ID!) {
        alphaOrganizationProfile(id: $id) {
            ...OrganizationProfile
        }
    }${OrganizationProfile}
`;

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