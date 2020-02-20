import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { WalletSubscriptionState } from 'openland-api/spacex.types';
import { XView, XViewRouterContext } from 'react-mental';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextLabel1, TextSubhead, } from 'openland-web/utils/TextStyles';
import { css } from 'linaria';
import { showSubscription } from '../modals/showSubscription';
import { SubscriptionConverted } from 'openland-y-utils/wallet/subscription';

const subsciptionView = css`
    color: initial;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 16px;
    margin: 0 -16px;
    border-radius: 8px;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
        background-color: var(--backgroundTertiary);
    }
`;

export const SubscriptionView = React.memo((props: SubscriptionConverted) => {
    const router = React.useContext(XViewRouterContext)!;
    const client = useClient();

    return (
        <div
            className={subsciptionView}
            onClick={() => props.state === WalletSubscriptionState.GRACE_PERIOD || props.state === WalletSubscriptionState.RETRYING
                ? router.navigate('/wallet')
                : showSubscription(props, client)
            }
        >
            <UAvatar
                id={props.id}
                title={props.title}
                photo={props.photo}
            />
            <XView marginLeft={16} flexDirection="column">
                <span className={TextLabel1}>
                    {props.title}
                </span>
                <span className={TextSubhead}>
                    <XView
                        color={
                            props.state === WalletSubscriptionState.GRACE_PERIOD ||
                                props.state === WalletSubscriptionState.RETRYING
                                ? "var(--accentNegative)"
                                : "var(--foregroundSecondary)"
                        }
                    >
                        {props.subtitle}
                    </XView>
                </span>
            </XView>
        </div>
    );
});