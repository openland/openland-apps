import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { InviteMembersModal } from 'openland-web/pages/main/channel/components/inviteMembersModal';
import { Room_room_SharedRoom } from 'openland-api/Types';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { css } from 'linaria';

const inviteButtonClass = css`
    & svg > g > path {
        transition: all 0.2s;
    }
    & svg > g > path:last-child {
        fill: #000000;
        opacity: 0.4;
    }
    &:active svg > g > path:last-child {
        fill: #ffffff;
        opacity: 0.4;
    }
`;

export const HeaderInviteButton = (props: { room: Room_room_SharedRoom }) => (
    <InviteMembersModal
        channelTitle={props.room.title}
        roomId={props.room.id}
        target={
            <XButton text="Invite" size="small" icon={<PlusIcon />} className={inviteButtonClass} />
        }
    />
);
