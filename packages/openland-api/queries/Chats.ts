import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { MessageFull } from '../fragments/MessageFull';

export const AllChatsQuery = gql`
    query AllChats {
        chats: superAllChats {
            id
            title
            unreadCount
        }
    }
`;

export const ChatListQuery = gql`
    query ChatList {
        chats: alphaChats(first: 20) {
            conversations {
                id
                title
                unreadCount
            }
            seq
            next
        }
    }
`;

export const GlobalCounterQuery = gql`
    query GlobalCounter {
        counter: alphaNotificationCounter {
            id
            unreadCount
        }
    }
`;

export const ChatQuery = gql`
    query Chat($conversationId: ID!) {
        chat: alphaChat(conversationId: $conversationId) {
            id
            title
        }
        messages: alphaLoadMessages(conversationId: $conversationId) {
            seq
            messages {
                ...MessageFull
            }
        }
    }
    ${MessageFull}
    ${UserShort}
`;

export const ChatPrivateQuery = gql`
    query ChatPrivate($userId: ID!) {
        chat: alphaChatUser(userId: $userId) {
            id
            title
        }
    }
`;

export const ChatOrganizationQuery = gql`
    query ChatOrganization($orgId: ID!) {
        chat: alphaChatOrganization(orgId: $orgId) {
            id
            title
        }
    }
`;

export const SendMessageMutation = gql`
    mutation SendMessage($conversationId: ID!, $message: String!, $repeatKey: String!) {
        sentMessage: alphaSendMessage(conversationId: $conversationId, message: $message, repeatKey: $repeatKey) {
            seq
            ... on ConversationEventMessage {
                message {
                    ...MessageFull
                }
            }
        }
    }
    ${MessageFull}
    ${UserShort}
`;

export const ChatReadMutation = gql`
    mutation ChatRead($conversationId: ID!, $messageId: ID!) {
        alphaReadChat(conversationId: $conversationId, messageId: $messageId) {
            counter {
                id
                unreadCount
            }
            conversation {
                id
                unreadCount
            }
        }
    }
`;