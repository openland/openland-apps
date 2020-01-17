import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { FormLayout, Title, Subtitle, textClassName } from './components/authComponents';
import { TextCaption } from 'openland-web/utils/TextStyles';
import { css, cx } from 'linaria';
import { Unicorn } from 'openland-x/XLoader';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { isElectron } from 'openland-y-utils/isElectron';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { AuthHeaderConfig } from './root.page';

const captionText = css`
    color: var(--foregroundTertiary);
    text-align: center;
`;

const boldCaption = css`
    font-weight: 600;
`;

export type AuthMechanism = {
    loginWithGoogle: () => void;
    loginWithEmail: () => void;
};

export const SignUpAuthMechanism = ({
    loginWithGoogle,
    loginWithEmail,
}: AuthMechanism) => {
    const [width] = useWithWidth();
    return (
        <FormLayout>
            <XView
                alignItems="center"
                marginBottom={16}
            >
                <Unicorn width="128" height="128" />
            </XView>
            <Title text="Openland" />
            <Subtitle text="The best place to find and build inspiring communities" />

            <XView marginBottom={32} alignSelf="center" width={width && width < 400 ? '100%' : 240} marginTop={32}>
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
            <p className={cx(TextCaption, captionText, textClassName)}>By creating an account you are accepting our <span className={boldCaption}>Terms of service</span> and <span className={boldCaption}>Privacy policy</span></p>
        </FormLayout>
    );
};

export const CreateNewAccountPage = (props: AuthMechanism) => {
    let router = React.useContext(XRouterContext)!;
    return (
        <XView backgroundColor="white" flexGrow={1} flexShrink={1}>
            <XDocumentHead title="Login" />
            {!isElectron && (
                <AuthHeaderConfig
                    onBack={() => {
                        router.replace('/');
                    }}
                />
            )}
            <SignUpAuthMechanism {...props} />
        </XView>
    );
};
