import * as React from 'react';
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

function getEntityStrategy(mutability: any) {
    return function(contentBlock: any, callback: any, contentState: any) {
        contentBlock.findEntityRanges((character: any) => {
            const entityKey = character.getEntity();
            if (entityKey === null) {
                return false;
            }
            return contentState.getEntity(entityKey).getMutability() === mutability;
        }, callback);
    };
}

const styles = {
    immutable: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '2px 0',
    },
    mutable: {
        backgroundColor: 'rgba(204, 204, 255, 1.0)',
        padding: '2px 0',
    },
    segmented: {
        backgroundColor: 'rgba(248, 222, 126, 1.0)',
        padding: '2px 0',
    },
};

function getDecoratedStyle(mutability: any) {
    switch (mutability) {
        case 'IMMUTABLE':
            return styles.immutable;
        case 'MUTABLE':
            return styles.mutable;
        case 'SEGMENTED':
            return styles.segmented;
        default:
            return null;
    }
}

const TokenSpan = (props: any) => {
    const style = getDecoratedStyle(props.contentState.getEntity(props.entityKey).getMutability());
    return (
        <span data-offset-key={props.offsetkey} style={style}>
            {props.children}
        </span>
    );
};

export const decorator = new CompositeDecorator([
    {
        strategy: getEntityStrategy('IMMUTABLE'),
        component: TokenSpan,
    },
    {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
    },
    {
        strategy: getEntityStrategy('SEGMENTED'),
        component: TokenSpan,
    },

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
