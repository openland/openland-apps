import gql from 'graphql-tag';
export const UserTiny = gql`
    fragment UserTiny on User {
        id
        name
        firstName
        lastName
        picture
    }
`;