import * as React from 'react';
import { withChannelInviteInfo } from 'openland-web/api/withChannelInviteInfo';
import { XLoader } from 'openland-x/XLoader';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { InviteLandingComponent } from 'openland-web/fragments/InviteLandingComponent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';

export const RoomInviteFromLink = withChannelInviteInfo(
    ({
        data,
        router: {
            routeQuery: { invite },
        },
    }) => {
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
    },
);
