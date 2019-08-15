import * as React from 'react';
import { css } from 'linaria';
import { UserForMention } from 'openland-api/Types';
import { UserPopperContent } from './UserPopperContent';
import { usePopper } from 'openland-web/components/unicorn/usePopper';

const popperContainer = css`
    animation-duration: 500ms;
    animation-name: anim;

    @keyframes anim {
        0% {
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
            display: none;
        }
        60% {
            display: block;
        }
        70% {
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
        }
        100% {
            opacity: 1;
            pointer-events: auto;
            visibility: auto;
        }
    }
`;

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
            scope: 'user-popper',
            wrapperClassName: popperContainer,
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
