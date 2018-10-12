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

export const AccountSettingsQuery = gql`
    query AccountSettings {
        me: me { ...UserShort }
        primaryOrganization: myOrganization { id }
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
 mutation CreateUserProfileAndOrganization($user: CreateProfileInput!, $organization: CreateOrganizationInput!) {
        alphaCreateUserProfileAndOrganization(user: $user, organization: $organization){
            user{
                id
                firstName
                lastName
                photoRef {
                    uuid
                    crop {
                        x
                        y
                        w
                        h
                    }
                }
                email
                phone
                website
                about
                location
            }
            organization{
                id
                name
            }
        }
    }
`;