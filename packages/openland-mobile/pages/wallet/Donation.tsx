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

const PriceInput = (props: {value: string, autofocus: boolean, onChange: (price: string) => void}) => {
    let theme = useTheme();
    let value = props.value ? `$${props.value}` : '';
    let handleChangeText = (text: string) => {
        props.onChange(text.replace(/\$/, ''));
    };

    return (
        <TextInput
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
};

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
    let [price, setPrice] = React.useState(initialPrice);
    let updatePrice = (value: number) => {
        let current = price ? parseInt(price, 10) : 0;
        let newPrice = current + value;
        if (newPrice > 0) {
            setPrice(String(newPrice));
        } else {
            setPrice('');
        }
    };

    return (
        <>
            <SHeader title={user ? `Donate to ${user.name}` : 'Donate'} />
            <SScrollView flexDirection="column" alignSelf="stretch" alignItems="stretch" padding={16}>
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
                            <PriceInput value={price} autofocus={!initialPrice} onChange={setPrice} />
                        </View>
                        <ZIconAction source={require('assets/ic-add-glyph-24.png')} onPress={() => updatePrice(5)} style="pay" />
                    </View>
                    <View marginTop={32} flexDirection="row">
                        <MessageInput />
                    </View>
                    <View marginTop={4}>
                        <ZButton title="Donate" style="pay" size="large" />
                    </View>
                </View>
            </SScrollView>
        </>
    );
};

export const Donation = withApp(DonationComponent, { navigationAppearance: 'small' });
