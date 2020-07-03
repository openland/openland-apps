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
import { AskAuthDataProps } from './ask-auth-data.page';
import Cookies from 'js-cookie';

type AuthMechanism = AskAuthDataProps & {
    loginWith: (phone: boolean) => void;
};

const SignUpAuthMechanism = (props: AuthMechanism) => {
    const { loginWith } = props;
    const [width] = useWithWidth();
    const hasAppInvite = !!Cookies.get('x-openland-app-invite');
    const inviterName = hasAppInvite ? localStorage.getItem('app-inviter-name') : null;
    return (
        <FormLayout>
            <XView alignItems="center" marginBottom={16}>
                <Unicorn width="96" height="96" />
            </XView>
            <Title text={inviterName ? `${inviterName} invites you to join Openland` : 'Openland'} />
            <Subtitle text="Modern social network built&nbsp;for&nbsp;you,&nbsp;not&nbsp;advertisers" />

            <XView alignSelf="center" width={width && width < 400 ? '100%' : 240} marginTop={32}>
                <UButton
                    onClick={() => loginWith(true)}
                    size="large"
                    shape="square"
                    text="Continue with phone"
                    style="primary"
                />
                <XView height={16} />
                <UButton
                    onClick={() => loginWith(false)}
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
                    mobileTransparent={true}
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
