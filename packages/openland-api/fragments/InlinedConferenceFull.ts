import gql from 'graphql-tag';

export const InlinedConferenceFull = gql`
    fragment InlinedConferenceFull on Conference {
        id
        peers {
            id
            user {
                id
                name
                firstName
                lastName
                photo
                email
                online
                lastSeen
                isYou
                isBot
                shortname
                primaryOrganization {
                    id
                    name
                    photo
                    isCommunity: alphaIsCommunity
                }
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
`;
