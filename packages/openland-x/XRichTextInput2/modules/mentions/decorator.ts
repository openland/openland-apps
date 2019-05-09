import { ContentState, ContentBlock } from 'draft-js';
import { MentionEntry } from './MentionEntry';

export const mentionDecorator = {
    strategy: (contentBlock: ContentBlock, callback: any, contentState: ContentState) => {
        contentBlock.findEntityRanges(character => {
            const entityKey = character.getEntity();
            return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
        }, callback);
    },
    component: MentionEntry,
};
