import { NavigationState } from '../NavigationState';
import { SAnimatedProperty } from '../../SAnimatedProperty';
import { Dimensions } from 'react-native';
import { SDevice } from '../../SDevice';
import { NavigationPage } from '../NavigationPage';
import { HeaderConfig } from '../HeaderConfig';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class PageCoordinator {
    readonly key: string;
    private opacity: SAnimatedProperty;
    private translate: SAnimatedProperty;

    constructor(key: string) {
        this.key = key;
        this.opacity = new SAnimatedProperty('header--' + key, 'opacity', 0);
        this.translate = new SAnimatedProperty('header--' + key, 'translateX', SCREEN_WIDTH);
    }

    updateState = (progress: number) => {
        this.opacity.value = 1.5 - Math.abs(progress) * 2; // Meet in the center
        this.translate.value = (progress) * SCREEN_WIDTH / 2;
    }
}

export class HeaderCoordinator {

    private backOpacity = new SAnimatedProperty('header-back', 'opacity', 1);
    private backgroundTranslate = new SAnimatedProperty('header-background', 'translateY', -SCREEN_HEIGHT);
    private pages = new Map<string, PageCoordinator>();
    private isInTransition = false;
    private state?: NavigationState;

    setInitialState = (state: NavigationState) => {
        this.state = state;
        this.updateState(state, 0);
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
        this.updateState(state, 0);
    }
    onPopped = (state: NavigationState, newState: NavigationState) => {
        this.state = newState;
        this.updateState(state, 1);
    }
    onSwipeStarted = (state: NavigationState) => {
        // Nothing to do
    }
    onSwipeProgress = (state: NavigationState, progress: number) => {
        this.updateState(state, progress);
    }
    onSwipeCancelled = (state: NavigationState) => {
        this.updateState(state, 0);
    }
    onSwipeCompleted = (state: NavigationState, newState: NavigationState) => {
        this.state = newState;
        this.updateState(state, 1);
    }

    private updateState = (state: NavigationState, progress: number) => {

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
            this.pages.set(page.key, new PageCoordinator(page.key));
            page.config.watch((cfg) => {
                if (cfg.contentOffset) {
                    cfg.contentOffset!!.offset.addListener((v) => {
                        if (page.key === this.state!!.history[this.state!!.history.length - 1].key && !this.isInTransition) {
                            this.updateState(this.state!!, 0);
                        }
                    });
                }
                if (page.key === this.state!!.history[this.state!!.history.length - 1].key && !this.isInTransition) {
                    this.updateState(this.state!!, 0);
                }
            });
        }
        return this.pages.get(page.key)!;
    }
}