import * as React from 'react';
import { XLoader } from 'openland-x/XLoader';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { InviteLandingComponent } from 'openland-web/fragments/InviteLandingComponent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';

export const RoomInviteFromLink = () => {
    const api = useClient();
    const {
        routeQuery: { invite },
    } = React.useContext(XRouterContext) as XRouter;

    const data = api.useWithoutLoaderRoomInviteInfo({ invite });

    return (
        <>
            {data && data.invite ? (
                data.invite.room.membership === 'MEMBER' ? (
                    <XPageRedirect path={'/mail/' + data.invite.room.id} />
                ) : (
                    <>
                        <XDocumentHead
                            titleSocial={data.invite && data.invite.room.title}
                            title={data.invite && data.invite.room.title}
                            description={data.invite && data.invite.room.description}
                            imgUrl={
                                data.invite && data.invite.room
                                    ? data.invite.room.socialImage || data.invite.room.photo
                                    : undefined
                            }
                        />
                        <InviteLandingComponent
                            inviteLink={invite}
                            room={data.invite.room as any}
                            invite={data.invite}
                        />
                    </>
                )
            ) : (
                <XLoader loading={true} />
            )}
        </>
    );
};
