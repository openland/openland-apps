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
            id
            mobileNotifications
            mute
        }
        ... on GroupConversation {
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
                featured
                hidden
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
`;