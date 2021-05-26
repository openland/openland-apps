import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView, XViewRouterContext } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showAddCard } from './showAddCard';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { Alert } from 'react-native';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import AddIcon from 'openland-icons/s/ic-add-24.svg';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { css } from 'linaria';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { AlertBlanketComponent } from 'openland-x/AlertBlanketComponent';
import { useTheme } from 'openland-x-utils/useTheme';

const ConfirmPaymentComponent = React.memo((props: { ctx: XModalController } & PaymentProps) => {
    let client = useClient();
    let cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    const [cancelable, setCancelable] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);
    const onSubmit = React.useCallback(async () => {
        try {
            setLoading(true);
            props.ctx.setOnEscPressed(() => false);
            setCancelable(false);
            await props.action();
            props.ctx.hide();
        } catch (e) {
            // TODO: handle errors gracefully
            setLoading(false);
            Alert.alert(e.message);
        } finally {
            setCancelable(true);
            props.ctx.setOnEscPressed(props.ctx.hide);
        }
    }, []);

    return (
        <XView paddingHorizontal={8}>
            <XView marginHorizontal={16} marginVertical={20} {...TextStyles.Title1}>
                Payment
            </XView>
            <XView paddingHorizontal={16}>
                {props.productTitle && (
                    <XView flexDirection="row" alignItems="center">
                        <XView flexDirection="column" flexGrow={1}>
                            <XView
                                {...TextStyles.Title3}
                                color="var(--foregroundPrimary)"
                                marginBottom={4}
                            >
                                {props.productTitle}
                            </XView>
                            {props.productDescription && (
                                <XView {...TextStyles.Body} color="var(--foregroundSecondary)">
                                    {props.productDescription}
                                </XView>
                            )}
                        </XView>
                        {props.productPicture}
                    </XView>
                )}
                {props.productView}
                <XView
                    {...TextStyles.Title3}
                    color="var(--foregroundPrimary)"
                    marginBottom={4}
                    marginTop={20}
                >
                    {`${formatMoney(props.amount)} ${
                        props.type === 'payment'
                            ? ''
                            : props.interval === WalletSubscriptionInterval.MONTH
                            ? ' / mo'
                            : props.interval === WalletSubscriptionInterval.WEEK
                            ? ' / wk'
                            : ' / /?'
                    }`}
                </XView>
                {props.productDescription && (
                    <XView {...TextStyles.Body} color="var(--foregroundSecondary)">
                        Amount
                    </XView>
                )}
            </XView>
            {cards.length === 0 && (
                <UListGroup header="Payment method">
                    <UListItem
                        key="add"
                        title="Add card"
                        titleStyle={TextStyles.Label1}
                        leftElement={
                            <XView
                                width={40}
                                height={28}
                                backgroundColor="var(--backgroundTertiaryTrans)"
                                borderRadius={4}
                            >
                                <UIcon icon={<AddIcon />} size={16} />
                            </XView>
                        }
                        onClick={() => showAddCard()}
                        useRadius={true}
                    />
                </UListGroup>
            )}
            <XView
                marginTop={24}
                paddingVertical={16}
                paddingHorizontal={24}
                marginHorizontal={-8}
                backgroundColor="var(--backgroundTertiaryTrans)"
                justifyContent="flex-end"
                flexDirection="row"
            >
                <UButton
                    text="Cancel"
                    disable={!cancelable}
                    onClick={() => props.ctx.hide()}
                    style="tertiary"
                    size="large"
                />
                <UButton
                    disable={cards.length === 0}
                    text="Confirm"
                    action={onSubmit}
                    style="primary"
                    size="large"
                    loading={loading}
                />
            </XView>
        </XView>
    );
});

const warningContainer = css`
    background: url(https://cdn.openland.com/shared/art/art-wait.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-wait.png) 1x, url(https://cdn.openland.com/shared/art/art-wait@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-wait@3x.png) 3x);
    height: 200px;
    margin: -8px 0 20px;
`;

const warningContainerDark = css`
    background: url(https://cdn.openland.com/shared/art/art-wait-dark.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-wait-dark.png) 1x, url(https://cdn.openland.com/shared/art/art-wait-dark@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-wait-dark@3x.png) 3x);
    height: 200px;
    margin: -8px 0 20px;
`;

const CheckLock = React.memo((props: { ctx: XModalController; onContinue?: () => void }) => {
    const builder = new AlertBlanketBuilder();
    let router = React.useContext(XViewRouterContext);
    const warningContainerClass =
        useTheme().theme === 'dark' ? warningContainerDark : warningContainer;

    builder.message(
        'Update payment method to complete previously failed transactions and enable new purchases',
    );
    builder.body((ctx) => <div className={warningContainerClass} />);
    builder.action('Continue', async () => {
        router?.navigate('/wallet');
        if (props.onContinue) {
            props.onContinue();
        }
    });
    builder.onCancel(props.ctx.hide);
    builder.width(480);
    return (
        <XView>
            <XView marginHorizontal={24} marginVertical={20} {...TextStyles.Title1}>
                Update payment method
            </XView>
            <AlertBlanketComponent builder={builder} controller={props.ctx} />
        </XView>
    );
});

const PayConfirm = React.memo((props: { ctx: XModalController } & PaymentProps) => {
    let wallet = useClient().useMyWallet();
    if (wallet.myWallet.isLocked) {
        return <CheckLock ctx={props.ctx} />;
    }
    return <ConfirmPaymentComponent {...props} />;
});

type PaymentProps = {
    amount: number;
    productTitle?: string;
    productDescription?: string;
    productPicture?: JSX.Element;
    productView?: JSX.Element;
    action: () => void;
} & ({ type: 'payment' } | { type: 'subscription'; interval: WalletSubscriptionInterval });

export function showPayConfirm(props: PaymentProps) {
    showModalBox({}, (ctx) => {
        return <PayConfirm ctx={ctx} {...props} />;
    });
}

export function showCheckLock(props?: { onContinue?: () => void }) {
    showModalBox({}, (ctx) => {
        return <CheckLock ctx={ctx} {...props} />;
    });
}
