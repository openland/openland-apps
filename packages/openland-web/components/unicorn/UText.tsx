import * as React from 'react';
import { css } from 'linaria';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import { ULink } from './ULink';

interface UTextProps {
    text?: string | null;
    linkify?: boolean;
    proccessText?: (text?: string) => JSX.Element | string;
}

const textStyle = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

export const UText = React.memo((props: UTextProps) => {
    const { text, proccessText, linkify = true } = props;

    if (text) {
        const preprocessed = preprocessText(text);
        const parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <br key={'new-line-' + i} />;
            } else if (v.type === 'link' && v.link && linkify) {
                return (
                    <ULink key={'link-' + i} href={v.link}>
                        {v.text || v.link}
                    </ULink>
                );
            } else {
                return <span key={'text-' + i}>{proccessText ? proccessText(v.text) : v.text}</span>;
            }
        });

        return <div className={textStyle}>{parts}</div>;
    } else {
        return null;
    }
});
