import gql from 'graphql-tag';

export const UserTiny = gql`
    fragment UserTiny on User {
        id
        isYou
        name
        firstName
        lastName
        picture
        shortname
    }
`;