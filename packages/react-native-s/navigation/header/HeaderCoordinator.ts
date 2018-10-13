import { NavigationState } from '../NavigationState';
import { Dimensions, Platform } from 'react-native';
import { SDevice } from '../../SDevice';
import { NavigationPage } from '../NavigationPage';
import { HeaderConfig } from '../HeaderConfig';
import { SAnimatedShadowView } from '../../SAnimatedShadowView';
import { HeaderTitleViewCoordinator } from './HeaderTitleViewCoordinator';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { SAnimated } from 'react-native-s/SAnimated';
import { STrackedValue } from 'react-native-s/STrackedValue';

const MAX_SIZE = Math.max(Dimensions.get('window').height, Dimensions.get('window').width);

export class HeaderCoordinator {

    private background: SAnimatedShadowView;
    private hairline: SAnimatedShadowView;
    private container: SAnimatedShadowView;
    private pages = new Map<string, HeaderTitleViewCoordinator>();
    private getSize: () => { width: number, height: number };
    private freezedSubscription?: WatchSubscription;
    private freezedOffsetValue?: STrackedValue;
    private freezedOffsetValueSubscription?: string;
    readonly isModal: boolean;
    isInTransition = false;

    constructor(key: string, isModal: boolean, size: () => { width: number, height: number }) {
        this.isModal = isModal;
        this.getSize = size;
        this.background = new SAnimatedShadowView('header-background-' + key, { translateX: -MAX_SIZE });
        this.hairline = new SAnimatedShadowView('header-hairline-' + key);
        this.container = new SAnimatedShadowView('header-container-' + key);
    }

    get size() {
        return this.getSize();
    }

    setInitialState = (pages: NavigationPage[]) => {
        this._updateState(0, pages[0]);
        this._onPageFreezed(pages[0]);
    }

    onTransitionStart = () => {
        this.isInTransition = true;
        this._onPageUnfreezed();
    }

    onTransitionStop = (page: NavigationPage) => {
        this.isInTransition = false;
        this._onPageFreezed(page);
    }

    /**
     * Called for push animations from oldPage to newPage
     */
    onPushed = (oldPage: NavigationPage, newPage: NavigationPage) => {
        this._updateState(0, newPage, oldPage);
    }

    /**
     * Called for pop animations from oldPage to newPage
     */
    onPopped = (oldPage: NavigationPage, newPage: NavigationPage) => {
        this._updateState(1, oldPage, newPage);
    }

    /**
     * Called when back swipe is started
     */
    onSwipeStarted = (oldPage: NavigationPage, newPage: NavigationPage) => {
        // Nothing to do
    }

    /**
     * Called when back swipe is in progess
     */
    onSwipeProgress = (oldPage: NavigationPage, newPage: NavigationPage, progress: number) => {
        this._updateState(progress, oldPage, newPage);
    }

    /**
     * Called when back swipe is cancelled
     */
    onSwipeCancelled = (oldPage: NavigationPage, newPage: NavigationPage) => {
        this._updateState(0, oldPage, newPage);
    }

    /**
     * Called when back swipe is completed
     */
    onSwipeCompleted = (oldPage: NavigationPage, newPage: NavigationPage) => {
        this._updateState(1, oldPage, newPage);
    }

    //
    // State update implementation
    //

    private _onPageFreezed = (page: NavigationPage) => {
        this.freezedSubscription = page.watchConfig((config, animated) => {

            // Update subsctriptions if needed
            this._handleFreezedConfig(page);

            // Update config state
            SAnimated.beginTransaction();
            if (animated !== false) {
                SAnimated.setPropertyAnimator((name, prop, from, to) => {
                    SAnimated.spring(name, {
                        property: prop,
                        from: from,
                        to: to
                    });
                });
            }
            this._updateState(0, page);
            SAnimated.commitTransaction();
        });
        this._handleFreezedConfig(page);
        this._updateState(0, page);
    }

    private _handleFreezedConfig = (page: NavigationPage) => {
        if (page.config.contentOffset !== this.freezedOffsetValue) {
            if (this.freezedOffsetValueSubscription) {
                this.freezedOffsetValue!!.offset.removeListener(this.freezedOffsetValueSubscription);
                this.freezedOffsetValueSubscription = undefined;
                this.freezedOffsetValue = undefined;
            }
            if (page.config.contentOffset) {
                this.freezedOffsetValue = page.config.contentOffset;
                this.freezedOffsetValueSubscription = page.config.contentOffset.offset.addListener((clb) => {
                    SAnimated.beginTransaction();
                    this._updateState(0, page);
                    SAnimated.commitTransaction();
                });
            }
        }
    }

    private _onPageUnfreezed = () => {
        if (this.freezedSubscription) {
            this.freezedSubscription();
            this.freezedSubscription = undefined;
        }
        if (this.freezedOffsetValueSubscription) {
            this.freezedOffsetValue!!.offset.removeListener(this.freezedOffsetValueSubscription);
            this.freezedOffsetValueSubscription = undefined;
            this.freezedOffsetValue = undefined;
        }
    }

    private _updateState = (progress: number, last: NavigationPage, prev?: NavigationPage) => {

        // Background
        if (Platform.OS === 'ios') {

            let handled = false;
            if (prev) {
                if (prev.config.headerHidden && last.config.headerHidden) {
                    // Hide background
                    handled = true;
                    this.background.translateY = -MAX_SIZE;
                    this.background.translateX = 0;
                    this.hairline.translateX = 0;
                    this.hairline.translateY = -1;
                    this.hairline.opacity = 0;
                } else if (last.config.headerHidden) {
                    // Keep on previous page offset
                    handled = true;
                    let op = this.resolveHairlineOpacity(prev.config);
                    let v = this.resolveHeaderHeight(prev.config);
                    this.background.translateY = v - MAX_SIZE;
                    this.background.translateX = this.size.width * progress;
                    this.hairline.translateX = this.size.width * progress;
                    this.hairline.translateY = v;
                    this.hairline.opacity = op;
                    let d = v - (SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top);
                    this.container.iosHeight = d;
                    this.container.translateY = d / 2;
                } else if (prev.config.headerHidden) {
                    // Keep on current page offset
                    handled = true;
                    let op = this.resolveHairlineOpacity(last.config);
                    let v = this.resolveHeaderHeight(last.config);
                    this.background.translateY = v - MAX_SIZE;
                    this.background.translateX = this.size.width * progress;
                    this.hairline.translateX = this.size.width * progress;
                    this.hairline.translateY = v;
                    this.hairline.opacity = op;
                    let d = v - (SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top);
                    this.container.iosHeight = d;
                    this.container.translateY = d / 2;
                } else {
                    // Cross fade
                }
            } else {
                // let current = state.history[state.history.length - 1].config;
                if (last.config.headerHidden) {
                    // Hide background
                    handled = true;
                    this.background.translateY = -MAX_SIZE;
                    this.hairline.translateY = -1;
                    this.hairline.opacity = 0;
                }
            }

            if (!handled) {
                let v: number = 0;
                let op: number = 0;
                op += Math.abs(1 - progress) * this.resolveHairlineOpacity(last.config);
                v += Math.abs(1 - progress) * this.resolveHeaderHeight(last.config);
                if (prev) {
                    v += Math.abs(progress) * this.resolveHeaderHeight(prev.config);
                    op += Math.abs(progress) * this.resolveHairlineOpacity(prev.config);
                }

                let d = v - (SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top);
                this.container.iosHeight = d;
                this.container.translateY = d / 2;

                this.background.translateY = v - MAX_SIZE;
                this.background.translateX = 0;
                this.hairline.translateY = v;
                this.hairline.translateX = 0;
                this.hairline.opacity = op;
            }
        } else {
            this.hairline.translateX = SDevice.safeArea.top + SDevice.navigationBarHeight + SDevice.statusBarHeight;
            this.hairline.opacity = 1;
        }

        // Pages
        if (!prev) {
            this.getPageCoordinator(last).updateState(0);
        } else {
            this.getPageCoordinator(last).updateState(progress);
            this.getPageCoordinator(prev).updateState(-1 + progress);
        }
    }

    private resolveHeaderHeight(config: HeaderConfig) {
        let res: number;
        if (config.appearance === 'large' || config.appearance === undefined) {
            res = (SDevice.safeArea.top + SDevice.statusBarHeight + SDevice.navigationBarHeightExpanded);
            if (config.search) {
                if (config.searchActive) {
                    res -= 41;
                } else {
                    res += 52;
                }
            }
            if (!config.search || !config.searchActive) {
                if (config.contentOffset) {
                    res -= config.contentOffset.offsetValue;
                }
            }
        } else {
            res = (SDevice.safeArea.top + SDevice.statusBarHeight + SDevice.navigationBarHeight);
        }
        return Math.max(res, SDevice.safeArea.top + SDevice.statusBarHeight + SDevice.navigationBarHeight);
    }

    private resolveHairlineOpacity(config: HeaderConfig) {
        let res: number = 1;
        if (config.appearance === 'large' || config.appearance === undefined) {
            if (config.search && config.searchActive) {
                res = 1;
            } else if (!config.search) {
                res = 1;
            } else {
                if (config.contentOffset) {
                    res = config.contentOffset.offsetValue <= 52 ? 0 : 1;
                } else {
                    res = 0;
                }
            }
        } else if (config.appearance === 'small-hidden') {
            if (config.contentOffset) {
                res = config.contentOffset.offsetValue <= 44 ? 0 : 1;
            } else {
                res = 0;
            }
        }
        return res;
    }

    private getPageCoordinator(page: NavigationPage) {
        if (!this.pages.has(page.key)) {
            this.pages.set(page.key, new HeaderTitleViewCoordinator(page, this));
        }
        return this.pages.get(page.key)!;
    }
}