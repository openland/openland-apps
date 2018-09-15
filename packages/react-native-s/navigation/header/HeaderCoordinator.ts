import { NavigationState } from '../NavigationState';
import { SAnimatedProperty } from '../../SAnimatedProperty';
import { Dimensions } from 'react-native';
import { SDevice } from '../../SDevice';
import { NavigationPage } from '../NavigationPage';
import { HeaderConfig } from '../HeaderConfig';
import { STrackedValue } from '../../STrackedValue';
import { SAnimated } from '../../SAnimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class PageCoordinator {
    readonly key: string;
    readonly page: NavigationPage;
    readonly coordinator: HeaderCoordinator;
    private lastConfig: HeaderConfig;
    private opacity: SAnimatedProperty;
    private translate: SAnimatedProperty;
    private translateLarge: SAnimatedProperty;
    private opacitySmall: SAnimatedProperty;
    private subscribedValue?: STrackedValue;
    private subscription?: string;
    private smallHeaderHidden = false;

    constructor(page: NavigationPage, coordinator: HeaderCoordinator) {
        this.key = page.key;
        this.page = page;
        this.coordinator = coordinator;
        this.opacity = new SAnimatedProperty('header--' + this.key, 'opacity', 0);
        this.opacitySmall = new SAnimatedProperty('header-small--' + this.key, 'opacity', 1);
        this.translate = new SAnimatedProperty('header--' + this.key, 'translateX', SCREEN_WIDTH);
        this.translateLarge = new SAnimatedProperty('header-large--' + this.key, 'translateY', 0);
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
                this.coordinator._updateState(this.coordinator.state!!, 0);
                SAnimated.commitTransaction();
            }
        });
        isStarting = false;
    }

    updateState = (progress: number) => {
        this.opacity.value = 1.5 - Math.abs(progress) * 2; // Meet in the center
        this.translate.value = (progress) * SCREEN_WIDTH / 2;

        if (this.lastConfig.appearance === 'large' || this.lastConfig.appearance === undefined) {
            let offset = this.lastConfig.contentOffset ? this.lastConfig.contentOffset.offsetValue : 0;
            let titleOffset = -Math.abs(1 - progress) * offset;
            if (titleOffset < -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight - 12)) {
                this.opacitySmall.value = 1;
            } else {
                this.opacitySmall.value = 0;
            }
            this.translateLarge.value = -Math.abs(progress) * (SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight) + titleOffset;
        } else {
            this.opacitySmall.value = 1;
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