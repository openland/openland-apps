import { AppBackgroundTaskApi } from 'openland-y-runtime-api/AppBackgroundTaskApi';

class AppBackgroundTaskImpl implements AppBackgroundTaskApi {

    setTimeout(task: any, timeout?: any) {
        return window.setTimeout(task, timeout);
    }
    setInterval(task: () => void, timeout: number) {
        return window.setInterval(task, timeout);
    }
    clearTimeout(id: number): void {
        window.clearTimeout(id);
    }
    clearInterval(id: number) {
        return window.clearInterval(id);
    }

}

export const AppBackgroundTask = new AppBackgroundTaskImpl();