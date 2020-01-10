import * as React from 'react';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { XViewRouterContext } from 'react-mental';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { useClient } from 'openland-web/utils/useClient';

const ULinkInternal = React.memo((props: { link: string; color?: string, className?: string, children?: any }) => {
    const { link, children, className, color } = props;
    const router = React.useContext(XViewRouterContext);
    const client = useClient();

    const linkSegments = link.split('/');
    const key = linkSegments.includes('invite') ? linkSegments[linkSegments.length - 1] : '';
    const invite = client.useResolvedInvite({ key });

    let finalLink = link;

    if (invite.invite && invite.invite.__typename === 'RoomInvite' && invite.invite.room.membership === 'MEMBER') {
        const roomId = invite.invite.room.id!;
        finalLink = `/mail/${roomId}`;
    }

    return (
        <a
            href={finalLink}
            style={{ color }}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (router) {
                    router.navigate(finalLink);
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
    const { children, href, path, color, className } = props;
    const fallback = <ULinkFallback {...props}>{children}</ULinkFallback>;

    if (path) {
        return (
            <React.Suspense fallback={fallback}>
            <ULinkInternal
                link={path}
                color={color}
                className={className}
            >
                {children}
            </ULinkInternal>
            </React.Suspense>
        );
    }

    if (href) {
        if (isInternalLink(href)) {
            return (
                <React.Suspense fallback={fallback}>
                    <ULinkInternal
                        link={makeInternalLinkRelative(href)}
                        color={color}
                        className={className}
                    >
                        {children}
                    </ULinkInternal>
                </React.Suspense>
            );
        }

        return fallback;
    }

    return null;
});