import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-api/useClient';
import { Subscriptions_subscriptions_product_WalletSubscriptionProductGroup, WalletSubscriptionState } from 'openland-api/spacex.types';
import { XView, XViewRouterContext, XImage } from 'react-mental';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextLabel1, TextSubhead, TextTitle1, TextTitle2, TextTitle3, TextBody, TextCaption } from 'openland-web/utils/TextStyles';
import { FormSection } from '../account/components/FormSection';
import { FormWrapper } from '../account/components/FormWrapper';
import { css } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { OpenlandClient } from 'openland-api/spacex';
import Warning from 'openland-icons/ic-warning-24.svg';

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

const gradientModalBody = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 12px;
    padding-bottom: 24px;
    padding-left: 24px;
    padding-right: 24px;
    background: linear-gradient(180deg, rgba(201, 204, 209, 0) 0%, rgba(201, 204, 209, 0.14) 100%);
`;

const modalBody = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 12px;
    padding-bottom: 48px;
    padding-left: 24px;
    padding-right: 24px;
`;

const modalFooter = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    text-align: center;
`;

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

function showSubscriptionModal(props: NormalizedSubscription, client: OpenlandClient) {
    showModalBox({ title: 'Subscription', useTopCloser: true }, (ctx) => {
        return (
            <>
                <div className={props.state === WalletSubscriptionState.STARTED ? gradientModalBody : modalBody}>
                    <UAvatar
                        id={props.id}
                        title={props.title}
                        photo={props.photo}
                        size='xx-large'
                    />
                    <XView marginTop={16}>
                        <h2 className={TextTitle2}>
                            {props.title}
                        </h2>
                    </XView>
                    <XView marginTop={8} color="var(--foregroundSecondary)">
                        <span className={TextBody}>
                            {props.state === WalletSubscriptionState.STARTED && (
                                <>Next bill on {displayDate(props.expires)}</>
                            )}

                            {props.state === WalletSubscriptionState.CANCELED && (
                                <>Expires on {displayDate(props.expires)}</>
                            )}

                            {props.state === WalletSubscriptionState.EXPIRED && (
                                <>Expired on {displayDate(props.expires)}</>
                            )}
                        </span>
                    </XView>

                </div>
                {props.state === WalletSubscriptionState.STARTED && (
                    <div className={modalFooter}>
                        <UButton
                            text="Cancel subscription"
                            shape="square"
                            size="large"
                            style="secondary"
                            action={async () => {
                                await client.mutateCancelSubscription({ id: props.subscriptionId });
                                await client.refetchSubscriptions();

                                ctx.hide();
                            }}
                        />
                        <XView marginTop={16} color="var(--foregroundSecondary)">
                            <span className={TextCaption}>
                                If you cancel now, you can still access<br />the group until {displayDate(props.expires)}
                            </span>
                        </XView>
                    </div>
                )}
            </>
        );
    });
}

const SubscriptionView = React.memo((props: NormalizedSubscription) => {
    const router = React.useContext(XViewRouterContext)!;
    const client = useClient();

    return (
        <div
            className={subsciptionView}
            onClick={() => props.state === WalletSubscriptionState.GRACE_PERIOD || props.state === WalletSubscriptionState.RETRYING
                ? router.navigate('/wallet')
                : showSubscriptionModal(props, client)
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

export const SubscriptionsFragment = React.memo(() => {
    const client = useClient();
    const subscriptions = client.useSubscriptions();
    const router = React.useContext(XViewRouterContext)!;
    const groupSubscriptions = subscriptions.subscriptions.filter(subscription => subscription.product.__typename === 'WalletSubscriptionProductGroup');
    const normalizedSubscriptions: NormalizedSubscription[] = groupSubscriptions.map(subscription => {
        const group = (subscription.product as Subscriptions_subscriptions_product_WalletSubscriptionProductGroup).group;

        return {
            ...group,
            subscriptionId: subscription.id,
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
                                <h2 className={TextTitle3}>Billing problems</h2>
                            </XView>
                            <XView color="var(--foregroundSecondary)" marginTop={2}>
                                <p className={TextBody}>
                                    Some transactions for subscriptions are failed. Complete them or add a new card to keep subscriptions ongoing.
                                </p>
                            </XView>
                            <XView marginTop={8}>
                                <UButton text="Open wallet" onClick={() => router.navigate('/wallet')} />
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
                            <XImage
                                marginBottom={16}
                                width={320}
                                height={200}
                                src="/static/X/art-empty.png"
                                srcSet="/static/X/art-empty@2x.png 2x"
                            />
                            <XView marginBottom={8}>
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
                                        router.navigate('/discover/groups');
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