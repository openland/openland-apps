import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { DiscussionsComponent } from './components/DiscussionsComponent';

export const DiscussionsFragment = React.memo(() => {
    return (
        <>
            <UHeader title="All discussions" appearance="wide" />
            <XScrollView3 flexGrow={1} flexShrink={1} alignSelf="stretch" alignItems="stretch">
                <XView flexDirection="row" alignItems="flex-start" justifyContent="center" paddingRight={56}>
                    <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
                        <DiscussionsComponent hubs={null} />
                    </XView>
                </XView>
            </XScrollView3>
        </>
    );
});