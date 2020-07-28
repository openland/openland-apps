import * as React from 'react';
import { MessageSender } from 'openland-api/spacex.types';
import { UserPopperContent } from './EntityPopperContent';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface UserPopperProps {
    user: MessageSender;
    noCardOnMe?: boolean;
}

export const useUserPopper = (props: UserPopperProps) => {
    const engine = React.useContext(MessengerContext);
    const [, show] = usePopper(
        {
            placement: 'top',
            hideOnLeave: true,
            borderRadius: 8,
            scope: 'entity-popper',
            useWrapper: !props.noCardOnMe || props.user.id !== engine.user.id,
            showTimeout: 400,
            hideOnChildClick: false,
            hideOnClick: false,
        },
        ctx => (
            <UserPopperContent
                hidePopper={ctx.hide}
                noCardOnMe={props.noCardOnMe}
                isMe={props.user.id === engine.user.id}
                user={props.user}
            />
        ),
    );
    return [show];
};
