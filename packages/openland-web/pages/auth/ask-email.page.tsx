import * as React from 'react';
import { XView } from 'react-mental';
import { InputField } from 'openland-web/components/InputField';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { InitTexts } from 'openland-web/pages/init/_text';
import * as Cookie from 'js-cookie';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';
import { XVertical } from 'openland-x-layout/XVertical';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XButton } from 'openland-x/XButton';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XInput } from 'openland-x/XInput';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { RoomContainerParams } from './root.page';
import { Wrapper } from '../onboarding/components/wrapper';

type CreateWithEmailProps = {
    fireEmail: Function;
    signin: boolean;
    emailError: string;
    emailValue: string;
    emailSending: boolean;
    setEmailSending: Function;
    setEmailError: Function;
    setEmailSent: Function;
    setEmailValue: Function;
    isMobile: boolean;
};

type CreateWithEmailInnerProps = {
    roomContainerParams: RoomContainerParams;
    loginEmailStart: (a: string) => void;
};

type CreateWithEmailOuterProps = {
    roomView: boolean;
    roomContainerParams: RoomContainerParams;
};

export const RoomCreateWithEmail = ({
    signin,
    emailError,
    setEmailValue,
    setEmailError,
    emailValue,
    loginEmailStart,
    emailSending,
    isMobile,
}: CreateWithEmailProps & CreateWithEmailInnerProps) => {
    const form = useForm();
    const subTitle = signin ? InitTexts.auth.signinSubtitle : InitTexts.auth.creatingAnAccountFree;
    let emailField = useField('input.email', emailValue, form, [
        {
            checkIsValid: value => value !== '',
            text: 'Please enter your email address',
        },
    ]);

    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                setEmailValue(emailField.value);
                setEmailError('');
                setTimeout(() => {
                    loginEmailStart(emailField.value);
                }, 100);
            });
        },
        [emailField.value],
    );

    const onEnter = () => {
        doConfirm();
    };

    const errorText = (emailField.input.invalid && emailField.input.errorText) || emailError;
    const isInvalid = !!errorText;

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
            <Title roomView={true}>
                {signin
                    ? InitTexts.auth.signinRoomSignUpEmail
                    : InitTexts.auth.signupRoomSignUpEmail}
            </Title>
            <SubTitle>{subTitle}</SubTitle>
            <ButtonsWrapper marginTop={40} width={280}>
                <XInput
                    autofocus
                    width={isMobile ? undefined : 300}
                    dataTestId="email"
                    type="email"
                    size="large"
                    placeholder={InitTexts.auth.emailPlaceholder}
                    {...emailField.input}
                    invalid={isInvalid}
                />

                {isInvalid && <XErrorMessage2 message={errorText} />}
            </ButtonsWrapper>
            <ButtonsWrapper
                marginTop={emailField.input.invalid && emailField.input.errorText ? 52 - 26 : 52}
                marginBottom={84}
                width={280}
            >
                <XVertical alignItems="center">
                    <XButton
                        dataTestId="continue-button"
                        style="primary"
                        loading={emailSending}
                        size="large"
                        alignSelf="center"
                        text={InitTexts.auth.continue}
                        onClick={doConfirm}
                    />
                </XVertical>
            </ButtonsWrapper>
        </XShortcuts>
    );
};

export const WebSignUpCreateWithEmail = ({
    signin,
    emailError,
    setEmailValue,
    setEmailError,
    emailValue,
    loginEmailStart,
    emailSending,
    isMobile,
}: CreateWithEmailProps & CreateWithEmailInnerProps) => {
    const form = useForm();
    const subTitle = `It's free and easy`;

    let emailField = useField('input.email', emailValue, form, [
        {
            checkIsValid: value => value !== '',
            text: 'Please enter your email address',
        },
    ]);

    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                setEmailValue(emailField.value);
                setEmailError('');
                setTimeout(() => {
                    loginEmailStart(emailField.value);
                }, 100);
            });
        },
        [emailField.value],
    );

    const onEnter = () => {
        doConfirm();
    };
    const title = 'Create new account';

    const errorText = (emailField.input.invalid && emailField.input.errorText) || emailError;
    const isInvalid = !!errorText;

    const button = (
        <XButton
            dataTestId="continue-button"
            style="primary"
            loading={emailSending}
            size="large"
            alignSelf="center"
            text={InitTexts.auth.continue}
            onClick={doConfirm}
        />
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
                <XView fontSize={24} color="#000" fontWeight="600" marginBottom={12}>
                    {title}
                </XView>
                <XView fontSize={16} color="#000" marginBottom={36}>
                    {subTitle}
                </XView>
                <XView width={isMobile ? '100%' : 360} maxWidth={360}>
                    <InputField
                        autofocus
                        width={isMobile ? '100%' : 300}
                        dataTestId="email"
                        type="email"
                        title={InitTexts.auth.emailPlaceholder}
                        field={emailField}
                        hideErrorText
                        invalid={isInvalid}
                    />
                    {isInvalid && <XErrorMessage2 message={errorText} />}
                </XView>
                {!isMobile && (
                    <XView
                        alignItems="center"
                        marginTop={emailField.input.invalid && emailField.input.errorText ? 14 : 40}
                    >
                        {button}
                    </XView>
                )}
                {isMobile && (
                    <XView alignItems="center" position="absolute" bottom={30}>
                        {button}
                    </XView>
                )}
            </XView>
        </XShortcuts>
    );
};

function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const AskEmailPage = (props: CreateWithEmailProps & CreateWithEmailOuterProps) => {
    const { fireEmail, setEmailError, setEmailSending, setEmailSent } = props;
    let router = React.useContext(XRouterContext)!;

    const loginEmailStart = async (email: string) => {
        if (email === '') {
            setEmailError(InitTexts.auth.noEmail);

            return;
        } else if (!validateEmail(email)) {
            setEmailError(InitTexts.auth.emailInvalid);

            return;
        } else {
            setEmailSending(true);
            setEmailError('');
            setEmailSent(false);

            await fireEmail(email);
            setTimeout(() => {
                router.push('/authorization/ask-activation-code');
            }, 0);
        }
    };

    return (
        <>
            {!props.roomView && (
                <Wrapper>
                    <XDocumentHead title="Ask email" />
                    <TopBar progressInPercents={getPercentageOfOnboarding(1)} />
                    <XView marginTop={props.isMobile ? 15 : 34}>
                        <BackSkipLogo
                            onBack={() => {
                                if (Cookie.get('x-openland-create-new-account')) {
                                    router.replace('/authorization/create-new-account');
                                } else {
                                    router.replace('/');
                                }
                            }}
                            onSkip={null}
                            noLogo={props.isMobile}
                        />
                    </XView>
                    <WebSignUpCreateWithEmail {...props} loginEmailStart={loginEmailStart} />
                </Wrapper>
            )}
            {props.roomView && (
                <XView backgroundColor="white" flexGrow={1}>
                    <XDocumentHead title="Ask email" />
                    <RoomSignupContainer
                        pageMode="CreateFromEmail"
                        {...props.roomContainerParams!!}
                    >
                        <RoomCreateWithEmail {...props} loginEmailStart={loginEmailStart} />
                    </RoomSignupContainer>
                </XView>
            )}
        </>
    );
};

export default withApp(
    'Home',
    'viewer',
    () => null,
    // <AskEmailPage
    //     roomView={false}
    //     signin={true}
    //     emailError={''}
    //     emailValue={''}
    //     fireEmail={() => {
    //         //
    //     }}
    //     setEmailSending={() => {
    //         //
    //     }}
    //     setEmailError={() => {
    //         //
    //     }}
    //     setEmailSent={() => {
    //         //
    //     }}
    //     setEmailValue={() => {
    //         //
    //     }}
    //     emailSending={true}
    // />
);
