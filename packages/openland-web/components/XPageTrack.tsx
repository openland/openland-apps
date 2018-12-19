import * as React from 'react';
import { withRouter } from 'openland-x-routing/withRouter';
import { XTrack } from 'openland-x-analytics/XTrack';

export const XPageTrack = withRouter<{ name: string }>((props) => {
    return (<XTrack event={'View ' + props.name} params={props.router.routeQuery} />)
});