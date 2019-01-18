import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import { getMessenger } from './messenger';
import { RoomInviteInfoQuery, AccountInviteInfoQuery, OrganizationActivateByInviteMutation, AccountInviteJoinMutation, ResolveShortNameQuery } from 'openland-api';
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
    // waiting fot web implement org invite page
    if (link.includes('openland.com/join/') || link.includes('openland://deep/joinorg/')) {
        return async () => {
            startLoader();
            try {
                let uuid = link.split('/')[link.split('/').length - 1];
                let info: any = await getMessenger().engine.client.client.query({ query: AccountInviteInfoQuery.document, variables: { inviteKey: uuid } });
                if (info.data && info.data.invite) {
                    let orgId = info.data.invite.orgId;
                    stopLoader();
                    Alert.alert(
                        'Invite to ' + info.data.invite.title,
                        info.data.invite.creator.name + ' invites you to join ' + info.data.invite.title,
                        [
                            { text: 'Cancel', style: 'cancel' },
                            {
                                text: 'Accept invitation', onPress: async () => {
                                    startLoader();
                                    let res = await getMessenger().engine.client.client.mutate({ mutation: AccountInviteJoinMutation.document, variables: { inviteKey: uuid } });
                                    getMessenger().history.navigationManager.push('ProfileOrganization', { id: orgId });
                                    stopLoader();
                                }
                            }
                        ]);
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
    // PROFILE ORGANIZATION
    //
    if (link.includes('openland.com/directory/o') || link.includes('openland.com/mail/o')) {
        return async () => {
            let uuid = link.split('/')[link.split('/').length - 1];
            getMessenger().history.navigationManager.push('ProfileOrganization', { id: uuid });
        };
    }

    //
    // PROFILE USER
    //
    if (link.includes('openland.com/directory/u') || link.includes('openland.com/mail/u')) {
        return async () => {
            let uuid = link.split('/')[link.split('/').length - 1];
            getMessenger().history.navigationManager.push('ProfileUser', { id: uuid });
        };
    }

    //
    // SHORT_NAME
    //
    if (link.includes('openland.com/')) {
        let split = link.split('openland.com/');
        let shortName = split[split.length - 1];
        if (!shortName.includes('/')) {
            return async () => {
                startLoader();
                try {
                    let info: any = await getMessenger().engine.client.client.query({ query: ResolveShortNameQuery.document, variables: { shortname: shortName } });
                    if (info.data) {
                        if (info.data.item.__typename === 'User') {
                            getMessenger().history.navigationManager.pushAndReset('ProfileUser', { id: info.data.item.id });
                        } else if (info.data.item.__typename === 'Organization') {
                            getMessenger().history.navigationManager.pushAndReset('ProfileOrganization', { id: info.data.item.id });
                        }
                    }
                } catch (e) {
                    Alert.alert(e.message);
                }
                stopLoader();
            };
        }
    }

    return fallback;
};