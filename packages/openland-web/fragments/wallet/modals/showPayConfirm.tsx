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
            <XView marginHorizontal={16} marginVertical={20} {...TextStyles.Title1}>Payment</XView>
            <XView paddingHorizontal={16}>
                {props.productTitle && <XView flexDirection="row" alignItems="center">
                    <XView flexDirection="column" flexGrow={1}>
                        <XView {...TextStyles.Title3} color="var(--foregroundPrimary)" marginBottom={4}>{props.productTitle}</XView>
                        {props.productDescription && <XView {...TextStyles.Body} color="var(--foregroundSecondary)">{props.productDescription}</XView>}
                    </XView>
                    {props.productPicture}
                </XView>}
                {props.productView}
                <XView {...TextStyles.Title3} color="var(--foregroundPrimary)" marginBottom={4} marginTop={20}>{`${formatMoney(props.amount)} ${props.type === 'payment' ? '' : props.interval === WalletSubscriptionInterval.MONTH ? ' / mo.' : props.interval === WalletSubscriptionInterval.WEEK ? ' / w.' : ' / /?'}`}</XView>
                {props.productDescription && <XView {...TextStyles.Body} color="var(--foregroundSecondary)">Amount</XView>}

            </XView>
            {(cards.length === 0) && (
                <UListGroup header="Payment method">
                    <UListItem
                        key="add"
                        title="Add card"
                        titleStyle={TextStyles.Label1}
                        leftElement={<XView width={40} height={28} backgroundColor="var(--backgroundTertiaryTrans)" borderRadius={4}><UIcon icon={<AddIcon />} size={16} /></XView>}
                        onClick={() => showAddCard()}
                        useRadius={true}
                    />
                </UListGroup>
            )}
            <XView marginTop={24} paddingVertical={16} paddingHorizontal={24} marginHorizontal={-8} backgroundColor="var(--backgroundTertiary)" justifyContent="flex-end" flexDirection="row">
                <UButton text="Cancel" disable={!cancelable} onClick={() => props.ctx.hide()} style="secondary" size="large" />
                <UButton disable={cards.length === 0} text="Confirm" action={onSubmit} style="primary" size="large" loading={loading} />
            </XView>
        </XView>
    );
});

const warningContainer = css`
    background: url(https://cdn.openland.com/shared/art/art-failing-transactions.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-failing-transactions.png) 1x, url(https://cdn.openland.com/shared/art/art-failing-transactions@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-failing-transactions@3x.png) 3x);
    height: 200px;
    margin: -8px 0 20px;
`;

export const showNoiseWarning = async (title: string, message: string) => {
    return new Promise((resolve, reject) => {
        const builder = new AlertBlanketBuilder();

        builder.title(title);
        builder.message(message);
        builder.body(ctx => <div className={warningContainer} />);
        builder.action('Continue', async () => { resolve(); }, 'danger');
        builder.onCancel(reject);
        builder.width(480);
        builder.show();
    });
};

const CheckLock = React.memo((props: { ctx: XModalController } & PaymentProps) => {
    let wallet = useClient().useMyWallet();
    let router = React.useContext(XViewRouterContext);
    if (wallet.myWallet.isLocked) {
        const builder = new AlertBlanketBuilder();

        builder.message("Complete all failed transactions in Wallet to keep subscribing to premium groups");
        builder.body(ctx => <div className={warningContainer} />);
        builder.action('Continue', async () => router?.navigate('/wallet'));
        builder.onCancel(props.ctx.hide);
        builder.width(480);
        return (
            <XView>
                <XView marginLeft={20} marginTop={24} marginBottom={-20} {...TextStyles.Title1}>You have failed transactions</XView>
                <AlertBlanketComponent builder={builder} controller={props.ctx} />
            </XView>
        );
    }
    return <ConfirmPaymentComponent {...props} />;
});

type PaymentProps = {
    amount: number;
    productTitle?: string;
    productDescription?: string;
    productPicture?: JSX.Element;
    productView?: JSX.Element;
    action: () => void
} & ({ type: 'payment' } | { type: 'subscription', interval: WalletSubscriptionInterval });
export function showPayConfirm(props: PaymentProps) {
    showModalBox({}, (ctx) => {
        return (
            <CheckLock ctx={ctx} {...props} />
        );
    });
}