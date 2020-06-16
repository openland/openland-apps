import * as React from 'react';
import {
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    TextInput,
    Image,
    TextInputProps,
    Keyboard,
    Platform,
    ViewProps,
} from 'react-native';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import RNRestart from 'react-native-restart';
import { NamedError, UserError } from 'openland-y-forms/errorHandling';
import { ShowAuthError } from './ShowAuthError';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import Toast from 'openland-mobile/components/Toast';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeContext, useTheme } from 'openland-mobile/themes/ThemeContext';
import { trackEvent } from 'openland-mobile/analytics';
import { TrackAuthError } from './TrackAuthError';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { API_HOST } from 'openland-y-utils/api';
import { RegistrationContainer } from './RegistrationContainer';
import { AppStorage as Storage } from 'openland-y-runtime-native/AppStorage';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZShaker } from 'openland-mobile/components/ZShaker';
import { Modals } from '../main/modals/Modals';
import { countriesMeta } from 'openland-y-utils/auth/countriesMeta';
import { parsePhoneNumberFromString, formatIncompletePhoneNumber, CountryCode } from 'libphonenumber-js';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { useResendTimer } from 'openland-y-utils/auth/useResendTimer';

export const ACTIVATION_CODE_LENGTH = 6;
const INVALID_COUNTRY = 'Select country';
const SPACE_REGEX = /\s/g;

let userAuthData = '';
let userPhoneData = '';
let session = '';
let photoSrc: string | null = null;
let photoCrop: { w: number; h: number; x: number; y: number } | null = null;

const http = async (params: { url: string; body?: any; method: 'POST' | 'GET' }) => {
    let res = await fetch(params.url, {
        method: params.method,
        headers: [['Content-Type', 'application/json']],
        body: JSON.stringify(params.body),
    });
    if (!res.ok) {
        throw new UserError(res.statusText || 'Unexpected error');
    } else {
        let body = await res.json();
        if (body.ok === false) {
            if (typeof body.errorCode === 'string') {
                throw new NamedError(body.errorCode);
            } else {
                throw new UserError(body.errorText || 'Unexpected error');
            }
        } else {
            return body;
        }
    }
};

const requestActivationCode = async (isPhone: boolean) => {
    const host = isPhone ? '/auth/phone/sendCode' : '/auth/sendCode';
    const body = isPhone ? { phone: userAuthData } : { email: userAuthData };
    let res = await http({
        url: 'https://' + API_HOST + host,
        body: body,
        method: 'POST',
    });

    session = res.session;
    photoSrc = res.pictureId ? res.pictureId : null;
    photoCrop = res.pictureCrop ? res.pictureCrop : null;
};

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

const showConfirmModal = ({ onConfirm }: { onConfirm: () => Promise<any> }) => {
    const builder = new AlertBlanketBuilder();
    builder.title(`${userPhoneData}?`);
    builder.message('Is this phone number correct?');
    builder.button('Change', 'cancel');
    builder.button('Confirm', 'default', onConfirm);
    builder.show();
};

interface AuthInputProps extends TextInputProps {
    width?: number | string;
}

const AuthInput = React.forwardRef((props: AuthInputProps, ref: React.RefObject<TextInput>) => {
    const { style, width, ...other } = props;
    const theme = useTheme();
    return (
        <View height={48} width={width} borderRadius={12} backgroundColor={theme.backgroundTertiaryTrans} >
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

const AuthStartComponent = React.memo((props: PageProps) => {
    const isPhoneAuth = !!props.router.params.phone;
    const countryShortname = props.router.params.countryShortname as string;
    const ref = React.useRef<{ shake: () => void }>(null);
    const inputCodeRef = React.useRef<TextInput>(null);
    const inputDataRef = React.useRef<TextInput>(null);
    const form = useForm({ disableAppLoader: true });
    const initialCode = countriesMeta.find(x => x.shortname === countryShortname) || {
        label: 'United States',
        value: '+1',
        shortname: 'US',
    };
    const userCodeField = useField('userCode', initialCode, form);
    const userDataField = useField('userData', '', form);
    let parsedPhone = parsePhoneNumberFromString(userCodeField.value.value + userDataField.value);
    let isPhoneValid = !!(parsedPhone && parsedPhone.isPossible());

    const submitForm = () => {
        const code = userCodeField.value.value;
        const data = userDataField.value;
        const shakeIt = () => {
            if (ref && ref.current) {
                ref.current.shake();
            }
        };
        if (!isPhoneAuth && !data.trim()) {
            shakeIt();
            return;
        }
        if (isPhoneAuth && (!data.trim() || !code.match(/\d/g)!! || !isPhoneValid)) {
            shakeIt();
            return;
        }
        form.doAction(async () => {
            try {
                userPhoneData = code + ' ' + data;

                const codeStr = code.split(' ').join('');
                userAuthData = isPhoneAuth
                    ? codeStr + data.trim().match(/\d/g)!!.join('')
                    : userDataField.value.trim();
                if (isPhoneAuth) {
                    showConfirmModal({
                        onConfirm: async () => {
                            await requestActivationCode(true);
                            props.router.push('AuthCode', { phone: true });
                        }
                    });
                } else {
                    await requestActivationCode(false);
                    props.router.push('AuthCode');
                }
            } catch (e) {
                ShowAuthError(e);
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
        if (!isPhoneAuth) {
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
        userDataField.input.onChange(formatted.replace(code, '').trim());
    };

    return (
        <ZTrack event={isPhoneAuth ? 'signup_phone_view' : 'signup_email_view'}>
            <RegistrationContainer
                title={isPhoneAuth ? 'What’s your phone?' : 'What’s your email?'}
                subtitle="We’ll send you a login code"
                floatContent={
                    <ZButton
                        title="Next"
                        size="large"
                        onPress={submitForm}
                        loading={form.loading}
                    />
                }
            >
                <ZShaker ref={ref}>
                    {isPhoneAuth && (
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
                                    }
                                );
                            }}
                        />
                    )}
                    <View
                        flexDirection="row"
                        justifyContent="space-between"
                        flexGrow={1}
                        flexShrink={0}
                        marginHorizontal={16}
                    >
                        {isPhoneAuth && (
                            <View marginRight={16}>
                                <AuthInput
                                    ref={inputCodeRef}
                                    width={96}
                                    autoCapitalize="none"
                                    keyboardType="phone-pad"
                                    allowFontScaling={false}
                                    value={userCodeField.value.value}
                                    onSubmitEditing={submitForm}
                                    onChangeText={onCountryCodeChange}
                                />
                            </View>
                        )}
                        <View flexGrow={2} flexBasis={0}>
                            <AuthInput
                                ref={inputDataRef}
                                value={userDataField.value}
                                onChangeText={onUserDataChange}
                                placeholder={isPhoneAuth ? 'Phone number' : 'Email'}
                                autoCapitalize="none"
                                keyboardType={isPhoneAuth ? 'phone-pad' : 'email-address'}
                                autoFocus={true}
                                returnKeyType="next"
                                allowFontScaling={false}
                                onKeyPress={onKeyPressHandler}
                                onSubmitEditing={submitForm}
                            />
                        </View>
                    </View>
                </ZShaker>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const AuthStart = withApp(AuthStartComponent, {
    navigationAppearance: 'small-hidden',
});

interface CodeInputProps extends TextInputProps {
    initialFocused?: boolean;
    wrapperProps?: ViewProps;
    onFocus: () => void;
}

const CodeInput = React.forwardRef((props: CodeInputProps, ref: React.RefObject<TextInput>) => {
    const { style, wrapperProps, onFocus, initialFocused, ...other } = props;
    const theme = useTheme();
    const [focused, setFocused] = React.useState(!!initialFocused);

    return (
        <View
            height={56}
            maxWidth={50}
            flexGrow={1}
            borderRadius={12}
            backgroundColor={focused ? theme.backgroundTertiaryActiveTrans : theme.backgroundTertiaryTrans}
            {...wrapperProps}
        >
            <TextInput
                style={[{
                    ...TextStyles.Title1,
                    height: 56,
                    maxWidth: 50,
                    flexGrow: 1,
                    borderRadius: 12,
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: theme.foregroundPrimary,
                }, style]}
                allowFontScaling={false}
                onFocus={() => {
                    setFocused(true);
                    onFocus();
                }}
                onBlur={() => setFocused(false)}
                ref={ref}
                caretHidden={true}
                autoCapitalize="none"
                keyboardType="number-pad"
                returnKeyType="next"
                {...other}
            />
        </View>
    );
});

const AuthCodeHeader = React.memo((props: { resendCode: () => void; isPhoneAuth: boolean }) => {
    const theme = React.useContext(ThemeContext);
    const textStyle = [
        TextStyles.Body,
        {
            color: theme.foregroundSecondary,
            textAlign: 'center',
        },
    ] as TextStyle;
    const [seconds, handleResend] = useResendTimer({ onResend: props.resendCode });
    return (
        <View marginBottom={32}>
            <Text style={[textStyle, { paddingHorizontal: 16 }]} allowFontScaling={false}>
                We just sent it to {props.isPhoneAuth ? userPhoneData : userAuthData}.
            </Text>
            <View flexDirection="row" justifyContent="center" alignItems="center">
                <Text style={textStyle} allowFontScaling={false}>
                    Haven’t received?{' '}{seconds > 0 && `Wait for ${seconds} sec`}
                </Text>
                {seconds <= 0 && (
                    <TouchableOpacity onPress={handleResend} activeOpacity={0.24}>
                        <Text
                            style={[TextStyles.Body, { color: theme.accentPrimary }]}
                            allowFontScaling={false}
                        >
                            Resend
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
});

const AuthCodeComponent = React.memo((props: PageProps) => {
    const isPhoneAuth = !!props.router.params.phone;
    const ref = React.useRef<{ shake: () => void }>(null);
    const codeRefs = React.useRef<React.RefObject<TextInput>[]>(
        new Array(6).fill(undefined).map(() => React.createRef())
    );
    const form = useForm({ disableAppLoader: true });
    const initialCode = new Array(6).fill('');
    const codeField = useField('code', initialCode, form);

    const focusOnError = () => {
        let indexToFocus = codeField.input.value.findIndex(value => !value);
        if (indexToFocus !== -1) {
            setTimeout(() => {
                codeRefs.current[indexToFocus]?.current?.focus();
            }, Platform.OS === 'ios' ? 500 : 1000);
        } else {
            codeField.input.onChange(initialCode);
            setTimeout(() => {
                codeRefs.current[0].current?.focus();
            }, Platform.OS === 'ios' ? 500 : 1000);
        }
    };

    const resendCode = async () => {
        try {
            trackEvent('code_resend_action');
            await requestActivationCode(isPhoneAuth);
            Toast.success({ duration: 1000 }).show();
            codeField.input.onChange(initialCode);
            setTimeout(() => {
                codeRefs.current[0].current?.focus();
            }, Platform.OS === 'ios' ? 500 : 1000);
        } catch (e) {
            ShowAuthError(e.name);
            focusOnError();
        }
    };

    const submitForm = () => {
        if (codeField.value.some(x => x.length === 0)) {
            if (ref && ref.current) {
                ref.current.shake();
                focusOnError();
            }
            return;
        }
        form.doAction(async () => {
            const checkCodeHost = isPhoneAuth ? '/auth/phone/checkCode' : '/auth/checkCode';
            const getTokenHost = isPhoneAuth
                ? '/auth/phone/getAccessToken'
                : '/auth/getAccessToken';
            try {
                let res = await http({
                    url: 'https://' + API_HOST + checkCodeHost,
                    body: {
                        session: session,
                        code: codeField.value.join(''),
                    },
                    method: 'POST',
                });
                let res2 = await http({
                    url: 'https://' + API_HOST + getTokenHost,
                    body: {
                        session: session,
                        authToken: res.authToken,
                    },
                    method: 'POST',
                });

                await AppStorage.setToken(res2.accessToken);
                // hotfix, spacex cache reset needed
                await Storage.writeKey('user_refetch_needed', true);
                RNRestart.Restart();
            } catch (e) {
                TrackAuthError(e);
                ShowAuthError(e);
                focusOnError();
            }
        });
    };

    const handleChange = (text: string, index: number) => {
        if (text.length === 6) {
            codeField.input.onChange([...text]);
            return;
        }

        let value = text ? text[text.length - 1] : '';
        let newValue = codeField.input.value.slice();
        newValue[index] = value;
        codeField.input.onChange(newValue);

        if (value.length > 0) {
            codeRefs.current[index + 1]?.current?.focus();
        } else {
            codeRefs.current[index - 1]?.current?.focus();
        }
    };
    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && codeField.value[index]?.length === 0) {
            e.preventDefault();
            codeRefs.current[index - 1]?.current?.focus();
        }
    };

    React.useEffect(() => {
        if (codeField.value.every(x => !!x)) {
            submitForm();
        }
    }, [codeField.value]);

    const avatarSrc =
        photoSrc && photoCrop
            ? `https://ucarecdn.com/${photoSrc}/-/crop/${photoCrop.w}x${photoCrop.h}/${photoCrop.x},${photoCrop.y}/-/scale_crop/72x72/center/`
            : null;

    return (
        <ZTrack event="code_view">
            <RegistrationContainer
                autoScrollToBottom={true}
                title="Enter login code"
                subtitle={<AuthCodeHeader resendCode={resendCode} isPhoneAuth={isPhoneAuth} />}
                floatContent={
                    <ZButton
                        title="Next"
                        size="large"
                        onPress={submitForm}
                        loading={form.loading}
                    />
                }
            >
                {avatarSrc && (
                    <View
                        marginTop={-8}
                        marginBottom={32}
                        flexDirection="row"
                        justifyContent="center"
                    >
                        <ZAvatar size="x-large" photo={avatarSrc} />
                    </View>
                )}
                <View>
                    <ZShaker ref={ref}>
                        <View flexDirection="row" justifyContent="center" width="100%">
                            {codeField.value.map((value, i) => (
                                <CodeInput
                                    wrapperProps={{ marginRight: i !== codeField.value.length - 1 ? 8 : 0 }}
                                    ref={codeRefs.current[i]}
                                    key={i}
                                    autoFocus={i === 0}
                                    initialFocused={i === 0}
                                    value={value}
                                    onChangeText={(text) => handleChange(text, i)}
                                    onKeyPress={(e) => handleKeyPress(e, i)}
                                    onFocus={() => {
                                        codeField.input.onChange(codeField.value.map((x, idx) => idx === i ? '' : x));
                                    }}
                                    onSubmitEditing={submitForm}
                                    {...Platform.OS === 'ios' && i === 0 && { textContentType: 'oneTimeCode' }}
                                />
                            ))}
                        </View>
                    </ZShaker>
                </View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const AuthCode = withApp(AuthCodeComponent, {
    navigationAppearance: 'small-hidden',
});
