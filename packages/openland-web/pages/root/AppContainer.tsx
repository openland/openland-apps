import * as React from 'react';
import { PushEngineComponent } from 'openland-web/components/push/PushEngineComponent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { UserInfoProvider } from 'openland-web/components/UserInfo';
import { MessengerProvider } from 'openland-web/components/messenger/MessengerProvider';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { TalkProviderComponent } from '../main/mail/components/conference/TalkProviderComponent';
import { useQuery } from 'openland-web/components/useQuery';
import { AccountQuery } from 'openland-api';
import { XLoader } from 'openland-x/XLoader';

export const AppContainer = React.memo((props) => {
    let apollo = React.useContext(YApolloContext)!;
    let account = useQuery(AccountQuery);
    if (account.loading) {
        return (
            <>
                <XDocumentHead title={['App']} />
                <XLoader loading={true} />
            </>
        )
    }

    let hasMessenger = !!account.data.me;
    return (
        <>
            <PushEngineComponent enable={hasMessenger} />
            <XDocumentHead title={['App']} />
            <UserInfoProvider
                sessionState={account.data.sessionState}
                user={account.data.me}
                organization={account.data.me && account.data.me.primaryOrganization}
                roles={account.data.myPermissions.roles}
            >
                <MessengerProvider user={hasMessenger ? account.data.me!! : undefined}>
                    <TalkProviderComponent client={apollo}>
                        {props.children}
                    </TalkProviderComponent>
                </MessengerProvider>
            </UserInfoProvider>
        </>
    );
});

AppContainer.displayName = 'AppContainer';