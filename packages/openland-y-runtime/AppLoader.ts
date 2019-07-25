import { AppLoaderApi } from 'openland-y-runtime-api/AppLoaderApi';

export class AppLoaderStub implements AppLoaderApi {
    appLoaderStart() {
        // Do nothing
    }
    appLoaderStop() {
        // Do nothing
    }
}

export const AppLoader = new AppLoaderStub();
