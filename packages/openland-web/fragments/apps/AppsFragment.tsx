import * as React from 'react';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { AppContainer } from './AppContainer';
import { FeedFragment } from '../FeedFragment';
// import { Navigation } from 'openland-web/components/Navigation';
// import { MenuItem } from 'openland-web/components/MainLayout';

const AppResolver = React.memo<{ appId: string }>((props) => {
    if (props.appId === 'feed') {
        return <FeedFragment />
    } else if (props.appId === 'tasks') {
        return null;
    } else {
        return null;
    }
});

export const AppsFragment = React.memo(() => {
    let path = useXRouter();
    if (path.routeQuery.appId) {
        return <AppContainer><AppResolver appId={path.routeQuery.appId} /></AppContainer>;
    } else {
        return null;
    }
});