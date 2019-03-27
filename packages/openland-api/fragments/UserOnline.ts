import gql from 'graphql-tag';

export const UserOnline = gql`
    fragment UserOnline on User {
        id
        online
        lastSeen
    }
`;