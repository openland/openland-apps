import gql from 'graphql-tag';
import { MatchmakingProfileFragment } from 'openland-api/fragments/Matchmaking';

export const MatchmakingProfileFillMutation = gql`
    mutation MatchmakingProfileFill($peerId: ID!, $input: MatchmakingProfileFillInput!) {
        matchmakingProfileFill(peerId: $peerId, input: $input) {
            ...MatchmakingProfileFragment
        }
    }
    ${MatchmakingProfileFragment}
`;
