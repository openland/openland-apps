export interface AppConfigApi {
    isNonProduction(): boolean;
    setNonProduction(isNonProd: boolean): void;
}
