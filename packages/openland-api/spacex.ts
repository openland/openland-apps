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
    queryAccountAppInvite(params?: QueryParameters): Promise<Types.AccountAppInvite> {
        return this.query('AccountAppInvite', undefined, params);
    }
    queryAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params?: QueryParameters): Promise<Types.AccountAppInviteInfo> {
        return this.query('AccountAppInviteInfo', variables, params);
    }
    queryAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params?: QueryParameters): Promise<Types.AccountInviteInfo> {
        return this.query('AccountInviteInfo', variables, params);
    }
    queryAccountSettings(params?: QueryParameters): Promise<Types.AccountSettings> {
        return this.query('AccountSettings', undefined, params);
    }
    queryActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params?: QueryParameters): Promise<Types.ActiveVoiceChats> {
        return this.query('ActiveVoiceChats', variables, params);
    }
    queryAuthPoints(params?: QueryParameters): Promise<Types.AuthPoints> {
        return this.query('AuthPoints', undefined, params);
    }
    queryAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params?: QueryParameters): Promise<Types.AuthResolveShortName> {
        return this.query('AuthResolveShortName', variables, params);
    }
    queryBlackListUpdatesState(params?: QueryParameters): Promise<Types.BlackListUpdatesState> {
        return this.query('BlackListUpdatesState', undefined, params);
    }
    queryChannel(variables: Types.ChannelVariables, params?: QueryParameters): Promise<Types.Channel> {
        return this.query('Channel', variables, params);
    }
    queryChannels(params?: QueryParameters): Promise<Types.Channels> {
        return this.query('Channels', undefined, params);
    }
    queryChatInit(variables: Types.ChatInitVariables, params?: QueryParameters): Promise<Types.ChatInit> {
        return this.query('ChatInit', variables, params);
    }
    queryChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params?: QueryParameters): Promise<Types.ChatInitFromUnread> {
        return this.query('ChatInitFromUnread', variables, params);
    }
    queryChatJoin(variables: Types.ChatJoinVariables, params?: QueryParameters): Promise<Types.ChatJoin> {
        return this.query('ChatJoin', variables, params);
    }
    queryChatMentionSearch(variables: Types.ChatMentionSearchVariables, params?: QueryParameters): Promise<Types.ChatMentionSearch> {
        return this.query('ChatMentionSearch', variables, params);
    }
    queryChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params?: QueryParameters): Promise<Types.ChatNewGetMessage> {
        return this.query('ChatNewGetMessage', variables, params);
    }
    queryChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params?: QueryParameters): Promise<Types.ChatNewLoadAfter> {
        return this.query('ChatNewLoadAfter', variables, params);
    }
    queryChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params?: QueryParameters): Promise<Types.ChatNewLoadBefore> {
        return this.query('ChatNewLoadBefore', variables, params);
    }
    queryChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params?: QueryParameters): Promise<Types.ChatNewReadLastRead> {
        return this.query('ChatNewReadLastRead', variables, params);
    }
    queryCommentFullReactions(variables: Types.CommentFullReactionsVariables, params?: QueryParameters): Promise<Types.CommentFullReactions> {
        return this.query('CommentFullReactions', variables, params);
    }
    queryComments(variables: Types.CommentsVariables, params?: QueryParameters): Promise<Types.Comments> {
        return this.query('Comments', variables, params);
    }
    queryCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params?: QueryParameters): Promise<Types.CommonChatsWithUser> {
        return this.query('CommonChatsWithUser', variables, params);
    }
    queryConference(variables: Types.ConferenceVariables, params?: QueryParameters): Promise<Types.Conference> {
        return this.query('Conference', variables, params);
    }
    queryConferenceMedia(variables: Types.ConferenceMediaVariables, params?: QueryParameters): Promise<Types.ConferenceMedia> {
        return this.query('ConferenceMedia', variables, params);
    }
    queryCreatedStickerPacks(params?: QueryParameters): Promise<Types.CreatedStickerPacks> {
        return this.query('CreatedStickerPacks', undefined, params);
    }
    queryDebugGqlTrace(variables: Types.DebugGqlTraceVariables, params?: QueryParameters): Promise<Types.DebugGqlTrace> {
        return this.query('DebugGqlTrace', variables, params);
    }
    queryDebugGqlTraces(variables: Types.DebugGqlTracesVariables, params?: QueryParameters): Promise<Types.DebugGqlTraces> {
        return this.query('DebugGqlTraces', variables, params);
    }
    queryDialogs(variables: Types.DialogsVariables, params?: QueryParameters): Promise<Types.Dialogs> {
        return this.query('Dialogs', variables, params);
    }
    queryDiscoverCollection(variables: Types.DiscoverCollectionVariables, params?: QueryParameters): Promise<Types.DiscoverCollection> {
        return this.query('DiscoverCollection', variables, params);
    }
    queryDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params?: QueryParameters): Promise<Types.DiscoverCollectionShort> {
        return this.query('DiscoverCollectionShort', variables, params);
    }
    queryDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params?: QueryParameters): Promise<Types.DiscoverCollections> {
        return this.query('DiscoverCollections', variables, params);
    }
    queryDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params?: QueryParameters): Promise<Types.DiscoverCollectionsShort> {
        return this.query('DiscoverCollectionsShort', variables, params);
    }
    queryDiscoverEditorsChoice(params?: QueryParameters): Promise<Types.DiscoverEditorsChoice> {
        return this.query('DiscoverEditorsChoice', undefined, params);
    }
    queryDiscoverIsDone(params?: QueryParameters): Promise<Types.DiscoverIsDone> {
        return this.query('DiscoverIsDone', undefined, params);
    }
    queryDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params?: QueryParameters): Promise<Types.DiscoverNewAndGrowing> {
        return this.query('DiscoverNewAndGrowing', variables, params);
    }
    queryDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params?: QueryParameters): Promise<Types.DiscoverNewOrganizations> {
        return this.query('DiscoverNewOrganizations', variables, params);
    }
    queryDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params?: QueryParameters): Promise<Types.DiscoverNextPage> {
        return this.query('DiscoverNextPage', variables, params);
    }
    queryDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params?: QueryParameters): Promise<Types.DiscoverNoAuth> {
        return this.query('DiscoverNoAuth', variables, params);
    }
    queryDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params?: QueryParameters): Promise<Types.DiscoverPopularNow> {
        return this.query('DiscoverPopularNow', variables, params);
    }
    queryDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params?: QueryParameters): Promise<Types.DiscoverPopularOrganizations> {
        return this.query('DiscoverPopularOrganizations', variables, params);
    }
    queryDiscoverState(params?: QueryParameters): Promise<Types.DiscoverState> {
        return this.query('DiscoverState', undefined, params);
    }
    queryDiscoverSuggestedRooms(params?: QueryParameters): Promise<Types.DiscoverSuggestedRooms> {
        return this.query('DiscoverSuggestedRooms', undefined, params);
    }
    queryDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params?: QueryParameters): Promise<Types.DiscoverTopFree> {
        return this.query('DiscoverTopFree', variables, params);
    }
    queryDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params?: QueryParameters): Promise<Types.DiscoverTopPremium> {
        return this.query('DiscoverTopPremium', variables, params);
    }
    queryExplorePeople(variables: Types.ExplorePeopleVariables, params?: QueryParameters): Promise<Types.ExplorePeople> {
        return this.query('ExplorePeople', variables, params);
    }
    queryExploreRooms(variables: Types.ExploreRoomsVariables, params?: QueryParameters): Promise<Types.ExploreRooms> {
        return this.query('ExploreRooms', variables, params);
    }
    queryFetchPushSettings(params?: QueryParameters): Promise<Types.FetchPushSettings> {
        return this.query('FetchPushSettings', undefined, params);
    }
    queryGetDifference(variables: Types.GetDifferenceVariables, params?: QueryParameters): Promise<Types.GetDifference> {
        return this.query('GetDifference', variables, params);
    }
    queryGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params?: QueryParameters): Promise<Types.GetInitialDialogs> {
        return this.query('GetInitialDialogs', variables, params);
    }
    queryGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params?: QueryParameters): Promise<Types.GetSequenceDifference> {
        return this.query('GetSequenceDifference', variables, params);
    }
    queryGetSequenceState(variables: Types.GetSequenceStateVariables, params?: QueryParameters): Promise<Types.GetSequenceState> {
        return this.query('GetSequenceState', variables, params);
    }
    queryGetState(params?: QueryParameters): Promise<Types.GetState> {
        return this.query('GetState', undefined, params);
    }
    queryGlobalCounter(params?: QueryParameters): Promise<Types.GlobalCounter> {
        return this.query('GlobalCounter', undefined, params);
    }
    queryGlobalSearch(variables: Types.GlobalSearchVariables, params?: QueryParameters): Promise<Types.GlobalSearch> {
        return this.query('GlobalSearch', variables, params);
    }
    queryIpLocation(params?: QueryParameters): Promise<Types.IpLocation> {
        return this.query('IpLocation', undefined, params);
    }
    queryMessage(variables: Types.MessageVariables, params?: QueryParameters): Promise<Types.Message> {
        return this.query('Message', variables, params);
    }
    queryMessageFullReactions(variables: Types.MessageFullReactionsVariables, params?: QueryParameters): Promise<Types.MessageFullReactions> {
        return this.query('MessageFullReactions', variables, params);
    }
    queryMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params?: QueryParameters): Promise<Types.MessageMultiSpan> {
        return this.query('MessageMultiSpan', variables, params);
    }
    queryMessagesBatch(variables: Types.MessagesBatchVariables, params?: QueryParameters): Promise<Types.MessagesBatch> {
        return this.query('MessagesBatch', variables, params);
    }
    queryMessagesSearch(variables: Types.MessagesSearchVariables, params?: QueryParameters): Promise<Types.MessagesSearch> {
        return this.query('MessagesSearch', variables, params);
    }
    queryMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params?: QueryParameters): Promise<Types.MessagesSearchFull> {
        return this.query('MessagesSearchFull', variables, params);
    }
    queryMyApps(params?: QueryParameters): Promise<Types.MyApps> {
        return this.query('MyApps', undefined, params);
    }
    queryMyBlackList(params?: QueryParameters): Promise<Types.MyBlackList> {
        return this.query('MyBlackList', undefined, params);
    }
    queryMyCards(params?: QueryParameters): Promise<Types.MyCards> {
        return this.query('MyCards', undefined, params);
    }
    queryMyCommunities(params?: QueryParameters): Promise<Types.MyCommunities> {
        return this.query('MyCommunities', undefined, params);
    }
    queryMyContacts(variables: Types.MyContactsVariables, params?: QueryParameters): Promise<Types.MyContacts> {
        return this.query('MyContacts', variables, params);
    }
    queryMyContactsSearch(variables: Types.MyContactsSearchVariables, params?: QueryParameters): Promise<Types.MyContactsSearch> {
        return this.query('MyContactsSearch', variables, params);
    }
    queryMyContactsState(params?: QueryParameters): Promise<Types.MyContactsState> {
        return this.query('MyContactsState', undefined, params);
    }
    queryMyNotificationCenter(params?: QueryParameters): Promise<Types.MyNotificationCenter> {
        return this.query('MyNotificationCenter', undefined, params);
    }
    queryMyNotifications(variables: Types.MyNotificationsVariables, params?: QueryParameters): Promise<Types.MyNotifications> {
        return this.query('MyNotifications', variables, params);
    }
    queryMyOrganizations(params?: QueryParameters): Promise<Types.MyOrganizations> {
        return this.query('MyOrganizations', undefined, params);
    }
    queryMyPostDrafts(variables: Types.MyPostDraftsVariables, params?: QueryParameters): Promise<Types.MyPostDrafts> {
        return this.query('MyPostDrafts', variables, params);
    }
    queryMyStickers(params?: QueryParameters): Promise<Types.MyStickers> {
        return this.query('MyStickers', undefined, params);
    }
    queryMySuccessfulInvitesCount(params?: QueryParameters): Promise<Types.MySuccessfulInvitesCount> {
        return this.query('MySuccessfulInvitesCount', undefined, params);
    }
    queryMyWallet(params?: QueryParameters): Promise<Types.MyWallet> {
        return this.query('MyWallet', undefined, params);
    }
    queryOauthContext(variables: Types.OauthContextVariables, params?: QueryParameters): Promise<Types.OauthContext> {
        return this.query('OauthContext', variables, params);
    }
    queryOnline(variables: Types.OnlineVariables, params?: QueryParameters): Promise<Types.Online> {
        return this.query('Online', variables, params);
    }
    queryOrganization(variables: Types.OrganizationVariables, params?: QueryParameters): Promise<Types.Organization> {
        return this.query('Organization', variables, params);
    }
    queryOrganizationMembers(variables: Types.OrganizationMembersVariables, params?: QueryParameters): Promise<Types.OrganizationMembers> {
        return this.query('OrganizationMembers', variables, params);
    }
    queryOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params?: QueryParameters): Promise<Types.OrganizationMembersSearch> {
        return this.query('OrganizationMembersSearch', variables, params);
    }
    queryOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, params?: QueryParameters): Promise<Types.OrganizationMembersShort> {
        return this.query('OrganizationMembersShort', variables, params);
    }
    queryOrganizationPico(variables: Types.OrganizationPicoVariables, params?: QueryParameters): Promise<Types.OrganizationPico> {
        return this.query('OrganizationPico', variables, params);
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
    queryPermissions(params?: QueryParameters): Promise<Types.Permissions> {
        return this.query('Permissions', undefined, params);
    }
    queryPhonebookWasExported(params?: QueryParameters): Promise<Types.PhonebookWasExported> {
        return this.query('PhonebookWasExported', undefined, params);
    }
    queryPicSharedMedia(variables: Types.PicSharedMediaVariables, params?: QueryParameters): Promise<Types.PicSharedMedia> {
        return this.query('PicSharedMedia', variables, params);
    }
    queryPost(variables: Types.PostVariables, params?: QueryParameters): Promise<Types.Post> {
        return this.query('Post', variables, params);
    }
    queryPostDraft(variables: Types.PostDraftVariables, params?: QueryParameters): Promise<Types.PostDraft> {
        return this.query('PostDraft', variables, params);
    }
    queryPosts(variables: Types.PostsVariables, params?: QueryParameters): Promise<Types.Posts> {
        return this.query('Posts', variables, params);
    }
    queryProfile(params?: QueryParameters): Promise<Types.Profile> {
        return this.query('Profile', undefined, params);
    }
    queryProfilePrefill(params?: QueryParameters): Promise<Types.ProfilePrefill> {
        return this.query('ProfilePrefill', undefined, params);
    }
    queryResolveShortName(variables: Types.ResolveShortNameVariables, params?: QueryParameters): Promise<Types.ResolveShortName> {
        return this.query('ResolveShortName', variables, params);
    }
    queryResolvedInvite(variables: Types.ResolvedInviteVariables, params?: QueryParameters): Promise<Types.ResolvedInvite> {
        return this.query('ResolvedInvite', variables, params);
    }
    queryRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params?: QueryParameters): Promise<Types.RoomAdminMembers> {
        return this.query('RoomAdminMembers', variables, params);
    }
    queryRoomChat(variables: Types.RoomChatVariables, params?: QueryParameters): Promise<Types.RoomChat> {
        return this.query('RoomChat', variables, params);
    }
    queryRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, params?: QueryParameters): Promise<Types.RoomFeaturedMembers> {
        return this.query('RoomFeaturedMembers', variables, params);
    }
    queryRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params?: QueryParameters): Promise<Types.RoomInviteInfo> {
        return this.query('RoomInviteInfo', variables, params);
    }
    queryRoomInviteLink(variables: Types.RoomInviteLinkVariables, params?: QueryParameters): Promise<Types.RoomInviteLink> {
        return this.query('RoomInviteLink', variables, params);
    }
    queryRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params?: QueryParameters): Promise<Types.RoomMembersPaginated> {
        return this.query('RoomMembersPaginated', variables, params);
    }
    queryRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params?: QueryParameters): Promise<Types.RoomMembersSearch> {
        return this.query('RoomMembersSearch', variables, params);
    }
    queryRoomMembersShort(variables: Types.RoomMembersShortVariables, params?: QueryParameters): Promise<Types.RoomMembersShort> {
        return this.query('RoomMembersShort', variables, params);
    }
    queryRoomMembersTiny(variables: Types.RoomMembersTinyVariables, params?: QueryParameters): Promise<Types.RoomMembersTiny> {
        return this.query('RoomMembersTiny', variables, params);
    }
    queryRoomPico(variables: Types.RoomPicoVariables, params?: QueryParameters): Promise<Types.RoomPico> {
        return this.query('RoomPico', variables, params);
    }
    queryRoomSearch(variables: Types.RoomSearchVariables, params?: QueryParameters): Promise<Types.RoomSearch> {
        return this.query('RoomSearch', variables, params);
    }
    queryRoomSocialImage(variables: Types.RoomSocialImageVariables, params?: QueryParameters): Promise<Types.RoomSocialImage> {
        return this.query('RoomSocialImage', variables, params);
    }
    queryRoomSuper(variables: Types.RoomSuperVariables, params?: QueryParameters): Promise<Types.RoomSuper> {
        return this.query('RoomSuper', variables, params);
    }
    queryRoomTiny(variables: Types.RoomTinyVariables, params?: QueryParameters): Promise<Types.RoomTiny> {
        return this.query('RoomTiny', variables, params);
    }
    querySettings(params?: QueryParameters): Promise<Types.Settings> {
        return this.query('Settings', undefined, params);
    }
    querySharedMedia(variables: Types.SharedMediaVariables, params?: QueryParameters): Promise<Types.SharedMedia> {
        return this.query('SharedMedia', variables, params);
    }
    querySharedMediaCounters(variables: Types.SharedMediaCountersVariables, params?: QueryParameters): Promise<Types.SharedMediaCounters> {
        return this.query('SharedMediaCounters', variables, params);
    }
    queryShouldAskForAppReview(params?: QueryParameters): Promise<Types.ShouldAskForAppReview> {
        return this.query('ShouldAskForAppReview', undefined, params);
    }
    querySocialUserFollowers(variables: Types.SocialUserFollowersVariables, params?: QueryParameters): Promise<Types.SocialUserFollowers> {
        return this.query('SocialUserFollowers', variables, params);
    }
    querySocialUserFollowing(variables: Types.SocialUserFollowingVariables, params?: QueryParameters): Promise<Types.SocialUserFollowing> {
        return this.query('SocialUserFollowing', variables, params);
    }
    queryStickerPack(variables: Types.StickerPackVariables, params?: QueryParameters): Promise<Types.StickerPack> {
        return this.query('StickerPack', variables, params);
    }
    queryStickerPackCatalog(params?: QueryParameters): Promise<Types.StickerPackCatalog> {
        return this.query('StickerPackCatalog', undefined, params);
    }
    queryStripeToken(params?: QueryParameters): Promise<Types.StripeToken> {
        return this.query('StripeToken', undefined, params);
    }
    querySubscriptions(params?: QueryParameters): Promise<Types.Subscriptions> {
        return this.query('Subscriptions', undefined, params);
    }
    querySuggestedRooms(params?: QueryParameters): Promise<Types.SuggestedRooms> {
        return this.query('SuggestedRooms', undefined, params);
    }
    querySuperAccount(variables: Types.SuperAccountVariables, params?: QueryParameters): Promise<Types.SuperAccount> {
        return this.query('SuperAccount', variables, params);
    }
    querySuperAccounts(params?: QueryParameters): Promise<Types.SuperAccounts> {
        return this.query('SuperAccounts', undefined, params);
    }
    querySuperAdmins(params?: QueryParameters): Promise<Types.SuperAdmins> {
        return this.query('SuperAdmins', undefined, params);
    }
    querySuperAllStickerPacks(params?: QueryParameters): Promise<Types.SuperAllStickerPacks> {
        return this.query('SuperAllStickerPacks', undefined, params);
    }
    querySuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, params?: QueryParameters): Promise<Types.SuperBadgeInRoom> {
        return this.query('SuperBadgeInRoom', variables, params);
    }
    querySuperStickerPack(variables: Types.SuperStickerPackVariables, params?: QueryParameters): Promise<Types.SuperStickerPack> {
        return this.query('SuperStickerPack', variables, params);
    }
    querySuperStickerPackCatalog(params?: QueryParameters): Promise<Types.SuperStickerPackCatalog> {
        return this.query('SuperStickerPackCatalog', undefined, params);
    }
    queryTransactionsHistory(variables: Types.TransactionsHistoryVariables, params?: QueryParameters): Promise<Types.TransactionsHistory> {
        return this.query('TransactionsHistory', variables, params);
    }
    queryUnviewedStickers(params?: QueryParameters): Promise<Types.UnviewedStickers> {
        return this.query('UnviewedStickers', undefined, params);
    }
    queryUpdateUsers(variables: Types.UpdateUsersVariables, params?: QueryParameters): Promise<Types.UpdateUsers> {
        return this.query('UpdateUsers', variables, params);
    }
    queryUser(variables: Types.UserVariables, params?: QueryParameters): Promise<Types.User> {
        return this.query('User', variables, params);
    }
    queryUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params?: QueryParameters): Promise<Types.UserAvailableRooms> {
        return this.query('UserAvailableRooms', variables, params);
    }
    queryUserFollowers(variables: Types.UserFollowersVariables, params?: QueryParameters): Promise<Types.UserFollowers> {
        return this.query('UserFollowers', variables, params);
    }
    queryUserNano(variables: Types.UserNanoVariables, params?: QueryParameters): Promise<Types.UserNano> {
        return this.query('UserNano', variables, params);
    }
    queryUserPico(variables: Types.UserPicoVariables, params?: QueryParameters): Promise<Types.UserPico> {
        return this.query('UserPico', variables, params);
    }
    queryUserSearchForChat(variables: Types.UserSearchForChatVariables, params?: QueryParameters): Promise<Types.UserSearchForChat> {
        return this.query('UserSearchForChat', variables, params);
    }
    queryUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params?: QueryParameters): Promise<Types.UserSearchForOrganization> {
        return this.query('UserSearchForOrganization', variables, params);
    }
    queryUserStorage(variables: Types.UserStorageVariables, params?: QueryParameters): Promise<Types.UserStorage> {
        return this.query('UserStorage', variables, params);
    }
    queryUsers(variables: Types.UsersVariables, params?: QueryParameters): Promise<Types.Users> {
        return this.query('Users', variables, params);
    }
    queryVoiceChat(variables: Types.VoiceChatVariables, params?: QueryParameters): Promise<Types.VoiceChat> {
        return this.query('VoiceChat', variables, params);
    }
    queryVoiceChatControls(variables: Types.VoiceChatControlsVariables, params?: QueryParameters): Promise<Types.VoiceChatControls> {
        return this.query('VoiceChatControls', variables, params);
    }
    queryVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params?: QueryParameters): Promise<Types.VoiceChatEventsState> {
        return this.query('VoiceChatEventsState', variables, params);
    }
    queryVoiceChatFull(variables: Types.VoiceChatFullVariables, params?: QueryParameters): Promise<Types.VoiceChatFull> {
        return this.query('VoiceChatFull', variables, params);
    }
    queryVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params?: QueryParameters): Promise<Types.VoiceChatListeners> {
        return this.query('VoiceChatListeners', variables, params);
    }
    queryVoiceChatUser(variables: Types.VoiceChatUserVariables, params?: QueryParameters): Promise<Types.VoiceChatUser> {
        return this.query('VoiceChatUser', variables, params);
    }
    refetchAccount(params?: QueryParameters): Promise<Types.Account> {
        return this.refetch('Account', undefined, params);
    }
    refetchAccountAppInvite(params?: QueryParameters): Promise<Types.AccountAppInvite> {
        return this.refetch('AccountAppInvite', undefined, params);
    }
    refetchAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params?: QueryParameters): Promise<Types.AccountAppInviteInfo> {
        return this.refetch('AccountAppInviteInfo', variables, params);
    }
    refetchAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params?: QueryParameters): Promise<Types.AccountInviteInfo> {
        return this.refetch('AccountInviteInfo', variables, params);
    }
    refetchAccountSettings(params?: QueryParameters): Promise<Types.AccountSettings> {
        return this.refetch('AccountSettings', undefined, params);
    }
    refetchActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params?: QueryParameters): Promise<Types.ActiveVoiceChats> {
        return this.refetch('ActiveVoiceChats', variables, params);
    }
    refetchAuthPoints(params?: QueryParameters): Promise<Types.AuthPoints> {
        return this.refetch('AuthPoints', undefined, params);
    }
    refetchAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params?: QueryParameters): Promise<Types.AuthResolveShortName> {
        return this.refetch('AuthResolveShortName', variables, params);
    }
    refetchBlackListUpdatesState(params?: QueryParameters): Promise<Types.BlackListUpdatesState> {
        return this.refetch('BlackListUpdatesState', undefined, params);
    }
    refetchChannel(variables: Types.ChannelVariables, params?: QueryParameters): Promise<Types.Channel> {
        return this.refetch('Channel', variables, params);
    }
    refetchChannels(params?: QueryParameters): Promise<Types.Channels> {
        return this.refetch('Channels', undefined, params);
    }
    refetchChatInit(variables: Types.ChatInitVariables, params?: QueryParameters): Promise<Types.ChatInit> {
        return this.refetch('ChatInit', variables, params);
    }
    refetchChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params?: QueryParameters): Promise<Types.ChatInitFromUnread> {
        return this.refetch('ChatInitFromUnread', variables, params);
    }
    refetchChatJoin(variables: Types.ChatJoinVariables, params?: QueryParameters): Promise<Types.ChatJoin> {
        return this.refetch('ChatJoin', variables, params);
    }
    refetchChatMentionSearch(variables: Types.ChatMentionSearchVariables, params?: QueryParameters): Promise<Types.ChatMentionSearch> {
        return this.refetch('ChatMentionSearch', variables, params);
    }
    refetchChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params?: QueryParameters): Promise<Types.ChatNewGetMessage> {
        return this.refetch('ChatNewGetMessage', variables, params);
    }
    refetchChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params?: QueryParameters): Promise<Types.ChatNewLoadAfter> {
        return this.refetch('ChatNewLoadAfter', variables, params);
    }
    refetchChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params?: QueryParameters): Promise<Types.ChatNewLoadBefore> {
        return this.refetch('ChatNewLoadBefore', variables, params);
    }
    refetchChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params?: QueryParameters): Promise<Types.ChatNewReadLastRead> {
        return this.refetch('ChatNewReadLastRead', variables, params);
    }
    refetchCommentFullReactions(variables: Types.CommentFullReactionsVariables, params?: QueryParameters): Promise<Types.CommentFullReactions> {
        return this.refetch('CommentFullReactions', variables, params);
    }
    refetchComments(variables: Types.CommentsVariables, params?: QueryParameters): Promise<Types.Comments> {
        return this.refetch('Comments', variables, params);
    }
    refetchCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params?: QueryParameters): Promise<Types.CommonChatsWithUser> {
        return this.refetch('CommonChatsWithUser', variables, params);
    }
    refetchConference(variables: Types.ConferenceVariables, params?: QueryParameters): Promise<Types.Conference> {
        return this.refetch('Conference', variables, params);
    }
    refetchConferenceMedia(variables: Types.ConferenceMediaVariables, params?: QueryParameters): Promise<Types.ConferenceMedia> {
        return this.refetch('ConferenceMedia', variables, params);
    }
    refetchCreatedStickerPacks(params?: QueryParameters): Promise<Types.CreatedStickerPacks> {
        return this.refetch('CreatedStickerPacks', undefined, params);
    }
    refetchDebugGqlTrace(variables: Types.DebugGqlTraceVariables, params?: QueryParameters): Promise<Types.DebugGqlTrace> {
        return this.refetch('DebugGqlTrace', variables, params);
    }
    refetchDebugGqlTraces(variables: Types.DebugGqlTracesVariables, params?: QueryParameters): Promise<Types.DebugGqlTraces> {
        return this.refetch('DebugGqlTraces', variables, params);
    }
    refetchDialogs(variables: Types.DialogsVariables, params?: QueryParameters): Promise<Types.Dialogs> {
        return this.refetch('Dialogs', variables, params);
    }
    refetchDiscoverCollection(variables: Types.DiscoverCollectionVariables, params?: QueryParameters): Promise<Types.DiscoverCollection> {
        return this.refetch('DiscoverCollection', variables, params);
    }
    refetchDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params?: QueryParameters): Promise<Types.DiscoverCollectionShort> {
        return this.refetch('DiscoverCollectionShort', variables, params);
    }
    refetchDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params?: QueryParameters): Promise<Types.DiscoverCollections> {
        return this.refetch('DiscoverCollections', variables, params);
    }
    refetchDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params?: QueryParameters): Promise<Types.DiscoverCollectionsShort> {
        return this.refetch('DiscoverCollectionsShort', variables, params);
    }
    refetchDiscoverEditorsChoice(params?: QueryParameters): Promise<Types.DiscoverEditorsChoice> {
        return this.refetch('DiscoverEditorsChoice', undefined, params);
    }
    refetchDiscoverIsDone(params?: QueryParameters): Promise<Types.DiscoverIsDone> {
        return this.refetch('DiscoverIsDone', undefined, params);
    }
    refetchDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params?: QueryParameters): Promise<Types.DiscoverNewAndGrowing> {
        return this.refetch('DiscoverNewAndGrowing', variables, params);
    }
    refetchDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params?: QueryParameters): Promise<Types.DiscoverNewOrganizations> {
        return this.refetch('DiscoverNewOrganizations', variables, params);
    }
    refetchDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params?: QueryParameters): Promise<Types.DiscoverNextPage> {
        return this.refetch('DiscoverNextPage', variables, params);
    }
    refetchDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params?: QueryParameters): Promise<Types.DiscoverNoAuth> {
        return this.refetch('DiscoverNoAuth', variables, params);
    }
    refetchDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params?: QueryParameters): Promise<Types.DiscoverPopularNow> {
        return this.refetch('DiscoverPopularNow', variables, params);
    }
    refetchDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params?: QueryParameters): Promise<Types.DiscoverPopularOrganizations> {
        return this.refetch('DiscoverPopularOrganizations', variables, params);
    }
    refetchDiscoverState(params?: QueryParameters): Promise<Types.DiscoverState> {
        return this.refetch('DiscoverState', undefined, params);
    }
    refetchDiscoverSuggestedRooms(params?: QueryParameters): Promise<Types.DiscoverSuggestedRooms> {
        return this.refetch('DiscoverSuggestedRooms', undefined, params);
    }
    refetchDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params?: QueryParameters): Promise<Types.DiscoverTopFree> {
        return this.refetch('DiscoverTopFree', variables, params);
    }
    refetchDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params?: QueryParameters): Promise<Types.DiscoverTopPremium> {
        return this.refetch('DiscoverTopPremium', variables, params);
    }
    refetchExplorePeople(variables: Types.ExplorePeopleVariables, params?: QueryParameters): Promise<Types.ExplorePeople> {
        return this.refetch('ExplorePeople', variables, params);
    }
    refetchExploreRooms(variables: Types.ExploreRoomsVariables, params?: QueryParameters): Promise<Types.ExploreRooms> {
        return this.refetch('ExploreRooms', variables, params);
    }
    refetchFetchPushSettings(params?: QueryParameters): Promise<Types.FetchPushSettings> {
        return this.refetch('FetchPushSettings', undefined, params);
    }
    refetchGetDifference(variables: Types.GetDifferenceVariables, params?: QueryParameters): Promise<Types.GetDifference> {
        return this.refetch('GetDifference', variables, params);
    }
    refetchGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params?: QueryParameters): Promise<Types.GetInitialDialogs> {
        return this.refetch('GetInitialDialogs', variables, params);
    }
    refetchGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params?: QueryParameters): Promise<Types.GetSequenceDifference> {
        return this.refetch('GetSequenceDifference', variables, params);
    }
    refetchGetSequenceState(variables: Types.GetSequenceStateVariables, params?: QueryParameters): Promise<Types.GetSequenceState> {
        return this.refetch('GetSequenceState', variables, params);
    }
    refetchGetState(params?: QueryParameters): Promise<Types.GetState> {
        return this.refetch('GetState', undefined, params);
    }
    refetchGlobalCounter(params?: QueryParameters): Promise<Types.GlobalCounter> {
        return this.refetch('GlobalCounter', undefined, params);
    }
    refetchGlobalSearch(variables: Types.GlobalSearchVariables, params?: QueryParameters): Promise<Types.GlobalSearch> {
        return this.refetch('GlobalSearch', variables, params);
    }
    refetchIpLocation(params?: QueryParameters): Promise<Types.IpLocation> {
        return this.refetch('IpLocation', undefined, params);
    }
    refetchMessage(variables: Types.MessageVariables, params?: QueryParameters): Promise<Types.Message> {
        return this.refetch('Message', variables, params);
    }
    refetchMessageFullReactions(variables: Types.MessageFullReactionsVariables, params?: QueryParameters): Promise<Types.MessageFullReactions> {
        return this.refetch('MessageFullReactions', variables, params);
    }
    refetchMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params?: QueryParameters): Promise<Types.MessageMultiSpan> {
        return this.refetch('MessageMultiSpan', variables, params);
    }
    refetchMessagesBatch(variables: Types.MessagesBatchVariables, params?: QueryParameters): Promise<Types.MessagesBatch> {
        return this.refetch('MessagesBatch', variables, params);
    }
    refetchMessagesSearch(variables: Types.MessagesSearchVariables, params?: QueryParameters): Promise<Types.MessagesSearch> {
        return this.refetch('MessagesSearch', variables, params);
    }
    refetchMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params?: QueryParameters): Promise<Types.MessagesSearchFull> {
        return this.refetch('MessagesSearchFull', variables, params);
    }
    refetchMyApps(params?: QueryParameters): Promise<Types.MyApps> {
        return this.refetch('MyApps', undefined, params);
    }
    refetchMyBlackList(params?: QueryParameters): Promise<Types.MyBlackList> {
        return this.refetch('MyBlackList', undefined, params);
    }
    refetchMyCards(params?: QueryParameters): Promise<Types.MyCards> {
        return this.refetch('MyCards', undefined, params);
    }
    refetchMyCommunities(params?: QueryParameters): Promise<Types.MyCommunities> {
        return this.refetch('MyCommunities', undefined, params);
    }
    refetchMyContacts(variables: Types.MyContactsVariables, params?: QueryParameters): Promise<Types.MyContacts> {
        return this.refetch('MyContacts', variables, params);
    }
    refetchMyContactsSearch(variables: Types.MyContactsSearchVariables, params?: QueryParameters): Promise<Types.MyContactsSearch> {
        return this.refetch('MyContactsSearch', variables, params);
    }
    refetchMyContactsState(params?: QueryParameters): Promise<Types.MyContactsState> {
        return this.refetch('MyContactsState', undefined, params);
    }
    refetchMyNotificationCenter(params?: QueryParameters): Promise<Types.MyNotificationCenter> {
        return this.refetch('MyNotificationCenter', undefined, params);
    }
    refetchMyNotifications(variables: Types.MyNotificationsVariables, params?: QueryParameters): Promise<Types.MyNotifications> {
        return this.refetch('MyNotifications', variables, params);
    }
    refetchMyOrganizations(params?: QueryParameters): Promise<Types.MyOrganizations> {
        return this.refetch('MyOrganizations', undefined, params);
    }
    refetchMyPostDrafts(variables: Types.MyPostDraftsVariables, params?: QueryParameters): Promise<Types.MyPostDrafts> {
        return this.refetch('MyPostDrafts', variables, params);
    }
    refetchMyStickers(params?: QueryParameters): Promise<Types.MyStickers> {
        return this.refetch('MyStickers', undefined, params);
    }
    refetchMySuccessfulInvitesCount(params?: QueryParameters): Promise<Types.MySuccessfulInvitesCount> {
        return this.refetch('MySuccessfulInvitesCount', undefined, params);
    }
    refetchMyWallet(params?: QueryParameters): Promise<Types.MyWallet> {
        return this.refetch('MyWallet', undefined, params);
    }
    refetchOauthContext(variables: Types.OauthContextVariables, params?: QueryParameters): Promise<Types.OauthContext> {
        return this.refetch('OauthContext', variables, params);
    }
    refetchOnline(variables: Types.OnlineVariables, params?: QueryParameters): Promise<Types.Online> {
        return this.refetch('Online', variables, params);
    }
    refetchOrganization(variables: Types.OrganizationVariables, params?: QueryParameters): Promise<Types.Organization> {
        return this.refetch('Organization', variables, params);
    }
    refetchOrganizationMembers(variables: Types.OrganizationMembersVariables, params?: QueryParameters): Promise<Types.OrganizationMembers> {
        return this.refetch('OrganizationMembers', variables, params);
    }
    refetchOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params?: QueryParameters): Promise<Types.OrganizationMembersSearch> {
        return this.refetch('OrganizationMembersSearch', variables, params);
    }
    refetchOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, params?: QueryParameters): Promise<Types.OrganizationMembersShort> {
        return this.refetch('OrganizationMembersShort', variables, params);
    }
    refetchOrganizationPico(variables: Types.OrganizationPicoVariables, params?: QueryParameters): Promise<Types.OrganizationPico> {
        return this.refetch('OrganizationPico', variables, params);
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
    refetchPermissions(params?: QueryParameters): Promise<Types.Permissions> {
        return this.refetch('Permissions', undefined, params);
    }
    refetchPhonebookWasExported(params?: QueryParameters): Promise<Types.PhonebookWasExported> {
        return this.refetch('PhonebookWasExported', undefined, params);
    }
    refetchPicSharedMedia(variables: Types.PicSharedMediaVariables, params?: QueryParameters): Promise<Types.PicSharedMedia> {
        return this.refetch('PicSharedMedia', variables, params);
    }
    refetchPost(variables: Types.PostVariables, params?: QueryParameters): Promise<Types.Post> {
        return this.refetch('Post', variables, params);
    }
    refetchPostDraft(variables: Types.PostDraftVariables, params?: QueryParameters): Promise<Types.PostDraft> {
        return this.refetch('PostDraft', variables, params);
    }
    refetchPosts(variables: Types.PostsVariables, params?: QueryParameters): Promise<Types.Posts> {
        return this.refetch('Posts', variables, params);
    }
    refetchProfile(params?: QueryParameters): Promise<Types.Profile> {
        return this.refetch('Profile', undefined, params);
    }
    refetchProfilePrefill(params?: QueryParameters): Promise<Types.ProfilePrefill> {
        return this.refetch('ProfilePrefill', undefined, params);
    }
    refetchResolveShortName(variables: Types.ResolveShortNameVariables, params?: QueryParameters): Promise<Types.ResolveShortName> {
        return this.refetch('ResolveShortName', variables, params);
    }
    refetchResolvedInvite(variables: Types.ResolvedInviteVariables, params?: QueryParameters): Promise<Types.ResolvedInvite> {
        return this.refetch('ResolvedInvite', variables, params);
    }
    refetchRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params?: QueryParameters): Promise<Types.RoomAdminMembers> {
        return this.refetch('RoomAdminMembers', variables, params);
    }
    refetchRoomChat(variables: Types.RoomChatVariables, params?: QueryParameters): Promise<Types.RoomChat> {
        return this.refetch('RoomChat', variables, params);
    }
    refetchRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, params?: QueryParameters): Promise<Types.RoomFeaturedMembers> {
        return this.refetch('RoomFeaturedMembers', variables, params);
    }
    refetchRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params?: QueryParameters): Promise<Types.RoomInviteInfo> {
        return this.refetch('RoomInviteInfo', variables, params);
    }
    refetchRoomInviteLink(variables: Types.RoomInviteLinkVariables, params?: QueryParameters): Promise<Types.RoomInviteLink> {
        return this.refetch('RoomInviteLink', variables, params);
    }
    refetchRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params?: QueryParameters): Promise<Types.RoomMembersPaginated> {
        return this.refetch('RoomMembersPaginated', variables, params);
    }
    refetchRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params?: QueryParameters): Promise<Types.RoomMembersSearch> {
        return this.refetch('RoomMembersSearch', variables, params);
    }
    refetchRoomMembersShort(variables: Types.RoomMembersShortVariables, params?: QueryParameters): Promise<Types.RoomMembersShort> {
        return this.refetch('RoomMembersShort', variables, params);
    }
    refetchRoomMembersTiny(variables: Types.RoomMembersTinyVariables, params?: QueryParameters): Promise<Types.RoomMembersTiny> {
        return this.refetch('RoomMembersTiny', variables, params);
    }
    refetchRoomPico(variables: Types.RoomPicoVariables, params?: QueryParameters): Promise<Types.RoomPico> {
        return this.refetch('RoomPico', variables, params);
    }
    refetchRoomSearch(variables: Types.RoomSearchVariables, params?: QueryParameters): Promise<Types.RoomSearch> {
        return this.refetch('RoomSearch', variables, params);
    }
    refetchRoomSocialImage(variables: Types.RoomSocialImageVariables, params?: QueryParameters): Promise<Types.RoomSocialImage> {
        return this.refetch('RoomSocialImage', variables, params);
    }
    refetchRoomSuper(variables: Types.RoomSuperVariables, params?: QueryParameters): Promise<Types.RoomSuper> {
        return this.refetch('RoomSuper', variables, params);
    }
    refetchRoomTiny(variables: Types.RoomTinyVariables, params?: QueryParameters): Promise<Types.RoomTiny> {
        return this.refetch('RoomTiny', variables, params);
    }
    refetchSettings(params?: QueryParameters): Promise<Types.Settings> {
        return this.refetch('Settings', undefined, params);
    }
    refetchSharedMedia(variables: Types.SharedMediaVariables, params?: QueryParameters): Promise<Types.SharedMedia> {
        return this.refetch('SharedMedia', variables, params);
    }
    refetchSharedMediaCounters(variables: Types.SharedMediaCountersVariables, params?: QueryParameters): Promise<Types.SharedMediaCounters> {
        return this.refetch('SharedMediaCounters', variables, params);
    }
    refetchShouldAskForAppReview(params?: QueryParameters): Promise<Types.ShouldAskForAppReview> {
        return this.refetch('ShouldAskForAppReview', undefined, params);
    }
    refetchSocialUserFollowers(variables: Types.SocialUserFollowersVariables, params?: QueryParameters): Promise<Types.SocialUserFollowers> {
        return this.refetch('SocialUserFollowers', variables, params);
    }
    refetchSocialUserFollowing(variables: Types.SocialUserFollowingVariables, params?: QueryParameters): Promise<Types.SocialUserFollowing> {
        return this.refetch('SocialUserFollowing', variables, params);
    }
    refetchStickerPack(variables: Types.StickerPackVariables, params?: QueryParameters): Promise<Types.StickerPack> {
        return this.refetch('StickerPack', variables, params);
    }
    refetchStickerPackCatalog(params?: QueryParameters): Promise<Types.StickerPackCatalog> {
        return this.refetch('StickerPackCatalog', undefined, params);
    }
    refetchStripeToken(params?: QueryParameters): Promise<Types.StripeToken> {
        return this.refetch('StripeToken', undefined, params);
    }
    refetchSubscriptions(params?: QueryParameters): Promise<Types.Subscriptions> {
        return this.refetch('Subscriptions', undefined, params);
    }
    refetchSuggestedRooms(params?: QueryParameters): Promise<Types.SuggestedRooms> {
        return this.refetch('SuggestedRooms', undefined, params);
    }
    refetchSuperAccount(variables: Types.SuperAccountVariables, params?: QueryParameters): Promise<Types.SuperAccount> {
        return this.refetch('SuperAccount', variables, params);
    }
    refetchSuperAccounts(params?: QueryParameters): Promise<Types.SuperAccounts> {
        return this.refetch('SuperAccounts', undefined, params);
    }
    refetchSuperAdmins(params?: QueryParameters): Promise<Types.SuperAdmins> {
        return this.refetch('SuperAdmins', undefined, params);
    }
    refetchSuperAllStickerPacks(params?: QueryParameters): Promise<Types.SuperAllStickerPacks> {
        return this.refetch('SuperAllStickerPacks', undefined, params);
    }
    refetchSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, params?: QueryParameters): Promise<Types.SuperBadgeInRoom> {
        return this.refetch('SuperBadgeInRoom', variables, params);
    }
    refetchSuperStickerPack(variables: Types.SuperStickerPackVariables, params?: QueryParameters): Promise<Types.SuperStickerPack> {
        return this.refetch('SuperStickerPack', variables, params);
    }
    refetchSuperStickerPackCatalog(params?: QueryParameters): Promise<Types.SuperStickerPackCatalog> {
        return this.refetch('SuperStickerPackCatalog', undefined, params);
    }
    refetchTransactionsHistory(variables: Types.TransactionsHistoryVariables, params?: QueryParameters): Promise<Types.TransactionsHistory> {
        return this.refetch('TransactionsHistory', variables, params);
    }
    refetchUnviewedStickers(params?: QueryParameters): Promise<Types.UnviewedStickers> {
        return this.refetch('UnviewedStickers', undefined, params);
    }
    refetchUpdateUsers(variables: Types.UpdateUsersVariables, params?: QueryParameters): Promise<Types.UpdateUsers> {
        return this.refetch('UpdateUsers', variables, params);
    }
    refetchUser(variables: Types.UserVariables, params?: QueryParameters): Promise<Types.User> {
        return this.refetch('User', variables, params);
    }
    refetchUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params?: QueryParameters): Promise<Types.UserAvailableRooms> {
        return this.refetch('UserAvailableRooms', variables, params);
    }
    refetchUserFollowers(variables: Types.UserFollowersVariables, params?: QueryParameters): Promise<Types.UserFollowers> {
        return this.refetch('UserFollowers', variables, params);
    }
    refetchUserNano(variables: Types.UserNanoVariables, params?: QueryParameters): Promise<Types.UserNano> {
        return this.refetch('UserNano', variables, params);
    }
    refetchUserPico(variables: Types.UserPicoVariables, params?: QueryParameters): Promise<Types.UserPico> {
        return this.refetch('UserPico', variables, params);
    }
    refetchUserSearchForChat(variables: Types.UserSearchForChatVariables, params?: QueryParameters): Promise<Types.UserSearchForChat> {
        return this.refetch('UserSearchForChat', variables, params);
    }
    refetchUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params?: QueryParameters): Promise<Types.UserSearchForOrganization> {
        return this.refetch('UserSearchForOrganization', variables, params);
    }
    refetchUserStorage(variables: Types.UserStorageVariables, params?: QueryParameters): Promise<Types.UserStorage> {
        return this.refetch('UserStorage', variables, params);
    }
    refetchUsers(variables: Types.UsersVariables, params?: QueryParameters): Promise<Types.Users> {
        return this.refetch('Users', variables, params);
    }
    refetchVoiceChat(variables: Types.VoiceChatVariables, params?: QueryParameters): Promise<Types.VoiceChat> {
        return this.refetch('VoiceChat', variables, params);
    }
    refetchVoiceChatControls(variables: Types.VoiceChatControlsVariables, params?: QueryParameters): Promise<Types.VoiceChatControls> {
        return this.refetch('VoiceChatControls', variables, params);
    }
    refetchVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params?: QueryParameters): Promise<Types.VoiceChatEventsState> {
        return this.refetch('VoiceChatEventsState', variables, params);
    }
    refetchVoiceChatFull(variables: Types.VoiceChatFullVariables, params?: QueryParameters): Promise<Types.VoiceChatFull> {
        return this.refetch('VoiceChatFull', variables, params);
    }
    refetchVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params?: QueryParameters): Promise<Types.VoiceChatListeners> {
        return this.refetch('VoiceChatListeners', variables, params);
    }
    refetchVoiceChatUser(variables: Types.VoiceChatUserVariables, params?: QueryParameters): Promise<Types.VoiceChatUser> {
        return this.refetch('VoiceChatUser', variables, params);
    }
    updateAccount(updater: (data: Types.Account) => Types.Account | null): Promise<boolean> {
        return this.updateQuery(updater, 'Account', undefined);
    }
    updateAccountAppInvite(updater: (data: Types.AccountAppInvite) => Types.AccountAppInvite | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountAppInvite', undefined);
    }
    updateAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, updater: (data: Types.AccountAppInviteInfo) => Types.AccountAppInviteInfo | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountAppInviteInfo', variables);
    }
    updateAccountInviteInfo(variables: Types.AccountInviteInfoVariables, updater: (data: Types.AccountInviteInfo) => Types.AccountInviteInfo | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountInviteInfo', variables);
    }
    updateAccountSettings(updater: (data: Types.AccountSettings) => Types.AccountSettings | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountSettings', undefined);
    }
    updateActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, updater: (data: Types.ActiveVoiceChats) => Types.ActiveVoiceChats | null): Promise<boolean> {
        return this.updateQuery(updater, 'ActiveVoiceChats', variables);
    }
    updateAuthPoints(updater: (data: Types.AuthPoints) => Types.AuthPoints | null): Promise<boolean> {
        return this.updateQuery(updater, 'AuthPoints', undefined);
    }
    updateAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, updater: (data: Types.AuthResolveShortName) => Types.AuthResolveShortName | null): Promise<boolean> {
        return this.updateQuery(updater, 'AuthResolveShortName', variables);
    }
    updateBlackListUpdatesState(updater: (data: Types.BlackListUpdatesState) => Types.BlackListUpdatesState | null): Promise<boolean> {
        return this.updateQuery(updater, 'BlackListUpdatesState', undefined);
    }
    updateChannel(variables: Types.ChannelVariables, updater: (data: Types.Channel) => Types.Channel | null): Promise<boolean> {
        return this.updateQuery(updater, 'Channel', variables);
    }
    updateChannels(updater: (data: Types.Channels) => Types.Channels | null): Promise<boolean> {
        return this.updateQuery(updater, 'Channels', undefined);
    }
    updateChatInit(variables: Types.ChatInitVariables, updater: (data: Types.ChatInit) => Types.ChatInit | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatInit', variables);
    }
    updateChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, updater: (data: Types.ChatInitFromUnread) => Types.ChatInitFromUnread | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatInitFromUnread', variables);
    }
    updateChatJoin(variables: Types.ChatJoinVariables, updater: (data: Types.ChatJoin) => Types.ChatJoin | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatJoin', variables);
    }
    updateChatMentionSearch(variables: Types.ChatMentionSearchVariables, updater: (data: Types.ChatMentionSearch) => Types.ChatMentionSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatMentionSearch', variables);
    }
    updateChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, updater: (data: Types.ChatNewGetMessage) => Types.ChatNewGetMessage | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatNewGetMessage', variables);
    }
    updateChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, updater: (data: Types.ChatNewLoadAfter) => Types.ChatNewLoadAfter | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatNewLoadAfter', variables);
    }
    updateChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, updater: (data: Types.ChatNewLoadBefore) => Types.ChatNewLoadBefore | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatNewLoadBefore', variables);
    }
    updateChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, updater: (data: Types.ChatNewReadLastRead) => Types.ChatNewReadLastRead | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatNewReadLastRead', variables);
    }
    updateCommentFullReactions(variables: Types.CommentFullReactionsVariables, updater: (data: Types.CommentFullReactions) => Types.CommentFullReactions | null): Promise<boolean> {
        return this.updateQuery(updater, 'CommentFullReactions', variables);
    }
    updateComments(variables: Types.CommentsVariables, updater: (data: Types.Comments) => Types.Comments | null): Promise<boolean> {
        return this.updateQuery(updater, 'Comments', variables);
    }
    updateCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, updater: (data: Types.CommonChatsWithUser) => Types.CommonChatsWithUser | null): Promise<boolean> {
        return this.updateQuery(updater, 'CommonChatsWithUser', variables);
    }
    updateConference(variables: Types.ConferenceVariables, updater: (data: Types.Conference) => Types.Conference | null): Promise<boolean> {
        return this.updateQuery(updater, 'Conference', variables);
    }
    updateConferenceMedia(variables: Types.ConferenceMediaVariables, updater: (data: Types.ConferenceMedia) => Types.ConferenceMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'ConferenceMedia', variables);
    }
    updateCreatedStickerPacks(updater: (data: Types.CreatedStickerPacks) => Types.CreatedStickerPacks | null): Promise<boolean> {
        return this.updateQuery(updater, 'CreatedStickerPacks', undefined);
    }
    updateDebugGqlTrace(variables: Types.DebugGqlTraceVariables, updater: (data: Types.DebugGqlTrace) => Types.DebugGqlTrace | null): Promise<boolean> {
        return this.updateQuery(updater, 'DebugGqlTrace', variables);
    }
    updateDebugGqlTraces(variables: Types.DebugGqlTracesVariables, updater: (data: Types.DebugGqlTraces) => Types.DebugGqlTraces | null): Promise<boolean> {
        return this.updateQuery(updater, 'DebugGqlTraces', variables);
    }
    updateDialogs(variables: Types.DialogsVariables, updater: (data: Types.Dialogs) => Types.Dialogs | null): Promise<boolean> {
        return this.updateQuery(updater, 'Dialogs', variables);
    }
    updateDiscoverCollection(variables: Types.DiscoverCollectionVariables, updater: (data: Types.DiscoverCollection) => Types.DiscoverCollection | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverCollection', variables);
    }
    updateDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, updater: (data: Types.DiscoverCollectionShort) => Types.DiscoverCollectionShort | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverCollectionShort', variables);
    }
    updateDiscoverCollections(variables: Types.DiscoverCollectionsVariables, updater: (data: Types.DiscoverCollections) => Types.DiscoverCollections | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverCollections', variables);
    }
    updateDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, updater: (data: Types.DiscoverCollectionsShort) => Types.DiscoverCollectionsShort | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverCollectionsShort', variables);
    }
    updateDiscoverEditorsChoice(updater: (data: Types.DiscoverEditorsChoice) => Types.DiscoverEditorsChoice | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverEditorsChoice', undefined);
    }
    updateDiscoverIsDone(updater: (data: Types.DiscoverIsDone) => Types.DiscoverIsDone | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverIsDone', undefined);
    }
    updateDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, updater: (data: Types.DiscoverNewAndGrowing) => Types.DiscoverNewAndGrowing | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNewAndGrowing', variables);
    }
    updateDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, updater: (data: Types.DiscoverNewOrganizations) => Types.DiscoverNewOrganizations | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNewOrganizations', variables);
    }
    updateDiscoverNextPage(variables: Types.DiscoverNextPageVariables, updater: (data: Types.DiscoverNextPage) => Types.DiscoverNextPage | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNextPage', variables);
    }
    updateDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, updater: (data: Types.DiscoverNoAuth) => Types.DiscoverNoAuth | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNoAuth', variables);
    }
    updateDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, updater: (data: Types.DiscoverPopularNow) => Types.DiscoverPopularNow | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverPopularNow', variables);
    }
    updateDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, updater: (data: Types.DiscoverPopularOrganizations) => Types.DiscoverPopularOrganizations | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverPopularOrganizations', variables);
    }
    updateDiscoverState(updater: (data: Types.DiscoverState) => Types.DiscoverState | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverState', undefined);
    }
    updateDiscoverSuggestedRooms(updater: (data: Types.DiscoverSuggestedRooms) => Types.DiscoverSuggestedRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverSuggestedRooms', undefined);
    }
    updateDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, updater: (data: Types.DiscoverTopFree) => Types.DiscoverTopFree | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverTopFree', variables);
    }
    updateDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, updater: (data: Types.DiscoverTopPremium) => Types.DiscoverTopPremium | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverTopPremium', variables);
    }
    updateExplorePeople(variables: Types.ExplorePeopleVariables, updater: (data: Types.ExplorePeople) => Types.ExplorePeople | null): Promise<boolean> {
        return this.updateQuery(updater, 'ExplorePeople', variables);
    }
    updateExploreRooms(variables: Types.ExploreRoomsVariables, updater: (data: Types.ExploreRooms) => Types.ExploreRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'ExploreRooms', variables);
    }
    updateFetchPushSettings(updater: (data: Types.FetchPushSettings) => Types.FetchPushSettings | null): Promise<boolean> {
        return this.updateQuery(updater, 'FetchPushSettings', undefined);
    }
    updateGetDifference(variables: Types.GetDifferenceVariables, updater: (data: Types.GetDifference) => Types.GetDifference | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetDifference', variables);
    }
    updateGetInitialDialogs(variables: Types.GetInitialDialogsVariables, updater: (data: Types.GetInitialDialogs) => Types.GetInitialDialogs | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetInitialDialogs', variables);
    }
    updateGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, updater: (data: Types.GetSequenceDifference) => Types.GetSequenceDifference | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetSequenceDifference', variables);
    }
    updateGetSequenceState(variables: Types.GetSequenceStateVariables, updater: (data: Types.GetSequenceState) => Types.GetSequenceState | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetSequenceState', variables);
    }
    updateGetState(updater: (data: Types.GetState) => Types.GetState | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetState', undefined);
    }
    updateGlobalCounter(updater: (data: Types.GlobalCounter) => Types.GlobalCounter | null): Promise<boolean> {
        return this.updateQuery(updater, 'GlobalCounter', undefined);
    }
    updateGlobalSearch(variables: Types.GlobalSearchVariables, updater: (data: Types.GlobalSearch) => Types.GlobalSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'GlobalSearch', variables);
    }
    updateIpLocation(updater: (data: Types.IpLocation) => Types.IpLocation | null): Promise<boolean> {
        return this.updateQuery(updater, 'IpLocation', undefined);
    }
    updateMessage(variables: Types.MessageVariables, updater: (data: Types.Message) => Types.Message | null): Promise<boolean> {
        return this.updateQuery(updater, 'Message', variables);
    }
    updateMessageFullReactions(variables: Types.MessageFullReactionsVariables, updater: (data: Types.MessageFullReactions) => Types.MessageFullReactions | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessageFullReactions', variables);
    }
    updateMessageMultiSpan(variables: Types.MessageMultiSpanVariables, updater: (data: Types.MessageMultiSpan) => Types.MessageMultiSpan | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessageMultiSpan', variables);
    }
    updateMessagesBatch(variables: Types.MessagesBatchVariables, updater: (data: Types.MessagesBatch) => Types.MessagesBatch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesBatch', variables);
    }
    updateMessagesSearch(variables: Types.MessagesSearchVariables, updater: (data: Types.MessagesSearch) => Types.MessagesSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesSearch', variables);
    }
    updateMessagesSearchFull(variables: Types.MessagesSearchFullVariables, updater: (data: Types.MessagesSearchFull) => Types.MessagesSearchFull | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesSearchFull', variables);
    }
    updateMyApps(updater: (data: Types.MyApps) => Types.MyApps | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyApps', undefined);
    }
    updateMyBlackList(updater: (data: Types.MyBlackList) => Types.MyBlackList | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyBlackList', undefined);
    }
    updateMyCards(updater: (data: Types.MyCards) => Types.MyCards | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyCards', undefined);
    }
    updateMyCommunities(updater: (data: Types.MyCommunities) => Types.MyCommunities | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyCommunities', undefined);
    }
    updateMyContacts(variables: Types.MyContactsVariables, updater: (data: Types.MyContacts) => Types.MyContacts | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyContacts', variables);
    }
    updateMyContactsSearch(variables: Types.MyContactsSearchVariables, updater: (data: Types.MyContactsSearch) => Types.MyContactsSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyContactsSearch', variables);
    }
    updateMyContactsState(updater: (data: Types.MyContactsState) => Types.MyContactsState | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyContactsState', undefined);
    }
    updateMyNotificationCenter(updater: (data: Types.MyNotificationCenter) => Types.MyNotificationCenter | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyNotificationCenter', undefined);
    }
    updateMyNotifications(variables: Types.MyNotificationsVariables, updater: (data: Types.MyNotifications) => Types.MyNotifications | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyNotifications', variables);
    }
    updateMyOrganizations(updater: (data: Types.MyOrganizations) => Types.MyOrganizations | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyOrganizations', undefined);
    }
    updateMyPostDrafts(variables: Types.MyPostDraftsVariables, updater: (data: Types.MyPostDrafts) => Types.MyPostDrafts | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyPostDrafts', variables);
    }
    updateMyStickers(updater: (data: Types.MyStickers) => Types.MyStickers | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyStickers', undefined);
    }
    updateMySuccessfulInvitesCount(updater: (data: Types.MySuccessfulInvitesCount) => Types.MySuccessfulInvitesCount | null): Promise<boolean> {
        return this.updateQuery(updater, 'MySuccessfulInvitesCount', undefined);
    }
    updateMyWallet(updater: (data: Types.MyWallet) => Types.MyWallet | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyWallet', undefined);
    }
    updateOauthContext(variables: Types.OauthContextVariables, updater: (data: Types.OauthContext) => Types.OauthContext | null): Promise<boolean> {
        return this.updateQuery(updater, 'OauthContext', variables);
    }
    updateOnline(variables: Types.OnlineVariables, updater: (data: Types.Online) => Types.Online | null): Promise<boolean> {
        return this.updateQuery(updater, 'Online', variables);
    }
    updateOrganization(variables: Types.OrganizationVariables, updater: (data: Types.Organization) => Types.Organization | null): Promise<boolean> {
        return this.updateQuery(updater, 'Organization', variables);
    }
    updateOrganizationMembers(variables: Types.OrganizationMembersVariables, updater: (data: Types.OrganizationMembers) => Types.OrganizationMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationMembers', variables);
    }
    updateOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, updater: (data: Types.OrganizationMembersSearch) => Types.OrganizationMembersSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationMembersSearch', variables);
    }
    updateOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, updater: (data: Types.OrganizationMembersShort) => Types.OrganizationMembersShort | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationMembersShort', variables);
    }
    updateOrganizationPico(variables: Types.OrganizationPicoVariables, updater: (data: Types.OrganizationPico) => Types.OrganizationPico | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationPico', variables);
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
    updatePermissions(updater: (data: Types.Permissions) => Types.Permissions | null): Promise<boolean> {
        return this.updateQuery(updater, 'Permissions', undefined);
    }
    updatePhonebookWasExported(updater: (data: Types.PhonebookWasExported) => Types.PhonebookWasExported | null): Promise<boolean> {
        return this.updateQuery(updater, 'PhonebookWasExported', undefined);
    }
    updatePicSharedMedia(variables: Types.PicSharedMediaVariables, updater: (data: Types.PicSharedMedia) => Types.PicSharedMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'PicSharedMedia', variables);
    }
    updatePost(variables: Types.PostVariables, updater: (data: Types.Post) => Types.Post | null): Promise<boolean> {
        return this.updateQuery(updater, 'Post', variables);
    }
    updatePostDraft(variables: Types.PostDraftVariables, updater: (data: Types.PostDraft) => Types.PostDraft | null): Promise<boolean> {
        return this.updateQuery(updater, 'PostDraft', variables);
    }
    updatePosts(variables: Types.PostsVariables, updater: (data: Types.Posts) => Types.Posts | null): Promise<boolean> {
        return this.updateQuery(updater, 'Posts', variables);
    }
    updateProfile(updater: (data: Types.Profile) => Types.Profile | null): Promise<boolean> {
        return this.updateQuery(updater, 'Profile', undefined);
    }
    updateProfilePrefill(updater: (data: Types.ProfilePrefill) => Types.ProfilePrefill | null): Promise<boolean> {
        return this.updateQuery(updater, 'ProfilePrefill', undefined);
    }
    updateResolveShortName(variables: Types.ResolveShortNameVariables, updater: (data: Types.ResolveShortName) => Types.ResolveShortName | null): Promise<boolean> {
        return this.updateQuery(updater, 'ResolveShortName', variables);
    }
    updateResolvedInvite(variables: Types.ResolvedInviteVariables, updater: (data: Types.ResolvedInvite) => Types.ResolvedInvite | null): Promise<boolean> {
        return this.updateQuery(updater, 'ResolvedInvite', variables);
    }
    updateRoomAdminMembers(variables: Types.RoomAdminMembersVariables, updater: (data: Types.RoomAdminMembers) => Types.RoomAdminMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomAdminMembers', variables);
    }
    updateRoomChat(variables: Types.RoomChatVariables, updater: (data: Types.RoomChat) => Types.RoomChat | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomChat', variables);
    }
    updateRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, updater: (data: Types.RoomFeaturedMembers) => Types.RoomFeaturedMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomFeaturedMembers', variables);
    }
    updateRoomInviteInfo(variables: Types.RoomInviteInfoVariables, updater: (data: Types.RoomInviteInfo) => Types.RoomInviteInfo | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomInviteInfo', variables);
    }
    updateRoomInviteLink(variables: Types.RoomInviteLinkVariables, updater: (data: Types.RoomInviteLink) => Types.RoomInviteLink | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomInviteLink', variables);
    }
    updateRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, updater: (data: Types.RoomMembersPaginated) => Types.RoomMembersPaginated | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembersPaginated', variables);
    }
    updateRoomMembersSearch(variables: Types.RoomMembersSearchVariables, updater: (data: Types.RoomMembersSearch) => Types.RoomMembersSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembersSearch', variables);
    }
    updateRoomMembersShort(variables: Types.RoomMembersShortVariables, updater: (data: Types.RoomMembersShort) => Types.RoomMembersShort | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembersShort', variables);
    }
    updateRoomMembersTiny(variables: Types.RoomMembersTinyVariables, updater: (data: Types.RoomMembersTiny) => Types.RoomMembersTiny | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembersTiny', variables);
    }
    updateRoomPico(variables: Types.RoomPicoVariables, updater: (data: Types.RoomPico) => Types.RoomPico | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomPico', variables);
    }
    updateRoomSearch(variables: Types.RoomSearchVariables, updater: (data: Types.RoomSearch) => Types.RoomSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomSearch', variables);
    }
    updateRoomSocialImage(variables: Types.RoomSocialImageVariables, updater: (data: Types.RoomSocialImage) => Types.RoomSocialImage | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomSocialImage', variables);
    }
    updateRoomSuper(variables: Types.RoomSuperVariables, updater: (data: Types.RoomSuper) => Types.RoomSuper | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomSuper', variables);
    }
    updateRoomTiny(variables: Types.RoomTinyVariables, updater: (data: Types.RoomTiny) => Types.RoomTiny | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomTiny', variables);
    }
    updateSettings(updater: (data: Types.Settings) => Types.Settings | null): Promise<boolean> {
        return this.updateQuery(updater, 'Settings', undefined);
    }
    updateSharedMedia(variables: Types.SharedMediaVariables, updater: (data: Types.SharedMedia) => Types.SharedMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'SharedMedia', variables);
    }
    updateSharedMediaCounters(variables: Types.SharedMediaCountersVariables, updater: (data: Types.SharedMediaCounters) => Types.SharedMediaCounters | null): Promise<boolean> {
        return this.updateQuery(updater, 'SharedMediaCounters', variables);
    }
    updateShouldAskForAppReview(updater: (data: Types.ShouldAskForAppReview) => Types.ShouldAskForAppReview | null): Promise<boolean> {
        return this.updateQuery(updater, 'ShouldAskForAppReview', undefined);
    }
    updateSocialUserFollowers(variables: Types.SocialUserFollowersVariables, updater: (data: Types.SocialUserFollowers) => Types.SocialUserFollowers | null): Promise<boolean> {
        return this.updateQuery(updater, 'SocialUserFollowers', variables);
    }
    updateSocialUserFollowing(variables: Types.SocialUserFollowingVariables, updater: (data: Types.SocialUserFollowing) => Types.SocialUserFollowing | null): Promise<boolean> {
        return this.updateQuery(updater, 'SocialUserFollowing', variables);
    }
    updateStickerPack(variables: Types.StickerPackVariables, updater: (data: Types.StickerPack) => Types.StickerPack | null): Promise<boolean> {
        return this.updateQuery(updater, 'StickerPack', variables);
    }
    updateStickerPackCatalog(updater: (data: Types.StickerPackCatalog) => Types.StickerPackCatalog | null): Promise<boolean> {
        return this.updateQuery(updater, 'StickerPackCatalog', undefined);
    }
    updateStripeToken(updater: (data: Types.StripeToken) => Types.StripeToken | null): Promise<boolean> {
        return this.updateQuery(updater, 'StripeToken', undefined);
    }
    updateSubscriptions(updater: (data: Types.Subscriptions) => Types.Subscriptions | null): Promise<boolean> {
        return this.updateQuery(updater, 'Subscriptions', undefined);
    }
    updateSuggestedRooms(updater: (data: Types.SuggestedRooms) => Types.SuggestedRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuggestedRooms', undefined);
    }
    updateSuperAccount(variables: Types.SuperAccountVariables, updater: (data: Types.SuperAccount) => Types.SuperAccount | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperAccount', variables);
    }
    updateSuperAccounts(updater: (data: Types.SuperAccounts) => Types.SuperAccounts | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperAccounts', undefined);
    }
    updateSuperAdmins(updater: (data: Types.SuperAdmins) => Types.SuperAdmins | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperAdmins', undefined);
    }
    updateSuperAllStickerPacks(updater: (data: Types.SuperAllStickerPacks) => Types.SuperAllStickerPacks | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperAllStickerPacks', undefined);
    }
    updateSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, updater: (data: Types.SuperBadgeInRoom) => Types.SuperBadgeInRoom | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperBadgeInRoom', variables);
    }
    updateSuperStickerPack(variables: Types.SuperStickerPackVariables, updater: (data: Types.SuperStickerPack) => Types.SuperStickerPack | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperStickerPack', variables);
    }
    updateSuperStickerPackCatalog(updater: (data: Types.SuperStickerPackCatalog) => Types.SuperStickerPackCatalog | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperStickerPackCatalog', undefined);
    }
    updateTransactionsHistory(variables: Types.TransactionsHistoryVariables, updater: (data: Types.TransactionsHistory) => Types.TransactionsHistory | null): Promise<boolean> {
        return this.updateQuery(updater, 'TransactionsHistory', variables);
    }
    updateUnviewedStickers(updater: (data: Types.UnviewedStickers) => Types.UnviewedStickers | null): Promise<boolean> {
        return this.updateQuery(updater, 'UnviewedStickers', undefined);
    }
    updateUpdateUsers(variables: Types.UpdateUsersVariables, updater: (data: Types.UpdateUsers) => Types.UpdateUsers | null): Promise<boolean> {
        return this.updateQuery(updater, 'UpdateUsers', variables);
    }
    updateUser(variables: Types.UserVariables, updater: (data: Types.User) => Types.User | null): Promise<boolean> {
        return this.updateQuery(updater, 'User', variables);
    }
    updateUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, updater: (data: Types.UserAvailableRooms) => Types.UserAvailableRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserAvailableRooms', variables);
    }
    updateUserFollowers(variables: Types.UserFollowersVariables, updater: (data: Types.UserFollowers) => Types.UserFollowers | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserFollowers', variables);
    }
    updateUserNano(variables: Types.UserNanoVariables, updater: (data: Types.UserNano) => Types.UserNano | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserNano', variables);
    }
    updateUserPico(variables: Types.UserPicoVariables, updater: (data: Types.UserPico) => Types.UserPico | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserPico', variables);
    }
    updateUserSearchForChat(variables: Types.UserSearchForChatVariables, updater: (data: Types.UserSearchForChat) => Types.UserSearchForChat | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserSearchForChat', variables);
    }
    updateUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, updater: (data: Types.UserSearchForOrganization) => Types.UserSearchForOrganization | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserSearchForOrganization', variables);
    }
    updateUserStorage(variables: Types.UserStorageVariables, updater: (data: Types.UserStorage) => Types.UserStorage | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserStorage', variables);
    }
    updateUsers(variables: Types.UsersVariables, updater: (data: Types.Users) => Types.Users | null): Promise<boolean> {
        return this.updateQuery(updater, 'Users', variables);
    }
    updateVoiceChat(variables: Types.VoiceChatVariables, updater: (data: Types.VoiceChat) => Types.VoiceChat | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChat', variables);
    }
    updateVoiceChatControls(variables: Types.VoiceChatControlsVariables, updater: (data: Types.VoiceChatControls) => Types.VoiceChatControls | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatControls', variables);
    }
    updateVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, updater: (data: Types.VoiceChatEventsState) => Types.VoiceChatEventsState | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatEventsState', variables);
    }
    updateVoiceChatFull(variables: Types.VoiceChatFullVariables, updater: (data: Types.VoiceChatFull) => Types.VoiceChatFull | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatFull', variables);
    }
    updateVoiceChatListeners(variables: Types.VoiceChatListenersVariables, updater: (data: Types.VoiceChatListeners) => Types.VoiceChatListeners | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatListeners', variables);
    }
    updateVoiceChatUser(variables: Types.VoiceChatUserVariables, updater: (data: Types.VoiceChatUser) => Types.VoiceChatUser | null): Promise<boolean> {
        return this.updateQuery(updater, 'VoiceChatUser', variables);
    }
    useAccount(params: SpaceQueryWatchParameters & { suspense: false }): Types.Account | null;
    useAccount(params?: SpaceQueryWatchParameters): Types.Account;
    useAccount(params?: SpaceQueryWatchParameters): Types.Account | null {
        return this.useQuery('Account', undefined, params);
    }
    useAccountAppInvite(params: SpaceQueryWatchParameters & { suspense: false }): Types.AccountAppInvite | null;
    useAccountAppInvite(params?: SpaceQueryWatchParameters): Types.AccountAppInvite;
    useAccountAppInvite(params?: SpaceQueryWatchParameters): Types.AccountAppInvite | null {
        return this.useQuery('AccountAppInvite', undefined, params);
    }
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.AccountAppInviteInfo | null;
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.AccountAppInviteInfo;
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.AccountAppInviteInfo | null {
        return this.useQuery('AccountAppInviteInfo', variables, params);
    }
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.AccountInviteInfo | null;
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.AccountInviteInfo;
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.AccountInviteInfo | null {
        return this.useQuery('AccountInviteInfo', variables, params);
    }
    useAccountSettings(params: SpaceQueryWatchParameters & { suspense: false }): Types.AccountSettings | null;
    useAccountSettings(params?: SpaceQueryWatchParameters): Types.AccountSettings;
    useAccountSettings(params?: SpaceQueryWatchParameters): Types.AccountSettings | null {
        return this.useQuery('AccountSettings', undefined, params);
    }
    useActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ActiveVoiceChats | null;
    useActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params?: SpaceQueryWatchParameters): Types.ActiveVoiceChats;
    useActiveVoiceChats(variables: Types.ActiveVoiceChatsVariables, params?: SpaceQueryWatchParameters): Types.ActiveVoiceChats | null {
        return this.useQuery('ActiveVoiceChats', variables, params);
    }
    useAuthPoints(params: SpaceQueryWatchParameters & { suspense: false }): Types.AuthPoints | null;
    useAuthPoints(params?: SpaceQueryWatchParameters): Types.AuthPoints;
    useAuthPoints(params?: SpaceQueryWatchParameters): Types.AuthPoints | null {
        return this.useQuery('AuthPoints', undefined, params);
    }
    useAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.AuthResolveShortName | null;
    useAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params?: SpaceQueryWatchParameters): Types.AuthResolveShortName;
    useAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, params?: SpaceQueryWatchParameters): Types.AuthResolveShortName | null {
        return this.useQuery('AuthResolveShortName', variables, params);
    }
    useBlackListUpdatesState(params: SpaceQueryWatchParameters & { suspense: false }): Types.BlackListUpdatesState | null;
    useBlackListUpdatesState(params?: SpaceQueryWatchParameters): Types.BlackListUpdatesState;
    useBlackListUpdatesState(params?: SpaceQueryWatchParameters): Types.BlackListUpdatesState | null {
        return this.useQuery('BlackListUpdatesState', undefined, params);
    }
    useChannel(variables: Types.ChannelVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Channel | null;
    useChannel(variables: Types.ChannelVariables, params?: SpaceQueryWatchParameters): Types.Channel;
    useChannel(variables: Types.ChannelVariables, params?: SpaceQueryWatchParameters): Types.Channel | null {
        return this.useQuery('Channel', variables, params);
    }
    useChannels(params: SpaceQueryWatchParameters & { suspense: false }): Types.Channels | null;
    useChannels(params?: SpaceQueryWatchParameters): Types.Channels;
    useChannels(params?: SpaceQueryWatchParameters): Types.Channels | null {
        return this.useQuery('Channels', undefined, params);
    }
    useChatInit(variables: Types.ChatInitVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatInit | null;
    useChatInit(variables: Types.ChatInitVariables, params?: SpaceQueryWatchParameters): Types.ChatInit;
    useChatInit(variables: Types.ChatInitVariables, params?: SpaceQueryWatchParameters): Types.ChatInit | null {
        return this.useQuery('ChatInit', variables, params);
    }
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatInitFromUnread | null;
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params?: SpaceQueryWatchParameters): Types.ChatInitFromUnread;
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, params?: SpaceQueryWatchParameters): Types.ChatInitFromUnread | null {
        return this.useQuery('ChatInitFromUnread', variables, params);
    }
    useChatJoin(variables: Types.ChatJoinVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatJoin | null;
    useChatJoin(variables: Types.ChatJoinVariables, params?: SpaceQueryWatchParameters): Types.ChatJoin;
    useChatJoin(variables: Types.ChatJoinVariables, params?: SpaceQueryWatchParameters): Types.ChatJoin | null {
        return this.useQuery('ChatJoin', variables, params);
    }
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatMentionSearch | null;
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, params?: SpaceQueryWatchParameters): Types.ChatMentionSearch;
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, params?: SpaceQueryWatchParameters): Types.ChatMentionSearch | null {
        return this.useQuery('ChatMentionSearch', variables, params);
    }
    useChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatNewGetMessage | null;
    useChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params?: SpaceQueryWatchParameters): Types.ChatNewGetMessage;
    useChatNewGetMessage(variables: Types.ChatNewGetMessageVariables, params?: SpaceQueryWatchParameters): Types.ChatNewGetMessage | null {
        return this.useQuery('ChatNewGetMessage', variables, params);
    }
    useChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatNewLoadAfter | null;
    useChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params?: SpaceQueryWatchParameters): Types.ChatNewLoadAfter;
    useChatNewLoadAfter(variables: Types.ChatNewLoadAfterVariables, params?: SpaceQueryWatchParameters): Types.ChatNewLoadAfter | null {
        return this.useQuery('ChatNewLoadAfter', variables, params);
    }
    useChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatNewLoadBefore | null;
    useChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params?: SpaceQueryWatchParameters): Types.ChatNewLoadBefore;
    useChatNewLoadBefore(variables: Types.ChatNewLoadBeforeVariables, params?: SpaceQueryWatchParameters): Types.ChatNewLoadBefore | null {
        return this.useQuery('ChatNewLoadBefore', variables, params);
    }
    useChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ChatNewReadLastRead | null;
    useChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params?: SpaceQueryWatchParameters): Types.ChatNewReadLastRead;
    useChatNewReadLastRead(variables: Types.ChatNewReadLastReadVariables, params?: SpaceQueryWatchParameters): Types.ChatNewReadLastRead | null {
        return this.useQuery('ChatNewReadLastRead', variables, params);
    }
    useCommentFullReactions(variables: Types.CommentFullReactionsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.CommentFullReactions | null;
    useCommentFullReactions(variables: Types.CommentFullReactionsVariables, params?: SpaceQueryWatchParameters): Types.CommentFullReactions;
    useCommentFullReactions(variables: Types.CommentFullReactionsVariables, params?: SpaceQueryWatchParameters): Types.CommentFullReactions | null {
        return this.useQuery('CommentFullReactions', variables, params);
    }
    useComments(variables: Types.CommentsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Comments | null;
    useComments(variables: Types.CommentsVariables, params?: SpaceQueryWatchParameters): Types.Comments;
    useComments(variables: Types.CommentsVariables, params?: SpaceQueryWatchParameters): Types.Comments | null {
        return this.useQuery('Comments', variables, params);
    }
    useCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.CommonChatsWithUser | null;
    useCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params?: SpaceQueryWatchParameters): Types.CommonChatsWithUser;
    useCommonChatsWithUser(variables: Types.CommonChatsWithUserVariables, params?: SpaceQueryWatchParameters): Types.CommonChatsWithUser | null {
        return this.useQuery('CommonChatsWithUser', variables, params);
    }
    useConference(variables: Types.ConferenceVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Conference | null;
    useConference(variables: Types.ConferenceVariables, params?: SpaceQueryWatchParameters): Types.Conference;
    useConference(variables: Types.ConferenceVariables, params?: SpaceQueryWatchParameters): Types.Conference | null {
        return this.useQuery('Conference', variables, params);
    }
    useConferenceMedia(variables: Types.ConferenceMediaVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ConferenceMedia | null;
    useConferenceMedia(variables: Types.ConferenceMediaVariables, params?: SpaceQueryWatchParameters): Types.ConferenceMedia;
    useConferenceMedia(variables: Types.ConferenceMediaVariables, params?: SpaceQueryWatchParameters): Types.ConferenceMedia | null {
        return this.useQuery('ConferenceMedia', variables, params);
    }
    useCreatedStickerPacks(params: SpaceQueryWatchParameters & { suspense: false }): Types.CreatedStickerPacks | null;
    useCreatedStickerPacks(params?: SpaceQueryWatchParameters): Types.CreatedStickerPacks;
    useCreatedStickerPacks(params?: SpaceQueryWatchParameters): Types.CreatedStickerPacks | null {
        return this.useQuery('CreatedStickerPacks', undefined, params);
    }
    useDebugGqlTrace(variables: Types.DebugGqlTraceVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DebugGqlTrace | null;
    useDebugGqlTrace(variables: Types.DebugGqlTraceVariables, params?: SpaceQueryWatchParameters): Types.DebugGqlTrace;
    useDebugGqlTrace(variables: Types.DebugGqlTraceVariables, params?: SpaceQueryWatchParameters): Types.DebugGqlTrace | null {
        return this.useQuery('DebugGqlTrace', variables, params);
    }
    useDebugGqlTraces(variables: Types.DebugGqlTracesVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DebugGqlTraces | null;
    useDebugGqlTraces(variables: Types.DebugGqlTracesVariables, params?: SpaceQueryWatchParameters): Types.DebugGqlTraces;
    useDebugGqlTraces(variables: Types.DebugGqlTracesVariables, params?: SpaceQueryWatchParameters): Types.DebugGqlTraces | null {
        return this.useQuery('DebugGqlTraces', variables, params);
    }
    useDialogs(variables: Types.DialogsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Dialogs | null;
    useDialogs(variables: Types.DialogsVariables, params?: SpaceQueryWatchParameters): Types.Dialogs;
    useDialogs(variables: Types.DialogsVariables, params?: SpaceQueryWatchParameters): Types.Dialogs | null {
        return this.useQuery('Dialogs', variables, params);
    }
    useDiscoverCollection(variables: Types.DiscoverCollectionVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollection | null;
    useDiscoverCollection(variables: Types.DiscoverCollectionVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollection;
    useDiscoverCollection(variables: Types.DiscoverCollectionVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollection | null {
        return this.useQuery('DiscoverCollection', variables, params);
    }
    useDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollectionShort | null;
    useDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollectionShort;
    useDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollectionShort | null {
        return this.useQuery('DiscoverCollectionShort', variables, params);
    }
    useDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollections | null;
    useDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollections;
    useDiscoverCollections(variables: Types.DiscoverCollectionsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollections | null {
        return this.useQuery('DiscoverCollections', variables, params);
    }
    useDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollectionsShort | null;
    useDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollectionsShort;
    useDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, params?: SpaceQueryWatchParameters): Types.DiscoverCollectionsShort | null {
        return this.useQuery('DiscoverCollectionsShort', variables, params);
    }
    useDiscoverEditorsChoice(params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverEditorsChoice | null;
    useDiscoverEditorsChoice(params?: SpaceQueryWatchParameters): Types.DiscoverEditorsChoice;
    useDiscoverEditorsChoice(params?: SpaceQueryWatchParameters): Types.DiscoverEditorsChoice | null {
        return this.useQuery('DiscoverEditorsChoice', undefined, params);
    }
    useDiscoverIsDone(params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverIsDone | null;
    useDiscoverIsDone(params?: SpaceQueryWatchParameters): Types.DiscoverIsDone;
    useDiscoverIsDone(params?: SpaceQueryWatchParameters): Types.DiscoverIsDone | null {
        return this.useQuery('DiscoverIsDone', undefined, params);
    }
    useDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNewAndGrowing | null;
    useDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNewAndGrowing;
    useDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNewAndGrowing | null {
        return this.useQuery('DiscoverNewAndGrowing', variables, params);
    }
    useDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNewOrganizations | null;
    useDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNewOrganizations;
    useDiscoverNewOrganizations(variables: Types.DiscoverNewOrganizationsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNewOrganizations | null {
        return this.useQuery('DiscoverNewOrganizations', variables, params);
    }
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNextPage | null;
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNextPage;
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNextPage | null {
        return this.useQuery('DiscoverNextPage', variables, params);
    }
    useDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNoAuth | null;
    useDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNoAuth;
    useDiscoverNoAuth(variables: Types.DiscoverNoAuthVariables, params?: SpaceQueryWatchParameters): Types.DiscoverNoAuth | null {
        return this.useQuery('DiscoverNoAuth', variables, params);
    }
    useDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverPopularNow | null;
    useDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params?: SpaceQueryWatchParameters): Types.DiscoverPopularNow;
    useDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, params?: SpaceQueryWatchParameters): Types.DiscoverPopularNow | null {
        return this.useQuery('DiscoverPopularNow', variables, params);
    }
    useDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverPopularOrganizations | null;
    useDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverPopularOrganizations;
    useDiscoverPopularOrganizations(variables: Types.DiscoverPopularOrganizationsVariables, params?: SpaceQueryWatchParameters): Types.DiscoverPopularOrganizations | null {
        return this.useQuery('DiscoverPopularOrganizations', variables, params);
    }
    useDiscoverState(params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverState | null;
    useDiscoverState(params?: SpaceQueryWatchParameters): Types.DiscoverState;
    useDiscoverState(params?: SpaceQueryWatchParameters): Types.DiscoverState | null {
        return this.useQuery('DiscoverState', undefined, params);
    }
    useDiscoverSuggestedRooms(params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverSuggestedRooms | null;
    useDiscoverSuggestedRooms(params?: SpaceQueryWatchParameters): Types.DiscoverSuggestedRooms;
    useDiscoverSuggestedRooms(params?: SpaceQueryWatchParameters): Types.DiscoverSuggestedRooms | null {
        return this.useQuery('DiscoverSuggestedRooms', undefined, params);
    }
    useDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverTopFree | null;
    useDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params?: SpaceQueryWatchParameters): Types.DiscoverTopFree;
    useDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, params?: SpaceQueryWatchParameters): Types.DiscoverTopFree | null {
        return this.useQuery('DiscoverTopFree', variables, params);
    }
    useDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverTopPremium | null;
    useDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params?: SpaceQueryWatchParameters): Types.DiscoverTopPremium;
    useDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, params?: SpaceQueryWatchParameters): Types.DiscoverTopPremium | null {
        return this.useQuery('DiscoverTopPremium', variables, params);
    }
    useExplorePeople(variables: Types.ExplorePeopleVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ExplorePeople | null;
    useExplorePeople(variables: Types.ExplorePeopleVariables, params?: SpaceQueryWatchParameters): Types.ExplorePeople;
    useExplorePeople(variables: Types.ExplorePeopleVariables, params?: SpaceQueryWatchParameters): Types.ExplorePeople | null {
        return this.useQuery('ExplorePeople', variables, params);
    }
    useExploreRooms(variables: Types.ExploreRoomsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ExploreRooms | null;
    useExploreRooms(variables: Types.ExploreRoomsVariables, params?: SpaceQueryWatchParameters): Types.ExploreRooms;
    useExploreRooms(variables: Types.ExploreRoomsVariables, params?: SpaceQueryWatchParameters): Types.ExploreRooms | null {
        return this.useQuery('ExploreRooms', variables, params);
    }
    useFetchPushSettings(params: SpaceQueryWatchParameters & { suspense: false }): Types.FetchPushSettings | null;
    useFetchPushSettings(params?: SpaceQueryWatchParameters): Types.FetchPushSettings;
    useFetchPushSettings(params?: SpaceQueryWatchParameters): Types.FetchPushSettings | null {
        return this.useQuery('FetchPushSettings', undefined, params);
    }
    useGetDifference(variables: Types.GetDifferenceVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GetDifference | null;
    useGetDifference(variables: Types.GetDifferenceVariables, params?: SpaceQueryWatchParameters): Types.GetDifference;
    useGetDifference(variables: Types.GetDifferenceVariables, params?: SpaceQueryWatchParameters): Types.GetDifference | null {
        return this.useQuery('GetDifference', variables, params);
    }
    useGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GetInitialDialogs | null;
    useGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params?: SpaceQueryWatchParameters): Types.GetInitialDialogs;
    useGetInitialDialogs(variables: Types.GetInitialDialogsVariables, params?: SpaceQueryWatchParameters): Types.GetInitialDialogs | null {
        return this.useQuery('GetInitialDialogs', variables, params);
    }
    useGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GetSequenceDifference | null;
    useGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params?: SpaceQueryWatchParameters): Types.GetSequenceDifference;
    useGetSequenceDifference(variables: Types.GetSequenceDifferenceVariables, params?: SpaceQueryWatchParameters): Types.GetSequenceDifference | null {
        return this.useQuery('GetSequenceDifference', variables, params);
    }
    useGetSequenceState(variables: Types.GetSequenceStateVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GetSequenceState | null;
    useGetSequenceState(variables: Types.GetSequenceStateVariables, params?: SpaceQueryWatchParameters): Types.GetSequenceState;
    useGetSequenceState(variables: Types.GetSequenceStateVariables, params?: SpaceQueryWatchParameters): Types.GetSequenceState | null {
        return this.useQuery('GetSequenceState', variables, params);
    }
    useGetState(params: SpaceQueryWatchParameters & { suspense: false }): Types.GetState | null;
    useGetState(params?: SpaceQueryWatchParameters): Types.GetState;
    useGetState(params?: SpaceQueryWatchParameters): Types.GetState | null {
        return this.useQuery('GetState', undefined, params);
    }
    useGlobalCounter(params: SpaceQueryWatchParameters & { suspense: false }): Types.GlobalCounter | null;
    useGlobalCounter(params?: SpaceQueryWatchParameters): Types.GlobalCounter;
    useGlobalCounter(params?: SpaceQueryWatchParameters): Types.GlobalCounter | null {
        return this.useQuery('GlobalCounter', undefined, params);
    }
    useGlobalSearch(variables: Types.GlobalSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.GlobalSearch | null;
    useGlobalSearch(variables: Types.GlobalSearchVariables, params?: SpaceQueryWatchParameters): Types.GlobalSearch;
    useGlobalSearch(variables: Types.GlobalSearchVariables, params?: SpaceQueryWatchParameters): Types.GlobalSearch | null {
        return this.useQuery('GlobalSearch', variables, params);
    }
    useIpLocation(params: SpaceQueryWatchParameters & { suspense: false }): Types.IpLocation | null;
    useIpLocation(params?: SpaceQueryWatchParameters): Types.IpLocation;
    useIpLocation(params?: SpaceQueryWatchParameters): Types.IpLocation | null {
        return this.useQuery('IpLocation', undefined, params);
    }
    useMessage(variables: Types.MessageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Message | null;
    useMessage(variables: Types.MessageVariables, params?: SpaceQueryWatchParameters): Types.Message;
    useMessage(variables: Types.MessageVariables, params?: SpaceQueryWatchParameters): Types.Message | null {
        return this.useQuery('Message', variables, params);
    }
    useMessageFullReactions(variables: Types.MessageFullReactionsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessageFullReactions | null;
    useMessageFullReactions(variables: Types.MessageFullReactionsVariables, params?: SpaceQueryWatchParameters): Types.MessageFullReactions;
    useMessageFullReactions(variables: Types.MessageFullReactionsVariables, params?: SpaceQueryWatchParameters): Types.MessageFullReactions | null {
        return this.useQuery('MessageFullReactions', variables, params);
    }
    useMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessageMultiSpan | null;
    useMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params?: SpaceQueryWatchParameters): Types.MessageMultiSpan;
    useMessageMultiSpan(variables: Types.MessageMultiSpanVariables, params?: SpaceQueryWatchParameters): Types.MessageMultiSpan | null {
        return this.useQuery('MessageMultiSpan', variables, params);
    }
    useMessagesBatch(variables: Types.MessagesBatchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesBatch | null;
    useMessagesBatch(variables: Types.MessagesBatchVariables, params?: SpaceQueryWatchParameters): Types.MessagesBatch;
    useMessagesBatch(variables: Types.MessagesBatchVariables, params?: SpaceQueryWatchParameters): Types.MessagesBatch | null {
        return this.useQuery('MessagesBatch', variables, params);
    }
    useMessagesSearch(variables: Types.MessagesSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesSearch | null;
    useMessagesSearch(variables: Types.MessagesSearchVariables, params?: SpaceQueryWatchParameters): Types.MessagesSearch;
    useMessagesSearch(variables: Types.MessagesSearchVariables, params?: SpaceQueryWatchParameters): Types.MessagesSearch | null {
        return this.useQuery('MessagesSearch', variables, params);
    }
    useMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesSearchFull | null;
    useMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params?: SpaceQueryWatchParameters): Types.MessagesSearchFull;
    useMessagesSearchFull(variables: Types.MessagesSearchFullVariables, params?: SpaceQueryWatchParameters): Types.MessagesSearchFull | null {
        return this.useQuery('MessagesSearchFull', variables, params);
    }
    useMyApps(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyApps | null;
    useMyApps(params?: SpaceQueryWatchParameters): Types.MyApps;
    useMyApps(params?: SpaceQueryWatchParameters): Types.MyApps | null {
        return this.useQuery('MyApps', undefined, params);
    }
    useMyBlackList(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyBlackList | null;
    useMyBlackList(params?: SpaceQueryWatchParameters): Types.MyBlackList;
    useMyBlackList(params?: SpaceQueryWatchParameters): Types.MyBlackList | null {
        return this.useQuery('MyBlackList', undefined, params);
    }
    useMyCards(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyCards | null;
    useMyCards(params?: SpaceQueryWatchParameters): Types.MyCards;
    useMyCards(params?: SpaceQueryWatchParameters): Types.MyCards | null {
        return this.useQuery('MyCards', undefined, params);
    }
    useMyCommunities(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyCommunities | null;
    useMyCommunities(params?: SpaceQueryWatchParameters): Types.MyCommunities;
    useMyCommunities(params?: SpaceQueryWatchParameters): Types.MyCommunities | null {
        return this.useQuery('MyCommunities', undefined, params);
    }
    useMyContacts(variables: Types.MyContactsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MyContacts | null;
    useMyContacts(variables: Types.MyContactsVariables, params?: SpaceQueryWatchParameters): Types.MyContacts;
    useMyContacts(variables: Types.MyContactsVariables, params?: SpaceQueryWatchParameters): Types.MyContacts | null {
        return this.useQuery('MyContacts', variables, params);
    }
    useMyContactsSearch(variables: Types.MyContactsSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MyContactsSearch | null;
    useMyContactsSearch(variables: Types.MyContactsSearchVariables, params?: SpaceQueryWatchParameters): Types.MyContactsSearch;
    useMyContactsSearch(variables: Types.MyContactsSearchVariables, params?: SpaceQueryWatchParameters): Types.MyContactsSearch | null {
        return this.useQuery('MyContactsSearch', variables, params);
    }
    useMyContactsState(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyContactsState | null;
    useMyContactsState(params?: SpaceQueryWatchParameters): Types.MyContactsState;
    useMyContactsState(params?: SpaceQueryWatchParameters): Types.MyContactsState | null {
        return this.useQuery('MyContactsState', undefined, params);
    }
    useMyNotificationCenter(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyNotificationCenter | null;
    useMyNotificationCenter(params?: SpaceQueryWatchParameters): Types.MyNotificationCenter;
    useMyNotificationCenter(params?: SpaceQueryWatchParameters): Types.MyNotificationCenter | null {
        return this.useQuery('MyNotificationCenter', undefined, params);
    }
    useMyNotifications(variables: Types.MyNotificationsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MyNotifications | null;
    useMyNotifications(variables: Types.MyNotificationsVariables, params?: SpaceQueryWatchParameters): Types.MyNotifications;
    useMyNotifications(variables: Types.MyNotificationsVariables, params?: SpaceQueryWatchParameters): Types.MyNotifications | null {
        return this.useQuery('MyNotifications', variables, params);
    }
    useMyOrganizations(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyOrganizations | null;
    useMyOrganizations(params?: SpaceQueryWatchParameters): Types.MyOrganizations;
    useMyOrganizations(params?: SpaceQueryWatchParameters): Types.MyOrganizations | null {
        return this.useQuery('MyOrganizations', undefined, params);
    }
    useMyPostDrafts(variables: Types.MyPostDraftsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.MyPostDrafts | null;
    useMyPostDrafts(variables: Types.MyPostDraftsVariables, params?: SpaceQueryWatchParameters): Types.MyPostDrafts;
    useMyPostDrafts(variables: Types.MyPostDraftsVariables, params?: SpaceQueryWatchParameters): Types.MyPostDrafts | null {
        return this.useQuery('MyPostDrafts', variables, params);
    }
    useMyStickers(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyStickers | null;
    useMyStickers(params?: SpaceQueryWatchParameters): Types.MyStickers;
    useMyStickers(params?: SpaceQueryWatchParameters): Types.MyStickers | null {
        return this.useQuery('MyStickers', undefined, params);
    }
    useMySuccessfulInvitesCount(params: SpaceQueryWatchParameters & { suspense: false }): Types.MySuccessfulInvitesCount | null;
    useMySuccessfulInvitesCount(params?: SpaceQueryWatchParameters): Types.MySuccessfulInvitesCount;
    useMySuccessfulInvitesCount(params?: SpaceQueryWatchParameters): Types.MySuccessfulInvitesCount | null {
        return this.useQuery('MySuccessfulInvitesCount', undefined, params);
    }
    useMyWallet(params: SpaceQueryWatchParameters & { suspense: false }): Types.MyWallet | null;
    useMyWallet(params?: SpaceQueryWatchParameters): Types.MyWallet;
    useMyWallet(params?: SpaceQueryWatchParameters): Types.MyWallet | null {
        return this.useQuery('MyWallet', undefined, params);
    }
    useOauthContext(variables: Types.OauthContextVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OauthContext | null;
    useOauthContext(variables: Types.OauthContextVariables, params?: SpaceQueryWatchParameters): Types.OauthContext;
    useOauthContext(variables: Types.OauthContextVariables, params?: SpaceQueryWatchParameters): Types.OauthContext | null {
        return this.useQuery('OauthContext', variables, params);
    }
    useOnline(variables: Types.OnlineVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Online | null;
    useOnline(variables: Types.OnlineVariables, params?: SpaceQueryWatchParameters): Types.Online;
    useOnline(variables: Types.OnlineVariables, params?: SpaceQueryWatchParameters): Types.Online | null {
        return this.useQuery('Online', variables, params);
    }
    useOrganization(variables: Types.OrganizationVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Organization | null;
    useOrganization(variables: Types.OrganizationVariables, params?: SpaceQueryWatchParameters): Types.Organization;
    useOrganization(variables: Types.OrganizationVariables, params?: SpaceQueryWatchParameters): Types.Organization | null {
        return this.useQuery('Organization', variables, params);
    }
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationMembers | null;
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembers;
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembers | null {
        return this.useQuery('OrganizationMembers', variables, params);
    }
    useOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationMembersSearch | null;
    useOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembersSearch;
    useOrganizationMembersSearch(variables: Types.OrganizationMembersSearchVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembersSearch | null {
        return this.useQuery('OrganizationMembersSearch', variables, params);
    }
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationMembersShort | null;
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembersShort;
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, params?: SpaceQueryWatchParameters): Types.OrganizationMembersShort | null {
        return this.useQuery('OrganizationMembersShort', variables, params);
    }
    useOrganizationPico(variables: Types.OrganizationPicoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPico | null;
    useOrganizationPico(variables: Types.OrganizationPicoVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPico;
    useOrganizationPico(variables: Types.OrganizationPicoVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPico | null {
        return this.useQuery('OrganizationPico', variables, params);
    }
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationProfile | null;
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, params?: SpaceQueryWatchParameters): Types.OrganizationProfile;
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, params?: SpaceQueryWatchParameters): Types.OrganizationProfile | null {
        return this.useQuery('OrganizationProfile', variables, params);
    }
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPublicInvite | null;
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPublicInvite;
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPublicInvite | null {
        return this.useQuery('OrganizationPublicInvite', variables, params);
    }
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPublicRooms | null;
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPublicRooms;
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, params?: SpaceQueryWatchParameters): Types.OrganizationPublicRooms | null {
        return this.useQuery('OrganizationPublicRooms', variables, params);
    }
    usePermissions(params: SpaceQueryWatchParameters & { suspense: false }): Types.Permissions | null;
    usePermissions(params?: SpaceQueryWatchParameters): Types.Permissions;
    usePermissions(params?: SpaceQueryWatchParameters): Types.Permissions | null {
        return this.useQuery('Permissions', undefined, params);
    }
    usePhonebookWasExported(params: SpaceQueryWatchParameters & { suspense: false }): Types.PhonebookWasExported | null;
    usePhonebookWasExported(params?: SpaceQueryWatchParameters): Types.PhonebookWasExported;
    usePhonebookWasExported(params?: SpaceQueryWatchParameters): Types.PhonebookWasExported | null {
        return this.useQuery('PhonebookWasExported', undefined, params);
    }
    usePicSharedMedia(variables: Types.PicSharedMediaVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.PicSharedMedia | null;
    usePicSharedMedia(variables: Types.PicSharedMediaVariables, params?: SpaceQueryWatchParameters): Types.PicSharedMedia;
    usePicSharedMedia(variables: Types.PicSharedMediaVariables, params?: SpaceQueryWatchParameters): Types.PicSharedMedia | null {
        return this.useQuery('PicSharedMedia', variables, params);
    }
    usePost(variables: Types.PostVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Post | null;
    usePost(variables: Types.PostVariables, params?: SpaceQueryWatchParameters): Types.Post;
    usePost(variables: Types.PostVariables, params?: SpaceQueryWatchParameters): Types.Post | null {
        return this.useQuery('Post', variables, params);
    }
    usePostDraft(variables: Types.PostDraftVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.PostDraft | null;
    usePostDraft(variables: Types.PostDraftVariables, params?: SpaceQueryWatchParameters): Types.PostDraft;
    usePostDraft(variables: Types.PostDraftVariables, params?: SpaceQueryWatchParameters): Types.PostDraft | null {
        return this.useQuery('PostDraft', variables, params);
    }
    usePosts(variables: Types.PostsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Posts | null;
    usePosts(variables: Types.PostsVariables, params?: SpaceQueryWatchParameters): Types.Posts;
    usePosts(variables: Types.PostsVariables, params?: SpaceQueryWatchParameters): Types.Posts | null {
        return this.useQuery('Posts', variables, params);
    }
    useProfile(params: SpaceQueryWatchParameters & { suspense: false }): Types.Profile | null;
    useProfile(params?: SpaceQueryWatchParameters): Types.Profile;
    useProfile(params?: SpaceQueryWatchParameters): Types.Profile | null {
        return this.useQuery('Profile', undefined, params);
    }
    useProfilePrefill(params: SpaceQueryWatchParameters & { suspense: false }): Types.ProfilePrefill | null;
    useProfilePrefill(params?: SpaceQueryWatchParameters): Types.ProfilePrefill;
    useProfilePrefill(params?: SpaceQueryWatchParameters): Types.ProfilePrefill | null {
        return this.useQuery('ProfilePrefill', undefined, params);
    }
    useResolveShortName(variables: Types.ResolveShortNameVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ResolveShortName | null;
    useResolveShortName(variables: Types.ResolveShortNameVariables, params?: SpaceQueryWatchParameters): Types.ResolveShortName;
    useResolveShortName(variables: Types.ResolveShortNameVariables, params?: SpaceQueryWatchParameters): Types.ResolveShortName | null {
        return this.useQuery('ResolveShortName', variables, params);
    }
    useResolvedInvite(variables: Types.ResolvedInviteVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.ResolvedInvite | null;
    useResolvedInvite(variables: Types.ResolvedInviteVariables, params?: SpaceQueryWatchParameters): Types.ResolvedInvite;
    useResolvedInvite(variables: Types.ResolvedInviteVariables, params?: SpaceQueryWatchParameters): Types.ResolvedInvite | null {
        return this.useQuery('ResolvedInvite', variables, params);
    }
    useRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomAdminMembers | null;
    useRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params?: SpaceQueryWatchParameters): Types.RoomAdminMembers;
    useRoomAdminMembers(variables: Types.RoomAdminMembersVariables, params?: SpaceQueryWatchParameters): Types.RoomAdminMembers | null {
        return this.useQuery('RoomAdminMembers', variables, params);
    }
    useRoomChat(variables: Types.RoomChatVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomChat | null;
    useRoomChat(variables: Types.RoomChatVariables, params?: SpaceQueryWatchParameters): Types.RoomChat;
    useRoomChat(variables: Types.RoomChatVariables, params?: SpaceQueryWatchParameters): Types.RoomChat | null {
        return this.useQuery('RoomChat', variables, params);
    }
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomFeaturedMembers | null;
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, params?: SpaceQueryWatchParameters): Types.RoomFeaturedMembers;
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, params?: SpaceQueryWatchParameters): Types.RoomFeaturedMembers | null {
        return this.useQuery('RoomFeaturedMembers', variables, params);
    }
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomInviteInfo | null;
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.RoomInviteInfo;
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, params?: SpaceQueryWatchParameters): Types.RoomInviteInfo | null {
        return this.useQuery('RoomInviteInfo', variables, params);
    }
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomInviteLink | null;
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, params?: SpaceQueryWatchParameters): Types.RoomInviteLink;
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, params?: SpaceQueryWatchParameters): Types.RoomInviteLink | null {
        return this.useQuery('RoomInviteLink', variables, params);
    }
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersPaginated | null;
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersPaginated;
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersPaginated | null {
        return this.useQuery('RoomMembersPaginated', variables, params);
    }
    useRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersSearch | null;
    useRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersSearch;
    useRoomMembersSearch(variables: Types.RoomMembersSearchVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersSearch | null {
        return this.useQuery('RoomMembersSearch', variables, params);
    }
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersShort | null;
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersShort;
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersShort | null {
        return this.useQuery('RoomMembersShort', variables, params);
    }
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersTiny | null;
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersTiny;
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, params?: SpaceQueryWatchParameters): Types.RoomMembersTiny | null {
        return this.useQuery('RoomMembersTiny', variables, params);
    }
    useRoomPico(variables: Types.RoomPicoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomPico | null;
    useRoomPico(variables: Types.RoomPicoVariables, params?: SpaceQueryWatchParameters): Types.RoomPico;
    useRoomPico(variables: Types.RoomPicoVariables, params?: SpaceQueryWatchParameters): Types.RoomPico | null {
        return this.useQuery('RoomPico', variables, params);
    }
    useRoomSearch(variables: Types.RoomSearchVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSearch | null;
    useRoomSearch(variables: Types.RoomSearchVariables, params?: SpaceQueryWatchParameters): Types.RoomSearch;
    useRoomSearch(variables: Types.RoomSearchVariables, params?: SpaceQueryWatchParameters): Types.RoomSearch | null {
        return this.useQuery('RoomSearch', variables, params);
    }
    useRoomSocialImage(variables: Types.RoomSocialImageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSocialImage | null;
    useRoomSocialImage(variables: Types.RoomSocialImageVariables, params?: SpaceQueryWatchParameters): Types.RoomSocialImage;
    useRoomSocialImage(variables: Types.RoomSocialImageVariables, params?: SpaceQueryWatchParameters): Types.RoomSocialImage | null {
        return this.useQuery('RoomSocialImage', variables, params);
    }
    useRoomSuper(variables: Types.RoomSuperVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSuper | null;
    useRoomSuper(variables: Types.RoomSuperVariables, params?: SpaceQueryWatchParameters): Types.RoomSuper;
    useRoomSuper(variables: Types.RoomSuperVariables, params?: SpaceQueryWatchParameters): Types.RoomSuper | null {
        return this.useQuery('RoomSuper', variables, params);
    }
    useRoomTiny(variables: Types.RoomTinyVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.RoomTiny | null;
    useRoomTiny(variables: Types.RoomTinyVariables, params?: SpaceQueryWatchParameters): Types.RoomTiny;
    useRoomTiny(variables: Types.RoomTinyVariables, params?: SpaceQueryWatchParameters): Types.RoomTiny | null {
        return this.useQuery('RoomTiny', variables, params);
    }
    useSettings(params: SpaceQueryWatchParameters & { suspense: false }): Types.Settings | null;
    useSettings(params?: SpaceQueryWatchParameters): Types.Settings;
    useSettings(params?: SpaceQueryWatchParameters): Types.Settings | null {
        return this.useQuery('Settings', undefined, params);
    }
    useSharedMedia(variables: Types.SharedMediaVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SharedMedia | null;
    useSharedMedia(variables: Types.SharedMediaVariables, params?: SpaceQueryWatchParameters): Types.SharedMedia;
    useSharedMedia(variables: Types.SharedMediaVariables, params?: SpaceQueryWatchParameters): Types.SharedMedia | null {
        return this.useQuery('SharedMedia', variables, params);
    }
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SharedMediaCounters | null;
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, params?: SpaceQueryWatchParameters): Types.SharedMediaCounters;
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, params?: SpaceQueryWatchParameters): Types.SharedMediaCounters | null {
        return this.useQuery('SharedMediaCounters', variables, params);
    }
    useShouldAskForAppReview(params: SpaceQueryWatchParameters & { suspense: false }): Types.ShouldAskForAppReview | null;
    useShouldAskForAppReview(params?: SpaceQueryWatchParameters): Types.ShouldAskForAppReview;
    useShouldAskForAppReview(params?: SpaceQueryWatchParameters): Types.ShouldAskForAppReview | null {
        return this.useQuery('ShouldAskForAppReview', undefined, params);
    }
    useSocialUserFollowers(variables: Types.SocialUserFollowersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SocialUserFollowers | null;
    useSocialUserFollowers(variables: Types.SocialUserFollowersVariables, params?: SpaceQueryWatchParameters): Types.SocialUserFollowers;
    useSocialUserFollowers(variables: Types.SocialUserFollowersVariables, params?: SpaceQueryWatchParameters): Types.SocialUserFollowers | null {
        return this.useQuery('SocialUserFollowers', variables, params);
    }
    useSocialUserFollowing(variables: Types.SocialUserFollowingVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SocialUserFollowing | null;
    useSocialUserFollowing(variables: Types.SocialUserFollowingVariables, params?: SpaceQueryWatchParameters): Types.SocialUserFollowing;
    useSocialUserFollowing(variables: Types.SocialUserFollowingVariables, params?: SpaceQueryWatchParameters): Types.SocialUserFollowing | null {
        return this.useQuery('SocialUserFollowing', variables, params);
    }
    useStickerPack(variables: Types.StickerPackVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.StickerPack | null;
    useStickerPack(variables: Types.StickerPackVariables, params?: SpaceQueryWatchParameters): Types.StickerPack;
    useStickerPack(variables: Types.StickerPackVariables, params?: SpaceQueryWatchParameters): Types.StickerPack | null {
        return this.useQuery('StickerPack', variables, params);
    }
    useStickerPackCatalog(params: SpaceQueryWatchParameters & { suspense: false }): Types.StickerPackCatalog | null;
    useStickerPackCatalog(params?: SpaceQueryWatchParameters): Types.StickerPackCatalog;
    useStickerPackCatalog(params?: SpaceQueryWatchParameters): Types.StickerPackCatalog | null {
        return this.useQuery('StickerPackCatalog', undefined, params);
    }
    useStripeToken(params: SpaceQueryWatchParameters & { suspense: false }): Types.StripeToken | null;
    useStripeToken(params?: SpaceQueryWatchParameters): Types.StripeToken;
    useStripeToken(params?: SpaceQueryWatchParameters): Types.StripeToken | null {
        return this.useQuery('StripeToken', undefined, params);
    }
    useSubscriptions(params: SpaceQueryWatchParameters & { suspense: false }): Types.Subscriptions | null;
    useSubscriptions(params?: SpaceQueryWatchParameters): Types.Subscriptions;
    useSubscriptions(params?: SpaceQueryWatchParameters): Types.Subscriptions | null {
        return this.useQuery('Subscriptions', undefined, params);
    }
    useSuggestedRooms(params: SpaceQueryWatchParameters & { suspense: false }): Types.SuggestedRooms | null;
    useSuggestedRooms(params?: SpaceQueryWatchParameters): Types.SuggestedRooms;
    useSuggestedRooms(params?: SpaceQueryWatchParameters): Types.SuggestedRooms | null {
        return this.useQuery('SuggestedRooms', undefined, params);
    }
    useSuperAccount(variables: Types.SuperAccountVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAccount | null;
    useSuperAccount(variables: Types.SuperAccountVariables, params?: SpaceQueryWatchParameters): Types.SuperAccount;
    useSuperAccount(variables: Types.SuperAccountVariables, params?: SpaceQueryWatchParameters): Types.SuperAccount | null {
        return this.useQuery('SuperAccount', variables, params);
    }
    useSuperAccounts(params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAccounts | null;
    useSuperAccounts(params?: SpaceQueryWatchParameters): Types.SuperAccounts;
    useSuperAccounts(params?: SpaceQueryWatchParameters): Types.SuperAccounts | null {
        return this.useQuery('SuperAccounts', undefined, params);
    }
    useSuperAdmins(params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAdmins | null;
    useSuperAdmins(params?: SpaceQueryWatchParameters): Types.SuperAdmins;
    useSuperAdmins(params?: SpaceQueryWatchParameters): Types.SuperAdmins | null {
        return this.useQuery('SuperAdmins', undefined, params);
    }
    useSuperAllStickerPacks(params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAllStickerPacks | null;
    useSuperAllStickerPacks(params?: SpaceQueryWatchParameters): Types.SuperAllStickerPacks;
    useSuperAllStickerPacks(params?: SpaceQueryWatchParameters): Types.SuperAllStickerPacks | null {
        return this.useQuery('SuperAllStickerPacks', undefined, params);
    }
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperBadgeInRoom | null;
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, params?: SpaceQueryWatchParameters): Types.SuperBadgeInRoom;
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, params?: SpaceQueryWatchParameters): Types.SuperBadgeInRoom | null {
        return this.useQuery('SuperBadgeInRoom', variables, params);
    }
    useSuperStickerPack(variables: Types.SuperStickerPackVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperStickerPack | null;
    useSuperStickerPack(variables: Types.SuperStickerPackVariables, params?: SpaceQueryWatchParameters): Types.SuperStickerPack;
    useSuperStickerPack(variables: Types.SuperStickerPackVariables, params?: SpaceQueryWatchParameters): Types.SuperStickerPack | null {
        return this.useQuery('SuperStickerPack', variables, params);
    }
    useSuperStickerPackCatalog(params: SpaceQueryWatchParameters & { suspense: false }): Types.SuperStickerPackCatalog | null;
    useSuperStickerPackCatalog(params?: SpaceQueryWatchParameters): Types.SuperStickerPackCatalog;
    useSuperStickerPackCatalog(params?: SpaceQueryWatchParameters): Types.SuperStickerPackCatalog | null {
        return this.useQuery('SuperStickerPackCatalog', undefined, params);
    }
    useTransactionsHistory(variables: Types.TransactionsHistoryVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.TransactionsHistory | null;
    useTransactionsHistory(variables: Types.TransactionsHistoryVariables, params?: SpaceQueryWatchParameters): Types.TransactionsHistory;
    useTransactionsHistory(variables: Types.TransactionsHistoryVariables, params?: SpaceQueryWatchParameters): Types.TransactionsHistory | null {
        return this.useQuery('TransactionsHistory', variables, params);
    }
    useUnviewedStickers(params: SpaceQueryWatchParameters & { suspense: false }): Types.UnviewedStickers | null;
    useUnviewedStickers(params?: SpaceQueryWatchParameters): Types.UnviewedStickers;
    useUnviewedStickers(params?: SpaceQueryWatchParameters): Types.UnviewedStickers | null {
        return this.useQuery('UnviewedStickers', undefined, params);
    }
    useUpdateUsers(variables: Types.UpdateUsersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UpdateUsers | null;
    useUpdateUsers(variables: Types.UpdateUsersVariables, params?: SpaceQueryWatchParameters): Types.UpdateUsers;
    useUpdateUsers(variables: Types.UpdateUsersVariables, params?: SpaceQueryWatchParameters): Types.UpdateUsers | null {
        return this.useQuery('UpdateUsers', variables, params);
    }
    useUser(variables: Types.UserVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.User | null;
    useUser(variables: Types.UserVariables, params?: SpaceQueryWatchParameters): Types.User;
    useUser(variables: Types.UserVariables, params?: SpaceQueryWatchParameters): Types.User | null {
        return this.useQuery('User', variables, params);
    }
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserAvailableRooms | null;
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params?: SpaceQueryWatchParameters): Types.UserAvailableRooms;
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, params?: SpaceQueryWatchParameters): Types.UserAvailableRooms | null {
        return this.useQuery('UserAvailableRooms', variables, params);
    }
    useUserFollowers(variables: Types.UserFollowersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserFollowers | null;
    useUserFollowers(variables: Types.UserFollowersVariables, params?: SpaceQueryWatchParameters): Types.UserFollowers;
    useUserFollowers(variables: Types.UserFollowersVariables, params?: SpaceQueryWatchParameters): Types.UserFollowers | null {
        return this.useQuery('UserFollowers', variables, params);
    }
    useUserNano(variables: Types.UserNanoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserNano | null;
    useUserNano(variables: Types.UserNanoVariables, params?: SpaceQueryWatchParameters): Types.UserNano;
    useUserNano(variables: Types.UserNanoVariables, params?: SpaceQueryWatchParameters): Types.UserNano | null {
        return this.useQuery('UserNano', variables, params);
    }
    useUserPico(variables: Types.UserPicoVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserPico | null;
    useUserPico(variables: Types.UserPicoVariables, params?: SpaceQueryWatchParameters): Types.UserPico;
    useUserPico(variables: Types.UserPicoVariables, params?: SpaceQueryWatchParameters): Types.UserPico | null {
        return this.useQuery('UserPico', variables, params);
    }
    useUserSearchForChat(variables: Types.UserSearchForChatVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserSearchForChat | null;
    useUserSearchForChat(variables: Types.UserSearchForChatVariables, params?: SpaceQueryWatchParameters): Types.UserSearchForChat;
    useUserSearchForChat(variables: Types.UserSearchForChatVariables, params?: SpaceQueryWatchParameters): Types.UserSearchForChat | null {
        return this.useQuery('UserSearchForChat', variables, params);
    }
    useUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserSearchForOrganization | null;
    useUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params?: SpaceQueryWatchParameters): Types.UserSearchForOrganization;
    useUserSearchForOrganization(variables: Types.UserSearchForOrganizationVariables, params?: SpaceQueryWatchParameters): Types.UserSearchForOrganization | null {
        return this.useQuery('UserSearchForOrganization', variables, params);
    }
    useUserStorage(variables: Types.UserStorageVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.UserStorage | null;
    useUserStorage(variables: Types.UserStorageVariables, params?: SpaceQueryWatchParameters): Types.UserStorage;
    useUserStorage(variables: Types.UserStorageVariables, params?: SpaceQueryWatchParameters): Types.UserStorage | null {
        return this.useQuery('UserStorage', variables, params);
    }
    useUsers(variables: Types.UsersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.Users | null;
    useUsers(variables: Types.UsersVariables, params?: SpaceQueryWatchParameters): Types.Users;
    useUsers(variables: Types.UsersVariables, params?: SpaceQueryWatchParameters): Types.Users | null {
        return this.useQuery('Users', variables, params);
    }
    useVoiceChat(variables: Types.VoiceChatVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChat | null;
    useVoiceChat(variables: Types.VoiceChatVariables, params?: SpaceQueryWatchParameters): Types.VoiceChat;
    useVoiceChat(variables: Types.VoiceChatVariables, params?: SpaceQueryWatchParameters): Types.VoiceChat | null {
        return this.useQuery('VoiceChat', variables, params);
    }
    useVoiceChatControls(variables: Types.VoiceChatControlsVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatControls | null;
    useVoiceChatControls(variables: Types.VoiceChatControlsVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatControls;
    useVoiceChatControls(variables: Types.VoiceChatControlsVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatControls | null {
        return this.useQuery('VoiceChatControls', variables, params);
    }
    useVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatEventsState | null;
    useVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatEventsState;
    useVoiceChatEventsState(variables: Types.VoiceChatEventsStateVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatEventsState | null {
        return this.useQuery('VoiceChatEventsState', variables, params);
    }
    useVoiceChatFull(variables: Types.VoiceChatFullVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatFull | null;
    useVoiceChatFull(variables: Types.VoiceChatFullVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatFull;
    useVoiceChatFull(variables: Types.VoiceChatFullVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatFull | null {
        return this.useQuery('VoiceChatFull', variables, params);
    }
    useVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatListeners | null;
    useVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatListeners;
    useVoiceChatListeners(variables: Types.VoiceChatListenersVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatListeners | null {
        return this.useQuery('VoiceChatListeners', variables, params);
    }
    useVoiceChatUser(variables: Types.VoiceChatUserVariables, params: SpaceQueryWatchParameters & { suspense: false }): Types.VoiceChatUser | null;
    useVoiceChatUser(variables: Types.VoiceChatUserVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatUser;
    useVoiceChatUser(variables: Types.VoiceChatUserVariables, params?: SpaceQueryWatchParameters): Types.VoiceChatUser | null {
        return this.useQuery('VoiceChatUser', variables, params);
    }
    mutateAccountInviteJoin(variables: Types.AccountInviteJoinVariables, params?: MutationParameters): Promise<Types.AccountInviteJoin> {
        return this.mutate('AccountInviteJoin', variables, params);
    }
    mutateAddAppToChat(variables: Types.AddAppToChatVariables, params?: MutationParameters): Promise<Types.AddAppToChat> {
        return this.mutate('AddAppToChat', variables, params);
    }
    mutateAddComment(variables: Types.AddCommentVariables, params?: MutationParameters): Promise<Types.AddComment> {
        return this.mutate('AddComment', variables, params);
    }
    mutateAddSticker(variables: Types.AddStickerVariables, params?: MutationParameters): Promise<Types.AddSticker> {
        return this.mutate('AddSticker', variables, params);
    }
    mutateAddStickerComment(variables: Types.AddStickerCommentVariables, params?: MutationParameters): Promise<Types.AddStickerComment> {
        return this.mutate('AddStickerComment', variables, params);
    }
    mutateAddToContacts(variables: Types.AddToContactsVariables, params?: MutationParameters): Promise<Types.AddToContacts> {
        return this.mutate('AddToContacts', variables, params);
    }
    mutateBanUser(variables: Types.BanUserVariables, params?: MutationParameters): Promise<Types.BanUser> {
        return this.mutate('BanUser', variables, params);
    }
    mutateBetaDiscoverSkip(variables: Types.BetaDiscoverSkipVariables, params?: MutationParameters): Promise<Types.BetaDiscoverSkip> {
        return this.mutate('BetaDiscoverSkip', variables, params);
    }
    mutateBetaNextDiscoverReset(params?: MutationParameters): Promise<Types.BetaNextDiscoverReset> {
        return this.mutate('BetaNextDiscoverReset', undefined, params);
    }
    mutateBetaSubmitNextDiscover(variables: Types.BetaSubmitNextDiscoverVariables, params?: MutationParameters): Promise<Types.BetaSubmitNextDiscover> {
        return this.mutate('BetaSubmitNextDiscover', variables, params);
    }
    mutateBuyPremiumChatPass(variables: Types.BuyPremiumChatPassVariables, params?: MutationParameters): Promise<Types.BuyPremiumChatPass> {
        return this.mutate('BuyPremiumChatPass', variables, params);
    }
    mutateBuyPremiumChatSubscription(variables: Types.BuyPremiumChatSubscriptionVariables, params?: MutationParameters): Promise<Types.BuyPremiumChatSubscription> {
        return this.mutate('BuyPremiumChatSubscription', variables, params);
    }
    mutateCancelSubscription(variables: Types.CancelSubscriptionVariables, params?: MutationParameters): Promise<Types.CancelSubscription> {
        return this.mutate('CancelSubscription', variables, params);
    }
    mutateChatDelete(variables: Types.ChatDeleteVariables, params?: MutationParameters): Promise<Types.ChatDelete> {
        return this.mutate('ChatDelete', variables, params);
    }
    mutateCommentDeleteUrlAugmentation(variables: Types.CommentDeleteUrlAugmentationVariables, params?: MutationParameters): Promise<Types.CommentDeleteUrlAugmentation> {
        return this.mutate('CommentDeleteUrlAugmentation', variables, params);
    }
    mutateCommentSetReaction(variables: Types.CommentSetReactionVariables, params?: MutationParameters): Promise<Types.CommentSetReaction> {
        return this.mutate('CommentSetReaction', variables, params);
    }
    mutateCommentUnsetReaction(variables: Types.CommentUnsetReactionVariables, params?: MutationParameters): Promise<Types.CommentUnsetReaction> {
        return this.mutate('CommentUnsetReaction', variables, params);
    }
    mutateCommitCardSetupIntent(variables: Types.CommitCardSetupIntentVariables, params?: MutationParameters): Promise<Types.CommitCardSetupIntent> {
        return this.mutate('CommitCardSetupIntent', variables, params);
    }
    mutateConferenceJoin(variables: Types.ConferenceJoinVariables, params?: MutationParameters): Promise<Types.ConferenceJoin> {
        return this.mutate('ConferenceJoin', variables, params);
    }
    mutateConferenceKeepAlive(variables: Types.ConferenceKeepAliveVariables, params?: MutationParameters): Promise<Types.ConferenceKeepAlive> {
        return this.mutate('ConferenceKeepAlive', variables, params);
    }
    mutateConferenceLeave(variables: Types.ConferenceLeaveVariables, params?: MutationParameters): Promise<Types.ConferenceLeave> {
        return this.mutate('ConferenceLeave', variables, params);
    }
    mutateCreateApp(variables: Types.CreateAppVariables, params?: MutationParameters): Promise<Types.CreateApp> {
        return this.mutate('CreateApp', variables, params);
    }
    mutateCreateCardSetupIntent(variables: Types.CreateCardSetupIntentVariables, params?: MutationParameters): Promise<Types.CreateCardSetupIntent> {
        return this.mutate('CreateCardSetupIntent', variables, params);
    }
    mutateCreateDepositIntent(variables: Types.CreateDepositIntentVariables, params?: MutationParameters): Promise<Types.CreateDepositIntent> {
        return this.mutate('CreateDepositIntent', variables, params);
    }
    mutateCreateOrganization(variables: Types.CreateOrganizationVariables, params?: MutationParameters): Promise<Types.CreateOrganization> {
        return this.mutate('CreateOrganization', variables, params);
    }
    mutateDebugMails(variables: Types.DebugMailsVariables, params?: MutationParameters): Promise<Types.DebugMails> {
        return this.mutate('DebugMails', variables, params);
    }
    mutateDeleteComment(variables: Types.DeleteCommentVariables, params?: MutationParameters): Promise<Types.DeleteComment> {
        return this.mutate('DeleteComment', variables, params);
    }
    mutateDeleteNotification(variables: Types.DeleteNotificationVariables, params?: MutationParameters): Promise<Types.DeleteNotification> {
        return this.mutate('DeleteNotification', variables, params);
    }
    mutateDeleteOrganization(variables: Types.DeleteOrganizationVariables, params?: MutationParameters): Promise<Types.DeleteOrganization> {
        return this.mutate('DeleteOrganization', variables, params);
    }
    mutateDeleteUser(variables: Types.DeleteUserVariables, params?: MutationParameters): Promise<Types.DeleteUser> {
        return this.mutate('DeleteUser', variables, params);
    }
    mutateDiscoverCollectionSetShortname(variables: Types.DiscoverCollectionSetShortnameVariables, params?: MutationParameters): Promise<Types.DiscoverCollectionSetShortname> {
        return this.mutate('DiscoverCollectionSetShortname', variables, params);
    }
    mutateDiscoverCollectionsCreate(variables: Types.DiscoverCollectionsCreateVariables, params?: MutationParameters): Promise<Types.DiscoverCollectionsCreate> {
        return this.mutate('DiscoverCollectionsCreate', variables, params);
    }
    mutateDiscoverCollectionsDelete(variables: Types.DiscoverCollectionsDeleteVariables, params?: MutationParameters): Promise<Types.DiscoverCollectionsDelete> {
        return this.mutate('DiscoverCollectionsDelete', variables, params);
    }
    mutateDiscoverCollectionsUpdate(variables: Types.DiscoverCollectionsUpdateVariables, params?: MutationParameters): Promise<Types.DiscoverCollectionsUpdate> {
        return this.mutate('DiscoverCollectionsUpdate', variables, params);
    }
    mutateDiscoverEditorsChoiceCreate(variables: Types.DiscoverEditorsChoiceCreateVariables, params?: MutationParameters): Promise<Types.DiscoverEditorsChoiceCreate> {
        return this.mutate('DiscoverEditorsChoiceCreate', variables, params);
    }
    mutateDiscoverEditorsChoiceDelete(variables: Types.DiscoverEditorsChoiceDeleteVariables, params?: MutationParameters): Promise<Types.DiscoverEditorsChoiceDelete> {
        return this.mutate('DiscoverEditorsChoiceDelete', variables, params);
    }
    mutateDiscoverEditorsChoiceUpdate(variables: Types.DiscoverEditorsChoiceUpdateVariables, params?: MutationParameters): Promise<Types.DiscoverEditorsChoiceUpdate> {
        return this.mutate('DiscoverEditorsChoiceUpdate', variables, params);
    }
    mutateEditComment(variables: Types.EditCommentVariables, params?: MutationParameters): Promise<Types.EditComment> {
        return this.mutate('EditComment', variables, params);
    }
    mutateEditMessage(variables: Types.EditMessageVariables, params?: MutationParameters): Promise<Types.EditMessage> {
        return this.mutate('EditMessage', variables, params);
    }
    mutateMakeCardDefault(variables: Types.MakeCardDefaultVariables, params?: MutationParameters): Promise<Types.MakeCardDefault> {
        return this.mutate('MakeCardDefault', variables, params);
    }
    mutateMarkStickersViewed(params?: MutationParameters): Promise<Types.MarkStickersViewed> {
        return this.mutate('MarkStickersViewed', undefined, params);
    }
    mutateMediaAnswer(variables: Types.MediaAnswerVariables, params?: MutationParameters): Promise<Types.MediaAnswer> {
        return this.mutate('MediaAnswer', variables, params);
    }
    mutateMediaCandidate(variables: Types.MediaCandidateVariables, params?: MutationParameters): Promise<Types.MediaCandidate> {
        return this.mutate('MediaCandidate', variables, params);
    }
    mutateMediaFailed(variables: Types.MediaFailedVariables, params?: MutationParameters): Promise<Types.MediaFailed> {
        return this.mutate('MediaFailed', variables, params);
    }
    mutateMediaOffer(variables: Types.MediaOfferVariables, params?: MutationParameters): Promise<Types.MediaOffer> {
        return this.mutate('MediaOffer', variables, params);
    }
    mutateMessageSetDonationReaction(variables: Types.MessageSetDonationReactionVariables, params?: MutationParameters): Promise<Types.MessageSetDonationReaction> {
        return this.mutate('MessageSetDonationReaction', variables, params);
    }
    mutateMessageSetReaction(variables: Types.MessageSetReactionVariables, params?: MutationParameters): Promise<Types.MessageSetReaction> {
        return this.mutate('MessageSetReaction', variables, params);
    }
    mutateMessageUnsetReaction(variables: Types.MessageUnsetReactionVariables, params?: MutationParameters): Promise<Types.MessageUnsetReaction> {
        return this.mutate('MessageUnsetReaction', variables, params);
    }
    mutateMyNotificationCenterMarkSeqRead(variables: Types.MyNotificationCenterMarkSeqReadVariables, params?: MutationParameters): Promise<Types.MyNotificationCenterMarkSeqRead> {
        return this.mutate('MyNotificationCenterMarkSeqRead', variables, params);
    }
    mutateOnLogout(params?: MutationParameters): Promise<Types.OnLogout> {
        return this.mutate('OnLogout', undefined, params);
    }
    mutateOrganizationActivateByInvite(variables: Types.OrganizationActivateByInviteVariables, params?: MutationParameters): Promise<Types.OrganizationActivateByInvite> {
        return this.mutate('OrganizationActivateByInvite', variables, params);
    }
    mutateOrganizationAddMember(variables: Types.OrganizationAddMemberVariables, params?: MutationParameters): Promise<Types.OrganizationAddMember> {
        return this.mutate('OrganizationAddMember', variables, params);
    }
    mutateOrganizationChangeMemberRole(variables: Types.OrganizationChangeMemberRoleVariables, params?: MutationParameters): Promise<Types.OrganizationChangeMemberRole> {
        return this.mutate('OrganizationChangeMemberRole', variables, params);
    }
    mutateOrganizationCreatePublicInvite(variables: Types.OrganizationCreatePublicInviteVariables, params?: MutationParameters): Promise<Types.OrganizationCreatePublicInvite> {
        return this.mutate('OrganizationCreatePublicInvite', variables, params);
    }
    mutateOrganizationMemberRemove(variables: Types.OrganizationMemberRemoveVariables, params?: MutationParameters): Promise<Types.OrganizationMemberRemove> {
        return this.mutate('OrganizationMemberRemove', variables, params);
    }
    mutateOrganizationRequestMembersExport(variables: Types.OrganizationRequestMembersExportVariables, params?: MutationParameters): Promise<Types.OrganizationRequestMembersExport> {
        return this.mutate('OrganizationRequestMembersExport', variables, params);
    }
    mutatePairEmail(variables: Types.PairEmailVariables, params?: MutationParameters): Promise<Types.PairEmail> {
        return this.mutate('PairEmail', variables, params);
    }
    mutatePairPhone(variables: Types.PairPhoneVariables, params?: MutationParameters): Promise<Types.PairPhone> {
        return this.mutate('PairPhone', variables, params);
    }
    mutatePaymentIntentCancel(variables: Types.PaymentIntentCancelVariables, params?: MutationParameters): Promise<Types.PaymentIntentCancel> {
        return this.mutate('PaymentIntentCancel', variables, params);
    }
    mutatePaymentIntentCommit(variables: Types.PaymentIntentCommitVariables, params?: MutationParameters): Promise<Types.PaymentIntentCommit> {
        return this.mutate('PaymentIntentCommit', variables, params);
    }
    mutatePersistEvents(variables: Types.PersistEventsVariables, params?: MutationParameters): Promise<Types.PersistEvents> {
        return this.mutate('PersistEvents', variables, params);
    }
    mutatePhonebookAdd(variables: Types.PhonebookAddVariables, params?: MutationParameters): Promise<Types.PhonebookAdd> {
        return this.mutate('PhonebookAdd', variables, params);
    }
    mutatePinMessage(variables: Types.PinMessageVariables, params?: MutationParameters): Promise<Types.PinMessage> {
        return this.mutate('PinMessage', variables, params);
    }
    mutatePostCreateDraft(params?: MutationParameters): Promise<Types.PostCreateDraft> {
        return this.mutate('PostCreateDraft', undefined, params);
    }
    mutatePostDraftUpdate(variables: Types.PostDraftUpdateVariables, params?: MutationParameters): Promise<Types.PostDraftUpdate> {
        return this.mutate('PostDraftUpdate', variables, params);
    }
    mutatePostPublish(variables: Types.PostPublishVariables, params?: MutationParameters): Promise<Types.PostPublish> {
        return this.mutate('PostPublish', variables, params);
    }
    mutateProfileCreate(variables: Types.ProfileCreateVariables, params?: MutationParameters): Promise<Types.ProfileCreate> {
        return this.mutate('ProfileCreate', variables, params);
    }
    mutateProfileUpdate(variables: Types.ProfileUpdateVariables, params?: MutationParameters): Promise<Types.ProfileUpdate> {
        return this.mutate('ProfileUpdate', variables, params);
    }
    mutateReadNotification(variables: Types.ReadNotificationVariables, params?: MutationParameters): Promise<Types.ReadNotification> {
        return this.mutate('ReadNotification', variables, params);
    }
    mutateRefreshAppToken(variables: Types.RefreshAppTokenVariables, params?: MutationParameters): Promise<Types.RefreshAppToken> {
        return this.mutate('RefreshAppToken', variables, params);
    }
    mutateRegisterPush(variables: Types.RegisterPushVariables, params?: MutationParameters): Promise<Types.RegisterPush> {
        return this.mutate('RegisterPush', variables, params);
    }
    mutateRegisterWebPush(variables: Types.RegisterWebPushVariables, params?: MutationParameters): Promise<Types.RegisterWebPush> {
        return this.mutate('RegisterWebPush', variables, params);
    }
    mutateRemoveCard(variables: Types.RemoveCardVariables, params?: MutationParameters): Promise<Types.RemoveCard> {
        return this.mutate('RemoveCard', variables, params);
    }
    mutateRemoveFromContacts(variables: Types.RemoveFromContactsVariables, params?: MutationParameters): Promise<Types.RemoveFromContacts> {
        return this.mutate('RemoveFromContacts', variables, params);
    }
    mutateRemoveSticker(variables: Types.RemoveStickerVariables, params?: MutationParameters): Promise<Types.RemoveSticker> {
        return this.mutate('RemoveSticker', variables, params);
    }
    mutateReportContent(variables: Types.ReportContentVariables, params?: MutationParameters): Promise<Types.ReportContent> {
        return this.mutate('ReportContent', variables, params);
    }
    mutateReportOnline(variables: Types.ReportOnlineVariables, params?: MutationParameters): Promise<Types.ReportOnline> {
        return this.mutate('ReportOnline', variables, params);
    }
    mutateRoomAddMembers(variables: Types.RoomAddMembersVariables, params?: MutationParameters): Promise<Types.RoomAddMembers> {
        return this.mutate('RoomAddMembers', variables, params);
    }
    mutateRoomAlterFeatured(variables: Types.RoomAlterFeaturedVariables, params?: MutationParameters): Promise<Types.RoomAlterFeatured> {
        return this.mutate('RoomAlterFeatured', variables, params);
    }
    mutateRoomChangeRole(variables: Types.RoomChangeRoleVariables, params?: MutationParameters): Promise<Types.RoomChangeRole> {
        return this.mutate('RoomChangeRole', variables, params);
    }
    mutateRoomCreate(variables: Types.RoomCreateVariables, params?: MutationParameters): Promise<Types.RoomCreate> {
        return this.mutate('RoomCreate', variables, params);
    }
    mutateRoomDelete(variables: Types.RoomDeleteVariables, params?: MutationParameters): Promise<Types.RoomDelete> {
        return this.mutate('RoomDelete', variables, params);
    }
    mutateRoomDeleteMessage(variables: Types.RoomDeleteMessageVariables, params?: MutationParameters): Promise<Types.RoomDeleteMessage> {
        return this.mutate('RoomDeleteMessage', variables, params);
    }
    mutateRoomDeleteMessages(variables: Types.RoomDeleteMessagesVariables, params?: MutationParameters): Promise<Types.RoomDeleteMessages> {
        return this.mutate('RoomDeleteMessages', variables, params);
    }
    mutateRoomDeleteUrlAugmentation(variables: Types.RoomDeleteUrlAugmentationVariables, params?: MutationParameters): Promise<Types.RoomDeleteUrlAugmentation> {
        return this.mutate('RoomDeleteUrlAugmentation', variables, params);
    }
    mutateRoomJoin(variables: Types.RoomJoinVariables, params?: MutationParameters): Promise<Types.RoomJoin> {
        return this.mutate('RoomJoin', variables, params);
    }
    mutateRoomJoinInviteLink(variables: Types.RoomJoinInviteLinkVariables, params?: MutationParameters): Promise<Types.RoomJoinInviteLink> {
        return this.mutate('RoomJoinInviteLink', variables, params);
    }
    mutateRoomKick(variables: Types.RoomKickVariables, params?: MutationParameters): Promise<Types.RoomKick> {
        return this.mutate('RoomKick', variables, params);
    }
    mutateRoomLeave(variables: Types.RoomLeaveVariables, params?: MutationParameters): Promise<Types.RoomLeave> {
        return this.mutate('RoomLeave', variables, params);
    }
    mutateRoomRead(variables: Types.RoomReadVariables, params?: MutationParameters): Promise<Types.RoomRead> {
        return this.mutate('RoomRead', variables, params);
    }
    mutateRoomRenewInviteLink(variables: Types.RoomRenewInviteLinkVariables, params?: MutationParameters): Promise<Types.RoomRenewInviteLink> {
        return this.mutate('RoomRenewInviteLink', variables, params);
    }
    mutateRoomSettingsUpdate(variables: Types.RoomSettingsUpdateVariables, params?: MutationParameters): Promise<Types.RoomSettingsUpdate> {
        return this.mutate('RoomSettingsUpdate', variables, params);
    }
    mutateRoomUpdate(variables: Types.RoomUpdateVariables, params?: MutationParameters): Promise<Types.RoomUpdate> {
        return this.mutate('RoomUpdate', variables, params);
    }
    mutateRoomsInviteUser(variables: Types.RoomsInviteUserVariables, params?: MutationParameters): Promise<Types.RoomsInviteUser> {
        return this.mutate('RoomsInviteUser', variables, params);
    }
    mutateRoomsJoin(variables: Types.RoomsJoinVariables, params?: MutationParameters): Promise<Types.RoomsJoin> {
        return this.mutate('RoomsJoin', variables, params);
    }
    mutateSendDonation(variables: Types.SendDonationVariables, params?: MutationParameters): Promise<Types.SendDonation> {
        return this.mutate('SendDonation', variables, params);
    }
    mutateSendEmailPairCode(variables: Types.SendEmailPairCodeVariables, params?: MutationParameters): Promise<Types.SendEmailPairCode> {
        return this.mutate('SendEmailPairCode', variables, params);
    }
    mutateSendMessage(variables: Types.SendMessageVariables, params?: MutationParameters): Promise<Types.SendMessage> {
        return this.mutate('SendMessage', variables, params);
    }
    mutateSendPhonePairCode(variables: Types.SendPhonePairCodeVariables, params?: MutationParameters): Promise<Types.SendPhonePairCode> {
        return this.mutate('SendPhonePairCode', variables, params);
    }
    mutateSendSticker(variables: Types.SendStickerVariables, params?: MutationParameters): Promise<Types.SendSticker> {
        return this.mutate('SendSticker', variables, params);
    }
    mutateSetFeedChannelShortname(variables: Types.SetFeedChannelShortnameVariables, params?: MutationParameters): Promise<Types.SetFeedChannelShortname> {
        return this.mutate('SetFeedChannelShortname', variables, params);
    }
    mutateSetOrgShortname(variables: Types.SetOrgShortnameVariables, params?: MutationParameters): Promise<Types.SetOrgShortname> {
        return this.mutate('SetOrgShortname', variables, params);
    }
    mutateSetRoomShortname(variables: Types.SetRoomShortnameVariables, params?: MutationParameters): Promise<Types.SetRoomShortname> {
        return this.mutate('SetRoomShortname', variables, params);
    }
    mutateSetTyping(variables: Types.SetTypingVariables, params?: MutationParameters): Promise<Types.SetTyping> {
        return this.mutate('SetTyping', variables, params);
    }
    mutateSetUserShortname(variables: Types.SetUserShortnameVariables, params?: MutationParameters): Promise<Types.SetUserShortname> {
        return this.mutate('SetUserShortname', variables, params);
    }
    mutateSettingsUpdate(variables: Types.SettingsUpdateVariables, params?: MutationParameters): Promise<Types.SettingsUpdate> {
        return this.mutate('SettingsUpdate', variables, params);
    }
    mutateSocialFollow(variables: Types.SocialFollowVariables, params?: MutationParameters): Promise<Types.SocialFollow> {
        return this.mutate('SocialFollow', variables, params);
    }
    mutateSocialUnfollow(variables: Types.SocialUnfollowVariables, params?: MutationParameters): Promise<Types.SocialUnfollow> {
        return this.mutate('SocialUnfollow', variables, params);
    }
    mutateStickerPackAddToCollection(variables: Types.StickerPackAddToCollectionVariables, params?: MutationParameters): Promise<Types.StickerPackAddToCollection> {
        return this.mutate('StickerPackAddToCollection', variables, params);
    }
    mutateStickerPackCreate(variables: Types.StickerPackCreateVariables, params?: MutationParameters): Promise<Types.StickerPackCreate> {
        return this.mutate('StickerPackCreate', variables, params);
    }
    mutateStickerPackRemoveFromCollection(variables: Types.StickerPackRemoveFromCollectionVariables, params?: MutationParameters): Promise<Types.StickerPackRemoveFromCollection> {
        return this.mutate('StickerPackRemoveFromCollection', variables, params);
    }
    mutateStickerPackUpdate(variables: Types.StickerPackUpdateVariables, params?: MutationParameters): Promise<Types.StickerPackUpdate> {
        return this.mutate('StickerPackUpdate', variables, params);
    }
    mutateSubscribeToComments(variables: Types.SubscribeToCommentsVariables, params?: MutationParameters): Promise<Types.SubscribeToComments> {
        return this.mutate('SubscribeToComments', variables, params);
    }
    mutateSuperAccountActivate(variables: Types.SuperAccountActivateVariables, params?: MutationParameters): Promise<Types.SuperAccountActivate> {
        return this.mutate('SuperAccountActivate', variables, params);
    }
    mutateSuperAccountAdd(variables: Types.SuperAccountAddVariables, params?: MutationParameters): Promise<Types.SuperAccountAdd> {
        return this.mutate('SuperAccountAdd', variables, params);
    }
    mutateSuperAccountMemberAdd(variables: Types.SuperAccountMemberAddVariables, params?: MutationParameters): Promise<Types.SuperAccountMemberAdd> {
        return this.mutate('SuperAccountMemberAdd', variables, params);
    }
    mutateSuperAccountMemberRemove(variables: Types.SuperAccountMemberRemoveVariables, params?: MutationParameters): Promise<Types.SuperAccountMemberRemove> {
        return this.mutate('SuperAccountMemberRemove', variables, params);
    }
    mutateSuperAccountPend(variables: Types.SuperAccountPendVariables, params?: MutationParameters): Promise<Types.SuperAccountPend> {
        return this.mutate('SuperAccountPend', variables, params);
    }
    mutateSuperAccountRename(variables: Types.SuperAccountRenameVariables, params?: MutationParameters): Promise<Types.SuperAccountRename> {
        return this.mutate('SuperAccountRename', variables, params);
    }
    mutateSuperAccountSuspend(variables: Types.SuperAccountSuspendVariables, params?: MutationParameters): Promise<Types.SuperAccountSuspend> {
        return this.mutate('SuperAccountSuspend', variables, params);
    }
    mutateSuperAdminAdd(variables: Types.SuperAdminAddVariables, params?: MutationParameters): Promise<Types.SuperAdminAdd> {
        return this.mutate('SuperAdminAdd', variables, params);
    }
    mutateSuperAdminRemove(variables: Types.SuperAdminRemoveVariables, params?: MutationParameters): Promise<Types.SuperAdminRemove> {
        return this.mutate('SuperAdminRemove', variables, params);
    }
    mutateSuperBadgeCreateToRoom(variables: Types.SuperBadgeCreateToRoomVariables, params?: MutationParameters): Promise<Types.SuperBadgeCreateToRoom> {
        return this.mutate('SuperBadgeCreateToRoom', variables, params);
    }
    mutateSuperBadgeUnsetToRoom(variables: Types.SuperBadgeUnsetToRoomVariables, params?: MutationParameters): Promise<Types.SuperBadgeUnsetToRoom> {
        return this.mutate('SuperBadgeUnsetToRoom', variables, params);
    }
    mutateUnBanUser(variables: Types.UnBanUserVariables, params?: MutationParameters): Promise<Types.UnBanUser> {
        return this.mutate('UnBanUser', variables, params);
    }
    mutateUnSubscribeFromComments(variables: Types.UnSubscribeFromCommentsVariables, params?: MutationParameters): Promise<Types.UnSubscribeFromComments> {
        return this.mutate('UnSubscribeFromComments', variables, params);
    }
    mutateUnpinMessage(variables: Types.UnpinMessageVariables, params?: MutationParameters): Promise<Types.UnpinMessage> {
        return this.mutate('UnpinMessage', variables, params);
    }
    mutateUnsetTyping(variables: Types.UnsetTypingVariables, params?: MutationParameters): Promise<Types.UnsetTyping> {
        return this.mutate('UnsetTyping', variables, params);
    }
    mutateUpdateApp(variables: Types.UpdateAppVariables, params?: MutationParameters): Promise<Types.UpdateApp> {
        return this.mutate('UpdateApp', variables, params);
    }
    mutateUpdateOrganization(variables: Types.UpdateOrganizationVariables, params?: MutationParameters): Promise<Types.UpdateOrganization> {
        return this.mutate('UpdateOrganization', variables, params);
    }
    mutateUpdateWelcomeMessage(variables: Types.UpdateWelcomeMessageVariables, params?: MutationParameters): Promise<Types.UpdateWelcomeMessage> {
        return this.mutate('UpdateWelcomeMessage', variables, params);
    }
    mutateUserStorageSet(variables: Types.UserStorageSetVariables, params?: MutationParameters): Promise<Types.UserStorageSet> {
        return this.mutate('UserStorageSet', variables, params);
    }
    mutateVoiceChatCreate(variables: Types.VoiceChatCreateVariables, params?: MutationParameters): Promise<Types.VoiceChatCreate> {
        return this.mutate('VoiceChatCreate', variables, params);
    }
    mutateVoiceChatCreateInChat(variables: Types.VoiceChatCreateInChatVariables, params?: MutationParameters): Promise<Types.VoiceChatCreateInChat> {
        return this.mutate('VoiceChatCreateInChat', variables, params);
    }
    mutateVoiceChatDeletePinnedMessage(variables: Types.VoiceChatDeletePinnedMessageVariables, params?: MutationParameters): Promise<Types.VoiceChatDeletePinnedMessage> {
        return this.mutate('VoiceChatDeletePinnedMessage', variables, params);
    }
    mutateVoiceChatDemote(variables: Types.VoiceChatDemoteVariables, params?: MutationParameters): Promise<Types.VoiceChatDemote> {
        return this.mutate('VoiceChatDemote', variables, params);
    }
    mutateVoiceChatEnd(variables: Types.VoiceChatEndVariables, params?: MutationParameters): Promise<Types.VoiceChatEnd> {
        return this.mutate('VoiceChatEnd', variables, params);
    }
    mutateVoiceChatJoin(variables: Types.VoiceChatJoinVariables, params?: MutationParameters): Promise<Types.VoiceChatJoin> {
        return this.mutate('VoiceChatJoin', variables, params);
    }
    mutateVoiceChatKick(variables: Types.VoiceChatKickVariables, params?: MutationParameters): Promise<Types.VoiceChatKick> {
        return this.mutate('VoiceChatKick', variables, params);
    }
    mutateVoiceChatLeave(variables: Types.VoiceChatLeaveVariables, params?: MutationParameters): Promise<Types.VoiceChatLeave> {
        return this.mutate('VoiceChatLeave', variables, params);
    }
    mutateVoiceChatPromote(variables: Types.VoiceChatPromoteVariables, params?: MutationParameters): Promise<Types.VoiceChatPromote> {
        return this.mutate('VoiceChatPromote', variables, params);
    }
    mutateVoiceChatRaiseHand(variables: Types.VoiceChatRaiseHandVariables, params?: MutationParameters): Promise<Types.VoiceChatRaiseHand> {
        return this.mutate('VoiceChatRaiseHand', variables, params);
    }
    mutateVoiceChatSetPinnedMessage(variables: Types.VoiceChatSetPinnedMessageVariables, params?: MutationParameters): Promise<Types.VoiceChatSetPinnedMessage> {
        return this.mutate('VoiceChatSetPinnedMessage', variables, params);
    }
    mutateVoiceChatUpdate(variables: Types.VoiceChatUpdateVariables, params?: MutationParameters): Promise<Types.VoiceChatUpdate> {
        return this.mutate('VoiceChatUpdate', variables, params);
    }
    mutateVoiceChatUpdateAdmin(variables: Types.VoiceChatUpdateAdminVariables, params?: MutationParameters): Promise<Types.VoiceChatUpdateAdmin> {
        return this.mutate('VoiceChatUpdateAdmin', variables, params);
    }
    mutateconferenceAddScreenShare(variables: Types.conferenceAddScreenShareVariables, params?: MutationParameters): Promise<Types.conferenceAddScreenShare> {
        return this.mutate('conferenceAddScreenShare', variables, params);
    }
    mutateconferenceAlterMediaState(variables: Types.conferenceAlterMediaStateVariables, params?: MutationParameters): Promise<Types.conferenceAlterMediaState> {
        return this.mutate('conferenceAlterMediaState', variables, params);
    }
    mutateconferenceRemoveScreenShare(variables: Types.conferenceRemoveScreenShareVariables, params?: MutationParameters): Promise<Types.conferenceRemoveScreenShare> {
        return this.mutate('conferenceRemoveScreenShare', variables, params);
    }
    mutateconferenceRequestLocalMediaChange(variables: Types.conferenceRequestLocalMediaChangeVariables, params?: MutationParameters): Promise<Types.conferenceRequestLocalMediaChange> {
        return this.mutate('conferenceRequestLocalMediaChange', variables, params);
    }
    subscribeActiveVoiceChatsEvents(handler: GraphqlSubscriptionHandler<Types.ActiveVoiceChatsEvents>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.ActiveVoiceChatsEvents> {
        return this.subscribe(handler, 'ActiveVoiceChatsEvents', undefined, params);
    }
    subscribeBlackListUpdates(variables: Types.BlackListUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.BlackListUpdates>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.BlackListUpdates> {
        return this.subscribe(handler, 'BlackListUpdates', variables, params);
    }
    subscribeChatOnlinesCountWatch(variables: Types.ChatOnlinesCountWatchVariables, handler: GraphqlSubscriptionHandler<Types.ChatOnlinesCountWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.ChatOnlinesCountWatch> {
        return this.subscribe(handler, 'ChatOnlinesCountWatch', variables, params);
    }
    subscribeChatWatch(variables: Types.ChatWatchVariables, handler: GraphqlSubscriptionHandler<Types.ChatWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.ChatWatch> {
        return this.subscribe(handler, 'ChatWatch', variables, params);
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
    subscribeDebugEventsWatch(variables: Types.DebugEventsWatchVariables, handler: GraphqlSubscriptionHandler<Types.DebugEventsWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.DebugEventsWatch> {
        return this.subscribe(handler, 'DebugEventsWatch', variables, params);
    }
    subscribeDialogsWatch(variables: Types.DialogsWatchVariables, handler: GraphqlSubscriptionHandler<Types.DialogsWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.DialogsWatch> {
        return this.subscribe(handler, 'DialogsWatch', variables, params);
    }
    subscribeMyContactsUpdates(variables: Types.MyContactsUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.MyContactsUpdates>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.MyContactsUpdates> {
        return this.subscribe(handler, 'MyContactsUpdates', variables, params);
    }
    subscribeMyNotificationsCenter(variables: Types.MyNotificationsCenterVariables, handler: GraphqlSubscriptionHandler<Types.MyNotificationsCenter>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.MyNotificationsCenter> {
        return this.subscribe(handler, 'MyNotificationsCenter', variables, params);
    }
    subscribeOnlineWatch(variables: Types.OnlineWatchVariables, handler: GraphqlSubscriptionHandler<Types.OnlineWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.OnlineWatch> {
        return this.subscribe(handler, 'OnlineWatch', variables, params);
    }
    subscribeSettingsWatch(handler: GraphqlSubscriptionHandler<Types.SettingsWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.SettingsWatch> {
        return this.subscribe(handler, 'SettingsWatch', undefined, params);
    }
    subscribeStickersWatch(handler: GraphqlSubscriptionHandler<Types.StickersWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.StickersWatch> {
        return this.subscribe(handler, 'StickersWatch', undefined, params);
    }
    subscribeTypingsWatch(handler: GraphqlSubscriptionHandler<Types.TypingsWatch>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.TypingsWatch> {
        return this.subscribe(handler, 'TypingsWatch', undefined, params);
    }
    subscribeVoiceChatEvents(variables: Types.VoiceChatEventsVariables, handler: GraphqlSubscriptionHandler<Types.VoiceChatEvents>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.VoiceChatEvents> {
        return this.subscribe(handler, 'VoiceChatEvents', variables, params);
    }
    subscribeWalletUpdates(variables: Types.WalletUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.WalletUpdates>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.WalletUpdates> {
        return this.subscribe(handler, 'WalletUpdates', variables, params);
    }
    subscribeWatchUpdates(handler: GraphqlSubscriptionHandler<Types.WatchUpdates>, params?: SubscriptionParameters): GraphqlActiveSubscription<Types.WatchUpdates> {
        return this.subscribe(handler, 'WatchUpdates', undefined, params);
    }
}