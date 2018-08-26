import * as React from 'react';
import { FastHistoryRecord } from '../FastHistory';
import { Animated } from 'react-native';
import { FastHeaderConfig } from '../FastHeaderConfig';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { FastHeader } from './FastHeader';

interface Route {
    record: FastHistoryRecord;
    progress: Animated.AnimatedInterpolation;
}

export interface FastHeaderContainerProps {
    routes: Route[];
    mounted: string[];
    current: string;
}

interface NormalizedRoute {
    current: boolean;
    mounted: boolean;
    record: FastHistoryRecord;
    config: FastHeaderConfig;
    progress: Animated.AnimatedInterpolation;
}

export class FastHeaderGuard extends React.PureComponent<FastHeaderContainerProps, { routes: NormalizedRoute[] }> {

    private subscriptions = new Map<string, WatchSubscription>();
    private lastConfigs = new Map<string, FastHeaderConfig>();

    constructor(props: FastHeaderContainerProps) {
        super(props);

        let n = this.normalizeRoutes(props);
        for (let l of n) {
            this.lastConfigs.set(l.record.key, l.config);
        }
        this.state = {
            routes: n
        };
    }

    componentWillMount() {
        this.watchRoutes(this.props.routes);
    }

    componentWillReceiveProps(nextProps: FastHeaderContainerProps) {
        let n = this.normalizeRoutes(nextProps);
        for (let l of n) {
            this.lastConfigs.set(l.record.key, l.config);
        }
        this.watchRoutes(nextProps.routes);
        this.setState({ routes: n });
    }

    componentWillUnmount() {
        // Do not remove references just in case if something went wrong after unmount
        for (let k of this.subscriptions.values()) {
            k();
        }
    }

    watchRoutes(routes: Route[]) {
        // Create new subscriptions
        for (let w of routes) {
            if (!this.subscriptions.has(w.record.key)) {
                let subs = w.record.config.watch((config: FastHeaderConfig) => {
                    if (config !== this.lastConfigs.get(w.record.key)) {
                        let n = this.normalizeRoutes(this.props);
                        for (let l of n) {
                            this.lastConfigs.set(l.record.key, l.config);
                        }
                        this.setState({ routes: n });
                    }
                });
                this.subscriptions.set(w.record.key, subs);
            }
        }
        // Prune old one
        for (let k of this.subscriptions.keys()) {
            if (!routes.find((v) => v.record.key === k)) {
                this.subscriptions.get(k)!!();
                this.subscriptions.delete(k);
            }
        }
    }

    normalizeRoutes(props: FastHeaderContainerProps) {
        return props.routes.map((v) => ({
            current: props.current === v.record.key,
            mounted: !!props.mounted.find((m) => m === v.record.key),
            record: v.record,
            config: v.record.config.getState()!!,
            progress: v.progress
        }));
    }

    render() {
        return <FastHeader routes={this.state.routes} />;
    }
}