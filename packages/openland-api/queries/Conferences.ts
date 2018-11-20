import gql from 'graphql-tag';
import { ConferenceFull } from 'openland-api/fragments/ConferenceFull';
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

export const ConferenceJoinMutation = gql`
    mutation ConferenceJoin($id: ID!) {
        conferenceJoin(id: $id) {
            peerId
            conference {
                ...ConferenceFull
            }
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export const ConferenceLeaveMutation = gql`
    mutation ConferenceLeave($id: ID!, $peerId: ID!) {
        conferenceLeave(id: $id, peerId: $peerId) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export const ConferenceKeepAliveMutation = gql`
    mutation ConferenceKeepAlive($id: ID!, $peerId: ID!) {
        conferenceKeepAlive(id: $id, peerId: $peerId) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export const  ConferenceWatchSubscription = gql`
    subscription ConferenceWatch($id: ID!) {
        alphaConferenceWatch(id: $id) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export const ConferenceOfferMutation = gql`
    mutation ConferenceOffer($id: ID!, $ownPeerId: ID!, $peerId: ID!, $offer: String!) {
        peerConnectionOffer(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, offer: $offer) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export const ConferenceAnswerMutation = gql`
    mutation ConferenceAnswer($id: ID!, $ownPeerId: ID!, $peerId: ID!, $answer: String!) {
        peerConnectionAnswer(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, answer: $answer) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export const ConferenceCandidateMutation = gql`
    mutation ConferenceCandidate($id: ID!, $ownPeerId: ID!, $peerId: ID!, $candidate: String!) {
        peerConnectionCandidate(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, candidate: $candidate) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;
