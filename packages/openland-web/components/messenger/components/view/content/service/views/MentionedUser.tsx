import * as React from 'react';
import { UserPopper } from '../../../UserPopper';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';

export const MentionedUser = ({ user, isYou }: { user: any; isYou: boolean }) => {
    return (
        <UserPopper user={user} isMe={isYou} noCardOnMe startSelected={false}>
            <MentionComponentInnerText isYou={isYou}>{user.name}</MentionComponentInnerText>
        </UserPopper>
    );
};