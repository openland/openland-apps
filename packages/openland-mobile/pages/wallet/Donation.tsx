import * as React from 'react';
import { View, Platform, TextInput } from 'react-native';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ZIconAction } from 'openland-mobile/components/ZIconAction';
import { HighlightAlpha, TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { hexToRgba } from 'openland-y-utils/hexToRgba';
import { ZButton } from 'openland-mobile/components/ZButton';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import Toast from 'openland-mobile/components/Toast';
import { ZShaker } from 'openland-mobile/components/ZShaker';

interface PriceInputProps {
    value: string;
    autofocus: boolean;
    onChange: (price: string) => void;
}

const PriceInput = React.forwardRef((props: PriceInputProps, ref: React.RefObject<TextInput>) => {
    let theme = useTheme();
    let value = props.value ? `$${props.value}` : '';
    let handleChangeText = (text: string) => {
        props.onChange(text.replace(/\$/, ''));
    };

    return (
        <TextInput
            ref={ref}
            placeholder="$0"
            placeholderTextColor={hexToRgba(theme.foregroundInverted, 0.48)}
            keyboardAppearance={theme.keyboardAppearance}
            keyboardType="numeric"
            value={value}
            onChangeText={handleChangeText}
            allowFontScaling={false}
            autoFocus={props.autofocus}
            selectionColor={Platform.OS === 'android' ? hexToRgba(theme.foregroundInverted, HighlightAlpha) : theme.foregroundInverted}
            style={{
                ...TextStyles.Large,
                color: theme.foregroundInverted,
                borderWidth: 0,
                height: 40,
                textAlignVertical: 'center',
            }}
            {...{ scrollEnabled: false }}
        />
    );
});

const MessageInput = () => {
    let theme = useTheme();
    let [value, setValue] = React.useState('');

    return (
        <View
            flex={1}
            paddingHorizontal={16}
            paddingVertical={8}
            borderRadius={RadiusStyles.Medium}
            backgroundColor={hexToRgba(theme.foregroundInverted, 0.08)}
            minHeight={48}
        >
            <TextInput
                placeholder="Your message"
                placeholderTextColor={hexToRgba(theme.foregroundInverted, 0.48)}
                keyboardAppearance={theme.keyboardAppearance}
                value={value}
                onChangeText={setValue}
                allowFontScaling={false}
                multiline={true}
                selectionColor={Platform.OS === 'android' ? hexToRgba(theme.foregroundInverted, HighlightAlpha) : theme.foregroundInverted}
                style={{
                    ...TextStyles.Densed,
                    color: theme.foregroundInverted,
                    borderWidth: 0,
                    paddingBottom: 5,
                    textAlignVertical: 'center',
                }}
                {...{ scrollEnabled: false }}
            />
        </View>
    );
};

const DonationComponent = (props: PageProps) => {
    let theme = useTheme();
    let initialPrice = props.router.params.initialPrice ? String(props.router.params.initialPrice) : '';
    let user = props.router.params.user as {name: string, id: string};

    let priceRef = React.useRef<TextInput>(null);
    let wrapperRef = React.useRef<{ shake: () => void }>(null);
    let form = useForm();
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
        {
            checkIsValid: x => {
                return Number(x) >= 1;
            },
            text: '$1 minimum',
        },
    ]);
    let price = priceField.value;

    let handlePriceChange = (value: string) => {
        priceField.input.onChange(value);
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

    let handleSubmit = () => {
        if (priceField.value.trim() === '' && wrapperRef.current) {
            wrapperRef.current.shake();
            return;
        }

        if (priceField.input.invalid) {
            Toast.failure({ text: priceField.input.errorText, duration: 1000 }).show();
            setTimeout(() => {
                if (priceRef.current) {
                    priceRef.current.focus();
                }
            }, 200);
            return;
        }
        form.doAction(() => {
            Toast.success({ text: 'Successful donation!', duration: 1000}).show();
        });
    };

    return (
        <>
            <SHeader title={user ? `Donate to ${user.name}` : 'Donate'} />
            <SScrollView flexDirection="column" alignSelf="stretch" alignItems="stretch" padding={16}>
                <ZShaker ref={wrapperRef}>
                    <View 
                        paddingTop={32} 
                        paddingBottom={4} 
                        paddingHorizontal={16} 
                        backgroundColor={theme.accentPay} 
                        flexDirection="column"
                        borderRadius={RadiusStyles.Large}
                    >
                        <View flexDirection="row">
                            <ZIconAction source={require('assets/ic-minus-glyph-24.png')} onPress={() => updatePrice(-5)} style="pay" />
                            <View marginHorizontal={16} flex={1} flexDirection="row" justifyContent="center">
                                <PriceInput value={price} autofocus={!initialPrice} onChange={handlePriceChange} ref={priceRef} />
                            </View>
                            <ZIconAction source={require('assets/ic-add-glyph-24.png')} onPress={() => updatePrice(5)} style="pay" />
                        </View>
                        <View marginTop={32} flexDirection="row">
                            <MessageInput />
                        </View>
                        <View marginTop={4}>
                            <ZButton title="Donate" style="pay" size="large" onPress={handleSubmit} />
                        </View>
                    </View>
                </ZShaker>
            </SScrollView>
        </>
    );
};

export const Donation = withApp(DonationComponent, { navigationAppearance: 'small' });