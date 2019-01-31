import { AppVisibilityApi } from 'openland-y-runtime-api/AppVisibilityApi';
import { AppState, Platform } from 'react-native';
import { NativeModules } from 'react-native';
const IOSTimer = NativeModules.RNBackgroundTask;

class AppVisibilityStub implements AppVisibilityApi {

    isVisible = true;
    private watchers: ((isVisible: boolean) => void)[] = [];
    // private pendingTimer?: number;

    constructor() {
        this.isVisible = AppState.currentState === 'active';
        AppState.addEventListener('change', (nextAppState) => {
            let nextVisible = nextAppState === 'active';
            if (this.isVisible !== nextVisible) {
                this.isVisible = nextVisible;
                if (nextVisible) {
                    this.handleVisible();
                } else {
                    this.handleInvisible();
                }
                for (let w of this.watchers) {
                    w(this.isVisible);
                }
            }
        });
        if (this.isVisible) {
            this.handleVisible();
        } else {
            this.handleInvisible();
        }
    }

    private handleVisible() {
        if (Platform.OS === 'ios') {
            console.log('[VISIBILITY] Visible');
            // if (this.pendingTimer) {
            //     window.clearTimeout(this.pendingTimer)
            //     this.pendingTimer = undefined;
            // }
            IOSTimer.stopTask();
        }
    }

    private handleInvisible() {
        if (Platform.OS === 'ios') {
            console.log('[VISIBILITY] Invisible');
            // if (this.pendingTimer) {
            //     window.clearTimeout(this.pendingTimer)
            //     this.pendingTimer = undefined;
            // }
            IOSTimer.startTask(15000);
            // this.pendingTimer = window.setTimeout(() => {
            //     console.log('[VISIBILITY] Paused');
            //     IOSTimer.stopTask();
            // }, 15000);
        }
    }

    watch(handler: (isVisible: boolean) => void) {
        this.watchers.push(handler);
    }

    unwatch(handler: (isVisible: boolean) => void) {
        let index = this.watchers.findIndex((v) => v === handler);
        if (index >= 0) {
            this.watchers.splice(index, 1);
        } else {
            console.warn('Trying to unsubscribe unknown watcher');
        }
    }
}

export const AppVisibility = new AppVisibilityStub();