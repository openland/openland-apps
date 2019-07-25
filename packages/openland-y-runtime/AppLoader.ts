import { AppLoaderApi } from 'openland-y-runtime-api/AppLoaderApi';

export class AppLoaderStub implements AppLoaderApi {
    start() {
        // Do nothing
    }
    stop() {
        // Do nothing
    }
}

export const AppLoader = new AppLoaderStub();
