import { AppBackgroundTaskApi } from "openland-y-runtime-api/AppBackgroundTaskApi";
import BackgroundTimer from 'react-native-background-timer';

class AppBackgroundTaskImpl implements AppBackgroundTaskApi {
    setTimeout(task: any, timeout?: any) {
        return BackgroundTimer.setTimeout(task, timeout);
    }
    setInterval(task: () => void, timeout: number) {
        return BackgroundTimer.setInterval(task, timeout);
    }
    clearInterval(id: number): void {
        BackgroundTimer.clearInterval(id);
    }
    clearTimeout(id: number): void {
        BackgroundTimer.clearTimeout(id);
    }

}

export const AppBackgroundTask = new AppBackgroundTaskImpl();