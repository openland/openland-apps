import gql from 'graphql-tag';

export const ConferenceFull = gql`
    fragment ConferenceFull on Conference {
        id
        peers {
            id
            user {
                ...UserShort
            }
            connection {
                state
                sdp
                ice
            }
        }
    }
`;