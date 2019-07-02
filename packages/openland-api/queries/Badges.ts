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

export const SuperBadgeDeleteMutation = gql`
    mutation SuperBadgeDelete($badgeId: ID!, $userId: ID!) {
        superBadgeDelete(badgeId: $badgeId, userId: $userId) {
            ... on User {
                id
                badges {
                    ...UserBadge
                }
                primaryBadge {
                    ...UserBadge
                }
            }
        }
    }
    ${UserBadge}
`;

export const SuperBadgeInRoomQuery = gql`
    query SuperBadgeInRoom($roomId: ID!, $userId: ID!) {
        superBadgeInRoom(roomId: $roomId, userId: $userId) {
            ...UserBadge
        }
    }
    ${UserBadge}
`;