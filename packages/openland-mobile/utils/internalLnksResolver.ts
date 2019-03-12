import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import { getMessenger } from './messenger';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { randomEmptyPlaceholderEmoji } from './tolerance';
import { AsyncStorage } from 'react-native';
import { formatError } from 'openland-y-forms/errorHandling';
import { next } from 'openland-mobile/pages/auth/signup';
import UrlPattern from 'url-pattern';
import UrlParse from 'url-parse';

export let resolveInternalLink = (srcLink: string, fallback?: () => void) => {
    return async () => {
        let resolved = false;
        let link = srcLink;
        if (link.includes('?')) {
            link = link.split('?')[0]
        }
        let patternBase = '(http(s)\\://)(:subdomain.)openland.com/';
        let patternBaseDeep = 'openland\\://deep/';

        // 
        // JOIN ROOMS
        //
        try {
            let roomInvitePattern = new UrlPattern(patternBase + 'joinChannel/:invite');
            let roomInvitePatternDeep = new UrlPattern(patternBaseDeep + 'joinroom/:invite');
            let match = roomInvitePattern.match(link) || roomInvitePatternDeep.match(srcLink);

            if (match && match.invite) {
                resolved = true;
                startLoader();
                try {
                    let info = await getMessenger().engine.client.queryRoomInviteInfo({ invite: match.invite });
                    if (info && info.invite) {
                        let roomId = info.invite.room.id;
                        getMessenger().history.navigationManager.pushAndReset('Conversation', { flexibleId: roomId, invite: match.invite });
                    } else {
                        Alert.alert('Invite not found');
                    }
                } catch (e) {
                    Alert.alert(e.message);
                }
                stopLoader();
            }
        } catch (e) {
            Alert.alert(e.message);
        }

        //
        // JOIN ORGANIZATION
        //
        let orgInvitePattern = new UrlPattern(patternBase + 'join/:invite');
        let orgInvitePatternDeep = new UrlPattern(patternBaseDeep + 'joinorg/:invite');
        let matchOrg = orgInvitePattern.match(link) || orgInvitePatternDeep.match(srcLink);

        if (matchOrg && matchOrg.invite) {
            resolved = true;
            startLoader();
            try {
                let info = await getMessenger().engine.client.queryAccountInviteInfo({ inviteKey: matchOrg.invite });
                if (info && info.invite) {
                    let orgId = info.invite.orgId;
                    stopLoader();
                    Alert.builder()
                        .title('Invite to ' + info.invite.title)
                        .message((info.invite.creator ? info.invite.creator.name : 'someone') + ' invites you to join ' + info.invite.title)
                        .button('Cancel', 'cancel')
                        .action('Accept invitation', 'default', async () => {
                            await getMessenger().engine.client.mutateAccountInviteJoin({ inviteKey: matchOrg.invite });
                        })
                        .show();
                } else {
                    Alert.alert('Invite not found');
                }
            } catch (e) {
                Alert.alert(e.message);
            }
            stopLoader();
        }

        //
        // PROFILE ORGANIZATION
        //
        let profileOrgPattern = new UrlPattern(patternBase + '(mail)(directory)/o/:id');
        let matchOrgProfile = profileOrgPattern.match(link);
        if (matchOrgProfile && matchOrgProfile.id) {
            resolved = true;
            getMessenger().history.navigationManager.push('ProfileOrganization', { id: matchOrgProfile.id });
        }

        //
        // PROFILE USER
        //
        let profileUserPattern = new UrlPattern(patternBase + '(mail)(directory)/u/:id');
        let matchUserProfile = profileUserPattern.match(link);
        if (matchUserProfile && matchUserProfile.id) {
            resolved = true;
            getMessenger().history.navigationManager.push('ProfileUser', { id: matchUserProfile.id });
        }

        //
        // PROFILE GROUP
        //
        let profileGroupPattern = new UrlPattern(patternBase + '(mail)(directory)/p/:id');
        let matchGroupProfile = profileGroupPattern.match(link);
        if (matchGroupProfile && matchGroupProfile.id) {
            resolved = true;
            getMessenger().history.navigationManager.push('ProfileGroup', { id: matchGroupProfile.id });
        }

        //
        // CONVERSATION
        //
        let conversationPattern = new UrlPattern(patternBase + 'mail/:id');
        let matchConversation = conversationPattern.match(link);
        if (matchConversation && matchConversation.id) {
            resolved = true;
            getMessenger().history.navigationManager.push('Conversation', { id: matchConversation.id });
        }

        //
        // SHORT_NAME
        //
        let shortNamePattern = new UrlPattern(patternBase + ':shortname');
        let matchShortName = shortNamePattern.match(link.toLowerCase());
        if (matchShortName && matchShortName.shortname) {
            resolved = true;
            startLoader();
            try {
                let info = await getMessenger().engine.client.queryResolveShortName({ shortname: matchShortName.shortname });
                if (info && info.item) {
                    if (info.item.__typename === 'User') {
                        getMessenger().history.navigationManager.pushAndReset('ProfileUser', { id: info.item.id });
                    } else if (info.item.__typename === 'Organization') {
                        getMessenger().history.navigationManager.pushAndReset('ProfileOrganization', { id: info.item.id });
                    } else {
                        Alert.alert('No such user or organization')
                    }
                }
            } catch (e) {
                Alert.alert(e.message);
            }
            stopLoader();
        }

        //
        // Sharing
        //
        let sharePattern = new UrlPattern(patternBaseDeep + 'share');
        let matchShare = sharePattern.match(link);
        if (matchShare) {
            resolved = true;
            try {
                let url = new UrlParse(srcLink, true);
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

        }

        if (!resolved && fallback) {
            await fallback();
        }
    }
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
    if (link.includes('?')) {
        link = link.split('?')[0]
    }
    let patternBase = '(http(s)\\://)(:subdomain.)openland.com/';
    let patternBaseDeep = 'openland\\://deep/';
    // 
    // JOIN ROOMS
    //
    let roomInvitePattern = new UrlPattern(patternBase + 'joinChannel/:invite');
    let roomInvitePatternDeep = new UrlPattern(patternBaseDeep + 'joinroom/:invite');
    let match = roomInvitePattern.match(link) || roomInvitePatternDeep.match(srcLink);
    if (match && match.invite) {
        try {
            startLoader();
            let info = await getMessenger().engine.client.queryRoomInviteInfo({ invite: match.invite });
            stopLoader();
            if (info && info.invite) {
                Alert.builder()
                    .title('Invite to ' + info.invite.room.title)
                    .message(info.invite.invitedByUser.name + ' invites you to join ' + info.invite.room.title)
                    .button('Cancel', 'cancel')
                    .action('Accept invitation', 'default', async () => {
                        await getMessenger().engine.client.mutateRoomJoinInviteLink({ invite: match.invite });
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
    let orgInvitePattern = new UrlPattern(patternBase + 'join/:invite');
    let orgInvitePatternDeep = new UrlPattern(patternBaseDeep + 'joinorg/:invite');
    let matchOrg = orgInvitePattern.match(link) || orgInvitePatternDeep.match(srcLink);
    if (matchOrg && matchOrg.invite) {
        try {
            stopLoader();
            let info = await getMessenger().engine.client.queryAccountInviteInfo({ inviteKey: matchOrg.invite });
            stopLoader();
            if (info && info.invite) {
                let orgId = info.invite.orgId;
                Alert.builder()
                    .title('Invite to ' + info.invite.title)
                    .message((info.invite.creator ? info.invite.creator.name : 'someone') + ' invites you to join ' + info.invite.title)
                    .button('Cancel', 'cancel')
                    .action('Accept invitation', 'default', async () => {
                        await getMessenger().engine.client.mutateAccountInviteJoin({ inviteKey: matchOrg.invite });
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
    let globalInvitePattern = new UrlPattern(patternBase + 'invite/:invite');
    let matchGlobal = globalInvitePattern.match(link);
    if (matchGlobal && matchGlobal.invite) {
        try {
            startLoader();
            await getMessenger().engine.client.mutateOrganizationActivateByInvite({ inviteKey: matchGlobal.invite });
            await next(getMessenger().history.navigationManager);
            stopLoader();
        } catch (e) {
            stopLoader();
            Alert.alert(formatError(e));
        }
    }

    await AsyncStorage.removeItem('initial_invite_link');

}
