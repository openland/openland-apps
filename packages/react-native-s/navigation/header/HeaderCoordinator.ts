import { NavigationState } from '../NavigationState';
import { SAnimatedProperty } from '../../SAnimatedProperty';
import { Dimensions } from 'react-native';
import { SDevice } from '../../SDevice';
import { NavigationPage } from '../NavigationPage';
import { HeaderConfig } from '../HeaderConfig';
import { STrackedValue } from '../../STrackedValue';
import { SAnimated } from '../../SAnimated';
import { AnimatedViewKeys } from '../AnimatedViewKeys';
import { SAnimatedShadowView } from '../../SAnimatedShadowView';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class PageCoordinator {
    readonly key: string;
    readonly page: NavigationPage;
    readonly coordinator: HeaderCoordinator;
    private lastConfig: HeaderConfig;

    private headerView: SAnimatedShadowView;
    private titleView: SAnimatedShadowView;
    private titleLargeView: SAnimatedShadowView;
    private searchView: SAnimatedShadowView;
    private searchInputBackgroundView: SAnimatedShadowView;
    private searchCancelView: SAnimatedShadowView;
    private pageView: SAnimatedShadowView;

    private subscribedValue?: STrackedValue;
    private subscription?: string;

    constructor(page: NavigationPage, coordinator: HeaderCoordinator) {
        this.key = page.key;
        this.page = page;
        this.coordinator = coordinator;
        this.headerView = new SAnimatedShadowView('header--' + this.key);
        this.titleView = new SAnimatedShadowView('header-small--' + this.key);
        this.titleLargeView = new SAnimatedShadowView('header-large--' + this.key);
        this.pageView = new SAnimatedShadowView(AnimatedViewKeys.page(this.key));
        this.searchView = new SAnimatedShadowView('header-search--' + this.key);
        this.searchInputBackgroundView = new SAnimatedShadowView('header-search-input--' + this.key);
        this.searchCancelView = new SAnimatedShadowView('header-search-button--' + this.key);

        this.lastConfig = this.page.config.getState()!!;
        let isStarting = true;
        this.page.config.watch((cfg) => {
            this.lastConfig = cfg;
            if (this.lastConfig.contentOffset !== this.subscribedValue) {
                if (this.subscribedValue) {
                    this.subscribedValue.offset.removeListener(this.subscription!);
                    this.subscribedValue = undefined;
                }
                if (this.lastConfig.contentOffset) {
                    this.subscribedValue = this.lastConfig.contentOffset;
                    this.subscription = this.lastConfig.contentOffset.offset.addListener((v) => {
                        if (isStarting) {
                            return;
                        }
                        if (!this.coordinator.isInTransition && this.coordinator.state!!.history[this.coordinator.state!!.history.length - 1].key === page.key) {
                            SAnimated.beginTransaction();
                            this.coordinator._updateState(this.coordinator.state!!, 0);
                            SAnimated.commitTransaction();
                        }
                    });
                }
            }
            if (isStarting) {
                return;
            }
            if (!this.coordinator.isInTransition && this.coordinator.state!!.history[this.coordinator.state!!.history.length - 1].key === page.key) {
                SAnimated.beginTransaction();
                SAnimated.setPropertyAnimator((name, prop, from, to) => {
                    SAnimated.spring(name, {
                        property: prop,
                        from: from,
                        to: to
                    });
                });
                this.coordinator._updateState(this.coordinator.state!!, 0);
                SAnimated.commitTransaction();
            }
        });
        isStarting = false;
    }

    updateState = (progress: number) => {
        this.headerView.opacity = 1.5 - Math.abs(progress) * 2; // Meet in the center
        this.headerView.translateX = (progress) * SCREEN_WIDTH / 2;

        if (this.lastConfig.appearance === 'large' || this.lastConfig.appearance === undefined) {
            // Content Offset
            // Positive for overscroll
            let contentOffset = this.lastConfig.contentOffset ? this.lastConfig.contentOffset.offsetValue : 0;

            //
            // Large title offset
            //
            let titleOffset = -contentOffset;
            if (this.lastConfig.search) {
                if (contentOffset < 0) {
                    // Do nothing on overscroll
                } else {
                    if (contentOffset < 44) {
                        titleOffset = 0;
                    } else {
                        titleOffset += 44;
                    }
                }
            }
            this.titleLargeView.translateY = titleOffset;

            //
            // Search field
            //
            if (this.lastConfig.search) {
                this.searchView.translateY = -contentOffset - Math.abs(progress) * 44;
            }

            // Show/hide scroll depending if large title is visible
            if (titleOffset < -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight - 12)) {
                this.titleView.opacity = 1;
            } else {
                this.titleView.opacity = 0;
            }

            // Search
            if (this.lastConfig.search) {
                if (this.lastConfig.searchActive) {
                    this.headerView.translateY = -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight + 44);
                    this.pageView.translateY = -96;
                    this.searchInputBackgroundView.iosWidth = -70;
                    this.searchInputBackgroundView.translateX = -35;
                    this.searchCancelView.translateX = 0;
                    this.titleLargeView.opacity = 0;
                } else {
                    this.searchInputBackgroundView.iosWidth = 0;
                    this.searchInputBackgroundView.translateX = 0;
                    this.searchCancelView.translateX = 70;
                    this.pageView.translateY = 0;
                    this.headerView.translateY = 0;
                    this.titleLargeView.opacity = 1;
                }
            } else {
                this.pageView.translateY = 0;
                this.headerView.translateY = 0;
            }
        } else if (this.lastConfig.appearance === 'small-hidden') {
            let offset = this.lastConfig.contentOffset ? this.lastConfig.contentOffset.offsetValue : 0;
            if (offset > SDevice.navigationBarHeight) {
                this.titleView.opacity = 1;
            } else {
                this.titleView.opacity = 0;
            }
        } else {
            this.titleView.opacity = 1;
        }
    }
}

export class HeaderCoordinator {

    private backOpacity = new SAnimatedProperty('header-back', 'opacity', 1);
    private backgroundTranslate = new SAnimatedProperty('header-background', 'translateY', -SCREEN_HEIGHT);
    private pages = new Map<string, PageCoordinator>();
    isInTransition = false;
    state?: NavigationState;

    setInitialState = (state: NavigationState) => {
        this.state = state;
        this._updateState(state, 0);
        this.getPageCoordinator(state.history[0]).updateState(0);
    }

    onTransitionStart = () => {
        this.isInTransition = true;
    }

    onTransitionStop = () => {
        this.isInTransition = false;
    }

    onPushed = (state: NavigationState) => {
        this.state = state;
        this._updateState(state, 0);
    }
    onPopped = (state: NavigationState, newState: NavigationState) => {
        this.state = newState;
        this._updateState(state, 1);
    }
    onSwipeStarted = (state: NavigationState) => {
        // Nothing to do
    }
    onSwipeProgress = (state: NavigationState, progress: number) => {
        this._updateState(state, progress);
    }
    onSwipeCancelled = (state: NavigationState) => {
        this._updateState(state, 0);
    }
    onSwipeCompleted = (state: NavigationState, newState: NavigationState) => {
        this.state = newState;
        this._updateState(state, 1);
    }

    _updateState = (state: NavigationState, progress: number) => {

        // Back Button
        if (state.history.length === 1) {
            this.backOpacity.value = -0.3;
        } else if (state.history.length === 2) {
            this.backOpacity.value = 1.0 - Math.abs(progress) * 1.3;
        } else {
            this.backOpacity.value = 1;
        }

        // Background
        let v: number = 0;
        v += Math.abs(1 - progress) * this.resolveHeaderHeight(state.history[state.history.length - 1].config.getState()!);
        if (state.history.length >= 2) {
            v += Math.abs(progress) * this.resolveHeaderHeight(state.history[state.history.length - 2].config.getState()!);
        }
        this.backgroundTranslate.value = v - SCREEN_HEIGHT;

        // Pages
        if (state.history.length === 1) {
            this.getPageCoordinator(state.history[0]).updateState(0);
        } else {
            this.getPageCoordinator(state.history[state.history.length - 1]).updateState(progress);
            this.getPageCoordinator(state.history[state.history.length - 2]).updateState(-1 + progress);
        }
    }

    private resolveHeaderHeight(config: HeaderConfig) {
        let res: number;
        if (config.appearance === 'large' || config.appearance === undefined) {
            res = (SDevice.safeArea.top + SDevice.statusBarHeight + SDevice.navigationBarHeightExpanded);
            if (config.search) {
                if (config.searchActive) {
                    res -= 56;
                } else {
                    res += 44;
                }
            }
        } else {
            res = (SDevice.safeArea.top + SDevice.statusBarHeight + SDevice.navigationBarHeight);
        }
        if (config.contentOffset) {
            res -= config.contentOffset.offsetValue;
        }
        return Math.max(res, SDevice.safeArea.top + SDevice.statusBarHeight + SDevice.navigationBarHeight);
    }

    private getPageCoordinator(page: NavigationPage) {
        if (!this.pages.has(page.key)) {
            this.pages.set(page.key, new PageCoordinator(page, this));
        }
        return this.pages.get(page.key)!;
    }
}