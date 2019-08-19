export interface AppConfigApi {
    isNonProduction(): boolean;
    setNonProduction(isNonProd: boolean): void;
    isSuperAdmin(): boolean;
    setSuperAdmin(isSuper: boolean): void;
    getPlatform(): 'mobile' | 'desktop' | 'unknown';
}
