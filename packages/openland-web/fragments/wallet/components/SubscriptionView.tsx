import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { WalletSubscriptionState } from 'openland-api/spacex.types';
import { XView, XViewRouterContext } from 'react-mental';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextLabel1, TextSubhead, } from 'openland-web/utils/TextStyles';
import { css } from 'linaria';
import { showSubscription } from '../modals/showSubscription';

interface NormalizedSubscription {
    id: string;
    title: string;
    photo: string;
    state: WalletSubscriptionState;
    expires: Date;
    subscriptionId: string;
}

const displayDate = (date: Date) => {
    const utc = date.toUTCString();
    const segments = utc.split(' ');
    const month = segments[2];
    const day = segments[1];

    return `${month} ${day}`;
};

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

export const SubscriptionView = React.memo((props: NormalizedSubscription) => {
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

                        {props.state === WalletSubscriptionState.STARTED && (
                            <>Next bill on {displayDate(props.expires)}</>
                        )}

                        {props.state === WalletSubscriptionState.GRACE_PERIOD || props.state === WalletSubscriptionState.RETRYING && (
                            <>Transaction failed</>
                        )}

                        {props.state === WalletSubscriptionState.CANCELED && (
                            <>Expires on {displayDate(props.expires)}</>
                        )}

                        {props.state === WalletSubscriptionState.EXPIRED && (
                            <>Expired on {displayDate(props.expires)}</>
                        )}

                    </XView>
                </span>
            </XView>
        </div>
    );
});