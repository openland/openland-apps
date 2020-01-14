import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, FormLayout, AuthActionButton, AuthInput } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

export type CreateWithEmailProps = {
    fireEmail: (email: string) => Promise<void>;
    emailError: string;
    emailValue: string;
    emailSending: boolean;
    setEmailSending: Function;
    setEmailError: Function;
    setEmailSent: Function;
    setEmailValue: Function;
    isMobile: boolean;
};

export const WebSignUpCreateWithEmail = ({
    emailError,
    setEmailValue,
    setEmailError,
    emailValue,
    loginEmailStart,
    emailSending,
    isMobile,
}: CreateWithEmailProps & {
    loginEmailStart: (a: string) => void;
}) => {
    const form = useForm();

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

    return (
        <FormLayout>
            <Title text="What’s your email?" />
            <Subtitle text="We’ll send you a login code" />
            <AuthInput
                isMobile={isMobile}
                label={InitTexts.auth.emailPlaceholder}
                invalid={isInvalid}
                onChange={emailField.input.onChange}
            />
            {isInvalid && <XErrorMessage2 message={errorText} />}
            <AuthActionButton text={InitTexts.auth.next} loading={emailSending} onClick={doConfirm} />
        </FormLayout>
    );
};

function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const AskEmailPage = (props: CreateWithEmailProps) => {
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

            try {
                await fireEmail(email);
                setTimeout(() => {
                    router.push('/authorization/ask-activation-code');
                }, 0);
            } catch (e) {
                setEmailSending(false);
                setEmailError(e.message);
            }

        }
    };

    return (
        <Wrapper>
            <XDocumentHead title="What’s your email?" />
            <BackSkipLogo
                onBack={() => {
                    router.replace('/signin');
                }}
                onSkip={null}
            />
            <WebSignUpCreateWithEmail {...props} loginEmailStart={loginEmailStart} />
        </Wrapper>
    );
};
