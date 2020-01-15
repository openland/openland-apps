import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { trackEvent } from 'openland-x-analytics';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, FormLayout, AuthActionButton, AuthInput } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { completeAuth } from './complete.page';
import { API_AUTH_ENDPOINT } from 'openland-x-graphql/endpoint';

export type ActivationCodeProps = {
    emailValue: string;
    emailWasResend: boolean;
    emailSending: boolean;
    backButtonClick: (event?: React.MouseEvent<any>) => void;
    resendCodeClick: (event?: React.MouseEvent<any>) => void;
    emailSendedTo: string;
    isMobile: boolean;
    isExistingUser: boolean;
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
    codeSending,
    codeError,
    loginCodeStart,
    isExistingUser,
    isMobile,
}: ActivationCodeProps & {
    codeSending: boolean;
    codeError: string;
    loginCodeStart: (a: { emailValue: string; codeValue: string }) => void;
}) => {
    const form = useForm();

    let codeField = useField('input.code', '', form, [
        {
            checkIsValid: value => value !== '',
            text: "Please enter the 6-digit code we've just sent to your email",
        },
    ]);

    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                loginCodeStart({ emailValue, codeValue: codeField.value });
            });
        },
        [codeField.value, emailValue],
    );

    const sendingCodeText = 'Sending code...';

    useShortcuts({ keys: ['Enter'], callback: doConfirm });

    const errorText = (codeField.input.invalid && codeField.input.errorText) || codeError;
    const isInvalid = !!errorText;

    return (
        <FormLayout>
            <Title text={InitTexts.auth.enterActivationCode} />
            <Subtitle>
                {emailSending ? (
                    sendingCodeText
                ) : (
                        <>
                            We just sent it to {emailSendedTo}.<br />
                            {emailWasResend ? 'Code successfully sent.' : InitTexts.auth.haveNotReceiveCode} <a onClick={resendCodeClick}>Resend</a>
                        </>
                    )}
            </Subtitle>
            {/* {isExistingUser && <XView alignSelf="center" marginTop={16} width={72} height={72} backgroundColor="black" borderRadius={100} />} */}
            <AuthInput
                isMobile={isMobile}
                pattern="[0-9]*"
                type="number"
                label={InitTexts.auth.codePlaceholder}
                onChange={codeField.input.onChange}
                invalid={isInvalid}
            />
            {isInvalid && <XErrorMessage2 message={errorText} />}
            {/* <AuthActionButton text={isExistingUser ? InitTexts.auth.done : InitTexts.auth.next} loading={codeSending} onClick={doConfirm} /> */}
            <AuthActionButton text={InitTexts.auth.next} loading={codeSending} onClick={doConfirm} />
        </FormLayout>
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

            setCodeError(InitTexts.auth.noCode);

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
                setCodeError(e instanceof AuthError ? e.message : 'Something went wrong');
                setCodeSending(false);
            }

        }
    };

    return (
        <Wrapper>
            <XDocumentHead title="Enter login code" />
            <BackSkipLogo
                onBack={() => {
                    router.replace('/authorization/ask-email');
                    props.backButtonClick();
                }}
                onSkip={null}
            />

            <WebSignUpActivationCode
                {...props}
                codeError={codeError}
                codeSending={codeSending}
                loginCodeStart={loginCodeStart}
                backButtonClick={() => {
                    router.replace('/authorization/ask-email');
                    props.backButtonClick();
                }}
            />
        </Wrapper>
    );
};
