import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { Navigation } from 'openland-web/components/Navigation';
import { AppsNavigation } from 'openland-web/fragments/apps/AppsNavigation';
import { AppsFragment } from 'openland-web/fragments/apps/AppsFragment';

export default withApp('Apps', 'viewer', () => {
    return (
        <Navigation
            title="Apps"
            swapFragmentsOnMobile
            menuChildrenContent={<AppsNavigation />}
            secondFragment={<AppsFragment />}
        />
    );
});
