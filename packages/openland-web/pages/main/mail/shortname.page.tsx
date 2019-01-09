import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withShortName } from 'openland-web/api/withShortName';
import { MessagePageInner } from '../mail/root.page';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';

export default withApp(
    'Shortname',
    'viewer',
    withShortName(
        withQueryLoader(props => {
            if (props.data && props.data.item && props.data.item.__typename) {
                if (props.data.item.__typename === 'User') {
                    return <MessagePageInner router={props.router} userId={props.data.item.id} />;
                }

                if (props.data.item.__typename === 'Organization') {
                    return (
                        <MessagePageInner
                            router={props.router}
                            organizationId={props.data.item.id}
                        />
                    );
                }
            }

            return <XPageRedirect path="/404" />;
        }),
    ),
);
