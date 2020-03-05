import React from 'react';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { css } from 'linaria';
import { XLoader } from 'openland-x/XLoader';

import IcAdd from 'openland-icons/s/ic-add-24.svg';
import IcDone from 'openland-icons/s/ic-done-24.svg';

interface JoinButtonProps {
    group: DiscoverSharedRoom;
}

const button = css`
    width: 48px;
    height: 32px;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--accentPrimary);

    border-radius: 64px;

    & path {
        fill: var(--foregroundContrast);
    }

    &:disabled {
        background-color: var(--backgroundTertiaryTrans);
    }

    &:disabled path {
        fill: var(--foregroundTertiary);
    }
`;

export const JoinButton = React.memo((props: JoinButtonProps) => {
    const client = useClient();
    const [state, setState] = React.useState<string>(props.group.membership === 'MEMBER' ? 'done' : 'initial');

    // TODO remove any
    const onClick = (e: any) => {
        e.stopPropagation();
        setState('loading');
        client.mutateRoomJoin({ roomId: props.group.id }).then(async (data) => {
            setState('done');
            await client.refetchRoomChat({id: data.join.id});
            await client.refetchRoom({id: data.join.id});
        });
    };

    const stopPropagation = (e: any) => {
        e.stopPropagation();
    };

    if (state === 'done') {
        return (
            <button className={button} disabled={true}>
                <IcDone />
            </button>
        );
    }

    if (state === 'loading') {
        return (
            <button className={button} onClick={stopPropagation}>
                <XLoader
                    loading={true}
                    transparentBackground={true}
                    size="small"
                    contrast={true}
                />
            </button>
        );
    }

    return (
        <button className={button} onClick={onClick}>
            <IcAdd />
        </button>
    );
});
