import * as constants from './constants';
import { ContentState, CompositeDecorator, ContentBlock } from 'draft-js';
import findWithRegex from 'find-with-regex';
import decorateComponentWithProps from 'decorate-component-with-props';
const emojione = require('draft-js-emoji-plugin/node_modules/emojione');
import { MentionComponentInnerText } from './components/MentionComponentInnerText';
import { EmojiEntry } from './components/EmojiEntry';

const unicodeRegex = new RegExp(emojione.unicodeRegexp, 'g');

const emojiStrategy = (contentBlock: Object, callback: Function) => {
    findWithRegex(unicodeRegex, contentBlock, callback);
};

function findLinkMention(contentBlock: ContentBlock, callback: any, contentState: ContentState) {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
    }, callback);
}

export const decorator = new CompositeDecorator([
    {
        strategy: findLinkMention,
        component: MentionComponentInnerText,
    },
    {
        strategy: emojiStrategy,
        component: decorateComponentWithProps(EmojiEntry, {
            imagePath: constants.imagePath,
            imageType: constants.imageType,
            cacheBustParam: constants.cacheBustParam,
        }),
    },
]);
