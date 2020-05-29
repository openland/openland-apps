import * as React from 'react';
import { Text, TextStyle, TouchableOpacity, View } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { ZInput } from '../../components/ZInput';
import RNRestart from 'react-native-restart';
import { NamedError, UserError } from 'openland-y-forms/errorHandling';
import { ShowAuthError } from './ShowAuthError';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import Toast from 'openland-mobile/components/Toast';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { trackEvent } from 'openland-mobile/analytics';
import { TrackAuthError } from './TrackAuthError';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { API_HOST } from 'openland-y-utils/api';
import { RegistrationContainer } from './RegistrationContainer';
import { AppStorage as Storage } from 'openland-y-runtime-native/AppStorage';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZShaker } from 'openland-mobile/components/ZShaker';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { Modals } from '../main/modals/Modals';

export const ACTIVATION_CODE_LENGTH = 6;

let userAuthData = '';
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

const AuthStartComponent = React.memo((props: PageProps) => {
    const isPhoneAuth = !!props.router.params.phone;
    const ref = React.useRef<{ shake: () => void }>(null);
    const form = useForm({ disableAppLoader: true });
    const userDataField = useField('userData', '', form);
    const [country, setCountry] = React.useState({
        label: 'United States',
        value: '+1',
    });

    const submitForm = () => {
        if (!userDataField.value.trim()) {
            if (ref && ref.current) {
                ref.current.shake();
            }
            return;
        }
        form.doAction(async () => {
            try {
                const code = country.value.split(' ').join('');
                userAuthData = isPhoneAuth
                    ? code + userDataField.value.trim()
                    : userDataField.value.trim();
                await requestActivationCode(isPhoneAuth);
                props.router.push('AuthCode', isPhoneAuth ? { phone: true } : undefined);
            } catch (e) {
                ShowAuthError(e);
            }
        });
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
                        <ZPickField
                            value={country.value}
                            label={country.label}
                            onPress={() => {
                                Modals.showCountryPicker(
                                    props.router,
                                    async (d) => {
                                        setCountry(d);
                                        props.router.back();
                                    },
                                    'Select region',
                                );
                            }}
                        />
                    )}
                    <ZInput
                        field={userDataField}
                        placeholder={isPhoneAuth ? 'Phone' : 'Email'}
                        autoCapitalize="none"
                        keyboardType={isPhoneAuth ? 'phone-pad' : 'email-address'}
                        autoFocus={true}
                        returnKeyType="next"
                        allowFontScaling={false}
                        onSubmitEditing={submitForm}
                    />
                </ZShaker>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const AuthStart = withApp(AuthStartComponent, {
    navigationAppearance: 'small-hidden',
});

const AuthCodeHeader = React.memo((props: { resendCode: () => void }) => {
    const theme = React.useContext(ThemeContext);
    const textStyle = [
        TextStyles.Body,
        {
            color: theme.foregroundSecondary,
            textAlign: 'center',
        },
    ] as TextStyle;
    return (
        <View marginBottom={32}>
            <Text style={[textStyle, { paddingHorizontal: 16 }]} allowFontScaling={false}>
                We just sent it to {userAuthData}.
            </Text>
            <View flexDirection="row" justifyContent="center" alignItems="center">
                <Text style={textStyle} allowFontScaling={false}>
                    Haven’t received?{' '}
                </Text>
                <TouchableOpacity onPress={props.resendCode} activeOpacity={0.24}>
                    <Text
                        style={[TextStyles.Body, { color: theme.accentPrimary }]}
                        allowFontScaling={false}
                    >
                        Resend
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const AuthCodeComponent = React.memo((props: PageProps) => {
    const isPhoneAuth = !!props.router.params.phone;
    const ref = React.useRef<{ shake: () => void }>(null);
    const form = useForm({ disableAppLoader: true });
    const codeField = useField('code', '', form);

    const resendCode = async () => {
        trackEvent('code_resend_action');
        await requestActivationCode(isPhoneAuth);
        Toast.success({ duration: 1000 }).show();
        codeField.input.onChange('');
    };

    const submitForm = () => {
        if (!codeField.value.trim()) {
            if (ref && ref.current) {
                ref.current.shake();
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
                        code: codeField.value.trim(),
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
            }
        });
    };

    React.useEffect(() => {
        if (codeField.value.length === ACTIVATION_CODE_LENGTH) {
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
                subtitle={<AuthCodeHeader resendCode={resendCode} />}
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
                        <ZInput
                            field={codeField}
                            placeholder="Login code"
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            autoFocus={true}
                            returnKeyType="next"
                            allowFontScaling={false}
                            onSubmitEditing={submitForm}
                            maxLength={ACTIVATION_CODE_LENGTH}
                        />
                    </ZShaker>
                </View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const AuthCode = withApp(AuthCodeComponent, {
    navigationAppearance: 'small-hidden',
});
