import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { DiscussionsComponent } from './components/DiscussionsComponent';

export const DiscussionsFragment = React.memo(() => {
    return (
        <>
            <UHeader title="All discussions" appearance="wide" />
            <DiscussionsComponent hubs={null} />
        </>
    );
});