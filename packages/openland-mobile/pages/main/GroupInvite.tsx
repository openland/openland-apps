import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { XMemo } from 'openland-y-utils/XMemo';
import { RoomInviteInfo_invite } from 'openland-api/spacex.types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ChatJoinComponent } from './components/ChatJoin';
import { trackEvent } from 'openland-mobile/analytics';

const GroupInviteContent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    let invite: RoomInviteInfo_invite = props.router.params.invite;
    let inviteId = props.router.params.inviteId;
    let room = invite.room;
    let user = invite.invitedByUser;

    const action = React.useCallback(async () => {
            await getClient().mutateRoomJoinInviteLink({ invite: inviteId });

            props.router.pushAndReset('Conversation', { id: room.id });
            trackEvent('invite_button_clicked');
    }, [inviteId, room.id]);

    return <ChatJoinComponent router={props.router} theme={theme} room={room} invitedBy={user} action={action} />;
});

export const GroupInvite = withApp(GroupInviteContent, { navigationAppearance: 'small' });
