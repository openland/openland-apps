import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';

export const GroupRoomInfoQuery = gql`
    query GroupRoomInfo($conversationId: ID!) {
        chat: alphaChat(conversationId: $conversationId) {
            id
            flexibleId
            title
            ... on GroupConversation {
                membersCount
                description
                longDescription
                myRole
                membersOnline
                photo
                photoRef{
                    uuid
                    crop{
                        x
                        y
                        w
                        h
                    }
                }
            }
            ... on ChannelConversation {
                membersCount
                description
                longDescription
                myRole
                membersOnline
                photo
                photoRef{
                    uuid
                    crop{
                        x
                        y
                        w
                        h
                    }
                }
            }
        }
    }
`;

export const GroupRoomMembersQuery = gql`
    query GroupRoomMembersInfo($conversationId: ID!) {
        members: alphaChannelMembers(channelId: $conversationId) {
            user {
                ...UserShort
            }
        }
    }
    ${UserShort}
`;