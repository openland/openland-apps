import * as React from 'react';
import { withAccountQuery } from 'openland-web/api/withAccountQuery';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { PushEngineComponent } from 'openland-web/components/push/PushEngineComponent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { UserInfoProvider } from 'openland-web/components/UserInfo';
import { MessengerProvider } from 'openland-web/components/messenger/MessengerProvider';
import { YApolloProvider, YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { TalkProviderComponent } from 'openland-web/components/conference/TalkProviderComponent';

export const AppContainer = withAccountQuery(withQueryLoader((props) => {
    let hasMessenger = !!props.data.me;
    return (
        <>
            <PushEngineComponent enable={hasMessenger} />
            <XDocumentHead title={['App']} />
            <UserInfoProvider
                router={props.router}
                sessionState={props.data.sessionState}
                user={props.data.me}
                organization={props.data.me && props.data.me.primaryOrganization}
                roles={props.data.myPermissions.roles}
            >
                <MessengerProvider user={hasMessenger ? props.data.me!! : undefined}>
                    <YApolloContext.Consumer>
                        {apollo => (
                            <TalkProviderComponent client={apollo!}>
                                {props.children}
                            </TalkProviderComponent>
                        )}
                    </YApolloContext.Consumer>
                </MessengerProvider>
            </UserInfoProvider>
        </>
    );
}));