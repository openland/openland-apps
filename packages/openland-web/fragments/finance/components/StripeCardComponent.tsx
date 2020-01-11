import { canUseDOM } from 'openland-y-utils/canUseDOM';
import * as React from 'react';
import { backoff } from 'openland-y-utils/timer';

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

    let stripe = React.useMemo(() => Stripe(token), []);
    let elements = React.useMemo(() => stripe.elements(), []);
    let card = React.useMemo(() => elements.create('card', { style: style }), []);
    let container = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        card.mount(container.current);
    }, []);

    React.useImperativeHandle(ref, () => ({
        createPaymentMethod: async () => {
            let method = await backoff(async () => stripe.createPaymentMethod('card', card));
            if (method.error) {
                return method.error;
            } else {
                return method.paymentMethod!.id;
            }
        }
    }));

    return <div ref={container} />;
}));