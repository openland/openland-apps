export interface AppVisibilityApi {
    isVisible: boolean;
    watch(handler: (isVisible: boolean) => void): void;
    unwatch(handler: (isVisible: boolean) => void): void;
}