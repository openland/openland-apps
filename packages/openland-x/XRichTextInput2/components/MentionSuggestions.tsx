import * as React from 'react';
import { css, cx } from 'linaria';

export type SizeT = { width: number; height: number };
const mentionSuggestionsShow = css`
    transform: scale(1);
`;

const mentionSuggestionsHide = css`
    transform: scale(0);
`;

const mentionSuggestionsClassName = css`
    left: 0px;
    bottom: 0px;
    transform-origin: 1em 0%;
    transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);
    position: absolute;
    border: 1px solid #eee;
    border-radius: 10px;
    background: #fff;
    box-shadow: none;
    z-index: 100;
    bottom: 50px;
    left: 0;
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

export const MentionSuggestions = ({
    items,
    show,
    sizeOfContainer,
}: {
    items: any;
    show: boolean;
    sizeOfContainer: SizeT;
}) => {
    return (
        <div
            className={cx(
                mentionSuggestionsClassName,
                show ? mentionSuggestionsShow : mentionSuggestionsHide,
            )}
            style={{
                width: sizeOfContainer.width,
                left: show ? 0 : sizeOfContainer.width / 2,
                bottom: show ? 50 : sizeOfContainer.height / 2,
            }}
        >
            {items}
        </div>
    );
};
