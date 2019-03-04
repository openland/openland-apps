import * as constants from './constants';
import { ContentState, CompositeDecorator, ContentBlock } from 'draft-js';
import decorateComponentWithProps from 'decorate-component-with-props';
import { MentionComponentInnerText } from './components/MentionComponentInnerText';
import { EmojiEntry } from './components/EmojiEntry';

const emojiStrategy = (contentBlock: ContentBlock, callback: any, contentState: ContentState) => {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'emoji';
    }, callback);
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
