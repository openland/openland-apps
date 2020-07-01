import * as React from 'react';
import {
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    TextInput,
    TextInputProps,
    ViewProps,
    Platform,
    Dimensions,
} from 'react-native';
import { ShowAuthError } from './ShowAuthError';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import Toast from 'openland-mobile/components/Toast';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeContext, useTheme } from 'openland-mobile/themes/ThemeContext';
import { trackEvent } from 'openland-mobile/analytics';
import { TrackAuthError } from './TrackAuthError';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { RegistrationContainer } from './RegistrationContainer';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZShaker } from 'openland-mobile/components/ZShaker';
import { useResendTimer } from 'openland-y-utils/auth/useResendTimer';

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
                selectionColor="rgba(255, 255, 255, 0)"
                autoCapitalize="none"
                keyboardType="number-pad"
                returnKeyType="next"
                {...other}
            />
        </View>
    );
});

const AuthCodeHeader = React.memo((props: { resendCode: () => void; formData: string }) => {
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
                We just sent it to {props.formData}.
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

interface SubmitCodeFormProps {
    title: string;
    formData: string;
    buttonTitle?: string;
    photoSrc?: string | null;
    photoCrop?: { w: number; h: number; x: number; y: number } | null;
    onSubmit: (code: string) => Promise<any>;
    onResend: () => Promise<any>;
}

export const SubmitCodeForm = React.memo((props: SubmitCodeFormProps) => {
    const { photoSrc, photoCrop, title, buttonTitle, formData, onSubmit, onResend } = props;
    const shakerRef = React.useRef<{ shake: () => void }>(null);
    const codeRefs = React.useRef<React.RefObject<TextInput>[]>(
        new Array(6).fill(undefined).map(() => React.createRef())
    );
    const form = useForm({ disableAppLoader: true });
    const initialCode = new Array(6).fill('');
    const codeField = useField('code', initialCode, form);
    const [resendLoading, setResendLoading] = React.useState(false);
    const loading = form.loading || resendLoading;

    const focusOnError = () => {
        let indexToFocus = codeField.input.value.findIndex(value => !value);
        if (indexToFocus !== -1) {
            codeRefs.current[indexToFocus]?.current?.focus();
        } else {
            codeField.input.onChange(initialCode);
            codeRefs.current[0].current?.focus();
        }
    };

    const resendCode = async () => {
        setResendLoading(true);
        try {
            trackEvent('code_resend_action');
            await onResend();
            Toast.success({ duration: 1000, hideKeyboardOnOpen: false }).show();
            codeField.input.onChange(initialCode);
            codeRefs.current[0].current?.focus();
        } catch (e) {
            ShowAuthError(e.name);
            focusOnError();
        }
        setResendLoading(false);
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

        if (value.length === 6) {
            return;
        }
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

    const submitForm = () => {
        if (codeField.value.some(x => x.length === 0)) {
            if (shakerRef && shakerRef.current) {
                shakerRef.current.shake();
                focusOnError();
            }
            return;
        }
        form.doAction(async () => {
            try {
                await onSubmit(codeField.value.join(''));
            } catch (e) {
                TrackAuthError(e);
                ShowAuthError(e);
                focusOnError();
                throw e;
            }
        });
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

    const compensationHeight = Dimensions.get('screen').height <= 667 ? 44 : 0;
    return (
        <ZTrack event="code_view">
            <RegistrationContainer
                autoScrollToBottom={true}
                title={title}
                subtitle={<AuthCodeHeader resendCode={resendCode} formData={formData} />}
                floatContent={
                    <ZButton
                        title={buttonTitle || 'Next'}
                        size="large"
                        onPress={submitForm}
                        loading={loading}
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
                    <ZShaker ref={shakerRef}>
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
                                        if (!loading) {
                                            codeField.input.onChange(codeField.value.map((x, idx) => idx === i ? '' : x));
                                        }
                                    }}
                                    onSubmitEditing={submitForm}
                                    {...Platform.OS === 'ios' && { textContentType: 'oneTimeCode' }}
                                />
                            ))}
                        </View>
                    </ZShaker>
                </View>
                <View height={compensationHeight} />
            </RegistrationContainer>
        </ZTrack>
    );
});
