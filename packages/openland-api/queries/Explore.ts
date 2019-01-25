import gql from 'graphql-tag';

export const AvailableRoomsQuery = gql`
    query AvailableRooms {
        rooms: betaAvailableRooms {
            ... on SharedRoom {
                id
                kind
                title
                photo
                membersCount
                membership
                organization {
                    id
                    name
                    photo
                }
            }
        }
    }
`;