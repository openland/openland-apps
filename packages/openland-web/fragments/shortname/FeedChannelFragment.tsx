import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';

export const FeedChannelFragment = React.memo((props: { id: string }) => {
    return (
        <>
            <UHeader title={props.id} />
            <Page track="feed_channel">
                TODO: Channel subfeed
            </Page>
        </>
    );
});