import { genKey } from 'draft-js';
const {
    preprocessMentions,
} = require('openland-web/components/messenger/message/content/utils/preprocessMentions');

// /components/messenger/message/content/utils/preprocessMentions
const emojione = require('emojione');

const shortnamesRegexp = new RegExp('(:[+-\\d\\w]+:)', 'g');

const emojifiedLength = (str: string) => {
    const maybeEmojiSplitted = emojione.toShort(str);
    let emojiList = emojione.emojioneList;
    const splited = maybeEmojiSplitted.split(shortnamesRegexp).filter(Boolean);

    let offset = 0;

    for (let j = 0; j < splited.length; j++) {
        const emojiToken = splited[j];
        if (emojiList[emojiToken]) {
            const unicode = emojione.shortnameToUnicode(emojiToken);
            const length = [...unicode].length;
            offset += length;
        } else {
            offset += emojiToken.length;
        }
    }

    return offset;
};

const getEmojiBlocksAndEntityMap = (emojiString: string, genKeyFunc: Function = genKey) => {
    const someEmojiShortedString = emojione.toShort(emojiString);

    let emojiList = emojione.emojioneList;

    const entityMap = {};
    const entityRanges = [];

    const splited = someEmojiShortedString.split(shortnamesRegexp).filter(Boolean);
    let offset = 0;
    for (let i = 0; i < splited.length; i++) {
        const token = splited[i];
        if (emojiList[token]) {
            const key = genKeyFunc();
            const unicode = emojione.shortnameToUnicode(token);

            const length = [...unicode].length;

            entityRanges.push({ key, offset, length: length });
            entityMap[key] = {
                type: 'emoji',
            };
            offset += length;
        } else {
            offset += token.length;
        }
    }
    return {
        entityMap,
        blocks: [
            {
                text: emojiString,
                type: 'unstyled',
                entityRanges,
            },
        ],
    };
};

const getMentionBlocksAndEntityMap = (
    text: string,
    mentions: any,
    genKeyFunc: Function = genKey,
) => {
    let parsedMentions = preprocessMentions(text, mentions, undefined);

    let entityMap = {};
    const entityRanges = [];

    let offset = 0;
    for (let i = 0; i < parsedMentions.length; i++) {
        const token = parsedMentions[i];
        if (token.type === 'user') {
            const key = genKeyFunc();

            const length = emojifiedLength(token.text) + '@'.length;

            entityRanges.push({ key, offset, length });
            entityMap[key] = {
                type: 'MENTION',
                mutability: 'IMMUTABLE',
            };
            offset += length;
        } else {
            offset += token.text.length;
        }
    }

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

const getEmojiAndMentionBlocksAndEntityMap = (
    text: string,
    mentions: any,
    genKeyFunc: Function = genKey,
) => {
    let parsedMentions = preprocessMentions(text, mentions, undefined);

    let entityMap = {};
    const entityRanges = [];

    let offset = 0;
    for (let i = 0; i < parsedMentions.length; i++) {
        const token = parsedMentions[i];
        if (token.type === 'user') {
            const key = genKeyFunc();

            const length = token.text.length + '@'.length;

            entityRanges.push({ key, offset, length });
            entityMap[key] = {
                type: 'MENTION',
                mutability: 'IMMUTABLE',
            };
            offset += length;
        } else {
            const maybeEmoji = token.text;

            const maybeEmojiSplitted = emojione.toShort(maybeEmoji);
            let emojiList = emojione.emojioneList;
            const splited = maybeEmojiSplitted.split(shortnamesRegexp).filter(Boolean);

            for (let j = 0; j < splited.length; j++) {
                const emojiToken = splited[j];
                if (emojiList[emojiToken]) {
                    const key = genKeyFunc();
                    const unicode = emojione.shortnameToUnicode(emojiToken);

                    const length = [...unicode].length;

                    entityRanges.push({ key, offset, length });
                    entityMap[key] = {
                        type: 'emoji',
                        mutability: 'IMMUTABLE',
                    };
                    offset += length;
                } else {
                    offset += emojiToken.length;
                }
            }
        }
    }

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
        const { blocks, entityMap } = getEmojiBlocksAndEntityMap(text, makeIncrementFunc());
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
                },
                1: {
                    type: 'emoji',
                },
                2: {
                    type: 'emoji',
                },
            },
        });
    });

    it('should convert emoji string to draft format - with text inside', () => {
        const text = '😎🧚some text inside👩‍❤️‍💋‍👩';
        const { blocks, entityMap } = getEmojiBlocksAndEntityMap(text, makeIncrementFunc());
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
                },
                1: {
                    type: 'emoji',
                },
                2: {
                    type: 'emoji',
                },
            },
        });
    });

    it('should convert mentions string to draft format', () => {
        const mentions = [{ name: 'Sergey Lapin' }, { name: 'dev lapin 🎉' }];
        const text = '@Sergey Lapin @dev lapin 🎉 ';

        const genKeyFunction = makeIncrementFunc();
        const { blocks, entityMap } = getMentionBlocksAndEntityMap(text, mentions, genKeyFunction);

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
                        { key: 4, length: 13, offset: 25 },
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
