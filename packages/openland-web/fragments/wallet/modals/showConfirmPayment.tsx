import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { backoff } from 'openland-y-utils/timer';
import { showAddCard } from './showAddCard';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import AddIcon from 'openland-icons/s/ic-add-24.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { BrandLogo } from '../components/BrandLogo';
import { URadioDot } from 'openland-web/components/unicorn/URadioItem';
import { MessengerContext } from 'openland-engines/MessengerEngine';

const defaultError = 'We are unable to authenticate your payment method. Please choose a different payment method and try again.';

const ConfirmPaymentComponent = React.memo((props: { ctx: XModalController, id: string, clientSecret: string }) => {
    let client = useClient();
    let cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    let [currentCard, setCurrentCard] = React.useState<string | undefined>(undefined);
    let [error, setError] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState(false);
    const token = React.useContext(MessengerContext).wallet.token;
    if (currentCard === undefined) {
        if (cards.length > 0) {
            setCurrentCard(cards[0].pmid);
        }
    } else {
        let found = false;
        for (let c of cards) {
            if (c.pmid === currentCard) {
                found = true;
            }
        }
        if (!found) {
            setCurrentCard(undefined);
        }
    }
    const onSubmit = React.useCallback(() => {
        if (currentCard) {
            (async () => {
                setLoading(true);

                try {
                    const stripe = Stripe(token);

                    // Create deposit intent
                    // let retry = uuid();
                    // let intent = await backoff(async () =>
                    //     await client.mutateCreateDepositIntent({ amount: amount, cardId: currentCard!, retryKey: retry })
                    // );

                    // Confirming card payment
                    let res = await (stripe as any).confirmCardPayment(props.clientSecret, { payment_method: currentCard! });

                    // Error during confirmation
                    if (res.error) {
                        setError(res.error.message);
                        setLoading(false);
                        return;
                    }

                    // Unknown state/error
                    if (!res.paymentIntent || res.paymentIntent.status !== 'succeeded') {
                        setError(defaultError);
                        setLoading(false);
                        return;
                    }

                    // Report commit to backend
                    await backoff(async () =>
                        await client.mutatePaymentIntentCommit({ id: props.id })
                    );

                    // Exit
                    props.ctx.hide();
                } catch (e) {

                    // Unknown exception
                    console.warn(e);
                    setError(defaultError);
                    setLoading(false);
                    return;
                }
            })();
        }
    }, [currentCard]);

    return (
        <>
            <XView
                {...TextStyles.Body}
                marginTop={-4}
                paddingHorizontal={24}
                paddingBottom={20}
            >
                Choose correct payment method or add a new one to complete transaction
            </XView>
            <XView paddingHorizontal={8}>
                {cards.map(card => (
                    <UListItem
                        leftElement={<BrandLogo brand={card.brand} border={true} />}
                        title={`${getPaymentMethodName(card.brand)}, ${card.last4}`}
                        description={`Valid to ${card.expMonth}/${card.expYear.toString().slice(-2)}`}
                        useRadius={true}
                        onClick={() => { setCurrentCard(card.pmid); }}
                        rightElement={<XView marginRight={8}><URadioDot checked={currentCard === card.pmid} /></XView>}
                    />
                ))}
                <UListItem
                    leftElement={<XView width={40} height={28} backgroundColor="var(--backgroundTertiaryTrans)" borderRadius={4}><UIcon icon={<AddIcon />} size={16} /></XView>}
                    title="Add card"
                    onClick={() => showAddCard()}
                    useRadius={true}
                    titleStyle={TextStyles.Label1}
                />
                {error && (<XView marginTop={8} marginHorizontal={16} color="var(--accentNegative)" {...TextStyles.Caption}>{error}</XView>)}
            </XView>
            <XView marginTop={24} paddingVertical={16} paddingHorizontal={24} backgroundColor="var(--backgroundTertiary)" justifyContent="flex-end" flexDirection="row">
                <UButton text="Cancel" onClick={() => props.ctx.hide()} style="tertiary" size="large" />
                <UButton text="Continue" style="pay" onClick={onSubmit} size="large" loading={loading} />
            </XView>
        </>
    );
});

export function showConfirmPayment(id: string, clientSecret: string) {
    showModalBox({ title: 'Update payment method', width: 400 }, (ctx) => {
        return (
            <ConfirmPaymentComponent ctx={ctx} id={id} clientSecret={clientSecret} />
        );
    });
} 