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
    async queryAccountSettings(): Promise<Types.AccountSettings> {
        return this.client.query(Source.AccountSettingsQuery);
    }
    async queryAccountInviteInfo(variables: Types.AccountInviteInfoVariables): Promise<Types.AccountInviteInfo> {
        return this.client.query(Source.AccountInviteInfoQuery, variables);
    }
    async queryAccountAppInviteInfo(variables: Types.AccountAppInviteInfoVariables): Promise<Types.AccountAppInviteInfo> {
        return this.client.query(Source.AccountAppInviteInfoQuery, variables);
    }
    async queryAccountAppInvite(): Promise<Types.AccountAppInvite> {
        return this.client.query(Source.AccountAppInviteQuery);
    }
    async queryAccountInvites(): Promise<Types.AccountInvites> {
        return this.client.query(Source.AccountInvitesQuery);
    }
    async queryAccountInvitesHistory(): Promise<Types.AccountInvitesHistory> {
        return this.client.query(Source.AccountInvitesHistoryQuery);
    }
    async queryProfilePrefill(): Promise<Types.ProfilePrefill> {
        return this.client.query(Source.ProfilePrefillQuery);
    }
    async queryMyApps(): Promise<Types.MyApps> {
        return this.client.query(Source.MyAppsQuery);
    }
    async queryDialogs(variables: Types.DialogsVariables): Promise<Types.Dialogs> {
        return this.client.query(Source.DialogsQuery, variables);
    }
    async queryRoom(variables: Types.RoomVariables): Promise<Types.Room> {
        return this.client.query(Source.RoomQuery, variables);
    }
    async queryRoomSuper(variables: Types.RoomSuperVariables): Promise<Types.RoomSuper> {
        return this.client.query(Source.RoomSuperQuery, variables);
    }
    async queryGetDraftMessage(variables: Types.GetDraftMessageVariables): Promise<Types.GetDraftMessage> {
        return this.client.query(Source.GetDraftMessageQuery, variables);
    }
    async queryGlobalCounter(): Promise<Types.GlobalCounter> {
        return this.client.query(Source.GlobalCounterQuery);
    }
    async queryRoomHistory(variables: Types.RoomHistoryVariables): Promise<Types.RoomHistory> {
        return this.client.query(Source.RoomHistoryQuery, variables);
    }
    async queryChatSearchGroup(variables: Types.ChatSearchGroupVariables): Promise<Types.ChatSearchGroup> {
        return this.client.query(Source.ChatSearchGroupQuery, variables);
    }
    async queryRoomSearchText(variables: Types.RoomSearchTextVariables): Promise<Types.RoomSearchText> {
        return this.client.query(Source.RoomSearchTextQuery, variables);
    }
    async queryRoomSearch(variables: Types.RoomSearchVariables): Promise<Types.RoomSearch> {
        return this.client.query(Source.RoomSearchQuery, variables);
    }
    async queryRoomMembers(variables: Types.RoomMembersVariables): Promise<Types.RoomMembers> {
        return this.client.query(Source.RoomMembersQuery, variables);
    }
    async queryRoomInviteLink(variables: Types.RoomInviteLinkVariables): Promise<Types.RoomInviteLink> {
        return this.client.query(Source.RoomInviteLinkQuery, variables);
    }
    async queryRoomInviteInfo(variables: Types.RoomInviteInfoVariables): Promise<Types.RoomInviteInfo> {
        return this.client.query(Source.RoomInviteInfoQuery, variables);
    }
    async queryConference(variables: Types.ConferenceVariables): Promise<Types.Conference> {
        return this.client.query(Source.ConferenceQuery, variables);
    }
    async queryAvailableRooms(): Promise<Types.AvailableRooms> {
        return this.client.query(Source.AvailableRoomsQuery);
    }
    async queryFeatureFlags(): Promise<Types.FeatureFlags> {
        return this.client.query(Source.FeatureFlagsQuery);
    }
    async queryFeedHome(): Promise<Types.FeedHome> {
        return this.client.query(Source.FeedHomeQuery);
    }
    async queryMyOrganizations(): Promise<Types.MyOrganizations> {
        return this.client.query(Source.MyOrganizationsQuery);
    }
    async queryOrganization(variables: Types.OrganizationVariables): Promise<Types.Organization> {
        return this.client.query(Source.OrganizationQuery, variables);
    }
    async queryOrganizationProfile(variables: Types.OrganizationProfileVariables): Promise<Types.OrganizationProfile> {
        return this.client.query(Source.OrganizationProfileQuery, variables);
    }
    async queryExploreOrganizations(variables: Types.ExploreOrganizationsVariables): Promise<Types.ExploreOrganizations> {
        return this.client.query(Source.ExploreOrganizationsQuery, variables);
    }
    async queryExploreComunity(variables: Types.ExploreComunityVariables): Promise<Types.ExploreComunity> {
        return this.client.query(Source.ExploreComunityQuery, variables);
    }
    async queryOrganizationPublicInvite(variables: Types.OrganizationPublicInviteVariables): Promise<Types.OrganizationPublicInvite> {
        return this.client.query(Source.OrganizationPublicInviteQuery, variables);
    }
    async queryOrganizationByPrefix(variables: Types.OrganizationByPrefixVariables): Promise<Types.OrganizationByPrefix> {
        return this.client.query(Source.OrganizationByPrefixQuery, variables);
    }
    async queryPermissions(): Promise<Types.Permissions> {
        return this.client.query(Source.PermissionsQuery);
    }
    async querySuperAdmins(): Promise<Types.SuperAdmins> {
        return this.client.query(Source.SuperAdminsQuery);
    }
    async querySuperAccounts(): Promise<Types.SuperAccounts> {
        return this.client.query(Source.SuperAccountsQuery);
    }
    async querySuperAccount(variables: Types.SuperAccountVariables): Promise<Types.SuperAccount> {
        return this.client.query(Source.SuperAccountQuery, variables);
    }
    async queryProfile(): Promise<Types.Profile> {
        return this.client.query(Source.ProfileQuery);
    }
    async querySettings(): Promise<Types.Settings> {
        return this.client.query(Source.SettingsQuery);
    }
    async queryUsers(variables: Types.UsersVariables): Promise<Types.Users> {
        return this.client.query(Source.UsersQuery, variables);
    }
    async queryUser(variables: Types.UserVariables): Promise<Types.User> {
        return this.client.query(Source.UserQuery, variables);
    }
    async queryOnline(variables: Types.OnlineVariables): Promise<Types.Online> {
        return this.client.query(Source.OnlineQuery, variables);
    }
    async queryExplorePeople(variables: Types.ExplorePeopleVariables): Promise<Types.ExplorePeople> {
        return this.client.query(Source.ExplorePeopleQuery, variables);
    }
    async queryResolveShortName(variables: Types.ResolveShortNameVariables): Promise<Types.ResolveShortName> {
        return this.client.query(Source.ResolveShortNameQuery, variables);
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
    async mutateCreateApp(variables: Types.CreateAppVariables): Promise<Types.CreateApp> {
        return this.client.mutate(Source.CreateAppMutation, variables);
    }
    async mutateUpdateApp(variables: Types.UpdateAppVariables): Promise<Types.UpdateApp> {
        return this.client.mutate(Source.UpdateAppMutation, variables);
    }
    async mutateRefreshAppToken(variables: Types.RefreshAppTokenVariables): Promise<Types.RefreshAppToken> {
        return this.client.mutate(Source.RefreshAppTokenMutation, variables);
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
