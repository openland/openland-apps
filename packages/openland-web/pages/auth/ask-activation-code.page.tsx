import * as React from 'react';
import { XView } from 'react-mental';
import { InputField } from 'openland-web/components/InputField';
import { useForm } from 'openland-form/useForm';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XButton } from 'openland-x/XButton';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { trackEvent } from 'openland-x-analytics';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { RoomActivationCode } from './components/roomActivationCode';
import { RoomContainerParams } from './root.page';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, ContinueButtonContainer } from './components/authComponents';

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

export type ActivationCodeInnerProps = {
    roomView: boolean;
    codeSending: boolean;
    codeError: string;
    loginCodeStart: (a: { emailValue: string; codeValue: string }) => void;
};

export type ActivationCodeOuterProps = {
    roomView: boolean;
    roomContainerParams?: RoomContainerParams;
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
}: ActivationCodeProps & ActivationCodeInnerProps) => {
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

    const onEnter = () => {
        doConfirm();
    };

    const errorText = (codeField.input.invalid && codeField.input.errorText) || codeError;
    const isInvalid = !!errorText;

    const button = (
        <XButton
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
            <XView onClick={resendCodeClick} color="#1790ff" cursor="pointer">
                <strong>{InitTexts.auth.resend}</strong>
            </XView>
        </>
    );

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
            <XView
                alignItems="center"
                flexGrow={1}
                paddingHorizontal={20}
                justifyContent="center"
                marginTop={-100}
            >
                <Title text={InitTexts.auth.enterActivationCode} />
                {emailSending && <Subtitle text={sendingCodeText} />}
                {!emailSending &&
                    emailSendedTo && (
                        <XView
                            fontSize={16}
                            color="#000"
                            marginBottom={34}
                            flexDirection="row"
                            alignItems="center"
                        >
                            <XView marginRight={6}>We just sent it to</XView>
                            <strong>{emailSendedTo}</strong>
                        </XView>
                    )}
                <XView width={isMobile ? '100%' : 360} maxWidth={360}>
                    <InputField
                        width={isMobile ? '100%' : 300}
                        pattern="[0-9]*"
                        type="number"
                        autofocus={true}
                        title={InitTexts.auth.codePlaceholder}
                        flexGrow={1}
                        flexShrink={0}
                        hideErrorText
                        field={codeField}
                        invalid={isInvalid}
                    />
                    {isInvalid && <XErrorMessage2 message={errorText} />}
                    {isMobile && (
                        <XView marginTop={30} flexDirection="row" justifyContent="center">
                            {resendEmail}
                        </XView>
                    )}
                </XView>
                <ContinueButtonContainer
                    marginTop={isInvalid ? 14 : 40}
                    isMobile={isMobile}
                    button={button}
                />
                {!isMobile && (
                    <XView
                        position="absolute"
                        bottom={20}
                        width="100%"
                        flexDirection="row"
                        justifyContent="center"
                    >
                        {resendEmail}
                    </XView>
                )}
            </XView>
        </XShortcuts>
    );
};

export const AskActivationPage = (props: ActivationCodeProps & ActivationCodeOuterProps) => {
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
        <>
            {!props.roomView && (
                <Wrapper>
                    <XDocumentHead title="Activation code" />
                    <TopBar progressInPercents={getPercentageOfOnboarding(2)} />
                    <XView marginTop={props.isMobile ? 15 : 34}>
                        <BackSkipLogo
                            onBack={() => {
                                router.replace('/authorization/ask-email');
                                props.backButtonClick();
                            }}
                            onSkip={null}
                            noLogo={props.isMobile}
                        />
                    </XView>

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
            )}
            {props.roomView && (
                <XView backgroundColor="white" flexGrow={1}>
                    <XDocumentHead title="Activation code" />
                    <RoomActivationCode
                        {...props}
                        codeError={codeError}
                        codeSending={codeSending}
                        loginCodeStart={loginCodeStart}
                        backButtonClick={() => {
                            router.replace('/authorization/ask-email');
                            props.backButtonClick();
                        }}
                    />
                </XView>
            )}
        </>
    );
};

export default withApp(
    'Home',
    'viewer',
    () => null,
    // <AskActivationPage
    //     roomView={false}
    //     signin={true}
    //     backButtonClick={() => {
    //         //
    //     }}
    //     resendCodeClick={() => {
    //         //
    //     }}
    //     emailValue=""
    //     emailSendedTo=""
    //     emailSending={false}
    //     emailWasResend={false}
    // />
);
