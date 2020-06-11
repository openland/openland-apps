import * as React from 'react';
import { cx, css } from 'linaria';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { Wrapper } from '../onboarding/components/wrapper';
import {
    Title,
    Subtitle,
    FormLayout,
    AuthActionButton,
    AuthInput,
    AuthInputWrapper,
    AuthToastWrapper,
    useShake,
} from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { AuthHeaderConfig } from './root.page';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import { CountryPicker, OptionType } from './components/CountryPicker';

export type AskAuthDataProps = {
    fireAuth: (data: string, isPhoneFire: boolean) => Promise<void>;
    phoneCodeValue: OptionType;
    authError: string;
    authValue: string;
    authSending: boolean;
    setPhoneCodeValue: Function;
    setAuthSending: Function;
    setAuthError: Function;
    setAuthValue: Function;
};

const useAuthLoginStart = (props: AskAuthDataProps & { isPhoneAuth: boolean }) => {
    const { fireAuth, setAuthError, setAuthSending, isPhoneAuth } = props;
    const router = React.useContext(XRouterContext)!;
    const authLoginStart = async (data: string) => {
        if (data === '') {
            return;
        } else if (!isPhoneAuth && !validateEmail(data)) {
            setAuthError(InitTexts.auth.emailInvalid);
            return;
        } else {
            setAuthSending(true);
            setAuthError('');

            try {
                await fireAuth(data, isPhoneAuth);
                const loginPath = isPhoneAuth
                    ? '/authorization/ask-auth-code?phone=true'
                    : '/authorization/ask-auth-code';
                setTimeout(() => {
                    router.push(loginPath);
                }, 0);
            } catch (e) {
                setAuthSending(false);
                if (!navigator.onLine) {
                    setAuthError('Check your connection and try again');
                } else {
                    setAuthError(e.message);
                }
            }
        }
    };
    return authLoginStart;
};

const phoneToast = css`
    top: -80px;
    width: calc(100% - 32px);
`;

export const SignUpWithPhone = (props: AskAuthDataProps) => {
    const {
        authError,
        setAuthValue,
        setAuthError,
        authValue,
        setPhoneCodeValue,
        phoneCodeValue,
        authSending,
    } = props;
    const form = useForm();
    const authLoginStart = useAuthLoginStart({ ...props, isPhoneAuth: true });

    let dataField = useField('input.data', authValue, form);
    const codeField = useField('input.code', phoneCodeValue, form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            setPhoneCodeValue(codeField.value);
            setAuthValue(dataField.value);
            setAuthError('');
            setTimeout(() => {
                const code = codeField.value.value.split(' ').join('');
                let value = dataField.value.trim();
                let phone = new AsYouType('US');
                phone.input(code + value);
                let phoneNumber = phone.getNumber();

                if (phoneNumber) {
                    value = phoneNumber.number as string;
                }
                authLoginStart(value);
            }, 100);
        });
    }, [codeField.value, dataField.value]);

    const errorText = (dataField.input.invalid && dataField.input.errorText) || authError;
    const isInvalid = !!errorText;
    const countryMenuOpen = React.useRef(false);

    const [shakeClassName, shake] = useShake();

    const handleNext = React.useCallback(() => {
        if (countryMenuOpen.current) {
            return;
        }
        if (dataField.input.value.trim() === '') {
            return shake();
        }
        doConfirm();
    }, [shakeClassName, doConfirm]);

    useShortcuts({ keys: ['Enter'], callback: handleNext });

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [errorText, shakeClassName]);

    const handlePhoneChange = React.useCallback((s: string) => {
        let val = new AsYouType('US').input(s);
        dataField.input.onChange(val);
    }, []);
    const handleMenuOpen = React.useCallback(() => {
        countryMenuOpen.current = true;
    }, []);
    const handleMenuClose = React.useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        countryMenuOpen.current = false;
    }, []);
    let parsedPhone = parsePhoneNumberFromString(codeField.value.value + dataField.value);
    let isPhoneValid = !!(parsedPhone && parsedPhone.isPossible());

    return (
        <>
            <AuthToastWrapper isVisible={!!errorText} text={errorText} className={phoneToast} />
            <FormLayout minWidth={0}>
                <AuthInputWrapper className={cx(shakeClassName)}>
                    <CountryPicker
                        value={codeField.input.value}
                        onOpen={handleMenuOpen}
                        onClose={handleMenuClose}
                        onChange={codeField.input.onChange}
                    />
                    <UInput
                        label="Phone number"
                        invalid={isInvalid}
                        type="tel"
                        ref={inputRef}
                        hasPlaceholder={true}
                        flexGrow={1}
                        flexShrink={1}
                        marginTop={32}
                        value={dataField.input.value}
                        onChange={handlePhoneChange}
                    />
                </AuthInputWrapper>
                <AuthActionButton
                    disable={!isPhoneValid}
                    text={InitTexts.auth.next}
                    loading={authSending}
                    onClick={handleNext}
                    marginTop={32}
                    tabIndex={0}
                />
            </FormLayout>
        </>
    );
};

const WebSignUpCreateWithEmail = (
    props: AskAuthDataProps,
) => {
    const {
        authError,
        setAuthValue,
        setAuthError,
        authValue,
        authSending,
    } = props;
    const authLoginStart = useAuthLoginStart({ ...props, isPhoneAuth: false });

    const form = useForm();

    let dataField = useField('input.data', authValue, form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            setAuthValue(dataField.value);
            setAuthError('');
            setTimeout(() => {
                let value = dataField.value.trim();
                authLoginStart(value);
            }, 100);
        });
    }, [dataField.value]);

    const errorText = (dataField.input.invalid && dataField.input.errorText) || authError;
    const isInvalid = !!errorText;
    const countryMenuOpen = React.useRef(false);

    const [shakeClassName, shake] = useShake();

    const handleNext = React.useCallback(() => {
        if (countryMenuOpen.current) {
            return;
        }
        if (dataField.input.value.trim() === '') {
            return shake();
        }
        doConfirm();
    }, [shakeClassName, doConfirm]);

    useShortcuts({ keys: ['Enter'], callback: handleNext });

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [errorText, shakeClassName]);

    return (
        <>
            <AuthToastWrapper isVisible={!!errorText} text={errorText} />
            <FormLayout>
                <Title text="What’s your email?" />
                <Subtitle text="We’ll send you a login code" />
                <AuthInputWrapper className={cx(shakeClassName)}>
                    <AuthInput
                        label={InitTexts.auth.emailPlaceholder}
                        invalid={isInvalid}
                        ref={inputRef}
                        value={dataField.input.value}
                        onChange={dataField.input.onChange}
                    />
                </AuthInputWrapper>
                <AuthActionButton
                    text={InitTexts.auth.next}
                    loading={authSending}
                    onClick={handleNext}
                    tabIndex={0}
                />
            </FormLayout>
        </>
    );
};

function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const AskAuthDataPage = (props: AskAuthDataProps) => {
    const router = React.useContext(XRouterContext)!;

    return (
        <Wrapper>
            <XDocumentHead title="What’s your email?" />
            <AuthHeaderConfig
                onBack={() => {
                    props.setAuthError('');
                    props.setAuthValue('');
                    router.replace('/signin');
                }}
            />
            <WebSignUpCreateWithEmail {...props} />
        </Wrapper>
    );
};
