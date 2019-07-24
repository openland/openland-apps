import * as React from 'react';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { XViewRouterContext } from 'react-mental';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';

const ULinkInternal = React.memo((props: { link: string; color?: string, children?: any }) => {
    const { link, children, color } = props;
    const router = React.useContext(XViewRouterContext);

    return (
        <a
            href={link}
            style={{ color }}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (router) {
                    router.navigate(link);
                }
            }}
        >
            {children}
        </a>
    );
});

interface ULinkProps {
    href?: string; // for external and MAY BE internal links
    path?: string; // fallback only for internal relative links
    color?: string;
    children?: any;
}

export const ULink = React.memo((props: ULinkProps) => {
    const { children, href, path, color } = props;

    if (path) {
        return (
            <ULinkInternal
                link={path}
                color={color}
            >
                {children}
            </ULinkInternal>
        );
    }

    if (href) {
        if (isInternalLink(href)) {
            return (
                <ULinkInternal
                    link={makeInternalLinkRelative(href)}
                    color={color}
                >
                    {children}
                </ULinkInternal>
            );
        }

        return (
            <a
                href={href}
                style={{ color }}
                target="_blank"
            >
                {children}
            </a>
        );
    }

    return null;
});