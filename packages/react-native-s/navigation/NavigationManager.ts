import { WatchSubscription } from 'openland-y-utils/Watcher';
import { NavigationState } from './NavigationState';
import { NavigationPage } from './NavigationPage';
import { SRoutes } from '../SRoutes';
import { PresentationManager } from './PresentationManager';
import { randomKey } from '../utils/randomKey';

export interface NavigationManagerListener {
    onPushed(page: NavigationPage, state: NavigationState): void;
    onPopped(page: NavigationPage, state: NavigationState): void;
}

export class NavigationManager {
    readonly key = randomKey();
    readonly routes: SRoutes;
    readonly parent?: NavigationManager;
    presentationManager?: PresentationManager;

    private state: NavigationState;
    private watchers: NavigationManagerListener[] = [];
    private locksCount = 0;
    private customHandler?: ((route: string, params?: any) => boolean);

    constructor(routes: SRoutes, route?: string, params?: any, parent?: NavigationManager) {
        this.parent = parent;
        this.routes = routes;
        this.state = new NavigationState([new NavigationPage(this, 0, route || routes.defaultRoute, params)]);
    }

    setPushHandler = (handler: (route: string, params?: any) => boolean) => {
        this.customHandler = handler;
    }

    getState() {
        return this.state;
    }

    pushAndRemove = (route: string, params?: any) => {
        if (this.customHandler) {
            if (this.customHandler(route, params)) {
                return;
            }
        }
        if (this.locksCount > 0) {
            return;
        }
        let record = new NavigationPage(this, this.state.history.length, route, params, this.state.history[this.state.history.length - 2].key);
        let pages = [...this.state.history];
        pages.pop();
        let nhistory = new NavigationState([...pages, record]); // keep to avoid insonsistency if we will change routes in watchers
        this.state = nhistory;
        for (let w of this.watchers) {
            w.onPushed(record, nhistory);
        }
    }

    push = (route: string, params?: any) => {
        if (this.customHandler) {
            if (this.customHandler(route, params)) {
                return;
            }
        }
        if (this.locksCount > 0) {
            return;
        }
        let record = new NavigationPage(this, this.state.history.length, route, params, this.state.history[this.state.history.length - 1].key);
        let nhistory = new NavigationState([...this.state.history, record]); // keep to avoid insonsistency if we will change routes in watchers
        this.state = nhistory;
        for (let w of this.watchers) {
            w.onPushed(record, nhistory);
        }
    }
    pop = () => {
        if (this.locksCount > 0) {
            return;
        }
        if (this.state.history.length <= 1) {
            if (this.parent && this.parent.presentationManager) {
                this.parent.presentationManager.dismiss();
                return true;
            }
            return false;
        }
        let removed = this.state.history[this.state.history.length - 1];
        let r = [...this.state.history];
        r.splice(r.length - 1, 1);
        let nhistory = new NavigationState(r);
        this.state = nhistory;
        for (let w of this.watchers) {
            w.onPopped(removed, nhistory);
        }
        return true;
    }

    popWihtoutNotification = () => {
        let r = [...this.state.history];
        r.splice(r.length - 1, 1);
        let nhistory = new NavigationState(r);
        this.state = nhistory;
        return nhistory;
    }

    watch(watcher: NavigationManagerListener): WatchSubscription {
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

    isLocked = () => {
        return this.locksCount > 0;
    }

    resolvePath(route: string) {
        return this.routes.resolvePath(route);
    }

    setPresentationManager(manager: PresentationManager) {
        this.presentationManager = manager;
    }
}