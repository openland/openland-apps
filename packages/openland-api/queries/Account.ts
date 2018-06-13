import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { SessionStateFull } from '../fragments/SessionStateFull';
import { OrganizationShort } from '../fragments/OrganizationShort';

export const AccountQuery = gql`
    query Account {
        me: me { ...UserShort }
        organization: myOrganization { ...OrganizationShort }
        sessionState: sessionState { ...SessionStateFull }
        permissions: myPermissions { roles }
    }
    ${UserShort}
    ${SessionStateFull}
    ${OrganizationShort}
`;

export const CreateOrganizationMutation = gql`
    mutation CreateOrganization($title: String!, $website: String, $role: String, $logo: ImageRefInput, $personal: Boolean) {
        alphaCreateOrganization(title: $title, website: $website, role: $role, logo: $logo, personal: $personal)
    }
`;

export const AccountInviteInfoQuery = gql`
    query AccountInviteInfo($inviteKey: String!) {
        invite: alphaInviteInfo(key: $inviteKey) {
            id
            key
            orgId
            title
            photo
            joined
        }
    }
`;

export const AccountInviteJoinMutation = gql`
    mutation AccountInviteJoin($inviteKey: String!) {
        alphaJoinInvite(key: $inviteKey)
    }
`;

export const AccountInvitesQuery = gql`
    query AccountInvites {
        invites: alphaInvites {
            id
            key
        }
    }
`;

export const AccountCreateInviteMutation = gql`
    mutation AccountCreateInvite {
        alphaCreateInvite {
            id
            key
        }
    }
`;

export const AccountDestroyInviteMutation = gql`
    mutation AccountDestroyInvite($id: ID!) {
        alphaDeleteInvite(id: $id)
    }
`;

export const ProfilePrefillQuery = gql`
    query ProfilePrefill {
        prefill: myProfilePrefill {
            firstName
            lastName
            picture
        }
    }
`;