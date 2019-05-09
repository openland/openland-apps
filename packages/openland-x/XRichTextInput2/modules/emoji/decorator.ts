import * as constants from './constants';
import { ContentState, ContentBlock } from 'draft-js';
import decorateComponentWithProps from 'decorate-component-with-props';
import { EmojiEntry } from './EmojiEntry';

export const emojiDecorator = {
    strategy: (contentBlock: ContentBlock, callback: any, contentState: ContentState) => {
        contentBlock.findEntityRanges(character => {
            const entityKey = character.getEntity();
            return entityKey !== null && contentState.getEntity(entityKey).getType() === 'emoji';
        }, callback);
    },
    component: decorateComponentWithProps(EmojiEntry, {
        imagePath: constants.imagePath,
        imageType: constants.imageType,
        cacheBustParam: constants.cacheBustParam,
    }),
};
