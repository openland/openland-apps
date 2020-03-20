import * as React from 'react';
import { WalletSubscriptionState, Subscriptions_subscriptions_product } from 'openland-api/spacex.types';
import { XView, XViewRouter } from 'react-mental';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextTitle2, TextBody, TextCaption } from 'openland-web/utils/TextStyles';
import { css, cx } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { OpenlandClient } from 'openland-api/spacex';
import { SubscriptionConverted, displaySubscriptionDate } from 'openland-y-utils/wallet/subscription';
import { XModalController } from 'openland-x/showModal';

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
    cursor: pointer;
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
    cursor: pointer;
`;

const modalFooter = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    text-align: center;
`;

const descriptionBox = css`
    text-align: center;
`;

const onProductClick = (product: Subscriptions_subscriptions_product, router: XViewRouter, modalCtx: XModalController) => {
    modalCtx.hide();
    if (product.__typename === 'WalletProductGroup') {
        router.navigate(`/mail/${product.group.id}`);
    }
};

export const showSubscription = (props: SubscriptionConverted, client: OpenlandClient, router: XViewRouter) => {
    showModalBox({ title: 'Subscription', useTopCloser: true }, (ctx) => {
        return (
            <>
                <div onClick={() => onProductClick(props.product, router, ctx)} className={props.state === WalletSubscriptionState.STARTED ? gradientModalBody : modalBody}>
                    {props.id && props.title && <UAvatar
                        id={props.id}
                        title={props.title}
                        photo={props.photo}
                        size='xx-large'
                    />}
                    <XView marginTop={16}>
                        <h2 className={TextTitle2}>
                            {props.title}
                        </h2>
                    </XView>
                    <XView marginTop={8} color="var(--foregroundSecondary)">
                        <span className={cx(TextBody, descriptionBox)}>
                            {props.amountSubtitle}
                        </span>
                    </XView>
                </div>

                {![WalletSubscriptionState.CANCELED, WalletSubscriptionState.EXPIRED].includes(props.state) && (
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
                                If you cancel now, you can still access<br />the group until {displaySubscriptionDate(props.expires)}
                            </span>
                        </XView>
                    </div>
                )}
            </>
        );
    });
};