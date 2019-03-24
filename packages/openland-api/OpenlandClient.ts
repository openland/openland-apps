import * as Source from './index';
import * as Types from './Types'
import { GraphqlClient, GraphqlActiveSubscription, OperationParameters } from 'openland-graphql/GraphqlClient'
import { BaseApiClient } from 'openland-graphql/BaseApiClient'
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
    useAccount(): Types.Account {
        return this.useQuerySuspense(Source.AccountQuery);
    }
    useWithoutLoaderAccount(): Types.Account | null {
        return this.useQuery(Source.AccountQuery);
    }
    async queryAccountSettings(opts?: OperationParameters): Promise<Types.AccountSettings> {
        return this.client.query(Source.AccountSettingsQuery, undefined, opts);
    }
    async refetchAccountSettings(): Promise<Types.AccountSettings> {
        return this.refetch(Source.AccountSettingsQuery);
    }
    useAccountSettings(): Types.AccountSettings {
        return this.useQuerySuspense(Source.AccountSettingsQuery);
    }
    useWithoutLoaderAccountSettings(): Types.AccountSettings | null {
        return this.useQuery(Source.AccountSettingsQuery);
    }
    async queryAccountInviteInfo(variables: Types.AccountInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountInviteInfo> {
        return this.client.query(Source.AccountInviteInfoQuery, variables, opts);
    }
    async refetchAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Promise<Types.AccountInviteInfo> {
        return this.refetch(Source.AccountInviteInfoQuery, variables);
    }
    useAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Types.AccountInviteInfo {
        return this.useQuerySuspense(Source.AccountInviteInfoQuery, variables);
    }
    useWithoutLoaderAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Types.AccountInviteInfo | null {
        return this.useQuery(Source.AccountInviteInfoQuery, variables);
    }
    async queryAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables, opts?: OperationParameters): Promise<Types.AccountAppInviteInfo> {
        return this.client.query(Source.AccountAppInviteInfoQuery, variables, opts);
    }
    async refetchAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Promise<Types.AccountAppInviteInfo> {
        return this.refetch(Source.AccountAppInviteInfoQuery, variables);
    }
    useAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Types.AccountAppInviteInfo {
        return this.useQuerySuspense(Source.AccountAppInviteInfoQuery, variables);
    }
    useWithoutLoaderAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Types.AccountAppInviteInfo | null {
        return this.useQuery(Source.AccountAppInviteInfoQuery, variables);
    }
    async queryAccountAppInvite(opts?: OperationParameters): Promise<Types.AccountAppInvite> {
        return this.client.query(Source.AccountAppInviteQuery, undefined, opts);
    }
    async refetchAccountAppInvite(): Promise<Types.AccountAppInvite> {
        return this.refetch(Source.AccountAppInviteQuery);
    }
    useAccountAppInvite(): Types.AccountAppInvite {
        return this.useQuerySuspense(Source.AccountAppInviteQuery);
    }
    useWithoutLoaderAccountAppInvite(): Types.AccountAppInvite | null {
        return this.useQuery(Source.AccountAppInviteQuery);
    }
    async queryAccountInvites(opts?: OperationParameters): Promise<Types.AccountInvites> {
        return this.client.query(Source.AccountInvitesQuery, undefined, opts);
    }
    async refetchAccountInvites(): Promise<Types.AccountInvites> {
        return this.refetch(Source.AccountInvitesQuery);
    }
    useAccountInvites(): Types.AccountInvites {
        return this.useQuerySuspense(Source.AccountInvitesQuery);
    }
    useWithoutLoaderAccountInvites(): Types.AccountInvites | null {
        return this.useQuery(Source.AccountInvitesQuery);
    }
    async queryAccountInvitesHistory(opts?: OperationParameters): Promise<Types.AccountInvitesHistory> {
        return this.client.query(Source.AccountInvitesHistoryQuery, undefined, opts);
    }
    async refetchAccountInvitesHistory(): Promise<Types.AccountInvitesHistory> {
        return this.refetch(Source.AccountInvitesHistoryQuery);
    }
    useAccountInvitesHistory(): Types.AccountInvitesHistory {
        return this.useQuerySuspense(Source.AccountInvitesHistoryQuery);
    }
    useWithoutLoaderAccountInvitesHistory(): Types.AccountInvitesHistory | null {
        return this.useQuery(Source.AccountInvitesHistoryQuery);
    }
    async queryProfilePrefill(opts?: OperationParameters): Promise<Types.ProfilePrefill> {
        return this.client.query(Source.ProfilePrefillQuery, undefined, opts);
    }
    async refetchProfilePrefill(): Promise<Types.ProfilePrefill> {
        return this.refetch(Source.ProfilePrefillQuery);
    }
    useProfilePrefill(): Types.ProfilePrefill {
        return this.useQuerySuspense(Source.ProfilePrefillQuery);
    }
    useWithoutLoaderProfilePrefill(): Types.ProfilePrefill | null {
        return this.useQuery(Source.ProfilePrefillQuery);
    }
    async queryFetchPushSettings(opts?: OperationParameters): Promise<Types.FetchPushSettings> {
        return this.client.query(Source.FetchPushSettingsQuery, undefined, opts);
    }
    async refetchFetchPushSettings(): Promise<Types.FetchPushSettings> {
        return this.refetch(Source.FetchPushSettingsQuery);
    }
    useFetchPushSettings(): Types.FetchPushSettings {
        return this.useQuerySuspense(Source.FetchPushSettingsQuery);
    }
    useWithoutLoaderFetchPushSettings(): Types.FetchPushSettings | null {
        return this.useQuery(Source.FetchPushSettingsQuery);
    }
    async queryMyApps(opts?: OperationParameters): Promise<Types.MyApps> {
        return this.client.query(Source.MyAppsQuery, undefined, opts);
    }
    async refetchMyApps(): Promise<Types.MyApps> {
        return this.refetch(Source.MyAppsQuery);
    }
    useMyApps(): Types.MyApps {
        return this.useQuerySuspense(Source.MyAppsQuery);
    }
    useWithoutLoaderMyApps(): Types.MyApps | null {
        return this.useQuery(Source.MyAppsQuery);
    }
    async queryDialogs(variables: Types.DialogsVariables, opts?: OperationParameters): Promise<Types.Dialogs> {
        return this.client.query(Source.DialogsQuery, variables, opts);
    }
    async refetchDialogs(variables: Types.DialogsVariables): Promise<Types.Dialogs> {
        return this.refetch(Source.DialogsQuery, variables);
    }
    useDialogs(variables: Types.DialogsVariables): Types.Dialogs {
        return this.useQuerySuspense(Source.DialogsQuery, variables);
    }
    useWithoutLoaderDialogs(variables: Types.DialogsVariables): Types.Dialogs | null {
        return this.useQuery(Source.DialogsQuery, variables);
    }
    async queryRoom(variables: Types.RoomVariables, opts?: OperationParameters): Promise<Types.Room> {
        return this.client.query(Source.RoomQuery, variables, opts);
    }
    async refetchRoom(variables: Types.RoomVariables): Promise<Types.Room> {
        return this.refetch(Source.RoomQuery, variables);
    }
    useRoom(variables: Types.RoomVariables): Types.Room {
        return this.useQuerySuspense(Source.RoomQuery, variables);
    }
    useWithoutLoaderRoom(variables: Types.RoomVariables): Types.Room | null {
        return this.useQuery(Source.RoomQuery, variables);
    }
    async queryRoomTiny(variables: Types.RoomTinyVariables, opts?: OperationParameters): Promise<Types.RoomTiny> {
        return this.client.query(Source.RoomTinyQuery, variables, opts);
    }
    async refetchRoomTiny(variables: Types.RoomTinyVariables): Promise<Types.RoomTiny> {
        return this.refetch(Source.RoomTinyQuery, variables);
    }
    useRoomTiny(variables: Types.RoomTinyVariables): Types.RoomTiny {
        return this.useQuerySuspense(Source.RoomTinyQuery, variables);
    }
    useWithoutLoaderRoomTiny(variables: Types.RoomTinyVariables): Types.RoomTiny | null {
        return this.useQuery(Source.RoomTinyQuery, variables);
    }
    async queryRoomSuper(variables: Types.RoomSuperVariables, opts?: OperationParameters): Promise<Types.RoomSuper> {
        return this.client.query(Source.RoomSuperQuery, variables, opts);
    }
    async refetchRoomSuper(variables: Types.RoomSuperVariables): Promise<Types.RoomSuper> {
        return this.refetch(Source.RoomSuperQuery, variables);
    }
    useRoomSuper(variables: Types.RoomSuperVariables): Types.RoomSuper {
        return this.useQuerySuspense(Source.RoomSuperQuery, variables);
    }
    useWithoutLoaderRoomSuper(variables: Types.RoomSuperVariables): Types.RoomSuper | null {
        return this.useQuery(Source.RoomSuperQuery, variables);
    }
    async queryGetDraftMessage(variables: Types.GetDraftMessageVariables, opts?: OperationParameters): Promise<Types.GetDraftMessage> {
        return this.client.query(Source.GetDraftMessageQuery, variables, opts);
    }
    async refetchGetDraftMessage(variables: Types.GetDraftMessageVariables): Promise<Types.GetDraftMessage> {
        return this.refetch(Source.GetDraftMessageQuery, variables);
    }
    useGetDraftMessage(variables: Types.GetDraftMessageVariables): Types.GetDraftMessage {
        return this.useQuerySuspense(Source.GetDraftMessageQuery, variables);
    }
    useWithoutLoaderGetDraftMessage(variables: Types.GetDraftMessageVariables): Types.GetDraftMessage | null {
        return this.useQuery(Source.GetDraftMessageQuery, variables);
    }
    async queryGlobalCounter(opts?: OperationParameters): Promise<Types.GlobalCounter> {
        return this.client.query(Source.GlobalCounterQuery, undefined, opts);
    }
    async refetchGlobalCounter(): Promise<Types.GlobalCounter> {
        return this.refetch(Source.GlobalCounterQuery);
    }
    useGlobalCounter(): Types.GlobalCounter {
        return this.useQuerySuspense(Source.GlobalCounterQuery);
    }
    useWithoutLoaderGlobalCounter(): Types.GlobalCounter | null {
        return this.useQuery(Source.GlobalCounterQuery);
    }
    async queryChatHistory(variables: Types.ChatHistoryVariables, opts?: OperationParameters): Promise<Types.ChatHistory> {
        return this.client.query(Source.ChatHistoryQuery, variables, opts);
    }
    async refetchChatHistory(variables: Types.ChatHistoryVariables): Promise<Types.ChatHistory> {
        return this.refetch(Source.ChatHistoryQuery, variables);
    }
    useChatHistory(variables: Types.ChatHistoryVariables): Types.ChatHistory {
        return this.useQuerySuspense(Source.ChatHistoryQuery, variables);
    }
    useWithoutLoaderChatHistory(variables: Types.ChatHistoryVariables): Types.ChatHistory | null {
        return this.useQuery(Source.ChatHistoryQuery, variables);
    }
    async queryChatSearchGroup(variables: Types.ChatSearchGroupVariables, opts?: OperationParameters): Promise<Types.ChatSearchGroup> {
        return this.client.query(Source.ChatSearchGroupQuery, variables, opts);
    }
    async refetchChatSearchGroup(variables: Types.ChatSearchGroupVariables): Promise<Types.ChatSearchGroup> {
        return this.refetch(Source.ChatSearchGroupQuery, variables);
    }
    useChatSearchGroup(variables: Types.ChatSearchGroupVariables): Types.ChatSearchGroup {
        return this.useQuerySuspense(Source.ChatSearchGroupQuery, variables);
    }
    useWithoutLoaderChatSearchGroup(variables: Types.ChatSearchGroupVariables): Types.ChatSearchGroup | null {
        return this.useQuery(Source.ChatSearchGroupQuery, variables);
    }
    async queryRoomSearchText(variables: Types.RoomSearchTextVariables, opts?: OperationParameters): Promise<Types.RoomSearchText> {
        return this.client.query(Source.RoomSearchTextQuery, variables, opts);
    }
    async refetchRoomSearchText(variables: Types.RoomSearchTextVariables): Promise<Types.RoomSearchText> {
        return this.refetch(Source.RoomSearchTextQuery, variables);
    }
    useRoomSearchText(variables: Types.RoomSearchTextVariables): Types.RoomSearchText {
        return this.useQuerySuspense(Source.RoomSearchTextQuery, variables);
    }
    useWithoutLoaderRoomSearchText(variables: Types.RoomSearchTextVariables): Types.RoomSearchText | null {
        return this.useQuery(Source.RoomSearchTextQuery, variables);
    }
    async queryRoomSearch(variables: Types.RoomSearchVariables, opts?: OperationParameters): Promise<Types.RoomSearch> {
        return this.client.query(Source.RoomSearchQuery, variables, opts);
    }
    async refetchRoomSearch(variables: Types.RoomSearchVariables): Promise<Types.RoomSearch> {
        return this.refetch(Source.RoomSearchQuery, variables);
    }
    useRoomSearch(variables: Types.RoomSearchVariables): Types.RoomSearch {
        return this.useQuerySuspense(Source.RoomSearchQuery, variables);
    }
    useWithoutLoaderRoomSearch(variables: Types.RoomSearchVariables): Types.RoomSearch | null {
        return this.useQuery(Source.RoomSearchQuery, variables);
    }
    async queryRoomMembersShort(variables: Types.RoomMembersShortVariables, opts?: OperationParameters): Promise<Types.RoomMembersShort> {
        return this.client.query(Source.RoomMembersShortQuery, variables, opts);
    }
    async refetchRoomMembersShort(variables: Types.RoomMembersShortVariables): Promise<Types.RoomMembersShort> {
        return this.refetch(Source.RoomMembersShortQuery, variables);
    }
    useRoomMembersShort(variables: Types.RoomMembersShortVariables): Types.RoomMembersShort {
        return this.useQuerySuspense(Source.RoomMembersShortQuery, variables);
    }
    useWithoutLoaderRoomMembersShort(variables: Types.RoomMembersShortVariables): Types.RoomMembersShort | null {
        return this.useQuery(Source.RoomMembersShortQuery, variables);
    }
    async queryRoomMembers(variables: Types.RoomMembersVariables, opts?: OperationParameters): Promise<Types.RoomMembers> {
        return this.client.query(Source.RoomMembersQuery, variables, opts);
    }
    async refetchRoomMembers(variables: Types.RoomMembersVariables): Promise<Types.RoomMembers> {
        return this.refetch(Source.RoomMembersQuery, variables);
    }
    useRoomMembers(variables: Types.RoomMembersVariables): Types.RoomMembers {
        return this.useQuerySuspense(Source.RoomMembersQuery, variables);
    }
    useWithoutLoaderRoomMembers(variables: Types.RoomMembersVariables): Types.RoomMembers | null {
        return this.useQuery(Source.RoomMembersQuery, variables);
    }
    async queryRoomInviteLink(variables: Types.RoomInviteLinkVariables, opts?: OperationParameters): Promise<Types.RoomInviteLink> {
        return this.client.query(Source.RoomInviteLinkQuery, variables, opts);
    }
    async refetchRoomInviteLink(variables: Types.RoomInviteLinkVariables): Promise<Types.RoomInviteLink> {
        return this.refetch(Source.RoomInviteLinkQuery, variables);
    }
    useRoomInviteLink(variables: Types.RoomInviteLinkVariables): Types.RoomInviteLink {
        return this.useQuerySuspense(Source.RoomInviteLinkQuery, variables);
    }
    useWithoutLoaderRoomInviteLink(variables: Types.RoomInviteLinkVariables): Types.RoomInviteLink | null {
        return this.useQuery(Source.RoomInviteLinkQuery, variables);
    }
    async queryRoomInviteInfo(variables: Types.RoomInviteInfoVariables, opts?: OperationParameters): Promise<Types.RoomInviteInfo> {
        return this.client.query(Source.RoomInviteInfoQuery, variables, opts);
    }
    async refetchRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Promise<Types.RoomInviteInfo> {
        return this.refetch(Source.RoomInviteInfoQuery, variables);
    }
    useRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Types.RoomInviteInfo {
        return this.useQuerySuspense(Source.RoomInviteInfoQuery, variables);
    }
    useWithoutLoaderRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Types.RoomInviteInfo | null {
        return this.useQuery(Source.RoomInviteInfoQuery, variables);
    }
    async queryConference(variables: Types.ConferenceVariables, opts?: OperationParameters): Promise<Types.Conference> {
        return this.client.query(Source.ConferenceQuery, variables, opts);
    }
    async refetchConference(variables: Types.ConferenceVariables): Promise<Types.Conference> {
        return this.refetch(Source.ConferenceQuery, variables);
    }
    useConference(variables: Types.ConferenceVariables): Types.Conference {
        return this.useQuerySuspense(Source.ConferenceQuery, variables);
    }
    useWithoutLoaderConference(variables: Types.ConferenceVariables): Types.Conference | null {
        return this.useQuery(Source.ConferenceQuery, variables);
    }
    async queryConferenceMedia(variables: Types.ConferenceMediaVariables, opts?: OperationParameters): Promise<Types.ConferenceMedia> {
        return this.client.query(Source.ConferenceMediaQuery, variables, opts);
    }
    async refetchConferenceMedia(variables: Types.ConferenceMediaVariables): Promise<Types.ConferenceMedia> {
        return this.refetch(Source.ConferenceMediaQuery, variables);
    }
    useConferenceMedia(variables: Types.ConferenceMediaVariables): Types.ConferenceMedia {
        return this.useQuerySuspense(Source.ConferenceMediaQuery, variables);
    }
    useWithoutLoaderConferenceMedia(variables: Types.ConferenceMediaVariables): Types.ConferenceMedia | null {
        return this.useQuery(Source.ConferenceMediaQuery, variables);
    }
    async queryAvailableRooms(opts?: OperationParameters): Promise<Types.AvailableRooms> {
        return this.client.query(Source.AvailableRoomsQuery, undefined, opts);
    }
    async refetchAvailableRooms(): Promise<Types.AvailableRooms> {
        return this.refetch(Source.AvailableRoomsQuery);
    }
    useAvailableRooms(): Types.AvailableRooms {
        return this.useQuerySuspense(Source.AvailableRoomsQuery);
    }
    useWithoutLoaderAvailableRooms(): Types.AvailableRooms | null {
        return this.useQuery(Source.AvailableRoomsQuery);
    }
    async queryGlobalSearch(variables: Types.GlobalSearchVariables, opts?: OperationParameters): Promise<Types.GlobalSearch> {
        return this.client.query(Source.GlobalSearchQuery, variables, opts);
    }
    async refetchGlobalSearch(variables: Types.GlobalSearchVariables): Promise<Types.GlobalSearch> {
        return this.refetch(Source.GlobalSearchQuery, variables);
    }
    useGlobalSearch(variables: Types.GlobalSearchVariables): Types.GlobalSearch {
        return this.useQuerySuspense(Source.GlobalSearchQuery, variables);
    }
    useWithoutLoaderGlobalSearch(variables: Types.GlobalSearchVariables): Types.GlobalSearch | null {
        return this.useQuery(Source.GlobalSearchQuery, variables);
    }
    async queryFeatureFlags(opts?: OperationParameters): Promise<Types.FeatureFlags> {
        return this.client.query(Source.FeatureFlagsQuery, undefined, opts);
    }
    async refetchFeatureFlags(): Promise<Types.FeatureFlags> {
        return this.refetch(Source.FeatureFlagsQuery);
    }
    useFeatureFlags(): Types.FeatureFlags {
        return this.useQuerySuspense(Source.FeatureFlagsQuery);
    }
    useWithoutLoaderFeatureFlags(): Types.FeatureFlags | null {
        return this.useQuery(Source.FeatureFlagsQuery);
    }
    async queryFeedHome(opts?: OperationParameters): Promise<Types.FeedHome> {
        return this.client.query(Source.FeedHomeQuery, undefined, opts);
    }
    async refetchFeedHome(): Promise<Types.FeedHome> {
        return this.refetch(Source.FeedHomeQuery);
    }
    useFeedHome(): Types.FeedHome {
        return this.useQuerySuspense(Source.FeedHomeQuery);
    }
    useWithoutLoaderFeedHome(): Types.FeedHome | null {
        return this.useQuery(Source.FeedHomeQuery);
    }
    async queryMyOrganizations(opts?: OperationParameters): Promise<Types.MyOrganizations> {
        return this.client.query(Source.MyOrganizationsQuery, undefined, opts);
    }
    async refetchMyOrganizations(): Promise<Types.MyOrganizations> {
        return this.refetch(Source.MyOrganizationsQuery);
    }
    useMyOrganizations(): Types.MyOrganizations {
        return this.useQuerySuspense(Source.MyOrganizationsQuery);
    }
    useWithoutLoaderMyOrganizations(): Types.MyOrganizations | null {
        return this.useQuery(Source.MyOrganizationsQuery);
    }
    async queryOrganization(variables: Types.OrganizationVariables, opts?: OperationParameters): Promise<Types.Organization> {
        return this.client.query(Source.OrganizationQuery, variables, opts);
    }
    async refetchOrganization(variables: Types.OrganizationVariables): Promise<Types.Organization> {
        return this.refetch(Source.OrganizationQuery, variables);
    }
    useOrganization(variables: Types.OrganizationVariables): Types.Organization {
        return this.useQuerySuspense(Source.OrganizationQuery, variables);
    }
    useWithoutLoaderOrganization(variables: Types.OrganizationVariables): Types.Organization | null {
        return this.useQuery(Source.OrganizationQuery, variables);
    }
    async queryOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables, opts?: OperationParameters): Promise<Types.OrganizationMembersShort> {
        return this.client.query(Source.OrganizationMembersShortQuery, variables, opts);
    }
    async refetchOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables): Promise<Types.OrganizationMembersShort> {
        return this.refetch(Source.OrganizationMembersShortQuery, variables);
    }
    useOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables): Types.OrganizationMembersShort {
        return this.useQuerySuspense(Source.OrganizationMembersShortQuery, variables);
    }
    useWithoutLoaderOrganizationMembersShort(variables: Types.OrganizationMembersShortVariables): Types.OrganizationMembersShort | null {
        return this.useQuery(Source.OrganizationMembersShortQuery, variables);
    }
    async queryOrganizationProfile(variables: Types.OrganizationProfileVariables, opts?: OperationParameters): Promise<Types.OrganizationProfile> {
        return this.client.query(Source.OrganizationProfileQuery, variables, opts);
    }
    async refetchOrganizationProfile(variables: Types.OrganizationProfileVariables): Promise<Types.OrganizationProfile> {
        return this.refetch(Source.OrganizationProfileQuery, variables);
    }
    useOrganizationProfile(variables: Types.OrganizationProfileVariables): Types.OrganizationProfile {
        return this.useQuerySuspense(Source.OrganizationProfileQuery, variables);
    }
    useWithoutLoaderOrganizationProfile(variables: Types.OrganizationProfileVariables): Types.OrganizationProfile | null {
        return this.useQuery(Source.OrganizationProfileQuery, variables);
    }
    async queryExploreOrganizations(variables: Types.ExploreOrganizationsVariables, opts?: OperationParameters): Promise<Types.ExploreOrganizations> {
        return this.client.query(Source.ExploreOrganizationsQuery, variables, opts);
    }
    async refetchExploreOrganizations(variables: Types.ExploreOrganizationsVariables): Promise<Types.ExploreOrganizations> {
        return this.refetch(Source.ExploreOrganizationsQuery, variables);
    }
    useExploreOrganizations(variables: Types.ExploreOrganizationsVariables): Types.ExploreOrganizations {
        return this.useQuerySuspense(Source.ExploreOrganizationsQuery, variables);
    }
    useWithoutLoaderExploreOrganizations(variables: Types.ExploreOrganizationsVariables): Types.ExploreOrganizations | null {
        return this.useQuery(Source.ExploreOrganizationsQuery, variables);
    }
    async queryExploreComunity(variables: Types.ExploreComunityVariables, opts?: OperationParameters): Promise<Types.ExploreComunity> {
        return this.client.query(Source.ExploreComunityQuery, variables, opts);
    }
    async refetchExploreComunity(variables: Types.ExploreComunityVariables): Promise<Types.ExploreComunity> {
        return this.refetch(Source.ExploreComunityQuery, variables);
    }
    useExploreComunity(variables: Types.ExploreComunityVariables): Types.ExploreComunity {
        return this.useQuerySuspense(Source.ExploreComunityQuery, variables);
    }
    useWithoutLoaderExploreComunity(variables: Types.ExploreComunityVariables): Types.ExploreComunity | null {
        return this.useQuery(Source.ExploreComunityQuery, variables);
    }
    async queryOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables, opts?: OperationParameters): Promise<Types.OrganizationPublicInvite> {
        return this.client.query(Source.OrganizationPublicInviteQuery, variables, opts);
    }
    async refetchOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Promise<Types.OrganizationPublicInvite> {
        return this.refetch(Source.OrganizationPublicInviteQuery, variables);
    }
    useOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Types.OrganizationPublicInvite {
        return this.useQuerySuspense(Source.OrganizationPublicInviteQuery, variables);
    }
    useWithoutLoaderOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Types.OrganizationPublicInvite | null {
        return this.useQuery(Source.OrganizationPublicInviteQuery, variables);
    }
    async queryOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables, opts?: OperationParameters): Promise<Types.OrganizationByPrefix> {
        return this.client.query(Source.OrganizationByPrefixQuery, variables, opts);
    }
    async refetchOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Promise<Types.OrganizationByPrefix> {
        return this.refetch(Source.OrganizationByPrefixQuery, variables);
    }
    useOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Types.OrganizationByPrefix {
        return this.useQuerySuspense(Source.OrganizationByPrefixQuery, variables);
    }
    useWithoutLoaderOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Types.OrganizationByPrefix | null {
        return this.useQuery(Source.OrganizationByPrefixQuery, variables);
    }
    async queryPermissions(opts?: OperationParameters): Promise<Types.Permissions> {
        return this.client.query(Source.PermissionsQuery, undefined, opts);
    }
    async refetchPermissions(): Promise<Types.Permissions> {
        return this.refetch(Source.PermissionsQuery);
    }
    usePermissions(): Types.Permissions {
        return this.useQuerySuspense(Source.PermissionsQuery);
    }
    useWithoutLoaderPermissions(): Types.Permissions | null {
        return this.useQuery(Source.PermissionsQuery);
    }
    async querySuperAdmins(opts?: OperationParameters): Promise<Types.SuperAdmins> {
        return this.client.query(Source.SuperAdminsQuery, undefined, opts);
    }
    async refetchSuperAdmins(): Promise<Types.SuperAdmins> {
        return this.refetch(Source.SuperAdminsQuery);
    }
    useSuperAdmins(): Types.SuperAdmins {
        return this.useQuerySuspense(Source.SuperAdminsQuery);
    }
    useWithoutLoaderSuperAdmins(): Types.SuperAdmins | null {
        return this.useQuery(Source.SuperAdminsQuery);
    }
    async querySuperAccounts(opts?: OperationParameters): Promise<Types.SuperAccounts> {
        return this.client.query(Source.SuperAccountsQuery, undefined, opts);
    }
    async refetchSuperAccounts(): Promise<Types.SuperAccounts> {
        return this.refetch(Source.SuperAccountsQuery);
    }
    useSuperAccounts(): Types.SuperAccounts {
        return this.useQuerySuspense(Source.SuperAccountsQuery);
    }
    useWithoutLoaderSuperAccounts(): Types.SuperAccounts | null {
        return this.useQuery(Source.SuperAccountsQuery);
    }
    async querySuperAccount(variables: Types.SuperAccountVariables, opts?: OperationParameters): Promise<Types.SuperAccount> {
        return this.client.query(Source.SuperAccountQuery, variables, opts);
    }
    async refetchSuperAccount(variables: Types.SuperAccountVariables): Promise<Types.SuperAccount> {
        return this.refetch(Source.SuperAccountQuery, variables);
    }
    useSuperAccount(variables: Types.SuperAccountVariables): Types.SuperAccount {
        return this.useQuerySuspense(Source.SuperAccountQuery, variables);
    }
    useWithoutLoaderSuperAccount(variables: Types.SuperAccountVariables): Types.SuperAccount | null {
        return this.useQuery(Source.SuperAccountQuery, variables);
    }
    async queryProfile(opts?: OperationParameters): Promise<Types.Profile> {
        return this.client.query(Source.ProfileQuery, undefined, opts);
    }
    async refetchProfile(): Promise<Types.Profile> {
        return this.refetch(Source.ProfileQuery);
    }
    useProfile(): Types.Profile {
        return this.useQuerySuspense(Source.ProfileQuery);
    }
    useWithoutLoaderProfile(): Types.Profile | null {
        return this.useQuery(Source.ProfileQuery);
    }
    async querySettings(opts?: OperationParameters): Promise<Types.Settings> {
        return this.client.query(Source.SettingsQuery, undefined, opts);
    }
    async refetchSettings(): Promise<Types.Settings> {
        return this.refetch(Source.SettingsQuery);
    }
    useSettings(): Types.Settings {
        return this.useQuerySuspense(Source.SettingsQuery);
    }
    useWithoutLoaderSettings(): Types.Settings | null {
        return this.useQuery(Source.SettingsQuery);
    }
    async queryUsers(variables: Types.UsersVariables, opts?: OperationParameters): Promise<Types.Users> {
        return this.client.query(Source.UsersQuery, variables, opts);
    }
    async refetchUsers(variables: Types.UsersVariables): Promise<Types.Users> {
        return this.refetch(Source.UsersQuery, variables);
    }
    useUsers(variables: Types.UsersVariables): Types.Users {
        return this.useQuerySuspense(Source.UsersQuery, variables);
    }
    useWithoutLoaderUsers(variables: Types.UsersVariables): Types.Users | null {
        return this.useQuery(Source.UsersQuery, variables);
    }
    async queryUser(variables: Types.UserVariables, opts?: OperationParameters): Promise<Types.User> {
        return this.client.query(Source.UserQuery, variables, opts);
    }
    async refetchUser(variables: Types.UserVariables): Promise<Types.User> {
        return this.refetch(Source.UserQuery, variables);
    }
    useUser(variables: Types.UserVariables): Types.User {
        return this.useQuerySuspense(Source.UserQuery, variables);
    }
    useWithoutLoaderUser(variables: Types.UserVariables): Types.User | null {
        return this.useQuery(Source.UserQuery, variables);
    }
    async queryOnline(variables: Types.OnlineVariables, opts?: OperationParameters): Promise<Types.Online> {
        return this.client.query(Source.OnlineQuery, variables, opts);
    }
    async refetchOnline(variables: Types.OnlineVariables): Promise<Types.Online> {
        return this.refetch(Source.OnlineQuery, variables);
    }
    useOnline(variables: Types.OnlineVariables): Types.Online {
        return this.useQuerySuspense(Source.OnlineQuery, variables);
    }
    useWithoutLoaderOnline(variables: Types.OnlineVariables): Types.Online | null {
        return this.useQuery(Source.OnlineQuery, variables);
    }
    async queryExplorePeople(variables: Types.ExplorePeopleVariables, opts?: OperationParameters): Promise<Types.ExplorePeople> {
        return this.client.query(Source.ExplorePeopleQuery, variables, opts);
    }
    async refetchExplorePeople(variables: Types.ExplorePeopleVariables): Promise<Types.ExplorePeople> {
        return this.refetch(Source.ExplorePeopleQuery, variables);
    }
    useExplorePeople(variables: Types.ExplorePeopleVariables): Types.ExplorePeople {
        return this.useQuerySuspense(Source.ExplorePeopleQuery, variables);
    }
    useWithoutLoaderExplorePeople(variables: Types.ExplorePeopleVariables): Types.ExplorePeople | null {
        return this.useQuery(Source.ExplorePeopleQuery, variables);
    }
    async queryResolveShortName(variables: Types.ResolveShortNameVariables, opts?: OperationParameters): Promise<Types.ResolveShortName> {
        return this.client.query(Source.ResolveShortNameQuery, variables, opts);
    }
    async refetchResolveShortName(variables: Types.ResolveShortNameVariables): Promise<Types.ResolveShortName> {
        return this.refetch(Source.ResolveShortNameQuery, variables);
    }
    useResolveShortName(variables: Types.ResolveShortNameVariables): Types.ResolveShortName {
        return this.useQuerySuspense(Source.ResolveShortNameQuery, variables);
    }
    useWithoutLoaderResolveShortName(variables: Types.ResolveShortNameVariables): Types.ResolveShortName | null {
        return this.useQuery(Source.ResolveShortNameQuery, variables);
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
    async mutatePinMessage(variables: Types.PinMessageVariables): Promise<Types.PinMessage> {
        return this.client.mutate(Source.PinMessageMutation, variables);
    }
    async mutateUnpinMessage(variables: Types.UnpinMessageVariables): Promise<Types.UnpinMessage> {
        return this.client.mutate(Source.UnpinMessageMutation, variables);
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
    async mutateUpdateWelcomeMessage(variables: Types.UpdateWelcomeMessageVariables): Promise<Types.UpdateWelcomeMessage> {
        return this.client.mutate(Source.UpdateWelcomeMessageMutation, variables);
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
    async mutateMediaAnswer(variables: Types.MediaAnswerVariables): Promise<Types.MediaAnswer> {
        return this.client.mutate(Source.MediaAnswerMutation, variables);
    }
    async mutateMediaCandidate(variables: Types.MediaCandidateVariables): Promise<Types.MediaCandidate> {
        return this.client.mutate(Source.MediaCandidateMutation, variables);
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
    subscribeConferenceMediaWatch(variables: Types.ConferenceMediaWatchVariables): GraphqlActiveSubscription<Types.ConferenceMediaWatch, Types.ConferenceMediaWatchVariables> {
        return this.client.subscribe(Source.ConferenceMediaWatchSubscription, variables);
    }
    subscribeConferenceWatch(variables: Types.ConferenceWatchVariables): GraphqlActiveSubscription<Types.ConferenceWatch, Types.ConferenceWatchVariables> {
        return this.client.subscribe(Source.ConferenceWatchSubscription, variables);
    }
    subscribeOnlineWatch(variables: Types.OnlineWatchVariables): GraphqlActiveSubscription<Types.OnlineWatch, Types.OnlineWatchVariables> {
        return this.client.subscribe(Source.OnlineWatchSubscription, variables);
    }
}
