import * as React from 'react';
import { UserForMention } from 'openland-api/Types';
import { UserPopperContent, EntityPopperContent } from './EntityPopperContent';
import { usePopper } from 'openland-web/components/unicorn/usePopper';

interface UserPopperProps {
    user: UserForMention;
    isMe: boolean;
    noCardOnMe?: boolean;
}

export const useUserPopper = (props: UserPopperProps) => {
    const [, show] = usePopper(
        {
            placement: 'top',
            hideOnLeave: true,
            borderRadius: 8,
            scope: 'entity-popper',
            useWrapper: !props.noCardOnMe || !props.isMe,
            showTimeout: 400,
            hideOnChildClick: true,
        },
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
