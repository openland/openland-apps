// WARNING! THIS IS AUTOGENERATED FILE. DO NOT EDIT!

import { typedQuery } from 'openland-y-graphql/typed';
import { typedMutation } from 'openland-y-graphql/typed';
import * as Types from './Types';
import * as Account from './queries/Account';
import * as App from './queries/App';
import * as Chats from './queries/Chats';
import * as Conferences from './queries/Conferences';
import * as Explore from './queries/Explore';
import * as FeatureFlag from './queries/FeatureFlag';
import * as Feed from './queries/Feed';
import * as Organization from './queries/Organization';
import * as Permissions from './queries/Permissions';
import * as Settings from './queries/Settings';
import * as Track from './queries/Track';
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
export const ReportOnlineMutation = typedMutation<Types.ReportOnline, Types.ReportOnlineVariables>(Account.ReportOnlineMutation);
export const RegisterPushMutation = typedMutation<Types.RegisterPush, Types.RegisterPushVariables>(Account.RegisterPushMutation);
export const MyAppsQuery = typedQuery<Types.MyApps, {}>(App.MyAppsQuery);
export const CreateAppMutation = typedMutation<Types.CreateApp, Types.CreateAppVariables>(App.CreateAppMutation);
export const UpdateAppMutation = typedMutation<Types.UpdateApp, Types.UpdateAppVariables>(App.UpdateAppMutation);
export const RefreshAppTokenMutation = typedMutation<Types.RefreshAppToken, Types.RefreshAppTokenVariables>(App.RefreshAppTokenMutation);
export const AddAppToChatMutation = typedMutation<Types.AddAppToChat, Types.AddAppToChatVariables>(App.AddAppToChatMutation);
export const DialogsQuery = typedQuery<Types.Dialogs, Types.DialogsVariables>(Chats.DialogsQuery);
export const RoomQuery = typedQuery<Types.Room, Types.RoomVariables>(Chats.RoomQuery);
export const RoomTinyQuery = typedQuery<Types.RoomTiny, Types.RoomTinyVariables>(Chats.RoomTinyQuery);
export const RoomSuperQuery = typedQuery<Types.RoomSuper, Types.RoomSuperVariables>(Chats.RoomSuperQuery);
export const MessageSetReactionMutation = typedMutation<Types.MessageSetReaction, Types.MessageSetReactionVariables>(Chats.MessageSetReactionMutation);
export const SwitchReactionMutation = typedMutation<Types.SwitchReaction, Types.SwitchReactionVariables>(Chats.SwitchReactionMutation);
export const MessageUnsetReactionMutation = typedMutation<Types.MessageUnsetReaction, Types.MessageUnsetReactionVariables>(Chats.MessageUnsetReactionMutation);
export const SendPostMessageMutation = typedMutation<Types.SendPostMessage, Types.SendPostMessageVariables>(Chats.SendPostMessageMutation);
export const EditPostMessageMutation = typedMutation<Types.EditPostMessage, Types.EditPostMessageVariables>(Chats.EditPostMessageMutation);
export const RespondPostMessageMutation = typedMutation<Types.RespondPostMessage, Types.RespondPostMessageVariables>(Chats.RespondPostMessageMutation);
export const SaveDraftMessageMutation = typedMutation<Types.SaveDraftMessage, Types.SaveDraftMessageVariables>(Chats.SaveDraftMessageMutation);
export const GetDraftMessageQuery = typedQuery<Types.GetDraftMessage, Types.GetDraftMessageVariables>(Chats.GetDraftMessageQuery);
export const GlobalCounterQuery = typedQuery<Types.GlobalCounter, {}>(Chats.GlobalCounterQuery);
export const ChatHistoryQuery = typedQuery<Types.ChatHistory, Types.ChatHistoryVariables>(Chats.ChatHistoryQuery);
export const SendMessageMutation = typedMutation<Types.SendMessage, Types.SendMessageVariables>(Chats.SendMessageMutation);
export const ReplyMessageMutation = typedMutation<Types.ReplyMessage, Types.ReplyMessageVariables>(Chats.ReplyMessageMutation);
export const RoomReadMutation = typedMutation<Types.RoomRead, Types.RoomReadVariables>(Chats.RoomReadMutation);
export const ChatSearchGroupQuery = typedQuery<Types.ChatSearchGroup, Types.ChatSearchGroupVariables>(Chats.ChatSearchGroupQuery);
export const RoomCreateMutation = typedMutation<Types.RoomCreate, Types.RoomCreateVariables>(Chats.RoomCreateMutation);
export const RoomCreateIntroMutation = typedMutation<Types.RoomCreateIntro, Types.RoomCreateIntroVariables>(Chats.RoomCreateIntroMutation);
export const RoomEditIntroMutation = typedMutation<Types.RoomEditIntro, Types.RoomEditIntroVariables>(Chats.RoomEditIntroMutation);
export const SetTypingMutation = typedMutation<Types.SetTyping, Types.SetTypingVariables>(Chats.SetTypingMutation);
export const CancelTypingMutation = typedMutation<Types.CancelTyping, Types.CancelTypingVariables>(Chats.CancelTypingMutation);
export const RoomAddMemberMutation = typedMutation<Types.RoomAddMember, Types.RoomAddMemberVariables>(Chats.RoomAddMemberMutation);
export const RoomDeclineJoinReuestMutation = typedMutation<Types.RoomDeclineJoinReuest, Types.RoomDeclineJoinReuestVariables>(Chats.RoomDeclineJoinReuestMutation);
export const RoomAddMembersMutation = typedMutation<Types.RoomAddMembers, Types.RoomAddMembersVariables>(Chats.RoomAddMembersMutation);
export const RoomKickMutation = typedMutation<Types.RoomKick, Types.RoomKickVariables>(Chats.RoomKickMutation);
export const RoomLeaveMutation = typedMutation<Types.RoomLeave, Types.RoomLeaveVariables>(Chats.RoomLeaveMutation);
export const RoomSearchTextQuery = typedQuery<Types.RoomSearchText, Types.RoomSearchTextVariables>(Chats.RoomSearchTextQuery);
export const RoomSearchQuery = typedQuery<Types.RoomSearch, Types.RoomSearchVariables>(Chats.RoomSearchQuery);
export const RoomAlterFeaturedMutation = typedMutation<Types.RoomAlterFeatured, Types.RoomAlterFeaturedVariables>(Chats.RoomAlterFeaturedMutation);
export const RoomAlterHiddenMutation = typedMutation<Types.RoomAlterHidden, Types.RoomAlterHiddenVariables>(Chats.RoomAlterHiddenMutation);
export const RoomMembersShortQuery = typedQuery<Types.RoomMembersShort, Types.RoomMembersShortVariables>(Chats.RoomMembersShortQuery);
export const RoomMembersQuery = typedQuery<Types.RoomMembers, Types.RoomMembersVariables>(Chats.RoomMembersQuery);
export const RoomSettingsUpdateMutation = typedMutation<Types.RoomSettingsUpdate, Types.RoomSettingsUpdateVariables>(Chats.RoomSettingsUpdateMutation);
export const RoomJoinMutation = typedMutation<Types.RoomJoin, Types.RoomJoinVariables>(Chats.RoomJoinMutation);
export const RoomSendEmailInviteMutation = typedMutation<Types.RoomSendEmailInvite, Types.RoomSendEmailInviteVariables>(Chats.RoomSendEmailInviteMutation);
export const RoomJoinInviteLinkMutation = typedMutation<Types.RoomJoinInviteLink, Types.RoomJoinInviteLinkVariables>(Chats.RoomJoinInviteLinkMutation);
export const RoomRenewInviteLinkMutation = typedMutation<Types.RoomRenewInviteLink, Types.RoomRenewInviteLinkVariables>(Chats.RoomRenewInviteLinkMutation);
export const RoomInviteLinkQuery = typedQuery<Types.RoomInviteLink, Types.RoomInviteLinkVariables>(Chats.RoomInviteLinkQuery);
export const RoomInviteInfoQuery = typedQuery<Types.RoomInviteInfo, Types.RoomInviteInfoVariables>(Chats.RoomInviteInfoQuery);
export const RoomUpdateMutation = typedMutation<Types.RoomUpdate, Types.RoomUpdateVariables>(Chats.RoomUpdateMutation);
export const RoomDeleteMessageMutation = typedMutation<Types.RoomDeleteMessage, Types.RoomDeleteMessageVariables>(Chats.RoomDeleteMessageMutation);
export const RoomDeleteMessagesMutation = typedMutation<Types.RoomDeleteMessages, Types.RoomDeleteMessagesVariables>(Chats.RoomDeleteMessagesMutation);
export const RoomDeleteUrlAugmentationMutation = typedMutation<Types.RoomDeleteUrlAugmentation, Types.RoomDeleteUrlAugmentationVariables>(Chats.RoomDeleteUrlAugmentationMutation);
export const RoomEditMessageMutation = typedMutation<Types.RoomEditMessage, Types.RoomEditMessageVariables>(Chats.RoomEditMessageMutation);
export const MarkSequenceReadMutation = typedMutation<Types.MarkSequenceRead, Types.MarkSequenceReadVariables>(Chats.MarkSequenceReadMutation);
export const ConferenceQuery = typedQuery<Types.Conference, Types.ConferenceVariables>(Conferences.ConferenceQuery);
export const ConferenceMediaQuery = typedQuery<Types.ConferenceMedia, Types.ConferenceMediaVariables>(Conferences.ConferenceMediaQuery);
export const ConferenceJoinMutation = typedMutation<Types.ConferenceJoin, Types.ConferenceJoinVariables>(Conferences.ConferenceJoinMutation);
export const ConferenceLeaveMutation = typedMutation<Types.ConferenceLeave, Types.ConferenceLeaveVariables>(Conferences.ConferenceLeaveMutation);
export const ConferenceKeepAliveMutation = typedMutation<Types.ConferenceKeepAlive, Types.ConferenceKeepAliveVariables>(Conferences.ConferenceKeepAliveMutation);
export const ConferenceOfferMutation = typedMutation<Types.ConferenceOffer, Types.ConferenceOfferVariables>(Conferences.ConferenceOfferMutation);
export const ConferenceAnswerMutation = typedMutation<Types.ConferenceAnswer, Types.ConferenceAnswerVariables>(Conferences.ConferenceAnswerMutation);
export const ConferenceCandidateMutation = typedMutation<Types.ConferenceCandidate, Types.ConferenceCandidateVariables>(Conferences.ConferenceCandidateMutation);
export const MediaOfferMutation = typedMutation<Types.MediaOffer, Types.MediaOfferVariables>(Conferences.MediaOfferMutation);
export const MediaAnswerMutation = typedMutation<Types.MediaAnswer, Types.MediaAnswerVariables>(Conferences.MediaAnswerMutation);
export const MediaCandidateMutation = typedMutation<Types.MediaCandidate, Types.MediaCandidateVariables>(Conferences.MediaCandidateMutation);
export const AvailableRoomsQuery = typedQuery<Types.AvailableRooms, {}>(Explore.AvailableRoomsQuery);
export const GlobalSearchQuery = typedQuery<Types.GlobalSearch, Types.GlobalSearchVariables>(Explore.GlobalSearchQuery);
export const FeatureFlagsQuery = typedQuery<Types.FeatureFlags, {}>(FeatureFlag.FeatureFlagsQuery);
export const FeatureFlagAddMutation = typedMutation<Types.FeatureFlagAdd, Types.FeatureFlagAddVariables>(FeatureFlag.FeatureFlagAddMutation);
export const FeatureFlagEnableMutation = typedMutation<Types.FeatureFlagEnable, Types.FeatureFlagEnableVariables>(FeatureFlag.FeatureFlagEnableMutation);
export const FeatureFlagDisableMutation = typedMutation<Types.FeatureFlagDisable, Types.FeatureFlagDisableVariables>(FeatureFlag.FeatureFlagDisableMutation);
export const FeedHomeQuery = typedQuery<Types.FeedHome, {}>(Feed.FeedHomeQuery);
export const FeedPostMutation = typedMutation<Types.FeedPost, Types.FeedPostVariables>(Feed.FeedPostMutation);
export const MyOrganizationsQuery = typedQuery<Types.MyOrganizations, {}>(Organization.MyOrganizationsQuery);
export const UpdateOrganizationMutation = typedMutation<Types.UpdateOrganization, Types.UpdateOrganizationVariables>(Organization.UpdateOrganizationMutation);
export const SetOrgShortnameMutation = typedMutation<Types.SetOrgShortname, Types.SetOrgShortnameVariables>(Organization.SetOrgShortnameMutation);
export const OrganizationQuery = typedQuery<Types.Organization, Types.OrganizationVariables>(Organization.OrganizationQuery);
export const OrganizationMembersShortQuery = typedQuery<Types.OrganizationMembersShort, Types.OrganizationMembersShortVariables>(Organization.OrganizationMembersShortQuery);
export const OrganizationProfileQuery = typedQuery<Types.OrganizationProfile, Types.OrganizationProfileVariables>(Organization.OrganizationProfileQuery);
export const ExploreOrganizationsQuery = typedQuery<Types.ExploreOrganizations, Types.ExploreOrganizationsVariables>(Organization.ExploreOrganizationsQuery);
export const ExploreComunityQuery = typedQuery<Types.ExploreComunity, Types.ExploreComunityVariables>(Organization.ExploreComunityQuery);
export const OrganizationChangeMemberRoleMutation = typedMutation<Types.OrganizationChangeMemberRole, Types.OrganizationChangeMemberRoleVariables>(Organization.OrganizationChangeMemberRoleMutation);
export const OrganizationAddMemberMutation = typedMutation<Types.OrganizationAddMember, Types.OrganizationAddMemberVariables>(Organization.OrganizationAddMemberMutation);
export const OrganizationRemoveMemberMutation = typedMutation<Types.OrganizationRemoveMember, Types.OrganizationRemoveMemberVariables>(Organization.OrganizationRemoveMemberMutation);
export const OrganizationInviteMembersMutation = typedMutation<Types.OrganizationInviteMembers, Types.OrganizationInviteMembersVariables>(Organization.OrganizationInviteMembersMutation);
export const OrganizationPublicInviteQuery = typedQuery<Types.OrganizationPublicInvite, Types.OrganizationPublicInviteVariables>(Organization.OrganizationPublicInviteQuery);
export const OrganizationCreatePublicInviteMutation = typedMutation<Types.OrganizationCreatePublicInvite, Types.OrganizationCreatePublicInviteVariables>(Organization.OrganizationCreatePublicInviteMutation);
export const DeleteOrganizationMutation = typedMutation<Types.DeleteOrganization, Types.DeleteOrganizationVariables>(Organization.DeleteOrganizationMutation);
export const OrganizationMemberRemoveMutation = typedMutation<Types.OrganizationMemberRemove, Types.OrganizationMemberRemoveVariables>(Organization.OrganizationMemberRemoveMutation);
export const OrganizationActivateByInviteMutation = typedMutation<Types.OrganizationActivateByInvite, Types.OrganizationActivateByInviteVariables>(Organization.OrganizationActivateByInviteMutation);
export const OrganizationAlterPublishedMutation = typedMutation<Types.OrganizationAlterPublished, Types.OrganizationAlterPublishedVariables>(Organization.OrganizationAlterPublishedMutation);
export const OrganizationByPrefixQuery = typedQuery<Types.OrganizationByPrefix, Types.OrganizationByPrefixVariables>(Organization.OrganizationByPrefixQuery);
export const PermissionsQuery = typedQuery<Types.Permissions, {}>(Permissions.PermissionsQuery);
export const DebugMailsMutation = typedMutation<Types.DebugMails, Types.DebugMailsVariables>(Permissions.DebugMailsMutation);
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
export const SetUserShortnameMutation = typedMutation<Types.SetUserShortname, Types.SetUserShortnameVariables>(Settings.SetUserShortnameMutation);
export const ProfileCreateMutation = typedMutation<Types.ProfileCreate, Types.ProfileCreateVariables>(Settings.ProfileCreateMutation);
export const SettingsQuery = typedQuery<Types.Settings, {}>(Settings.SettingsQuery);
export const SettingsUpdateMutation = typedMutation<Types.SettingsUpdate, Types.SettingsUpdateVariables>(Settings.SettingsUpdateMutation);
export const PersistEventsMutation = typedMutation<Types.PersistEvents, Types.PersistEventsVariables>(Track.PersistEventsMutation);
export const UsersQuery = typedQuery<Types.Users, Types.UsersVariables>(User.UsersQuery);
export const UserQuery = typedQuery<Types.User, Types.UserVariables>(User.UserQuery);
export const OnlineQuery = typedQuery<Types.Online, Types.OnlineVariables>(User.OnlineQuery);
export const ExplorePeopleQuery = typedQuery<Types.ExplorePeople, Types.ExplorePeopleVariables>(User.ExplorePeopleQuery);
export const ResolveShortNameQuery = typedQuery<Types.ResolveShortName, Types.ResolveShortNameVariables>(User.ResolveShortNameQuery);