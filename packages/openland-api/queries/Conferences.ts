import gql from 'graphql-tag';
import { ConferenceFull, ConferenceShort } from 'openland-api/fragments/ConferenceFull';
import { UserShort } from 'openland-api/fragments/UserShort';

export const ConferenceQuery = gql`
    query Conference($id: ID!) {
        conference(id: $id) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export const ConferenceMediaQuery = gql`
    query ConferenceMedia($id: ID!, $peerId: ID!) {
        conferenceMedia(id: $id, peerId: $peerId) {
            id
            streams {
                id
                state
                sdp
                ice
            }
            iceServers {
                urls
                username
                credential
            }
        }
    }
`;

export const ConferenceJoinMutation = gql`
    mutation ConferenceJoin($id: ID!) {
        conferenceJoin(id: $id) {
            peerId
            conference {
                ...ConferenceShort
            }
        }
    }
    ${ConferenceShort}
    ${UserShort}
`;

export const ConferenceLeaveMutation = gql`
    mutation ConferenceLeave($id: ID!, $peerId: ID!) {
        conferenceLeave(id: $id, peerId: $peerId) {
            ...ConferenceShort
        }
    }
    ${ConferenceShort}
    ${UserShort}
`;

export const ConferenceKeepAliveMutation = gql`
    mutation ConferenceKeepAlive($id: ID!, $peerId: ID!) {
        conferenceKeepAlive(id: $id, peerId: $peerId) {
            ...ConferenceShort
        }
    }
    ${ConferenceShort}
    ${UserShort}
`;

export const ConferenceOfferMutation = gql`
    mutation ConferenceOffer($id: ID!, $ownPeerId: ID!, $peerId: ID!, $offer: String!) {
        peerConnectionOffer(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, offer: $offer) {
            ...ConferenceShort
        }
    }
    ${ConferenceShort}
    ${UserShort}
`;

export const ConferenceAnswerMutation = gql`
    mutation ConferenceAnswer($id: ID!, $ownPeerId: ID!, $peerId: ID!, $answer: String!) {
        peerConnectionAnswer(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, answer: $answer) {
            ...ConferenceShort
        }
    }
    ${ConferenceShort}
    ${UserShort}
`;

export const ConferenceCandidateMutation = gql`
    mutation ConferenceCandidate($id: ID!, $ownPeerId: ID!, $peerId: ID!, $candidate: String!) {
        peerConnectionCandidate(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, candidate: $candidate) {
            ...ConferenceShort
        }
    }
    ${ConferenceShort}
    ${UserShort}
`;

export const MediaOfferMutation = gql`
    mutation MediaOffer($id: ID!, $peerId: ID!, $offer: String!) {
        mediaStreamOffer(id: $id, peerId: $peerId, offer: $offer) {
            id
            streams {
                id
                state
                sdp
                ice
            }
        }
    }
`;

export const MediaNegotiationNeededMutation = gql`
    mutation MediaNegotiationNeeded($id: ID!, $peerId: ID!) {
        mediaStreamNegotiationNeeded(id: $id, peerId: $peerId) {
            id
            streams {
                id
                state
                sdp
                ice
            }
        }
    }
`;

export const MediaFailedMutation = gql`
    mutation MediaFailed($id: ID!, $peerId: ID!) {
        mediaStreamFailed(id: $id, peerId: $peerId) {
            id
            streams {
                id
                state
                sdp
                ice
            }
        }
    }
`;

export const MediaAnswerMutation = gql`
    mutation MediaAnswer($id: ID!, $peerId: ID!, $answer: String!) {
        mediaStreamAnswer(id: $id, peerId: $peerId, answer: $answer) {
            id
            streams {
                id
                state
                sdp
                ice
            }
        }
    }
`;

export const MediaCandidateMutation = gql`
    mutation MediaCandidate($id: ID!, $peerId: ID!, $candidate: String!) {
        mediaStreamCandidate(id: $id, peerId: $peerId, candidate: $candidate) {
            id
            streams {
                id
                state
                sdp
                ice
            }
        }
    }
`;

export const ConferenceMediaWatchSubscription = gql`
    subscription ConferenceMediaWatch($id: ID!, $peerId: ID!) {
        media: alphaConferenceMediaWatch(id: $id, peerId: $peerId) {
            id
            streams {
                id
                state
                sdp
                ice
            }
        }
    }
`;

export const ConferenceWatchSubscription = gql`
    subscription ConferenceWatch($id: ID!) {
        alphaConferenceWatch(id: $id) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;