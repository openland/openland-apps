import * as React from 'react';
import { XInput } from 'openland-x/XInput';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import ImgUnboardingStart from 'openland-icons/img_unboarding_start.svg';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { getPercentageOfOnboarding } from '../components/utils';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormField2 } from 'openland-x-forms/XFormField2';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    ErrorText,
} from 'openland-web/pages/init/components/SignComponents';
import { XVertical } from 'openland-x-layout/XVertical';

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
    const isMobile = useIsMobile();
    const subTitle = signin ? InitTexts.auth.signinSubtitle : InitTexts.auth.creatingAnAccountFree;
    return (
        <XForm
            defaultData={{
                input: {
                    email: emailValue,
                },
            }}
            defaultAction={({ input: { email } }) => {
                emailChanged(email, () => {
                    loginEmailStart();
                });
            }}
            defaultLayout={false}
        >
            <Title roomView={true}>
                {signin
                    ? InitTexts.auth.signinRoomSignUpEmail
                    : InitTexts.auth.signupRoomSignUpEmail}
            </Title>
            <SubTitle>{subTitle}</SubTitle>
            <ButtonsWrapper marginTop={40} width={280}>
                <XFormField2 field="input.email">
                    {({ showError }: { showError: boolean }) => (
                        <>
                            <XInput
                                autofocus
                                width={isMobile ? undefined : 300}
                                invalid={emailError !== ''}
                                dataTestId="email"
                                field="input.email"
                                type="email"
                                size="large"
                                placeholder={InitTexts.auth.emailPlaceholder}
                                onChange={value => emailChanged(value, () => null)}
                            />
                            {emailError && <ErrorText>{emailError}</ErrorText>}
                        </>
                    )}
                </XFormField2>
            </ButtonsWrapper>
            <ButtonsWrapper marginTop={20} marginBottom={84} width={280}>
                <XVertical alignItems="center">
                    <XFormSubmit
                        dataTestId="continue-button"
                        style="primary"
                        loading={emailSending}
                        size="large"
                        alignSelf="center"
                        text={InitTexts.auth.continue}
                    />
                </XVertical>
            </ButtonsWrapper>
        </XForm>
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
    const isMobile = useIsMobile();
    const subTitle = signin ? InitTexts.auth.signinSubtitle : InitTexts.auth.creatingAnAccountFree;
    return (
        <XForm
            defaultData={{
                input: {
                    email: emailValue,
                },
            }}
            defaultAction={({ input: { email } }) => {
                emailChanged(email, () => {
                    loginEmailStart();
                });
            }}
            defaultLayout={false}
            width="100%"
        >
            <Title roomView={false}>
                {signin ? InitTexts.auth.signinEmail : InitTexts.auth.signupEmail}
            </Title>
            <SubTitle>{subTitle}</SubTitle>
            <ButtonsWrapper marginTop={40} width={330}>
                <XFormField2 field="input.email">
                    {({ showError }: { showError: boolean }) => (
                        <>
                            <XInput
                                autofocus
                                width={isMobile ? undefined : 300}
                                invalid={emailError !== ''}
                                dataTestId="email"
                                field="input.email"
                                type="email"
                                size="large"
                                placeholder={InitTexts.auth.emailPlaceholder}
                                onChange={value => emailChanged(value, () => null)}
                            />
                            {emailError && <ErrorText>{emailError}</ErrorText>}
                        </>
                    )}
                </XFormField2>
            </ButtonsWrapper>
            <ButtonsWrapper marginTop={20}>
                <XVertical alignItems="center">
                    <XFormSubmit
                        dataTestId="continue-button"
                        style="primary"
                        loading={emailSending}
                        size="large"
                        alignSelf="center"
                        text={InitTexts.auth.continue}
                    />
                </XVertical>
            </ButtonsWrapper>
        </XForm>
    );
};

export default withApp('Home', 'viewer', () => {
    const router = React.useContext(XRouterContext)!;

    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(1)} />
            <XView marginBottom={150} marginTop={34}>
                <BackSkipLogo noSkip />
            </XView>

            <WebSignUpCreateWithEmail
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
        </div>
    );
});
