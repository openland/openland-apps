import * as React from 'react';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';

const mentionComponentInnerTextClassName = css`
    background: #e6f3ff;
    color: #1790ff;
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 4px;
    padding-right: 4px;
    border-radius: 5px;
`;

export const MentionComponentInnerText = ({
    offsetKey,
    decoratedText,
}: {
    offsetKey: string;
    decoratedText: string;
}) => {
    return (
        <span className={mentionComponentInnerTextClassName} data-offset-key={offsetKey}>
            {emoji({
                src: decoratedText,
                size: 16,
            })}
        </span>
    );
};
