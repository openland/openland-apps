import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import { getMessenger } from './messenger';
import { RoomInviteInfoQuery, AccountInviteInfoQuery, OrganizationActivateByInviteMutation, AccountInviteJoinMutation, ResolveShortNameQuery } from 'openland-api';
import { Alert } from 'openland-mobile/components/AlertBlanket';

export let resolveInternalLink = (link: string, fallback?: () => void) => {
    // 
    // JOIN ROOMS
    //
    if (link.includes('openland.com/joinChannel/') || link.includes('openland://deep/joinroom/')) {
        return async () => {
            startLoader();
            try {
                let uuid = link.split('/')[link.split('/').length - 1];
                let info: any = await getMessenger().engine.client.query(RoomInviteInfoQuery, { invite: uuid });
                if (info && info.invite) {
                    let roomId = info.invite.room.id;
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
                let info: any = await getMessenger().engine.client.query(AccountInviteInfoQuery, { inviteKey: uuid });
                if (info && info.invite) {
                    let orgId = info.invite.orgId;
                    stopLoader();
                    Alert.builder()
                        .title('Invite to ' + info.invite.title)
                        .message(info.invite.creator.name + ' invites you to join ' + info.invite.title)
                        .button('Cancel', 'cancel')
                        .action('Accept invitation', 'default', async () => {
                            await getMessenger().engine.client.mutate(AccountInviteJoinMutation, { inviteKey: uuid });
                        })
                        .show();
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
                    let info: any = await getMessenger().engine.client.query(ResolveShortNameQuery, { shortname: shortName });
                    if (info) {
                        if (info.item.__typename === 'User') {
                            getMessenger().history.navigationManager.pushAndReset('ProfileUser', { id: info.item.id });
                        } else if (info.item.__typename === 'Organization') {
                            getMessenger().history.navigationManager.pushAndReset('ProfileOrganization', { id: info.item.id });
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