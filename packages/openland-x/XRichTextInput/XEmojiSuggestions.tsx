import * as React from 'react';
import Glamorous from 'glamorous';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import EmojiIcon from './icons/ic-emoji.svg';

export const EmojiWrapper = Glamorous.div({
    position: 'absolute',
    top: 11,
    right: 12,
    '& > div': {
        display: 'block',
    },
    '& > div > button': {
        width: 18,
        height: 18,
        opacity: 1,
        borderRadius: 50,
        border: 'none',
        display: 'block',
        paddingBottom: 0,
        background: 'none!important',
        '& svg': {
            display: 'block',
            '& *': {
                fill: 'rgba(0, 0, 0, 0.25)',
            },
        },
        '&:hover svg *': {
            fill: '#1790ff',
        },
        '&.draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu svg *': {
            fill: '#1790ff',
        },
    },
    '& > div > div': {
        bottom: 50,
        right: 0,
    },
});

const getRelativeParent: (element: HTMLElement) => HTMLElement | null = (
    element: HTMLElement,
) => {
    if (!element) {
        return null;
    }

    const position = window
        .getComputedStyle(element)
        .getPropertyValue('position');
    if (position !== 'static') {
        return element;
    }

    return getRelativeParent(element.parentElement!!);
};

export const emojiPlugin = createEmojiPlugin({
    selectButtonContent: <EmojiIcon />,
    positionSuggestions: (args: any) => {
        let { state, filteredEmojis, popover, decoratorRect } = args;
        const relativeParent = getRelativeParent(popover.parentElement);
        let relativeRect: any = {};
        if (relativeParent) {
            relativeRect.scrollLeft = relativeParent.scrollLeft;
            relativeRect.scrollTop = relativeParent.scrollTop;

            const relativeParentRect = relativeParent.getBoundingClientRect();
            relativeRect.left = decoratorRect.left - relativeParentRect.left;
            relativeRect.top =
                decoratorRect.top -
                relativeParentRect.top +
                relativeParentRect.height;
            console.warn(relativeParentRect);
        } else {
            relativeRect.scrollTop =
                window.pageYOffset ||
                (document.documentElement
                    ? document.documentElement.scrollTop
                    : undefined);
            relativeRect.scrollLeft =
                window.pageXOffset ||
                (document.documentElement
                    ? document.documentElement.scrollLeft
                    : undefined);

            relativeRect.top = decoratorRect.top;
            relativeRect.left = decoratorRect.left;
        }

        const left = relativeRect.left + relativeRect.scrollLeft;
        const top = relativeRect.top - relativeRect.scrollTop + 8;

        let transform;
        let transition;
        if (state.isActive) {
            if (filteredEmojis.size > 0) {
                transform = 'scale(1)';
                transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
            } else {
                transform = 'scale(0)';
                transition = 'all 0.35s cubic-bezier(.3,1,.2,1)';
            }
        }

        return {
            left: `${left}px`,
            bottom: `${top}px`,
            transform,
            transformOrigin: '1em 0%',
            transition,
        };
    },
});
