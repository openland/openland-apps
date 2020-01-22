import { resetClient } from './graphqlClient';
import { AppStorage } from './AppStorage';
import RNRestart from 'react-native-restart';
import { getMessenger } from './messenger';

export const logout = async () => {
    getMessenger().engine.destroy();
    resetClient();
    await AppStorage.clear();
    RNRestart.Restart();
};