import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import { getMessenger } from './messenger';
import { RoomInviteInfoQuery } from 'openland-api';
import { Alert } from 'react-native';

export let resolveInternalLink = (link: string, fallback?: () => void) => {
    // 
    // JOIN ROOMS
    //
    if (link.includes('openland.com/joinChannel/') || link.includes('openland://deep/joinroom/')) {
        return async () => {
            startLoader();
            try {
                let uuid = link.split('/')[link.split('/').length - 1];
                let info: any = await getMessenger().engine.client.client.query({ query: RoomInviteInfoQuery.document, variables: { invite: uuid } });
                if (info.data && info.data.invite) {
                    let roomId = info.data.invite.room.id;
                    getMessenger().history.navigationManager.pushAndReset('Conversation', { flexibleId: roomId, invite: uuid });
                } else {
                    Alert.alert('Invite not found');
                }
            } catch (e) {
                Alert.alert(e.message);
            }
            stopLoader();
        };
    }

    //
    // JOIN ORGANIZATION
    //
    return fallback;
};