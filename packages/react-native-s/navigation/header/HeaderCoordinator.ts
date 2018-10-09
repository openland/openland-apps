import { NavigationState } from '../NavigationState';
import { Dimensions, Platform } from 'react-native';
import { SDevice } from '../../SDevice';
import { NavigationPage } from '../NavigationPage';
import { HeaderConfig } from '../HeaderConfig';
import { SAnimatedShadowView } from '../../SAnimatedShadowView';
import { HeaderTitleViewCoordinator } from './HeaderTitleViewCoordinator';

const MAX_SIZE = Math.max(Dimensions.get('window').height, Dimensions.get('window').width);

export class HeaderCoordinator {

    private background: SAnimatedShadowView;
    private hairline: SAnimatedShadowView;
    private container: SAnimatedShadowView;
    private pages = new Map<string, HeaderTitleViewCoordinator>();
    private getSize: () => { width: number, height: number };
    readonly isModal: boolean;
    isInTransition = false;
    state?: NavigationState;

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

        // Background
        if (Platform.OS === 'ios') {

            let handled = false;
            if (state.history.length >= 2) {
                let prev = state.history[state.history.length - 2].config;
                let current = state.history[state.history.length - 1].config;
                if (prev.headerHidden && current.headerHidden) {
                    // Hide background
                    handled = true;
                    this.background.translateY = -MAX_SIZE;
                    this.background.translateX = 0;
                    this.hairline.translateX = 0;
                    this.hairline.translateY = -1;
                    this.hairline.opacity = 0;
                } else if (current.headerHidden) {
                    // Keep on previous page offset
                    handled = true;
                    let op = this.resolveHairlineOpacity(prev);
                    let v = this.resolveHeaderHeight(prev);
                    this.background.translateY = v - MAX_SIZE;
                    this.background.translateX = this.size.width * progress;
                    this.hairline.translateX = this.size.width * progress;
                    this.hairline.translateY = v;
                    this.hairline.opacity = op;
                    let d = v - (SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top);
                    this.container.iosHeight = d;
                    this.container.translateY = d / 2;
                } else if (prev.headerHidden) {
                    // Keep on current page offset
                    handled = true;
                    let op = this.resolveHairlineOpacity(current);
                    let v = this.resolveHeaderHeight(current);
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
                let current = state.history[state.history.length - 1].config;
                if (current.headerHidden) {
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
                op += Math.abs(1 - progress) * this.resolveHairlineOpacity(state.history[state.history.length - 1].config);
                v += Math.abs(1 - progress) * this.resolveHeaderHeight(state.history[state.history.length - 1].config);
                if (state.history.length >= 2) {
                    v += Math.abs(progress) * this.resolveHeaderHeight(state.history[state.history.length - 2].config);
                    op += Math.abs(progress) * this.resolveHairlineOpacity(state.history[state.history.length - 2].config);
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
            if (config.contentOffset) {
                res -= config.contentOffset.offsetValue;
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
            } else if (config.contentOffset) {
                res = config.contentOffset.offsetValue < 44 ? 0 : 1;
            } else {
                res = 0;
            }
        } else if (config.appearance === 'small-hidden') {
            if (config.contentOffset) {
                res = config.contentOffset.offsetValue < 44 ? 0 : 1;
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