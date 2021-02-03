import { resetClient } from './graphqlClient';
import { AppStorage } from './AppStorage';
import RNRestart from 'react-native-restart';
import { getMessenger } from './messenger';

export const logout = async () => {
    try {
        getMessenger().engine.destroy();
    } catch (e) {
        console.log(e);
    }

    resetClient();
    await AppStorage.clear();
    RNRestart.Restart();
};