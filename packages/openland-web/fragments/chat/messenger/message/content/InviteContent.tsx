import React from 'react';
import AlertBlanket from 'openland-x/AlertBlanket';
import { useClient } from 'openland-api/useClient';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { XViewRouterContext } from 'react-mental';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';

export const showRevokedInviteModal = () => {
    AlertBlanket.builder()
        .message('This invitation has been revoked.')
        .action('OK', async () => { return; })
        .show();
};

interface Link {
    link: string;
    children: React.ReactChildren;
}

export const isInviteLink = (link: string) => link.includes('invite');

export const InviteLink = React.memo((link: Link) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    
    const resolveInvite = async () => {
        const linkSegments = link.link.split('/');
        const key = linkSegments[linkSegments.length - 1];
        const invite = await client.queryResolvedInvite({ key }, {fetchPolicy: 'network-only'});

        if (!invite.invite) {
            showRevokedInviteModal();
        } else if (invite.invite && invite.invite.__typename === 'RoomInvite' && invite.invite.room.membership === 'MEMBER') {
            const roomId = invite.invite.room.id!;
            router.navigate(`/mail/${roomId}`);
        } else {
            router.navigate(makeInternalLinkRelative(link.link));
        }
    };

    return <ULink onClick={resolveInvite}>{link.children}</ULink>;
});