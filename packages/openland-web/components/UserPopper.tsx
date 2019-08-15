import * as React from 'react';
import { UserForMention } from 'openland-api/Types';
import { UserPopperContent } from './UserPopperContent';
import { usePopper } from 'openland-web/components/unicorn/usePopper';

interface UserPopperProps {
    user: UserForMention;
    isMe: boolean;
    noCardOnMe?: boolean;
}

export const useUserPopper = (props: UserPopperProps) => {
    const [, show] = usePopper(
        { placement: 'top', hideOnLeave: true, borderRadius: 8, scope: 'user-popper' },
        ctx => (
            <UserPopperContent
                hidePopper={ctx.hide}
                noCardOnMe={props.noCardOnMe}
                isMe={props.isMe}
                user={props.user}
            />
        ),
    );
    return [show];
};
