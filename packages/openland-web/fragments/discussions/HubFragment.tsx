import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-api/useClient';
import { DiscussionsComponent } from './components/DiscussionsComponent';

export const HubFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    let hub = client.useChannel({ id: props.id }, { fetchPolicy: 'cache-and-network' }).channel!;
    return (
        <Page track="discussions_hub_page" appearance="wide">
            <UHeader title={hub.title} appearance="wide" />
            <DiscussionsComponent hubs={[hub.id]} />
        </Page>
    );
});