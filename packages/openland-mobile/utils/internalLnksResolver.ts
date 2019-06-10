import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import { getMessenger } from './messenger';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { randomEmptyPlaceholderEmoji } from './tolerance';
import { AsyncStorage } from 'react-native';
import { formatError } from 'openland-y-forms/errorHandling';
import { next } from 'openland-mobile/pages/auth/signup';
import UrlPattern from 'url-pattern';
import UrlParse from 'url-parse';
import { ResolvedInvite_invite_RoomInvite, ResolvedInvite_invite_InviteInfo } from 'openland-api/Types';

export let resolveInternalLink = (srcLink: string, fallback?: () => void) => {
    return async () => {
        let resolved = false;
        let link = srcLink;
        if (link.includes('?')) {
            link = link.split('?')[0]
        }
        let patternBase = '(http(s)\\://)(:subdomain.)openland.com/';
        let patternBaseDeep = 'openland\\://deep/';

        ////
        ////  >>>>> INVITES
        ////

        let joinRoom = async (invite: Partial<ResolvedInvite_invite_RoomInvite> | null, key: string) => {
            try {
                if (invite && invite.room) {
                    if (invite.room.membership === 'MEMBER') {
                        getMessenger().history.navigationManager.pushAndReset('Conversation', { id: invite.room.id });
                    } else {
                        getMessenger().history.navigationManager.push('GroupInvite', { invite: invite, inviteId: key });
                    }
                } else {
                    Alert.alert('Invite not found');
                }
            } catch (e) {
                Alert.alert(e.message);
            }
        }

        let joinOraganizaion = async (invite: Partial<ResolvedInvite_invite_InviteInfo> | null, key: string) => {
            if (invite) {
                stopLoader();
                Alert.builder()
                    .title('Invite to ' + invite.title)
                    .message((invite.creator ? invite.creator.name : 'someone') + ' invites you to join ' + invite.title)
                    .button('Cancel', 'cancel')
                    .action('Accept invitation', 'default', async () => {
                        await getMessenger().engine.client.mutateAccountInviteJoin({ inviteKey: key });
                    })
                    .show();
            } else {
                Alert.alert('Invite not found');
            }
        }

        //
        // GENERIC INVITE
        //
        try {
            let genericInvitePattern = new UrlPattern(patternBase + 'invite/:invite');
            let match = genericInvitePattern.match(link);

            if (match && match.invite) {
                resolved = true;
                startLoader();
                try {
                    let info = await getMessenger().engine.client.queryResolvedInvite({ key: match.invite });
                    if (info.invite) {
                        if (info.invite.__typename === 'RoomInvite') {
                            await joinRoom(info.invite, match.invite);
                        } else if (info.invite.__typename === 'InviteInfo') {
                            await joinOraganizaion(info.invite, match.invite);
                        }
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

        // DEPRICATED, delete after adoption, web + mobile link generation migration
        // JOIN ROOMS 
        //
        try {
            let roomInvitePattern = new UrlPattern(patternBase + 'joinChannel/:invite');
            let roomInvitePatternDeep = new UrlPattern(patternBaseDeep + 'joinroom/:invite');
            let match = roomInvitePattern.match(link) || roomInvitePatternDeep.match(srcLink);

            if (match && match.invite) {
                resolved = true;
                startLoader()
                let info = await getMessenger().engine.client.queryRoomInviteInfo({ invite: match.invite });
                await joinRoom(info.invite, match.invite);
                stopLoader();
            }
        } catch (e) {
            Alert.alert(e.message);
        }

        // DEPRICATED, delete after adoption, web + mobile link generation migration
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
                await joinOraganizaion(info.invite, matchOrg.invite);
            } catch (e) {
                Alert.alert(e.message);
            }
            stopLoader();
        }

        ////
        ////  <<<<< INVITES
        ////

        //
        // PROFILE ORGANIZATION
        //
        let profileOrgPattern = new UrlPattern(patternBase + '(mail)(discover)/(o)(c)/:id');
        let matchOrgProfile = profileOrgPattern.match(link);
        if (matchOrgProfile && matchOrgProfile.id) {
            resolved = true;
            getMessenger().history.navigationManager.push('ProfileOrganization', { id: matchOrgProfile.id });
        }

        //
        // PROFILE USER
        //
        let profileUserPattern = new UrlPattern(patternBase + '(mail)(discover)/u/:id');
        let matchUserProfile = profileUserPattern.match(link);
        if (matchUserProfile && matchUserProfile.id) {
            resolved = true;
            getMessenger().history.navigationManager.push('ProfileUser', { id: matchUserProfile.id });
        }

        //
        // PROFILE GROUP
        //
        let profileGroupPattern = new UrlPattern(patternBase + '(mail)(discover)/p/:id');
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

    let link = srcLink;
    if (link.includes('?')) {
        link = link.split('?')[0]
    }
    let patternBase = '(http(s)\\://)(:subdomain.)openland.com/';
    let patternBaseDeep = 'openland\\://deep/';

    let joinRoom = async (invite: Partial<ResolvedInvite_invite_RoomInvite> | null, key: string) => {
        if (invite && invite.room && invite.invitedByUser) {
            Alert.builder()
                .title('Invite to ' + invite.room.title)
                .message(invite.invitedByUser.name + ' invites you to join ' + invite.room.title)
                .button('Cancel', 'cancel')
                .action('Accept invitation', 'default', async () => {
                    await getMessenger().engine.client.mutateRoomJoinInviteLink({ invite: key });
                    await next(getMessenger().history.navigationManager);
                })
                .show();
        } else {
            Alert.alert('Invite not found');
        }
    }

    let joinOraganizaion = async (invite: Partial<ResolvedInvite_invite_InviteInfo> | null, key: string) => {
        if (invite) {
            Alert.builder()
                .title('Invite to ' + invite.title)
                .message((invite.creator ? invite.creator.name : 'someone') + ' invites you to join ' + invite.title)
                .button('Cancel', 'cancel')
                .action('Accept invitation', 'default', async () => {
                    await getMessenger().engine.client.mutateAccountInviteJoin({ inviteKey: key });
                    await next(getMessenger().history.navigationManager);
                })
                .show();
        } else {
            Alert.alert('Invite not found');
        }
    }

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
            await joinRoom(info.invite, match.invite);
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
            startLoader();
            let info = await getMessenger().engine.client.queryAccountInviteInfo({ inviteKey: matchOrg.invite });
            stopLoader();
            await joinOraganizaion(info.invite, matchOrg.invite);
        } catch (e) {
            stopLoader();
            Alert.alert(formatError(e));
        }
    }

    //
    // JOIN GENERIC INVITE
    //
    let globalInvitePattern = new UrlPattern(patternBase + 'invite/:invite');
    let matchGlobal = globalInvitePattern.match(link);
    if (matchGlobal && matchGlobal.invite) {
        try {
            startLoader();
            let info = await getMessenger().engine.client.queryResolvedInvite({ key: matchGlobal.invite });
            if (info.invite) {
                if (info.invite.__typename === 'AppInvite') {
                    await getMessenger().engine.client.mutateOrganizationActivateByInvite({ inviteKey: matchGlobal.invite });
                    await next(getMessenger().history.navigationManager);
                    stopLoader();
                } else if (info.invite.__typename === 'InviteInfo') {
                    await joinOraganizaion(info.invite, matchGlobal.invite);
                    stopLoader();
                } else if (info.invite.__typename === 'RoomInvite') {
                    await joinRoom(info.invite, matchGlobal.invite);
                    stopLoader();
                }
            } else {
                stopLoader();
                Alert.alert('Invite not found');
            }
        } catch (e) {
            stopLoader();
            Alert.alert(formatError(e));
        }
    }

    await AsyncStorage.removeItem('initial_invite_link');

}
