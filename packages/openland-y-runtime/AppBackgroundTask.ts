import { AppBackgroundTaskApi } from "openland-y-runtime-api/AppBackgroundTaskApi";

class AppBackgroundTaskImpl implements AppBackgroundTaskApi {

    setTimeout(task: any, timeout?: any) {
        return -1;
    }
    setInterval(task: () => void, timeout: number) {
        return -1;
    }
    clearTimeout(id: number): void {
        //
    }
    clearInterval(id: number) {
        //
    }

}

export const AppBackgroundTask = new AppBackgroundTaskImpl();