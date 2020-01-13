import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { trackEvent } from 'openland-x-analytics';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, FormLayout } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { completeAuth } from './complete.page';
import { API_AUTH_ENDPOINT } from 'openland-x-graphql/endpoint';

export type ActivationCodeProps = {
    emailValue: string;
    signin: boolean;
    emailWasResend: boolean;
    emailSending: boolean;
    backButtonClick: (event?: React.MouseEvent<any>) => void;
    resendCodeClick: (event?: React.MouseEvent<any>) => void;
    emailSendedTo: string;
    isMobile: boolean;
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

    const button = (
        <UButton
            loading={codeSending}
            onClick={doConfirm}
            size="large"
            style="primary"
            alignSelf="center"
            text={InitTexts.auth.continue}
        />
    );

    const resendEmail = (
        <>
            <XView color="rgba(0, 0, 0, 0.5)" fontSize={14} marginRight={6}>
                {emailWasResend ? 'Code successfully sent.' : InitTexts.auth.haveNotReceiveCode}
            </XView>
            <XView onClick={resendCodeClick} color="#1790ff" cursor="pointer" as="a">
                <strong>{InitTexts.auth.resend}</strong>
            </XView>
        </>
    );

    return (
        <FormLayout
            top={
                <>
                    <Title text={InitTexts.auth.enterActivationCode} />
                    <XView color="var(--foregroundSecondary)" marginBottom={32} marginTop={8}>
                        <Subtitle>
                            {emailSending ? (
                                sendingCodeText
                            ) : (
                                    <>
                                        We just sent it to
                                    <strong>{' ' + emailSendedTo}</strong>
                                    </>
                                )}
                        </Subtitle>
                    </XView>
                    <XView width={isMobile ? '100%' : 360} maxWidth={360}>
                        <UInput
                            width={isMobile ? '100%' : 360}
                            pattern="[0-9]*"
                            type="number"
                            autofocus={true}
                            label={InitTexts.auth.codePlaceholder}
                            flexGrow={1}
                            flexShrink={0}
                            onChange={codeField.input.onChange}
                            invalid={isInvalid}
                        />
                        {isInvalid && <XErrorMessage2 message={errorText} />}
                        <XView marginTop={30} flexDirection="row" justifyContent="center">
                            {resendEmail}
                        </XView>
                    </XView>
                </>
            }
            bottom={button}
        />
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
            <XDocumentHead title="Activation code" />
            <BackSkipLogo
                onBack={() => {
                    router.replace('/authorization/ask-email');
                    props.backButtonClick();
                }}
                onSkip={null}
                noLogo={props.isMobile}
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
