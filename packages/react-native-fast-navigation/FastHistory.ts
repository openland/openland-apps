import { FastRouter } from './FastRouter';
import { FastRoutes } from './FastRoutes';
import UUID from 'uuid/v4';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { Animated } from 'react-native';
import { FastHeaderConfig } from './FastHeaderConfig';

export interface FastHistoryRecord {
    readonly route: string;
    readonly key: string;
    readonly params: any;
    readonly component: React.ComponentType<{}>;
    readonly router: FastRouter;
    readonly contentOffset: Animated.Value;
    config: FastHeaderConfig;
}

export class FastHistory {
    readonly history: FastHistoryRecord[];
    constructor(history: FastHistoryRecord[]) {
        this.history = [...history];
    }
}

export interface HistoryWatcher {
    onPushed(record: FastHistoryRecord, history: FastHistory): void;
    onPopped(record: FastHistoryRecord, history: FastHistory): void;
}

export class FastHistoryManager {
    readonly routes: FastRoutes;
    private history: FastHistory;
    private watchers: HistoryWatcher[] = [];

    private createRecord(index: number, route: string, params?: any): FastHistoryRecord {
        let key = 'page-' + index + '-' + UUID();
        let component = this.routes.resolvePath(route);
        let router = {
            route,
            index,
            key,
            params: params || {},
            push: this.push,
            back: this.pop,
            updateConfig: (config) => {
                this.updateConfig(key, config);
            }
        } as FastRouter;
        return { route: route, params, key, component, router, contentOffset: new Animated.Value(0), config: new FastHeaderConfig({}) };
    }

    constructor(routes: FastRoutes) {
        this.routes = routes;
        this.history = new FastHistory([this.createRecord(0, routes.defaultRoute)]);
    }

    getState() {
        return this.history;
    }

    watch(watcher: HistoryWatcher): WatchSubscription {
        this.watchers.push(watcher);
        return () => {
            return () => {
                let index = this.watchers.indexOf(watcher);
                if (index < 0) {
                    console.warn('Double unsubscribe detected!');
                } else {
                    this.watchers.splice(index, 1);
                }
            };
        };
    }

    updateConfig = (key: string, config: FastHeaderConfig) => {
        console.log('update config');
        let r = this.history.history.find((v) => v.key === key);
        if (r) {
            r.config = config;
        }
    }

    push = (route: string, params?: any) => {
        let record = this.createRecord(this.history.history.length, route, params);
        let nhistory = new FastHistory([...this.history.history, record]); // keep to avoid insonsistency if we will change routes in watchers
        this.history = nhistory;
        for (let w of this.watchers) {
            w.onPushed(record, nhistory);
        }
    }
    pop = () => {
        if (this.history.history.length <= 1) {
            return false;
        }
        let removed = this.history.history[this.history.history.length - 1];
        let r = [...this.history.history];
        r.splice(r.length - 1, 1);
        let nhistory = new FastHistory(r);
        this.history = nhistory;
        for (let w of this.watchers) {
            w.onPopped(removed, nhistory);
        }
        return true;
    }
}