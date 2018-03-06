import gql from 'graphql-tag';

export const UserShort = gql`
    fragment UserShort on User {
        id
        name
        firstName
        lastName
        picture
    }
`;

export const UsersQuery = gql`
    query UsersQuery($query: String!) {
        items: users(query: $query) {
            value: id
            label: name
        }
    }
`