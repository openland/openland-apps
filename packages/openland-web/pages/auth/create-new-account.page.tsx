import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { RoomContainerParams } from './root.page';
import { RoomAuthMechanism } from './components/roomAuthMechanism';
import { TextTitle1, TextBody, TextLabel1 } from 'openland-web/utils/TextStyles';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { css, cx } from 'linaria';
import { Unicorn } from 'openland-x/XLoader';
import { UButton } from 'openland-web/components/unicorn/UButton';
import EmailIcon from 'openland-icons/s/ic-mail-24.svg';
import GoogleIcon from 'openland-icons/s/ic-google.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

const TermsText = css`
    text-align: center;
    color: var(--foregroundSecondary);
`;

const LinkText = css`
    color: var(--accentPrimary);
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export type AuthMechanism = {
    onSignUpClick: (event: React.MouseEvent<any, MouseEvent>) => void;
    onLoginClick: (event: React.MouseEvent<any, MouseEvent>) => void;
    signin: boolean;
    loginWithGoogle: () => void;
    loginWithEmail: () => void;
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
}: AuthMechanism) => {
    const title = signin ? 'Sign in to Openland' : 'Create account';
    const isMobile = useIsMobile();

    return (
        <>
            <XView alignItems="center" flexGrow={1} justifyContent="center">
                <XView
                    maxHeight={850}
                    alignItems="center"
                    flexGrow={isMobile ? 1 : undefined}
                    justifyContent="center"
                >
                    <span className={TextTitle1}>{title}</span>

                    <div className={cx(TextBody, TermsText)} style={{ marginTop: 8 }}>
                        By creating Openland account you are <br /> accepting{' '}
                        <ULink
                            href="https://openland.com/terms"
                            className={cx(TextLabel1, TermsText)}
                        >
                            Terms
                        </ULink>{' '}
                        and{' '}
                        <ULink
                            href="https://openland.com/privacy"
                            className={cx(TextLabel1, TermsText)}
                        >
                            Privacy Policy
                        </ULink>
                        .
                    </div>

                    <XView
                        flexGrow={isMobile ? 1 : undefined}
                        justifyContent="center"
                        margin={isMobile ? undefined : 60}
                    >
                        <Unicorn width="160" height="160" />
                    </XView>

                    <div
                        className={cx(TextBody, TermsText)}
                        onClick={!signin ? onLoginClick : onSignUpClick}
                    >
                        {!signin ? 'Already have an account? ' : 'Need new account? '}
                        <span className={LinkText}>{signin ? 'Sign up' : 'Log in'}</span>
                    </div>

                    <XView marginBottom={60} width={240} marginTop={20}>
                        <UButton
                            onClick={loginWithEmail}
                            size="large"
                            square={true}
                            text="Continue with Email"
                            style="secondary"
                            left={
                                <XView marginRight={6}>
                                    <UIcon icon={<EmailIcon />} />
                                </XView>
                            }
                        />
                        <UButton
                            onClick={loginWithGoogle}
                            marginTop={16}
                            size="large"
                            square={true}
                            text="Continue with Google"
                            left={
                                <XView marginRight={6}>
                                    <UIcon color="white" icon={<GoogleIcon />} />
                                </XView>
                            }
                        />
                    </XView>
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
                    <BackSkipLogo
                        onBack={() => window.history.back()}
                        onSkip={null}
                        noLogo={true}
                    />
                    <SignUpAuthMechanism {...props} />
                </>
            )}

            {props.roomView && <RoomAuthMechanism {...props} />}
        </XView>
    );
};
