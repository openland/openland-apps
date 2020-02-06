import * as Types from './Types';
import { GraphqlClient, GraphqlActiveSubscription, OperationParameters, QueryWatchParameters } from 'openland-graphql/GraphqlClient';
import { BaseApiClient } from 'openland-graphql/BaseApiClient';

export class OpenlandClient extends BaseApiClient {
    constructor(client: GraphqlClient) {
        super(client);
    }
    async queryAccount(opts?: OperationParameters): Promise<Types.Account> {
        return this.client.query('Account', undefined, opts);
    }
    async refetchAccount(): Promise<Types.Account> {
        return this.refetch('Account');
    }
    useAccount(opts?: QueryWatchParameters): Types.Account {
        return this.useQuerySuspense('Account', undefined, opts);
    }
    useWithoutLoaderAccount(opts?: QueryWatchParameters): Types.Account | null {
        return this.useQuery('Account', undefined, opts);
    }
    async updateQueryAccount(updater: (data: Types.Account) => Types.Account | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'Account');
    }
    async queryAccountSettings(opts?: OperationParameters): Promise<Types.AccountSettings> {
        return this.client.query('AccountSettings', undefined, opts);
    }
    async refetchAccountSettings(): Promise<Types.AccountSettings> {
        return this.refetch('AccountSettings');
    }
    useAccountSettings(opts?: QueryWatchParameters): Types.AccountSettings {
        return this.useQuerySuspense('AccountSettings', undefined, opts);
    }
    useWithoutLoaderAccountSettings(opts?: QueryWatchParameters): Types.AccountSettings | null {
        return this.useQuery('AccountSettings', undefined, opts);
    }
    async updateQueryAccountSettings(updater: (data: Types.AccountSettings) => Types.AccountSettings | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'AccountSettings');
    }
    async queryAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountInviteInfo> {
        return this.client.query('AccountInviteInfo', variables, opts);
    }
    async refetchAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Promise<Types.AccountInviteInfo> {
        return this.refetch('AccountInviteInfo', variables);
    }
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: QueryWatchParameters): Types.AccountInviteInfo {
        return this.useQuerySuspense('AccountInviteInfo', variables, opts);
    }
    useWithoutLoaderAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: QueryWatchParameters): Types.AccountInviteInfo | null {
        return this.useQuery('AccountInviteInfo', variables, opts);
    }
    async updateQueryAccountInviteInfo(updater: (data: Types.AccountInviteInfo) => Types.AccountInviteInfo | null, variables: Types.AccountInviteInfoVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'AccountInviteInfo', variables);
    }
    async queryAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountAppInviteInfo> {
        return this.client.query('AccountAppInviteInfo', variables, opts);
    }
    async refetchAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Promise<Types.AccountAppInviteInfo> {
        return this.refetch('AccountAppInviteInfo', variables);
    }
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: QueryWatchParameters): Types.AccountAppInviteInfo {
        return this.useQuerySuspense('AccountAppInviteInfo', variables, opts);
    }
    useWithoutLoaderAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: QueryWatchParameters): Types.AccountAppInviteInfo | null {
        return this.useQuery('AccountAppInviteInfo', variables, opts);
    }
    async updateQueryAccountAppInviteInfo(updater: (data: Types.AccountAppInviteInfo) => Types.AccountAppInviteInfo | null, variables: Types.AccountAppInviteInfoVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'AccountAppInviteInfo', variables);
    }
    async queryAccountAppInvite(opts?: OperationParameters): Promise<Types.AccountAppInvite> {
        return this.client.query('AccountAppInvite', undefined, opts);
    }
    async refetchAccountAppInvite(): Promise<Types.AccountAppInvite> {
        return this.refetch('AccountAppInvite');
    }
    useAccountAppInvite(opts?: QueryWatchParameters): Types.AccountAppInvite {
        return this.useQuerySuspense('AccountAppInvite', undefined, opts);
    }
    useWithoutLoaderAccountAppInvite(opts?: QueryWatchParameters): Types.AccountAppInvite | null {
        return this.useQuery('AccountAppInvite', undefined, opts);
    }
    async updateQueryAccountAppInvite(updater: (data: Types.AccountAppInvite) => Types.AccountAppInvite | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'AccountAppInvite');
    }
    async queryProfilePrefill(opts?: OperationParameters): Promise<Types.ProfilePrefill> {
        return this.client.query('ProfilePrefill', undefined, opts);
    }
    async refetchProfilePrefill(): Promise<Types.ProfilePrefill> {
        return this.refetch('ProfilePrefill');
    }
    useProfilePrefill(opts?: QueryWatchParameters): Types.ProfilePrefill {
        return this.useQuerySuspense('ProfilePrefill', undefined, opts);
    }
    useWithoutLoaderProfilePrefill(opts?: QueryWatchParameters): Types.ProfilePrefill | null {
        return this.useQuery('ProfilePrefill', undefined, opts);
    }
    async updateQueryProfilePrefill(updater: (data: Types.ProfilePrefill) => Types.ProfilePrefill | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'ProfilePrefill');
    }
    async queryFetchPushSettings(opts?: OperationParameters): Promise<Types.FetchPushSettings> {
        return this.client.query('FetchPushSettings', undefined, opts);
    }
    async refetchFetchPushSettings(): Promise<Types.FetchPushSettings> {
        return this.refetch('FetchPushSettings');
    }
    useFetchPushSettings(opts?: QueryWatchParameters): Types.FetchPushSettings {
        return this.useQuerySuspense('FetchPushSettings', undefined, opts);
    }
    useWithoutLoaderFetchPushSettings(opts?: QueryWatchParameters): Types.FetchPushSettings | null {
        return this.useQuery('FetchPushSettings', undefined, opts);
    }
    async updateQueryFetchPushSettings(updater: (data: Types.FetchPushSettings) => Types.FetchPushSettings | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'FetchPushSettings');
    }
    async queryMyApps(opts?: OperationParameters): Promise<Types.MyApps> {
        return this.client.query('MyApps', undefined, opts);
    }
    async refetchMyApps(): Promise<Types.MyApps> {
        return this.refetch('MyApps');
    }
    useMyApps(opts?: QueryWatchParameters): Types.MyApps {
        return this.useQuerySuspense('MyApps', undefined, opts);
    }
    useWithoutLoaderMyApps(opts?: QueryWatchParameters): Types.MyApps | null {
        return this.useQuery('MyApps', undefined, opts);
    }
    async updateQueryMyApps(updater: (data: Types.MyApps) => Types.MyApps | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'MyApps');
    }
    async queryUserStorage(variables: Types.UserStorageVariables, opts?: OperationParameters): Promise<Types.UserStorage> {
        return this.client.query('UserStorage', variables, opts);
    }
    async refetchUserStorage(variables: Types.UserStorageVariables): Promise<Types.UserStorage> {
        return this.refetch('UserStorage', variables);
    }
    useUserStorage(variables: Types.UserStorageVariables, opts?: QueryWatchParameters): Types.UserStorage {
        return this.useQuerySuspense('UserStorage', variables, opts);
    }
    useWithoutLoaderUserStorage(variables: Types.UserStorageVariables, opts?: QueryWatchParameters): Types.UserStorage | null {
        return this.useQuery('UserStorage', variables, opts);
    }
    async updateQueryUserStorage(updater: (data: Types.UserStorage) => Types.UserStorage | null, variables: Types.UserStorageVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'UserStorage', variables);
    }
    async querySuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: OperationParameters): Promise<Types.SuperBadgeInRoom> {
        return this.client.query('SuperBadgeInRoom', variables, opts);
    }
    async refetchSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables): Promise<Types.SuperBadgeInRoom> {
        return this.refetch('SuperBadgeInRoom', variables);
    }
    useSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: QueryWatchParameters): Types.SuperBadgeInRoom {
        return this.useQuerySuspense('SuperBadgeInRoom', variables, opts);
    }
    useWithoutLoaderSuperBadgeInRoom(variables: Types.SuperBadgeInRoomVariables, opts?: QueryWatchParameters): Types.SuperBadgeInRoom | null {
        return this.useQuery('SuperBadgeInRoom', variables, opts);
    }
    async updateQuerySuperBadgeInRoom(updater: (data: Types.SuperBadgeInRoom) => Types.SuperBadgeInRoom | null, variables: Types.SuperBadgeInRoomVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'SuperBadgeInRoom', variables);
    }
    async queryDialogs(variables: Types.DialogsVariables, opts?: OperationParameters): Promise<Types.Dialogs> {
        return this.client.query('Dialogs', variables, opts);
    }
    async refetchDialogs(variables: Types.DialogsVariables): Promise<Types.Dialogs> {
        return this.refetch('Dialogs', variables);
    }
    useDialogs(variables: Types.DialogsVariables, opts?: QueryWatchParameters): Types.Dialogs {
        return this.useQuerySuspense('Dialogs', variables, opts);
    }
    useWithoutLoaderDialogs(variables: Types.DialogsVariables, opts?: QueryWatchParameters): Types.Dialogs | null {
        return this.useQuery('Dialogs', variables, opts);
    }
    async updateQueryDialogs(updater: (data: Types.Dialogs) => Types.Dialogs | null, variables: Types.DialogsVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'Dialogs', variables);
    }
    async queryRoom(variables: Types.RoomVariables, opts?: OperationParameters): Promise<Types.Room> {
        return this.client.query('Room', variables, opts);
    }
    async refetchRoom(variables: Types.RoomVariables): Promise<Types.Room> {
        return this.refetch('Room', variables);
    }
    useRoom(variables: Types.RoomVariables, opts?: QueryWatchParameters): Types.Room {
        return this.useQuerySuspense('Room', variables, opts);
    }
    useWithoutLoaderRoom(variables: Types.RoomVariables, opts?: QueryWatchParameters): Types.Room | null {
        return this.useQuery('Room', variables, opts);
    }
    async updateQueryRoom(updater: (data: Types.Room) => Types.Room | null, variables: Types.RoomVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'Room', variables);
    }
    async queryRoomPico(variables: Types.RoomPicoVariables, opts?: OperationParameters): Promise<Types.RoomPico> {
        return this.client.query('RoomPico', variables, opts);
    }
    async refetchRoomPico(variables: Types.RoomPicoVariables): Promise<Types.RoomPico> {
        return this.refetch('RoomPico', variables);
    }
    useRoomPico(variables: Types.RoomPicoVariables, opts?: QueryWatchParameters): Types.RoomPico {
        return this.useQuerySuspense('RoomPico', variables, opts);
    }
    useWithoutLoaderRoomPico(variables: Types.RoomPicoVariables, opts?: QueryWatchParameters): Types.RoomPico | null {
        return this.useQuery('RoomPico', variables, opts);
    }
    async updateQueryRoomPico(updater: (data: Types.RoomPico) => Types.RoomPico | null, variables: Types.RoomPicoVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomPico', variables);
    }
    async queryRoomChat(variables: Types.RoomChatVariables, opts?: OperationParameters): Promise<Types.RoomChat> {
        return this.client.query('RoomChat', variables, opts);
    }
    async refetchRoomChat(variables: Types.RoomChatVariables): Promise<Types.RoomChat> {
        return this.refetch('RoomChat', variables);
    }
    useRoomChat(variables: Types.RoomChatVariables, opts?: QueryWatchParameters): Types.RoomChat {
        return this.useQuerySuspense('RoomChat', variables, opts);
    }
    useWithoutLoaderRoomChat(variables: Types.RoomChatVariables, opts?: QueryWatchParameters): Types.RoomChat | null {
        return this.useQuery('RoomChat', variables, opts);
    }
    async updateQueryRoomChat(updater: (data: Types.RoomChat) => Types.RoomChat | null, variables: Types.RoomChatVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomChat', variables);
    }
    async queryRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts?: OperationParameters): Promise<Types.RoomWithoutMembers> {
        return this.client.query('RoomWithoutMembers', variables, opts);
    }
    async refetchRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables): Promise<Types.RoomWithoutMembers> {
        return this.refetch('RoomWithoutMembers', variables);
    }
    useRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts?: QueryWatchParameters): Types.RoomWithoutMembers {
        return this.useQuerySuspense('RoomWithoutMembers', variables, opts);
    }
    useWithoutLoaderRoomWithoutMembers(variables: Types.RoomWithoutMembersVariables, opts?: QueryWatchParameters): Types.RoomWithoutMembers | null {
        return this.useQuery('RoomWithoutMembers', variables, opts);
    }
    async updateQueryRoomWithoutMembers(updater: (data: Types.RoomWithoutMembers) => Types.RoomWithoutMembers | null, variables: Types.RoomWithoutMembersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomWithoutMembers', variables);
    }
    async queryRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: OperationParameters): Promise<Types.RoomFeaturedMembers> {
        return this.client.query('RoomFeaturedMembers', variables, opts);
    }
    async refetchRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables): Promise<Types.RoomFeaturedMembers> {
        return this.refetch('RoomFeaturedMembers', variables);
    }
    useRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: QueryWatchParameters): Types.RoomFeaturedMembers {
        return this.useQuerySuspense('RoomFeaturedMembers', variables, opts);
    }
    useWithoutLoaderRoomFeaturedMembers(variables: Types.RoomFeaturedMembersVariables, opts?: QueryWatchParameters): Types.RoomFeaturedMembers | null {
        return this.useQuery('RoomFeaturedMembers', variables, opts);
    }
    async updateQueryRoomFeaturedMembers(updater: (data: Types.RoomFeaturedMembers) => Types.RoomFeaturedMembers | null, variables: Types.RoomFeaturedMembersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomFeaturedMembers', variables);
    }
    async queryRoomTiny(variables: Types.RoomTinyVariables, opts?: OperationParameters): Promise<Types.RoomTiny> {
        return this.client.query('RoomTiny', variables, opts);
    }
    async refetchRoomTiny(variables: Types.RoomTinyVariables): Promise<Types.RoomTiny> {
        return this.refetch('RoomTiny', variables);
    }
    useRoomTiny(variables: Types.RoomTinyVariables, opts?: QueryWatchParameters): Types.RoomTiny {
        return this.useQuerySuspense('RoomTiny', variables, opts);
    }
    useWithoutLoaderRoomTiny(variables: Types.RoomTinyVariables, opts?: QueryWatchParameters): Types.RoomTiny | null {
        return this.useQuery('RoomTiny', variables, opts);
    }
    async updateQueryRoomTiny(updater: (data: Types.RoomTiny) => Types.RoomTiny | null, variables: Types.RoomTinyVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomTiny', variables);
    }
    async queryRoomSuper(variables: Types.RoomSuperVariables, opts?: OperationParameters): Promise<Types.RoomSuper> {
        return this.client.query('RoomSuper', variables, opts);
    }
    async refetchRoomSuper(variables: Types.RoomSuperVariables): Promise<Types.RoomSuper> {
        return this.refetch('RoomSuper', variables);
    }
    useRoomSuper(variables: Types.RoomSuperVariables, opts?: QueryWatchParameters): Types.RoomSuper {
        return this.useQuerySuspense('RoomSuper', variables, opts);
    }
    useWithoutLoaderRoomSuper(variables: Types.RoomSuperVariables, opts?: QueryWatchParameters): Types.RoomSuper | null {
        return this.useQuery('RoomSuper', variables, opts);
    }
    async updateQueryRoomSuper(updater: (data: Types.RoomSuper) => Types.RoomSuper | null, variables: Types.RoomSuperVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomSuper', variables);
    }
    async queryGlobalCounter(opts?: OperationParameters): Promise<Types.GlobalCounter> {
        return this.client.query('GlobalCounter', undefined, opts);
    }
    async refetchGlobalCounter(): Promise<Types.GlobalCounter> {
        return this.refetch('GlobalCounter');
    }
    useGlobalCounter(opts?: QueryWatchParameters): Types.GlobalCounter {
        return this.useQuerySuspense('GlobalCounter', undefined, opts);
    }
    useWithoutLoaderGlobalCounter(opts?: QueryWatchParameters): Types.GlobalCounter | null {
        return this.useQuery('GlobalCounter', undefined, opts);
    }
    async updateQueryGlobalCounter(updater: (data: Types.GlobalCounter) => Types.GlobalCounter | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'GlobalCounter');
    }
    async queryMessagesBatch(variables: Types.MessagesBatchVariables, opts?: OperationParameters): Promise<Types.MessagesBatch> {
        return this.client.query('MessagesBatch', variables, opts);
    }
    async refetchMessagesBatch(variables: Types.MessagesBatchVariables): Promise<Types.MessagesBatch> {
        return this.refetch('MessagesBatch', variables);
    }
    useMessagesBatch(variables: Types.MessagesBatchVariables, opts?: QueryWatchParameters): Types.MessagesBatch {
        return this.useQuerySuspense('MessagesBatch', variables, opts);
    }
    useWithoutLoaderMessagesBatch(variables: Types.MessagesBatchVariables, opts?: QueryWatchParameters): Types.MessagesBatch | null {
        return this.useQuery('MessagesBatch', variables, opts);
    }
    async updateQueryMessagesBatch(updater: (data: Types.MessagesBatch) => Types.MessagesBatch | null, variables: Types.MessagesBatchVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'MessagesBatch', variables);
    }
    async queryChatInit(variables: Types.ChatInitVariables, opts?: OperationParameters): Promise<Types.ChatInit> {
        return this.client.query('ChatInit', variables, opts);
    }
    async refetchChatInit(variables: Types.ChatInitVariables): Promise<Types.ChatInit> {
        return this.refetch('ChatInit', variables);
    }
    useChatInit(variables: Types.ChatInitVariables, opts?: QueryWatchParameters): Types.ChatInit {
        return this.useQuerySuspense('ChatInit', variables, opts);
    }
    useWithoutLoaderChatInit(variables: Types.ChatInitVariables, opts?: QueryWatchParameters): Types.ChatInit | null {
        return this.useQuery('ChatInit', variables, opts);
    }
    async updateQueryChatInit(updater: (data: Types.ChatInit) => Types.ChatInit | null, variables: Types.ChatInitVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'ChatInit', variables);
    }
    async queryChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: OperationParameters): Promise<Types.ChatInitFromUnread> {
        return this.client.query('ChatInitFromUnread', variables, opts);
    }
    async refetchChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables): Promise<Types.ChatInitFromUnread> {
        return this.refetch('ChatInitFromUnread', variables);
    }
    useChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: QueryWatchParameters): Types.ChatInitFromUnread {
        return this.useQuerySuspense('ChatInitFromUnread', variables, opts);
    }
    useWithoutLoaderChatInitFromUnread(variables: Types.ChatInitFromUnreadVariables, opts?: QueryWatchParameters): Types.ChatInitFromUnread | null {
        return this.useQuery('ChatInitFromUnread', variables, opts);
    }
    async updateQueryChatInitFromUnread(updater: (data: Types.ChatInitFromUnread) => Types.ChatInitFromUnread | null, variables: Types.ChatInitFromUnreadVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'ChatInitFromUnread', variables);
    }
    async queryRoomSearch(variables: Types.RoomSearchVariables, opts?: OperationParameters): Promise<Types.RoomSearch> {
        return this.client.query('RoomSearch', variables, opts);
    }
    async refetchRoomSearch(variables: Types.RoomSearchVariables): Promise<Types.RoomSearch> {
        return this.refetch('RoomSearch', variables);
    }
    useRoomSearch(variables: Types.RoomSearchVariables, opts?: QueryWatchParameters): Types.RoomSearch {
        return this.useQuerySuspense('RoomSearch', variables, opts);
    }
    useWithoutLoaderRoomSearch(variables: Types.RoomSearchVariables, opts?: QueryWatchParameters): Types.RoomSearch | null {
        return this.useQuery('RoomSearch', variables, opts);
    }
    async updateQueryRoomSearch(updater: (data: Types.RoomSearch) => Types.RoomSearch | null, variables: Types.RoomSearchVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomSearch', variables);
    }
    async queryRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: OperationParameters): Promise<Types.RoomMembersShort> {
        return this.client.query('RoomMembersShort', variables, opts);
    }
    async refetchRoomMembersShort(variables: Types.RoomMembersShortVariables): Promise<Types.RoomMembersShort> {
        return this.refetch('RoomMembersShort', variables);
    }
    useRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: QueryWatchParameters): Types.RoomMembersShort {
        return this.useQuerySuspense('RoomMembersShort', variables, opts);
    }
    useWithoutLoaderRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: QueryWatchParameters): Types.RoomMembersShort | null {
        return this.useQuery('RoomMembersShort', variables, opts);
    }
    async updateQueryRoomMembersShort(updater: (data: Types.RoomMembersShort) => Types.RoomMembersShort | null, variables: Types.RoomMembersShortVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomMembersShort', variables);
    }
    async queryRoomMembers(variables: Types.RoomMembersVariables, opts?: OperationParameters): Promise<Types.RoomMembers> {
        return this.client.query('RoomMembers', variables, opts);
    }
    async refetchRoomMembers(variables: Types.RoomMembersVariables): Promise<Types.RoomMembers> {
        return this.refetch('RoomMembers', variables);
    }
    useRoomMembers(variables: Types.RoomMembersVariables, opts?: QueryWatchParameters): Types.RoomMembers {
        return this.useQuerySuspense('RoomMembers', variables, opts);
    }
    useWithoutLoaderRoomMembers(variables: Types.RoomMembersVariables, opts?: QueryWatchParameters): Types.RoomMembers | null {
        return this.useQuery('RoomMembers', variables, opts);
    }
    async updateQueryRoomMembers(updater: (data: Types.RoomMembers) => Types.RoomMembers | null, variables: Types.RoomMembersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomMembers', variables);
    }
    async queryRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: OperationParameters): Promise<Types.RoomMembersTiny> {
        return this.client.query('RoomMembersTiny', variables, opts);
    }
    async refetchRoomMembersTiny(variables: Types.RoomMembersTinyVariables): Promise<Types.RoomMembersTiny> {
        return this.refetch('RoomMembersTiny', variables);
    }
    useRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: QueryWatchParameters): Types.RoomMembersTiny {
        return this.useQuerySuspense('RoomMembersTiny', variables, opts);
    }
    useWithoutLoaderRoomMembersTiny(variables: Types.RoomMembersTinyVariables, opts?: QueryWatchParameters): Types.RoomMembersTiny | null {
        return this.useQuery('RoomMembersTiny', variables, opts);
    }
    async updateQueryRoomMembersTiny(updater: (data: Types.RoomMembersTiny) => Types.RoomMembersTiny | null, variables: Types.RoomMembersTinyVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomMembersTiny', variables);
    }
    async queryChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts?: OperationParameters): Promise<Types.ChatMembersSearch> {
        return this.client.query('ChatMembersSearch', variables, opts);
    }
    async refetchChatMembersSearch(variables: Types.ChatMembersSearchVariables): Promise<Types.ChatMembersSearch> {
        return this.refetch('ChatMembersSearch', variables);
    }
    useChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts?: QueryWatchParameters): Types.ChatMembersSearch {
        return this.useQuerySuspense('ChatMembersSearch', variables, opts);
    }
    useWithoutLoaderChatMembersSearch(variables: Types.ChatMembersSearchVariables, opts?: QueryWatchParameters): Types.ChatMembersSearch | null {
        return this.useQuery('ChatMembersSearch', variables, opts);
    }
    async updateQueryChatMembersSearch(updater: (data: Types.ChatMembersSearch) => Types.ChatMembersSearch | null, variables: Types.ChatMembersSearchVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'ChatMembersSearch', variables);
    }
    async queryRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts?: OperationParameters): Promise<Types.RoomOrganizationAdminMembers> {
        return this.client.query('RoomOrganizationAdminMembers', variables, opts);
    }
    async refetchRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables): Promise<Types.RoomOrganizationAdminMembers> {
        return this.refetch('RoomOrganizationAdminMembers', variables);
    }
    useRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts?: QueryWatchParameters): Types.RoomOrganizationAdminMembers {
        return this.useQuerySuspense('RoomOrganizationAdminMembers', variables, opts);
    }
    useWithoutLoaderRoomOrganizationAdminMembers(variables: Types.RoomOrganizationAdminMembersVariables, opts?: QueryWatchParameters): Types.RoomOrganizationAdminMembers | null {
        return this.useQuery('RoomOrganizationAdminMembers', variables, opts);
    }
    async updateQueryRoomOrganizationAdminMembers(updater: (data: Types.RoomOrganizationAdminMembers) => Types.RoomOrganizationAdminMembers | null, variables: Types.RoomOrganizationAdminMembersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomOrganizationAdminMembers', variables);
    }
    async queryRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: OperationParameters): Promise<Types.RoomMembersPaginated> {
        return this.client.query('RoomMembersPaginated', variables, opts);
    }
    async refetchRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables): Promise<Types.RoomMembersPaginated> {
        return this.refetch('RoomMembersPaginated', variables);
    }
    useRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: QueryWatchParameters): Types.RoomMembersPaginated {
        return this.useQuerySuspense('RoomMembersPaginated', variables, opts);
    }
    useWithoutLoaderRoomMembersPaginated(variables: Types.RoomMembersPaginatedVariables, opts?: QueryWatchParameters): Types.RoomMembersPaginated | null {
        return this.useQuery('RoomMembersPaginated', variables, opts);
    }
    async updateQueryRoomMembersPaginated(updater: (data: Types.RoomMembersPaginated) => Types.RoomMembersPaginated | null, variables: Types.RoomMembersPaginatedVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomMembersPaginated', variables);
    }
    async queryRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: OperationParameters): Promise<Types.RoomInviteLink> {
        return this.client.query('RoomInviteLink', variables, opts);
    }
    async refetchRoomInviteLink(variables: Types.RoomInviteLinkVariables): Promise<Types.RoomInviteLink> {
        return this.refetch('RoomInviteLink', variables);
    }
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: QueryWatchParameters): Types.RoomInviteLink {
        return this.useQuerySuspense('RoomInviteLink', variables, opts);
    }
    useWithoutLoaderRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: QueryWatchParameters): Types.RoomInviteLink | null {
        return this.useQuery('RoomInviteLink', variables, opts);
    }
    async updateQueryRoomInviteLink(updater: (data: Types.RoomInviteLink) => Types.RoomInviteLink | null, variables: Types.RoomInviteLinkVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomInviteLink', variables);
    }
    async queryRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: OperationParameters): Promise<Types.RoomInviteInfo> {
        return this.client.query('RoomInviteInfo', variables, opts);
    }
    async refetchRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Promise<Types.RoomInviteInfo> {
        return this.refetch('RoomInviteInfo', variables);
    }
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: QueryWatchParameters): Types.RoomInviteInfo {
        return this.useQuerySuspense('RoomInviteInfo', variables, opts);
    }
    useWithoutLoaderRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: QueryWatchParameters): Types.RoomInviteInfo | null {
        return this.useQuery('RoomInviteInfo', variables, opts);
    }
    async updateQueryRoomInviteInfo(updater: (data: Types.RoomInviteInfo) => Types.RoomInviteInfo | null, variables: Types.RoomInviteInfoVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'RoomInviteInfo', variables);
    }
    async queryResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: OperationParameters): Promise<Types.ResolvedInvite> {
        return this.client.query('ResolvedInvite', variables, opts);
    }
    async refetchResolvedInvite(variables: Types.ResolvedInviteVariables): Promise<Types.ResolvedInvite> {
        return this.refetch('ResolvedInvite', variables);
    }
    useResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: QueryWatchParameters): Types.ResolvedInvite {
        return this.useQuerySuspense('ResolvedInvite', variables, opts);
    }
    useWithoutLoaderResolvedInvite(variables: Types.ResolvedInviteVariables, opts?: QueryWatchParameters): Types.ResolvedInvite | null {
        return this.useQuery('ResolvedInvite', variables, opts);
    }
    async updateQueryResolvedInvite(updater: (data: Types.ResolvedInvite) => Types.ResolvedInvite | null, variables: Types.ResolvedInviteVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'ResolvedInvite', variables);
    }
    async queryMessage(variables: Types.MessageVariables, opts?: OperationParameters): Promise<Types.Message> {
        return this.client.query('Message', variables, opts);
    }
    async refetchMessage(variables: Types.MessageVariables): Promise<Types.Message> {
        return this.refetch('Message', variables);
    }
    useMessage(variables: Types.MessageVariables, opts?: QueryWatchParameters): Types.Message {
        return this.useQuerySuspense('Message', variables, opts);
    }
    useWithoutLoaderMessage(variables: Types.MessageVariables, opts?: QueryWatchParameters): Types.Message | null {
        return this.useQuery('Message', variables, opts);
    }
    async updateQueryMessage(updater: (data: Types.Message) => Types.Message | null, variables: Types.MessageVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'Message', variables);
    }
    async queryMessagesSearch(variables: Types.MessagesSearchVariables, opts?: OperationParameters): Promise<Types.MessagesSearch> {
        return this.client.query('MessagesSearch', variables, opts);
    }
    async refetchMessagesSearch(variables: Types.MessagesSearchVariables): Promise<Types.MessagesSearch> {
        return this.refetch('MessagesSearch', variables);
    }
    useMessagesSearch(variables: Types.MessagesSearchVariables, opts?: QueryWatchParameters): Types.MessagesSearch {
        return this.useQuerySuspense('MessagesSearch', variables, opts);
    }
    useWithoutLoaderMessagesSearch(variables: Types.MessagesSearchVariables, opts?: QueryWatchParameters): Types.MessagesSearch | null {
        return this.useQuery('MessagesSearch', variables, opts);
    }
    async updateQueryMessagesSearch(updater: (data: Types.MessagesSearch) => Types.MessagesSearch | null, variables: Types.MessagesSearchVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'MessagesSearch', variables);
    }
    async queryComments(variables: Types.CommentsVariables, opts?: OperationParameters): Promise<Types.Comments> {
        return this.client.query('Comments', variables, opts);
    }
    async refetchComments(variables: Types.CommentsVariables): Promise<Types.Comments> {
        return this.refetch('Comments', variables);
    }
    useComments(variables: Types.CommentsVariables, opts?: QueryWatchParameters): Types.Comments {
        return this.useQuerySuspense('Comments', variables, opts);
    }
    useWithoutLoaderComments(variables: Types.CommentsVariables, opts?: QueryWatchParameters): Types.Comments | null {
        return this.useQuery('Comments', variables, opts);
    }
    async updateQueryComments(updater: (data: Types.Comments) => Types.Comments | null, variables: Types.CommentsVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'Comments', variables);
    }
    async queryConference(variables: Types.ConferenceVariables, opts?: OperationParameters): Promise<Types.Conference> {
        return this.client.query('Conference', variables, opts);
    }
    async refetchConference(variables: Types.ConferenceVariables): Promise<Types.Conference> {
        return this.refetch('Conference', variables);
    }
    useConference(variables: Types.ConferenceVariables, opts?: QueryWatchParameters): Types.Conference {
        return this.useQuerySuspense('Conference', variables, opts);
    }
    useWithoutLoaderConference(variables: Types.ConferenceVariables, opts?: QueryWatchParameters): Types.Conference | null {
        return this.useQuery('Conference', variables, opts);
    }
    async updateQueryConference(updater: (data: Types.Conference) => Types.Conference | null, variables: Types.ConferenceVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'Conference', variables);
    }
    async queryConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: OperationParameters): Promise<Types.ConferenceMedia> {
        return this.client.query('ConferenceMedia', variables, opts);
    }
    async refetchConferenceMedia(variables: Types.ConferenceMediaVariables): Promise<Types.ConferenceMedia> {
        return this.refetch('ConferenceMedia', variables);
    }
    useConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: QueryWatchParameters): Types.ConferenceMedia {
        return this.useQuerySuspense('ConferenceMedia', variables, opts);
    }
    useWithoutLoaderConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: QueryWatchParameters): Types.ConferenceMedia | null {
        return this.useQuery('ConferenceMedia', variables, opts);
    }
    async updateQueryConferenceMedia(updater: (data: Types.ConferenceMedia) => Types.ConferenceMedia | null, variables: Types.ConferenceMediaVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'ConferenceMedia', variables);
    }
    async queryAvailableRooms(opts?: OperationParameters): Promise<Types.AvailableRooms> {
        return this.client.query('AvailableRooms', undefined, opts);
    }
    async refetchAvailableRooms(): Promise<Types.AvailableRooms> {
        return this.refetch('AvailableRooms');
    }
    useAvailableRooms(opts?: QueryWatchParameters): Types.AvailableRooms {
        return this.useQuerySuspense('AvailableRooms', undefined, opts);
    }
    useWithoutLoaderAvailableRooms(opts?: QueryWatchParameters): Types.AvailableRooms | null {
        return this.useQuery('AvailableRooms', undefined, opts);
    }
    async updateQueryAvailableRooms(updater: (data: Types.AvailableRooms) => Types.AvailableRooms | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'AvailableRooms');
    }
    async querySuggestedRooms(opts?: OperationParameters): Promise<Types.SuggestedRooms> {
        return this.client.query('SuggestedRooms', undefined, opts);
    }
    async refetchSuggestedRooms(): Promise<Types.SuggestedRooms> {
        return this.refetch('SuggestedRooms');
    }
    useSuggestedRooms(opts?: QueryWatchParameters): Types.SuggestedRooms {
        return this.useQuerySuspense('SuggestedRooms', undefined, opts);
    }
    useWithoutLoaderSuggestedRooms(opts?: QueryWatchParameters): Types.SuggestedRooms | null {
        return this.useQuery('SuggestedRooms', undefined, opts);
    }
    async updateQuerySuggestedRooms(updater: (data: Types.SuggestedRooms) => Types.SuggestedRooms | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'SuggestedRooms');
    }
    async queryUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: OperationParameters): Promise<Types.UserAvailableRooms> {
        return this.client.query('UserAvailableRooms', variables, opts);
    }
    async refetchUserAvailableRooms(variables: Types.UserAvailableRoomsVariables): Promise<Types.UserAvailableRooms> {
        return this.refetch('UserAvailableRooms', variables);
    }
    useUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: QueryWatchParameters): Types.UserAvailableRooms {
        return this.useQuerySuspense('UserAvailableRooms', variables, opts);
    }
    useWithoutLoaderUserAvailableRooms(variables: Types.UserAvailableRoomsVariables, opts?: QueryWatchParameters): Types.UserAvailableRooms | null {
        return this.useQuery('UserAvailableRooms', variables, opts);
    }
    async updateQueryUserAvailableRooms(updater: (data: Types.UserAvailableRooms) => Types.UserAvailableRooms | null, variables: Types.UserAvailableRoomsVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'UserAvailableRooms', variables);
    }
    async queryGlobalSearch(variables: Types.GlobalSearchVariables, opts?: OperationParameters): Promise<Types.GlobalSearch> {
        return this.client.query('GlobalSearch', variables, opts);
    }
    async refetchGlobalSearch(variables: Types.GlobalSearchVariables): Promise<Types.GlobalSearch> {
        return this.refetch('GlobalSearch', variables);
    }
    useGlobalSearch(variables: Types.GlobalSearchVariables, opts?: QueryWatchParameters): Types.GlobalSearch {
        return this.useQuerySuspense('GlobalSearch', variables, opts);
    }
    useWithoutLoaderGlobalSearch(variables: Types.GlobalSearchVariables, opts?: QueryWatchParameters): Types.GlobalSearch | null {
        return this.useQuery('GlobalSearch', variables, opts);
    }
    async updateQueryGlobalSearch(updater: (data: Types.GlobalSearch) => Types.GlobalSearch | null, variables: Types.GlobalSearchVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'GlobalSearch', variables);
    }
    async queryDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: OperationParameters): Promise<Types.DiscoverNextPage> {
        return this.client.query('DiscoverNextPage', variables, opts);
    }
    async refetchDiscoverNextPage(variables: Types.DiscoverNextPageVariables): Promise<Types.DiscoverNextPage> {
        return this.refetch('DiscoverNextPage', variables);
    }
    useDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: QueryWatchParameters): Types.DiscoverNextPage {
        return this.useQuerySuspense('DiscoverNextPage', variables, opts);
    }
    useWithoutLoaderDiscoverNextPage(variables: Types.DiscoverNextPageVariables, opts?: QueryWatchParameters): Types.DiscoverNextPage | null {
        return this.useQuery('DiscoverNextPage', variables, opts);
    }
    async updateQueryDiscoverNextPage(updater: (data: Types.DiscoverNextPage) => Types.DiscoverNextPage | null, variables: Types.DiscoverNextPageVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'DiscoverNextPage', variables);
    }
    async queryDiscoverIsDone(opts?: OperationParameters): Promise<Types.DiscoverIsDone> {
        return this.client.query('DiscoverIsDone', undefined, opts);
    }
    async refetchDiscoverIsDone(): Promise<Types.DiscoverIsDone> {
        return this.refetch('DiscoverIsDone');
    }
    useDiscoverIsDone(opts?: QueryWatchParameters): Types.DiscoverIsDone {
        return this.useQuerySuspense('DiscoverIsDone', undefined, opts);
    }
    useWithoutLoaderDiscoverIsDone(opts?: QueryWatchParameters): Types.DiscoverIsDone | null {
        return this.useQuery('DiscoverIsDone', undefined, opts);
    }
    async updateQueryDiscoverIsDone(updater: (data: Types.DiscoverIsDone) => Types.DiscoverIsDone | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'DiscoverIsDone');
    }
    async queryDiscoverState(opts?: OperationParameters): Promise<Types.DiscoverState> {
        return this.client.query('DiscoverState', undefined, opts);
    }
    async refetchDiscoverState(): Promise<Types.DiscoverState> {
        return this.refetch('DiscoverState');
    }
    useDiscoverState(opts?: QueryWatchParameters): Types.DiscoverState {
        return this.useQuerySuspense('DiscoverState', undefined, opts);
    }
    useWithoutLoaderDiscoverState(opts?: QueryWatchParameters): Types.DiscoverState | null {
        return this.useQuery('DiscoverState', undefined, opts);
    }
    async updateQueryDiscoverState(updater: (data: Types.DiscoverState) => Types.DiscoverState | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'DiscoverState');
    }
    async queryFeatureFlags(opts?: OperationParameters): Promise<Types.FeatureFlags> {
        return this.client.query('FeatureFlags', undefined, opts);
    }
    async refetchFeatureFlags(): Promise<Types.FeatureFlags> {
        return this.refetch('FeatureFlags');
    }
    useFeatureFlags(opts?: QueryWatchParameters): Types.FeatureFlags {
        return this.useQuerySuspense('FeatureFlags', undefined, opts);
    }
    useWithoutLoaderFeatureFlags(opts?: QueryWatchParameters): Types.FeatureFlags | null {
        return this.useQuery('FeatureFlags', undefined, opts);
    }
    async updateQueryFeatureFlags(updater: (data: Types.FeatureFlags) => Types.FeatureFlags | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeatureFlags');
    }
    async queryInitFeed(variables: Types.InitFeedVariables, opts?: OperationParameters): Promise<Types.InitFeed> {
        return this.client.query('InitFeed', variables, opts);
    }
    async refetchInitFeed(variables: Types.InitFeedVariables): Promise<Types.InitFeed> {
        return this.refetch('InitFeed', variables);
    }
    useInitFeed(variables: Types.InitFeedVariables, opts?: QueryWatchParameters): Types.InitFeed {
        return this.useQuerySuspense('InitFeed', variables, opts);
    }
    useWithoutLoaderInitFeed(variables: Types.InitFeedVariables, opts?: QueryWatchParameters): Types.InitFeed | null {
        return this.useQuery('InitFeed', variables, opts);
    }
    async updateQueryInitFeed(updater: (data: Types.InitFeed) => Types.InitFeed | null, variables: Types.InitFeedVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'InitFeed', variables);
    }
    async queryFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: OperationParameters): Promise<Types.FeedLoadMore> {
        return this.client.query('FeedLoadMore', variables, opts);
    }
    async refetchFeedLoadMore(variables: Types.FeedLoadMoreVariables): Promise<Types.FeedLoadMore> {
        return this.refetch('FeedLoadMore', variables);
    }
    useFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: QueryWatchParameters): Types.FeedLoadMore {
        return this.useQuerySuspense('FeedLoadMore', variables, opts);
    }
    useWithoutLoaderFeedLoadMore(variables: Types.FeedLoadMoreVariables, opts?: QueryWatchParameters): Types.FeedLoadMore | null {
        return this.useQuery('FeedLoadMore', variables, opts);
    }
    async updateQueryFeedLoadMore(updater: (data: Types.FeedLoadMore) => Types.FeedLoadMore | null, variables: Types.FeedLoadMoreVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedLoadMore', variables);
    }
    async queryFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, opts?: OperationParameters): Promise<Types.FeedSubscriptions> {
        return this.client.query('FeedSubscriptions', variables, opts);
    }
    async refetchFeedSubscriptions(variables: Types.FeedSubscriptionsVariables): Promise<Types.FeedSubscriptions> {
        return this.refetch('FeedSubscriptions', variables);
    }
    useFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, opts?: QueryWatchParameters): Types.FeedSubscriptions {
        return this.useQuerySuspense('FeedSubscriptions', variables, opts);
    }
    useWithoutLoaderFeedSubscriptions(variables: Types.FeedSubscriptionsVariables, opts?: QueryWatchParameters): Types.FeedSubscriptions | null {
        return this.useQuery('FeedSubscriptions', variables, opts);
    }
    async updateQueryFeedSubscriptions(updater: (data: Types.FeedSubscriptions) => Types.FeedSubscriptions | null, variables: Types.FeedSubscriptionsVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedSubscriptions', variables);
    }
    async queryFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, opts?: OperationParameters): Promise<Types.FeedWritableChannels> {
        return this.client.query('FeedWritableChannels', variables, opts);
    }
    async refetchFeedWritableChannels(variables: Types.FeedWritableChannelsVariables): Promise<Types.FeedWritableChannels> {
        return this.refetch('FeedWritableChannels', variables);
    }
    useFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, opts?: QueryWatchParameters): Types.FeedWritableChannels {
        return this.useQuerySuspense('FeedWritableChannels', variables, opts);
    }
    useWithoutLoaderFeedWritableChannels(variables: Types.FeedWritableChannelsVariables, opts?: QueryWatchParameters): Types.FeedWritableChannels | null {
        return this.useQuery('FeedWritableChannels', variables, opts);
    }
    async updateQueryFeedWritableChannels(updater: (data: Types.FeedWritableChannels) => Types.FeedWritableChannels | null, variables: Types.FeedWritableChannelsVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedWritableChannels', variables);
    }
    async queryFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: OperationParameters): Promise<Types.FeedChannelsSearch> {
        return this.client.query('FeedChannelsSearch', variables, opts);
    }
    async refetchFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables): Promise<Types.FeedChannelsSearch> {
        return this.refetch('FeedChannelsSearch', variables);
    }
    useFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: QueryWatchParameters): Types.FeedChannelsSearch {
        return this.useQuerySuspense('FeedChannelsSearch', variables, opts);
    }
    useWithoutLoaderFeedChannelsSearch(variables: Types.FeedChannelsSearchVariables, opts?: QueryWatchParameters): Types.FeedChannelsSearch | null {
        return this.useQuery('FeedChannelsSearch', variables, opts);
    }
    async updateQueryFeedChannelsSearch(updater: (data: Types.FeedChannelsSearch) => Types.FeedChannelsSearch | null, variables: Types.FeedChannelsSearchVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedChannelsSearch', variables);
    }
    async queryFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: OperationParameters): Promise<Types.FeedRecommendedChannels> {
        return this.client.query('FeedRecommendedChannels', variables, opts);
    }
    async refetchFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables): Promise<Types.FeedRecommendedChannels> {
        return this.refetch('FeedRecommendedChannels', variables);
    }
    useFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: QueryWatchParameters): Types.FeedRecommendedChannels {
        return this.useQuerySuspense('FeedRecommendedChannels', variables, opts);
    }
    useWithoutLoaderFeedRecommendedChannels(variables: Types.FeedRecommendedChannelsVariables, opts?: QueryWatchParameters): Types.FeedRecommendedChannels | null {
        return this.useQuery('FeedRecommendedChannels', variables, opts);
    }
    async updateQueryFeedRecommendedChannels(updater: (data: Types.FeedRecommendedChannels) => Types.FeedRecommendedChannels | null, variables: Types.FeedRecommendedChannelsVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedRecommendedChannels', variables);
    }
    async queryFeedChannel(variables: Types.FeedChannelVariables, opts?: OperationParameters): Promise<Types.FeedChannel> {
        return this.client.query('FeedChannel', variables, opts);
    }
    async refetchFeedChannel(variables: Types.FeedChannelVariables): Promise<Types.FeedChannel> {
        return this.refetch('FeedChannel', variables);
    }
    useFeedChannel(variables: Types.FeedChannelVariables, opts?: QueryWatchParameters): Types.FeedChannel {
        return this.useQuerySuspense('FeedChannel', variables, opts);
    }
    useWithoutLoaderFeedChannel(variables: Types.FeedChannelVariables, opts?: QueryWatchParameters): Types.FeedChannel | null {
        return this.useQuery('FeedChannel', variables, opts);
    }
    async updateQueryFeedChannel(updater: (data: Types.FeedChannel) => Types.FeedChannel | null, variables: Types.FeedChannelVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedChannel', variables);
    }
    async queryFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: OperationParameters): Promise<Types.FeedChannelWriters> {
        return this.client.query('FeedChannelWriters', variables, opts);
    }
    async refetchFeedChannelWriters(variables: Types.FeedChannelWritersVariables): Promise<Types.FeedChannelWriters> {
        return this.refetch('FeedChannelWriters', variables);
    }
    useFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: QueryWatchParameters): Types.FeedChannelWriters {
        return this.useQuerySuspense('FeedChannelWriters', variables, opts);
    }
    useWithoutLoaderFeedChannelWriters(variables: Types.FeedChannelWritersVariables, opts?: QueryWatchParameters): Types.FeedChannelWriters | null {
        return this.useQuery('FeedChannelWriters', variables, opts);
    }
    async updateQueryFeedChannelWriters(updater: (data: Types.FeedChannelWriters) => Types.FeedChannelWriters | null, variables: Types.FeedChannelWritersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedChannelWriters', variables);
    }
    async queryFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: OperationParameters): Promise<Types.FeedChannelSubscribers> {
        return this.client.query('FeedChannelSubscribers', variables, opts);
    }
    async refetchFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables): Promise<Types.FeedChannelSubscribers> {
        return this.refetch('FeedChannelSubscribers', variables);
    }
    useFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: QueryWatchParameters): Types.FeedChannelSubscribers {
        return this.useQuerySuspense('FeedChannelSubscribers', variables, opts);
    }
    useWithoutLoaderFeedChannelSubscribers(variables: Types.FeedChannelSubscribersVariables, opts?: QueryWatchParameters): Types.FeedChannelSubscribers | null {
        return this.useQuery('FeedChannelSubscribers', variables, opts);
    }
    async updateQueryFeedChannelSubscribers(updater: (data: Types.FeedChannelSubscribers) => Types.FeedChannelSubscribers | null, variables: Types.FeedChannelSubscribersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedChannelSubscribers', variables);
    }
    async queryFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: OperationParameters): Promise<Types.FeedChannelContent> {
        return this.client.query('FeedChannelContent', variables, opts);
    }
    async refetchFeedChannelContent(variables: Types.FeedChannelContentVariables): Promise<Types.FeedChannelContent> {
        return this.refetch('FeedChannelContent', variables);
    }
    useFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: QueryWatchParameters): Types.FeedChannelContent {
        return this.useQuerySuspense('FeedChannelContent', variables, opts);
    }
    useWithoutLoaderFeedChannelContent(variables: Types.FeedChannelContentVariables, opts?: QueryWatchParameters): Types.FeedChannelContent | null {
        return this.useQuery('FeedChannelContent', variables, opts);
    }
    async updateQueryFeedChannelContent(updater: (data: Types.FeedChannelContent) => Types.FeedChannelContent | null, variables: Types.FeedChannelContentVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedChannelContent', variables);
    }
    async queryFeedItem(variables: Types.FeedItemVariables, opts?: OperationParameters): Promise<Types.FeedItem> {
        return this.client.query('FeedItem', variables, opts);
    }
    async refetchFeedItem(variables: Types.FeedItemVariables): Promise<Types.FeedItem> {
        return this.refetch('FeedItem', variables);
    }
    useFeedItem(variables: Types.FeedItemVariables, opts?: QueryWatchParameters): Types.FeedItem {
        return this.useQuerySuspense('FeedItem', variables, opts);
    }
    useWithoutLoaderFeedItem(variables: Types.FeedItemVariables, opts?: QueryWatchParameters): Types.FeedItem | null {
        return this.useQuery('FeedItem', variables, opts);
    }
    async updateQueryFeedItem(updater: (data: Types.FeedItem) => Types.FeedItem | null, variables: Types.FeedItemVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'FeedItem', variables);
    }
    async queryMyCards(opts?: OperationParameters): Promise<Types.MyCards> {
        return this.client.query('MyCards', undefined, opts);
    }
    async refetchMyCards(): Promise<Types.MyCards> {
        return this.refetch('MyCards');
    }
    useMyCards(opts?: QueryWatchParameters): Types.MyCards {
        return this.useQuerySuspense('MyCards', undefined, opts);
    }
    useWithoutLoaderMyCards(opts?: QueryWatchParameters): Types.MyCards | null {
        return this.useQuery('MyCards', undefined, opts);
    }
    async updateQueryMyCards(updater: (data: Types.MyCards) => Types.MyCards | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'MyCards');
    }
    async queryMyWallet(opts?: OperationParameters): Promise<Types.MyWallet> {
        return this.client.query('MyWallet', undefined, opts);
    }
    async refetchMyWallet(): Promise<Types.MyWallet> {
        return this.refetch('MyWallet');
    }
    useMyWallet(opts?: QueryWatchParameters): Types.MyWallet {
        return this.useQuerySuspense('MyWallet', undefined, opts);
    }
    useWithoutLoaderMyWallet(opts?: QueryWatchParameters): Types.MyWallet | null {
        return this.useQuery('MyWallet', undefined, opts);
    }
    async updateQueryMyWallet(updater: (data: Types.MyWallet) => Types.MyWallet | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'MyWallet');
    }
    async queryMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: OperationParameters): Promise<Types.MatchmakingRoom> {
        return this.client.query('MatchmakingRoom', variables, opts);
    }
    async refetchMatchmakingRoom(variables: Types.MatchmakingRoomVariables): Promise<Types.MatchmakingRoom> {
        return this.refetch('MatchmakingRoom', variables);
    }
    useMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: QueryWatchParameters): Types.MatchmakingRoom {
        return this.useQuerySuspense('MatchmakingRoom', variables, opts);
    }
    useWithoutLoaderMatchmakingRoom(variables: Types.MatchmakingRoomVariables, opts?: QueryWatchParameters): Types.MatchmakingRoom | null {
        return this.useQuery('MatchmakingRoom', variables, opts);
    }
    async updateQueryMatchmakingRoom(updater: (data: Types.MatchmakingRoom) => Types.MatchmakingRoom | null, variables: Types.MatchmakingRoomVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'MatchmakingRoom', variables);
    }
    async queryMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: OperationParameters): Promise<Types.MatchmakingProfile> {
        return this.client.query('MatchmakingProfile', variables, opts);
    }
    async refetchMatchmakingProfile(variables: Types.MatchmakingProfileVariables): Promise<Types.MatchmakingProfile> {
        return this.refetch('MatchmakingProfile', variables);
    }
    useMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: QueryWatchParameters): Types.MatchmakingProfile {
        return this.useQuerySuspense('MatchmakingProfile', variables, opts);
    }
    useWithoutLoaderMatchmakingProfile(variables: Types.MatchmakingProfileVariables, opts?: QueryWatchParameters): Types.MatchmakingProfile | null {
        return this.useQuery('MatchmakingProfile', variables, opts);
    }
    async updateQueryMatchmakingProfile(updater: (data: Types.MatchmakingProfile) => Types.MatchmakingProfile | null, variables: Types.MatchmakingProfileVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'MatchmakingProfile', variables);
    }
    async queryChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: OperationParameters): Promise<Types.ChatMentionSearch> {
        return this.client.query('ChatMentionSearch', variables, opts);
    }
    async refetchChatMentionSearch(variables: Types.ChatMentionSearchVariables): Promise<Types.ChatMentionSearch> {
        return this.refetch('ChatMentionSearch', variables);
    }
    useChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: QueryWatchParameters): Types.ChatMentionSearch {
        return this.useQuerySuspense('ChatMentionSearch', variables, opts);
    }
    useWithoutLoaderChatMentionSearch(variables: Types.ChatMentionSearchVariables, opts?: QueryWatchParameters): Types.ChatMentionSearch | null {
        return this.useQuery('ChatMentionSearch', variables, opts);
    }
    async updateQueryChatMentionSearch(updater: (data: Types.ChatMentionSearch) => Types.ChatMentionSearch | null, variables: Types.ChatMentionSearchVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'ChatMentionSearch', variables);
    }
    async queryMyNotifications(variables: Types.MyNotificationsVariables, opts?: OperationParameters): Promise<Types.MyNotifications> {
        return this.client.query('MyNotifications', variables, opts);
    }
    async refetchMyNotifications(variables: Types.MyNotificationsVariables): Promise<Types.MyNotifications> {
        return this.refetch('MyNotifications', variables);
    }
    useMyNotifications(variables: Types.MyNotificationsVariables, opts?: QueryWatchParameters): Types.MyNotifications {
        return this.useQuerySuspense('MyNotifications', variables, opts);
    }
    useWithoutLoaderMyNotifications(variables: Types.MyNotificationsVariables, opts?: QueryWatchParameters): Types.MyNotifications | null {
        return this.useQuery('MyNotifications', variables, opts);
    }
    async updateQueryMyNotifications(updater: (data: Types.MyNotifications) => Types.MyNotifications | null, variables: Types.MyNotificationsVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'MyNotifications', variables);
    }
    async queryMyNotificationCenter(opts?: OperationParameters): Promise<Types.MyNotificationCenter> {
        return this.client.query('MyNotificationCenter', undefined, opts);
    }
    async refetchMyNotificationCenter(): Promise<Types.MyNotificationCenter> {
        return this.refetch('MyNotificationCenter');
    }
    useMyNotificationCenter(opts?: QueryWatchParameters): Types.MyNotificationCenter {
        return this.useQuerySuspense('MyNotificationCenter', undefined, opts);
    }
    useWithoutLoaderMyNotificationCenter(opts?: QueryWatchParameters): Types.MyNotificationCenter | null {
        return this.useQuery('MyNotificationCenter', undefined, opts);
    }
    async updateQueryMyNotificationCenter(updater: (data: Types.MyNotificationCenter) => Types.MyNotificationCenter | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'MyNotificationCenter');
    }
    async queryOauthContext(variables: Types.OauthContextVariables, opts?: OperationParameters): Promise<Types.OauthContext> {
        return this.client.query('OauthContext', variables, opts);
    }
    async refetchOauthContext(variables: Types.OauthContextVariables): Promise<Types.OauthContext> {
        return this.refetch('OauthContext', variables);
    }
    useOauthContext(variables: Types.OauthContextVariables, opts?: QueryWatchParameters): Types.OauthContext {
        return this.useQuerySuspense('OauthContext', variables, opts);
    }
    useWithoutLoaderOauthContext(variables: Types.OauthContextVariables, opts?: QueryWatchParameters): Types.OauthContext | null {
        return this.useQuery('OauthContext', variables, opts);
    }
    async updateQueryOauthContext(updater: (data: Types.OauthContext) => Types.OauthContext | null, variables: Types.OauthContextVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'OauthContext', variables);
    }
    async queryMyOrganizations(opts?: OperationParameters): Promise<Types.MyOrganizations> {
        return this.client.query('MyOrganizations', undefined, opts);
    }
    async refetchMyOrganizations(): Promise<Types.MyOrganizations> {
        return this.refetch('MyOrganizations');
    }
    useMyOrganizations(opts?: QueryWatchParameters): Types.MyOrganizations {
        return this.useQuerySuspense('MyOrganizations', undefined, opts);
    }
    useWithoutLoaderMyOrganizations(opts?: QueryWatchParameters): Types.MyOrganizations | null {
        return this.useQuery('MyOrganizations', undefined, opts);
    }
    async updateQueryMyOrganizations(updater: (data: Types.MyOrganizations) => Types.MyOrganizations | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'MyOrganizations');
    }
    async queryOrganization(variables: Types.OrganizationVariables, opts?: OperationParameters): Promise<Types.Organization> {
        return this.client.query('Organization', variables, opts);
    }
    async refetchOrganization(variables: Types.OrganizationVariables): Promise<Types.Organization> {
        return this.refetch('Organization', variables);
    }
    useOrganization(variables: Types.OrganizationVariables, opts?: QueryWatchParameters): Types.Organization {
        return this.useQuerySuspense('Organization', variables, opts);
    }
    useWithoutLoaderOrganization(variables: Types.OrganizationVariables, opts?: QueryWatchParameters): Types.Organization | null {
        return this.useQuery('Organization', variables, opts);
    }
    async updateQueryOrganization(updater: (data: Types.Organization) => Types.Organization | null, variables: Types.OrganizationVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'Organization', variables);
    }
    async queryOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationWithoutMembers> {
        return this.client.query('OrganizationWithoutMembers', variables, opts);
    }
    async refetchOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables): Promise<Types.OrganizationWithoutMembers> {
        return this.refetch('OrganizationWithoutMembers', variables);
    }
    useOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: QueryWatchParameters): Types.OrganizationWithoutMembers {
        return this.useQuerySuspense('OrganizationWithoutMembers', variables, opts);
    }
    useWithoutLoaderOrganizationWithoutMembers(variables: Types.OrganizationWithoutMembersVariables, opts?: QueryWatchParameters): Types.OrganizationWithoutMembers | null {
        return this.useQuery('OrganizationWithoutMembers', variables, opts);
    }
    async updateQueryOrganizationWithoutMembers(updater: (data: Types.OrganizationWithoutMembers) => Types.OrganizationWithoutMembers | null, variables: Types.OrganizationWithoutMembersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'OrganizationWithoutMembers', variables);
    }
    async queryOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: OperationParameters): Promise<Types.OrganizationMembersShort> {
        return this.client.query('OrganizationMembersShort', variables, opts);
    }
    async refetchOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables): Promise<Types.OrganizationMembersShort> {
        return this.refetch('OrganizationMembersShort', variables);
    }
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: QueryWatchParameters): Types.OrganizationMembersShort {
        return this.useQuerySuspense('OrganizationMembersShort', variables, opts);
    }
    useWithoutLoaderOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: QueryWatchParameters): Types.OrganizationMembersShort | null {
        return this.useQuery('OrganizationMembersShort', variables, opts);
    }
    async updateQueryOrganizationMembersShort(updater: (data: Types.OrganizationMembersShort) => Types.OrganizationMembersShort | null, variables: Types.OrganizationMembersShortVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'OrganizationMembersShort', variables);
    }
    async queryOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: OperationParameters): Promise<Types.OrganizationMembers> {
        return this.client.query('OrganizationMembers', variables, opts);
    }
    async refetchOrganizationMembers(variables: Types.OrganizationMembersVariables): Promise<Types.OrganizationMembers> {
        return this.refetch('OrganizationMembers', variables);
    }
    useOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: QueryWatchParameters): Types.OrganizationMembers {
        return this.useQuerySuspense('OrganizationMembers', variables, opts);
    }
    useWithoutLoaderOrganizationMembers(variables: Types.OrganizationMembersVariables, opts?: QueryWatchParameters): Types.OrganizationMembers | null {
        return this.useQuery('OrganizationMembers', variables, opts);
    }
    async updateQueryOrganizationMembers(updater: (data: Types.OrganizationMembers) => Types.OrganizationMembers | null, variables: Types.OrganizationMembersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'OrganizationMembers', variables);
    }
    async queryOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: OperationParameters): Promise<Types.OrganizationProfile> {
        return this.client.query('OrganizationProfile', variables, opts);
    }
    async refetchOrganizationProfile(variables: Types.OrganizationProfileVariables): Promise<Types.OrganizationProfile> {
        return this.refetch('OrganizationProfile', variables);
    }
    useOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: QueryWatchParameters): Types.OrganizationProfile {
        return this.useQuerySuspense('OrganizationProfile', variables, opts);
    }
    useWithoutLoaderOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: QueryWatchParameters): Types.OrganizationProfile | null {
        return this.useQuery('OrganizationProfile', variables, opts);
    }
    async updateQueryOrganizationProfile(updater: (data: Types.OrganizationProfile) => Types.OrganizationProfile | null, variables: Types.OrganizationProfileVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'OrganizationProfile', variables);
    }
    async queryExploreCommunity(variables: Types.ExploreCommunityVariables, opts?: OperationParameters): Promise<Types.ExploreCommunity> {
        return this.client.query('ExploreCommunity', variables, opts);
    }
    async refetchExploreCommunity(variables: Types.ExploreCommunityVariables): Promise<Types.ExploreCommunity> {
        return this.refetch('ExploreCommunity', variables);
    }
    useExploreCommunity(variables: Types.ExploreCommunityVariables, opts?: QueryWatchParameters): Types.ExploreCommunity {
        return this.useQuerySuspense('ExploreCommunity', variables, opts);
    }
    useWithoutLoaderExploreCommunity(variables: Types.ExploreCommunityVariables, opts?: QueryWatchParameters): Types.ExploreCommunity | null {
        return this.useQuery('ExploreCommunity', variables, opts);
    }
    async updateQueryExploreCommunity(updater: (data: Types.ExploreCommunity) => Types.ExploreCommunity | null, variables: Types.ExploreCommunityVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'ExploreCommunity', variables);
    }
    async queryOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicInvite> {
        return this.client.query('OrganizationPublicInvite', variables, opts);
    }
    async refetchOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Promise<Types.OrganizationPublicInvite> {
        return this.refetch('OrganizationPublicInvite', variables);
    }
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: QueryWatchParameters): Types.OrganizationPublicInvite {
        return this.useQuerySuspense('OrganizationPublicInvite', variables, opts);
    }
    useWithoutLoaderOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: QueryWatchParameters): Types.OrganizationPublicInvite | null {
        return this.useQuery('OrganizationPublicInvite', variables, opts);
    }
    async updateQueryOrganizationPublicInvite(updater: (data: Types.OrganizationPublicInvite) => Types.OrganizationPublicInvite | null, variables: Types.OrganizationPublicInviteVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'OrganizationPublicInvite', variables);
    }
    async queryOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: OperationParameters): Promise<Types.OrganizationByPrefix> {
        return this.client.query('OrganizationByPrefix', variables, opts);
    }
    async refetchOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Promise<Types.OrganizationByPrefix> {
        return this.refetch('OrganizationByPrefix', variables);
    }
    useOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: QueryWatchParameters): Types.OrganizationByPrefix {
        return this.useQuerySuspense('OrganizationByPrefix', variables, opts);
    }
    useWithoutLoaderOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: QueryWatchParameters): Types.OrganizationByPrefix | null {
        return this.useQuery('OrganizationByPrefix', variables, opts);
    }
    async updateQueryOrganizationByPrefix(updater: (data: Types.OrganizationByPrefix) => Types.OrganizationByPrefix | null, variables: Types.OrganizationByPrefixVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'OrganizationByPrefix', variables);
    }
    async queryOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicRooms> {
        return this.client.query('OrganizationPublicRooms', variables, opts);
    }
    async refetchOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables): Promise<Types.OrganizationPublicRooms> {
        return this.refetch('OrganizationPublicRooms', variables);
    }
    useOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: QueryWatchParameters): Types.OrganizationPublicRooms {
        return this.useQuerySuspense('OrganizationPublicRooms', variables, opts);
    }
    useWithoutLoaderOrganizationPublicRooms(variables: Types.OrganizationPublicRoomsVariables, opts?: QueryWatchParameters): Types.OrganizationPublicRooms | null {
        return this.useQuery('OrganizationPublicRooms', variables, opts);
    }
    async updateQueryOrganizationPublicRooms(updater: (data: Types.OrganizationPublicRooms) => Types.OrganizationPublicRooms | null, variables: Types.OrganizationPublicRoomsVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'OrganizationPublicRooms', variables);
    }
    async queryPermissions(opts?: OperationParameters): Promise<Types.Permissions> {
        return this.client.query('Permissions', undefined, opts);
    }
    async refetchPermissions(): Promise<Types.Permissions> {
        return this.refetch('Permissions');
    }
    usePermissions(opts?: QueryWatchParameters): Types.Permissions {
        return this.useQuerySuspense('Permissions', undefined, opts);
    }
    useWithoutLoaderPermissions(opts?: QueryWatchParameters): Types.Permissions | null {
        return this.useQuery('Permissions', undefined, opts);
    }
    async updateQueryPermissions(updater: (data: Types.Permissions) => Types.Permissions | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'Permissions');
    }
    async querySuperAdmins(opts?: OperationParameters): Promise<Types.SuperAdmins> {
        return this.client.query('SuperAdmins', undefined, opts);
    }
    async refetchSuperAdmins(): Promise<Types.SuperAdmins> {
        return this.refetch('SuperAdmins');
    }
    useSuperAdmins(opts?: QueryWatchParameters): Types.SuperAdmins {
        return this.useQuerySuspense('SuperAdmins', undefined, opts);
    }
    useWithoutLoaderSuperAdmins(opts?: QueryWatchParameters): Types.SuperAdmins | null {
        return this.useQuery('SuperAdmins', undefined, opts);
    }
    async updateQuerySuperAdmins(updater: (data: Types.SuperAdmins) => Types.SuperAdmins | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'SuperAdmins');
    }
    async querySuperAccounts(opts?: OperationParameters): Promise<Types.SuperAccounts> {
        return this.client.query('SuperAccounts', undefined, opts);
    }
    async refetchSuperAccounts(): Promise<Types.SuperAccounts> {
        return this.refetch('SuperAccounts');
    }
    useSuperAccounts(opts?: QueryWatchParameters): Types.SuperAccounts {
        return this.useQuerySuspense('SuperAccounts', undefined, opts);
    }
    useWithoutLoaderSuperAccounts(opts?: QueryWatchParameters): Types.SuperAccounts | null {
        return this.useQuery('SuperAccounts', undefined, opts);
    }
    async updateQuerySuperAccounts(updater: (data: Types.SuperAccounts) => Types.SuperAccounts | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'SuperAccounts');
    }
    async querySuperAccount(variables: Types.SuperAccountVariables, opts?: OperationParameters): Promise<Types.SuperAccount> {
        return this.client.query('SuperAccount', variables, opts);
    }
    async refetchSuperAccount(variables: Types.SuperAccountVariables): Promise<Types.SuperAccount> {
        return this.refetch('SuperAccount', variables);
    }
    useSuperAccount(variables: Types.SuperAccountVariables, opts?: QueryWatchParameters): Types.SuperAccount {
        return this.useQuerySuspense('SuperAccount', variables, opts);
    }
    useWithoutLoaderSuperAccount(variables: Types.SuperAccountVariables, opts?: QueryWatchParameters): Types.SuperAccount | null {
        return this.useQuery('SuperAccount', variables, opts);
    }
    async updateQuerySuperAccount(updater: (data: Types.SuperAccount) => Types.SuperAccount | null, variables: Types.SuperAccountVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'SuperAccount', variables);
    }
    async queryProfile(opts?: OperationParameters): Promise<Types.Profile> {
        return this.client.query('Profile', undefined, opts);
    }
    async refetchProfile(): Promise<Types.Profile> {
        return this.refetch('Profile');
    }
    useProfile(opts?: QueryWatchParameters): Types.Profile {
        return this.useQuerySuspense('Profile', undefined, opts);
    }
    useWithoutLoaderProfile(opts?: QueryWatchParameters): Types.Profile | null {
        return this.useQuery('Profile', undefined, opts);
    }
    async updateQueryProfile(updater: (data: Types.Profile) => Types.Profile | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'Profile');
    }
    async querySettings(opts?: OperationParameters): Promise<Types.Settings> {
        return this.client.query('Settings', undefined, opts);
    }
    async refetchSettings(): Promise<Types.Settings> {
        return this.refetch('Settings');
    }
    useSettings(opts?: QueryWatchParameters): Types.Settings {
        return this.useQuerySuspense('Settings', undefined, opts);
    }
    useWithoutLoaderSettings(opts?: QueryWatchParameters): Types.Settings | null {
        return this.useQuery('Settings', undefined, opts);
    }
    async updateQuerySettings(updater: (data: Types.Settings) => Types.Settings | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'Settings');
    }
    async querySharedMedia(variables: Types.SharedMediaVariables, opts?: OperationParameters): Promise<Types.SharedMedia> {
        return this.client.query('SharedMedia', variables, opts);
    }
    async refetchSharedMedia(variables: Types.SharedMediaVariables): Promise<Types.SharedMedia> {
        return this.refetch('SharedMedia', variables);
    }
    useSharedMedia(variables: Types.SharedMediaVariables, opts?: QueryWatchParameters): Types.SharedMedia {
        return this.useQuerySuspense('SharedMedia', variables, opts);
    }
    useWithoutLoaderSharedMedia(variables: Types.SharedMediaVariables, opts?: QueryWatchParameters): Types.SharedMedia | null {
        return this.useQuery('SharedMedia', variables, opts);
    }
    async updateQuerySharedMedia(updater: (data: Types.SharedMedia) => Types.SharedMedia | null, variables: Types.SharedMediaVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'SharedMedia', variables);
    }
    async querySharedMediaCounters(variables: Types.SharedMediaCountersVariables, opts?: OperationParameters): Promise<Types.SharedMediaCounters> {
        return this.client.query('SharedMediaCounters', variables, opts);
    }
    async refetchSharedMediaCounters(variables: Types.SharedMediaCountersVariables): Promise<Types.SharedMediaCounters> {
        return this.refetch('SharedMediaCounters', variables);
    }
    useSharedMediaCounters(variables: Types.SharedMediaCountersVariables, opts?: QueryWatchParameters): Types.SharedMediaCounters {
        return this.useQuerySuspense('SharedMediaCounters', variables, opts);
    }
    useWithoutLoaderSharedMediaCounters(variables: Types.SharedMediaCountersVariables, opts?: QueryWatchParameters): Types.SharedMediaCounters | null {
        return this.useQuery('SharedMediaCounters', variables, opts);
    }
    async updateQuerySharedMediaCounters(updater: (data: Types.SharedMediaCounters) => Types.SharedMediaCounters | null, variables: Types.SharedMediaCountersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'SharedMediaCounters', variables);
    }
    async queryResolveShortName(variables: Types.ResolveShortNameVariables, opts?: OperationParameters): Promise<Types.ResolveShortName> {
        return this.client.query('ResolveShortName', variables, opts);
    }
    async refetchResolveShortName(variables: Types.ResolveShortNameVariables): Promise<Types.ResolveShortName> {
        return this.refetch('ResolveShortName', variables);
    }
    useResolveShortName(variables: Types.ResolveShortNameVariables, opts?: QueryWatchParameters): Types.ResolveShortName {
        return this.useQuerySuspense('ResolveShortName', variables, opts);
    }
    useWithoutLoaderResolveShortName(variables: Types.ResolveShortNameVariables, opts?: QueryWatchParameters): Types.ResolveShortName | null {
        return this.useQuery('ResolveShortName', variables, opts);
    }
    async updateQueryResolveShortName(updater: (data: Types.ResolveShortName) => Types.ResolveShortName | null, variables: Types.ResolveShortNameVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'ResolveShortName', variables);
    }
    async queryGetUser(variables: Types.GetUserVariables, opts?: OperationParameters): Promise<Types.GetUser> {
        return this.client.query('GetUser', variables, opts);
    }
    async refetchGetUser(variables: Types.GetUserVariables): Promise<Types.GetUser> {
        return this.refetch('GetUser', variables);
    }
    useGetUser(variables: Types.GetUserVariables, opts?: QueryWatchParameters): Types.GetUser {
        return this.useQuerySuspense('GetUser', variables, opts);
    }
    useWithoutLoaderGetUser(variables: Types.GetUserVariables, opts?: QueryWatchParameters): Types.GetUser | null {
        return this.useQuery('GetUser', variables, opts);
    }
    async updateQueryGetUser(updater: (data: Types.GetUser) => Types.GetUser | null, variables: Types.GetUserVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'GetUser', variables);
    }
    async queryMyStickers(opts?: OperationParameters): Promise<Types.MyStickers> {
        return this.client.query('MyStickers', undefined, opts);
    }
    async refetchMyStickers(): Promise<Types.MyStickers> {
        return this.refetch('MyStickers');
    }
    useMyStickers(opts?: QueryWatchParameters): Types.MyStickers {
        return this.useQuerySuspense('MyStickers', undefined, opts);
    }
    useWithoutLoaderMyStickers(opts?: QueryWatchParameters): Types.MyStickers | null {
        return this.useQuery('MyStickers', undefined, opts);
    }
    async updateQueryMyStickers(updater: (data: Types.MyStickers) => Types.MyStickers | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'MyStickers');
    }
    async queryStickerPack(variables: Types.StickerPackVariables, opts?: OperationParameters): Promise<Types.StickerPack> {
        return this.client.query('StickerPack', variables, opts);
    }
    async refetchStickerPack(variables: Types.StickerPackVariables): Promise<Types.StickerPack> {
        return this.refetch('StickerPack', variables);
    }
    useStickerPack(variables: Types.StickerPackVariables, opts?: QueryWatchParameters): Types.StickerPack {
        return this.useQuerySuspense('StickerPack', variables, opts);
    }
    useWithoutLoaderStickerPack(variables: Types.StickerPackVariables, opts?: QueryWatchParameters): Types.StickerPack | null {
        return this.useQuery('StickerPack', variables, opts);
    }
    async updateQueryStickerPack(updater: (data: Types.StickerPack) => Types.StickerPack | null, variables: Types.StickerPackVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'StickerPack', variables);
    }
    async queryUsers(variables: Types.UsersVariables, opts?: OperationParameters): Promise<Types.Users> {
        return this.client.query('Users', variables, opts);
    }
    async refetchUsers(variables: Types.UsersVariables): Promise<Types.Users> {
        return this.refetch('Users', variables);
    }
    useUsers(variables: Types.UsersVariables, opts?: QueryWatchParameters): Types.Users {
        return this.useQuerySuspense('Users', variables, opts);
    }
    useWithoutLoaderUsers(variables: Types.UsersVariables, opts?: QueryWatchParameters): Types.Users | null {
        return this.useQuery('Users', variables, opts);
    }
    async updateQueryUsers(updater: (data: Types.Users) => Types.Users | null, variables: Types.UsersVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'Users', variables);
    }
    async queryUser(variables: Types.UserVariables, opts?: OperationParameters): Promise<Types.User> {
        return this.client.query('User', variables, opts);
    }
    async refetchUser(variables: Types.UserVariables): Promise<Types.User> {
        return this.refetch('User', variables);
    }
    useUser(variables: Types.UserVariables, opts?: QueryWatchParameters): Types.User {
        return this.useQuerySuspense('User', variables, opts);
    }
    useWithoutLoaderUser(variables: Types.UserVariables, opts?: QueryWatchParameters): Types.User | null {
        return this.useQuery('User', variables, opts);
    }
    async updateQueryUser(updater: (data: Types.User) => Types.User | null, variables: Types.UserVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'User', variables);
    }
    async queryUserPico(variables: Types.UserPicoVariables, opts?: OperationParameters): Promise<Types.UserPico> {
        return this.client.query('UserPico', variables, opts);
    }
    async refetchUserPico(variables: Types.UserPicoVariables): Promise<Types.UserPico> {
        return this.refetch('UserPico', variables);
    }
    useUserPico(variables: Types.UserPicoVariables, opts?: QueryWatchParameters): Types.UserPico {
        return this.useQuerySuspense('UserPico', variables, opts);
    }
    useWithoutLoaderUserPico(variables: Types.UserPicoVariables, opts?: QueryWatchParameters): Types.UserPico | null {
        return this.useQuery('UserPico', variables, opts);
    }
    async updateQueryUserPico(updater: (data: Types.UserPico) => Types.UserPico | null, variables: Types.UserPicoVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'UserPico', variables);
    }
    async queryOnline(variables: Types.OnlineVariables, opts?: OperationParameters): Promise<Types.Online> {
        return this.client.query('Online', variables, opts);
    }
    async refetchOnline(variables: Types.OnlineVariables): Promise<Types.Online> {
        return this.refetch('Online', variables);
    }
    useOnline(variables: Types.OnlineVariables, opts?: QueryWatchParameters): Types.Online {
        return this.useQuerySuspense('Online', variables, opts);
    }
    useWithoutLoaderOnline(variables: Types.OnlineVariables, opts?: QueryWatchParameters): Types.Online | null {
        return this.useQuery('Online', variables, opts);
    }
    async updateQueryOnline(updater: (data: Types.Online) => Types.Online | null, variables: Types.OnlineVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'Online', variables);
    }
    async queryExplorePeople(variables: Types.ExplorePeopleVariables, opts?: OperationParameters): Promise<Types.ExplorePeople> {
        return this.client.query('ExplorePeople', variables, opts);
    }
    async refetchExplorePeople(variables: Types.ExplorePeopleVariables): Promise<Types.ExplorePeople> {
        return this.refetch('ExplorePeople', variables);
    }
    useExplorePeople(variables: Types.ExplorePeopleVariables, opts?: QueryWatchParameters): Types.ExplorePeople {
        return this.useQuerySuspense('ExplorePeople', variables, opts);
    }
    useWithoutLoaderExplorePeople(variables: Types.ExplorePeopleVariables, opts?: QueryWatchParameters): Types.ExplorePeople | null {
        return this.useQuery('ExplorePeople', variables, opts);
    }
    async updateQueryExplorePeople(updater: (data: Types.ExplorePeople) => Types.ExplorePeople | null, variables: Types.ExplorePeopleVariables): Promise<boolean> {
        return this.client.updateQuery(updater, 'ExplorePeople', variables);
    }
    async queryMySuccessfulInvitesCount(opts?: OperationParameters): Promise<Types.MySuccessfulInvitesCount> {
        return this.client.query('MySuccessfulInvitesCount', undefined, opts);
    }
    async refetchMySuccessfulInvitesCount(): Promise<Types.MySuccessfulInvitesCount> {
        return this.refetch('MySuccessfulInvitesCount');
    }
    useMySuccessfulInvitesCount(opts?: QueryWatchParameters): Types.MySuccessfulInvitesCount {
        return this.useQuerySuspense('MySuccessfulInvitesCount', undefined, opts);
    }
    useWithoutLoaderMySuccessfulInvitesCount(opts?: QueryWatchParameters): Types.MySuccessfulInvitesCount | null {
        return this.useQuery('MySuccessfulInvitesCount', undefined, opts);
    }
    async updateQueryMySuccessfulInvitesCount(updater: (data: Types.MySuccessfulInvitesCount) => Types.MySuccessfulInvitesCount | null): Promise<boolean> {
        return this.client.updateQuery(updater, 'MySuccessfulInvitesCount');
    }
    async mutateCreateOrganization(variables: Types.CreateOrganizationVariables): Promise<Types.CreateOrganization> {
        return this.client.mutate('CreateOrganization', variables);
    }
    async mutateAccountInviteJoin(variables: Types.AccountInviteJoinVariables): Promise<Types.AccountInviteJoin> {
        return this.client.mutate('AccountInviteJoin', variables);
    }
    async mutateCreateUserProfileAndOrganization(variables: Types.CreateUserProfileAndOrganizationVariables): Promise<Types.CreateUserProfileAndOrganization> {
        return this.client.mutate('CreateUserProfileAndOrganization', variables);
    }
    async mutateReportOnline(variables: Types.ReportOnlineVariables): Promise<Types.ReportOnline> {
        return this.client.mutate('ReportOnline', variables);
    }
    async mutateRegisterPush(variables: Types.RegisterPushVariables): Promise<Types.RegisterPush> {
        return this.client.mutate('RegisterPush', variables);
    }
    async mutateRegisterWebPush(variables: Types.RegisterWebPushVariables): Promise<Types.RegisterWebPush> {
        return this.client.mutate('RegisterWebPush', variables);
    }
    async mutateCreateApp(variables: Types.CreateAppVariables): Promise<Types.CreateApp> {
        return this.client.mutate('CreateApp', variables);
    }
    async mutateUpdateApp(variables: Types.UpdateAppVariables): Promise<Types.UpdateApp> {
        return this.client.mutate('UpdateApp', variables);
    }
    async mutateRefreshAppToken(variables: Types.RefreshAppTokenVariables): Promise<Types.RefreshAppToken> {
        return this.client.mutate('RefreshAppToken', variables);
    }
    async mutateAddAppToChat(variables: Types.AddAppToChatVariables): Promise<Types.AddAppToChat> {
        return this.client.mutate('AddAppToChat', variables);
    }
    async mutateUserStorageSet(variables: Types.UserStorageSetVariables): Promise<Types.UserStorageSet> {
        return this.client.mutate('UserStorageSet', variables);
    }
    async mutateSuperBadgeCreateToRoom(variables: Types.SuperBadgeCreateToRoomVariables): Promise<Types.SuperBadgeCreateToRoom> {
        return this.client.mutate('SuperBadgeCreateToRoom', variables);
    }
    async mutateSuperBadgeUnsetToRoom(variables: Types.SuperBadgeUnsetToRoomVariables): Promise<Types.SuperBadgeUnsetToRoom> {
        return this.client.mutate('SuperBadgeUnsetToRoom', variables);
    }
    async mutatePinMessage(variables: Types.PinMessageVariables): Promise<Types.PinMessage> {
        return this.client.mutate('PinMessage', variables);
    }
    async mutateUnpinMessage(variables: Types.UnpinMessageVariables): Promise<Types.UnpinMessage> {
        return this.client.mutate('UnpinMessage', variables);
    }
    async mutateMessageSetReaction(variables: Types.MessageSetReactionVariables): Promise<Types.MessageSetReaction> {
        return this.client.mutate('MessageSetReaction', variables);
    }
    async mutateMessageUnsetReaction(variables: Types.MessageUnsetReactionVariables): Promise<Types.MessageUnsetReaction> {
        return this.client.mutate('MessageUnsetReaction', variables);
    }
    async mutateSendMessage(variables: Types.SendMessageVariables): Promise<Types.SendMessage> {
        return this.client.mutate('SendMessage', variables);
    }
    async mutateRoomRead(variables: Types.RoomReadVariables): Promise<Types.RoomRead> {
        return this.client.mutate('RoomRead', variables);
    }
    async mutateRoomCreate(variables: Types.RoomCreateVariables): Promise<Types.RoomCreate> {
        return this.client.mutate('RoomCreate', variables);
    }
    async mutateBuyPremiumChatSubscription(variables: Types.BuyPremiumChatSubscriptionVariables): Promise<Types.BuyPremiumChatSubscription> {
        return this.client.mutate('BuyPremiumChatSubscription', variables);
    }
    async mutateSetTyping(variables: Types.SetTypingVariables): Promise<Types.SetTyping> {
        return this.client.mutate('SetTyping', variables);
    }
    async mutateUnsetTyping(variables: Types.UnsetTypingVariables): Promise<Types.UnsetTyping> {
        return this.client.mutate('UnsetTyping', variables);
    }
    async mutateRoomAddMembers(variables: Types.RoomAddMembersVariables): Promise<Types.RoomAddMembers> {
        return this.client.mutate('RoomAddMembers', variables);
    }
    async mutateRoomKick(variables: Types.RoomKickVariables): Promise<Types.RoomKick> {
        return this.client.mutate('RoomKick', variables);
    }
    async mutateRoomChangeRole(variables: Types.RoomChangeRoleVariables): Promise<Types.RoomChangeRole> {
        return this.client.mutate('RoomChangeRole', variables);
    }
    async mutateRoomLeave(variables: Types.RoomLeaveVariables): Promise<Types.RoomLeave> {
        return this.client.mutate('RoomLeave', variables);
    }
    async mutateRoomAlterFeatured(variables: Types.RoomAlterFeaturedVariables): Promise<Types.RoomAlterFeatured> {
        return this.client.mutate('RoomAlterFeatured', variables);
    }
    async mutateRoomAlterHidden(variables: Types.RoomAlterHiddenVariables): Promise<Types.RoomAlterHidden> {
        return this.client.mutate('RoomAlterHidden', variables);
    }
    async mutateRoomSettingsUpdate(variables: Types.RoomSettingsUpdateVariables): Promise<Types.RoomSettingsUpdate> {
        return this.client.mutate('RoomSettingsUpdate', variables);
    }
    async mutateRoomJoin(variables: Types.RoomJoinVariables): Promise<Types.RoomJoin> {
        return this.client.mutate('RoomJoin', variables);
    }
    async mutateRoomsJoin(variables: Types.RoomsJoinVariables): Promise<Types.RoomsJoin> {
        return this.client.mutate('RoomsJoin', variables);
    }
    async mutateRoomsInviteUser(variables: Types.RoomsInviteUserVariables): Promise<Types.RoomsInviteUser> {
        return this.client.mutate('RoomsInviteUser', variables);
    }
    async mutateRoomJoinInviteLink(variables: Types.RoomJoinInviteLinkVariables): Promise<Types.RoomJoinInviteLink> {
        return this.client.mutate('RoomJoinInviteLink', variables);
    }
    async mutateRoomRenewInviteLink(variables: Types.RoomRenewInviteLinkVariables): Promise<Types.RoomRenewInviteLink> {
        return this.client.mutate('RoomRenewInviteLink', variables);
    }
    async mutateRoomUpdate(variables: Types.RoomUpdateVariables): Promise<Types.RoomUpdate> {
        return this.client.mutate('RoomUpdate', variables);
    }
    async mutateRoomDeleteMessage(variables: Types.RoomDeleteMessageVariables): Promise<Types.RoomDeleteMessage> {
        return this.client.mutate('RoomDeleteMessage', variables);
    }
    async mutateRoomDeleteMessages(variables: Types.RoomDeleteMessagesVariables): Promise<Types.RoomDeleteMessages> {
        return this.client.mutate('RoomDeleteMessages', variables);
    }
    async mutateRoomDeleteUrlAugmentation(variables: Types.RoomDeleteUrlAugmentationVariables): Promise<Types.RoomDeleteUrlAugmentation> {
        return this.client.mutate('RoomDeleteUrlAugmentation', variables);
    }
    async mutateEditMessage(variables: Types.EditMessageVariables): Promise<Types.EditMessage> {
        return this.client.mutate('EditMessage', variables);
    }
    async mutateMarkSequenceRead(variables: Types.MarkSequenceReadVariables): Promise<Types.MarkSequenceRead> {
        return this.client.mutate('MarkSequenceRead', variables);
    }
    async mutateUpdateWelcomeMessage(variables: Types.UpdateWelcomeMessageVariables): Promise<Types.UpdateWelcomeMessage> {
        return this.client.mutate('UpdateWelcomeMessage', variables);
    }
    async mutateDeleteComment(variables: Types.DeleteCommentVariables): Promise<Types.DeleteComment> {
        return this.client.mutate('DeleteComment', variables);
    }
    async mutateCommentSetReaction(variables: Types.CommentSetReactionVariables): Promise<Types.CommentSetReaction> {
        return this.client.mutate('CommentSetReaction', variables);
    }
    async mutateCommentUnsetReaction(variables: Types.CommentUnsetReactionVariables): Promise<Types.CommentUnsetReaction> {
        return this.client.mutate('CommentUnsetReaction', variables);
    }
    async mutateDeleteNotification(variables: Types.DeleteNotificationVariables): Promise<Types.DeleteNotification> {
        return this.client.mutate('DeleteNotification', variables);
    }
    async mutateSubscribeToComments(variables: Types.SubscribeToCommentsVariables): Promise<Types.SubscribeToComments> {
        return this.client.mutate('SubscribeToComments', variables);
    }
    async mutateUnSubscribeFromComments(variables: Types.UnSubscribeFromCommentsVariables): Promise<Types.UnSubscribeFromComments> {
        return this.client.mutate('UnSubscribeFromComments', variables);
    }
    async mutateAddComment(variables: Types.AddCommentVariables): Promise<Types.AddComment> {
        return this.client.mutate('AddComment', variables);
    }
    async mutateEditComment(variables: Types.EditCommentVariables): Promise<Types.EditComment> {
        return this.client.mutate('EditComment', variables);
    }
    async mutateConferenceJoin(variables: Types.ConferenceJoinVariables): Promise<Types.ConferenceJoin> {
        return this.client.mutate('ConferenceJoin', variables);
    }
    async mutateConferenceLeave(variables: Types.ConferenceLeaveVariables): Promise<Types.ConferenceLeave> {
        return this.client.mutate('ConferenceLeave', variables);
    }
    async mutateConferenceKeepAlive(variables: Types.ConferenceKeepAliveVariables): Promise<Types.ConferenceKeepAlive> {
        return this.client.mutate('ConferenceKeepAlive', variables);
    }
    async mutateConferenceOffer(variables: Types.ConferenceOfferVariables): Promise<Types.ConferenceOffer> {
        return this.client.mutate('ConferenceOffer', variables);
    }
    async mutateConferenceAnswer(variables: Types.ConferenceAnswerVariables): Promise<Types.ConferenceAnswer> {
        return this.client.mutate('ConferenceAnswer', variables);
    }
    async mutateConferenceCandidate(variables: Types.ConferenceCandidateVariables): Promise<Types.ConferenceCandidate> {
        return this.client.mutate('ConferenceCandidate', variables);
    }
    async mutateMediaOffer(variables: Types.MediaOfferVariables): Promise<Types.MediaOffer> {
        return this.client.mutate('MediaOffer', variables);
    }
    async mutateMediaNegotiationNeeded(variables: Types.MediaNegotiationNeededVariables): Promise<Types.MediaNegotiationNeeded> {
        return this.client.mutate('MediaNegotiationNeeded', variables);
    }
    async mutateMediaFailed(variables: Types.MediaFailedVariables): Promise<Types.MediaFailed> {
        return this.client.mutate('MediaFailed', variables);
    }
    async mutateMediaAnswer(variables: Types.MediaAnswerVariables): Promise<Types.MediaAnswer> {
        return this.client.mutate('MediaAnswer', variables);
    }
    async mutateMediaCandidate(variables: Types.MediaCandidateVariables): Promise<Types.MediaCandidate> {
        return this.client.mutate('MediaCandidate', variables);
    }
    async mutateBetaSubmitNextDiscover(variables: Types.BetaSubmitNextDiscoverVariables): Promise<Types.BetaSubmitNextDiscover> {
        return this.client.mutate('BetaSubmitNextDiscover', variables);
    }
    async mutateBetaDiscoverSkip(variables: Types.BetaDiscoverSkipVariables): Promise<Types.BetaDiscoverSkip> {
        return this.client.mutate('BetaDiscoverSkip', variables);
    }
    async mutateFeatureFlagAdd(variables: Types.FeatureFlagAddVariables): Promise<Types.FeatureFlagAdd> {
        return this.client.mutate('FeatureFlagAdd', variables);
    }
    async mutateFeatureFlagEnable(variables: Types.FeatureFlagEnableVariables): Promise<Types.FeatureFlagEnable> {
        return this.client.mutate('FeatureFlagEnable', variables);
    }
    async mutateFeatureFlagDisable(variables: Types.FeatureFlagDisableVariables): Promise<Types.FeatureFlagDisable> {
        return this.client.mutate('FeatureFlagDisable', variables);
    }
    async mutateFeedChannelCreate(variables: Types.FeedChannelCreateVariables): Promise<Types.FeedChannelCreate> {
        return this.client.mutate('FeedChannelCreate', variables);
    }
    async mutateFeedChannelUpdate(variables: Types.FeedChannelUpdateVariables): Promise<Types.FeedChannelUpdate> {
        return this.client.mutate('FeedChannelUpdate', variables);
    }
    async mutateFeedChannelSubscribe(variables: Types.FeedChannelSubscribeVariables): Promise<Types.FeedChannelSubscribe> {
        return this.client.mutate('FeedChannelSubscribe', variables);
    }
    async mutateFeedChannelUnsubscribe(variables: Types.FeedChannelUnsubscribeVariables): Promise<Types.FeedChannelUnsubscribe> {
        return this.client.mutate('FeedChannelUnsubscribe', variables);
    }
    async mutateFeedChannelAddWriter(variables: Types.FeedChannelAddWriterVariables): Promise<Types.FeedChannelAddWriter> {
        return this.client.mutate('FeedChannelAddWriter', variables);
    }
    async mutateFeedChannelRemoveWriter(variables: Types.FeedChannelRemoveWriterVariables): Promise<Types.FeedChannelRemoveWriter> {
        return this.client.mutate('FeedChannelRemoveWriter', variables);
    }
    async mutateFeedEditPost(variables: Types.FeedEditPostVariables): Promise<Types.FeedEditPost> {
        return this.client.mutate('FeedEditPost', variables);
    }
    async mutateFeedCreatePost(variables: Types.FeedCreatePostVariables): Promise<Types.FeedCreatePost> {
        return this.client.mutate('FeedCreatePost', variables);
    }
    async mutateFeedReactionAdd(variables: Types.FeedReactionAddVariables): Promise<Types.FeedReactionAdd> {
        return this.client.mutate('FeedReactionAdd', variables);
    }
    async mutateFeedReactionRemove(variables: Types.FeedReactionRemoveVariables): Promise<Types.FeedReactionRemove> {
        return this.client.mutate('FeedReactionRemove', variables);
    }
    async mutateFeedDeletePost(variables: Types.FeedDeletePostVariables): Promise<Types.FeedDeletePost> {
        return this.client.mutate('FeedDeletePost', variables);
    }
    async mutateCreateCardSetupIntent(variables: Types.CreateCardSetupIntentVariables): Promise<Types.CreateCardSetupIntent> {
        return this.client.mutate('CreateCardSetupIntent', variables);
    }
    async mutateCommitCardSetupIntent(variables: Types.CommitCardSetupIntentVariables): Promise<Types.CommitCardSetupIntent> {
        return this.client.mutate('CommitCardSetupIntent', variables);
    }
    async mutateRemoveCard(variables: Types.RemoveCardVariables): Promise<Types.RemoveCard> {
        return this.client.mutate('RemoveCard', variables);
    }
    async mutateMakeCardDefault(variables: Types.MakeCardDefaultVariables): Promise<Types.MakeCardDefault> {
        return this.client.mutate('MakeCardDefault', variables);
    }
    async mutateCreateDepositIntent(variables: Types.CreateDepositIntentVariables): Promise<Types.CreateDepositIntent> {
        return this.client.mutate('CreateDepositIntent', variables);
    }
    async mutatePaymentIntentCommit(variables: Types.PaymentIntentCommitVariables): Promise<Types.PaymentIntentCommit> {
        return this.client.mutate('PaymentIntentCommit', variables);
    }
    async mutatePaymentIntentCancel(variables: Types.PaymentIntentCancelVariables): Promise<Types.PaymentIntentCancel> {
        return this.client.mutate('PaymentIntentCancel', variables);
    }
    async mutateDonate(variables: Types.DonateVariables): Promise<Types.Donate> {
        return this.client.mutate('Donate', variables);
    }
    async mutateMatchmakingRoomSave(variables: Types.MatchmakingRoomSaveVariables): Promise<Types.MatchmakingRoomSave> {
        return this.client.mutate('MatchmakingRoomSave', variables);
    }
    async mutateMatchmakingProfileFill(variables: Types.MatchmakingProfileFillVariables): Promise<Types.MatchmakingProfileFill> {
        return this.client.mutate('MatchmakingProfileFill', variables);
    }
    async mutateMatchmakingConnect(variables: Types.MatchmakingConnectVariables): Promise<Types.MatchmakingConnect> {
        return this.client.mutate('MatchmakingConnect', variables);
    }
    async mutateMyNotificationCenterMarkSeqRead(variables: Types.MyNotificationCenterMarkSeqReadVariables): Promise<Types.MyNotificationCenterMarkSeqRead> {
        return this.client.mutate('MyNotificationCenterMarkSeqRead', variables);
    }
    async mutateReadNotification(variables: Types.ReadNotificationVariables): Promise<Types.ReadNotification> {
        return this.client.mutate('ReadNotification', variables);
    }
    async mutateUpdateOrganization(variables: Types.UpdateOrganizationVariables): Promise<Types.UpdateOrganization> {
        return this.client.mutate('UpdateOrganization', variables);
    }
    async mutateOrganizationChangeMemberRole(variables: Types.OrganizationChangeMemberRoleVariables): Promise<Types.OrganizationChangeMemberRole> {
        return this.client.mutate('OrganizationChangeMemberRole', variables);
    }
    async mutateOrganizationAddMember(variables: Types.OrganizationAddMemberVariables): Promise<Types.OrganizationAddMember> {
        return this.client.mutate('OrganizationAddMember', variables);
    }
    async mutateOrganizationCreatePublicInvite(variables: Types.OrganizationCreatePublicInviteVariables): Promise<Types.OrganizationCreatePublicInvite> {
        return this.client.mutate('OrganizationCreatePublicInvite', variables);
    }
    async mutateDeleteOrganization(variables: Types.DeleteOrganizationVariables): Promise<Types.DeleteOrganization> {
        return this.client.mutate('DeleteOrganization', variables);
    }
    async mutateOrganizationMemberRemove(variables: Types.OrganizationMemberRemoveVariables): Promise<Types.OrganizationMemberRemove> {
        return this.client.mutate('OrganizationMemberRemove', variables);
    }
    async mutateOrganizationActivateByInvite(variables: Types.OrganizationActivateByInviteVariables): Promise<Types.OrganizationActivateByInvite> {
        return this.client.mutate('OrganizationActivateByInvite', variables);
    }
    async mutateOrganizationAlterPublished(variables: Types.OrganizationAlterPublishedVariables): Promise<Types.OrganizationAlterPublished> {
        return this.client.mutate('OrganizationAlterPublished', variables);
    }
    async mutateDebugMails(variables: Types.DebugMailsVariables): Promise<Types.DebugMails> {
        return this.client.mutate('DebugMails', variables);
    }
    async mutateSuperAccountRename(variables: Types.SuperAccountRenameVariables): Promise<Types.SuperAccountRename> {
        return this.client.mutate('SuperAccountRename', variables);
    }
    async mutateSuperAccountActivate(variables: Types.SuperAccountActivateVariables): Promise<Types.SuperAccountActivate> {
        return this.client.mutate('SuperAccountActivate', variables);
    }
    async mutateSuperAccountSuspend(variables: Types.SuperAccountSuspendVariables): Promise<Types.SuperAccountSuspend> {
        return this.client.mutate('SuperAccountSuspend', variables);
    }
    async mutateSuperAccountPend(variables: Types.SuperAccountPendVariables): Promise<Types.SuperAccountPend> {
        return this.client.mutate('SuperAccountPend', variables);
    }
    async mutateSuperAccountAdd(variables: Types.SuperAccountAddVariables): Promise<Types.SuperAccountAdd> {
        return this.client.mutate('SuperAccountAdd', variables);
    }
    async mutateSuperAccountMemberAdd(variables: Types.SuperAccountMemberAddVariables): Promise<Types.SuperAccountMemberAdd> {
        return this.client.mutate('SuperAccountMemberAdd', variables);
    }
    async mutateSuperAccountMemberRemove(variables: Types.SuperAccountMemberRemoveVariables): Promise<Types.SuperAccountMemberRemove> {
        return this.client.mutate('SuperAccountMemberRemove', variables);
    }
    async mutateSuperAdminAdd(variables: Types.SuperAdminAddVariables): Promise<Types.SuperAdminAdd> {
        return this.client.mutate('SuperAdminAdd', variables);
    }
    async mutateSuperAdminRemove(variables: Types.SuperAdminRemoveVariables): Promise<Types.SuperAdminRemove> {
        return this.client.mutate('SuperAdminRemove', variables);
    }
    async mutateReportContent(variables: Types.ReportContentVariables): Promise<Types.ReportContent> {
        return this.client.mutate('ReportContent', variables);
    }
    async mutateProfileUpdate(variables: Types.ProfileUpdateVariables): Promise<Types.ProfileUpdate> {
        return this.client.mutate('ProfileUpdate', variables);
    }
    async mutateProfileCreate(variables: Types.ProfileCreateVariables): Promise<Types.ProfileCreate> {
        return this.client.mutate('ProfileCreate', variables);
    }
    async mutateSettingsUpdate(variables: Types.SettingsUpdateVariables): Promise<Types.SettingsUpdate> {
        return this.client.mutate('SettingsUpdate', variables);
    }
    async mutateSetOrgShortname(variables: Types.SetOrgShortnameVariables): Promise<Types.SetOrgShortname> {
        return this.client.mutate('SetOrgShortname', variables);
    }
    async mutateSetUserShortname(variables: Types.SetUserShortnameVariables): Promise<Types.SetUserShortname> {
        return this.client.mutate('SetUserShortname', variables);
    }
    async mutateSetFeedChannelShortname(variables: Types.SetFeedChannelShortnameVariables): Promise<Types.SetFeedChannelShortname> {
        return this.client.mutate('SetFeedChannelShortname', variables);
    }
    async mutateStickerPackAddToCollection(variables: Types.StickerPackAddToCollectionVariables): Promise<Types.StickerPackAddToCollection> {
        return this.client.mutate('StickerPackAddToCollection', variables);
    }
    async mutateStickerPackRemoveFromCollection(variables: Types.StickerPackRemoveFromCollectionVariables): Promise<Types.StickerPackRemoveFromCollection> {
        return this.client.mutate('StickerPackRemoveFromCollection', variables);
    }
    async mutateSendSticker(variables: Types.SendStickerVariables): Promise<Types.SendSticker> {
        return this.client.mutate('SendSticker', variables);
    }
    async mutateAddStickerComment(variables: Types.AddStickerCommentVariables): Promise<Types.AddStickerComment> {
        return this.client.mutate('AddStickerComment', variables);
    }
    async mutatePersistEvents(variables: Types.PersistEventsVariables): Promise<Types.PersistEvents> {
        return this.client.mutate('PersistEvents', variables);
    }
    async mutateDeleteUser(variables: Types.DeleteUserVariables): Promise<Types.DeleteUser> {
        return this.client.mutate('DeleteUser', variables);
    }
    async mutateBetaNextDiscoverReset(): Promise<Types.BetaNextDiscoverReset> {
        return this.client.mutate('BetaNextDiscoverReset');
    }
    subscribeSettingsWatch(): GraphqlActiveSubscription<Types.SettingsWatch, {}> {
        return this.client.subscribe('SettingsWatch');
    }
    subscribeChatWatch(variables: Types.ChatWatchVariables): GraphqlActiveSubscription<Types.ChatWatch, Types.ChatWatchVariables> {
        return this.client.subscribe('ChatWatch', variables);
    }
    subscribeDialogsWatch(variables: Types.DialogsWatchVariables): GraphqlActiveSubscription<Types.DialogsWatch, Types.DialogsWatchVariables> {
        return this.client.subscribe('DialogsWatch', variables);
    }
    subscribeTypingsWatch(): GraphqlActiveSubscription<Types.TypingsWatch, {}> {
        return this.client.subscribe('TypingsWatch');
    }
    subscribeChatOnlinesCountWatch(variables: Types.ChatOnlinesCountWatchVariables): GraphqlActiveSubscription<Types.ChatOnlinesCountWatch, Types.ChatOnlinesCountWatchVariables> {
        return this.client.subscribe('ChatOnlinesCountWatch', variables);
    }
    subscribeCommentWatch(variables: Types.CommentWatchVariables): GraphqlActiveSubscription<Types.CommentWatch, Types.CommentWatchVariables> {
        return this.client.subscribe('CommentWatch', variables);
    }
    subscribeConferenceMediaWatch(variables: Types.ConferenceMediaWatchVariables): GraphqlActiveSubscription<Types.ConferenceMediaWatch, Types.ConferenceMediaWatchVariables> {
        return this.client.subscribe('ConferenceMediaWatch', variables);
    }
    subscribeConferenceWatch(variables: Types.ConferenceWatchVariables): GraphqlActiveSubscription<Types.ConferenceWatch, Types.ConferenceWatchVariables> {
        return this.client.subscribe('ConferenceWatch', variables);
    }
    subscribeFeedUpdates(variables: Types.FeedUpdatesVariables): GraphqlActiveSubscription<Types.FeedUpdates, Types.FeedUpdatesVariables> {
        return this.client.subscribe('FeedUpdates', variables);
    }
    subscribeWalletUpdates(variables: Types.WalletUpdatesVariables): GraphqlActiveSubscription<Types.WalletUpdates, Types.WalletUpdatesVariables> {
        return this.client.subscribe('WalletUpdates', variables);
    }
    subscribeMyNotificationsCenter(variables: Types.MyNotificationsCenterVariables): GraphqlActiveSubscription<Types.MyNotificationsCenter, Types.MyNotificationsCenterVariables> {
        return this.client.subscribe('MyNotificationsCenter', variables);
    }
    subscribeDebugEventsWatch(variables: Types.DebugEventsWatchVariables): GraphqlActiveSubscription<Types.DebugEventsWatch, Types.DebugEventsWatchVariables> {
        return this.client.subscribe('DebugEventsWatch', variables);
    }
    subscribeOnlineWatch(variables: Types.OnlineWatchVariables): GraphqlActiveSubscription<Types.OnlineWatch, Types.OnlineWatchVariables> {
        return this.client.subscribe('OnlineWatch', variables);
    }
}
