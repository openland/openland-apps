import gql from 'graphql-tag';
import { SettingsFull } from '../fragments/SettingsFragment';

export const ProfileQuery = gql`
    query Profile {
        user: me {
            id
            shortname
        }
        profile: myProfile {
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
            role: alphaRole
            linkedin: alphaLinkedin
            primaryOrganization {
                id
                name
                membersCount
            }
            joinedAt: alphaJoinedAt
            invitedBy: alphaInvitedBy {
                id
                name
            }
        }
    }
`;

export const ProfileUpdateMutation = gql`
    mutation ProfileUpdate($input: UpdateProfileInput!, $uid: ID) {
        updateProfile(input: $input, uid: $uid) {
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
            role: alphaRole
            linkedin: alphaLinkedin
            primaryOrganizationId: alphaPrimaryOrganizationId
            joinedAt: alphaJoinedAt
            invitedBy: alphaInvitedBy {
                id
                name
            }
        }
    }
`;

export const SetUserShortnameMutation = gql`
    mutation SetUserShortname($shortname: String!) {
        alphaSetUserShortName(shortname: $shortname)
    }
`;

export const ProfileCreateMutation = gql`
    mutation ProfileCreate($input: CreateProfileInput!) {
        createProfile(input: $input) {
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
    }
`;

export const SettingsQuery = gql`
    query Settings {
        settings {
            ...SettingsFull
        }
    }
    ${SettingsFull}
`;

export const SettingsUpdateMutation = gql`
    mutation SettingsUpdate($input: UpdateSettingsInput) {
        updateSettings(settings: $input) {
            ...SettingsFull
        }
    }
    ${SettingsFull}
`;
