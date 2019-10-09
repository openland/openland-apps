import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { InitTexts } from 'openland-web/pages/init/_text';
import * as Cookie from 'js-cookie';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { RoomContainerParams } from './root.page';
import { Wrapper } from '../onboarding/components/wrapper';
import { RoomCreateWithEmail } from './components/roomCreateWithEmail';
import { Title, Subtitle, FormLayout } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInput } from 'openland-web/components/unicorn/UInput';

export type CreateWithEmailProps = {
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

export type CreateWithEmailInnerProps = {
    roomContainerParams: RoomContainerParams;
    loginEmailStart: (a: string) => void;
};

export type CreateWithEmailOuterProps = {
    roomView: boolean;
    roomContainerParams: RoomContainerParams;
};

export const WebSignUpCreateWithEmail = ({
    emailError,
    setEmailValue,
    setEmailError,
    emailValue,
    loginEmailStart,
    emailSending,
    isMobile,
    signin
}: CreateWithEmailProps & CreateWithEmailInnerProps) => {
    const form = useForm();
    const title = signin ? 'Enter your email' : 'Create new account';
    const subTitle = signin ? 'We will send you an activation code' : `It's free and easy`;

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

    useShortcuts({ keys: ['Enter'], callback: doConfirm });

    const errorText = (emailField.input.invalid && emailField.input.errorText) || emailError;
    const isInvalid = !!errorText;

    const button = (
        <UButton
            style="primary"
            loading={emailSending}
            size="large"
            square={true}
            alignSelf="center"
            text={InitTexts.auth.continue}
            onClick={doConfirm}
        />
    );

    return (
        <FormLayout
            top={(
                <>
                    <Title text={title} />
                    <Subtitle text={subTitle} />
                    <XView width={isMobile ? '100%' : 360} maxWidth={360}>
                        <UInput
                            onChange={emailField.input.onChange}
                            autofocus={true}
                            width={isMobile ? '100%' : 360}
                            type="email"
                            label={InitTexts.auth.emailPlaceholder}
                            invalid={isInvalid}
                        />
                        {isInvalid && <XErrorMessage2 message={errorText} />}
                    </XView>
                </>
            )}
            bottom={button}
        />
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
                    <WebSignUpCreateWithEmail {...props} loginEmailStart={loginEmailStart} />
                </Wrapper>
            )}
            {props.roomView && (
                <XView backgroundColor="white" flexGrow={1}>
                    <XDocumentHead title="Ask email" />
                    <RoomCreateWithEmail {...props} loginEmailStart={loginEmailStart} />
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
