import { genKey } from 'draft-js';
const {
    preprocessMentions,
} = require('openland-web/components/messenger/message/content/utils/preprocessMentions');
import { MentionDataT } from './components/MentionSuggestionsEntry';

const emojione = require('emojione');

let emojiList = emojione.emojioneList;
const shortnamesRegexp = new RegExp('(:[+-\\d\\w]+:)', 'g');

const getEmojiUnicodeLengthFromShortName = (shortName: string) => {
    const unicode = emojione.shortnameToUnicode(shortName);
    return [...unicode].length;
};

export const isShortNameEmoji = (shortname: string) => {
    const result = shortname.match(shortnamesRegexp);
    return result ? !!result.length : false;
};

export const isEmoji = (emoji: string) => {
    return isShortNameEmoji(emojione.toShort(emoji));
};

export const getSplittedEmoji = (emoji: string) => {
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

export const getEmojiAndMentionBlocksAndEntityMap = (
    text: string,
    mentions: MentionDataT[],
    genKeyFunc: Function = genKey,
) => {
    let parsedMentions = preprocessMentions(text, mentions, undefined);

    let entityMap = {};
    const entityRanges: any = [];
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

    parsedMentions.forEach((token: any) => {
        if (token.type === 'user') {
            addEntity({
                offset,
                length: emojifiedLength(token.text) + '@'.length,
                key: genKeyFunc(),
                type: {
                    type: 'MENTION',
                    mutability: 'IMMUTABLE',
                    data: token.user,
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
