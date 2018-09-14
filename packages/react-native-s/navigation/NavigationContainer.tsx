import * as React from 'react';
import { View, Platform, StyleSheet, ViewStyle, Keyboard, Dimensions } from 'react-native';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { AnimatedViewKeys } from './AnimatedViewKeys';
import { SAnimated } from 'react-native-s/SAnimated';
import { DeviceConfig } from './DeviceConfig';
import { NavigationPage } from './NavigationPage';
import { NavigationState } from './NavigationState';
import { NavigationManagerListener, NavigationManager } from './NavigationManager';
import { PageContainer } from './containers/PageContainer';
import { SNavigationViewStyle } from '../SNavigationView';
import { SDevice } from '../SDevice';
import { HeaderComponent } from './header/HeaderComponent';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';

const styles = StyleSheet.create({
    fill: {
        width: '100%',
        height: '100%',
    } as ViewStyle,
    absoluteFill: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    } as ViewStyle,
    shadow: {
        backgroundColor: '#000',
        opacity: 0
    } as ViewStyle,
});

interface NavigationContainerState {
    routes: NavigationPage[];
    mounted: string[];
}

export interface NavigationContainerProps {
    manager: NavigationManager;
    style: SNavigationViewStyle;
}

const FULL_TRASITION_DELAY = 250;
const SCREEN_WIDTH = Dimensions.get('window').width;

export class NavigationContainer extends React.PureComponent<NavigationContainerProps, NavigationContainerState> implements NavigationManagerListener {

    private subscription?: WatchSubscription;
    private routes: NavigationPage[];
    private mounted: string[];
    private removing: string[];
    private currentHistory: NavigationState;
    private pendingAction?: () => void;

    constructor(props: NavigationContainerProps) {
        super(props);

        this.currentHistory = props.manager.getState();
        let h = this.currentHistory.history;
        this.routes = h;
        this.mounted = [h[h.length - 1].key];
        this.removing = [];
        this.state = {
            routes: this.routes,
            mounted: this.mounted
        };
    }

    componentWillMount() {
        this.subscription = this.props.manager.watch(this);
        if (this.currentHistory !== this.props.manager.getState()) {
            this.currentHistory = this.props.manager.getState();
            this.routes = this.currentHistory.history;
            this.mounted = [this.currentHistory.history[this.currentHistory.history.length - 1].key];
            this.setState({ routes: this.routes, mounted: this.mounted });
        }
    }

    onPushed = (record: NavigationPage, state: NavigationState) => {

        // Dismiss keyboard on navigation
        Keyboard.dismiss();

        // Resolve current page
        let underlay = state.history[state.history.length - 2].key;
        let underlayHolder = this.routes.find((v) => v.key === underlay)!!;

        // Lock navigation
        let unlock = this.props.manager.beginLock();

        // Commit changes
        this.routes = [...this.routes, record];
        this.mounted = [...this.mounted, record.key];
        this.currentHistory = state;
        this.setState(
            { mounted: this.mounted, routes: this.routes },
            () => {

                //
                // Start unlock timer
                // TODO: use transaction callback inst3ead
                //
                setTimeout(unlock, FULL_TRASITION_DELAY);
                setTimeout(
                    () => {
                        unlock();
                        // Unmount underlay when animation finished
                        // Ignore if we are aborted transition
                        if (this.removing.find((v) => v === record.key)) {
                            return;
                        }
                        this.mounted = this.mounted.filter((v) => v !== underlay);
                        this.setState({ mounted: this.mounted });
                    },
                    1000);

                //
                // Run Animations
                //
                SAnimated.beginTransaction();
                if (Platform.OS === 'ios') {
                    SAnimated.spring(AnimatedViewKeys.page(record.key), {
                        property: 'translateX',
                        from: SCREEN_WIDTH,
                        to: 0
                    });
                    SAnimated.spring(AnimatedViewKeys.page(underlayHolder.key), {
                        property: 'translateX',
                        from: 0,
                        to: -SCREEN_WIDTH
                    });
                } else {
                    SAnimated.timing(AnimatedViewKeys.page(record.key), {
                        property: 'translateX',
                        from: SCREEN_WIDTH,
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                }
                SAnimated.timing(AnimatedViewKeys.pageShadow(underlayHolder.key), {
                    property: 'opacity',
                    from: 0,
                    to: 0.3
                });
                // FastHeaderCoordinator.moveForward(underlayHolder.record.key, record.key);
                SAnimated.commitTransaction();
            }
        );
    }

    onPopped = (page: NavigationPage, state: NavigationState) => {

        // Dismiss keyboard on navigation
        Keyboard.dismiss();

        // Update internal state
        let underlayKey = state.history[state.history.length - 1].key;
        let underlayHolder = this.routes.find((v) => v.key === underlayKey)!!;
        this.currentHistory = state;

        //
        // Lock navigation
        // TODO: Better handling
        //
        let unlock = this.props.manager.beginLock();

        //
        // Mount next page and commit changes
        //
        this.mounted = [...this.mounted, state.history[state.history.length - 1].key];
        this.setState(
            { mounted: this.mounted },
            () => {

                // Unlock touch events
                setTimeout(unlock, FULL_TRASITION_DELAY);

                //
                // Remove popped on completion
                // TODO: use transaction callback instead
                //
                setTimeout(
                    () => {
                        unlock();
                        this.removing = this.removing.filter((v) => v !== page.key);
                        this.mounted = this.mounted.filter((v) => v !== page.key);
                        this.routes = this.routes.filter((v) => v.key !== page.key);
                        this.setState({ routes: this.routes, mounted: this.mounted });
                    },
                    1000);

                //
                // Run Animations
                //
                SAnimated.beginTransaction();
                if (Platform.OS === 'ios') {
                    SAnimated.spring(AnimatedViewKeys.page(page.key), {
                        property: 'translateX',
                        from: 0,
                        to: SCREEN_WIDTH
                    });
                    SAnimated.spring(AnimatedViewKeys.page(underlayHolder.key), {
                        property: 'translateX',
                        from: -SCREEN_WIDTH * 0.3,
                        to: 0
                    });
                } else {
                    SAnimated.timing(AnimatedViewKeys.page(page.key), {
                        property: 'translateX',
                        from: 0,
                        to: SCREEN_WIDTH,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                }
                SAnimated.timing(AnimatedViewKeys.pageShadow(underlayHolder.key), {
                    property: 'opacity',
                    from: 0.3,
                    to: 0
                });
                // FastHeaderCoordinator.moveBackward(record.key, underlayHolder.record.key);
                SAnimated.commitTransaction();
            }
        );
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

    componentDidMount() {
        if (this.pendingAction) {
            this.pendingAction();
            this.pendingAction = undefined;
        }
    }

    componentDidUpdate() {
        if (this.pendingAction) {
            this.pendingAction();
            this.pendingAction = undefined;
        }
    }

    render() {
        let pages = (
            <View style={styles.fill}>
                {this.state.routes.map((v) => {
                    return (
                        <SAnimated.View
                            name={AnimatedViewKeys.page(v.key)}
                            key={'page-' + v.key}
                            style={styles.absoluteFill}
                            pointerEvents="box-none"
                        >
                            <PageContainer
                                style={this.props.style}
                                component={v.component}
                                router={v.router}
                                mounted={!!this.state.mounted.find((m) => v.key === m)}
                            />
                            <SAnimated.View
                                name={AnimatedViewKeys.pageShadow(v.key)}
                                key={'shadow-' + v.key}
                                style={[styles.absoluteFill, styles.shadow]}
                                pointerEvents="none"
                            />
                        </SAnimated.View>
                    );
                })}
            </View>
        );

        let header = (
            <View style={styles.absoluteFill} pointerEvents="box-none">
                <HeaderComponent style={this.props.style} />
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

        // Is navigation bar is opaque then shift content to match navigation bar

        let contentInset = SDevice.navigationBarHeight + SDevice.statusBarHeight + SDevice.safeArea.top;

        return (
            <View style={[styles.fill, this.props.style.isOpaque && { paddingTop: contentInset }]}>
                <ASSafeAreaProvider
                    top={this.props.style.isOpaque ? 0 : contentInset}
                    bottom={SDevice.safeArea.bottom}
                >
                    {pages}
                    {header}
                </ASSafeAreaProvider>
            </View>
        );
    }
}