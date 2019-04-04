import * as React from 'react';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView } from 'openland-x/XScrollView';
import { XView } from 'react-mental';

export const AppContainer = React.memo<{ children?: any }>((props) => {
    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <XView flexGrow={1} alignItems="stretch" alignSelf="stretch" flexDirection="column">
                <XScrollView flexGrow={1}>
                    {props.children}
                </XScrollView>
            </XView>
        </React.Suspense>
    );
});