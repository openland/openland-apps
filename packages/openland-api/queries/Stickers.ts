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