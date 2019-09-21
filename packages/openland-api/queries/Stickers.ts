import gql from 'graphql-tag';

export const MyStickersQuery = gql`
    query MyStickers {
        stickers: myStickers {
            ... on UserStickers {
                packs {
                    id
                    title
                    stickers {
                        ... on ImageSticker {
                            id
                            image {
                                ... on ImageRef {
                                    uuid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const StickerPackQuery = gql`
    query StickerPack($packId: ID!) {
        stickerPack: stickerPack(id: $packId) {
            ... on StickerPack {
                id
                title
                stickers {
                    ... on ImageSticker {
                        id
                        image {
                            uuid
                        }
                    }
                }
            }
        }
    }
`;

export const StickerPackAddToCollectionMutation = gql`
    mutation StickerPackAddToCollection($packId: ID!) {
        stickerPackAddToCollection: stickerPackAddToCollection(id: $packId)
    }
`;

export const SendStickerMutation = gql`
    mutation SendSticker(
        $chatId: ID!
        $stickerId: ID!
        $repeatKey: String
    ) {
        sendSticker: sendSticker(
            chatId: $chatId
            stickerId: $stickerId
            repeatKey: $repeatKey
        )
    }
`;