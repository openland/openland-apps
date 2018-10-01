// WARNING! THIS IS AUTOGENERATED FILE. DO NOT EDIT!

import { typedQuery } from 'openland-y-graphql/typed';
import { typedMutation } from 'openland-y-graphql/typed';
import * as Types from './Types';
import * as Account from './queries/Account';
import * as Addressing from './queries/Addressing';
import * as Chats from './queries/Chats';
import * as Deals from './queries/Deals';
import * as Debug from './queries/Debug';
import * as Development from './queries/Development';
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

export const AccountQuery = typedQuery<Types.Account, {}>(Account.AccountQuery);
export const AccountSettingsQuery = typedQuery<Types.AccountSettings, {}>(Account.AccountSettingsQuery);
export const CreateOrganizationMutation = typedMutation<Types.CreateOrganization, Types.CreateOrganizationVariables>(Account.CreateOrganizationMutation);
export const AccountInviteInfoQuery = typedQuery<Types.AccountInviteInfo, Types.AccountInviteInfoVariables>(Account.AccountInviteInfoQuery);
export const AccountInviteJoinMutation = typedMutation<Types.AccountInviteJoin, Types.AccountInviteJoinVariables>(Account.AccountInviteJoinMutation);
export const AccountInvitesQuery = typedQuery<Types.AccountInvites, {}>(Account.AccountInvitesQuery);
export const AccountInvitesHistoryQuery = typedQuery<Types.AccountInvitesHistory, {}>(Account.AccountInvitesHistoryQuery);
export const AccountCreateInviteMutation = typedMutation<Types.AccountCreateInvite, {}>(Account.AccountCreateInviteMutation);
export const AccountDestroyInviteMutation = typedMutation<Types.AccountDestroyInvite, Types.AccountDestroyInviteVariables>(Account.AccountDestroyInviteMutation);
export const ProfilePrefillQuery = typedQuery<Types.ProfilePrefill, {}>(Account.ProfilePrefillQuery);
export const CreateUserProfileAndOrganizationMutation = typedMutation<Types.CreateUserProfileAndOrganization, Types.CreateUserProfileAndOrganizationVariables>(Account.CreateUserProfileAndOrganizationMutation);
export const StateQuery = typedQuery<Types.State, {}>(Addressing.StateQuery);
export const CountyQuery = typedQuery<Types.County, Types.CountyVariables>(Addressing.CountyQuery);
export const ChatListQuery = typedQuery<Types.ChatList, Types.ChatListVariables>(Chats.ChatListQuery);
export const MessageSetReactionMutation = typedMutation<Types.MessageSetReaction, Types.MessageSetReactionVariables>(Chats.MessageSetReactionMutation);
export const MessageUnsetReactionMutation = typedMutation<Types.MessageUnsetReaction, Types.MessageUnsetReactionVariables>(Chats.MessageUnsetReactionMutation);
export const GlobalCounterQuery = typedQuery<Types.GlobalCounter, {}>(Chats.GlobalCounterQuery);
export const ChatHistoryQuery = typedQuery<Types.ChatHistory, Types.ChatHistoryVariables>(Chats.ChatHistoryQuery);
export const ChatInfoQuery = typedQuery<Types.ChatInfo, Types.ChatInfoVariables>(Chats.ChatInfoQuery);
export const ChatFullInfoQuery = typedQuery<Types.ChatFullInfo, Types.ChatFullInfoVariables>(Chats.ChatFullInfoQuery);
export const GroupChatFullInfoQuery = typedQuery<Types.GroupChatFullInfo, Types.GroupChatFullInfoVariables>(Chats.GroupChatFullInfoQuery);
export const SendMessageMutation = typedMutation<Types.SendMessage, Types.SendMessageVariables>(Chats.SendMessageMutation);
export const ChatReadMutation = typedMutation<Types.ChatRead, Types.ChatReadVariables>(Chats.ChatReadMutation);
export const ChatSearchForComposeQuery = typedQuery<Types.ChatSearchForCompose, Types.ChatSearchForComposeVariables>(Chats.ChatSearchForComposeQuery);
export const ChatSearchForComposeMobileQuery = typedQuery<Types.ChatSearchForComposeMobile, Types.ChatSearchForComposeMobileVariables>(Chats.ChatSearchForComposeMobileQuery);
export const ChatSearchGroupQuery = typedQuery<Types.ChatSearchGroup, Types.ChatSearchGroupVariables>(Chats.ChatSearchGroupQuery);
export const ChatCreateGroupMutation = typedMutation<Types.ChatCreateGroup, Types.ChatCreateGroupVariables>(Chats.ChatCreateGroupMutation);
export const ChatCreateIntroMutation = typedMutation<Types.ChatCreateIntro, Types.ChatCreateIntroVariables>(Chats.ChatCreateIntroMutation);
export const SetTypingMutation = typedMutation<Types.SetTyping, Types.SetTypingVariables>(Chats.SetTypingMutation);
export const ChatChangeGroupTitleMutation = typedMutation<Types.ChatChangeGroupTitle, Types.ChatChangeGroupTitleVariables>(Chats.ChatChangeGroupTitleMutation);
export const ChatAddMemberMutation = typedMutation<Types.ChatAddMember, Types.ChatAddMemberVariables>(Chats.ChatAddMemberMutation);
export const BlockedListQuery = typedQuery<Types.BlockedList, Types.BlockedListVariables>(Chats.BlockedListQuery);
export const BlockUserMutation = typedMutation<Types.BlockUser, Types.BlockUserVariables>(Chats.BlockUserMutation);
export const UnBlockUserMutation = typedMutation<Types.UnBlockUser, Types.UnBlockUserVariables>(Chats.UnBlockUserMutation);
export const ChatSearchTextQuery = typedQuery<Types.ChatSearchText, Types.ChatSearchTextVariables>(Chats.ChatSearchTextQuery);
export const DocumentFetchPreviewLinkQuery = typedQuery<Types.DocumentFetchPreviewLink, Types.DocumentFetchPreviewLinkVariables>(Chats.DocumentFetchPreviewLinkQuery);
export const ChatSearchChannelQuery = typedQuery<Types.ChatSearchChannel, Types.ChatSearchChannelVariables>(Chats.ChatSearchChannelQuery);
export const CreateChannelMutation = typedMutation<Types.CreateChannel, Types.CreateChannelVariables>(Chats.CreateChannelMutation);
export const ChannelSetFeaturedMutation = typedMutation<Types.ChannelSetFeatured, Types.ChannelSetFeaturedVariables>(Chats.ChannelSetFeaturedMutation);
export const ChannelSetHiddenMutation = typedMutation<Types.ChannelSetHidden, Types.ChannelSetHiddenVariables>(Chats.ChannelSetHiddenMutation);
export const UserChannelsQuery = typedQuery<Types.UserChannels, {}>(Chats.UserChannelsQuery);
export const ChannelMembersQuery = typedQuery<Types.ChannelMembers, Types.ChannelMembersVariables>(Chats.ChannelMembersQuery);
export const ChannelInviteMutation = typedMutation<Types.ChannelInvite, Types.ChannelInviteVariables>(Chats.ChannelInviteMutation);
export const ConversationKickMutation = typedMutation<Types.ConversationKick, Types.ConversationKickVariables>(Chats.ConversationKickMutation);
export const ConversationSettingsUpdateMutation = typedMutation<Types.ConversationSettingsUpdate, Types.ConversationSettingsUpdateVariables>(Chats.ConversationSettingsUpdateMutation);
export const ChannelJoinMutation = typedMutation<Types.ChannelJoin, Types.ChannelJoinVariables>(Chats.ChannelJoinMutation);
export const ChannelInviteMembersMutation = typedMutation<Types.ChannelInviteMembers, Types.ChannelInviteMembersVariables>(Chats.ChannelInviteMembersMutation);
export const ChannelJoinInviteMutation = typedMutation<Types.ChannelJoinInvite, Types.ChannelJoinInviteVariables>(Chats.ChannelJoinInviteMutation);
export const ChannelRenewInviteLinkMutation = typedMutation<Types.ChannelRenewInviteLink, Types.ChannelRenewInviteLinkVariables>(Chats.ChannelRenewInviteLinkMutation);
export const ChannelInviteLinkQuery = typedQuery<Types.ChannelInviteLink, Types.ChannelInviteLinkVariables>(Chats.ChannelInviteLinkQuery);
export const ChannelInviteInfoQuery = typedQuery<Types.ChannelInviteInfo, Types.ChannelInviteInfoVariables>(Chats.ChannelInviteInfoQuery);
export const ChannelJoinInviteLinkMutation = typedMutation<Types.ChannelJoinInviteLink, Types.ChannelJoinInviteLinkVariables>(Chats.ChannelJoinInviteLinkMutation);
export const ChatUpdateGroupMutation = typedMutation<Types.ChatUpdateGroup, Types.ChatUpdateGroupVariables>(Chats.ChatUpdateGroupMutation);
export const ChatDeleteMessageMutation = typedMutation<Types.ChatDeleteMessage, Types.ChatDeleteMessageVariables>(Chats.ChatDeleteMessageMutation);
export const ChatEditMessageMutation = typedMutation<Types.ChatEditMessage, Types.ChatEditMessageVariables>(Chats.ChatEditMessageMutation);
export const SuperChannelAddMemberMutation = typedMutation<Types.SuperChannelAddMember, Types.SuperChannelAddMemberVariables>(Chats.SuperChannelAddMemberMutation);
export const AllDealsQuery = typedQuery<Types.AllDeals, {}>(Deals.AllDealsQuery);
export const AllDealsMapQuery = typedQuery<Types.AllDealsMap, {}>(Deals.AllDealsMapQuery);
export const DealQuery = typedQuery<Types.Deal, Types.DealVariables>(Deals.DealQuery);
export const AddDealMutation = typedMutation<Types.AddDeal, Types.AddDealVariables>(Deals.AddDealMutation);
export const AlterDealMutation = typedMutation<Types.AlterDeal, Types.AlterDealVariables>(Deals.AlterDealMutation);
export const RemoveDealMutation = typedMutation<Types.RemoveDeal, Types.RemoveDealVariables>(Deals.RemoveDealMutation);
export const DebugReadedStatesQuery = typedQuery<Types.DebugReadedStates, {}>(Debug.DebugReadedStatesQuery);
export const DebugSendWelcomeEmailMutation = typedMutation<Types.DebugSendWelcomeEmail, {}>(Debug.DebugSendWelcomeEmailMutation);
export const PersonalTokensQuery = typedQuery<Types.PersonalTokens, {}>(Development.PersonalTokensQuery);
export const FeatureFlagsQuery = typedQuery<Types.FeatureFlags, {}>(FeatureFlag.FeatureFlagsQuery);
export const FeatureFlagAddMutation = typedMutation<Types.FeatureFlagAdd, Types.FeatureFlagAddVariables>(FeatureFlag.FeatureFlagAddMutation);
export const FeatureFlagEnableMutation = typedMutation<Types.FeatureFlagEnable, Types.FeatureFlagEnableVariables>(FeatureFlag.FeatureFlagEnableMutation);
export const FeatureFlagDisableMutation = typedMutation<Types.FeatureFlagDisable, Types.FeatureFlagDisableVariables>(FeatureFlag.FeatureFlagDisableMutation);
export const FoldersQuery = typedQuery<Types.Folders, {}>(Folder.FoldersQuery);
export const FoldersSelectQuery = typedQuery<Types.FoldersSelect, {}>(Folder.FoldersSelectQuery);
export const FolderQuery = typedQuery<Types.Folder, Types.FolderVariables>(Folder.FolderQuery);
export const FolderItemsConnectionQuery = typedQuery<Types.FolderItemsConnection, Types.FolderItemsConnectionVariables>(Folder.FolderItemsConnectionQuery);
export const CreateFolderMutation = typedMutation<Types.CreateFolder, Types.CreateFolderVariables>(Folder.CreateFolderMutation);
export const AlterFolderMutation = typedMutation<Types.AlterFolder, Types.AlterFolderVariables>(Folder.AlterFolderMutation);
export const DeleteFolderMutation = typedMutation<Types.DeleteFolder, Types.DeleteFolderVariables>(Folder.DeleteFolderMutation);
export const AddToFolderMutation = typedMutation<Types.AddToFolder, Types.AddToFolderVariables>(Folder.AddToFolderMutation);
export const SetParcelFolderMutation = typedMutation<Types.SetParcelFolder, Types.SetParcelFolderVariables>(Folder.SetParcelFolderMutation);
export const AddToFolderFromSearchMutation = typedMutation<Types.AddToFolderFromSearch, Types.AddToFolderFromSearchVariables>(Folder.AddToFolderFromSearchMutation);
export const CreateFolderFromSearchMutation = typedMutation<Types.CreateFolderFromSearch, Types.CreateFolderFromSearchVariables>(Folder.CreateFolderFromSearchMutation);
export const FolderItemsTileOverlayQuery = typedQuery<Types.FolderItemsTileOverlay, Types.FolderItemsTileOverlayVariables>(Folder.FolderItemsTileOverlayQuery);
export const MyOrganizationQuery = typedQuery<Types.MyOrganization, {}>(Organization.MyOrganizationQuery);
export const MyOrganizationProfileQuery = typedQuery<Types.MyOrganizationProfile, {}>(Organization.MyOrganizationProfileQuery);
export const MyOrganizationsQuery = typedQuery<Types.MyOrganizations, {}>(Organization.MyOrganizationsQuery);
export const UpdateOrganizationMutation = typedMutation<Types.UpdateOrganization, Types.UpdateOrganizationVariables>(Organization.UpdateOrganizationMutation);
export const OrganizationQuery = typedQuery<Types.Organization, Types.OrganizationVariables>(Organization.OrganizationQuery);
export const OrganizationProfileQuery = typedQuery<Types.OrganizationProfile, Types.OrganizationProfileVariables>(Organization.OrganizationProfileQuery);
export const FollowOrganizationMutation = typedMutation<Types.FollowOrganization, Types.FollowOrganizationVariables>(Organization.FollowOrganizationMutation);
export const ExploreOrganizationsQuery = typedQuery<Types.ExploreOrganizations, Types.ExploreOrganizationsVariables>(Organization.ExploreOrganizationsQuery);
export const ExploreComunityQuery = typedQuery<Types.ExploreComunity, Types.ExploreComunityVariables>(Organization.ExploreComunityQuery);
export const CreateListingMutation = typedMutation<Types.CreateListing, Types.CreateListingVariables>(Organization.CreateListingMutation);
export const EditListingMutation = typedMutation<Types.EditListing, Types.EditListingVariables>(Organization.EditListingMutation);
export const DeleteListingMutation = typedMutation<Types.DeleteListing, Types.DeleteListingVariables>(Organization.DeleteListingMutation);
export const OrganizationMembersQuery = typedQuery<Types.OrganizationMembers, Types.OrganizationMembersVariables>(Organization.OrganizationMembersQuery);
export const OrganizationChangeMemberRoleMutation = typedMutation<Types.OrganizationChangeMemberRole, Types.OrganizationChangeMemberRoleVariables>(Organization.OrganizationChangeMemberRoleMutation);
export const OrganizationRemoveMemberMutation = typedMutation<Types.OrganizationRemoveMember, Types.OrganizationRemoveMemberVariables>(Organization.OrganizationRemoveMemberMutation);
export const OrganizationInviteMembersMutation = typedMutation<Types.OrganizationInviteMembers, Types.OrganizationInviteMembersVariables>(Organization.OrganizationInviteMembersMutation);
export const OrganizationPublicInviteQuery = typedQuery<Types.OrganizationPublicInvite, {}>(Organization.OrganizationPublicInviteQuery);
export const OrganizationCreatePublicInviteMutation = typedMutation<Types.OrganizationCreatePublicInvite, Types.OrganizationCreatePublicInviteVariables>(Organization.OrganizationCreatePublicInviteMutation);
export const OrganizationDeletePublicInviteMutation = typedMutation<Types.OrganizationDeletePublicInvite, {}>(Organization.OrganizationDeletePublicInviteMutation);
export const OrganizationInviteOrganizationMutation = typedMutation<Types.OrganizationInviteOrganization, Types.OrganizationInviteOrganizationVariables>(Organization.OrganizationInviteOrganizationMutation);
export const OrganizationPublicInviteOrganizatonsQuery = typedQuery<Types.OrganizationPublicInviteOrganizatons, {}>(Organization.OrganizationPublicInviteOrganizatonsQuery);
export const OrganizationCreatePublicInviteOrganizatonsMutation = typedMutation<Types.OrganizationCreatePublicInviteOrganizatons, Types.OrganizationCreatePublicInviteOrganizatonsVariables>(Organization.OrganizationCreatePublicInviteOrganizatonsMutation);
export const OrganizationDeletePublicInviteOrganizatonsMutation = typedMutation<Types.OrganizationDeletePublicInviteOrganizatons, {}>(Organization.OrganizationDeletePublicInviteOrganizatonsMutation);
export const OrganizationActivateByInviteMutation = typedMutation<Types.OrganizationActivateByInvite, Types.OrganizationActivateByInviteVariables>(Organization.OrganizationActivateByInviteMutation);
export const OrganizationAlterPublishedMutation = typedMutation<Types.OrganizationAlterPublished, Types.OrganizationAlterPublishedVariables>(Organization.OrganizationAlterPublishedMutation);
export const HitsPopularQuery = typedQuery<Types.HitsPopular, Types.HitsPopularVariables>(Organization.HitsPopularQuery);
export const HitsAddMutation = typedMutation<Types.HitsAdd, Types.HitsAddVariables>(Organization.HitsAddMutation);
export const AlterMemberAsContactMutation = typedMutation<Types.AlterMemberAsContact, Types.AlterMemberAsContactVariables>(Organization.AlterMemberAsContactMutation);
export const OrganizationByPrefixQuery = typedQuery<Types.OrganizationByPrefix, Types.OrganizationByPrefixVariables>(Organization.OrganizationByPrefixQuery);
export const TopCategoriesQuery = typedQuery<Types.TopCategories, {}>(Organization.TopCategoriesQuery);
export const BlocksConnectionQuery = typedQuery<Types.BlocksConnection, Types.BlocksConnectionVariables>(Parcels.BlocksConnectionQuery);
export const BlockQuery = typedQuery<Types.Block, Types.BlockVariables>(Parcels.BlockQuery);
export const ParcelsConnectionQuery = typedQuery<Types.ParcelsConnection, Types.ParcelsConnectionVariables>(Parcels.ParcelsConnectionQuery);
export const ParcelsFavoritesQuery = typedQuery<Types.ParcelsFavorites, {}>(Parcels.ParcelsFavoritesQuery);
export const ParcelsFavoritesCountQuery = typedQuery<Types.ParcelsFavoritesCount, {}>(Parcels.ParcelsFavoritesCountQuery);
export const ParcelQuery = typedQuery<Types.Parcel, Types.ParcelVariables>(Parcels.ParcelQuery);
export const ParcelsTileOverlayQuery = typedQuery<Types.ParcelsTileOverlay, Types.ParcelsTileOverlayVariables>(Parcels.ParcelsTileOverlayQuery);
export const ParcelsMapSearchQuery = typedQuery<Types.ParcelsMapSearch, Types.ParcelsMapSearchVariables>(Parcels.ParcelsMapSearchQuery);
export const ParcelsPointOverlayQuery = typedQuery<Types.ParcelsPointOverlay, Types.ParcelsPointOverlayVariables>(Parcels.ParcelsPointOverlayQuery);
export const BlocksTileOverlayQuery = typedQuery<Types.BlocksTileOverlay, Types.BlocksTileOverlayVariables>(Parcels.BlocksTileOverlayQuery);
export const ParcelAlterMutation = typedMutation<Types.ParcelAlter, Types.ParcelAlterVariables>(Parcels.ParcelAlterMutation);
export const ParcelLikeMutation = typedMutation<Types.ParcelLike, Types.ParcelLikeVariables>(Parcels.ParcelLikeMutation);
export const ParcelUnlikeMutation = typedMutation<Types.ParcelUnlike, Types.ParcelUnlikeVariables>(Parcels.ParcelUnlikeMutation);
export const ParcelsStatsQuery = typedQuery<Types.ParcelsStats, Types.ParcelsStatsVariables>(Parcels.ParcelsStatsQuery);
export const ParcelsSearchQuery = typedQuery<Types.ParcelsSearch, Types.ParcelsSearchVariables>(Parcels.ParcelsSearchQuery);
export const ParcelNotesMutation = typedMutation<Types.ParcelNotes, Types.ParcelNotesVariables>(Parcels.ParcelNotesMutation);
export const PermissionsQuery = typedQuery<Types.Permissions, {}>(Permissions.PermissionsQuery);
export const SuperAdminsQuery = typedQuery<Types.SuperAdmins, {}>(Permissions.SuperAdminsQuery);
export const SuperAccountsQuery = typedQuery<Types.SuperAccounts, {}>(Permissions.SuperAccountsQuery);
export const SuperAccountQuery = typedQuery<Types.SuperAccount, Types.SuperAccountVariables>(Permissions.SuperAccountQuery);
export const SuperAccountRenameMutation = typedMutation<Types.SuperAccountRename, Types.SuperAccountRenameVariables>(Permissions.SuperAccountRenameMutation);
export const SuperAccountActivateMutation = typedMutation<Types.SuperAccountActivate, Types.SuperAccountActivateVariables>(Permissions.SuperAccountActivateMutation);
export const SuperAccountSuspendMutation = typedMutation<Types.SuperAccountSuspend, Types.SuperAccountSuspendVariables>(Permissions.SuperAccountSuspendMutation);
export const SuperAccountPendMutation = typedMutation<Types.SuperAccountPend, Types.SuperAccountPendVariables>(Permissions.SuperAccountPendMutation);
export const SuperAccountAddMutation = typedMutation<Types.SuperAccountAdd, Types.SuperAccountAddVariables>(Permissions.SuperAccountAddMutation);
export const SuperAccountMemberAddMutation = typedMutation<Types.SuperAccountMemberAdd, Types.SuperAccountMemberAddVariables>(Permissions.SuperAccountMemberAddMutation);
export const SuperAccountMemberRemoveMutation = typedMutation<Types.SuperAccountMemberRemove, Types.SuperAccountMemberRemoveVariables>(Permissions.SuperAccountMemberRemoveMutation);
export const SuperAdminAddMutation = typedMutation<Types.SuperAdminAdd, Types.SuperAdminAddVariables>(Permissions.SuperAdminAddMutation);
export const SuperAdminRemoveMutation = typedMutation<Types.SuperAdminRemove, Types.SuperAdminRemoveVariables>(Permissions.SuperAdminRemoveMutation);
export const SuperChatsStatsQuery = typedQuery<Types.SuperChatsStats, Types.SuperChatsStatsVariables>(Permissions.SuperChatsStatsQuery);
export const SuperMessagesSentStatsQuery = typedQuery<Types.SuperMessagesSentStats, Types.SuperMessagesSentStatsVariables>(Permissions.SuperMessagesSentStatsQuery);
export const PermitQuery = typedQuery<Types.Permit, Types.PermitVariables>(Permits.PermitQuery);
export const PermitsConnectionQuery = typedQuery<Types.PermitsConnection, Types.PermitsConnectionVariables>(Permits.PermitsConnectionQuery);
export const SearchQuery = typedQuery<Types.Search, Types.SearchVariables>(Search.SearchQuery);
export const ProfileQuery = typedQuery<Types.Profile, {}>(Settings.ProfileQuery);
export const ProfileUpdateMutation = typedMutation<Types.ProfileUpdate, Types.ProfileUpdateVariables>(Settings.ProfileUpdateMutation);
export const ProfileCreateMutation = typedMutation<Types.ProfileCreate, Types.ProfileCreateVariables>(Settings.ProfileCreateMutation);
export const SettingsQuery = typedQuery<Types.Settings, {}>(Settings.SettingsQuery);
export const SettingsUpdateMutation = typedMutation<Types.SettingsUpdate, Types.SettingsUpdateVariables>(Settings.SettingsUpdateMutation);
export const SourcingQuery = typedQuery<Types.Sourcing, Types.SourcingVariables>(Sourcing.SourcingQuery);
export const SourcingFirstQuery = typedQuery<Types.SourcingFirst, Types.SourcingFirstVariables>(Sourcing.SourcingFirstQuery);
export const SourcingAllQuery = typedQuery<Types.SourcingAll, Types.SourcingAllVariables>(Sourcing.SourcingAllQuery);
export const SourcingAllReportQuery = typedQuery<Types.SourcingAllReport, Types.SourcingAllReportVariables>(Sourcing.SourcingAllReportQuery);
export const ProspectingCapacityQuery = typedQuery<Types.ProspectingCapacity, Types.ProspectingCapacityVariables>(Sourcing.ProspectingCapacityQuery);
export const OpportunityQuery = typedQuery<Types.Opportunity, Types.OpportunityVariables>(Sourcing.OpportunityQuery);
export const OpportunityTileOverlayQuery = typedQuery<Types.OpportunityTileOverlay, Types.OpportunityTileOverlayVariables>(Sourcing.OpportunityTileOverlayQuery);
export const AddOpportunityMutation = typedMutation<Types.AddOpportunity, Types.AddOpportunityVariables>(Sourcing.AddOpportunityMutation);
export const ApproveOpportunityMutation = typedMutation<Types.ApproveOpportunity, Types.ApproveOpportunityVariables>(Sourcing.ApproveOpportunityMutation);
export const RejectOpportunityMutation = typedMutation<Types.RejectOpportunity, Types.RejectOpportunityVariables>(Sourcing.RejectOpportunityMutation);
export const SnoozeOpportunityMutation = typedMutation<Types.SnoozeOpportunity, Types.SnoozeOpportunityVariables>(Sourcing.SnoozeOpportunityMutation);
export const ResetOpportunityMutation = typedMutation<Types.ResetOpportunity, Types.ResetOpportunityVariables>(Sourcing.ResetOpportunityMutation);
export const AddOpportunityFromSearchMutation = typedMutation<Types.AddOpportunityFromSearch, Types.AddOpportunityFromSearchVariables>(Sourcing.AddOpportunityFromSearchMutation);
export const NextOpportunityQuery = typedQuery<Types.NextOpportunity, Types.NextOpportunityVariables>(Sourcing.NextOpportunityQuery);
export const OpportunityStatsQuery = typedQuery<Types.OpportunityStats, Types.OpportunityStatsVariables>(Sourcing.OpportunityStatsQuery);
export const OwnersQuery = typedQuery<Types.Owners, Types.OwnersVariables>(Sourcing.OwnersQuery);
export const SuperCitiesQuery = typedQuery<Types.SuperCities, {}>(SuperCity.SuperCitiesQuery);
export const UsersQuery = typedQuery<Types.Users, Types.UsersVariables>(User.UsersQuery);
export const UserQuery = typedQuery<Types.User, Types.UserVariables>(User.UserQuery);
export const ExplorePeopleQuery = typedQuery<Types.ExplorePeople, Types.ExplorePeopleVariables>(User.ExplorePeopleQuery);