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