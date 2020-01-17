import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, FormLayout, AuthActionButton, AuthInput, AuthInputWrapper, AuthToastWrapper, useShake } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { AuthHeaderConfig } from './root.page';

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
}: CreateWithEmailProps & {
    loginEmailStart: (a: string) => void;
}) => {
    const form = useForm();

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

    const errorText = (emailField.input.invalid && emailField.input.errorText) || emailError;
    const isInvalid = !!errorText;
    const [shakeClassName, shake] = useShake();
    const handleNext = React.useCallback(() => {
        doConfirm();
        if (emailField.input.value.trim() === '') {
            shake();
        }
    }, [shakeClassName, doConfirm]);
    useShortcuts({ keys: ['Enter'], callback: handleNext });

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [errorText, shakeClassName]);

    return (
        <>
            <AuthToastWrapper isVisible={!!errorText} text={errorText} />
            <FormLayout>
                <Title text="What’s your email?" />
                <Subtitle text="We’ll send you a login code" />
                <AuthInputWrapper className={shakeClassName}>
                    <AuthInput
                        label={InitTexts.auth.emailPlaceholder}
                        invalid={isInvalid}
                        ref={inputRef}
                        onChange={emailField.input.onChange}
                    />
                </AuthInputWrapper>
                <AuthActionButton text={InitTexts.auth.next} loading={emailSending} onClick={handleNext} />
            </FormLayout>
        </>
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
            <AuthHeaderConfig
                onBack={() => {
                    router.replace('/signin');
                }}
            />
            <WebSignUpCreateWithEmail {...props} loginEmailStart={loginEmailStart} />
        </Wrapper>
    );
};
