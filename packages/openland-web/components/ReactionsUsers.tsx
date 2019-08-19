import * as React from 'react';
import { ReactionUserEmojify, ReactionUser } from 'openland-engines/reactions/types';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';

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
            setUsers(newUsers);
        },
    }));

    React.useEffect(() => {
        if (users.length <= 0) {
            props.ctx.hide();
        }
    }, [users]);

    return (
        <>
            {users.map((u, i) =>
                <div key={`user-${u.name}-${i}`}>
                    {u.name}
                </div>
            )}
        </>
    );
}));