import gql from 'graphql-tag';
import { StickerFragment, StickerPackFragment } from 'openland-api/fragments/StickerFragment';

export const MyStickersQuery = gql`
    query MyStickers {
        stickers: myStickers {
            packs {
                id
                title
                stickers {
                    ...StickerFragment
                }
            }
        }
    }

    ${StickerFragment}
`;

export const StickerPackQuery = gql`
    query StickerPack($id: ID!) {
        stickerPack(id: $id) {
            ...StickerPackFragment
        }
    }

    ${StickerPackFragment}
`;

export const StickerPackAddToCollectionMutation = gql`
    mutation StickerPackAddToCollection($id: ID!) {
        stickerPackAddToCollection: stickerPackAddToCollection(id: $id)
    }
`;

export const SendStickerMutation = gql`
    mutation SendSticker(
        $chatId: ID!
        $stickerId: ID!
        $replyMessages: [ID!]
        $repeatKey: String
    ) {
        sendSticker(
            chatId: $chatId
            stickerId: $stickerId
            replyMessages: $replyMessages
            repeatKey: $repeatKey
        )
    }
`;

export const AddStickerCommentMutation = gql`
    mutation AddStickerComment(
        $peerId: ID!
        $stickerId: ID!
        $replyComment: ID
        $repeatKey: String
    ) {
        addStickerComment: betaAddStickerComment(
            peerId: $peerId
            stickerId: $stickerId
            replyComment: $replyComment
            repeatKey: $repeatKey
        ) {
            id
        }
    }
`;