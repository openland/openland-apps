import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { UInputErrorText } from 'openland-web/components/unicorn/UInput';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import MinusIcon from 'openland-icons/s/ic-minus-24.svg';
import PlusIcon from 'openland-icons/s/ic-plus-24.svg';
import { css, cx } from 'linaria';
import { TextTitle1 } from 'openland-web/utils/TextStyles';
import { useShake } from 'openland-web/pages/auth/components/authComponents';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { URickInput } from 'openland-web/components/unicorn/URickInput';
import { useClient } from 'openland-api/useClient';
import { showCheckLock } from 'openland-web/fragments/wallet/modals/showPayConfirm';
import { useToast } from 'openland-web/components/unicorn/UToast';

let priceWrapper = css`
    display: flex;
    padding: 16px;
    border-radius: 8px;
    flex-direction: row;
    flex-shrink: 0;
    background-color: var(--backgroundTertiaryTrans);
`;

let priceClass = css`
    text-align: center;
    color: var(--foregroundPrimary);
    width: 208px;

    &::placeholder {
        color: var(--foregroundTertiary);
    }
`;

let messageClass = css`
    margin-top: 16px;
`;

interface DonationComponentProps {
    initialPrice?: number;
    chatId?: string;
    userId?: string;
    onDonate?: (value: string) => void;
    onWalletLockedContinue?: () => void;
}

const DonationComponent = (props: DonationComponentProps & { ctx: XModalController }) => {
    let client = useClient();
    let wallet = client.useMyWallet();
    let form = useForm();
    let inputRef = React.useRef<HTMLInputElement>(null);
    let donateRef = React.useRef<HTMLInputElement>(null);
    let initialPrice = props.initialPrice ? String(props.initialPrice) : '';
    let priceField = useField<string>('price', initialPrice, form, [
        {
            checkIsValid: x => {
                return /^[0-9]*$/.test(x);
            },
            text: 'Numbers only',
        },
        {
            checkIsValid: x => {
                return Number(x) <= 1000;
            },
            text: '$1000 maximum',
        },
    ]);
    let price = priceField.value;

    let handlePriceChange = (value: string) => {
        priceField.input.onChange(value.replace(/\$/, ''));
    };
    let updatePrice = (value: number) => {
        let current = price ? parseInt(price, 10) : 0;
        let newPrice = current + value;
        if (newPrice > 0) {
            handlePriceChange(String(newPrice));
        } else {
            handlePriceChange('');
        }
    };
    let messageField = useField('message', '', form);

    let [shakeClassName, shake] = useShake();
    let [loading, setLoading] = React.useState(false);

    let handleSubmit = () => {
        if (price.trim() === '' || price === '0') {
            shake();
            if (inputRef.current) {
                inputRef.current.focus();
            }
            return;
        }
        if (priceField.input.invalid) {
            return;
        }
        form.doAction(async () => {
            let amount = parseInt(priceField.value, 10) * 100;
            try {
                setLoading(true);
                await client.mutateSendDonation({ chatId: props.chatId, userId: props.userId, amount, message: messageField.value });
                if (props.onDonate) {
                    props.onDonate(priceField.value);
                }
                props.ctx.hide();
            } catch (e) {
                if (wallet.myWallet.isLocked) {
                    showCheckLock({ onContinue: props.onWalletLockedContinue });
                    props.ctx.hide();
                }
                setLoading(false);
            }
        });
    };

    React.useLayoutEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const onMessageTab = React.useCallback(() => {
        setTimeout(() => {
            if (donateRef.current) {
                donateRef.current.focus();
            }
        }, 50);
        return true;
    }, [donateRef.current]);

    return (
        <XView paddingTop={12} flexDirection="column" flexShrink={'initial' as any}>
            <XView paddingHorizontal={24} paddingBottom={24} flexGrow={1} flexDirection="column" flexShrink={'initial' as any}>
                <div className={cx(priceWrapper, shakeClassName)}>
                    <UIconButton icon={<MinusIcon />} onClick={() => updatePrice(-5)} />
                    <XView flexGrow={1} justifyContent="center" marginHorizontal={16}>
                        <input
                            tabIndex={0}
                            ref={inputRef}
                            className={cx(TextTitle1, priceClass)}
                            placeholder="$0"
                            value={price ? `$${price}` : ''}
                            onChange={e => handlePriceChange(e.target.value)}
                        />
                    </XView>
                    <UIconButton icon={<PlusIcon />} onClick={() => updatePrice(5)} />
                </div>
                {priceField.input.errorText && (
                    <UInputErrorText text={priceField.input.errorText} />
                )}
                <URickInput
                    placeholder="Your message"
                    onTextChange={messageField.input.onChange}
                    onPressTab={onMessageTab}
                    hideEmoji={true}
                    className={messageClass}
                />
            </XView>
            <XView
                paddingHorizontal={24}
                paddingVertical={16}
                flexDirection={'row-reverse' as any}
                justifyContent="flex-start"
                backgroundColor="var(--backgroundTertiary)"
            >
                <UButton text="Donate" ref={donateRef} style="pay" size="large" shape="square" tabIndex={0} loading={loading} onClick={handleSubmit} />
                <UButton text="Cancel" style="tertiary" size="large" shape="square" tabIndex={0} onClick={() => props.ctx.hide()} />
            </XView>
        </XView>
    );
};

export const useDonationModal = (props: DonationComponentProps & { name?: string | null }) => {
    const toastHandlers = useToast();
    const onDonate = (value: string) => {
        if (props.onDonate) {
            props.onDonate(value);
        }
        toastHandlers.show({
            type: 'success',
            text: `You’ve donated $${value}`,
        });
    };

    return React.useCallback(() => {
        showModalBox({ title: props.name ? `Donate to ${props.name}` : 'Donate', titleTruncation: true, width: 400 }, (ctx) => {
            return (
                <DonationComponent ctx={ctx} {...props} onDonate={onDonate} />
            );
        });
    }, [props.chatId, props.userId]);
};
