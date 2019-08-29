import { canUseDOM } from 'openland-y-utils/canUseDOM';
import * as React from 'react';

const token = 'pk_test_y80EsXGYQdMKMcJ5lifEM4jx';

export const StripeCardComponent = React.memo(() => {
    if (!canUseDOM) {
        return null;
    }
    const stripe = Stripe(token);
    var elements = stripe.elements();
    var style = {
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

    const container = React.useRef<HTMLDivElement>(null);
    React.useLayoutEffect(() => {
        var card = elements.create('card', { style: style });
        card.mount(container.current);
    }, []);

    return <div ref={container} />;
});