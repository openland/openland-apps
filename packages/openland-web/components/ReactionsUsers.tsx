import * as React from 'react';
import { ReactionUserEmojify, ReactionUser } from 'openland-engines/reactions/types';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { css } from 'linaria';

const row = css`
    text-align: left;
`;

export interface ReactionsUsersInstance {
    update: (newUsers: ReactionUserEmojify[]) => void;
}

interface ReactionsUsersProps {
    initialUsers: ReactionUserEmojify[];
    ctx: UPopperController;
}

// Sorry universe
export const ReactionsUsers = React.memo(React.forwardRef((props: ReactionsUsersProps, ref: React.Ref<ReactionsUsersInstance>) => {
    const [users, setUsers] = React.useState<ReactionUserEmojify[]>(props.initialUsers);

    React.useImperativeHandle(ref, () => ({
        update: (newUsers: ReactionUser[]) => {
            if (newUsers.length <= 0) {
                props.ctx.hide();
            } else {
                setUsers(newUsers);
            }
        },
    }));

    return (
        <>
            {users.map((u, i) =>
                <div key={`user-${u.name}-${i}`} className={row}>
                    {u.name}
                </div>
            )}
        </>
    );
}));