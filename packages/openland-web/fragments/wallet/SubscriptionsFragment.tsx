import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-api/useClient';
import { Subscriptions_subscriptions_product_WalletSubscriptionProductGroup, WalletSubscriptionState } from 'openland-api/spacex.types';
import { XView, XViewRouterContext } from 'react-mental';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextLabel1, TextSubhead, TextTitle2, TextBody } from 'openland-web/utils/TextStyles';
import { FormSection } from '../account/components/FormSection';
import { FormWrapper } from '../account/components/FormWrapper';
import { css } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';

interface NormalizedSubscription {
    id: string;
    title: string;
    photo: string;
    state: WalletSubscriptionState;
    expires: Date;
}

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

const displayDate = (date: Date) => {
    const utc = date.toUTCString();
    const segments = utc.split(' ');
    const month = segments[2];
    const day = segments[1];

    return `${month} ${day}`;
};

function showSubscriptionModal(props: NormalizedSubscription) {
    showModalBox({ title: 'Subscription', useTopCloser: true }, () => {
        return (
            <XView paddingHorizontal={24} paddingBottom={48} paddingTop={12} flexDirection="column" alignItems="center" justifyContent="center">
                <UAvatar
                    id={props.id}
                    title={props.title}
                    photo={props.photo}
                    size='xx-large'
                />
                <XView marginTop={16}>
                    <h2 className={TextTitle2}>
                        { props.title }
                    </h2>
                </XView>
                <XView marginTop={8} color="var(--foregroundSecondary)">
                    <span className={TextBody}>
                        { props.state === WalletSubscriptionState.STARTED && (
                            <>Next bill on {displayDate(props.expires)}</>
                        )}

                        { props.state === WalletSubscriptionState.CANCELED && (
                            <>Expires on {displayDate(props.expires)}</>
                        )}

                        { props.state === WalletSubscriptionState.EXPIRED && (
                            <>Expired on {displayDate(props.expires)}</>
                        )}
                    </span>
                </XView>
            </XView>
        );
    });
}

const SubscriptionView = React.memo((props: NormalizedSubscription) => {
    const router = React.useContext(XViewRouterContext)!;

    return (
        <div
            className={subsciptionView}
            onClick={() => props.state === WalletSubscriptionState.GRACE_PERIOD || props.state === WalletSubscriptionState.RETRYING
                ? router.navigate('/wallet')
                : showSubscriptionModal(props)
            }
        >
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
                        
                        { props.state === WalletSubscriptionState.STARTED && (
                            <>Next bill on {displayDate(props.expires)}</>
                        )}

                        { props.state === WalletSubscriptionState.GRACE_PERIOD || props.state === WalletSubscriptionState.RETRYING && (
                            <>Failing</>
                        )}

                        { props.state === WalletSubscriptionState.CANCELED && (
                            <>Expires on {displayDate(props.expires)}</>
                        )}

                        { props.state === WalletSubscriptionState.EXPIRED && (
                            <>Expired on {displayDate(props.expires)}</>
                        )}

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
        subscription.state === WalletSubscriptionState.RETRYING ||
        subscription.state === WalletSubscriptionState.CANCELED
    );

    const expiredSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.EXPIRED
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