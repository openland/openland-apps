import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { DiscussionComponent } from './DiscussionComponent';

export const DiscussionsComponent = React.memo((props: { hubs: string[] | null }) => {
    const client = useClient();
    const discussions = client.useDiscussions({ hubs: props.hubs || [] }, { fetchPolicy: 'network-only' }).discussions;
    return (
        <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
            {discussions.items.map((d, i) => (
                <DiscussionComponent
                    key={d.id}
                    data={d}
                />
            ))}
        </XView>
    );
});