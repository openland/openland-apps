import { AppLoaderApi } from 'openland-y-runtime-api/AppLoaderApi';
import Toast from 'openland-mobile/components/Toast';

export class AppLoaderStub implements AppLoaderApi {
    loader: { show: () => void; hide: () => void };

    constructor() {
        this.loader = Toast.loader();
    }

    appLoaderStart() {
        this.loader.show();
    }
    appLoaderStop() {
        this.loader.hide();
    }
}

export const AppLoader = new AppLoaderStub();
