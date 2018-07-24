import { AppVisibilityApi } from 'openland-y-runtime-api/AppVisibilityApi';
import { AppState } from 'react-native';
class AppVisibilityStub implements AppVisibilityApi {

    isVisible = true;
    private watchers: ((isVisible: boolean) => void)[] = [];

    constructor() {
        this.isVisible = AppState.currentState === 'active';
        AppState.addEventListener('change', (nextAppState) => {
            let nextVisible = nextAppState === 'active';
            if (this.isVisible !== nextVisible) {
                this.isVisible = nextVisible;
                for (let w of this.watchers) {
                    w(this.isVisible);
                }
            }
        });
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