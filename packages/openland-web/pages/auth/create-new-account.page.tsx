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
} from 'openland-web/pages/init/components/SignComponents';

import { XButton } from 'openland-x/XButton';

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

const noHightLightClassName = css`
    color: #000000;
    opacity: 0.5;
    text-decoration: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 0 !important;
`;

const Footer = () => {
    return (
        <RoomTerms>
            By creating an account you are accepting our{' '}
            <XLink className={noHightLightClassName} href="https://openland.com/terms">
                Terms of Service
            </XLink>{' '}
            and{' '}
            <XLink className={noHightLightClassName} href="https://openland.com/privacy">
                Privacy Policy
            </XLink>
            .
        </RoomTerms>
    );
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

            {!signin && <Footer />}
        </ContentWrapper>
    );
};

export const WebSignUpAuthMechanism = ({
    signin,
    loginWithGoogle,
    loginWithEmail,
}: AuthMechanism) => {
    const auth = InitTexts.auth;
    const title = 'Create new account';

    const googleButtonText = signin ? auth.signinGoogle : auth.signupGoogle;
    const emailText = signin ? auth.signinEmail : auth.signupEmail;

    return (
        <>
            <XView alignItems="center" flexGrow={1} justifyContent="center" marginTop={-100}>
                <XView fontSize={24} fontWeight="600">
                    {title}
                </XView>

                <XView marginTop={34} width={220}>
                    <GoogleButton rounded onClick={loginWithGoogle} text={googleButtonText} />
                    <XView marginTop={15}>
                        <EmailButton rounded onClick={loginWithEmail} text={emailText} />
                    </XView>
                </XView>

                <XView marginTop={36} alignItems="center">
                    <XView flexDirection="row" alignItems="center">
                        <XView>Already have an account?</XView>{' '}
                        <XView marginLeft={-10} marginRight={-16}>
                            <XButton
                                text="Log in"
                                style="link"
                                onClick={() => {
                                    //
                                }}
                            />
                        </XView>
                    </XView>
                </XView>
            </XView>

            <XView position="absolute" bottom={0} width="100%">
                <XView alignItems="center">
                    <Footer />
                </XView>
            </XView>
        </>
    );
};

export const CreateNewAccountPage = (props: AuthMechanism) => {
    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Create New Account" />

            <XView marginTop={34}>
                <BackSkipLogo onBack={null} onSkip={null} />
            </XView>

            <WebSignUpAuthMechanism {...props} />
        </XView>
    );
};

export default withApp('Home', 'viewer', () => (
    <CreateNewAccountPage
        signin={true}
        loginWithGoogle={() => {
            //
        }}
        loginWithEmail={() => {
            //
        }}
    />
));
