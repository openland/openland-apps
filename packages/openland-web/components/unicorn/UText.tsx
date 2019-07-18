import * as React from 'react';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import { ThemeDefault } from 'openland-y-utils/themes';

interface UTextProps {
    text?: string | null;
    linkify?: boolean;
}

export const UText = React.memo((props: UTextProps) => {
    const { text, linkify = true } = props;

    if (text) {
        const preprocessed = preprocessText(text);
        const parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <br key={'new-line-' + i} />;
            } else if (v.type === 'link') {
                return (
                    <a
                        key={'link-' + i}
                        href={v.link}
                        style={{ color: linkify ? ThemeDefault.accentPrimary : undefined }}
                    >
                        {v.text}
                    </a>
                );
            } else {
                return <span key={'text-' + i}>{v.text}</span>;
            }
        });

        return <div>{parts}</div>;
    } else {
        return null;
    }
});