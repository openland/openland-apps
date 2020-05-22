import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { Page } from 'openland-landing/new/components/Page';

export const DiscussionsFragment = React.memo(() => {
    return (
        <>
            <UHeader title="All discussions" appearance="wide" />
            <XView flexDirection="row" alignItems="flex-start" justifyContent="center" paddingRight={56}>
                <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
                    asdas
                </XView>
            </XView>
        </>
    );
});