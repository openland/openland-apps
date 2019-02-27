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

export const MentionComponentInnerText = ({ children }: { children: any }) => {
    // hack to get text
    const text = children[0].props.text;
    console.log(children[0].props.text);
    return (
        <span className={mentionComponentInnerTextClassName}>
            {emoji({
                src: text,
                size: 16,
                cache: false,
            })}
        </span>
    );
};
