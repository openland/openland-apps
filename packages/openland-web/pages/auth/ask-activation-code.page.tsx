import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { InputField } from 'openland-web/components/InputField';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { useForm } from 'openland-form/useForm';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XButton } from 'openland-x/XButton';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { useField } from 'openland-form/useField';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    ErrorText,
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { trackEvent } from 'openland-x-analytics';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';
import { XInput } from 'openland-x/XInput';
import { XShortcuts } from 'openland-x/XShortcuts';

const SmallerText = Glamorous.div({
    opacity: 0.6,
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
});

const ResendCodeRow = Glamorous(XVertical)({
    marginTop: 12,
});

const ResendButton = Glamorous(XButton)({
    height: 20,
    '& .button-content': {
        paddingLeft: 4,
        paddingRight: 0,
        fontWeight: 'normal',
        fontSize: 13,
    },
});

type ActivationCodeProps = {
    emailValue: string;
    signin: boolean;
    emailWasResend: boolean;
    emailSending: boolean;
    backButtonClick: (event?: React.MouseEvent<any>) => void;
    resendCodeClick: (event?: React.MouseEvent<any>) => void;
    emailSendedTo: string;
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

type ActivationCodeInnerProps = {
    codeSending: boolean;
    codeError: string;
    loginCodeStart: (a: { emailValue: string; codeValue: string }) => void;
};

export const WebSignUpActivationCode = ({
    signin,
    emailValue,
    resendCodeClick,
    emailSendedTo,
    emailSending,
    emailWasResend,
    codeSending,
    codeError,
    loginCodeStart,
}: ActivationCodeProps & ActivationCodeInnerProps) => {
    const isMobile = useIsMobile();
    const form = useForm();

    let codeField = useField('input.code', '', form, [
        {
            checkIsValid: value => value !== '',
            text: "Activation code cant't be empty",
        },
    ]);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            loginCodeStart({ emailValue, codeValue: codeField.value });
        });
    }, [codeField.value, emailValue]);

    const sendingCodeText = 'Sending code...';

    const onEnter = () => {
        doConfirm();
    };

    return (
        <XShortcuts
            handlerMap={{
                ENTER: onEnter,
            }}
            keymap={{
                ENTER: {
                    osx: ['enter'],
                    windows: ['enter'],
                },
            }}
        >
            <XView alignItems="center" flexGrow={1} justifyContent="center" marginTop={-100}>
                <Title roomView={false}>{InitTexts.auth.enterActivationCode}</Title>
                {emailSending && <SubTitle>{sendingCodeText}</SubTitle>}
                {!emailSending && emailSendedTo && (
                    <SubTitle>
                        We just sent it to <strong>{emailSendedTo}</strong>
                    </SubTitle>
                )}
                <ButtonsWrapper marginTop={40} width={isMobile ? 300 : '100%'}>
                    <InputField
                        width={isMobile ? undefined : 300}
                        pattern="[0-9]*"
                        type="number"
                        autofocus={true}
                        title={InitTexts.auth.codePlaceholder}
                        flexGrow={1}
                        flexShrink={0}
                        field={codeField}
                    />
                    {form.error && <ErrorText>{codeError}</ErrorText>}
                </ButtonsWrapper>

                <ButtonsWrapper marginTop={20}>
                    <XVertical alignItems="center">
                        <XHorizontal alignItems="center">
                            <XButton
                                loading={codeSending}
                                onClick={doConfirm}
                                size="large"
                                style="primary"
                                alignSelf="center"
                                text={InitTexts.auth.continue}
                            />
                        </XHorizontal>
                    </XVertical>
                </ButtonsWrapper>
                <XView position="absolute" bottom={20} width="100%">
                    <ResendCodeRow alignItems="center">
                        <XHorizontal alignItems="center" separator="none">
                            {emailSending ? (
                                <SmallerText />
                            ) : (
                                <>
                                    <SmallerText>
                                        {emailWasResend
                                            ? 'Code successfully sent.'
                                            : InitTexts.auth.haveNotReceiveCode}
                                    </SmallerText>
                                    <ResendButton
                                        onClick={resendCodeClick}
                                        style="link"
                                        text={InitTexts.auth.resend}
                                    />
                                </>
                            )}
                        </XHorizontal>
                    </ResendCodeRow>
                </XView>
            </XView>
        </XShortcuts>
    );
};

export const RoomActivationCode = ({
    signin,
    backButtonClick,
    codeError,
    emailWasResend,
    emailSending,
    resendCodeClick,
    emailSendedTo,
    codeSending,
    emailValue,
    loginCodeStart,
}: ActivationCodeProps & ActivationCodeInnerProps) => {
    const form = useForm();

    let codeField = useField('input.code', '', form, [
        {
            checkIsValid: value => value !== '',
            text: "Activation code cant't be empty",
        },
    ]);
    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            loginCodeStart({ emailValue, codeValue: codeField.value });
        });
    }, [codeField.value, emailValue]);

    const onEnter = () => {
        doConfirm();
    };

    return (
        <XShortcuts
            handlerMap={{
                ENTER: onEnter,
            }}
            keymap={{
                ENTER: {
                    osx: ['enter'],
                    windows: ['enter'],
                },
            }}
        >
            <Title roomView={true}>{InitTexts.auth.enterActivationCode}</Title>
            {emailSendedTo && (
                <SubTitle>
                    We just sent it to <strong>{emailSendedTo}</strong>
                </SubTitle>
            )}
            <ButtonsWrapper marginTop={40} width={280}>
                <XInput
                    invalid={codeError !== ''}
                    pattern="[0-9]*"
                    type="number"
                    autofocus={true}
                    size="large"
                    placeholder={InitTexts.auth.codePlaceholder}
                    flexGrow={1}
                    flexShrink={0}
                    {...codeField.input}
                />
                {form.error && <ErrorText>{codeError}</ErrorText>}
            </ButtonsWrapper>
            <ResendCodeRow alignItems="center">
                <XHorizontal alignItems="center" separator="none">
                    {emailSending ? (
                        <>
                            <SmallerText>Sending code...</SmallerText>
                        </>
                    ) : (
                        <>
                            <SmallerText>
                                {emailWasResend
                                    ? 'Code successfully sent.'
                                    : InitTexts.auth.haveNotReceiveCode}
                            </SmallerText>
                            <ResendButton
                                onClick={resendCodeClick}
                                style="link"
                                text={InitTexts.auth.resend}
                            />
                        </>
                    )}
                </XHorizontal>
            </ResendCodeRow>
            <ButtonsWrapper marginTop={20} marginBottom={84} width={280}>
                <XVertical alignItems="center">
                    <XHorizontal alignItems="center">
                        <XButton
                            onClick={backButtonClick}
                            size="large"
                            style="ghost"
                            alignSelf="center"
                            text={'Back'}
                        />
                        <XButton
                            loading={codeSending}
                            onClick={doConfirm}
                            size="large"
                            style="primary"
                            alignSelf="center"
                            text={InitTexts.auth.continue}
                        />
                    </XHorizontal>
                </XVertical>
            </ButtonsWrapper>
        </XShortcuts>
    );
};

export const AskActivationPage = (props: ActivationCodeProps & { roomView: boolean }) => {
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
            setCodeError(InitTexts.auth.wrongCodeLength);
            setCodeSending(true);

            createAuth0Client().passwordlessVerify(
                {
                    connection: 'email',
                    email: emailValue,
                    verificationCode: codeValue,
                },
                (error: any, v) => {
                    trackError(error.code);
                    console.warn(error);
                    if (error) {
                        setCodeSending(false);
                        setCodeError(InitTexts.auth.wrongCodeLength);
                    } else {
                        // Ignore. Should be redirect to completion page.
                    }
                },
            );
        }
    };

    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Discover" />
            {!props.roomView && (
                <>
                    <TopBar progressInPercents={getPercentageOfOnboarding(2)} />
                    <XView marginTop={34}>
                        <BackSkipLogo
                            onBack={() => {
                                router.replace('/auth/ask-email');
                                props.backButtonClick();
                            }}
                            onSkip={null}
                        />
                    </XView>

                    <WebSignUpActivationCode
                        {...props}
                        codeError={codeError}
                        codeSending={codeSending}
                        loginCodeStart={loginCodeStart}
                        backButtonClick={() => {
                            router.replace('/auth/ask-email');
                            props.backButtonClick();
                        }}
                    />
                </>
            )}
            {props.roomView && (
                <RoomSignupContainer pageMode="ActivationCode">
                    <RoomActivationCode
                        {...props}
                        codeError={codeError}
                        codeSending={codeSending}
                        loginCodeStart={loginCodeStart}
                        backButtonClick={() => {
                            router.replace('/auth/ask-email');
                            props.backButtonClick();
                        }}
                    />
                </RoomSignupContainer>
            )}
        </XView>
    );
};

export default withApp('Home', 'viewer', () => (
    <AskActivationPage
        roomView={false}
        signin={true}
        backButtonClick={() => {
            //
        }}
        resendCodeClick={() => {
            //
        }}
        emailValue=""
        emailSendedTo=""
        emailSending={false}
        emailWasResend={false}
    />
));
