import gql from 'graphql-tag';

export const UserNano = gql`
    fragment UserNano on User {
        id
        name
        firstName
        lastName
        photo
        online
    }
`;