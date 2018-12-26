import * as React from 'react';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

export const XPageTrack = React.memo<{ name: string }>(props => {
    let router = React.useContext(XRouterContext)!;
    return <XTrack event={'View ' + props.name} params={router.routeQuery} />;
});

XPageTrack.displayName = 'XPageTrack';
