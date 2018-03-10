import gql from 'graphql-tag';
import { UserShort } from './User';

export const MyProfileFull = gql`
    fragment MyProfileFull on MyProfile {
        isLoggedIn
        isProfileCreated
        isAccountActivated
        isCompleted
        isBlocked
    }
`;

export const AccountShort = gql`
    fragment AccountShort on MyAccount {
        id
        title
    }
`;

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