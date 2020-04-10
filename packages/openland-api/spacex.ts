/* tslint:disable */
/* eslint-disable */
import * as Types from './spacex.types';
import { GraphqlEngine, GraphqlActiveSubscription, OperationParameters, GraphqlSubscriptionHandler, BaseSpaceXClient, SpaceQueryWatchParameters } from '@openland/spacex';

export class OpenlandClient extends BaseSpaceXClient {
    constructor(engine: GraphqlEngine) {
        super(engine);
    }
    queryAccount(opts?: OperationParameters): Promise<Types.Account> {
        return this.query('Account', undefined, opts);
    }
    queryAccountAppInvite(opts?: OperationParameters): Promise<Types.AccountAppInvite> {
        return this.query('AccountAppInvite', undefined, opts);
    }
    queryAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountAppInviteInfo> {
        return this.query('AccountAppInviteInfo', variables, opts);
    }
    queryAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountInviteInfo> {
        return this.query('AccountInviteInfo', variables, opts);
    }
    queryAccountSettings(opts?: OperationParameters): Promise<Types.AccountSettings> {
        return this.query('AccountSettings', undefined, opts);
    }
    queryAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, opts?: OperationParameters): Promise<Types.AuthResolveShortName> {
        return this.query('AuthResolveShortName', variables, opts);
    }
    queryChatInit(variables: Types.ChatInitVariables, opts?: OperationParameters): Promise<Types.ChatInit> {
        return this.query('ChatInit', variables, opts);
    }
    queryChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: OperationParameters): Promise<Types.ChatInitFromUnread> {
        return this.query('ChatInitFromUnread', variables, opts);
    }
    queryChatJoin(variables: Types.ChatJoinVariables, opts?: OperationParameters): Promise<Types.ChatJoin> {
        return this.query('ChatJoin', variables, opts);
    }
    queryChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: OperationParameters): Promise<Types.ChatMentionSearch> {
        return this.query('ChatMentionSearch', variables, opts);
    }
    queryComments(variables: Types.CommentsVariables, opts?: OperationParameters): Promise<Types.Comments> {
        return this.query('Comments', variables, opts);
    }
    queryConference(variables: Types.ConferenceVariables, opts?: OperationParameters): Promise<Types.Conference> {
        return this.query('Conference', variables, opts);
    }
    queryConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: OperationParameters): Promise<Types.ConferenceMedia> {
        return this.query('ConferenceMedia', variables, opts);
    }
    queryDialogs(variables: Types.DialogsVariables, opts?: OperationParameters): Promise<Types.Dialogs> {
        return this.query('Dialogs', variables, opts);
    }
    queryDiscoverCollection(variables: Types.DiscoverCollectionVariables, opts?: OperationParameters): Promise<Types.DiscoverCollection> {
        return this.query('DiscoverCollection', variables, opts);
    }
    queryDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, opts?: OperationParameters): Promise<Types.DiscoverCollectionShort> {
        return this.query('DiscoverCollectionShort', variables, opts);
    }
    queryDiscoverCollections(variables: Types.DiscoverCollectionsVariables, opts?: OperationParameters): Promise<Types.DiscoverCollections> {
        return this.query('DiscoverCollections', variables, opts);
    }
    queryDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, opts?: OperationParameters): Promise<Types.DiscoverCollectionsShort> {
        return this.query('DiscoverCollectionsShort', variables, opts);
    }
    queryDiscoverEditorsChoice(opts?: OperationParameters): Promise<Types.DiscoverEditorsChoice> {
        return this.query('DiscoverEditorsChoice', undefined, opts);
    }
    queryDiscoverIsDone(opts?: OperationParameters): Promise<Types.DiscoverIsDone> {
        return this.query('DiscoverIsDone', undefined, opts);
    }
    queryDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, opts?: OperationParameters): Promise<Types.DiscoverNewAndGrowing> {
        return this.query('DiscoverNewAndGrowing', variables, opts);
    }
    queryDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: OperationParameters): Promise<Types.DiscoverNextPage> {
        return this.query('DiscoverNextPage', variables, opts);
    }
    queryDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, opts?: OperationParameters): Promise<Types.DiscoverPopularNow> {
        return this.query('DiscoverPopularNow', variables, opts);
    }
    queryDiscoverState(opts?: OperationParameters): Promise<Types.DiscoverState> {
        return this.query('DiscoverState', undefined, opts);
    }
    queryDiscoverSuggestedRooms(opts?: OperationParameters): Promise<Types.DiscoverSuggestedRooms> {
        return this.query('DiscoverSuggestedRooms', undefined, opts);
    }
    queryDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, opts?: OperationParameters): Promise<Types.DiscoverTopFree> {
        return this.query('DiscoverTopFree', variables, opts);
    }
    queryDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, opts?: OperationParameters): Promise<Types.DiscoverTopPremium> {
        return this.query('DiscoverTopPremium', variables, opts);
    }
    queryExplorePeople(variables: Types.ExplorePeopleVariables, opts?: OperationParameters): Promise<Types.ExplorePeople> {
        return this.query('ExplorePeople', variables, opts);
    }
    queryExploreRooms(variables: Types.ExploreRoomsVariables, opts?: OperationParameters): Promise<Types.ExploreRooms> {
        return this.query('ExploreRooms', variables, opts);
    }
    queryExploreRoomsNoAuth(variables: Types.ExploreRoomsNoAuthVariables, opts?: OperationParameters): Promise<Types.ExploreRoomsNoAuth> {
        return this.query('ExploreRoomsNoAuth', variables, opts);
    }
    queryFeatureFlags(opts?: OperationParameters): Promise<Types.FeatureFlags> {
        return this.query('FeatureFlags', undefined, opts);
    }
    queryFeedChannel(variables: Types.FeedChannelVariables, opts?: OperationParameters): Promise<Types.FeedChannel> {
        return this.query('FeedChannel', variables, opts);
    }
    queryFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: OperationParameters): Promise<Types.FeedChannelContent> {
        return this.query('FeedChannelContent', variables, opts);
    }
    queryFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: OperationParameters): Promise<Types.FeedChannelSubscribers> {
        return this.query('FeedChannelSubscribers', variables, opts);
    }
    queryFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: OperationParameters): Promise<Types.FeedChannelWriters> {
        return this.query('FeedChannelWriters', variables, opts);
    }
    queryFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: OperationParameters): Promise<Types.FeedChannelsSearch> {
        return this.query('FeedChannelsSearch', variables, opts);
    }
    queryFeedItem(variables: Types.FeedItemVariables, opts?: OperationParameters): Promise<Types.FeedItem> {
        return this.query('FeedItem', variables, opts);
    }
    queryFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: OperationParameters): Promise<Types.FeedLoadMore> {
        return this.query('FeedLoadMore', variables, opts);
    }
    queryFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: OperationParameters): Promise<Types.FeedRecommendedChannels> {
        return this.query('FeedRecommendedChannels', variables, opts);
    }
    queryFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, opts?: OperationParameters): Promise<Types.FeedSubscriptions> {
        return this.query('FeedSubscriptions', variables, opts);
    }
    queryFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, opts?: OperationParameters): Promise<Types.FeedWritableChannels> {
        return this.query('FeedWritableChannels', variables, opts);
    }
    queryFetchPushSettings(opts?: OperationParameters): Promise<Types.FetchPushSettings> {
        return this.query('FetchPushSettings', undefined, opts);
    }
    queryGlobalCounter(opts?: OperationParameters): Promise<Types.GlobalCounter> {
        return this.query('GlobalCounter', undefined, opts);
    }
    queryGlobalSearch(variables: Types.GlobalSearchVariables, opts?: OperationParameters): Promise<Types.GlobalSearch> {
        return this.query('GlobalSearch', variables, opts);
    }
    queryInitFeed(variables: Types.InitFeedVariables, opts?: OperationParameters): Promise<Types.InitFeed> {
        return this.query('InitFeed', variables, opts);
    }
    queryMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: OperationParameters): Promise<Types.MatchmakingProfile> {
        return this.query('MatchmakingProfile', variables, opts);
    }
    queryMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: OperationParameters): Promise<Types.MatchmakingRoom> {
        return this.query('MatchmakingRoom', variables, opts);
    }
    queryMessage(variables: Types.MessageVariables, opts?: OperationParameters): Promise<Types.Message> {
        return this.query('Message', variables, opts);
    }
    queryMessagesBatch(variables: Types.MessagesBatchVariables, opts?: OperationParameters): Promise<Types.MessagesBatch> {
        return this.query('MessagesBatch', variables, opts);
    }
    queryMessagesSearch(variables: Types.MessagesSearchVariables, opts?: OperationParameters): Promise<Types.MessagesSearch> {
        return this.query('MessagesSearch', variables, opts);
    }
    queryMyApps(opts?: OperationParameters): Promise<Types.MyApps> {
        return this.query('MyApps', undefined, opts);
    }
    queryMyCards(opts?: OperationParameters): Promise<Types.MyCards> {
        return this.query('MyCards', undefined, opts);
    }
    queryMyNotificationCenter(opts?: OperationParameters): Promise<Types.MyNotificationCenter> {
        return this.query('MyNotificationCenter', undefined, opts);
    }
    queryMyNotifications(variables: Types.MyNotificationsVariables, opts?: OperationParameters): Promise<Types.MyNotifications> {
        return this.query('MyNotifications', variables, opts);
    }
    queryMyOrganizations(opts?: OperationParameters): Promise<Types.MyOrganizations> {
        return this.query('MyOrganizations', undefined, opts);
    }
    queryMyStickers(opts?: OperationParameters): Promise<Types.MyStickers> {
        return this.query('MyStickers', undefined, opts);
    }
    queryMySuccessfulInvitesCount(opts?: OperationParameters): Promise<Types.MySuccessfulInvitesCount> {
        return this.query('MySuccessfulInvitesCount', undefined, opts);
    }
    queryMyWallet(opts?: OperationParameters): Promise<Types.MyWallet> {
        return this.query('MyWallet', undefined, opts);
    }
    queryOauthContext(variables: Types.OauthContextVariables, opts?: OperationParameters): Promise<Types.OauthContext> {
        return this.query('OauthContext', variables, opts);
    }
    queryOnline(variables: Types.OnlineVariables, opts?: OperationParameters): Promise<Types.Online> {
        return this.query('Online', variables, opts);
    }
    queryOrganization(variables: Types.OrganizationVariables, opts?: OperationParameters): Promise<Types.Organization> {
        return this.query('Organization', variables, opts);
    }
    queryOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationMembers> {
        return this.query('OrganizationMembers', variables, opts);
    }
    queryOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: OperationParameters): Promise<Types.OrganizationMembersShort> {
        return this.query('OrganizationMembersShort', variables, opts);
    }
    queryOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: OperationParameters): Promise<Types.OrganizationProfile> {
        return this.query('OrganizationProfile', variables, opts);
    }
    queryOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicInvite> {
        return this.query('OrganizationPublicInvite', variables, opts);
    }
    queryOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicRooms> {
        return this.query('OrganizationPublicRooms', variables, opts);
    }
    queryOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationWithoutMembers> {
        return this.query('OrganizationWithoutMembers', variables, opts);
    }
    queryPermissions(opts?: OperationParameters): Promise<Types.Permissions> {
        return this.query('Permissions', undefined, opts);
    }
    queryPicSharedMedia(variables: Types.PicSharedMediaVariables, opts?: OperationParameters): Promise<Types.PicSharedMedia> {
        return this.query('PicSharedMedia', variables, opts);
    }
    queryProfile(opts?: OperationParameters): Promise<Types.Profile> {
        return this.query('Profile', undefined, opts);
    }
    queryProfilePrefill(opts?: OperationParameters): Promise<Types.ProfilePrefill> {
        return this.query('ProfilePrefill', undefined, opts);
    }
    queryResolveShortName(variables: Types.ResolveShortNameVariables, opts?: OperationParameters): Promise<Types.ResolveShortName> {
        return this.query('ResolveShortName', variables, opts);
    }
    queryResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: OperationParameters): Promise<Types.ResolvedInvite> {
        return this.query('ResolvedInvite', variables, opts);
    }
    queryRoomAdminMembers(variables: Types.RoomAdminMembersVariables, opts?: OperationParameters): Promise<Types.RoomAdminMembers> {
        return this.query('RoomAdminMembers', variables, opts);
    }
    queryRoomChat(variables: Types.RoomChatVariables, opts?: OperationParameters): Promise<Types.RoomChat> {
        return this.query('RoomChat', variables, opts);
    }
    queryRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: OperationParameters): Promise<Types.RoomFeaturedMembers> {
        return this.query('RoomFeaturedMembers', variables, opts);
    }
    queryRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: OperationParameters): Promise<Types.RoomInviteInfo> {
        return this.query('RoomInviteInfo', variables, opts);
    }
    queryRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: OperationParameters): Promise<Types.RoomInviteLink> {
        return this.query('RoomInviteLink', variables, opts);
    }
    queryRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: OperationParameters): Promise<Types.RoomMembersPaginated> {
        return this.query('RoomMembersPaginated', variables, opts);
    }
    queryRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: OperationParameters): Promise<Types.RoomMembersShort> {
        return this.query('RoomMembersShort', variables, opts);
    }
    queryRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: OperationParameters): Promise<Types.RoomMembersTiny> {
        return this.query('RoomMembersTiny', variables, opts);
    }
    queryRoomPico(variables: Types.RoomPicoVariables, opts?: OperationParameters): Promise<Types.RoomPico> {
        return this.query('RoomPico', variables, opts);
    }
    queryRoomSearch(variables: Types.RoomSearchVariables, opts?: OperationParameters): Promise<Types.RoomSearch> {
        return this.query('RoomSearch', variables, opts);
    }
    queryRoomSocialImage(variables: Types.RoomSocialImageVariables, opts?: OperationParameters): Promise<Types.RoomSocialImage> {
        return this.query('RoomSocialImage', variables, opts);
    }
    queryRoomTiny(variables: Types.RoomTinyVariables, opts?: OperationParameters): Promise<Types.RoomTiny> {
        return this.query('RoomTiny', variables, opts);
    }
    querySettings(opts?: OperationParameters): Promise<Types.Settings> {
        return this.query('Settings', undefined, opts);
    }
    querySharedMedia(variables: Types.SharedMediaVariables, opts?: OperationParameters): Promise<Types.SharedMedia> {
        return this.query('SharedMedia', variables, opts);
    }
    querySharedMediaCounters(variables: Types.SharedMediaCountersVariables, opts?: OperationParameters): Promise<Types.SharedMediaCounters> {
        return this.query('SharedMediaCounters', variables, opts);
    }
    queryStickerPack(variables: Types.StickerPackVariables, opts?: OperationParameters): Promise<Types.StickerPack> {
        return this.query('StickerPack', variables, opts);
    }
    queryStickerPackCatalog(opts?: OperationParameters): Promise<Types.StickerPackCatalog> {
        return this.query('StickerPackCatalog', undefined, opts);
    }
    queryStripeToken(opts?: OperationParameters): Promise<Types.StripeToken> {
        return this.query('StripeToken', undefined, opts);
    }
    querySubscriptions(opts?: OperationParameters): Promise<Types.Subscriptions> {
        return this.query('Subscriptions', undefined, opts);
    }
    querySuggestedRooms(opts?: OperationParameters): Promise<Types.SuggestedRooms> {
        return this.query('SuggestedRooms', undefined, opts);
    }
    querySuperAccount(variables: Types.SuperAccountVariables, opts?: OperationParameters): Promise<Types.SuperAccount> {
        return this.query('SuperAccount', variables, opts);
    }
    querySuperAccounts(opts?: OperationParameters): Promise<Types.SuperAccounts> {
        return this.query('SuperAccounts', undefined, opts);
    }
    querySuperAdmins(opts?: OperationParameters): Promise<Types.SuperAdmins> {
        return this.query('SuperAdmins', undefined, opts);
    }
    querySuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: OperationParameters): Promise<Types.SuperBadgeInRoom> {
        return this.query('SuperBadgeInRoom', variables, opts);
    }
    queryTransactionsHistory(variables: Types.TransactionsHistoryVariables, opts?: OperationParameters): Promise<Types.TransactionsHistory> {
        return this.query('TransactionsHistory', variables, opts);
    }
    queryUser(variables: Types.UserVariables, opts?: OperationParameters): Promise<Types.User> {
        return this.query('User', variables, opts);
    }
    queryUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: OperationParameters): Promise<Types.UserAvailableRooms> {
        return this.query('UserAvailableRooms', variables, opts);
    }
    queryUserPico(variables: Types.UserPicoVariables, opts?: OperationParameters): Promise<Types.UserPico> {
        return this.query('UserPico', variables, opts);
    }
    queryUserStorage(variables: Types.UserStorageVariables, opts?: OperationParameters): Promise<Types.UserStorage> {
        return this.query('UserStorage', variables, opts);
    }
    queryUsers(variables: Types.UsersVariables, opts?: OperationParameters): Promise<Types.Users> {
        return this.query('Users', variables, opts);
    }
    refetchAccount(opts?: OperationParameters): Promise<Types.Account> {
        return this.refetch('Account', undefined);
    }
    refetchAccountAppInvite(opts?: OperationParameters): Promise<Types.AccountAppInvite> {
        return this.refetch('AccountAppInvite', undefined);
    }
    refetchAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountAppInviteInfo> {
        return this.refetch('AccountAppInviteInfo', variables);
    }
    refetchAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountInviteInfo> {
        return this.refetch('AccountInviteInfo', variables);
    }
    refetchAccountSettings(opts?: OperationParameters): Promise<Types.AccountSettings> {
        return this.refetch('AccountSettings', undefined);
    }
    refetchAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, opts?: OperationParameters): Promise<Types.AuthResolveShortName> {
        return this.refetch('AuthResolveShortName', variables);
    }
    refetchChatInit(variables: Types.ChatInitVariables, opts?: OperationParameters): Promise<Types.ChatInit> {
        return this.refetch('ChatInit', variables);
    }
    refetchChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: OperationParameters): Promise<Types.ChatInitFromUnread> {
        return this.refetch('ChatInitFromUnread', variables);
    }
    refetchChatJoin(variables: Types.ChatJoinVariables, opts?: OperationParameters): Promise<Types.ChatJoin> {
        return this.refetch('ChatJoin', variables);
    }
    refetchChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: OperationParameters): Promise<Types.ChatMentionSearch> {
        return this.refetch('ChatMentionSearch', variables);
    }
    refetchComments(variables: Types.CommentsVariables, opts?: OperationParameters): Promise<Types.Comments> {
        return this.refetch('Comments', variables);
    }
    refetchConference(variables: Types.ConferenceVariables, opts?: OperationParameters): Promise<Types.Conference> {
        return this.refetch('Conference', variables);
    }
    refetchConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: OperationParameters): Promise<Types.ConferenceMedia> {
        return this.refetch('ConferenceMedia', variables);
    }
    refetchDialogs(variables: Types.DialogsVariables, opts?: OperationParameters): Promise<Types.Dialogs> {
        return this.refetch('Dialogs', variables);
    }
    refetchDiscoverCollection(variables: Types.DiscoverCollectionVariables, opts?: OperationParameters): Promise<Types.DiscoverCollection> {
        return this.refetch('DiscoverCollection', variables);
    }
    refetchDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, opts?: OperationParameters): Promise<Types.DiscoverCollectionShort> {
        return this.refetch('DiscoverCollectionShort', variables);
    }
    refetchDiscoverCollections(variables: Types.DiscoverCollectionsVariables, opts?: OperationParameters): Promise<Types.DiscoverCollections> {
        return this.refetch('DiscoverCollections', variables);
    }
    refetchDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, opts?: OperationParameters): Promise<Types.DiscoverCollectionsShort> {
        return this.refetch('DiscoverCollectionsShort', variables);
    }
    refetchDiscoverEditorsChoice(opts?: OperationParameters): Promise<Types.DiscoverEditorsChoice> {
        return this.refetch('DiscoverEditorsChoice', undefined);
    }
    refetchDiscoverIsDone(opts?: OperationParameters): Promise<Types.DiscoverIsDone> {
        return this.refetch('DiscoverIsDone', undefined);
    }
    refetchDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, opts?: OperationParameters): Promise<Types.DiscoverNewAndGrowing> {
        return this.refetch('DiscoverNewAndGrowing', variables);
    }
    refetchDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: OperationParameters): Promise<Types.DiscoverNextPage> {
        return this.refetch('DiscoverNextPage', variables);
    }
    refetchDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, opts?: OperationParameters): Promise<Types.DiscoverPopularNow> {
        return this.refetch('DiscoverPopularNow', variables);
    }
    refetchDiscoverState(opts?: OperationParameters): Promise<Types.DiscoverState> {
        return this.refetch('DiscoverState', undefined);
    }
    refetchDiscoverSuggestedRooms(opts?: OperationParameters): Promise<Types.DiscoverSuggestedRooms> {
        return this.refetch('DiscoverSuggestedRooms', undefined);
    }
    refetchDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, opts?: OperationParameters): Promise<Types.DiscoverTopFree> {
        return this.refetch('DiscoverTopFree', variables);
    }
    refetchDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, opts?: OperationParameters): Promise<Types.DiscoverTopPremium> {
        return this.refetch('DiscoverTopPremium', variables);
    }
    refetchExplorePeople(variables: Types.ExplorePeopleVariables, opts?: OperationParameters): Promise<Types.ExplorePeople> {
        return this.refetch('ExplorePeople', variables);
    }
    refetchExploreRooms(variables: Types.ExploreRoomsVariables, opts?: OperationParameters): Promise<Types.ExploreRooms> {
        return this.refetch('ExploreRooms', variables);
    }
    refetchExploreRoomsNoAuth(variables: Types.ExploreRoomsNoAuthVariables, opts?: OperationParameters): Promise<Types.ExploreRoomsNoAuth> {
        return this.refetch('ExploreRoomsNoAuth', variables);
    }
    refetchFeatureFlags(opts?: OperationParameters): Promise<Types.FeatureFlags> {
        return this.refetch('FeatureFlags', undefined);
    }
    refetchFeedChannel(variables: Types.FeedChannelVariables, opts?: OperationParameters): Promise<Types.FeedChannel> {
        return this.refetch('FeedChannel', variables);
    }
    refetchFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: OperationParameters): Promise<Types.FeedChannelContent> {
        return this.refetch('FeedChannelContent', variables);
    }
    refetchFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: OperationParameters): Promise<Types.FeedChannelSubscribers> {
        return this.refetch('FeedChannelSubscribers', variables);
    }
    refetchFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: OperationParameters): Promise<Types.FeedChannelWriters> {
        return this.refetch('FeedChannelWriters', variables);
    }
    refetchFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: OperationParameters): Promise<Types.FeedChannelsSearch> {
        return this.refetch('FeedChannelsSearch', variables);
    }
    refetchFeedItem(variables: Types.FeedItemVariables, opts?: OperationParameters): Promise<Types.FeedItem> {
        return this.refetch('FeedItem', variables);
    }
    refetchFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: OperationParameters): Promise<Types.FeedLoadMore> {
        return this.refetch('FeedLoadMore', variables);
    }
    refetchFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: OperationParameters): Promise<Types.FeedRecommendedChannels> {
        return this.refetch('FeedRecommendedChannels', variables);
    }
    refetchFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, opts?: OperationParameters): Promise<Types.FeedSubscriptions> {
        return this.refetch('FeedSubscriptions', variables);
    }
    refetchFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, opts?: OperationParameters): Promise<Types.FeedWritableChannels> {
        return this.refetch('FeedWritableChannels', variables);
    }
    refetchFetchPushSettings(opts?: OperationParameters): Promise<Types.FetchPushSettings> {
        return this.refetch('FetchPushSettings', undefined);
    }
    refetchGlobalCounter(opts?: OperationParameters): Promise<Types.GlobalCounter> {
        return this.refetch('GlobalCounter', undefined);
    }
    refetchGlobalSearch(variables: Types.GlobalSearchVariables, opts?: OperationParameters): Promise<Types.GlobalSearch> {
        return this.refetch('GlobalSearch', variables);
    }
    refetchInitFeed(variables: Types.InitFeedVariables, opts?: OperationParameters): Promise<Types.InitFeed> {
        return this.refetch('InitFeed', variables);
    }
    refetchMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: OperationParameters): Promise<Types.MatchmakingProfile> {
        return this.refetch('MatchmakingProfile', variables);
    }
    refetchMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: OperationParameters): Promise<Types.MatchmakingRoom> {
        return this.refetch('MatchmakingRoom', variables);
    }
    refetchMessage(variables: Types.MessageVariables, opts?: OperationParameters): Promise<Types.Message> {
        return this.refetch('Message', variables);
    }
    refetchMessagesBatch(variables: Types.MessagesBatchVariables, opts?: OperationParameters): Promise<Types.MessagesBatch> {
        return this.refetch('MessagesBatch', variables);
    }
    refetchMessagesSearch(variables: Types.MessagesSearchVariables, opts?: OperationParameters): Promise<Types.MessagesSearch> {
        return this.refetch('MessagesSearch', variables);
    }
    refetchMyApps(opts?: OperationParameters): Promise<Types.MyApps> {
        return this.refetch('MyApps', undefined);
    }
    refetchMyCards(opts?: OperationParameters): Promise<Types.MyCards> {
        return this.refetch('MyCards', undefined);
    }
    refetchMyNotificationCenter(opts?: OperationParameters): Promise<Types.MyNotificationCenter> {
        return this.refetch('MyNotificationCenter', undefined);
    }
    refetchMyNotifications(variables: Types.MyNotificationsVariables, opts?: OperationParameters): Promise<Types.MyNotifications> {
        return this.refetch('MyNotifications', variables);
    }
    refetchMyOrganizations(opts?: OperationParameters): Promise<Types.MyOrganizations> {
        return this.refetch('MyOrganizations', undefined);
    }
    refetchMyStickers(opts?: OperationParameters): Promise<Types.MyStickers> {
        return this.refetch('MyStickers', undefined);
    }
    refetchMySuccessfulInvitesCount(opts?: OperationParameters): Promise<Types.MySuccessfulInvitesCount> {
        return this.refetch('MySuccessfulInvitesCount', undefined);
    }
    refetchMyWallet(opts?: OperationParameters): Promise<Types.MyWallet> {
        return this.refetch('MyWallet', undefined);
    }
    refetchOauthContext(variables: Types.OauthContextVariables, opts?: OperationParameters): Promise<Types.OauthContext> {
        return this.refetch('OauthContext', variables);
    }
    refetchOnline(variables: Types.OnlineVariables, opts?: OperationParameters): Promise<Types.Online> {
        return this.refetch('Online', variables);
    }
    refetchOrganization(variables: Types.OrganizationVariables, opts?: OperationParameters): Promise<Types.Organization> {
        return this.refetch('Organization', variables);
    }
    refetchOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationMembers> {
        return this.refetch('OrganizationMembers', variables);
    }
    refetchOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: OperationParameters): Promise<Types.OrganizationMembersShort> {
        return this.refetch('OrganizationMembersShort', variables);
    }
    refetchOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: OperationParameters): Promise<Types.OrganizationProfile> {
        return this.refetch('OrganizationProfile', variables);
    }
    refetchOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicInvite> {
        return this.refetch('OrganizationPublicInvite', variables);
    }
    refetchOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicRooms> {
        return this.refetch('OrganizationPublicRooms', variables);
    }
    refetchOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationWithoutMembers> {
        return this.refetch('OrganizationWithoutMembers', variables);
    }
    refetchPermissions(opts?: OperationParameters): Promise<Types.Permissions> {
        return this.refetch('Permissions', undefined);
    }
    refetchPicSharedMedia(variables: Types.PicSharedMediaVariables, opts?: OperationParameters): Promise<Types.PicSharedMedia> {
        return this.refetch('PicSharedMedia', variables);
    }
    refetchProfile(opts?: OperationParameters): Promise<Types.Profile> {
        return this.refetch('Profile', undefined);
    }
    refetchProfilePrefill(opts?: OperationParameters): Promise<Types.ProfilePrefill> {
        return this.refetch('ProfilePrefill', undefined);
    }
    refetchResolveShortName(variables: Types.ResolveShortNameVariables, opts?: OperationParameters): Promise<Types.ResolveShortName> {
        return this.refetch('ResolveShortName', variables);
    }
    refetchResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: OperationParameters): Promise<Types.ResolvedInvite> {
        return this.refetch('ResolvedInvite', variables);
    }
    refetchRoomAdminMembers(variables: Types.RoomAdminMembersVariables, opts?: OperationParameters): Promise<Types.RoomAdminMembers> {
        return this.refetch('RoomAdminMembers', variables);
    }
    refetchRoomChat(variables: Types.RoomChatVariables, opts?: OperationParameters): Promise<Types.RoomChat> {
        return this.refetch('RoomChat', variables);
    }
    refetchRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: OperationParameters): Promise<Types.RoomFeaturedMembers> {
        return this.refetch('RoomFeaturedMembers', variables);
    }
    refetchRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: OperationParameters): Promise<Types.RoomInviteInfo> {
        return this.refetch('RoomInviteInfo', variables);
    }
    refetchRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: OperationParameters): Promise<Types.RoomInviteLink> {
        return this.refetch('RoomInviteLink', variables);
    }
    refetchRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: OperationParameters): Promise<Types.RoomMembersPaginated> {
        return this.refetch('RoomMembersPaginated', variables);
    }
    refetchRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: OperationParameters): Promise<Types.RoomMembersShort> {
        return this.refetch('RoomMembersShort', variables);
    }
    refetchRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: OperationParameters): Promise<Types.RoomMembersTiny> {
        return this.refetch('RoomMembersTiny', variables);
    }
    refetchRoomPico(variables: Types.RoomPicoVariables, opts?: OperationParameters): Promise<Types.RoomPico> {
        return this.refetch('RoomPico', variables);
    }
    refetchRoomSearch(variables: Types.RoomSearchVariables, opts?: OperationParameters): Promise<Types.RoomSearch> {
        return this.refetch('RoomSearch', variables);
    }
    refetchRoomSocialImage(variables: Types.RoomSocialImageVariables, opts?: OperationParameters): Promise<Types.RoomSocialImage> {
        return this.refetch('RoomSocialImage', variables);
    }
    refetchRoomTiny(variables: Types.RoomTinyVariables, opts?: OperationParameters): Promise<Types.RoomTiny> {
        return this.refetch('RoomTiny', variables);
    }
    refetchSettings(opts?: OperationParameters): Promise<Types.Settings> {
        return this.refetch('Settings', undefined);
    }
    refetchSharedMedia(variables: Types.SharedMediaVariables, opts?: OperationParameters): Promise<Types.SharedMedia> {
        return this.refetch('SharedMedia', variables);
    }
    refetchSharedMediaCounters(variables: Types.SharedMediaCountersVariables, opts?: OperationParameters): Promise<Types.SharedMediaCounters> {
        return this.refetch('SharedMediaCounters', variables);
    }
    refetchStickerPack(variables: Types.StickerPackVariables, opts?: OperationParameters): Promise<Types.StickerPack> {
        return this.refetch('StickerPack', variables);
    }
    refetchStickerPackCatalog(opts?: OperationParameters): Promise<Types.StickerPackCatalog> {
        return this.refetch('StickerPackCatalog', undefined);
    }
    refetchStripeToken(opts?: OperationParameters): Promise<Types.StripeToken> {
        return this.refetch('StripeToken', undefined);
    }
    refetchSubscriptions(opts?: OperationParameters): Promise<Types.Subscriptions> {
        return this.refetch('Subscriptions', undefined);
    }
    refetchSuggestedRooms(opts?: OperationParameters): Promise<Types.SuggestedRooms> {
        return this.refetch('SuggestedRooms', undefined);
    }
    refetchSuperAccount(variables: Types.SuperAccountVariables, opts?: OperationParameters): Promise<Types.SuperAccount> {
        return this.refetch('SuperAccount', variables);
    }
    refetchSuperAccounts(opts?: OperationParameters): Promise<Types.SuperAccounts> {
        return this.refetch('SuperAccounts', undefined);
    }
    refetchSuperAdmins(opts?: OperationParameters): Promise<Types.SuperAdmins> {
        return this.refetch('SuperAdmins', undefined);
    }
    refetchSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: OperationParameters): Promise<Types.SuperBadgeInRoom> {
        return this.refetch('SuperBadgeInRoom', variables);
    }
    refetchTransactionsHistory(variables: Types.TransactionsHistoryVariables, opts?: OperationParameters): Promise<Types.TransactionsHistory> {
        return this.refetch('TransactionsHistory', variables);
    }
    refetchUser(variables: Types.UserVariables, opts?: OperationParameters): Promise<Types.User> {
        return this.refetch('User', variables);
    }
    refetchUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: OperationParameters): Promise<Types.UserAvailableRooms> {
        return this.refetch('UserAvailableRooms', variables);
    }
    refetchUserPico(variables: Types.UserPicoVariables, opts?: OperationParameters): Promise<Types.UserPico> {
        return this.refetch('UserPico', variables);
    }
    refetchUserStorage(variables: Types.UserStorageVariables, opts?: OperationParameters): Promise<Types.UserStorage> {
        return this.refetch('UserStorage', variables);
    }
    refetchUsers(variables: Types.UsersVariables, opts?: OperationParameters): Promise<Types.Users> {
        return this.refetch('Users', variables);
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
    updateAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, updater: (data: Types.AuthResolveShortName) => Types.AuthResolveShortName | null): Promise<boolean> {
        return this.updateQuery(updater, 'AuthResolveShortName', variables);
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
    updateComments(variables: Types.CommentsVariables, updater: (data: Types.Comments) => Types.Comments | null): Promise<boolean> {
        return this.updateQuery(updater, 'Comments', variables);
    }
    updateConference(variables: Types.ConferenceVariables, updater: (data: Types.Conference) => Types.Conference | null): Promise<boolean> {
        return this.updateQuery(updater, 'Conference', variables);
    }
    updateConferenceMedia(variables: Types.ConferenceMediaVariables, updater: (data: Types.ConferenceMedia) => Types.ConferenceMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'ConferenceMedia', variables);
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
    updateDiscoverNextPage(variables: Types.DiscoverNextPageVariables, updater: (data: Types.DiscoverNextPage) => Types.DiscoverNextPage | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNextPage', variables);
    }
    updateDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, updater: (data: Types.DiscoverPopularNow) => Types.DiscoverPopularNow | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverPopularNow', variables);
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
    updateExploreRoomsNoAuth(variables: Types.ExploreRoomsNoAuthVariables, updater: (data: Types.ExploreRoomsNoAuth) => Types.ExploreRoomsNoAuth | null): Promise<boolean> {
        return this.updateQuery(updater, 'ExploreRoomsNoAuth', variables);
    }
    updateFeatureFlags(updater: (data: Types.FeatureFlags) => Types.FeatureFlags | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeatureFlags', undefined);
    }
    updateFeedChannel(variables: Types.FeedChannelVariables, updater: (data: Types.FeedChannel) => Types.FeedChannel | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannel', variables);
    }
    updateFeedChannelContent(variables: Types.FeedChannelContentVariables, updater: (data: Types.FeedChannelContent) => Types.FeedChannelContent | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannelContent', variables);
    }
    updateFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, updater: (data: Types.FeedChannelSubscribers) => Types.FeedChannelSubscribers | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannelSubscribers', variables);
    }
    updateFeedChannelWriters(variables: Types.FeedChannelWritersVariables, updater: (data: Types.FeedChannelWriters) => Types.FeedChannelWriters | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannelWriters', variables);
    }
    updateFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, updater: (data: Types.FeedChannelsSearch) => Types.FeedChannelsSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannelsSearch', variables);
    }
    updateFeedItem(variables: Types.FeedItemVariables, updater: (data: Types.FeedItem) => Types.FeedItem | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedItem', variables);
    }
    updateFeedLoadMore(variables: Types.FeedLoadMoreVariables, updater: (data: Types.FeedLoadMore) => Types.FeedLoadMore | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedLoadMore', variables);
    }
    updateFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, updater: (data: Types.FeedRecommendedChannels) => Types.FeedRecommendedChannels | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedRecommendedChannels', variables);
    }
    updateFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, updater: (data: Types.FeedSubscriptions) => Types.FeedSubscriptions | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedSubscriptions', variables);
    }
    updateFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, updater: (data: Types.FeedWritableChannels) => Types.FeedWritableChannels | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedWritableChannels', variables);
    }
    updateFetchPushSettings(updater: (data: Types.FetchPushSettings) => Types.FetchPushSettings | null): Promise<boolean> {
        return this.updateQuery(updater, 'FetchPushSettings', undefined);
    }
    updateGlobalCounter(updater: (data: Types.GlobalCounter) => Types.GlobalCounter | null): Promise<boolean> {
        return this.updateQuery(updater, 'GlobalCounter', undefined);
    }
    updateGlobalSearch(variables: Types.GlobalSearchVariables, updater: (data: Types.GlobalSearch) => Types.GlobalSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'GlobalSearch', variables);
    }
    updateInitFeed(variables: Types.InitFeedVariables, updater: (data: Types.InitFeed) => Types.InitFeed | null): Promise<boolean> {
        return this.updateQuery(updater, 'InitFeed', variables);
    }
    updateMatchmakingProfile(variables: Types.MatchmakingProfileVariables, updater: (data: Types.MatchmakingProfile) => Types.MatchmakingProfile | null): Promise<boolean> {
        return this.updateQuery(updater, 'MatchmakingProfile', variables);
    }
    updateMatchmakingRoom(variables: Types.MatchmakingRoomVariables, updater: (data: Types.MatchmakingRoom) => Types.MatchmakingRoom | null): Promise<boolean> {
        return this.updateQuery(updater, 'MatchmakingRoom', variables);
    }
    updateMessage(variables: Types.MessageVariables, updater: (data: Types.Message) => Types.Message | null): Promise<boolean> {
        return this.updateQuery(updater, 'Message', variables);
    }
    updateMessagesBatch(variables: Types.MessagesBatchVariables, updater: (data: Types.MessagesBatch) => Types.MessagesBatch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesBatch', variables);
    }
    updateMessagesSearch(variables: Types.MessagesSearchVariables, updater: (data: Types.MessagesSearch) => Types.MessagesSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesSearch', variables);
    }
    updateMyApps(updater: (data: Types.MyApps) => Types.MyApps | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyApps', undefined);
    }
    updateMyCards(updater: (data: Types.MyCards) => Types.MyCards | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyCards', undefined);
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
    updateOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, updater: (data: Types.OrganizationMembersShort) => Types.OrganizationMembersShort | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationMembersShort', variables);
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
    updateOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, updater: (data: Types.OrganizationWithoutMembers) => Types.OrganizationWithoutMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationWithoutMembers', variables);
    }
    updatePermissions(updater: (data: Types.Permissions) => Types.Permissions | null): Promise<boolean> {
        return this.updateQuery(updater, 'Permissions', undefined);
    }
    updatePicSharedMedia(variables: Types.PicSharedMediaVariables, updater: (data: Types.PicSharedMedia) => Types.PicSharedMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'PicSharedMedia', variables);
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
    updateSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, updater: (data: Types.SuperBadgeInRoom) => Types.SuperBadgeInRoom | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperBadgeInRoom', variables);
    }
    updateTransactionsHistory(variables: Types.TransactionsHistoryVariables, updater: (data: Types.TransactionsHistory) => Types.TransactionsHistory | null): Promise<boolean> {
        return this.updateQuery(updater, 'TransactionsHistory', variables);
    }
    updateUser(variables: Types.UserVariables, updater: (data: Types.User) => Types.User | null): Promise<boolean> {
        return this.updateQuery(updater, 'User', variables);
    }
    updateUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, updater: (data: Types.UserAvailableRooms) => Types.UserAvailableRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserAvailableRooms', variables);
    }
    updateUserPico(variables: Types.UserPicoVariables, updater: (data: Types.UserPico) => Types.UserPico | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserPico', variables);
    }
    updateUserStorage(variables: Types.UserStorageVariables, updater: (data: Types.UserStorage) => Types.UserStorage | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserStorage', variables);
    }
    updateUsers(variables: Types.UsersVariables, updater: (data: Types.Users) => Types.Users | null): Promise<boolean> {
        return this.updateQuery(updater, 'Users', variables);
    }
    useAccount(opts: SpaceQueryWatchParameters & { suspense: false }): Types.Account | null;
    useAccount(opts?: SpaceQueryWatchParameters): Types.Account;
    useAccount(opts?: SpaceQueryWatchParameters): Types.Account | null {
        return this.useQuery('Account', undefined, opts);
    }
    useAccountAppInvite(opts: SpaceQueryWatchParameters & { suspense: false }): Types.AccountAppInvite | null;
    useAccountAppInvite(opts?: SpaceQueryWatchParameters): Types.AccountAppInvite;
    useAccountAppInvite(opts?: SpaceQueryWatchParameters): Types.AccountAppInvite | null {
        return this.useQuery('AccountAppInvite', undefined, opts);
    }
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.AccountAppInviteInfo | null;
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.AccountAppInviteInfo;
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.AccountAppInviteInfo | null {
        return this.useQuery('AccountAppInviteInfo', variables, opts);
    }
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.AccountInviteInfo | null;
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.AccountInviteInfo;
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.AccountInviteInfo | null {
        return this.useQuery('AccountInviteInfo', variables, opts);
    }
    useAccountSettings(opts: SpaceQueryWatchParameters & { suspense: false }): Types.AccountSettings | null;
    useAccountSettings(opts?: SpaceQueryWatchParameters): Types.AccountSettings;
    useAccountSettings(opts?: SpaceQueryWatchParameters): Types.AccountSettings | null {
        return this.useQuery('AccountSettings', undefined, opts);
    }
    useAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.AuthResolveShortName | null;
    useAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, opts?: SpaceQueryWatchParameters): Types.AuthResolveShortName;
    useAuthResolveShortName(variables: Types.AuthResolveShortNameVariables, opts?: SpaceQueryWatchParameters): Types.AuthResolveShortName | null {
        return this.useQuery('AuthResolveShortName', variables, opts);
    }
    useChatInit(variables: Types.ChatInitVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ChatInit | null;
    useChatInit(variables: Types.ChatInitVariables, opts?: SpaceQueryWatchParameters): Types.ChatInit;
    useChatInit(variables: Types.ChatInitVariables, opts?: SpaceQueryWatchParameters): Types.ChatInit | null {
        return this.useQuery('ChatInit', variables, opts);
    }
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ChatInitFromUnread | null;
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: SpaceQueryWatchParameters): Types.ChatInitFromUnread;
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: SpaceQueryWatchParameters): Types.ChatInitFromUnread | null {
        return this.useQuery('ChatInitFromUnread', variables, opts);
    }
    useChatJoin(variables: Types.ChatJoinVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ChatJoin | null;
    useChatJoin(variables: Types.ChatJoinVariables, opts?: SpaceQueryWatchParameters): Types.ChatJoin;
    useChatJoin(variables: Types.ChatJoinVariables, opts?: SpaceQueryWatchParameters): Types.ChatJoin | null {
        return this.useQuery('ChatJoin', variables, opts);
    }
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ChatMentionSearch | null;
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: SpaceQueryWatchParameters): Types.ChatMentionSearch;
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: SpaceQueryWatchParameters): Types.ChatMentionSearch | null {
        return this.useQuery('ChatMentionSearch', variables, opts);
    }
    useComments(variables: Types.CommentsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Comments | null;
    useComments(variables: Types.CommentsVariables, opts?: SpaceQueryWatchParameters): Types.Comments;
    useComments(variables: Types.CommentsVariables, opts?: SpaceQueryWatchParameters): Types.Comments | null {
        return this.useQuery('Comments', variables, opts);
    }
    useConference(variables: Types.ConferenceVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Conference | null;
    useConference(variables: Types.ConferenceVariables, opts?: SpaceQueryWatchParameters): Types.Conference;
    useConference(variables: Types.ConferenceVariables, opts?: SpaceQueryWatchParameters): Types.Conference | null {
        return this.useQuery('Conference', variables, opts);
    }
    useConferenceMedia(variables: Types.ConferenceMediaVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ConferenceMedia | null;
    useConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: SpaceQueryWatchParameters): Types.ConferenceMedia;
    useConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: SpaceQueryWatchParameters): Types.ConferenceMedia | null {
        return this.useQuery('ConferenceMedia', variables, opts);
    }
    useDialogs(variables: Types.DialogsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Dialogs | null;
    useDialogs(variables: Types.DialogsVariables, opts?: SpaceQueryWatchParameters): Types.Dialogs;
    useDialogs(variables: Types.DialogsVariables, opts?: SpaceQueryWatchParameters): Types.Dialogs | null {
        return this.useQuery('Dialogs', variables, opts);
    }
    useDiscoverCollection(variables: Types.DiscoverCollectionVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollection | null;
    useDiscoverCollection(variables: Types.DiscoverCollectionVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverCollection;
    useDiscoverCollection(variables: Types.DiscoverCollectionVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverCollection | null {
        return this.useQuery('DiscoverCollection', variables, opts);
    }
    useDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollectionShort | null;
    useDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverCollectionShort;
    useDiscoverCollectionShort(variables: Types.DiscoverCollectionShortVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverCollectionShort | null {
        return this.useQuery('DiscoverCollectionShort', variables, opts);
    }
    useDiscoverCollections(variables: Types.DiscoverCollectionsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollections | null;
    useDiscoverCollections(variables: Types.DiscoverCollectionsVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverCollections;
    useDiscoverCollections(variables: Types.DiscoverCollectionsVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverCollections | null {
        return this.useQuery('DiscoverCollections', variables, opts);
    }
    useDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverCollectionsShort | null;
    useDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverCollectionsShort;
    useDiscoverCollectionsShort(variables: Types.DiscoverCollectionsShortVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverCollectionsShort | null {
        return this.useQuery('DiscoverCollectionsShort', variables, opts);
    }
    useDiscoverEditorsChoice(opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverEditorsChoice | null;
    useDiscoverEditorsChoice(opts?: SpaceQueryWatchParameters): Types.DiscoverEditorsChoice;
    useDiscoverEditorsChoice(opts?: SpaceQueryWatchParameters): Types.DiscoverEditorsChoice | null {
        return this.useQuery('DiscoverEditorsChoice', undefined, opts);
    }
    useDiscoverIsDone(opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverIsDone | null;
    useDiscoverIsDone(opts?: SpaceQueryWatchParameters): Types.DiscoverIsDone;
    useDiscoverIsDone(opts?: SpaceQueryWatchParameters): Types.DiscoverIsDone | null {
        return this.useQuery('DiscoverIsDone', undefined, opts);
    }
    useDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNewAndGrowing | null;
    useDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverNewAndGrowing;
    useDiscoverNewAndGrowing(variables: Types.DiscoverNewAndGrowingVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverNewAndGrowing | null {
        return this.useQuery('DiscoverNewAndGrowing', variables, opts);
    }
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNextPage | null;
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverNextPage;
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverNextPage | null {
        return this.useQuery('DiscoverNextPage', variables, opts);
    }
    useDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverPopularNow | null;
    useDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverPopularNow;
    useDiscoverPopularNow(variables: Types.DiscoverPopularNowVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverPopularNow | null {
        return this.useQuery('DiscoverPopularNow', variables, opts);
    }
    useDiscoverState(opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverState | null;
    useDiscoverState(opts?: SpaceQueryWatchParameters): Types.DiscoverState;
    useDiscoverState(opts?: SpaceQueryWatchParameters): Types.DiscoverState | null {
        return this.useQuery('DiscoverState', undefined, opts);
    }
    useDiscoverSuggestedRooms(opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverSuggestedRooms | null;
    useDiscoverSuggestedRooms(opts?: SpaceQueryWatchParameters): Types.DiscoverSuggestedRooms;
    useDiscoverSuggestedRooms(opts?: SpaceQueryWatchParameters): Types.DiscoverSuggestedRooms | null {
        return this.useQuery('DiscoverSuggestedRooms', undefined, opts);
    }
    useDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverTopFree | null;
    useDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverTopFree;
    useDiscoverTopFree(variables: Types.DiscoverTopFreeVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverTopFree | null {
        return this.useQuery('DiscoverTopFree', variables, opts);
    }
    useDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverTopPremium | null;
    useDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverTopPremium;
    useDiscoverTopPremium(variables: Types.DiscoverTopPremiumVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverTopPremium | null {
        return this.useQuery('DiscoverTopPremium', variables, opts);
    }
    useExplorePeople(variables: Types.ExplorePeopleVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ExplorePeople | null;
    useExplorePeople(variables: Types.ExplorePeopleVariables, opts?: SpaceQueryWatchParameters): Types.ExplorePeople;
    useExplorePeople(variables: Types.ExplorePeopleVariables, opts?: SpaceQueryWatchParameters): Types.ExplorePeople | null {
        return this.useQuery('ExplorePeople', variables, opts);
    }
    useExploreRooms(variables: Types.ExploreRoomsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ExploreRooms | null;
    useExploreRooms(variables: Types.ExploreRoomsVariables, opts?: SpaceQueryWatchParameters): Types.ExploreRooms;
    useExploreRooms(variables: Types.ExploreRoomsVariables, opts?: SpaceQueryWatchParameters): Types.ExploreRooms | null {
        return this.useQuery('ExploreRooms', variables, opts);
    }
    useExploreRoomsNoAuth(variables: Types.ExploreRoomsNoAuthVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ExploreRoomsNoAuth | null;
    useExploreRoomsNoAuth(variables: Types.ExploreRoomsNoAuthVariables, opts?: SpaceQueryWatchParameters): Types.ExploreRoomsNoAuth;
    useExploreRoomsNoAuth(variables: Types.ExploreRoomsNoAuthVariables, opts?: SpaceQueryWatchParameters): Types.ExploreRoomsNoAuth | null {
        return this.useQuery('ExploreRoomsNoAuth', variables, opts);
    }
    useFeatureFlags(opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeatureFlags | null;
    useFeatureFlags(opts?: SpaceQueryWatchParameters): Types.FeatureFlags;
    useFeatureFlags(opts?: SpaceQueryWatchParameters): Types.FeatureFlags | null {
        return this.useQuery('FeatureFlags', undefined, opts);
    }
    useFeedChannel(variables: Types.FeedChannelVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannel | null;
    useFeedChannel(variables: Types.FeedChannelVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannel;
    useFeedChannel(variables: Types.FeedChannelVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannel | null {
        return this.useQuery('FeedChannel', variables, opts);
    }
    useFeedChannelContent(variables: Types.FeedChannelContentVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannelContent | null;
    useFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelContent;
    useFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelContent | null {
        return this.useQuery('FeedChannelContent', variables, opts);
    }
    useFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannelSubscribers | null;
    useFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelSubscribers;
    useFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelSubscribers | null {
        return this.useQuery('FeedChannelSubscribers', variables, opts);
    }
    useFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannelWriters | null;
    useFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelWriters;
    useFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelWriters | null {
        return this.useQuery('FeedChannelWriters', variables, opts);
    }
    useFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannelsSearch | null;
    useFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelsSearch;
    useFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelsSearch | null {
        return this.useQuery('FeedChannelsSearch', variables, opts);
    }
    useFeedItem(variables: Types.FeedItemVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedItem | null;
    useFeedItem(variables: Types.FeedItemVariables, opts?: SpaceQueryWatchParameters): Types.FeedItem;
    useFeedItem(variables: Types.FeedItemVariables, opts?: SpaceQueryWatchParameters): Types.FeedItem | null {
        return this.useQuery('FeedItem', variables, opts);
    }
    useFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedLoadMore | null;
    useFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: SpaceQueryWatchParameters): Types.FeedLoadMore;
    useFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: SpaceQueryWatchParameters): Types.FeedLoadMore | null {
        return this.useQuery('FeedLoadMore', variables, opts);
    }
    useFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedRecommendedChannels | null;
    useFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: SpaceQueryWatchParameters): Types.FeedRecommendedChannels;
    useFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: SpaceQueryWatchParameters): Types.FeedRecommendedChannels | null {
        return this.useQuery('FeedRecommendedChannels', variables, opts);
    }
    useFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedSubscriptions | null;
    useFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, opts?: SpaceQueryWatchParameters): Types.FeedSubscriptions;
    useFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, opts?: SpaceQueryWatchParameters): Types.FeedSubscriptions | null {
        return this.useQuery('FeedSubscriptions', variables, opts);
    }
    useFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedWritableChannels | null;
    useFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, opts?: SpaceQueryWatchParameters): Types.FeedWritableChannels;
    useFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, opts?: SpaceQueryWatchParameters): Types.FeedWritableChannels | null {
        return this.useQuery('FeedWritableChannels', variables, opts);
    }
    useFetchPushSettings(opts: SpaceQueryWatchParameters & { suspense: false }): Types.FetchPushSettings | null;
    useFetchPushSettings(opts?: SpaceQueryWatchParameters): Types.FetchPushSettings;
    useFetchPushSettings(opts?: SpaceQueryWatchParameters): Types.FetchPushSettings | null {
        return this.useQuery('FetchPushSettings', undefined, opts);
    }
    useGlobalCounter(opts: SpaceQueryWatchParameters & { suspense: false }): Types.GlobalCounter | null;
    useGlobalCounter(opts?: SpaceQueryWatchParameters): Types.GlobalCounter;
    useGlobalCounter(opts?: SpaceQueryWatchParameters): Types.GlobalCounter | null {
        return this.useQuery('GlobalCounter', undefined, opts);
    }
    useGlobalSearch(variables: Types.GlobalSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.GlobalSearch | null;
    useGlobalSearch(variables: Types.GlobalSearchVariables, opts?: SpaceQueryWatchParameters): Types.GlobalSearch;
    useGlobalSearch(variables: Types.GlobalSearchVariables, opts?: SpaceQueryWatchParameters): Types.GlobalSearch | null {
        return this.useQuery('GlobalSearch', variables, opts);
    }
    useInitFeed(variables: Types.InitFeedVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.InitFeed | null;
    useInitFeed(variables: Types.InitFeedVariables, opts?: SpaceQueryWatchParameters): Types.InitFeed;
    useInitFeed(variables: Types.InitFeedVariables, opts?: SpaceQueryWatchParameters): Types.InitFeed | null {
        return this.useQuery('InitFeed', variables, opts);
    }
    useMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MatchmakingProfile | null;
    useMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: SpaceQueryWatchParameters): Types.MatchmakingProfile;
    useMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: SpaceQueryWatchParameters): Types.MatchmakingProfile | null {
        return this.useQuery('MatchmakingProfile', variables, opts);
    }
    useMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MatchmakingRoom | null;
    useMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: SpaceQueryWatchParameters): Types.MatchmakingRoom;
    useMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: SpaceQueryWatchParameters): Types.MatchmakingRoom | null {
        return this.useQuery('MatchmakingRoom', variables, opts);
    }
    useMessage(variables: Types.MessageVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Message | null;
    useMessage(variables: Types.MessageVariables, opts?: SpaceQueryWatchParameters): Types.Message;
    useMessage(variables: Types.MessageVariables, opts?: SpaceQueryWatchParameters): Types.Message | null {
        return this.useQuery('Message', variables, opts);
    }
    useMessagesBatch(variables: Types.MessagesBatchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesBatch | null;
    useMessagesBatch(variables: Types.MessagesBatchVariables, opts?: SpaceQueryWatchParameters): Types.MessagesBatch;
    useMessagesBatch(variables: Types.MessagesBatchVariables, opts?: SpaceQueryWatchParameters): Types.MessagesBatch | null {
        return this.useQuery('MessagesBatch', variables, opts);
    }
    useMessagesSearch(variables: Types.MessagesSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesSearch | null;
    useMessagesSearch(variables: Types.MessagesSearchVariables, opts?: SpaceQueryWatchParameters): Types.MessagesSearch;
    useMessagesSearch(variables: Types.MessagesSearchVariables, opts?: SpaceQueryWatchParameters): Types.MessagesSearch | null {
        return this.useQuery('MessagesSearch', variables, opts);
    }
    useMyApps(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyApps | null;
    useMyApps(opts?: SpaceQueryWatchParameters): Types.MyApps;
    useMyApps(opts?: SpaceQueryWatchParameters): Types.MyApps | null {
        return this.useQuery('MyApps', undefined, opts);
    }
    useMyCards(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyCards | null;
    useMyCards(opts?: SpaceQueryWatchParameters): Types.MyCards;
    useMyCards(opts?: SpaceQueryWatchParameters): Types.MyCards | null {
        return this.useQuery('MyCards', undefined, opts);
    }
    useMyNotificationCenter(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyNotificationCenter | null;
    useMyNotificationCenter(opts?: SpaceQueryWatchParameters): Types.MyNotificationCenter;
    useMyNotificationCenter(opts?: SpaceQueryWatchParameters): Types.MyNotificationCenter | null {
        return this.useQuery('MyNotificationCenter', undefined, opts);
    }
    useMyNotifications(variables: Types.MyNotificationsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyNotifications | null;
    useMyNotifications(variables: Types.MyNotificationsVariables, opts?: SpaceQueryWatchParameters): Types.MyNotifications;
    useMyNotifications(variables: Types.MyNotificationsVariables, opts?: SpaceQueryWatchParameters): Types.MyNotifications | null {
        return this.useQuery('MyNotifications', variables, opts);
    }
    useMyOrganizations(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyOrganizations | null;
    useMyOrganizations(opts?: SpaceQueryWatchParameters): Types.MyOrganizations;
    useMyOrganizations(opts?: SpaceQueryWatchParameters): Types.MyOrganizations | null {
        return this.useQuery('MyOrganizations', undefined, opts);
    }
    useMyStickers(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyStickers | null;
    useMyStickers(opts?: SpaceQueryWatchParameters): Types.MyStickers;
    useMyStickers(opts?: SpaceQueryWatchParameters): Types.MyStickers | null {
        return this.useQuery('MyStickers', undefined, opts);
    }
    useMySuccessfulInvitesCount(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MySuccessfulInvitesCount | null;
    useMySuccessfulInvitesCount(opts?: SpaceQueryWatchParameters): Types.MySuccessfulInvitesCount;
    useMySuccessfulInvitesCount(opts?: SpaceQueryWatchParameters): Types.MySuccessfulInvitesCount | null {
        return this.useQuery('MySuccessfulInvitesCount', undefined, opts);
    }
    useMyWallet(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyWallet | null;
    useMyWallet(opts?: SpaceQueryWatchParameters): Types.MyWallet;
    useMyWallet(opts?: SpaceQueryWatchParameters): Types.MyWallet | null {
        return this.useQuery('MyWallet', undefined, opts);
    }
    useOauthContext(variables: Types.OauthContextVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OauthContext | null;
    useOauthContext(variables: Types.OauthContextVariables, opts?: SpaceQueryWatchParameters): Types.OauthContext;
    useOauthContext(variables: Types.OauthContextVariables, opts?: SpaceQueryWatchParameters): Types.OauthContext | null {
        return this.useQuery('OauthContext', variables, opts);
    }
    useOnline(variables: Types.OnlineVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Online | null;
    useOnline(variables: Types.OnlineVariables, opts?: SpaceQueryWatchParameters): Types.Online;
    useOnline(variables: Types.OnlineVariables, opts?: SpaceQueryWatchParameters): Types.Online | null {
        return this.useQuery('Online', variables, opts);
    }
    useOrganization(variables: Types.OrganizationVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Organization | null;
    useOrganization(variables: Types.OrganizationVariables, opts?: SpaceQueryWatchParameters): Types.Organization;
    useOrganization(variables: Types.OrganizationVariables, opts?: SpaceQueryWatchParameters): Types.Organization | null {
        return this.useQuery('Organization', variables, opts);
    }
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationMembers | null;
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationMembers;
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationMembers | null {
        return this.useQuery('OrganizationMembers', variables, opts);
    }
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationMembersShort | null;
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationMembersShort;
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationMembersShort | null {
        return this.useQuery('OrganizationMembersShort', variables, opts);
    }
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationProfile | null;
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationProfile;
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationProfile | null {
        return this.useQuery('OrganizationProfile', variables, opts);
    }
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPublicInvite | null;
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationPublicInvite;
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationPublicInvite | null {
        return this.useQuery('OrganizationPublicInvite', variables, opts);
    }
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPublicRooms | null;
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationPublicRooms;
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationPublicRooms | null {
        return this.useQuery('OrganizationPublicRooms', variables, opts);
    }
    useOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationWithoutMembers | null;
    useOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationWithoutMembers;
    useOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationWithoutMembers | null {
        return this.useQuery('OrganizationWithoutMembers', variables, opts);
    }
    usePermissions(opts: SpaceQueryWatchParameters & { suspense: false }): Types.Permissions | null;
    usePermissions(opts?: SpaceQueryWatchParameters): Types.Permissions;
    usePermissions(opts?: SpaceQueryWatchParameters): Types.Permissions | null {
        return this.useQuery('Permissions', undefined, opts);
    }
    usePicSharedMedia(variables: Types.PicSharedMediaVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.PicSharedMedia | null;
    usePicSharedMedia(variables: Types.PicSharedMediaVariables, opts?: SpaceQueryWatchParameters): Types.PicSharedMedia;
    usePicSharedMedia(variables: Types.PicSharedMediaVariables, opts?: SpaceQueryWatchParameters): Types.PicSharedMedia | null {
        return this.useQuery('PicSharedMedia', variables, opts);
    }
    useProfile(opts: SpaceQueryWatchParameters & { suspense: false }): Types.Profile | null;
    useProfile(opts?: SpaceQueryWatchParameters): Types.Profile;
    useProfile(opts?: SpaceQueryWatchParameters): Types.Profile | null {
        return this.useQuery('Profile', undefined, opts);
    }
    useProfilePrefill(opts: SpaceQueryWatchParameters & { suspense: false }): Types.ProfilePrefill | null;
    useProfilePrefill(opts?: SpaceQueryWatchParameters): Types.ProfilePrefill;
    useProfilePrefill(opts?: SpaceQueryWatchParameters): Types.ProfilePrefill | null {
        return this.useQuery('ProfilePrefill', undefined, opts);
    }
    useResolveShortName(variables: Types.ResolveShortNameVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ResolveShortName | null;
    useResolveShortName(variables: Types.ResolveShortNameVariables, opts?: SpaceQueryWatchParameters): Types.ResolveShortName;
    useResolveShortName(variables: Types.ResolveShortNameVariables, opts?: SpaceQueryWatchParameters): Types.ResolveShortName | null {
        return this.useQuery('ResolveShortName', variables, opts);
    }
    useResolvedInvite(variables: Types.ResolvedInviteVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ResolvedInvite | null;
    useResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: SpaceQueryWatchParameters): Types.ResolvedInvite;
    useResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: SpaceQueryWatchParameters): Types.ResolvedInvite | null {
        return this.useQuery('ResolvedInvite', variables, opts);
    }
    useRoomAdminMembers(variables: Types.RoomAdminMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomAdminMembers | null;
    useRoomAdminMembers(variables: Types.RoomAdminMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomAdminMembers;
    useRoomAdminMembers(variables: Types.RoomAdminMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomAdminMembers | null {
        return this.useQuery('RoomAdminMembers', variables, opts);
    }
    useRoomChat(variables: Types.RoomChatVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomChat | null;
    useRoomChat(variables: Types.RoomChatVariables, opts?: SpaceQueryWatchParameters): Types.RoomChat;
    useRoomChat(variables: Types.RoomChatVariables, opts?: SpaceQueryWatchParameters): Types.RoomChat | null {
        return this.useQuery('RoomChat', variables, opts);
    }
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomFeaturedMembers | null;
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomFeaturedMembers;
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomFeaturedMembers | null {
        return this.useQuery('RoomFeaturedMembers', variables, opts);
    }
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomInviteInfo | null;
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.RoomInviteInfo;
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.RoomInviteInfo | null {
        return this.useQuery('RoomInviteInfo', variables, opts);
    }
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomInviteLink | null;
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: SpaceQueryWatchParameters): Types.RoomInviteLink;
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: SpaceQueryWatchParameters): Types.RoomInviteLink | null {
        return this.useQuery('RoomInviteLink', variables, opts);
    }
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersPaginated | null;
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersPaginated;
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersPaginated | null {
        return this.useQuery('RoomMembersPaginated', variables, opts);
    }
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersShort | null;
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersShort;
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersShort | null {
        return this.useQuery('RoomMembersShort', variables, opts);
    }
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersTiny | null;
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersTiny;
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersTiny | null {
        return this.useQuery('RoomMembersTiny', variables, opts);
    }
    useRoomPico(variables: Types.RoomPicoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomPico | null;
    useRoomPico(variables: Types.RoomPicoVariables, opts?: SpaceQueryWatchParameters): Types.RoomPico;
    useRoomPico(variables: Types.RoomPicoVariables, opts?: SpaceQueryWatchParameters): Types.RoomPico | null {
        return this.useQuery('RoomPico', variables, opts);
    }
    useRoomSearch(variables: Types.RoomSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSearch | null;
    useRoomSearch(variables: Types.RoomSearchVariables, opts?: SpaceQueryWatchParameters): Types.RoomSearch;
    useRoomSearch(variables: Types.RoomSearchVariables, opts?: SpaceQueryWatchParameters): Types.RoomSearch | null {
        return this.useQuery('RoomSearch', variables, opts);
    }
    useRoomSocialImage(variables: Types.RoomSocialImageVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSocialImage | null;
    useRoomSocialImage(variables: Types.RoomSocialImageVariables, opts?: SpaceQueryWatchParameters): Types.RoomSocialImage;
    useRoomSocialImage(variables: Types.RoomSocialImageVariables, opts?: SpaceQueryWatchParameters): Types.RoomSocialImage | null {
        return this.useQuery('RoomSocialImage', variables, opts);
    }
    useRoomTiny(variables: Types.RoomTinyVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomTiny | null;
    useRoomTiny(variables: Types.RoomTinyVariables, opts?: SpaceQueryWatchParameters): Types.RoomTiny;
    useRoomTiny(variables: Types.RoomTinyVariables, opts?: SpaceQueryWatchParameters): Types.RoomTiny | null {
        return this.useQuery('RoomTiny', variables, opts);
    }
    useSettings(opts: SpaceQueryWatchParameters & { suspense: false }): Types.Settings | null;
    useSettings(opts?: SpaceQueryWatchParameters): Types.Settings;
    useSettings(opts?: SpaceQueryWatchParameters): Types.Settings | null {
        return this.useQuery('Settings', undefined, opts);
    }
    useSharedMedia(variables: Types.SharedMediaVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.SharedMedia | null;
    useSharedMedia(variables: Types.SharedMediaVariables, opts?: SpaceQueryWatchParameters): Types.SharedMedia;
    useSharedMedia(variables: Types.SharedMediaVariables, opts?: SpaceQueryWatchParameters): Types.SharedMedia | null {
        return this.useQuery('SharedMedia', variables, opts);
    }
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.SharedMediaCounters | null;
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, opts?: SpaceQueryWatchParameters): Types.SharedMediaCounters;
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, opts?: SpaceQueryWatchParameters): Types.SharedMediaCounters | null {
        return this.useQuery('SharedMediaCounters', variables, opts);
    }
    useStickerPack(variables: Types.StickerPackVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.StickerPack | null;
    useStickerPack(variables: Types.StickerPackVariables, opts?: SpaceQueryWatchParameters): Types.StickerPack;
    useStickerPack(variables: Types.StickerPackVariables, opts?: SpaceQueryWatchParameters): Types.StickerPack | null {
        return this.useQuery('StickerPack', variables, opts);
    }
    useStickerPackCatalog(opts: SpaceQueryWatchParameters & { suspense: false }): Types.StickerPackCatalog | null;
    useStickerPackCatalog(opts?: SpaceQueryWatchParameters): Types.StickerPackCatalog;
    useStickerPackCatalog(opts?: SpaceQueryWatchParameters): Types.StickerPackCatalog | null {
        return this.useQuery('StickerPackCatalog', undefined, opts);
    }
    useStripeToken(opts: SpaceQueryWatchParameters & { suspense: false }): Types.StripeToken | null;
    useStripeToken(opts?: SpaceQueryWatchParameters): Types.StripeToken;
    useStripeToken(opts?: SpaceQueryWatchParameters): Types.StripeToken | null {
        return this.useQuery('StripeToken', undefined, opts);
    }
    useSubscriptions(opts: SpaceQueryWatchParameters & { suspense: false }): Types.Subscriptions | null;
    useSubscriptions(opts?: SpaceQueryWatchParameters): Types.Subscriptions;
    useSubscriptions(opts?: SpaceQueryWatchParameters): Types.Subscriptions | null {
        return this.useQuery('Subscriptions', undefined, opts);
    }
    useSuggestedRooms(opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuggestedRooms | null;
    useSuggestedRooms(opts?: SpaceQueryWatchParameters): Types.SuggestedRooms;
    useSuggestedRooms(opts?: SpaceQueryWatchParameters): Types.SuggestedRooms | null {
        return this.useQuery('SuggestedRooms', undefined, opts);
    }
    useSuperAccount(variables: Types.SuperAccountVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAccount | null;
    useSuperAccount(variables: Types.SuperAccountVariables, opts?: SpaceQueryWatchParameters): Types.SuperAccount;
    useSuperAccount(variables: Types.SuperAccountVariables, opts?: SpaceQueryWatchParameters): Types.SuperAccount | null {
        return this.useQuery('SuperAccount', variables, opts);
    }
    useSuperAccounts(opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAccounts | null;
    useSuperAccounts(opts?: SpaceQueryWatchParameters): Types.SuperAccounts;
    useSuperAccounts(opts?: SpaceQueryWatchParameters): Types.SuperAccounts | null {
        return this.useQuery('SuperAccounts', undefined, opts);
    }
    useSuperAdmins(opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAdmins | null;
    useSuperAdmins(opts?: SpaceQueryWatchParameters): Types.SuperAdmins;
    useSuperAdmins(opts?: SpaceQueryWatchParameters): Types.SuperAdmins | null {
        return this.useQuery('SuperAdmins', undefined, opts);
    }
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuperBadgeInRoom | null;
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: SpaceQueryWatchParameters): Types.SuperBadgeInRoom;
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: SpaceQueryWatchParameters): Types.SuperBadgeInRoom | null {
        return this.useQuery('SuperBadgeInRoom', variables, opts);
    }
    useTransactionsHistory(variables: Types.TransactionsHistoryVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.TransactionsHistory | null;
    useTransactionsHistory(variables: Types.TransactionsHistoryVariables, opts?: SpaceQueryWatchParameters): Types.TransactionsHistory;
    useTransactionsHistory(variables: Types.TransactionsHistoryVariables, opts?: SpaceQueryWatchParameters): Types.TransactionsHistory | null {
        return this.useQuery('TransactionsHistory', variables, opts);
    }
    useUser(variables: Types.UserVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.User | null;
    useUser(variables: Types.UserVariables, opts?: SpaceQueryWatchParameters): Types.User;
    useUser(variables: Types.UserVariables, opts?: SpaceQueryWatchParameters): Types.User | null {
        return this.useQuery('User', variables, opts);
    }
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.UserAvailableRooms | null;
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: SpaceQueryWatchParameters): Types.UserAvailableRooms;
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: SpaceQueryWatchParameters): Types.UserAvailableRooms | null {
        return this.useQuery('UserAvailableRooms', variables, opts);
    }
    useUserPico(variables: Types.UserPicoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.UserPico | null;
    useUserPico(variables: Types.UserPicoVariables, opts?: SpaceQueryWatchParameters): Types.UserPico;
    useUserPico(variables: Types.UserPicoVariables, opts?: SpaceQueryWatchParameters): Types.UserPico | null {
        return this.useQuery('UserPico', variables, opts);
    }
    useUserStorage(variables: Types.UserStorageVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.UserStorage | null;
    useUserStorage(variables: Types.UserStorageVariables, opts?: SpaceQueryWatchParameters): Types.UserStorage;
    useUserStorage(variables: Types.UserStorageVariables, opts?: SpaceQueryWatchParameters): Types.UserStorage | null {
        return this.useQuery('UserStorage', variables, opts);
    }
    useUsers(variables: Types.UsersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Users | null;
    useUsers(variables: Types.UsersVariables, opts?: SpaceQueryWatchParameters): Types.Users;
    useUsers(variables: Types.UsersVariables, opts?: SpaceQueryWatchParameters): Types.Users | null {
        return this.useQuery('Users', variables, opts);
    }
    mutateAccountInviteJoin(variables: Types.AccountInviteJoinVariables): Promise<Types.AccountInviteJoin> {
        return this.mutate('AccountInviteJoin', variables);
    }
    mutateAddAppToChat(variables: Types.AddAppToChatVariables): Promise<Types.AddAppToChat> {
        return this.mutate('AddAppToChat', variables);
    }
    mutateAddComment(variables: Types.AddCommentVariables): Promise<Types.AddComment> {
        return this.mutate('AddComment', variables);
    }
    mutateAddStickerComment(variables: Types.AddStickerCommentVariables): Promise<Types.AddStickerComment> {
        return this.mutate('AddStickerComment', variables);
    }
    mutateBetaDiscoverSkip(variables: Types.BetaDiscoverSkipVariables): Promise<Types.BetaDiscoverSkip> {
        return this.mutate('BetaDiscoverSkip', variables);
    }
    mutateBetaNextDiscoverReset(): Promise<Types.BetaNextDiscoverReset> {
        return this.mutate('BetaNextDiscoverReset');
    }
    mutateBetaSubmitNextDiscover(variables: Types.BetaSubmitNextDiscoverVariables): Promise<Types.BetaSubmitNextDiscover> {
        return this.mutate('BetaSubmitNextDiscover', variables);
    }
    mutateBuyPremiumChatPass(variables: Types.BuyPremiumChatPassVariables): Promise<Types.BuyPremiumChatPass> {
        return this.mutate('BuyPremiumChatPass', variables);
    }
    mutateBuyPremiumChatSubscription(variables: Types.BuyPremiumChatSubscriptionVariables): Promise<Types.BuyPremiumChatSubscription> {
        return this.mutate('BuyPremiumChatSubscription', variables);
    }
    mutateCancelSubscription(variables: Types.CancelSubscriptionVariables): Promise<Types.CancelSubscription> {
        return this.mutate('CancelSubscription', variables);
    }
    mutateCommentSetReaction(variables: Types.CommentSetReactionVariables): Promise<Types.CommentSetReaction> {
        return this.mutate('CommentSetReaction', variables);
    }
    mutateCommentUnsetReaction(variables: Types.CommentUnsetReactionVariables): Promise<Types.CommentUnsetReaction> {
        return this.mutate('CommentUnsetReaction', variables);
    }
    mutateCommitCardSetupIntent(variables: Types.CommitCardSetupIntentVariables): Promise<Types.CommitCardSetupIntent> {
        return this.mutate('CommitCardSetupIntent', variables);
    }
    mutateConferenceAnswer(variables: Types.ConferenceAnswerVariables): Promise<Types.ConferenceAnswer> {
        return this.mutate('ConferenceAnswer', variables);
    }
    mutateConferenceCandidate(variables: Types.ConferenceCandidateVariables): Promise<Types.ConferenceCandidate> {
        return this.mutate('ConferenceCandidate', variables);
    }
    mutateConferenceJoin(variables: Types.ConferenceJoinVariables): Promise<Types.ConferenceJoin> {
        return this.mutate('ConferenceJoin', variables);
    }
    mutateConferenceKeepAlive(variables: Types.ConferenceKeepAliveVariables): Promise<Types.ConferenceKeepAlive> {
        return this.mutate('ConferenceKeepAlive', variables);
    }
    mutateConferenceLeave(variables: Types.ConferenceLeaveVariables): Promise<Types.ConferenceLeave> {
        return this.mutate('ConferenceLeave', variables);
    }
    mutateConferenceOffer(variables: Types.ConferenceOfferVariables): Promise<Types.ConferenceOffer> {
        return this.mutate('ConferenceOffer', variables);
    }
    mutateCreateApp(variables: Types.CreateAppVariables): Promise<Types.CreateApp> {
        return this.mutate('CreateApp', variables);
    }
    mutateCreateCardSetupIntent(variables: Types.CreateCardSetupIntentVariables): Promise<Types.CreateCardSetupIntent> {
        return this.mutate('CreateCardSetupIntent', variables);
    }
    mutateCreateDepositIntent(variables: Types.CreateDepositIntentVariables): Promise<Types.CreateDepositIntent> {
        return this.mutate('CreateDepositIntent', variables);
    }
    mutateCreateOrganization(variables: Types.CreateOrganizationVariables): Promise<Types.CreateOrganization> {
        return this.mutate('CreateOrganization', variables);
    }
    mutateDebugMails(variables: Types.DebugMailsVariables): Promise<Types.DebugMails> {
        return this.mutate('DebugMails', variables);
    }
    mutateDeleteComment(variables: Types.DeleteCommentVariables): Promise<Types.DeleteComment> {
        return this.mutate('DeleteComment', variables);
    }
    mutateDeleteNotification(variables: Types.DeleteNotificationVariables): Promise<Types.DeleteNotification> {
        return this.mutate('DeleteNotification', variables);
    }
    mutateDeleteOrganization(variables: Types.DeleteOrganizationVariables): Promise<Types.DeleteOrganization> {
        return this.mutate('DeleteOrganization', variables);
    }
    mutateDeleteUser(variables: Types.DeleteUserVariables): Promise<Types.DeleteUser> {
        return this.mutate('DeleteUser', variables);
    }
    mutateDiscoverCollectionSetShortname(variables: Types.DiscoverCollectionSetShortnameVariables): Promise<Types.DiscoverCollectionSetShortname> {
        return this.mutate('DiscoverCollectionSetShortname', variables);
    }
    mutateDiscoverCollectionsCreate(variables: Types.DiscoverCollectionsCreateVariables): Promise<Types.DiscoverCollectionsCreate> {
        return this.mutate('DiscoverCollectionsCreate', variables);
    }
    mutateDiscoverCollectionsDelete(variables: Types.DiscoverCollectionsDeleteVariables): Promise<Types.DiscoverCollectionsDelete> {
        return this.mutate('DiscoverCollectionsDelete', variables);
    }
    mutateDiscoverCollectionsUpdate(variables: Types.DiscoverCollectionsUpdateVariables): Promise<Types.DiscoverCollectionsUpdate> {
        return this.mutate('DiscoverCollectionsUpdate', variables);
    }
    mutateDiscoverEditorsChoiceCreate(variables: Types.DiscoverEditorsChoiceCreateVariables): Promise<Types.DiscoverEditorsChoiceCreate> {
        return this.mutate('DiscoverEditorsChoiceCreate', variables);
    }
    mutateDiscoverEditorsChoiceDelete(variables: Types.DiscoverEditorsChoiceDeleteVariables): Promise<Types.DiscoverEditorsChoiceDelete> {
        return this.mutate('DiscoverEditorsChoiceDelete', variables);
    }
    mutateDiscoverEditorsChoiceUpdate(variables: Types.DiscoverEditorsChoiceUpdateVariables): Promise<Types.DiscoverEditorsChoiceUpdate> {
        return this.mutate('DiscoverEditorsChoiceUpdate', variables);
    }
    mutateEditComment(variables: Types.EditCommentVariables): Promise<Types.EditComment> {
        return this.mutate('EditComment', variables);
    }
    mutateEditMessage(variables: Types.EditMessageVariables): Promise<Types.EditMessage> {
        return this.mutate('EditMessage', variables);
    }
    mutateFeatureFlagAdd(variables: Types.FeatureFlagAddVariables): Promise<Types.FeatureFlagAdd> {
        return this.mutate('FeatureFlagAdd', variables);
    }
    mutateFeatureFlagDisable(variables: Types.FeatureFlagDisableVariables): Promise<Types.FeatureFlagDisable> {
        return this.mutate('FeatureFlagDisable', variables);
    }
    mutateFeatureFlagEnable(variables: Types.FeatureFlagEnableVariables): Promise<Types.FeatureFlagEnable> {
        return this.mutate('FeatureFlagEnable', variables);
    }
    mutateFeedChannelAddWriter(variables: Types.FeedChannelAddWriterVariables): Promise<Types.FeedChannelAddWriter> {
        return this.mutate('FeedChannelAddWriter', variables);
    }
    mutateFeedChannelCreate(variables: Types.FeedChannelCreateVariables): Promise<Types.FeedChannelCreate> {
        return this.mutate('FeedChannelCreate', variables);
    }
    mutateFeedChannelRemoveWriter(variables: Types.FeedChannelRemoveWriterVariables): Promise<Types.FeedChannelRemoveWriter> {
        return this.mutate('FeedChannelRemoveWriter', variables);
    }
    mutateFeedChannelSubscribe(variables: Types.FeedChannelSubscribeVariables): Promise<Types.FeedChannelSubscribe> {
        return this.mutate('FeedChannelSubscribe', variables);
    }
    mutateFeedChannelUnsubscribe(variables: Types.FeedChannelUnsubscribeVariables): Promise<Types.FeedChannelUnsubscribe> {
        return this.mutate('FeedChannelUnsubscribe', variables);
    }
    mutateFeedChannelUpdate(variables: Types.FeedChannelUpdateVariables): Promise<Types.FeedChannelUpdate> {
        return this.mutate('FeedChannelUpdate', variables);
    }
    mutateFeedCreatePost(variables: Types.FeedCreatePostVariables): Promise<Types.FeedCreatePost> {
        return this.mutate('FeedCreatePost', variables);
    }
    mutateFeedDeletePost(variables: Types.FeedDeletePostVariables): Promise<Types.FeedDeletePost> {
        return this.mutate('FeedDeletePost', variables);
    }
    mutateFeedEditPost(variables: Types.FeedEditPostVariables): Promise<Types.FeedEditPost> {
        return this.mutate('FeedEditPost', variables);
    }
    mutateFeedReactionAdd(variables: Types.FeedReactionAddVariables): Promise<Types.FeedReactionAdd> {
        return this.mutate('FeedReactionAdd', variables);
    }
    mutateFeedReactionRemove(variables: Types.FeedReactionRemoveVariables): Promise<Types.FeedReactionRemove> {
        return this.mutate('FeedReactionRemove', variables);
    }
    mutateMakeCardDefault(variables: Types.MakeCardDefaultVariables): Promise<Types.MakeCardDefault> {
        return this.mutate('MakeCardDefault', variables);
    }
    mutateMarkSequenceRead(variables: Types.MarkSequenceReadVariables): Promise<Types.MarkSequenceRead> {
        return this.mutate('MarkSequenceRead', variables);
    }
    mutateMatchmakingConnect(variables: Types.MatchmakingConnectVariables): Promise<Types.MatchmakingConnect> {
        return this.mutate('MatchmakingConnect', variables);
    }
    mutateMatchmakingProfileFill(variables: Types.MatchmakingProfileFillVariables): Promise<Types.MatchmakingProfileFill> {
        return this.mutate('MatchmakingProfileFill', variables);
    }
    mutateMatchmakingRoomSave(variables: Types.MatchmakingRoomSaveVariables): Promise<Types.MatchmakingRoomSave> {
        return this.mutate('MatchmakingRoomSave', variables);
    }
    mutateMediaAnswer(variables: Types.MediaAnswerVariables): Promise<Types.MediaAnswer> {
        return this.mutate('MediaAnswer', variables);
    }
    mutateMediaCandidate(variables: Types.MediaCandidateVariables): Promise<Types.MediaCandidate> {
        return this.mutate('MediaCandidate', variables);
    }
    mutateMediaFailed(variables: Types.MediaFailedVariables): Promise<Types.MediaFailed> {
        return this.mutate('MediaFailed', variables);
    }
    mutateMediaNegotiationNeeded(variables: Types.MediaNegotiationNeededVariables): Promise<Types.MediaNegotiationNeeded> {
        return this.mutate('MediaNegotiationNeeded', variables);
    }
    mutateMediaOffer(variables: Types.MediaOfferVariables): Promise<Types.MediaOffer> {
        return this.mutate('MediaOffer', variables);
    }
    mutateMessageSetDonationReaction(variables: Types.MessageSetDonationReactionVariables): Promise<Types.MessageSetDonationReaction> {
        return this.mutate('MessageSetDonationReaction', variables);
    }
    mutateMessageSetReaction(variables: Types.MessageSetReactionVariables): Promise<Types.MessageSetReaction> {
        return this.mutate('MessageSetReaction', variables);
    }
    mutateMessageUnsetReaction(variables: Types.MessageUnsetReactionVariables): Promise<Types.MessageUnsetReaction> {
        return this.mutate('MessageUnsetReaction', variables);
    }
    mutateMyNotificationCenterMarkSeqRead(variables: Types.MyNotificationCenterMarkSeqReadVariables): Promise<Types.MyNotificationCenterMarkSeqRead> {
        return this.mutate('MyNotificationCenterMarkSeqRead', variables);
    }
    mutateOrganizationActivateByInvite(variables: Types.OrganizationActivateByInviteVariables): Promise<Types.OrganizationActivateByInvite> {
        return this.mutate('OrganizationActivateByInvite', variables);
    }
    mutateOrganizationAddMember(variables: Types.OrganizationAddMemberVariables): Promise<Types.OrganizationAddMember> {
        return this.mutate('OrganizationAddMember', variables);
    }
    mutateOrganizationChangeMemberRole(variables: Types.OrganizationChangeMemberRoleVariables): Promise<Types.OrganizationChangeMemberRole> {
        return this.mutate('OrganizationChangeMemberRole', variables);
    }
    mutateOrganizationCreatePublicInvite(variables: Types.OrganizationCreatePublicInviteVariables): Promise<Types.OrganizationCreatePublicInvite> {
        return this.mutate('OrganizationCreatePublicInvite', variables);
    }
    mutateOrganizationMemberRemove(variables: Types.OrganizationMemberRemoveVariables): Promise<Types.OrganizationMemberRemove> {
        return this.mutate('OrganizationMemberRemove', variables);
    }
    mutatePaymentIntentCancel(variables: Types.PaymentIntentCancelVariables): Promise<Types.PaymentIntentCancel> {
        return this.mutate('PaymentIntentCancel', variables);
    }
    mutatePaymentIntentCommit(variables: Types.PaymentIntentCommitVariables): Promise<Types.PaymentIntentCommit> {
        return this.mutate('PaymentIntentCommit', variables);
    }
    mutatePersistEvents(variables: Types.PersistEventsVariables): Promise<Types.PersistEvents> {
        return this.mutate('PersistEvents', variables);
    }
    mutatePinMessage(variables: Types.PinMessageVariables): Promise<Types.PinMessage> {
        return this.mutate('PinMessage', variables);
    }
    mutateProfileCreate(variables: Types.ProfileCreateVariables): Promise<Types.ProfileCreate> {
        return this.mutate('ProfileCreate', variables);
    }
    mutateProfileUpdate(variables: Types.ProfileUpdateVariables): Promise<Types.ProfileUpdate> {
        return this.mutate('ProfileUpdate', variables);
    }
    mutateReadNotification(variables: Types.ReadNotificationVariables): Promise<Types.ReadNotification> {
        return this.mutate('ReadNotification', variables);
    }
    mutateRefreshAppToken(variables: Types.RefreshAppTokenVariables): Promise<Types.RefreshAppToken> {
        return this.mutate('RefreshAppToken', variables);
    }
    mutateRegisterPush(variables: Types.RegisterPushVariables): Promise<Types.RegisterPush> {
        return this.mutate('RegisterPush', variables);
    }
    mutateRegisterWebPush(variables: Types.RegisterWebPushVariables): Promise<Types.RegisterWebPush> {
        return this.mutate('RegisterWebPush', variables);
    }
    mutateRemoveCard(variables: Types.RemoveCardVariables): Promise<Types.RemoveCard> {
        return this.mutate('RemoveCard', variables);
    }
    mutateReportContent(variables: Types.ReportContentVariables): Promise<Types.ReportContent> {
        return this.mutate('ReportContent', variables);
    }
    mutateReportOnline(variables: Types.ReportOnlineVariables): Promise<Types.ReportOnline> {
        return this.mutate('ReportOnline', variables);
    }
    mutateRoomAddMembers(variables: Types.RoomAddMembersVariables): Promise<Types.RoomAddMembers> {
        return this.mutate('RoomAddMembers', variables);
    }
    mutateRoomChangeRole(variables: Types.RoomChangeRoleVariables): Promise<Types.RoomChangeRole> {
        return this.mutate('RoomChangeRole', variables);
    }
    mutateRoomCreate(variables: Types.RoomCreateVariables): Promise<Types.RoomCreate> {
        return this.mutate('RoomCreate', variables);
    }
    mutateRoomDeleteMessage(variables: Types.RoomDeleteMessageVariables): Promise<Types.RoomDeleteMessage> {
        return this.mutate('RoomDeleteMessage', variables);
    }
    mutateRoomDeleteMessages(variables: Types.RoomDeleteMessagesVariables): Promise<Types.RoomDeleteMessages> {
        return this.mutate('RoomDeleteMessages', variables);
    }
    mutateRoomDeleteUrlAugmentation(variables: Types.RoomDeleteUrlAugmentationVariables): Promise<Types.RoomDeleteUrlAugmentation> {
        return this.mutate('RoomDeleteUrlAugmentation', variables);
    }
    mutateRoomJoin(variables: Types.RoomJoinVariables): Promise<Types.RoomJoin> {
        return this.mutate('RoomJoin', variables);
    }
    mutateRoomJoinInviteLink(variables: Types.RoomJoinInviteLinkVariables): Promise<Types.RoomJoinInviteLink> {
        return this.mutate('RoomJoinInviteLink', variables);
    }
    mutateRoomKick(variables: Types.RoomKickVariables): Promise<Types.RoomKick> {
        return this.mutate('RoomKick', variables);
    }
    mutateRoomLeave(variables: Types.RoomLeaveVariables): Promise<Types.RoomLeave> {
        return this.mutate('RoomLeave', variables);
    }
    mutateRoomRead(variables: Types.RoomReadVariables): Promise<Types.RoomRead> {
        return this.mutate('RoomRead', variables);
    }
    mutateRoomRenewInviteLink(variables: Types.RoomRenewInviteLinkVariables): Promise<Types.RoomRenewInviteLink> {
        return this.mutate('RoomRenewInviteLink', variables);
    }
    mutateRoomSettingsUpdate(variables: Types.RoomSettingsUpdateVariables): Promise<Types.RoomSettingsUpdate> {
        return this.mutate('RoomSettingsUpdate', variables);
    }
    mutateRoomUpdate(variables: Types.RoomUpdateVariables): Promise<Types.RoomUpdate> {
        return this.mutate('RoomUpdate', variables);
    }
    mutateRoomsInviteUser(variables: Types.RoomsInviteUserVariables): Promise<Types.RoomsInviteUser> {
        return this.mutate('RoomsInviteUser', variables);
    }
    mutateRoomsJoin(variables: Types.RoomsJoinVariables): Promise<Types.RoomsJoin> {
        return this.mutate('RoomsJoin', variables);
    }
    mutateSendDonation(variables: Types.SendDonationVariables): Promise<Types.SendDonation> {
        return this.mutate('SendDonation', variables);
    }
    mutateSendMessage(variables: Types.SendMessageVariables): Promise<Types.SendMessage> {
        return this.mutate('SendMessage', variables);
    }
    mutateSendSticker(variables: Types.SendStickerVariables): Promise<Types.SendSticker> {
        return this.mutate('SendSticker', variables);
    }
    mutateSetFeedChannelShortname(variables: Types.SetFeedChannelShortnameVariables): Promise<Types.SetFeedChannelShortname> {
        return this.mutate('SetFeedChannelShortname', variables);
    }
    mutateSetOrgShortname(variables: Types.SetOrgShortnameVariables): Promise<Types.SetOrgShortname> {
        return this.mutate('SetOrgShortname', variables);
    }
    mutateSetRoomShortname(variables: Types.SetRoomShortnameVariables): Promise<Types.SetRoomShortname> {
        return this.mutate('SetRoomShortname', variables);
    }
    mutateSetTyping(variables: Types.SetTypingVariables): Promise<Types.SetTyping> {
        return this.mutate('SetTyping', variables);
    }
    mutateSetUserShortname(variables: Types.SetUserShortnameVariables): Promise<Types.SetUserShortname> {
        return this.mutate('SetUserShortname', variables);
    }
    mutateSettingsUpdate(variables: Types.SettingsUpdateVariables): Promise<Types.SettingsUpdate> {
        return this.mutate('SettingsUpdate', variables);
    }
    mutateStickerPackAddToCollection(variables: Types.StickerPackAddToCollectionVariables): Promise<Types.StickerPackAddToCollection> {
        return this.mutate('StickerPackAddToCollection', variables);
    }
    mutateStickerPackRemoveFromCollection(variables: Types.StickerPackRemoveFromCollectionVariables): Promise<Types.StickerPackRemoveFromCollection> {
        return this.mutate('StickerPackRemoveFromCollection', variables);
    }
    mutateSubscribeToComments(variables: Types.SubscribeToCommentsVariables): Promise<Types.SubscribeToComments> {
        return this.mutate('SubscribeToComments', variables);
    }
    mutateSuperAccountActivate(variables: Types.SuperAccountActivateVariables): Promise<Types.SuperAccountActivate> {
        return this.mutate('SuperAccountActivate', variables);
    }
    mutateSuperAccountAdd(variables: Types.SuperAccountAddVariables): Promise<Types.SuperAccountAdd> {
        return this.mutate('SuperAccountAdd', variables);
    }
    mutateSuperAccountMemberAdd(variables: Types.SuperAccountMemberAddVariables): Promise<Types.SuperAccountMemberAdd> {
        return this.mutate('SuperAccountMemberAdd', variables);
    }
    mutateSuperAccountMemberRemove(variables: Types.SuperAccountMemberRemoveVariables): Promise<Types.SuperAccountMemberRemove> {
        return this.mutate('SuperAccountMemberRemove', variables);
    }
    mutateSuperAccountPend(variables: Types.SuperAccountPendVariables): Promise<Types.SuperAccountPend> {
        return this.mutate('SuperAccountPend', variables);
    }
    mutateSuperAccountRename(variables: Types.SuperAccountRenameVariables): Promise<Types.SuperAccountRename> {
        return this.mutate('SuperAccountRename', variables);
    }
    mutateSuperAccountSuspend(variables: Types.SuperAccountSuspendVariables): Promise<Types.SuperAccountSuspend> {
        return this.mutate('SuperAccountSuspend', variables);
    }
    mutateSuperAdminAdd(variables: Types.SuperAdminAddVariables): Promise<Types.SuperAdminAdd> {
        return this.mutate('SuperAdminAdd', variables);
    }
    mutateSuperAdminRemove(variables: Types.SuperAdminRemoveVariables): Promise<Types.SuperAdminRemove> {
        return this.mutate('SuperAdminRemove', variables);
    }
    mutateSuperBadgeCreateToRoom(variables: Types.SuperBadgeCreateToRoomVariables): Promise<Types.SuperBadgeCreateToRoom> {
        return this.mutate('SuperBadgeCreateToRoom', variables);
    }
    mutateSuperBadgeUnsetToRoom(variables: Types.SuperBadgeUnsetToRoomVariables): Promise<Types.SuperBadgeUnsetToRoom> {
        return this.mutate('SuperBadgeUnsetToRoom', variables);
    }
    mutateUnSubscribeFromComments(variables: Types.UnSubscribeFromCommentsVariables): Promise<Types.UnSubscribeFromComments> {
        return this.mutate('UnSubscribeFromComments', variables);
    }
    mutateUnpinMessage(variables: Types.UnpinMessageVariables): Promise<Types.UnpinMessage> {
        return this.mutate('UnpinMessage', variables);
    }
    mutateUnsetTyping(variables: Types.UnsetTypingVariables): Promise<Types.UnsetTyping> {
        return this.mutate('UnsetTyping', variables);
    }
    mutateUpdateApp(variables: Types.UpdateAppVariables): Promise<Types.UpdateApp> {
        return this.mutate('UpdateApp', variables);
    }
    mutateUpdateOrganization(variables: Types.UpdateOrganizationVariables): Promise<Types.UpdateOrganization> {
        return this.mutate('UpdateOrganization', variables);
    }
    mutateUpdateWelcomeMessage(variables: Types.UpdateWelcomeMessageVariables): Promise<Types.UpdateWelcomeMessage> {
        return this.mutate('UpdateWelcomeMessage', variables);
    }
    mutateUserStorageSet(variables: Types.UserStorageSetVariables): Promise<Types.UserStorageSet> {
        return this.mutate('UserStorageSet', variables);
    }
    subscribeChatOnlinesCountWatch(variables: Types.ChatOnlinesCountWatchVariables, handler: GraphqlSubscriptionHandler<Types.ChatOnlinesCountWatch>): GraphqlActiveSubscription<Types.ChatOnlinesCountWatch> {
        return this.subscribe(handler, 'ChatOnlinesCountWatch', variables);
    }
    subscribeChatWatch(variables: Types.ChatWatchVariables, handler: GraphqlSubscriptionHandler<Types.ChatWatch>): GraphqlActiveSubscription<Types.ChatWatch> {
        return this.subscribe(handler, 'ChatWatch', variables);
    }
    subscribeCommentWatch(variables: Types.CommentWatchVariables, handler: GraphqlSubscriptionHandler<Types.CommentWatch>): GraphqlActiveSubscription<Types.CommentWatch> {
        return this.subscribe(handler, 'CommentWatch', variables);
    }
    subscribeConferenceMediaWatch(variables: Types.ConferenceMediaWatchVariables, handler: GraphqlSubscriptionHandler<Types.ConferenceMediaWatch>): GraphqlActiveSubscription<Types.ConferenceMediaWatch> {
        return this.subscribe(handler, 'ConferenceMediaWatch', variables);
    }
    subscribeConferenceWatch(variables: Types.ConferenceWatchVariables, handler: GraphqlSubscriptionHandler<Types.ConferenceWatch>): GraphqlActiveSubscription<Types.ConferenceWatch> {
        return this.subscribe(handler, 'ConferenceWatch', variables);
    }
    subscribeDebugEventsWatch(variables: Types.DebugEventsWatchVariables, handler: GraphqlSubscriptionHandler<Types.DebugEventsWatch>): GraphqlActiveSubscription<Types.DebugEventsWatch> {
        return this.subscribe(handler, 'DebugEventsWatch', variables);
    }
    subscribeDialogsWatch(variables: Types.DialogsWatchVariables, handler: GraphqlSubscriptionHandler<Types.DialogsWatch>): GraphqlActiveSubscription<Types.DialogsWatch> {
        return this.subscribe(handler, 'DialogsWatch', variables);
    }
    subscribeFeedUpdates(variables: Types.FeedUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.FeedUpdates>): GraphqlActiveSubscription<Types.FeedUpdates> {
        return this.subscribe(handler, 'FeedUpdates', variables);
    }
    subscribeMyNotificationsCenter(variables: Types.MyNotificationsCenterVariables, handler: GraphqlSubscriptionHandler<Types.MyNotificationsCenter>): GraphqlActiveSubscription<Types.MyNotificationsCenter> {
        return this.subscribe(handler, 'MyNotificationsCenter', variables);
    }
    subscribeOnlineWatch(variables: Types.OnlineWatchVariables, handler: GraphqlSubscriptionHandler<Types.OnlineWatch>): GraphqlActiveSubscription<Types.OnlineWatch> {
        return this.subscribe(handler, 'OnlineWatch', variables);
    }
    subscribeSettingsWatch(handler: GraphqlSubscriptionHandler<Types.SettingsWatch>): GraphqlActiveSubscription<Types.SettingsWatch> {
        return this.subscribe(handler, 'SettingsWatch', undefined);
    }
    subscribeTypingsWatch(handler: GraphqlSubscriptionHandler<Types.TypingsWatch>): GraphqlActiveSubscription<Types.TypingsWatch> {
        return this.subscribe(handler, 'TypingsWatch', undefined);
    }
    subscribeWalletUpdates(variables: Types.WalletUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.WalletUpdates>): GraphqlActiveSubscription<Types.WalletUpdates> {
        return this.subscribe(handler, 'WalletUpdates', variables);
    }
}