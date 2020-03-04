import React from 'react';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useClient } from 'openland-api/useClient';

interface JoinButtonProps {
    group: DiscoverSharedRoom;
}

export const JoinButton = React.memo((props: JoinButtonProps) => {
    const client = useClient();
    const [state, setState] = React.useState<string>(props.group.membership === 'MEMBER' ? 'done' : 'initial');

    // TODO remove any
    const onClick = (e: any) => {
        e.stopPropagation();
        setState('loading');
        client.mutateRoomJoin({ roomId: props.group.id }).then(() => {
            setState('done');
        });
    };

    if (state === 'done') {
        return (
            <UButton text="Joined" disable={true} style="secondary" />
        );
    }

    if (state === 'loading') {
        return (
            <UButton loading={true} text="Loading..." style="secondary" />
        );
    }

    return (
        <UButton text="Join" onClick={onClick} />
    );
});
