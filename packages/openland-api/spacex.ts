/* tslint:disable */
/* eslint-disable */
import * as Types from './spacex.types';
import { SpaceXClientParameters, GraphqlActiveSubscription, QueryParameters, MutationParameters, SubscriptionParameters, GraphqlSubscriptionHandler, BaseSpaceXClient, SpaceQueryWatchParameters } from '@openland/spacex';

export class OpenlandClient extends BaseSpaceXClient {
    constructor(params: SpaceXClientParameters) {
        super(params);
    }
    withParameters(params: Partial<SpaceXClientParameters>) {
        return new OpenlandClient({ ... params, engine: this.engine, globalCache: this.globalCache});
    }
    queryAccount(params?: QueryParameters): Promise<Types.Account> {
        return this.query('Account', undefined, params);
    }
    queryAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params?: QueryParameters): Promise<Types.AccountInviteInfo> {
        return this.query('AccountInviteInfo', variables, params);
    }
    queryAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params?: QueryParameters): Promise<Types.AccountAppInviteInfo> {
        return this.query('AccountAppInviteInfo', variables, params);
    }
    queryAccountAppInvite(params?: QueryParameters): Promise<Types.AccountAppInvite> {
        return this.query('AccountAppInvite', undefined, params);
    }
    queryProfilePrefill(params?: QueryParameters): Promise<Types.ProfilePrefill> {
        return this.query('ProfilePrefill', undefined, params);
    }
    queryFetchPushSettings(params?: QueryParameters): Promise<Types.FetchPushSettings> {
        return this.query('FetchPushSettings', undefined, params);
    }
    queryMyApps(params?: QueryParameters): Promise<Types.MyApps> {
        return this.query('MyApps', undefined, params);
    }
    queryUserStorage(variables: Types.UserStorageVariables, params?: QueryParameters): Promise<Types.UserStorage> {
        return this.query('UserStorage', variables, params);
    }
    queryAuthPoints(params?: QueryParameters): Promise<Types.AuthPoints> {
        return this.query('AuthPoints', undefined, params);
    }
    queryIpLocation(params?: QueryParameters): Promise<Types.IpLocation> {
        return this.query('IpLocation', undefined, params);
    }
    queryBlackListUpdatesState(params?: QueryParameters): Promise<Types.BlackListUpdatesState> {
        return this.query('BlackListUpdatesState', undefined, params);
    }
    queryMyBlackList(params?: QueryParameters): Promise<Types.MyBlackList> {
        return this.query('MyBlackList', undefined, params);
    }
    queryDialogs(variables: Types.DialogsVariables, params?: QueryParameters): Promise<Types.Dialogs> {
        return this.query('Dialogs', variables, params);
    }
    queryChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params?: QueryParameters): Promise<Types.ChatNewReadLastRead> {
        return this.query('ChatNewReadLastRead', variables, params);
    }
    queryChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params?: QueryParameters): Promise<Types.ChatNewGetMessage> {
        return this.query('ChatNewGetMessage', variables, params);
    }
    queryChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params?: QueryParameters): Promise<Types.ChatNewLoadBefore> {
        return this.query('ChatNewLoadBefore', variables, params);
    }
    queryChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params?: QueryParameters): Promise<Types.ChatNewLoadAfter> {
        return this.query('ChatNewLoadAfter', variables, params);
    }
    queryRoomPico(variables: Types.RoomPicoVariables, params?: QueryParameters): Promise<Types.RoomPico> {
        return this.query('RoomPico', variables, params);
    }
    queryRoomChat(variables: Types.RoomChatVariables, params?: QueryParameters): Promise<Types.RoomChat> {
        return this.query('RoomChat', variables, params);
    }
    queryRoomSuper(variables: Types.RoomSuperVariables, params?: QueryParameters): Promise<Types.RoomSuper> {
        return this.query('RoomSuper', variables, params);
    }
    queryGlobalCounter(params?: QueryParameters): Promise<Types.GlobalCounter> {
        return this.query('GlobalCounter', undefined, params);
    }
    queryMessagesBatch(variables: Types.MessagesBatchVariables, params?: QueryParameters): Promise<Types.MessagesBatch> {
        return this.query('MessagesBatch', variables, params);
    }
    queryChatInit(variables: Types.ChatInitVariables, params?: QueryParameters): Promise<Types.ChatInit> {
        return this.query('ChatInit', variables, params);
    }
    queryChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params?: QueryParameters): Promise<Types.ChatInitFromUnread> {
        return this.query('ChatInitFromUnread', variables, params);
    }
    queryRoomSearch(variables: Types.RoomSearchVariables, params?: QueryParameters): Promise<Types.RoomSearch> {
        return this.query('RoomSearch', variables, params);
    }
    queryRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params?: QueryParameters): Promise<Types.RoomAdminMembers> {
        return this.query('RoomAdminMembers', variables, params);
    }
    queryRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params?: QueryParameters): Promise<Types.RoomMembersPaginated> {
        return this.query('RoomMembersPaginated', variables, params);
    }
    queryRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params?: QueryParameters): Promise<Types.RoomMembersSearch> {
        return this.query('RoomMembersSearch', variables, params);
    }
    queryRoomSocialImage(variables: Types.RoomSocialImageVariables, params?: QueryParameters): Promise<Types.RoomSocialImage> {
        return this.query('RoomSocialImage', variables, params);
    }
    queryRoomInviteLink(variables: Types.RoomInviteLinkVariables, params?: QueryParameters): Promise<Types.RoomInviteLink> {
        return this.query('RoomInviteLink', variables, params);
    }
    queryRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params?: QueryParameters): Promise<Types.RoomInviteInfo> {
        return this.query('RoomInviteInfo', variables, params);
    }
    queryResolvedInvite(variables: Types.ResolvedInviteVariables, params?: QueryParameters): Promise<Types.ResolvedInvite> {
        return this.query('ResolvedInvite', variables, params);
    }
    queryMessage(variables: Types.MessageVariables, params?: QueryParameters): Promise<Types.Message> {
        return this.query('Message', variables, params);
    }
    queryMessagesSearch(variables: Types.MessagesSearchVariables, params?: QueryParameters): Promise<Types.MessagesSearch> {
        return this.query('MessagesSearch', variables, params);
    }
    queryMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params?: QueryParameters): Promise<Types.MessagesSearchFull> {
        return this.query('MessagesSearchFull', variables, params);
    }
    queryChatJoin(variables: Types.ChatJoinVariables, params?: QueryParameters): Promise<Types.ChatJoin> {
        return this.query('ChatJoin', variables, params);
    }
    queryCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params?: QueryParameters): Promise<Types.CommonChatsWithUser> {
        return this.query('CommonChatsWithUser', variables, params);
    }
    queryUserSearchForChat(variables: Types.UserSearchForChatVariables, params?: QueryParameters): Promise<Types.UserSearchForChat> {
        return this.query('UserSearchForChat', variables, params);
    }
    queryCommentFullReactions(variables: Types.CommentFullReactionsVariables, params?: QueryParameters): Promise<Types.CommentFullReactions> {
        return this.query('CommentFullReactions', variables, params);
    }
    queryComments(variables: Types.CommentsVariables, params?: QueryParameters): Promise<Types.Comments> {
        return this.query('Comments', variables, params);
    }
    queryConference(variables: Types.ConferenceVariables, params?: QueryParameters): Promise<Types.Conference> {
        return this.query('Conference', variables, params);
    }
    queryConferenceMeta(variables: Types.ConferenceMetaVariables, params?: QueryParameters): Promise<Types.ConferenceMeta> {
        return this.query('ConferenceMeta', variables, params);
    }
    queryConferenceMedia(variables: Types.ConferenceMediaVariables, params?: QueryParameters): Promise<Types.ConferenceMedia> {
        return this.query('ConferenceMedia', variables, params);
    }
    queryMyContacts(variables: Types.MyContactsVariables, params?: QueryParameters): Promise<Types.MyContacts> {
        return this.query('MyContacts', variables, params);
    }
    queryMyContactsSearch(variables: Types.MyContactsSearchVariables, params?: QueryParameters): Promise<Types.MyContactsSearch> {
        return this.query('MyContactsSearch', variables, params);
    }
    queryPhonebookWasExported(params?: QueryParameters): Promise<Types.PhonebookWasExported> {
        return this.query('PhonebookWasExported', undefined, params);
    }
    queryMyContactsState(params?: QueryParameters): Promise<Types.MyContactsState> {
        return this.query('MyContactsState', undefined, params);
    }
    queryChannels(params?: QueryParameters): Promise<Types.Channels> {
        return this.query('Channels', undefined, params);
    }
    queryChannel(variables: Types.ChannelVariables, params?: QueryParameters): Promise<Types.Channel> {
        return this.query('Channel', variables, params);
    }
    queryPosts(variables: Types.PostsVariables, params?: QueryParameters): Promise<Types.Posts> {
        return this.query('Posts', variables, params);
    }
    queryPost(variables: Types.PostVariables, params?: QueryParameters): Promise<Types.Post> {
        return this.query('Post', variables, params);
    }
    queryMyPostDrafts(variables: Types.MyPostDraftsVariables, params?: QueryParameters): Promise<Types.MyPostDrafts> {
        return this.query('MyPostDrafts', variables, params);
    }
    queryPostDraft(variables: Types.PostDraftVariables, params?: QueryParameters): Promise<Types.PostDraft> {
        return this.query('PostDraft', variables, params);
    }
    queryExploreRooms(variables: Types.ExploreRoomsVariables, params?: QueryParameters): Promise<Types.ExploreRooms> {
        return this.query('ExploreRooms', variables, params);
    }
    queryDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params?: QueryParameters): Promise<Types.DiscoverNoAuth> {
        return this.query('DiscoverNoAuth', variables, params);
    }
    querySuggestedRooms(params?: QueryParameters): Promise<Types.SuggestedRooms> {
        return this.query('SuggestedRooms', undefined, params);
    }
    queryUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params?: QueryParameters): Promise<Types.UserAvailableRooms> {
        return this.query('UserAvailableRooms', variables, params);
    }
    queryGlobalSearch(variables: Types.GlobalSearchVariables, params?: QueryParameters): Promise<Types.GlobalSearch> {
        return this.query('GlobalSearch', variables, params);
    }
    queryDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params?: QueryParameters): Promise<Types.DiscoverNextPage> {
        return this.query('DiscoverNextPage', variables, params);
    }
    queryDiscoverIsDone(params?: QueryParameters): Promise<Types.DiscoverIsDone> {
        return this.query('DiscoverIsDone', undefined, params);
    }
    queryDiscoverState(params?: QueryParameters): Promise<Types.DiscoverState> {
        return this.query('DiscoverState', undefined, params);
    }
    queryDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params?: QueryParameters): Promise<Types.DiscoverPopularNow> {
        return this.query('DiscoverPopularNow', variables, params);
    }
    queryDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params?: QueryParameters): Promise<Types.DiscoverNewAndGrowing> {
        return this.query('DiscoverNewAndGrowing', variables, params);
    }
    queryDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params?: QueryParameters): Promise<Types.DiscoverTopPremium> {
        return this.query('DiscoverTopPremium', variables, params);
    }
    queryDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params?: QueryParameters): Promise<Types.DiscoverTopFree> {
        return this.query('DiscoverTopFree', variables, params);
    }
    queryDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params?: QueryParameters): Promise<Types.DiscoverPopularOrganizations> {
        return this.query('DiscoverPopularOrganizations', variables, params);
    }
    queryDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params?: QueryParameters): Promise<Types.DiscoverNewOrganizations> {
        return this.query('DiscoverNewOrganizations', variables, params);
    }
    queryDiscoverSuggestedRooms(params?: QueryParameters): Promise<Types.DiscoverSuggestedRooms> {
        return this.query('DiscoverSuggestedRooms', undefined, params);
    }
    queryDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params?: QueryParameters): Promise<Types.DiscoverCollectionsShort> {
        return this.query('DiscoverCollectionsShort', variables, params);
    }
    queryDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params?: QueryParameters): Promise<Types.DiscoverCollections> {
        return this.query('DiscoverCollections', variables, params);
    }
    queryDiscoverCollection(variables: Types.DiscoverCollectionVariables, params?: QueryParameters): Promise<Types.DiscoverCollection> {
        return this.query('DiscoverCollection', variables, params);
    }
    queryDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params?: QueryParameters): Promise<Types.DiscoverCollectionShort> {
        return this.query('DiscoverCollectionShort', variables, params);
    }
    queryDiscoverEditorsChoice(params?: QueryParameters): Promise<Types.DiscoverEditorsChoice> {
        return this.query('DiscoverEditorsChoice', undefined, params);
    }
    queryMyCards(params?: QueryParameters): Promise<Types.MyCards> {
        return this.query('MyCards', undefined, params);
    }
    queryMyWallet(params?: QueryParameters): Promise<Types.MyWallet> {
        return this.query('MyWallet', undefined, params);
    }
    queryTransactionsHistory(variables: Types.TransactionsHistoryVariables, params?: QueryParameters): Promise<Types.TransactionsHistory> {
        return this.query('TransactionsHistory', variables, params);
    }
    querySubscriptions(params?: QueryParameters): Promise<Types.Subscriptions> {
        return this.query('Subscriptions', undefined, params);
    }
    queryStripeToken(params?: QueryParameters): Promise<Types.StripeToken> {
        return this.query('StripeToken', undefined, params);
    }
    queryChatMentionSearch(variables: Types.ChatMentionSearchVariables, params?: QueryParameters): Promise<Types.ChatMentionSearch> {
        return this.query('ChatMentionSearch', variables, params);
    }
    queryMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params?: QueryParameters): Promise<Types.MessageMultiSpan> {
        return this.query('MessageMultiSpan', variables, params);
    }
    queryMessageFullReactions(variables: Types.MessageFullReactionsVariables, params?: QueryParameters): Promise<Types.MessageFullReactions> {
        return this.query('MessageFullReactions', variables, params);
    }
    queryMyNotifications(variables: Types.MyNotificationsVariables, params?: QueryParameters): Promise<Types.MyNotifications> {
        return this.query('MyNotifications', variables, params);
    }
    queryMyNotificationCenter(params?: QueryParameters): Promise<Types.MyNotificationCenter> {
        return this.query('MyNotificationCenter', undefined, params);
    }
    queryOauthContext(variables: Types.OauthContextVariables, params?: QueryParameters): Promise<Types.OauthContext> {
        return this.query('OauthContext', variables, params);
    }
    queryMyCommunities(params?: QueryParameters): Promise<Types.MyCommunities> {
        return this.query('MyCommunities', undefined, params);
    }
    queryOrganization(variables: Types.OrganizationVariables, params?: QueryParameters): Promise<Types.Organization> {
        return this.query('Organization', variables, params);
    }
    queryOrganizationPico(variables: Types.OrganizationPicoVariables, params?: QueryParameters): Promise<Types.OrganizationPico> {
        return this.query('OrganizationPico', variables, params);
    }
    queryOrganizationMembers(variables: Types.OrganizationMembersVariables, params?: QueryParameters): Promise<Types.OrganizationMembers> {
        return this.query('OrganizationMembers', variables, params);
    }
    queryOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params?: QueryParameters): Promise<Types.OrganizationMembersSearch> {
        return this.query('OrganizationMembersSearch', variables, params);
    }
    queryOrganizationProfile(variables: Types.OrganizationProfileVariables, params?: QueryParameters): Promise<Types.OrganizationProfile> {
        return this.query('OrganizationProfile', variables, params);
    }
    queryOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, params?: QueryParameters): Promise<Types.OrganizationPublicInvite> {
        return this.query('OrganizationPublicInvite', variables, params);
    }
    queryOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, params?: QueryParameters): Promise<Types.OrganizationPublicRooms> {
        return this.query('OrganizationPublicRooms', variables, params);
    }
    queryUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params?: QueryParameters): Promise<Types.UserSearchForOrganization> {
        return this.query('UserSearchForOrganization', variables, params);
    }
    querySuperAdmins(params?: QueryParameters): Promise<Types.SuperAdmins> {
        return this.query('SuperAdmins', undefined, params);
    }
    queryProfile(params?: QueryParameters): Promise<Types.Profile> {
        return this.query('Profile', undefined, params);
    }
    querySettings(params?: QueryParameters): Promise<Types.Settings> {
        return this.query('Settings', undefined, params);
    }
    queryShouldAskForAppReview(params?: QueryParameters): Promise<Types.ShouldAskForAppReview> {
        return this.query('ShouldAskForAppReview', undefined, params);
    }
    querySharedMedia(variables: Types.SharedMediaVariables, params?: QueryParameters): Promise<Types.SharedMedia> {
        return this.query('SharedMedia', variables, params);
    }
    querySharedMediaCounters(variables: Types.SharedMediaCountersVariables, params?: QueryParameters): Promise<Types.SharedMediaCounters> {
        return this.query('SharedMediaCounters', variables, params);
    }
    queryPicSharedMedia(variables: Types.PicSharedMediaVariables, params?: QueryParameters): Promise<Types.PicSharedMedia> {
        return this.query('PicSharedMedia', variables, params);
    }
    queryResolveShortName(variables: Types.ResolveShortNameVariables, params?: QueryParameters): Promise<Types.ResolveShortName> {
        return this.query('ResolveShortName', variables, params);
    }
    queryAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params?: QueryParameters): Promise<Types.AuthResolveShortName> {
        return this.query('AuthResolveShortName', variables, params);
    }
    queryUnviewedStickers(params?: QueryParameters): Promise<Types.UnviewedStickers> {
        return this.query('UnviewedStickers', undefined, params);
    }
    queryMyStickers(params?: QueryParameters): Promise<Types.MyStickers> {
        return this.query('MyStickers', undefined, params);
    }
    queryStickerPackCatalog(params?: QueryParameters): Promise<Types.StickerPackCatalog> {
        return this.query('StickerPackCatalog', undefined, params);
    }
    queryStickerPack(variables: Types.StickerPackVariables, params?: QueryParameters): Promise<Types.StickerPack> {
        return this.query('StickerPack', variables, params);
    }
    querySuperStickerPackCatalog(params?: QueryParameters): Promise<Types.SuperStickerPackCatalog> {
        return this.query('SuperStickerPackCatalog', undefined, params);
    }
    queryCreatedStickerPacks(params?: QueryParameters): Promise<Types.CreatedStickerPacks> {
        return this.query('CreatedStickerPacks', undefined, params);
    }
    querySuperAllStickerPacks(params?: QueryParameters): Promise<Types.SuperAllStickerPacks> {
        return this.query('SuperAllStickerPacks', undefined, params);
    }
    querySuperStickerPack(variables: Types.SuperStickerPackVariables, params?: QueryParameters): Promise<Types.SuperStickerPack> {
        return this.query('SuperStickerPack', variables, params);
    }
    queryGetState(params?: QueryParameters): Promise<Types.GetState> {
        return this.query('GetState', undefined, params);
    }
    queryGetDifference(variables: Types.GetDifferenceVariables, params?: QueryParameters): Promise<Types.GetDifference> {
        return this.query('GetDifference', variables, params);
    }
    queryGetSequenceState(variables: Types.GetSequenceStateVariables, params?: QueryParameters): Promise<Types.GetSequenceState> {
        return this.query('GetSequenceState', variables, params);
    }
    queryGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params?: QueryParameters): Promise<Types.GetSequenceDifference> {
        return this.query('GetSequenceDifference', variables, params);
    }
    queryGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params?: QueryParameters): Promise<Types.GetInitialDialogs> {
        return this.query('GetInitialDialogs', variables, params);
    }
    queryUpdateUsers(variables: Types.UpdateUsersVariables, params?: QueryParameters): Promise<Types.UpdateUsers> {
        return this.query('UpdateUsers', variables, params);
    }
    queryUser(variables: Types.UserVariables, params?: QueryParameters): Promise<Types.User> {
        return this.query('User', variables, params);
    }
    queryUserNano(variables: Types.UserNanoVariables, params?: QueryParameters): Promise<Types.UserNano> {
        return this.query('UserNano', variables, params);
    }
    queryUserFollowers(variables: Types.UserFollowersVariables, params?: QueryParameters): Promise<Types.UserFollowers> {
        return this.query('UserFollowers', variables, params);
    }
    queryOnline(variables: Types.OnlineVariables, params?: QueryParameters): Promise<Types.Online> {
        return this.query('Online', variables, params);
    }
    queryExplorePeople(variables: Types.ExplorePeopleVariables, params?: QueryParameters): Promise<Types.ExplorePeople> {
        return this.query('ExplorePeople', variables, params);
    }
    querySocialUserFollowers(variables: Types.SocialUserFollowersVariables, params?: QueryParameters): Promise<Types.SocialUserFollowers> {
        return this.query('SocialUserFollowers', variables, params);
    }
    querySocialUserFollowing(variables: Types.SocialUserFollowingVariables, params?: QueryParameters): Promise<Types.SocialUserFollowing> {
        return this.query('SocialUserFollowing', variables, params);
    }
    queryVoiceChat(variables: Types.VoiceChatVariables, params?: QueryParameters): Promise<Types.VoiceChat> {
        return this.query('VoiceChat', variables, params);
    }
    queryVoiceChatFull(variables: Types.VoiceChatFullVariables, params?: QueryParameters): Promise<Types.VoiceChatFull> {
        return this.query('VoiceChatFull', variables, params);
    }
    queryVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params?: QueryParameters): Promise<Types.VoiceChatListeners> {
        return this.query('VoiceChatListeners', variables, params);
    }
    queryActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params?: QueryParameters): Promise<Types.ActiveVoiceChats> {
        return this.query('ActiveVoiceChats', variables, params);
    }
    queryVoiceChatUser(variables: Types.VoiceChatUserVariables, params?: QueryParameters): Promise<Types.VoiceChatUser> {
        return this.query('VoiceChatUser', variables, params);
    }
    queryVoiceChatHandRaised(variables: Types.VoiceChatHandRaisedVariables, params?: QueryParameters): Promise<Types.VoiceChatHandRaised> {
        return this.query('VoiceChatHandRaised', variables, params);
    }
    queryVoiceChatControls(variables: Types.VoiceChatControlsVariables, params?: QueryParameters): Promise<Types.VoiceChatControls> {
        return this.query('VoiceChatControls', variables, params);
    }
    queryVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params?: QueryParameters): Promise<Types.VoiceChatEventsState> {
        return this.query('VoiceChatEventsState', variables, params);
    }
    queryVoiceChatPrefetch(variables: Types.VoiceChatPrefetchVariables, params?: QueryParameters): Promise<Types.VoiceChatPrefetch> {
        return this.query('VoiceChatPrefetch', variables, params);
    }
    refetchAccount(params?: QueryParameters): Promise<Types.Account> {
        return this.refetch('Account', undefined, params);
    }
    refetchAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params?: QueryParameters): Promise<Types.AccountInviteInfo> {
        return this.refetch('AccountInviteInfo', variables, params);
    }
    refetchAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params?: QueryParameters): Promise<Types.AccountAppInviteInfo> {
        return this.refetch('AccountAppInviteInfo', variables, params);
    }
    refetchAccountAppInvite(params?: QueryParameters): Promise<Types.AccountAppInvite> {
        return this.refetch('AccountAppInvite', undefined, params);
    }
    refetchProfilePrefill(params?: QueryParameters): Promise<Types.ProfilePrefill> {
        return this.refetch('ProfilePrefill', undefined, params);
    }
    refetchFetchPushSettings(params?: QueryParameters): Promise<Types.FetchPushSettings> {
        return this.refetch('FetchPushSettings', undefined, params);
    }
    refetchMyApps(params?: QueryParameters): Promise<Types.MyApps> {
        return this.refetch('MyApps', undefined, params);
    }
    refetchUserStorage(variables: Types.UserStorageVariables, params?: QueryParameters): Promise<Types.UserStorage> {
        return this.refetch('UserStorage', variables, params);
    }
    refetchAuthPoints(params?: QueryParameters): Promise<Types.AuthPoints> {
        return this.refetch('AuthPoints', undefined, params);
    }
    refetchIpLocation(params?: QueryParameters): Promise<Types.IpLocation> {
        return this.refetch('IpLocation', undefined, params);
    }
    refetchBlackListUpdatesState(params?: QueryParameters): Promise<Types.BlackListUpdatesState> {
        return this.refetch('BlackListUpdatesState', undefined, params);
    }
    refetchMyBlackList(params?: QueryParameters): Promise<Types.MyBlackList> {
        return this.refetch('MyBlackList', undefined, params);
    }
    refetchDialogs(variables: Types.DialogsVariables, params?: QueryParameters): Promise<Types.Dialogs> {
        return this.refetch('Dialogs', variables, params);
    }
    refetchChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params?: QueryParameters): Promise<Types.ChatNewReadLastRead> {
        return this.refetch('ChatNewReadLastRead', variables, params);
    }
    refetchChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params?: QueryParameters): Promise<Types.ChatNewGetMessage> {
        return this.refetch('ChatNewGetMessage', variables, params);
    }
    refetchChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params?: QueryParameters): Promise<Types.ChatNewLoadBefore> {
        return this.refetch('ChatNewLoadBefore', variables, params);
    }
    refetchChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params?: QueryParameters): Promise<Types.ChatNewLoadAfter> {
        return this.refetch('ChatNewLoadAfter', variables, params);
    }
    refetchRoomPico(variables: Types.RoomPicoVariables, params?: QueryParameters): Promise<Types.RoomPico> {
        return this.refetch('RoomPico', variables, params);
    }
    refetchRoomChat(variables: Types.RoomChatVariables, params?: QueryParameters): Promise<Types.RoomChat> {
        return this.refetch('RoomChat', variables, params);
    }
    refetchRoomSuper(variables: Types.RoomSuperVariables, params?: QueryParameters): Promise<Types.RoomSuper> {
        return this.refetch('RoomSuper', variables, params);
    }
    refetchGlobalCounter(params?: QueryParameters): Promise<Types.GlobalCounter> {
        return this.refetch('GlobalCounter', undefined, params);
    }
    refetchMessagesBatch(variables: Types.MessagesBatchVariables, params?: QueryParameters): Promise<Types.MessagesBatch> {
        return this.refetch('MessagesBatch', variables, params);
    }
    refetchChatInit(variables: Types.ChatInitVariables, params?: QueryParameters): Promise<Types.ChatInit> {
        return this.refetch('ChatInit', variables, params);
    }
    refetchChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params?: QueryParameters): Promise<Types.ChatInitFromUnread> {
        return this.refetch('ChatInitFromUnread', variables, params);
    }
    refetchRoomSearch(variables: Types.RoomSearchVariables, params?: QueryParameters): Promise<Types.RoomSearch> {
        return this.refetch('RoomSearch', variables, params);
    }
    refetchRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params?: QueryParameters): Promise<Types.RoomAdminMembers> {
        return this.refetch('RoomAdminMembers', variables, params);
    }
    refetchRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params?: QueryParameters): Promise<Types.RoomMembersPaginated> {
        return this.refetch('RoomMembersPaginated', variables, params);
    }
    refetchRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params?: QueryParameters): Promise<Types.RoomMembersSearch> {
        return this.refetch('RoomMembersSearch', variables, params);
    }
    refetchRoomSocialImage(variables: Types.RoomSocialImageVariables, params?: QueryParameters): Promise<Types.RoomSocialImage> {
        return this.refetch('RoomSocialImage', variables, params);
    }
    refetchRoomInviteLink(variables: Types.RoomInviteLinkVariables, params?: QueryParameters): Promise<Types.RoomInviteLink> {
        return this.refetch('RoomInviteLink', variables, params);
    }
    refetchRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params?: QueryParameters): Promise<Types.RoomInviteInfo> {
        return this.refetch('RoomInviteInfo', variables, params);
    }
    refetchResolvedInvite(variables: Types.ResolvedInviteVariables, params?: QueryParameters): Promise<Types.ResolvedInvite> {
        return this.refetch('ResolvedInvite', variables, params);
    }
    refetchMessage(variables: Types.MessageVariables, params?: QueryParameters): Promise<Types.Message> {
        return this.refetch('Message', variables, params);
    }
    refetchMessagesSearch(variables: Types.MessagesSearchVariables, params?: QueryParameters): Promise<Types.MessagesSearch> {
        return this.refetch('MessagesSearch', variables, params);
    }
    refetchMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params?: QueryParameters): Promise<Types.MessagesSearchFull> {
        return this.refetch('MessagesSearchFull', variables, params);
    }
    refetchChatJoin(variables: Types.ChatJoinVariables, params?: QueryParameters): Promise<Types.ChatJoin> {
        return this.refetch('ChatJoin', variables, params);
    }
    refetchCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params?: QueryParameters): Promise<Types.CommonChatsWithUser> {
        return this.refetch('CommonChatsWithUser', variables, params);
    }
    refetchUserSearchForChat(variables: Types.UserSearchForChatVariables, params?: QueryParameters): Promise<Types.UserSearchForChat> {
        return this.refetch('UserSearchForChat', variables, params);
    }
    refetchCommentFullReactions(variables: Types.CommentFullReactionsVariables, params?: QueryParameters): Promise<Types.CommentFullReactions> {
        return this.refetch('CommentFullReactions', variables, params);
    }
    refetchComments(variables: Types.CommentsVariables, params?: QueryParameters): Promise<Types.Comments> {
        return this.refetch('Comments', variables, params);
    }
    refetchConference(variables: Types.ConferenceVariables, params?: QueryParameters): Promise<Types.Conference> {
        return this.refetch('Conference', variables, params);
    }
    refetchConferenceMeta(variables: Types.ConferenceMetaVariables, params?: QueryParameters): Promise<Types.ConferenceMeta> {
        return this.refetch('ConferenceMeta', variables, params);
    }
    refetchConferenceMedia(variables: Types.ConferenceMediaVariables, params?: QueryParameters): Promise<Types.ConferenceMedia> {
        return this.refetch('ConferenceMedia', variables, params);
    }
    refetchMyContacts(variables: Types.MyContactsVariables, params?: QueryParameters): Promise<Types.MyContacts> {
        return this.refetch('MyContacts', variables, params);
    }
    refetchMyContactsSearch(variables: Types.MyContactsSearchVariables, params?: QueryParameters): Promise<Types.MyContactsSearch> {
        return this.refetch('MyContactsSearch', variables, params);
    }
    refetchPhonebookWasExported(params?: QueryParameters): Promise<Types.PhonebookWasExported> {
        return this.refetch('PhonebookWasExported', undefined, params);
    }
    refetchMyContactsState(params?: QueryParameters): Promise<Types.MyContactsState> {
        return this.refetch('MyContactsState', undefined, params);
    }
    refetchChannels(params?: QueryParameters): Promise<Types.Channels> {
        return this.refetch('Channels', undefined, params);
    }
    refetchChannel(variables: Types.ChannelVariables, params?: QueryParameters): Promise<Types.Channel> {
        return this.refetch('Channel', variables, params);
    }
    refetchPosts(variables: Types.PostsVariables, params?: QueryParameters): Promise<Types.Posts> {
        return this.refetch('Posts', variables, params);
    }
    refetchPost(variables: Types.PostVariables, params?: QueryParameters): Promise<Types.Post> {
        return this.refetch('Post', variables, params);
    }
    refetchMyPostDrafts(variables: Types.MyPostDraftsVariables, params?: QueryParameters): Promise<Types.MyPostDrafts> {
        return this.refetch('MyPostDrafts', variables, params);
    }
    refetchPostDraft(variables: Types.PostDraftVariables, params?: QueryParameters): Promise<Types.PostDraft> {
        return this.refetch('PostDraft', variables, params);
    }
    refetchExploreRooms(variables: Types.ExploreRoomsVariables, params?: QueryParameters): Promise<Types.ExploreRooms> {
        return this.refetch('ExploreRooms', variables, params);
    }
    refetchDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params?: QueryParameters): Promise<Types.DiscoverNoAuth> {
        return this.refetch('DiscoverNoAuth', variables, params);
    }
    refetchSuggestedRooms(params?: QueryParameters): Promise<Types.SuggestedRooms> {
        return this.refetch('SuggestedRooms', undefined, params);
    }
    refetchUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params?: QueryParameters): Promise<Types.UserAvailableRooms> {
        return this.refetch('UserAvailableRooms', variables, params);
    }
    refetchGlobalSearch(variables: Types.GlobalSearchVariables, params?: QueryParameters): Promise<Types.GlobalSearch> {
        return this.refetch('GlobalSearch', variables, params);
    }
    refetchDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params?: QueryParameters): Promise<Types.DiscoverNextPage> {
        return this.refetch('DiscoverNextPage', variables, params);
    }
    refetchDiscoverIsDone(params?: QueryParameters): Promise<Types.DiscoverIsDone> {
        return this.refetch('DiscoverIsDone', undefined, params);
    }
    refetchDiscoverState(params?: QueryParameters): Promise<Types.DiscoverState> {
        return this.refetch('DiscoverState', undefined, params);
    }
    refetchDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params?: QueryParameters): Promise<Types.DiscoverPopularNow> {
        return this.refetch('DiscoverPopularNow', variables, params);
    }
    refetchDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params?: QueryParameters): Promise<Types.DiscoverNewAndGrowing> {
        return this.refetch('DiscoverNewAndGrowing', variables, params);
    }
    refetchDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params?: QueryParameters): Promise<Types.DiscoverTopPremium> {
        return this.refetch('DiscoverTopPremium', variables, params);
    }
    refetchDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params?: QueryParameters): Promise<Types.DiscoverTopFree> {
        return this.refetch('DiscoverTopFree', variables, params);
    }
    refetchDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params?: QueryParameters): Promise<Types.DiscoverPopularOrganizations> {
        return this.refetch('DiscoverPopularOrganizations', variables, params);
    }
    refetchDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params?: QueryParameters): Promise<Types.DiscoverNewOrganizations> {
        return this.refetch('DiscoverNewOrganizations', variables, params);
    }
    refetchDiscoverSuggestedRooms(params?: QueryParameters): Promise<Types.DiscoverSuggestedRooms> {
        return this.refetch('DiscoverSuggestedRooms', undefined, params);
    }
    refetchDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params?: QueryParameters): Promise<Types.DiscoverCollectionsShort> {
        return this.refetch('DiscoverCollectionsShort', variables, params);
    }
    refetchDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params?: QueryParameters): Promise<Types.DiscoverCollections> {
        return this.refetch('DiscoverCollections', variables, params);
    }
    refetchDiscoverCollection(variables: Types.DiscoverCollectionVariables, params?: QueryParameters): Promise<Types.DiscoverCollection> {
        return this.refetch('DiscoverCollection', variables, params);
    }
    refetchDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params?: QueryParameters): Promise<Types.DiscoverCollectionShort> {
        return this.refetch('DiscoverCollectionShort', variables, params);
    }
    refetchDiscoverEditorsChoice(params?: QueryParameters): Promise<Types.DiscoverEditorsChoice> {
        return this.refetch('DiscoverEditorsChoice', undefined, params);
    }
    refetchMyCards(params?: QueryParameters): Promise<Types.MyCards> {
        return this.refetch('MyCards', undefined, params);
    }
    refetchMyWallet(params?: QueryParameters): Promise<Types.MyWallet> {
        return this.refetch('MyWallet', undefined, params);
    }
    refetchTransactionsHistory(variables: Types.TransactionsHistoryVariables, params?: QueryParameters): Promise<Types.TransactionsHistory> {
        return this.refetch('TransactionsHistory', variables, params);
    }
    refetchSubscriptions(params?: QueryParameters): Promise<Types.Subscriptions> {
        return this.refetch('Subscriptions', undefined, params);
    }
    refetchStripeToken(params?: QueryParameters): Promise<Types.StripeToken> {
        return this.refetch('StripeToken', undefined, params);
    }
    refetchChatMentionSearch(variables: Types.ChatMentionSearchVariables, params?: QueryParameters): Promise<Types.ChatMentionSearch> {
        return this.refetch('ChatMentionSearch', variables, params);
    }
    refetchMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params?: QueryParameters): Promise<Types.MessageMultiSpan> {
        return this.refetch('MessageMultiSpan', variables, params);
    }
    refetchMessageFullReactions(variables: Types.MessageFullReactionsVariables, params?: QueryParameters): Promise<Types.MessageFullReactions> {
        return this.refetch('MessageFullReactions', variables, params);
    }
    refetchMyNotifications(variables: Types.MyNotificationsVariables, params?: QueryParameters): Promise<Types.MyNotifications> {
        return this.refetch('MyNotifications', variables, params);
    }
    refetchMyNotificationCenter(params?: QueryParameters): Promise<Types.MyNotificationCenter> {
        return this.refetch('MyNotificationCenter', undefined, params);
    }
    refetchOauthContext(variables: Types.OauthContextVariables, params?: QueryParameters): Promise<Types.OauthContext> {
        return this.refetch('OauthContext', variables, params);
    }
    refetchMyCommunities(params?: QueryParameters): Promise<Types.MyCommunities> {
        return this.refetch('MyCommunities', undefined, params);
    }
    refetchOrganization(variables: Types.OrganizationVariables, params?: QueryParameters): Promise<Types.Organization> {
        return this.refetch('Organization', variables, params);
    }
    refetchOrganizationPico(variables: Types.OrganizationPicoVariables, params?: QueryParameters): Promise<Types.OrganizationPico> {
        return this.refetch('OrganizationPico', variables, params);
    }
    refetchOrganizationMembers(variables: Types.OrganizationMembersVariables, params?: QueryParameters): Promise<Types.OrganizationMembers> {
        return this.refetch('OrganizationMembers', variables, params);
    }
    refetchOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params?: QueryParameters): Promise<Types.OrganizationMembersSearch> {
        return this.refetch('OrganizationMembersSearch', variables, params);
    }
    refetchOrganizationProfile(variables: Types.OrganizationProfileVariables, params?: QueryParameters): Promise<Types.OrganizationProfile> {
        return this.refetch('OrganizationProfile', variables, params);
    }
    refetchOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, params?: QueryParameters): Promise<Types.OrganizationPublicInvite> {
        return this.refetch('OrganizationPublicInvite', variables, params);
    }
    refetchOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, params?: QueryParameters): Promise<Types.OrganizationPublicRooms> {
        return this.refetch('OrganizationPublicRooms', variables, params);
    }
    refetchUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params?: QueryParameters): Promise<Types.UserSearchForOrganization> {
        return this.refetch('UserSearchForOrganization', variables, params);
    }
    refetchSuperAdmins(params?: QueryParameters): Promise<Types.SuperAdmins> {
        return this.refetch('SuperAdmins', undefined, params);
    }
    refetchProfile(params?: QueryParameters): Promise<Types.Profile> {
        return this.refetch('Profile', undefined, params);
    }
    refetchSettings(params?: QueryParameters): Promise<Types.Settings> {
        return this.refetch('Settings', undefined, params);
    }
    refetchShouldAskForAppReview(params?: QueryParameters): Promise<Types.ShouldAskForAppReview> {
        return this.refetch('ShouldAskForAppReview', undefined, params);
    }
    refetchSharedMedia(variables: Types.SharedMediaVariables, params?: QueryParameters): Promise<Types.SharedMedia> {
        return this.refetch('SharedMedia', variables, params);
    }
    refetchSharedMediaCounters(variables: Types.SharedMediaCountersVariables, params?: QueryParameters): Promise<Types.SharedMediaCounters> {
        return this.refetch('SharedMediaCounters', variables, params);
    }
    refetchPicSharedMedia(variables: Types.PicSharedMediaVariables, params?: QueryParameters): Promise<Types.PicSharedMedia> {
        return this.refetch('PicSharedMedia', variables, params);
    }
    refetchResolveShortName(variables: Types.ResolveShortNameVariables, params?: QueryParameters): Promise<Types.ResolveShortName> {
        return this.refetch('ResolveShortName', variables, params);
    }
    refetchAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params?: QueryParameters): Promise<Types.AuthResolveShortName> {
        return this.refetch('AuthResolveShortName', variables, params);
    }
    refetchUnviewedStickers(params?: QueryParameters): Promise<Types.UnviewedStickers> {
        return this.refetch('UnviewedStickers', undefined, params);
    }
    refetchMyStickers(params?: QueryParameters): Promise<Types.MyStickers> {
        return this.refetch('MyStickers', undefined, params);
    }
    refetchStickerPackCatalog(params?: QueryParameters): Promise<Types.StickerPackCatalog> {
        return this.refetch('StickerPackCatalog', undefined, params);
    }
    refetchStickerPack(variables: Types.StickerPackVariables, params?: QueryParameters): Promise<Types.StickerPack> {
        return this.refetch('StickerPack', variables, params);
    }
    refetchSuperStickerPackCatalog(params?: QueryParameters): Promise<Types.SuperStickerPackCatalog> {
        return this.refetch('SuperStickerPackCatalog', undefined, params);
    }
    refetchCreatedStickerPacks(params?: QueryParameters): Promise<Types.CreatedStickerPacks> {
        return this.refetch('CreatedStickerPacks', undefined, params);
    }
    refetchSuperAllStickerPacks(params?: QueryParameters): Promise<Types.SuperAllStickerPacks> {
        return this.refetch('SuperAllStickerPacks', undefined, params);
    }
    refetchSuperStickerPack(variables: Types.SuperStickerPackVariables, params?: QueryParameters): Promise<Types.SuperStickerPack> {
        return this.refetch('SuperStickerPack', variables, params);
    }
    refetchGetState(params?: QueryParameters): Promise<Types.GetState> {
        return this.refetch('GetState', undefined, params);
    }
    refetchGetDifference(variables: Types.GetDifferenceVariables, params?: QueryParameters): Promise<Types.GetDifference> {
        return this.refetch('GetDifference', variables, params);
    }
    refetchGetSequenceState(variables: Types.GetSequenceStateVariables, params?: QueryParameters): Promise<Types.GetSequenceState> {
        return this.refetch('GetSequenceState', variables, params);
    }
    refetchGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params?: QueryParameters): Promise<Types.GetSequenceDifference> {
        return this.refetch('GetSequenceDifference', variables, params);
    }
    refetchGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params?: QueryParameters): Promise<Types.GetInitialDialogs> {
        return this.refetch('GetInitialDialogs', variables, params);
    }
    refetchUpdateUsers(variables: Types.UpdateUsersVariables, params?: QueryParameters): Promise<Types.UpdateUsers> {
        return this.refetch('UpdateUsers', variables, params);
    }
    refetchUser(variables: Types.UserVariables, params?: QueryParameters): Promise<Types.User> {
        return this.refetch('User', variables, params);
    }
    refetchUserNano(variables: Types.UserNanoVariables, params?: QueryParameters): Promise<Types.UserNano> {
        return this.refetch('UserNano', variables, params);
    }
    refetchUserFollowers(variables: Types.UserFollowersVariables, params?: QueryParameters): Promise<Types.UserFollowers> {
        return this.refetch('UserFollowers', variables, params);
    }
    refetchOnline(variables: Types.OnlineVariables, params?: QueryParameters): Promise<Types.Online> {
        return this.refetch('Online', variables, params);
    }
    refetchExplorePeople(variables: Types.ExplorePeopleVariables, params?: QueryParameters): Promise<Types.ExplorePeople> {
        return this.refetch('ExplorePeople', variables, params);
    }
    refetchSocialUserFollowers(variables: Types.SocialUserFollowersVariables, params?: QueryParameters): Promise<Types.SocialUserFollowers> {
        return this.refetch('SocialUserFollowers', variables, params);
    }
    refetchSocialUserFollowing(variables: Types.SocialUserFollowingVariables, params?: QueryParameters): Promise<Types.SocialUserFollowing> {
        return this.refetch('SocialUserFollowing', variables, params);
    }
    refetchVoiceChat(variables: Types.VoiceChatVariables, params?: QueryParameters): Promise<Types.VoiceChat> {
        return this.refetch('VoiceChat', variables, params);
    }
    refetchVoiceChatFull(variables: Types.VoiceChatFullVariables, params?: QueryParameters): Promise<Types.VoiceChatFull> {
        return this.refetch('VoiceChatFull', variables, params);
    }
    refetchVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params?: QueryParameters): Promise<Types.VoiceChatListeners> {
        return this.refetch('VoiceChatListeners', variables, params);
    }
    refetchActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params?: QueryParameters): Promise<Types.ActiveVoiceChats> {
        return this.refetch('ActiveVoiceChats', variables, params);
    }
    refetchVoiceChatUser(variables: Types.VoiceChatUserVariables, params?: QueryParameters): Promise<Types.VoiceChatUser> {
        return this.refetch('VoiceChatUser', variables, params);
    }
    refetchVoiceChatHandRaised(variables: Types.VoiceChatHandRaisedVariables, params?: QueryParameters): Promise<Types.VoiceChatHandRaised> {
        return this.refetch('VoiceChatHandRaised', variables, params);
    }
    refetchVoiceChatControls(variables: Types.VoiceChatControlsVariables, params?: QueryParameters): Promise<Types.VoiceChatControls> {
        return this.refetch('VoiceChatControls', variables, params);
    }
    refetchVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params?: QueryParameters): Promise<Types.VoiceChatEventsState> {
        return this.refetch('VoiceChatEventsState', variables, params);
    }
    refetchVoiceChatPrefetch(variables: Types.VoiceChatPrefetchVariables, params?: QueryParameters): Promise<Types.VoiceChatPrefetch> {
        return this.refetch('VoiceChatPrefetch', variables, params);
    }
    updateAccount(updater: (data: Types.Account) => Types.Account | null): Promise<boolean> {
        return this.updateQuery(updater, 'Account', undefined);
    }
    updateAccountInviteInfo(variables: Types.AccountInviteInfoVariables, updater: (data: Types.AccountInviteInfo) => Types.AccountInviteInfo | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountInviteInfo', variables);
    }
    updateAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, updater: (data: Types.AccountAppInviteInfo) => Types.AccountAppInviteInfo | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountAppInviteInfo', variables);
    }
    updateAccountAppInvite(updater: (data: Types.AccountAppInvite) => Types.AccountAppInvite | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountAppInvite', undefined);
    }
    updateProfilePrefill(updater: (data: Types.ProfilePrefill) => Types.ProfilePrefill | null): Promise<boolean> {
        return this.updateQuery(updater, 'ProfilePrefill', undefined);
    }
    updateFetchPushSettings(updater: (data: Types.FetchPushSettings) => Types.FetchPushSettings | null): Promise<boolean> {
        return this.updateQuery(updater, 'FetchPushSettings', undefined);
    }
    updateMyApps(updater: (data: Types.MyApps) => Types.MyApps | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyApps', undefined);
    }
    updateUserStorage(variables: Types.UserStorageVariables, updater: (data: Types.UserStorage) => Types.UserStorage | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserStorage', variables);
    }
    updateAuthPoints(updater: (data: Types.AuthPoints) => Types.AuthPoints | null): Promise<boolean> {
        return this.updateQuery(updater, 'AuthPoints', undefined);
    }
    updateIpLocation(updater: (data: Types.IpLocation) => Types.IpLocation | null): Promise<boolean> {
        return this.updateQuery(updater, 'IpLocation', undefined);
    }
    updateBlackListUpdatesState(updater: (data: Types.BlackListUpdatesState) => Types.BlackListUpdatesState | null): Promise<boolean> {
        return this.updateQuery(updater, 'BlackListUpdatesState', undefined);
    }
    updateMyBlackList(updater: (data: Types.MyBlackList) => Types.MyBlackList | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyBlackList', undefined);
    }
    updateDialogs(variables: Types.DialogsVariables, updater: (data: Types.Dialogs) => Types.Dialogs | null): Promise<boolean> {
        return this.updateQuery(updater, 'Dialogs', variables);
    }
    updateChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, updater: (data: Types.ChatNewReadLastRead) => Types.ChatNewReadLastRead | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatNewReadLastRead', variables);
    }
    updateChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, updater: (data: Types.ChatNewGetMessage) => Types.ChatNewGetMessage | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatNewGetMessage', variables);
    }
    updateChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, updater: (data: Types.ChatNewLoadBefore) => Types.ChatNewLoadBefore | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatNewLoadBefore', variables);
    }
    updateChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, updater: (data: Types.ChatNewLoadAfter) => Types.ChatNewLoadAfter | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatNewLoadAfter', variables);
    }
    updateRoomPico(variables: Types.RoomPicoVariables, updater: (data: Types.RoomPico) => Types.RoomPico | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomPico', variables);
    }
    updateRoomChat(variables: Types.RoomChatVariables, updater: (data: Types.RoomChat) => Types.RoomChat | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomChat', variables);
    }
    updateRoomSuper(variables: Types.RoomSuperVariables, updater: (data: Types.RoomSuper) => Types.RoomSuper | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomSuper', variables);
    }
    updateGlobalCounter(updater: (data: Types.GlobalCounter) => Types.GlobalCounter | null): Promise<boolean> {
        return this.updateQuery(updater, 'GlobalCounter', undefined);
    }
    updateMessagesBatch(variables: Types.MessagesBatchVariables, updater: (data: Types.MessagesBatch) => Types.MessagesBatch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesBatch', variables);
    }
    updateChatInit(variables: Types.ChatInitVariables, updater: (data: Types.ChatInit) => Types.ChatInit | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatInit', variables);
    }
    updateChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, updater: (data: Types.ChatInitFromUnread) => Types.ChatInitFromUnread | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatInitFromUnread', variables);
    }
    updateRoomSearch(variables: Types.RoomSearchVariables, updater: (data: Types.RoomSearch) => Types.RoomSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomSearch', variables);
    }
    updateRoomAdminMembers(variables: Types.RoomAdminMembersVariables, updater: (data: Types.RoomAdminMembers) => Types.RoomAdminMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomAdminMembers', variables);
    }
    updateRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, updater: (data: Types.RoomMembersPaginated) => Types.RoomMembersPaginated | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembersPaginated', variables);
    }
    updateRoomMembersSearch(variables: Types.RoomMembersSearchVariables, updater: (data: Types.RoomMembersSearch) => Types.RoomMembersSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembersSearch', variables);
    }
    updateRoomSocialImage(variables: Types.RoomSocialImageVariables, updater: (data: Types.RoomSocialImage) => Types.RoomSocialImage | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomSocialImage', variables);
    }
    updateRoomInviteLink(variables: Types.RoomInviteLinkVariables, updater: (data: Types.RoomInviteLink) => Types.RoomInviteLink | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomInviteLink', variables);
    }
    updateRoomInviteInfo(variables: Types.RoomInviteInfoVariables, updater: (data: Types.RoomInviteInfo) => Types.RoomInviteInfo | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomInviteInfo', variables);
    }
    updateResolvedInvite(variables: Types.ResolvedInviteVariables, updater: (data: Types.ResolvedInvite) => Types.ResolvedInvite | null): Promise<boolean> {
        return this.updateQuery(updater, 'ResolvedInvite', variables);
    }
    updateMessage(variables: Types.MessageVariables, updater: (data: Types.Message) => Types.Message | null): Promise<boolean> {
        return this.updateQuery(updater, 'Message', variables);
    }
    updateMessagesSearch(variables: Types.MessagesSearchVariables, updater: (data: Types.MessagesSearch) => Types.MessagesSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesSearch', variables);
    }
    updateMessagesSearchFull(variables: Types.MessagesSearchFullVariables, updater: (data: Types.MessagesSearchFull) => Types.MessagesSearchFull | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesSearchFull', variables);
    }
    updateChatJoin(variables: Types.ChatJoinVariables, updater: (data: Types.ChatJoin) => Types.ChatJoin | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatJoin', variables);
    }
    updateCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, updater: (data: Types.CommonChatsWithUser) => Types.CommonChatsWithUser | null): Promise<boolean> {
        return this.updateQuery(updater, 'CommonChatsWithUser', variables);
    }
    updateUserSearchForChat(variables: Types.UserSearchForChatVariables, updater: (data: Types.UserSearchForChat) => Types.UserSearchForChat | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserSearchForChat', variables);
    }
    updateCommentFullReactions(variables: Types.CommentFullReactionsVariables, updater: (data: Types.CommentFullReactions) => Types.CommentFullReactions | null): Promise<boolean> {
        return this.updateQuery(updater, 'CommentFullReactions', variables);
    }
    updateComments(variables: Types.CommentsVariables, updater: (data: Types.Comments) => Types.Comments | null): Promise<boolean> {
        return this.updateQuery(updater, 'Comments', variables);
    }
    updateConference(variables: Types.ConferenceVariables, updater: (data: Types.Conference) => Types.Conference | null): Promise<boolean> {
        return this.updateQuery(updater, 'Conference', variables);
    }
    updateConferenceMeta(variables: Types.ConferenceMetaVariables, updater: (data: Types.ConferenceMeta) => Types.ConferenceMeta | null): Promise<boolean> {
        return this.updateQuery(updater, 'ConferenceMeta', variables);
    }
    updateConferenceMedia(variables: Types.ConferenceMediaVariables, updater: (data: Types.ConferenceMedia) => Types.ConferenceMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'ConferenceMedia', variables);
    }
    updateMyContacts(variables: Types.MyContactsVariables, updater: (data: Types.MyContacts) => Types.MyContacts | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyContacts', variables);
    }
    updateMyContactsSearch(variables: Types.MyContactsSearchVariables, updater: (data: Types.MyContactsSearch) => Types.MyContactsSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyContactsSearch', variables);
    }
    updatePhonebookWasExported(updater: (data: Types.PhonebookWasExported) => Types.PhonebookWasExported | null): Promise<boolean> {
        return this.updateQuery(updater, 'PhonebookWasExported', undefined);
    }
    updateMyContactsState(updater: (data: Types.MyContactsState) => Types.MyContactsState | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyContactsState', undefined);
    }
    updateChannels(updater: (data: Types.Channels) => Types.Channels | null): Promise<boolean> {
        return this.updateQuery(updater, 'Channels', undefined);
    }
    updateChannel(variables: Types.ChannelVariables, updater: (data: Types.Channel) => Types.Channel | null): Promise<boolean> {
        return this.updateQuery(updater, 'Channel', variables);
    }
    updatePosts(variables: Types.PostsVariables, updater: (data: Types.Posts) => Types.Posts | null): Promise<boolean> {
        return this.updateQuery(updater, 'Posts', variables);
    }
    updatePost(variables: Types.PostVariables, updater: (data: Types.Post) => Types.Post | null): Promise<boolean> {
        return this.updateQuery(updater, 'Post', variables);
    }
    updateMyPostDrafts(variables: Types.MyPostDraftsVariables, updater: (data: Types.MyPostDrafts) => Types.MyPostDrafts | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyPostDrafts', variables);
    }
    updatePostDraft(variables: Types.PostDraftVariables, updater: (data: Types.PostDraft) => Types.PostDraft | null): Promise<boolean> {
        return this.updateQuery(updater, 'PostDraft', variables);
    }
    updateExploreRooms(variables: Types.ExploreRoomsVariables, updater: (data: Types.ExploreRooms) => Types.ExploreRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'ExploreRooms', variables);
    }
    updateDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, updater: (data: Types.DiscoverNoAuth) => Types.DiscoverNoAuth | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNoAuth', variables);
    }
    updateSuggestedRooms(updater: (data: Types.SuggestedRooms) => Types.SuggestedRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuggestedRooms', undefined);
    }
    updateUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, updater: (data: Types.UserAvailableRooms) => Types.UserAvailableRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserAvailableRooms', variables);
    }
    updateGlobalSearch(variables: Types.GlobalSearchVariables, updater: (data: Types.GlobalSearch) => Types.GlobalSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'GlobalSearch', variables);
    }
    updateDiscoverNextPage(variables: Types.DiscoverNextPageVariables, updater: (data: Types.DiscoverNextPage) => Types.DiscoverNextPage | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNextPage', variables);
    }
    updateDiscoverIsDone(updater: (data: Types.DiscoverIsDone) => Types.DiscoverIsDone | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverIsDone', undefined);
    }
    updateDiscoverState(updater: (data: Types.DiscoverState) => Types.DiscoverState | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverState', undefined);
    }
    updateDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, updater: (data: Types.DiscoverPopularNow) => Types.DiscoverPopularNow | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverPopularNow', variables);
    }
    updateDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, updater: (data: Types.DiscoverNewAndGrowing) => Types.DiscoverNewAndGrowing | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNewAndGrowing', variables);
    }
    updateDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, updater: (data: Types.DiscoverTopPremium) => Types.DiscoverTopPremium | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverTopPremium', variables);
    }
    updateDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, updater: (data: Types.DiscoverTopFree) => Types.DiscoverTopFree | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverTopFree', variables);
    }
    updateDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, updater: (data: Types.DiscoverPopularOrganizations) => Types.DiscoverPopularOrganizations | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverPopularOrganizations', variables);
    }
    updateDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, updater: (data: Types.DiscoverNewOrganizations) => Types.DiscoverNewOrganizations | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNewOrganizations', variables);
    }
    updateDiscoverSuggestedRooms(updater: (data: Types.DiscoverSuggestedRooms) => Types.DiscoverSuggestedRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverSuggestedRooms', undefined);
    }
    updateDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, updater: (data: Types.DiscoverCollectionsShort) => Types.DiscoverCollectionsShort | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverCollectionsShort', variables);
    }
    updateDiscoverCollections(variables: Types.DiscoverCollectionsVariables, updater: (data: Types.DiscoverCollections) => Types.DiscoverCollections | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverCollections', variables);
    }
    updateDiscoverCollection(variables: Types.DiscoverCollectionVariables, updater: (data: Types.DiscoverCollection) => Types.DiscoverCollection | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverCollection', variables);
    }
    updateDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, updater: (data: Types.DiscoverCollectionShort) => Types.DiscoverCollectionShort | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverCollectionShort', variables);
    }
    updateDiscoverEditorsChoice(updater: (data: Types.DiscoverEditorsChoice) => Types.DiscoverEditorsChoice | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverEditorsChoice', undefined);
    }
    updateMyCards(updater: (data: Types.MyCards) => Types.MyCards | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyCards', undefined);
    }
    updateMyWallet(updater: (data: Types.MyWallet) => Types.MyWallet | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyWallet', undefined);
    }
    updateTransactionsHistory(variables: Types.TransactionsHistoryVariables, updater: (data: Types.TransactionsHistory) => Types.TransactionsHistory | null): Promise<boolean> {
        return this.updateQuery(updater, 'TransactionsHistory', variables);
    }
    updateSubscriptions(updater: (data: Types.Subscriptions) => Types.Subscriptions | null): Promise<boolean> {
        return this.updateQuery(updater, 'Subscriptions', undefined);
    }
    updateStripeToken(updater: (data: Types.StripeToken) => Types.StripeToken | null): Promise<boolean> {
        return this.updateQuery(updater, 'StripeToken', undefined);
    }
    updateChatMentionSearch(variables: Types.ChatMentionSearchVariables, updater: (data: Types.ChatMentionSearch) => Types.ChatMentionSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatMentionSearch', variables);
    }
    updateMessageMultiSpan(variables: Types.MessageMultiSpanVariables, updater: (data: Types.MessageMultiSpan) => Types.MessageMultiSpan | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessageMultiSpan', variables);
    }
    updateMessageFullReactions(variables: Types.MessageFullReactionsVariables, updater: (data: Types.MessageFullReactions) => Types.MessageFullReactions | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessageFullReactions', variables);
    }
    updateMyNotifications(variables: Types.MyNotificationsVariables, updater: (data: Types.MyNotifications) => Types.MyNotifications | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyNotifications', variables);
    }
    updateMyNotificationCenter(updater: (data: Types.MyNotificationCenter) => Types.MyNotificationCenter | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyNotificationCenter', undefined);
    }
    updateOauthContext(variables: Types.OauthContextVariables, updater: (data: Types.OauthContext) => Types.OauthContext | null): Promise<boolean> {
        return this.updateQuery(updater, 'OauthContext', variables);
    }
    updateMyCommunities(updater: (data: Types.MyCommunities) => Types.MyCommunities | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyCommunities', undefined);
    }
    updateOrganization(variables: Types.OrganizationVariables, updater: (data: Types.Organization) => Types.Organization | null): Promise<boolean> {
        return this.updateQuery(updater, 'Organization', variables);
    }
    updateOrganizationPico(variables: Types.OrganizationPicoVariables, updater: (data: Types.OrganizationPico) => Types.OrganizationPico | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationPico', variables);
    }
    updateOrganizationMembers(variables: Types.OrganizationMembersVariables, updater: (data: Types.OrganizationMembers) => Types.OrganizationMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationMembers', variables);
    }
    updateOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, updater: (data: Types.OrganizationMembersSearch) => Types.OrganizationMembersSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationMembersSearch', variables);
    }
    updateOrganizationProfile(variables: Types.OrganizationProfileVariables, updater: (data: Types.OrganizationProfile) => Types.OrganizationProfile | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationProfile', variables);
    }
    updateOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, updater: (data: Types.OrganizationPublicInvite) => Types.OrganizationPublicInvite | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationPublicInvite', variables);
    }
    updateOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, updater: (data: Types.OrganizationPublicRooms) => Types.OrganizationPublicRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationPublicRooms', variables);
    }
    updateUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, updater: (data: Types.UserSearchForOrganization) => Types.UserSearchForOrganization | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserSearchForOrganization', variables);
    }
    updateSuperAdmins(updater: (data: Types.SuperAdmins) => Types.SuperAdmins | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperAdmins', undefined);
    }
    updateProfile(updater: (data: Types.Profile) => Types.Profile | null): Promise<boolean> {
        return this.updateQuery(updater, 'Profile', undefined);
    }
    updateSettings(updater: (data: Types.Settings) => Types.Settings | null): Promise<boolean> {
        return this.updateQuery(updater, 'Settings', undefined);
    }
    updateShouldAskForAppReview(updater: (data: Types.ShouldAskForAppReview) => Types.ShouldAskForAppReview | null): Promise<boolean> {
        return this.updateQuery(updater, 'ShouldAskForAppReview', undefined);
    }
    updateSharedMedia(variables: Types.SharedMediaVariables, updater: (data: Types.SharedMedia) => Types.SharedMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'SharedMedia', variables);
    }
    updateSharedMediaCounters(variables: Types.SharedMediaCountersVariables, updater: (data: Types.SharedMediaCounters) => Types.SharedMediaCounters | null): Promise<boolean> {
        return this.updateQuery(updater, 'SharedMediaCounters', variables);
    }
    updatePicSharedMedia(variables: Types.PicSharedMediaVariables, updater: (data: Types.PicSharedMedia) => Types.PicSharedMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'PicSharedMedia', variables);
    }
    updateResolveShortName(variables: Types.ResolveShortNameVariables, updater: (data: Types.ResolveShortName) => Types.ResolveShortName | null): Promise<boolean> {
        return this.updateQuery(updater, 'ResolveShortName', variables);
    }
    updateAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, updater: (data: Types.AuthResolveShortName) => Types.AuthResolveShortName | null): Promise<boolean> {
        return this.updateQuery(updater, 'AuthResolveShortName', variables);
    }
    updateUnviewedStickers(updater: (data: Types.UnviewedStickers) => Types.UnviewedStickers | null): Promise<boolean> {
        return this.updateQuery(updater, 'UnviewedStickers', undefined);
    }
    updateMyStickers(updater: (data: Types.MyStickers) => Types.MyStickers | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyStickers', undefined);
    }
    updateStickerPackCatalog(updater: (data: Types.StickerPackCatalog) => Types.StickerPackCatalog | null): Promise<boolean> {
        return this.updateQuery(updater, 'StickerPackCatalog', undefined);
    }
    updateStickerPack(variables: Types.StickerPackVariables, updater: (data: Types.StickerPack) => Types.StickerPack | null): Promise<boolean> {
        return this.updateQuery(updater, 'StickerPack', variables);
    }
    updateSuperStickerPackCatalog(updater: (data: Types.SuperStickerPackCatalog) => Types.SuperStickerPackCatalog | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperStickerPackCatalog', undefined);
    }
    updateCreatedStickerPacks(updater: (data: Types.CreatedStickerPacks) => Types.CreatedStickerPacks | null): Promise<boolean> {
        return this.updateQuery(updater, 'CreatedStickerPacks', undefined);
    }
    updateSuperAllStickerPacks(updater: (data: Types.SuperAllStickerPacks) => Types.SuperAllStickerPacks | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperAllStickerPacks', undefined);
    }
    updateSuperStickerPack(variables: Types.SuperStickerPackVariables, updater: (data: Types.SuperStickerPack) => Types.SuperStickerPack | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperStickerPack', variables);
    }
    updateGetState(updater: (data: Types.GetState) => Types.GetState | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetState', undefined);
    }
    updateGetDifference(variables: Types.GetDifferenceVariables, updater: (data: Types.GetDifference) => Types.GetDifference | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetDifference', variables);
    }
    updateGetSequenceState(variables: Types.GetSequenceStateVariables, updater: (data: Types.GetSequenceState) => Types.GetSequenceState | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetSequenceState', variables);
    }
    updateGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, updater: (data: Types.GetSequenceDifference) => Types.GetSequenceDifference | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetSequenceDifference', variables);
    }
    updateGetInitialDialogs(variables: Types.GetInitialDialogsVariables, updater: (data: Types.GetInitialDialogs) => Types.GetInitialDialogs | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetInitialDialogs', variables);
    }
    updateUpdateUsers(variables: Types.UpdateUsersVariables, updater: (data: Types.UpdateUsers) => Types.UpdateUsers | null): Promise<boolean> {
        return this.updateQuery(updater, 'UpdateUsers', variables);
    }
    updateUser(variables: Types.UserVariables, updater: (data: Types.User) => Types.User | null): Promise<boolean> {
        return this.updateQuery(updater, 'User', variables);
    }
    updateUserNano(variables: Types.UserNanoVariables, updater: (data: Types.UserNano) => Types.UserNano | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserNano', variables);
    }
    updateUserFollowers(variables: Types.UserFollowersVariables, updater: (data: Types.UserFollowers) => Types.UserFollowers | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserFollowers', variables);
    }
    updateOnline(variables: Types.OnlineVariables, updater: (data: Types.Online) => Types.Online | null): Promise<boolean> {
        return this.updateQuery(updater, 'Online', variables);
    }
    updateExplorePeople(variables: Types.ExplorePeopleVariables, updater: (data: Types.ExplorePeople) => Types.ExplorePeople | null): Promise<boolean> {
        return this.updateQuery(updater, 'ExplorePeople', variables);
    }
    updateSocialUserFollowers(variables: Types.SocialUserFollowersVariables, updater: (data: Types.SocialUserFollowers) => Types.SocialUserFollowers | null): Promise<boolean> {
        return this.updateQuery(updater, 'SocialUserFollowers', variables);
    }
    updateSocialUserFollowing(variables: Types.SocialUserFollowingVariables, updater: (data: Types.SocialUserFollowing) => Types.SocialUserFollowing | null): Promise<boolean> {
        return this.updateQuery(updater, 'SocialUserFollowing', variables);
    }
    updateVoiceChat(variables: Types.VoiceChatVariables, updater: (data: Types.VoiceChat) => Types.VoiceChat | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChat', variables);
    }
    updateVoiceChatFull(variables: Types.VoiceChatFullVariables, updater: (data: Types.VoiceChatFull) => Types.VoiceChatFull | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatFull', variables);
    }
    updateVoiceChatListeners(variables: Types.VoiceChatListenersVariables, updater: (data: Types.VoiceChatListeners) => Types.VoiceChatListeners | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatListeners', variables);
    }
    updateActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, updater: (data: Types.ActiveVoiceChats) => Types.ActiveVoiceChats | null): Promise<boolean> {
        return this.updateQuery(updater, 'ActiveVoiceChats', variables);
    }
    updateVoiceChatUser(variables: Types.VoiceChatUserVariables, updater: (data: Types.VoiceChatUser) => Types.VoiceChatUser | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatUser', variables);
    }
    updateVoiceChatHandRaised(variables: Types.VoiceChatHandRaisedVariables, updater: (data: Types.VoiceChatHandRaised) => Types.VoiceChatHandRaised | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatHandRaised', variables);
    }
    updateVoiceChatControls(variables: Types.VoiceChatControlsVariables, updater: (data: Types.VoiceChatControls) => Types.VoiceChatControls | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatControls', variables);
    }
    updateVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, updater: (data: Types.VoiceChatEventsState) => Types.VoiceChatEventsState | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatEventsState', variables);
    }
    updateVoiceChatPrefetch(variables: Types.VoiceChatPrefetchVariables, updater: (data: Types.VoiceChatPrefetch) => Types.VoiceChatPrefetch | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatPrefetch', variables);
    }
    useAccount(params: SpaceQueryWatchParameters & { suspense: false }): Types.Account | null;
    useAccount(params?: SpaceQueryWatchParameters): Types.Account;
    useAccount(params?: SpaceQueryWatchParameters): Types.Account | null {;
        return this.useQuery('Account', undefined, params);
    }
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.AccountInviteInfo | null;
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.AccountInviteInfo;
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.AccountInviteInfo | null {;
        return this.useQuery('AccountInviteInfo', variables, params);
    }
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.AccountAppInviteInfo | null;
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.AccountAppInviteInfo;
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.AccountAppInviteInfo | null {;
        return this.useQuery('AccountAppInviteInfo', variables, params);
    }
    useAccountAppInvite(params: SpaceQueryWatchParameters & { suspense: false }): Types.AccountAppInvite | null;
    useAccountAppInvite(params?: SpaceQueryWatchParameters): Types.AccountAppInvite;
    useAccountAppInvite(params?: SpaceQueryWatchParameters): Types.AccountAppInvite | null {;
        return this.useQuery('AccountAppInvite', undefined, params);
    }
    useProfilePrefill(params: SpaceQueryWatchParameters & { suspense: false }): Types.ProfilePrefill | null;
    useProfilePrefill(params?: SpaceQueryWatchParameters): Types.ProfilePrefill;
    useProfilePrefill(params?: SpaceQueryWatchParameters): Types.ProfilePrefill | null {;
        return this.useQuery('ProfilePrefill', undefined, params);
    }
    useFetchPushSettings(params: SpaceQueryWatchParameters & { suspense: false }): Types.FetchPushSettings | null;
    useFetchPushSettings(params?: SpaceQueryWatchParameters): Types.FetchPushSettings;
    useFetchPushSettings(params?: SpaceQueryWatchParameters): Types.FetchPushSettings | null {;
        return this.useQuery('FetchPushSettings', undefined, params);
    }
    useMyApps(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyApps | null;
    useMyApps(params?: SpaceQueryWatchParameters): Types.MyApps;
    useMyApps(params?: SpaceQueryWatchParameters): Types.MyApps | null {;
        return this.useQuery('MyApps', undefined, params);
    }
    useUserStorage(variables: Types.UserStorageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserStorage | null;
    useUserStorage(variables: Types.UserStorageVariables, params?: SpaceQueryWatchParameters): Types.UserStorage;
    useUserStorage(variables: Types.UserStorageVariables, params?: SpaceQueryWatchParameters): Types.UserStorage | null {;
        return this.useQuery('UserStorage', variables, params);
    }
    useAuthPoints(params: SpaceQueryWatchParameters & { suspense: false }): Types.AuthPoints | null;
    useAuthPoints(params?: SpaceQueryWatchParameters): Types.AuthPoints;
    useAuthPoints(params?: SpaceQueryWatchParameters): Types.AuthPoints | null {;
        return this.useQuery('AuthPoints', undefined, params);
    }
    useIpLocation(params: SpaceQueryWatchParameters & { suspense: false }): Types.IpLocation | null;
    useIpLocation(params?: SpaceQueryWatchParameters): Types.IpLocation;
    useIpLocation(params?: SpaceQueryWatchParameters): Types.IpLocation | null {;
        return this.useQuery('IpLocation', undefined, params);
    }
    useBlackListUpdatesState(params: SpaceQueryWatchParameters & { suspense: false }): Types.BlackListUpdatesState | null;
    useBlackListUpdatesState(params?: SpaceQueryWatchParameters): Types.BlackListUpdatesState;
    useBlackListUpdatesState(params?: SpaceQueryWatchParameters): Types.BlackListUpdatesState | null {;
        return this.useQuery('BlackListUpdatesState', undefined, params);
    }
    useMyBlackList(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyBlackList | null;
    useMyBlackList(params?: SpaceQueryWatchParameters): Types.MyBlackList;
    useMyBlackList(params?: SpaceQueryWatchParameters): Types.MyBlackList | null {;
        return this.useQuery('MyBlackList', undefined, params);
    }
    useDialogs(variables: Types.DialogsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Dialogs | null;
    useDialogs(variables: Types.DialogsVariables, params?: SpaceQueryWatchParameters): Types.Dialogs;
    useDialogs(variables: Types.DialogsVariables, params?: SpaceQueryWatchParameters): Types.Dialogs | null {;
        return this.useQuery('Dialogs', variables, params);
    }
    useChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatNewReadLastRead | null;
    useChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params?: SpaceQueryWatchParameters): Types.ChatNewReadLastRead;
    useChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params?: SpaceQueryWatchParameters): Types.ChatNewReadLastRead | null {;
        return this.useQuery('ChatNewReadLastRead', variables, params);
    }
    useChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatNewGetMessage | null;
    useChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params?: SpaceQueryWatchParameters): Types.ChatNewGetMessage;
    useChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params?: SpaceQueryWatchParameters): Types.ChatNewGetMessage | null {;
        return this.useQuery('ChatNewGetMessage', variables, params);
    }
    useChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatNewLoadBefore | null;
    useChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params?: SpaceQueryWatchParameters): Types.ChatNewLoadBefore;
    useChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params?: SpaceQueryWatchParameters): Types.ChatNewLoadBefore | null {;
        return this.useQuery('ChatNewLoadBefore', variables, params);
    }
    useChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatNewLoadAfter | null;
    useChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params?: SpaceQueryWatchParameters): Types.ChatNewLoadAfter;
    useChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params?: SpaceQueryWatchParameters): Types.ChatNewLoadAfter | null {;
        return this.useQuery('ChatNewLoadAfter', variables, params);
    }
    useRoomPico(variables: Types.RoomPicoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomPico | null;
    useRoomPico(variables: Types.RoomPicoVariables, params?: SpaceQueryWatchParameters): Types.RoomPico;
    useRoomPico(variables: Types.RoomPicoVariables, params?: SpaceQueryWatchParameters): Types.RoomPico | null {;
        return this.useQuery('RoomPico', variables, params);
    }
    useRoomChat(variables: Types.RoomChatVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomChat | null;
    useRoomChat(variables: Types.RoomChatVariables, params?: SpaceQueryWatchParameters): Types.RoomChat;
    useRoomChat(variables: Types.RoomChatVariables, params?: SpaceQueryWatchParameters): Types.RoomChat | null {;
        return this.useQuery('RoomChat', variables, params);
    }
    useRoomSuper(variables: Types.RoomSuperVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSuper | null;
    useRoomSuper(variables: Types.RoomSuperVariables, params?: SpaceQueryWatchParameters): Types.RoomSuper;
    useRoomSuper(variables: Types.RoomSuperVariables, params?: SpaceQueryWatchParameters): Types.RoomSuper | null {;
        return this.useQuery('RoomSuper', variables, params);
    }
    useGlobalCounter(params: SpaceQueryWatchParameters & { suspense: false }): Types.GlobalCounter | null;
    useGlobalCounter(params?: SpaceQueryWatchParameters): Types.GlobalCounter;
    useGlobalCounter(params?: SpaceQueryWatchParameters): Types.GlobalCounter | null {;
        return this.useQuery('GlobalCounter', undefined, params);
    }
    useMessagesBatch(variables: Types.MessagesBatchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesBatch | null;
    useMessagesBatch(variables: Types.MessagesBatchVariables, params?: SpaceQueryWatchParameters): Types.MessagesBatch;
    useMessagesBatch(variables: Types.MessagesBatchVariables, params?: SpaceQueryWatchParameters): Types.MessagesBatch | null {;
        return this.useQuery('MessagesBatch', variables, params);
    }
    useChatInit(variables: Types.ChatInitVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatInit | null;
    useChatInit(variables: Types.ChatInitVariables, params?: SpaceQueryWatchParameters): Types.ChatInit;
    useChatInit(variables: Types.ChatInitVariables, params?: SpaceQueryWatchParameters): Types.ChatInit | null {;
        return this.useQuery('ChatInit', variables, params);
    }
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatInitFromUnread | null;
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params?: SpaceQueryWatchParameters): Types.ChatInitFromUnread;
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params?: SpaceQueryWatchParameters): Types.ChatInitFromUnread | null {;
        return this.useQuery('ChatInitFromUnread', variables, params);
    }
    useRoomSearch(variables: Types.RoomSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSearch | null;
    useRoomSearch(variables: Types.RoomSearchVariables, params?: SpaceQueryWatchParameters): Types.RoomSearch;
    useRoomSearch(variables: Types.RoomSearchVariables, params?: SpaceQueryWatchParameters): Types.RoomSearch | null {;
        return this.useQuery('RoomSearch', variables, params);
    }
    useRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomAdminMembers | null;
    useRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params?: SpaceQueryWatchParameters): Types.RoomAdminMembers;
    useRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params?: SpaceQueryWatchParameters): Types.RoomAdminMembers | null {;
        return this.useQuery('RoomAdminMembers', variables, params);
    }
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersPaginated | null;
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersPaginated;
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersPaginated | null {;
        return this.useQuery('RoomMembersPaginated', variables, params);
    }
    useRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersSearch | null;
    useRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersSearch;
    useRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersSearch | null {;
        return this.useQuery('RoomMembersSearch', variables, params);
    }
    useRoomSocialImage(variables: Types.RoomSocialImageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSocialImage | null;
    useRoomSocialImage(variables: Types.RoomSocialImageVariables, params?: SpaceQueryWatchParameters): Types.RoomSocialImage;
    useRoomSocialImage(variables: Types.RoomSocialImageVariables, params?: SpaceQueryWatchParameters): Types.RoomSocialImage | null {;
        return this.useQuery('RoomSocialImage', variables, params);
    }
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomInviteLink | null;
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, params?: SpaceQueryWatchParameters): Types.RoomInviteLink;
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, params?: SpaceQueryWatchParameters): Types.RoomInviteLink | null {;
        return this.useQuery('RoomInviteLink', variables, params);
    }
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomInviteInfo | null;
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.RoomInviteInfo;
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.RoomInviteInfo | null {;
        return this.useQuery('RoomInviteInfo', variables, params);
    }
    useResolvedInvite(variables: Types.ResolvedInviteVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ResolvedInvite | null;
    useResolvedInvite(variables: Types.ResolvedInviteVariables, params?: SpaceQueryWatchParameters): Types.ResolvedInvite;
    useResolvedInvite(variables: Types.ResolvedInviteVariables, params?: SpaceQueryWatchParameters): Types.ResolvedInvite | null {;
        return this.useQuery('ResolvedInvite', variables, params);
    }
    useMessage(variables: Types.MessageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Message | null;
    useMessage(variables: Types.MessageVariables, params?: SpaceQueryWatchParameters): Types.Message;
    useMessage(variables: Types.MessageVariables, params?: SpaceQueryWatchParameters): Types.Message | null {;
        return this.useQuery('Message', variables, params);
    }
    useMessagesSearch(variables: Types.MessagesSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesSearch | null;
    useMessagesSearch(variables: Types.MessagesSearchVariables, params?: SpaceQueryWatchParameters): Types.MessagesSearch;
    useMessagesSearch(variables: Types.MessagesSearchVariables, params?: SpaceQueryWatchParameters): Types.MessagesSearch | null {;
        return this.useQuery('MessagesSearch', variables, params);
    }
    useMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesSearchFull | null;
    useMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params?: SpaceQueryWatchParameters): Types.MessagesSearchFull;
    useMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params?: SpaceQueryWatchParameters): Types.MessagesSearchFull | null {;
        return this.useQuery('MessagesSearchFull', variables, params);
    }
    useChatJoin(variables: Types.ChatJoinVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatJoin | null;
    useChatJoin(variables: Types.ChatJoinVariables, params?: SpaceQueryWatchParameters): Types.ChatJoin;
    useChatJoin(variables: Types.ChatJoinVariables, params?: SpaceQueryWatchParameters): Types.ChatJoin | null {;
        return this.useQuery('ChatJoin', variables, params);
    }
    useCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.CommonChatsWithUser | null;
    useCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params?: SpaceQueryWatchParameters): Types.CommonChatsWithUser;
    useCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params?: SpaceQueryWatchParameters): Types.CommonChatsWithUser | null {;
        return this.useQuery('CommonChatsWithUser', variables, params);
    }
    useUserSearchForChat(variables: Types.UserSearchForChatVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserSearchForChat | null;
    useUserSearchForChat(variables: Types.UserSearchForChatVariables, params?: SpaceQueryWatchParameters): Types.UserSearchForChat;
    useUserSearchForChat(variables: Types.UserSearchForChatVariables, params?: SpaceQueryWatchParameters): Types.UserSearchForChat | null {;
        return this.useQuery('UserSearchForChat', variables, params);
    }
    useCommentFullReactions(variables: Types.CommentFullReactionsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.CommentFullReactions | null;
    useCommentFullReactions(variables: Types.CommentFullReactionsVariables, params?: SpaceQueryWatchParameters): Types.CommentFullReactions;
    useCommentFullReactions(variables: Types.CommentFullReactionsVariables, params?: SpaceQueryWatchParameters): Types.CommentFullReactions | null {;
        return this.useQuery('CommentFullReactions', variables, params);
    }
    useComments(variables: Types.CommentsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Comments | null;
    useComments(variables: Types.CommentsVariables, params?: SpaceQueryWatchParameters): Types.Comments;
    useComments(variables: Types.CommentsVariables, params?: SpaceQueryWatchParameters): Types.Comments | null {;
        return this.useQuery('Comments', variables, params);
    }
    useConference(variables: Types.ConferenceVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Conference | null;
    useConference(variables: Types.ConferenceVariables, params?: SpaceQueryWatchParameters): Types.Conference;
    useConference(variables: Types.ConferenceVariables, params?: SpaceQueryWatchParameters): Types.Conference | null {;
        return this.useQuery('Conference', variables, params);
    }
    useConferenceMeta(variables: Types.ConferenceMetaVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ConferenceMeta | null;
    useConferenceMeta(variables: Types.ConferenceMetaVariables, params?: SpaceQueryWatchParameters): Types.ConferenceMeta;
    useConferenceMeta(variables: Types.ConferenceMetaVariables, params?: SpaceQueryWatchParameters): Types.ConferenceMeta | null {;
        return this.useQuery('ConferenceMeta', variables, params);
    }
    useConferenceMedia(variables: Types.ConferenceMediaVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ConferenceMedia | null;
    useConferenceMedia(variables: Types.ConferenceMediaVariables, params?: SpaceQueryWatchParameters): Types.ConferenceMedia;
    useConferenceMedia(variables: Types.ConferenceMediaVariables, params?: SpaceQueryWatchParameters): Types.ConferenceMedia | null {;
        return this.useQuery('ConferenceMedia', variables, params);
    }
    useMyContacts(variables: Types.MyContactsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MyContacts | null;
    useMyContacts(variables: Types.MyContactsVariables, params?: SpaceQueryWatchParameters): Types.MyContacts;
    useMyContacts(variables: Types.MyContactsVariables, params?: SpaceQueryWatchParameters): Types.MyContacts | null {;
        return this.useQuery('MyContacts', variables, params);
    }
    useMyContactsSearch(variables: Types.MyContactsSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MyContactsSearch | null;
    useMyContactsSearch(variables: Types.MyContactsSearchVariables, params?: SpaceQueryWatchParameters): Types.MyContactsSearch;
    useMyContactsSearch(variables: Types.MyContactsSearchVariables, params?: SpaceQueryWatchParameters): Types.MyContactsSearch | null {;
        return this.useQuery('MyContactsSearch', variables, params);
    }
    usePhonebookWasExported(params: SpaceQueryWatchParameters & { suspense: false }): Types.PhonebookWasExported | null;
    usePhonebookWasExported(params?: SpaceQueryWatchParameters): Types.PhonebookWasExported;
    usePhonebookWasExported(params?: SpaceQueryWatchParameters): Types.PhonebookWasExported | null {;
        return this.useQuery('PhonebookWasExported', undefined, params);
    }
    useMyContactsState(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyContactsState | null;
    useMyContactsState(params?: SpaceQueryWatchParameters): Types.MyContactsState;
    useMyContactsState(params?: SpaceQueryWatchParameters): Types.MyContactsState | null {;
        return this.useQuery('MyContactsState', undefined, params);
    }
    useChannels(params: SpaceQueryWatchParameters & { suspense: false }): Types.Channels | null;
    useChannels(params?: SpaceQueryWatchParameters): Types.Channels;
    useChannels(params?: SpaceQueryWatchParameters): Types.Channels | null {;
        return this.useQuery('Channels', undefined, params);
    }
    useChannel(variables: Types.ChannelVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Channel | null;
    useChannel(variables: Types.ChannelVariables, params?: SpaceQueryWatchParameters): Types.Channel;
    useChannel(variables: Types.ChannelVariables, params?: SpaceQueryWatchParameters): Types.Channel | null {;
        return this.useQuery('Channel', variables, params);
    }
    usePosts(variables: Types.PostsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Posts | null;
    usePosts(variables: Types.PostsVariables, params?: SpaceQueryWatchParameters): Types.Posts;
    usePosts(variables: Types.PostsVariables, params?: SpaceQueryWatchParameters): Types.Posts | null {;
        return this.useQuery('Posts', variables, params);
    }
    usePost(variables: Types.PostVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Post | null;
    usePost(variables: Types.PostVariables, params?: SpaceQueryWatchParameters): Types.Post;
    usePost(variables: Types.PostVariables, params?: SpaceQueryWatchParameters): Types.Post | null {;
        return this.useQuery('Post', variables, params);
    }
    useMyPostDrafts(variables: Types.MyPostDraftsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MyPostDrafts | null;
    useMyPostDrafts(variables: Types.MyPostDraftsVariables, params?: SpaceQueryWatchParameters): Types.MyPostDrafts;
    useMyPostDrafts(variables: Types.MyPostDraftsVariables, params?: SpaceQueryWatchParameters): Types.MyPostDrafts | null {;
        return this.useQuery('MyPostDrafts', variables, params);
    }
    usePostDraft(variables: Types.PostDraftVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.PostDraft | null;
    usePostDraft(variables: Types.PostDraftVariables, params?: SpaceQueryWatchParameters): Types.PostDraft;
    usePostDraft(variables: Types.PostDraftVariables, params?: SpaceQueryWatchParameters): Types.PostDraft | null {;
        return this.useQuery('PostDraft', variables, params);
    }
    useExploreRooms(variables: Types.ExploreRoomsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ExploreRooms | null;
    useExploreRooms(variables: Types.ExploreRoomsVariables, params?: SpaceQueryWatchParameters): Types.ExploreRooms;
    useExploreRooms(variables: Types.ExploreRoomsVariables, params?: SpaceQueryWatchParameters): Types.ExploreRooms | null {;
        return this.useQuery('ExploreRooms', variables, params);
    }
    useDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNoAuth | null;
    useDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNoAuth;
    useDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNoAuth | null {;
        return this.useQuery('DiscoverNoAuth', variables, params);
    }
    useSuggestedRooms(params: SpaceQueryWatchParameters & { suspense: false }): Types.SuggestedRooms | null;
    useSuggestedRooms(params?: SpaceQueryWatchParameters): Types.SuggestedRooms;
    useSuggestedRooms(params?: SpaceQueryWatchParameters): Types.SuggestedRooms | null {;
        return this.useQuery('SuggestedRooms', undefined, params);
    }
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserAvailableRooms | null;
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params?: SpaceQueryWatchParameters): Types.UserAvailableRooms;
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params?: SpaceQueryWatchParameters): Types.UserAvailableRooms | null {;
        return this.useQuery('UserAvailableRooms', variables, params);
    }
    useGlobalSearch(variables: Types.GlobalSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GlobalSearch | null;
    useGlobalSearch(variables: Types.GlobalSearchVariables, params?: SpaceQueryWatchParameters): Types.GlobalSearch;
    useGlobalSearch(variables: Types.GlobalSearchVariables, params?: SpaceQueryWatchParameters): Types.GlobalSearch | null {;
        return this.useQuery('GlobalSearch', variables, params);
    }
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNextPage | null;
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNextPage;
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNextPage | null {;
        return this.useQuery('DiscoverNextPage', variables, params);
    }
    useDiscoverIsDone(params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverIsDone | null;
    useDiscoverIsDone(params?: SpaceQueryWatchParameters): Types.DiscoverIsDone;
    useDiscoverIsDone(params?: SpaceQueryWatchParameters): Types.DiscoverIsDone | null {;
        return this.useQuery('DiscoverIsDone', undefined, params);
    }
    useDiscoverState(params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverState | null;
    useDiscoverState(params?: SpaceQueryWatchParameters): Types.DiscoverState;
    useDiscoverState(params?: SpaceQueryWatchParameters): Types.DiscoverState | null {;
        return this.useQuery('DiscoverState', undefined, params);
    }
    useDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverPopularNow | null;
    useDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params?: SpaceQueryWatchParameters): Types.DiscoverPopularNow;
    useDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params?: SpaceQueryWatchParameters): Types.DiscoverPopularNow | null {;
        return this.useQuery('DiscoverPopularNow', variables, params);
    }
    useDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNewAndGrowing | null;
    useDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNewAndGrowing;
    useDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNewAndGrowing | null {;
        return this.useQuery('DiscoverNewAndGrowing', variables, params);
    }
    useDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverTopPremium | null;
    useDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params?: SpaceQueryWatchParameters): Types.DiscoverTopPremium;
    useDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params?: SpaceQueryWatchParameters): Types.DiscoverTopPremium | null {;
        return this.useQuery('DiscoverTopPremium', variables, params);
    }
    useDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverTopFree | null;
    useDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params?: SpaceQueryWatchParameters): Types.DiscoverTopFree;
    useDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params?: SpaceQueryWatchParameters): Types.DiscoverTopFree | null {;
        return this.useQuery('DiscoverTopFree', variables, params);
    }
    useDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverPopularOrganizations | null;
    useDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverPopularOrganizations;
    useDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverPopularOrganizations | null {;
        return this.useQuery('DiscoverPopularOrganizations', variables, params);
    }
    useDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNewOrganizations | null;
    useDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNewOrganizations;
    useDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNewOrganizations | null {;
        return this.useQuery('DiscoverNewOrganizations', variables, params);
    }
    useDiscoverSuggestedRooms(params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverSuggestedRooms | null;
    useDiscoverSuggestedRooms(params?: SpaceQueryWatchParameters): Types.DiscoverSuggestedRooms;
    useDiscoverSuggestedRooms(params?: SpaceQueryWatchParameters): Types.DiscoverSuggestedRooms | null {;
        return this.useQuery('DiscoverSuggestedRooms', undefined, params);
    }
    useDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollectionsShort | null;
    useDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollectionsShort;
    useDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollectionsShort | null {;
        return this.useQuery('DiscoverCollectionsShort', variables, params);
    }
    useDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollections | null;
    useDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollections;
    useDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollections | null {;
        return this.useQuery('DiscoverCollections', variables, params);
    }
    useDiscoverCollection(variables: Types.DiscoverCollectionVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollection | null;
    useDiscoverCollection(variables: Types.DiscoverCollectionVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollection;
    useDiscoverCollection(variables: Types.DiscoverCollectionVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollection | null {;
        return this.useQuery('DiscoverCollection', variables, params);
    }
    useDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollectionShort | null;
    useDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollectionShort;
    useDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollectionShort | null {;
        return this.useQuery('DiscoverCollectionShort', variables, params);
    }
    useDiscoverEditorsChoice(params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverEditorsChoice | null;
    useDiscoverEditorsChoice(params?: SpaceQueryWatchParameters): Types.DiscoverEditorsChoice;
    useDiscoverEditorsChoice(params?: SpaceQueryWatchParameters): Types.DiscoverEditorsChoice | null {;
        return this.useQuery('DiscoverEditorsChoice', undefined, params);
    }
    useMyCards(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyCards | null;
    useMyCards(params?: SpaceQueryWatchParameters): Types.MyCards;
    useMyCards(params?: SpaceQueryWatchParameters): Types.MyCards | null {;
        return this.useQuery('MyCards', undefined, params);
    }
    useMyWallet(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyWallet | null;
    useMyWallet(params?: SpaceQueryWatchParameters): Types.MyWallet;
    useMyWallet(params?: SpaceQueryWatchParameters): Types.MyWallet | null {;
        return this.useQuery('MyWallet', undefined, params);
    }
    useTransactionsHistory(variables: Types.TransactionsHistoryVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.TransactionsHistory | null;
    useTransactionsHistory(variables: Types.TransactionsHistoryVariables, params?: SpaceQueryWatchParameters): Types.TransactionsHistory;
    useTransactionsHistory(variables: Types.TransactionsHistoryVariables, params?: SpaceQueryWatchParameters): Types.TransactionsHistory | null {;
        return this.useQuery('TransactionsHistory', variables, params);
    }
    useSubscriptions(params: SpaceQueryWatchParameters & { suspense: false }): Types.Subscriptions | null;
    useSubscriptions(params?: SpaceQueryWatchParameters): Types.Subscriptions;
    useSubscriptions(params?: SpaceQueryWatchParameters): Types.Subscriptions | null {;
        return this.useQuery('Subscriptions', undefined, params);
    }
    useStripeToken(params: SpaceQueryWatchParameters & { suspense: false }): Types.StripeToken | null;
    useStripeToken(params?: SpaceQueryWatchParameters): Types.StripeToken;
    useStripeToken(params?: SpaceQueryWatchParameters): Types.StripeToken | null {;
        return this.useQuery('StripeToken', undefined, params);
    }
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatMentionSearch | null;
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, params?: SpaceQueryWatchParameters): Types.ChatMentionSearch;
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, params?: SpaceQueryWatchParameters): Types.ChatMentionSearch | null {;
        return this.useQuery('ChatMentionSearch', variables, params);
    }
    useMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessageMultiSpan | null;
    useMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params?: SpaceQueryWatchParameters): Types.MessageMultiSpan;
    useMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params?: SpaceQueryWatchParameters): Types.MessageMultiSpan | null {;
        return this.useQuery('MessageMultiSpan', variables, params);
    }
    useMessageFullReactions(variables: Types.MessageFullReactionsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessageFullReactions | null;
    useMessageFullReactions(variables: Types.MessageFullReactionsVariables, params?: SpaceQueryWatchParameters): Types.MessageFullReactions;
    useMessageFullReactions(variables: Types.MessageFullReactionsVariables, params?: SpaceQueryWatchParameters): Types.MessageFullReactions | null {;
        return this.useQuery('MessageFullReactions', variables, params);
    }
    useMyNotifications(variables: Types.MyNotificationsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MyNotifications | null;
    useMyNotifications(variables: Types.MyNotificationsVariables, params?: SpaceQueryWatchParameters): Types.MyNotifications;
    useMyNotifications(variables: Types.MyNotificationsVariables, params?: SpaceQueryWatchParameters): Types.MyNotifications | null {;
        return this.useQuery('MyNotifications', variables, params);
    }
    useMyNotificationCenter(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyNotificationCenter | null;
    useMyNotificationCenter(params?: SpaceQueryWatchParameters): Types.MyNotificationCenter;
    useMyNotificationCenter(params?: SpaceQueryWatchParameters): Types.MyNotificationCenter | null {;
        return this.useQuery('MyNotificationCenter', undefined, params);
    }
    useOauthContext(variables: Types.OauthContextVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OauthContext | null;
    useOauthContext(variables: Types.OauthContextVariables, params?: SpaceQueryWatchParameters): Types.OauthContext;
    useOauthContext(variables: Types.OauthContextVariables, params?: SpaceQueryWatchParameters): Types.OauthContext | null {;
        return this.useQuery('OauthContext', variables, params);
    }
    useMyCommunities(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyCommunities | null;
    useMyCommunities(params?: SpaceQueryWatchParameters): Types.MyCommunities;
    useMyCommunities(params?: SpaceQueryWatchParameters): Types.MyCommunities | null {;
        return this.useQuery('MyCommunities', undefined, params);
    }
    useOrganization(variables: Types.OrganizationVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Organization | null;
    useOrganization(variables: Types.OrganizationVariables, params?: SpaceQueryWatchParameters): Types.Organization;
    useOrganization(variables: Types.OrganizationVariables, params?: SpaceQueryWatchParameters): Types.Organization | null {;
        return this.useQuery('Organization', variables, params);
    }
    useOrganizationPico(variables: Types.OrganizationPicoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPico | null;
    useOrganizationPico(variables: Types.OrganizationPicoVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPico;
    useOrganizationPico(variables: Types.OrganizationPicoVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPico | null {;
        return this.useQuery('OrganizationPico', variables, params);
    }
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationMembers | null;
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembers;
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembers | null {;
        return this.useQuery('OrganizationMembers', variables, params);
    }
    useOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationMembersSearch | null;
    useOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembersSearch;
    useOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembersSearch | null {;
        return this.useQuery('OrganizationMembersSearch', variables, params);
    }
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationProfile | null;
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, params?: SpaceQueryWatchParameters): Types.OrganizationProfile;
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, params?: SpaceQueryWatchParameters): Types.OrganizationProfile | null {;
        return this.useQuery('OrganizationProfile', variables, params);
    }
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPublicInvite | null;
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPublicInvite;
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPublicInvite | null {;
        return this.useQuery('OrganizationPublicInvite', variables, params);
    }
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPublicRooms | null;
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPublicRooms;
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPublicRooms | null {;
        return this.useQuery('OrganizationPublicRooms', variables, params);
    }
    useUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserSearchForOrganization | null;
    useUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params?: SpaceQueryWatchParameters): Types.UserSearchForOrganization;
    useUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params?: SpaceQueryWatchParameters): Types.UserSearchForOrganization | null {;
        return this.useQuery('UserSearchForOrganization', variables, params);
    }
    useSuperAdmins(params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAdmins | null;
    useSuperAdmins(params?: SpaceQueryWatchParameters): Types.SuperAdmins;
    useSuperAdmins(params?: SpaceQueryWatchParameters): Types.SuperAdmins | null {;
        return this.useQuery('SuperAdmins', undefined, params);
    }
    useProfile(params: SpaceQueryWatchParameters & { suspense: false }): Types.Profile | null;
    useProfile(params?: SpaceQueryWatchParameters): Types.Profile;
    useProfile(params?: SpaceQueryWatchParameters): Types.Profile | null {;
        return this.useQuery('Profile', undefined, params);
    }
    useSettings(params: SpaceQueryWatchParameters & { suspense: false }): Types.Settings | null;
    useSettings(params?: SpaceQueryWatchParameters): Types.Settings;
    useSettings(params?: SpaceQueryWatchParameters): Types.Settings | null {;
        return this.useQuery('Settings', undefined, params);
    }
    useShouldAskForAppReview(params: SpaceQueryWatchParameters & { suspense: false }): Types.ShouldAskForAppReview | null;
    useShouldAskForAppReview(params?: SpaceQueryWatchParameters): Types.ShouldAskForAppReview;
    useShouldAskForAppReview(params?: SpaceQueryWatchParameters): Types.ShouldAskForAppReview | null {;
        return this.useQuery('ShouldAskForAppReview', undefined, params);
    }
    useSharedMedia(variables: Types.SharedMediaVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SharedMedia | null;
    useSharedMedia(variables: Types.SharedMediaVariables, params?: SpaceQueryWatchParameters): Types.SharedMedia;
    useSharedMedia(variables: Types.SharedMediaVariables, params?: SpaceQueryWatchParameters): Types.SharedMedia | null {;
        return this.useQuery('SharedMedia', variables, params);
    }
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SharedMediaCounters | null;
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, params?: SpaceQueryWatchParameters): Types.SharedMediaCounters;
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, params?: SpaceQueryWatchParameters): Types.SharedMediaCounters | null {;
        return this.useQuery('SharedMediaCounters', variables, params);
    }
    usePicSharedMedia(variables: Types.PicSharedMediaVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.PicSharedMedia | null;
    usePicSharedMedia(variables: Types.PicSharedMediaVariables, params?: SpaceQueryWatchParameters): Types.PicSharedMedia;
    usePicSharedMedia(variables: Types.PicSharedMediaVariables, params?: SpaceQueryWatchParameters): Types.PicSharedMedia | null {;
        return this.useQuery('PicSharedMedia', variables, params);
    }
    useResolveShortName(variables: Types.ResolveShortNameVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ResolveShortName | null;
    useResolveShortName(variables: Types.ResolveShortNameVariables, params?: SpaceQueryWatchParameters): Types.ResolveShortName;
    useResolveShortName(variables: Types.ResolveShortNameVariables, params?: SpaceQueryWatchParameters): Types.ResolveShortName | null {;
        return this.useQuery('ResolveShortName', variables, params);
    }
    useAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.AuthResolveShortName | null;
    useAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params?: SpaceQueryWatchParameters): Types.AuthResolveShortName;
    useAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params?: SpaceQueryWatchParameters): Types.AuthResolveShortName | null {;
        return this.useQuery('AuthResolveShortName', variables, params);
    }
    useUnviewedStickers(params: SpaceQueryWatchParameters & { suspense: false }): Types.UnviewedStickers | null;
    useUnviewedStickers(params?: SpaceQueryWatchParameters): Types.UnviewedStickers;
    useUnviewedStickers(params?: SpaceQueryWatchParameters): Types.UnviewedStickers | null {;
        return this.useQuery('UnviewedStickers', undefined, params);
    }
    useMyStickers(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyStickers | null;
    useMyStickers(params?: SpaceQueryWatchParameters): Types.MyStickers;
    useMyStickers(params?: SpaceQueryWatchParameters): Types.MyStickers | null {;
        return this.useQuery('MyStickers', undefined, params);
    }
    useStickerPackCatalog(params: SpaceQueryWatchParameters & { suspense: false }): Types.StickerPackCatalog | null;
    useStickerPackCatalog(params?: SpaceQueryWatchParameters): Types.StickerPackCatalog;
    useStickerPackCatalog(params?: SpaceQueryWatchParameters): Types.StickerPackCatalog | null {;
        return this.useQuery('StickerPackCatalog', undefined, params);
    }
    useStickerPack(variables: Types.StickerPackVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.StickerPack | null;
    useStickerPack(variables: Types.StickerPackVariables, params?: SpaceQueryWatchParameters): Types.StickerPack;
    useStickerPack(variables: Types.StickerPackVariables, params?: SpaceQueryWatchParameters): Types.StickerPack | null {;
        return this.useQuery('StickerPack', variables, params);
    }
    useSuperStickerPackCatalog(params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperStickerPackCatalog | null;
    useSuperStickerPackCatalog(params?: SpaceQueryWatchParameters): Types.SuperStickerPackCatalog;
    useSuperStickerPackCatalog(params?: SpaceQueryWatchParameters): Types.SuperStickerPackCatalog | null {;
        return this.useQuery('SuperStickerPackCatalog', undefined, params);
    }
    useCreatedStickerPacks(params: SpaceQueryWatchParameters & { suspense: false }): Types.CreatedStickerPacks | null;
    useCreatedStickerPacks(params?: SpaceQueryWatchParameters): Types.CreatedStickerPacks;
    useCreatedStickerPacks(params?: SpaceQueryWatchParameters): Types.CreatedStickerPacks | null {;
        return this.useQuery('CreatedStickerPacks', undefined, params);
    }
    useSuperAllStickerPacks(params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAllStickerPacks | null;
    useSuperAllStickerPacks(params?: SpaceQueryWatchParameters): Types.SuperAllStickerPacks;
    useSuperAllStickerPacks(params?: SpaceQueryWatchParameters): Types.SuperAllStickerPacks | null {;
        return this.useQuery('SuperAllStickerPacks', undefined, params);
    }
    useSuperStickerPack(variables: Types.SuperStickerPackVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperStickerPack | null;
    useSuperStickerPack(variables: Types.SuperStickerPackVariables, params?: SpaceQueryWatchParameters): Types.SuperStickerPack;
    useSuperStickerPack(variables: Types.SuperStickerPackVariables, params?: SpaceQueryWatchParameters): Types.SuperStickerPack | null {;
        return this.useQuery('SuperStickerPack', variables, params);
    }
    useGetState(params: SpaceQueryWatchParameters & { suspense: false }): Types.GetState | null;
    useGetState(params?: SpaceQueryWatchParameters): Types.GetState;
    useGetState(params?: SpaceQueryWatchParameters): Types.GetState | null {;
        return this.useQuery('GetState', undefined, params);
    }
    useGetDifference(variables: Types.GetDifferenceVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GetDifference | null;
    useGetDifference(variables: Types.GetDifferenceVariables, params?: SpaceQueryWatchParameters): Types.GetDifference;
    useGetDifference(variables: Types.GetDifferenceVariables, params?: SpaceQueryWatchParameters): Types.GetDifference | null {;
        return this.useQuery('GetDifference', variables, params);
    }
    useGetSequenceState(variables: Types.GetSequenceStateVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GetSequenceState | null;
    useGetSequenceState(variables: Types.GetSequenceStateVariables, params?: SpaceQueryWatchParameters): Types.GetSequenceState;
    useGetSequenceState(variables: Types.GetSequenceStateVariables, params?: SpaceQueryWatchParameters): Types.GetSequenceState | null {;
        return this.useQuery('GetSequenceState', variables, params);
    }
    useGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GetSequenceDifference | null;
    useGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params?: SpaceQueryWatchParameters): Types.GetSequenceDifference;
    useGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params?: SpaceQueryWatchParameters): Types.GetSequenceDifference | null {;
        return this.useQuery('GetSequenceDifference', variables, params);
    }
    useGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GetInitialDialogs | null;
    useGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params?: SpaceQueryWatchParameters): Types.GetInitialDialogs;
    useGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params?: SpaceQueryWatchParameters): Types.GetInitialDialogs | null {;
        return this.useQuery('GetInitialDialogs', variables, params);
    }
    useUpdateUsers(variables: Types.UpdateUsersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UpdateUsers | null;
    useUpdateUsers(variables: Types.UpdateUsersVariables, params?: SpaceQueryWatchParameters): Types.UpdateUsers;
    useUpdateUsers(variables: Types.UpdateUsersVariables, params?: SpaceQueryWatchParameters): Types.UpdateUsers | null {;
        return this.useQuery('UpdateUsers', variables, params);
    }
    useUser(variables: Types.UserVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.User | null;
    useUser(variables: Types.UserVariables, params?: SpaceQueryWatchParameters): Types.User;
    useUser(variables: Types.UserVariables, params?: SpaceQueryWatchParameters): Types.User | null {;
        return this.useQuery('User', variables, params);
    }
    useUserNano(variables: Types.UserNanoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserNano | null;
    useUserNano(variables: Types.UserNanoVariables, params?: SpaceQueryWatchParameters): Types.UserNano;
    useUserNano(variables: Types.UserNanoVariables, params?: SpaceQueryWatchParameters): Types.UserNano | null {;
        return this.useQuery('UserNano', variables, params);
    }
    useUserFollowers(variables: Types.UserFollowersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserFollowers | null;
    useUserFollowers(variables: Types.UserFollowersVariables, params?: SpaceQueryWatchParameters): Types.UserFollowers;
    useUserFollowers(variables: Types.UserFollowersVariables, params?: SpaceQueryWatchParameters): Types.UserFollowers | null {;
        return this.useQuery('UserFollowers', variables, params);
    }
    useOnline(variables: Types.OnlineVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Online | null;
    useOnline(variables: Types.OnlineVariables, params?: SpaceQueryWatchParameters): Types.Online;
    useOnline(variables: Types.OnlineVariables, params?: SpaceQueryWatchParameters): Types.Online | null {;
        return this.useQuery('Online', variables, params);
    }
    useExplorePeople(variables: Types.ExplorePeopleVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ExplorePeople | null;
    useExplorePeople(variables: Types.ExplorePeopleVariables, params?: SpaceQueryWatchParameters): Types.ExplorePeople;
    useExplorePeople(variables: Types.ExplorePeopleVariables, params?: SpaceQueryWatchParameters): Types.ExplorePeople | null {;
        return this.useQuery('ExplorePeople', variables, params);
    }
    useSocialUserFollowers(variables: Types.SocialUserFollowersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SocialUserFollowers | null;
    useSocialUserFollowers(variables: Types.SocialUserFollowersVariables, params?: SpaceQueryWatchParameters): Types.SocialUserFollowers;
    useSocialUserFollowers(variables: Types.SocialUserFollowersVariables, params?: SpaceQueryWatchParameters): Types.SocialUserFollowers | null {;
        return this.useQuery('SocialUserFollowers', variables, params);
    }
    useSocialUserFollowing(variables: Types.SocialUserFollowingVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SocialUserFollowing | null;
    useSocialUserFollowing(variables: Types.SocialUserFollowingVariables, params?: SpaceQueryWatchParameters): Types.SocialUserFollowing;
    useSocialUserFollowing(variables: Types.SocialUserFollowingVariables, params?: SpaceQueryWatchParameters): Types.SocialUserFollowing | null {;
        return this.useQuery('SocialUserFollowing', variables, params);
    }
    useVoiceChat(variables: Types.VoiceChatVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChat | null;
    useVoiceChat(variables: Types.VoiceChatVariables, params?: SpaceQueryWatchParameters): Types.VoiceChat;
    useVoiceChat(variables: Types.VoiceChatVariables, params?: SpaceQueryWatchParameters): Types.VoiceChat | null {;
        return this.useQuery('VoiceChat', variables, params);
    }
    useVoiceChatFull(variables: Types.VoiceChatFullVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatFull | null;
    useVoiceChatFull(variables: Types.VoiceChatFullVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatFull;
    useVoiceChatFull(variables: Types.VoiceChatFullVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatFull | null {;
        return this.useQuery('VoiceChatFull', variables, params);
    }
    useVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatListeners | null;
    useVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatListeners;
    useVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatListeners | null {;
        return this.useQuery('VoiceChatListeners', variables, params);
    }
    useActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ActiveVoiceChats | null;
    useActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params?: SpaceQueryWatchParameters): Types.ActiveVoiceChats;
    useActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params?: SpaceQueryWatchParameters): Types.ActiveVoiceChats | null {;
        return this.useQuery('ActiveVoiceChats', variables, params);
    }
    useVoiceChatUser(variables: Types.VoiceChatUserVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatUser | null;
    useVoiceChatUser(variables: Types.VoiceChatUserVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatUser;
    useVoiceChatUser(variables: Types.VoiceChatUserVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatUser | null {;
        return this.useQuery('VoiceChatUser', variables, params);
    }
    useVoiceChatHandRaised(variables: Types.VoiceChatHandRaisedVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatHandRaised | null;
    useVoiceChatHandRaised(variables: Types.VoiceChatHandRaisedVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatHandRaised;
    useVoiceChatHandRaised(variables: Types.VoiceChatHandRaisedVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatHandRaised | null {;
        return this.useQuery('VoiceChatHandRaised', variables, params);
    }
    useVoiceChatControls(variables: Types.VoiceChatControlsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatControls | null;
    useVoiceChatControls(variables: Types.VoiceChatControlsVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatControls;
    useVoiceChatControls(variables: Types.VoiceChatControlsVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatControls | null {;
        return this.useQuery('VoiceChatControls', variables, params);
    }
    useVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatEventsState | null;
    useVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatEventsState;
    useVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatEventsState | null {;
        return this.useQuery('VoiceChatEventsState', variables, params);
    }
    useVoiceChatPrefetch(variables: Types.VoiceChatPrefetchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatPrefetch | null;
    useVoiceChatPrefetch(variables: Types.VoiceChatPrefetchVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatPrefetch;
    useVoiceChatPrefetch(variables: Types.VoiceChatPrefetchVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatPrefetch | null {;
        return this.useQuery('VoiceChatPrefetch', variables, params);
    }
    mutateCreateOrganization(variables: Types.CreateOrganization, params?: MutationParameters): Promise<Types.CreateOrganization> {
        return this.mutate('CreateOrganization', variables, params)
    }
    mutateAccountInviteJoin(variables: Types.AccountInviteJoin, params?: MutationParameters): Promise<Types.AccountInviteJoin> {
        return this.mutate('AccountInviteJoin', variables, params)
    }
    mutateReportOnline(variables: Types.ReportOnline, params?: MutationParameters): Promise<Types.ReportOnline> {
        return this.mutate('ReportOnline', variables, params)
    }
    mutateRegisterPush(variables: Types.RegisterPush, params?: MutationParameters): Promise<Types.RegisterPush> {
        return this.mutate('RegisterPush', variables, params)
    }
    mutateRegisterWebPush(variables: Types.RegisterWebPush, params?: MutationParameters): Promise<Types.RegisterWebPush> {
        return this.mutate('RegisterWebPush', variables, params)
    }
    mutateCreateApp(variables: Types.CreateApp, params?: MutationParameters): Promise<Types.CreateApp> {
        return this.mutate('CreateApp', variables, params)
    }
    mutateUpdateApp(variables: Types.UpdateApp, params?: MutationParameters): Promise<Types.UpdateApp> {
        return this.mutate('UpdateApp', variables, params)
    }
    mutateRefreshAppToken(variables: Types.RefreshAppToken, params?: MutationParameters): Promise<Types.RefreshAppToken> {
        return this.mutate('RefreshAppToken', variables, params)
    }
    mutateAddAppToChat(variables: Types.AddAppToChat, params?: MutationParameters): Promise<Types.AddAppToChat> {
        return this.mutate('AddAppToChat', variables, params)
    }
    mutateUserStorageSet(variables: Types.UserStorageSet, params?: MutationParameters): Promise<Types.UserStorageSet> {
        return this.mutate('UserStorageSet', variables, params)
    }
    mutateSendPhonePairCode(variables: Types.SendPhonePairCode, params?: MutationParameters): Promise<Types.SendPhonePairCode> {
        return this.mutate('SendPhonePairCode', variables, params)
    }
    mutatePairPhone(variables: Types.PairPhone, params?: MutationParameters): Promise<Types.PairPhone> {
        return this.mutate('PairPhone', variables, params)
    }
    mutateSendEmailPairCode(variables: Types.SendEmailPairCode, params?: MutationParameters): Promise<Types.SendEmailPairCode> {
        return this.mutate('SendEmailPairCode', variables, params)
    }
    mutatePairEmail(variables: Types.PairEmail, params?: MutationParameters): Promise<Types.PairEmail> {
        return this.mutate('PairEmail', variables, params)
    }
    mutateBanUser(variables: Types.BanUser, params?: MutationParameters): Promise<Types.BanUser> {
        return this.mutate('BanUser', variables, params)
    }
    mutateUnBanUser(variables: Types.UnBanUser, params?: MutationParameters): Promise<Types.UnBanUser> {
        return this.mutate('UnBanUser', variables, params)
    }
    mutatePinMessage(variables: Types.PinMessage, params?: MutationParameters): Promise<Types.PinMessage> {
        return this.mutate('PinMessage', variables, params)
    }
    mutateUnpinMessage(variables: Types.UnpinMessage, params?: MutationParameters): Promise<Types.UnpinMessage> {
        return this.mutate('UnpinMessage', variables, params)
    }
    mutateMessageSetReaction(variables: Types.MessageSetReaction, params?: MutationParameters): Promise<Types.MessageSetReaction> {
        return this.mutate('MessageSetReaction', variables, params)
    }
    mutateMessageUnsetReaction(variables: Types.MessageUnsetReaction, params?: MutationParameters): Promise<Types.MessageUnsetReaction> {
        return this.mutate('MessageUnsetReaction', variables, params)
    }
    mutateMessageSetDonationReaction(variables: Types.MessageSetDonationReaction, params?: MutationParameters): Promise<Types.MessageSetDonationReaction> {
        return this.mutate('MessageSetDonationReaction', variables, params)
    }
    mutateSendMessage(variables: Types.SendMessage, params?: MutationParameters): Promise<Types.SendMessage> {
        return this.mutate('SendMessage', variables, params)
    }
    mutateRoomRead(variables: Types.RoomRead, params?: MutationParameters): Promise<Types.RoomRead> {
        return this.mutate('RoomRead', variables, params)
    }
    mutateRoomCreate(variables: Types.RoomCreate, params?: MutationParameters): Promise<Types.RoomCreate> {
        return this.mutate('RoomCreate', variables, params)
    }
    mutateBuyPremiumChatSubscription(variables: Types.BuyPremiumChatSubscription, params?: MutationParameters): Promise<Types.BuyPremiumChatSubscription> {
        return this.mutate('BuyPremiumChatSubscription', variables, params)
    }
    mutateBuyPremiumChatPass(variables: Types.BuyPremiumChatPass, params?: MutationParameters): Promise<Types.BuyPremiumChatPass> {
        return this.mutate('BuyPremiumChatPass', variables, params)
    }
    mutateSetTyping(variables: Types.SetTyping, params?: MutationParameters): Promise<Types.SetTyping> {
        return this.mutate('SetTyping', variables, params)
    }
    mutateUnsetTyping(variables: Types.UnsetTyping, params?: MutationParameters): Promise<Types.UnsetTyping> {
        return this.mutate('UnsetTyping', variables, params)
    }
    mutateRoomAddMembers(variables: Types.RoomAddMembers, params?: MutationParameters): Promise<Types.RoomAddMembers> {
        return this.mutate('RoomAddMembers', variables, params)
    }
    mutateRoomKick(variables: Types.RoomKick, params?: MutationParameters): Promise<Types.RoomKick> {
        return this.mutate('RoomKick', variables, params)
    }
    mutateRoomChangeRole(variables: Types.RoomChangeRole, params?: MutationParameters): Promise<Types.RoomChangeRole> {
        return this.mutate('RoomChangeRole', variables, params)
    }
    mutateRoomLeave(variables: Types.RoomLeave, params?: MutationParameters): Promise<Types.RoomLeave> {
        return this.mutate('RoomLeave', variables, params)
    }
    mutateChatDelete(variables: Types.ChatDelete, params?: MutationParameters): Promise<Types.ChatDelete> {
        return this.mutate('ChatDelete', variables, params)
    }
    mutateRoomSettingsUpdate(variables: Types.RoomSettingsUpdate, params?: MutationParameters): Promise<Types.RoomSettingsUpdate> {
        return this.mutate('RoomSettingsUpdate', variables, params)
    }
    mutateRoomAlterFeatured(variables: Types.RoomAlterFeatured, params?: MutationParameters): Promise<Types.RoomAlterFeatured> {
        return this.mutate('RoomAlterFeatured', variables, params)
    }
    mutateRoomJoin(variables: Types.RoomJoin, params?: MutationParameters): Promise<Types.RoomJoin> {
        return this.mutate('RoomJoin', variables, params)
    }
    mutateRoomsJoin(variables: Types.RoomsJoin, params?: MutationParameters): Promise<Types.RoomsJoin> {
        return this.mutate('RoomsJoin', variables, params)
    }
    mutateRoomsInviteUser(variables: Types.RoomsInviteUser, params?: MutationParameters): Promise<Types.RoomsInviteUser> {
        return this.mutate('RoomsInviteUser', variables, params)
    }
    mutateRoomJoinInviteLink(variables: Types.RoomJoinInviteLink, params?: MutationParameters): Promise<Types.RoomJoinInviteLink> {
        return this.mutate('RoomJoinInviteLink', variables, params)
    }
    mutateRoomRenewInviteLink(variables: Types.RoomRenewInviteLink, params?: MutationParameters): Promise<Types.RoomRenewInviteLink> {
        return this.mutate('RoomRenewInviteLink', variables, params)
    }
    mutateRoomUpdate(variables: Types.RoomUpdate, params?: MutationParameters): Promise<Types.RoomUpdate> {
        return this.mutate('RoomUpdate', variables, params)
    }
    mutateRoomDeleteMessage(variables: Types.RoomDeleteMessage, params?: MutationParameters): Promise<Types.RoomDeleteMessage> {
        return this.mutate('RoomDeleteMessage', variables, params)
    }
    mutateRoomDeleteMessages(variables: Types.RoomDeleteMessages, params?: MutationParameters): Promise<Types.RoomDeleteMessages> {
        return this.mutate('RoomDeleteMessages', variables, params)
    }
    mutateRoomDeleteUrlAugmentation(variables: Types.RoomDeleteUrlAugmentation, params?: MutationParameters): Promise<Types.RoomDeleteUrlAugmentation> {
        return this.mutate('RoomDeleteUrlAugmentation', variables, params)
    }
    mutateRoomDelete(variables: Types.RoomDelete, params?: MutationParameters): Promise<Types.RoomDelete> {
        return this.mutate('RoomDelete', variables, params)
    }
    mutateEditMessage(variables: Types.EditMessage, params?: MutationParameters): Promise<Types.EditMessage> {
        return this.mutate('EditMessage', variables, params)
    }
    mutateUpdateWelcomeMessage(variables: Types.UpdateWelcomeMessage, params?: MutationParameters): Promise<Types.UpdateWelcomeMessage> {
        return this.mutate('UpdateWelcomeMessage', variables, params)
    }
    mutateDeleteComment(variables: Types.DeleteComment, params?: MutationParameters): Promise<Types.DeleteComment> {
        return this.mutate('DeleteComment', variables, params)
    }
    mutateCommentSetReaction(variables: Types.CommentSetReaction, params?: MutationParameters): Promise<Types.CommentSetReaction> {
        return this.mutate('CommentSetReaction', variables, params)
    }
    mutateCommentUnsetReaction(variables: Types.CommentUnsetReaction, params?: MutationParameters): Promise<Types.CommentUnsetReaction> {
        return this.mutate('CommentUnsetReaction', variables, params)
    }
    mutateDeleteNotification(variables: Types.DeleteNotification, params?: MutationParameters): Promise<Types.DeleteNotification> {
        return this.mutate('DeleteNotification', variables, params)
    }
    mutateSubscribeToComments(variables: Types.SubscribeToComments, params?: MutationParameters): Promise<Types.SubscribeToComments> {
        return this.mutate('SubscribeToComments', variables, params)
    }
    mutateUnSubscribeFromComments(variables: Types.UnSubscribeFromComments, params?: MutationParameters): Promise<Types.UnSubscribeFromComments> {
        return this.mutate('UnSubscribeFromComments', variables, params)
    }
    mutateAddComment(variables: Types.AddComment, params?: MutationParameters): Promise<Types.AddComment> {
        return this.mutate('AddComment', variables, params)
    }
    mutateEditComment(variables: Types.EditComment, params?: MutationParameters): Promise<Types.EditComment> {
        return this.mutate('EditComment', variables, params)
    }
    mutateCommentDeleteUrlAugmentation(variables: Types.CommentDeleteUrlAugmentation, params?: MutationParameters): Promise<Types.CommentDeleteUrlAugmentation> {
        return this.mutate('CommentDeleteUrlAugmentation', variables, params)
    }
    mutateConferenceJoin(variables: Types.ConferenceJoin, params?: MutationParameters): Promise<Types.ConferenceJoin> {
        return this.mutate('ConferenceJoin', variables, params)
    }
    mutateconferenceAddScreenShare(variables: Types.conferenceAddScreenShare, params?: MutationParameters): Promise<Types.conferenceAddScreenShare> {
        return this.mutate('conferenceAddScreenShare', variables, params)
    }
    mutateconferenceRemoveScreenShare(variables: Types.conferenceRemoveScreenShare, params?: MutationParameters): Promise<Types.conferenceRemoveScreenShare> {
        return this.mutate('conferenceRemoveScreenShare', variables, params)
    }
    mutateconferenceAlterMediaState(variables: Types.conferenceAlterMediaState, params?: MutationParameters): Promise<Types.conferenceAlterMediaState> {
        return this.mutate('conferenceAlterMediaState', variables, params)
    }
    mutateconferenceRequestLocalMediaChange(variables: Types.conferenceRequestLocalMediaChange, params?: MutationParameters): Promise<Types.conferenceRequestLocalMediaChange> {
        return this.mutate('conferenceRequestLocalMediaChange', variables, params)
    }
    mutateConferenceLeave(variables: Types.ConferenceLeave, params?: MutationParameters): Promise<Types.ConferenceLeave> {
        return this.mutate('ConferenceLeave', variables, params)
    }
    mutateConferenceKeepAlive(variables: Types.ConferenceKeepAlive, params?: MutationParameters): Promise<Types.ConferenceKeepAlive> {
        return this.mutate('ConferenceKeepAlive', variables, params)
    }
    mutateMediaOffer(variables: Types.MediaOffer, params?: MutationParameters): Promise<Types.MediaOffer> {
        return this.mutate('MediaOffer', variables, params)
    }
    mutateMediaAnswer(variables: Types.MediaAnswer, params?: MutationParameters): Promise<Types.MediaAnswer> {
        return this.mutate('MediaAnswer', variables, params)
    }
    mutateMediaCandidate(variables: Types.MediaCandidate, params?: MutationParameters): Promise<Types.MediaCandidate> {
        return this.mutate('MediaCandidate', variables, params)
    }
    mutateMediaFailed(variables: Types.MediaFailed, params?: MutationParameters): Promise<Types.MediaFailed> {
        return this.mutate('MediaFailed', variables, params)
    }
    mutatePhonebookAdd(variables: Types.PhonebookAdd, params?: MutationParameters): Promise<Types.PhonebookAdd> {
        return this.mutate('PhonebookAdd', variables, params)
    }
    mutateAddToContacts(variables: Types.AddToContacts, params?: MutationParameters): Promise<Types.AddToContacts> {
        return this.mutate('AddToContacts', variables, params)
    }
    mutateRemoveFromContacts(variables: Types.RemoveFromContacts, params?: MutationParameters): Promise<Types.RemoveFromContacts> {
        return this.mutate('RemoveFromContacts', variables, params)
    }
    mutatePostCreateDraft(params?: MutationParameters): Promise<Types.PostCreateDraft> {
        return this.mutate('PostCreateDraft', undefined, params)
    }
    mutatePostDraftUpdate(variables: Types.PostDraftUpdate, params?: MutationParameters): Promise<Types.PostDraftUpdate> {
        return this.mutate('PostDraftUpdate', variables, params)
    }
    mutatePostPublish(variables: Types.PostPublish, params?: MutationParameters): Promise<Types.PostPublish> {
        return this.mutate('PostPublish', variables, params)
    }
    mutateBetaSubmitNextDiscover(variables: Types.BetaSubmitNextDiscover, params?: MutationParameters): Promise<Types.BetaSubmitNextDiscover> {
        return this.mutate('BetaSubmitNextDiscover', variables, params)
    }
    mutateBetaDiscoverSkip(variables: Types.BetaDiscoverSkip, params?: MutationParameters): Promise<Types.BetaDiscoverSkip> {
        return this.mutate('BetaDiscoverSkip', variables, params)
    }
    mutateDiscoverCollectionsCreate(variables: Types.DiscoverCollectionsCreate, params?: MutationParameters): Promise<Types.DiscoverCollectionsCreate> {
        return this.mutate('DiscoverCollectionsCreate', variables, params)
    }
    mutateDiscoverCollectionsUpdate(variables: Types.DiscoverCollectionsUpdate, params?: MutationParameters): Promise<Types.DiscoverCollectionsUpdate> {
        return this.mutate('DiscoverCollectionsUpdate', variables, params)
    }
    mutateDiscoverCollectionSetShortname(variables: Types.DiscoverCollectionSetShortname, params?: MutationParameters): Promise<Types.DiscoverCollectionSetShortname> {
        return this.mutate('DiscoverCollectionSetShortname', variables, params)
    }
    mutateDiscoverCollectionsDelete(variables: Types.DiscoverCollectionsDelete, params?: MutationParameters): Promise<Types.DiscoverCollectionsDelete> {
        return this.mutate('DiscoverCollectionsDelete', variables, params)
    }
    mutateDiscoverEditorsChoiceCreate(variables: Types.DiscoverEditorsChoiceCreate, params?: MutationParameters): Promise<Types.DiscoverEditorsChoiceCreate> {
        return this.mutate('DiscoverEditorsChoiceCreate', variables, params)
    }
    mutateDiscoverEditorsChoiceUpdate(variables: Types.DiscoverEditorsChoiceUpdate, params?: MutationParameters): Promise<Types.DiscoverEditorsChoiceUpdate> {
        return this.mutate('DiscoverEditorsChoiceUpdate', variables, params)
    }
    mutateDiscoverEditorsChoiceDelete(variables: Types.DiscoverEditorsChoiceDelete, params?: MutationParameters): Promise<Types.DiscoverEditorsChoiceDelete> {
        return this.mutate('DiscoverEditorsChoiceDelete', variables, params)
    }
    mutateCreateCardSetupIntent(variables: Types.CreateCardSetupIntent, params?: MutationParameters): Promise<Types.CreateCardSetupIntent> {
        return this.mutate('CreateCardSetupIntent', variables, params)
    }
    mutateCommitCardSetupIntent(variables: Types.CommitCardSetupIntent, params?: MutationParameters): Promise<Types.CommitCardSetupIntent> {
        return this.mutate('CommitCardSetupIntent', variables, params)
    }
    mutateRemoveCard(variables: Types.RemoveCard, params?: MutationParameters): Promise<Types.RemoveCard> {
        return this.mutate('RemoveCard', variables, params)
    }
    mutateMakeCardDefault(variables: Types.MakeCardDefault, params?: MutationParameters): Promise<Types.MakeCardDefault> {
        return this.mutate('MakeCardDefault', variables, params)
    }
    mutateCreateDepositIntent(variables: Types.CreateDepositIntent, params?: MutationParameters): Promise<Types.CreateDepositIntent> {
        return this.mutate('CreateDepositIntent', variables, params)
    }
    mutatePaymentIntentCommit(variables: Types.PaymentIntentCommit, params?: MutationParameters): Promise<Types.PaymentIntentCommit> {
        return this.mutate('PaymentIntentCommit', variables, params)
    }
    mutatePaymentIntentCancel(variables: Types.PaymentIntentCancel, params?: MutationParameters): Promise<Types.PaymentIntentCancel> {
        return this.mutate('PaymentIntentCancel', variables, params)
    }
    mutateCancelSubscription(variables: Types.CancelSubscription, params?: MutationParameters): Promise<Types.CancelSubscription> {
        return this.mutate('CancelSubscription', variables, params)
    }
    mutateSendDonation(variables: Types.SendDonation, params?: MutationParameters): Promise<Types.SendDonation> {
        return this.mutate('SendDonation', variables, params)
    }
    mutateOnLogout(params?: MutationParameters): Promise<Types.OnLogout> {
        return this.mutate('OnLogout', undefined, params)
    }
    mutateMyNotificationCenterMarkSeqRead(variables: Types.MyNotificationCenterMarkSeqRead, params?: MutationParameters): Promise<Types.MyNotificationCenterMarkSeqRead> {
        return this.mutate('MyNotificationCenterMarkSeqRead', variables, params)
    }
    mutateReadNotification(variables: Types.ReadNotification, params?: MutationParameters): Promise<Types.ReadNotification> {
        return this.mutate('ReadNotification', variables, params)
    }
    mutateUpdateOrganization(variables: Types.UpdateOrganization, params?: MutationParameters): Promise<Types.UpdateOrganization> {
        return this.mutate('UpdateOrganization', variables, params)
    }
    mutateOrganizationChangeMemberRole(variables: Types.OrganizationChangeMemberRole, params?: MutationParameters): Promise<Types.OrganizationChangeMemberRole> {
        return this.mutate('OrganizationChangeMemberRole', variables, params)
    }
    mutateOrganizationAddMember(variables: Types.OrganizationAddMember, params?: MutationParameters): Promise<Types.OrganizationAddMember> {
        return this.mutate('OrganizationAddMember', variables, params)
    }
    mutateOrganizationCreatePublicInvite(variables: Types.OrganizationCreatePublicInvite, params?: MutationParameters): Promise<Types.OrganizationCreatePublicInvite> {
        return this.mutate('OrganizationCreatePublicInvite', variables, params)
    }
    mutateDeleteOrganization(variables: Types.DeleteOrganization, params?: MutationParameters): Promise<Types.DeleteOrganization> {
        return this.mutate('DeleteOrganization', variables, params)
    }
    mutateOrganizationMemberRemove(variables: Types.OrganizationMemberRemove, params?: MutationParameters): Promise<Types.OrganizationMemberRemove> {
        return this.mutate('OrganizationMemberRemove', variables, params)
    }
    mutateOrganizationRequestMembersExport(variables: Types.OrganizationRequestMembersExport, params?: MutationParameters): Promise<Types.OrganizationRequestMembersExport> {
        return this.mutate('OrganizationRequestMembersExport', variables, params)
    }
    mutateDebugMails(variables: Types.DebugMails, params?: MutationParameters): Promise<Types.DebugMails> {
        return this.mutate('DebugMails', variables, params)
    }
    mutateSuperAdminAdd(variables: Types.SuperAdminAdd, params?: MutationParameters): Promise<Types.SuperAdminAdd> {
        return this.mutate('SuperAdminAdd', variables, params)
    }
    mutateSuperAdminRemove(variables: Types.SuperAdminRemove, params?: MutationParameters): Promise<Types.SuperAdminRemove> {
        return this.mutate('SuperAdminRemove', variables, params)
    }
    mutateReportContent(variables: Types.ReportContent, params?: MutationParameters): Promise<Types.ReportContent> {
        return this.mutate('ReportContent', variables, params)
    }
    mutateProfileUpdate(variables: Types.ProfileUpdate, params?: MutationParameters): Promise<Types.ProfileUpdate> {
        return this.mutate('ProfileUpdate', variables, params)
    }
    mutateProfileCreate(variables: Types.ProfileCreate, params?: MutationParameters): Promise<Types.ProfileCreate> {
        return this.mutate('ProfileCreate', variables, params)
    }
    mutateSettingsUpdate(variables: Types.SettingsUpdate, params?: MutationParameters): Promise<Types.SettingsUpdate> {
        return this.mutate('SettingsUpdate', variables, params)
    }
    mutateSetOrgShortname(variables: Types.SetOrgShortname, params?: MutationParameters): Promise<Types.SetOrgShortname> {
        return this.mutate('SetOrgShortname', variables, params)
    }
    mutateSetUserShortname(variables: Types.SetUserShortname, params?: MutationParameters): Promise<Types.SetUserShortname> {
        return this.mutate('SetUserShortname', variables, params)
    }
    mutateSetFeedChannelShortname(variables: Types.SetFeedChannelShortname, params?: MutationParameters): Promise<Types.SetFeedChannelShortname> {
        return this.mutate('SetFeedChannelShortname', variables, params)
    }
    mutateSetRoomShortname(variables: Types.SetRoomShortname, params?: MutationParameters): Promise<Types.SetRoomShortname> {
        return this.mutate('SetRoomShortname', variables, params)
    }
    mutateStickerPackAddToCollection(variables: Types.StickerPackAddToCollection, params?: MutationParameters): Promise<Types.StickerPackAddToCollection> {
        return this.mutate('StickerPackAddToCollection', variables, params)
    }
    mutateStickerPackRemoveFromCollection(variables: Types.StickerPackRemoveFromCollection, params?: MutationParameters): Promise<Types.StickerPackRemoveFromCollection> {
        return this.mutate('StickerPackRemoveFromCollection', variables, params)
    }
    mutateSendSticker(variables: Types.SendSticker, params?: MutationParameters): Promise<Types.SendSticker> {
        return this.mutate('SendSticker', variables, params)
    }
    mutateAddStickerComment(variables: Types.AddStickerComment, params?: MutationParameters): Promise<Types.AddStickerComment> {
        return this.mutate('AddStickerComment', variables, params)
    }
    mutateStickerPackCreate(variables: Types.StickerPackCreate, params?: MutationParameters): Promise<Types.StickerPackCreate> {
        return this.mutate('StickerPackCreate', variables, params)
    }
    mutateStickerPackUpdate(variables: Types.StickerPackUpdate, params?: MutationParameters): Promise<Types.StickerPackUpdate> {
        return this.mutate('StickerPackUpdate', variables, params)
    }
    mutateAddSticker(variables: Types.AddSticker, params?: MutationParameters): Promise<Types.AddSticker> {
        return this.mutate('AddSticker', variables, params)
    }
    mutateRemoveSticker(variables: Types.RemoveSticker, params?: MutationParameters): Promise<Types.RemoveSticker> {
        return this.mutate('RemoveSticker', variables, params)
    }
    mutateMarkStickersViewed(params?: MutationParameters): Promise<Types.MarkStickersViewed> {
        return this.mutate('MarkStickersViewed', undefined, params)
    }
    mutatePersistEvents(variables: Types.PersistEvents, params?: MutationParameters): Promise<Types.PersistEvents> {
        return this.mutate('PersistEvents', variables, params)
    }
    mutateDeleteUser(variables: Types.DeleteUser, params?: MutationParameters): Promise<Types.DeleteUser> {
        return this.mutate('DeleteUser', variables, params)
    }
    mutateBetaNextDiscoverReset(params?: MutationParameters): Promise<Types.BetaNextDiscoverReset> {
        return this.mutate('BetaNextDiscoverReset', undefined, params)
    }
    mutateSocialFollow(variables: Types.SocialFollow, params?: MutationParameters): Promise<Types.SocialFollow> {
        return this.mutate('SocialFollow', variables, params)
    }
    mutateSocialUnfollow(variables: Types.SocialUnfollow, params?: MutationParameters): Promise<Types.SocialUnfollow> {
        return this.mutate('SocialUnfollow', variables, params)
    }
    mutateVoiceChatCreate(variables: Types.VoiceChatCreate, params?: MutationParameters): Promise<Types.VoiceChatCreate> {
        return this.mutate('VoiceChatCreate', variables, params)
    }
    mutateVoiceChatCreateInChat(variables: Types.VoiceChatCreateInChat, params?: MutationParameters): Promise<Types.VoiceChatCreateInChat> {
        return this.mutate('VoiceChatCreateInChat', variables, params)
    }
    mutateVoiceChatJoin(variables: Types.VoiceChatJoin, params?: MutationParameters): Promise<Types.VoiceChatJoin> {
        return this.mutate('VoiceChatJoin', variables, params)
    }
    mutateVoiceChatUpdate(variables: Types.VoiceChatUpdate, params?: MutationParameters): Promise<Types.VoiceChatUpdate> {
        return this.mutate('VoiceChatUpdate', variables, params)
    }
    mutateVoiceChatEnd(variables: Types.VoiceChatEnd, params?: MutationParameters): Promise<Types.VoiceChatEnd> {
        return this.mutate('VoiceChatEnd', variables, params)
    }
    mutateVoiceChatLeave(variables: Types.VoiceChatLeave, params?: MutationParameters): Promise<Types.VoiceChatLeave> {
        return this.mutate('VoiceChatLeave', variables, params)
    }
    mutateVoiceChatUpdateAdmin(variables: Types.VoiceChatUpdateAdmin, params?: MutationParameters): Promise<Types.VoiceChatUpdateAdmin> {
        return this.mutate('VoiceChatUpdateAdmin', variables, params)
    }
    mutateVoiceChatKick(variables: Types.VoiceChatKick, params?: MutationParameters): Promise<Types.VoiceChatKick> {
        return this.mutate('VoiceChatKick', variables, params)
    }
    mutateVoiceChatPromote(variables: Types.VoiceChatPromote, params?: MutationParameters): Promise<Types.VoiceChatPromote> {
        return this.mutate('VoiceChatPromote', variables, params)
    }
    mutateVoiceChatDemote(variables: Types.VoiceChatDemote, params?: MutationParameters): Promise<Types.VoiceChatDemote> {
        return this.mutate('VoiceChatDemote', variables, params)
    }
    mutateVoiceChatRaiseHand(variables: Types.VoiceChatRaiseHand, params?: MutationParameters): Promise<Types.VoiceChatRaiseHand> {
        return this.mutate('VoiceChatRaiseHand', variables, params)
    }
    mutateVoiceChatSetPinnedMessage(variables: Types.VoiceChatSetPinnedMessage, params?: MutationParameters): Promise<Types.VoiceChatSetPinnedMessage> {
        return this.mutate('VoiceChatSetPinnedMessage', variables, params)
    }
    mutateVoiceChatDeletePinnedMessage(variables: Types.VoiceChatDeletePinnedMessage, params?: MutationParameters): Promise<Types.VoiceChatDeletePinnedMessage> {
        return this.mutate('VoiceChatDeletePinnedMessage', variables, params)
    }
    subscribeSettingsWatch(handler: GraphqlSubscriptionHandler<Types.SettingsWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.SettingsWatch> {
        return this.subscribe(handler, 'SettingsWatch', undefined, params);
    }
    subscribeBlackListUpdates(variables: Types.BlackListUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.BlackListUpdates>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.BlackListUpdates> {
        return this.subscribe(handler, 'BlackListUpdates', variables, params);
    }
    subscribeDialogsWatch(variables: Types.DialogsWatchVariables, handler: GraphqlSubscriptionHandler<Types.DialogsWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.DialogsWatch> {
        return this.subscribe(handler, 'DialogsWatch', variables, params);
    }
    subscribeChatWatch(variables: Types.ChatWatchVariables, handler: GraphqlSubscriptionHandler<Types.ChatWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.ChatWatch> {
        return this.subscribe(handler, 'ChatWatch', variables, params);
    }
    subscribeTypingsWatch(handler: GraphqlSubscriptionHandler<Types.TypingsWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.TypingsWatch> {
        return this.subscribe(handler, 'TypingsWatch', undefined, params);
    }
    subscribeChatOnlinesCountWatch(variables: Types.ChatOnlinesCountWatchVariables, handler: GraphqlSubscriptionHandler<Types.ChatOnlinesCountWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.ChatOnlinesCountWatch> {
        return this.subscribe(handler, 'ChatOnlinesCountWatch', variables, params);
    }
    subscribeCommentWatch(variables: Types.CommentWatchVariables, handler: GraphqlSubscriptionHandler<Types.CommentWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.CommentWatch> {
        return this.subscribe(handler, 'CommentWatch', variables, params);
    }
    subscribeConferenceMediaWatch(variables: Types.ConferenceMediaWatchVariables, handler: GraphqlSubscriptionHandler<Types.ConferenceMediaWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.ConferenceMediaWatch> {
        return this.subscribe(handler, 'ConferenceMediaWatch', variables, params);
    }
    subscribeConferenceWatch(variables: Types.ConferenceWatchVariables, handler: GraphqlSubscriptionHandler<Types.ConferenceWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.ConferenceWatch> {
        return this.subscribe(handler, 'ConferenceWatch', variables, params);
    }
    subscribeMyContactsUpdates(variables: Types.MyContactsUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.MyContactsUpdates>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.MyContactsUpdates> {
        return this.subscribe(handler, 'MyContactsUpdates', variables, params);
    }
    subscribeWalletUpdates(variables: Types.WalletUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.WalletUpdates>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.WalletUpdates> {
        return this.subscribe(handler, 'WalletUpdates', variables, params);
    }
    subscribeMyNotificationsCenter(variables: Types.MyNotificationsCenterVariables, handler: GraphqlSubscriptionHandler<Types.MyNotificationsCenter>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.MyNotificationsCenter> {
        return this.subscribe(handler, 'MyNotificationsCenter', variables, params);
    }
    subscribeStickersWatch(handler: GraphqlSubscriptionHandler<Types.StickersWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.StickersWatch> {
        return this.subscribe(handler, 'StickersWatch', undefined, params);
    }
    subscribeWatchUpdates(handler: GraphqlSubscriptionHandler<Types.WatchUpdates>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.WatchUpdates> {
        return this.subscribe(handler, 'WatchUpdates', undefined, params);
    }
    subscribeOnlineWatch(variables: Types.OnlineWatchVariables, handler: GraphqlSubscriptionHandler<Types.OnlineWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.OnlineWatch> {
        return this.subscribe(handler, 'OnlineWatch', variables, params);
    }
    subscribeVoiceChatEvents(variables: Types.VoiceChatEventsVariables, handler: GraphqlSubscriptionHandler<Types.VoiceChatEvents>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.VoiceChatEvents> {
        return this.subscribe(handler, 'VoiceChatEvents', variables, params);
    }
    subscribeActiveVoiceChatsEvents(handler: GraphqlSubscriptionHandler<Types.ActiveVoiceChatsEvents>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.ActiveVoiceChatsEvents> {
        return this.subscribe(handler, 'ActiveVoiceChatsEvents', undefined, params);
    }
}
