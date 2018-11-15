import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { SessionStateFull } from '../fragments/SessionStateFull';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { UserFull } from 'openland-api/fragments/UserFull';

export const AccountQuery = gql`
    query Account {
        me: me { ...UserShort }
        sessionState: sessionState { ...SessionStateFull }
        myPermissions { roles }
    }
    ${UserShort}
    ${SessionStateFull}
`;

export const AccountSettingsQuery = gql`
    query AccountSettings {
        me: me { ...UserShort }
        organizations: myOrganizations {
            ...OrganizationShort
        }
    }
    ${UserShort}
    ${OrganizationShort}
`;

export const CreateOrganizationMutation = gql`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
        createOrganization(input: $input) {
            id
            name
        }
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
            creator{
                ...UserShort
            }
            forEmail
            forName
        }
    }
    ${UserShort}
`;

export const AccountAppInviteInfoQuery = gql`
    query AccountAppInviteInfo($inviteKey: String!) {
        invite: alphaInviteInfo(key: $inviteKey) {
            creator{
                ...UserShort
            }
        }
        appInvite: appInviteInfo(key: $inviteKey) {
            inviter{
                ...UserShort
            }
        }
    }
    ${UserShort}
`;

export const AccountAppInviteQuery = gql`
    query AccountAppInvite {
        invite: appInvite
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

export const AccountInvitesHistoryQuery = gql`
    query AccountInvitesHistory {
        invites: alphaInvitesHistory {
            forEmail
            isGlobal
            acceptedBy {
                id
                name
                picture
            }
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

export const CreateUserProfileAndOrganizationMutation = gql`
 mutation CreateUserProfileAndOrganization($user: ProfileInput!, $organization: CreateOrganizationInput!) {
        alphaCreateUserProfileAndOrganization(user: $user, organization: $organization){
            user{
                ...UserFull
            }
            organization{
                id
                name
            }
        }
    }
    ${UserFull}
`;