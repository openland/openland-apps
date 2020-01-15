import React from 'react';
import AlertBlanket from 'openland-x/AlertBlanket';
import { useClient } from 'openland-web/utils/useClient';
import { ULink } from 'openland-web/components/unicorn/ULink';

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
    const linkSegments = link.link.split('/');
    const key = linkSegments[linkSegments.length - 1];

    const client = useClient();
    const invite = client.useResolvedInvite({ key });

    if (!invite.invite) {
        return <ULink onClick={showRevokedInviteModal}>{link.children}</ULink>;
    }

    if (invite.invite && invite.invite.__typename === 'RoomInvite' && invite.invite.room.membership === 'MEMBER') {
        const roomId = invite.invite.room.id!;
        return <ULink path={`/mail/${roomId}`}>{link.children}</ULink>;
    }

    return <ULink href={link.link}>{link.children}</ULink>;
});