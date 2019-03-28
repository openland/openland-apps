import gql from 'graphql-tag';
import { UserShort } from './UserShort';
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
        iceServers {
            urls
            username
            credential
        }
    }
    ${UserShort}
`;
