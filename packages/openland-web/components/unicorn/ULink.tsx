import * as React from 'react';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { XViewRouterContext } from 'react-mental';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';

const ULinkInternal = React.memo((props: { link: string; color?: string, className?: string, children?: any }) => {
    const { link, children, className, color } = props;
    const router = React.useContext(XViewRouterContext);

    return (
        <a
            href={link}
            style={{ color }}
            className={className}
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
    path?: string; // fallback only for internal RELATIVE links
    color?: string;
    className?: string;
    children?: any;
}

export const ULink = React.memo((props: ULinkProps) => {
    const { children, href, path, color, className } = props;

    if (path) {
        return (
            <ULinkInternal
                link={path}
                color={color}
                className={className}
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
                    className={className}
                >
                    {children}
                </ULinkInternal>
            );
        }

        return (
            <a
                href={href}
                className={className}
                style={{ color }}
                target="_blank"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </a>
        );
    }

    return null;
});