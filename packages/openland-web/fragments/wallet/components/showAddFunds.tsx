import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { USelect } from 'openland-web/components/unicorn/USelect';
import { useClient } from 'openland-web/utils/useClient';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { UButton } from 'openland-web/components/unicorn/UButton';
import uuid from 'uuid';
import { backoff } from 'openland-y-utils/timer';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showAddCard } from './showAddCard';

const token = 'pk_test_y80EsXGYQdMKMcJ5lifEM4jx';

const AddFundsComponent = React.memo((props: { ctx: XModalController }) => {
    let client = useClient();
    let cards = client.useMyCards({ fetchPolicy: 'cache-and-network' });
    let [amount, setAmount] = React.useState<1000 | 2000 | 5000>(1000);
    let [currentCard, setCurrentCard] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState(false);
    if (currentCard === undefined) {
        if (cards.myCards.length > 0) {
            setCurrentCard(cards.myCards[0].id);
        }
    } else {
        let found = false;
        for (let c of cards.myCards) {
            if (c.id === currentCard) {
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

                let retry = uuid();
                let intent = await backoff(async () =>
                    await client.mutateCreateDepositIntent({ amount: amount, cardId: currentCard!, retryKey: retry })
                );
                const stripe = Stripe(token);
                let res = await stripe.confirmPaymentIntent(intent.cardDepositIntent.clientSecret);
                if (res.paymentIntent) {
                    // TODO: handle res.paymentIntent.status

                    await backoff(async () =>
                        await client.mutateDepositIntentCommit({ id: intent.cardDepositIntent.id })
                    );
                    let w = await client.refetchMyWallet();
                    await client.refetchWalletTransactions({ id: w.myAccount.id, first: 20 });

                    setLoading(false);

                    props.ctx.hide();
                }
            })();
        }
    }, [currentCard, amount]);

    return (
        <XView flexDirection="column">
            <XView paddingHorizontal={8}>
                <XView paddingHorizontal={16} paddingTop={12}>
                    <USelect
                        placeholder="Amount"
                        value={amount}
                        searchable={false}
                        options={[
                            { value: 1000, label: '$10' },
                            { value: 2000, label: '$20' },
                            { value: 5000, label: '$50' }
                        ]}
                        onChange={(v) => setAmount((v as any).value)}
                    />
                </XView>
                <UListGroup header="Payment method" action={{ title: 'Add card', onClick: () => showAddCard() }}>
                    {cards.myCards.map((v) => (
                        <XView key={v.id}>
                            <UCheckbox
                                label={v.last4}
                                checked={v.id === currentCard}
                                onChange={(v2) => v2 ? setCurrentCard(v.id) : setCurrentCard(undefined)}
                            />
                        </XView>
                    ))}
                </UListGroup>
            </XView>
            <XView marginTop={24} paddingVertical={16} paddingHorizontal={24} backgroundColor="var(--backgroundTertiary)" justifyContent="flex-end" flexDirection="row">
                <UButton text="Cancel" onClick={() => props.ctx.hide()} style="secondary" size="large" />
                <UButton text={`Top up $${amount / 100}`} onClick={onSubmit} style="pay" size="large" loading={loading} />
            </XView>
        </XView>
    );
});

export function showAddFunds() {
    showModalBox({ title: 'Add funds' }, (ctx) => {
        return (
            <AddFundsComponent ctx={ctx} />
        );
    });
}