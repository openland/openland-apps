import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { UserInfoProvider } from 'openland-web/components/UserInfo';
import { MessengerProvider } from 'openland-web/components/messenger/MessengerProvider';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { XLoader } from 'openland-x/XLoader';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { PushEngineComponent } from 'openland-web/modules/push/PushEngineComponent';
import { TalkProviderComponent } from 'openland-web/modules/conference/TalkProviderComponent';
import { withAccountQuery } from 'openland-web/api/withAccountQuery';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { MessengerContext } from 'openland-engines/MessengerEngine';

const TalkProv = (props: { children?: any }) => {
    let apollo = React.useContext(MessengerContext)!.client;
    return (
        <TalkProviderComponent client={apollo}>
            {props.children}
        </TalkProviderComponent>
    )
}

export const AppContainer = withAccountQuery(props => {
    // let apollo = React.useContext(YApolloContext)!;
    // let account = useQuery(AccountQuery);
    if (props.loading) {
        return (
            <>
                <XDocumentHead title={[]} />
                <XLoader loading={true} />
            </>
        );
    }

    let hasMessenger = canUseDOM && !!props.data.me;
    return (
        <>
            <PushEngineComponent enable={hasMessenger} />
            <XDocumentHead title={[]} />
            <UserInfoProvider
                sessionState={props.data.sessionState}
                user={props.data.me}
                organization={props.data.me && props.data.me.primaryOrganization}
                roles={props.data.myPermissions.roles}
            >
                <MessengerProvider user={hasMessenger ? props.data.me!! : undefined}>
                    {hasMessenger && (
                        <TalkProv>
                            {props.children}
                        </TalkProv>
                    )}
                    {!hasMessenger && props.children}
                </MessengerProvider>
            </UserInfoProvider>
        </>
    );
});

AppContainer.displayName = 'AppContainer';
