import gql from 'graphql-tag';
import { UserForMention } from '../fragments/UserForMention';
import { OrganizationShort } from 'openland-api/fragments/OrganizationShort';
import { RoomSharedNano } from 'openland-api/fragments/RoomNano';

export const ChatMentionSearchQuery = gql`
    query ChatMentionSearch($cid: ID!, $query: String, $first: Int!, $after: String) {
        mentions: chatMentionSearch(cid: $cid, query: $query, first: $first, after: $after) {
            globalItems {
                ... on Organization {
                    ...OrganizationShort
                }
                ... on User {
                    ...UserForMention
                }
                ... on SharedRoom {
                    ...RoomSharedNano
                }
            }
            localItems {
                ...UserForMention
            }
            cursor
        }
    }

    ${UserForMention}
    ${OrganizationShort}
    ${RoomSharedNano}
`;