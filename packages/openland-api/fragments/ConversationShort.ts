import gql from 'graphql-tag';

export const ConversationShort = gql`
    fragment ConversationShort on Conversation {
        id
        title
        flexibleId
        unreadCount
        photos
        topMessage {
            ...MessageFull
        }
        settings{
            mute
        }
    }
`;