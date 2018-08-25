import * as React from 'react';
import { View, Animated, Easing, Dimensions, Platform, StyleSheet, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';
import { FastHistoryRecord, HistoryWatcher, FastHistory } from '../FastHistory';
import { ContainerProps } from './ContainerProps';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { FastHeaderGuard } from '../header/FastHeaderGuard';
import { DeviceConfig } from '../DeviceConfig';
import { PageContainer } from './PageContainer';

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        paddingTop: DeviceConfig.navigationBarTransparent ? 0 : DeviceConfig.navigationBarHeight
    } as ViewStyle,
    pages: {
        width: '100%',
        height: '100%',
    } as ViewStyle,
    page: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    } as ViewStyle,
    header: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    } as ViewStyle
});

class HistoryRecordHolder {
    readonly record: FastHistoryRecord;
    readonly progress: Animated.Value;
    constructor(record: FastHistoryRecord, progress: Animated.Value) {
        this.record = record;
        this.progress = progress;
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

interface ContainerState {
    routes: HistoryRecordHolder[];
    mounted: string[];
    current: string;
    transitioning: boolean;
    swiping: { enabled: boolean, current?: string, prev?: string };
}

export class Container extends React.PureComponent<ContainerProps, ContainerState> implements HistoryWatcher {

    private subscription?: WatchSubscription;
    private routes: HistoryRecordHolder[];
    private mounted: string[];
    private removing: string[];
    private current: string;
    private currentHistory: FastHistory;
    private panOffset = new Animated.Value(0);
    private panOffsetCurrent = this.panOffset.interpolate({
        inputRange: [0, Dimensions.get('window').width],
        outputRange: [0, -1],
        extrapolate: 'clamp'
    });
    private panOffsetPrev = this.panOffset.interpolate({
        inputRange: [0, Dimensions.get('window').width],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });
    private panEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: this.panOffset,
                },
            },
        ],
        { useNativeDriver: true }
    );
    private pendingSwipe = false;
    private pendingSwipeOffset: number = 0;
    private pendingSwipeSpeed: number = 0;

    constructor(props: ContainerProps) {
        super(props);

        this.currentHistory = props.historyManager.getState();
        let h = this.currentHistory.history;
        this.routes = prepareInitialRecords(h);
        this.current = h[h.length - 1].key;
        this.mounted = [this.current];
        this.removing = [];
        this.state = {
            routes: this.routes,
            mounted: this.mounted,
            current: this.current,
            transitioning: false,
            swiping: { enabled: false }
        };
    }
    componentWillMount() {
        this.subscription = this.props.historyManager.watch(this);
        if (this.currentHistory !== this.props.historyManager.getState()) {
            this.currentHistory = this.props.historyManager.getState();
            this.routes = prepareInitialRecords(this.currentHistory.history);
            this.current = this.currentHistory.history[this.currentHistory.history.length - 1].key;
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
            underlayHolder.progress.setValue(1);
            progress.setValue(0);
            this.mounted = this.mounted.filter((v) => v !== underlay);
            this.setState({ mounted: this.mounted, transitioning: false });
        });

        // Commit changes
        this.routes = [...this.routes, newRecord];
        this.mounted = [...this.mounted, newRecord.record.key];
        this.current = newRecord.record.key;
        this.currentHistory = history;
        this.setState({ mounted: this.mounted, routes: this.routes, current: this.current, transitioning: true });
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
            this.currentHistory = history;
            this.removing = [...this.removing, holder.record.key];
            this.mounted = [...this.mounted, history.history[history.history.length - 1].key];
            let animations = [
                animate(underlayHolder.progress, 0),
                animate(holder.progress, -1)
            ];
            if (this.pendingSwipe) {
                let progress = -this.pendingSwipeOffset / Dimensions.get('window').width;
                let velocity = -this.pendingSwipeSpeed / (Dimensions.get('window').width);
                console.log(progress);
                console.log(velocity);
                holder.progress.setValue(progress);
                underlayHolder.progress.setValue(1 + progress);
                animations = [
                    Animated.spring(underlayHolder.progress, {
                        toValue: 0,
                        stiffness: 1000,
                        damping: 500,
                        mass: 3,
                        useNativeDriver: true,
                        overshootClamping: true,
                        velocity: velocity
                    }),
                    Animated.spring(holder.progress, {
                        toValue: -1,
                        stiffness: 1000,
                        damping: 500,
                        mass: 3,
                        useNativeDriver: true,
                        overshootClamping: true,
                        velocity: velocity
                    })
                ];
            }

            Animated.parallel(animations).start(() => {
                underlayHolder.progress.setValue(0);
                holder!!.progress.setValue(-1);
                this.removing = this.removing.filter((v) => v !== record.key);
                this.mounted = this.mounted.filter((v) => v !== record.key);
                this.routes = this.routes.filter((v) => v.record.key !== record.key);
                this.setState({ routes: this.routes, mounted: this.mounted, transitioning: false });
            });

            this.setState({ mounted: this.mounted, current: this.current, transitioning: true, swiping: { enabled: false } });
        }
    }
    onGestureChanged = (event: PanGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if (this.currentHistory.history.length >= 2) {
                this.mounted = [...this.mounted, this.currentHistory.history[this.currentHistory.history.length - 2].key];
                this.setState({
                    swiping: {
                        enabled: true,
                        current: this.currentHistory.history[this.currentHistory.history.length - 1].key,
                        prev: this.currentHistory.history[this.currentHistory.history.length - 2].key,
                    },
                    mounted: this.mounted
                });
            }
        } else if (event.nativeEvent.oldState === State.ACTIVE) {
            if (event.nativeEvent.state === State.END) {
                // console.log(event.nativeEvent.velocityX);
                if (event.nativeEvent.translationX > 100) {
                    console.log(event.nativeEvent.translationX);
                    this.pendingSwipeOffset = event.nativeEvent.translationX;
                    this.pendingSwipeSpeed = event.nativeEvent.velocityX;
                    this.pendingSwipe = true;
                    this.props.historyManager.pop();
                    this.pendingSwipe = false;
                } else {
                    this.setState({ swiping: { enabled: false } });
                }
            } else {
                this.setState({ swiping: { enabled: false } });
                // console.log('abort');
                // TODO: Cancel
            }
        }
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription();
            this.subscription = undefined;
        }
    }

    render() {
        console.log('render');
        console.log(this.state.routes);
        return (
            <PanGestureHandler
                onGestureEvent={this.panEvent}
                onHandlerStateChange={this.onGestureChanged}
                // minOffsetX={30}
                // maxDeltaY={20}
                // maxPointers={2}
                // avgTouches={true}
                enabled={!this.state.transitioning}
            >
                <Animated.View style={styles.root}>
                    <View style={styles.pages}>
                        {this.state.routes.map((v, i) => {
                            return (
                                <View key={v.record.key} style={styles.page} pointerEvents="box-none">
                                    <PageContainer
                                        component={v.record.component}
                                        router={v.record.router}
                                        progress={this.state.swiping.enabled ? (
                                            this.state.swiping.current === v.record.key
                                                ? this.panOffsetCurrent
                                                : this.state.swiping.prev === v.record.key ? this.panOffsetPrev : v.progress
                                        ) : v.progress}
                                        mounted={!!this.state.mounted.find((m) => v.record.key === m)}
                                    />
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.header} pointerEvents="box-none">
                        <FastHeaderGuard
                            routes={this.state.routes}
                            mounted={this.state.mounted}
                            current={this.state.current}
                            swiping={this.state.swiping}
                            swipeProgress={this.panOffsetCurrent}
                            swipeProgressPrev={this.panOffsetPrev}
                        />
                    </View>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}