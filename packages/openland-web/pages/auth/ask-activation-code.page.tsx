import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormField2 } from 'openland-x-forms/XFormField2';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    ErrorText,
} from 'openland-web/pages/init/components/SignComponents';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

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
    '& .button-content': {
        paddingLeft: 4,
        paddingRight: 0,
        fontWeight: 'normal',
        fontSize: 13,
    },
});

type ActivationCodeProps = {
    signin: boolean;
    emailWasResend: boolean;
    emailSending: boolean;
    backButtonClick: (event?: React.MouseEvent<any>) => void;
    resendCodeClick: (event?: React.MouseEvent<any>) => void;
    codeError: string;
    emailSendedTo: string;
    codeChanged: (value: string, cb: () => void) => void;
    codeSending: boolean;
    codeValue: string;
    loginCodeStart: (event?: React.MouseEvent<any>) => void;
};

const InputWrapperDesctopClassName = css`
    width: 300px;
`;

export const WebSignUpActivationCode = ({
    signin,
    backButtonClick,
    resendCodeClick,
    emailSendedTo,
    emailSending,
    emailWasResend,
    codeSending,
    loginCodeStart,
    codeChanged,
    codeValue,
    codeError,
}: ActivationCodeProps) => {
    const isMobile = useIsMobile();
    return (
        <XForm
            defaultData={{
                input: {
                    code: codeValue,
                },
            }}
            defaultAction={({ input: { code } }) => {
                codeChanged(code, () => {
                    loginCodeStart();
                });
            }}
            defaultLayout={false}
        >
            <Title roomView={false}>{InitTexts.auth.enterActivationCode}</Title>
            {emailSendedTo && (
                <SubTitle>
                    We just sent it to <strong>{emailSendedTo}</strong>
                </SubTitle>
            )}
            <ButtonsWrapper marginTop={40} width={isMobile ? 300 : '100%'}>
                <XFormField2
                    field="input.code"
                    className={isMobile ? undefined : InputWrapperDesctopClassName}
                >
                    {({ showError }: { showError: boolean }) => (
                        <>
                            <XInput
                                width={isMobile ? undefined : 300}
                                invalid={codeError !== ''}
                                field="input.code"
                                pattern="[0-9]*"
                                type="number"
                                autofocus={true}
                                size="large"
                                placeholder={InitTexts.auth.codePlaceholder}
                                flexGrow={1}
                                flexShrink={0}
                                onChange={value => codeChanged(value, () => null)}
                            />
                            {codeError && <ErrorText>{codeError}</ErrorText>}
                        </>
                    )}
                </XFormField2>
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
            <ButtonsWrapper marginTop={20}>
                <XVertical alignItems="center">
                    <XHorizontal alignItems="center">
                        <XButton
                            onClick={backButtonClick}
                            size="large"
                            style="ghost"
                            text={InitTexts.auth.back}
                        />
                        <XFormSubmit
                            dataTestId="continue-button"
                            style="primary"
                            loading={codeSending}
                            size="large"
                            alignSelf="center"
                            text={InitTexts.auth.continue}
                        />
                    </XHorizontal>
                </XVertical>
            </ButtonsWrapper>
        </XForm>
    );
};

export const RoomActivationCode = ({
    signin,
    emailWasResend,
    emailSending,
    backButtonClick,
    resendCodeClick,
    emailSendedTo,
    codeSending,
    loginCodeStart,
    codeError,
    codeChanged,
    codeValue,
}: ActivationCodeProps) => {
    return (
        <XForm
            defaultData={{
                input: {
                    code: codeValue,
                },
            }}
            defaultAction={({ input: { code } }) => {
                codeChanged(code, () => {
                    loginCodeStart();
                });
            }}
            defaultLayout={false}
        >
            <Title roomView={true}>{InitTexts.auth.enterActivationCode}</Title>
            {emailSendedTo && (
                <SubTitle>
                    We just sent it to <strong>{emailSendedTo}</strong>
                </SubTitle>
            )}
            <ButtonsWrapper marginTop={40} width={280}>
                <XFormField2 field="input.code">
                    {({ showError }: { showError: boolean }) => (
                        <>
                            <XInput
                                invalid={codeError !== ''}
                                field="input.code"
                                pattern="[0-9]*"
                                type="number"
                                autofocus={true}
                                size="large"
                                placeholder={InitTexts.auth.codePlaceholder}
                                onChange={value => codeChanged(value, () => null)}
                            />
                            {codeError && <ErrorText>{codeError}</ErrorText>}
                        </>
                    )}
                </XFormField2>
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
                            text={InitTexts.auth.back}
                        />
                        <XFormSubmit
                            dataTestId="continue-button"
                            style="primary"
                            loading={codeSending}
                            size="large"
                            alignSelf="center"
                            text={InitTexts.auth.continue}
                        />
                    </XHorizontal>
                </XVertical>
            </ButtonsWrapper>
        </XForm>
    );
};

export const AskActivationPage = (props: ActivationCodeProps) => {
    let router = React.useContext(XRouterContext)!;
    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(2)} />
            <XView marginBottom={150} marginTop={34}>
                <BackSkipLogo
                    onBack={() => {
                        router.replace('/auth2/ask-email');
                    }}
                    onSkip={null}
                />
            </XView>

            <WebSignUpActivationCode {...props} />
        </div>
    );
};

export default withApp('Home', 'viewer', () => (
    <AskActivationPage
        signin={true}
        backButtonClick={() => {
            //
        }}
        resendCodeClick={() => {
            //
        }}
        emailSendedTo=""
        emailSending={false}
        emailWasResend={false}
        codeSending={false}
        loginCodeStart={() => {
            //
        }}
        codeChanged={() => {
            //
        }}
        codeValue=""
        codeError=""
    />
));
