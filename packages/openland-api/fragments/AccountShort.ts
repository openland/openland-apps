import gql from 'graphql-tag';
export const AccountShort = gql`
    fragment AccountShort on MyAccount {
        id
        title
    }
`;