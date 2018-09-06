import * as React from 'react';
import { FastRouter } from './FastRouter';
import { Watcher } from 'openland-y-utils/Watcher';
import { FastHeaderConfig } from './FastHeaderConfig';
import UUID from 'uuid/v4';
import { FastHistoryManager } from './FastHistory';

export class FastHistoryRecord {

    readonly route: string;
    readonly key: string;
    readonly params: any;
    readonly component: React.ComponentType<{}>;
    readonly router: FastRouter;
    readonly config: Watcher<FastHeaderConfig>;
    readonly prevKey?: string;
    readonly startIndex: number;

    constructor(manager: FastHistoryManager, index: number, route: string, params?: any, prevKey?: string) {
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
            back: (args?: { immediate?: boolean }) => {
                return manager.pop(args);
            },
            updateConfig: (config) => {
                this.config.setState(config);
            },
            prevKey
        } as FastRouter;
        let cfg = new Watcher<FastHeaderConfig>();
        let c = new FastHeaderConfig({});
        cfg.setState(c);
        this.route = route;
        this.params = params || {};
        this.startIndex = index;
        this.router = router;
        this.key = key;
        this.component = component;
        this.config = cfg;
    }
}