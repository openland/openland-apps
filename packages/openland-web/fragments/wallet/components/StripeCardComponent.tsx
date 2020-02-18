import { canUseDOM } from 'openland-y-utils/canUseDOM';
import * as React from 'react';
import { XView } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalController } from 'openland-x/showModal';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import LockIcon from 'openland-icons/s/ic-lock-16.svg';
import { MessengerContext } from 'openland-engines/MessengerEngine';

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
    modalCtx?: XModalController;
}

export const StripeCardComponent = React.memo((props: StripeCardProps) => {
    const { text, error, loading, onSubmit, modalCtx } = props;
    const token = React.useContext(MessengerContext).wallet.token;

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
        card.update({ disabled: loading });
    }, [loading]);

    // Mount Card Elements
    const container = React.useRef<HTMLDivElement>(null);
    React.useLayoutEffect(() => {
        card.mount(container.current);
    }, []);

    // On Submit Callback
    const handleSubmit = React.useCallback(() => {
        if (onSubmit) {
            onSubmit(stripe, card);
        }
    }, [onSubmit]);

    return (
        <XView>
            <XView
                paddingTop={12}
                paddingHorizontal={24}
            >
                <XView flexDirection="column" alignItems="stretch" height={40} paddingHorizontal={12} paddingVertical={10} backgroundColor="var(--backgroundTertiary)" borderRadius={4}>
                    <div ref={container} />
                </XView>
                {error && (<XView marginTop={8} marginHorizontal={16} color="var(--accentNegative)" {...TextStyles.Caption}>{error}</XView>)}
                {!modalCtx && <UButton text={text} onClick={handleSubmit} loading={loading} />}
            </XView>
            {!!modalCtx && (
                <XView marginTop={24} paddingVertical={16} paddingHorizontal={24} backgroundColor="var(--backgroundTertiary)" justifyContent="flex-end" flexDirection="row">
                    <XView flexGrow={1} alignSelf="center" color="var(--accentPositive)" {...TextStyles.Subhead} flexDirection="row">
                        <XView marginRight={8} opacity={0.72}>
                            <UIcon icon={<LockIcon />} color="var(--accentPositive)" />
                        </XView>
                        Powered by Stripe
                    </XView>
                    <UButton text="Cancel" onClick={() => modalCtx.hide()} style="secondary" size="large" />
                    <UButton text={text} onClick={handleSubmit} loading={loading} size="large" />
                </XView>
            )}
        </XView>
    );
});