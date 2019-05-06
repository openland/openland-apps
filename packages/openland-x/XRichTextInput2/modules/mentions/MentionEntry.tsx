import * as React from 'react';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';

const MentionEntryClassName = css`
    background: #e6f3ff;
    color: #1790ff;
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 4px;
    padding-right: 4px;
    border-radius: 5px;
`;

type MentionEntryT = {
    offsetKey: string;
    decoratedText: string;
};

export const MentionEntry = ({ offsetKey, decoratedText }: MentionEntryT) => {
    return (
        <span className={MentionEntryClassName} data-offset-key={offsetKey}>
            {emoji({
                src: decoratedText,
                size: 16,
            })}
        </span>
    );
};
