import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { withShortName } from 'openland-web/api/withShortName';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { Scaffold } from 'openland-web/components/Scaffold';
import { XView } from 'react-mental';
import { UserProfileInner } from './components/UserProfileComponent';
import { OrganizationProfileInner } from './components/OrganizationProfileComponent';
import { ResolveShortName_item_User, ResolveShortName_item_Organization } from 'openland-api/Types';

export default withApp(
    'Shortname',
    'viewer',
    withShortName(
        withQueryLoader(props => {
            if (props.data && props.data.item && props.data.item.__typename) {
                let item = props.data.item;

                let user =
                    props.data.item.__typename === 'User'
                        ? (item as ResolveShortName_item_User)
                        : undefined;
                let org =
                    props.data.item.__typename === 'Organization'
                        ? (item as ResolveShortName_item_Organization)
                        : undefined;

                return (
                    <Scaffold>
                        <Scaffold.Content padding={false} bottomOffset={false}>
                            <XView flexDirection="column" width="100%" height="100%" flexShrink={0}>
                                {user && (
                                    <UserProfileInner
                                        router={props.router}
                                        user={user}
                                        hideBack={true}
                                    />
                                )}
                                {org && (
                                    <OrganizationProfileInner
                                        router={props.router}
                                        organization={org}
                                        hideBack={true}
                                    />
                                )}
                            </XView>
                        </Scaffold.Content>
                    </Scaffold>
                );
            }

            return <XPageRedirect path="/404" />;
        }),
    ),
);
