import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';

export const AllChatsQuery = gql`
    query AllChats {
        chats: superAllChats {
            id
            title
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
            id
            message
            sender {
                ...UserShort
            }
            date
        }
    }
    ${UserShort}
`;

export const SendMessageMutation = gql`
    mutation SendMessage($conversationId: ID!, $message: String!) {
        sentMessage: alphaSendMessage(conversationId: $conversationId, message: $message) {
            id
            message
            sender {
                ...UserShort
            }
            date
        }
    }
    ${UserShort}
`;