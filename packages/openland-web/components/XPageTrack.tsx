import * as React from 'react';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XMemo } from 'openland-y-utils/XMemo';

export const XPageTrack = XMemo<{ name: string }>(props => {
    let router = React.useContext(XRouterContext)!;
    return <XTrack event={'View ' + props.name} params={router.routeQuery} />;
});

XPageTrack.displayName = 'XPageTrack';
