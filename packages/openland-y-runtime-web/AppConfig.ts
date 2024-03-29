import { AppConfigApi } from 'openland-y-runtime-api/AppConfigApi';

class AppConfigImpl implements AppConfigApi {
    isNonProd = false;
    isSuper = false;
    isNonProduction = () => this.isNonProd;
    setNonProduction = (isNonProd: boolean) => this.isNonProd = isNonProd;
    isSuperAdmin = () => this.isSuper;
    setSuperAdmin = (isSuper: boolean) => this.isSuper = isSuper;
    getPlatform(): 'mobile' | 'desktop' | 'unknown' {
        return 'desktop';
    }
}

export const AppConfig = new AppConfigImpl();
