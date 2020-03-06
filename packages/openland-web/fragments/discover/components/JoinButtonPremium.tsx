import React from 'react';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { css } from 'linaria';
import IcAdd from 'openland-icons/s/ic-add-24.svg';
import IcDone from 'openland-icons/s/ic-done-24.svg';
import { showPayConfirm } from 'openland-web/fragments/wallet/modals/showPayConfirm';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XViewRouterContext } from 'react-mental';

interface JoinButtonPremiumProps {
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

export const JoinButtonPremium = React.memo((props: JoinButtonPremiumProps) => {
    const [state, setState] = React.useState<string>(props.group.membership === 'MEMBER' ? 'done' : 'initial');
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    // TODO remove any
    const premiumSettings = props.group.premiumSettings!;
    const onClick = (e: any) => {
        e.stopPropagation();

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
                    setState('done');
                }
            },
        });
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
