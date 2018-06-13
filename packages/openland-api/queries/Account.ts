import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { AccountShort } from '../fragments/AccountShort';
import { SessionStateFull } from '../fragments/SessionStateFull';

export const AccountQuery = gql`
    query Account {
        me { ...UserShort }
        myAccount { ...AccountShort }
        sessionState { ...SessionStateFull }
        permissions { roles }
    }
    ${UserShort}
    ${SessionStateFull}
    ${AccountShort}
`;

export const SaveProfileMutation = gql`
    mutation SaveProfile($firstName: String!, $lastName: String, $photo: ImageRefInput, $phone: String) {
        alphaSaveProfile(firstName: $firstName, lastName: $lastName, photo: $photo, phone: $phone)
    }
`;

export const CreateOrganizationMutation = gql`
    mutation CreateOrganization($title: String!, $website: String, $role: String, $logo: ImageRefInput) {
        alphaCreateOrganization(title: $title, website: $website, role: $role, logo: $logo)
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
        prefill: alphaProfilePrefill {
            firstName
            lastName
            picture
        }
    }
`;