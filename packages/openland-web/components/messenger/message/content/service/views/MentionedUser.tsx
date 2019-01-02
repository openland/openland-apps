import * as React from 'react';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { UserPopper } from 'openland-web/components/messenger/components/view/UserPopper';

export const MentionedUser = ({ user, isYou }: { user: any; isYou: boolean }) => {
    return (
        <UserPopper user={user} isMe={isYou} noCardOnMe startSelected={false}>
            <MentionComponentInnerText isYou={isYou}>{user.name}</MentionComponentInnerText>
        </UserPopper>
    );
};