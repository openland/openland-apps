import { NativeModules } from 'react-native';

export const NativeDataView = NativeModules.RNAsyncDataViewManager as {
    dataViewInit(dataSourceKey: string, config: string, completed: boolean, completedForward: boolean, anchor: string | undefined): void
    dataViewAddItem(dataSourceKey: string, key: string, config: string, index: number, isAnchor: boolean): void
    dataViewUpdateItem(dataSourceKey: string, key: string, config: string, index: number): void
    dataViewRemoveItem(dataSourceKey: string, key: string, index: number): void
    dataViewMoveItem(dataSourceKey: string, key: string, fromIndex: number, toIndex: number): void
    dataViewLoadedMore(dataSourceKey: string, config: string, completed: boolean): void;
    dataViewLoadedMoreForward(dataSourceKey: string, config: string, completed: boolean): void;
    dataViewCompleted(dataSourceKey: string): void;
    dataViewScrollToKeyReqested(dataSourceKey: string, scrollToKey: string): void;
};