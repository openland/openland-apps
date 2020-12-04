import React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';

import { TextBody, TextTitle1 } from 'openland-web/utils/TextStyles';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { showAddMembersModal } from 'openland-web/fragments/chat/showAddMembersModal';
import { GroupMember } from 'openland-y-utils/members/EntityMembersManager';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { ChatInit_room_SharedRoom } from 'openland-api/spacex.types';

const findFriendsImgSrc = css`
    height: 184px;
    width: 186px;
    margin-bottom: 24px;
    background: url(https://cdn.openland.com/shared/art/art-add-people.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-add-people.png) 1x, url(https://cdn.openland.com/shared/art/art-add-people@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-add-people@3x.png) 3x);
`;

const textClassName = css`
    margin-top: 8px;
    margin-bottom: 32px;
    color: var(--foregroundSecondary);
`;

interface InvitePeopleBlockProps {
    room: ChatInit_room_SharedRoom;
}

export const InvitePeopleBlock = React.memo((props: InvitePeopleBlockProps) => {
    const onlines = React.useContext(MessengerContext).getOnlines();
    const client = useClient();
    
    const { id, isChannel } = props.room;

    const onGroupMembersAdd = React.useCallback((addedMembers: GroupMember[]) => {
        client.refetchRoomChat({ id });
        onlines.onUsersAppear(addedMembers.map((m) => m.user.id));
    }, [id]);

    const onClick = React.useCallback(() => {
        showAddMembersModal({ id, isChannel, isGroup: true, isOrganization: false, onGroupMembersAdd });
    }, [id, isChannel]);

    return (
        <XView alignItems="center" marginBottom={48}>
            <div className={findFriendsImgSrc} />
            <div className={TextTitle1}>Add people</div>
            <div className={cx(TextBody, textClassName)}>
                Invite people to join {isChannel ? 'channel' : 'conversation'}
            </div>
            <UButton
                style="primary"
                size="large"
                text="Invite friends"
                alignSelf="center"
                flexShrink={0}
                action={onClick}
            />
        </XView>
    );
});
