import * as React from 'react';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XLink } from 'openland-x/XLink';
import { css } from 'linaria';
import { AuthMechanism, AuthMechanismOuterProps } from '../create-new-account.page';
import {
    ContentWrapper,
    Title,
    ButtonsWrapper,
    GoogleButton,
    EmailButton,
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';

const separatorClassName = css`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.7;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.5px;
    color: #1f3449;
    z-index: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        display: block;
        height: 1px;
        width: 100%;
        background-color: #dcdee4;
        z-index: 0;
    }
    & > div {
        display: block;
        width: 35px;
        background-color: #fff;
        text-align: center;
        z-index: 1;
    }
`;

const subtitleClassName = css`
    text-align: center;
    opacity: 0.7;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.15px;
    color: #121e2b;
`;

const termsClassName = css`
    text-align: center;
    margin-top: -6px;
    padding-bottom: 26px;
    color: rgba(18, 30, 43, 0.35);
    font-size: 13px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: -0.35px;

    & a {
        border-bottom: 1px solid rgba(18, 30, 43, 0.15);
        transition: 0.3s all ease;
        &:hover {
            border-bottom-color: rgba(18, 30, 43, 0.3);
            color: rgba(18, 30, 43, 0.7);
        }
    }
`;

const noHightLightClassName = css`
    color: #000000;
    opacity: 0.5;
    text-decoration: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 0 !important;
`;

export const Footer = (props: { isMobile?: boolean }) => {
    return (
        <div className={termsClassName}>
            By creating an account you are accepting our {props.isMobile && <br />}
            <XLink className={noHightLightClassName} href="https://openland.com/terms">
                Terms of Service
            </XLink>{' '}
            and{' '}
            <XLink className={noHightLightClassName} href="https://openland.com/privacy">
                Privacy Policy
            </XLink>
            .
        </div>
    );
};

export const RoomAuthMechanism = ({
    signin,
    loginWithGoogle,
    loginWithEmail,
    roomContainerParams,
}: AuthMechanism & AuthMechanismOuterProps) => {
    const auth = InitTexts.auth;
    const title = signin ? auth.signinTitle : auth.signupRoomSignUpEmail;
    const subTitle = signin ? auth.signinSubtitle : auth.creatingAnAccountFree;
    const googleButtonText = signin ? InitTexts.auth.signinGoogle : InitTexts.auth.signupGoogle;
    const emailText = signin ? auth.signinEmail : auth.signupEmail;

    return (
        <RoomSignupContainer pageMode="AuthMechanism" {...roomContainerParams!!}>
            <ContentWrapper>
                <Title roomView={true}>{title}</Title>
                <div className={subtitleClassName}>{subTitle}</div>
                <ButtonsWrapper marginTop={42} width={260} marginBottom={91}>
                    <GoogleButton
                        onClick={loginWithGoogle}
                        text={googleButtonText}
                        rounded={true}
                    />
                    <div className={separatorClassName}>
                        <div>or</div>
                    </div>
                    <EmailButton onClick={loginWithEmail} text={emailText} rounded={true} />
                </ButtonsWrapper>

                {!signin && <Footer />}
            </ContentWrapper>
        </RoomSignupContainer>
    );
};
