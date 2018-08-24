import * as React from 'react';
import { FastHistoryRecord, HistoryWatcher, FastHistory } from '../FastHistory';
import { ContainerProps } from './ContainerProps';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { View, Animated, Easing, Dimensions, Platform } from 'react-native';
import { FastRouterContext } from '../FastRouter';
import { FastHeader } from '../header/FastHeader';
import { FastHeaderConfig } from '../FastHeaderConfig';
import { FastHeaderContextDirect } from '../FastHeaderContextDirect';
import { FastHeaderGuard } from '../header/FastHeaderGuard';
import { DeviceConfig } from '../DeviceConfig';

class HistoryRecordHolder {
    readonly record: FastHistoryRecord;
    readonly progress: Animated.Value;
    readonly progressTranslate: Animated.AnimatedInterpolation;
    readonly underlayOpacity: Animated.AnimatedInterpolation;
    constructor(record: FastHistoryRecord, progress: Animated.Value) {
        this.record = record;
        this.progress = progress;
        let w = Dimensions.get('window').width;
        if (Platform.OS === 'ios') {
            this.progressTranslate = this.progress.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [w + 200, 0, -w * 0.3],
                extrapolate: 'clamp'
            });
        } else {
            this.progressTranslate = this.progress.interpolate({
                inputRange: [-1, 0],
                outputRange: [w + 200, 0],
                extrapolate: 'clamp'
            });
        }
        this.underlayOpacity = this.progress.interpolate({
            inputRange: [-1, 0],
            outputRange: [0, 0.2],
            extrapolate: 'clamp'
        });
    }
}

function prepareInitialRecords(routes: FastHistoryRecord[]): HistoryRecordHolder[] {
    return routes.map((v, i) => new HistoryRecordHolder(v, new Animated.Value(i === routes.length - 1 ? 0 : 1)));
}

function animate(value: Animated.Value, to: number) {
    if (Platform.OS === 'ios') {
        return Animated.spring(value, {
            toValue: to,
            stiffness: 1000,
            damping: 500,
            mass: 3,
            useNativeDriver: true,
            overshootClamping: true
        });
    }
    return Animated.timing(value, {
        toValue: to,
        duration: 260,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1.0)
    });
}

export class AndroidishContainer extends React.PureComponent<ContainerProps, { routes: HistoryRecordHolder[], mounted: string[], current: string }> implements HistoryWatcher {

    private subscription?: WatchSubscription;
    private routes: HistoryRecordHolder[];
    private mounted: string[];
    private removing: string[];
    private current: string;
    private initialRoutes: FastHistoryRecord[];

    constructor(props: ContainerProps) {
        super(props);

        let h = props.historyManager.getState().history;
        this.initialRoutes = h;
        this.routes = prepareInitialRecords(h);
        this.current = h[h.length - 1].key;
        this.mounted = [this.current];
        this.removing = [];
        this.state = { routes: this.routes, mounted: this.mounted, current: this.current };
    }
    componentWillMount() {
        this.subscription = this.props.historyManager.watch(this);
        let h = this.props.historyManager.getState().history;
        if (this.initialRoutes !== h) {
            this.routes = prepareInitialRecords(h);
            this.current = h[h.length - 1].key;
            this.mounted = [this.current];
            this.setState({ routes: this.routes, mounted: this.mounted, current: this.current });
        }
    }

    onPushed = (record: FastHistoryRecord, history: FastHistory) => {

        let underlay = history.history[history.history.length - 2].key;
        let underlayHolder = this.routes.find((v) => v.record.key === underlay)!!;
        let progress = new Animated.Value(-1);
        let newRecord = new HistoryRecordHolder(record, progress);

        // Start animation
        Animated.parallel([
            animate(underlayHolder.progress, 1),
            animate(progress, 0),
        ]).start(() => {
            // Unmount underlay when animation finished
            // Ignore if we are aborted transition
            if (this.removing.find((v) => v === record.key)) {
                return;
            }
            this.mounted = this.mounted.filter((v) => v !== underlay);
            this.setState({ mounted: this.mounted });
        });

        // Commit changes
        this.routes = [...this.routes, newRecord];
        this.mounted = [...this.mounted, newRecord.record.key];
        this.current = newRecord.record.key;
        this.setState({ mounted: this.mounted, routes: this.routes, current: this.current });
    }
    onPopped = (record: FastHistoryRecord, history: FastHistory) => {
        let holder = this.state.routes.find((v) => v.record.key === record.key);
        if (holder) {
            let alreadyRemoving = this.removing.find((v) => v === record.key);
            if (alreadyRemoving) {
                return;
            }
            let underlay = history.history[history.history.length - 1].key;
            let underlayHolder = this.routes.find((v) => v.record.key === underlay)!!;
            this.current = history.history[history.history.length - 1].key;
            this.removing = [...this.removing, holder.record.key];
            this.mounted = [...this.mounted, history.history[history.history.length - 1].key];
            this.setState({ mounted: this.mounted, current: this.current });

            Animated.parallel([
                animate(underlayHolder.progress, 0),
                animate(holder.progress, -1)
            ]).start(() => {
                this.removing = this.removing.filter((v) => v !== record.key);
                this.mounted = this.mounted.filter((v) => v !== record.key);
                this.routes = this.routes.filter((v) => v.record.key !== record.key);
                this.setState({ routes: this.routes, mounted: this.mounted });
            });
        }
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription();
            this.subscription = undefined;
        }
    }

    render() {
        console.log('container:render');
        return (
            <View width="100%" height="100%" flexDirection="column">
                <View width="100%" flexBasis={0} flexGrow={1} marginTop={DeviceConfig.navigationBarTransparent ? 0 : DeviceConfig.navigationBarHeight}>
                    {this.state.routes.map((v, i) => {
                        let Component = v.record.component;
                        return (
                            <>
                                <Animated.View
                                    key={v.record.key + '-shadow'}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        left: 0,
                                        opacity: i !== 0 && (!!this.state.mounted.find((m) => v.record.key === m)) ? v.underlayOpacity : 0,
                                        backgroundColor: '#000'
                                    }}
                                    flexDirection="column"
                                    alignItems="stretch"
                                    pointerEvents="none"
                                />
                                <Animated.View
                                    key={v.record.key + '-content'}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        left: 0,
                                        transform: [
                                            {
                                                translateX: v.progressTranslate
                                            }
                                        ]
                                    }}
                                    flexDirection="column"
                                    alignItems="stretch"
                                >
                                    <FastRouterContext.Provider value={v.record.router}>
                                        <View height="100%" opacity={!!this.state.mounted.find((m) => v.record.key === m) ? 1 : 0} flexDirection="row" alignItems="stretch">
                                            <View backgroundColor="#fff" flexGrow={1} flexBasis={0}>
                                                <FastHeaderContextDirect router={v.record.router}>
                                                    <Component />
                                                </FastHeaderContextDirect>
                                            </View>
                                        </View>
                                    </FastRouterContext.Provider>
                                </Animated.View>
                            </>
                        );
                    })}
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0
                    }}
                    pointerEvents="box-none"
                >
                    <FastHeaderGuard routes={this.state.routes} mounted={this.state.mounted} current={this.state.current} />
                </View>
            </View>
        );
    }
}