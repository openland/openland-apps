import * as React from 'react';
import { withChannelInviteInfo } from 'openland-web/api/withChannelInviteInfo';
import { XLoader } from 'openland-x/XLoader';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { RoomsInviteComponent } from 'openland-web/fragments/RoomsInviteComponent';

export const RoomInviteFromLink = withChannelInviteInfo(
    ({
        data,
        router: {
            routeQuery: { invite },
        },
    }) =>
        data && data.invite ? (
            data.invite.room.membership === 'MEMBER' ? (
                <XPageRedirect path={'/mail/' + data.invite.room.id} />
            ) : (
                <RoomsInviteComponent
                    inviteLink={invite}
                    room={data.invite.room as any}
                    invite={data.invite}
                />
            )
        ) : (
            <XLoader loading={true} />
        ),
);
