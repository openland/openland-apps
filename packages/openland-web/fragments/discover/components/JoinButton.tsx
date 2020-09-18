import React from 'react';
import { XViewRouterContext } from 'react-mental';
import { css, cx } from 'linaria';
import { DiscoverSharedRoom, RoomChat_room_SharedRoom } from 'openland-api/spacex.types';
import { showPremiumPayConfirm } from './ShowPremiumPayConfirm';
import { useClient } from 'openland-api/useClient';
import { XLoader } from 'openland-x/XLoader';
import IcAdd from 'openland-icons/s/ic-add-24.svg';
import IcDone from 'openland-icons/s/ic-done-24.svg';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import { UserInfoContext } from 'openland-web/components/UserInfo';

interface JoinButtonProps {
    group:
    | DiscoverSharedRoom
    | Pick<
        RoomChat_room_SharedRoom,
        'id' | 'isPremium' | 'premiumSettings' | 'title' | 'photo' | 'membership'
    >;
}

const buttonStyle = css`
    min-width: 56px;
    height: 32px;
    margin-right: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    border-radius: 64px;
    svg {
        width: 20px;
        height: 20px;
    }
`;

const buttonDoneStyle = css`
    background-color: var(--backgroundTertiaryTrans) !important;
    & path {
        fill: var(--foregroundTertiary) !important;
    }
`;

const buttonAddPrimaryStyle = css`
    background-color: var(--accentPrimary);
    &:hover {
        background-color: var(--accentPrimaryHover);
    }

    &:active {
        background-color: var(--accentPrimaryActive);
    }
    & path {
        fill: var(--foregroundContrast);
    }
`;

const buttonAddPayStyle = css`
    background-color: var(--accentPay);
    color: var(--foregroundContrast);
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    padding-left: 16px;
    padding-right: 16px;
    &:hover {
        background-color: var(--accentPayHover);
    }
    &:active {
        background-color: var(--accentPayActive);
    }
    & path {
        fill: var(--foregroundContrast);
    }
`;

export const JoinButton = React.memo((props: JoinButtonProps) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    const [state, setState] = React.useState<string>(
        props.group.membership === 'MEMBER' ? 'done' : 'initial',
    );

    // TODO remove any
    const onClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        if (props.group.isPremium) {
            showPremiumPayConfirm(props, client, router, () => setState('done'));
            return;
        }

        setState('loading');
        const data = await client.mutateRoomJoin({ roomId: props.group.id });
        await client.refetchRoomChat({ id: data.join.id });
        await setState('done');
    };

    const isDone = state === 'done';
    const isLoading = state === 'loading';
    const isAdd = !isDone && !isLoading;

    return (
        <div
            className={cx(
                buttonStyle,
                props.group.isPremium ? buttonAddPayStyle : buttonAddPrimaryStyle,
                isDone && buttonDoneStyle,
            )}
            onClick={async (e) => {
                if (isDone) {
                    return;
                }
                if (isLoading) {
                    return e.stopPropagation();
                }
                await onClick(e);
            }}
        >
            {isAdd && !props.group.isPremium && <IcAdd />}
            {isAdd &&
                props.group.isPremium &&
                formatMoneyInterval(
                    props.group.premiumSettings!.price,
                    props.group.premiumSettings!.interval,
                )}
            {isDone && <IcDone />}
            {isLoading && (
                <XLoader loading={true} transparentBackground={true} size="small" contrast={true} />
            )}
        </div>
    );
});

export const JoinButtonSimple = React.memo((props: JoinButtonProps) => {
    const router = React.useContext(XViewRouterContext);
    const userInfo = React.useContext(UserInfoContext);
    const onClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        if (router) {
            if (!userInfo?.isLoggedIn) {
                router.navigate('/signin?redirect=' + encodeURIComponent('/' + props.group.id));
            } else {
                router.navigate('/' + props.group.id);
            }
        }
    };

    return (
        <div
            className={cx(
                buttonStyle,
                props.group.isPremium ? buttonAddPayStyle : buttonAddPrimaryStyle,
            )}
            onClick={onClick}
        >
            {!props.group.isPremium && <IcAdd />}
            {props.group.isPremium &&
                formatMoneyInterval(
                    props.group.premiumSettings!.price,
                    props.group.premiumSettings!.interval,
                )}
        </div>
    );
});