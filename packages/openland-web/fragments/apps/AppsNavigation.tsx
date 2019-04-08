import * as React from 'react';
import { MenuItem } from 'openland-web/components/MainLayout';

export const AppsNavigation = React.memo(() => {
    return (
        <>
            <MenuItem title="Feed" path="/apps/feed" />
            <MenuItem title="Tasks" path="/apps/tasks" />
        </>
    )
});