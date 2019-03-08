import { genKey } from 'draft-js';
const {
    preprocessMentions,
} = require('openland-web/components/messenger/message/content/utils/preprocessMentions');

// /components/messenger/message/content/utils/preprocessMentions
const emojione = require('emojione');

let emojiList = emojione.emojioneList;
const shortnamesRegexp = new RegExp('(:[+-\\d\\w]+:)', 'g');

const getEmojiUnicodeLengthFromShortName = (shortName: string) => {
    const unicode = emojione.shortnameToUnicode(shortName);
    return [...unicode].length;
};

const getSplittedEmoji = (emoji: string) => {
    return emojione
        .toShort(emoji)
        .split(shortnamesRegexp)
        .filter(Boolean);
};

const emojifiedLength = (str: string) => {
    const splited = getSplittedEmoji(str);

    let offset = 0;

    splited.forEach((emojiToken: string) => {
        if (emojiList[emojiToken]) {
            offset += getEmojiUnicodeLengthFromShortName(emojiToken);
        } else {
            offset += emojiToken.length;
        }
    });

    return offset;
};

const getEmojiAndMentionBlocksAndEntityMap = (
    text: string,
    mentions: any,
    genKeyFunc: Function = genKey,
) => {
    let parsedMentions = preprocessMentions(text, mentions, undefined);

    let entityMap = {};
    const entityRanges = [];
    let offset = 0;

    const addEntity = ({
        key,
        offset: entityOffset,
        length,
        type,
    }: {
        key: string;
        offset: number;
        length: number;
        type: Object;
    }) => {
        entityRanges.push({ key, offset: entityOffset, length });
        entityMap[key] = type;
        offset += length;
    };

    parsedMentions.forEach(token => {
        if (token.type === 'user') {
            addEntity({
                offset,
                length: emojifiedLength(token.text) + '@'.length,
                key: genKeyFunc(),
                type: {
                    type: 'MENTION',
                    mutability: 'IMMUTABLE',
                },
            });
        } else {
            getSplittedEmoji(token.text).forEach((emojiToken: string) => {
                if (emojiList[emojiToken]) {
                    addEntity({
                        offset,
                        length: getEmojiUnicodeLengthFromShortName(emojiToken),
                        key: genKeyFunc(),
                        type: {
                            type: 'emoji',
                            mutability: 'IMMUTABLE',
                        },
                    });
                } else {
                    offset += emojiToken.length;
                }
            });
        }
    });

    return {
        entityMap,
        blocks: [
            {
                text: text,
                type: 'unstyled',
                entityRanges,
            },
        ],
    };
};

const makeIncrementFunc = () => {
    let i = 0;
    return () => i++;
};

describe('Draft data conversion', () => {
    it('should convert emoji string to draft format', () => {
        const text = '😎🧚👩‍❤️‍💋‍👩';
        const { blocks, entityMap } = getEmojiAndMentionBlocksAndEntityMap(
            text,
            [],
            makeIncrementFunc(),
        );
        expect({
            blocks,
            entityMap,
        }).toEqual({
            blocks: [
                {
                    text,
                    type: 'unstyled',
                    entityRanges: [
                        { offset: 0, length: 1, key: 0 },
                        { offset: 1, length: 1, key: 1 },
                        { offset: 2, length: 8, key: 2 },
                    ],
                },
            ],

            entityMap: {
                0: {
                    type: 'emoji',
                    mutability: 'IMMUTABLE',
                },
                1: {
                    type: 'emoji',
                    mutability: 'IMMUTABLE',
                },
                2: {
                    type: 'emoji',
                    mutability: 'IMMUTABLE',
                },
            },
        });
    });

    it('should convert emoji string to draft format - with text inside', () => {
        const text = '😎🧚some text inside👩‍❤️‍💋‍👩';
        const { blocks, entityMap } = getEmojiAndMentionBlocksAndEntityMap(
            text,
            [],
            makeIncrementFunc(),
        );
        expect({
            blocks,
            entityMap,
        }).toEqual({
            blocks: [
                {
                    text,
                    type: 'unstyled',
                    entityRanges: [
                        { offset: 0, length: 1, key: 0 },
                        { offset: 1, length: 1, key: 1 },
                        { offset: 18, length: 8, key: 2 },
                    ],
                },
            ],

            entityMap: {
                0: {
                    type: 'emoji',
                    mutability: 'IMMUTABLE',
                },
                1: {
                    type: 'emoji',
                    mutability: 'IMMUTABLE',
                },
                2: {
                    type: 'emoji',
                    mutability: 'IMMUTABLE',
                },
            },
        });
    });

    it('should convert mentions string to draft format', () => {
        const mentions = [{ name: 'Sergey Lapin' }, { name: 'dev lapin 🎉' }];
        const text = '@Sergey Lapin @dev lapin 🎉 ';

        const genKeyFunction = makeIncrementFunc();
        const { blocks, entityMap } = getEmojiAndMentionBlocksAndEntityMap(
            text,
            mentions,
            genKeyFunction,
        );

        let parsedMentions = preprocessMentions(text, mentions, undefined);

        const expectedParsedMentions = [
            { text: 'Sergey Lapin', type: 'user', user: { name: 'Sergey Lapin' } },
            { text: ' ', type: 'text' },
            { text: 'dev lapin 🎉', type: 'user', user: { name: 'dev lapin 🎉' } },
            { text: ' ', type: 'text' },
        ];

        expect(parsedMentions).toEqual(expectedParsedMentions);

        expect({
            blocks,
            entityMap,
        }).toEqual({
            blocks: [
                {
                    text: text,
                    type: 'unstyled',
                    entityRanges: [
                        { offset: 0, length: 13, key: 0 },
                        {
                            offset: 14,
                            length: 12,
                            key: 1,
                        },
                    ],
                },
            ],

            entityMap: {
                0: {
                    type: 'MENTION',
                    mutability: 'IMMUTABLE',
                },
                1: {
                    type: 'MENTION',
                    mutability: 'IMMUTABLE',
                },
            },
        });
    });

    it('should convert mixed mentions and emojies string to draft format', () => {
        const mentions = [{ name: 'Sergey Lapin' }, { name: 'dev lapin 🎉' }];
        const text = '@Sergey Lapin 😎🧚👩‍❤️‍💋‍👩 @dev lapin 🎉';

        let parsedMentions = preprocessMentions(text, mentions, undefined);
        const genKeyFunction = makeIncrementFunc();

        const { blocks, entityMap } = getEmojiAndMentionBlocksAndEntityMap(
            text,
            mentions,
            genKeyFunction,
        );

        const expectedParsedMentions = [
            { text: 'Sergey Lapin', type: 'user', user: { name: 'Sergey Lapin' } },
            { text: ' 😎🧚👩‍❤️‍💋‍👩 ', type: 'text' },
            { text: 'dev lapin 🎉', type: 'user', user: { name: 'dev lapin 🎉' } },
        ];

        expect(parsedMentions).toEqual(expectedParsedMentions);

        expect({
            blocks,
            entityMap,
        }).toEqual({
            blocks: [
                {
                    entityRanges: [
                        { key: 0, length: 13, offset: 0 },
                        { key: 1, length: 1, offset: 14 },
                        { key: 2, length: 1, offset: 15 },
                        { key: 3, length: 8, offset: 16 },
                        { key: 4, length: 12, offset: 25 },
                    ],
                    text: '@Sergey Lapin 😎🧚👩‍❤️‍💋‍👩 @dev lapin 🎉',
                    type: 'unstyled',
                },
            ],
            entityMap: {
                '0': { type: 'MENTION', mutability: 'IMMUTABLE' },
                '1': { type: 'emoji', mutability: 'IMMUTABLE' },
                '2': { type: 'emoji', mutability: 'IMMUTABLE' },
                '3': { type: 'emoji', mutability: 'IMMUTABLE' },
                '4': { type: 'MENTION', mutability: 'IMMUTABLE' },
            },
        });
    });
});
