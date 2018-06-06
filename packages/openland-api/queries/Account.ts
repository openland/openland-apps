import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { MyProfileFull } from '../fragments/MyProfileFull';
import { AccountShort } from '../fragments/AccountShort';

export const AccountQuery = gql`
    query Account {
        me { ...UserShort }
        myAccount { ...AccountShort }
        myProfile { ...MyProfileFull }
        permissions { roles }
    }
    ${UserShort}
    ${MyProfileFull}
    ${AccountShort}
`;

export const SaveProfileMutation = gql`
    mutation SaveProfile($firstName: String!, $lastName: String, $photo: ImageRefInput, $phone: String) {
        alphaSaveProfile(firstName: $firstName, lastName: $lastName, photo: $photo, phone: $phone)
    }
`;

export const CreateOrganizationMutation = gql`
    mutation CreateOrganization($title: String!, $website: String, $role: String, $logo: ImageRefInput) {
        alphaCreateOrganization(title: $title, website: $website, role: $role, logo: $logo) {
            id
        }
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