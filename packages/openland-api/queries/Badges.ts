import gql from 'graphql-tag';
import { UserBadge } from 'openland-api/fragments/UserBadge';

export const SuperBadgeCreateToRoomMutation = gql`
    mutation SuperBadgeCreateToRoom($roomId: ID!, $userId: ID!, $name: String!) {
        superBadgeCreateToRoom(roomId: $roomId, userId: $userId, name: $name) {
            ...UserBadge
        }
    }
    ${UserBadge}
`;

export const SuperBadgeUnsetToRoomMutation = gql`
    mutation SuperBadgeUnsetToRoom($roomId: ID!, $userId: ID!, $badgeId: ID!) {
        superBadgeUnsetToRoom(roomId: $roomId, userId: $userId, badgeId: $badgeId)
    }
`;

export const SuperBadgeInRoomQuery = gql`
    query SuperBadgeInRoom($roomId: ID!, $userId: ID!) {
        superBadgeInRoom(roomId: $roomId, userId: $userId) {
            ...UserBadge
        }
    }
    ${UserBadge}
`;