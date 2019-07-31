import { AppLoaderApi } from 'openland-y-runtime-api/AppLoaderApi';
import Toast from 'openland-mobile/components/Toast';

export class AppLoaderStub implements AppLoaderApi {
    private loader: { show: () => void; hide: () => void };

    constructor() {
        this.loader = Toast.loader();
    }

    start() {
        this.loader.show();
    }
    stop() {
        this.loader.hide();
    }
}

export const AppLoader = new AppLoaderStub();
