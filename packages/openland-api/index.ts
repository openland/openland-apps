// WARNING! THIS IS AUTOGENERATED FILE. DO NOT EDIT!

import { typedQuery } from 'openland-y-graphql/typed';
import { typedMutation } from 'openland-y-graphql/typed';
import * as Types from './Types';
import * as Account from './queries/Account';
import * as Addressing from './queries/Addressing';
import * as Chats from './queries/Chats';
import * as Deals from './queries/Deals';
import * as Debug from './queries/Debug';
import * as FeatureFlag from './queries/FeatureFlag';
import * as Folder from './queries/Folder';
import * as Organization from './queries/Organization';
import * as Parcels from './queries/Parcels';
import * as Permissions from './queries/Permissions';
import * as Permits from './queries/Permits';
import * as Search from './queries/Search';
import * as Settings from './queries/Settings';
import * as Sourcing from './queries/Sourcing';
import * as SuperCity from './queries/SuperCity';
import * as User from './queries/User';

export const AccountQuery = typedQuery<Types.AccountQuery, {}>(Account.AccountQuery);
export const AccountSettingsQuery = typedQuery<Types.AccountSettingsQuery, {}>(Account.AccountSettingsQuery);
export const CreateOrganizationMutation = typedMutation<Types.CreateOrganizationMutation, Types.CreateOrganizationMutationVariables>(Account.CreateOrganizationMutation);
export const AccountInviteInfoQuery = typedQuery<Types.AccountInviteInfoQuery, Types.AccountInviteInfoQueryVariables>(Account.AccountInviteInfoQuery);
export const AccountInviteJoinMutation = typedMutation<Types.AccountInviteJoinMutation, Types.AccountInviteJoinMutationVariables>(Account.AccountInviteJoinMutation);
export const AccountInvitesQuery = typedQuery<Types.AccountInvitesQuery, {}>(Account.AccountInvitesQuery);
export const AccountInvitesHistoryQuery = typedQuery<Types.AccountInvitesHistoryQuery, {}>(Account.AccountInvitesHistoryQuery);
export const AccountCreateInviteMutation = typedMutation<Types.AccountCreateInviteMutation, {}>(Account.AccountCreateInviteMutation);
export const AccountDestroyInviteMutation = typedMutation<Types.AccountDestroyInviteMutation, Types.AccountDestroyInviteMutationVariables>(Account.AccountDestroyInviteMutation);
export const ProfilePrefillQuery = typedQuery<Types.ProfilePrefillQuery, {}>(Account.ProfilePrefillQuery);
export const CreateUserProfileAndOrganizationMutation = typedMutation<Types.CreateUserProfileAndOrganizationMutation, Types.CreateUserProfileAndOrganizationMutationVariables>(Account.CreateUserProfileAndOrganizationMutation);
export const StateQuery = typedQuery<Types.StateQuery, {}>(Addressing.StateQuery);
export const CountyQuery = typedQuery<Types.CountyQuery, Types.CountyQueryVariables>(Addressing.CountyQuery);
export const ChatListQuery = typedQuery<Types.ChatListQuery, Types.ChatListQueryVariables>(Chats.ChatListQuery);
export const GlobalCounterQuery = typedQuery<Types.GlobalCounterQuery, {}>(Chats.GlobalCounterQuery);
export const ChatHistoryQuery = typedQuery<Types.ChatHistoryQuery, Types.ChatHistoryQueryVariables>(Chats.ChatHistoryQuery);
export const ChatInfoQuery = typedQuery<Types.ChatInfoQuery, Types.ChatInfoQueryVariables>(Chats.ChatInfoQuery);
export const ChatFullInfoQuery = typedQuery<Types.ChatFullInfoQuery, Types.ChatFullInfoQueryVariables>(Chats.ChatFullInfoQuery);
export const GroupChatFullInfoQuery = typedQuery<Types.GroupChatFullInfoQuery, Types.GroupChatFullInfoQueryVariables>(Chats.GroupChatFullInfoQuery);
export const SendMessageMutation = typedMutation<Types.SendMessageMutation, Types.SendMessageMutationVariables>(Chats.SendMessageMutation);
export const ChatReadMutation = typedMutation<Types.ChatReadMutation, Types.ChatReadMutationVariables>(Chats.ChatReadMutation);
export const ChatSearchForComposeQuery = typedQuery<Types.ChatSearchForComposeQuery, Types.ChatSearchForComposeQueryVariables>(Chats.ChatSearchForComposeQuery);
export const ChatSearchForComposeMobileQuery = typedQuery<Types.ChatSearchForComposeMobileQuery, Types.ChatSearchForComposeMobileQueryVariables>(Chats.ChatSearchForComposeMobileQuery);
export const ChatSearchGroupQuery = typedQuery<Types.ChatSearchGroupQuery, Types.ChatSearchGroupQueryVariables>(Chats.ChatSearchGroupQuery);
export const ChatCreateGroupMutation = typedMutation<Types.ChatCreateGroupMutation, Types.ChatCreateGroupMutationVariables>(Chats.ChatCreateGroupMutation);
export const SetTypingMutation = typedMutation<Types.SetTypingMutation, Types.SetTypingMutationVariables>(Chats.SetTypingMutation);
export const ChatChangeGroupTitleMutation = typedMutation<Types.ChatChangeGroupTitleMutation, Types.ChatChangeGroupTitleMutationVariables>(Chats.ChatChangeGroupTitleMutation);
export const ChatAddMemberMutation = typedMutation<Types.ChatAddMemberMutation, Types.ChatAddMemberMutationVariables>(Chats.ChatAddMemberMutation);
export const BlockedListQuery = typedQuery<Types.BlockedListQuery, Types.BlockedListQueryVariables>(Chats.BlockedListQuery);
export const BlockUserMutation = typedMutation<Types.BlockUserMutation, Types.BlockUserMutationVariables>(Chats.BlockUserMutation);
export const UnBlockUserMutation = typedMutation<Types.UnBlockUserMutation, Types.UnBlockUserMutationVariables>(Chats.UnBlockUserMutation);
export const ChatSearchTextQuery = typedQuery<Types.ChatSearchTextQuery, Types.ChatSearchTextQueryVariables>(Chats.ChatSearchTextQuery);
export const DocumentFetchPreviewLinkQuery = typedQuery<Types.DocumentFetchPreviewLinkQuery, Types.DocumentFetchPreviewLinkQueryVariables>(Chats.DocumentFetchPreviewLinkQuery);
export const ChatSearchChannelQuery = typedQuery<Types.ChatSearchChannelQuery, Types.ChatSearchChannelQueryVariables>(Chats.ChatSearchChannelQuery);
export const CreateChannelMutation = typedMutation<Types.CreateChannelMutation, Types.CreateChannelMutationVariables>(Chats.CreateChannelMutation);
export const ChannelSetFeaturedMutation = typedMutation<Types.ChannelSetFeaturedMutation, Types.ChannelSetFeaturedMutationVariables>(Chats.ChannelSetFeaturedMutation);
export const ChannelSetHiddenMutation = typedMutation<Types.ChannelSetHiddenMutation, Types.ChannelSetHiddenMutationVariables>(Chats.ChannelSetHiddenMutation);
export const UserChannelsQuery = typedQuery<Types.UserChannelsQuery, {}>(Chats.UserChannelsQuery);
export const ChannelMembersQuery = typedQuery<Types.ChannelMembersQuery, Types.ChannelMembersQueryVariables>(Chats.ChannelMembersQuery);
export const ChannelInviteMutation = typedMutation<Types.ChannelInviteMutation, Types.ChannelInviteMutationVariables>(Chats.ChannelInviteMutation);
export const ConversationKickMutation = typedMutation<Types.ConversationKickMutation, Types.ConversationKickMutationVariables>(Chats.ConversationKickMutation);
export const ConversationSettingsUpdateMutation = typedMutation<Types.ConversationSettingsUpdateMutation, Types.ConversationSettingsUpdateMutationVariables>(Chats.ConversationSettingsUpdateMutation);
export const ChannelJoinMutation = typedMutation<Types.ChannelJoinMutation, Types.ChannelJoinMutationVariables>(Chats.ChannelJoinMutation);
export const ChannelInviteMembersMutation = typedMutation<Types.ChannelInviteMembersMutation, Types.ChannelInviteMembersMutationVariables>(Chats.ChannelInviteMembersMutation);
export const ChannelJoinInviteMutation = typedMutation<Types.ChannelJoinInviteMutation, Types.ChannelJoinInviteMutationVariables>(Chats.ChannelJoinInviteMutation);
export const ChannelRenewInviteLinkMutation = typedMutation<Types.ChannelRenewInviteLinkMutation, Types.ChannelRenewInviteLinkMutationVariables>(Chats.ChannelRenewInviteLinkMutation);
export const ChannelInviteLinkQuery = typedQuery<Types.ChannelInviteLinkQuery, Types.ChannelInviteLinkQueryVariables>(Chats.ChannelInviteLinkQuery);
export const ChannelInviteInfoQuery = typedQuery<Types.ChannelInviteInfoQuery, Types.ChannelInviteInfoQueryVariables>(Chats.ChannelInviteInfoQuery);
export const ChannelJoinInviteLinkMutation = typedMutation<Types.ChannelJoinInviteLinkMutation, Types.ChannelJoinInviteLinkMutationVariables>(Chats.ChannelJoinInviteLinkMutation);
export const ChatUpdateGroupMutation = typedMutation<Types.ChatUpdateGroupMutation, Types.ChatUpdateGroupMutationVariables>(Chats.ChatUpdateGroupMutation);
export const ChatDeleteMessageMutation = typedMutation<Types.ChatDeleteMessageMutation, Types.ChatDeleteMessageMutationVariables>(Chats.ChatDeleteMessageMutation);
export const ChatEditMessageMutation = typedMutation<Types.ChatEditMessageMutation, Types.ChatEditMessageMutationVariables>(Chats.ChatEditMessageMutation);
export const AllDealsQuery = typedQuery<Types.AllDealsQuery, {}>(Deals.AllDealsQuery);
export const AllDealsMapQuery = typedQuery<Types.AllDealsMapQuery, {}>(Deals.AllDealsMapQuery);
export const DealQuery = typedQuery<Types.DealQuery, Types.DealQueryVariables>(Deals.DealQuery);
export const AddDealMutation = typedMutation<Types.AddDealMutation, Types.AddDealMutationVariables>(Deals.AddDealMutation);
export const AlterDealMutation = typedMutation<Types.AlterDealMutation, Types.AlterDealMutationVariables>(Deals.AlterDealMutation);
export const RemoveDealMutation = typedMutation<Types.RemoveDealMutation, Types.RemoveDealMutationVariables>(Deals.RemoveDealMutation);
export const DebugReadedStatesQuery = typedQuery<Types.DebugReadedStatesQuery, {}>(Debug.DebugReadedStatesQuery);
export const DebugSendWelcomeEmailMutation = typedMutation<Types.DebugSendWelcomeEmailMutation, {}>(Debug.DebugSendWelcomeEmailMutation);
export const FeatureFlagsQuery = typedQuery<Types.FeatureFlagsQuery, {}>(FeatureFlag.FeatureFlagsQuery);
export const FeatureFlagAddMutation = typedMutation<Types.FeatureFlagAddMutation, Types.FeatureFlagAddMutationVariables>(FeatureFlag.FeatureFlagAddMutation);
export const FeatureFlagEnableMutation = typedMutation<Types.FeatureFlagEnableMutation, Types.FeatureFlagEnableMutationVariables>(FeatureFlag.FeatureFlagEnableMutation);
export const FeatureFlagDisableMutation = typedMutation<Types.FeatureFlagDisableMutation, Types.FeatureFlagDisableMutationVariables>(FeatureFlag.FeatureFlagDisableMutation);
export const FoldersQuery = typedQuery<Types.FoldersQuery, {}>(Folder.FoldersQuery);
export const FoldersSelectQuery = typedQuery<Types.FoldersSelectQuery, {}>(Folder.FoldersSelectQuery);
export const FolderQuery = typedQuery<Types.FolderQuery, Types.FolderQueryVariables>(Folder.FolderQuery);
export const FolderItemsConnectionQuery = typedQuery<Types.FolderItemsConnectionQuery, Types.FolderItemsConnectionQueryVariables>(Folder.FolderItemsConnectionQuery);
export const CreateFolderMutation = typedMutation<Types.CreateFolderMutation, Types.CreateFolderMutationVariables>(Folder.CreateFolderMutation);
export const AlterFolderMutation = typedMutation<Types.AlterFolderMutation, Types.AlterFolderMutationVariables>(Folder.AlterFolderMutation);
export const DeleteFolderMutation = typedMutation<Types.DeleteFolderMutation, Types.DeleteFolderMutationVariables>(Folder.DeleteFolderMutation);
export const AddToFolderMutation = typedMutation<Types.AddToFolderMutation, Types.AddToFolderMutationVariables>(Folder.AddToFolderMutation);
export const SetParcelFolderMutation = typedMutation<Types.SetParcelFolderMutation, Types.SetParcelFolderMutationVariables>(Folder.SetParcelFolderMutation);
export const AddToFolderFromSearchMutation = typedMutation<Types.AddToFolderFromSearchMutation, Types.AddToFolderFromSearchMutationVariables>(Folder.AddToFolderFromSearchMutation);
export const CreateFolderFromSearchMutation = typedMutation<Types.CreateFolderFromSearchMutation, Types.CreateFolderFromSearchMutationVariables>(Folder.CreateFolderFromSearchMutation);
export const FolderItemsTileOverlayQuery = typedQuery<Types.FolderItemsTileOverlayQuery, Types.FolderItemsTileOverlayQueryVariables>(Folder.FolderItemsTileOverlayQuery);
export const MyOrganizationQuery = typedQuery<Types.MyOrganizationQuery, {}>(Organization.MyOrganizationQuery);
export const MyOrganizationProfileQuery = typedQuery<Types.MyOrganizationProfileQuery, {}>(Organization.MyOrganizationProfileQuery);
export const MyOrganizationsQuery = typedQuery<Types.MyOrganizationsQuery, {}>(Organization.MyOrganizationsQuery);
export const UpdateOrganizationMutation = typedMutation<Types.UpdateOrganizationMutation, Types.UpdateOrganizationMutationVariables>(Organization.UpdateOrganizationMutation);
export const OrganizationQuery = typedQuery<Types.OrganizationQuery, Types.OrganizationQueryVariables>(Organization.OrganizationQuery);
export const OrganizationProfileQuery = typedQuery<Types.OrganizationProfileQuery, Types.OrganizationProfileQueryVariables>(Organization.OrganizationProfileQuery);
export const FollowOrganizationMutation = typedMutation<Types.FollowOrganizationMutation, Types.FollowOrganizationMutationVariables>(Organization.FollowOrganizationMutation);
export const ExploreOrganizationsQuery = typedQuery<Types.ExploreOrganizationsQuery, Types.ExploreOrganizationsQueryVariables>(Organization.ExploreOrganizationsQuery);
export const ExploreComunityQuery = typedQuery<Types.ExploreComunityQuery, Types.ExploreComunityQueryVariables>(Organization.ExploreComunityQuery);
export const CreateListingMutation = typedMutation<Types.CreateListingMutation, Types.CreateListingMutationVariables>(Organization.CreateListingMutation);
export const EditListingMutation = typedMutation<Types.EditListingMutation, Types.EditListingMutationVariables>(Organization.EditListingMutation);
export const DeleteListingMutation = typedMutation<Types.DeleteListingMutation, Types.DeleteListingMutationVariables>(Organization.DeleteListingMutation);
export const OrganizationMembersQuery = typedQuery<Types.OrganizationMembersQuery, Types.OrganizationMembersQueryVariables>(Organization.OrganizationMembersQuery);
export const OrganizationChangeMemberRoleMutation = typedMutation<Types.OrganizationChangeMemberRoleMutation, Types.OrganizationChangeMemberRoleMutationVariables>(Organization.OrganizationChangeMemberRoleMutation);
export const OrganizationRemoveMemberMutation = typedMutation<Types.OrganizationRemoveMemberMutation, Types.OrganizationRemoveMemberMutationVariables>(Organization.OrganizationRemoveMemberMutation);
export const OrganizationInviteMembersMutation = typedMutation<Types.OrganizationInviteMembersMutation, Types.OrganizationInviteMembersMutationVariables>(Organization.OrganizationInviteMembersMutation);
export const OrganizationPublicInviteQuery = typedQuery<Types.OrganizationPublicInviteQuery, {}>(Organization.OrganizationPublicInviteQuery);
export const OrganizationCreatePublicInviteMutation = typedMutation<Types.OrganizationCreatePublicInviteMutation, Types.OrganizationCreatePublicInviteMutationVariables>(Organization.OrganizationCreatePublicInviteMutation);
export const OrganizationDeletePublicInviteMutation = typedMutation<Types.OrganizationDeletePublicInviteMutation, {}>(Organization.OrganizationDeletePublicInviteMutation);
export const OrganizationInviteOrganizationMutation = typedMutation<Types.OrganizationInviteOrganizationMutation, Types.OrganizationInviteOrganizationMutationVariables>(Organization.OrganizationInviteOrganizationMutation);
export const OrganizationPublicInviteOrganizatonsQuery = typedQuery<Types.OrganizationPublicInviteOrganizatonsQuery, {}>(Organization.OrganizationPublicInviteOrganizatonsQuery);
export const OrganizationCreatePublicInviteOrganizatonsMutation = typedMutation<Types.OrganizationCreatePublicInviteOrganizatonsMutation, Types.OrganizationCreatePublicInviteOrganizatonsMutationVariables>(Organization.OrganizationCreatePublicInviteOrganizatonsMutation);
export const OrganizationDeletePublicInviteOrganizatonsMutation = typedMutation<Types.OrganizationDeletePublicInviteOrganizatonsMutation, {}>(Organization.OrganizationDeletePublicInviteOrganizatonsMutation);
export const OrganizationActivateByInviteMutation = typedMutation<Types.OrganizationActivateByInviteMutation, Types.OrganizationActivateByInviteMutationVariables>(Organization.OrganizationActivateByInviteMutation);
export const OrganizationAlterPublishedMutation = typedMutation<Types.OrganizationAlterPublishedMutation, Types.OrganizationAlterPublishedMutationVariables>(Organization.OrganizationAlterPublishedMutation);
export const HitsPopularQuery = typedQuery<Types.HitsPopularQuery, Types.HitsPopularQueryVariables>(Organization.HitsPopularQuery);
export const HitsAddMutation = typedMutation<Types.HitsAddMutation, Types.HitsAddMutationVariables>(Organization.HitsAddMutation);
export const AlterMemberAsContactMutation = typedMutation<Types.AlterMemberAsContactMutation, Types.AlterMemberAsContactMutationVariables>(Organization.AlterMemberAsContactMutation);
export const OrganizationByPrefixQuery = typedQuery<Types.OrganizationByPrefixQuery, Types.OrganizationByPrefixQueryVariables>(Organization.OrganizationByPrefixQuery);
export const BlocksConnectionQuery = typedQuery<Types.BlocksConnectionQuery, Types.BlocksConnectionQueryVariables>(Parcels.BlocksConnectionQuery);
export const BlockQuery = typedQuery<Types.BlockQuery, Types.BlockQueryVariables>(Parcels.BlockQuery);
export const ParcelsConnectionQuery = typedQuery<Types.ParcelsConnectionQuery, Types.ParcelsConnectionQueryVariables>(Parcels.ParcelsConnectionQuery);
export const ParcelsFavoritesQuery = typedQuery<Types.ParcelsFavoritesQuery, {}>(Parcels.ParcelsFavoritesQuery);
export const ParcelsFavoritesCountQuery = typedQuery<Types.ParcelsFavoritesCountQuery, {}>(Parcels.ParcelsFavoritesCountQuery);
export const ParcelQuery = typedQuery<Types.ParcelQuery, Types.ParcelQueryVariables>(Parcels.ParcelQuery);
export const ParcelsTileOverlayQuery = typedQuery<Types.ParcelsTileOverlayQuery, Types.ParcelsTileOverlayQueryVariables>(Parcels.ParcelsTileOverlayQuery);
export const ParcelsMapSearchQuery = typedQuery<Types.ParcelsMapSearchQuery, Types.ParcelsMapSearchQueryVariables>(Parcels.ParcelsMapSearchQuery);
export const ParcelsPointOverlayQuery = typedQuery<Types.ParcelsPointOverlayQuery, Types.ParcelsPointOverlayQueryVariables>(Parcels.ParcelsPointOverlayQuery);
export const BlocksTileOverlayQuery = typedQuery<Types.BlocksTileOverlayQuery, Types.BlocksTileOverlayQueryVariables>(Parcels.BlocksTileOverlayQuery);
export const ParcelAlterMutation = typedMutation<Types.ParcelAlterMutation, Types.ParcelAlterMutationVariables>(Parcels.ParcelAlterMutation);
export const ParcelLikeMutation = typedMutation<Types.ParcelLikeMutation, Types.ParcelLikeMutationVariables>(Parcels.ParcelLikeMutation);
export const ParcelUnlikeMutation = typedMutation<Types.ParcelUnlikeMutation, Types.ParcelUnlikeMutationVariables>(Parcels.ParcelUnlikeMutation);
export const ParcelsStatsQuery = typedQuery<Types.ParcelsStatsQuery, Types.ParcelsStatsQueryVariables>(Parcels.ParcelsStatsQuery);
export const ParcelsSearchQuery = typedQuery<Types.ParcelsSearchQuery, Types.ParcelsSearchQueryVariables>(Parcels.ParcelsSearchQuery);
export const ParcelNotesMutation = typedMutation<Types.ParcelNotesMutation, Types.ParcelNotesMutationVariables>(Parcels.ParcelNotesMutation);
export const PermissionsQuery = typedQuery<Types.PermissionsQuery, {}>(Permissions.PermissionsQuery);
export const SuperAdminsQuery = typedQuery<Types.SuperAdminsQuery, {}>(Permissions.SuperAdminsQuery);
export const SuperAccountsQuery = typedQuery<Types.SuperAccountsQuery, {}>(Permissions.SuperAccountsQuery);
export const SuperAccountQuery = typedQuery<Types.SuperAccountQuery, Types.SuperAccountQueryVariables>(Permissions.SuperAccountQuery);
export const SuperAccountRenameMutation = typedMutation<Types.SuperAccountRenameMutation, Types.SuperAccountRenameMutationVariables>(Permissions.SuperAccountRenameMutation);
export const SuperAccountActivateMutation = typedMutation<Types.SuperAccountActivateMutation, Types.SuperAccountActivateMutationVariables>(Permissions.SuperAccountActivateMutation);
export const SuperAccountSuspendMutation = typedMutation<Types.SuperAccountSuspendMutation, Types.SuperAccountSuspendMutationVariables>(Permissions.SuperAccountSuspendMutation);
export const SuperAccountPendMutation = typedMutation<Types.SuperAccountPendMutation, Types.SuperAccountPendMutationVariables>(Permissions.SuperAccountPendMutation);
export const SuperAccountAddMutation = typedMutation<Types.SuperAccountAddMutation, Types.SuperAccountAddMutationVariables>(Permissions.SuperAccountAddMutation);
export const SuperAccountMemberAddMutation = typedMutation<Types.SuperAccountMemberAddMutation, Types.SuperAccountMemberAddMutationVariables>(Permissions.SuperAccountMemberAddMutation);
export const SuperAccountMemberRemoveMutation = typedMutation<Types.SuperAccountMemberRemoveMutation, Types.SuperAccountMemberRemoveMutationVariables>(Permissions.SuperAccountMemberRemoveMutation);
export const SuperAdminAddMutation = typedMutation<Types.SuperAdminAddMutation, Types.SuperAdminAddMutationVariables>(Permissions.SuperAdminAddMutation);
export const SuperAdminRemoveMutation = typedMutation<Types.SuperAdminRemoveMutation, Types.SuperAdminRemoveMutationVariables>(Permissions.SuperAdminRemoveMutation);
export const SuperChatsStatsQuery = typedQuery<Types.SuperChatsStatsQuery, Types.SuperChatsStatsQueryVariables>(Permissions.SuperChatsStatsQuery);
export const PermitQuery = typedQuery<Types.PermitQuery, Types.PermitQueryVariables>(Permits.PermitQuery);
export const PermitsConnectionQuery = typedQuery<Types.PermitsConnectionQuery, Types.PermitsConnectionQueryVariables>(Permits.PermitsConnectionQuery);
export const SearchQuery = typedQuery<Types.SearchQuery, Types.SearchQueryVariables>(Search.SearchQuery);
export const ProfileQuery = typedQuery<Types.ProfileQuery, {}>(Settings.ProfileQuery);
export const ProfileUpdateMutation = typedMutation<Types.ProfileUpdateMutation, Types.ProfileUpdateMutationVariables>(Settings.ProfileUpdateMutation);
export const ProfileCreateMutation = typedMutation<Types.ProfileCreateMutation, Types.ProfileCreateMutationVariables>(Settings.ProfileCreateMutation);
export const SettingsQuery = typedQuery<Types.SettingsQuery, {}>(Settings.SettingsQuery);
export const SettingsUpdateMutation = typedMutation<Types.SettingsUpdateMutation, Types.SettingsUpdateMutationVariables>(Settings.SettingsUpdateMutation);
export const SourcingQuery = typedQuery<Types.SourcingQuery, Types.SourcingQueryVariables>(Sourcing.SourcingQuery);
export const SourcingFirstQuery = typedQuery<Types.SourcingFirstQuery, Types.SourcingFirstQueryVariables>(Sourcing.SourcingFirstQuery);
export const SourcingAllQuery = typedQuery<Types.SourcingAllQuery, Types.SourcingAllQueryVariables>(Sourcing.SourcingAllQuery);
export const SourcingAllReportQuery = typedQuery<Types.SourcingAllReportQuery, Types.SourcingAllReportQueryVariables>(Sourcing.SourcingAllReportQuery);
export const ProspectingCapacityQuery = typedQuery<Types.ProspectingCapacityQuery, Types.ProspectingCapacityQueryVariables>(Sourcing.ProspectingCapacityQuery);
export const OpportunityQuery = typedQuery<Types.OpportunityQuery, Types.OpportunityQueryVariables>(Sourcing.OpportunityQuery);
export const OpportunityTileOverlayQuery = typedQuery<Types.OpportunityTileOverlayQuery, Types.OpportunityTileOverlayQueryVariables>(Sourcing.OpportunityTileOverlayQuery);
export const AddOpportunityMutation = typedMutation<Types.AddOpportunityMutation, Types.AddOpportunityMutationVariables>(Sourcing.AddOpportunityMutation);
export const ApproveOpportunityMutation = typedMutation<Types.ApproveOpportunityMutation, Types.ApproveOpportunityMutationVariables>(Sourcing.ApproveOpportunityMutation);
export const RejectOpportunityMutation = typedMutation<Types.RejectOpportunityMutation, Types.RejectOpportunityMutationVariables>(Sourcing.RejectOpportunityMutation);
export const SnoozeOpportunityMutation = typedMutation<Types.SnoozeOpportunityMutation, Types.SnoozeOpportunityMutationVariables>(Sourcing.SnoozeOpportunityMutation);
export const ResetOpportunityMutation = typedMutation<Types.ResetOpportunityMutation, Types.ResetOpportunityMutationVariables>(Sourcing.ResetOpportunityMutation);
export const AddOpportunityFromSearchMutation = typedMutation<Types.AddOpportunityFromSearchMutation, Types.AddOpportunityFromSearchMutationVariables>(Sourcing.AddOpportunityFromSearchMutation);
export const NextOpportunityQuery = typedQuery<Types.NextOpportunityQuery, Types.NextOpportunityQueryVariables>(Sourcing.NextOpportunityQuery);
export const OpportunityStatsQuery = typedQuery<Types.OpportunityStatsQuery, Types.OpportunityStatsQueryVariables>(Sourcing.OpportunityStatsQuery);
export const OwnersQuery = typedQuery<Types.OwnersQuery, Types.OwnersQueryVariables>(Sourcing.OwnersQuery);
export const SuperCitiesQuery = typedQuery<Types.SuperCitiesQuery, {}>(SuperCity.SuperCitiesQuery);
export const UsersQuery = typedQuery<Types.UsersQuery, Types.UsersQueryVariables>(User.UsersQuery);
export const UserQuery = typedQuery<Types.UserQuery, Types.UserQueryVariables>(User.UserQuery);