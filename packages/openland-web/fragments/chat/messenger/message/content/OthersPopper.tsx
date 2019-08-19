import * as React from 'react';
import { UserForMention } from 'openland-api/Types';
import { css } from 'linaria';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { MentionUserComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { XView } from 'react-mental';

const style = css`
    font-weight: 600;

    &:hover {
        text-decoration: none;
    }
`;

const wrapper = css`
    padding: 8px 0;
`;

interface OthersPopperProps {
    users: UserForMention[];
    children?: any;
}

export const OthersPopper = React.memo((props: OthersPopperProps) => {
    const { users, children } = props;

    const usersRef = React.useRef(users);
    usersRef.current = users;

    const [, show] = usePopper({ placement: 'top', hideOnLeave: true, scope: 'others-users' }, ctx => (
        <div className={wrapper}>
            {usersRef.current.map((user, index) => (
                <XView
                    key={`user-${user.name}-${index}`}
                    hoverBackgroundColor="var(--backgroundPrimaryHover)"
                    selectedBackgroundColor="var(--accentPrimary)"
                    selectedHoverBackgroundColor="var(--accentPrimaryHover)"
                    selectedColor="var(--foregroundInverted)"
                    cursor="pointer"
                    path={`/${user.shortname || user.id}`}
                    onClick={() => ctx.hide()}
                >
                    <MentionUserComponent
                        id={user.id}
                        name={user.name}
                        photo={user.photo}
                        primaryOrganization={user.primaryOrganization}
                    />
                </XView>
            ))}
        </div>
    ));

    return (
        <span onMouseEnter={show} className={style}>
            {children}
        </span>
    );
});