import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { useForm } from 'openland-form/useForm';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useField } from 'openland-form/useField';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    ErrorText,
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XInput } from 'openland-x/XInput';
import {
    ActivationCodeInnerProps,
    ActivationCodeProps,
    ActivationCodeOuterProps,
} from '../ask-activation-code.page';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

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
    roomContainerParams,
}: ActivationCodeProps & ActivationCodeInnerProps & ActivationCodeOuterProps) => {
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

    useShortcuts({ keys: ['Enter'], callback: doConfirm });

    const errorText = (codeField.input.invalid && codeField.input.errorText) || codeError;
    const isInvalid = !!errorText;

    return (

        <RoomSignupContainer pageMode="ActivationCode" {...roomContainerParams!!}>
            <Title roomView={true}>{InitTexts.auth.enterActivationCode}</Title>
            {emailSendedTo && (
                <SubTitle>
                    We just sent it to <strong>{emailSendedTo}</strong>
                </SubTitle>
            )}
            <ButtonsWrapper marginTop={40} width={280}>
                <XInput
                    pattern="[0-9]*"
                    type="number"
                    autofocus={true}
                    size="large"
                    placeholder={InitTexts.auth.codePlaceholder}
                    flexGrow={1}
                    flexShrink={0}
                    {...codeField.input}
                    invalid={isInvalid}
                />
                {isInvalid && <ErrorText>{errorText}</ErrorText>}
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
                                <UButton
                                    onClick={resendCodeClick}
                                    style="secondary"
                                    text={InitTexts.auth.resend}
                                    size="small"
                                />
                            </>
                        )}
                </XHorizontal>
            </ResendCodeRow>
            <ButtonsWrapper marginTop={20} marginBottom={84} width={280}>
                <XVertical alignItems="center">
                    <XHorizontal alignItems="center">
                        <UButton
                            onClick={backButtonClick}
                            size="large"
                            style="secondary"
                            alignSelf="center"
                            text={'Back'}
                        />
                        <UButton
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
        </RoomSignupContainer>
    );
};
