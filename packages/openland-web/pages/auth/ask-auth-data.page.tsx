import * as React from 'react';
import { cx, css } from 'linaria';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import {
    Wrapper,
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
import { AsYouType, parsePhoneNumberFromString, formatIncompletePhoneNumber, CountryCode } from 'libphonenumber-js';
import { CountryPicker, OptionType } from './components/CountryPicker';
import { countriesMeta } from 'openland-y-utils/auth/countriesMeta';
import { US_LABEL, RUSSIA_LABEL } from 'openland-y-utils/auth/constants';
import { validateEmail } from 'openland-y-utils/validateEmail';

export const INVALID_CODE_LABEL = 'Invalid country code';
export const SPACE_REGEX = /\s/g;
export const removeSpace = (s: string) => s.replace(SPACE_REGEX, '');

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

export const findCode = (val: string) => {
    if (val === '+1') {
        return { value: '+1', label: US_LABEL, shortname: 'US' };
    }
    if (val === '+7') {
        return { value: '+7', label: RUSSIA_LABEL, shortname: 'RU' };
    }
    return countriesMeta.find(country => country.value === val);
};

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
                let phone = new AsYouType(codeField.value.shortname as CountryCode);
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
    let parsedPhone = parsePhoneNumberFromString(codeField.value.value + dataField.value);
    let isPhoneValid = !!(parsedPhone && parsedPhone.isPossible());

    const handleNext = React.useCallback(() => {
        if (countryMenuOpen.current) {
            return;
        }
        if (dataField.input.value.trim() === '' || !isPhoneValid) {
            return shake();
        }
        doConfirm();
    }, [shakeClassName, doConfirm]);

    useShortcuts({ keys: ['Enter'], callback: handleNext });

    const codeRef = React.useRef<HTMLInputElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [errorText, shakeClassName]);

    const [codeWidth, setCodeWidth] = React.useState<string>(`calc(${codeField.input.value.value.length}ch + 32px)`);

    React.useEffect(() => {
        setCodeWidth(`calc(${codeField.input.value.value.length}ch + 34px)`);
    }, [codeField.input.value.value]);

    const handleCountryCodeChange = React.useCallback((str: string) => {
        let v = '+' + removeSpace(str).replace(/\+/g, '');
        if (!/^\+(\d|-|\(|\))*$/.test(v)) {
            return true;
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
            codeField.input.onChange(existing);
            let parsed = parsePhoneNumberFromString(v) || parsePhoneNumberFromString(v + dataField.value);
            if (parsed) {
                let formatted = formatIncompletePhoneNumber(existing.value + parsed.nationalNumber, codeField.value.shortname as CountryCode);
                dataField.input.onChange(formatted.replace(existing.value, '').trim());
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        } else {
            codeField.input.onChange({ value: v, label: INVALID_CODE_LABEL, shortname: '' });
        }
        setCodeWidth(`calc(${existing?.value.length || v.length}ch + 34px)`);
        return true;
    }, [countriesMeta, dataField.value]);

    const handlePhoneKeyDown = React.useCallback((e: React.KeyboardEvent) => {
        if (e.keyCode === 8 && inputRef.current?.value === '') {
            if (codeRef.current) {
                e.preventDefault();
                codeRef.current.focus();
            }
        }
    }, [dataField.input.value]);

    const handlePhoneChange = React.useCallback((value: string) => {
        let code = codeField.value.value.split(' ').join('');
        if (value === '') {
            dataField.input.onChange('');
            return true;
        }
        let parsed = parsePhoneNumberFromString(value);
        if (parsed && parsed.isPossible()) {
            let codeString = `+${parsed.countryCallingCode}`;
            let codeValue = findCode(codeString);
            if (codeValue) {
                codeField.input.onChange(codeValue);
                code = codeString;
                value = parsed.nationalNumber as string;
            }
        }

        let formatted = formatIncompletePhoneNumber(code + value, codeField.value.shortname as CountryCode);
        dataField.input.onChange(formatted.replace(code, '').trim());
        return true;
    }, [codeField.value, dataField.value]);
    const handleMenuOpen = React.useCallback(() => {
        countryMenuOpen.current = true;
    }, []);
    const handleMenuClose = React.useCallback(() => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
            countryMenuOpen.current = false;
        }, 200);
    }, []);

    return (
        <>
            <AuthToastWrapper isVisible={!!errorText} text={errorText} className={phoneToast} />
            <FormLayout minWidth={0}>
                <Title text="What’s your phone?" />
                <Subtitle text="We’ll send you a sign-in code" />
                <AuthInputWrapper className={cx(shakeClassName)}>
                    <CountryPicker
                        value={codeField.input.value}
                        onOpen={handleMenuOpen}
                        onClose={handleMenuClose}
                        onChange={(s) => {
                            codeField.input.onChange(s);
                            dataField.input.onChange('');
                        }}
                    />
                </AuthInputWrapper>
                <AuthInputWrapper className={cx(shakeClassName)}>
                    <UInput
                        ref={codeRef}
                        marginRight={8}
                        flexShrink={1}
                        marginTop={16}
                        minWidth={72}
                        type="tel"
                        autoComplete="tel"
                        value={codeField.input.value.value}
                        hasPlaceholder={true}
                        width={codeWidth}
                        onChange={handleCountryCodeChange}
                    />
                    <UInput
                        label="Phone number"
                        invalid={isInvalid}
                        type="tel"
                        autoComplete="tel"
                        ref={inputRef}
                        hasPlaceholder={true}
                        flexGrow={1}
                        flexShrink={1}
                        marginTop={16}
                        value={dataField.value}
                        onChange={handlePhoneChange}
                        onKeyDown={handlePhoneKeyDown}
                    />
                </AuthInputWrapper>
                <AuthActionButton
                    // disable={!isPhoneValid}
                    text={InitTexts.auth.next}
                    loading={authSending}
                    onClick={handleNext}
                    marginTop={32}
                    tabIndex={0}
                    id="next"
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
        let timeoutId: any;
        timeoutId = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 200);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [errorText, shakeClassName]);

    return (
        <>
            <AuthToastWrapper isVisible={!!errorText} text={errorText} />
            <FormLayout>
                <Title text="What’s your email?" />
                <Subtitle text="We’ll send you a sign-in code" />
                <AuthInputWrapper className={cx(shakeClassName)}>
                    <AuthInput
                        label={InitTexts.auth.emailPlaceholder}
                        invalid={isInvalid}
                        ref={inputRef}
                        value={dataField.input.value}
                        onChange={dataField.input.onChange}
                        id="authEmailInput"
                    />
                </AuthInputWrapper>
                <AuthActionButton
                    text={InitTexts.auth.next}
                    loading={authSending}
                    onClick={handleNext}
                    tabIndex={0}
                    id="authEmailNext"
                />
            </FormLayout>
        </>
    );
};

export const AskAuthDataPage = (props: AskAuthDataProps) => {
    const router = React.useContext(XRouterContext)!;
    const isPhoneAuth = !!router.query.phone;

    return (
        <Wrapper>
            <XDocumentHead title={isPhoneAuth ? 'What’s your phone?' : 'What’s your email?'} />
            <AuthHeaderConfig
                onBack={() => {
                    props.setAuthError('');
                    props.setAuthValue('');
                    router.replace('/signin');
                }}
            />
            {isPhoneAuth && <SignUpWithPhone {...props} />}
            {!isPhoneAuth && <WebSignUpCreateWithEmail {...props} />}
        </Wrapper>
    );
};
