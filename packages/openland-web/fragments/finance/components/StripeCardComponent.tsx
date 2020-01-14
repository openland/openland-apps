import { canUseDOM } from 'openland-y-utils/canUseDOM';
import * as React from 'react';
import { backoff } from 'openland-y-utils/timer';
import { useClient } from 'openland-web/utils/useClient';
import uuid from 'uuid';

const token = 'pk_test_y80EsXGYQdMKMcJ5lifEM4jx';
let style = {
    base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
};

export interface StripeCardComponentInstance {
    createPaymentMethod: () => Promise<string | any>;
}

export const StripeCardComponent = React.memo(React.forwardRef((props: {}, ref: React.Ref<StripeCardComponentInstance>) => {
    if (!canUseDOM) {
        return null;
    }
    let client = useClient();
    let stripe = React.useMemo(() => Stripe(token), []);
    let elements = React.useMemo(() => stripe.elements(), []);
    let card = React.useMemo(() => elements.create('card', { style: style }), []);
    let container = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        card.mount(container.current);
    }, []);

    React.useImperativeHandle(ref, () => ({
        createPaymentMethod: async () => {
            // Create Intent
            let retryKey = uuid();
            let intent = (await backoff(async () => client.mutateCreateCardSetupIntent({ retryKey }))).cardCreateSetupIntent;

            // Confirm Card
            let method = await backoff(async () => (stripe as any).confirmCardSetup(intent.clientSecret, {
                payment_method: {
                    card: card
                }
            }));
            if (method.error) {
                return method.error;
            }
            let pmid = method.setupIntent!.payment_method! as string;

            // Commit Intent
            await backoff(() => client.mutateCommitCardSetupIntent({ id: intent.id, pmid }));

            // Refetch Cards
            await backoff(() => client.refetchMyCards());

            return pmid;
        }
    }));

    return <div ref={container} />;
}));