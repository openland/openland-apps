import gql from 'graphql-tag';
import { UserForMention } from '../fragments/UserForMention';
import { OrganizationShort } from 'openland-api/fragments/OrganizationShort';

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
                    id
                    title
                    roomPhoto: photo
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
`;