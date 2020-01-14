import React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { withRouter, SingletonRouter } from 'next/router';
import { MessengerFragment } from 'openland-web/fragments/chat/MessengerFragment';
import { InviteLandingComponent } from 'openland-web/fragments/invite/InviteLandingComponent';

interface RawInviteResolverProps {
    router: SingletonRouter;
}

const RawInviteResolver = React.memo<RawInviteResolverProps>(({ router }) => {
    const client = useClient();
    const unicorn = useUnicorn();
    const key = unicorn.id!;
    const invite = client.useResolvedInvite({ key });

    // if user is already a member, silently render MessengerFragment and replace the url    
    if (invite.invite && invite.invite.__typename === 'RoomInvite' && invite.invite.room.membership === 'MEMBER') {
        const roomId = invite.invite.room.id!;
        const destination = `/unicorn?conversationId=${roomId}`;
        const as = `/mail/${roomId}`;

        router.replace(destination, as);

        return <MessengerFragment id={roomId} />;
    }

    return <InviteLandingComponent />;
});

export const InviteResolver = withRouter(RawInviteResolver);
