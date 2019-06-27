import gql from 'graphql-tag';
import { UserBadge } from 'openland-api/fragments/UserBadge';

export const BadgeCreateMutation = gql`
    mutation BadgeCreate($name: String!) {
        badgeCreate(name: $name) {
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

export const BadgeCreateToRoomMutation = gql`
    mutation BadgeCreateToRoom($roomId: ID!, $name: String!) {
        badgeCreateToRoom(roomId: $roomId, name: $name) {
            ...UserBadge
        }
    }
    ${UserBadge}
`;

export const BadgeSetToRoomMutation = gql`
    mutation BadgeSetToRoom($roomId: ID!, $badgeId: ID!) {
        badgeSetToRoom(roomId: $roomId, badgeId: $badgeId) {
            ...UserBadge
        }
    }
    ${UserBadge}
`;

export const BadgeUnsetToRoomMutation = gql`
    mutation BadgeUnsetToRoom($roomId: ID!) {
        badgeUnsetToRoom(roomId: $roomId)
    }
`;

export const BadgeDeleteMutation = gql`
    mutation BadgeDelete($badgeId: ID!) {
        badgeDelete(badgeId: $badgeId) {
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

export const BadgeSetPrimaryMutation = gql`
    mutation BadgeSetPrimary($badgeId: ID!) {
        badgeSetPrimary(badgeId: $badgeId) {
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

export const BadgeUnsetPrimaryMutation = gql`
    mutation BadgeUnsetPrimary {
        badgeUnsetPrimary {
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

//
// Super-admin methods
//

export const SuperBadgeCreateMutation = gql`
    mutation SuperBadgeCreate($userId: ID!, $name: String!) {
        superBadgeCreate(userId: $userId, name: $name) {
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

export const SuperBadgeCreateToRoomMutation = gql`
    mutation SuperBadgeCreateToRoom($roomId: ID!, $userId: ID!, $name: String!) {
        superBadgeCreateToRoom(roomId: $roomId, userId: $userId, name: $name) {
            ...UserBadge
        }
    }
    ${UserBadge}
`;

export const SuperBadgeSetToRoomMutation = gql`
    mutation SuperBadgeSetToRoom($roomId: ID!, $badgeId: ID!, $userId: ID!) {
        superBadgeSetToRoom(roomId: $roomId, badgeId: $badgeId, userId: $userId) {
            ...UserBadge
        }
    }
    ${UserBadge}
`;

export const SuperBadgeUnsetToRoomMutation = gql`
    mutation SuperBadgeUnsetToRoom($roomId: ID!, $badgeId: ID!, $userId: ID!) {
        superBadgeUnsetToRoom(roomId: $roomId, badgeId: $badgeId, userId: $userId)
    }
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

export const SuperBadgeVerifyMutation = gql`
    mutation SuperBadgeVerify($badgeId: ID!, $userId: ID!) {
        superBadgeVerify(badgeId: $badgeId, userId: $userId) {
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

export const SuperBadgeUnverifyMutation = gql`
    mutation SuperBadgeUnverify($badgeId: ID!, $userId: ID!) {
        superBadgeUnverify(badgeId: $badgeId, userId: $userId) {
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