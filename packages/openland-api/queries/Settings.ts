import gql from 'graphql-tag';
import { SettingsFull } from '../fragments/SettingsFragment';

export const ProfileQuery = gql`
    query Profile {
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
            locations: alphaLocations
            linkedin: alphaLinkedin
            primaryOrganization: alphaPrimaryOrganization{
                id
                name
            }
            joinedAt: alphaJoinedAt
            invitedBy: alphaInvitedBy{
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
            locations: alphaLocations
            linkedin: alphaLinkedin
            primaryOrganizationId: alphaPrimaryOrganizationId
            joinedAt: alphaJoinedAt
            invitedBy: alphaInvitedBy{
                name
            }
        }
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