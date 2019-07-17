import { URouting } from 'openland-unicorn/URouting';
import { StackRouter } from './StackRouter';
import { randomKey } from './utils/randomKey';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { Router } from 'openland-web/routes';
import NextRouter from 'next/router';
import { parse } from 'url';

export interface TabDefinition {
    readonly icon: any;
    readonly iconActive: any;
    readonly path: string;
    readonly component: any;
}

export class TabRouter {
    readonly routing: URouting;
    readonly tabs: TabDefinition[];
    readonly stacks: StackRouter[];
    readonly persistenceKey?: string;
    private id: string = randomKey();
    private topId = 1;
    private currentId = 1;
    private isPopping = false;
    currentTab: number;

    onChangeListener?: (index: number) => void;

    constructor(tabs: TabDefinition[], defaultTab: number, routing: URouting, persistenceKey?: string) {
        if (defaultTab < 0 || defaultTab >= tabs.length) {
            throw Error('Invalid tab index: ' + defaultTab);
        }
        this.persistenceKey = persistenceKey;
        this.tabs = tabs;
        this.stacks = this.tabs.map((v, i) => {
            let r = new StackRouter(v.path, routing);
            r.addListener((action) => {
                if (action.type === 'pop') {
                    this.onStackPopped(i);
                }
            });
            return r;
        });
        this.currentTab = defaultTab;
        this.routing = routing;

        // Sync with browser history
        let wasRestored = false;
        if (canUseDOM) {

            const tryRestore = (src: any) => {
                if (src && src.options) {
                    let routerId = src.options['tab-router'];
                    let routerCurrentId = src.options['tab-router-index'];
                    let routerCurrentTab = src.options['tab-router-current'];
                    if (typeof routerId !== 'string') {
                        return;
                    }
                    if (typeof routerCurrentId !== 'number') {
                        return;
                    }
                    if (typeof routerCurrentTab !== 'number') {
                        return;
                    }

                    this.id = routerId;
                    this.currentId = routerCurrentId;
                    this.topId = this.currentId;
                    this.currentTab = routerCurrentTab;

                    let maxId = sessionStorage.getItem('tab-router-' + this.id + '-top');
                    if (maxId) {
                        try {
                            this.topId = Math.max(this.topId, parseInt(maxId, 10));
                        } catch (e) {
                            console.warn(e);
                        }
                    }
                    return true;
                }

                return false;
            };

            if (tryRestore(window.history.state)) {
                wasRestored = true;
            }

            // Hack to load initial tab router
            // Next.JS overwrite current page history on initial load
            if (!wasRestored) {
                let ex = ((window as any).initial as string);
                if (ex) {
                    let state = JSON.parse(ex);
                    if (tryRestore(state)) {
                        wasRestored = true;
                    }
                }
            }
        } else {
            this.id = randomKey();
        }

        // Update current history state
        if (canUseDOM) {
            window.history.replaceState({
                ...window.history.state,
                options: {
                    ...window.history.state.options,
                    ['tab-router']: this.id,
                    ['tab-router-current']: this.currentTab,
                    ['tab-router-index']: this.currentId,
                }
            }, '');
        }

        // Restore last known tab
        if (canUseDOM && persistenceKey) {
            let existing = localStorage.getItem('tab-router-' + persistenceKey);
            if (existing) {
                try {
                    let i = parseInt(existing, 10);
                    if (i >= 0 && i <= tabs.length) {
                        this.currentTab = i;
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        }

        if (canUseDOM) {
            NextRouter.events.on('routeChangeComplete', () => {
                if (window.history.state && window.history.state.options) {
                    if (window.history.state.options['tab-router'] === this.id) {

                        // console.log('changed', JSON.parse(JSON.stringify(window.history.state.options)));

                        // Ignore if not changed
                        let index = window.history.state.options['tab-router-index'];
                        if (typeof index !== 'number') {
                            return;
                        }
                        if (index === this.currentId) {
                            return;
                        }

                        let tab = window.history.state.options['tab-router-current'];
                        if (typeof tab !== 'number') {
                            return;
                        }

                        console.log('history changed');
                        this.historyChanged(window.history.state.options, index, tab, window.history.state.as);
                    }
                }
            });
        }
    }

    switchTab(index: number) {
        let destUrl = this.tryChangeTab(index);
        if (destUrl) {
            this.incrementId();
            this.pushHistory(destUrl, 'switch');
        }
    }

    //
    // Stack
    // 

    navigate(path: string) {

        //
        // Ignore navigation if url is not changed
        // otherwise next.js won't push new page to history
        //
        if (NextRouter.asPath === path) {
            return;
        }

        this.incrementId();

        this.stacks[this.currentTab].push(path);

        this.pushHistory(path, 'push');
    }

    private onStackPopped(index: number) {
        if (this.isPopping) {
            return;
        }
        this.incrementId();
        let stack = this.stacks[index];
        let destUrl;
        if (stack.pages.length === 0) {
            destUrl = stack.rootPath;
        } else {
            destUrl = stack.pages[stack.pages.length - 1].path;
        }

        console.log('popped to ' + destUrl);

        this.pushHistory(destUrl, 'pop');
    }

    //
    // Lifecycle
    //

    private onMount = () => {
        let link = window.history.state.as;
        if (typeof link === 'string') {

            // Ignore root paths and switch if needed
            let parsed = parse(link);
            for (let i = 0; i < this.tabs.length; i++) {
                let tab = this.tabs[i];
                if (parsed.path && parsed.path!.toLowerCase() === tab.path.toLowerCase()) {
                    this.switchTab(i);
                    return;
                }
            }

            // Update stack to a current url
            // TODO: Do complete stack restoring
            this.stacks[this.currentTab].push(link);
        }
    }

    //
    // Implementation
    //

    private incrementId = () => {
        this.currentId = ++this.topId;
        sessionStorage.setItem('tab-router-' + this.id + '-top', this.topId + '');
    }

    private historyChanged = (src: any, index: number, tab: number, path: string) => {
        if (tab !== this.currentTab) {
            if (this.tryChangeTab(tab)) {
                if (this.onChangeListener) {
                    this.onChangeListener(this.currentTab);
                }
            }
        } else {
            if (this.currentId > index) {
                if (src['tab-router-action'] === 'pop') {
                    console.log('push: ' + path);
                    this.stacks[this.currentTab].push(path);
                } else if (src['tab-router-action'] === 'push') {
                    console.log('pop');
                    this.isPopping = true;
                    this.stacks[this.currentTab].pop();
                    this.isPopping = false;
                }
            } else {
                if (src['tab-router-action'] === 'pop') {
                    console.log('pop');
                    this.isPopping = true;
                    this.stacks[this.currentTab].pop();
                    this.isPopping = false;
                } else if (src['tab-router-action'] === 'push') {
                    console.log('push: ' + path);
                    this.stacks[this.currentTab].push(path);
                }
            }
        }

        if (this.currentId > index) {
            console.log('back navigation');
        } else if (this.currentId < index) {
            console.log('forward navigation');
        }
        this.currentId = index;
    }

    private tryChangeTab(index: number) {
        // Assert index
        if (index < 0 || index >= this.tabs.length) {
            console.warn('Invalid tab index: ' + index);
            return null;
        }

        // Ignore if tab is not changed
        if (this.currentTab === index) {
            return null;
        }

        // Find next url
        let destUrl;
        if (this.stacks[index].pages.length === 0) {
            destUrl = this.stacks[index].rootPath;
        } else {
            let destStack = this.stacks[index].pages;
            destUrl = destStack[destStack.length - 1].path;
        }

        // Debug log
        console.log('Switch from ' + this.currentTab + ' stack to ' + index + ' on url: ' + destUrl);

        // Switch tab
        this.currentTab = index;

        // Persist
        if (this.persistenceKey) {
            localStorage.setItem('tab-router-' + this.persistenceKey, index + '');
        }
        return destUrl;
    }

    private pushHistory = (path: string, action: string) => {
        console.log('push', {
            ['tab-router']: this.id,
            ['tab-router-current']: this.currentTab,
            ['tab-router-index']: this.currentId,
            ['tab-router-action']: action
        });
        Router.pushRoute(path, {
            shallow: true,
            ['tab-router']: this.id,
            ['tab-router-current']: this.currentTab,
            ['tab-router-index']: this.currentId,
            ['tab-router-action']: action
        });
    }
}