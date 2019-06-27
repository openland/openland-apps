import * as React from 'react';
import { XInput } from 'openland-x/XInput';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { css } from 'linaria';
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

type CreateWithEmailProps = {
    signin: boolean;
    emailError: string;
    emailChanged: (value: string, cb: () => void) => void;
    emailValue: string;
    loginEmailStart: () => void;
    emailSending: boolean;
};

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

export const RoomCreateWithEmail = ({
    signin,
    emailError,
    emailChanged,
    emailValue,
    loginEmailStart,
    emailSending,
}: CreateWithEmailProps) => {
    const form = useForm();
    const isMobile = useIsMobile();
    const subTitle = signin ? InitTexts.auth.signinSubtitle : InitTexts.auth.creatingAnAccountFree;
    let emailField = useField('input.email', emailValue, form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            emailChanged(emailField.value, () => {
                loginEmailStart();
            });
        });
    }, []);

    return (
        <>
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
                    invalid={emailError !== ''}
                    dataTestId="email"
                    type="email"
                    size="large"
                    placeholder={InitTexts.auth.emailPlaceholder}
                    {...emailField.input}
                />
                {emailError && <ErrorText>{emailError}</ErrorText>}
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
        </>
    );
};

export const WebSignUpCreateWithEmail = ({
    signin,
    emailError,
    emailChanged,
    emailValue,
    loginEmailStart,
    emailSending,
}: CreateWithEmailProps) => {
    const form = useForm();
    const isMobile = useIsMobile();
    const subTitle = signin ? InitTexts.auth.signinSubtitle : InitTexts.auth.creatingAnAccountFree;

    let emailField = useField('input.email', emailValue, form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            emailChanged(emailField.value, () => {
                loginEmailStart();
            });
        });
    }, []);

    return (
        <>
            <Title roomView={false}>
                {signin ? InitTexts.auth.signinEmail : InitTexts.auth.signupEmail}
            </Title>
            <SubTitle>{subTitle}</SubTitle>
            <ButtonsWrapper marginTop={40} width={330}>
                <XInput
                    autofocus
                    width={isMobile ? undefined : 300}
                    invalid={emailError !== ''}
                    dataTestId="email"
                    type="email"
                    size="large"
                    placeholder={InitTexts.auth.emailPlaceholder}
                    {...emailField.input}
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
        </>
    );
};

export const AskEmailPage = (props: CreateWithEmailProps) => {
    let router = React.useContext(XRouterContext)!;
    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(1)} />
            <XView marginTop={34}>
                <BackSkipLogo
                    onBack={() => {
                        router.replace('/auth2/create-new-account');
                    }}
                    onSkip={null}
                />
            </XView>

            <WebSignUpCreateWithEmail {...props} />
        </div>
    );
};

export default withApp('Home', 'viewer', () => (
    <AskEmailPage
        signin={true}
        emailError={''}
        emailChanged={() => {
            //
        }}
        emailValue={''}
        loginEmailStart={() => {
            //
        }}
        emailSending={true}
    />
));
