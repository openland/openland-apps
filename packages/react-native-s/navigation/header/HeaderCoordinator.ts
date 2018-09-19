import { NavigationState } from '../NavigationState';
import { SAnimatedProperty } from '../../SAnimatedProperty';
import { Dimensions, Platform } from 'react-native';
import { SDevice } from '../../SDevice';
import { NavigationPage } from '../NavigationPage';
import { HeaderConfig } from '../HeaderConfig';
import { SAnimatedShadowView } from '../../SAnimatedShadowView';
import { HeaderTitleViewCoordinator } from './HeaderTitleViewCoordinator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export class HeaderCoordinator {

    private backOpacity: SAnimatedProperty;
    private backgroundTranslate: SAnimatedProperty;
    private hairline: SAnimatedShadowView;
    private container: SAnimatedShadowView;
    private pages = new Map<string, HeaderTitleViewCoordinator>();
    private isModal: boolean;
    isInTransition = false;
    state?: NavigationState;

    constructor(key: string, isModal: boolean) {
        this.isModal = isModal;
        this.backOpacity = new SAnimatedProperty('header-back-' + key, 'opacity', 1);
        this.backgroundTranslate = new SAnimatedProperty('header-background-' + key, 'translateY', -SCREEN_HEIGHT);
        this.hairline = new SAnimatedShadowView('header-hairline-' + key);
        this.container = new SAnimatedShadowView('header-container-' + key);
        // this.container.iosHeight = 0;
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

        // Back Button
        if (state.history.length === 1) {
            this.backOpacity.value = -0.3;
        } else if (state.history.length === 2) {
            this.backOpacity.value = 1.0 - Math.abs(progress) * 1.3;
        } else {
            this.backOpacity.value = 1;
        }

        // Background
        if (Platform.OS === 'ios') {
            let v: number = 0;
            v += Math.abs(1 - progress) * this.resolveHeaderHeight(state.history[state.history.length - 1].config);
            if (state.history.length >= 2) {
                v += Math.abs(progress) * this.resolveHeaderHeight(state.history[state.history.length - 2].config);
            }
            this.backgroundTranslate.value = v - SCREEN_HEIGHT;
            this.hairline.translateY = v;

            let d = v - (SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top) + 1;
            this.container.iosHeight = d;
            this.container.translateY = d / 2;

            let op: number = 0;
            op += Math.abs(1 - progress) * this.resolveHairlineOpacity(state.history[state.history.length - 1].config);
            if (state.history.length >= 2) {
                op += Math.abs(progress) * this.resolveHairlineOpacity(state.history[state.history.length - 2].config);
            }
            this.hairline.opacity = op;
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