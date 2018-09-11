import * as React from 'react';
import { View, Animated, Easing, Platform, StyleSheet, ViewStyle, Keyboard, Dimensions } from 'react-native';
import { HistoryWatcher, FastHistoryManager } from '../FastHistory';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { FastHeaderGuard } from './header/FastHeaderGuard';
import { DeviceConfig } from '../DeviceConfig';
import { PageContainer } from './page/PageContainer';
import { FastHistoryRecord } from '../FastHistoryRecord';
import { FastHistoryState } from '../FastHistoryState';
import { RouteViewState } from './RouteViewState';
import { ASAnimatedView, animateTranslateX, animateOpacity, beginAnimationTransaction, commitAnimationTransaction } from 'react-native-async-view/ASAnimatedView';
import { AnimatedViewKeys } from './AnimatedViewKeys';
import { FastHeaderCoordinator } from './header/FastHeaderCoordinator';

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
    pageShadow: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#000',
        opacity: 0
    } as ViewStyle,
    header: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    } as ViewStyle
});

function prepareInitialRecords(routes: FastHistoryRecord[]): RouteViewState[] {
    return routes.map((v, i) => new RouteViewState(v, new Animated.Value(i === routes.length - 1 ? 0 : 1)));
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
    routes: RouteViewState[];
    mounted: string[];
    transitioning: boolean;
}

export interface ContainerProps {
    historyManager: FastHistoryManager;
}

const FULL_TRASITION_DELAY = 250;
const SCREEN_WIDTH = Dimensions.get('window').width;

export class Container extends React.PureComponent<ContainerProps, ContainerState> implements HistoryWatcher {

    private subscription?: WatchSubscription;
    private routes: RouteViewState[];
    private mounted: string[];
    private removing: string[];
    private current: string;
    private currentHistory: FastHistoryState;
    // private panOffset = new Animated.Value(0);
    // private panOffsetCurrent = this.panOffset.interpolate({
    //     inputRange: [0, Dimensions.get('window').width],
    //     outputRange: [0, -1],
    //     extrapolate: 'clamp'
    // });
    // private panOffsetPrev = this.panOffset.interpolate({
    //     inputRange: [0, Dimensions.get('window').width],
    //     outputRange: [1, 0],
    //     extrapolate: 'clamp'
    // });

    // private panEvent = Animated.event([{ nativeEvent: { translationX: this.panOffset } }], { useNativeDriver: true });
    // private swipeCurrent?: RouteViewState;
    // private swipePrev?: RouteViewState;
    // private swipeHistoryLock?: () => void;

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
            transitioning: false
        };
    }
    componentWillMount() {
        this.subscription = this.props.historyManager.watch(this);
        if (this.currentHistory !== this.props.historyManager.getState()) {
            this.currentHistory = this.props.historyManager.getState();
            this.routes = prepareInitialRecords(this.currentHistory.history);
            this.current = this.currentHistory.history[this.currentHistory.history.length - 1].key;
            this.mounted = [this.current];
            this.setState({ routes: this.routes, mounted: this.mounted });
        }
    }

    onPushed = (record: FastHistoryRecord, state: FastHistoryState) => {
        Keyboard.dismiss();

        let underlay = state.history[state.history.length - 2].key;
        let underlayHolder = this.routes.find((v) => v.record.key === underlay)!!;
        let progress = new Animated.Value(-1);
        let newRecord = new RouteViewState(record, progress);

        // Start animation
        let unlock = this.props.historyManager.beginLock();
        setTimeout(unlock, FULL_TRASITION_DELAY);

        // Commit changes
        this.routes = [...this.routes, newRecord];
        this.mounted = [...this.mounted, newRecord.record.key];
        this.current = newRecord.record.key;
        this.currentHistory = state;
        this.setState({ mounted: this.mounted, routes: this.routes, transitioning: true });

        underlayHolder.progressValue.stopAnimation((v2: number) => {
            Animated.parallel([
                animate(underlayHolder.progressValue, 1),
                animate(progress, 0),
            ]).start(() => {
                unlock();
                // Unmount underlay when animation finished
                // Ignore if we are aborted transition
                if (this.removing.find((v) => v === record.key)) {
                    return;
                }
                underlayHolder.progressValue.setValue(1);
                progress.setValue(0);
                this.mounted = this.mounted.filter((v) => v !== underlay);
                this.setState({ mounted: this.mounted, transitioning: false });
            });
        });

        beginAnimationTransaction();
        animateTranslateX(SCREEN_WIDTH, 0, AnimatedViewKeys.page(record.key));
        animateTranslateX(0, -SCREEN_WIDTH * 0.3, AnimatedViewKeys.page(underlayHolder.record.key));
        animateOpacity(0, 0.3, AnimatedViewKeys.pageShadow(underlayHolder.record.key));
        FastHeaderCoordinator.moveForward(underlayHolder.record.key, record.key);
        commitAnimationTransaction();
    }

    onPopped = (record: FastHistoryRecord, state: FastHistoryState, args?: { immediate?: boolean }) => {
        Keyboard.dismiss();

        let holder = this.routes.find((v) => v.record.key === record.key)!!;
        let underlay = state.history[state.history.length - 1].key;
        let underlayHolder = this.routes.find((v) => v.record.key === underlay)!!;
        this.current = state.history[state.history.length - 1].key;
        this.currentHistory = state;

        // let alreadyRemoving = this.removing.find((v) => v === record.key);
        // if (!alreadyRemoving) {
        let unlock = this.props.historyManager.beginLock();
        setTimeout(unlock, FULL_TRASITION_DELAY);
        this.removing = [...this.removing, holder.record.key];
        this.mounted = [...this.mounted, state.history[state.history.length - 1].key];

        Animated.parallel([
            animate(underlayHolder.progressValue, 0),
            animate(holder.progressValue, -1)
        ]).start(() => {
            underlayHolder.progressValue.setValue(0);
            holder.progressValue.setValue(-1);
            this.removing = this.removing.filter((v) => v !== record.key);
            this.mounted = this.mounted.filter((v) => v !== record.key);
            this.routes = this.routes.filter((v) => v.record.key !== record.key);
            this.setState({ routes: this.routes, mounted: this.mounted, transitioning: false });
            unlock();
        });

        this.setState({ mounted: this.mounted, transitioning: true });

        beginAnimationTransaction();
        animateTranslateX(0, SCREEN_WIDTH, AnimatedViewKeys.page(record.key));
        animateTranslateX(-SCREEN_WIDTH * 0.3, 0, AnimatedViewKeys.page(underlayHolder.record.key));
        animateOpacity(0.3, 0, AnimatedViewKeys.pageShadow(underlayHolder.record.key));
        FastHeaderCoordinator.moveBackward(record.key, underlayHolder.record.key);
        commitAnimationTransaction();
    }
    // onGestureChanged = (event: PanGestureHandlerStateChangeEvent) => {
    //     if (this.currentHistory.history.length < 2) {
    //         return;
    //     }
    //     if (event.nativeEvent.state === State.ACTIVE) {
    //         Keyboard.dismiss();
    //         this.swipeHistoryLock = this.props.historyManager.beginLock();
    //         let current = this.currentHistory.history[this.currentHistory.history.length - 1].key;
    //         let prev = this.currentHistory.history[this.currentHistory.history.length - 2].key;
    //         this.swipeCurrent = this.routes.find((v) => v.record.key === current)!!;
    //         this.swipePrev = this.routes.find((v) => v.record.key === prev)!!;
    //         this.swipeCurrent.startSwipe();
    //         this.swipePrev.startSwipePrev();

    //         this.mounted = [...this.mounted, this.currentHistory.history[this.currentHistory.history.length - 2].key];
    //         this.setState({ mounted: this.mounted });
    //     } else if (event.nativeEvent.oldState === State.ACTIVE) {
    //         let currentHolder = this.swipeCurrent!!;
    //         let prevHolder = this.swipePrev!!;

    //         let progress = Math.min(-event.nativeEvent.translationX / Dimensions.get('window').width, 0);
    //         let velocity = Math.min(-event.nativeEvent.velocityX / Dimensions.get('window').width);
    //         currentHolder.progressValue.setValue(progress);
    //         prevHolder.progressValue.setValue(1 + progress);

    //         var handled = false;
    //         if (event.nativeEvent.state === State.END) {
    //             let shouldMoveBack = false;
    //             if (event.nativeEvent.translationX > Dimensions.get('window').width / 2) {
    //                 shouldMoveBack = true;
    //             } else if (velocity < -0.5) {
    //                 shouldMoveBack = true;
    //             }
    //             if (shouldMoveBack) {
    //                 if (this.swipeHistoryLock) {
    //                     this.swipeHistoryLock();
    //                     this.swipeHistoryLock = undefined;
    //                 }
    //                 handled = true;
    //                 this.removing = [...this.removing, currentHolder.record.key];
    //                 this.props.historyManager.pop();
    //                 let unlock = this.props.historyManager.beginLock();
    //                 setTimeout(unlock, 150);
    //                 Animated.parallel([
    //                     Animated.spring(currentHolder.progressValue, {
    //                         toValue: -1,
    //                         stiffness: 5000,
    //                         damping: 600,
    //                         mass: 3,
    //                         useNativeDriver: true,
    //                         overshootClamping: true,
    //                         velocity: velocity
    //                     }),
    //                     Animated.spring(prevHolder.progressValue, {
    //                         toValue: 0,
    //                         stiffness: 5000,
    //                         damping: 600,
    //                         mass: 3,
    //                         useNativeDriver: true,
    //                         overshootClamping: true,
    //                         velocity: velocity
    //                     })
    //                 ]).start(() => {
    //                     unlock();
    //                     this.removing = this.removing.filter((v) => v !== currentHolder.record.key);
    //                     this.mounted = this.mounted.filter((v) => v !== currentHolder.record.key);
    //                     this.routes = this.routes.filter((v) => v.record.key !== currentHolder.record.key);
    //                     this.setState({ routes: this.routes, mounted: this.mounted, transitioning: false });
    //                 });
    //             }
    //         }

    //         if (!handled) {
    //             let unlock = this.swipeHistoryLock;
    //             this.swipeHistoryLock = undefined;
    //             if (unlock) {
    //                 setTimeout(unlock, FULL_TRASITION_DELAY);
    //             }
    //             Animated.parallel([
    //                 Animated.spring(currentHolder.progressValue, {
    //                     toValue: 0,
    //                     stiffness: 5000,
    //                     damping: 600,
    //                     mass: 3,
    //                     useNativeDriver: true,
    //                     overshootClamping: true,
    //                     velocity: velocity
    //                 }),
    //                 Animated.spring(prevHolder.progressValue, {
    //                     toValue: 1,
    //                     stiffness: 5000,
    //                     damping: 600,
    //                     mass: 3,
    //                     useNativeDriver: true,
    //                     overshootClamping: true,
    //                     velocity: velocity
    //                 })
    //             ]).start(() => {
    //                 if (unlock) {
    //                     unlock();
    //                 }
    //             });
    //         }

    //         currentHolder.stopSwipe();
    //         prevHolder.stopSwipe();
    //     }
    // }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription();
            this.subscription = undefined;
        }
    }

    render() {
        let pages = (
            <View style={styles.pages}>
                {this.state.routes.map((v) => {
                    return (
                        <ASAnimatedView name={AnimatedViewKeys.page(v.record.key)} key={'page-' + v.record.key} style={styles.page} pointerEvents="box-none">
                            <PageContainer
                                component={v.record.component}
                                router={v.record.router}
                                mounted={!!this.state.mounted.find((m) => v.record.key === m)}
                            />
                            <ASAnimatedView
                                name={AnimatedViewKeys.pageShadow(v.record.key)}
                                key={'shadow-' + v.record.key}
                                style={styles.pageShadow}
                                pointerEvents="none"
                            />
                        </ASAnimatedView>
                    );
                })}
            </View>
        );

        let header = (
            <View style={styles.header} pointerEvents="box-none">
                <FastHeaderGuard
                    routes={this.state.routes}
                    mounted={this.state.mounted}
                    history={this.props.historyManager}
                />
            </View>
        );

        // if (Platform.OS === 'ios') {
        //     pages = (
        //         <PanGestureHandler
        //             onGestureEvent={this.panEvent}
        //             onHandlerStateChange={this.onGestureChanged}
        //             minOffsetX={10}
        //             // maxDeltaY={20}
        //             // maxPointers={2}
        //             // avgTouches={true}
        //             enabled={!this.state.transitioning}
        //         >
        //             {pages}
        //         </PanGestureHandler>
        //     );
        // }

        return (
            <View style={styles.root}>
                {pages}
                {header}
            </View>
        );
    }
}