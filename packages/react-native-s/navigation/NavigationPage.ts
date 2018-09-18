import * as React from 'react';
import { SRouter } from '../SRouter';
import { Watcher, WatchSubscription } from 'openland-y-utils/Watcher';
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
    config: HeaderConfig;
    readonly prevKey?: string;
    readonly startIndex: number;

    private watchers: ((config: HeaderConfig, animated?: boolean) => void)[] = [];

    searchStarted: boolean = false;

    constructor(manager: NavigationManager, index: number, route: string, params?: any, prevKey?: string) {
        let key = 'page-' + index + '-' + UUID();
        let component = manager.resolvePath(route);
        let router = {
            route,
            index,
            key,
            params: params || {},
            dismiss: () => {
                //  
            },
            present: (destRoute: string, destParams?: any) => {
                if (manager.presentationManager) {
                    manager.presentationManager.present(destRoute, destParams);
                }
            },
            push: (destRoute: string, destParams?: any) => {
                manager.push(destRoute, destParams);
            },
            back: () => {
                return manager.pop();
            },
            setConfig: (config: HeaderConfig, animated?: boolean) => {
                this.config = config;
                for (let w of this.watchers) {
                    w(config, animated);
                }
            },
            prevKey
        } as SRouter;
        this.route = route;
        this.params = params || {};
        this.startIndex = index;
        this.router = router;
        this.key = key;
        this.component = component;
        this.config = {};
    }

    watchConfig(handler: (config: HeaderConfig, animated?: boolean) => void): WatchSubscription {
        this.watchers.push(handler);
        return () => {
            let index = this.watchers.indexOf(handler);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this.watchers.splice(index, 1);
            }
        };
    }
}
