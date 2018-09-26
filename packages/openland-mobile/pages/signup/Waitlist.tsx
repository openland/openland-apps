import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { AsyncStorage } from 'react-native';
import { AppUpdateTracker } from '../../utils/UpdateTracker';

export class WaitlistComponent extends React.PureComponent<PageProps> {

    handleLogout = () => {
        (async () => {
            AsyncStorage.clear();
            AppUpdateTracker.restartApp();
        })();
    }

    render() {
        return (
            <>
                <SHeader title="Waitlist" />
                <SHeaderButton title="Logout" onPress={() => this.handleLogout()} />
            </>
        );
    }
}

export const Waitlist = withApp(WaitlistComponent);