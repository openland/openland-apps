import React from 'react';
import { Room_room_SharedRoom } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { css } from 'linaria';
import IcAdd from 'openland-icons/s/ic-add-24.svg';
import IcDone from 'openland-icons/s/ic-done-24.svg';
import { showPayConfirm } from 'openland-web/fragments/wallet/modals/showPayConfirm';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XViewRouterContext, XViewRouter } from 'react-mental';
import { OpenlandClient } from 'openland-api/spacex';

interface JoinButtonPremiumProps {
    group: Pick<Room_room_SharedRoom, 'id' | 'isPremium' | 'premiumSettings' | 'title' | 'photo' | 'membership'>;
}

const button = css`
    width: 48px;
    height: 32px;

    margin-right: 8px;
    
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--accentPrimary);

    border-radius: 64px;

    &:hover {
        background-color: var(--accentPrimaryHover);
    }

    &:active {
        background-color: var(--accentPrimaryActive);
    }

    & path {
        fill: var(--foregroundContrast);
    }

    &:disabled {
        background-color: var(--backgroundTertiaryTrans);
    }

    &:disabled path {
        fill: var(--foregroundTertiary);
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

export const showPremiumPayConfirm = (props: JoinButtonPremiumProps, client: OpenlandClient, router: XViewRouter, onJoined?: () => void) => {
    const premiumSettings = props.group.premiumSettings!;
    showPayConfirm({
        amount: premiumSettings.price,
        ...(premiumSettings.interval ?
            { type: 'subscription', interval: premiumSettings.interval } :
            { type: 'payment' }),
        productTitle: props.group.title,
        productDescription: premiumSettings.interval ? 'Subscription' : 'Payment',
        productPicture: <UAvatar title={props.group.title} id={props.group.id} photo={props.group.photo} />,
        action: async () => {
            let passIsActive = false;
            if (premiumSettings.interval) {
                passIsActive = (await client.mutateBuyPremiumChatSubscription({ chatId: props.group.id })).betaBuyPremiumChatSubscription.premiumPassIsActive;
            } else {
                passIsActive = (await client.mutateBuyPremiumChatPass({ chatId: props.group.id })).betaBuyPremiumChatPass.premiumPassIsActive;
            }
            if (passIsActive) {
                router.navigate('/mail/' + props.group.id);
                if (onJoined) {
                    onJoined();
                }
            }
        },
    });
};

export const JoinButtonPremium = React.memo((props: JoinButtonPremiumProps) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;

    const [state, setState] = React.useState<string>(props.group.membership === 'MEMBER' ? 'done' : 'initial');
    const onClick = (e: any) => {
        e.stopPropagation();
        showPremiumPayConfirm(props, client, router, () => setState('done'));
    };

    if (state === 'done') {
        return (
            <button className={button} disabled={true}>
                <IcDone />
            </button>
        );
    }

    return (
        <button className={button} onClick={onClick}>
            <IcAdd />
        </button>
    );
});
