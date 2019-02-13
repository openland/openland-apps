import * as Source from './index';
import * as Types from './Types'
import { GraphqlClient } from 'openland-graphql/GraphqlClient'
export class OpenlandClient {
    readonly client: GraphqlClient;
    constructor(client: GraphqlClient) {
        this.client = client;
    }
    async queryAccount(): Promise<Types.Account> {
        return this.client.query(Source.AccountQuery);
    }
    async refetchAccount(): Promise<Types.Account> {
        return this.client.refetch(Source.AccountQuery);
    }
    useAccount(): Types.Account {
        return this.client.useQuery(Source.AccountQuery);
    }
    useWithoutLoaderAccount(): Types.Account | null {
        return this.client.useWithoutLoaderQuery(Source.AccountQuery);
    }
    async queryAccountSettings(): Promise<Types.AccountSettings> {
        return this.client.query(Source.AccountSettingsQuery);
    }
    async refetchAccountSettings(): Promise<Types.AccountSettings> {
        return this.client.refetch(Source.AccountSettingsQuery);
    }
    useAccountSettings(): Types.AccountSettings {
        return this.client.useQuery(Source.AccountSettingsQuery);
    }
    useWithoutLoaderAccountSettings(): Types.AccountSettings | null {
        return this.client.useWithoutLoaderQuery(Source.AccountSettingsQuery);
    }
    async queryAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Promise<Types.AccountInviteInfo> {
        return this.client.query(Source.AccountInviteInfoQuery, variables);
    }
    async refetchAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Promise<Types.AccountInviteInfo> {
        return this.client.refetch(Source.AccountInviteInfoQuery, variables);
    }
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Types.AccountInviteInfo {
        return this.client.useQuery(Source.AccountInviteInfoQuery, variables);
    }
    useWithoutLoaderAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Types.AccountInviteInfo | null {
        return this.client.useWithoutLoaderQuery(Source.AccountInviteInfoQuery, variables);
    }
    async queryAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Promise<Types.AccountAppInviteInfo> {
        return this.client.query(Source.AccountAppInviteInfoQuery, variables);
    }
    async refetchAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Promise<Types.AccountAppInviteInfo> {
        return this.client.refetch(Source.AccountAppInviteInfoQuery, variables);
    }
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Types.AccountAppInviteInfo {
        return this.client.useQuery(Source.AccountAppInviteInfoQuery, variables);
    }
    useWithoutLoaderAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Types.AccountAppInviteInfo | null {
        return this.client.useWithoutLoaderQuery(Source.AccountAppInviteInfoQuery, variables);
    }
    async queryAccountAppInvite(): Promise<Types.AccountAppInvite> {
        return this.client.query(Source.AccountAppInviteQuery);
    }
    async refetchAccountAppInvite(): Promise<Types.AccountAppInvite> {
        return this.client.refetch(Source.AccountAppInviteQuery);
    }
    useAccountAppInvite(): Types.AccountAppInvite {
        return this.client.useQuery(Source.AccountAppInviteQuery);
    }
    useWithoutLoaderAccountAppInvite(): Types.AccountAppInvite | null {
        return this.client.useWithoutLoaderQuery(Source.AccountAppInviteQuery);
    }
    async queryAccountInvites(): Promise<Types.AccountInvites> {
        return this.client.query(Source.AccountInvitesQuery);
    }
    async refetchAccountInvites(): Promise<Types.AccountInvites> {
        return this.client.refetch(Source.AccountInvitesQuery);
    }
    useAccountInvites(): Types.AccountInvites {
        return this.client.useQuery(Source.AccountInvitesQuery);
    }
    useWithoutLoaderAccountInvites(): Types.AccountInvites | null {
        return this.client.useWithoutLoaderQuery(Source.AccountInvitesQuery);
    }
    async queryAccountInvitesHistory(): Promise<Types.AccountInvitesHistory> {
        return this.client.query(Source.AccountInvitesHistoryQuery);
    }
    async refetchAccountInvitesHistory(): Promise<Types.AccountInvitesHistory> {
        return this.client.refetch(Source.AccountInvitesHistoryQuery);
    }
    useAccountInvitesHistory(): Types.AccountInvitesHistory {
        return this.client.useQuery(Source.AccountInvitesHistoryQuery);
    }
    useWithoutLoaderAccountInvitesHistory(): Types.AccountInvitesHistory | null {
        return this.client.useWithoutLoaderQuery(Source.AccountInvitesHistoryQuery);
    }
    async queryProfilePrefill(): Promise<Types.ProfilePrefill> {
        return this.client.query(Source.ProfilePrefillQuery);
    }
    async refetchProfilePrefill(): Promise<Types.ProfilePrefill> {
        return this.client.refetch(Source.ProfilePrefillQuery);
    }
    useProfilePrefill(): Types.ProfilePrefill {
        return this.client.useQuery(Source.ProfilePrefillQuery);
    }
    useWithoutLoaderProfilePrefill(): Types.ProfilePrefill | null {
        return this.client.useWithoutLoaderQuery(Source.ProfilePrefillQuery);
    }
    async queryMyApps(): Promise<Types.MyApps> {
        return this.client.query(Source.MyAppsQuery);
    }
    async refetchMyApps(): Promise<Types.MyApps> {
        return this.client.refetch(Source.MyAppsQuery);
    }
    useMyApps(): Types.MyApps {
        return this.client.useQuery(Source.MyAppsQuery);
    }
    useWithoutLoaderMyApps(): Types.MyApps | null {
        return this.client.useWithoutLoaderQuery(Source.MyAppsQuery);
    }
    async queryDialogs(variables: Types.DialogsVariables): Promise<Types.Dialogs> {
        return this.client.query(Source.DialogsQuery, variables);
    }
    async refetchDialogs(variables: Types.DialogsVariables): Promise<Types.Dialogs> {
        return this.client.refetch(Source.DialogsQuery, variables);
    }
    useDialogs(variables: Types.DialogsVariables): Types.Dialogs {
        return this.client.useQuery(Source.DialogsQuery, variables);
    }
    useWithoutLoaderDialogs(variables: Types.DialogsVariables): Types.Dialogs | null {
        return this.client.useWithoutLoaderQuery(Source.DialogsQuery, variables);
    }
    async queryRoom(variables: Types.RoomVariables): Promise<Types.Room> {
        return this.client.query(Source.RoomQuery, variables);
    }
    async refetchRoom(variables: Types.RoomVariables): Promise<Types.Room> {
        return this.client.refetch(Source.RoomQuery, variables);
    }
    useRoom(variables: Types.RoomVariables): Types.Room {
        return this.client.useQuery(Source.RoomQuery, variables);
    }
    useWithoutLoaderRoom(variables: Types.RoomVariables): Types.Room | null {
        return this.client.useWithoutLoaderQuery(Source.RoomQuery, variables);
    }
    async queryRoomTiny(variables: Types.RoomTinyVariables): Promise<Types.RoomTiny> {
        return this.client.query(Source.RoomTinyQuery, variables);
    }
    async refetchRoomTiny(variables: Types.RoomTinyVariables): Promise<Types.RoomTiny> {
        return this.client.refetch(Source.RoomTinyQuery, variables);
    }
    useRoomTiny(variables: Types.RoomTinyVariables): Types.RoomTiny {
        return this.client.useQuery(Source.RoomTinyQuery, variables);
    }
    useWithoutLoaderRoomTiny(variables: Types.RoomTinyVariables): Types.RoomTiny | null {
        return this.client.useWithoutLoaderQuery(Source.RoomTinyQuery, variables);
    }
    async queryRoomSuper(variables: Types.RoomSuperVariables): Promise<Types.RoomSuper> {
        return this.client.query(Source.RoomSuperQuery, variables);
    }
    async refetchRoomSuper(variables: Types.RoomSuperVariables): Promise<Types.RoomSuper> {
        return this.client.refetch(Source.RoomSuperQuery, variables);
    }
    useRoomSuper(variables: Types.RoomSuperVariables): Types.RoomSuper {
        return this.client.useQuery(Source.RoomSuperQuery, variables);
    }
    useWithoutLoaderRoomSuper(variables: Types.RoomSuperVariables): Types.RoomSuper | null {
        return this.client.useWithoutLoaderQuery(Source.RoomSuperQuery, variables);
    }
    async queryGetDraftMessage(variables: Types.GetDraftMessageVariables): Promise<Types.GetDraftMessage> {
        return this.client.query(Source.GetDraftMessageQuery, variables);
    }
    async refetchGetDraftMessage(variables: Types.GetDraftMessageVariables): Promise<Types.GetDraftMessage> {
        return this.client.refetch(Source.GetDraftMessageQuery, variables);
    }
    useGetDraftMessage(variables: Types.GetDraftMessageVariables): Types.GetDraftMessage {
        return this.client.useQuery(Source.GetDraftMessageQuery, variables);
    }
    useWithoutLoaderGetDraftMessage(variables: Types.GetDraftMessageVariables): Types.GetDraftMessage | null {
        return this.client.useWithoutLoaderQuery(Source.GetDraftMessageQuery, variables);
    }
    async queryGlobalCounter(): Promise<Types.GlobalCounter> {
        return this.client.query(Source.GlobalCounterQuery);
    }
    async refetchGlobalCounter(): Promise<Types.GlobalCounter> {
        return this.client.refetch(Source.GlobalCounterQuery);
    }
    useGlobalCounter(): Types.GlobalCounter {
        return this.client.useQuery(Source.GlobalCounterQuery);
    }
    useWithoutLoaderGlobalCounter(): Types.GlobalCounter | null {
        return this.client.useWithoutLoaderQuery(Source.GlobalCounterQuery);
    }
    async queryRoomHistory(variables: Types.RoomHistoryVariables): Promise<Types.RoomHistory> {
        return this.client.query(Source.RoomHistoryQuery, variables);
    }
    async refetchRoomHistory(variables: Types.RoomHistoryVariables): Promise<Types.RoomHistory> {
        return this.client.refetch(Source.RoomHistoryQuery, variables);
    }
    useRoomHistory(variables: Types.RoomHistoryVariables): Types.RoomHistory {
        return this.client.useQuery(Source.RoomHistoryQuery, variables);
    }
    useWithoutLoaderRoomHistory(variables: Types.RoomHistoryVariables): Types.RoomHistory | null {
        return this.client.useWithoutLoaderQuery(Source.RoomHistoryQuery, variables);
    }
    async queryChatSearchGroup(variables: Types.ChatSearchGroupVariables): Promise<Types.ChatSearchGroup> {
        return this.client.query(Source.ChatSearchGroupQuery, variables);
    }
    async refetchChatSearchGroup(variables: Types.ChatSearchGroupVariables): Promise<Types.ChatSearchGroup> {
        return this.client.refetch(Source.ChatSearchGroupQuery, variables);
    }
    useChatSearchGroup(variables: Types.ChatSearchGroupVariables): Types.ChatSearchGroup {
        return this.client.useQuery(Source.ChatSearchGroupQuery, variables);
    }
    useWithoutLoaderChatSearchGroup(variables: Types.ChatSearchGroupVariables): Types.ChatSearchGroup | null {
        return this.client.useWithoutLoaderQuery(Source.ChatSearchGroupQuery, variables);
    }
    async queryRoomSearchText(variables: Types.RoomSearchTextVariables): Promise<Types.RoomSearchText> {
        return this.client.query(Source.RoomSearchTextQuery, variables);
    }
    async refetchRoomSearchText(variables: Types.RoomSearchTextVariables): Promise<Types.RoomSearchText> {
        return this.client.refetch(Source.RoomSearchTextQuery, variables);
    }
    useRoomSearchText(variables: Types.RoomSearchTextVariables): Types.RoomSearchText {
        return this.client.useQuery(Source.RoomSearchTextQuery, variables);
    }
    useWithoutLoaderRoomSearchText(variables: Types.RoomSearchTextVariables): Types.RoomSearchText | null {
        return this.client.useWithoutLoaderQuery(Source.RoomSearchTextQuery, variables);
    }
    async queryRoomSearch(variables: Types.RoomSearchVariables): Promise<Types.RoomSearch> {
        return this.client.query(Source.RoomSearchQuery, variables);
    }
    async refetchRoomSearch(variables: Types.RoomSearchVariables): Promise<Types.RoomSearch> {
        return this.client.refetch(Source.RoomSearchQuery, variables);
    }
    useRoomSearch(variables: Types.RoomSearchVariables): Types.RoomSearch {
        return this.client.useQuery(Source.RoomSearchQuery, variables);
    }
    useWithoutLoaderRoomSearch(variables: Types.RoomSearchVariables): Types.RoomSearch | null {
        return this.client.useWithoutLoaderQuery(Source.RoomSearchQuery, variables);
    }
    async queryRoomMembers(variables: Types.RoomMembersVariables): Promise<Types.RoomMembers> {
        return this.client.query(Source.RoomMembersQuery, variables);
    }
    async refetchRoomMembers(variables: Types.RoomMembersVariables): Promise<Types.RoomMembers> {
        return this.client.refetch(Source.RoomMembersQuery, variables);
    }
    useRoomMembers(variables: Types.RoomMembersVariables): Types.RoomMembers {
        return this.client.useQuery(Source.RoomMembersQuery, variables);
    }
    useWithoutLoaderRoomMembers(variables: Types.RoomMembersVariables): Types.RoomMembers | null {
        return this.client.useWithoutLoaderQuery(Source.RoomMembersQuery, variables);
    }
    async queryRoomInviteLink(variables: Types.RoomInviteLinkVariables): Promise<Types.RoomInviteLink> {
        return this.client.query(Source.RoomInviteLinkQuery, variables);
    }
    async refetchRoomInviteLink(variables: Types.RoomInviteLinkVariables): Promise<Types.RoomInviteLink> {
        return this.client.refetch(Source.RoomInviteLinkQuery, variables);
    }
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables): Types.RoomInviteLink {
        return this.client.useQuery(Source.RoomInviteLinkQuery, variables);
    }
    useWithoutLoaderRoomInviteLink(variables: Types.RoomInviteLinkVariables): Types.RoomInviteLink | null {
        return this.client.useWithoutLoaderQuery(Source.RoomInviteLinkQuery, variables);
    }
    async queryRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Promise<Types.RoomInviteInfo> {
        return this.client.query(Source.RoomInviteInfoQuery, variables);
    }
    async refetchRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Promise<Types.RoomInviteInfo> {
        return this.client.refetch(Source.RoomInviteInfoQuery, variables);
    }
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Types.RoomInviteInfo {
        return this.client.useQuery(Source.RoomInviteInfoQuery, variables);
    }
    useWithoutLoaderRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Types.RoomInviteInfo | null {
        return this.client.useWithoutLoaderQuery(Source.RoomInviteInfoQuery, variables);
    }
    async queryConference(variables: Types.ConferenceVariables): Promise<Types.Conference> {
        return this.client.query(Source.ConferenceQuery, variables);
    }
    async refetchConference(variables: Types.ConferenceVariables): Promise<Types.Conference> {
        return this.client.refetch(Source.ConferenceQuery, variables);
    }
    useConference(variables: Types.ConferenceVariables): Types.Conference {
        return this.client.useQuery(Source.ConferenceQuery, variables);
    }
    useWithoutLoaderConference(variables: Types.ConferenceVariables): Types.Conference | null {
        return this.client.useWithoutLoaderQuery(Source.ConferenceQuery, variables);
    }
    async queryAvailableRooms(): Promise<Types.AvailableRooms> {
        return this.client.query(Source.AvailableRoomsQuery);
    }
    async refetchAvailableRooms(): Promise<Types.AvailableRooms> {
        return this.client.refetch(Source.AvailableRoomsQuery);
    }
    useAvailableRooms(): Types.AvailableRooms {
        return this.client.useQuery(Source.AvailableRoomsQuery);
    }
    useWithoutLoaderAvailableRooms(): Types.AvailableRooms | null {
        return this.client.useWithoutLoaderQuery(Source.AvailableRoomsQuery);
    }
    async queryGlobalSearch(variables: Types.GlobalSearchVariables): Promise<Types.GlobalSearch> {
        return this.client.query(Source.GlobalSearchQuery, variables);
    }
    async refetchGlobalSearch(variables: Types.GlobalSearchVariables): Promise<Types.GlobalSearch> {
        return this.client.refetch(Source.GlobalSearchQuery, variables);
    }
    useGlobalSearch(variables: Types.GlobalSearchVariables): Types.GlobalSearch {
        return this.client.useQuery(Source.GlobalSearchQuery, variables);
    }
    useWithoutLoaderGlobalSearch(variables: Types.GlobalSearchVariables): Types.GlobalSearch | null {
        return this.client.useWithoutLoaderQuery(Source.GlobalSearchQuery, variables);
    }
    async queryFeatureFlags(): Promise<Types.FeatureFlags> {
        return this.client.query(Source.FeatureFlagsQuery);
    }
    async refetchFeatureFlags(): Promise<Types.FeatureFlags> {
        return this.client.refetch(Source.FeatureFlagsQuery);
    }
    useFeatureFlags(): Types.FeatureFlags {
        return this.client.useQuery(Source.FeatureFlagsQuery);
    }
    useWithoutLoaderFeatureFlags(): Types.FeatureFlags | null {
        return this.client.useWithoutLoaderQuery(Source.FeatureFlagsQuery);
    }
    async queryFeedHome(): Promise<Types.FeedHome> {
        return this.client.query(Source.FeedHomeQuery);
    }
    async refetchFeedHome(): Promise<Types.FeedHome> {
        return this.client.refetch(Source.FeedHomeQuery);
    }
    useFeedHome(): Types.FeedHome {
        return this.client.useQuery(Source.FeedHomeQuery);
    }
    useWithoutLoaderFeedHome(): Types.FeedHome | null {
        return this.client.useWithoutLoaderQuery(Source.FeedHomeQuery);
    }
    async queryMyOrganizations(): Promise<Types.MyOrganizations> {
        return this.client.query(Source.MyOrganizationsQuery);
    }
    async refetchMyOrganizations(): Promise<Types.MyOrganizations> {
        return this.client.refetch(Source.MyOrganizationsQuery);
    }
    useMyOrganizations(): Types.MyOrganizations {
        return this.client.useQuery(Source.MyOrganizationsQuery);
    }
    useWithoutLoaderMyOrganizations(): Types.MyOrganizations | null {
        return this.client.useWithoutLoaderQuery(Source.MyOrganizationsQuery);
    }
    async queryOrganization(variables: Types.OrganizationVariables): Promise<Types.Organization> {
        return this.client.query(Source.OrganizationQuery, variables);
    }
    async refetchOrganization(variables: Types.OrganizationVariables): Promise<Types.Organization> {
        return this.client.refetch(Source.OrganizationQuery, variables);
    }
    useOrganization(variables: Types.OrganizationVariables): Types.Organization {
        return this.client.useQuery(Source.OrganizationQuery, variables);
    }
    useWithoutLoaderOrganization(variables: Types.OrganizationVariables): Types.Organization | null {
        return this.client.useWithoutLoaderQuery(Source.OrganizationQuery, variables);
    }
    async queryOrganizationProfile(variables: Types.OrganizationProfileVariables): Promise<Types.OrganizationProfile> {
        return this.client.query(Source.OrganizationProfileQuery, variables);
    }
    async refetchOrganizationProfile(variables: Types.OrganizationProfileVariables): Promise<Types.OrganizationProfile> {
        return this.client.refetch(Source.OrganizationProfileQuery, variables);
    }
    useOrganizationProfile(variables: Types.OrganizationProfileVariables): Types.OrganizationProfile {
        return this.client.useQuery(Source.OrganizationProfileQuery, variables);
    }
    useWithoutLoaderOrganizationProfile(variables: Types.OrganizationProfileVariables): Types.OrganizationProfile | null {
        return this.client.useWithoutLoaderQuery(Source.OrganizationProfileQuery, variables);
    }
    async queryExploreOrganizations(variables: Types.ExploreOrganizationsVariables): Promise<Types.ExploreOrganizations> {
        return this.client.query(Source.ExploreOrganizationsQuery, variables);
    }
    async refetchExploreOrganizations(variables: Types.ExploreOrganizationsVariables): Promise<Types.ExploreOrganizations> {
        return this.client.refetch(Source.ExploreOrganizationsQuery, variables);
    }
    useExploreOrganizations(variables: Types.ExploreOrganizationsVariables): Types.ExploreOrganizations {
        return this.client.useQuery(Source.ExploreOrganizationsQuery, variables);
    }
    useWithoutLoaderExploreOrganizations(variables: Types.ExploreOrganizationsVariables): Types.ExploreOrganizations | null {
        return this.client.useWithoutLoaderQuery(Source.ExploreOrganizationsQuery, variables);
    }
    async queryExploreComunity(variables: Types.ExploreComunityVariables): Promise<Types.ExploreComunity> {
        return this.client.query(Source.ExploreComunityQuery, variables);
    }
    async refetchExploreComunity(variables: Types.ExploreComunityVariables): Promise<Types.ExploreComunity> {
        return this.client.refetch(Source.ExploreComunityQuery, variables);
    }
    useExploreComunity(variables: Types.ExploreComunityVariables): Types.ExploreComunity {
        return this.client.useQuery(Source.ExploreComunityQuery, variables);
    }
    useWithoutLoaderExploreComunity(variables: Types.ExploreComunityVariables): Types.ExploreComunity | null {
        return this.client.useWithoutLoaderQuery(Source.ExploreComunityQuery, variables);
    }
    async queryOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Promise<Types.OrganizationPublicInvite> {
        return this.client.query(Source.OrganizationPublicInviteQuery, variables);
    }
    async refetchOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Promise<Types.OrganizationPublicInvite> {
        return this.client.refetch(Source.OrganizationPublicInviteQuery, variables);
    }
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Types.OrganizationPublicInvite {
        return this.client.useQuery(Source.OrganizationPublicInviteQuery, variables);
    }
    useWithoutLoaderOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Types.OrganizationPublicInvite | null {
        return this.client.useWithoutLoaderQuery(Source.OrganizationPublicInviteQuery, variables);
    }
    async queryOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Promise<Types.OrganizationByPrefix> {
        return this.client.query(Source.OrganizationByPrefixQuery, variables);
    }
    async refetchOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Promise<Types.OrganizationByPrefix> {
        return this.client.refetch(Source.OrganizationByPrefixQuery, variables);
    }
    useOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Types.OrganizationByPrefix {
        return this.client.useQuery(Source.OrganizationByPrefixQuery, variables);
    }
    useWithoutLoaderOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Types.OrganizationByPrefix | null {
        return this.client.useWithoutLoaderQuery(Source.OrganizationByPrefixQuery, variables);
    }
    async queryPermissions(): Promise<Types.Permissions> {
        return this.client.query(Source.PermissionsQuery);
    }
    async refetchPermissions(): Promise<Types.Permissions> {
        return this.client.refetch(Source.PermissionsQuery);
    }
    usePermissions(): Types.Permissions {
        return this.client.useQuery(Source.PermissionsQuery);
    }
    useWithoutLoaderPermissions(): Types.Permissions | null {
        return this.client.useWithoutLoaderQuery(Source.PermissionsQuery);
    }
    async querySuperAdmins(): Promise<Types.SuperAdmins> {
        return this.client.query(Source.SuperAdminsQuery);
    }
    async refetchSuperAdmins(): Promise<Types.SuperAdmins> {
        return this.client.refetch(Source.SuperAdminsQuery);
    }
    useSuperAdmins(): Types.SuperAdmins {
        return this.client.useQuery(Source.SuperAdminsQuery);
    }
    useWithoutLoaderSuperAdmins(): Types.SuperAdmins | null {
        return this.client.useWithoutLoaderQuery(Source.SuperAdminsQuery);
    }
    async querySuperAccounts(): Promise<Types.SuperAccounts> {
        return this.client.query(Source.SuperAccountsQuery);
    }
    async refetchSuperAccounts(): Promise<Types.SuperAccounts> {
        return this.client.refetch(Source.SuperAccountsQuery);
    }
    useSuperAccounts(): Types.SuperAccounts {
        return this.client.useQuery(Source.SuperAccountsQuery);
    }
    useWithoutLoaderSuperAccounts(): Types.SuperAccounts | null {
        return this.client.useWithoutLoaderQuery(Source.SuperAccountsQuery);
    }
    async querySuperAccount(variables: Types.SuperAccountVariables): Promise<Types.SuperAccount> {
        return this.client.query(Source.SuperAccountQuery, variables);
    }
    async refetchSuperAccount(variables: Types.SuperAccountVariables): Promise<Types.SuperAccount> {
        return this.client.refetch(Source.SuperAccountQuery, variables);
    }
    useSuperAccount(variables: Types.SuperAccountVariables): Types.SuperAccount {
        return this.client.useQuery(Source.SuperAccountQuery, variables);
    }
    useWithoutLoaderSuperAccount(variables: Types.SuperAccountVariables): Types.SuperAccount | null {
        return this.client.useWithoutLoaderQuery(Source.SuperAccountQuery, variables);
    }
    async queryProfile(): Promise<Types.Profile> {
        return this.client.query(Source.ProfileQuery);
    }
    async refetchProfile(): Promise<Types.Profile> {
        return this.client.refetch(Source.ProfileQuery);
    }
    useProfile(): Types.Profile {
        return this.client.useQuery(Source.ProfileQuery);
    }
    useWithoutLoaderProfile(): Types.Profile | null {
        return this.client.useWithoutLoaderQuery(Source.ProfileQuery);
    }
    async querySettings(): Promise<Types.Settings> {
        return this.client.query(Source.SettingsQuery);
    }
    async refetchSettings(): Promise<Types.Settings> {
        return this.client.refetch(Source.SettingsQuery);
    }
    useSettings(): Types.Settings {
        return this.client.useQuery(Source.SettingsQuery);
    }
    useWithoutLoaderSettings(): Types.Settings | null {
        return this.client.useWithoutLoaderQuery(Source.SettingsQuery);
    }
    async queryUsers(variables: Types.UsersVariables): Promise<Types.Users> {
        return this.client.query(Source.UsersQuery, variables);
    }
    async refetchUsers(variables: Types.UsersVariables): Promise<Types.Users> {
        return this.client.refetch(Source.UsersQuery, variables);
    }
    useUsers(variables: Types.UsersVariables): Types.Users {
        return this.client.useQuery(Source.UsersQuery, variables);
    }
    useWithoutLoaderUsers(variables: Types.UsersVariables): Types.Users | null {
        return this.client.useWithoutLoaderQuery(Source.UsersQuery, variables);
    }
    async queryUser(variables: Types.UserVariables): Promise<Types.User> {
        return this.client.query(Source.UserQuery, variables);
    }
    async refetchUser(variables: Types.UserVariables): Promise<Types.User> {
        return this.client.refetch(Source.UserQuery, variables);
    }
    useUser(variables: Types.UserVariables): Types.User {
        return this.client.useQuery(Source.UserQuery, variables);
    }
    useWithoutLoaderUser(variables: Types.UserVariables): Types.User | null {
        return this.client.useWithoutLoaderQuery(Source.UserQuery, variables);
    }
    async queryOnline(variables: Types.OnlineVariables): Promise<Types.Online> {
        return this.client.query(Source.OnlineQuery, variables);
    }
    async refetchOnline(variables: Types.OnlineVariables): Promise<Types.Online> {
        return this.client.refetch(Source.OnlineQuery, variables);
    }
    useOnline(variables: Types.OnlineVariables): Types.Online {
        return this.client.useQuery(Source.OnlineQuery, variables);
    }
    useWithoutLoaderOnline(variables: Types.OnlineVariables): Types.Online | null {
        return this.client.useWithoutLoaderQuery(Source.OnlineQuery, variables);
    }
    async queryExplorePeople(variables: Types.ExplorePeopleVariables): Promise<Types.ExplorePeople> {
        return this.client.query(Source.ExplorePeopleQuery, variables);
    }
    async refetchExplorePeople(variables: Types.ExplorePeopleVariables): Promise<Types.ExplorePeople> {
        return this.client.refetch(Source.ExplorePeopleQuery, variables);
    }
    useExplorePeople(variables: Types.ExplorePeopleVariables): Types.ExplorePeople {
        return this.client.useQuery(Source.ExplorePeopleQuery, variables);
    }
    useWithoutLoaderExplorePeople(variables: Types.ExplorePeopleVariables): Types.ExplorePeople | null {
        return this.client.useWithoutLoaderQuery(Source.ExplorePeopleQuery, variables);
    }
    async queryResolveShortName(variables: Types.ResolveShortNameVariables): Promise<Types.ResolveShortName> {
        return this.client.query(Source.ResolveShortNameQuery, variables);
    }
    async refetchResolveShortName(variables: Types.ResolveShortNameVariables): Promise<Types.ResolveShortName> {
        return this.client.refetch(Source.ResolveShortNameQuery, variables);
    }
    useResolveShortName(variables: Types.ResolveShortNameVariables): Types.ResolveShortName {
        return this.client.useQuery(Source.ResolveShortNameQuery, variables);
    }
    useWithoutLoaderResolveShortName(variables: Types.ResolveShortNameVariables): Types.ResolveShortName | null {
        return this.client.useWithoutLoaderQuery(Source.ResolveShortNameQuery, variables);
    }
    async mutateCreateOrganization(variables: Types.CreateOrganizationVariables): Promise<Types.CreateOrganization> {
        return this.client.mutate(Source.CreateOrganizationMutation, variables);
    }
    async mutateAccountInviteJoin(variables: Types.AccountInviteJoinVariables): Promise<Types.AccountInviteJoin> {
        return this.client.mutate(Source.AccountInviteJoinMutation, variables);
    }
    async mutateAccountCreateInvite(): Promise<Types.AccountCreateInvite> {
        return this.client.mutate(Source.AccountCreateInviteMutation);
    }
    async mutateAccountDestroyInvite(variables: Types.AccountDestroyInviteVariables): Promise<Types.AccountDestroyInvite> {
        return this.client.mutate(Source.AccountDestroyInviteMutation, variables);
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
    async mutateMessageSetReaction(variables: Types.MessageSetReactionVariables): Promise<Types.MessageSetReaction> {
        return this.client.mutate(Source.MessageSetReactionMutation, variables);
    }
    async mutateSwitchReaction(variables: Types.SwitchReactionVariables): Promise<Types.SwitchReaction> {
        return this.client.mutate(Source.SwitchReactionMutation, variables);
    }
    async mutateMessageUnsetReaction(variables: Types.MessageUnsetReactionVariables): Promise<Types.MessageUnsetReaction> {
        return this.client.mutate(Source.MessageUnsetReactionMutation, variables);
    }
    async mutateSendPostMessage(variables: Types.SendPostMessageVariables): Promise<Types.SendPostMessage> {
        return this.client.mutate(Source.SendPostMessageMutation, variables);
    }
    async mutateEditPostMessage(variables: Types.EditPostMessageVariables): Promise<Types.EditPostMessage> {
        return this.client.mutate(Source.EditPostMessageMutation, variables);
    }
    async mutateRespondPostMessage(variables: Types.RespondPostMessageVariables): Promise<Types.RespondPostMessage> {
        return this.client.mutate(Source.RespondPostMessageMutation, variables);
    }
    async mutateSaveDraftMessage(variables: Types.SaveDraftMessageVariables): Promise<Types.SaveDraftMessage> {
        return this.client.mutate(Source.SaveDraftMessageMutation, variables);
    }
    async mutateSendMessage(variables: Types.SendMessageVariables): Promise<Types.SendMessage> {
        return this.client.mutate(Source.SendMessageMutation, variables);
    }
    async mutateReplyMessage(variables: Types.ReplyMessageVariables): Promise<Types.ReplyMessage> {
        return this.client.mutate(Source.ReplyMessageMutation, variables);
    }
    async mutateRoomRead(variables: Types.RoomReadVariables): Promise<Types.RoomRead> {
        return this.client.mutate(Source.RoomReadMutation, variables);
    }
    async mutateRoomCreate(variables: Types.RoomCreateVariables): Promise<Types.RoomCreate> {
        return this.client.mutate(Source.RoomCreateMutation, variables);
    }
    async mutateRoomCreateIntro(variables: Types.RoomCreateIntroVariables): Promise<Types.RoomCreateIntro> {
        return this.client.mutate(Source.RoomCreateIntroMutation, variables);
    }
    async mutateRoomEditIntro(variables: Types.RoomEditIntroVariables): Promise<Types.RoomEditIntro> {
        return this.client.mutate(Source.RoomEditIntroMutation, variables);
    }
    async mutateSetTyping(variables: Types.SetTypingVariables): Promise<Types.SetTyping> {
        return this.client.mutate(Source.SetTypingMutation, variables);
    }
    async mutateCancelTyping(variables: Types.CancelTypingVariables): Promise<Types.CancelTyping> {
        return this.client.mutate(Source.CancelTypingMutation, variables);
    }
    async mutateRoomAddMember(variables: Types.RoomAddMemberVariables): Promise<Types.RoomAddMember> {
        return this.client.mutate(Source.RoomAddMemberMutation, variables);
    }
    async mutateRoomDeclineJoinReuest(variables: Types.RoomDeclineJoinReuestVariables): Promise<Types.RoomDeclineJoinReuest> {
        return this.client.mutate(Source.RoomDeclineJoinReuestMutation, variables);
    }
    async mutateRoomAddMembers(variables: Types.RoomAddMembersVariables): Promise<Types.RoomAddMembers> {
        return this.client.mutate(Source.RoomAddMembersMutation, variables);
    }
    async mutateRoomKick(variables: Types.RoomKickVariables): Promise<Types.RoomKick> {
        return this.client.mutate(Source.RoomKickMutation, variables);
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
    async mutateRoomSendEmailInvite(variables: Types.RoomSendEmailInviteVariables): Promise<Types.RoomSendEmailInvite> {
        return this.client.mutate(Source.RoomSendEmailInviteMutation, variables);
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
    async mutateRoomEditMessage(variables: Types.RoomEditMessageVariables): Promise<Types.RoomEditMessage> {
        return this.client.mutate(Source.RoomEditMessageMutation, variables);
    }
    async mutateMarkSequenceRead(variables: Types.MarkSequenceReadVariables): Promise<Types.MarkSequenceRead> {
        return this.client.mutate(Source.MarkSequenceReadMutation, variables);
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
    async mutateFeatureFlagAdd(variables: Types.FeatureFlagAddVariables): Promise<Types.FeatureFlagAdd> {
        return this.client.mutate(Source.FeatureFlagAddMutation, variables);
    }
    async mutateFeatureFlagEnable(variables: Types.FeatureFlagEnableVariables): Promise<Types.FeatureFlagEnable> {
        return this.client.mutate(Source.FeatureFlagEnableMutation, variables);
    }
    async mutateFeatureFlagDisable(variables: Types.FeatureFlagDisableVariables): Promise<Types.FeatureFlagDisable> {
        return this.client.mutate(Source.FeatureFlagDisableMutation, variables);
    }
    async mutateFeedPost(variables: Types.FeedPostVariables): Promise<Types.FeedPost> {
        return this.client.mutate(Source.FeedPostMutation, variables);
    }
    async mutateUpdateOrganization(variables: Types.UpdateOrganizationVariables): Promise<Types.UpdateOrganization> {
        return this.client.mutate(Source.UpdateOrganizationMutation, variables);
    }
    async mutateSetOrgShortname(variables: Types.SetOrgShortnameVariables): Promise<Types.SetOrgShortname> {
        return this.client.mutate(Source.SetOrgShortnameMutation, variables);
    }
    async mutateOrganizationChangeMemberRole(variables: Types.OrganizationChangeMemberRoleVariables): Promise<Types.OrganizationChangeMemberRole> {
        return this.client.mutate(Source.OrganizationChangeMemberRoleMutation, variables);
    }
    async mutateOrganizationAddMember(variables: Types.OrganizationAddMemberVariables): Promise<Types.OrganizationAddMember> {
        return this.client.mutate(Source.OrganizationAddMemberMutation, variables);
    }
    async mutateOrganizationRemoveMember(variables: Types.OrganizationRemoveMemberVariables): Promise<Types.OrganizationRemoveMember> {
        return this.client.mutate(Source.OrganizationRemoveMemberMutation, variables);
    }
    async mutateOrganizationInviteMembers(variables: Types.OrganizationInviteMembersVariables): Promise<Types.OrganizationInviteMembers> {
        return this.client.mutate(Source.OrganizationInviteMembersMutation, variables);
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
    async mutateProfileUpdate(variables: Types.ProfileUpdateVariables): Promise<Types.ProfileUpdate> {
        return this.client.mutate(Source.ProfileUpdateMutation, variables);
    }
    async mutateSetUserShortname(variables: Types.SetUserShortnameVariables): Promise<Types.SetUserShortname> {
        return this.client.mutate(Source.SetUserShortnameMutation, variables);
    }
    async mutateProfileCreate(variables: Types.ProfileCreateVariables): Promise<Types.ProfileCreate> {
        return this.client.mutate(Source.ProfileCreateMutation, variables);
    }
    async mutateSettingsUpdate(variables: Types.SettingsUpdateVariables): Promise<Types.SettingsUpdate> {
        return this.client.mutate(Source.SettingsUpdateMutation, variables);
    }
    async mutatePersistEvents(variables: Types.PersistEventsVariables): Promise<Types.PersistEvents> {
        return this.client.mutate(Source.PersistEventsMutation, variables);
    }
}
