import * as React from 'react';
import { InviteMembersModal } from 'openland-web/pages/main/channel/components/inviteMembersModal';
import { Room_room_SharedRoom } from 'openland-api/Types';

export const HeaderInviteButton = (props: { room: Room_room_SharedRoom }) => (
    <InviteMembersModal channelTitle={props.room.title} roomId={props.room.id} />
);
