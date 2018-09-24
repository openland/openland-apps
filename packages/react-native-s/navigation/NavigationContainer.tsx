import * as React from 'react';
import { View, Platform, StyleSheet, ViewStyle, Keyboard, Dimensions, PanResponder, Image } from 'react-native';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { AnimatedViewKeys } from './AnimatedViewKeys';
import { SAnimated } from 'react-native-s/SAnimated';
import { NavigationPage } from './NavigationPage';
import { NavigationState } from './NavigationState';
import { NavigationManagerListener, NavigationManager } from './NavigationManager';
import { PageContainer } from './containers/PageContainer';
import { SNavigationViewStyle } from '../SNavigationView';
import { SDevice } from '../SDevice';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderCoordinator } from './header/HeaderCoordinator';
import { HeaderComponentLoader } from './header/HeaderComponentLoader';

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
        opacity: 0.1
    } as ViewStyle,
});

interface NavigationContainerState {
    routes: NavigationPage[];
    mounted: string[];
    current: string;
    navigateTo?: string;
    navigateFrom?: string;
}

export interface NavigationContainerProps {
    width: number;
    height: number;
    manager: NavigationManager;
    style: SNavigationViewStyle;
}

export class NavigationContainer extends React.PureComponent<NavigationContainerProps, NavigationContainerState> implements NavigationManagerListener {

    private subscription?: WatchSubscription;
    private routes: NavigationPage[];
    private mounted: string[];
    private removing: string[];
    private currentHistory: NavigationState;
    private swipeLocker?: (() => void);
    private swipeCurrentKey?: string;
    private swipePrevKey?: string;
    private headerCoordinator: HeaderCoordinator;

    constructor(props: NavigationContainerProps) {
        super(props);

        this.headerCoordinator = new HeaderCoordinator(props.manager.key, !!props.manager.parent, () => {
            return {
                width: this.props.width,
                height: this.props.height
            };
        });
        this.currentHistory = props.manager.getState();
        let h = this.currentHistory.history;
        this.routes = h;
        this.mounted = [h[h.length - 1].key];
        this.removing = [];
        this.state = {
            routes: this.routes,
            mounted: this.mounted,
            current: h[h.length - 1].key
        };
    }

    componentWillMount() {
        this.subscription = this.props.manager.watch(this);
        if (this.currentHistory !== this.props.manager.getState()) {
            this.currentHistory = this.props.manager.getState();
            this.routes = this.currentHistory.history;
            this.mounted = [this.currentHistory.history[this.currentHistory.history.length - 1].key];
        }
        this.setState(
            { routes: this.routes, mounted: this.mounted, current: this.currentHistory.history[this.currentHistory.history.length - 1].key },
            () => {
                this.headerCoordinator.setInitialState(this.currentHistory);
            });
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
        this.headerCoordinator.onTransitionStart();
        this.setState(
            { mounted: this.mounted, routes: this.routes, navigateTo: record.key, navigateFrom: underlay, current: record.key },
            () => {
                SAnimated.beginTransaction();
                if (Platform.OS === 'ios') {
                    SAnimated.setPropertyAnimator((name, prop, from, to) => {
                        SAnimated.spring(name, {
                            property: prop,
                            from: from,
                            to: to
                        });
                    });
                    SAnimated.spring(AnimatedViewKeys.page(record.key), {
                        property: 'translateX',
                        from: this.props.width,
                        to: 0
                    });
                    SAnimated.spring(AnimatedViewKeys.page(underlayHolder.key), {
                        property: 'translateX',
                        from: 0,
                        to: -this.props.width / 3
                    });

                    SAnimated.spring(AnimatedViewKeys.pageShadowSide(underlayHolder.key), {
                        property: 'opacity',
                        from: 0,
                        to: 1,
                    });
                    SAnimated.spring(AnimatedViewKeys.pageShadowSide(underlayHolder.key), {
                        property: 'translateX',
                        from: 0,
                        to: - 2 * this.props.width / 3,
                    });
                    SAnimated.spring(AnimatedViewKeys.pageShadowOverlay(underlayHolder.key), {
                        property: 'opacity',
                        from: 0,
                        to: 1
                    });
                } else {
                    SAnimated.setPropertyAnimator((name, prop, from, to) => {
                        SAnimated.timing(name, {
                            property: prop,
                            from: from,
                            to: to,
                            easing: { bezier: [0.4, 0.0, 0.2, 1] }
                        });
                    });
                    SAnimated.timing(AnimatedViewKeys.page(record.key), {
                        property: 'translateX',
                        from: this.props.width,
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    SAnimated.timing(AnimatedViewKeys.pageShadowSide(underlayHolder.key), {
                        property: 'opacity',
                        from: 0,
                        to: 1,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    SAnimated.timing(AnimatedViewKeys.pageShadowSide(underlayHolder.key), {
                        property: 'translateX',
                        from: - 2 * this.props.width / 3,
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    SAnimated.timing(AnimatedViewKeys.pageShadowOverlay(underlayHolder.key), {
                        property: 'opacity',
                        from: 0,
                        to: 1,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    // SAnimated.timing(AnimatedViewKeys.pageShadow(underlayHolder.key), {
                    //     property: 'opacity',
                    //     from: 0,
                    //     to: 1, easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    // });
                }
                this.headerCoordinator.onPushed(this.currentHistory);

                SAnimated.commitTransaction(() => {
                    unlock();
                    this.headerCoordinator.onTransitionStop();
                    this.mounted = this.mounted.filter((v) => v !== underlay);
                    this.setState({ mounted: this.mounted, navigateTo: undefined, navigateFrom: undefined });
                });
            }
        );
    }

    onPopped = (page: NavigationPage, state: NavigationState) => {

        // Dismiss keyboard on navigation
        Keyboard.dismiss();

        // Update internal state
        let underlayKey = state.history[state.history.length - 1].key;
        let underlayHolder = this.routes.find((v) => v.key === underlayKey)!!;
        let prevHistory = this.currentHistory;
        this.currentHistory = state;

        //
        // Lock navigation
        //
        let unlock = this.props.manager.beginLock();
        this.headerCoordinator.onTransitionStart();

        //
        // Mount next page and commit changes
        //
        this.mounted = [...this.mounted, state.history[state.history.length - 1].key];
        this.setState(
            { mounted: this.mounted, navigateTo: state.history[state.history.length - 1].key, navigateFrom: underlayKey, current: state.history[state.history.length - 1].key },
            () => {
                SAnimated.beginTransaction();
                if (Platform.OS === 'ios') {
                    SAnimated.setPropertyAnimator((name, prop, from, to) => {
                        SAnimated.spring(name, {
                            property: prop,
                            from: from,
                            to: to
                        });
                    });
                    SAnimated.spring(AnimatedViewKeys.page(page.key), {
                        property: 'translateX',
                        from: 0,
                        to: this.props.width
                    });
                    SAnimated.spring(AnimatedViewKeys.page(underlayHolder.key), {
                        property: 'translateX',
                        from: -this.props.width / 3,
                        to: 0
                    });
                    SAnimated.spring(AnimatedViewKeys.pageShadowSide(underlayHolder.key), {
                        property: 'opacity',
                        from: 1,
                        to: 0,
                    });
                    SAnimated.spring(AnimatedViewKeys.pageShadowSide(underlayHolder.key), {
                        property: 'translateX',
                        from: - 2 * this.props.width / 3,
                        to: 0,
                    });
                    SAnimated.spring(AnimatedViewKeys.pageShadowOverlay(underlayHolder.key), {
                        property: 'opacity',
                        from: 1,
                        to: 0
                    });
                } else {
                    SAnimated.setPropertyAnimator((name, prop, from, to) => {
                        SAnimated.timing(name, {
                            property: prop,
                            from: from,
                            to: to,
                            easing: { bezier: [0.4, 0.0, 0.2, 1] }
                        });
                    });
                    SAnimated.timing(AnimatedViewKeys.page(page.key), {
                        property: 'translateX',
                        from: 0,
                        to: this.props.width,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });

                    SAnimated.timing(AnimatedViewKeys.pageShadowSide(underlayHolder.key), {
                        property: 'opacity',
                        from: 1,
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    SAnimated.timing(AnimatedViewKeys.pageShadowSide(underlayHolder.key), {
                        property: 'translateX',
                        from: - 2 * this.props.width / 3,
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    SAnimated.timing(AnimatedViewKeys.pageShadowOverlay(underlayHolder.key), {
                        property: 'opacity',
                        from: 1,
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    // SAnimated.timing(AnimatedViewKeys.pageShadow(underlayHolder.key), {
                    //     property: 'opacity',
                    //     from: 1,
                    //     to: 0,
                    //     easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    // });
                }
                this.headerCoordinator.onPopped(prevHistory, this.currentHistory);

                SAnimated.commitTransaction(() => {
                    unlock();
                    this.headerCoordinator.onTransitionStop();
                    this.removing = this.removing.filter((v) => v !== page.key);
                    this.mounted = this.mounted.filter((v) => v !== page.key);
                    this.routes = this.routes.filter((v) => v.key !== page.key);
                    this.setState({ routes: this.routes, mounted: this.mounted, navigateTo: undefined, navigateFrom: undefined });
                });
            }
        );
    }

    panResponder = PanResponder.create({
        onPanResponderGrant: () => {
            Keyboard.dismiss();
            this.swipeCurrentKey = this.currentHistory.history[this.currentHistory.history.length - 1].key;
            this.swipePrevKey = this.currentHistory.history[this.currentHistory.history.length - 2].key;
            this.mounted = [...this.mounted, this.swipePrevKey];
            this.swipeLocker = this.props.manager.beginLock();
            this.setState({ mounted: this.mounted, navigateTo: this.swipePrevKey, navigateFrom: this.swipeCurrentKey, current: this.currentHistory.history[this.currentHistory.history.length - 2].key });
            this.headerCoordinator.onTransitionStart();
            this.headerCoordinator.onSwipeStarted(this.currentHistory);
        },
        onMoveShouldSetPanResponder: (event, gesture) => {
            return !this.props.manager.isLocked() && this.currentHistory.history.length > 1 && gesture.dx > 25 && Math.abs(gesture.dy) < gesture.dx;
        },
        onPanResponderMove: (event, gesture) => {
            let dx = gesture.dx;
            if (dx < 0) {
                dx = 0;
            }
            SAnimated.beginTransaction();
            SAnimated.setValue(AnimatedViewKeys.page(this.swipeCurrentKey!), 'translateX', dx);
            SAnimated.setValue(AnimatedViewKeys.page(this.swipePrevKey!), 'translateX', -this.props.width / 3 + dx / 3);
            SAnimated.setValue(AnimatedViewKeys.pageShadowOverlay(this.swipePrevKey!), 'opacity', (1 - dx / this.props.width));
            SAnimated.setValue(AnimatedViewKeys.pageShadowSide(this.swipePrevKey!), 'opacity', (1 - dx / this.props.width));
            SAnimated.setValue(AnimatedViewKeys.pageShadowSide(this.swipePrevKey!), 'translateX', - 2 * this.props.width / 3 + 2 * dx / 3);
            this.headerCoordinator.onSwipeProgress(this.currentHistory, dx / this.props.width);
            SAnimated.commitTransaction();
        },
        onPanResponderRelease: (event, gesture) => {
            let dx = gesture.dx;
            if (dx > 0) {
                // SAnimated.beginTransaction();
                if (gesture.vx > 0.5 || gesture.dx > this.props.width / 3) {

                    // Pop history
                    let nstate = this.props.manager.popWihtoutNotification();
                    let prevState = this.currentHistory;
                    this.currentHistory = nstate;
                    let unlock = this.swipeLocker!;
                    this.swipeLocker = undefined;
                    let progress = dx / this.props.width;

                    // Move back
                    let duration = Math.max(0.05, Math.min(0.2, Math.abs(-this.props.width / 3 + dx / 3) / Math.abs(gesture.vx * this.props.width)));
                    SAnimated.beginTransaction();
                    SAnimated.setDuration(duration);
                    SAnimated.setPropertyAnimator((name, prop, from, to) => {
                        SAnimated.timing(name, {
                            property: prop,
                            from: from,
                            to: to
                        });
                    });
                    SAnimated.timing(AnimatedViewKeys.page(this.swipeCurrentKey!), {
                        property: 'translateX',
                        from: dx,
                        to: this.props.width
                    });
                    SAnimated.timing(AnimatedViewKeys.page(this.swipePrevKey!), {
                        property: 'translateX',
                        from: -this.props.width / 3 + dx / 3,
                        to: 0
                    });

                    SAnimated.timing(AnimatedViewKeys.pageShadowSide(this.swipePrevKey!), {
                        property: 'opacity',
                        from: (1 - progress),
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    SAnimated.timing(AnimatedViewKeys.pageShadowSide(this.swipePrevKey!), {
                        property: 'translateX',
                        from: - 2 * this.props.width / 3 + 2 * dx / 3,
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    SAnimated.timing(AnimatedViewKeys.pageShadowOverlay(this.swipePrevKey!), {
                        property: 'opacity',
                        from: (1 - progress),
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });

                    // SAnimated.timing(AnimatedViewKeys.pageShadow(this.swipePrevKey!), {
                    //     property: 'opacity',
                    //     from: (1 - progress),
                    //     to: 0
                    // });

                    this.headerCoordinator.onSwipeCompleted(prevState, this.currentHistory);
                    // if (this.currentHistory.history.length === 1) {
                    //     HeaderCoordinator.hideBackButtonSwipe(progress);
                    // }
                    SAnimated.commitTransaction(() => {
                        unlock();
                        this.headerCoordinator.onTransitionStop();
                        this.removing = this.removing.filter((v) => v !== this.swipeCurrentKey);
                        this.mounted = this.mounted.filter((v) => v !== this.swipeCurrentKey);
                        this.routes = this.routes.filter((v) => v.key !== this.swipeCurrentKey);
                        this.setState({ routes: this.routes, mounted: this.mounted, navigateTo: undefined, navigateFrom: undefined, current: this.currentHistory.history[this.currentHistory.history.length - 1].key });
                    });
                } else {
                    // Cancel gesture
                    let unlock = this.swipeLocker!;
                    this.swipeLocker = undefined;
                    SAnimated.beginTransaction();
                    SAnimated.setPropertyAnimator((name, prop, from, to) => {
                        SAnimated.timing(name, {
                            property: prop,
                            from: from,
                            to: to
                        });
                    });
                    SAnimated.spring(AnimatedViewKeys.page(this.swipeCurrentKey!), {
                        property: 'translateX',
                        from: dx,
                        to: 0
                    });
                    SAnimated.spring(AnimatedViewKeys.page(this.swipePrevKey!), {
                        property: 'translateX',
                        from: -this.props.width / 3 + dx / 3,
                        to: -this.props.width / 3
                    });

                    SAnimated.timing(AnimatedViewKeys.pageShadowSide(this.swipePrevKey!), {
                        property: 'opacity',
                        from: (1 - dx / this.props.width),
                        to: 0,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    SAnimated.timing(AnimatedViewKeys.pageShadowSide(this.swipePrevKey!), {
                        property: 'translateX',
                        from: - 2 * this.props.width / 3 + 2 * dx / 3,
                        to: - 2 * this.props.width / 3,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });
                    SAnimated.timing(AnimatedViewKeys.pageShadowOverlay(this.swipePrevKey!), {
                        property: 'opacity',
                        from: (1 - dx / this.props.width),
                        to: 1,
                        easing: { bezier: [0.4, 0.0, 0.2, 1] }
                    });

                    // SAnimated.spring(AnimatedViewKeys.pageShadow(this.swipePrevKey!), {
                    //     property: 'opacity',
                    //     from: (1 - dx / SCREEN_WIDTH),
                    //     to: 0.3
                    // });
                    this.headerCoordinator.onSwipeCancelled(this.currentHistory);
                    SAnimated.commitTransaction(() => {
                        this.headerCoordinator.onTransitionStop();
                        unlock();
                        this.mounted = this.mounted.filter((v) => v !== this.swipePrevKey);
                        this.setState({ mounted: this.mounted, navigateTo: undefined, navigateFrom: undefined, current: this.currentHistory.history[this.currentHistory.history.length - 1].key });
                    });
                }
            } else {
                this.headerCoordinator.onTransitionStop();
                this.swipeLocker!!();
                this.swipeLocker = undefined;
                this.mounted = this.mounted.filter((v) => v !== this.swipePrevKey);
                this.setState({ mounted: this.mounted, navigateTo: undefined, navigateFrom: undefined, current: this.currentHistory.history[this.currentHistory.history.length - 1].key });
            }
        },
        onPanResponderTerminate: () => {
            // On terminate
            // TODO: Reset to initial state
            console.log('terminate');
            // SAnimated.setValue(AnimatedViewKeys.page(top), 'translateX', gesture.dx);
            let unlock = this.swipeLocker!;
            unlock();
            this.swipeLocker = undefined;
        },
        onPanResponderReject: () => {
            this.headerCoordinator.onTransitionStop();
            console.log('reject');
            let unlock = this.swipeLocker!;
            unlock();
            this.swipeLocker = undefined;
        },

        onPanResponderTerminationRequest: () => {
            console.log('tr');
            // Returning false will prevent other views from becoming responder while
            // the navigation view is the responder (mid-gesture)
            return false;
        },
    });

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription();
            this.subscription = undefined;
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
                            pointerEvents={(this.state.current === v.key && !this.state.navigateFrom && !this.state.navigateTo) ? 'box-none' : 'none'}
                        >
                            <PageContainer
                                style={this.props.style}
                                component={v.component}
                                router={v.router}
                                mounted={!!this.state.mounted.find((m) => v.key === m)}
                            />
                            <SAnimated.View
                                name={AnimatedViewKeys.pageShadowOverlay(v.key)}
                                key={'shadow-' + v.key}
                                style={[styles.absoluteFill, { opacity: 0 }]}
                                pointerEvents="none"
                            >
                                <View style={[styles.fill, styles.shadow]} />
                            </SAnimated.View>
                            <SAnimated.View
                                name={AnimatedViewKeys.pageShadowSide(v.key)}
                                key={'shadow-side-' + v.key}
                                style={[styles.absoluteFill, { opacity: 0 }]}
                                pointerEvents="none"
                            >
                                <Image source={require('assets-s/swipe-shadow.png')} resizeMode="stretch" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 14, height: this.props.height }} />
                            </SAnimated.View>
                        </SAnimated.View>
                    );
                })}
            </View>
        );

        let header = (
            <View style={styles.absoluteFill} pointerEvents="box-none">
                <HeaderComponentLoader
                    style={this.props.style}
                    manager={this.props.manager}
                    navigateFrom={this.state.navigateFrom}
                    navigateTo={this.state.navigateTo}
                    pages={this.state.routes}
                    current={this.state.current}
                />
            </View>
        );

        // Content offset for device
        let contentInset = SDevice.navigationBarHeight + SDevice.statusBarHeight + SDevice.safeArea.top;

        return (
            <View style={[styles.fill, this.props.style.isOpaque && { paddingTop: contentInset }]} {...(Platform.OS === 'ios' ? this.panResponder.panHandlers : {})}>
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