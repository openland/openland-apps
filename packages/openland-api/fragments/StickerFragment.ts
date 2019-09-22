import gql from 'graphql-tag';

export const StickerFragment = gql`
    fragment StickerFragment on Sticker {
        ... on ImageSticker {
            id
            pack {
                id
                title
            }
            image {
                uuid
            }
        }
    }
`;

export const StickerPackFragment = gql`
    fragment StickerPackFragment on StickerPack {
        id
        title
        stickers {
            ...StickerFragment
        }
    }

    ${StickerFragment}
`;
