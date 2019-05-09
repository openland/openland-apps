import gql from 'graphql-tag';
import { UserShort } from './UserShort';
export const ConferenceFull = gql`
    fragment ConferenceFull on Conference {
        id
        startTime
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

export const ConferenceShort = gql`
    fragment ConferenceShort on Conference {
        id
        startTime
        iceServers {
            urls
            username
            credential
        }
    }
    ${UserShort}
`;