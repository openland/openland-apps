import * as React from 'react';
import { SRouter } from '../SRouter';
import { Watcher } from 'openland-y-utils/Watcher';
import UUID from 'uuid/v4';
import { HeaderConfig } from './HeaderConfig';
import { NavigationManager } from './NavigationManager';
import { HeaderState } from './HeaderState';

export class NavigationPage {

    readonly route: string;
    readonly key: string;
    readonly params: any;
    readonly component: React.ComponentType<{}>;
    readonly router: SRouter;
    readonly config: Watcher<HeaderConfig>;
    readonly state: Watcher<HeaderState>;
    readonly prevKey?: string;
    readonly startIndex: number;

    searchStarted: boolean = false;

    constructor(manager: NavigationManager, index: number, route: string, params?: any, prevKey?: string) {
        let key = 'page-' + index + '-' + UUID();
        let component = manager.resolvePath(route);
        let router = {
            route,
            index,
            key,
            params: params || {},
            push: (destRoute: string, destParams?: any) => {
                manager.push(destRoute, destParams);
            },
            back: () => {
                return manager.pop();
            },
            setConfig: (config: HeaderConfig) => {
                this.config.setState(config);
            },
            prevKey
        } as SRouter;
        let cfg = new Watcher<HeaderConfig>();
        let c = {};
        cfg.setState(c);
        let st = new Watcher<HeaderState>();
        st.setState({ searchMounted: false, searchQuery: '' });
        this.state = st;
        this.route = route;
        this.params = params || {};
        this.startIndex = index;
        this.router = router;
        this.key = key;
        this.component = component;
        this.config = cfg;
    }
}