import * as React from 'react';
import { UserPopper } from 'openland-web/components/UserPopper';
import { UserShort } from 'openland-api/Types';
import { emoji } from 'openland-y-utils/emoji';
import Glamorous from 'glamorous';

type MentionComponentInnerTextProps = {
    isYou: boolean;
    className?: string;
    user?: UserShort;
    hasPopper?: boolean;
    inCompose?: boolean;
};

export const MentionComponentInnerText = Glamorous.span(
    {},
    ({ isYou, inCompose }: MentionComponentInnerTextProps) => {
        const paddings = inCompose
            ? {
                  paddingTop: 1,
                  paddingBottom: 1,
                  paddingLeft: 4,
                  paddingRight: 4,
                  borderRadius: 5,
              }
            : {};

        if (isYou) {
            return {
                ...paddings,
                cursor: 'pointer',
                backgroundColor: '#fff6e5',
                color: '#1790ff',
            };
        }
        return {
            ...paddings,
            cursor: 'pointer',
            color: '#1790ff',
        };
    },
);

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
