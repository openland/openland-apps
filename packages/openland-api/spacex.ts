import * as Types from './spacex.types';
import { GraphqlEngine, GraphqlActiveSubscription, OperationParameters, GraphqlSubscriptionHandler, BaseSpaceXClient, SpaceQueryWatchParameters } from '@openland/spacex';

export class OpenlandClient extends BaseSpaceXClient {
    constructor(engine: GraphqlEngine) {
        super(engine);
    }
    async queryAccount(opts?: OperationParameters): Promise<Types.Account> {
        return this.query('Account', undefined, opts);
    }
    async queryAccountSettings(opts?: OperationParameters): Promise<Types.AccountSettings> {
        return this.query('AccountSettings', undefined, opts);
    }
    async queryAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountInviteInfo> {
        return this.query('AccountInviteInfo', variables, opts);
    }
    async queryAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountAppInviteInfo> {
        return this.query('AccountAppInviteInfo', variables, opts);
    }
    async queryAccountAppInvite(opts?: OperationParameters): Promise<Types.AccountAppInvite> {
        return this.query('AccountAppInvite', undefined, opts);
    }
    async queryProfilePrefill(opts?: OperationParameters): Promise<Types.ProfilePrefill> {
        return this.query('ProfilePrefill', undefined, opts);
    }
    async queryFetchPushSettings(opts?: OperationParameters): Promise<Types.FetchPushSettings> {
        return this.query('FetchPushSettings', undefined, opts);
    }
    async queryMyApps(opts?: OperationParameters): Promise<Types.MyApps> {
        return this.query('MyApps', undefined, opts);
    }
    async queryUserStorage(variables: Types.UserStorageVariables, opts?: OperationParameters): Promise<Types.UserStorage> {
        return this.query('UserStorage', variables, opts);
    }
    async querySuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: OperationParameters): Promise<Types.SuperBadgeInRoom> {
        return this.query('SuperBadgeInRoom', variables, opts);
    }
    async queryDialogs(variables: Types.DialogsVariables, opts?: OperationParameters): Promise<Types.Dialogs> {
        return this.query('Dialogs', variables, opts);
    }
    async queryRoom(variables: Types.RoomVariables, opts?: OperationParameters): Promise<Types.Room> {
        return this.query('Room', variables, opts);
    }
    async queryRoomPico(variables: Types.RoomPicoVariables, opts?: OperationParameters): Promise<Types.RoomPico> {
        return this.query('RoomPico', variables, opts);
    }
    async queryRoomChat(variables: Types.RoomChatVariables, opts?: OperationParameters): Promise<Types.RoomChat> {
        return this.query('RoomChat', variables, opts);
    }
    async queryRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts?: OperationParameters): Promise<Types.RoomWithoutMembers> {
        return this.query('RoomWithoutMembers', variables, opts);
    }
    async queryRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: OperationParameters): Promise<Types.RoomFeaturedMembers> {
        return this.query('RoomFeaturedMembers', variables, opts);
    }
    async queryRoomTiny(variables: Types.RoomTinyVariables, opts?: OperationParameters): Promise<Types.RoomTiny> {
        return this.query('RoomTiny', variables, opts);
    }
    async queryRoomSuper(variables: Types.RoomSuperVariables, opts?: OperationParameters): Promise<Types.RoomSuper> {
        return this.query('RoomSuper', variables, opts);
    }
    async queryGlobalCounter(opts?: OperationParameters): Promise<Types.GlobalCounter> {
        return this.query('GlobalCounter', undefined, opts);
    }
    async queryMessagesBatch(variables: Types.MessagesBatchVariables, opts?: OperationParameters): Promise<Types.MessagesBatch> {
        return this.query('MessagesBatch', variables, opts);
    }
    async queryChatInit(variables: Types.ChatInitVariables, opts?: OperationParameters): Promise<Types.ChatInit> {
        return this.query('ChatInit', variables, opts);
    }
    async queryChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: OperationParameters): Promise<Types.ChatInitFromUnread> {
        return this.query('ChatInitFromUnread', variables, opts);
    }
    async queryRoomSearch(variables: Types.RoomSearchVariables, opts?: OperationParameters): Promise<Types.RoomSearch> {
        return this.query('RoomSearch', variables, opts);
    }
    async queryRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: OperationParameters): Promise<Types.RoomMembersShort> {
        return this.query('RoomMembersShort', variables, opts);
    }
    async queryRoomMembers(variables: Types.RoomMembersVariables, opts?: OperationParameters): Promise<Types.RoomMembers> {
        return this.query('RoomMembers', variables, opts);
    }
    async queryRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: OperationParameters): Promise<Types.RoomMembersTiny> {
        return this.query('RoomMembersTiny', variables, opts);
    }
    async queryChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts?: OperationParameters): Promise<Types.ChatMembersSearch> {
        return this.query('ChatMembersSearch', variables, opts);
    }
    async queryRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts?: OperationParameters): Promise<Types.RoomOrganizationAdminMembers> {
        return this.query('RoomOrganizationAdminMembers', variables, opts);
    }
    async queryRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: OperationParameters): Promise<Types.RoomMembersPaginated> {
        return this.query('RoomMembersPaginated', variables, opts);
    }
    async queryRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: OperationParameters): Promise<Types.RoomInviteLink> {
        return this.query('RoomInviteLink', variables, opts);
    }
    async queryRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: OperationParameters): Promise<Types.RoomInviteInfo> {
        return this.query('RoomInviteInfo', variables, opts);
    }
    async queryResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: OperationParameters): Promise<Types.ResolvedInvite> {
        return this.query('ResolvedInvite', variables, opts);
    }
    async queryMessage(variables: Types.MessageVariables, opts?: OperationParameters): Promise<Types.Message> {
        return this.query('Message', variables, opts);
    }
    async queryMessagesSearch(variables: Types.MessagesSearchVariables, opts?: OperationParameters): Promise<Types.MessagesSearch> {
        return this.query('MessagesSearch', variables, opts);
    }
    async queryChatJoin(variables: Types.ChatJoinVariables, opts?: OperationParameters): Promise<Types.ChatJoin> {
        return this.query('ChatJoin', variables, opts);
    }
    async queryComments(variables: Types.CommentsVariables, opts?: OperationParameters): Promise<Types.Comments> {
        return this.query('Comments', variables, opts);
    }
    async queryConference(variables: Types.ConferenceVariables, opts?: OperationParameters): Promise<Types.Conference> {
        return this.query('Conference', variables, opts);
    }
    async queryConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: OperationParameters): Promise<Types.ConferenceMedia> {
        return this.query('ConferenceMedia', variables, opts);
    }
    async queryAvailableRooms(variables: Types.AvailableRoomsVariables, opts?: OperationParameters): Promise<Types.AvailableRooms> {
        return this.query('AvailableRooms', variables, opts);
    }
    async querySuggestedRooms(opts?: OperationParameters): Promise<Types.SuggestedRooms> {
        return this.query('SuggestedRooms', undefined, opts);
    }
    async queryUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: OperationParameters): Promise<Types.UserAvailableRooms> {
        return this.query('UserAvailableRooms', variables, opts);
    }
    async queryGlobalSearch(variables: Types.GlobalSearchVariables, opts?: OperationParameters): Promise<Types.GlobalSearch> {
        return this.query('GlobalSearch', variables, opts);
    }
    async queryDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: OperationParameters): Promise<Types.DiscoverNextPage> {
        return this.query('DiscoverNextPage', variables, opts);
    }
    async queryDiscoverIsDone(opts?: OperationParameters): Promise<Types.DiscoverIsDone> {
        return this.query('DiscoverIsDone', undefined, opts);
    }
    async queryDiscoverState(opts?: OperationParameters): Promise<Types.DiscoverState> {
        return this.query('DiscoverState', undefined, opts);
    }
    async queryFeatureFlags(opts?: OperationParameters): Promise<Types.FeatureFlags> {
        return this.query('FeatureFlags', undefined, opts);
    }
    async queryInitFeed(variables: Types.InitFeedVariables, opts?: OperationParameters): Promise<Types.InitFeed> {
        return this.query('InitFeed', variables, opts);
    }
    async queryFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: OperationParameters): Promise<Types.FeedLoadMore> {
        return this.query('FeedLoadMore', variables, opts);
    }
    async queryFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, opts?: OperationParameters): Promise<Types.FeedSubscriptions> {
        return this.query('FeedSubscriptions', variables, opts);
    }
    async queryFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, opts?: OperationParameters): Promise<Types.FeedWritableChannels> {
        return this.query('FeedWritableChannels', variables, opts);
    }
    async queryFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: OperationParameters): Promise<Types.FeedChannelsSearch> {
        return this.query('FeedChannelsSearch', variables, opts);
    }
    async queryFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: OperationParameters): Promise<Types.FeedRecommendedChannels> {
        return this.query('FeedRecommendedChannels', variables, opts);
    }
    async queryFeedChannel(variables: Types.FeedChannelVariables, opts?: OperationParameters): Promise<Types.FeedChannel> {
        return this.query('FeedChannel', variables, opts);
    }
    async queryFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: OperationParameters): Promise<Types.FeedChannelWriters> {
        return this.query('FeedChannelWriters', variables, opts);
    }
    async queryFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: OperationParameters): Promise<Types.FeedChannelSubscribers> {
        return this.query('FeedChannelSubscribers', variables, opts);
    }
    async queryFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: OperationParameters): Promise<Types.FeedChannelContent> {
        return this.query('FeedChannelContent', variables, opts);
    }
    async queryFeedItem(variables: Types.FeedItemVariables, opts?: OperationParameters): Promise<Types.FeedItem> {
        return this.query('FeedItem', variables, opts);
    }
    async queryMyCards(opts?: OperationParameters): Promise<Types.MyCards> {
        return this.query('MyCards', undefined, opts);
    }
    async queryMyWallet(opts?: OperationParameters): Promise<Types.MyWallet> {
        return this.query('MyWallet', undefined, opts);
    }
    async queryMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: OperationParameters): Promise<Types.MatchmakingRoom> {
        return this.query('MatchmakingRoom', variables, opts);
    }
    async queryMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: OperationParameters): Promise<Types.MatchmakingProfile> {
        return this.query('MatchmakingProfile', variables, opts);
    }
    async queryChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: OperationParameters): Promise<Types.ChatMentionSearch> {
        return this.query('ChatMentionSearch', variables, opts);
    }
    async queryMyNotifications(variables: Types.MyNotificationsVariables, opts?: OperationParameters): Promise<Types.MyNotifications> {
        return this.query('MyNotifications', variables, opts);
    }
    async queryMyNotificationCenter(opts?: OperationParameters): Promise<Types.MyNotificationCenter> {
        return this.query('MyNotificationCenter', undefined, opts);
    }
    async queryOauthContext(variables: Types.OauthContextVariables, opts?: OperationParameters): Promise<Types.OauthContext> {
        return this.query('OauthContext', variables, opts);
    }
    async queryMyOrganizations(opts?: OperationParameters): Promise<Types.MyOrganizations> {
        return this.query('MyOrganizations', undefined, opts);
    }
    async queryOrganization(variables: Types.OrganizationVariables, opts?: OperationParameters): Promise<Types.Organization> {
        return this.query('Organization', variables, opts);
    }
    async queryOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationWithoutMembers> {
        return this.query('OrganizationWithoutMembers', variables, opts);
    }
    async queryOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: OperationParameters): Promise<Types.OrganizationMembersShort> {
        return this.query('OrganizationMembersShort', variables, opts);
    }
    async queryOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationMembers> {
        return this.query('OrganizationMembers', variables, opts);
    }
    async queryOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: OperationParameters): Promise<Types.OrganizationProfile> {
        return this.query('OrganizationProfile', variables, opts);
    }
    async queryExploreCommunity(variables: Types.ExploreCommunityVariables, opts?: OperationParameters): Promise<Types.ExploreCommunity> {
        return this.query('ExploreCommunity', variables, opts);
    }
    async queryOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicInvite> {
        return this.query('OrganizationPublicInvite', variables, opts);
    }
    async queryOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: OperationParameters): Promise<Types.OrganizationByPrefix> {
        return this.query('OrganizationByPrefix', variables, opts);
    }
    async queryOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicRooms> {
        return this.query('OrganizationPublicRooms', variables, opts);
    }
    async queryPermissions(opts?: OperationParameters): Promise<Types.Permissions> {
        return this.query('Permissions', undefined, opts);
    }
    async querySuperAdmins(opts?: OperationParameters): Promise<Types.SuperAdmins> {
        return this.query('SuperAdmins', undefined, opts);
    }
    async querySuperAccounts(opts?: OperationParameters): Promise<Types.SuperAccounts> {
        return this.query('SuperAccounts', undefined, opts);
    }
    async querySuperAccount(variables: Types.SuperAccountVariables, opts?: OperationParameters): Promise<Types.SuperAccount> {
        return this.query('SuperAccount', variables, opts);
    }
    async queryProfile(opts?: OperationParameters): Promise<Types.Profile> {
        return this.query('Profile', undefined, opts);
    }
    async querySettings(opts?: OperationParameters): Promise<Types.Settings> {
        return this.query('Settings', undefined, opts);
    }
    async querySharedMedia(variables: Types.SharedMediaVariables, opts?: OperationParameters): Promise<Types.SharedMedia> {
        return this.query('SharedMedia', variables, opts);
    }
    async querySharedMediaCounters(variables: Types.SharedMediaCountersVariables, opts?: OperationParameters): Promise<Types.SharedMediaCounters> {
        return this.query('SharedMediaCounters', variables, opts);
    }
    async queryResolveShortName(variables: Types.ResolveShortNameVariables, opts?: OperationParameters): Promise<Types.ResolveShortName> {
        return this.query('ResolveShortName', variables, opts);
    }
    async queryGetUser(variables: Types.GetUserVariables, opts?: OperationParameters): Promise<Types.GetUser> {
        return this.query('GetUser', variables, opts);
    }
    async queryMyStickers(opts?: OperationParameters): Promise<Types.MyStickers> {
        return this.query('MyStickers', undefined, opts);
    }
    async queryStickerPack(variables: Types.StickerPackVariables, opts?: OperationParameters): Promise<Types.StickerPack> {
        return this.query('StickerPack', variables, opts);
    }
    async queryUsers(variables: Types.UsersVariables, opts?: OperationParameters): Promise<Types.Users> {
        return this.query('Users', variables, opts);
    }
    async queryUser(variables: Types.UserVariables, opts?: OperationParameters): Promise<Types.User> {
        return this.query('User', variables, opts);
    }
    async queryUserPico(variables: Types.UserPicoVariables, opts?: OperationParameters): Promise<Types.UserPico> {
        return this.query('UserPico', variables, opts);
    }
    async queryOnline(variables: Types.OnlineVariables, opts?: OperationParameters): Promise<Types.Online> {
        return this.query('Online', variables, opts);
    }
    async queryExplorePeople(variables: Types.ExplorePeopleVariables, opts?: OperationParameters): Promise<Types.ExplorePeople> {
        return this.query('ExplorePeople', variables, opts);
    }
    async queryMySuccessfulInvitesCount(opts?: OperationParameters): Promise<Types.MySuccessfulInvitesCount> {
        return this.query('MySuccessfulInvitesCount', undefined, opts);
    }
    async refetchAccount(): Promise<Types.Account> {
        return this.refetch('Account');
    }
    async refetchAccountSettings(): Promise<Types.AccountSettings> {
        return this.refetch('AccountSettings');
    }
    async refetchAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Promise<Types.AccountInviteInfo> {
        return this.refetch('AccountInviteInfo', variables);
    }
    async refetchAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Promise<Types.AccountAppInviteInfo> {
        return this.refetch('AccountAppInviteInfo', variables);
    }
    async refetchAccountAppInvite(): Promise<Types.AccountAppInvite> {
        return this.refetch('AccountAppInvite');
    }
    async refetchProfilePrefill(): Promise<Types.ProfilePrefill> {
        return this.refetch('ProfilePrefill');
    }
    async refetchFetchPushSettings(): Promise<Types.FetchPushSettings> {
        return this.refetch('FetchPushSettings');
    }
    async refetchMyApps(): Promise<Types.MyApps> {
        return this.refetch('MyApps');
    }
    async refetchUserStorage(variables: Types.UserStorageVariables): Promise<Types.UserStorage> {
        return this.refetch('UserStorage', variables);
    }
    async refetchSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables): Promise<Types.SuperBadgeInRoom> {
        return this.refetch('SuperBadgeInRoom', variables);
    }
    async refetchDialogs(variables: Types.DialogsVariables): Promise<Types.Dialogs> {
        return this.refetch('Dialogs', variables);
    }
    async refetchRoom(variables: Types.RoomVariables): Promise<Types.Room> {
        return this.refetch('Room', variables);
    }
    async refetchRoomPico(variables: Types.RoomPicoVariables): Promise<Types.RoomPico> {
        return this.refetch('RoomPico', variables);
    }
    async refetchRoomChat(variables: Types.RoomChatVariables): Promise<Types.RoomChat> {
        return this.refetch('RoomChat', variables);
    }
    async refetchRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables): Promise<Types.RoomWithoutMembers> {
        return this.refetch('RoomWithoutMembers', variables);
    }
    async refetchRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables): Promise<Types.RoomFeaturedMembers> {
        return this.refetch('RoomFeaturedMembers', variables);
    }
    async refetchRoomTiny(variables: Types.RoomTinyVariables): Promise<Types.RoomTiny> {
        return this.refetch('RoomTiny', variables);
    }
    async refetchRoomSuper(variables: Types.RoomSuperVariables): Promise<Types.RoomSuper> {
        return this.refetch('RoomSuper', variables);
    }
    async refetchGlobalCounter(): Promise<Types.GlobalCounter> {
        return this.refetch('GlobalCounter');
    }
    async refetchMessagesBatch(variables: Types.MessagesBatchVariables): Promise<Types.MessagesBatch> {
        return this.refetch('MessagesBatch', variables);
    }
    async refetchChatInit(variables: Types.ChatInitVariables): Promise<Types.ChatInit> {
        return this.refetch('ChatInit', variables);
    }
    async refetchChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables): Promise<Types.ChatInitFromUnread> {
        return this.refetch('ChatInitFromUnread', variables);
    }
    async refetchRoomSearch(variables: Types.RoomSearchVariables): Promise<Types.RoomSearch> {
        return this.refetch('RoomSearch', variables);
    }
    async refetchRoomMembersShort(variables: Types.RoomMembersShortVariables): Promise<Types.RoomMembersShort> {
        return this.refetch('RoomMembersShort', variables);
    }
    async refetchRoomMembers(variables: Types.RoomMembersVariables): Promise<Types.RoomMembers> {
        return this.refetch('RoomMembers', variables);
    }
    async refetchRoomMembersTiny(variables: Types.RoomMembersTinyVariables): Promise<Types.RoomMembersTiny> {
        return this.refetch('RoomMembersTiny', variables);
    }
    async refetchChatMembersSearch(variables: Types.ChatMembersSearchVariables): Promise<Types.ChatMembersSearch> {
        return this.refetch('ChatMembersSearch', variables);
    }
    async refetchRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables): Promise<Types.RoomOrganizationAdminMembers> {
        return this.refetch('RoomOrganizationAdminMembers', variables);
    }
    async refetchRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables): Promise<Types.RoomMembersPaginated> {
        return this.refetch('RoomMembersPaginated', variables);
    }
    async refetchRoomInviteLink(variables: Types.RoomInviteLinkVariables): Promise<Types.RoomInviteLink> {
        return this.refetch('RoomInviteLink', variables);
    }
    async refetchRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Promise<Types.RoomInviteInfo> {
        return this.refetch('RoomInviteInfo', variables);
    }
    async refetchResolvedInvite(variables: Types.ResolvedInviteVariables): Promise<Types.ResolvedInvite> {
        return this.refetch('ResolvedInvite', variables);
    }
    async refetchMessage(variables: Types.MessageVariables): Promise<Types.Message> {
        return this.refetch('Message', variables);
    }
    async refetchMessagesSearch(variables: Types.MessagesSearchVariables): Promise<Types.MessagesSearch> {
        return this.refetch('MessagesSearch', variables);
    }
    async refetchChatJoin(variables: Types.ChatJoinVariables): Promise<Types.ChatJoin> {
        return this.refetch('ChatJoin', variables);
    }
    async refetchComments(variables: Types.CommentsVariables): Promise<Types.Comments> {
        return this.refetch('Comments', variables);
    }
    async refetchConference(variables: Types.ConferenceVariables): Promise<Types.Conference> {
        return this.refetch('Conference', variables);
    }
    async refetchConferenceMedia(variables: Types.ConferenceMediaVariables): Promise<Types.ConferenceMedia> {
        return this.refetch('ConferenceMedia', variables);
    }
    async refetchAvailableRooms(variables: Types.AvailableRoomsVariables): Promise<Types.AvailableRooms> {
        return this.refetch('AvailableRooms', variables);
    }
    async refetchSuggestedRooms(): Promise<Types.SuggestedRooms> {
        return this.refetch('SuggestedRooms');
    }
    async refetchUserAvailableRooms(variables: Types.UserAvailableRoomsVariables): Promise<Types.UserAvailableRooms> {
        return this.refetch('UserAvailableRooms', variables);
    }
    async refetchGlobalSearch(variables: Types.GlobalSearchVariables): Promise<Types.GlobalSearch> {
        return this.refetch('GlobalSearch', variables);
    }
    async refetchDiscoverNextPage(variables: Types.DiscoverNextPageVariables): Promise<Types.DiscoverNextPage> {
        return this.refetch('DiscoverNextPage', variables);
    }
    async refetchDiscoverIsDone(): Promise<Types.DiscoverIsDone> {
        return this.refetch('DiscoverIsDone');
    }
    async refetchDiscoverState(): Promise<Types.DiscoverState> {
        return this.refetch('DiscoverState');
    }
    async refetchFeatureFlags(): Promise<Types.FeatureFlags> {
        return this.refetch('FeatureFlags');
    }
    async refetchInitFeed(variables: Types.InitFeedVariables): Promise<Types.InitFeed> {
        return this.refetch('InitFeed', variables);
    }
    async refetchFeedLoadMore(variables: Types.FeedLoadMoreVariables): Promise<Types.FeedLoadMore> {
        return this.refetch('FeedLoadMore', variables);
    }
    async refetchFeedSubscriptions(variables: Types.FeedSubscriptionsVariables): Promise<Types.FeedSubscriptions> {
        return this.refetch('FeedSubscriptions', variables);
    }
    async refetchFeedWritableChannels(variables: Types.FeedWritableChannelsVariables): Promise<Types.FeedWritableChannels> {
        return this.refetch('FeedWritableChannels', variables);
    }
    async refetchFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables): Promise<Types.FeedChannelsSearch> {
        return this.refetch('FeedChannelsSearch', variables);
    }
    async refetchFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables): Promise<Types.FeedRecommendedChannels> {
        return this.refetch('FeedRecommendedChannels', variables);
    }
    async refetchFeedChannel(variables: Types.FeedChannelVariables): Promise<Types.FeedChannel> {
        return this.refetch('FeedChannel', variables);
    }
    async refetchFeedChannelWriters(variables: Types.FeedChannelWritersVariables): Promise<Types.FeedChannelWriters> {
        return this.refetch('FeedChannelWriters', variables);
    }
    async refetchFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables): Promise<Types.FeedChannelSubscribers> {
        return this.refetch('FeedChannelSubscribers', variables);
    }
    async refetchFeedChannelContent(variables: Types.FeedChannelContentVariables): Promise<Types.FeedChannelContent> {
        return this.refetch('FeedChannelContent', variables);
    }
    async refetchFeedItem(variables: Types.FeedItemVariables): Promise<Types.FeedItem> {
        return this.refetch('FeedItem', variables);
    }
    async refetchMyCards(): Promise<Types.MyCards> {
        return this.refetch('MyCards');
    }
    async refetchMyWallet(): Promise<Types.MyWallet> {
        return this.refetch('MyWallet');
    }
    async refetchMatchmakingRoom(variables: Types.MatchmakingRoomVariables): Promise<Types.MatchmakingRoom> {
        return this.refetch('MatchmakingRoom', variables);
    }
    async refetchMatchmakingProfile(variables: Types.MatchmakingProfileVariables): Promise<Types.MatchmakingProfile> {
        return this.refetch('MatchmakingProfile', variables);
    }
    async refetchChatMentionSearch(variables: Types.ChatMentionSearchVariables): Promise<Types.ChatMentionSearch> {
        return this.refetch('ChatMentionSearch', variables);
    }
    async refetchMyNotifications(variables: Types.MyNotificationsVariables): Promise<Types.MyNotifications> {
        return this.refetch('MyNotifications', variables);
    }
    async refetchMyNotificationCenter(): Promise<Types.MyNotificationCenter> {
        return this.refetch('MyNotificationCenter');
    }
    async refetchOauthContext(variables: Types.OauthContextVariables): Promise<Types.OauthContext> {
        return this.refetch('OauthContext', variables);
    }
    async refetchMyOrganizations(): Promise<Types.MyOrganizations> {
        return this.refetch('MyOrganizations');
    }
    async refetchOrganization(variables: Types.OrganizationVariables): Promise<Types.Organization> {
        return this.refetch('Organization', variables);
    }
    async refetchOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables): Promise<Types.OrganizationWithoutMembers> {
        return this.refetch('OrganizationWithoutMembers', variables);
    }
    async refetchOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables): Promise<Types.OrganizationMembersShort> {
        return this.refetch('OrganizationMembersShort', variables);
    }
    async refetchOrganizationMembers(variables: Types.OrganizationMembersVariables): Promise<Types.OrganizationMembers> {
        return this.refetch('OrganizationMembers', variables);
    }
    async refetchOrganizationProfile(variables: Types.OrganizationProfileVariables): Promise<Types.OrganizationProfile> {
        return this.refetch('OrganizationProfile', variables);
    }
    async refetchExploreCommunity(variables: Types.ExploreCommunityVariables): Promise<Types.ExploreCommunity> {
        return this.refetch('ExploreCommunity', variables);
    }
    async refetchOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Promise<Types.OrganizationPublicInvite> {
        return this.refetch('OrganizationPublicInvite', variables);
    }
    async refetchOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Promise<Types.OrganizationByPrefix> {
        return this.refetch('OrganizationByPrefix', variables);
    }
    async refetchOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables): Promise<Types.OrganizationPublicRooms> {
        return this.refetch('OrganizationPublicRooms', variables);
    }
    async refetchPermissions(): Promise<Types.Permissions> {
        return this.refetch('Permissions');
    }
    async refetchSuperAdmins(): Promise<Types.SuperAdmins> {
        return this.refetch('SuperAdmins');
    }
    async refetchSuperAccounts(): Promise<Types.SuperAccounts> {
        return this.refetch('SuperAccounts');
    }
    async refetchSuperAccount(variables: Types.SuperAccountVariables): Promise<Types.SuperAccount> {
        return this.refetch('SuperAccount', variables);
    }
    async refetchProfile(): Promise<Types.Profile> {
        return this.refetch('Profile');
    }
    async refetchSettings(): Promise<Types.Settings> {
        return this.refetch('Settings');
    }
    async refetchSharedMedia(variables: Types.SharedMediaVariables): Promise<Types.SharedMedia> {
        return this.refetch('SharedMedia', variables);
    }
    async refetchSharedMediaCounters(variables: Types.SharedMediaCountersVariables): Promise<Types.SharedMediaCounters> {
        return this.refetch('SharedMediaCounters', variables);
    }
    async refetchResolveShortName(variables: Types.ResolveShortNameVariables): Promise<Types.ResolveShortName> {
        return this.refetch('ResolveShortName', variables);
    }
    async refetchGetUser(variables: Types.GetUserVariables): Promise<Types.GetUser> {
        return this.refetch('GetUser', variables);
    }
    async refetchMyStickers(): Promise<Types.MyStickers> {
        return this.refetch('MyStickers');
    }
    async refetchStickerPack(variables: Types.StickerPackVariables): Promise<Types.StickerPack> {
        return this.refetch('StickerPack', variables);
    }
    async refetchUsers(variables: Types.UsersVariables): Promise<Types.Users> {
        return this.refetch('Users', variables);
    }
    async refetchUser(variables: Types.UserVariables): Promise<Types.User> {
        return this.refetch('User', variables);
    }
    async refetchUserPico(variables: Types.UserPicoVariables): Promise<Types.UserPico> {
        return this.refetch('UserPico', variables);
    }
    async refetchOnline(variables: Types.OnlineVariables): Promise<Types.Online> {
        return this.refetch('Online', variables);
    }
    async refetchExplorePeople(variables: Types.ExplorePeopleVariables): Promise<Types.ExplorePeople> {
        return this.refetch('ExplorePeople', variables);
    }
    async refetchMySuccessfulInvitesCount(): Promise<Types.MySuccessfulInvitesCount> {
        return this.refetch('MySuccessfulInvitesCount');
    }
    async updateAccount(updater: (data: Types.Account) => Types.Account | null): Promise<boolean> {
        return this.updateQuery(updater, 'Account');
    }
    async updateAccountSettings(updater: (data: Types.AccountSettings) => Types.AccountSettings | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountSettings');
    }
    async updateAccountInviteInfo(variables: Types.AccountInviteInfoVariables, updater: (data: Types.AccountInviteInfo) => Types.AccountInviteInfo | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountInviteInfo', variables);
    }
    async updateAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, updater: (data: Types.AccountAppInviteInfo) => Types.AccountAppInviteInfo | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountAppInviteInfo', variables);
    }
    async updateAccountAppInvite(updater: (data: Types.AccountAppInvite) => Types.AccountAppInvite | null): Promise<boolean> {
        return this.updateQuery(updater, 'AccountAppInvite');
    }
    async updateProfilePrefill(updater: (data: Types.ProfilePrefill) => Types.ProfilePrefill | null): Promise<boolean> {
        return this.updateQuery(updater, 'ProfilePrefill');
    }
    async updateFetchPushSettings(updater: (data: Types.FetchPushSettings) => Types.FetchPushSettings | null): Promise<boolean> {
        return this.updateQuery(updater, 'FetchPushSettings');
    }
    async updateMyApps(updater: (data: Types.MyApps) => Types.MyApps | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyApps');
    }
    async updateUserStorage(variables: Types.UserStorageVariables, updater: (data: Types.UserStorage) => Types.UserStorage | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserStorage', variables);
    }
    async updateSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, updater: (data: Types.SuperBadgeInRoom) => Types.SuperBadgeInRoom | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperBadgeInRoom', variables);
    }
    async updateDialogs(variables: Types.DialogsVariables, updater: (data: Types.Dialogs) => Types.Dialogs | null): Promise<boolean> {
        return this.updateQuery(updater, 'Dialogs', variables);
    }
    async updateRoom(variables: Types.RoomVariables, updater: (data: Types.Room) => Types.Room | null): Promise<boolean> {
        return this.updateQuery(updater, 'Room', variables);
    }
    async updateRoomPico(variables: Types.RoomPicoVariables, updater: (data: Types.RoomPico) => Types.RoomPico | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomPico', variables);
    }
    async updateRoomChat(variables: Types.RoomChatVariables, updater: (data: Types.RoomChat) => Types.RoomChat | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomChat', variables);
    }
    async updateRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, updater: (data: Types.RoomWithoutMembers) => Types.RoomWithoutMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomWithoutMembers', variables);
    }
    async updateRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, updater: (data: Types.RoomFeaturedMembers) => Types.RoomFeaturedMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomFeaturedMembers', variables);
    }
    async updateRoomTiny(variables: Types.RoomTinyVariables, updater: (data: Types.RoomTiny) => Types.RoomTiny | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomTiny', variables);
    }
    async updateRoomSuper(variables: Types.RoomSuperVariables, updater: (data: Types.RoomSuper) => Types.RoomSuper | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomSuper', variables);
    }
    async updateGlobalCounter(updater: (data: Types.GlobalCounter) => Types.GlobalCounter | null): Promise<boolean> {
        return this.updateQuery(updater, 'GlobalCounter');
    }
    async updateMessagesBatch(variables: Types.MessagesBatchVariables, updater: (data: Types.MessagesBatch) => Types.MessagesBatch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesBatch', variables);
    }
    async updateChatInit(variables: Types.ChatInitVariables, updater: (data: Types.ChatInit) => Types.ChatInit | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatInit', variables);
    }
    async updateChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, updater: (data: Types.ChatInitFromUnread) => Types.ChatInitFromUnread | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatInitFromUnread', variables);
    }
    async updateRoomSearch(variables: Types.RoomSearchVariables, updater: (data: Types.RoomSearch) => Types.RoomSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomSearch', variables);
    }
    async updateRoomMembersShort(variables: Types.RoomMembersShortVariables, updater: (data: Types.RoomMembersShort) => Types.RoomMembersShort | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembersShort', variables);
    }
    async updateRoomMembers(variables: Types.RoomMembersVariables, updater: (data: Types.RoomMembers) => Types.RoomMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembers', variables);
    }
    async updateRoomMembersTiny(variables: Types.RoomMembersTinyVariables, updater: (data: Types.RoomMembersTiny) => Types.RoomMembersTiny | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembersTiny', variables);
    }
    async updateChatMembersSearch(variables: Types.ChatMembersSearchVariables, updater: (data: Types.ChatMembersSearch) => Types.ChatMembersSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatMembersSearch', variables);
    }
    async updateRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, updater: (data: Types.RoomOrganizationAdminMembers) => Types.RoomOrganizationAdminMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomOrganizationAdminMembers', variables);
    }
    async updateRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, updater: (data: Types.RoomMembersPaginated) => Types.RoomMembersPaginated | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomMembersPaginated', variables);
    }
    async updateRoomInviteLink(variables: Types.RoomInviteLinkVariables, updater: (data: Types.RoomInviteLink) => Types.RoomInviteLink | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomInviteLink', variables);
    }
    async updateRoomInviteInfo(variables: Types.RoomInviteInfoVariables, updater: (data: Types.RoomInviteInfo) => Types.RoomInviteInfo | null): Promise<boolean> {
        return this.updateQuery(updater, 'RoomInviteInfo', variables);
    }
    async updateResolvedInvite(variables: Types.ResolvedInviteVariables, updater: (data: Types.ResolvedInvite) => Types.ResolvedInvite | null): Promise<boolean> {
        return this.updateQuery(updater, 'ResolvedInvite', variables);
    }
    async updateMessage(variables: Types.MessageVariables, updater: (data: Types.Message) => Types.Message | null): Promise<boolean> {
        return this.updateQuery(updater, 'Message', variables);
    }
    async updateMessagesSearch(variables: Types.MessagesSearchVariables, updater: (data: Types.MessagesSearch) => Types.MessagesSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'MessagesSearch', variables);
    }
    async updateChatJoin(variables: Types.ChatJoinVariables, updater: (data: Types.ChatJoin) => Types.ChatJoin | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatJoin', variables);
    }
    async updateComments(variables: Types.CommentsVariables, updater: (data: Types.Comments) => Types.Comments | null): Promise<boolean> {
        return this.updateQuery(updater, 'Comments', variables);
    }
    async updateConference(variables: Types.ConferenceVariables, updater: (data: Types.Conference) => Types.Conference | null): Promise<boolean> {
        return this.updateQuery(updater, 'Conference', variables);
    }
    async updateConferenceMedia(variables: Types.ConferenceMediaVariables, updater: (data: Types.ConferenceMedia) => Types.ConferenceMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'ConferenceMedia', variables);
    }
    async updateAvailableRooms(variables: Types.AvailableRoomsVariables, updater: (data: Types.AvailableRooms) => Types.AvailableRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'AvailableRooms', variables);
    }
    async updateSuggestedRooms(updater: (data: Types.SuggestedRooms) => Types.SuggestedRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuggestedRooms');
    }
    async updateUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, updater: (data: Types.UserAvailableRooms) => Types.UserAvailableRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserAvailableRooms', variables);
    }
    async updateGlobalSearch(variables: Types.GlobalSearchVariables, updater: (data: Types.GlobalSearch) => Types.GlobalSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'GlobalSearch', variables);
    }
    async updateDiscoverNextPage(variables: Types.DiscoverNextPageVariables, updater: (data: Types.DiscoverNextPage) => Types.DiscoverNextPage | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverNextPage', variables);
    }
    async updateDiscoverIsDone(updater: (data: Types.DiscoverIsDone) => Types.DiscoverIsDone | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverIsDone');
    }
    async updateDiscoverState(updater: (data: Types.DiscoverState) => Types.DiscoverState | null): Promise<boolean> {
        return this.updateQuery(updater, 'DiscoverState');
    }
    async updateFeatureFlags(updater: (data: Types.FeatureFlags) => Types.FeatureFlags | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeatureFlags');
    }
    async updateInitFeed(variables: Types.InitFeedVariables, updater: (data: Types.InitFeed) => Types.InitFeed | null): Promise<boolean> {
        return this.updateQuery(updater, 'InitFeed', variables);
    }
    async updateFeedLoadMore(variables: Types.FeedLoadMoreVariables, updater: (data: Types.FeedLoadMore) => Types.FeedLoadMore | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedLoadMore', variables);
    }
    async updateFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, updater: (data: Types.FeedSubscriptions) => Types.FeedSubscriptions | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedSubscriptions', variables);
    }
    async updateFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, updater: (data: Types.FeedWritableChannels) => Types.FeedWritableChannels | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedWritableChannels', variables);
    }
    async updateFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, updater: (data: Types.FeedChannelsSearch) => Types.FeedChannelsSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannelsSearch', variables);
    }
    async updateFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, updater: (data: Types.FeedRecommendedChannels) => Types.FeedRecommendedChannels | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedRecommendedChannels', variables);
    }
    async updateFeedChannel(variables: Types.FeedChannelVariables, updater: (data: Types.FeedChannel) => Types.FeedChannel | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannel', variables);
    }
    async updateFeedChannelWriters(variables: Types.FeedChannelWritersVariables, updater: (data: Types.FeedChannelWriters) => Types.FeedChannelWriters | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannelWriters', variables);
    }
    async updateFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, updater: (data: Types.FeedChannelSubscribers) => Types.FeedChannelSubscribers | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannelSubscribers', variables);
    }
    async updateFeedChannelContent(variables: Types.FeedChannelContentVariables, updater: (data: Types.FeedChannelContent) => Types.FeedChannelContent | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedChannelContent', variables);
    }
    async updateFeedItem(variables: Types.FeedItemVariables, updater: (data: Types.FeedItem) => Types.FeedItem | null): Promise<boolean> {
        return this.updateQuery(updater, 'FeedItem', variables);
    }
    async updateMyCards(updater: (data: Types.MyCards) => Types.MyCards | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyCards');
    }
    async updateMyWallet(updater: (data: Types.MyWallet) => Types.MyWallet | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyWallet');
    }
    async updateMatchmakingRoom(variables: Types.MatchmakingRoomVariables, updater: (data: Types.MatchmakingRoom) => Types.MatchmakingRoom | null): Promise<boolean> {
        return this.updateQuery(updater, 'MatchmakingRoom', variables);
    }
    async updateMatchmakingProfile(variables: Types.MatchmakingProfileVariables, updater: (data: Types.MatchmakingProfile) => Types.MatchmakingProfile | null): Promise<boolean> {
        return this.updateQuery(updater, 'MatchmakingProfile', variables);
    }
    async updateChatMentionSearch(variables: Types.ChatMentionSearchVariables, updater: (data: Types.ChatMentionSearch) => Types.ChatMentionSearch | null): Promise<boolean> {
        return this.updateQuery(updater, 'ChatMentionSearch', variables);
    }
    async updateMyNotifications(variables: Types.MyNotificationsVariables, updater: (data: Types.MyNotifications) => Types.MyNotifications | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyNotifications', variables);
    }
    async updateMyNotificationCenter(updater: (data: Types.MyNotificationCenter) => Types.MyNotificationCenter | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyNotificationCenter');
    }
    async updateOauthContext(variables: Types.OauthContextVariables, updater: (data: Types.OauthContext) => Types.OauthContext | null): Promise<boolean> {
        return this.updateQuery(updater, 'OauthContext', variables);
    }
    async updateMyOrganizations(updater: (data: Types.MyOrganizations) => Types.MyOrganizations | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyOrganizations');
    }
    async updateOrganization(variables: Types.OrganizationVariables, updater: (data: Types.Organization) => Types.Organization | null): Promise<boolean> {
        return this.updateQuery(updater, 'Organization', variables);
    }
    async updateOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, updater: (data: Types.OrganizationWithoutMembers) => Types.OrganizationWithoutMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationWithoutMembers', variables);
    }
    async updateOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, updater: (data: Types.OrganizationMembersShort) => Types.OrganizationMembersShort | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationMembersShort', variables);
    }
    async updateOrganizationMembers(variables: Types.OrganizationMembersVariables, updater: (data: Types.OrganizationMembers) => Types.OrganizationMembers | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationMembers', variables);
    }
    async updateOrganizationProfile(variables: Types.OrganizationProfileVariables, updater: (data: Types.OrganizationProfile) => Types.OrganizationProfile | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationProfile', variables);
    }
    async updateExploreCommunity(variables: Types.ExploreCommunityVariables, updater: (data: Types.ExploreCommunity) => Types.ExploreCommunity | null): Promise<boolean> {
        return this.updateQuery(updater, 'ExploreCommunity', variables);
    }
    async updateOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, updater: (data: Types.OrganizationPublicInvite) => Types.OrganizationPublicInvite | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationPublicInvite', variables);
    }
    async updateOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, updater: (data: Types.OrganizationByPrefix) => Types.OrganizationByPrefix | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationByPrefix', variables);
    }
    async updateOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, updater: (data: Types.OrganizationPublicRooms) => Types.OrganizationPublicRooms | null): Promise<boolean> {
        return this.updateQuery(updater, 'OrganizationPublicRooms', variables);
    }
    async updatePermissions(updater: (data: Types.Permissions) => Types.Permissions | null): Promise<boolean> {
        return this.updateQuery(updater, 'Permissions');
    }
    async updateSuperAdmins(updater: (data: Types.SuperAdmins) => Types.SuperAdmins | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperAdmins');
    }
    async updateSuperAccounts(updater: (data: Types.SuperAccounts) => Types.SuperAccounts | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperAccounts');
    }
    async updateSuperAccount(variables: Types.SuperAccountVariables, updater: (data: Types.SuperAccount) => Types.SuperAccount | null): Promise<boolean> {
        return this.updateQuery(updater, 'SuperAccount', variables);
    }
    async updateProfile(updater: (data: Types.Profile) => Types.Profile | null): Promise<boolean> {
        return this.updateQuery(updater, 'Profile');
    }
    async updateSettings(updater: (data: Types.Settings) => Types.Settings | null): Promise<boolean> {
        return this.updateQuery(updater, 'Settings');
    }
    async updateSharedMedia(variables: Types.SharedMediaVariables, updater: (data: Types.SharedMedia) => Types.SharedMedia | null): Promise<boolean> {
        return this.updateQuery(updater, 'SharedMedia', variables);
    }
    async updateSharedMediaCounters(variables: Types.SharedMediaCountersVariables, updater: (data: Types.SharedMediaCounters) => Types.SharedMediaCounters | null): Promise<boolean> {
        return this.updateQuery(updater, 'SharedMediaCounters', variables);
    }
    async updateResolveShortName(variables: Types.ResolveShortNameVariables, updater: (data: Types.ResolveShortName) => Types.ResolveShortName | null): Promise<boolean> {
        return this.updateQuery(updater, 'ResolveShortName', variables);
    }
    async updateGetUser(variables: Types.GetUserVariables, updater: (data: Types.GetUser) => Types.GetUser | null): Promise<boolean> {
        return this.updateQuery(updater, 'GetUser', variables);
    }
    async updateMyStickers(updater: (data: Types.MyStickers) => Types.MyStickers | null): Promise<boolean> {
        return this.updateQuery(updater, 'MyStickers');
    }
    async updateStickerPack(variables: Types.StickerPackVariables, updater: (data: Types.StickerPack) => Types.StickerPack | null): Promise<boolean> {
        return this.updateQuery(updater, 'StickerPack', variables);
    }
    async updateUsers(variables: Types.UsersVariables, updater: (data: Types.Users) => Types.Users | null): Promise<boolean> {
        return this.updateQuery(updater, 'Users', variables);
    }
    async updateUser(variables: Types.UserVariables, updater: (data: Types.User) => Types.User | null): Promise<boolean> {
        return this.updateQuery(updater, 'User', variables);
    }
    async updateUserPico(variables: Types.UserPicoVariables, updater: (data: Types.UserPico) => Types.UserPico | null): Promise<boolean> {
        return this.updateQuery(updater, 'UserPico', variables);
    }
    async updateOnline(variables: Types.OnlineVariables, updater: (data: Types.Online) => Types.Online | null): Promise<boolean> {
        return this.updateQuery(updater, 'Online', variables);
    }
    async updateExplorePeople(variables: Types.ExplorePeopleVariables, updater: (data: Types.ExplorePeople) => Types.ExplorePeople | null): Promise<boolean> {
        return this.updateQuery(updater, 'ExplorePeople', variables);
    }
    async updateMySuccessfulInvitesCount(updater: (data: Types.MySuccessfulInvitesCount) => Types.MySuccessfulInvitesCount | null): Promise<boolean> {
        return this.updateQuery(updater, 'MySuccessfulInvitesCount');
    }
    useAccount(opts: SpaceQueryWatchParameters & { suspense: false }): Types.Account | null;
    useAccount(opts?: SpaceQueryWatchParameters): Types.Account;
    useAccount(opts?: SpaceQueryWatchParameters): Types.Account | null {
        return this.useQuery('Account', undefined, opts);
    }
    useAccountSettings(opts: SpaceQueryWatchParameters & { suspense: false }): Types.AccountSettings | null;
    useAccountSettings(opts?: SpaceQueryWatchParameters): Types.AccountSettings;
    useAccountSettings(opts?: SpaceQueryWatchParameters): Types.AccountSettings | null {
        return this.useQuery('AccountSettings', undefined, opts);
    }
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.AccountInviteInfo | null;
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.AccountInviteInfo;
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.AccountInviteInfo | null {
        return this.useQuery('AccountInviteInfo', variables, opts);
    }
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.AccountAppInviteInfo | null;
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.AccountAppInviteInfo;
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.AccountAppInviteInfo | null {
        return this.useQuery('AccountAppInviteInfo', variables, opts);
    }
    useAccountAppInvite(opts: SpaceQueryWatchParameters & { suspense: false }): Types.AccountAppInvite | null;
    useAccountAppInvite(opts?: SpaceQueryWatchParameters): Types.AccountAppInvite;
    useAccountAppInvite(opts?: SpaceQueryWatchParameters): Types.AccountAppInvite | null {
        return this.useQuery('AccountAppInvite', undefined, opts);
    }
    useProfilePrefill(opts: SpaceQueryWatchParameters & { suspense: false }): Types.ProfilePrefill | null;
    useProfilePrefill(opts?: SpaceQueryWatchParameters): Types.ProfilePrefill;
    useProfilePrefill(opts?: SpaceQueryWatchParameters): Types.ProfilePrefill | null {
        return this.useQuery('ProfilePrefill', undefined, opts);
    }
    useFetchPushSettings(opts: SpaceQueryWatchParameters & { suspense: false }): Types.FetchPushSettings | null;
    useFetchPushSettings(opts?: SpaceQueryWatchParameters): Types.FetchPushSettings;
    useFetchPushSettings(opts?: SpaceQueryWatchParameters): Types.FetchPushSettings | null {
        return this.useQuery('FetchPushSettings', undefined, opts);
    }
    useMyApps(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyApps | null;
    useMyApps(opts?: SpaceQueryWatchParameters): Types.MyApps;
    useMyApps(opts?: SpaceQueryWatchParameters): Types.MyApps | null {
        return this.useQuery('MyApps', undefined, opts);
    }
    useUserStorage(variables: Types.UserStorageVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.UserStorage | null;
    useUserStorage(variables: Types.UserStorageVariables, opts?: SpaceQueryWatchParameters): Types.UserStorage;
    useUserStorage(variables: Types.UserStorageVariables, opts?: SpaceQueryWatchParameters): Types.UserStorage | null {
        return this.useQuery('UserStorage', variables, opts);
    }
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuperBadgeInRoom | null;
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: SpaceQueryWatchParameters): Types.SuperBadgeInRoom;
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: SpaceQueryWatchParameters): Types.SuperBadgeInRoom | null {
        return this.useQuery('SuperBadgeInRoom', variables, opts);
    }
    useDialogs(variables: Types.DialogsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Dialogs | null;
    useDialogs(variables: Types.DialogsVariables, opts?: SpaceQueryWatchParameters): Types.Dialogs;
    useDialogs(variables: Types.DialogsVariables, opts?: SpaceQueryWatchParameters): Types.Dialogs | null {
        return this.useQuery('Dialogs', variables, opts);
    }
    useRoom(variables: Types.RoomVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Room | null;
    useRoom(variables: Types.RoomVariables, opts?: SpaceQueryWatchParameters): Types.Room;
    useRoom(variables: Types.RoomVariables, opts?: SpaceQueryWatchParameters): Types.Room | null {
        return this.useQuery('Room', variables, opts);
    }
    useRoomPico(variables: Types.RoomPicoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomPico | null;
    useRoomPico(variables: Types.RoomPicoVariables, opts?: SpaceQueryWatchParameters): Types.RoomPico;
    useRoomPico(variables: Types.RoomPicoVariables, opts?: SpaceQueryWatchParameters): Types.RoomPico | null {
        return this.useQuery('RoomPico', variables, opts);
    }
    useRoomChat(variables: Types.RoomChatVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomChat | null;
    useRoomChat(variables: Types.RoomChatVariables, opts?: SpaceQueryWatchParameters): Types.RoomChat;
    useRoomChat(variables: Types.RoomChatVariables, opts?: SpaceQueryWatchParameters): Types.RoomChat | null {
        return this.useQuery('RoomChat', variables, opts);
    }
    useRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomWithoutMembers | null;
    useRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomWithoutMembers;
    useRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomWithoutMembers | null {
        return this.useQuery('RoomWithoutMembers', variables, opts);
    }
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomFeaturedMembers | null;
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomFeaturedMembers;
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomFeaturedMembers | null {
        return this.useQuery('RoomFeaturedMembers', variables, opts);
    }
    useRoomTiny(variables: Types.RoomTinyVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomTiny | null;
    useRoomTiny(variables: Types.RoomTinyVariables, opts?: SpaceQueryWatchParameters): Types.RoomTiny;
    useRoomTiny(variables: Types.RoomTinyVariables, opts?: SpaceQueryWatchParameters): Types.RoomTiny | null {
        return this.useQuery('RoomTiny', variables, opts);
    }
    useRoomSuper(variables: Types.RoomSuperVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSuper | null;
    useRoomSuper(variables: Types.RoomSuperVariables, opts?: SpaceQueryWatchParameters): Types.RoomSuper;
    useRoomSuper(variables: Types.RoomSuperVariables, opts?: SpaceQueryWatchParameters): Types.RoomSuper | null {
        return this.useQuery('RoomSuper', variables, opts);
    }
    useGlobalCounter(opts: SpaceQueryWatchParameters & { suspense: false }): Types.GlobalCounter | null;
    useGlobalCounter(opts?: SpaceQueryWatchParameters): Types.GlobalCounter;
    useGlobalCounter(opts?: SpaceQueryWatchParameters): Types.GlobalCounter | null {
        return this.useQuery('GlobalCounter', undefined, opts);
    }
    useMessagesBatch(variables: Types.MessagesBatchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesBatch | null;
    useMessagesBatch(variables: Types.MessagesBatchVariables, opts?: SpaceQueryWatchParameters): Types.MessagesBatch;
    useMessagesBatch(variables: Types.MessagesBatchVariables, opts?: SpaceQueryWatchParameters): Types.MessagesBatch | null {
        return this.useQuery('MessagesBatch', variables, opts);
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
    useRoomSearch(variables: Types.RoomSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomSearch | null;
    useRoomSearch(variables: Types.RoomSearchVariables, opts?: SpaceQueryWatchParameters): Types.RoomSearch;
    useRoomSearch(variables: Types.RoomSearchVariables, opts?: SpaceQueryWatchParameters): Types.RoomSearch | null {
        return this.useQuery('RoomSearch', variables, opts);
    }
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersShort | null;
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersShort;
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersShort | null {
        return this.useQuery('RoomMembersShort', variables, opts);
    }
    useRoomMembers(variables: Types.RoomMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembers | null;
    useRoomMembers(variables: Types.RoomMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembers;
    useRoomMembers(variables: Types.RoomMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembers | null {
        return this.useQuery('RoomMembers', variables, opts);
    }
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersTiny | null;
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersTiny;
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersTiny | null {
        return this.useQuery('RoomMembersTiny', variables, opts);
    }
    useChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ChatMembersSearch | null;
    useChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts?: SpaceQueryWatchParameters): Types.ChatMembersSearch;
    useChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts?: SpaceQueryWatchParameters): Types.ChatMembersSearch | null {
        return this.useQuery('ChatMembersSearch', variables, opts);
    }
    useRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomOrganizationAdminMembers | null;
    useRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomOrganizationAdminMembers;
    useRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts?: SpaceQueryWatchParameters): Types.RoomOrganizationAdminMembers | null {
        return this.useQuery('RoomOrganizationAdminMembers', variables, opts);
    }
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomMembersPaginated | null;
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersPaginated;
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: SpaceQueryWatchParameters): Types.RoomMembersPaginated | null {
        return this.useQuery('RoomMembersPaginated', variables, opts);
    }
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomInviteLink | null;
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: SpaceQueryWatchParameters): Types.RoomInviteLink;
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: SpaceQueryWatchParameters): Types.RoomInviteLink | null {
        return this.useQuery('RoomInviteLink', variables, opts);
    }
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.RoomInviteInfo | null;
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.RoomInviteInfo;
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: SpaceQueryWatchParameters): Types.RoomInviteInfo | null {
        return this.useQuery('RoomInviteInfo', variables, opts);
    }
    useResolvedInvite(variables: Types.ResolvedInviteVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ResolvedInvite | null;
    useResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: SpaceQueryWatchParameters): Types.ResolvedInvite;
    useResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: SpaceQueryWatchParameters): Types.ResolvedInvite | null {
        return this.useQuery('ResolvedInvite', variables, opts);
    }
    useMessage(variables: Types.MessageVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Message | null;
    useMessage(variables: Types.MessageVariables, opts?: SpaceQueryWatchParameters): Types.Message;
    useMessage(variables: Types.MessageVariables, opts?: SpaceQueryWatchParameters): Types.Message | null {
        return this.useQuery('Message', variables, opts);
    }
    useMessagesSearch(variables: Types.MessagesSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MessagesSearch | null;
    useMessagesSearch(variables: Types.MessagesSearchVariables, opts?: SpaceQueryWatchParameters): Types.MessagesSearch;
    useMessagesSearch(variables: Types.MessagesSearchVariables, opts?: SpaceQueryWatchParameters): Types.MessagesSearch | null {
        return this.useQuery('MessagesSearch', variables, opts);
    }
    useChatJoin(variables: Types.ChatJoinVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ChatJoin | null;
    useChatJoin(variables: Types.ChatJoinVariables, opts?: SpaceQueryWatchParameters): Types.ChatJoin;
    useChatJoin(variables: Types.ChatJoinVariables, opts?: SpaceQueryWatchParameters): Types.ChatJoin | null {
        return this.useQuery('ChatJoin', variables, opts);
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
    useAvailableRooms(variables: Types.AvailableRoomsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.AvailableRooms | null;
    useAvailableRooms(variables: Types.AvailableRoomsVariables, opts?: SpaceQueryWatchParameters): Types.AvailableRooms;
    useAvailableRooms(variables: Types.AvailableRoomsVariables, opts?: SpaceQueryWatchParameters): Types.AvailableRooms | null {
        return this.useQuery('AvailableRooms', variables, opts);
    }
    useSuggestedRooms(opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuggestedRooms | null;
    useSuggestedRooms(opts?: SpaceQueryWatchParameters): Types.SuggestedRooms;
    useSuggestedRooms(opts?: SpaceQueryWatchParameters): Types.SuggestedRooms | null {
        return this.useQuery('SuggestedRooms', undefined, opts);
    }
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.UserAvailableRooms | null;
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: SpaceQueryWatchParameters): Types.UserAvailableRooms;
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: SpaceQueryWatchParameters): Types.UserAvailableRooms | null {
        return this.useQuery('UserAvailableRooms', variables, opts);
    }
    useGlobalSearch(variables: Types.GlobalSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.GlobalSearch | null;
    useGlobalSearch(variables: Types.GlobalSearchVariables, opts?: SpaceQueryWatchParameters): Types.GlobalSearch;
    useGlobalSearch(variables: Types.GlobalSearchVariables, opts?: SpaceQueryWatchParameters): Types.GlobalSearch | null {
        return this.useQuery('GlobalSearch', variables, opts);
    }
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverNextPage | null;
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverNextPage;
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: SpaceQueryWatchParameters): Types.DiscoverNextPage | null {
        return this.useQuery('DiscoverNextPage', variables, opts);
    }
    useDiscoverIsDone(opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverIsDone | null;
    useDiscoverIsDone(opts?: SpaceQueryWatchParameters): Types.DiscoverIsDone;
    useDiscoverIsDone(opts?: SpaceQueryWatchParameters): Types.DiscoverIsDone | null {
        return this.useQuery('DiscoverIsDone', undefined, opts);
    }
    useDiscoverState(opts: SpaceQueryWatchParameters & { suspense: false }): Types.DiscoverState | null;
    useDiscoverState(opts?: SpaceQueryWatchParameters): Types.DiscoverState;
    useDiscoverState(opts?: SpaceQueryWatchParameters): Types.DiscoverState | null {
        return this.useQuery('DiscoverState', undefined, opts);
    }
    useFeatureFlags(opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeatureFlags | null;
    useFeatureFlags(opts?: SpaceQueryWatchParameters): Types.FeatureFlags;
    useFeatureFlags(opts?: SpaceQueryWatchParameters): Types.FeatureFlags | null {
        return this.useQuery('FeatureFlags', undefined, opts);
    }
    useInitFeed(variables: Types.InitFeedVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.InitFeed | null;
    useInitFeed(variables: Types.InitFeedVariables, opts?: SpaceQueryWatchParameters): Types.InitFeed;
    useInitFeed(variables: Types.InitFeedVariables, opts?: SpaceQueryWatchParameters): Types.InitFeed | null {
        return this.useQuery('InitFeed', variables, opts);
    }
    useFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedLoadMore | null;
    useFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: SpaceQueryWatchParameters): Types.FeedLoadMore;
    useFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: SpaceQueryWatchParameters): Types.FeedLoadMore | null {
        return this.useQuery('FeedLoadMore', variables, opts);
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
    useFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannelsSearch | null;
    useFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelsSearch;
    useFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelsSearch | null {
        return this.useQuery('FeedChannelsSearch', variables, opts);
    }
    useFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedRecommendedChannels | null;
    useFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: SpaceQueryWatchParameters): Types.FeedRecommendedChannels;
    useFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: SpaceQueryWatchParameters): Types.FeedRecommendedChannels | null {
        return this.useQuery('FeedRecommendedChannels', variables, opts);
    }
    useFeedChannel(variables: Types.FeedChannelVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannel | null;
    useFeedChannel(variables: Types.FeedChannelVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannel;
    useFeedChannel(variables: Types.FeedChannelVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannel | null {
        return this.useQuery('FeedChannel', variables, opts);
    }
    useFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannelWriters | null;
    useFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelWriters;
    useFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelWriters | null {
        return this.useQuery('FeedChannelWriters', variables, opts);
    }
    useFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannelSubscribers | null;
    useFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelSubscribers;
    useFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelSubscribers | null {
        return this.useQuery('FeedChannelSubscribers', variables, opts);
    }
    useFeedChannelContent(variables: Types.FeedChannelContentVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedChannelContent | null;
    useFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelContent;
    useFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: SpaceQueryWatchParameters): Types.FeedChannelContent | null {
        return this.useQuery('FeedChannelContent', variables, opts);
    }
    useFeedItem(variables: Types.FeedItemVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.FeedItem | null;
    useFeedItem(variables: Types.FeedItemVariables, opts?: SpaceQueryWatchParameters): Types.FeedItem;
    useFeedItem(variables: Types.FeedItemVariables, opts?: SpaceQueryWatchParameters): Types.FeedItem | null {
        return this.useQuery('FeedItem', variables, opts);
    }
    useMyCards(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyCards | null;
    useMyCards(opts?: SpaceQueryWatchParameters): Types.MyCards;
    useMyCards(opts?: SpaceQueryWatchParameters): Types.MyCards | null {
        return this.useQuery('MyCards', undefined, opts);
    }
    useMyWallet(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyWallet | null;
    useMyWallet(opts?: SpaceQueryWatchParameters): Types.MyWallet;
    useMyWallet(opts?: SpaceQueryWatchParameters): Types.MyWallet | null {
        return this.useQuery('MyWallet', undefined, opts);
    }
    useMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MatchmakingRoom | null;
    useMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: SpaceQueryWatchParameters): Types.MatchmakingRoom;
    useMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: SpaceQueryWatchParameters): Types.MatchmakingRoom | null {
        return this.useQuery('MatchmakingRoom', variables, opts);
    }
    useMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MatchmakingProfile | null;
    useMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: SpaceQueryWatchParameters): Types.MatchmakingProfile;
    useMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: SpaceQueryWatchParameters): Types.MatchmakingProfile | null {
        return this.useQuery('MatchmakingProfile', variables, opts);
    }
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ChatMentionSearch | null;
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: SpaceQueryWatchParameters): Types.ChatMentionSearch;
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: SpaceQueryWatchParameters): Types.ChatMentionSearch | null {
        return this.useQuery('ChatMentionSearch', variables, opts);
    }
    useMyNotifications(variables: Types.MyNotificationsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyNotifications | null;
    useMyNotifications(variables: Types.MyNotificationsVariables, opts?: SpaceQueryWatchParameters): Types.MyNotifications;
    useMyNotifications(variables: Types.MyNotificationsVariables, opts?: SpaceQueryWatchParameters): Types.MyNotifications | null {
        return this.useQuery('MyNotifications', variables, opts);
    }
    useMyNotificationCenter(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyNotificationCenter | null;
    useMyNotificationCenter(opts?: SpaceQueryWatchParameters): Types.MyNotificationCenter;
    useMyNotificationCenter(opts?: SpaceQueryWatchParameters): Types.MyNotificationCenter | null {
        return this.useQuery('MyNotificationCenter', undefined, opts);
    }
    useOauthContext(variables: Types.OauthContextVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OauthContext | null;
    useOauthContext(variables: Types.OauthContextVariables, opts?: SpaceQueryWatchParameters): Types.OauthContext;
    useOauthContext(variables: Types.OauthContextVariables, opts?: SpaceQueryWatchParameters): Types.OauthContext | null {
        return this.useQuery('OauthContext', variables, opts);
    }
    useMyOrganizations(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyOrganizations | null;
    useMyOrganizations(opts?: SpaceQueryWatchParameters): Types.MyOrganizations;
    useMyOrganizations(opts?: SpaceQueryWatchParameters): Types.MyOrganizations | null {
        return this.useQuery('MyOrganizations', undefined, opts);
    }
    useOrganization(variables: Types.OrganizationVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Organization | null;
    useOrganization(variables: Types.OrganizationVariables, opts?: SpaceQueryWatchParameters): Types.Organization;
    useOrganization(variables: Types.OrganizationVariables, opts?: SpaceQueryWatchParameters): Types.Organization | null {
        return this.useQuery('Organization', variables, opts);
    }
    useOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationWithoutMembers | null;
    useOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationWithoutMembers;
    useOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationWithoutMembers | null {
        return this.useQuery('OrganizationWithoutMembers', variables, opts);
    }
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationMembersShort | null;
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationMembersShort;
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationMembersShort | null {
        return this.useQuery('OrganizationMembersShort', variables, opts);
    }
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationMembers | null;
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationMembers;
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationMembers | null {
        return this.useQuery('OrganizationMembers', variables, opts);
    }
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationProfile | null;
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationProfile;
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationProfile | null {
        return this.useQuery('OrganizationProfile', variables, opts);
    }
    useExploreCommunity(variables: Types.ExploreCommunityVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ExploreCommunity | null;
    useExploreCommunity(variables: Types.ExploreCommunityVariables, opts?: SpaceQueryWatchParameters): Types.ExploreCommunity;
    useExploreCommunity(variables: Types.ExploreCommunityVariables, opts?: SpaceQueryWatchParameters): Types.ExploreCommunity | null {
        return this.useQuery('ExploreCommunity', variables, opts);
    }
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPublicInvite | null;
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationPublicInvite;
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationPublicInvite | null {
        return this.useQuery('OrganizationPublicInvite', variables, opts);
    }
    useOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationByPrefix | null;
    useOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationByPrefix;
    useOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationByPrefix | null {
        return this.useQuery('OrganizationByPrefix', variables, opts);
    }
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.OrganizationPublicRooms | null;
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationPublicRooms;
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: SpaceQueryWatchParameters): Types.OrganizationPublicRooms | null {
        return this.useQuery('OrganizationPublicRooms', variables, opts);
    }
    usePermissions(opts: SpaceQueryWatchParameters & { suspense: false }): Types.Permissions | null;
    usePermissions(opts?: SpaceQueryWatchParameters): Types.Permissions;
    usePermissions(opts?: SpaceQueryWatchParameters): Types.Permissions | null {
        return this.useQuery('Permissions', undefined, opts);
    }
    useSuperAdmins(opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAdmins | null;
    useSuperAdmins(opts?: SpaceQueryWatchParameters): Types.SuperAdmins;
    useSuperAdmins(opts?: SpaceQueryWatchParameters): Types.SuperAdmins | null {
        return this.useQuery('SuperAdmins', undefined, opts);
    }
    useSuperAccounts(opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAccounts | null;
    useSuperAccounts(opts?: SpaceQueryWatchParameters): Types.SuperAccounts;
    useSuperAccounts(opts?: SpaceQueryWatchParameters): Types.SuperAccounts | null {
        return this.useQuery('SuperAccounts', undefined, opts);
    }
    useSuperAccount(variables: Types.SuperAccountVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.SuperAccount | null;
    useSuperAccount(variables: Types.SuperAccountVariables, opts?: SpaceQueryWatchParameters): Types.SuperAccount;
    useSuperAccount(variables: Types.SuperAccountVariables, opts?: SpaceQueryWatchParameters): Types.SuperAccount | null {
        return this.useQuery('SuperAccount', variables, opts);
    }
    useProfile(opts: SpaceQueryWatchParameters & { suspense: false }): Types.Profile | null;
    useProfile(opts?: SpaceQueryWatchParameters): Types.Profile;
    useProfile(opts?: SpaceQueryWatchParameters): Types.Profile | null {
        return this.useQuery('Profile', undefined, opts);
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
    useResolveShortName(variables: Types.ResolveShortNameVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ResolveShortName | null;
    useResolveShortName(variables: Types.ResolveShortNameVariables, opts?: SpaceQueryWatchParameters): Types.ResolveShortName;
    useResolveShortName(variables: Types.ResolveShortNameVariables, opts?: SpaceQueryWatchParameters): Types.ResolveShortName | null {
        return this.useQuery('ResolveShortName', variables, opts);
    }
    useGetUser(variables: Types.GetUserVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.GetUser | null;
    useGetUser(variables: Types.GetUserVariables, opts?: SpaceQueryWatchParameters): Types.GetUser;
    useGetUser(variables: Types.GetUserVariables, opts?: SpaceQueryWatchParameters): Types.GetUser | null {
        return this.useQuery('GetUser', variables, opts);
    }
    useMyStickers(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MyStickers | null;
    useMyStickers(opts?: SpaceQueryWatchParameters): Types.MyStickers;
    useMyStickers(opts?: SpaceQueryWatchParameters): Types.MyStickers | null {
        return this.useQuery('MyStickers', undefined, opts);
    }
    useStickerPack(variables: Types.StickerPackVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.StickerPack | null;
    useStickerPack(variables: Types.StickerPackVariables, opts?: SpaceQueryWatchParameters): Types.StickerPack;
    useStickerPack(variables: Types.StickerPackVariables, opts?: SpaceQueryWatchParameters): Types.StickerPack | null {
        return this.useQuery('StickerPack', variables, opts);
    }
    useUsers(variables: Types.UsersVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Users | null;
    useUsers(variables: Types.UsersVariables, opts?: SpaceQueryWatchParameters): Types.Users;
    useUsers(variables: Types.UsersVariables, opts?: SpaceQueryWatchParameters): Types.Users | null {
        return this.useQuery('Users', variables, opts);
    }
    useUser(variables: Types.UserVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.User | null;
    useUser(variables: Types.UserVariables, opts?: SpaceQueryWatchParameters): Types.User;
    useUser(variables: Types.UserVariables, opts?: SpaceQueryWatchParameters): Types.User | null {
        return this.useQuery('User', variables, opts);
    }
    useUserPico(variables: Types.UserPicoVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.UserPico | null;
    useUserPico(variables: Types.UserPicoVariables, opts?: SpaceQueryWatchParameters): Types.UserPico;
    useUserPico(variables: Types.UserPicoVariables, opts?: SpaceQueryWatchParameters): Types.UserPico | null {
        return this.useQuery('UserPico', variables, opts);
    }
    useOnline(variables: Types.OnlineVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.Online | null;
    useOnline(variables: Types.OnlineVariables, opts?: SpaceQueryWatchParameters): Types.Online;
    useOnline(variables: Types.OnlineVariables, opts?: SpaceQueryWatchParameters): Types.Online | null {
        return this.useQuery('Online', variables, opts);
    }
    useExplorePeople(variables: Types.ExplorePeopleVariables, opts: SpaceQueryWatchParameters & { suspense: false }): Types.ExplorePeople | null;
    useExplorePeople(variables: Types.ExplorePeopleVariables, opts?: SpaceQueryWatchParameters): Types.ExplorePeople;
    useExplorePeople(variables: Types.ExplorePeopleVariables, opts?: SpaceQueryWatchParameters): Types.ExplorePeople | null {
        return this.useQuery('ExplorePeople', variables, opts);
    }
    useMySuccessfulInvitesCount(opts: SpaceQueryWatchParameters & { suspense: false }): Types.MySuccessfulInvitesCount | null;
    useMySuccessfulInvitesCount(opts?: SpaceQueryWatchParameters): Types.MySuccessfulInvitesCount;
    useMySuccessfulInvitesCount(opts?: SpaceQueryWatchParameters): Types.MySuccessfulInvitesCount | null {
        return this.useQuery('MySuccessfulInvitesCount', undefined, opts);
    }
    async mutateCreateOrganization(variables: Types.CreateOrganizationVariables): Promise<Types.CreateOrganization> {
        return this.mutate('CreateOrganization', variables);
    }
    async mutateAccountInviteJoin(variables: Types.AccountInviteJoinVariables): Promise<Types.AccountInviteJoin> {
        return this.mutate('AccountInviteJoin', variables);
    }
    async mutateCreateUserProfileAndOrganization(variables: Types.CreateUserProfileAndOrganizationVariables): Promise<Types.CreateUserProfileAndOrganization> {
        return this.mutate('CreateUserProfileAndOrganization', variables);
    }
    async mutateReportOnline(variables: Types.ReportOnlineVariables): Promise<Types.ReportOnline> {
        return this.mutate('ReportOnline', variables);
    }
    async mutateRegisterPush(variables: Types.RegisterPushVariables): Promise<Types.RegisterPush> {
        return this.mutate('RegisterPush', variables);
    }
    async mutateRegisterWebPush(variables: Types.RegisterWebPushVariables): Promise<Types.RegisterWebPush> {
        return this.mutate('RegisterWebPush', variables);
    }
    async mutateCreateApp(variables: Types.CreateAppVariables): Promise<Types.CreateApp> {
        return this.mutate('CreateApp', variables);
    }
    async mutateUpdateApp(variables: Types.UpdateAppVariables): Promise<Types.UpdateApp> {
        return this.mutate('UpdateApp', variables);
    }
    async mutateRefreshAppToken(variables: Types.RefreshAppTokenVariables): Promise<Types.RefreshAppToken> {
        return this.mutate('RefreshAppToken', variables);
    }
    async mutateAddAppToChat(variables: Types.AddAppToChatVariables): Promise<Types.AddAppToChat> {
        return this.mutate('AddAppToChat', variables);
    }
    async mutateUserStorageSet(variables: Types.UserStorageSetVariables): Promise<Types.UserStorageSet> {
        return this.mutate('UserStorageSet', variables);
    }
    async mutateSuperBadgeCreateToRoom(variables: Types.SuperBadgeCreateToRoomVariables): Promise<Types.SuperBadgeCreateToRoom> {
        return this.mutate('SuperBadgeCreateToRoom', variables);
    }
    async mutateSuperBadgeUnsetToRoom(variables: Types.SuperBadgeUnsetToRoomVariables): Promise<Types.SuperBadgeUnsetToRoom> {
        return this.mutate('SuperBadgeUnsetToRoom', variables);
    }
    async mutatePinMessage(variables: Types.PinMessageVariables): Promise<Types.PinMessage> {
        return this.mutate('PinMessage', variables);
    }
    async mutateUnpinMessage(variables: Types.UnpinMessageVariables): Promise<Types.UnpinMessage> {
        return this.mutate('UnpinMessage', variables);
    }
    async mutateMessageSetReaction(variables: Types.MessageSetReactionVariables): Promise<Types.MessageSetReaction> {
        return this.mutate('MessageSetReaction', variables);
    }
    async mutateMessageUnsetReaction(variables: Types.MessageUnsetReactionVariables): Promise<Types.MessageUnsetReaction> {
        return this.mutate('MessageUnsetReaction', variables);
    }
    async mutateSendMessage(variables: Types.SendMessageVariables): Promise<Types.SendMessage> {
        return this.mutate('SendMessage', variables);
    }
    async mutateRoomRead(variables: Types.RoomReadVariables): Promise<Types.RoomRead> {
        return this.mutate('RoomRead', variables);
    }
    async mutateRoomCreate(variables: Types.RoomCreateVariables): Promise<Types.RoomCreate> {
        return this.mutate('RoomCreate', variables);
    }
    async mutateBuyPremiumChatSubscription(variables: Types.BuyPremiumChatSubscriptionVariables): Promise<Types.BuyPremiumChatSubscription> {
        return this.mutate('BuyPremiumChatSubscription', variables);
    }
    async mutateSetTyping(variables: Types.SetTypingVariables): Promise<Types.SetTyping> {
        return this.mutate('SetTyping', variables);
    }
    async mutateUnsetTyping(variables: Types.UnsetTypingVariables): Promise<Types.UnsetTyping> {
        return this.mutate('UnsetTyping', variables);
    }
    async mutateRoomAddMembers(variables: Types.RoomAddMembersVariables): Promise<Types.RoomAddMembers> {
        return this.mutate('RoomAddMembers', variables);
    }
    async mutateRoomKick(variables: Types.RoomKickVariables): Promise<Types.RoomKick> {
        return this.mutate('RoomKick', variables);
    }
    async mutateRoomChangeRole(variables: Types.RoomChangeRoleVariables): Promise<Types.RoomChangeRole> {
        return this.mutate('RoomChangeRole', variables);
    }
    async mutateRoomLeave(variables: Types.RoomLeaveVariables): Promise<Types.RoomLeave> {
        return this.mutate('RoomLeave', variables);
    }
    async mutateRoomAlterFeatured(variables: Types.RoomAlterFeaturedVariables): Promise<Types.RoomAlterFeatured> {
        return this.mutate('RoomAlterFeatured', variables);
    }
    async mutateRoomAlterHidden(variables: Types.RoomAlterHiddenVariables): Promise<Types.RoomAlterHidden> {
        return this.mutate('RoomAlterHidden', variables);
    }
    async mutateRoomSettingsUpdate(variables: Types.RoomSettingsUpdateVariables): Promise<Types.RoomSettingsUpdate> {
        return this.mutate('RoomSettingsUpdate', variables);
    }
    async mutateRoomJoin(variables: Types.RoomJoinVariables): Promise<Types.RoomJoin> {
        return this.mutate('RoomJoin', variables);
    }
    async mutateRoomsJoin(variables: Types.RoomsJoinVariables): Promise<Types.RoomsJoin> {
        return this.mutate('RoomsJoin', variables);
    }
    async mutateRoomsInviteUser(variables: Types.RoomsInviteUserVariables): Promise<Types.RoomsInviteUser> {
        return this.mutate('RoomsInviteUser', variables);
    }
    async mutateRoomJoinInviteLink(variables: Types.RoomJoinInviteLinkVariables): Promise<Types.RoomJoinInviteLink> {
        return this.mutate('RoomJoinInviteLink', variables);
    }
    async mutateRoomRenewInviteLink(variables: Types.RoomRenewInviteLinkVariables): Promise<Types.RoomRenewInviteLink> {
        return this.mutate('RoomRenewInviteLink', variables);
    }
    async mutateRoomUpdate(variables: Types.RoomUpdateVariables): Promise<Types.RoomUpdate> {
        return this.mutate('RoomUpdate', variables);
    }
    async mutateRoomDeleteMessage(variables: Types.RoomDeleteMessageVariables): Promise<Types.RoomDeleteMessage> {
        return this.mutate('RoomDeleteMessage', variables);
    }
    async mutateRoomDeleteMessages(variables: Types.RoomDeleteMessagesVariables): Promise<Types.RoomDeleteMessages> {
        return this.mutate('RoomDeleteMessages', variables);
    }
    async mutateRoomDeleteUrlAugmentation(variables: Types.RoomDeleteUrlAugmentationVariables): Promise<Types.RoomDeleteUrlAugmentation> {
        return this.mutate('RoomDeleteUrlAugmentation', variables);
    }
    async mutateEditMessage(variables: Types.EditMessageVariables): Promise<Types.EditMessage> {
        return this.mutate('EditMessage', variables);
    }
    async mutateMarkSequenceRead(variables: Types.MarkSequenceReadVariables): Promise<Types.MarkSequenceRead> {
        return this.mutate('MarkSequenceRead', variables);
    }
    async mutateUpdateWelcomeMessage(variables: Types.UpdateWelcomeMessageVariables): Promise<Types.UpdateWelcomeMessage> {
        return this.mutate('UpdateWelcomeMessage', variables);
    }
    async mutateDeleteComment(variables: Types.DeleteCommentVariables): Promise<Types.DeleteComment> {
        return this.mutate('DeleteComment', variables);
    }
    async mutateCommentSetReaction(variables: Types.CommentSetReactionVariables): Promise<Types.CommentSetReaction> {
        return this.mutate('CommentSetReaction', variables);
    }
    async mutateCommentUnsetReaction(variables: Types.CommentUnsetReactionVariables): Promise<Types.CommentUnsetReaction> {
        return this.mutate('CommentUnsetReaction', variables);
    }
    async mutateDeleteNotification(variables: Types.DeleteNotificationVariables): Promise<Types.DeleteNotification> {
        return this.mutate('DeleteNotification', variables);
    }
    async mutateSubscribeToComments(variables: Types.SubscribeToCommentsVariables): Promise<Types.SubscribeToComments> {
        return this.mutate('SubscribeToComments', variables);
    }
    async mutateUnSubscribeFromComments(variables: Types.UnSubscribeFromCommentsVariables): Promise<Types.UnSubscribeFromComments> {
        return this.mutate('UnSubscribeFromComments', variables);
    }
    async mutateAddComment(variables: Types.AddCommentVariables): Promise<Types.AddComment> {
        return this.mutate('AddComment', variables);
    }
    async mutateEditComment(variables: Types.EditCommentVariables): Promise<Types.EditComment> {
        return this.mutate('EditComment', variables);
    }
    async mutateConferenceJoin(variables: Types.ConferenceJoinVariables): Promise<Types.ConferenceJoin> {
        return this.mutate('ConferenceJoin', variables);
    }
    async mutateConferenceLeave(variables: Types.ConferenceLeaveVariables): Promise<Types.ConferenceLeave> {
        return this.mutate('ConferenceLeave', variables);
    }
    async mutateConferenceKeepAlive(variables: Types.ConferenceKeepAliveVariables): Promise<Types.ConferenceKeepAlive> {
        return this.mutate('ConferenceKeepAlive', variables);
    }
    async mutateConferenceOffer(variables: Types.ConferenceOfferVariables): Promise<Types.ConferenceOffer> {
        return this.mutate('ConferenceOffer', variables);
    }
    async mutateConferenceAnswer(variables: Types.ConferenceAnswerVariables): Promise<Types.ConferenceAnswer> {
        return this.mutate('ConferenceAnswer', variables);
    }
    async mutateConferenceCandidate(variables: Types.ConferenceCandidateVariables): Promise<Types.ConferenceCandidate> {
        return this.mutate('ConferenceCandidate', variables);
    }
    async mutateMediaOffer(variables: Types.MediaOfferVariables): Promise<Types.MediaOffer> {
        return this.mutate('MediaOffer', variables);
    }
    async mutateMediaNegotiationNeeded(variables: Types.MediaNegotiationNeededVariables): Promise<Types.MediaNegotiationNeeded> {
        return this.mutate('MediaNegotiationNeeded', variables);
    }
    async mutateMediaFailed(variables: Types.MediaFailedVariables): Promise<Types.MediaFailed> {
        return this.mutate('MediaFailed', variables);
    }
    async mutateMediaAnswer(variables: Types.MediaAnswerVariables): Promise<Types.MediaAnswer> {
        return this.mutate('MediaAnswer', variables);
    }
    async mutateMediaCandidate(variables: Types.MediaCandidateVariables): Promise<Types.MediaCandidate> {
        return this.mutate('MediaCandidate', variables);
    }
    async mutateBetaSubmitNextDiscover(variables: Types.BetaSubmitNextDiscoverVariables): Promise<Types.BetaSubmitNextDiscover> {
        return this.mutate('BetaSubmitNextDiscover', variables);
    }
    async mutateBetaDiscoverSkip(variables: Types.BetaDiscoverSkipVariables): Promise<Types.BetaDiscoverSkip> {
        return this.mutate('BetaDiscoverSkip', variables);
    }
    async mutateFeatureFlagAdd(variables: Types.FeatureFlagAddVariables): Promise<Types.FeatureFlagAdd> {
        return this.mutate('FeatureFlagAdd', variables);
    }
    async mutateFeatureFlagEnable(variables: Types.FeatureFlagEnableVariables): Promise<Types.FeatureFlagEnable> {
        return this.mutate('FeatureFlagEnable', variables);
    }
    async mutateFeatureFlagDisable(variables: Types.FeatureFlagDisableVariables): Promise<Types.FeatureFlagDisable> {
        return this.mutate('FeatureFlagDisable', variables);
    }
    async mutateFeedChannelCreate(variables: Types.FeedChannelCreateVariables): Promise<Types.FeedChannelCreate> {
        return this.mutate('FeedChannelCreate', variables);
    }
    async mutateFeedChannelUpdate(variables: Types.FeedChannelUpdateVariables): Promise<Types.FeedChannelUpdate> {
        return this.mutate('FeedChannelUpdate', variables);
    }
    async mutateFeedChannelSubscribe(variables: Types.FeedChannelSubscribeVariables): Promise<Types.FeedChannelSubscribe> {
        return this.mutate('FeedChannelSubscribe', variables);
    }
    async mutateFeedChannelUnsubscribe(variables: Types.FeedChannelUnsubscribeVariables): Promise<Types.FeedChannelUnsubscribe> {
        return this.mutate('FeedChannelUnsubscribe', variables);
    }
    async mutateFeedChannelAddWriter(variables: Types.FeedChannelAddWriterVariables): Promise<Types.FeedChannelAddWriter> {
        return this.mutate('FeedChannelAddWriter', variables);
    }
    async mutateFeedChannelRemoveWriter(variables: Types.FeedChannelRemoveWriterVariables): Promise<Types.FeedChannelRemoveWriter> {
        return this.mutate('FeedChannelRemoveWriter', variables);
    }
    async mutateFeedEditPost(variables: Types.FeedEditPostVariables): Promise<Types.FeedEditPost> {
        return this.mutate('FeedEditPost', variables);
    }
    async mutateFeedCreatePost(variables: Types.FeedCreatePostVariables): Promise<Types.FeedCreatePost> {
        return this.mutate('FeedCreatePost', variables);
    }
    async mutateFeedReactionAdd(variables: Types.FeedReactionAddVariables): Promise<Types.FeedReactionAdd> {
        return this.mutate('FeedReactionAdd', variables);
    }
    async mutateFeedReactionRemove(variables: Types.FeedReactionRemoveVariables): Promise<Types.FeedReactionRemove> {
        return this.mutate('FeedReactionRemove', variables);
    }
    async mutateFeedDeletePost(variables: Types.FeedDeletePostVariables): Promise<Types.FeedDeletePost> {
        return this.mutate('FeedDeletePost', variables);
    }
    async mutateCreateCardSetupIntent(variables: Types.CreateCardSetupIntentVariables): Promise<Types.CreateCardSetupIntent> {
        return this.mutate('CreateCardSetupIntent', variables);
    }
    async mutateCommitCardSetupIntent(variables: Types.CommitCardSetupIntentVariables): Promise<Types.CommitCardSetupIntent> {
        return this.mutate('CommitCardSetupIntent', variables);
    }
    async mutateRemoveCard(variables: Types.RemoveCardVariables): Promise<Types.RemoveCard> {
        return this.mutate('RemoveCard', variables);
    }
    async mutateMakeCardDefault(variables: Types.MakeCardDefaultVariables): Promise<Types.MakeCardDefault> {
        return this.mutate('MakeCardDefault', variables);
    }
    async mutateCreateDepositIntent(variables: Types.CreateDepositIntentVariables): Promise<Types.CreateDepositIntent> {
        return this.mutate('CreateDepositIntent', variables);
    }
    async mutatePaymentIntentCommit(variables: Types.PaymentIntentCommitVariables): Promise<Types.PaymentIntentCommit> {
        return this.mutate('PaymentIntentCommit', variables);
    }
    async mutatePaymentIntentCancel(variables: Types.PaymentIntentCancelVariables): Promise<Types.PaymentIntentCancel> {
        return this.mutate('PaymentIntentCancel', variables);
    }
    async mutateDonate(variables: Types.DonateVariables): Promise<Types.Donate> {
        return this.mutate('Donate', variables);
    }
    async mutateMatchmakingRoomSave(variables: Types.MatchmakingRoomSaveVariables): Promise<Types.MatchmakingRoomSave> {
        return this.mutate('MatchmakingRoomSave', variables);
    }
    async mutateMatchmakingProfileFill(variables: Types.MatchmakingProfileFillVariables): Promise<Types.MatchmakingProfileFill> {
        return this.mutate('MatchmakingProfileFill', variables);
    }
    async mutateMatchmakingConnect(variables: Types.MatchmakingConnectVariables): Promise<Types.MatchmakingConnect> {
        return this.mutate('MatchmakingConnect', variables);
    }
    async mutateMyNotificationCenterMarkSeqRead(variables: Types.MyNotificationCenterMarkSeqReadVariables): Promise<Types.MyNotificationCenterMarkSeqRead> {
        return this.mutate('MyNotificationCenterMarkSeqRead', variables);
    }
    async mutateReadNotification(variables: Types.ReadNotificationVariables): Promise<Types.ReadNotification> {
        return this.mutate('ReadNotification', variables);
    }
    async mutateUpdateOrganization(variables: Types.UpdateOrganizationVariables): Promise<Types.UpdateOrganization> {
        return this.mutate('UpdateOrganization', variables);
    }
    async mutateOrganizationChangeMemberRole(variables: Types.OrganizationChangeMemberRoleVariables): Promise<Types.OrganizationChangeMemberRole> {
        return this.mutate('OrganizationChangeMemberRole', variables);
    }
    async mutateOrganizationAddMember(variables: Types.OrganizationAddMemberVariables): Promise<Types.OrganizationAddMember> {
        return this.mutate('OrganizationAddMember', variables);
    }
    async mutateOrganizationCreatePublicInvite(variables: Types.OrganizationCreatePublicInviteVariables): Promise<Types.OrganizationCreatePublicInvite> {
        return this.mutate('OrganizationCreatePublicInvite', variables);
    }
    async mutateDeleteOrganization(variables: Types.DeleteOrganizationVariables): Promise<Types.DeleteOrganization> {
        return this.mutate('DeleteOrganization', variables);
    }
    async mutateOrganizationMemberRemove(variables: Types.OrganizationMemberRemoveVariables): Promise<Types.OrganizationMemberRemove> {
        return this.mutate('OrganizationMemberRemove', variables);
    }
    async mutateOrganizationActivateByInvite(variables: Types.OrganizationActivateByInviteVariables): Promise<Types.OrganizationActivateByInvite> {
        return this.mutate('OrganizationActivateByInvite', variables);
    }
    async mutateOrganizationAlterPublished(variables: Types.OrganizationAlterPublishedVariables): Promise<Types.OrganizationAlterPublished> {
        return this.mutate('OrganizationAlterPublished', variables);
    }
    async mutateDebugMails(variables: Types.DebugMailsVariables): Promise<Types.DebugMails> {
        return this.mutate('DebugMails', variables);
    }
    async mutateSuperAccountRename(variables: Types.SuperAccountRenameVariables): Promise<Types.SuperAccountRename> {
        return this.mutate('SuperAccountRename', variables);
    }
    async mutateSuperAccountActivate(variables: Types.SuperAccountActivateVariables): Promise<Types.SuperAccountActivate> {
        return this.mutate('SuperAccountActivate', variables);
    }
    async mutateSuperAccountSuspend(variables: Types.SuperAccountSuspendVariables): Promise<Types.SuperAccountSuspend> {
        return this.mutate('SuperAccountSuspend', variables);
    }
    async mutateSuperAccountPend(variables: Types.SuperAccountPendVariables): Promise<Types.SuperAccountPend> {
        return this.mutate('SuperAccountPend', variables);
    }
    async mutateSuperAccountAdd(variables: Types.SuperAccountAddVariables): Promise<Types.SuperAccountAdd> {
        return this.mutate('SuperAccountAdd', variables);
    }
    async mutateSuperAccountMemberAdd(variables: Types.SuperAccountMemberAddVariables): Promise<Types.SuperAccountMemberAdd> {
        return this.mutate('SuperAccountMemberAdd', variables);
    }
    async mutateSuperAccountMemberRemove(variables: Types.SuperAccountMemberRemoveVariables): Promise<Types.SuperAccountMemberRemove> {
        return this.mutate('SuperAccountMemberRemove', variables);
    }
    async mutateSuperAdminAdd(variables: Types.SuperAdminAddVariables): Promise<Types.SuperAdminAdd> {
        return this.mutate('SuperAdminAdd', variables);
    }
    async mutateSuperAdminRemove(variables: Types.SuperAdminRemoveVariables): Promise<Types.SuperAdminRemove> {
        return this.mutate('SuperAdminRemove', variables);
    }
    async mutateReportContent(variables: Types.ReportContentVariables): Promise<Types.ReportContent> {
        return this.mutate('ReportContent', variables);
    }
    async mutateProfileUpdate(variables: Types.ProfileUpdateVariables): Promise<Types.ProfileUpdate> {
        return this.mutate('ProfileUpdate', variables);
    }
    async mutateProfileCreate(variables: Types.ProfileCreateVariables): Promise<Types.ProfileCreate> {
        return this.mutate('ProfileCreate', variables);
    }
    async mutateSettingsUpdate(variables: Types.SettingsUpdateVariables): Promise<Types.SettingsUpdate> {
        return this.mutate('SettingsUpdate', variables);
    }
    async mutateSetOrgShortname(variables: Types.SetOrgShortnameVariables): Promise<Types.SetOrgShortname> {
        return this.mutate('SetOrgShortname', variables);
    }
    async mutateSetUserShortname(variables: Types.SetUserShortnameVariables): Promise<Types.SetUserShortname> {
        return this.mutate('SetUserShortname', variables);
    }
    async mutateSetFeedChannelShortname(variables: Types.SetFeedChannelShortnameVariables): Promise<Types.SetFeedChannelShortname> {
        return this.mutate('SetFeedChannelShortname', variables);
    }
    async mutateStickerPackAddToCollection(variables: Types.StickerPackAddToCollectionVariables): Promise<Types.StickerPackAddToCollection> {
        return this.mutate('StickerPackAddToCollection', variables);
    }
    async mutateStickerPackRemoveFromCollection(variables: Types.StickerPackRemoveFromCollectionVariables): Promise<Types.StickerPackRemoveFromCollection> {
        return this.mutate('StickerPackRemoveFromCollection', variables);
    }
    async mutateSendSticker(variables: Types.SendStickerVariables): Promise<Types.SendSticker> {
        return this.mutate('SendSticker', variables);
    }
    async mutateAddStickerComment(variables: Types.AddStickerCommentVariables): Promise<Types.AddStickerComment> {
        return this.mutate('AddStickerComment', variables);
    }
    async mutatePersistEvents(variables: Types.PersistEventsVariables): Promise<Types.PersistEvents> {
        return this.mutate('PersistEvents', variables);
    }
    async mutateDeleteUser(variables: Types.DeleteUserVariables): Promise<Types.DeleteUser> {
        return this.mutate('DeleteUser', variables);
    }
    async mutateBetaNextDiscoverReset(): Promise<Types.BetaNextDiscoverReset> {
        return this.mutate('BetaNextDiscoverReset');
    }
    subscribeSettingsWatch(handler: GraphqlSubscriptionHandler<Types.SettingsWatch>): GraphqlActiveSubscription<Types.SettingsWatch> {
        return this.subscribe(handler, 'SettingsWatch');
    }
    subscribeChatWatch(variables: Types.ChatWatchVariables, handler: GraphqlSubscriptionHandler<Types.ChatWatch>): GraphqlActiveSubscription<Types.ChatWatch> {
        return this.subscribe(handler, 'ChatWatch', variables);
    }
    subscribeDialogsWatch(variables: Types.DialogsWatchVariables, handler: GraphqlSubscriptionHandler<Types.DialogsWatch>): GraphqlActiveSubscription<Types.DialogsWatch> {
        return this.subscribe(handler, 'DialogsWatch', variables);
    }
    subscribeTypingsWatch(handler: GraphqlSubscriptionHandler<Types.TypingsWatch>): GraphqlActiveSubscription<Types.TypingsWatch> {
        return this.subscribe(handler, 'TypingsWatch');
    }
    subscribeChatOnlinesCountWatch(variables: Types.ChatOnlinesCountWatchVariables, handler: GraphqlSubscriptionHandler<Types.ChatOnlinesCountWatch>): GraphqlActiveSubscription<Types.ChatOnlinesCountWatch> {
        return this.subscribe(handler, 'ChatOnlinesCountWatch', variables);
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
    subscribeFeedUpdates(variables: Types.FeedUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.FeedUpdates>): GraphqlActiveSubscription<Types.FeedUpdates> {
        return this.subscribe(handler, 'FeedUpdates', variables);
    }
    subscribeWalletUpdates(variables: Types.WalletUpdatesVariables, handler: GraphqlSubscriptionHandler<Types.WalletUpdates>): GraphqlActiveSubscription<Types.WalletUpdates> {
        return this.subscribe(handler, 'WalletUpdates', variables);
    }
    subscribeMyNotificationsCenter(variables: Types.MyNotificationsCenterVariables, handler: GraphqlSubscriptionHandler<Types.MyNotificationsCenter>): GraphqlActiveSubscription<Types.MyNotificationsCenter> {
        return this.subscribe(handler, 'MyNotificationsCenter', variables);
    }
    subscribeDebugEventsWatch(variables: Types.DebugEventsWatchVariables, handler: GraphqlSubscriptionHandler<Types.DebugEventsWatch>): GraphqlActiveSubscription<Types.DebugEventsWatch> {
        return this.subscribe(handler, 'DebugEventsWatch', variables);
    }
    subscribeOnlineWatch(variables: Types.OnlineWatchVariables, handler: GraphqlSubscriptionHandler<Types.OnlineWatch>): GraphqlActiveSubscription<Types.OnlineWatch> {
        return this.subscribe(handler, 'OnlineWatch', variables);
    }
}
