import * as React from 'react';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import gql from 'graphql-tag';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { backoff } from 'openland-y-utils/timer';
import { AppNotifications } from 'openland-y-runtime-native/AppNotifications';
import { logger } from 'openland-y-utils/logger';

const RegisterPush = gql`
    mutation RegisterPush($endpoint: String!, $type: PushType!) {
        registerPush(endpoint: $endpoint, type: $type)
    }
`;

const log = logger('push');

class PushRegistrator {
    private client: OpenApolloClient;
    constructor(client: OpenApolloClient) {
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
            await backoff(async () => await this.client.client.mutate({
                mutation: RegisterPush,
                variables: {
                    endpoint: JSON.stringify(endpoint),
                    type: Platform.OS === 'ios' ? 'IOS' : 'ANDROID'
                }
            }));
            log.log('Token registered successfully');
        }
    }
}

var registrator: PushRegistrator | null = null;

export class PushManager extends React.PureComponent<{ client: OpenApolloClient }> {

    componentDidMount() {
        if (registrator === null) {
            registrator = new PushRegistrator(this.props.client);
        }
    }

    render() {
        return null;
    }
}