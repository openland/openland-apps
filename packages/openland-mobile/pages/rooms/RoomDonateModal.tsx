import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ThemeContext, useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { BrandLogo } from '../wallet/components/BrandLogo';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { GoalBar } from './GoalBar';
import { SRouter } from 'react-native-s/SRouter';
import { showChoosePaymentMethod } from './showChoosePaymentMethod';
import { KeyboardHandlerContainer } from 'openland-mobile/components/KeyboardHandlerContainer';
import { useClient } from 'openland-api/useClient';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';
import { showAddCard } from '../wallet/AddCard';
// import { delay } from 'openland-y-utils/timer';

const showAddPayment = (props: { onSuccess: () => void }) => {
    const builder = new AlertBlanketBuilder();

    builder.title('Add payment method');
    builder.message('To send donation, you have to link credit card to your account');

    builder.view(
        <ThemeContext.Consumer>
            {(theme) => (
                <View style={{ marginBottom: 16, marginHorizontal: -24, overflow: 'hidden' }}>
                    <Image
                        source={
                            theme.type === 'Light'
                                ? require('assets/art-balance.png')
                                : require('assets/art-balance-dark.png')
                        }
                        style={{
                            width: 340,
                            height: 200,
                            alignSelf: 'center',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
            )}
        </ThemeContext.Consumer>,
    );

    builder.button('Cancel', 'cancel');
    builder.button('Continue', 'default', () => props.onSuccess());
    builder.show();
};

export const ZChip = React.memo((props: { value: string, label: string, active?: boolean, onPress: (value: string) => void }) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={() => props.onPress(props.value)}>
            <View
                style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    paddingHorizontal: 24,
                    paddingVertical: 6,
                    borderRadius: 100,
                    backgroundColor: props.active ?
                        (theme.accentPrimary === theme.foregroundContrast
                            ? theme.payBackgroundPrimary : theme.accentPrimary)
                        : theme.backgroundTertiaryTrans,
                }}
            >
                <Text
                    style={{
                        ...TextStyles.Label1,
                        color: props.active ? theme.foregroundContrast : theme.foregroundSecondary
                    }}
                >
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity>
    );
});

const CurrentPaymentMethod = React.memo((props: { brand: string, last4: string, onPress?: () => void }) => {
    const { brand, last4, onPress } = props;
    const theme = useTheme();
    return (
        <ZListItem
            leftIconView={<BrandLogo brand={brand} />}
            text={`${getPaymentMethodName(brand)}, ${last4}`}
            textStyle={TextStyles.Label2}
            rightElement={(
                <Text style={{ ...TextStyles.Label2, color: theme.foregroundTertiary }}>Change</Text>
            )}
            small={true}
            onPress={onPress}
        />
    );
});

type RoomDonateModalProps = {
    description?: string | null;
    totalAmount?: number;
    currentAmount?: number;
    router: SRouter;
};

const RoomDonateModal = React.memo((props: RoomDonateModalProps & { hide: () => void }) => {
    const client = useClient();
    const theme = useTheme();
    const form = useForm();
    const cards = client.useMyCards().myCards;
    const defaultCard = cards.find(c => c.isDefault);
    const initialAmount = '5';
    const amountLabels = ['2', '5', '10', '25', '50', 'Custom'] as const;
    const amountField = useField<typeof amountLabels[number]>('donate.amount', initialAmount, form);
    const customField = useField('donate.custom', initialAmount, form, [
        {
            checkIsValid: value => /^\d+$/.test(value),
            text: 'Digits only'
        },
        {
            checkIsValid: value => value.trim().length <= 7,
            text: 'Too big'
        }
    ]);
    const messageField = useField('donate.message', '', form, [
        {
            checkIsValid: value => value.length <= 200,
            text: 'Up to 200 characters'
        }
    ]);
    const amount = amountField.value === 'Custom'
        ? (customField.input.invalid ? undefined : customField.value)
        : amountField.value;

    const onConfirm = async () => {
        if (!amount || messageField.input.invalid) {
            return;
        }

        if (!defaultCard) {
            showAddPayment({ onSuccess: () => showAddCard({ router: props.router }) });
            return;
        }

        const toast = Toast.loader();
        toast.show();

        try {
            // await delay(2000);
            // throw new Error();
            toast.hide();
            props.hide();
        } catch (e) {
            toast.hide();

            const builder = new AlertBlanketBuilder();
            builder.title('Transaction failed');
            builder.message('Please update your payment method');
            builder.button('Open wallet', undefined, () => props.router.push('Wallet'));
            builder.show();
        }
        // await Promise.all([
        //     client.mutateVoiceChatUpdate({ id: props.id, input: { title: titleValue } }),
        //     client.refetchVoiceChat({ id: props.id }),
        // ]);
    };

    React.useEffect(() => {
        if (customField.input.invalid) {
            customField.input.onChange(initialAmount);
        }
    }, [amountField.value]);

    return (
        <KeyboardHandlerContainer>
            <View style={{ paddingHorizontal: 16, }}>
                {props.description ? (
                    <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary, marginBottom: 15 }}>
                        {props.description}
                    </Text>
                ) : null}
                {props.currentAmount && props.totalAmount ? (
                    <View style={{ marginBottom: 19 }}>
                        <GoalBar totalAmount={props.totalAmount} currentAmount={props.currentAmount} />
                    </View>
                ) : null}
                <View
                    style={{
                        marginBottom: 12,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                >
                    {amountLabels.map(value => (
                        <View style={{ marginRight: 12, marginBottom: 12 }}>
                            <ZChip
                                label={value !== 'Custom' ? `$${value}` : value}
                                value={value}
                                active={amountField.value === value}
                                onPress={amountField.input.onChange}
                            />
                        </View>
                    ))}
                </View>
            </View>
            {amountField.value === 'Custom' ? (
                <ZInput placeholder="Donation amount, $" field={customField} />
            ) : null}
            <ZInput placeholder="Message (optional)" field={messageField} multiline={true} />
            {defaultCard && (
                <CurrentPaymentMethod brand={defaultCard.brand} last4={defaultCard.last4} onPress={() => showChoosePaymentMethod({ router: props.router })} />
            )}
            < View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <ZButton style="pay" size="large" title={amount ? `Send $${amount}` : 'Send'} action={onConfirm} />
            </View>
        </KeyboardHandlerContainer >
    );
});

export const showRoomDonate = (props: RoomDonateModalProps & { title?: string }) => {
    showBottomSheet({
        title: props.title || 'Donate',
        cancelable: true,
        scrollViewProps: { keyboardShouldPersistTaps: 'handled' },
        view: (ctx) => <RoomDonateModal {...props} hide={ctx.hide} />,
    });
};
