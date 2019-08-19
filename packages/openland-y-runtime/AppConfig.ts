import { AppConfigApi } from 'openland-y-runtime-api/AppConfigApi';

class AppConfigStab implements AppConfigApi {
    getPlatform(): 'mobile' | 'desktop' | 'unknown' {
        return 'unknown';
    }
    isNonProduction() {
        return false;
    }
    setNonProduction(isNonProd: boolean) {
        //
    }
    isSuperAdmin() {
        return false;
    }
    setSuperAdmin(isSuper: boolean) {
        //
    }
}

export const AppConfig = new AppConfigStab();
