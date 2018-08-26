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
    readonly progressValue: Animated.Value;
    readonly progress: Animated.AnimatedInterpolation;
    private readonly useProgress: Animated.Value = new Animated.Value(1);
    private readonly useSwipe: Animated.Value = new Animated.Value(0);
    private readonly useSwipePrev: Animated.Value = new Animated.Value(0);

    constructor(record: FastHistoryRecord, progress: Animated.Value, swipe: Animated.AnimatedInterpolation, swipePrev: Animated.AnimatedInterpolation) {
        this.record = record;
        this.progressValue = progress;
        this.progress = Animated.add(
            Animated.add(
                Animated.multiply(this.useProgress, progress),
                Animated.multiply(this.useSwipe, swipe)
            ),
            Animated.multiply(this.useSwipePrev, swipePrev)
        );
    }

    startSwipe() {
        this.useProgress.setValue(0);
        this.useSwipe.setValue(1);
        this.useSwipePrev.setValue(0);
    }

    startSwipePRev() {
        this.useProgress.setValue(0);
        this.useSwipe.setValue(0);
        this.useSwipePrev.setValue(1);
    }

    stopSwipe() {
        this.useProgress.setValue(1);
        this.useSwipe.setValue(0);
        this.useSwipePrev.setValue(0);
    }
}

function prepareInitialRecords(routes: FastHistoryRecord[], swipe: Animated.AnimatedInterpolation, swipePrev: Animated.AnimatedInterpolation): HistoryRecordHolder[] {
    return routes.map((v, i) => new HistoryRecordHolder(v, new Animated.Value(i === routes.length - 1 ? 0 : 1), swipe, swipePrev));
}

function animate(value: Animated.Value, to: number) {
    if (Platform.OS === 'ios') {
        return Animated.spring(value, {
            toValue: to,
            stiffness: 1000,
            damping: 500,
            mass: 3,
            useNativeDriver: true,
            overshootClamping: true,
            restDisplacementThreshold: 0.5
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
    private swipeCurrent?: HistoryRecordHolder;
    private swipePrev?: HistoryRecordHolder;

    constructor(props: ContainerProps) {
        super(props);

        this.currentHistory = props.historyManager.getState();
        let h = this.currentHistory.history;
        this.routes = prepareInitialRecords(h, this.panOffsetCurrent, this.panOffsetPrev);
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
            this.routes = prepareInitialRecords(this.currentHistory.history, this.panOffsetCurrent, this.panOffsetPrev);
            this.current = this.currentHistory.history[this.currentHistory.history.length - 1].key;
            this.mounted = [this.current];
            this.setState({ routes: this.routes, mounted: this.mounted, current: this.current });
        }
    }

    onPushed = (record: FastHistoryRecord, history: FastHistory) => {
        let underlay = history.history[history.history.length - 2].key;
        let underlayHolder = this.routes.find((v) => v.record.key === underlay)!!;
        let progress = new Animated.Value(-1);
        let newRecord = new HistoryRecordHolder(record, progress, this.panOffsetCurrent, this.panOffsetPrev);

        // Start animation
        // underlayHolder.progress.setValue(0);
        underlayHolder.progressValue.stopAnimation(() => {
            Animated.parallel([
                animate(underlayHolder.progressValue, 1),
                animate(progress, 0),
            ]).start(() => {
                // Unmount underlay when animation finished
                // Ignore if we are aborted transition
                if (this.removing.find((v) => v === record.key)) {
                    return;
                }
                // underlayHolder.progressValue.setValue(1);
                // progress.setValue(0);
                this.mounted = this.mounted.filter((v) => v !== underlay);
                this.setState({ mounted: this.mounted, transitioning: false });
            });
        });

        // Commit changes
        this.routes = [...this.routes, newRecord];
        this.mounted = [...this.mounted, newRecord.record.key];
        this.current = newRecord.record.key;
        this.currentHistory = history;
        this.setState({ mounted: this.mounted, routes: this.routes, current: this.current, transitioning: true });
    }
    onPopped = (record: FastHistoryRecord, history: FastHistory, args?: { immediate?: boolean }) => {
        let holder = this.routes.find((v) => v.record.key === record.key)!!;
        let underlay = history.history[history.history.length - 1].key;
        let underlayHolder = this.routes.find((v) => v.record.key === underlay)!!;
        this.current = history.history[history.history.length - 1].key;
        this.currentHistory = history;

        let alreadyRemoving = this.removing.find((v) => v === record.key);
        if (!alreadyRemoving) {
            this.removing = [...this.removing, holder.record.key];
            this.mounted = [...this.mounted, history.history[history.history.length - 1].key];
            Animated.parallel([
                animate(underlayHolder.progressValue, 0),
                animate(holder.progressValue, -1)
            ]).start(() => {
                // underlayHolder.progress.setValue(0);
                // holder!!.progress.setValue(-1);
                this.removing = this.removing.filter((v) => v !== record.key);
                this.mounted = this.mounted.filter((v) => v !== record.key);
                this.routes = this.routes.filter((v) => v.record.key !== record.key);
                this.setState({ routes: this.routes, mounted: this.mounted, transitioning: false });
            });
            this.setState({ mounted: this.mounted, current: this.current, transitioning: true });
        }
    }
    onGestureChanged = (event: PanGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if (this.currentHistory.history.length >= 2) {

                let current = this.currentHistory.history[this.currentHistory.history.length - 1].key;
                let prev = this.currentHistory.history[this.currentHistory.history.length - 2].key;
                this.swipeCurrent = this.routes.find((v) => v.record.key === current)!!;
                this.swipePrev = this.routes.find((v) => v.record.key === prev)!!;
                this.swipeCurrent.startSwipe();
                this.swipePrev.startSwipePRev();

                this.mounted = [...this.mounted, this.currentHistory.history[this.currentHistory.history.length - 2].key];
                this.setState({ mounted: this.mounted });
            }
        } else if (event.nativeEvent.oldState === State.ACTIVE) {
            let currentHolder = this.swipeCurrent!!;
            let prevHolder = this.swipePrev!!;

            let progress = Math.min(-event.nativeEvent.translationX / Dimensions.get('window').width, 0);
            let velocity = Math.min(-event.nativeEvent.velocityX / Dimensions.get('window').width);
            currentHolder.progressValue.setValue(progress);
            prevHolder.progressValue.setValue(1 + progress);

            var handled = false;
            if (event.nativeEvent.state === State.END) {
                let shouldMoveBack = false;
                if (event.nativeEvent.translationX > Dimensions.get('window').width / 2) {
                    shouldMoveBack = true;
                } else if (velocity < -0.5) {
                    shouldMoveBack = true;
                }
                if (shouldMoveBack) {
                    handled = true;
                    this.removing = [...this.removing, currentHolder.record.key];
                    this.props.historyManager.pop();
                    Animated.parallel([
                        Animated.spring(currentHolder.progressValue, {
                            toValue: -1,
                            stiffness: 5000,
                            damping: 600,
                            mass: 3,
                            useNativeDriver: true,
                            overshootClamping: true,
                            velocity: velocity
                        }),
                        Animated.spring(prevHolder.progressValue, {
                            toValue: 0,
                            stiffness: 5000,
                            damping: 600,
                            mass: 3,
                            useNativeDriver: true,
                            overshootClamping: true,
                            velocity: velocity
                        })
                    ]).start(() => {
                        this.removing = this.removing.filter((v) => v !== currentHolder.record.key);
                        this.mounted = this.mounted.filter((v) => v !== currentHolder.record.key);
                        this.routes = this.routes.filter((v) => v.record.key !== currentHolder.record.key);
                        this.setState({ routes: this.routes, mounted: this.mounted, transitioning: false });
                    });
                }
            }

            if (!handled) {
                Animated.parallel([
                    Animated.spring(currentHolder.progressValue, {
                        toValue: 0,
                        stiffness: 5000,
                        damping: 600,
                        mass: 3,
                        useNativeDriver: true,
                        overshootClamping: true,
                        velocity: velocity
                    }),
                    Animated.spring(prevHolder.progressValue, {
                        toValue: 1,
                        stiffness: 5000,
                        damping: 600,
                        mass: 3,
                        useNativeDriver: true,
                        overshootClamping: true,
                        velocity: velocity
                    })
                ]).start();
            }

            currentHolder.stopSwipe();
            prevHolder.stopSwipe();
        }
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription();
            this.subscription = undefined;
        }
    }

    render() {
        return (
            <PanGestureHandler
                onGestureEvent={this.panEvent}
                onHandlerStateChange={this.onGestureChanged}
                minOffsetX={30}
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
                                                : this.state.swiping.prev === v.record.key ? this.panOffsetPrev : v.progress.interpolate({
                                                    inputRange: [-1, 0, 1],
                                                    outputRange: [-1, 0, 1]
                                                })
                                        ) : v.progress.interpolate({
                                            inputRange: [-1, 0, 1],
                                            outputRange: [-1, 0, 1]
                                        })}
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