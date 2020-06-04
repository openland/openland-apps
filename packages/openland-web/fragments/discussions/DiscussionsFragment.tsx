import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { DiscussionsComponent } from './components/DiscussionsComponent';

export const DiscussionsFragment = React.memo(() => {
    return (
        <Page track="discussions_page" appearance="wide">
            <UHeader title="All channels" appearance="wide" />
            <DiscussionsComponent hubs={null} />
        </Page>
    );
});