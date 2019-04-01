import * as React from 'react';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { backoff } from 'openland-y-utils/timer';
import { AppNotifications } from 'openland-y-runtime-native/AppNotifications';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { PushType } from 'openland-api/Types';
import { createLogger } from 'mental-log';

const log = createLogger('Engine-Push');

class PushRegistrator {
    private client: OpenlandClient;
    constructor(client: OpenlandClient) {
        this.client = client;
        log.log('Requesting permission');
        AppNotifications.requestPermission();
        log.log('Waiting for push token');
        AppNotifications.onPushRegistered((token: string) => {
            this.handleRegistration(token);
        });
    }

    handleRegistration = async (token: string) => {
        log.log('Token received');
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            let bundleId = DeviceInfo.getBundleId();
            let sandbox = __DEV__;
            let endpoint = {
                bundleId: bundleId,
                token: token,
                sandbox: sandbox
            };
            log.log('Registering endpoint' + (sandbox ? ' [sandbox]' : ''));
            await backoff(async () => await this.client.mutateRegisterPush({
                endpoint: JSON.stringify(endpoint),
                type: Platform.OS === 'ios' ? PushType.IOS : PushType.ANDROID
            }));
            log.log('Token registered successfully');
        }
    }
}

var registrator: PushRegistrator | null = null;

export class PushManager extends React.PureComponent<{ client: OpenlandClient }> {

    componentDidMount() {
        if (registrator === null) {
            registrator = new PushRegistrator(this.props.client);
        }
    }

    render() {
        return null;
    }
}