import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { FormLayout } from './components/authComponents';
import { TextTitle1, TextBody, TextCaption } from 'openland-web/utils/TextStyles';
import { css, cx } from 'linaria';
import { Unicorn } from 'openland-x/XLoader';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { isElectron } from 'openland-y-utils/isElectron';

const titleText = css`
    color: var(--foregroundPrimary);
    margin-bottom: 8px;
`;

const captionText = css`
    color: var(--foregroundTertiary);
    text-align: center;
    padding: 0 16px;
`;

const boldCaption = css`
    font-weight: 600;
`;

const bodyText = css`
    text-align: center;
    color: var(--foregroundSecondary);
`;

export type AuthMechanism = {
    loginWithGoogle: () => void;
    loginWithEmail: () => void;
};

export const SignUpAuthMechanism = ({
    loginWithGoogle,
    loginWithEmail,
}: AuthMechanism) => {
    return (
        <FormLayout>
            <XView alignItems="center" flexGrow={1} justifyContent="center">
                <XView
                    maxWidth={320}
                    alignItems="center"
                    justifyContent="center"
                >
                    <XView
                        justifyContent="center"
                        marginBottom={16}
                    >
                        <Unicorn width="128" height="128" />
                    </XView>
                    <h2 className={cx(TextTitle1, titleText)}>Openland</h2>

                    <h3 className={cx(TextBody, bodyText)}>
                        The best place to find and build inspiring communities
                    </h3>

                    <XView marginBottom={32} width={240} marginTop={32}>
                        <UButton
                            onClick={loginWithGoogle}
                            marginBottom={16}
                            size="large"
                            shape="square"
                            text="Continue with Google"
                        />
                        <UButton
                            onClick={loginWithEmail}
                            size="large"
                            shape="square"
                            text="Continue with Email"
                            style="secondary"
                        />
                    </XView>

                    <p className={cx(TextCaption, captionText)}>By creating an account you are accepting our <span className={boldCaption}>Terms of service</span> and <span className={boldCaption}>Privacy policy</span></p>
                </XView>
            </XView>
        </FormLayout>
    );
};

export const CreateNewAccountPage = (props: AuthMechanism) => {
    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Login" />
            {!isElectron && (
                <BackSkipLogo
                    onBack={() => {
                        window.history.back();
                    }}
                    onSkip={null}
                />
            )}
            <SignUpAuthMechanism {...props} />
        </XView>
    );
};
