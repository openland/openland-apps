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

interface FakeULinkProps {
    onClick: () => void;
    children: React.ReactChildren;
    color?: string;
    className?: string;
}

const FakeULink = React.memo((props: FakeULinkProps) => (
    <a
        style={{ color: props.color }}
        className={props.className}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            e.stopPropagation();

            props.onClick();
        }}
    >
        { props.children }
    </a>
));

interface ULinkProps {
    href?: string; // for external and MAY BE internal links
    path?: string; // fallback only for internal RELATIVE links
    color?: string;
    className?: string;
    children?: any;
    onClick?: () => void;
}

const ULinkFallback = React.memo((props: ULinkProps) => (
    <a
        href={props.href}
        className={props.className}
        style={{ color: props.color }}
        target="_blank"
        onClick={(e) => {
            e.stopPropagation();
        }}
    >
        {props.children}
    </a>
));

export const ULink = React.memo((props: ULinkProps) => {
    const { children, href, path, color, className, onClick } = props;
    const fallback = <ULinkFallback {...props}>{children}</ULinkFallback>;

    if (onClick) {
        return (
            <FakeULink
                onClick={onClick}
                color={color}
                className={className}
            >
                { children }
            </FakeULink>
        );
    }

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

        return fallback;
    }

    return null;
});