import { URouting } from 'openland-unicorn/URouting';
import { StackRouter } from './StackRouter';
import { randomKey } from './utils/randomKey';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { Router } from 'openland-web/routes';
import NextRouter from 'next/router';
import { isTabHistory, TabHistoryRecord } from './history';

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
    private id: string = randomKey();
    currentTab: number;

    onChangeListener?: (index: number) => void;

    constructor(tabs: TabDefinition[], defaultTab: number, routing: URouting) {
        if (defaultTab < 0 || defaultTab >= tabs.length) {
            throw Error('Invalid tab index: ' + defaultTab);
        }

        this.tabs = tabs;
        this.stacks = this.tabs.map((v, i) => {
            let r = new StackRouter(v.path, routing);
            r.addListener((action) => {
                if (action.type === 'pop') {
                    this.onBackPressed(i);
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
                    let state = src.options['tab-routing'];
                    if (!isTabHistory(state)) {
                        return false;
                    }
                    this.id = state.id;
                    this.currentTab = state.tab;
                    if (state.stacks) {
                        if (this.stacks.length === state.stacks.length) {
                            for (let i = 0; i < this.stacks.length; i++) {
                                this.stacks[i].restore(state.stacks[i].pages);
                            }
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
            if (!wasRestored) {
                let foundTab = false;
                for (let i = 0; i < this.tabs.length; i++) {
                    let t = this.tabs[i];
                    if (t.path.toLowerCase() === window.location.pathname.toLowerCase()) {
                        this.currentTab = i;
                        foundTab = true;
                        break;
                    }
                }
                if (!foundTab) {
                    this.stacks[this.currentTab].restore([window.location.pathname]);
                }
            }
            let stacks = this.stacks.map((s) => s.pages.map((v) => v.path));
            let state: TabHistoryRecord = {
                id: this.id,
                tab: this.currentTab,
                stacks: stacks.map((v) => ({ pages: v }))
            };
            window.history.replaceState({
                ...window.history.state,
                options: {
                    ...window.history.state.options,
                    ['tab-routing']: state
                }
            }, '');
        }

        if (canUseDOM) {
            NextRouter.events.on('routeChangeComplete', () => {
                if (window.history.state && window.history.state.options) {
                    let state = window.history.state.options['tab-routing'];
                    if (!isTabHistory(state)) {
                        return;
                    }
                    if (state.id !== this.id) {
                        return;
                    }
                    this.historyChanged(state);
                }
            });
        }
    }

    switchTab(index: number) {
        let destUrl = this.tryChangeTab(index);
        if (destUrl) {
            this.pushHistory(destUrl);
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
        if (NextRouter.asPath !== path) {
            this.stacks[this.currentTab].push(path);
            this.pushHistory(path);
            return;
        }
    }

    private onBackPressed(index: number) {
        let stack = this.stacks[index];
        let destUrl;
        if (stack.pages.length === 0) {
            destUrl = stack.rootPath;
        } else {
            destUrl = stack.pages[stack.pages.length - 1].path;
        }
        this.pushHistory(destUrl);
    }

    //
    // Implementation
    //

    private historyChanged = (state: TabHistoryRecord) => {

        // Update current tab
        if (state.tab !== this.currentTab) {
            if (this.tryChangeTab(state.tab)) {
                if (this.onChangeListener) {
                    this.onChangeListener(this.currentTab);
                }
            }
        }

        // Update stacks
        if (state.stacks.length !== this.stacks.length) {
            return;
        }
        for (let i = 0; i < this.stacks.length; i++) {
            this.stacks[i].historyChanged(state.stacks[i].pages);
        }
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

        return destUrl;
    }

    private pushHistory = (path: string) => {
        let stacks = this.stacks.map((s) => s.pages.map((v) => v.path));
        let state: TabHistoryRecord = {
            id: this.id,
            tab: this.currentTab,
            stacks: stacks.map((v) => ({ pages: v }))
        };
        console.log('push', {
            ['tab-routing']: state,
        });
        Router.pushRoute(path, {
            shallow: true,
            ['tab-routing']: state
        });
    }
}