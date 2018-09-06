import { FastRoutes } from './FastRoutes';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { FastHistoryRecord } from './FastHistoryRecord';
import { FastHistoryState } from './FastHistoryState';

export interface HistoryWatcher {
    onPushed(record: FastHistoryRecord, state: FastHistoryState): void;
    onPopped(record: FastHistoryRecord, state: FastHistoryState, args?: { immediate?: boolean }): void;
}

export class FastHistoryManager {
    readonly routes: FastRoutes;
    private state: FastHistoryState;
    private watchers: HistoryWatcher[] = [];
    private locksCount = 0;

    constructor(routes: FastRoutes) {
        this.routes = routes;
        this.state = new FastHistoryState([new FastHistoryRecord(this, 0, routes.defaultRoute)]);
    }

    getState() {
        return this.state;
    }

    push = (route: string, params?: any) => {
        if (this.locksCount > 0) {
            return;
        }
        let record = new FastHistoryRecord(this, this.state.history.length, route, params, this.state.history[this.state.history.length - 1].key);
        let nhistory = new FastHistoryState([...this.state.history, record]); // keep to avoid insonsistency if we will change routes in watchers
        this.state = nhistory;
        for (let w of this.watchers) {
            w.onPushed(record, nhistory);
        }
    }
    pop = (args?: { immediate?: boolean }) => {
        if (this.locksCount > 0) {
            return;
        }
        if (this.state.history.length <= 1) {
            return false;
        }
        let removed = this.state.history[this.state.history.length - 1];
        let r = [...this.state.history];
        r.splice(r.length - 1, 1);
        let nhistory = new FastHistoryState(r);
        this.state = nhistory;
        for (let w of this.watchers) {
            w.onPopped(removed, nhistory, args);
        }
        return true;
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

    beginLock = () => {
        var locked = true;
        this.locksCount++;
        return () => {
            if (locked) {
                locked = false;
                this.locksCount--;
            }
        };
    }

    resolvePath(route: string) {
        return this.routes.resolvePath(route);
    }
}