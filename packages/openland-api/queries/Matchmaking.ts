import gql from 'graphql-tag';
import { MatchmakingProfileFragment, MatchmakingRoomFragment } from 'openland-api/fragments/MatchmakingFragments';

export const MatchmakingRoomQuery = gql`
    query MatchmakingRoom($peerId: ID!) {
        matchmakingRoom(peerId: $peerId) {
            ...MatchmakingRoomFragment
        }
    }
    ${MatchmakingRoomFragment}
`;

export const MatchmakingProfileQuery = gql`
    query MatchmakingProfile($peerId: ID!, $uid: ID!) {
        matchmakingProfile(peerId: $peerId, uid: $uid){
            ...MatchmakingProfileFragment
        }
    }
    ${MatchmakingProfileFragment}
`;

export const MatchmakingRoomSaveMutation = gql`
    mutation MatchmakingRoomSave($peerId: ID!, $input: MatchmakingRoomInput!) {
        matchmakingRoomSave(peerId: $peerId, input: $input) {
            ...MatchmakingRoomFragment
        }
    }
    ${MatchmakingRoomFragment}
`;

export const MatchmakingProfileFillMutation = gql`
    mutation MatchmakingProfileFill($peerId: ID!, $input: MatchmakingProfileFillInput!) {
        matchmakingProfileFill(peerId: $peerId, input: $input) {
            ...MatchmakingProfileFragment
        }
    }
    ${MatchmakingProfileFragment}
`;

export const MatchmakingConnectMutation = gql`
    mutation MatchmakingConnect($peerId: ID!, $uid: ID!) {
        matchmakingConnect(peerId: $peerId, uid: $uid)
    }
`;
