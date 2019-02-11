import * as React from 'react';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { UserPopper } from 'openland-web/components/UserPopper';
import { UserShort } from 'openland-api/Types';
import { emoji } from 'openland-y-utils/emoji';

export const MentionedUser = ({ user, isYou }: { user: UserShort; isYou: boolean }) => {
    return (
        <UserPopper user={user} isMe={isYou} noCardOnMe startSelected={false}>
            <MentionComponentInnerText isYou={isYou}>
                {emoji({
                    src: user.name,
                    size: 14,
                })}
            </MentionComponentInnerText>
        </UserPopper>
    );
};
