import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import { getMessenger } from './messenger';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { randomEmptyPlaceholderEmoji } from './tolerance';
import { AsyncStorage } from 'react-native';
import { formatError } from 'openland-y-forms/errorHandling';
import { next } from 'openland-mobile/pages/auth/signup';

// import * as UrlParse from 'url-parse'
let urlParse = require('url-parse');
export let resolveInternalLink = (srcLink: string, fallback?: () => void) => {
    let link = srcLink.toLowerCase();
    // 
    // JOIN ROOMS
    //
    if (link.includes('openland.com/joinchannel/') || link.includes('openland://deep/joinroom/')) {
        return async () => {
            startLoader();
            try {
                let uuid = srcLink.split('/')[srcLink.split('/').length - 1];
                let info = await getMessenger().engine.client.queryRoomInviteInfo({ invite: uuid });
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
                let uuid = srcLink.split('/')[srcLink.split('/').length - 1];
                let info = await getMessenger().engine.client.queryAccountInviteInfo({ inviteKey: uuid });
                if (info && info.invite) {
                    let orgId = info.invite.orgId;
                    stopLoader();
                    Alert.builder()
                        .title('Invite to ' + info.invite.title)
                        .message((info.invite.creator ? info.invite.creator.name : 'someone') + ' invites you to join ' + info.invite.title)
                        .button('Cancel', 'cancel')
                        .action('Accept invitation', 'default', async () => {
                            await getMessenger().engine.client.mutateAccountInviteJoin({ inviteKey: uuid });
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
            let uuid = srcLink.split('/')[srcLink.split('/').length - 1];
            getMessenger().history.navigationManager.push('ProfileOrganization', { id: uuid });
        };
    }

    //
    // PROFILE USER
    //
    if (link.includes('openland.com/directory/u') || link.includes('openland.com/mail/u')) {
        return async () => {
            let uuid = srcLink.split('/')[srcLink.split('/').length - 1];
            getMessenger().history.navigationManager.push('ProfileUser', { id: uuid });
        };
    }

    //
    // SHORT_NAME
    //
    if (link.includes('openland.com/')) {
        let split = srcLink.split('openland.com/');
        let shortName = split[split.length - 1];
        if (!shortName.includes('/')) {
            return async () => {
                startLoader();
                try {
                    let info = await getMessenger().engine.client.queryResolveShortName({ shortname: shortName });
                    if (info && info.item) {
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

    //
    // Sharing
    //
    if (link.includes('openland://deep/share')) {
        try {
            let url = urlParse(srcLink, true);
            let dataStr = url.query.data;
            if (dataStr) {
                let data = JSON.parse(dataStr);

                getMessenger().history.navigationManager.pushAndReset('HomeDialogs', { share: data });
            } else {
                Alert.alert('Nothing to share ' + randomEmptyPlaceholderEmoji());
            }

        } catch (e) {
            Alert.alert(e.message);
        }
        // getMessenger().history.navigationManager.push('HomeDialogs', data);

    }

    return fallback;
};

export let saveLinkIfInvite = async (srcLink: string) => {
    let link = srcLink.toLowerCase();
    let keep =
        (link.includes('openland.com/joinchannel/') || link.includes('openland://deep/joinroom/')) ||
        (link.includes('openland.com/join/') || link.includes('openland://deep/joinorg/')) ||
        link.includes('openland.com/invite/')

    if (keep) {
        await AsyncStorage.setItem('initial_invite_link', srcLink);
    }
};

export const joinInviteIfHave = async () => {
    let srcLink = await AsyncStorage.getItem('initial_invite_link');
    let link = srcLink.toLowerCase();
    // 
    // JOIN ROOMS
    //
    if (link.includes('openland.com/joinchannel/') || link.includes('openland://deep/joinroom/')) {
        try {
            let uuid = srcLink.split('/')[srcLink.split('/').length - 1];
            startLoader();
            let info = await getMessenger().engine.client.queryRoomInviteInfo({ invite: uuid });
            stopLoader();
            if (info && info.invite) {
                Alert.builder()
                    .title('Invite to ' + info.invite.room.title)
                    .message(info.invite.invitedByUser.name + ' invites you to join ' + info.invite.room.title)
                    .button('Cancel', 'cancel')
                    .action('Accept invitation', 'default', async () => {
                        await getMessenger().engine.client.mutateRoomJoinInviteLink({ invite: uuid });
                        await next(getMessenger().history.navigationManager);
                    })
                    .show();
            } else {
                Alert.alert('Invite not found');
            }
        } catch (e) {
            stopLoader();
            Alert.alert(formatError(e));
        }
    }

    //
    // JOIN ORGANIZATION
    //
    if (link.includes('openland.com/join/') || link.includes('openland://deep/joinorg/')) {
        try {
            let uuid = srcLink.split('/')[srcLink.split('/').length - 1];
            stopLoader();
            let info = await getMessenger().engine.client.queryAccountInviteInfo({ inviteKey: uuid });
            stopLoader();
            if (info && info.invite) {
                let orgId = info.invite.orgId;
                Alert.builder()
                    .title('Invite to ' + info.invite.title)
                    .message((info.invite.creator ? info.invite.creator.name : 'someone') + ' invites you to join ' + info.invite.title)
                    .button('Cancel', 'cancel')
                    .action('Accept invitation', 'default', async () => {
                        await getMessenger().engine.client.mutateAccountInviteJoin({ inviteKey: uuid });
                        await next(getMessenger().history.navigationManager);
                    })
                    .show();
            } else {
                Alert.alert('Invite not found');
            }
        } catch (e) {
            stopLoader();
            Alert.alert(formatError(e));
        }
    }

    //
    // JOIN GLOBAL INVITE
    //
    if (link.includes('openland.com/invite')) {
        try {
            let uuid = srcLink.split('/')[srcLink.split('/').length - 1];
            startLoader();
            await getMessenger().engine.client.mutateOrganizationActivateByInvite({ inviteKey: uuid });
            await next(getMessenger().history.navigationManager);
            stopLoader();
        } catch (e) {
            stopLoader();
            Alert.alert(formatError(e));
        }
    }

    await AsyncStorage.removeItem('initial_invite_link');

}
