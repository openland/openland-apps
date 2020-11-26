import { getMessenger } from './messenger';
import Alert from 'openland-mobile/components/AlertBlanket';
import { randomEmptyPlaceholderEmoji } from './tolerance';
import { AsyncStorage } from 'react-native';
import { formatError } from 'openland-y-forms/errorHandling';
import { next } from 'openland-mobile/pages/auth/signup';
import UrlPattern from 'url-pattern';
import UrlParse from 'url-parse';
import { ResolvedInvite_invite_RoomInvite, AccountInviteInfo_invite } from 'openland-api/spacex.types';
import { publicPaths } from 'openland-y-utils/publicPaths';
import Toast from 'openland-mobile/components/Toast';
import { AppLoader } from 'openland-y-runtime/AppLoader';
import { isInternalLink } from 'openland-y-utils/isInternalLink';

export let resolveInternalLink = (srcLink: string, fallback?: () => void, reset?: boolean) => {
    return async () => {
        if (!srcLink.startsWith('openland://deep/') && !isInternalLink(srcLink)) {
            if (fallback) {
                await fallback();
            }
            return;
        }

        const loader = Toast.loader();
        let link = srcLink;
        if (link.includes('?')) {
            link = link.split('?')[0];
        }

        if (link.endsWith('/')) {
            link = link.substr(0, link.length - 1);
        }
        let patternBase = '(http(s)\\://)(:subdomain.)openland.com/';
        let patternBaseDeep = 'openland\\://deep/';

        let navigate = getMessenger().history.navigationManager.push;
        if (reset) {
            navigate = getMessenger().history.navigationManager.pushAndReset;
        }
        ////
        //// PAGES
        ////
        const pages: { [key: string]: { route: string, callback?: Function, params?: Object } | undefined } = {
            'mail': { route: 'Home', callback: () => getMessenger().history.navigationManager.pushAndResetRoot("Home") },
            'settings/email': { route: 'SettingsEmail' },
            'wallet': { route: 'Wallet' },
            'discover': { route: 'Explore' },
            'discover/home': { route: 'Explore' },
            'discover/new': { route: 'DiscoverListing', params: { type: 'new' } },
            'discover/popular': { route: 'DiscoverListing', params: { type: 'popular' } },
            'discover/collections': { route: 'Collections' },
            'discover/premium': { route: 'DiscoverListing', params: { type: 'top-premium' } },
            'discover/free': { route: 'DiscoverListing', params: { type: 'top-free' } },
            'discover/recommendations': { route: 'DiscoverListing', params: { type: 'recommendations' } },
            'discover/top-communities': { route: 'DiscoverListing', params: { type: 'top-orgs' } },
            'discover/new-communities': { route: 'DiscoverListing', params: { type: 'new-orgs' } },
            'account/licenses': { route: 'SettingsLicenses' },
            'settings/licenses': { route: 'SettingsLicenses' },
        };

        let pagePattern = /(http(s)?\:\/\/)?(.*\.)?openland\.com\/(.*)/g;
        let matchPage = pagePattern.exec(link);

        if (matchPage && matchPage[4]) {
            const page = pages[matchPage[4]];
            if (page) {
                if (page.callback) {
                    page.callback();
                } else {
                    navigate(page.route, page.params);
                }
                return;
            }
        }

        ////
        ////  >>>>> INVITES
        ////

        let joinRoom = async (invite: Partial<ResolvedInvite_invite_RoomInvite> | null, key: string) => {
            try {
                if (invite && invite.room) {
                    if (invite.room.membership === 'MEMBER') {
                        getMessenger().history.navigationManager.pushAndReset('Conversation', { id: invite.room.id });
                    } else {
                        navigate('GroupInvite', { invite: invite, inviteId: key });
                    }
                } else {
                    Alert.alert('Invite not found');
                }
            } catch (e) {
                Alert.alert(e.message);
            }
        };

        let joinOraganizaion = async (invite: Partial<AccountInviteInfo_invite> | null, key: string) => {
            if (invite) {
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
        };

        //
        // GENERIC INVITE
        //
        try {
            // Sorry universe. Ugly fix for PLN-546
            let processedLink = link.endsWith('.') ? (link.slice(0, link.length - 1)) : link;

            let genericInvitePattern = new UrlPattern(patternBase + 'invite/:invite');
            let genericInvitePatternDeep = new UrlPattern(patternBaseDeep + 'invite/:invite');
            let genericInviteMatch = genericInvitePattern.match(processedLink) || genericInvitePatternDeep.match(processedLink);
            if (genericInviteMatch && genericInviteMatch.invite) {
                loader.show();
                try {
                    let info = await getMessenger().engine.client.queryResolvedInvite({ key: genericInviteMatch.invite }, { fetchPolicy: 'network-only' });
                    if (info.invite) {
                        if (info.invite.__typename === 'RoomInvite') {
                            await joinRoom(info.invite, genericInviteMatch.invite);
                        } else if (info.invite.__typename === 'InviteInfo') {
                            await joinOraganizaion(info.invite, genericInviteMatch.invite);
                        }
                    } else {
                        Alert.alert('This invitation has been revoked');
                    }
                } catch (e) {
                    Alert.alert(e.message);
                }
                loader.hide();
                return;
            }
        } catch (e) {
            Alert.alert(e.message);
        }

        // DEPRICATED, delete after adoption, web + mobile link generation migration
        // JOIN ORGANIZATION
        //
        let orgInvitePattern = new UrlPattern(patternBase + 'join/:invite');
        let orgInvitePatternDeep = new UrlPattern(patternBaseDeep + 'join/:invite');
        let matchOrg = orgInvitePattern.match(link) || orgInvitePatternDeep.match(srcLink);

        if (matchOrg && matchOrg.invite) {
            loader.show();
            try {
                let info = await getMessenger().engine.client.queryAccountInviteInfo({ inviteKey: matchOrg.invite });
                await joinOraganizaion(info.invite, matchOrg.invite);
            } catch (e) {
                Alert.alert(e.message);
            }
            loader.hide();
            return;
        }

        ////
        ////  <<<<< INVITES
        ////

        //
        // PROFILE ORGANIZATION
        //
        let profileOrgPattern = new UrlPattern(patternBase + '(mail)(directory)(discover)/(o)(c)/:id');
        let matchOrgProfile = profileOrgPattern.match(link);
        if (matchOrgProfile && matchOrgProfile.id) {
            navigate('ProfileOrganization', { id: matchOrgProfile.id });
            return;
        }

        //
        // PROFILE USER
        //
        let profileUserPattern = new UrlPattern(patternBase + '(mail)(directory)(discover)/u/:id');
        let matchUserProfile = profileUserPattern.match(link);
        if (matchUserProfile && matchUserProfile.id) {
            navigate('ProfileUser', { id: matchUserProfile.id });
            return;
        }

        //
        // PROFILE GROUP
        //
        let profileGroupPattern = new UrlPattern(patternBase + '(mail)(directory)(discover)/p/:id');
        let matchGroupProfile = profileGroupPattern.match(link);
        if (matchGroupProfile && matchGroupProfile.id) {
            navigate('ProfileGroup', { id: matchGroupProfile.id });
            return;
        }
        let profileGroupUnicornPattern = new UrlPattern(patternBase + 'group/:id');
        let matchGroupUnicornProfile = profileGroupUnicornPattern.match(link);
        if (matchGroupUnicornProfile && matchGroupUnicornProfile.id) {
            navigate('ProfileGroup', { id: matchGroupUnicornProfile.id });
            return;
        }

        //
        // FEED ITEM
        //
        let feedItemPattern = new UrlPattern(patternBase + 'feed/:id');
        let matchFeedItemProfile = feedItemPattern.match(link);
        if (matchFeedItemProfile && matchFeedItemProfile.id) {
            navigate('FeedItem', { feedItemId: matchFeedItemProfile.id });
            return;
        }

        //
        // MESSAGEE
        //
        let messagePattern = new UrlPattern(patternBase + 'message/:id');
        let matchMessage = messagePattern.match(link);
        if (matchMessage && matchMessage.id) {
            navigate('Message', { messageId: matchMessage.id });
            return;
        }

        //
        // MESSAGE COMMENT
        //
        let messageCommentPattern = new UrlPattern(patternBase + 'message/:id/comment/:commentId');
        let messageCommentPatternDeep = new UrlPattern(patternBaseDeep + 'message/:id/comment/:commentId');
        let matchMessageComment = messageCommentPattern.match(link) || messageCommentPatternDeep.match(link);
        if (matchMessageComment && matchMessageComment.id && matchMessageComment.commentId) {
            navigate('Message', { messageId: matchMessageComment.id, highlightId: matchMessageComment.commentId });
            return;
        }

        //
        // COLLECTIONS
        //
        let collectionsPattern = new UrlPattern(patternBase + 'discover/collections/:id');
        let matchCollections = collectionsPattern.match(link);
        if (matchCollections && matchCollections.id) {
            navigate('DiscoverListing', { type: 'collections', collectionId: matchCollections.id });
            return;
        }

        //
        // CONVERSATION
        //
        let conversationPattern = new UrlPattern(patternBase + 'mail/:id');
        let conversationPatternDeep = new UrlPattern(patternBaseDeep + 'mail/:id');
        let matchConversation = conversationPattern.match(link) || conversationPatternDeep.match(link);
        if (matchConversation && matchConversation.id) {
            navigate('Conversation', { id: matchConversation.id });
            return;
        }

        //
        // SHARED MEDIA
        //
        let sharedMediaPattern = new UrlPattern(patternBase + 'mail/:id/shared');
        let sharedMediaPatternDeep = new UrlPattern(patternBaseDeep + 'mail/:id/shared');
        let matchSharedMedia = sharedMediaPattern.match(link) || sharedMediaPatternDeep.match(link);
        if (matchSharedMedia && matchSharedMedia.id) {
            navigate('SharedMedia', { chatId: matchSharedMedia.id });
            return;
        }

        //
        // SHORT_NAME
        //
        let webPublicPaths = publicPaths.map(s => s.slice(1));
        let shortNamePattern = new UrlPattern(patternBase + ':shortname');
        let matchShortName = shortNamePattern.match(link);

        if (matchShortName && matchShortName.shortname && !webPublicPaths.includes(matchShortName.shortname)) {
            AppLoader.start();
            try {
                let info = await getMessenger().engine.client.queryResolveShortName({ shortname: matchShortName.shortname }, { fetchPolicy: 'network-only' });
                if (info && info.item) {
                    if (info.item.__typename === 'User') {
                        getMessenger().history.navigationManager.pushAndReset('ProfileUser', { id: info.item.id });
                    } else if (info.item.__typename === 'Organization') {
                        getMessenger().history.navigationManager.pushAndReset('ProfileOrganization', { id: info.item.id });
                    } else if (info.item.__typename === 'FeedChannel') {
                        getMessenger().history.navigationManager.pushAndReset('FeedChannel', { id: info.item.id });
                    } else if (info.item.__typename === 'SharedRoom') {
                        getMessenger().history.navigationManager.pushAndReset('ProfileGroup', { id: info.item.id });
                    } else if (info.item.__typename === 'DiscoverChatsCollection') {
                        getMessenger().history.navigationManager.pushAndReset('DiscoverListing', {
                            type: 'collections',
                            collectionId: info.item.id,
                        });
                    } else {
                        Toast.failure({ text: 'Nothing found', duration: 1000 }).show();
                    }
                } else {
                    Toast.failure({ text: 'Nothing found', duration: 1000 }).show();
                }
            } catch (e) {
                Toast.failure({ text: e.message, duration: 1000 }).show();
            }
            AppLoader.stop();
            return;
        }

        //
        // Sharing
        //
        let sharePattern = new UrlPattern(patternBaseDeep + 'share');
        let matchShare = sharePattern.match(link);
        if (matchShare) {
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
            return;
        }

        if (link === '/onboarding_discover') {
            navigate('Discover');
            return;
        }

        if (link === '/onboarding_apps') {
            navigate('InstallApps');
            return;
        }
        if (link === '/onboarding_send_first_message') {
            navigate('StartConversation');
            return;
        }
        if (link === '/onboarding_invite') {
            navigate('Invites');
            return;
        }

        if (fallback) {
            await fallback();
        }

    };
};

export let saveLinkIfInvite = async (srcLink: string) => {
    let link = srcLink.toLowerCase();
    let keep =
        (link.includes('openland.com/join/') ||
            link.includes('openland://deep/join/')) ||
        (link.includes('openland.com/invite/') ||
            link.includes('openland://deep/invite/'));

    if (keep) {
        await AsyncStorage.setItem('initial_invite_link', srcLink);
    }
};

export const joinInviteIfHave = async () => {
    const loader = Toast.loader();
    let srcLink = await AsyncStorage.getItem('initial_invite_link');

    let link = srcLink;
    if (link.includes('?')) {
        link = link.split('?')[0];
    }
    if (link.endsWith('/')) {
        link = link.substr(0, link.length - 1);
    }
    if (link.endsWith('.')) {
        link = link.slice(0, link.length - 1);
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
    };

    let joinOraganizaion = async (invite: Partial<AccountInviteInfo_invite> | null, key: string) => {
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
    };

    // 
    // JOIN ROOMS
    //
    let roomInvitePattern = new UrlPattern(patternBase + 'invite/:invite');
    let roomInvitePatternDeep = new UrlPattern(patternBaseDeep + 'invite/:invite');
    let match = roomInvitePattern.match(link) || roomInvitePatternDeep.match(link);
    if (match && match.invite) {
        loader.show();
        try {
            let info = await getMessenger().engine.client.queryRoomInviteInfo({ invite: match.invite });
            await joinRoom(info.invite, match.invite);
        } catch (e) {
            Alert.alert(formatError(e));
        }
        loader.hide();
    }

    //
    // JOIN ORGANIZATION
    //
    let orgInvitePattern = new UrlPattern(patternBase + 'join/:invite');
    let orgInvitePatternDeep = new UrlPattern(patternBaseDeep + 'join/:invite');
    let matchOrg = orgInvitePattern.match(link) || orgInvitePatternDeep.match(link);
    if (matchOrg && matchOrg.invite) {
        loader.show();
        try {
            let info = await getMessenger().engine.client.queryAccountInviteInfo({ inviteKey: matchOrg.invite });
            await joinOraganizaion(info.invite, matchOrg.invite);
        } catch (e) {
            Alert.alert(formatError(e));
        }
        loader.hide();
    }

    await AsyncStorage.removeItem('initial_invite_link');

};
