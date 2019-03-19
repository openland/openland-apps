import * as React from 'react';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { UserPopper } from 'openland-web/components/UserPopper';
import { UserShort } from 'openland-api/Types';
import { emoji } from 'openland-y-utils/emoji';

export const MentionedUser = React.memo(({ user, isYou }: { user: UserShort; isYou: boolean }) => {
    const userNameEmojified = React.useMemo(
        () => {
            return emoji({
                src: user.name,
                size: 16,
            });
        },
        [user.name],
    );

    return (
        <UserPopper user={user} isMe={isYou} noCardOnMe startSelected={false}>
            <MentionComponentInnerText isYou={isYou}>{userNameEmojified}</MentionComponentInnerText>
        </UserPopper>
    );
});
