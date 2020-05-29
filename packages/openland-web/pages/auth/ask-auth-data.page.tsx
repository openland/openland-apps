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
                const value = dataField.value.trim();
                const dataToFire = isPhoneAuth ? code + value : value;
                authLoginStart(dataToFire);
            }, 100);
        });
    }, [dataField.value]);

    const errorText = (dataField.input.invalid && dataField.input.errorText) || authError;
    const isInvalid = !!errorText;

    const [shakeClassName, shake] = useShake();

    const handleNext = React.useCallback(() => {
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
                <Title text={isPhoneAuth ? 'What’s your phone?' : 'What’s your email?'} />
                <Subtitle text="We’ll send you a login code" />
                {isPhoneAuth && (
                    <AuthInputWrapper>
                        <USelect
                            label="Code"
                            width="100%"
                            size="small"
                            searchable={true}
                            options={countriesCode}
                            optionRender={OptionRender}
                            onChange={codeField.input.onChange}
                            value={codeField.input.value}
                            marginTop={32}
                        />
                    </AuthInputWrapper>
                )}
                <AuthInputWrapper className={shakeClassName}>
                    <AuthInput
                        label={
                            isPhoneAuth
                                ? InitTexts.auth.phonePlaceholder
                                : InitTexts.auth.emailPlaceholder
                        }
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
