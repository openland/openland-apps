import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showAddCard } from './showAddCard';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { Alert } from 'react-native';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { WalletSubscriptionInterval } from 'openland-api/Types';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import AddIcon from 'openland-icons/s/ic-add-24.svg';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { BrandLogo } from './BrandLogo';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { URadioDot } from 'openland-web/components/unicorn/URadioItem';
const ConfirmPaymentComponent = React.memo((props: { ctx: XModalController } & PaymentProps) => {
    let client = useClient();
    let cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    // let failing = cards.find(c => c.isDefault && c.isFailng);
    let failing = false;
    const [selectedCard, selectCard] = React.useState<string | undefined>(undefined);
    const [cancelable, setCancelable] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);
    const onSubmit = React.useCallback(async () => {
        try {
            setLoading(true);
            props.ctx.setOnEscPressed(() => false);
            setCancelable(false);
            if (selectedCard) {
                // TODO set selected card as default
            }
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
        <XView flexDirection="column">
            <XView paddingHorizontal={24}>
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
            {(cards.length === 0 || failing) && <UListGroup
                header="Payment method"
                action={cards.length > 0 ? { title: 'Add card', onClick: () => showAddCard() } : undefined}
            >
                {cards.map(card => (
                    <UListItem
                        key={card.id}
                        paddingHorizontal={24}
                        title={getPaymentMethodName(card.brand)}
                        titleStyle={TextStyles.Label1}
                        icon={<BrandLogo brand={card.brand} />}
                        onClick={() => selectCard(card.id)}
                        rightElement={(<URadioDot checked={card.id === selectedCard} />)}
                    />
                ))}
                <UListItem
                    key="add"
                    paddingHorizontal={24}
                    title="Add card"
                    titleStyle={TextStyles.Label1}
                    icon={<XView backgroundColor="var(--backgroundTertiary)" width={40} height={28} borderRadius={4}><UIcon icon={<AddIcon width={16} height={16} color="var(--foregroundSecondary)" />} /></XView >}
                    onClick={() => showAddCard()}
                />
            </UListGroup>}
            <XView marginTop={24} paddingVertical={16} paddingHorizontal={24} backgroundColor="var(--backgroundTertiary)" justifyContent="flex-end" flexDirection="row">
                <UButton text="Cancel" disable={!cancelable} onClick={() => props.ctx.hide()} style="secondary" size="large" />
                <UButton disable={cards.length === 0 || (failing && !selectedCard)} text="Confirm" action={onSubmit} style="primary" size="large" loading={loading} />
            </XView>
        </XView>
    );
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
    showModalBox({ title: 'Payment' }, (ctx) => {
        return (
            <ConfirmPaymentComponent ctx={ctx} {...props} />
        );
    });
}