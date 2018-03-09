import gql from 'graphql-tag';
import { UserShort } from './User';

export const AccountQuery = gql`
    query Account {
        me { ...UserShort }
        permissions {
            roles
        }
        myAccount {
            id
            title
        }
    }
    ${UserShort}
`;