import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XInput } from 'openland-x/XInput';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import {
    CreateWithEmailProps,
    CreateWithEmailInnerProps,
    CreateWithEmailOuterProps,
} from '../ask-email.page';

export const RoomCreateWithEmail = ({
    signin,
    emailError,
    setEmailValue,
    setEmailError,
    emailValue,
    loginEmailStart,
    emailSending,
    isMobile,
    roomContainerParams,
}: CreateWithEmailProps & CreateWithEmailInnerProps & CreateWithEmailOuterProps) => {
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
            <RoomSignupContainer pageMode="CreateFromEmail" {...roomContainerParams!!}>
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
                    marginTop={
                        emailField.input.invalid && emailField.input.errorText ? 52 - 26 : 52
                    }
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
            </RoomSignupContainer>
        </XShortcuts>
    );
};
