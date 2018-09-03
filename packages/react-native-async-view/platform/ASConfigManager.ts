import { NativeModules } from 'react-native';
export const RNAsyncConfigManager = NativeModules.RNAsyncConfigManager as {
    setConfig: (key: string, config: string) => void,
    setSuspended: (key: string, suspended: boolean) => void
};