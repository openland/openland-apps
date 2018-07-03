import gql from 'graphql-tag';

export const MessageFull = gql`
 fragment MessageFull on ConversationMessage {
    id
    message
    sender {
        ...UserShort
    }
    date
 }
`;