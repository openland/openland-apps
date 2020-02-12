import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-api/useClient';
import { Subscriptions_subscriptions_product_WalletSubscriptionProductGroup, WalletSubscriptionState } from 'openland-api/spacex.types';
import { XView } from 'react-mental';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextLabel1, TextSubhead } from 'openland-web/utils/TextStyles';
import { FormSection } from '../account/components/FormSection';
import { FormWrapper } from '../account/components/FormWrapper';
import { css } from 'linaria';

interface NormalizedSubscription {
    id: string;
    title: string;
    photo: string;
    state: WalletSubscriptionState;
    expires: Date;
}

const subsciptionView = css`
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

const displayDate = (date: Date) => {
    const utc = date.toUTCString();
    const segments = utc.split(' ');
    const month = segments[2];
    const day = segments[1];

    return `${month} ${day}`;
};

const SubscriptionView = React.memo((props: NormalizedSubscription) => {
    return (
        <div className={subsciptionView}>
            <UAvatar
                id={props.id}
                title={props.title}
                photo={props.photo}
            />
            <XView marginLeft={16} flexDirection="column">
                <span className={TextLabel1}>
                    { props.title }
                </span>
                <span className={TextSubhead}>
                    <XView color="var(--foregroundSecondary)">
                        Expires on {displayDate(props.expires)}
                    </XView>
                </span>
            </XView>
        </div>
    );
});

export const SubscriptionsFragment = React.memo(() => {
    const client = useClient();
    const subscriptions = client.useSubscriptions();
    const groupSubscriptions = subscriptions.subscriptions.filter(subscription => subscription.product.__typename === 'WalletSubscriptionProductGroup');
    const normalizedSubscriptions: NormalizedSubscription[] = groupSubscriptions.map(subscription => {
        const group = (subscription.product as Subscriptions_subscriptions_product_WalletSubscriptionProductGroup).group;

        return {
            ...group,
            state: subscription.state,
            expires: new Date(parseInt(subscription.expires, 10))
        };
    });

    const activeSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.STARTED ||
        subscription.state === WalletSubscriptionState.GRACE_PERIOD ||
        subscription.state === WalletSubscriptionState.RETRYING
    );

    const expiredSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.EXPIRED ||
        subscription.state === WalletSubscriptionState.CANCELED
    );

    return (
        <Page track="settings_subscriptions">
            <UHeader title="Subscriptions" />

            <FormWrapper>

                { activeSubscriptions.length > 0 && (
                    <FormSection title="Active">
                        { activeSubscriptions.map(subscription => (
                            <SubscriptionView
                                key={subscription.id}
                                {...subscription}
                            />
                        ))}
                    </FormSection>
                )}

                { expiredSubscriptions.length > 0 && (
                    <FormSection title="Expired">
                        { expiredSubscriptions.map(subscription => (
                            <SubscriptionView
                                key={subscription.id}
                                {...subscription}
                            />
                        ))}
                    </FormSection>
                )}

                { activeSubscriptions.length === 0 && expiredSubscriptions.length === 0 && (
                    <div>No subscriptions</div>
                )}

            </FormWrapper>
        </Page>
    );
});