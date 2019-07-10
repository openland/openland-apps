import * as React from 'react';
import { withRouter } from 'openland-x-routing/withRouter';
import { withApp } from 'openland-web/components/withApp';
import { DiscoverNavigation } from 'openland-web/pages/main/discover/components/DiscoverNavigation';

export default withApp(
    'Account',
    'viewer',
    withRouter(() => {
        return <DiscoverNavigation title={'Groups'}>auth</DiscoverNavigation>;
    }),
);
