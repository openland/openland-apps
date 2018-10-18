import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import gql from 'graphql-tag';
import { defaultDataIdFromObject, ID_KEY } from 'apollo-cache-inmemory';
import { ChatListQuery } from 'openland-api/queries/Chats';

let SHARED_CONVERSATION_TINY = gql`
    fragment SharedConversationTiny on SharedConversation {
        id
        flexibleId
        unreadCount
    }
`;

let PRIVATE_CONVERSATION_TINY = gql`
    fragment PrivateConversationTiny on PrivateConversation {
        id
        flexibleId
        unreadCount
    }
`;

let GROUP_CONVERSATION_TINY = gql`
    fragment GroupConversationTiny on GroupConversation {
        id
        flexibleId
        unreadCount
    }
`;

let CHANNEL_CONVERSATION_TINY = gql`
    fragment CannelConversationTiny on ChannelConversation {
        id
        flexibleId
        unreadCount
        myStatus
    }
`;

const CHAT_INFO_TINY = gql`
    query ChatInfo($conversationId: ID!) {
        chat: alphaChat(conversationId: $conversationId) {
            id
            flexibleId
            unreadCount
            ... on ChannelConversation{
                    myStatus
                }
        }
    }
`;

const CHAT_LIST_TINY = gql`
    query ChatListTiny {
        chats: alphaChats(first: 20) {
            conversations {
                id
                flexibleId
                unreadCount
                topMessage {
                    id
                }
                ... on ChannelConversation{
                    myStatus
                }
            }
            seq
        }
    }
`;

export const ConversationRepository = {
    resolveConversation(client: OpenApolloClient, conversationId: string): { id: string, flexibleId: string, unreadCount: number, myStatus?: string } | null {

        // Resolve Shared Conversation
        let id = defaultDataIdFromObject({ __typename: 'SharedConversation', id: conversationId })!!;
        let conv = client.client.readFragment({
            id,
            fragment: SHARED_CONVERSATION_TINY
        });
        if (conv) {
            return conv as any;
        }

        // Resolve Private Conversation
        id = defaultDataIdFromObject({ __typename: 'PrivateConversation', id: conversationId })!!;
        conv = client.client.readFragment({
            id,
            fragment: PRIVATE_CONVERSATION_TINY
        });
        if (conv) {
            return conv as any;
        }

        // Resolve Group Conversaion
        id = defaultDataIdFromObject({ __typename: 'GroupConversation', id: conversationId })!!;
        conv = client.client.readFragment({
            id,
            fragment: GROUP_CONVERSATION_TINY
        });
        if (conv) {
            return conv as any;
        }

        // Resolve Group Conversaion
        id = defaultDataIdFromObject({ __typename: 'ChannelConversation', id: conversationId })!!;
        conv = client.client.readFragment({
            id,
            fragment: CHANNEL_CONVERSATION_TINY
        });
        if (conv) {
            return conv as any;
        }

        return null;
    },
    improveConversationResolving(client: OpenApolloClient, conversationId: string): { id: string, flexibleId: string } | undefined {
        let conversation = this.resolveConversation(client, conversationId);
        if (conversation) {

            // Query by flexible ID
            client.client.writeQuery({
                query: CHAT_INFO_TINY,
                variables: {
                    conversationId: conversation.flexibleId
                },
                data: {
                    chat: conversation
                }
            });

            // Query by real ID
            client.client.writeQuery({
                query: CHAT_INFO_TINY,
                variables: {
                    conversationId: conversation.id
                },
                data: {
                    chat: conversation
                }
            });
            return conversation;
        }
        return undefined;
    },
    writeConversationCounter(client: OpenApolloClient, conversationId: string, counter: number, visible: boolean) {

        //
        // Update counter in Shared Conversation
        //

        let id = defaultDataIdFromObject({ __typename: 'SharedConversation', id: conversationId })!!;
        let conv = client.client.readFragment({
            id,
            fragment: SHARED_CONVERSATION_TINY
        });
        if (conv) {
            if (visible) {
                // Do not increment unread count
                if ((conv as any).unreadCount < counter) {
                    return;
                }
            }
            (conv as any).unreadCount = counter;
            client.client.writeFragment({
                id,
                fragment: SHARED_CONVERSATION_TINY,
                data: conv
            });
            return;
        }

        //
        // Update counter in Private Conversation
        //

        id = defaultDataIdFromObject({ __typename: 'PrivateConversation', id: conversationId })!!;
        conv = client.client.readFragment({
            id,
            fragment: PRIVATE_CONVERSATION_TINY
        });
        if (conv) {
            if (visible) {
                // Do not increment unread count
                if ((conv as any).unreadCount < counter) {
                    return;
                }
            }
            (conv as any).unreadCount = counter;
            client.client.writeFragment({
                id,
                fragment: PRIVATE_CONVERSATION_TINY,
                data: conv
            });
            return;
        }

        //
        // Update counter in Group Conversation
        //

        id = defaultDataIdFromObject({ __typename: 'GroupConversation', id: conversationId })!!;
        conv = client.client.readFragment({
            id,
            fragment: GROUP_CONVERSATION_TINY
        });
        if (conv) {
            if (visible) {
                // Do not increment unread count
                if ((conv as any).unreadCount < counter) {
                    return;
                }
            }
            (conv as any).unreadCount = counter;
            client.client.writeFragment({
                id,
                fragment: GROUP_CONVERSATION_TINY,
                data: conv
            });
            return;
        }

        //
        // Update counter in Channel Conversation
        //

        id = defaultDataIdFromObject({ __typename: 'ChannelConversation', id: conversationId })!!;
        conv = client.client.readFragment({
            id,
            fragment: CHANNEL_CONVERSATION_TINY
        });
        if (conv) {
            if (visible) {
                // Do not increment unread count
                if ((conv as any).unreadCount < counter) {
                    return;
                }
            }
            (conv as any).unreadCount = counter;
            client.client.writeFragment({
                id,
                fragment: GROUP_CONVERSATION_TINY,
                data: conv
            });
            return;
        }
    },
    writeNewMessage(client: OpenApolloClient, conversationId: string, messageId: string, unreadCount: number, visible: boolean) {
        let conversation = this.resolveConversation(client, conversationId);
        if (!conversation) {
            throw Error('Unable to resolve conversation!');
        }

        // Reading current chat list
        let currentState = client.client.readQuery({
            query: CHAT_LIST_TINY
        }) as any;

        // Apply Changes
        let conversations = currentState.chats.conversations as any[];
        let existing = conversations.findIndex((v) => v.id === conversationId);
        if (existing >= 0) {
            let c = conversations[existing];

            // Update unreads
            if (!visible || c.unreadCount > unreadCount) {
                c.unreadCount = unreadCount;
            }

            // Update existing top message
            c.topMessage = {
                __typename: 'ConversationMessage',
                id: messageId,
                [ID_KEY]: defaultDataIdFromObject({ __typename: 'ConversationMessage', id: messageId })!!
            };

            c.myStatus = c.myStatus === 'requested' ? 'member' : c.myStatus;

            // Move to the top
            if (existing > 0) {
                conversations.splice(existing, 1);
                conversations.unshift(c);
            }

        } else {
            // Add new to the top of the list
            conversations.unshift({
                ...conversation,
                myStatus: conversation.myStatus === 'requested' ? 'member' : conversation.myStatus,
                topMessage: {
                    __typename: 'ConversationMessage',
                    id: messageId,
                    unreadCount: unreadCount,
                    [ID_KEY]: defaultDataIdFromObject({ __typename: 'ConversationMessage', id: messageId })!!
                }
            });
        }

        // Write Updated data
        client.client.writeQuery({
            query: CHAT_LIST_TINY,
            data: currentState
        });
    }
};