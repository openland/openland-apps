import gql from 'graphql-tag';

export const ResolveInviteQuery = gql`
    query ResolveInvite($key: String!) {
        resolveInvite: alphaResolveInvite(key: $key) {
            ... on InviteInfo {
                id
            }
            ... on AppInvite {
                inviter {
                    id
                }
            }
            ... on RoomInvite {
                invitedByUser {
                    id
                }
            }
        }
    }
`;
