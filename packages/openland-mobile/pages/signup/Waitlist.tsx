import * as React from 'react';
import { getSignupModel } from './signup';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

export class WaitlistComponent extends React.PureComponent<PageProps> {

    handleLogout = () => {
        // (async () => {
        //     AsyncStorage.clear();
        //     AppUpdateTracker.restartApp();
        // })();
        getSignupModel().onComplete();
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