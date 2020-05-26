import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { DiscussionsComponent } from './components/DiscussionsComponent';

export const HubFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    let hub = client.useHub({ id: props.id }, { fetchPolicy: 'cache-and-network' }).hub!;
    return (
        <>
            <UHeader title={hub.title} appearance="wide" />
            <XScrollView3 flexGrow={1} flexShrink={1} alignSelf="stretch" alignItems="stretch">
                <XView flexDirection="row" alignItems="flex-start" justifyContent="center" paddingRight={56}>
                    <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
                        <DiscussionsComponent hubs={[hub.id]} />
                    </XView>
                </XView>
            </XScrollView3>
        </>
    );
});