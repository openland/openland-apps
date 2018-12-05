import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import gql from 'graphql-tag';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';

let SHARED_ROOM_TINY = gql`
    fragment SharedConversationTiny on SharedRoom {
        id
    }
`;

let PRIVATE_ROOM_TINY = gql`
    fragment PrivateConversationTiny on PrivateRoom {
        id
    }
`;

const CHAT_ROOM_TINY = gql`
    query ChatInfo($id: ID!) {
        room(id: $id) {
            id
        }
    }
`;

export const ConversationRepository = {
    resolveRoom(client: OpenApolloClient, cid: string): { id: string, fid: string } | null {

        // Resolve Shared Conversation
        let id = defaultDataIdFromObject({ __typename: 'SharedRoom', id: cid })!!;
        let conv = client.client.readFragment({
            id,
            fragment: SHARED_ROOM_TINY
        });
        if (conv) {
            return conv as any;
        }

        // Resolve Private Conversation
        id = defaultDataIdFromObject({ __typename: 'PrivateRoom', id: cid })!!;
        conv = client.client.readFragment({
            id,
            fragment: PRIVATE_ROOM_TINY
        });
        if (conv) {
            return conv as any;
        }

        return null;
    },
    improveRoomResolving(client: OpenApolloClient, cid: string): { id: string, fid: string } | undefined {
        let room = this.resolveRoom(client, cid);
        if (room) {
            // Query by flexible ID
            client.client.writeQuery({
                query: CHAT_ROOM_TINY,
                variables: {
                    conversationId: room.fid
                },
                data: {
                    chat: room
                }
            });

            // Query by real ID
            client.client.writeQuery({
                query: CHAT_ROOM_TINY,
                variables: {
                    conversationId: room.id
                },
                data: {
                    chat: room
                }
            });
            return room;
        }
        return undefined;
    },
    
};