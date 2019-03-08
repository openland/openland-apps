import { AppPeerConnectionApi, AppPeerConnectionConfiguration } from 'openland-y-runtime-api/AppPeerConnectionApi';

export const AppPeerConnectionFactory: AppPeerConnectionApi = {
    createConnection(configuration: AppPeerConnectionConfiguration) {
        throw Error('Unsupported')
    }
};