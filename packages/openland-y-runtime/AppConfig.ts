import { AppConfigApi } from 'openland-y-runtime-api/AppConfigApi';

class AppConfigStab implements AppConfigApi {
    isNonProduction() {
        return false;
    };
    setNonProduction(isNonProd: boolean) {
        //
    };
}

export const AppConfig = new AppConfigStab();
