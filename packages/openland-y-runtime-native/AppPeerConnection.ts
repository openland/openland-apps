import { AppPeerConnectionApi, AppPeerConnectionConfiguration } from 'openland-y-runtime-api/AppPeerConnectionApi';

// class AppPeerConnectionNative implements AppPeerConnection {
    
//     onicecandidate: ((ev: { candidate?: string }) => void) | undefined = undefined;

//     addIceCandidate = (candidate: string) => {
//         throw Error('');
//     }

//     close() {
//         throw Error('');
//     }
// }

export const AppPeerConnectionFactory: AppPeerConnectionApi = {
    createConnection(configuration: AppPeerConnectionConfiguration) {
        throw Error('Unsupported')
    }
};