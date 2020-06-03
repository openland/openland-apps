import * as React from 'react';
import { css, cx } from 'linaria';
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
import { USelect, OptionType } from 'openland-web/components/unicorn/USelect';
import { countriesCode } from 'openland-y-utils/countriesCodes';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { AuthHeaderConfig } from './root.page';
import { TextBody, TextDensed } from '../../utils/TextStyles';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';

const INVALID_CODE_LABEL = 'Invalid country code';
const SPACE_REGEX = /\s/g;
const removeSpace = (s: string) => s.replace(SPACE_REGEX, '');
const US_LABEL = 'United States';

const optionContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    padding-left: 16px;
`;

const optionLabelStyle = css`
    font-weight: normal;
    color: var(--foregroundPrimary);
    text-align: start;
`;

const optionSubtitleStyle = css`
    color: var(--foregroundSecondary);
`;

const OptionRender = (option: OptionType) => (
    <div className={optionContainer}>
        <div className={cx(optionLabelStyle, TextBody)}>{option.label}</div>
        <div className={cx(optionSubtitleStyle, TextDensed)}>{option.value}</div>
    </div>
);

const filterCountryOption = ({ label: rawLabel, value }: { label: string, value: string }, rawInput: string) => {
    let label = rawLabel.toLowerCase();
    let input = rawInput.toLowerCase();
    if (label === US_LABEL.toLowerCase() && ['usa', 'america', 'united states of america', 'u.s.'].some(x => x.startsWith(input))) {
        return true;
    }
    return label.startsWith(input) || removeSpace(value).replace(/\+/g, '').startsWith(removeSpace(rawInput));
};

const findCode = (val: string) => {
    if (val === '+1') {
        return { value: '+1', label: US_LABEL };
    }
    return countriesCode.find(country => removeSpace(country.value) === val);
};

type AskAuthDataProps = {
    fireAuth: (data: string, isPhoneFire: boolean) => Promise<void>;
    phoneCodeValue: { value: string; label: string };
    authError: string;
    authValue: string;
    authSending: boolean;
    setPhoneCodeValue: Function;
    setAuthSending: Function;
    setAuthError: Function;
    setAuthValue: Function;
};

const WebSignUpCreateWithEmail = (
    props: AskAuthDataProps & {
        authLoginStart: (a: string) => void;
        isPhoneAuth: boolean;
    },
) => {
    const {
        authError,
        setAuthValue,
        setAuthError,
        authValue,
        setPhoneCodeValue,
        phoneCodeValue,
        authLoginStart,
        authSending,
        isPhoneAuth,
    } = props;
    const form = useForm();

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
                if (isPhoneAuth) {
                    let phone = new AsYouType('US');
                    phone.input(code + value);
                    let phoneNumber = phone.getNumber();

                    if (phoneNumber) {
                        value = phoneNumber.number as string;
                    }
                }
                authLoginStart(value);
            }, 100);
        });
    }, [codeField.value, dataField.value]);

    const errorText = (dataField.input.invalid && dataField.input.errorText) || authError;
    const isInvalid = !!errorText;
    const countryMenuFocused = React.useRef(false);

    const [shakeClassName, shake] = useShake();

    const handleNext = React.useCallback(() => {
        if (countryMenuFocused.current) {
            return;
        }
        if (dataField.input.value.trim() === '' || codeField.input.value.label === INVALID_CODE_LABEL) {
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
        if (!/^\+\d*$/.test(v)) {
            return true;
        }
        let existing;
        if (v.length >= 6) {
            try {
                let parsedPhone = parsePhoneNumberFromString(v);
                if (parsedPhone) {
                    existing = findCode('+' + parsedPhone.countryCallingCode);
                    if (existing) {
                        dataField.input.onChange(parsedPhone.formatNational());
                        if (inputRef.current) {
                            inputRef.current.focus();
                        }
                    }
                }
            } catch (error) {
                console.warn('Phone parsing failed:', error);
            }
        } else {
            existing = findCode(v);
        }
        if (existing) {
            codeField.input.onChange(existing);
        } else {
            codeField.input.onChange({ value: v, label: INVALID_CODE_LABEL });
        }
        setCodeWidth(`calc(${v.length}ch + 34px)`);
        return true;
    }, [countriesCode]);
    const handlePhoneChange = React.useCallback((s: string) => {
        let val = new AsYouType('US').input(s);
        dataField.input.onChange(val);
    }, []);
    const handlePhoneKeyDown = React.useCallback((e: React.KeyboardEvent) => {
        if (e.keyCode === 8 && dataField.input.value === '') {
            if (codeRef.current) {
                e.preventDefault();
                codeRef.current.focus();
            }
        }
    }, [dataField.input.value]);
    const handleMenuFocus = React.useCallback(() => {
        countryMenuFocused.current = true;
    }, []);
    const handleMenuBlur = React.useCallback(() => {
        setTimeout(() => {
            countryMenuFocused.current = false;
        }, 200);
    }, []);
    const handleMenuClose = React.useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const inputContent = isPhoneAuth ? (
        <>
            <UInput
                ref={codeRef}
                marginTop={32}
                marginRight={8}
                flexShrink={1}
                value={codeField.input.value.value}
                hasPlaceholder={true}
                width={codeWidth}
                onChange={handleCountryCodeChange}
            />
            <UInput
                label={InitTexts.auth.phonePlaceholder}
                invalid={isInvalid}
                type="tel"
                ref={inputRef}
                hasPlaceholder={true}
                flexGrow={1}
                marginTop={32}
                value={dataField.input.value}
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKeyDown}
            />
        </>
    ) : (
            <AuthInput
                label={InitTexts.auth.emailPlaceholder}
                invalid={isInvalid}
                ref={inputRef}
                value={dataField.input.value}
                onChange={dataField.input.onChange}
            />
        );

    return (
        <>
            <AuthToastWrapper isVisible={!!errorText} text={errorText} />
            <FormLayout>
                <Title text={isPhoneAuth ? 'What’s your phone?' : 'What’s your email?'} />
                <Subtitle text="We’ll send you a login code" />
                {isPhoneAuth && (
                    <AuthInputWrapper className={shakeClassName}>
                        <USelect
                            label="Code"
                            width="100%"
                            size="small"
                            searchable={true}
                            virtual={true}
                            options={countriesCode}
                            optionRender={OptionRender}
                            onChange={codeField.input.onChange}
                            value={codeField.input.value}
                            onFocus={handleMenuFocus}
                            onBlur={handleMenuBlur}
                            onMenuClose={handleMenuClose}
                            filterOption={filterCountryOption}
                            marginTop={32}
                        />
                    </AuthInputWrapper>
                )}
                <AuthInputWrapper className={shakeClassName}>
                    {inputContent}
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
    const { fireAuth, setAuthError, setAuthSending } = props;
    const router = React.useContext(XRouterContext)!;
    const isPhoneAuth = !!router.query.phone;

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

    return (
        <Wrapper>
            <XDocumentHead title={isPhoneAuth ? 'What’s your phone?' : 'What’s your email?'} />
            <AuthHeaderConfig
                onBack={() => {
                    router.replace('/signin');
                }}
            />
            <WebSignUpCreateWithEmail
                {...props}
                authLoginStart={authLoginStart}
                isPhoneAuth={isPhoneAuth}
            />
        </Wrapper>
    );
};
