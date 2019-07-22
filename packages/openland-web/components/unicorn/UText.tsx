import * as React from 'react';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import { ThemeDefault } from 'openland-y-utils/themes';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { XViewRouterContext } from 'react-mental';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { css } from 'linaria';

const internalLinkClass = css`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

interface UTextProps {
    text?: string | null;
    linkify?: boolean;
}

export const UText = React.memo((props: UTextProps) => {
    const { text, linkify = true } = props;
    const router = React.useContext(XViewRouterContext);

    if (text) {
        const preprocessed = preprocessText(text);
        const parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <br key={'new-line-' + i} />;
            } else if (v.type === 'link') {
                if (v.link && isInternalLink(v.link)) {
                    return (
                        <span
                            key={'link-' + i}
                            className={ linkify ? internalLinkClass : undefined }
                            style={{
                                color: linkify ? ThemeDefault.accentPrimary : undefined,
                            }}
                            onClick={() => {
                                if (router) {
                                    router.navigate(makeInternalLinkRelative(v.link!));
                                }
                            }}
                        >
                            {v.text}
                        </span>
                    );
                } else {
                    return (
                        <a
                            key={'link-' + i}
                            href={v.link}
                            style={{ color: linkify ? ThemeDefault.accentPrimary : undefined }}
                            target="_blank"
                        >
                            {v.text}
                        </a>
                    );
                }
            } else {
                return <span key={'text-' + i}>{v.text}</span>;
            }
        });

        return <div>{parts}</div>;
    } else {
        return null;
    }
});