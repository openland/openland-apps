import { AppConfigApi } from 'openland-y-runtime-api/AppConfigApi';

class AppConfigImpl implements AppConfigApi {
    isNonProd = false;
    isNonProduction = () => this.isNonProd;
    setNonProduction = (isNonProd: boolean) => this.isNonProd = isNonProd;
}

export const AppConfig = new AppConfigImpl();
