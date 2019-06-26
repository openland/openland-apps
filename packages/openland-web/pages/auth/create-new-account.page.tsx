import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import Glamorous from 'glamorous';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XLink } from 'openland-x/XLink';
import {
    ContentWrapper,
    Title,
    ButtonsWrapper,
    GoogleButton,
    EmailButton,
    SubTitle,
} from 'openland-web/pages/init/components/SignComponents';
import { TopBar } from '../components/TopBar';
import { getPercentageOfOnboarding } from '../components/utils';

const SeparatorStyle = Glamorous.div<{
    marginTop?: number;
    marginBottom?: number;
}>(props => ({
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    color: '#1f3449',
    zIndex: 0,
    marginTop: props.marginTop ? props.marginTop : 15,
    marginBottom: props.marginBottom ? props.marginBottom : 15,
    '&:before': {
        content: `''`,
        position: 'absolute',
        left: 0,
        top: '50%',
        display: 'block',
        height: 1,
        width: '100%',
        backgroundColor: '#dcdee4',
        zIndex: 0,
    },
    '& > div': {
        display: 'block',
        width: 35,
        backgroundColor: '#fff',
        textAlign: 'center',
        zIndex: 1,
    },
}));

const Separator = (props: { marginTop?: number; marginBottom?: number }) => (
    <SeparatorStyle {...props}>
        <div>or</div>
    </SeparatorStyle>
);

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

const RoomText = Glamorous.div({
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: -0.15,
    color: '#121e2b',
});

const RoomTerms = Glamorous.div({
    textAlign: 'center',
    marginTop: -6,
    paddingBottom: 26,
    color: 'rgba(18, 30, 43, 0.35)',
    fontSize: 13,
    fontWeight: 500,
    lineHeight: '19px',
    letterSpacing: -0.35,

    '& a': {
        borderBottom: '1px solid rgba(18, 30, 43, 0.15)',
        transition: '.3s all ease',
        '&:hover': {
            borderBottomColor: 'rgba(18, 30, 43, 0.3)',
            color: 'rgba(18, 30, 43, 0.7)',
        },
    },
});

type AuthMechanism = {
    signin: boolean;
    loginWithGoogle: Function;
    loginWithEmail: Function;
};

export const RoomAuthMechanism = ({ signin, loginWithGoogle, loginWithEmail }: AuthMechanism) => {
    const auth = InitTexts.auth;
    const title = signin ? auth.signinTitle : auth.signupRoomSignUpEmail;
    const subTitle = signin ? auth.signinSubtitle : auth.creatingAnAccountFree;
    const googleButtonText = signin ? InitTexts.auth.signinGoogle : InitTexts.auth.signupGoogle;
    const emailText = signin ? auth.signinEmail : auth.signupEmail;

    return (
        <ContentWrapper>
            <Title roomView={true}>{title}</Title>
            <RoomText>{subTitle}</RoomText>
            <ButtonsWrapper marginTop={42} width={260} marginBottom={91}>
                <GoogleButton onClick={loginWithGoogle} text={googleButtonText} rounded={true} />
                <Separator marginTop={10} marginBottom={10} />
                <EmailButton onClick={loginWithEmail} text={emailText} rounded={true} />
            </ButtonsWrapper>

            {!signin && (
                <RoomTerms>
                    By creating an account you are accepting our{' '}
                    <XLink href="https://openland.com/terms">Terms of Service</XLink> and{' '}
                    <XLink href="https://openland.com/privacy">Privacy Policy</XLink>.
                </RoomTerms>
            )}
        </ContentWrapper>
    );
};

export const WebSignUpAuthMechanism = ({
    signin,
    loginWithGoogle,
    loginWithEmail,
}: AuthMechanism) => {
    const auth = InitTexts.auth;
    const title = signin ? auth.signinTitle : auth.signupRoomSignUpEmail;
    const subTitle = signin ? auth.signinSubtitle : auth.creatingAnAccountFree;
    const googleButtonText = signin ? auth.signinGoogle : auth.signupGoogle;
    const emailText = signin ? auth.signinEmail : auth.signupEmail;

    return (
        <div>
            <Title roomView={false}>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            <ButtonsWrapper marginTop={52} width={280}>
                <GoogleButton rounded onClick={loginWithGoogle} text={googleButtonText} />
                <Separator />
                <EmailButton rounded onClick={loginWithEmail} text={emailText} />
            </ButtonsWrapper>
        </div>
    );
};

export const CreateNewAccountPage = () => {
    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Create New Account" />
            <XView marginBottom={150} marginTop={34}>
                <BackSkipLogo onBack={null} onSkip={null} />
            </XView>

            <WebSignUpAuthMechanism
                signin={true}
                loginWithGoogle={() => {
                    //
                }}
                loginWithEmail={() => {
                    //
                }}
            />
        </div>
    );
};

export default withApp('Home', 'viewer', CreateNewAccountPage);
