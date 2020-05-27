import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { FormLayout, Title, Subtitle } from './components/authComponents';
import { Unicorn } from 'openland-x/XLoader';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { isElectron } from 'openland-y-utils/isElectron';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { AuthHeaderConfig } from './root.page';

type AuthMechanism = {
    loginWithPhone: () => void;
    loginWithGoogle: () => void;
    loginWithEmail: () => void;
};

const SignUpAuthMechanism = ({
    loginWithPhone,
    loginWithGoogle,
    loginWithEmail,
}: AuthMechanism) => {
    const [width] = useWithWidth();
    return (
        <FormLayout>
            <XView alignItems="center" marginBottom={16}>
                <Unicorn width="128" height="128" />
            </XView>
            <Title text="Openland" />
            <Subtitle text="The best place to find and build inspiring&nbsp;communities" />

            <XView alignSelf="center" width={width && width < 400 ? '100%' : 240} marginTop={32}>
                <UButton
                    onClick={loginWithPhone}
                    marginBottom={16}
                    size="large"
                    shape="square"
                    text="Continue with Phone"
                />
                <UButton
                    onClick={loginWithGoogle}
                    marginBottom={16}
                    size="large"
                    shape="square"
                    style="secondary"
                    text="Continue with Google"
                />
                <UButton
                    onClick={loginWithEmail}
                    size="large"
                    shape="square"
                    text="Continue with email"
                    style="secondary"
                />
            </XView>
        </FormLayout>
    );
};

export const CreateNewAccountPage = (props: AuthMechanism) => {
    const router = React.useContext(XRouterContext)!;
    const isInvite =
        router.query &&
        router.query.redirect &&
        router.query.redirect.includes('acceptChannelInvite');
    return (
        <XView backgroundColor="white" flexGrow={1} flexShrink={1}>
            <XDocumentHead title="Login" />
            {!isElectron && (
                <AuthHeaderConfig
                    onBack={() => {
                        if (isInvite) {
                            router.replace('/joinChannel/' + router.query.redirect.split('/')[2]);
                        } else {
                            router.replace('/');
                        }
                    }}
                />
            )}
            <SignUpAuthMechanism {...props} />
        </XView>
    );
};
