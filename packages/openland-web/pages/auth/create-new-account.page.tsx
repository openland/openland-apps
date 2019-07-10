import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { InitTexts } from 'openland-web/pages/init/_text';
import { GoogleButton, EmailButton } from 'openland-web/pages/init/components/SignComponents';
import { XButton } from 'openland-x/XButton';
import { RoomContainerParams } from './root.page';
import { RoomAuthMechanism, Footer } from './components/roomAuthMechanism';
import { Title } from './components/authComponents';

export type AuthMechanism = {
    onSignUpClick: (event: React.MouseEvent<any, MouseEvent>) => void;
    onLoginClick: (event: React.MouseEvent<any, MouseEvent>) => void;
    signin: boolean;
    loginWithGoogle: Function;
    loginWithEmail: Function;
    isMobile: boolean;
};

export type AuthMechanismOuterProps = {
    roomView: boolean;
    roomContainerParams: RoomContainerParams;
};

export const SignUpAuthMechanism = ({
    signin,
    onLoginClick,
    onSignUpClick,
    loginWithGoogle,
    loginWithEmail,
    isMobile,
}: AuthMechanism) => {
    const auth = InitTexts.auth;
    const title = signin ? 'Sign in to Openland' : 'Create new account';

    const googleButtonText = signin ? auth.signinGoogle : auth.signupGoogle;
    const emailText = signin ? auth.signinEmail : auth.signupEmail;

    return (
        <>
            <XView alignItems="center" flexGrow={1} justifyContent="center" marginTop={-100}>
                <Title text={title} />
                <XView marginTop={22} width={220}>
                    <GoogleButton rounded onClick={loginWithGoogle} text={googleButtonText} />
                    <XView marginTop={15}>
                        <EmailButton rounded onClick={loginWithEmail} text={emailText} />
                    </XView>
                </XView>

                <XView marginTop={36} alignItems="center">
                    <XView flexDirection="row" alignItems="center">
                        <>
                            <XView>
                                {!signin ? 'Already have an account?' : 'Need new account?'}
                            </XView>
                            <XView marginLeft={-10} marginRight={-16} height={20}>
                                <XButton
                                    text={signin ? 'Sign up' : 'Log in'}
                                    style="link"
                                    onClick={!signin ? onLoginClick : onSignUpClick}
                                />
                            </XView>
                        </>
                    </XView>
                </XView>
            </XView>

            <XView position="absolute" bottom={0} width="100%">
                <XView alignItems="center">
                    <Footer isMobile={isMobile} />
                </XView>
            </XView>
        </>
    );
};

export const CreateNewAccountPage = (props: AuthMechanism & AuthMechanismOuterProps) => {
    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Create New Account" />

            {!props.roomView && (
                <>
                    <XView marginTop={34}>
                        <BackSkipLogo onBack={null} onSkip={null} />
                    </XView>
                    <SignUpAuthMechanism {...props} />
                </>
            )}

            {props.roomView && <RoomAuthMechanism {...props} />}
        </XView>
    );
};

export default withApp(
    'Home',
    'viewer',
    () => null,
    // <CreateNewAccountPage
    //     roomView={false}
    //     signin={true}
    //     loginWithGoogle={() => {
    //         //
    //     }}
    //     loginWithEmail={() => {
    //         //
    //     }}
    //     onLoginClick={() => {
    //         //
    //     }}
    //     onSignUpClick={() => {
    //         //
    //     }}
    // />
);
