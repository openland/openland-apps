import * as React from 'react';
import { XView } from 'react-mental';
import { InputField } from 'openland-web/components/InputField';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { InitTexts } from 'openland-web/pages/init/_text';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    ErrorText,
} from 'openland-web/pages/init/components/SignComponents';
import { XVertical } from 'openland-x-layout/XVertical';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XButton } from 'openland-x/XButton';
import { XShortcuts } from 'openland-x/XShortcuts';

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
};

type CreateWithEmailInnerProps = {
    loginEmailStart: (a: string) => void;
};

export const RoomCreateWithEmail = ({
    signin,
    emailError,
    setEmailValue,
    setEmailError,
    emailValue,
    loginEmailStart,
    emailSending,
}: CreateWithEmailProps & CreateWithEmailInnerProps) => {
    const form = useForm();
    const isMobile = useIsMobile();
    const subTitle = signin ? InitTexts.auth.signinSubtitle : InitTexts.auth.creatingAnAccountFree;
    let emailField = useField('input.email', emailValue, form, [
        {
            checkIsValid: value => value !== '',
            text: "Please enter your email address",
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
                <InputField
                    autofocus
                    width={isMobile ? undefined : 300}
                    dataTestId="email"
                    type="email"
                    title={InitTexts.auth.emailPlaceholder}
                    field={emailField}
                />
                {emailError && !form.error && <ErrorText>{emailError}</ErrorText>}
            </ButtonsWrapper>
            <ButtonsWrapper marginTop={20} marginBottom={84} width={280}>
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
}: CreateWithEmailProps & CreateWithEmailInnerProps) => {
    const form = useForm();
    const isMobile = useIsMobile();
    const subTitle = signin ? InitTexts.auth.signinSubtitle : InitTexts.auth.creatingAnAccountFree;

    let emailField = useField('input.email', emailValue, form);

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
                <Title roomView={false}>{title}</Title>
                <SubTitle>{subTitle}</SubTitle>
                <ButtonsWrapper marginTop={40} width={330}>
                    <InputField
                        autofocus
                        width={isMobile ? undefined : 300}
                        invalid={emailError !== ''}
                        dataTestId="email"
                        type="email"
                        title={InitTexts.auth.emailPlaceholder}
                        field={emailField}
                    />
                    {emailError && <ErrorText>{emailError}</ErrorText>}
                </ButtonsWrapper>
                <ButtonsWrapper marginTop={20}>
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
            </XView>
        </XShortcuts>
    );
};

function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const AskEmailPage = (props: CreateWithEmailProps & { roomView: boolean }) => {
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
                router.push('/auth2/ask-activation-code');
            }, 0);
        }
    };

    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Discover" />
            {!props.roomView && (
                <>
                    <TopBar progressInPercents={getPercentageOfOnboarding(1)} />
                    <XView marginTop={34}>
                        <BackSkipLogo
                            onBack={() => {
                                router.replace('/auth2/create-new-account');
                            }}
                            onSkip={null}
                        />
                    </XView>

                    <WebSignUpCreateWithEmail {...props} loginEmailStart={loginEmailStart} />
                </>
            )}
            {props.roomView && <RoomCreateWithEmail {...props} loginEmailStart={loginEmailStart} />}
        </XView>
    );
};

export default withApp('Home', 'viewer', () => (
    <AskEmailPage
        roomView={false}
        signin={true}
        emailError={''}
        emailValue={''}
        fireEmail={() => {
            //
        }}
        setEmailSending={() => {
            //
        }}
        setEmailError={() => {
            //
        }}
        setEmailSent={() => {
            //
        }}
        setEmailValue={() => {
            //
        }}
        emailSending={true}
    />
));
