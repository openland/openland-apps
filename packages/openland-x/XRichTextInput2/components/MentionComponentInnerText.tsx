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

export const MentionComponentInnerText = (props: any) => {
    return (
        <span className={mentionComponentInnerTextClassName} data-offset-key={props.offsetKey}>
            {emoji({
                src: props.decoratedText,
                size: 16,
            })}
        </span>
    );
};
