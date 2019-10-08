import * as Source from './index';
import * as Types from './Types';
import { GraphqlClient, GraphqlActiveSubscription, OperationParameters, QueryWatchParameters } from 'openland-graphql/GraphqlClient';
import { BaseApiClient } from 'openland-graphql/BaseApiClient';

export class OpenlandClient extends BaseApiClient {
    constructor(client: GraphqlClient) {
        super(client);
    }
    async queryAccount(opts?: OperationParameters): Promise<Types.Account> {
        return this.client.query(Source.AccountQuery, undefined, opts);
    }
    async refetchAccount(): Promise<Types.Account> {
        return this.refetch(Source.AccountQuery);
    }
    useAccount(opts?: QueryWatchParameters): Types.Account {
        return this.useQuerySuspense(Source.AccountQuery, undefined, opts);
    }
    useWithoutLoaderAccount(opts?: QueryWatchParameters): Types.Account | null {
        return this.useQuery(Source.AccountQuery, undefined, opts);
    }
    async queryAccountSettings(opts?: OperationParameters): Promise<Types.AccountSettings> {
        return this.client.query(Source.AccountSettingsQuery, undefined, opts);
    }
    async refetchAccountSettings(): Promise<Types.AccountSettings> {
        return this.refetch(Source.AccountSettingsQuery);
    }
    useAccountSettings(opts?: QueryWatchParameters): Types.AccountSettings {
        return this.useQuerySuspense(Source.AccountSettingsQuery, undefined, opts);
    }
    useWithoutLoaderAccountSettings(opts?: QueryWatchParameters): Types.AccountSettings | null {
        return this.useQuery(Source.AccountSettingsQuery, undefined, opts);
    }
    async queryAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountInviteInfo> {
        return this.client.query(Source.AccountInviteInfoQuery, variables, opts);
    }
    async refetchAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Promise<Types.AccountInviteInfo> {
        return this.refetch(Source.AccountInviteInfoQuery, variables);
    }
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: QueryWatchParameters): Types.AccountInviteInfo {
        return this.useQuerySuspense(Source.AccountInviteInfoQuery, variables, opts);
    }
    useWithoutLoaderAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: QueryWatchParameters): Types.AccountInviteInfo | null {
        return this.useQuery(Source.AccountInviteInfoQuery, variables, opts);
    }
    async queryAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountAppInviteInfo> {
        return this.client.query(Source.AccountAppInviteInfoQuery, variables, opts);
    }
    async refetchAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Promise<Types.AccountAppInviteInfo> {
        return this.refetch(Source.AccountAppInviteInfoQuery, variables);
    }
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: QueryWatchParameters): Types.AccountAppInviteInfo {
        return this.useQuerySuspense(Source.AccountAppInviteInfoQuery, variables, opts);
    }
    useWithoutLoaderAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: QueryWatchParameters): Types.AccountAppInviteInfo | null {
        return this.useQuery(Source.AccountAppInviteInfoQuery, variables, opts);
    }
    async queryAccountAppInvite(opts?: OperationParameters): Promise<Types.AccountAppInvite> {
        return this.client.query(Source.AccountAppInviteQuery, undefined, opts);
    }
    async refetchAccountAppInvite(): Promise<Types.AccountAppInvite> {
        return this.refetch(Source.AccountAppInviteQuery);
    }
    useAccountAppInvite(opts?: QueryWatchParameters): Types.AccountAppInvite {
        return this.useQuerySuspense(Source.AccountAppInviteQuery, undefined, opts);
    }
    useWithoutLoaderAccountAppInvite(opts?: QueryWatchParameters): Types.AccountAppInvite | null {
        return this.useQuery(Source.AccountAppInviteQuery, undefined, opts);
    }
    async queryProfilePrefill(opts?: OperationParameters): Promise<Types.ProfilePrefill> {
        return this.client.query(Source.ProfilePrefillQuery, undefined, opts);
    }
    async refetchProfilePrefill(): Promise<Types.ProfilePrefill> {
        return this.refetch(Source.ProfilePrefillQuery);
    }
    useProfilePrefill(opts?: QueryWatchParameters): Types.ProfilePrefill {
        return this.useQuerySuspense(Source.ProfilePrefillQuery, undefined, opts);
    }
    useWithoutLoaderProfilePrefill(opts?: QueryWatchParameters): Types.ProfilePrefill | null {
        return this.useQuery(Source.ProfilePrefillQuery, undefined, opts);
    }
    async queryFetchPushSettings(opts?: OperationParameters): Promise<Types.FetchPushSettings> {
        return this.client.query(Source.FetchPushSettingsQuery, undefined, opts);
    }
    async refetchFetchPushSettings(): Promise<Types.FetchPushSettings> {
        return this.refetch(Source.FetchPushSettingsQuery);
    }
    useFetchPushSettings(opts?: QueryWatchParameters): Types.FetchPushSettings {
        return this.useQuerySuspense(Source.FetchPushSettingsQuery, undefined, opts);
    }
    useWithoutLoaderFetchPushSettings(opts?: QueryWatchParameters): Types.FetchPushSettings | null {
        return this.useQuery(Source.FetchPushSettingsQuery, undefined, opts);
    }
    async queryMyApps(opts?: OperationParameters): Promise<Types.MyApps> {
        return this.client.query(Source.MyAppsQuery, undefined, opts);
    }
    async refetchMyApps(): Promise<Types.MyApps> {
        return this.refetch(Source.MyAppsQuery);
    }
    useMyApps(opts?: QueryWatchParameters): Types.MyApps {
        return this.useQuerySuspense(Source.MyAppsQuery, undefined, opts);
    }
    useWithoutLoaderMyApps(opts?: QueryWatchParameters): Types.MyApps | null {
        return this.useQuery(Source.MyAppsQuery, undefined, opts);
    }
    async queryUserStorage(variables: Types.UserStorageVariables, opts?: OperationParameters): Promise<Types.UserStorage> {
        return this.client.query(Source.UserStorageQuery, variables, opts);
    }
    async refetchUserStorage(variables: Types.UserStorageVariables): Promise<Types.UserStorage> {
        return this.refetch(Source.UserStorageQuery, variables);
    }
    useUserStorage(variables: Types.UserStorageVariables, opts?: QueryWatchParameters): Types.UserStorage {
        return this.useQuerySuspense(Source.UserStorageQuery, variables, opts);
    }
    useWithoutLoaderUserStorage(variables: Types.UserStorageVariables, opts?: QueryWatchParameters): Types.UserStorage | null {
        return this.useQuery(Source.UserStorageQuery, variables, opts);
    }
    async querySuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: OperationParameters): Promise<Types.SuperBadgeInRoom> {
        return this.client.query(Source.SuperBadgeInRoomQuery, variables, opts);
    }
    async refetchSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables): Promise<Types.SuperBadgeInRoom> {
        return this.refetch(Source.SuperBadgeInRoomQuery, variables);
    }
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: QueryWatchParameters): Types.SuperBadgeInRoom {
        return this.useQuerySuspense(Source.SuperBadgeInRoomQuery, variables, opts);
    }
    useWithoutLoaderSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: QueryWatchParameters): Types.SuperBadgeInRoom | null {
        return this.useQuery(Source.SuperBadgeInRoomQuery, variables, opts);
    }
    async queryDialogs(variables: Types.DialogsVariables, opts?: OperationParameters): Promise<Types.Dialogs> {
        return this.client.query(Source.DialogsQuery, variables, opts);
    }
    async refetchDialogs(variables: Types.DialogsVariables): Promise<Types.Dialogs> {
        return this.refetch(Source.DialogsQuery, variables);
    }
    useDialogs(variables: Types.DialogsVariables, opts?: QueryWatchParameters): Types.Dialogs {
        return this.useQuerySuspense(Source.DialogsQuery, variables, opts);
    }
    useWithoutLoaderDialogs(variables: Types.DialogsVariables, opts?: QueryWatchParameters): Types.Dialogs | null {
        return this.useQuery(Source.DialogsQuery, variables, opts);
    }
    async queryRoom(variables: Types.RoomVariables, opts?: OperationParameters): Promise<Types.Room> {
        return this.client.query(Source.RoomQuery, variables, opts);
    }
    async refetchRoom(variables: Types.RoomVariables): Promise<Types.Room> {
        return this.refetch(Source.RoomQuery, variables);
    }
    useRoom(variables: Types.RoomVariables, opts?: QueryWatchParameters): Types.Room {
        return this.useQuerySuspense(Source.RoomQuery, variables, opts);
    }
    useWithoutLoaderRoom(variables: Types.RoomVariables, opts?: QueryWatchParameters): Types.Room | null {
        return this.useQuery(Source.RoomQuery, variables, opts);
    }
    async queryRoomPico(variables: Types.RoomPicoVariables, opts?: OperationParameters): Promise<Types.RoomPico> {
        return this.client.query(Source.RoomPicoQuery, variables, opts);
    }
    async refetchRoomPico(variables: Types.RoomPicoVariables): Promise<Types.RoomPico> {
        return this.refetch(Source.RoomPicoQuery, variables);
    }
    useRoomPico(variables: Types.RoomPicoVariables, opts?: QueryWatchParameters): Types.RoomPico {
        return this.useQuerySuspense(Source.RoomPicoQuery, variables, opts);
    }
    useWithoutLoaderRoomPico(variables: Types.RoomPicoVariables, opts?: QueryWatchParameters): Types.RoomPico | null {
        return this.useQuery(Source.RoomPicoQuery, variables, opts);
    }
    async queryRoomChat(variables: Types.RoomChatVariables, opts?: OperationParameters): Promise<Types.RoomChat> {
        return this.client.query(Source.RoomChatQuery, variables, opts);
    }
    async refetchRoomChat(variables: Types.RoomChatVariables): Promise<Types.RoomChat> {
        return this.refetch(Source.RoomChatQuery, variables);
    }
    useRoomChat(variables: Types.RoomChatVariables, opts?: QueryWatchParameters): Types.RoomChat {
        return this.useQuerySuspense(Source.RoomChatQuery, variables, opts);
    }
    useWithoutLoaderRoomChat(variables: Types.RoomChatVariables, opts?: QueryWatchParameters): Types.RoomChat | null {
        return this.useQuery(Source.RoomChatQuery, variables, opts);
    }
    async queryRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts?: OperationParameters): Promise<Types.RoomWithoutMembers> {
        return this.client.query(Source.RoomWithoutMembersQuery, variables, opts);
    }
    async refetchRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables): Promise<Types.RoomWithoutMembers> {
        return this.refetch(Source.RoomWithoutMembersQuery, variables);
    }
    useRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts?: QueryWatchParameters): Types.RoomWithoutMembers {
        return this.useQuerySuspense(Source.RoomWithoutMembersQuery, variables, opts);
    }
    useWithoutLoaderRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts?: QueryWatchParameters): Types.RoomWithoutMembers | null {
        return this.useQuery(Source.RoomWithoutMembersQuery, variables, opts);
    }
    async queryRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: OperationParameters): Promise<Types.RoomFeaturedMembers> {
        return this.client.query(Source.RoomFeaturedMembersQuery, variables, opts);
    }
    async refetchRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables): Promise<Types.RoomFeaturedMembers> {
        return this.refetch(Source.RoomFeaturedMembersQuery, variables);
    }
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: QueryWatchParameters): Types.RoomFeaturedMembers {
        return this.useQuerySuspense(Source.RoomFeaturedMembersQuery, variables, opts);
    }
    useWithoutLoaderRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: QueryWatchParameters): Types.RoomFeaturedMembers | null {
        return this.useQuery(Source.RoomFeaturedMembersQuery, variables, opts);
    }
    async queryRoomTiny(variables: Types.RoomTinyVariables, opts?: OperationParameters): Promise<Types.RoomTiny> {
        return this.client.query(Source.RoomTinyQuery, variables, opts);
    }
    async refetchRoomTiny(variables: Types.RoomTinyVariables): Promise<Types.RoomTiny> {
        return this.refetch(Source.RoomTinyQuery, variables);
    }
    useRoomTiny(variables: Types.RoomTinyVariables, opts?: QueryWatchParameters): Types.RoomTiny {
        return this.useQuerySuspense(Source.RoomTinyQuery, variables, opts);
    }
    useWithoutLoaderRoomTiny(variables: Types.RoomTinyVariables, opts?: QueryWatchParameters): Types.RoomTiny | null {
        return this.useQuery(Source.RoomTinyQuery, variables, opts);
    }
    async queryRoomSuper(variables: Types.RoomSuperVariables, opts?: OperationParameters): Promise<Types.RoomSuper> {
        return this.client.query(Source.RoomSuperQuery, variables, opts);
    }
    async refetchRoomSuper(variables: Types.RoomSuperVariables): Promise<Types.RoomSuper> {
        return this.refetch(Source.RoomSuperQuery, variables);
    }
    useRoomSuper(variables: Types.RoomSuperVariables, opts?: QueryWatchParameters): Types.RoomSuper {
        return this.useQuerySuspense(Source.RoomSuperQuery, variables, opts);
    }
    useWithoutLoaderRoomSuper(variables: Types.RoomSuperVariables, opts?: QueryWatchParameters): Types.RoomSuper | null {
        return this.useQuery(Source.RoomSuperQuery, variables, opts);
    }
    async queryGlobalCounter(opts?: OperationParameters): Promise<Types.GlobalCounter> {
        return this.client.query(Source.GlobalCounterQuery, undefined, opts);
    }
    async refetchGlobalCounter(): Promise<Types.GlobalCounter> {
        return this.refetch(Source.GlobalCounterQuery);
    }
    useGlobalCounter(opts?: QueryWatchParameters): Types.GlobalCounter {
        return this.useQuerySuspense(Source.GlobalCounterQuery, undefined, opts);
    }
    useWithoutLoaderGlobalCounter(opts?: QueryWatchParameters): Types.GlobalCounter | null {
        return this.useQuery(Source.GlobalCounterQuery, undefined, opts);
    }
    async queryMessagesBatch(variables: Types.MessagesBatchVariables, opts?: OperationParameters): Promise<Types.MessagesBatch> {
        return this.client.query(Source.MessagesBatchQuery, variables, opts);
    }
    async refetchMessagesBatch(variables: Types.MessagesBatchVariables): Promise<Types.MessagesBatch> {
        return this.refetch(Source.MessagesBatchQuery, variables);
    }
    useMessagesBatch(variables: Types.MessagesBatchVariables, opts?: QueryWatchParameters): Types.MessagesBatch {
        return this.useQuerySuspense(Source.MessagesBatchQuery, variables, opts);
    }
    useWithoutLoaderMessagesBatch(variables: Types.MessagesBatchVariables, opts?: QueryWatchParameters): Types.MessagesBatch | null {
        return this.useQuery(Source.MessagesBatchQuery, variables, opts);
    }
    async queryChatInit(variables: Types.ChatInitVariables, opts?: OperationParameters): Promise<Types.ChatInit> {
        return this.client.query(Source.ChatInitQuery, variables, opts);
    }
    async refetchChatInit(variables: Types.ChatInitVariables): Promise<Types.ChatInit> {
        return this.refetch(Source.ChatInitQuery, variables);
    }
    useChatInit(variables: Types.ChatInitVariables, opts?: QueryWatchParameters): Types.ChatInit {
        return this.useQuerySuspense(Source.ChatInitQuery, variables, opts);
    }
    useWithoutLoaderChatInit(variables: Types.ChatInitVariables, opts?: QueryWatchParameters): Types.ChatInit | null {
        return this.useQuery(Source.ChatInitQuery, variables, opts);
    }
    async queryChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: OperationParameters): Promise<Types.ChatInitFromUnread> {
        return this.client.query(Source.ChatInitFromUnreadQuery, variables, opts);
    }
    async refetchChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables): Promise<Types.ChatInitFromUnread> {
        return this.refetch(Source.ChatInitFromUnreadQuery, variables);
    }
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: QueryWatchParameters): Types.ChatInitFromUnread {
        return this.useQuerySuspense(Source.ChatInitFromUnreadQuery, variables, opts);
    }
    useWithoutLoaderChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: QueryWatchParameters): Types.ChatInitFromUnread | null {
        return this.useQuery(Source.ChatInitFromUnreadQuery, variables, opts);
    }
    async queryRoomSearch(variables: Types.RoomSearchVariables, opts?: OperationParameters): Promise<Types.RoomSearch> {
        return this.client.query(Source.RoomSearchQuery, variables, opts);
    }
    async refetchRoomSearch(variables: Types.RoomSearchVariables): Promise<Types.RoomSearch> {
        return this.refetch(Source.RoomSearchQuery, variables);
    }
    useRoomSearch(variables: Types.RoomSearchVariables, opts?: QueryWatchParameters): Types.RoomSearch {
        return this.useQuerySuspense(Source.RoomSearchQuery, variables, opts);
    }
    useWithoutLoaderRoomSearch(variables: Types.RoomSearchVariables, opts?: QueryWatchParameters): Types.RoomSearch | null {
        return this.useQuery(Source.RoomSearchQuery, variables, opts);
    }
    async queryRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: OperationParameters): Promise<Types.RoomMembersShort> {
        return this.client.query(Source.RoomMembersShortQuery, variables, opts);
    }
    async refetchRoomMembersShort(variables: Types.RoomMembersShortVariables): Promise<Types.RoomMembersShort> {
        return this.refetch(Source.RoomMembersShortQuery, variables);
    }
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: QueryWatchParameters): Types.RoomMembersShort {
        return this.useQuerySuspense(Source.RoomMembersShortQuery, variables, opts);
    }
    useWithoutLoaderRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: QueryWatchParameters): Types.RoomMembersShort | null {
        return this.useQuery(Source.RoomMembersShortQuery, variables, opts);
    }
    async queryRoomMembers(variables: Types.RoomMembersVariables, opts?: OperationParameters): Promise<Types.RoomMembers> {
        return this.client.query(Source.RoomMembersQuery, variables, opts);
    }
    async refetchRoomMembers(variables: Types.RoomMembersVariables): Promise<Types.RoomMembers> {
        return this.refetch(Source.RoomMembersQuery, variables);
    }
    useRoomMembers(variables: Types.RoomMembersVariables, opts?: QueryWatchParameters): Types.RoomMembers {
        return this.useQuerySuspense(Source.RoomMembersQuery, variables, opts);
    }
    useWithoutLoaderRoomMembers(variables: Types.RoomMembersVariables, opts?: QueryWatchParameters): Types.RoomMembers | null {
        return this.useQuery(Source.RoomMembersQuery, variables, opts);
    }
    async queryRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: OperationParameters): Promise<Types.RoomMembersTiny> {
        return this.client.query(Source.RoomMembersTinyQuery, variables, opts);
    }
    async refetchRoomMembersTiny(variables: Types.RoomMembersTinyVariables): Promise<Types.RoomMembersTiny> {
        return this.refetch(Source.RoomMembersTinyQuery, variables);
    }
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: QueryWatchParameters): Types.RoomMembersTiny {
        return this.useQuerySuspense(Source.RoomMembersTinyQuery, variables, opts);
    }
    useWithoutLoaderRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: QueryWatchParameters): Types.RoomMembersTiny | null {
        return this.useQuery(Source.RoomMembersTinyQuery, variables, opts);
    }
    async queryChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts?: OperationParameters): Promise<Types.ChatMembersSearch> {
        return this.client.query(Source.ChatMembersSearchQuery, variables, opts);
    }
    async refetchChatMembersSearch(variables: Types.ChatMembersSearchVariables): Promise<Types.ChatMembersSearch> {
        return this.refetch(Source.ChatMembersSearchQuery, variables);
    }
    useChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts?: QueryWatchParameters): Types.ChatMembersSearch {
        return this.useQuerySuspense(Source.ChatMembersSearchQuery, variables, opts);
    }
    useWithoutLoaderChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts?: QueryWatchParameters): Types.ChatMembersSearch | null {
        return this.useQuery(Source.ChatMembersSearchQuery, variables, opts);
    }
    async queryRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts?: OperationParameters): Promise<Types.RoomOrganizationAdminMembers> {
        return this.client.query(Source.RoomOrganizationAdminMembersQuery, variables, opts);
    }
    async refetchRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables): Promise<Types.RoomOrganizationAdminMembers> {
        return this.refetch(Source.RoomOrganizationAdminMembersQuery, variables);
    }
    useRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts?: QueryWatchParameters): Types.RoomOrganizationAdminMembers {
        return this.useQuerySuspense(Source.RoomOrganizationAdminMembersQuery, variables, opts);
    }
    useWithoutLoaderRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts?: QueryWatchParameters): Types.RoomOrganizationAdminMembers | null {
        return this.useQuery(Source.RoomOrganizationAdminMembersQuery, variables, opts);
    }
    async queryRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: OperationParameters): Promise<Types.RoomMembersPaginated> {
        return this.client.query(Source.RoomMembersPaginatedQuery, variables, opts);
    }
    async refetchRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables): Promise<Types.RoomMembersPaginated> {
        return this.refetch(Source.RoomMembersPaginatedQuery, variables);
    }
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: QueryWatchParameters): Types.RoomMembersPaginated {
        return this.useQuerySuspense(Source.RoomMembersPaginatedQuery, variables, opts);
    }
    useWithoutLoaderRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: QueryWatchParameters): Types.RoomMembersPaginated | null {
        return this.useQuery(Source.RoomMembersPaginatedQuery, variables, opts);
    }
    async queryRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: OperationParameters): Promise<Types.RoomInviteLink> {
        return this.client.query(Source.RoomInviteLinkQuery, variables, opts);
    }
    async refetchRoomInviteLink(variables: Types.RoomInviteLinkVariables): Promise<Types.RoomInviteLink> {
        return this.refetch(Source.RoomInviteLinkQuery, variables);
    }
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: QueryWatchParameters): Types.RoomInviteLink {
        return this.useQuerySuspense(Source.RoomInviteLinkQuery, variables, opts);
    }
    useWithoutLoaderRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: QueryWatchParameters): Types.RoomInviteLink | null {
        return this.useQuery(Source.RoomInviteLinkQuery, variables, opts);
    }
    async queryRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: OperationParameters): Promise<Types.RoomInviteInfo> {
        return this.client.query(Source.RoomInviteInfoQuery, variables, opts);
    }
    async refetchRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Promise<Types.RoomInviteInfo> {
        return this.refetch(Source.RoomInviteInfoQuery, variables);
    }
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: QueryWatchParameters): Types.RoomInviteInfo {
        return this.useQuerySuspense(Source.RoomInviteInfoQuery, variables, opts);
    }
    useWithoutLoaderRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: QueryWatchParameters): Types.RoomInviteInfo | null {
        return this.useQuery(Source.RoomInviteInfoQuery, variables, opts);
    }
    async queryResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: OperationParameters): Promise<Types.ResolvedInvite> {
        return this.client.query(Source.ResolvedInviteQuery, variables, opts);
    }
    async refetchResolvedInvite(variables: Types.ResolvedInviteVariables): Promise<Types.ResolvedInvite> {
        return this.refetch(Source.ResolvedInviteQuery, variables);
    }
    useResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: QueryWatchParameters): Types.ResolvedInvite {
        return this.useQuerySuspense(Source.ResolvedInviteQuery, variables, opts);
    }
    useWithoutLoaderResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: QueryWatchParameters): Types.ResolvedInvite | null {
        return this.useQuery(Source.ResolvedInviteQuery, variables, opts);
    }
    async queryMessage(variables: Types.MessageVariables, opts?: OperationParameters): Promise<Types.Message> {
        return this.client.query(Source.MessageQuery, variables, opts);
    }
    async refetchMessage(variables: Types.MessageVariables): Promise<Types.Message> {
        return this.refetch(Source.MessageQuery, variables);
    }
    useMessage(variables: Types.MessageVariables, opts?: QueryWatchParameters): Types.Message {
        return this.useQuerySuspense(Source.MessageQuery, variables, opts);
    }
    useWithoutLoaderMessage(variables: Types.MessageVariables, opts?: QueryWatchParameters): Types.Message | null {
        return this.useQuery(Source.MessageQuery, variables, opts);
    }
    async queryMessagesSearch(variables: Types.MessagesSearchVariables, opts?: OperationParameters): Promise<Types.MessagesSearch> {
        return this.client.query(Source.MessagesSearchQuery, variables, opts);
    }
    async refetchMessagesSearch(variables: Types.MessagesSearchVariables): Promise<Types.MessagesSearch> {
        return this.refetch(Source.MessagesSearchQuery, variables);
    }
    useMessagesSearch(variables: Types.MessagesSearchVariables, opts?: QueryWatchParameters): Types.MessagesSearch {
        return this.useQuerySuspense(Source.MessagesSearchQuery, variables, opts);
    }
    useWithoutLoaderMessagesSearch(variables: Types.MessagesSearchVariables, opts?: QueryWatchParameters): Types.MessagesSearch | null {
        return this.useQuery(Source.MessagesSearchQuery, variables, opts);
    }
    async queryComments(variables: Types.CommentsVariables, opts?: OperationParameters): Promise<Types.Comments> {
        return this.client.query(Source.CommentsQuery, variables, opts);
    }
    async refetchComments(variables: Types.CommentsVariables): Promise<Types.Comments> {
        return this.refetch(Source.CommentsQuery, variables);
    }
    useComments(variables: Types.CommentsVariables, opts?: QueryWatchParameters): Types.Comments {
        return this.useQuerySuspense(Source.CommentsQuery, variables, opts);
    }
    useWithoutLoaderComments(variables: Types.CommentsVariables, opts?: QueryWatchParameters): Types.Comments | null {
        return this.useQuery(Source.CommentsQuery, variables, opts);
    }
    async queryConference(variables: Types.ConferenceVariables, opts?: OperationParameters): Promise<Types.Conference> {
        return this.client.query(Source.ConferenceQuery, variables, opts);
    }
    async refetchConference(variables: Types.ConferenceVariables): Promise<Types.Conference> {
        return this.refetch(Source.ConferenceQuery, variables);
    }
    useConference(variables: Types.ConferenceVariables, opts?: QueryWatchParameters): Types.Conference {
        return this.useQuerySuspense(Source.ConferenceQuery, variables, opts);
    }
    useWithoutLoaderConference(variables: Types.ConferenceVariables, opts?: QueryWatchParameters): Types.Conference | null {
        return this.useQuery(Source.ConferenceQuery, variables, opts);
    }
    async queryConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: OperationParameters): Promise<Types.ConferenceMedia> {
        return this.client.query(Source.ConferenceMediaQuery, variables, opts);
    }
    async refetchConferenceMedia(variables: Types.ConferenceMediaVariables): Promise<Types.ConferenceMedia> {
        return this.refetch(Source.ConferenceMediaQuery, variables);
    }
    useConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: QueryWatchParameters): Types.ConferenceMedia {
        return this.useQuerySuspense(Source.ConferenceMediaQuery, variables, opts);
    }
    useWithoutLoaderConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: QueryWatchParameters): Types.ConferenceMedia | null {
        return this.useQuery(Source.ConferenceMediaQuery, variables, opts);
    }
    async queryAvailableRooms(opts?: OperationParameters): Promise<Types.AvailableRooms> {
        return this.client.query(Source.AvailableRoomsQuery, undefined, opts);
    }
    async refetchAvailableRooms(): Promise<Types.AvailableRooms> {
        return this.refetch(Source.AvailableRoomsQuery);
    }
    useAvailableRooms(opts?: QueryWatchParameters): Types.AvailableRooms {
        return this.useQuerySuspense(Source.AvailableRoomsQuery, undefined, opts);
    }
    useWithoutLoaderAvailableRooms(opts?: QueryWatchParameters): Types.AvailableRooms | null {
        return this.useQuery(Source.AvailableRoomsQuery, undefined, opts);
    }
    async querySuggestedRooms(opts?: OperationParameters): Promise<Types.SuggestedRooms> {
        return this.client.query(Source.SuggestedRoomsQuery, undefined, opts);
    }
    async refetchSuggestedRooms(): Promise<Types.SuggestedRooms> {
        return this.refetch(Source.SuggestedRoomsQuery);
    }
    useSuggestedRooms(opts?: QueryWatchParameters): Types.SuggestedRooms {
        return this.useQuerySuspense(Source.SuggestedRoomsQuery, undefined, opts);
    }
    useWithoutLoaderSuggestedRooms(opts?: QueryWatchParameters): Types.SuggestedRooms | null {
        return this.useQuery(Source.SuggestedRoomsQuery, undefined, opts);
    }
    async queryUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: OperationParameters): Promise<Types.UserAvailableRooms> {
        return this.client.query(Source.UserAvailableRoomsQuery, variables, opts);
    }
    async refetchUserAvailableRooms(variables: Types.UserAvailableRoomsVariables): Promise<Types.UserAvailableRooms> {
        return this.refetch(Source.UserAvailableRoomsQuery, variables);
    }
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: QueryWatchParameters): Types.UserAvailableRooms {
        return this.useQuerySuspense(Source.UserAvailableRoomsQuery, variables, opts);
    }
    useWithoutLoaderUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: QueryWatchParameters): Types.UserAvailableRooms | null {
        return this.useQuery(Source.UserAvailableRoomsQuery, variables, opts);
    }
    async queryGlobalSearch(variables: Types.GlobalSearchVariables, opts?: OperationParameters): Promise<Types.GlobalSearch> {
        return this.client.query(Source.GlobalSearchQuery, variables, opts);
    }
    async refetchGlobalSearch(variables: Types.GlobalSearchVariables): Promise<Types.GlobalSearch> {
        return this.refetch(Source.GlobalSearchQuery, variables);
    }
    useGlobalSearch(variables: Types.GlobalSearchVariables, opts?: QueryWatchParameters): Types.GlobalSearch {
        return this.useQuerySuspense(Source.GlobalSearchQuery, variables, opts);
    }
    useWithoutLoaderGlobalSearch(variables: Types.GlobalSearchVariables, opts?: QueryWatchParameters): Types.GlobalSearch | null {
        return this.useQuery(Source.GlobalSearchQuery, variables, opts);
    }
    async queryDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: OperationParameters): Promise<Types.DiscoverNextPage> {
        return this.client.query(Source.DiscoverNextPageQuery, variables, opts);
    }
    async refetchDiscoverNextPage(variables: Types.DiscoverNextPageVariables): Promise<Types.DiscoverNextPage> {
        return this.refetch(Source.DiscoverNextPageQuery, variables);
    }
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: QueryWatchParameters): Types.DiscoverNextPage {
        return this.useQuerySuspense(Source.DiscoverNextPageQuery, variables, opts);
    }
    useWithoutLoaderDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: QueryWatchParameters): Types.DiscoverNextPage | null {
        return this.useQuery(Source.DiscoverNextPageQuery, variables, opts);
    }
    async queryDiscoverIsDone(opts?: OperationParameters): Promise<Types.DiscoverIsDone> {
        return this.client.query(Source.DiscoverIsDoneQuery, undefined, opts);
    }
    async refetchDiscoverIsDone(): Promise<Types.DiscoverIsDone> {
        return this.refetch(Source.DiscoverIsDoneQuery);
    }
    useDiscoverIsDone(opts?: QueryWatchParameters): Types.DiscoverIsDone {
        return this.useQuerySuspense(Source.DiscoverIsDoneQuery, undefined, opts);
    }
    useWithoutLoaderDiscoverIsDone(opts?: QueryWatchParameters): Types.DiscoverIsDone | null {
        return this.useQuery(Source.DiscoverIsDoneQuery, undefined, opts);
    }
    async queryFeatureFlags(opts?: OperationParameters): Promise<Types.FeatureFlags> {
        return this.client.query(Source.FeatureFlagsQuery, undefined, opts);
    }
    async refetchFeatureFlags(): Promise<Types.FeatureFlags> {
        return this.refetch(Source.FeatureFlagsQuery);
    }
    useFeatureFlags(opts?: QueryWatchParameters): Types.FeatureFlags {
        return this.useQuerySuspense(Source.FeatureFlagsQuery, undefined, opts);
    }
    useWithoutLoaderFeatureFlags(opts?: QueryWatchParameters): Types.FeatureFlags | null {
        return this.useQuery(Source.FeatureFlagsQuery, undefined, opts);
    }
    async queryFeed(variables: Types.FeedVariables, opts?: OperationParameters): Promise<Types.Feed> {
        return this.client.query(Source.FeedQuery, variables, opts);
    }
    async refetchFeed(variables: Types.FeedVariables): Promise<Types.Feed> {
        return this.refetch(Source.FeedQuery, variables);
    }
    useFeed(variables: Types.FeedVariables, opts?: QueryWatchParameters): Types.Feed {
        return this.useQuerySuspense(Source.FeedQuery, variables, opts);
    }
    useWithoutLoaderFeed(variables: Types.FeedVariables, opts?: QueryWatchParameters): Types.Feed | null {
        return this.useQuery(Source.FeedQuery, variables, opts);
    }
    async queryFeedMyChannels(variables: Types.FeedMyChannelsVariables, opts?: OperationParameters): Promise<Types.FeedMyChannels> {
        return this.client.query(Source.FeedMyChannelsQuery, variables, opts);
    }
    async refetchFeedMyChannels(variables: Types.FeedMyChannelsVariables): Promise<Types.FeedMyChannels> {
        return this.refetch(Source.FeedMyChannelsQuery, variables);
    }
    useFeedMyChannels(variables: Types.FeedMyChannelsVariables, opts?: QueryWatchParameters): Types.FeedMyChannels {
        return this.useQuerySuspense(Source.FeedMyChannelsQuery, variables, opts);
    }
    useWithoutLoaderFeedMyChannels(variables: Types.FeedMyChannelsVariables, opts?: QueryWatchParameters): Types.FeedMyChannels | null {
        return this.useQuery(Source.FeedMyChannelsQuery, variables, opts);
    }
    async queryFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: OperationParameters): Promise<Types.FeedChannelsSearch> {
        return this.client.query(Source.FeedChannelsSearchQuery, variables, opts);
    }
    async refetchFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables): Promise<Types.FeedChannelsSearch> {
        return this.refetch(Source.FeedChannelsSearchQuery, variables);
    }
    useFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: QueryWatchParameters): Types.FeedChannelsSearch {
        return this.useQuerySuspense(Source.FeedChannelsSearchQuery, variables, opts);
    }
    useWithoutLoaderFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: QueryWatchParameters): Types.FeedChannelsSearch | null {
        return this.useQuery(Source.FeedChannelsSearchQuery, variables, opts);
    }
    async queryFeedChannel(variables: Types.FeedChannelVariables, opts?: OperationParameters): Promise<Types.FeedChannel> {
        return this.client.query(Source.FeedChannelQuery, variables, opts);
    }
    async refetchFeedChannel(variables: Types.FeedChannelVariables): Promise<Types.FeedChannel> {
        return this.refetch(Source.FeedChannelQuery, variables);
    }
    useFeedChannel(variables: Types.FeedChannelVariables, opts?: QueryWatchParameters): Types.FeedChannel {
        return this.useQuerySuspense(Source.FeedChannelQuery, variables, opts);
    }
    useWithoutLoaderFeedChannel(variables: Types.FeedChannelVariables, opts?: QueryWatchParameters): Types.FeedChannel | null {
        return this.useQuery(Source.FeedChannelQuery, variables, opts);
    }
    async queryFeedChannelAdmins(variables: Types.FeedChannelAdminsVariables, opts?: OperationParameters): Promise<Types.FeedChannelAdmins> {
        return this.client.query(Source.FeedChannelAdminsQuery, variables, opts);
    }
    async refetchFeedChannelAdmins(variables: Types.FeedChannelAdminsVariables): Promise<Types.FeedChannelAdmins> {
        return this.refetch(Source.FeedChannelAdminsQuery, variables);
    }
    useFeedChannelAdmins(variables: Types.FeedChannelAdminsVariables, opts?: QueryWatchParameters): Types.FeedChannelAdmins {
        return this.useQuerySuspense(Source.FeedChannelAdminsQuery, variables, opts);
    }
    useWithoutLoaderFeedChannelAdmins(variables: Types.FeedChannelAdminsVariables, opts?: QueryWatchParameters): Types.FeedChannelAdmins | null {
        return this.useQuery(Source.FeedChannelAdminsQuery, variables, opts);
    }
    async queryFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: OperationParameters): Promise<Types.FeedChannelContent> {
        return this.client.query(Source.FeedChannelContentQuery, variables, opts);
    }
    async refetchFeedChannelContent(variables: Types.FeedChannelContentVariables): Promise<Types.FeedChannelContent> {
        return this.refetch(Source.FeedChannelContentQuery, variables);
    }
    useFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: QueryWatchParameters): Types.FeedChannelContent {
        return this.useQuerySuspense(Source.FeedChannelContentQuery, variables, opts);
    }
    useWithoutLoaderFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: QueryWatchParameters): Types.FeedChannelContent | null {
        return this.useQuery(Source.FeedChannelContentQuery, variables, opts);
    }
    async queryFeedItem(variables: Types.FeedItemVariables, opts?: OperationParameters): Promise<Types.FeedItem> {
        return this.client.query(Source.FeedItemQuery, variables, opts);
    }
    async refetchFeedItem(variables: Types.FeedItemVariables): Promise<Types.FeedItem> {
        return this.refetch(Source.FeedItemQuery, variables);
    }
    useFeedItem(variables: Types.FeedItemVariables, opts?: QueryWatchParameters): Types.FeedItem {
        return this.useQuerySuspense(Source.FeedItemQuery, variables, opts);
    }
    useWithoutLoaderFeedItem(variables: Types.FeedItemVariables, opts?: QueryWatchParameters): Types.FeedItem | null {
        return this.useQuery(Source.FeedItemQuery, variables, opts);
    }
    async queryMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: OperationParameters): Promise<Types.MatchmakingRoom> {
        return this.client.query(Source.MatchmakingRoomQuery, variables, opts);
    }
    async refetchMatchmakingRoom(variables: Types.MatchmakingRoomVariables): Promise<Types.MatchmakingRoom> {
        return this.refetch(Source.MatchmakingRoomQuery, variables);
    }
    useMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: QueryWatchParameters): Types.MatchmakingRoom {
        return this.useQuerySuspense(Source.MatchmakingRoomQuery, variables, opts);
    }
    useWithoutLoaderMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: QueryWatchParameters): Types.MatchmakingRoom | null {
        return this.useQuery(Source.MatchmakingRoomQuery, variables, opts);
    }
    async queryMyNotifications(variables: Types.MyNotificationsVariables, opts?: OperationParameters): Promise<Types.MyNotifications> {
        return this.client.query(Source.MyNotificationsQuery, variables, opts);
    }
    async refetchMyNotifications(variables: Types.MyNotificationsVariables): Promise<Types.MyNotifications> {
        return this.refetch(Source.MyNotificationsQuery, variables);
    }
    useMyNotifications(variables: Types.MyNotificationsVariables, opts?: QueryWatchParameters): Types.MyNotifications {
        return this.useQuerySuspense(Source.MyNotificationsQuery, variables, opts);
    }
    useWithoutLoaderMyNotifications(variables: Types.MyNotificationsVariables, opts?: QueryWatchParameters): Types.MyNotifications | null {
        return this.useQuery(Source.MyNotificationsQuery, variables, opts);
    }
    async queryMyNotificationCenter(opts?: OperationParameters): Promise<Types.MyNotificationCenter> {
        return this.client.query(Source.MyNotificationCenterQuery, undefined, opts);
    }
    async refetchMyNotificationCenter(): Promise<Types.MyNotificationCenter> {
        return this.refetch(Source.MyNotificationCenterQuery);
    }
    useMyNotificationCenter(opts?: QueryWatchParameters): Types.MyNotificationCenter {
        return this.useQuerySuspense(Source.MyNotificationCenterQuery, undefined, opts);
    }
    useWithoutLoaderMyNotificationCenter(opts?: QueryWatchParameters): Types.MyNotificationCenter | null {
        return this.useQuery(Source.MyNotificationCenterQuery, undefined, opts);
    }
    async queryMyOrganizations(opts?: OperationParameters): Promise<Types.MyOrganizations> {
        return this.client.query(Source.MyOrganizationsQuery, undefined, opts);
    }
    async refetchMyOrganizations(): Promise<Types.MyOrganizations> {
        return this.refetch(Source.MyOrganizationsQuery);
    }
    useMyOrganizations(opts?: QueryWatchParameters): Types.MyOrganizations {
        return this.useQuerySuspense(Source.MyOrganizationsQuery, undefined, opts);
    }
    useWithoutLoaderMyOrganizations(opts?: QueryWatchParameters): Types.MyOrganizations | null {
        return this.useQuery(Source.MyOrganizationsQuery, undefined, opts);
    }
    async queryOrganization(variables: Types.OrganizationVariables, opts?: OperationParameters): Promise<Types.Organization> {
        return this.client.query(Source.OrganizationQuery, variables, opts);
    }
    async refetchOrganization(variables: Types.OrganizationVariables): Promise<Types.Organization> {
        return this.refetch(Source.OrganizationQuery, variables);
    }
    useOrganization(variables: Types.OrganizationVariables, opts?: QueryWatchParameters): Types.Organization {
        return this.useQuerySuspense(Source.OrganizationQuery, variables, opts);
    }
    useWithoutLoaderOrganization(variables: Types.OrganizationVariables, opts?: QueryWatchParameters): Types.Organization | null {
        return this.useQuery(Source.OrganizationQuery, variables, opts);
    }
    async queryOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationWithoutMembers> {
        return this.client.query(Source.OrganizationWithoutMembersQuery, variables, opts);
    }
    async refetchOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables): Promise<Types.OrganizationWithoutMembers> {
        return this.refetch(Source.OrganizationWithoutMembersQuery, variables);
    }
    useOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: QueryWatchParameters): Types.OrganizationWithoutMembers {
        return this.useQuerySuspense(Source.OrganizationWithoutMembersQuery, variables, opts);
    }
    useWithoutLoaderOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: QueryWatchParameters): Types.OrganizationWithoutMembers | null {
        return this.useQuery(Source.OrganizationWithoutMembersQuery, variables, opts);
    }
    async queryOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: OperationParameters): Promise<Types.OrganizationMembersShort> {
        return this.client.query(Source.OrganizationMembersShortQuery, variables, opts);
    }
    async refetchOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables): Promise<Types.OrganizationMembersShort> {
        return this.refetch(Source.OrganizationMembersShortQuery, variables);
    }
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: QueryWatchParameters): Types.OrganizationMembersShort {
        return this.useQuerySuspense(Source.OrganizationMembersShortQuery, variables, opts);
    }
    useWithoutLoaderOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: QueryWatchParameters): Types.OrganizationMembersShort | null {
        return this.useQuery(Source.OrganizationMembersShortQuery, variables, opts);
    }
    async queryOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationMembers> {
        return this.client.query(Source.OrganizationMembersQuery, variables, opts);
    }
    async refetchOrganizationMembers(variables: Types.OrganizationMembersVariables): Promise<Types.OrganizationMembers> {
        return this.refetch(Source.OrganizationMembersQuery, variables);
    }
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: QueryWatchParameters): Types.OrganizationMembers {
        return this.useQuerySuspense(Source.OrganizationMembersQuery, variables, opts);
    }
    useWithoutLoaderOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: QueryWatchParameters): Types.OrganizationMembers | null {
        return this.useQuery(Source.OrganizationMembersQuery, variables, opts);
    }
    async queryOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: OperationParameters): Promise<Types.OrganizationProfile> {
        return this.client.query(Source.OrganizationProfileQuery, variables, opts);
    }
    async refetchOrganizationProfile(variables: Types.OrganizationProfileVariables): Promise<Types.OrganizationProfile> {
        return this.refetch(Source.OrganizationProfileQuery, variables);
    }
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: QueryWatchParameters): Types.OrganizationProfile {
        return this.useQuerySuspense(Source.OrganizationProfileQuery, variables, opts);
    }
    useWithoutLoaderOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: QueryWatchParameters): Types.OrganizationProfile | null {
        return this.useQuery(Source.OrganizationProfileQuery, variables, opts);
    }
    async queryExploreCommunity(variables: Types.ExploreCommunityVariables, opts?: OperationParameters): Promise<Types.ExploreCommunity> {
        return this.client.query(Source.ExploreCommunityQuery, variables, opts);
    }
    async refetchExploreCommunity(variables: Types.ExploreCommunityVariables): Promise<Types.ExploreCommunity> {
        return this.refetch(Source.ExploreCommunityQuery, variables);
    }
    useExploreCommunity(variables: Types.ExploreCommunityVariables, opts?: QueryWatchParameters): Types.ExploreCommunity {
        return this.useQuerySuspense(Source.ExploreCommunityQuery, variables, opts);
    }
    useWithoutLoaderExploreCommunity(variables: Types.ExploreCommunityVariables, opts?: QueryWatchParameters): Types.ExploreCommunity | null {
        return this.useQuery(Source.ExploreCommunityQuery, variables, opts);
    }
    async queryOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicInvite> {
        return this.client.query(Source.OrganizationPublicInviteQuery, variables, opts);
    }
    async refetchOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Promise<Types.OrganizationPublicInvite> {
        return this.refetch(Source.OrganizationPublicInviteQuery, variables);
    }
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: QueryWatchParameters): Types.OrganizationPublicInvite {
        return this.useQuerySuspense(Source.OrganizationPublicInviteQuery, variables, opts);
    }
    useWithoutLoaderOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: QueryWatchParameters): Types.OrganizationPublicInvite | null {
        return this.useQuery(Source.OrganizationPublicInviteQuery, variables, opts);
    }
    async queryOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: OperationParameters): Promise<Types.OrganizationByPrefix> {
        return this.client.query(Source.OrganizationByPrefixQuery, variables, opts);
    }
    async refetchOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Promise<Types.OrganizationByPrefix> {
        return this.refetch(Source.OrganizationByPrefixQuery, variables);
    }
    useOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: QueryWatchParameters): Types.OrganizationByPrefix {
        return this.useQuerySuspense(Source.OrganizationByPrefixQuery, variables, opts);
    }
    useWithoutLoaderOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: QueryWatchParameters): Types.OrganizationByPrefix | null {
        return this.useQuery(Source.OrganizationByPrefixQuery, variables, opts);
    }
    async queryPermissions(opts?: OperationParameters): Promise<Types.Permissions> {
        return this.client.query(Source.PermissionsQuery, undefined, opts);
    }
    async refetchPermissions(): Promise<Types.Permissions> {
        return this.refetch(Source.PermissionsQuery);
    }
    usePermissions(opts?: QueryWatchParameters): Types.Permissions {
        return this.useQuerySuspense(Source.PermissionsQuery, undefined, opts);
    }
    useWithoutLoaderPermissions(opts?: QueryWatchParameters): Types.Permissions | null {
        return this.useQuery(Source.PermissionsQuery, undefined, opts);
    }
    async querySuperAdmins(opts?: OperationParameters): Promise<Types.SuperAdmins> {
        return this.client.query(Source.SuperAdminsQuery, undefined, opts);
    }
    async refetchSuperAdmins(): Promise<Types.SuperAdmins> {
        return this.refetch(Source.SuperAdminsQuery);
    }
    useSuperAdmins(opts?: QueryWatchParameters): Types.SuperAdmins {
        return this.useQuerySuspense(Source.SuperAdminsQuery, undefined, opts);
    }
    useWithoutLoaderSuperAdmins(opts?: QueryWatchParameters): Types.SuperAdmins | null {
        return this.useQuery(Source.SuperAdminsQuery, undefined, opts);
    }
    async querySuperAccounts(opts?: OperationParameters): Promise<Types.SuperAccounts> {
        return this.client.query(Source.SuperAccountsQuery, undefined, opts);
    }
    async refetchSuperAccounts(): Promise<Types.SuperAccounts> {
        return this.refetch(Source.SuperAccountsQuery);
    }
    useSuperAccounts(opts?: QueryWatchParameters): Types.SuperAccounts {
        return this.useQuerySuspense(Source.SuperAccountsQuery, undefined, opts);
    }
    useWithoutLoaderSuperAccounts(opts?: QueryWatchParameters): Types.SuperAccounts | null {
        return this.useQuery(Source.SuperAccountsQuery, undefined, opts);
    }
    async querySuperAccount(variables: Types.SuperAccountVariables, opts?: OperationParameters): Promise<Types.SuperAccount> {
        return this.client.query(Source.SuperAccountQuery, variables, opts);
    }
    async refetchSuperAccount(variables: Types.SuperAccountVariables): Promise<Types.SuperAccount> {
        return this.refetch(Source.SuperAccountQuery, variables);
    }
    useSuperAccount(variables: Types.SuperAccountVariables, opts?: QueryWatchParameters): Types.SuperAccount {
        return this.useQuerySuspense(Source.SuperAccountQuery, variables, opts);
    }
    useWithoutLoaderSuperAccount(variables: Types.SuperAccountVariables, opts?: QueryWatchParameters): Types.SuperAccount | null {
        return this.useQuery(Source.SuperAccountQuery, variables, opts);
    }
    async queryProfile(opts?: OperationParameters): Promise<Types.Profile> {
        return this.client.query(Source.ProfileQuery, undefined, opts);
    }
    async refetchProfile(): Promise<Types.Profile> {
        return this.refetch(Source.ProfileQuery);
    }
    useProfile(opts?: QueryWatchParameters): Types.Profile {
        return this.useQuerySuspense(Source.ProfileQuery, undefined, opts);
    }
    useWithoutLoaderProfile(opts?: QueryWatchParameters): Types.Profile | null {
        return this.useQuery(Source.ProfileQuery, undefined, opts);
    }
    async querySettings(opts?: OperationParameters): Promise<Types.Settings> {
        return this.client.query(Source.SettingsQuery, undefined, opts);
    }
    async refetchSettings(): Promise<Types.Settings> {
        return this.refetch(Source.SettingsQuery);
    }
    useSettings(opts?: QueryWatchParameters): Types.Settings {
        return this.useQuerySuspense(Source.SettingsQuery, undefined, opts);
    }
    useWithoutLoaderSettings(opts?: QueryWatchParameters): Types.Settings | null {
        return this.useQuery(Source.SettingsQuery, undefined, opts);
    }
    async queryResolveShortName(variables: Types.ResolveShortNameVariables, opts?: OperationParameters): Promise<Types.ResolveShortName> {
        return this.client.query(Source.ResolveShortNameQuery, variables, opts);
    }
    async refetchResolveShortName(variables: Types.ResolveShortNameVariables): Promise<Types.ResolveShortName> {
        return this.refetch(Source.ResolveShortNameQuery, variables);
    }
    useResolveShortName(variables: Types.ResolveShortNameVariables, opts?: QueryWatchParameters): Types.ResolveShortName {
        return this.useQuerySuspense(Source.ResolveShortNameQuery, variables, opts);
    }
    useWithoutLoaderResolveShortName(variables: Types.ResolveShortNameVariables, opts?: QueryWatchParameters): Types.ResolveShortName | null {
        return this.useQuery(Source.ResolveShortNameQuery, variables, opts);
    }
    async queryMyStickers(opts?: OperationParameters): Promise<Types.MyStickers> {
        return this.client.query(Source.MyStickersQuery, undefined, opts);
    }
    async refetchMyStickers(): Promise<Types.MyStickers> {
        return this.refetch(Source.MyStickersQuery);
    }
    useMyStickers(opts?: QueryWatchParameters): Types.MyStickers {
        return this.useQuerySuspense(Source.MyStickersQuery, undefined, opts);
    }
    useWithoutLoaderMyStickers(opts?: QueryWatchParameters): Types.MyStickers | null {
        return this.useQuery(Source.MyStickersQuery, undefined, opts);
    }
    async queryStickerPack(variables: Types.StickerPackVariables, opts?: OperationParameters): Promise<Types.StickerPack> {
        return this.client.query(Source.StickerPackQuery, variables, opts);
    }
    async refetchStickerPack(variables: Types.StickerPackVariables): Promise<Types.StickerPack> {
        return this.refetch(Source.StickerPackQuery, variables);
    }
    useStickerPack(variables: Types.StickerPackVariables, opts?: QueryWatchParameters): Types.StickerPack {
        return this.useQuerySuspense(Source.StickerPackQuery, variables, opts);
    }
    useWithoutLoaderStickerPack(variables: Types.StickerPackVariables, opts?: QueryWatchParameters): Types.StickerPack | null {
        return this.useQuery(Source.StickerPackQuery, variables, opts);
    }
    async queryUsers(variables: Types.UsersVariables, opts?: OperationParameters): Promise<Types.Users> {
        return this.client.query(Source.UsersQuery, variables, opts);
    }
    async refetchUsers(variables: Types.UsersVariables): Promise<Types.Users> {
        return this.refetch(Source.UsersQuery, variables);
    }
    useUsers(variables: Types.UsersVariables, opts?: QueryWatchParameters): Types.Users {
        return this.useQuerySuspense(Source.UsersQuery, variables, opts);
    }
    useWithoutLoaderUsers(variables: Types.UsersVariables, opts?: QueryWatchParameters): Types.Users | null {
        return this.useQuery(Source.UsersQuery, variables, opts);
    }
    async queryUser(variables: Types.UserVariables, opts?: OperationParameters): Promise<Types.User> {
        return this.client.query(Source.UserQuery, variables, opts);
    }
    async refetchUser(variables: Types.UserVariables): Promise<Types.User> {
        return this.refetch(Source.UserQuery, variables);
    }
    useUser(variables: Types.UserVariables, opts?: QueryWatchParameters): Types.User {
        return this.useQuerySuspense(Source.UserQuery, variables, opts);
    }
    useWithoutLoaderUser(variables: Types.UserVariables, opts?: QueryWatchParameters): Types.User | null {
        return this.useQuery(Source.UserQuery, variables, opts);
    }
    async queryOnline(variables: Types.OnlineVariables, opts?: OperationParameters): Promise<Types.Online> {
        return this.client.query(Source.OnlineQuery, variables, opts);
    }
    async refetchOnline(variables: Types.OnlineVariables): Promise<Types.Online> {
        return this.refetch(Source.OnlineQuery, variables);
    }
    useOnline(variables: Types.OnlineVariables, opts?: QueryWatchParameters): Types.Online {
        return this.useQuerySuspense(Source.OnlineQuery, variables, opts);
    }
    useWithoutLoaderOnline(variables: Types.OnlineVariables, opts?: QueryWatchParameters): Types.Online | null {
        return this.useQuery(Source.OnlineQuery, variables, opts);
    }
    async queryExplorePeople(variables: Types.ExplorePeopleVariables, opts?: OperationParameters): Promise<Types.ExplorePeople> {
        return this.client.query(Source.ExplorePeopleQuery, variables, opts);
    }
    async refetchExplorePeople(variables: Types.ExplorePeopleVariables): Promise<Types.ExplorePeople> {
        return this.refetch(Source.ExplorePeopleQuery, variables);
    }
    useExplorePeople(variables: Types.ExplorePeopleVariables, opts?: QueryWatchParameters): Types.ExplorePeople {
        return this.useQuerySuspense(Source.ExplorePeopleQuery, variables, opts);
    }
    useWithoutLoaderExplorePeople(variables: Types.ExplorePeopleVariables, opts?: QueryWatchParameters): Types.ExplorePeople | null {
        return this.useQuery(Source.ExplorePeopleQuery, variables, opts);
    }
    async queryMySuccessfulInvitesCount(opts?: OperationParameters): Promise<Types.MySuccessfulInvitesCount> {
        return this.client.query(Source.MySuccessfulInvitesCountQuery, undefined, opts);
    }
    async refetchMySuccessfulInvitesCount(): Promise<Types.MySuccessfulInvitesCount> {
        return this.refetch(Source.MySuccessfulInvitesCountQuery);
    }
    useMySuccessfulInvitesCount(opts?: QueryWatchParameters): Types.MySuccessfulInvitesCount {
        return this.useQuerySuspense(Source.MySuccessfulInvitesCountQuery, undefined, opts);
    }
    useWithoutLoaderMySuccessfulInvitesCount(opts?: QueryWatchParameters): Types.MySuccessfulInvitesCount | null {
        return this.useQuery(Source.MySuccessfulInvitesCountQuery, undefined, opts);
    }
    async mutateCreateOrganization(variables: Types.CreateOrganizationVariables): Promise<Types.CreateOrganization> {
        return this.client.mutate(Source.CreateOrganizationMutation, variables);
    }
    async mutateAccountInviteJoin(variables: Types.AccountInviteJoinVariables): Promise<Types.AccountInviteJoin> {
        return this.client.mutate(Source.AccountInviteJoinMutation, variables);
    }
    async mutateCreateUserProfileAndOrganization(variables: Types.CreateUserProfileAndOrganizationVariables): Promise<Types.CreateUserProfileAndOrganization> {
        return this.client.mutate(Source.CreateUserProfileAndOrganizationMutation, variables);
    }
    async mutateReportOnline(variables: Types.ReportOnlineVariables): Promise<Types.ReportOnline> {
        return this.client.mutate(Source.ReportOnlineMutation, variables);
    }
    async mutateRegisterPush(variables: Types.RegisterPushVariables): Promise<Types.RegisterPush> {
        return this.client.mutate(Source.RegisterPushMutation, variables);
    }
    async mutateRegisterWebPush(variables: Types.RegisterWebPushVariables): Promise<Types.RegisterWebPush> {
        return this.client.mutate(Source.RegisterWebPushMutation, variables);
    }
    async mutateCreateApp(variables: Types.CreateAppVariables): Promise<Types.CreateApp> {
        return this.client.mutate(Source.CreateAppMutation, variables);
    }
    async mutateUpdateApp(variables: Types.UpdateAppVariables): Promise<Types.UpdateApp> {
        return this.client.mutate(Source.UpdateAppMutation, variables);
    }
    async mutateRefreshAppToken(variables: Types.RefreshAppTokenVariables): Promise<Types.RefreshAppToken> {
        return this.client.mutate(Source.RefreshAppTokenMutation, variables);
    }
    async mutateAddAppToChat(variables: Types.AddAppToChatVariables): Promise<Types.AddAppToChat> {
        return this.client.mutate(Source.AddAppToChatMutation, variables);
    }
    async mutateUserStorageSet(variables: Types.UserStorageSetVariables): Promise<Types.UserStorageSet> {
        return this.client.mutate(Source.UserStorageSetMutation, variables);
    }
    async mutateSuperBadgeCreateToRoom(variables: Types.SuperBadgeCreateToRoomVariables): Promise<Types.SuperBadgeCreateToRoom> {
        return this.client.mutate(Source.SuperBadgeCreateToRoomMutation, variables);
    }
    async mutateSuperBadgeUnsetToRoom(variables: Types.SuperBadgeUnsetToRoomVariables): Promise<Types.SuperBadgeUnsetToRoom> {
        return this.client.mutate(Source.SuperBadgeUnsetToRoomMutation, variables);
    }
    async mutatePinMessage(variables: Types.PinMessageVariables): Promise<Types.PinMessage> {
        return this.client.mutate(Source.PinMessageMutation, variables);
    }
    async mutateUnpinMessage(variables: Types.UnpinMessageVariables): Promise<Types.UnpinMessage> {
        return this.client.mutate(Source.UnpinMessageMutation, variables);
    }
    async mutateMessageSetReaction(variables: Types.MessageSetReactionVariables): Promise<Types.MessageSetReaction> {
        return this.client.mutate(Source.MessageSetReactionMutation, variables);
    }
    async mutateMessageUnsetReaction(variables: Types.MessageUnsetReactionVariables): Promise<Types.MessageUnsetReaction> {
        return this.client.mutate(Source.MessageUnsetReactionMutation, variables);
    }
    async mutateSendMessage(variables: Types.SendMessageVariables): Promise<Types.SendMessage> {
        return this.client.mutate(Source.SendMessageMutation, variables);
    }
    async mutateRoomRead(variables: Types.RoomReadVariables): Promise<Types.RoomRead> {
        return this.client.mutate(Source.RoomReadMutation, variables);
    }
    async mutateRoomCreate(variables: Types.RoomCreateVariables): Promise<Types.RoomCreate> {
        return this.client.mutate(Source.RoomCreateMutation, variables);
    }
    async mutateSetTyping(variables: Types.SetTypingVariables): Promise<Types.SetTyping> {
        return this.client.mutate(Source.SetTypingMutation, variables);
    }
    async mutateRoomAddMembers(variables: Types.RoomAddMembersVariables): Promise<Types.RoomAddMembers> {
        return this.client.mutate(Source.RoomAddMembersMutation, variables);
    }
    async mutateRoomKick(variables: Types.RoomKickVariables): Promise<Types.RoomKick> {
        return this.client.mutate(Source.RoomKickMutation, variables);
    }
    async mutateRoomChangeRole(variables: Types.RoomChangeRoleVariables): Promise<Types.RoomChangeRole> {
        return this.client.mutate(Source.RoomChangeRoleMutation, variables);
    }
    async mutateRoomLeave(variables: Types.RoomLeaveVariables): Promise<Types.RoomLeave> {
        return this.client.mutate(Source.RoomLeaveMutation, variables);
    }
    async mutateRoomAlterFeatured(variables: Types.RoomAlterFeaturedVariables): Promise<Types.RoomAlterFeatured> {
        return this.client.mutate(Source.RoomAlterFeaturedMutation, variables);
    }
    async mutateRoomAlterHidden(variables: Types.RoomAlterHiddenVariables): Promise<Types.RoomAlterHidden> {
        return this.client.mutate(Source.RoomAlterHiddenMutation, variables);
    }
    async mutateRoomSettingsUpdate(variables: Types.RoomSettingsUpdateVariables): Promise<Types.RoomSettingsUpdate> {
        return this.client.mutate(Source.RoomSettingsUpdateMutation, variables);
    }
    async mutateRoomJoin(variables: Types.RoomJoinVariables): Promise<Types.RoomJoin> {
        return this.client.mutate(Source.RoomJoinMutation, variables);
    }
    async mutateRoomsJoin(variables: Types.RoomsJoinVariables): Promise<Types.RoomsJoin> {
        return this.client.mutate(Source.RoomsJoinMutation, variables);
    }
    async mutateRoomsInviteUser(variables: Types.RoomsInviteUserVariables): Promise<Types.RoomsInviteUser> {
        return this.client.mutate(Source.RoomsInviteUserMutation, variables);
    }
    async mutateRoomJoinInviteLink(variables: Types.RoomJoinInviteLinkVariables): Promise<Types.RoomJoinInviteLink> {
        return this.client.mutate(Source.RoomJoinInviteLinkMutation, variables);
    }
    async mutateRoomRenewInviteLink(variables: Types.RoomRenewInviteLinkVariables): Promise<Types.RoomRenewInviteLink> {
        return this.client.mutate(Source.RoomRenewInviteLinkMutation, variables);
    }
    async mutateRoomUpdate(variables: Types.RoomUpdateVariables): Promise<Types.RoomUpdate> {
        return this.client.mutate(Source.RoomUpdateMutation, variables);
    }
    async mutateRoomDeleteMessage(variables: Types.RoomDeleteMessageVariables): Promise<Types.RoomDeleteMessage> {
        return this.client.mutate(Source.RoomDeleteMessageMutation, variables);
    }
    async mutateRoomDeleteMessages(variables: Types.RoomDeleteMessagesVariables): Promise<Types.RoomDeleteMessages> {
        return this.client.mutate(Source.RoomDeleteMessagesMutation, variables);
    }
    async mutateRoomDeleteUrlAugmentation(variables: Types.RoomDeleteUrlAugmentationVariables): Promise<Types.RoomDeleteUrlAugmentation> {
        return this.client.mutate(Source.RoomDeleteUrlAugmentationMutation, variables);
    }
    async mutateEditMessage(variables: Types.EditMessageVariables): Promise<Types.EditMessage> {
        return this.client.mutate(Source.EditMessageMutation, variables);
    }
    async mutateMarkSequenceRead(variables: Types.MarkSequenceReadVariables): Promise<Types.MarkSequenceRead> {
        return this.client.mutate(Source.MarkSequenceReadMutation, variables);
    }
    async mutateUpdateWelcomeMessage(variables: Types.UpdateWelcomeMessageVariables): Promise<Types.UpdateWelcomeMessage> {
        return this.client.mutate(Source.UpdateWelcomeMessageMutation, variables);
    }
    async mutateDeleteComment(variables: Types.DeleteCommentVariables): Promise<Types.DeleteComment> {
        return this.client.mutate(Source.DeleteCommentMutation, variables);
    }
    async mutateCommentSetReaction(variables: Types.CommentSetReactionVariables): Promise<Types.CommentSetReaction> {
        return this.client.mutate(Source.CommentSetReactionMutation, variables);
    }
    async mutateCommentUnsetReaction(variables: Types.CommentUnsetReactionVariables): Promise<Types.CommentUnsetReaction> {
        return this.client.mutate(Source.CommentUnsetReactionMutation, variables);
    }
    async mutateDeleteNotification(variables: Types.DeleteNotificationVariables): Promise<Types.DeleteNotification> {
        return this.client.mutate(Source.DeleteNotificationMutation, variables);
    }
    async mutateSubscribeToComments(variables: Types.SubscribeToCommentsVariables): Promise<Types.SubscribeToComments> {
        return this.client.mutate(Source.SubscribeToCommentsMutation, variables);
    }
    async mutateUnSubscribeFromComments(variables: Types.UnSubscribeFromCommentsVariables): Promise<Types.UnSubscribeFromComments> {
        return this.client.mutate(Source.UnSubscribeFromCommentsMutation, variables);
    }
    async mutateAddComment(variables: Types.AddCommentVariables): Promise<Types.AddComment> {
        return this.client.mutate(Source.AddCommentMutation, variables);
    }
    async mutateEditComment(variables: Types.EditCommentVariables): Promise<Types.EditComment> {
        return this.client.mutate(Source.EditCommentMutation, variables);
    }
    async mutateConferenceJoin(variables: Types.ConferenceJoinVariables): Promise<Types.ConferenceJoin> {
        return this.client.mutate(Source.ConferenceJoinMutation, variables);
    }
    async mutateConferenceLeave(variables: Types.ConferenceLeaveVariables): Promise<Types.ConferenceLeave> {
        return this.client.mutate(Source.ConferenceLeaveMutation, variables);
    }
    async mutateConferenceKeepAlive(variables: Types.ConferenceKeepAliveVariables): Promise<Types.ConferenceKeepAlive> {
        return this.client.mutate(Source.ConferenceKeepAliveMutation, variables);
    }
    async mutateConferenceOffer(variables: Types.ConferenceOfferVariables): Promise<Types.ConferenceOffer> {
        return this.client.mutate(Source.ConferenceOfferMutation, variables);
    }
    async mutateConferenceAnswer(variables: Types.ConferenceAnswerVariables): Promise<Types.ConferenceAnswer> {
        return this.client.mutate(Source.ConferenceAnswerMutation, variables);
    }
    async mutateConferenceCandidate(variables: Types.ConferenceCandidateVariables): Promise<Types.ConferenceCandidate> {
        return this.client.mutate(Source.ConferenceCandidateMutation, variables);
    }
    async mutateMediaOffer(variables: Types.MediaOfferVariables): Promise<Types.MediaOffer> {
        return this.client.mutate(Source.MediaOfferMutation, variables);
    }
    async mutateMediaNegotiationNeeded(variables: Types.MediaNegotiationNeededVariables): Promise<Types.MediaNegotiationNeeded> {
        return this.client.mutate(Source.MediaNegotiationNeededMutation, variables);
    }
    async mutateMediaFailed(variables: Types.MediaFailedVariables): Promise<Types.MediaFailed> {
        return this.client.mutate(Source.MediaFailedMutation, variables);
    }
    async mutateMediaAnswer(variables: Types.MediaAnswerVariables): Promise<Types.MediaAnswer> {
        return this.client.mutate(Source.MediaAnswerMutation, variables);
    }
    async mutateMediaCandidate(variables: Types.MediaCandidateVariables): Promise<Types.MediaCandidate> {
        return this.client.mutate(Source.MediaCandidateMutation, variables);
    }
    async mutateBetaSubmitNextDiscover(variables: Types.BetaSubmitNextDiscoverVariables): Promise<Types.BetaSubmitNextDiscover> {
        return this.client.mutate(Source.BetaSubmitNextDiscoverMutation, variables);
    }
    async mutateBetaDiscoverSkip(variables: Types.BetaDiscoverSkipVariables): Promise<Types.BetaDiscoverSkip> {
        return this.client.mutate(Source.BetaDiscoverSkipMutation, variables);
    }
    async mutateFeatureFlagAdd(variables: Types.FeatureFlagAddVariables): Promise<Types.FeatureFlagAdd> {
        return this.client.mutate(Source.FeatureFlagAddMutation, variables);
    }
    async mutateFeatureFlagEnable(variables: Types.FeatureFlagEnableVariables): Promise<Types.FeatureFlagEnable> {
        return this.client.mutate(Source.FeatureFlagEnableMutation, variables);
    }
    async mutateFeatureFlagDisable(variables: Types.FeatureFlagDisableVariables): Promise<Types.FeatureFlagDisable> {
        return this.client.mutate(Source.FeatureFlagDisableMutation, variables);
    }
    async mutateFeedChannelCreate(variables: Types.FeedChannelCreateVariables): Promise<Types.FeedChannelCreate> {
        return this.client.mutate(Source.FeedChannelCreateMutation, variables);
    }
    async mutateFeedChannelUpdate(variables: Types.FeedChannelUpdateVariables): Promise<Types.FeedChannelUpdate> {
        return this.client.mutate(Source.FeedChannelUpdateMutation, variables);
    }
    async mutateFeedChannelSubscribe(variables: Types.FeedChannelSubscribeVariables): Promise<Types.FeedChannelSubscribe> {
        return this.client.mutate(Source.FeedChannelSubscribeMutation, variables);
    }
    async mutateFeedChannelUnsubscribe(variables: Types.FeedChannelUnsubscribeVariables): Promise<Types.FeedChannelUnsubscribe> {
        return this.client.mutate(Source.FeedChannelUnsubscribeMutation, variables);
    }
    async mutateFeedChannelAddEditor(variables: Types.FeedChannelAddEditorVariables): Promise<Types.FeedChannelAddEditor> {
        return this.client.mutate(Source.FeedChannelAddEditorMutation, variables);
    }
    async mutateFeedChannelRemoveEditor(variables: Types.FeedChannelRemoveEditorVariables): Promise<Types.FeedChannelRemoveEditor> {
        return this.client.mutate(Source.FeedChannelRemoveEditorMutation, variables);
    }
    async mutateFeedEditPost(variables: Types.FeedEditPostVariables): Promise<Types.FeedEditPost> {
        return this.client.mutate(Source.FeedEditPostMutation, variables);
    }
    async mutateFeedCreatePost(variables: Types.FeedCreatePostVariables): Promise<Types.FeedCreatePost> {
        return this.client.mutate(Source.FeedCreatePostMutation, variables);
    }
    async mutateFeedReactionAdd(variables: Types.FeedReactionAddVariables): Promise<Types.FeedReactionAdd> {
        return this.client.mutate(Source.FeedReactionAddMutation, variables);
    }
    async mutateFeedReactionRemove(variables: Types.FeedReactionRemoveVariables): Promise<Types.FeedReactionRemove> {
        return this.client.mutate(Source.FeedReactionRemoveMutation, variables);
    }
    async mutateFeedDeletePost(variables: Types.FeedDeletePostVariables): Promise<Types.FeedDeletePost> {
        return this.client.mutate(Source.FeedDeletePostMutation, variables);
    }
    async mutateMatchmakingRoomSave(variables: Types.MatchmakingRoomSaveVariables): Promise<Types.MatchmakingRoomSave> {
        return this.client.mutate(Source.MatchmakingRoomSaveMutation, variables);
    }
    async mutateMatchmakingProfileFill(variables: Types.MatchmakingProfileFillVariables): Promise<Types.MatchmakingProfileFill> {
        return this.client.mutate(Source.MatchmakingProfileFillMutation, variables);
    }
    async mutateMatchmakingConnect(variables: Types.MatchmakingConnectVariables): Promise<Types.MatchmakingConnect> {
        return this.client.mutate(Source.MatchmakingConnectMutation, variables);
    }
    async mutateMyNotificationCenterMarkSeqRead(variables: Types.MyNotificationCenterMarkSeqReadVariables): Promise<Types.MyNotificationCenterMarkSeqRead> {
        return this.client.mutate(Source.MyNotificationCenterMarkSeqReadMutation, variables);
    }
    async mutateReadNotification(variables: Types.ReadNotificationVariables): Promise<Types.ReadNotification> {
        return this.client.mutate(Source.ReadNotificationMutation, variables);
    }
    async mutateUpdateOrganization(variables: Types.UpdateOrganizationVariables): Promise<Types.UpdateOrganization> {
        return this.client.mutate(Source.UpdateOrganizationMutation, variables);
    }
    async mutateOrganizationChangeMemberRole(variables: Types.OrganizationChangeMemberRoleVariables): Promise<Types.OrganizationChangeMemberRole> {
        return this.client.mutate(Source.OrganizationChangeMemberRoleMutation, variables);
    }
    async mutateOrganizationAddMember(variables: Types.OrganizationAddMemberVariables): Promise<Types.OrganizationAddMember> {
        return this.client.mutate(Source.OrganizationAddMemberMutation, variables);
    }
    async mutateOrganizationCreatePublicInvite(variables: Types.OrganizationCreatePublicInviteVariables): Promise<Types.OrganizationCreatePublicInvite> {
        return this.client.mutate(Source.OrganizationCreatePublicInviteMutation, variables);
    }
    async mutateDeleteOrganization(variables: Types.DeleteOrganizationVariables): Promise<Types.DeleteOrganization> {
        return this.client.mutate(Source.DeleteOrganizationMutation, variables);
    }
    async mutateOrganizationMemberRemove(variables: Types.OrganizationMemberRemoveVariables): Promise<Types.OrganizationMemberRemove> {
        return this.client.mutate(Source.OrganizationMemberRemoveMutation, variables);
    }
    async mutateOrganizationActivateByInvite(variables: Types.OrganizationActivateByInviteVariables): Promise<Types.OrganizationActivateByInvite> {
        return this.client.mutate(Source.OrganizationActivateByInviteMutation, variables);
    }
    async mutateOrganizationAlterPublished(variables: Types.OrganizationAlterPublishedVariables): Promise<Types.OrganizationAlterPublished> {
        return this.client.mutate(Source.OrganizationAlterPublishedMutation, variables);
    }
    async mutateDebugMails(variables: Types.DebugMailsVariables): Promise<Types.DebugMails> {
        return this.client.mutate(Source.DebugMailsMutation, variables);
    }
    async mutateSuperAccountRename(variables: Types.SuperAccountRenameVariables): Promise<Types.SuperAccountRename> {
        return this.client.mutate(Source.SuperAccountRenameMutation, variables);
    }
    async mutateSuperAccountActivate(variables: Types.SuperAccountActivateVariables): Promise<Types.SuperAccountActivate> {
        return this.client.mutate(Source.SuperAccountActivateMutation, variables);
    }
    async mutateSuperAccountSuspend(variables: Types.SuperAccountSuspendVariables): Promise<Types.SuperAccountSuspend> {
        return this.client.mutate(Source.SuperAccountSuspendMutation, variables);
    }
    async mutateSuperAccountPend(variables: Types.SuperAccountPendVariables): Promise<Types.SuperAccountPend> {
        return this.client.mutate(Source.SuperAccountPendMutation, variables);
    }
    async mutateSuperAccountAdd(variables: Types.SuperAccountAddVariables): Promise<Types.SuperAccountAdd> {
        return this.client.mutate(Source.SuperAccountAddMutation, variables);
    }
    async mutateSuperAccountMemberAdd(variables: Types.SuperAccountMemberAddVariables): Promise<Types.SuperAccountMemberAdd> {
        return this.client.mutate(Source.SuperAccountMemberAddMutation, variables);
    }
    async mutateSuperAccountMemberRemove(variables: Types.SuperAccountMemberRemoveVariables): Promise<Types.SuperAccountMemberRemove> {
        return this.client.mutate(Source.SuperAccountMemberRemoveMutation, variables);
    }
    async mutateSuperAdminAdd(variables: Types.SuperAdminAddVariables): Promise<Types.SuperAdminAdd> {
        return this.client.mutate(Source.SuperAdminAddMutation, variables);
    }
    async mutateSuperAdminRemove(variables: Types.SuperAdminRemoveVariables): Promise<Types.SuperAdminRemove> {
        return this.client.mutate(Source.SuperAdminRemoveMutation, variables);
    }
    async mutateReportContent(variables: Types.ReportContentVariables): Promise<Types.ReportContent> {
        return this.client.mutate(Source.ReportContentMutation, variables);
    }
    async mutateProfileUpdate(variables: Types.ProfileUpdateVariables): Promise<Types.ProfileUpdate> {
        return this.client.mutate(Source.ProfileUpdateMutation, variables);
    }
    async mutateProfileCreate(variables: Types.ProfileCreateVariables): Promise<Types.ProfileCreate> {
        return this.client.mutate(Source.ProfileCreateMutation, variables);
    }
    async mutateSettingsUpdate(variables: Types.SettingsUpdateVariables): Promise<Types.SettingsUpdate> {
        return this.client.mutate(Source.SettingsUpdateMutation, variables);
    }
    async mutateSetOrgShortname(variables: Types.SetOrgShortnameVariables): Promise<Types.SetOrgShortname> {
        return this.client.mutate(Source.SetOrgShortnameMutation, variables);
    }
    async mutateSetUserShortname(variables: Types.SetUserShortnameVariables): Promise<Types.SetUserShortname> {
        return this.client.mutate(Source.SetUserShortnameMutation, variables);
    }
    async mutateSetFeedChannelShortname(variables: Types.SetFeedChannelShortnameVariables): Promise<Types.SetFeedChannelShortname> {
        return this.client.mutate(Source.SetFeedChannelShortnameMutation, variables);
    }
    async mutateStickerPackAddToCollection(variables: Types.StickerPackAddToCollectionVariables): Promise<Types.StickerPackAddToCollection> {
        return this.client.mutate(Source.StickerPackAddToCollectionMutation, variables);
    }
    async mutateSendSticker(variables: Types.SendStickerVariables): Promise<Types.SendSticker> {
        return this.client.mutate(Source.SendStickerMutation, variables);
    }
    async mutateAddStickerComment(variables: Types.AddStickerCommentVariables): Promise<Types.AddStickerComment> {
        return this.client.mutate(Source.AddStickerCommentMutation, variables);
    }
    async mutatePersistEvents(variables: Types.PersistEventsVariables): Promise<Types.PersistEvents> {
        return this.client.mutate(Source.PersistEventsMutation, variables);
    }
    async mutateDeleteUser(variables: Types.DeleteUserVariables): Promise<Types.DeleteUser> {
        return this.client.mutate(Source.DeleteUserMutation, variables);
    }
    async mutateBetaNextDiscoverReset(): Promise<Types.BetaNextDiscoverReset> {
        return this.client.mutate(Source.BetaNextDiscoverResetMutation);
    }
    subscribeSettingsWatch(): GraphqlActiveSubscription<Types.SettingsWatch, {}> {
        return this.client.subscribe(Source.SettingsWatchSubscription);
    }
    subscribeChatWatch(variables: Types.ChatWatchVariables): GraphqlActiveSubscription<Types.ChatWatch, Types.ChatWatchVariables> {
        return this.client.subscribe(Source.ChatWatchSubscription, variables);
    }
    subscribeDialogsWatch(variables: Types.DialogsWatchVariables): GraphqlActiveSubscription<Types.DialogsWatch, Types.DialogsWatchVariables> {
        return this.client.subscribe(Source.DialogsWatchSubscription, variables);
    }
    subscribeTypingsWatch(): GraphqlActiveSubscription<Types.TypingsWatch, {}> {
        return this.client.subscribe(Source.TypingsWatchSubscription);
    }
    subscribeChatOnlinesCountWatch(variables: Types.ChatOnlinesCountWatchVariables): GraphqlActiveSubscription<Types.ChatOnlinesCountWatch, Types.ChatOnlinesCountWatchVariables> {
        return this.client.subscribe(Source.ChatOnlinesCountWatchSubscription, variables);
    }
    subscribeCommentWatch(variables: Types.CommentWatchVariables): GraphqlActiveSubscription<Types.CommentWatch, Types.CommentWatchVariables> {
        return this.client.subscribe(Source.CommentWatchSubscription, variables);
    }
    subscribeConferenceMediaWatch(variables: Types.ConferenceMediaWatchVariables): GraphqlActiveSubscription<Types.ConferenceMediaWatch, Types.ConferenceMediaWatchVariables> {
        return this.client.subscribe(Source.ConferenceMediaWatchSubscription, variables);
    }
    subscribeConferenceWatch(variables: Types.ConferenceWatchVariables): GraphqlActiveSubscription<Types.ConferenceWatch, Types.ConferenceWatchVariables> {
        return this.client.subscribe(Source.ConferenceWatchSubscription, variables);
    }
    subscribeFeedUpdates(variables: Types.FeedUpdatesVariables): GraphqlActiveSubscription<Types.FeedUpdates, Types.FeedUpdatesVariables> {
        return this.client.subscribe(Source.FeedUpdatesSubscription, variables);
    }
    subscribeMyNotificationsCenter(variables: Types.MyNotificationsCenterVariables): GraphqlActiveSubscription<Types.MyNotificationsCenter, Types.MyNotificationsCenterVariables> {
        return this.client.subscribe(Source.MyNotificationsCenterSubscription, variables);
    }
    subscribeDebugEventsWatch(variables: Types.DebugEventsWatchVariables): GraphqlActiveSubscription<Types.DebugEventsWatch, Types.DebugEventsWatchVariables> {
        return this.client.subscribe(Source.DebugEventsWatchSubscription, variables);
    }
    subscribeOnlineWatch(variables: Types.OnlineWatchVariables): GraphqlActiveSubscription<Types.OnlineWatch, Types.OnlineWatchVariables> {
        return this.client.subscribe(Source.OnlineWatchSubscription, variables);
    }
}
