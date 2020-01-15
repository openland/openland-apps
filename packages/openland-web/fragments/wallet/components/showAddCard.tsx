import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import uuid from 'uuid';
import { backoff } from 'openland-y-utils/timer';
import { useClient } from 'openland-web/utils/useClient';
import { XView } from 'react-mental';
import { StripeCardComponent } from './StripeCardComponent';

const AddCardComponent = React.memo((props: { ctx: XModalController }) => {
    let client = useClient();
    let [loading, setLoading] = React.useState(false);
    let [error, setError] = React.useState<string | undefined>(undefined);
    let submit = React.useCallback((stripe: stripe.Stripe, element: stripe.elements.Element) => {
        (async () => {
            setLoading(true);
            try {
                // Create Intent
                let retryKey = uuid();
                let intent = (await backoff(async () => client.mutateCreateCardSetupIntent({ retryKey }))).cardCreateSetupIntent;

                // Confirm Card
                let method = await backoff(async () => (stripe as any).confirmCardSetup(intent.clientSecret, {
                    payment_method: {
                        card: element
                    }
                }));
                if (method.error) {
                    setError(method.error.message);
                    return;
                }
                let pmid = method.setupIntent!.payment_method! as string;

                // Commit Intent
                await backoff(() => client.mutateCommitCardSetupIntent({ id: intent.id, pmid }));

                // Refetch Cards
                await backoff(() => client.refetchMyCards());
                setError(undefined);
                props.ctx.hide();
            } catch (e) {
                console.warn(e);
                setError('Unknown error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <XView
            paddingHorizontal={16}
            paddingVertical={16}
        >
            <StripeCardComponent
                text="Add Card"
                onSubmit={submit}
                loading={loading}
                error={error}
            />
        </XView>
    );
});

export function showAddCard() {
    showModalBox({ title: 'Add Card' }, (ctx) => {
        return (
            <AddCardComponent ctx={ctx} />
        );
    });
}