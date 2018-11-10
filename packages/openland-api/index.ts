// WARNING! THIS IS AUTOGENERATED FILE. DO NOT EDIT!

import { typedQuery } from 'openland-y-graphql/typed';
import { typedMutation } from 'openland-y-graphql/typed';
import * as Types from './Types';
import * as Account from './queries/Account';
import * as Chats from './queries/Chats';
import * as FeatureFlag from './queries/FeatureFlag';
import * as Organization from './queries/Organization';
import * as Permissions from './queries/Permissions';
import * as Settings from './queries/Settings';
import * as User from './queries/User';

export const AccountQuery = typedQuery<Types.Account, {}>(Account.AccountQuery);
export const AccountSettingsQuery = typedQuery<Types.AccountSettings, {}>(Account.AccountSettingsQuery);
export const CreateOrganizationMutation = typedMutation<Types.CreateOrganization, Types.CreateOrganizationVariables>(Account.CreateOrganizationMutation);
export const AccountInviteInfoQuery = typedQuery<Types.AccountInviteInfo, Types.AccountInviteInfoVariables>(Account.AccountInviteInfoQuery);
export const AccountAppInviteInfoQuery = typedQuery<Types.AccountAppInviteInfo, Types.AccountAppInviteInfoVariables>(Account.AccountAppInviteInfoQuery);
export const AccountAppInviteQuery = typedQuery<Types.AccountAppInvite, {}>(Account.AccountAppInviteQuery);
export const AccountInviteJoinMutation = typedMutation<Types.AccountInviteJoin, Types.AccountInviteJoinVariables>(Account.AccountInviteJoinMutation);
export const AccountInvitesQuery = typedQuery<Types.AccountInvites, {}>(Account.AccountInvitesQuery);
export const AccountInvitesHistoryQuery = typedQuery<Types.AccountInvitesHistory, {}>(Account.AccountInvitesHistoryQuery);
export const AccountCreateInviteMutation = typedMutation<Types.AccountCreateInvite, {}>(Account.AccountCreateInviteMutation);
export const AccountDestroyInviteMutation = typedMutation<Types.AccountDestroyInvite, Types.AccountDestroyInviteVariables>(Account.AccountDestroyInviteMutation);
export const ProfilePrefillQuery = typedQuery<Types.ProfilePrefill, {}>(Account.ProfilePrefillQuery);
export const CreateUserProfileAndOrganizationMutation = typedMutation<Types.CreateUserProfileAndOrganization, Types.CreateUserProfileAndOrganizationVariables>(Account.CreateUserProfileAndOrganizationMutation);
export const ChatListQuery = typedQuery<Types.ChatList, Types.ChatListVariables>(Chats.ChatListQuery);
export const ChatLeaveMutation = typedMutation<Types.ChatLeave, Types.ChatLeaveVariables>(Chats.ChatLeaveMutation);
export const MessageSetReactionMutation = typedMutation<Types.MessageSetReaction, Types.MessageSetReactionVariables>(Chats.MessageSetReactionMutation);
export const SwitchReactionMutation = typedMutation<Types.SwitchReaction, Types.SwitchReactionVariables>(Chats.SwitchReactionMutation);
export const MessageUnsetReactionMutation = typedMutation<Types.MessageUnsetReaction, Types.MessageUnsetReactionVariables>(Chats.MessageUnsetReactionMutation);
export const SaveDraftMessageMutation = typedMutation<Types.SaveDraftMessage, Types.SaveDraftMessageVariables>(Chats.SaveDraftMessageMutation);
export const GetDraftMessageQuery = typedQuery<Types.GetDraftMessage, Types.GetDraftMessageVariables>(Chats.GetDraftMessageQuery);
export const GlobalCounterQuery = typedQuery<Types.GlobalCounter, {}>(Chats.GlobalCounterQuery);
export const ChatHistoryQuery = typedQuery<Types.ChatHistory, Types.ChatHistoryVariables>(Chats.ChatHistoryQuery);
export const ChatInfoQuery = typedQuery<Types.ChatInfo, Types.ChatInfoVariables>(Chats.ChatInfoQuery);
export const ChatFullInfoQuery = typedQuery<Types.ChatFullInfo, Types.ChatFullInfoVariables>(Chats.ChatFullInfoQuery);
export const GroupChatFullInfoQuery = typedQuery<Types.GroupChatFullInfo, Types.GroupChatFullInfoVariables>(Chats.GroupChatFullInfoQuery);
export const SendMessageMutation = typedMutation<Types.SendMessage, Types.SendMessageVariables>(Chats.SendMessageMutation);
export const ReplyMessageMutation = typedMutation<Types.ReplyMessage, Types.ReplyMessageVariables>(Chats.ReplyMessageMutation);
export const ChatReadMutation = typedMutation<Types.ChatRead, Types.ChatReadVariables>(Chats.ChatReadMutation);
export const ChatSearchForComposeQuery = typedQuery<Types.ChatSearchForCompose, Types.ChatSearchForComposeVariables>(Chats.ChatSearchForComposeQuery);
export const ChatSearchForComposeMobileQuery = typedQuery<Types.ChatSearchForComposeMobile, Types.ChatSearchForComposeMobileVariables>(Chats.ChatSearchForComposeMobileQuery);
export const ChatSearchGroupQuery = typedQuery<Types.ChatSearchGroup, Types.ChatSearchGroupVariables>(Chats.ChatSearchGroupQuery);
export const ChatCreateGroupMutation = typedMutation<Types.ChatCreateGroup, Types.ChatCreateGroupVariables>(Chats.ChatCreateGroupMutation);
export const ChatCreateIntroMutation = typedMutation<Types.ChatCreateIntro, Types.ChatCreateIntroVariables>(Chats.ChatCreateIntroMutation);
export const ChatEditIntroMutation = typedMutation<Types.ChatEditIntro, Types.ChatEditIntroVariables>(Chats.ChatEditIntroMutation);
export const SetTypingMutation = typedMutation<Types.SetTyping, Types.SetTypingVariables>(Chats.SetTypingMutation);
export const CancelTypingMutation = typedMutation<Types.CancelTyping, Types.CancelTypingVariables>(Chats.CancelTypingMutation);
export const ChatAddMemberMutation = typedMutation<Types.ChatAddMember, Types.ChatAddMemberVariables>(Chats.ChatAddMemberMutation);
export const ChatAddMembersMutation = typedMutation<Types.ChatAddMembers, Types.ChatAddMembersVariables>(Chats.ChatAddMembersMutation);
export const BlockedListQuery = typedQuery<Types.BlockedList, Types.BlockedListVariables>(Chats.BlockedListQuery);
export const BlockUserMutation = typedMutation<Types.BlockUser, Types.BlockUserVariables>(Chats.BlockUserMutation);
export const UnBlockUserMutation = typedMutation<Types.UnBlockUser, Types.UnBlockUserVariables>(Chats.UnBlockUserMutation);
export const ChatSearchTextQuery = typedQuery<Types.ChatSearchText, Types.ChatSearchTextVariables>(Chats.ChatSearchTextQuery);
export const ChatSearchChannelQuery = typedQuery<Types.ChatSearchChannel, Types.ChatSearchChannelVariables>(Chats.ChatSearchChannelQuery);
export const CreateChannelMutation = typedMutation<Types.CreateChannel, Types.CreateChannelVariables>(Chats.CreateChannelMutation);
export const ChannelSetFeaturedMutation = typedMutation<Types.ChannelSetFeatured, Types.ChannelSetFeaturedVariables>(Chats.ChannelSetFeaturedMutation);
export const ChannelSetHiddenMutation = typedMutation<Types.ChannelSetHidden, Types.ChannelSetHiddenVariables>(Chats.ChannelSetHiddenMutation);
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
export const ChatDeleteUrlAugmentationMutation = typedMutation<Types.ChatDeleteUrlAugmentation, Types.ChatDeleteUrlAugmentationVariables>(Chats.ChatDeleteUrlAugmentationMutation);
export const ChatEditMessageMutation = typedMutation<Types.ChatEditMessage, Types.ChatEditMessageVariables>(Chats.ChatEditMessageMutation);
export const SuperChannelAddMemberMutation = typedMutation<Types.SuperChannelAddMember, Types.SuperChannelAddMemberVariables>(Chats.SuperChannelAddMemberMutation);
export const FeatureFlagsQuery = typedQuery<Types.FeatureFlags, {}>(FeatureFlag.FeatureFlagsQuery);
export const FeatureFlagAddMutation = typedMutation<Types.FeatureFlagAdd, Types.FeatureFlagAddVariables>(FeatureFlag.FeatureFlagAddMutation);
export const FeatureFlagEnableMutation = typedMutation<Types.FeatureFlagEnable, Types.FeatureFlagEnableVariables>(FeatureFlag.FeatureFlagEnableMutation);
export const FeatureFlagDisableMutation = typedMutation<Types.FeatureFlagDisable, Types.FeatureFlagDisableVariables>(FeatureFlag.FeatureFlagDisableMutation);
export const MyOrganizationProfileQuery = typedQuery<Types.MyOrganizationProfile, {}>(Organization.MyOrganizationProfileQuery);
export const MyOrganizationsQuery = typedQuery<Types.MyOrganizations, {}>(Organization.MyOrganizationsQuery);
export const UpdateOrganizationMutation = typedMutation<Types.UpdateOrganization, Types.UpdateOrganizationVariables>(Organization.UpdateOrganizationMutation);
export const OrganizationQuery = typedQuery<Types.Organization, Types.OrganizationVariables>(Organization.OrganizationQuery);
export const OrganizationProfileQuery = typedQuery<Types.OrganizationProfile, Types.OrganizationProfileVariables>(Organization.OrganizationProfileQuery);
export const ExploreOrganizationsQuery = typedQuery<Types.ExploreOrganizations, Types.ExploreOrganizationsVariables>(Organization.ExploreOrganizationsQuery);
export const ExploreComunityQuery = typedQuery<Types.ExploreComunity, Types.ExploreComunityVariables>(Organization.ExploreComunityQuery);
export const OrganizationChangeMemberRoleMutation = typedMutation<Types.OrganizationChangeMemberRole, Types.OrganizationChangeMemberRoleVariables>(Organization.OrganizationChangeMemberRoleMutation);
export const OrganizationRemoveMemberMutation = typedMutation<Types.OrganizationRemoveMember, Types.OrganizationRemoveMemberVariables>(Organization.OrganizationRemoveMemberMutation);
export const OrganizationInviteMembersMutation = typedMutation<Types.OrganizationInviteMembers, Types.OrganizationInviteMembersVariables>(Organization.OrganizationInviteMembersMutation);
export const OrganizationPublicInviteQuery = typedQuery<Types.OrganizationPublicInvite, Types.OrganizationPublicInviteVariables>(Organization.OrganizationPublicInviteQuery);
export const OrganizationCreatePublicInviteMutation = typedMutation<Types.OrganizationCreatePublicInvite, Types.OrganizationCreatePublicInviteVariables>(Organization.OrganizationCreatePublicInviteMutation);
export const OrganizationDeletePublicInviteMutation = typedMutation<Types.OrganizationDeletePublicInvite, Types.OrganizationDeletePublicInviteVariables>(Organization.OrganizationDeletePublicInviteMutation);
export const OrganizationActivateByInviteMutation = typedMutation<Types.OrganizationActivateByInvite, Types.OrganizationActivateByInviteVariables>(Organization.OrganizationActivateByInviteMutation);
export const OrganizationAlterPublishedMutation = typedMutation<Types.OrganizationAlterPublished, Types.OrganizationAlterPublishedVariables>(Organization.OrganizationAlterPublishedMutation);
export const OrganizationByPrefixQuery = typedQuery<Types.OrganizationByPrefix, Types.OrganizationByPrefixVariables>(Organization.OrganizationByPrefixQuery);
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
export const ProfileQuery = typedQuery<Types.Profile, {}>(Settings.ProfileQuery);
export const ProfileUpdateMutation = typedMutation<Types.ProfileUpdate, Types.ProfileUpdateVariables>(Settings.ProfileUpdateMutation);
export const ProfileCreateMutation = typedMutation<Types.ProfileCreate, Types.ProfileCreateVariables>(Settings.ProfileCreateMutation);
export const SettingsQuery = typedQuery<Types.Settings, {}>(Settings.SettingsQuery);
export const SettingsUpdateMutation = typedMutation<Types.SettingsUpdate, Types.SettingsUpdateVariables>(Settings.SettingsUpdateMutation);
export const UsersQuery = typedQuery<Types.Users, Types.UsersVariables>(User.UsersQuery);
export const UserQuery = typedQuery<Types.User, Types.UserVariables>(User.UserQuery);
export const OnlineQuery = typedQuery<Types.Online, Types.OnlineVariables>(User.OnlineQuery);
export const ExplorePeopleQuery = typedQuery<Types.ExplorePeople, Types.ExplorePeopleVariables>(User.ExplorePeopleQuery);