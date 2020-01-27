import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { trackEvent } from 'openland-x-analytics';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, FormLayout, AuthActionButton, AuthInputWrapper, AuthToastWrapper, AuthInput, useShake } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { completeAuth } from './complete.page';
import { API_AUTH_ENDPOINT } from 'openland-x-graphql/endpoint';
import { XImage } from 'react-mental';
import { AuthHeaderConfig } from './root.page';
import { ULink } from 'openland-web/components/unicorn/ULink';

export type ActivationCodeProps = {
    emailValue: string;
    emailWasResend: boolean;
    emailSending: boolean;
    backButtonClick: (event?: React.MouseEvent<any>) => void;
    resendCodeClick: (event?: React.MouseEvent<any>) => void;
    setEmailWasResend: (flag: boolean) => void;
    emailSendedTo: string;
    isMobile: boolean;
    isExistingUser: boolean;
    avatarId: string | null;
};

const trackError = (error: string) => {
    if (
        [
            'code_expired',
            'invalid_user_password',
            'wrong_code',
            'wrong_code_length',
            'no_code',
        ].includes(error)
    ) {
        let e =
            error === 'wrong_code_length' || error === 'invalid_user_password'
                ? 'wrong_code'
                : error;

        trackEvent('code_error', { error_type: e });
    } else {
        trackEvent('signup_error', { error_type: error });
    }
};

export const WebSignUpActivationCode = ({
    emailValue,
    resendCodeClick,
    emailSendedTo,
    emailSending,
    emailWasResend,
    setEmailWasResend,
    codeSending,
    codeError,
    setCodeError,
    loginCodeStart,
    isExistingUser,
    avatarId,
    isMobile,
}: ActivationCodeProps & {
    codeSending: boolean;
    codeError: string;
    setCodeError: Function;
    loginCodeStart: (a: { emailValue: string; codeValue: string }) => void;
}) => {
    const form = useForm();

    let codeField = useField('input.code', '', form);

    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                setCodeError('');
                setEmailWasResend(false);
                setTimeout(() => {
                    loginCodeStart({ emailValue, codeValue: codeField.value });
                }, 100);
            });
        },
        [codeField.value, emailValue],
    );

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
        setEmailWasResend(false);
    }, []);

    const errorText = (codeField.input.invalid && codeField.input.errorText) || codeError;
    const isInvalid = !!errorText;
    const ops = '-/format/auto/-/scale_crop/72x72/center/-/quality/best/-/progressive/yes/';
    const opsRetina = '-/format/auto/-/scale_crop/144x144/center/-/quality/best/-/progressive/yes/ 2x';

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [errorText, shakeClassName, emailWasResend]);

    return (
        <>
            <AuthToastWrapper isVisible={!emailSending && !!errorText} text={errorText} />
            <AuthToastWrapper isVisible={emailSending} text="Sending code" type="loading" />
            <AuthToastWrapper isVisible={emailWasResend && !errorText} text="Code successfully sent" type="success" />
            <FormLayout>
                <Title text={InitTexts.auth.enterActivationCode} />
                <Subtitle>
                    We just sent it to {emailSendedTo}.<br />
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
                <AuthActionButton text={isExistingUser ? InitTexts.auth.done : InitTexts.auth.next} loading={codeSending} onClick={handleNext} />
            </FormLayout>
        </>
    );
};

class AuthError extends Error { }
export const checkCode = async (codeValue: string) => {
    let res = await (await fetch(API_AUTH_ENDPOINT + '/checkCode', {
        body: JSON.stringify({
            session: localStorage.getItem('authSession'),
            code: codeValue,
        }),
        headers: [['Content-Type', 'application/json']],
        method: 'POST',
    })).json();
    if (!res.ok) {
        throw new AuthError(res.errorText || 'Something went wrong');
    }
    let res2 = await (await fetch(API_AUTH_ENDPOINT + '/getAccessToken', {
        body: JSON.stringify({
            session: localStorage.getItem('authSession'),
            authToken: res.authToken,
        }),
        headers: [['Content-Type', 'application/json']],
        method: 'POST',
    })).json();
    if (!res2.ok) {
        throw new AuthError(res2.errorText || 'Something went wrong');
    }
    return res2.accessToken as string;
};

export const AskActivationPage = (props: ActivationCodeProps) => {
    let router = React.useContext(XRouterContext)!;
    const [codeError, setCodeError] = React.useState('');
    const [codeSending, setCodeSending] = React.useState(false);

    const loginCodeStart = async ({
        emailValue,
        codeValue,
    }: {
        emailValue: string;
        codeValue: string;
    }) => {
        console.log('loginCodeStart');
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
                let token = await checkCode(codeValue);
                await completeAuth(token);
            } catch (e) {
                let message = 'Something went wrong';
                if (e instanceof AuthError) {
                    message = e.message;
                } else if (!navigator.onLine) {
                    message = 'Check your connection and try again';
                }
                setCodeError(message);
                setCodeSending(false);
            }

        }
    };

    return (
        <Wrapper>
            <XDocumentHead title="Enter login code" />
            <AuthHeaderConfig
                onBack={() => {
                    router.replace('/authorization/ask-email');
                    props.backButtonClick();
                }}
            />

            <WebSignUpActivationCode
                {...props}
                codeError={codeError}
                codeSending={codeSending}
                loginCodeStart={loginCodeStart}
                setCodeError={setCodeError}
                backButtonClick={() => {
                    router.replace('/authorization/ask-email');
                    props.backButtonClick();
                }}
            />
        </Wrapper>
    );
};
