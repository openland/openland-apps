import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { StripeCardComponent, StripeCardComponentInstance } from './components/StripeCardComponent';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useClient } from 'openland-web/utils/useClient';

export const SettingsFinanceFragment = React.memo(() => {
    let client = useClient();
    let ref = React.useRef<StripeCardComponentInstance>(null);
    let [loading, setLoading] = React.useState(false);
    let onClick = React.useCallback(() => {
        (async () => {
            setLoading(true);
            try {
                let paymentMethod = await ref.current!.createPaymentMethod();
                console.log(paymentMethod);
            } finally {
                setLoading(false);
            }

        })();
    }, []);
    let cards = client.useMyCards();
    return (
        <Page track="settings_finance">
            <UHeader title="Finance" />
            <XView flexDirection="column">
                {cards.myCards.map((v) => (
                    <XView key={v.id}>**** **** **** {v.last4} | {v.expMonth}/{v.expYear}</XView>
                ))}
                <XView
                    paddingHorizontal={16}
                    paddingVertical={16}
                >
                    <StripeCardComponent ref={ref} />
                </XView>
                <UButton text="Add" onClick={onClick} loading={loading} />
            </XView>
        </Page>
    );
});