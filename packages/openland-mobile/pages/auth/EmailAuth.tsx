import * as React from 'react';
import { View, Animated, Text, TouchableOpacity, Easing, TextStyle } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { ZInput } from '../../components/ZInput';
import RNRestart from 'react-native-restart';
import { UserError, NamedError } from 'openland-y-forms/errorHandling';
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

export const ACTIVATION_CODE_LENGTH = 6;

let email = '';
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

const requestActivationCode = async () => {
    let res = await http({
        url: 'https://' + API_HOST + '/auth/sendCode',
        body: {
            email: email,
        },
        method: 'POST',
    });

    session = res.session;
    photoSrc = res.pictureId ? res.pictureId : null;
    photoCrop = res.pictureCrop ? res.pictureCrop : null;
};

const EmailStartComponent = React.memo((props: PageProps) => {
    const [shakeAnimation] = React.useState(new Animated.Value(0));
    const form = useForm({ disableAppLoader: true });
    const emailField = useField('email', '', form);

    const submitForm = () => {
        if (!emailField.value.trim()) {
            shakeAnimation.setValue(0);
            Animated.timing(shakeAnimation, {
                duration: 400,
                toValue: 3,
                easing: Easing.bounce,
                useNativeDriver: true,
            }).start();
            return;
        }
        form.doAction(async () => {
            try {
                email = emailField.value.trim();
                await requestActivationCode();
                props.router.push('EmailCode');
            } catch (e) {
                ShowAuthError(e);
            }
        });
    };

    return (
        <ZTrack event="signup_email_view">
            <RegistrationContainer
                title="What’s your email?"
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
                <Animated.View
                    style={{
                        transform: [
                            {
                                translateX: shakeAnimation.interpolate({
                                    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                                    outputRange: [0, -15, 0, 15, 0, -15, 0],
                                }),
                            },
                        ],
                    }}
                >
                    <ZInput
                        field={emailField}
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoFocus={true}
                        returnKeyType="next"
                        allowFontScaling={false}
                        onSubmitEditing={submitForm}
                    />
                </Animated.View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const EmailStart = withApp(EmailStartComponent, {
    navigationAppearance: 'small',
    hideHairline: true,
});

const EmailCodeHeader = React.memo((props: { resendCode: () => void }) => {
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
                We just sent it to {email}.
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

const EmailCodeComponent = React.memo((props: PageProps) => {
    const [shakeAnimation] = React.useState(new Animated.Value(0));
    const form = useForm({ disableAppLoader: true });
    const codeField = useField('code', '', form);

    const resendCode = async () => {
        trackEvent('code_resend_action');
        await requestActivationCode();
        Toast.success({ duration: 1000 }).show();
        codeField.input.onChange('');
    };

    const submitForm = () => {
        if (!codeField.value.trim()) {
            shakeAnimation.setValue(0);
            Animated.timing(shakeAnimation, {
                duration: 400,
                toValue: 3,
                easing: Easing.bounce,
                useNativeDriver: true,
            }).start();
            return;
        }
        form.doAction(async () => {
            try {
                let res = await http({
                    url: 'https://' + API_HOST + '/auth/checkCode',
                    body: {
                        session: session,
                        code: codeField.value.trim(),
                    },
                    method: 'POST',
                });
                let res2 = await http({
                    url: 'https://' + API_HOST + '/auth/getAccessToken',
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

    React.useEffect(
        () => {
            if (codeField.value.length === ACTIVATION_CODE_LENGTH) {
                submitForm();
            }
        },
        [codeField.value],
    );

    const avatarSrc =
        photoSrc && photoCrop
            ? `https://ucarecdn.com/${photoSrc}/-/crop/${photoCrop.w}x${photoCrop.h}/${
                  photoCrop.x
              },${photoCrop.y}/-/scale_crop/72x72/center/`
            : null;

    return (
        <ZTrack event="code_view">
            <RegistrationContainer
                autoScrollToBottom={true}
                title="Enter login code"
                subtitle={<EmailCodeHeader resendCode={resendCode} />}
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
                        <ZAvatar size="xx-large" src={avatarSrc} />
                    </View>
                )}
                <Animated.View
                    style={{
                        paddingBottom: avatarSrc ? 70 : undefined,
                        transform: [
                            {
                                translateX: shakeAnimation.interpolate({
                                    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                                    outputRange: [0, -15, 0, 15, 0, -15, 0],
                                }),
                            },
                        ],
                    }}
                >
                    <ZInput
                        field={codeField}
                        placeholder="Activation code"
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        autoFocus={true}
                        returnKeyType="next"
                        allowFontScaling={false}
                        onSubmitEditing={submitForm}
                        maxLength={ACTIVATION_CODE_LENGTH}
                    />
                </Animated.View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const EmailCode = withApp(EmailCodeComponent, {
    navigationAppearance: 'small',
    hideHairline: true,
});
