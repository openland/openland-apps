import * as React from 'react';
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

interface ULinkProps {
    text: string;
    link: string;
    color?: string;
}

export const ULink = React.memo((props: ULinkProps) => {
    const { text, link, color } = props;
    const router = React.useContext(XViewRouterContext);

    if (isInternalLink(link)) {
        return (
            <span
                className={internalLinkClass}
                style={{ color }}
                onClick={() => {
                    if (router) {
                        router.navigate(makeInternalLinkRelative(link));
                    }
                }}
            >
                {text}
            </span>
        );
    }
    
    return (
        <a
            href={link}
            style={{ color }}
            target="_blank"
        >
            {text}
        </a>
    );
});