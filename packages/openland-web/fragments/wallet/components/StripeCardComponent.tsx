import { canUseDOM } from 'openland-y-utils/canUseDOM';
import * as React from 'react';
import { XView } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';

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

export interface StripeCardProps {
    text: string;
    error?: string;
    loading?: boolean;
    onSubmit?: (stripe: stripe.Stripe, element: stripe.elements.Element) => void;
}

export const StripeCardComponent = React.memo((props: StripeCardProps) => {
    if (!canUseDOM) {
        return null;
    }
    // Create Stripe Instance
    const stripe = React.useMemo(() => Stripe(token), []);

    // Create Elements Factory
    const elements = React.useMemo(() => stripe.elements(), []);

    // Create Card Elements
    const card = React.useMemo(() => elements.create('card', { style: style }), []);

    // Sync Disabled State
    React.useLayoutEffect(() => {
        card.update({ disabled: props.loading });
    }, [props.loading]);

    // Mount Card Elements
    const container = React.useRef<HTMLDivElement>(null);
    React.useLayoutEffect(() => {
        card.mount(container.current);
    }, []);

    // On Submit Callback
    const onSubmit = React.useCallback(() => {
        if (props.onSubmit) {
            props.onSubmit(stripe, card);
        }
    }, [props.onSubmit]);

    return (
        <XView flexDirection="column" alignItems="stretch">
            {props.error && (<XView>{props.error}</XView>)}
            <XView flexDirection="column" alignItems="stretch" height={40} paddingBottom={24} paddingHorizontal={12} >
                <div ref={container} />
            </XView>
            <UButton text={props.text} onClick={onSubmit} loading={props.loading} />
        </XView>
    );
});