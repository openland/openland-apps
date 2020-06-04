import * as React from 'react';
import { UserForMention } from 'openland-api/spacex.types';
import { UserPopperContent, EntityPopperContent } from './EntityPopperContent';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface UserPopperProps {
    user: UserForMention;
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
            hideOnChildClick: true,
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

interface EntityPopperProps {
    title: string;
    subtitle?: string;
    id: string;
    photo?: string | null;
}

export const useEntityPopper = (props: EntityPopperProps) => {
    const [, show] = usePopper(
        {
            placement: 'top',
            hideOnLeave: true,
            borderRadius: 8,
            scope: 'entity-popper',
            showTimeout: 400,
        },
        ctx => (
            <EntityPopperContent
                hidePopper={ctx.hide}
                {...props}
            />
        ),
    );
    return [show];
};
