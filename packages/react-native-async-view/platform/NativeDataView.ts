import { NativeModules } from 'react-native';

export const NativeDataView = NativeModules.RNAsyncDataViewManager as {
    dataViewInit(dataSourceKey: string, config: string, completed: boolean): void
    dataViewAddItem(dataSourceKey: string, key: string, config: string, index: number): void
    dataViewUpdateItem(dataSourceKey: string, key: string, config: string, index: number): void
    dataViewRemoveItem(dataSourceKey: string, key: string, index: number): void
    dataViewMoveItem(dataSourceKey: string, key: string, fromIndex: number, toIndex: number): void
    dataViewLoadedMore(dataSourceKey: string, config: string, completed: boolean): void;
    dataViewCompleted(dataSourceKey: string): void;
};