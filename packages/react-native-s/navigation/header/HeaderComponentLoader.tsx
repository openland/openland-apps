import * as React from 'react';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { HeaderComponentProps, HeaderComponent } from './HeaderComponent';
import { HeaderPage } from './HeaderPage';
import { NavigationPage } from '../NavigationPage';
import { HeaderConfig } from '../HeaderConfig';
import { SNavigationViewStyle } from '../../SNavigationView';
import { NavigationManager } from '../NavigationManager';

export interface HeaderComponentLoaderProps {
    style: SNavigationViewStyle;
    manager: NavigationManager;
    navigateTo?: string;
    navigateFrom?: string;
    current: string;
    pages: NavigationPage[];
}

export class HeaderComponentLoader extends React.PureComponent<HeaderComponentLoaderProps, { pages: HeaderPage[] }> {

    private subscriptions = new Map<string, WatchSubscription>();
    private lastConfigs = new Map<string, HeaderConfig>();

    constructor(props: HeaderComponentLoaderProps) {
        super(props);

        let n = this.normalizeRoutes(props);
        for (let l of n) {
            this.lastConfigs.set(l.page.key, l.config);
        }
        this.state = {
            pages: n
        };
    }

    componentWillMount() {
        this.watchRoutes(this.props.pages);
    }

    componentWillReceiveProps(nextProps: HeaderComponentLoaderProps) {
        let n = this.normalizeRoutes(nextProps);
        for (let l of n) {
            this.lastConfigs.set(l.page.key, l.config);
        }
        this.watchRoutes(nextProps.pages);
        this.setState({ pages: n });
    }

    componentWillUnmount() {
        // Do not remove references just in case if something went wrong after unmount
        for (let k of this.subscriptions.values()) {
            k();
        }
    }

    watchRoutes(routes: NavigationPage[]) {
        // Create new subscriptions
        for (let w of routes) {
            if (!this.subscriptions.has(w.key)) {
                let subs = w.config.watch((config: HeaderConfig) => {
                    if (config !== this.lastConfigs.get(w.key)) {
                        let n = this.normalizeRoutes(this.props);
                        for (let l of n) {
                            this.lastConfigs.set(l.page.key, l.config);
                        }
                        this.setState({ pages: n });
                    }
                });
                this.subscriptions.set(w.key, subs);
            }
        }
        // Prune old one
        for (let k of this.subscriptions.keys()) {
            if (!routes.find((v) => v.key === k)) {
                this.subscriptions.get(k)!!();
                this.subscriptions.delete(k);
            }
        }
    }

    normalizeRoutes(props: HeaderComponentLoaderProps) {
        return props.pages.map((v) => ({
            page: v,
            config: v.config.getState()!
        } as HeaderPage));
    }

    render() {
        let { pages, ...other } = this.props;
        return <HeaderComponent {...other} pages={this.state.pages} />;
    }
}