import * as React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    TextInput,
    Image,
    TextInputProps,
    Keyboard,
    Platform,
} from 'react-native';
import { ShowAuthError } from './ShowAuthError';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { ZButton } from 'openland-mobile/components/ZButton';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { RegistrationContainer } from './RegistrationContainer';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZShaker } from 'openland-mobile/components/ZShaker';
import { Modals } from '../main/modals/Modals';
import { countriesMeta } from 'openland-y-utils/auth/countriesMeta';
import { parsePhoneNumberFromString, formatIncompletePhoneNumber, CountryCode } from 'libphonenumber-js';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { SRouter } from 'react-native-s/SRouter';
import { validateEmail } from 'openland-y-utils/validateEmail';

const INVALID_COUNTRY = 'Select country';
const SPACE_REGEX = /\s/g;
const US_LABEL = 'United States';
const RUSSIA_LABEL = 'Russia';
const findCode = (val: string) => {
    if (val === '+1') {
        return { value: '+1', label: US_LABEL, shortname: 'US' };
    }
    if (val === '+7') {
        return { value: '+7', label: RUSSIA_LABEL, shortname: 'RU' };
    }
    return countriesMeta.find(country => country.value === val);
};
const removeSpace = (s: string) => s.replace(SPACE_REGEX, '');

const showConfirmModal = ({ phone }: { phone: string }): Promise<boolean> => {
    return new Promise((resolve) => {
        const builder = new AlertBlanketBuilder();
        builder.title(`${phone}?`);
        builder.message('Is this phone number correct?');
        builder.button('Change', 'cancel', () => resolve(false));
        builder.button('Confirm', 'default', () => resolve(true));
        builder.onCancel(() => resolve(false));
        builder.show();
    });
};

interface AuthInputProps extends TextInputProps {
    width?: number | string;
}

const AuthInput = React.forwardRef((props: AuthInputProps, ref: React.RefObject<TextInput>) => {
    const { style, width, ...other } = props;
    const theme = useTheme();
    return (
        <View
            style={{
                height: 45,
                width,
                borderRadius: 12,
                backgroundColor: theme.backgroundTertiaryTrans
            }}
        >
            <TextInput
                style={[{
                    ...TextStyles.Densed,
                    height: 48,
                    borderRadius: 12,
                    paddingVertical: 13,
                    paddingHorizontal: 16,
                    alignItems: 'center',
                    color: theme.foregroundPrimary,
                }, style]}
                placeholderTextColor={theme.foregroundTertiary}
                allowFontScaling={false}
                ref={ref}
                {...other}
            />
        </View>
    );
});

const AuthPicker = (props: { value: string, onPress: () => void }) => {
    const theme = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                borderRadius: 12,
                backgroundColor: theme.backgroundTertiaryTrans,
                paddingHorizontal: 16,
                paddingVertical: 13,
                marginHorizontal: 16,
                marginBottom: 16,
            }}
            onPress={props.onPress}
        >
            <Text style={{ ...TextStyles.Densed, flexGrow: 1, color: theme.foregroundPrimary }}>{props.value}</Text>
            <Image style={{ tintColor: theme.foregroundTertiary }} source={require('assets/ic-dropdown-16.png')} />
        </TouchableOpacity>
    );
};

interface SubmitLoginFormProps {
    eventTitle: string;
    title: string;
    subtitle: string;
    router: SRouter;
    isPhone: boolean;
    countryShortname: string;
    onSubmit: (formData: string, phoneData: string) => Promise<any>;
    onSuccess: () => void;
    initialValue?: string;
    processErrors?: boolean;
}

export const SubmitLoginForm = React.memo((props: SubmitLoginFormProps) => {
    const { isPhone, countryShortname, eventTitle, title, subtitle, onSubmit, onSuccess, initialValue, processErrors = true } = props;
    const inputCodeRef = React.useRef<TextInput>(null);
    const inputDataRef = React.useRef<TextInput>(null);
    const shakerRef = React.useRef<{ shake: () => void }>(null);

    const initialEmail = (initialValue && !isPhone) ? initialValue : undefined;
    const initialPhone = (initialValue && isPhone) ? parsePhoneNumberFromString(initialValue) : undefined;
    const initialPhoneFormated = initialPhone ? initialPhone.formatInternational().replace('+' + initialPhone.countryCallingCode, '').trim() : undefined;

    const form = useForm({ disableAppLoader: true });
    const countryCode = initialPhone ? initialPhone.country : countryShortname;
    const initialCode = countriesMeta.find(x => x.shortname === countryCode) || {
        label: 'United States',
        value: '+1',
        shortname: 'US',
    };
    const userCodeField = useField('userCode', initialCode, form);
    const userDataField = useField('userData', initialEmail || initialPhoneFormated || '', form);
    const [loading, setLoading] = React.useState(false);

    let parsedPhone = parsePhoneNumberFromString(userCodeField.value.value + userDataField.value);
    let isPhoneValid = !!(parsedPhone && parsedPhone.isPossible());
    const submitForm = () => {
        const code = userCodeField.value.value;
        const data = userDataField.value;
        const shakeIt = () => {
            if (shakerRef && shakerRef.current) {
                shakerRef.current.shake();
            }
        };
        if (!isPhone && (!data.trim() || !validateEmail(data.trim()))) {
            shakeIt();
            return;
        }
        if (isPhone && (!data.trim() || !code.match(/\d/g)!! || !isPhoneValid)) {
            shakeIt();
            return;
        }
        form.doAction(async () => {
            try {
                let phoneData = code + ' ' + data;

                const codeStr = code.split(' ').join('');
                let formData = isPhone
                    ? codeStr + data.trim().match(/\d/g)!!.join('')
                    : userDataField.value.trim();
                if (isPhone) {
                    let confirmed = await showConfirmModal({ phone: phoneData });
                    if (!confirmed) {
                        return;
                    }
                    setLoading(true);
                    await onSubmit(formData, phoneData);
                } else {
                    setLoading(true);
                    await onSubmit(formData, phoneData);
                }
                setLoading(false);
                onSuccess();
            } catch (e) {
                setLoading(false);
                ShowAuthError(e, processErrors);
            }
        });
    };

    const onKeyPressHandler = React.useCallback(
        (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
            if (
                e.nativeEvent.key === 'Backspace' &&
                !userDataField.value.trim() &&
                inputCodeRef.current
            ) {
                inputCodeRef.current.focus();
            }
        },
        [userDataField.value],
    );

    const onCountryCodeChange = (str: string) => {
        if (str.length === 0) {
            return;
        }
        let v = '+' + removeSpace(str).replace(/\+/g, '');
        if (!/^\+(\d|-|\(|\))*$/.test(v)) {
            return;
        }
        let existing;
        if (v.length >= 5) {
            let parsed = parsePhoneNumberFromString(v);
            if (parsed) {
                existing = findCode('+' + parsed.countryCallingCode);
            }
        } else {
            existing = findCode(v);
        }
        if (existing) {
            userCodeField.input.onChange(existing);
            let parsed = parsePhoneNumberFromString(v) || parsePhoneNumberFromString(v + userDataField.value);
            if (parsed) {
                let formatted = formatIncompletePhoneNumber(existing.value + parsed.nationalNumber, userCodeField.value.shortname as CountryCode);
                userDataField.input.onChange(formatted.replace(existing.value, '').trim());
                if (inputDataRef.current) {
                    inputDataRef.current.focus();
                }
            }
        } else {
            userCodeField.input.onChange({ value: v, label: INVALID_COUNTRY, shortname: '' });
        }
    };

    const onUserDataChange = (value: string) => {
        if (!isPhone) {
            userDataField.input.onChange(value);
            return;
        }
        let code = userCodeField.value.value.split(' ').join('');
        if (value === '') {
            userDataField.input.onChange('');
            return;
        }
        let parsed = parsePhoneNumberFromString(value);
        if (parsed && parsed.isPossible()) {
            let codeString = `+${parsed.countryCallingCode}`;
            let codeValue = findCode(codeString);
            if (codeValue) {
                userCodeField.input.onChange(codeValue);
                code = codeString;
                value = parsed.nationalNumber as string;
            }
        }

        let formatted = formatIncompletePhoneNumber(code + value, userCodeField.value.shortname as CountryCode);
        // hack for codes with space
        let formattedCode = formatIncompletePhoneNumber(code, userCodeField.value.shortname as CountryCode);

        userDataField.input.onChange(formatted.replace(formattedCode, '').trim());
    };

    return (
        <ZTrack event={eventTitle}>
            <RegistrationContainer
                title={title}
                subtitle={subtitle}
                autoScrollToTop={Platform.OS !== 'ios'}
                floatContent={
                    <ZButton
                        title="Next"
                        size="large"
                        onPress={submitForm}
                        loading={loading}
                    />
                }
            >
                <ZShaker ref={shakerRef}>
                    {isPhone && (
                        <AuthPicker
                            value={userCodeField.value.label}
                            onPress={() => {
                                Keyboard.dismiss();
                                Modals.showCountryPicker(
                                    props.router,
                                    async (d) => {
                                        userCodeField.input.onChange(d);
                                        userDataField.input.onChange('');
                                        props.router.dismiss();
                                        if (inputDataRef.current) {
                                            inputDataRef.current.focus();
                                        }
                                    }
                                );
                            }}
                        />
                    )}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexGrow: 1,
                            flexShrink: 0,
                            marginHorizontal: 16
                        }}
                    >
                        {isPhone && (
                            <View style={{ marginRight: 16 }}>
                                <AuthInput
                                    ref={inputCodeRef}
                                    width={96}
                                    autoCapitalize="none"
                                    keyboardType="number-pad"
                                    allowFontScaling={false}
                                    value={userCodeField.value.value}
                                    onSubmitEditing={submitForm}
                                    onChangeText={onCountryCodeChange}
                                    {
                                    ...Platform.OS === 'ios'
                                        ? { textContentType: 'telephoneNumber' }
                                        : { autoCompleteType: 'tel' }
                                    }
                                />
                            </View>
                        )}
                        <View style={{ flexGrow: 2, flexBasis: 0 }}>
                            <AuthInput
                                ref={inputDataRef}
                                value={userDataField.value}
                                onChangeText={onUserDataChange}
                                placeholder={isPhone ? 'Phone number' : 'Email'}
                                autoCapitalize="none"
                                keyboardType={isPhone ? 'number-pad' : 'email-address'}
                                autoFocus={true}
                                returnKeyType="next"
                                allowFontScaling={false}
                                onKeyPress={onKeyPressHandler}
                                onSubmitEditing={submitForm}
                                {
                                ...Platform.OS === 'ios'
                                    ? { textContentType: isPhone ? 'telephoneNumber' : 'emailAddress' }
                                    : { autoCompleteType: isPhone ? 'tel' : 'email' }
                                }
                            />
                        </View>
                    </View>
                </ZShaker>
            </RegistrationContainer>
        </ZTrack>
    );
});
