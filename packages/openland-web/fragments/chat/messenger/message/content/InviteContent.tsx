import React from 'react';
import { useClient } from 'openland-api/useClient';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { XViewRouterContext } from 'react-mental';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { resolveInvite } from 'openland-web/utils/resolveLinkAction';

interface Link {
    link: string;
    children: React.ReactChildren;
}

export const isInviteLink = (link: string) => link.includes('invite');

export const InviteLink = React.memo((link: Link) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    
    const handleClick = async () => {
        return resolveInvite(link.link, client, router!, () => {
            const relativeLink = makeInternalLinkRelative(link.link || '');
            if (relativeLink) {
                router.navigate(relativeLink);
            }
        }, true);
    };

    return <ULink onClick={handleClick}>{link.children}</ULink>;
});