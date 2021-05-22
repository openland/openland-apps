import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-api/useClient';
import { WalletSubscriptionState } from 'openland-api/spacex.types';
import { XView, XViewRouterContext } from 'react-mental';
import { TextTitle1, TextTitle3, TextBody } from 'openland-web/utils/TextStyles';
import { FormSection } from '../settings/components/FormSection';
import { FormWrapper } from '../settings/components/FormWrapper';
import { css } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import Warning from 'openland-icons/ic-warning-24.svg';
import { SubscriptionView } from './components/SubscriptionView';
import { convertSubscription } from 'openland-y-utils/wallet/subscription';
import { useThemeSuffix } from 'openland-x-utils/useTheme';

const billingProblems = css`
    display: flex;
    
    background: linear-gradient(180deg, rgba(242, 243, 245, 0.56) 0%, #F2F3F5 100%);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 32px;

    & .x {
        flex-shrink: 1;
    }

    & svg {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        margin-right: 16px;
    }
`;

const empty = css`
    height: 80vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SubscriptionsFragment = React.memo(() => {
    const client = useClient();
    const subscriptions = client.useSubscriptions();
    const router = React.useContext(XViewRouterContext)!;
    const themeSuffix = useThemeSuffix();
    const normalizedSubscriptions = subscriptions.subscriptions.map(convertSubscription);

    const activeSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.STARTED ||
        subscription.state === WalletSubscriptionState.GRACE_PERIOD ||
        subscription.state === WalletSubscriptionState.RETRYING ||
        subscription.state === WalletSubscriptionState.CANCELED
    );

    const expiredSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.EXPIRED
    );

    const haveBillingProblems = normalizedSubscriptions.filter(
        subscription =>
            subscription.state === WalletSubscriptionState.RETRYING ||
            subscription.state === WalletSubscriptionState.GRACE_PERIOD
    ).length > 0;

    return (
        <Page track="settings_subscriptions">
            <UHeader title="Subscriptions" />

            <FormWrapper>

                {haveBillingProblems && (
                    <div className={billingProblems}>
                        <Warning />
                        <XView flexDirection="column" alignItems="flex-start">
                            <XView>
                                <h2 className={TextTitle3}>Billing problem</h2>
                            </XView>
                            <XView color="var(--foregroundSecondary)" marginTop={2}>
                                <p className={TextBody}>
                                    A payment for some of your recent purchases or subscriptions has recently failed. Please update your payment method to keep your paid group memberships.
                                </p>
                            </XView>
                            <XView marginTop={8}>
                                <UButton text="Update payment method" onClick={() => router.navigate('/wallet')} />
                            </XView>
                        </XView>
                    </div>
                )}

                {activeSubscriptions.length > 0 && (
                    <FormSection title="Active">
                        {activeSubscriptions.map(subscription => (
                            <SubscriptionView
                                key={subscription.id}
                                {...subscription}
                            />
                        ))}
                    </FormSection>
                )}

                {expiredSubscriptions.length > 0 && (
                    <FormSection title="Expired">
                        {expiredSubscriptions.map(subscription => (
                            <SubscriptionView
                                key={subscription.id}
                                {...subscription}
                            />
                        ))}
                    </FormSection>
                )}

                {activeSubscriptions.length === 0 && expiredSubscriptions.length === 0 && (
                    <div className={empty}>
                        <XView justifyContent="center" alignItems="center">
                            <img
                                width="320"
                                height="200"
                                src={`//cdn.openland.com/shared/art/art-shared${themeSuffix}.png`}
                                srcSet={`//cdn.openland.com/shared/art/art-shared${themeSuffix}@2x.png 2x, //cdn.openland.com/shared/art/art-shared${themeSuffix}@3x.png 3x`}
                                alt=""
                            />
                            <XView marginBottom={8} color="var(--foregroundPrimary)">
                                <span className={TextTitle1}>
                                    No subscriptions yet
                                </span>
                            </XView>
                            <XView color="var(--foregroundSecondary)">
                                <p className={TextBody}>
                                    Join any premium groups, and they will appear here
                                </p>
                            </XView>
                            <XView marginTop={32}>
                                <UButton
                                    text="Discover groups"
                                    shape="square"
                                    size="large"
                                    onClick={() => {
                                        router.navigate('/discover/premium');
                                    }}
                                />

                            </XView>
                        </XView>
                    </div>
                )}

            </FormWrapper>
        </Page>
    );
});