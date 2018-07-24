import { AppVisibilityApi } from 'openland-y-runtime-api/AppVisibilityApi';

class AppVisibilityStub implements AppVisibilityApi {

    isVisible = true;
    private watchers: ((isVisible: boolean) => void)[] = [];

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