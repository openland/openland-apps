import * as React from 'react';
import { XViewRouteContext, XViewRoute } from 'react-mental';

export const useRouteChange = (handler: (newRoute: XViewRoute, prevRoute: XViewRoute) => void) => {
    let prevRoute = React.useRef<{ route?: XViewRoute }>({ route: undefined }).current!;
    let route = React.useContext(XViewRouteContext);
    if (route && prevRoute && prevRoute.route && prevRoute.route.href !== route.href) {
        handler(route, prevRoute.route);
    }
    if (prevRoute) {
        prevRoute.route = route;
    }
};
