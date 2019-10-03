import * as React from 'react';
import { RoomsExploreComponent } from 'openland-web/fragments/discover/components/RoomsExploreComponent';
import { Page } from 'openland-unicorn/Page';

export const DiscoverGroupsFragment = React.memo(() => {
    return <Page track="discover_groups"><RoomsExploreComponent /></Page>;
});