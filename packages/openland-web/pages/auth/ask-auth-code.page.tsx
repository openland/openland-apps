import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { Wrapper } from '../onboarding/components/wrapper';
import {
    Title,
    Subtitle,
    FormLayout,
    AuthActionButton,
    AuthInputWrapper,
    AuthToastWrapper,
    AuthInput,
    useShake,
} from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { completeAuth } from './complete.page';
import { XImage } from 'react-mental';
import { AuthHeaderConfig } from './root.page';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { checkCode, AuthError, trackError } from './utils/checkCode';

type ActivationCodeProps = {
    authValue: string;
    phoneCodeValue: { value: string; label: string };
    authWasResend: boolean;
    authSending: boolean;
    backButtonClick: (event?: React.MouseEvent<any>) => void;
    resendCodeClick: (event?: React.MouseEvent<any>) => void;
    setAuthWasResend: (flag: boolean) => void;
    isExistingUser: boolean;
    avatarId: string | null;
};

const WebSignUpActivationCode = (
    props: ActivationCodeProps & {
        codeSending: boolean;
        codeError: string;
        setCodeError: Function;
        loginCodeStart: (codeValue: string) => void;
        isPhoneAuth: boolean;
    },
) => {
    const {
        authValue,
        resendCodeClick,
        authSending,
        authWasResend,
        phoneCodeValue,
        setAuthWasResend,
        codeSending,
        codeError,
        isPhoneAuth,
        setCodeError,
        loginCodeStart,
        isExistingUser,
        avatarId,
    } = props;

    const form = useForm();

    let codeField = useField('input.code', '', form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            setCodeError('');
            setAuthWasResend(false);
            setTimeout(() => {
                loginCodeStart(codeField.value);
            }, 100);
        });
    }, [codeField.value, authValue]);

    const [shakeClassName, shake] = useShake();

    const handleNext = React.useCallback(() => {
        doConfirm();
        if (codeField.input.value.trim() === '') {
            shake();
        }
    }, [shakeClassName, doConfirm]);

    useShortcuts({ keys: ['Enter'], callback: handleNext });

    const handleResend = React.useCallback(() => {
        resendCodeClick();
        setCodeError('');
        setAuthWasResend(false);
    }, []);

    const errorText = (codeField.input.invalid && codeField.input.errorText) || codeError;
    const isInvalid = !!errorText;
    const ops = '-/format/auto/-/scale_crop/72x72/center/-/quality/best/-/progressive/yes/';
    const opsRetina =
        '-/format/auto/-/scale_crop/144x144/center/-/quality/best/-/progressive/yes/ 2x';

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [errorText, shakeClassName, authWasResend]);

    const sendToText = isPhoneAuth
        ? phoneCodeValue.value.split(' ').join('') + authValue
        : authValue;

    return (
        <>
            <AuthToastWrapper
                isVisible={!authSending && !codeSending && !!errorText}
                text={errorText}
            />
            <AuthToastWrapper isVisible={authSending} text="Sending code" type="loading" />
            <AuthToastWrapper
                isVisible={authWasResend && !errorText}
                text="Code successfully sent"
                type="success"
            />
            <FormLayout>
                <Title text={InitTexts.auth.enterActivationCode} />
                <Subtitle>
                    We just sent it to {sendToText}.<br />
                    {InitTexts.auth.haveNotReceiveCode} <ULink onClick={handleResend}>Resend</ULink>
                </Subtitle>
                {!!avatarId && (
                    <XImage
                        alignSelf="center"
                        marginTop={16}
                        width={72}
                        height={72}
                        borderRadius="100%"
                        src={`https://ucarecdn.com/${avatarId}/${ops}`}
                        srcSet={`https://ucarecdn.com/${avatarId}/${opsRetina}`}
                    />
                )}
                <AuthInputWrapper className={shakeClassName}>
                    <AuthInput
                        pattern="[0-9]*"
                        type="number"
                        label={InitTexts.auth.codePlaceholder}
                        onChange={codeField.input.onChange}
                        invalid={isInvalid}
                        ref={inputRef}
                    />
                </AuthInputWrapper>
                <AuthActionButton
                    text={isExistingUser ? InitTexts.auth.done : InitTexts.auth.next}
                    loading={codeSending}
                    onClick={handleNext}
                />
            </FormLayout>
        </>
    );
};

export const AskAuthCodePage = (props: ActivationCodeProps) => {
    let router = React.useContext(XRouterContext)!;
    const isPhoneAuth = !!router.query.phone;

    const [codeError, setCodeError] = React.useState('');
    const [codeSending, setCodeSending] = React.useState(false);

    const onBackClick = () => {
        const path = isPhoneAuth
            ? '/authorization/ask-auth-data?phone=true'
            : '/authorization/ask-auth-data';

        router.replace(path);
        props.backButtonClick();
    };

    const loginCodeStart = async (codeValue: string) => {
        if (codeValue === '') {
            trackError('no_code');
            return;
        } else if (codeValue.length !== 6) {
            trackError('wrong_code_length');
            setCodeError(InitTexts.auth.wrongCodeLength);
            return;
        } else {
            setCodeSending(true);
            try {
                let token = await checkCode(codeValue, isPhoneAuth);
                await completeAuth(token);
            } catch (e) {
                let message = 'Something went wrong';
                if (!navigator.onLine) {
                    message = 'Check your connection and try again';
                } else if (e instanceof AuthError) {
                    message = e.message;
                }
                setCodeSending(false);
                setTimeout(() => {
                    setCodeError(message);
                }, 100);
            }
        }
    };

    return (
        <Wrapper>
            <XDocumentHead title="Enter login code" />
            <AuthHeaderConfig onBack={onBackClick} />

            <WebSignUpActivationCode
                {...props}
                codeError={codeError}
                codeSending={codeSending}
                loginCodeStart={loginCodeStart}
                setCodeError={setCodeError}
                backButtonClick={onBackClick}
                isPhoneAuth={isPhoneAuth}
            />
        </Wrapper>
    );
};
