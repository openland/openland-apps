import * as React from 'react';
import { RoomsExploreComponent } from 'openland-web/fragments/discover/components/RoomsExploreComponent';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';

export const DiscoverGroupsFragment = React.memo(() => {
    return (
        <Page track="discover_groups" appearance="wide">
            <UHeader title="Groups" appearance="wide" />
            <RoomsExploreComponent />
        </Page>
    );
});
