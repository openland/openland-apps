/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Account
// ====================================================

export interface Account_me_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface Account_me {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: Account_me_primaryOrganization | null;
}

export interface Account_sessionState {
  __typename: "SessionState";
  isLoggedIn: boolean;
  isProfileCreated: boolean;
  isAccountActivated: boolean;
  isAccountExists: boolean;
  /**
   * deprecated
   */
  isAccountPicked: boolean;
  isCompleted: boolean;
  isBlocked: boolean;
}

export interface Account_myPermissions {
  __typename: "Permissions";
  roles: string[];
}

export interface Account {
  me: Account_me | null;
  sessionState: Account_sessionState;
  myPermissions: Account_myPermissions;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountSettings
// ====================================================

export interface AccountSettings_me_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface AccountSettings_me {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: AccountSettings_me_primaryOrganization | null;
}

export interface AccountSettings_organizations {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface AccountSettings {
  me: AccountSettings_me | null;
  organizations: AccountSettings_organizations[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Settings
// ====================================================

export interface Settings_settings {
  __typename: "Settings";
  id: string;
  primaryEmail: string;
  emailFrequency: EmailFrequency;
  desktopNotifications: NotificationMessages;
  mobileNotifications: NotificationMessages;
  mobileAlert: boolean;
  mobileIncludeText: boolean;
}

export interface Settings {
  settings: Settings_settings;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateOrganization
// ====================================================

export interface CreateOrganization_organization {
  __typename: "OrganizationProfile";
  id: string;
  name: string;
}

export interface CreateOrganization {
  organization: CreateOrganization_organization;
}

export interface CreateOrganizationVariables {
  input: CreateOrganizationInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountInviteInfo
// ====================================================

export interface AccountInviteInfo_invite_creator_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface AccountInviteInfo_invite_creator {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: AccountInviteInfo_invite_creator_primaryOrganization | null;
}

export interface AccountInviteInfo_invite {
  __typename: "InviteInfo";
  id: string;
  key: string;
  orgId: string;
  title: string;
  photo: string | null;
  joined: boolean;
  creator: AccountInviteInfo_invite_creator | null;
  forEmail: string | null;
  forName: string | null;
}

export interface AccountInviteInfo {
  invite: AccountInviteInfo_invite | null;
}

export interface AccountInviteInfoVariables {
  inviteKey: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountAppInviteInfo
// ====================================================

export interface AccountAppInviteInfo_invite_creator_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface AccountAppInviteInfo_invite_creator {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: AccountAppInviteInfo_invite_creator_primaryOrganization | null;
}

export interface AccountAppInviteInfo_invite {
  __typename: "InviteInfo";
  creator: AccountAppInviteInfo_invite_creator | null;
}

export interface AccountAppInviteInfo_appInvite_inviter_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface AccountAppInviteInfo_appInvite_inviter {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: AccountAppInviteInfo_appInvite_inviter_primaryOrganization | null;
}

export interface AccountAppInviteInfo_appInvite {
  __typename: "AppInvite";
  inviter: AccountAppInviteInfo_appInvite_inviter;
}

export interface AccountAppInviteInfo {
  invite: AccountAppInviteInfo_invite | null;
  appInvite: AccountAppInviteInfo_appInvite | null;
}

export interface AccountAppInviteInfoVariables {
  inviteKey: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountAppInvite
// ====================================================

export interface AccountAppInvite {
  invite: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AccountInviteJoin
// ====================================================

export interface AccountInviteJoin {
  alphaJoinInvite: string;
}

export interface AccountInviteJoinVariables {
  inviteKey: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountInvites
// ====================================================

export interface AccountInvites_invites {
  __typename: "Invite";
  id: string;
  key: string;
}

export interface AccountInvites {
  invites: AccountInvites_invites[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountInvitesHistory
// ====================================================

export interface AccountInvitesHistory_invites_acceptedBy {
  __typename: "User";
  id: string;
  name: string;
  picture: string | null;
}

export interface AccountInvitesHistory_invites {
  __typename: "InviteHistotyInfo";
  forEmail: string;
  isGlobal: boolean;
  acceptedBy: AccountInvitesHistory_invites_acceptedBy | null;
}

export interface AccountInvitesHistory {
  invites: AccountInvitesHistory_invites[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AccountCreateInvite
// ====================================================

export interface AccountCreateInvite_alphaCreateInvite {
  __typename: "Invite";
  id: string;
  key: string;
}

export interface AccountCreateInvite {
  alphaCreateInvite: AccountCreateInvite_alphaCreateInvite;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AccountDestroyInvite
// ====================================================

export interface AccountDestroyInvite {
  alphaDeleteInvite: string;
}

export interface AccountDestroyInviteVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfilePrefill
// ====================================================

export interface ProfilePrefill_prefill {
  __typename: "ProfilePrefill";
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
}

export interface ProfilePrefill {
  prefill: ProfilePrefill_prefill | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUserProfileAndOrganization
// ====================================================

export interface CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user_primaryOrganization | null;
}

export interface CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_organization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization {
  __typename: "AlphaSignupData";
  user: CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user | null;
  organization: CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_organization | null;
}

export interface CreateUserProfileAndOrganization {
  alphaCreateUserProfileAndOrganization: CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization;
}

export interface CreateUserProfileAndOrganizationVariables {
  user: ProfileInput;
  organization: CreateOrganizationInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReportOnline
// ====================================================

export interface ReportOnline {
  presenceReportOnline: string;
}

export interface ReportOnlineVariables {
  active?: boolean | null;
  platform?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterPush
// ====================================================

export interface RegisterPush {
  registerPush: string;
}

export interface RegisterPushVariables {
  endpoint: string;
  type: PushType;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchPushSettings
// ====================================================

export interface FetchPushSettings_pushSettings {
  __typename: "PushSettings";
  webPushKey: string | null;
}

export interface FetchPushSettings {
  pushSettings: FetchPushSettings_pushSettings;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterWebPush
// ====================================================

export interface RegisterWebPush {
  registerWebPush: string;
}

export interface RegisterWebPushVariables {
  endpoint: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyApps
// ====================================================

export interface MyApps_apps_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyApps_apps_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: MyApps_apps_photoRef_crop | null;
}

export interface MyApps_apps_token {
  __typename: "AppToken";
  salt: string;
}

export interface MyApps_apps {
  __typename: "AppProfile";
  id: string;
  name: string;
  shortname: string | null;
  photoRef: MyApps_apps_photoRef | null;
  about: string | null;
  token: MyApps_apps_token;
}

export interface MyApps {
  apps: MyApps_apps[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateApp
// ====================================================

export interface CreateApp_createApp_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CreateApp_createApp_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: CreateApp_createApp_photoRef_crop | null;
}

export interface CreateApp_createApp_token {
  __typename: "AppToken";
  salt: string;
}

export interface CreateApp_createApp {
  __typename: "AppProfile";
  id: string;
  name: string;
  shortname: string | null;
  photoRef: CreateApp_createApp_photoRef | null;
  about: string | null;
  token: CreateApp_createApp_token;
}

export interface CreateApp {
  createApp: CreateApp_createApp;
}

export interface CreateAppVariables {
  name: string;
  shortname?: string | null;
  photoRef?: ImageRefInput | null;
  about?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateApp
// ====================================================

export interface UpdateApp_updateAppProfile_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface UpdateApp_updateAppProfile_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: UpdateApp_updateAppProfile_photoRef_crop | null;
}

export interface UpdateApp_updateAppProfile_token {
  __typename: "AppToken";
  salt: string;
}

export interface UpdateApp_updateAppProfile {
  __typename: "AppProfile";
  id: string;
  name: string;
  shortname: string | null;
  photoRef: UpdateApp_updateAppProfile_photoRef | null;
  about: string | null;
  token: UpdateApp_updateAppProfile_token;
}

export interface UpdateApp {
  updateAppProfile: UpdateApp_updateAppProfile;
}

export interface UpdateAppVariables {
  appId: string;
  input: AppProfileInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RefreshAppToken
// ====================================================

export interface RefreshAppToken_refreshAppToken_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RefreshAppToken_refreshAppToken_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: RefreshAppToken_refreshAppToken_photoRef_crop | null;
}

export interface RefreshAppToken_refreshAppToken_token {
  __typename: "AppToken";
  salt: string;
}

export interface RefreshAppToken_refreshAppToken {
  __typename: "AppProfile";
  id: string;
  name: string;
  shortname: string | null;
  photoRef: RefreshAppToken_refreshAppToken_photoRef | null;
  about: string | null;
  token: RefreshAppToken_refreshAppToken_token;
}

export interface RefreshAppToken {
  refreshAppToken: RefreshAppToken_refreshAppToken;
}

export interface RefreshAppTokenVariables {
  appId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddAppToChat
// ====================================================

export interface AddAppToChat_addAppToChat_chat_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
}

export interface AddAppToChat_addAppToChat_chat_SharedRoom {
  __typename: "SharedRoom";
  id: string;
}

export type AddAppToChat_addAppToChat_chat = AddAppToChat_addAppToChat_chat_PrivateRoom | AddAppToChat_addAppToChat_chat_SharedRoom;

export interface AddAppToChat_addAppToChat {
  __typename: "AppChat";
  chat: AddAppToChat_addAppToChat_chat;
  webhook: string;
}

export interface AddAppToChat {
  addAppToChat: AddAppToChat_addAppToChat;
}

export interface AddAppToChatVariables {
  appId: string;
  chatId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Dialogs
// ====================================================

export interface Dialogs_dialogs_items_topMessage_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface Dialogs_dialogs_items_topMessage_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: Dialogs_dialogs_items_topMessage_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface Dialogs_dialogs_items_topMessage_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface Dialogs_dialogs_items_topMessage_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface Dialogs_dialogs_items_topMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface Dialogs_dialogs_items_topMessage_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: Dialogs_dialogs_items_topMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type Dialogs_dialogs_items_topMessage_GeneralMessage_attachments = Dialogs_dialogs_items_topMessage_GeneralMessage_attachments_MessageAttachmentPost | Dialogs_dialogs_items_topMessage_GeneralMessage_attachments_MessageAttachmentFile;

export interface Dialogs_dialogs_items_topMessage_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface Dialogs_dialogs_items_topMessage_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: Dialogs_dialogs_items_topMessage_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: Dialogs_dialogs_items_topMessage_GeneralMessage_attachments[];
  quotedMessages: Dialogs_dialogs_items_topMessage_GeneralMessage_quotedMessages[];
}

export type Dialogs_dialogs_items_topMessage = Dialogs_dialogs_items_topMessage_ServiceMessage | Dialogs_dialogs_items_topMessage_GeneralMessage;

export interface Dialogs_dialogs_items {
  __typename: "Dialog";
  cid: string;
  fid: string;
  kind: DialogKind;
  title: string;
  photo: string;
  unreadCount: number;
  isMuted: boolean;
  haveMention: boolean;
  topMessage: Dialogs_dialogs_items_topMessage | null;
}

export interface Dialogs_dialogs {
  __typename: "DialogsConnection";
  items: Dialogs_dialogs_items[];
  cursor: string | null;
}

export interface Dialogs_state {
  __typename: "DialogUpdateState";
  state: string | null;
}

export interface Dialogs_counter {
  __typename: "NotificationCounter";
  id: string;
  unreadCount: number;
}

export interface Dialogs {
  dialogs: Dialogs_dialogs;
  state: Dialogs_state;
  counter: Dialogs_counter;
}

export interface DialogsVariables {
  after?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ChatWatch
// ====================================================

export interface ChatWatch_event_ChatUpdateSingle_update_ChatUpdated {
  __typename: "ChatUpdated" | "ChatLostAccess";
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments[];
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_reactions {
  __typename: "ModernMessageReaction";
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_reactions_user;
  reaction: MessageReactionType;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_attachments[];
  quotedMessages: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_quotedMessages[];
  reactions: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage_reactions[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata";
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users[] | null;
  invitedBy: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata {
  __typename: "TitleChangeServiceMetadata";
  title: string;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata {
  __typename: "PhotoChangeServiceMetadata";
  photo: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata {
  __typename: "PostRespondServiceMetadata";
  respondType: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_spans[];
  serviceMetadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage_serviceMetadata | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message = ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_GeneralMessage | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message_ServiceMessage;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived {
  __typename: "ChatMessageReceived";
  message: ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived_message;
  repeatKey: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments[];
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_reactions {
  __typename: "ModernMessageReaction";
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_reactions_user;
  reaction: MessageReactionType;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_attachments[];
  quotedMessages: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_quotedMessages[];
  reactions: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage_reactions[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata";
  users: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users[] | null;
  invitedBy: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata {
  __typename: "TitleChangeServiceMetadata";
  title: string;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata {
  __typename: "PhotoChangeServiceMetadata";
  photo: string | null;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata {
  __typename: "PostRespondServiceMetadata";
  respondType: string;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_spans[];
  serviceMetadata: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage_serviceMetadata | null;
}

export type ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message = ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_GeneralMessage | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message_ServiceMessage;

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated {
  __typename: "ChatMessageUpdated";
  message: ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated_message;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageDeleted_message {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface ChatWatch_event_ChatUpdateSingle_update_ChatMessageDeleted {
  __typename: "ChatMessageDeleted";
  message: ChatWatch_event_ChatUpdateSingle_update_ChatMessageDeleted_message;
}

export type ChatWatch_event_ChatUpdateSingle_update = ChatWatch_event_ChatUpdateSingle_update_ChatUpdated | ChatWatch_event_ChatUpdateSingle_update_ChatMessageReceived | ChatWatch_event_ChatUpdateSingle_update_ChatMessageUpdated | ChatWatch_event_ChatUpdateSingle_update_ChatMessageDeleted;

export interface ChatWatch_event_ChatUpdateSingle {
  __typename: "ChatUpdateSingle";
  seq: number;
  state: string;
  update: ChatWatch_event_ChatUpdateSingle_update;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatUpdated {
  __typename: "ChatUpdated" | "ChatLostAccess";
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments[];
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_reactions {
  __typename: "ModernMessageReaction";
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_reactions_user;
  reaction: MessageReactionType;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_attachments[];
  quotedMessages: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_quotedMessages[];
  reactions: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage_reactions[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata";
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users[] | null;
  invitedBy: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata {
  __typename: "TitleChangeServiceMetadata";
  title: string;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata {
  __typename: "PhotoChangeServiceMetadata";
  photo: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata {
  __typename: "PostRespondServiceMetadata";
  respondType: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_spans[];
  serviceMetadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage_serviceMetadata | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_GeneralMessage | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message_ServiceMessage;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived {
  __typename: "ChatMessageReceived";
  message: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived_message;
  repeatKey: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments[];
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_reactions {
  __typename: "ModernMessageReaction";
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_reactions_user;
  reaction: MessageReactionType;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_attachments[];
  quotedMessages: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_quotedMessages[];
  reactions: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage_reactions[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanLink;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata";
  users: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users[] | null;
  invitedBy: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata {
  __typename: "TitleChangeServiceMetadata";
  title: string;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata {
  __typename: "PhotoChangeServiceMetadata";
  photo: string | null;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata {
  __typename: "PostRespondServiceMetadata";
  respondType: string;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_spans[];
  serviceMetadata: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage_serviceMetadata | null;
}

export type ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message = ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_GeneralMessage | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message_ServiceMessage;

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated {
  __typename: "ChatMessageUpdated";
  message: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated_message;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageDeleted_message {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface ChatWatch_event_ChatUpdateBatch_updates_ChatMessageDeleted {
  __typename: "ChatMessageDeleted";
  message: ChatWatch_event_ChatUpdateBatch_updates_ChatMessageDeleted_message;
}

export type ChatWatch_event_ChatUpdateBatch_updates = ChatWatch_event_ChatUpdateBatch_updates_ChatUpdated | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageReceived | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageUpdated | ChatWatch_event_ChatUpdateBatch_updates_ChatMessageDeleted;

export interface ChatWatch_event_ChatUpdateBatch {
  __typename: "ChatUpdateBatch";
  fromSeq: number;
  seq: number;
  state: string;
  updates: ChatWatch_event_ChatUpdateBatch_updates[];
}

export type ChatWatch_event = ChatWatch_event_ChatUpdateSingle | ChatWatch_event_ChatUpdateBatch;

export interface ChatWatch {
  event: ChatWatch_event;
}

export interface ChatWatchVariables {
  chatId: string;
  fromState?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: DialogsWatch
// ====================================================

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_attachments = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_attachments[];
  quotedMessages: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage_quotedMessages[];
}

export type DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_ServiceMessage | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message_GeneralMessage;

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived {
  __typename: "DialogMessageReceived";
  cid: string;
  unread: number;
  globalUnread: number;
  message: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived_message;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_attachments = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_attachments[];
  quotedMessages: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage_quotedMessages[];
}

export type DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_ServiceMessage | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message_GeneralMessage;

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated {
  __typename: "DialogMessageUpdated";
  cid: string;
  message: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated_message;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_attachments = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentPost | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_attachments[];
  quotedMessages: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage_quotedMessages[];
}

export type DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_ServiceMessage | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message_GeneralMessage;

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_attachments = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentPost | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_attachments[];
  quotedMessages: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage_quotedMessages[];
}

export type DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_ServiceMessage | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage_GeneralMessage;

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted {
  __typename: "DialogMessageDeleted";
  cid: string;
  message: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_message;
  prevMessage: DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted_prevMessage | null;
  unread: number;
  globalUnread: number;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMessageRead {
  __typename: "DialogMessageRead";
  cid: string;
  unread: number;
  globalUnread: number;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogTitleUpdated {
  __typename: "DialogTitleUpdated";
  cid: string;
  title: string;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMuteChanged {
  __typename: "DialogMuteChanged";
  cid: string;
  mute: boolean;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogMentionedChanged {
  __typename: "DialogMentionedChanged";
  cid: string;
  haveMention: boolean;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogPhotoUpdated {
  __typename: "DialogPhotoUpdated";
  cid: string;
  photo: string | null;
}

export interface DialogsWatch_event_DialogUpdateSingle_update_DialogDeleted {
  __typename: "DialogDeleted";
  cid: string;
  globalUnread: number;
}

export type DialogsWatch_event_DialogUpdateSingle_update = DialogsWatch_event_DialogUpdateSingle_update_DialogMessageReceived | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageUpdated | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageDeleted | DialogsWatch_event_DialogUpdateSingle_update_DialogMessageRead | DialogsWatch_event_DialogUpdateSingle_update_DialogTitleUpdated | DialogsWatch_event_DialogUpdateSingle_update_DialogMuteChanged | DialogsWatch_event_DialogUpdateSingle_update_DialogMentionedChanged | DialogsWatch_event_DialogUpdateSingle_update_DialogPhotoUpdated | DialogsWatch_event_DialogUpdateSingle_update_DialogDeleted;

export interface DialogsWatch_event_DialogUpdateSingle {
  __typename: "DialogUpdateSingle";
  seq: number;
  state: string;
  update: DialogsWatch_event_DialogUpdateSingle_update;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_attachments = DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_attachments[];
  quotedMessages: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage_quotedMessages[];
}

export type DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message = DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_ServiceMessage | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message_GeneralMessage;

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived {
  __typename: "DialogMessageReceived";
  cid: string;
  unread: number;
  globalUnread: number;
  message: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived_message;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_attachments = DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_attachments[];
  quotedMessages: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage_quotedMessages[];
}

export type DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message = DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_ServiceMessage | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message_GeneralMessage;

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated {
  __typename: "DialogMessageUpdated";
  cid: string;
  message: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated_message;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_attachments = DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentPost | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_attachments[];
  quotedMessages: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage_quotedMessages[];
}

export type DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message = DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_ServiceMessage | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message_GeneralMessage;

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_attachments = DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentPost | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_attachments[];
  quotedMessages: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage_quotedMessages[];
}

export type DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage = DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_ServiceMessage | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage_GeneralMessage;

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted {
  __typename: "DialogMessageDeleted";
  cid: string;
  message: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_message;
  prevMessage: DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted_prevMessage | null;
  unread: number;
  globalUnread: number;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageRead {
  __typename: "DialogMessageRead";
  cid: string;
  unread: number;
  globalUnread: number;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogTitleUpdated {
  __typename: "DialogTitleUpdated";
  cid: string;
  title: string;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMuteChanged {
  __typename: "DialogMuteChanged";
  cid: string;
  mute: boolean;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogMentionedChanged {
  __typename: "DialogMentionedChanged";
  cid: string;
  haveMention: boolean;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogPhotoUpdated {
  __typename: "DialogPhotoUpdated";
  cid: string;
  photo: string | null;
}

export interface DialogsWatch_event_DialogUpdateBatch_updates_DialogDeleted {
  __typename: "DialogDeleted";
  cid: string;
  globalUnread: number;
}

export type DialogsWatch_event_DialogUpdateBatch_updates = DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageReceived | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageUpdated | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageDeleted | DialogsWatch_event_DialogUpdateBatch_updates_DialogMessageRead | DialogsWatch_event_DialogUpdateBatch_updates_DialogTitleUpdated | DialogsWatch_event_DialogUpdateBatch_updates_DialogMuteChanged | DialogsWatch_event_DialogUpdateBatch_updates_DialogMentionedChanged | DialogsWatch_event_DialogUpdateBatch_updates_DialogPhotoUpdated | DialogsWatch_event_DialogUpdateBatch_updates_DialogDeleted;

export interface DialogsWatch_event_DialogUpdateBatch {
  __typename: "DialogUpdateBatch";
  fromSeq: number;
  seq: number;
  state: string;
  updates: DialogsWatch_event_DialogUpdateBatch_updates[];
}

export type DialogsWatch_event = DialogsWatch_event_DialogUpdateSingle | DialogsWatch_event_DialogUpdateBatch;

export interface DialogsWatch {
  event: DialogsWatch_event;
}

export interface DialogsWatchVariables {
  state?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Room
// ====================================================

export interface Room_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface Room_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: Room_room_PrivateRoom_user_primaryOrganization | null;
}

export interface Room_room_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface Room_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: Room_room_PrivateRoom_user;
  settings: Room_room_PrivateRoom_settings;
}

export interface Room_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface Room_room_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface Room_room_SharedRoom_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: Room_room_SharedRoom_members_user_primaryOrganization | null;
}

export interface Room_room_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: Room_room_SharedRoom_members_user;
  canKick: boolean;
}

export interface Room_room_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface Room_room_SharedRoom_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: Room_room_SharedRoom_requests_user_primaryOrganization | null;
}

export interface Room_room_SharedRoom_requests {
  __typename: "RoomMember";
  user: Room_room_SharedRoom_requests_user;
}

export interface Room_room_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface Room_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: Room_room_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: Room_room_SharedRoom_members[];
  requests: Room_room_SharedRoom_requests[] | null;
  settings: Room_room_SharedRoom_settings;
  canEdit: boolean;
}

export type Room_room = Room_room_PrivateRoom | Room_room_SharedRoom;

export interface Room {
  room: Room_room | null;
}

export interface RoomVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomTiny
// ====================================================

export interface RoomTiny_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomTiny_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomTiny_room_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomTiny_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomTiny_room_PrivateRoom_user;
}

export interface RoomTiny_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomTiny_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: RoomTiny_room_SharedRoom_organization | null;
}

export type RoomTiny_room = RoomTiny_room_PrivateRoom | RoomTiny_room_SharedRoom;

export interface RoomTiny {
  room: RoomTiny_room | null;
}

export interface RoomTinyVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomSuper
// ====================================================

export interface RoomSuper_roomSuper {
  __typename: "RoomSuper";
  id: string;
  featured: boolean;
  listed: boolean;
}

export interface RoomSuper {
  roomSuper: RoomSuper_roomSuper | null;
}

export interface RoomSuperVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MessageSetReaction
// ====================================================

export interface MessageSetReaction {
  betaReactionSet: boolean;
}

export interface MessageSetReactionVariables {
  messageId: string;
  reaction: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SwitchReaction
// ====================================================

export interface SwitchReaction {
  betaReactionSet: boolean;
  betaReactionRemove: boolean;
}

export interface SwitchReactionVariables {
  messageId: string;
  from: string;
  to: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MessageUnsetReaction
// ====================================================

export interface MessageUnsetReaction {
  betaReactionRemove: boolean;
}

export interface MessageUnsetReactionVariables {
  messageId: string;
  reaction: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendPostMessage
// ====================================================

export interface SendPostMessage_sendPostMessage {
  __typename: "ConversationEventMessage";
  seq: number;
}

export interface SendPostMessage {
  sendPostMessage: SendPostMessage_sendPostMessage;
}

export interface SendPostMessageVariables {
  conversationId: string;
  title: string;
  text: string;
  attachments?: string[] | null;
  postType: PostMessageType;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditPostMessage
// ====================================================

export interface EditPostMessage_editPostMessage {
  __typename: "ConversationEventMessage";
  seq: number;
}

export interface EditPostMessage {
  editPostMessage: EditPostMessage_editPostMessage;
}

export interface EditPostMessageVariables {
  messageId: string;
  title: string;
  text: string;
  attachments?: string[] | null;
  postType: PostMessageType;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RespondPostMessage
// ====================================================

export interface RespondPostMessage {
  alphaRespondPostMessage: boolean | null;
  betaReactionSet: boolean;
}

export interface RespondPostMessageVariables {
  messageId: string;
  buttonId: string;
  reaction: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveDraftMessage
// ====================================================

export interface SaveDraftMessage {
  conversationDraftUpdate: string;
}

export interface SaveDraftMessageVariables {
  conversationId: string;
  message: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDraftMessage
// ====================================================

export interface GetDraftMessage {
  message: string | null;
}

export interface GetDraftMessageVariables {
  conversationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GlobalCounter
// ====================================================

export interface GlobalCounter_counter {
  __typename: "NotificationCounter";
  id: string;
  unreadCount: number;
}

export interface GlobalCounter {
  counter: GlobalCounter_counter;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatHistory
// ====================================================

export interface ChatHistory_messages_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatHistory_messages_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatHistory_messages_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatHistory_messages_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room = ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatHistory_messages_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatHistory_messages_GeneralMessage_spans = ChatHistory_messages_GeneralMessage_spans_MessageSpanUserMention | ChatHistory_messages_GeneralMessage_spans_MessageSpanMultiUserMention | ChatHistory_messages_GeneralMessage_spans_MessageSpanRoomMention | ChatHistory_messages_GeneralMessage_spans_MessageSpanLink;

export interface ChatHistory_messages_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatHistory_messages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatHistory_messages_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatHistory_messages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatHistory_messages_GeneralMessage_attachments = ChatHistory_messages_GeneralMessage_attachments_MessageAttachmentPost | ChatHistory_messages_GeneralMessage_attachments_MessageAttachmentFile | ChatHistory_messages_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room = ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans = ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention | ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention | ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention | ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink;

export interface ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_sender;
  fallback: string;
  spans: ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage_spans[];
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room = ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans = ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention | ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention | ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention | ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink;

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments = ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost | ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile | ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_sender;
  fallback: string;
  spans: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage_attachments[];
}

export type ChatHistory_messages_GeneralMessage_quotedMessages = ChatHistory_messages_GeneralMessage_quotedMessages_ServiceMessage | ChatHistory_messages_GeneralMessage_quotedMessages_GeneralMessage;

export interface ChatHistory_messages_GeneralMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_GeneralMessage_reactions {
  __typename: "ModernMessageReaction";
  user: ChatHistory_messages_GeneralMessage_reactions_user;
  reaction: MessageReactionType;
}

export interface ChatHistory_messages_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatHistory_messages_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatHistory_messages_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatHistory_messages_GeneralMessage_attachments[];
  quotedMessages: ChatHistory_messages_GeneralMessage_quotedMessages[];
  reactions: ChatHistory_messages_GeneralMessage_reactions[];
}

export interface ChatHistory_messages_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatHistory_messages_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatHistory_messages_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatHistory_messages_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room = ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatHistory_messages_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatHistory_messages_ServiceMessage_spans = ChatHistory_messages_ServiceMessage_spans_MessageSpanUserMention | ChatHistory_messages_ServiceMessage_spans_MessageSpanMultiUserMention | ChatHistory_messages_ServiceMessage_spans_MessageSpanRoomMention | ChatHistory_messages_ServiceMessage_spans_MessageSpanLink;

export interface ChatHistory_messages_ServiceMessage_serviceMetadata_InviteServiceMetadata_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_ServiceMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata";
  users: ChatHistory_messages_ServiceMessage_serviceMetadata_InviteServiceMetadata_users[] | null;
  invitedBy: ChatHistory_messages_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy;
}

export interface ChatHistory_messages_ServiceMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatHistory_messages_ServiceMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatHistory_messages_ServiceMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatHistory_messages_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export interface ChatHistory_messages_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata {
  __typename: "TitleChangeServiceMetadata";
  title: string;
}

export interface ChatHistory_messages_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata {
  __typename: "PhotoChangeServiceMetadata";
  photo: string | null;
}

export interface ChatHistory_messages_ServiceMessage_serviceMetadata_PostRespondServiceMetadata {
  __typename: "PostRespondServiceMetadata";
  respondType: string;
}

export type ChatHistory_messages_ServiceMessage_serviceMetadata = ChatHistory_messages_ServiceMessage_serviceMetadata_InviteServiceMetadata | ChatHistory_messages_ServiceMessage_serviceMetadata_KickServiceMetadata | ChatHistory_messages_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata | ChatHistory_messages_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata | ChatHistory_messages_ServiceMessage_serviceMetadata_PostRespondServiceMetadata;

export interface ChatHistory_messages_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatHistory_messages_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatHistory_messages_ServiceMessage_spans[];
  serviceMetadata: ChatHistory_messages_ServiceMessage_serviceMetadata | null;
}

export type ChatHistory_messages = ChatHistory_messages_GeneralMessage | ChatHistory_messages_ServiceMessage;

export interface ChatHistory_state {
  __typename: "ConversationUpdateState";
  state: string | null;
}

export interface ChatHistory {
  messages: ChatHistory_messages[];
  state: ChatHistory_state;
}

export interface ChatHistoryVariables {
  chatId: string;
  before?: string | null;
  first?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendMessage
// ====================================================

export interface SendMessage {
  sentMessage: boolean;
}

export interface SendMessageVariables {
  message?: string | null;
  file?: string | null;
  repeatKey?: string | null;
  replyMessages?: string[] | null;
  mentions?: string[] | null;
  room: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReplyMessage
// ====================================================

export interface ReplyMessage {
  replyMessage: boolean;
}

export interface ReplyMessageVariables {
  roomId: string;
  message?: string | null;
  replyMessages?: string[] | null;
  mentions?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomRead
// ====================================================

export interface RoomRead {
  roomRead: boolean;
}

export interface RoomReadVariables {
  id: string;
  mid: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatSearchGroup
// ====================================================

export interface ChatSearchGroup_group {
  __typename: "ChannelConversation" | "AnonymousConversation" | "GroupConversation" | "PrivateConversation" | "SharedConversation";
  id: string;
  flexibleId: string;
}

export interface ChatSearchGroup {
  group: ChatSearchGroup_group | null;
}

export interface ChatSearchGroupVariables {
  members: string[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomCreate
// ====================================================

export interface RoomCreate_room {
  __typename: "SharedRoom";
  id: string;
}

export interface RoomCreate {
  /**
   * Room mgmt
   */
  room: RoomCreate_room;
}

export interface RoomCreateVariables {
  kind: SharedRoomKind;
  members: string[];
  message?: string | null;
  title?: string | null;
  description?: string | null;
  photoRef?: ImageRefInput | null;
  organizationId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomCreateIntro
// ====================================================

export interface RoomCreateIntro {
  intro: boolean;
}

export interface RoomCreateIntroVariables {
  roomId: string;
  uid: string;
  about?: string | null;
  file?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomEditIntro
// ====================================================

export interface RoomEditIntro {
  intro: boolean;
}

export interface RoomEditIntroVariables {
  messageId: string;
  uid: string;
  about?: string | null;
  file?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetTyping
// ====================================================

export interface SetTyping {
  typingSend: string;
}

export interface SetTypingVariables {
  conversationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelTyping
// ====================================================

export interface CancelTyping {
  typingCancel: string;
}

export interface CancelTypingVariables {
  conversationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomAddMember
// ====================================================

export interface RoomAddMember_betaRoomInvite_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomAddMember_betaRoomInvite_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomAddMember_betaRoomInvite_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomAddMember_betaRoomInvite_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomAddMember_betaRoomInvite_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomAddMember_betaRoomInvite_PrivateRoom_user;
  settings: RoomAddMember_betaRoomInvite_PrivateRoom_settings;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomAddMember_betaRoomInvite_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomAddMember_betaRoomInvite_SharedRoom_members_user;
  canKick: boolean;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomAddMember_betaRoomInvite_SharedRoom_requests_user_primaryOrganization | null;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom_requests {
  __typename: "RoomMember";
  user: RoomAddMember_betaRoomInvite_SharedRoom_requests_user;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomAddMember_betaRoomInvite_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomAddMember_betaRoomInvite_SharedRoom_members[];
  requests: RoomAddMember_betaRoomInvite_SharedRoom_requests[] | null;
  settings: RoomAddMember_betaRoomInvite_SharedRoom_settings;
  canEdit: boolean;
}

export type RoomAddMember_betaRoomInvite = RoomAddMember_betaRoomInvite_PrivateRoom | RoomAddMember_betaRoomInvite_SharedRoom;

export interface RoomAddMember {
  /**
   * Members mgmt
   */
  betaRoomInvite: RoomAddMember_betaRoomInvite;
}

export interface RoomAddMemberVariables {
  roomId: string;
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomDeclineJoinReuest
// ====================================================

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom_user;
  settings: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom_settings;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_members_user;
  canKick: boolean;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_requests_user_primaryOrganization | null;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_requests {
  __typename: "RoomMember";
  user: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_requests_user;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_members[];
  requests: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_requests[] | null;
  settings: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_settings;
  canEdit: boolean;
}

export type RoomDeclineJoinReuest_betaRoomDeclineJoinRequest = RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom | RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom;

export interface RoomDeclineJoinReuest {
  betaRoomDeclineJoinRequest: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest;
}

export interface RoomDeclineJoinReuestVariables {
  roomId: string;
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomAddMembers
// ====================================================

export interface RoomAddMembers_betaRoomInvite_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomAddMembers_betaRoomInvite_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomAddMembers_betaRoomInvite_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomAddMembers_betaRoomInvite_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomAddMembers_betaRoomInvite_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomAddMembers_betaRoomInvite_PrivateRoom_user;
  settings: RoomAddMembers_betaRoomInvite_PrivateRoom_settings;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomAddMembers_betaRoomInvite_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomAddMembers_betaRoomInvite_SharedRoom_members_user;
  canKick: boolean;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomAddMembers_betaRoomInvite_SharedRoom_requests_user_primaryOrganization | null;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom_requests {
  __typename: "RoomMember";
  user: RoomAddMembers_betaRoomInvite_SharedRoom_requests_user;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomAddMembers_betaRoomInvite_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomAddMembers_betaRoomInvite_SharedRoom_members[];
  requests: RoomAddMembers_betaRoomInvite_SharedRoom_requests[] | null;
  settings: RoomAddMembers_betaRoomInvite_SharedRoom_settings;
  canEdit: boolean;
}

export type RoomAddMembers_betaRoomInvite = RoomAddMembers_betaRoomInvite_PrivateRoom | RoomAddMembers_betaRoomInvite_SharedRoom;

export interface RoomAddMembers {
  /**
   * Members mgmt
   */
  betaRoomInvite: RoomAddMembers_betaRoomInvite;
}

export interface RoomAddMembersVariables {
  roomId: string;
  invites: RoomInviteInput[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomKick
// ====================================================

export interface RoomKick_betaRoomKick_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomKick_betaRoomKick_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomKick_betaRoomKick_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomKick_betaRoomKick_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomKick_betaRoomKick_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomKick_betaRoomKick_PrivateRoom_user;
  settings: RoomKick_betaRoomKick_PrivateRoom_settings;
}

export interface RoomKick_betaRoomKick_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface RoomKick_betaRoomKick_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomKick_betaRoomKick_SharedRoom_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomKick_betaRoomKick_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomKick_betaRoomKick_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomKick_betaRoomKick_SharedRoom_members_user;
  canKick: boolean;
}

export interface RoomKick_betaRoomKick_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomKick_betaRoomKick_SharedRoom_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomKick_betaRoomKick_SharedRoom_requests_user_primaryOrganization | null;
}

export interface RoomKick_betaRoomKick_SharedRoom_requests {
  __typename: "RoomMember";
  user: RoomKick_betaRoomKick_SharedRoom_requests_user;
}

export interface RoomKick_betaRoomKick_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomKick_betaRoomKick_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomKick_betaRoomKick_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomKick_betaRoomKick_SharedRoom_members[];
  requests: RoomKick_betaRoomKick_SharedRoom_requests[] | null;
  settings: RoomKick_betaRoomKick_SharedRoom_settings;
  canEdit: boolean;
}

export type RoomKick_betaRoomKick = RoomKick_betaRoomKick_PrivateRoom | RoomKick_betaRoomKick_SharedRoom;

export interface RoomKick {
  betaRoomKick: RoomKick_betaRoomKick;
}

export interface RoomKickVariables {
  roomId: string;
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomLeave
// ====================================================

export interface RoomLeave_betaRoomLeave_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomLeave_betaRoomLeave_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomLeave_betaRoomLeave_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomLeave_betaRoomLeave_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomLeave_betaRoomLeave_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomLeave_betaRoomLeave_PrivateRoom_user;
  settings: RoomLeave_betaRoomLeave_PrivateRoom_settings;
}

export interface RoomLeave_betaRoomLeave_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface RoomLeave_betaRoomLeave_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomLeave_betaRoomLeave_SharedRoom_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomLeave_betaRoomLeave_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomLeave_betaRoomLeave_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomLeave_betaRoomLeave_SharedRoom_members_user;
  canKick: boolean;
}

export interface RoomLeave_betaRoomLeave_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomLeave_betaRoomLeave_SharedRoom_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomLeave_betaRoomLeave_SharedRoom_requests_user_primaryOrganization | null;
}

export interface RoomLeave_betaRoomLeave_SharedRoom_requests {
  __typename: "RoomMember";
  user: RoomLeave_betaRoomLeave_SharedRoom_requests_user;
}

export interface RoomLeave_betaRoomLeave_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomLeave_betaRoomLeave_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomLeave_betaRoomLeave_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomLeave_betaRoomLeave_SharedRoom_members[];
  requests: RoomLeave_betaRoomLeave_SharedRoom_requests[] | null;
  settings: RoomLeave_betaRoomLeave_SharedRoom_settings;
  canEdit: boolean;
}

export type RoomLeave_betaRoomLeave = RoomLeave_betaRoomLeave_PrivateRoom | RoomLeave_betaRoomLeave_SharedRoom;

export interface RoomLeave {
  betaRoomLeave: RoomLeave_betaRoomLeave;
}

export interface RoomLeaveVariables {
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomSearchText
// ====================================================

export interface RoomSearchText_items {
  __typename: "Dialog";
  id: string;
  title: string;
  flexibleId: string;
  photo: string;
  kind: DialogKind;
}

export interface RoomSearchText {
  items: RoomSearchText_items[];
}

export interface RoomSearchTextVariables {
  query: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomSearch
// ====================================================

export interface RoomSearch_items_edges_node_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface RoomSearch_items_edges_node_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomSearch_items_edges_node_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomSearch_items_edges_node_members_user_primaryOrganization | null;
}

export interface RoomSearch_items_edges_node_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomSearch_items_edges_node_members_user;
  canKick: boolean;
}

export interface RoomSearch_items_edges_node_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomSearch_items_edges_node_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomSearch_items_edges_node_requests_user_primaryOrganization | null;
}

export interface RoomSearch_items_edges_node_requests {
  __typename: "RoomMember";
  user: RoomSearch_items_edges_node_requests_user;
}

export interface RoomSearch_items_edges_node_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomSearch_items_edges_node {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomSearch_items_edges_node_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomSearch_items_edges_node_members[];
  requests: RoomSearch_items_edges_node_requests[] | null;
  settings: RoomSearch_items_edges_node_settings;
  canEdit: boolean;
}

export interface RoomSearch_items_edges {
  __typename: "RoomConnectionEdge";
  node: RoomSearch_items_edges_node;
  cursor: string;
}

export interface RoomSearch_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface RoomSearch_items {
  __typename: "RoomConnection";
  edges: RoomSearch_items_edges[];
  pageInfo: RoomSearch_items_pageInfo;
}

export interface RoomSearch {
  items: RoomSearch_items;
}

export interface RoomSearchVariables {
  query?: string | null;
  sort?: string | null;
  page?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomAlterFeatured
// ====================================================

export interface RoomAlterFeatured_betaRoomAlterFeatured {
  __typename: "RoomSuper";
  id: string;
  listed: boolean;
  featured: boolean;
}

export interface RoomAlterFeatured {
  /**
   * Admin tools
   */
  betaRoomAlterFeatured: RoomAlterFeatured_betaRoomAlterFeatured;
}

export interface RoomAlterFeaturedVariables {
  roomId: string;
  featured: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomAlterHidden
// ====================================================

export interface RoomAlterHidden_betaRoomAlterListed {
  __typename: "RoomSuper";
  id: string;
  listed: boolean;
  featured: boolean;
}

export interface RoomAlterHidden {
  betaRoomAlterListed: RoomAlterHidden_betaRoomAlterListed;
}

export interface RoomAlterHiddenVariables {
  roomId: string;
  listed: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomMembersShort
// ====================================================

export interface RoomMembersShort_members_user {
  __typename: "User";
  id: string;
}

export interface RoomMembersShort_members {
  __typename: "RoomMember";
  user: RoomMembersShort_members_user;
}

export interface RoomMembersShort {
  members: RoomMembersShort_members[];
}

export interface RoomMembersShortVariables {
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomMembers
// ====================================================

export interface RoomMembers_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomMembers_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomMembers_members_user_primaryOrganization | null;
}

export interface RoomMembers_members {
  __typename: "RoomMember";
  user: RoomMembers_members_user;
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
}

export interface RoomMembers {
  members: RoomMembers_members[];
}

export interface RoomMembersVariables {
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomSettingsUpdate
// ====================================================

export interface RoomSettingsUpdate_betaRoomUpdateUserNotificationSettings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomSettingsUpdate {
  /**
   * User settings
   */
  betaRoomUpdateUserNotificationSettings: RoomSettingsUpdate_betaRoomUpdateUserNotificationSettings;
}

export interface RoomSettingsUpdateVariables {
  settings: RoomUserNotificaionSettingsInput;
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomJoin
// ====================================================

export interface RoomJoin_join_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomJoin_join_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomJoin_join_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomJoin_join_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomJoin_join_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomJoin_join_PrivateRoom_user;
  settings: RoomJoin_join_PrivateRoom_settings;
}

export interface RoomJoin_join_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface RoomJoin_join_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomJoin_join_SharedRoom_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomJoin_join_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomJoin_join_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomJoin_join_SharedRoom_members_user;
  canKick: boolean;
}

export interface RoomJoin_join_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomJoin_join_SharedRoom_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomJoin_join_SharedRoom_requests_user_primaryOrganization | null;
}

export interface RoomJoin_join_SharedRoom_requests {
  __typename: "RoomMember";
  user: RoomJoin_join_SharedRoom_requests_user;
}

export interface RoomJoin_join_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomJoin_join_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomJoin_join_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomJoin_join_SharedRoom_members[];
  requests: RoomJoin_join_SharedRoom_requests[] | null;
  settings: RoomJoin_join_SharedRoom_settings;
  canEdit: boolean;
}

export type RoomJoin_join = RoomJoin_join_PrivateRoom | RoomJoin_join_SharedRoom;

export interface RoomJoin {
  join: RoomJoin_join;
}

export interface RoomJoinVariables {
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomSendEmailInvite
// ====================================================

export interface RoomSendEmailInvite {
  /**
   * Invite links
   */
  betaRoomInviteLinkSendEmail: string;
}

export interface RoomSendEmailInviteVariables {
  roomId: string;
  inviteRequests: RoomInviteEmailRequest[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomJoinInviteLink
// ====================================================

export interface RoomJoinInviteLink_join_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomJoinInviteLink_join_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomJoinInviteLink_join_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomJoinInviteLink_join_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomJoinInviteLink_join_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomJoinInviteLink_join_PrivateRoom_user;
  settings: RoomJoinInviteLink_join_PrivateRoom_settings;
}

export interface RoomJoinInviteLink_join_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface RoomJoinInviteLink_join_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomJoinInviteLink_join_SharedRoom_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomJoinInviteLink_join_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomJoinInviteLink_join_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomJoinInviteLink_join_SharedRoom_members_user;
  canKick: boolean;
}

export interface RoomJoinInviteLink_join_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomJoinInviteLink_join_SharedRoom_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomJoinInviteLink_join_SharedRoom_requests_user_primaryOrganization | null;
}

export interface RoomJoinInviteLink_join_SharedRoom_requests {
  __typename: "RoomMember";
  user: RoomJoinInviteLink_join_SharedRoom_requests_user;
}

export interface RoomJoinInviteLink_join_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomJoinInviteLink_join_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomJoinInviteLink_join_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomJoinInviteLink_join_SharedRoom_members[];
  requests: RoomJoinInviteLink_join_SharedRoom_requests[] | null;
  settings: RoomJoinInviteLink_join_SharedRoom_settings;
  canEdit: boolean;
}

export type RoomJoinInviteLink_join = RoomJoinInviteLink_join_PrivateRoom | RoomJoinInviteLink_join_SharedRoom;

export interface RoomJoinInviteLink {
  join: RoomJoinInviteLink_join;
}

export interface RoomJoinInviteLinkVariables {
  invite: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomRenewInviteLink
// ====================================================

export interface RoomRenewInviteLink {
  link: string;
}

export interface RoomRenewInviteLinkVariables {
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomInviteLink
// ====================================================

export interface RoomInviteLink {
  link: string;
}

export interface RoomInviteLinkVariables {
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomInviteInfo
// ====================================================

export interface RoomInviteInfo_invite_room_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomInviteInfo_invite_room_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
}

export interface RoomInviteInfo_invite_room {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomInviteInfo_invite_room_organization | null;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  members: RoomInviteInfo_invite_room_members[];
}

export interface RoomInviteInfo_invite_invitedByUser_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomInviteInfo_invite_invitedByUser {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomInviteInfo_invite_invitedByUser_primaryOrganization | null;
}

export interface RoomInviteInfo_invite {
  __typename: "RoomInvite";
  room: RoomInviteInfo_invite_room;
  invitedByUser: RoomInviteInfo_invite_invitedByUser;
}

export interface RoomInviteInfo {
  invite: RoomInviteInfo_invite | null;
}

export interface RoomInviteInfoVariables {
  invite: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomUpdate
// ====================================================

export interface RoomUpdate_betaRoomUpdate_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  title: string;
  photo: string;
  description: string | null;
}

export type RoomUpdate_betaRoomUpdate = RoomUpdate_betaRoomUpdate_PrivateRoom | RoomUpdate_betaRoomUpdate_SharedRoom;

export interface RoomUpdate {
  betaRoomUpdate: RoomUpdate_betaRoomUpdate;
}

export interface RoomUpdateVariables {
  roomId: string;
  input: RoomUpdateInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomDeleteMessage
// ====================================================

export interface RoomDeleteMessage {
  betaMessageDelete: boolean;
}

export interface RoomDeleteMessageVariables {
  messageId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomDeleteMessages
// ====================================================

export interface RoomDeleteMessages {
  betaMessageDelete: boolean;
}

export interface RoomDeleteMessagesVariables {
  mids: string[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomDeleteUrlAugmentation
// ====================================================

export interface RoomDeleteUrlAugmentation {
  betaMessageDeleteAugmentation: boolean;
}

export interface RoomDeleteUrlAugmentationVariables {
  messageId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomEditMessage
// ====================================================

export interface RoomEditMessage {
  betaMessageEdit: boolean;
}

export interface RoomEditMessageVariables {
  messageId: string;
  message?: string | null;
  file?: string | null;
  replyMessages?: string[] | null;
  mentions?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MarkSequenceRead
// ====================================================

export interface MarkSequenceRead {
  alphaGlobalRead: string;
}

export interface MarkSequenceReadVariables {
  seq: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: TypingsWatch
// ====================================================

export interface TypingsWatch_typings_conversation {
  __typename: "ChannelConversation" | "AnonymousConversation" | "GroupConversation" | "PrivateConversation" | "SharedConversation";
  id: string;
}

export interface TypingsWatch_typings_user {
  __typename: "User";
  id: string;
  name: string;
  picture: string | null;
}

export interface TypingsWatch_typings {
  __typename: "TypingEvent";
  conversation: TypingsWatch_typings_conversation;
  user: TypingsWatch_typings_user;
  cancel: boolean;
}

export interface TypingsWatch {
  typings: TypingsWatch_typings;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Conference
// ====================================================

export interface Conference_conference_peers_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface Conference_conference_peers_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: Conference_conference_peers_user_primaryOrganization | null;
}

export interface Conference_conference_peers_connection {
  __typename: "ConferencePeerConnection";
  state: ConferencePeerConnectionState;
  sdp: string | null;
  ice: string[];
}

export interface Conference_conference_peers {
  __typename: "ConferencePeer";
  id: string;
  user: Conference_conference_peers_user;
  connection: Conference_conference_peers_connection | null;
}

export interface Conference_conference_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface Conference_conference {
  __typename: "Conference";
  id: string;
  peers: Conference_conference_peers[];
  iceServers: Conference_conference_iceServers[];
}

export interface Conference {
  conference: Conference_conference;
}

export interface ConferenceVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConferenceMedia
// ====================================================

export interface ConferenceMedia_conferenceMedia_streams {
  __typename: "MediaStream";
  id: string;
  state: MediaStreamState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceMedia_conferenceMedia_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface ConferenceMedia_conferenceMedia {
  __typename: "ConferenceMedia";
  id: string;
  streams: ConferenceMedia_conferenceMedia_streams[];
  iceServers: ConferenceMedia_conferenceMedia_iceServers[];
}

export interface ConferenceMedia {
  conferenceMedia: ConferenceMedia_conferenceMedia;
}

export interface ConferenceMediaVariables {
  id: string;
  peerId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConferenceJoin
// ====================================================

export interface ConferenceJoin_conferenceJoin_conference_peers_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConferenceJoin_conferenceJoin_conference_peers_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ConferenceJoin_conferenceJoin_conference_peers_user_primaryOrganization | null;
}

export interface ConferenceJoin_conferenceJoin_conference_peers_connection {
  __typename: "ConferencePeerConnection";
  state: ConferencePeerConnectionState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceJoin_conferenceJoin_conference_peers {
  __typename: "ConferencePeer";
  id: string;
  user: ConferenceJoin_conferenceJoin_conference_peers_user;
  connection: ConferenceJoin_conferenceJoin_conference_peers_connection | null;
}

export interface ConferenceJoin_conferenceJoin_conference_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface ConferenceJoin_conferenceJoin_conference {
  __typename: "Conference";
  id: string;
  peers: ConferenceJoin_conferenceJoin_conference_peers[];
  iceServers: ConferenceJoin_conferenceJoin_conference_iceServers[];
}

export interface ConferenceJoin_conferenceJoin {
  __typename: "ConferenceJoinResult";
  peerId: string;
  conference: ConferenceJoin_conferenceJoin_conference;
}

export interface ConferenceJoin {
  conferenceJoin: ConferenceJoin_conferenceJoin;
}

export interface ConferenceJoinVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConferenceLeave
// ====================================================

export interface ConferenceLeave_conferenceLeave_peers_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConferenceLeave_conferenceLeave_peers_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ConferenceLeave_conferenceLeave_peers_user_primaryOrganization | null;
}

export interface ConferenceLeave_conferenceLeave_peers_connection {
  __typename: "ConferencePeerConnection";
  state: ConferencePeerConnectionState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceLeave_conferenceLeave_peers {
  __typename: "ConferencePeer";
  id: string;
  user: ConferenceLeave_conferenceLeave_peers_user;
  connection: ConferenceLeave_conferenceLeave_peers_connection | null;
}

export interface ConferenceLeave_conferenceLeave_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface ConferenceLeave_conferenceLeave {
  __typename: "Conference";
  id: string;
  peers: ConferenceLeave_conferenceLeave_peers[];
  iceServers: ConferenceLeave_conferenceLeave_iceServers[];
}

export interface ConferenceLeave {
  conferenceLeave: ConferenceLeave_conferenceLeave;
}

export interface ConferenceLeaveVariables {
  id: string;
  peerId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConferenceKeepAlive
// ====================================================

export interface ConferenceKeepAlive_conferenceKeepAlive_peers_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConferenceKeepAlive_conferenceKeepAlive_peers_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ConferenceKeepAlive_conferenceKeepAlive_peers_user_primaryOrganization | null;
}

export interface ConferenceKeepAlive_conferenceKeepAlive_peers_connection {
  __typename: "ConferencePeerConnection";
  state: ConferencePeerConnectionState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceKeepAlive_conferenceKeepAlive_peers {
  __typename: "ConferencePeer";
  id: string;
  user: ConferenceKeepAlive_conferenceKeepAlive_peers_user;
  connection: ConferenceKeepAlive_conferenceKeepAlive_peers_connection | null;
}

export interface ConferenceKeepAlive_conferenceKeepAlive_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface ConferenceKeepAlive_conferenceKeepAlive {
  __typename: "Conference";
  id: string;
  peers: ConferenceKeepAlive_conferenceKeepAlive_peers[];
  iceServers: ConferenceKeepAlive_conferenceKeepAlive_iceServers[];
}

export interface ConferenceKeepAlive {
  conferenceKeepAlive: ConferenceKeepAlive_conferenceKeepAlive;
}

export interface ConferenceKeepAliveVariables {
  id: string;
  peerId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConferenceOffer
// ====================================================

export interface ConferenceOffer_peerConnectionOffer_peers_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConferenceOffer_peerConnectionOffer_peers_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ConferenceOffer_peerConnectionOffer_peers_user_primaryOrganization | null;
}

export interface ConferenceOffer_peerConnectionOffer_peers_connection {
  __typename: "ConferencePeerConnection";
  state: ConferencePeerConnectionState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceOffer_peerConnectionOffer_peers {
  __typename: "ConferencePeer";
  id: string;
  user: ConferenceOffer_peerConnectionOffer_peers_user;
  connection: ConferenceOffer_peerConnectionOffer_peers_connection | null;
}

export interface ConferenceOffer_peerConnectionOffer_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface ConferenceOffer_peerConnectionOffer {
  __typename: "Conference";
  id: string;
  peers: ConferenceOffer_peerConnectionOffer_peers[];
  iceServers: ConferenceOffer_peerConnectionOffer_iceServers[];
}

export interface ConferenceOffer {
  peerConnectionOffer: ConferenceOffer_peerConnectionOffer;
}

export interface ConferenceOfferVariables {
  id: string;
  ownPeerId: string;
  peerId: string;
  offer: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConferenceAnswer
// ====================================================

export interface ConferenceAnswer_peerConnectionAnswer_peers_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConferenceAnswer_peerConnectionAnswer_peers_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ConferenceAnswer_peerConnectionAnswer_peers_user_primaryOrganization | null;
}

export interface ConferenceAnswer_peerConnectionAnswer_peers_connection {
  __typename: "ConferencePeerConnection";
  state: ConferencePeerConnectionState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceAnswer_peerConnectionAnswer_peers {
  __typename: "ConferencePeer";
  id: string;
  user: ConferenceAnswer_peerConnectionAnswer_peers_user;
  connection: ConferenceAnswer_peerConnectionAnswer_peers_connection | null;
}

export interface ConferenceAnswer_peerConnectionAnswer_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface ConferenceAnswer_peerConnectionAnswer {
  __typename: "Conference";
  id: string;
  peers: ConferenceAnswer_peerConnectionAnswer_peers[];
  iceServers: ConferenceAnswer_peerConnectionAnswer_iceServers[];
}

export interface ConferenceAnswer {
  peerConnectionAnswer: ConferenceAnswer_peerConnectionAnswer;
}

export interface ConferenceAnswerVariables {
  id: string;
  ownPeerId: string;
  peerId: string;
  answer: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConferenceCandidate
// ====================================================

export interface ConferenceCandidate_peerConnectionCandidate_peers_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConferenceCandidate_peerConnectionCandidate_peers_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ConferenceCandidate_peerConnectionCandidate_peers_user_primaryOrganization | null;
}

export interface ConferenceCandidate_peerConnectionCandidate_peers_connection {
  __typename: "ConferencePeerConnection";
  state: ConferencePeerConnectionState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceCandidate_peerConnectionCandidate_peers {
  __typename: "ConferencePeer";
  id: string;
  user: ConferenceCandidate_peerConnectionCandidate_peers_user;
  connection: ConferenceCandidate_peerConnectionCandidate_peers_connection | null;
}

export interface ConferenceCandidate_peerConnectionCandidate_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface ConferenceCandidate_peerConnectionCandidate {
  __typename: "Conference";
  id: string;
  peers: ConferenceCandidate_peerConnectionCandidate_peers[];
  iceServers: ConferenceCandidate_peerConnectionCandidate_iceServers[];
}

export interface ConferenceCandidate {
  peerConnectionCandidate: ConferenceCandidate_peerConnectionCandidate;
}

export interface ConferenceCandidateVariables {
  id: string;
  ownPeerId: string;
  peerId: string;
  candidate: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MediaOffer
// ====================================================

export interface MediaOffer_mediaStreamOffer_streams {
  __typename: "MediaStream";
  id: string;
  state: MediaStreamState;
  sdp: string | null;
  ice: string[];
}

export interface MediaOffer_mediaStreamOffer {
  __typename: "ConferenceMedia";
  id: string;
  streams: MediaOffer_mediaStreamOffer_streams[];
}

export interface MediaOffer {
  mediaStreamOffer: MediaOffer_mediaStreamOffer;
}

export interface MediaOfferVariables {
  id: string;
  peerId: string;
  offer: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MediaAnswer
// ====================================================

export interface MediaAnswer_mediaStreamAnswer_streams {
  __typename: "MediaStream";
  id: string;
  state: MediaStreamState;
  sdp: string | null;
  ice: string[];
}

export interface MediaAnswer_mediaStreamAnswer {
  __typename: "ConferenceMedia";
  id: string;
  streams: MediaAnswer_mediaStreamAnswer_streams[];
}

export interface MediaAnswer {
  mediaStreamAnswer: MediaAnswer_mediaStreamAnswer;
}

export interface MediaAnswerVariables {
  id: string;
  peerId: string;
  answer: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MediaCandidate
// ====================================================

export interface MediaCandidate_mediaStreamCandidate_streams {
  __typename: "MediaStream";
  id: string;
  state: MediaStreamState;
  sdp: string | null;
  ice: string[];
}

export interface MediaCandidate_mediaStreamCandidate {
  __typename: "ConferenceMedia";
  id: string;
  streams: MediaCandidate_mediaStreamCandidate_streams[];
}

export interface MediaCandidate {
  mediaStreamCandidate: MediaCandidate_mediaStreamCandidate;
}

export interface MediaCandidateVariables {
  id: string;
  peerId: string;
  candidate: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ConferenceMediaWatch
// ====================================================

export interface ConferenceMediaWatch_media_streams {
  __typename: "MediaStream";
  id: string;
  state: MediaStreamState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceMediaWatch_media {
  __typename: "ConferenceMedia";
  id: string;
  streams: ConferenceMediaWatch_media_streams[];
}

export interface ConferenceMediaWatch {
  media: ConferenceMediaWatch_media;
}

export interface ConferenceMediaWatchVariables {
  id: string;
  peerId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ConferenceWatch
// ====================================================

export interface ConferenceWatch_alphaConferenceWatch_peers_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConferenceWatch_alphaConferenceWatch_peers_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ConferenceWatch_alphaConferenceWatch_peers_user_primaryOrganization | null;
}

export interface ConferenceWatch_alphaConferenceWatch_peers_connection {
  __typename: "ConferencePeerConnection";
  state: ConferencePeerConnectionState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceWatch_alphaConferenceWatch_peers {
  __typename: "ConferencePeer";
  id: string;
  user: ConferenceWatch_alphaConferenceWatch_peers_user;
  connection: ConferenceWatch_alphaConferenceWatch_peers_connection | null;
}

export interface ConferenceWatch_alphaConferenceWatch_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface ConferenceWatch_alphaConferenceWatch {
  __typename: "Conference";
  id: string;
  peers: ConferenceWatch_alphaConferenceWatch_peers[];
  iceServers: ConferenceWatch_alphaConferenceWatch_iceServers[];
}

export interface ConferenceWatch {
  alphaConferenceWatch: ConferenceWatch_alphaConferenceWatch;
}

export interface ConferenceWatchVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AvailableRooms
// ====================================================

export interface AvailableRooms_rooms_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface AvailableRooms_rooms {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membersCount: number | null;
  membership: SharedRoomMembershipStatus;
  organization: AvailableRooms_rooms_organization | null;
}

export interface AvailableRooms {
  rooms: AvailableRooms_rooms[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GlobalSearch
// ====================================================

export interface GlobalSearch_items_Organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface GlobalSearch_items_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface GlobalSearch_items_User {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: GlobalSearch_items_User_primaryOrganization | null;
}

export interface GlobalSearch_items_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface GlobalSearch_items_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  roomPhoto: string;
  membersCount: number | null;
  membership: SharedRoomMembershipStatus;
  organization: GlobalSearch_items_SharedRoom_organization | null;
}

export type GlobalSearch_items = GlobalSearch_items_Organization | GlobalSearch_items_User | GlobalSearch_items_SharedRoom;

export interface GlobalSearch {
  items: GlobalSearch_items[];
}

export interface GlobalSearchVariables {
  query: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeatureFlags
// ====================================================

export interface FeatureFlags_featureFlags {
  __typename: "FeatureFlag";
  id: string;
  key: string;
  title: string;
}

export interface FeatureFlags {
  featureFlags: FeatureFlags_featureFlags[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FeatureFlagAdd
// ====================================================

export interface FeatureFlagAdd_featureFlagAdd {
  __typename: "FeatureFlag";
  id: string;
  key: string;
  title: string;
}

export interface FeatureFlagAdd {
  featureFlagAdd: FeatureFlagAdd_featureFlagAdd;
}

export interface FeatureFlagAddVariables {
  key: string;
  title: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FeatureFlagEnable
// ====================================================

export interface FeatureFlagEnable_superAccountFeatureAdd_features {
  __typename: "FeatureFlag";
  id: string;
  key: string;
  title: string;
}

export interface FeatureFlagEnable_superAccountFeatureAdd {
  __typename: "SuperAccount";
  id: string;
  features: FeatureFlagEnable_superAccountFeatureAdd_features[];
}

export interface FeatureFlagEnable {
  superAccountFeatureAdd: FeatureFlagEnable_superAccountFeatureAdd;
}

export interface FeatureFlagEnableVariables {
  accountId: string;
  featureId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FeatureFlagDisable
// ====================================================

export interface FeatureFlagDisable_superAccountFeatureRemove_features {
  __typename: "FeatureFlag";
  id: string;
  key: string;
  title: string;
}

export interface FeatureFlagDisable_superAccountFeatureRemove {
  __typename: "SuperAccount";
  id: string;
  features: FeatureFlagDisable_superAccountFeatureRemove_features[];
}

export interface FeatureFlagDisable {
  superAccountFeatureRemove: FeatureFlagDisable_superAccountFeatureRemove;
}

export interface FeatureFlagDisableVariables {
  accountId: string;
  featureId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedHome
// ====================================================

export interface FeedHome_homeFeed_by_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FeedHome_homeFeed_by {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: FeedHome_homeFeed_by_primaryOrganization | null;
}

export interface FeedHome_homeFeed {
  __typename: "FeedItem";
  id: string;
  text: string;
  date: any;
  by: FeedHome_homeFeed_by;
}

export interface FeedHome {
  homeFeed: FeedHome_homeFeed[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FeedPost
// ====================================================

export interface FeedPost_alphaCreateFeedPost {
  __typename: "FeedItem";
  id: string;
}

export interface FeedPost {
  alphaCreateFeedPost: FeedPost_alphaCreateFeedPost;
}

export interface FeedPostVariables {
  message: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyOrganizations
// ====================================================

export interface MyOrganizations_myOrganizations {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
  isPrimary: boolean;
}

export interface MyOrganizations {
  myOrganizations: MyOrganizations_myOrganizations[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateOrganization
// ====================================================

export interface UpdateOrganization_updateOrganizationProfile_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface UpdateOrganization_updateOrganizationProfile_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: UpdateOrganization_updateOrganizationProfile_photoRef_crop | null;
}

export interface UpdateOrganization_updateOrganizationProfile {
  __typename: "OrganizationProfile";
  id: string;
  name: string;
  photoRef: UpdateOrganization_updateOrganizationProfile_photoRef | null;
  website: string | null;
  websiteTitle: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  shortname: string | null;
  featured: boolean;
}

export interface UpdateOrganization {
  updateOrganizationProfile: UpdateOrganization_updateOrganizationProfile;
}

export interface UpdateOrganizationVariables {
  input: UpdateOrganizationProfileInput;
  organizationId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetOrgShortname
// ====================================================

export interface SetOrgShortname {
  alphaSetOrgShortName: string | null;
}

export interface SetOrgShortnameVariables {
  organizationId: string;
  shortname: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Organization
// ====================================================

export interface Organization_organization_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface Organization_organization_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: Organization_organization_members_user_primaryOrganization | null;
}

export interface Organization_organization_members {
  __typename: "OrganizationJoinedMember";
  role: OrganizationMemberRole;
  user: Organization_organization_members_user;
}

export interface Organization_organization_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface Organization_organization_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: Organization_organization_requests_user_primaryOrganization | null;
}

export interface Organization_organization_requests {
  __typename: "OrganizationRequestedMember";
  role: OrganizationMemberRole;
  user: Organization_organization_requests_user;
}

export interface Organization_organization_rooms_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface Organization_organization_rooms {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: Organization_organization_rooms_organization | null;
}

export interface Organization_organization {
  __typename: "Organization";
  id: string;
  /**
   * # Refactor?
   */
  superAccountId: string;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  featured: boolean;
  isCommunity: boolean;
  name: string;
  photo: string | null;
  shortname: string | null;
  website: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  members: Organization_organization_members[];
  requests: Organization_organization_requests[];
  rooms: Organization_organization_rooms[];
}

export interface Organization {
  organization: Organization_organization;
}

export interface OrganizationVariables {
  organizationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationMembersShort
// ====================================================

export interface OrganizationMembersShort_organization_members_user {
  __typename: "User";
  id: string;
}

export interface OrganizationMembersShort_organization_members {
  __typename: "OrganizationJoinedMember";
  user: OrganizationMembersShort_organization_members_user;
}

export interface OrganizationMembersShort_organization {
  __typename: "Organization";
  members: OrganizationMembersShort_organization_members[];
}

export interface OrganizationMembersShort {
  organization: OrganizationMembersShort_organization;
}

export interface OrganizationMembersShortVariables {
  organizationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationProfile
// ====================================================

export interface OrganizationProfile_organizationProfile_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfile_organizationProfile_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfile_organizationProfile_photoRef_crop | null;
}

export interface OrganizationProfile_organizationProfile {
  __typename: "OrganizationProfile";
  id: string;
  name: string;
  photoRef: OrganizationProfile_organizationProfile_photoRef | null;
  website: string | null;
  websiteTitle: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  shortname: string | null;
  featured: boolean;
}

export interface OrganizationProfile {
  organizationProfile: OrganizationProfile_organizationProfile;
}

export interface OrganizationProfileVariables {
  organizationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExploreOrganizations
// ====================================================

export interface ExploreOrganizations_items_edges_node_members_user {
  __typename: "User";
  id: string;
  name: string;
  picture: string | null;
}

export interface ExploreOrganizations_items_edges_node_members {
  __typename: "OrganizationJoinedMember";
  user: ExploreOrganizations_items_edges_node_members_user;
}

export interface ExploreOrganizations_items_edges_node {
  __typename: "Organization";
  id: string;
  /**
   * # Refactor?
   */
  superAccountId: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  about: string | null;
  status: string;
  featured: boolean;
  members: ExploreOrganizations_items_edges_node_members[];
}

export interface ExploreOrganizations_items_edges {
  __typename: "OrganizationsEdge";
  node: ExploreOrganizations_items_edges_node;
  cursor: string;
}

export interface ExploreOrganizations_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface ExploreOrganizations_items {
  __typename: "OrganizationsConnection";
  edges: ExploreOrganizations_items_edges[];
  pageInfo: ExploreOrganizations_items_pageInfo;
}

export interface ExploreOrganizations {
  items: ExploreOrganizations_items;
}

export interface ExploreOrganizationsVariables {
  query?: string | null;
  prefix?: string | null;
  sort?: string | null;
  page?: number | null;
  after?: string | null;
  all?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExploreComunity
// ====================================================

export interface ExploreComunity_items_edges_node_members_user {
  __typename: "User";
  id: string;
  name: string;
  picture: string | null;
}

export interface ExploreComunity_items_edges_node_members {
  __typename: "OrganizationJoinedMember";
  user: ExploreComunity_items_edges_node_members_user;
}

export interface ExploreComunity_items_edges_node {
  __typename: "Organization";
  id: string;
  /**
   * # Refactor?
   */
  superAccountId: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  about: string | null;
  status: string;
  featured: boolean;
  members: ExploreComunity_items_edges_node_members[];
}

export interface ExploreComunity_items_edges {
  __typename: "OrganizationsEdge";
  node: ExploreComunity_items_edges_node;
  cursor: string;
}

export interface ExploreComunity_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface ExploreComunity_items {
  __typename: "OrganizationsConnection";
  edges: ExploreComunity_items_edges[];
  pageInfo: ExploreComunity_items_pageInfo;
}

export interface ExploreComunity {
  items: ExploreComunity_items;
}

export interface ExploreComunityVariables {
  query?: string | null;
  sort?: string | null;
  page?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationChangeMemberRole
// ====================================================

export interface OrganizationChangeMemberRole {
  alphaOrganizationChangeMemberRole: string;
}

export interface OrganizationChangeMemberRoleVariables {
  memberId: string;
  newRole: OrganizationMemberRole;
  organizationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationAddMember
// ====================================================

export interface OrganizationAddMember_betaOrganizationMemberAdd_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface OrganizationAddMember_betaOrganizationMemberAdd_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: OrganizationAddMember_betaOrganizationMemberAdd_members_user_primaryOrganization | null;
}

export interface OrganizationAddMember_betaOrganizationMemberAdd_members {
  __typename: "OrganizationJoinedMember";
  role: OrganizationMemberRole;
  user: OrganizationAddMember_betaOrganizationMemberAdd_members_user;
}

export interface OrganizationAddMember_betaOrganizationMemberAdd_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface OrganizationAddMember_betaOrganizationMemberAdd_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: OrganizationAddMember_betaOrganizationMemberAdd_requests_user_primaryOrganization | null;
}

export interface OrganizationAddMember_betaOrganizationMemberAdd_requests {
  __typename: "OrganizationRequestedMember";
  role: OrganizationMemberRole;
  user: OrganizationAddMember_betaOrganizationMemberAdd_requests_user;
}

export interface OrganizationAddMember_betaOrganizationMemberAdd_rooms_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface OrganizationAddMember_betaOrganizationMemberAdd_rooms {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: OrganizationAddMember_betaOrganizationMemberAdd_rooms_organization | null;
}

export interface OrganizationAddMember_betaOrganizationMemberAdd {
  __typename: "Organization";
  id: string;
  /**
   * # Refactor?
   */
  superAccountId: string;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  featured: boolean;
  isCommunity: boolean;
  name: string;
  photo: string | null;
  shortname: string | null;
  website: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  members: OrganizationAddMember_betaOrganizationMemberAdd_members[];
  requests: OrganizationAddMember_betaOrganizationMemberAdd_requests[];
  rooms: OrganizationAddMember_betaOrganizationMemberAdd_rooms[];
}

export interface OrganizationAddMember {
  betaOrganizationMemberAdd: OrganizationAddMember_betaOrganizationMemberAdd;
}

export interface OrganizationAddMemberVariables {
  userIds?: string[] | null;
  organizationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationRemoveMember
// ====================================================

export interface OrganizationRemoveMember {
  alphaOrganizationRemoveMember: string;
}

export interface OrganizationRemoveMemberVariables {
  memberId: string;
  organizationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationInviteMembers
// ====================================================

export interface OrganizationInviteMembers {
  alphaOrganizationInviteMembers: string;
}

export interface OrganizationInviteMembersVariables {
  inviteRequests: InviteRequest[];
  organizationId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationPublicInvite
// ====================================================

export interface OrganizationPublicInvite_publicInvite {
  __typename: "Invite";
  id: string;
  key: string;
  ttl: string | null;
}

export interface OrganizationPublicInvite {
  publicInvite: OrganizationPublicInvite_publicInvite | null;
}

export interface OrganizationPublicInviteVariables {
  organizationId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationCreatePublicInvite
// ====================================================

export interface OrganizationCreatePublicInvite_alphaOrganizationRefreshInviteLink {
  __typename: "Invite";
  id: string;
  key: string;
  ttl: string | null;
}

export interface OrganizationCreatePublicInvite {
  alphaOrganizationRefreshInviteLink: OrganizationCreatePublicInvite_alphaOrganizationRefreshInviteLink;
}

export interface OrganizationCreatePublicInviteVariables {
  expirationDays?: number | null;
  organizationId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteOrganization
// ====================================================

export interface DeleteOrganization {
  deleteOrganization: boolean;
}

export interface DeleteOrganizationVariables {
  organizationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationMemberRemove
// ====================================================

export interface OrganizationMemberRemove_betaOrganizationMemberRemove {
  __typename: "Organization";
  id: string;
}

export interface OrganizationMemberRemove {
  betaOrganizationMemberRemove: OrganizationMemberRemove_betaOrganizationMemberRemove;
}

export interface OrganizationMemberRemoveVariables {
  userId: string;
  organizationId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationActivateByInvite
// ====================================================

export interface OrganizationActivateByInvite {
  joinAppInvite: string;
}

export interface OrganizationActivateByInviteVariables {
  inviteKey: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationAlterPublished
// ====================================================

export interface OrganizationAlterPublished_alphaAlterPublished_members_user {
  __typename: "User";
  id: string;
  name: string;
  picture: string | null;
}

export interface OrganizationAlterPublished_alphaAlterPublished_members {
  __typename: "OrganizationJoinedMember";
  user: OrganizationAlterPublished_alphaAlterPublished_members_user;
}

export interface OrganizationAlterPublished_alphaAlterPublished {
  __typename: "Organization";
  id: string;
  /**
   * # Refactor?
   */
  superAccountId: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  about: string | null;
  status: string;
  featured: boolean;
  members: OrganizationAlterPublished_alphaAlterPublished_members[];
}

export interface OrganizationAlterPublished {
  alphaAlterPublished: OrganizationAlterPublished_alphaAlterPublished;
}

export interface OrganizationAlterPublishedVariables {
  organizationId: string;
  published: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationByPrefix
// ====================================================

export interface OrganizationByPrefix_organizationByPrefix_members_user {
  __typename: "User";
  id: string;
  name: string;
  picture: string | null;
}

export interface OrganizationByPrefix_organizationByPrefix_members {
  __typename: "OrganizationJoinedMember";
  user: OrganizationByPrefix_organizationByPrefix_members_user;
}

export interface OrganizationByPrefix_organizationByPrefix {
  __typename: "Organization";
  id: string;
  /**
   * # Refactor?
   */
  superAccountId: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  about: string | null;
  status: string;
  featured: boolean;
  members: OrganizationByPrefix_organizationByPrefix_members[];
}

export interface OrganizationByPrefix {
  organizationByPrefix: OrganizationByPrefix_organizationByPrefix | null;
}

export interface OrganizationByPrefixVariables {
  query: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Permissions
// ====================================================

export interface Permissions_myPermissions {
  __typename: "Permissions";
  roles: string[];
}

export interface Permissions {
  myPermissions: Permissions_myPermissions;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DebugMails
// ====================================================

export interface DebugMails {
  debugSendEmail: boolean | null;
}

export interface DebugMailsVariables {
  type: DebugEmailType;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SuperAdmins
// ====================================================

export interface SuperAdmins_superAdmins_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface SuperAdmins_superAdmins_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: SuperAdmins_superAdmins_user_primaryOrganization | null;
}

export interface SuperAdmins_superAdmins {
  __typename: "SuperAdmin";
  role: SuperAdminRole;
  user: SuperAdmins_superAdmins_user;
  email: string | null;
}

export interface SuperAdmins {
  superAdmins: SuperAdmins_superAdmins[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SuperAccounts
// ====================================================

export interface SuperAccounts_superAccounts {
  __typename: "SuperAccount";
  id: string;
  orgId: string;
  title: string;
  state: SuperAccountState;
}

export interface SuperAccounts {
  superAccounts: SuperAccounts_superAccounts[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SuperAccount
// ====================================================

export interface SuperAccount_superAccount_members_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface SuperAccount_superAccount_members {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: SuperAccount_superAccount_members_primaryOrganization | null;
}

export interface SuperAccount_superAccount_features {
  __typename: "FeatureFlag";
  id: string;
  key: string;
  title: string;
}

export interface SuperAccount_superAccount_createdBy {
  __typename: "User";
  name: string;
}

export interface SuperAccount_superAccount {
  __typename: "SuperAccount";
  id: string;
  title: string;
  state: SuperAccountState;
  members: SuperAccount_superAccount_members[];
  features: SuperAccount_superAccount_features[];
  orgId: string;
  createdAt: string | null;
  createdBy: SuperAccount_superAccount_createdBy | null;
  published: boolean;
}

export interface SuperAccount {
  superAccount: SuperAccount_superAccount;
}

export interface SuperAccountVariables {
  accountId: string;
  viaOrgId?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperAccountRename
// ====================================================

export interface SuperAccountRename_superAccountRename {
  __typename: "SuperAccount";
  id: string;
  title: string;
}

export interface SuperAccountRename {
  superAccountRename: SuperAccountRename_superAccountRename;
}

export interface SuperAccountRenameVariables {
  accountId: string;
  title: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperAccountActivate
// ====================================================

export interface SuperAccountActivate_superAccountActivate {
  __typename: "SuperAccount";
  id: string;
  state: SuperAccountState;
}

export interface SuperAccountActivate {
  superAccountActivate: SuperAccountActivate_superAccountActivate;
}

export interface SuperAccountActivateVariables {
  accountId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperAccountSuspend
// ====================================================

export interface SuperAccountSuspend_superAccountSuspend {
  __typename: "SuperAccount";
  id: string;
  state: SuperAccountState;
}

export interface SuperAccountSuspend {
  superAccountSuspend: SuperAccountSuspend_superAccountSuspend;
}

export interface SuperAccountSuspendVariables {
  accountId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperAccountPend
// ====================================================

export interface SuperAccountPend_superAccountPend {
  __typename: "SuperAccount";
  id: string;
  state: SuperAccountState;
}

export interface SuperAccountPend {
  superAccountPend: SuperAccountPend_superAccountPend;
}

export interface SuperAccountPendVariables {
  accountId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperAccountAdd
// ====================================================

export interface SuperAccountAdd_superAccountAdd {
  __typename: "SuperAccount";
  id: string;
}

export interface SuperAccountAdd {
  superAccountAdd: SuperAccountAdd_superAccountAdd;
}

export interface SuperAccountAddVariables {
  title: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperAccountMemberAdd
// ====================================================

export interface SuperAccountMemberAdd_superAccountMemberAdd_members_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface SuperAccountMemberAdd_superAccountMemberAdd_members {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: SuperAccountMemberAdd_superAccountMemberAdd_members_primaryOrganization | null;
}

export interface SuperAccountMemberAdd_superAccountMemberAdd {
  __typename: "SuperAccount";
  id: string;
  members: SuperAccountMemberAdd_superAccountMemberAdd_members[];
}

export interface SuperAccountMemberAdd {
  superAccountMemberAdd: SuperAccountMemberAdd_superAccountMemberAdd;
}

export interface SuperAccountMemberAddVariables {
  accountId: string;
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperAccountMemberRemove
// ====================================================

export interface SuperAccountMemberRemove_superAccountMemberRemove_members_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface SuperAccountMemberRemove_superAccountMemberRemove_members {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: SuperAccountMemberRemove_superAccountMemberRemove_members_primaryOrganization | null;
}

export interface SuperAccountMemberRemove_superAccountMemberRemove {
  __typename: "SuperAccount";
  id: string;
  members: SuperAccountMemberRemove_superAccountMemberRemove_members[];
}

export interface SuperAccountMemberRemove {
  superAccountMemberRemove: SuperAccountMemberRemove_superAccountMemberRemove;
}

export interface SuperAccountMemberRemoveVariables {
  accountId: string;
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperAdminAdd
// ====================================================

export interface SuperAdminAdd {
  superAdminAdd: string;
}

export interface SuperAdminAddVariables {
  userId: string;
  role: SuperAdminRole;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperAdminRemove
// ====================================================

export interface SuperAdminRemove {
  superAdminRemove: string;
}

export interface SuperAdminRemoveVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profile
// ====================================================

export interface Profile_user {
  __typename: "User";
  id: string;
  shortname: string | null;
}

export interface Profile_profile_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Profile_profile_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: Profile_profile_photoRef_crop | null;
}

export interface Profile_profile_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface Profile_profile_invitedBy {
  __typename: "User";
  name: string;
}

export interface Profile_profile {
  __typename: "Profile";
  id: string;
  firstName: string | null;
  lastName: string | null;
  photoRef: Profile_profile_photoRef | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  role: string | null;
  /**
   * Deprecated
   */
  linkedin: string | null;
  primaryOrganization: Profile_profile_primaryOrganization | null;
  joinedAt: string | null;
  invitedBy: Profile_profile_invitedBy | null;
}

export interface Profile {
  user: Profile_user | null;
  profile: Profile_profile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ProfileUpdate
// ====================================================

export interface ProfileUpdate_updateProfile_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ProfileUpdate_updateProfile_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ProfileUpdate_updateProfile_photoRef_crop | null;
}

export interface ProfileUpdate_updateProfile_invitedBy {
  __typename: "User";
  name: string;
}

export interface ProfileUpdate_updateProfile {
  __typename: "Profile";
  id: string;
  firstName: string | null;
  lastName: string | null;
  photoRef: ProfileUpdate_updateProfile_photoRef | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  role: string | null;
  /**
   * Deprecated
   */
  linkedin: string | null;
  /**
   * Deprecated
   */
  primaryOrganizationId: string | null;
  joinedAt: string | null;
  invitedBy: ProfileUpdate_updateProfile_invitedBy | null;
}

export interface ProfileUpdate {
  updateProfile: ProfileUpdate_updateProfile;
}

export interface ProfileUpdateVariables {
  input: UpdateProfileInput;
  uid?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetUserShortname
// ====================================================

export interface SetUserShortname {
  alphaSetUserShortName: string | null;
}

export interface SetUserShortnameVariables {
  shortname: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ProfileCreate
// ====================================================

export interface ProfileCreate_createProfile_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ProfileCreate_createProfile_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ProfileCreate_createProfile_photoRef_crop | null;
}

export interface ProfileCreate_createProfile {
  __typename: "Profile";
  id: string;
  firstName: string | null;
  lastName: string | null;
  photoRef: ProfileCreate_createProfile_photoRef | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
}

export interface ProfileCreate {
  /**
   * Deprecated
   */
  createProfile: ProfileCreate_createProfile;
}

export interface ProfileCreateVariables {
  input: CreateProfileInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SettingsUpdate
// ====================================================

export interface SettingsUpdate_updateSettings {
  __typename: "Settings";
  id: string;
  primaryEmail: string;
  emailFrequency: EmailFrequency;
  desktopNotifications: NotificationMessages;
  mobileNotifications: NotificationMessages;
  mobileAlert: boolean;
  mobileIncludeText: boolean;
}

export interface SettingsUpdate {
  /**
   * Deprecated
   */
  updateSettings: SettingsUpdate_updateSettings;
}

export interface SettingsUpdateVariables {
  input?: UpdateSettingsInput | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PersistEvents
// ====================================================

export interface PersistEvents {
  track: string;
}

export interface PersistEventsVariables {
  did: string;
  events: Event[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_items {
  __typename: "User";
  id: string;
  title: string;
  subtitle: string | null;
}

export interface Users {
  /**
   * Deprecated
   */
  items: Users_items[];
}

export interface UsersVariables {
  query: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface User_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: User_user_primaryOrganization | null;
}

export interface User_conversation_SharedRoom {
  __typename: "SharedRoom";
}

export interface User_conversation_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface User_conversation_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  settings: User_conversation_PrivateRoom_settings;
}

export type User_conversation = User_conversation_SharedRoom | User_conversation_PrivateRoom;

export interface User {
  user: User_user;
  conversation: User_conversation | null;
}

export interface UserVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Online
// ====================================================

export interface Online_user {
  __typename: "User";
  id: string;
  online: boolean;
  lastSeen: string | null;
}

export interface Online {
  user: Online_user;
}

export interface OnlineVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: OnlineWatch
// ====================================================

export interface OnlineWatch_alphaSubscribeChatOnline_user {
  __typename: "User";
  id: string;
  online: boolean;
  lastSeen: string | null;
}

export interface OnlineWatch_alphaSubscribeChatOnline {
  __typename: "OnlineEvent";
  user: OnlineWatch_alphaSubscribeChatOnline_user;
  type: string;
  timeout: number;
}

export interface OnlineWatch {
  alphaSubscribeChatOnline: OnlineWatch_alphaSubscribeChatOnline;
}

export interface OnlineWatchVariables {
  conversations: string[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExplorePeople
// ====================================================

export interface ExplorePeople_items_edges_node_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ExplorePeople_items_edges_node {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ExplorePeople_items_edges_node_primaryOrganization | null;
}

export interface ExplorePeople_items_edges {
  __typename: "UserEdge";
  node: ExplorePeople_items_edges_node;
  cursor: string;
}

export interface ExplorePeople_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface ExplorePeople_items {
  __typename: "UserConnection";
  edges: ExplorePeople_items_edges[];
  pageInfo: ExplorePeople_items_pageInfo;
}

export interface ExplorePeople {
  items: ExplorePeople_items;
}

export interface ExplorePeopleVariables {
  query?: string | null;
  sort?: string | null;
  page?: number | null;
  after?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ResolveShortName
// ====================================================

export interface ResolveShortName_item_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ResolveShortName_item_User {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: ResolveShortName_item_User_primaryOrganization | null;
}

export interface ResolveShortName_item_Organization_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ResolveShortName_item_Organization_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: ResolveShortName_item_Organization_members_user_primaryOrganization | null;
}

export interface ResolveShortName_item_Organization_members {
  __typename: "OrganizationJoinedMember";
  role: OrganizationMemberRole;
  user: ResolveShortName_item_Organization_members_user;
}

export interface ResolveShortName_item_Organization_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ResolveShortName_item_Organization_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: ResolveShortName_item_Organization_requests_user_primaryOrganization | null;
}

export interface ResolveShortName_item_Organization_requests {
  __typename: "OrganizationRequestedMember";
  role: OrganizationMemberRole;
  user: ResolveShortName_item_Organization_requests_user;
}

export interface ResolveShortName_item_Organization_rooms_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ResolveShortName_item_Organization_rooms {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ResolveShortName_item_Organization_rooms_organization | null;
}

export interface ResolveShortName_item_Organization {
  __typename: "Organization";
  id: string;
  /**
   * # Refactor?
   */
  superAccountId: string;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  featured: boolean;
  isCommunity: boolean;
  name: string;
  photo: string | null;
  shortname: string | null;
  website: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  members: ResolveShortName_item_Organization_members[];
  requests: ResolveShortName_item_Organization_requests[];
  rooms: ResolveShortName_item_Organization_rooms[];
}

export type ResolveShortName_item = ResolveShortName_item_User | ResolveShortName_item_Organization;

export interface ResolveShortName {
  item: ResolveShortName_item | null;
}

export interface ResolveShortNameVariables {
  shortname: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppChat
// ====================================================

export interface AppChat_chat_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
}

export interface AppChat_chat_SharedRoom {
  __typename: "SharedRoom";
  id: string;
}

export type AppChat_chat = AppChat_chat_PrivateRoom | AppChat_chat_SharedRoom;

export interface AppChat {
  __typename: "AppChat";
  chat: AppChat_chat;
  webhook: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppFull
// ====================================================

export interface AppFull_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface AppFull_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: AppFull_photoRef_crop | null;
}

export interface AppFull_token {
  __typename: "AppToken";
  salt: string;
}

export interface AppFull {
  __typename: "AppProfile";
  id: string;
  name: string;
  shortname: string | null;
  photoRef: AppFull_photoRef | null;
  about: string | null;
  token: AppFull_token;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConferenceFull
// ====================================================

export interface ConferenceFull_peers_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConferenceFull_peers_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ConferenceFull_peers_user_primaryOrganization | null;
}

export interface ConferenceFull_peers_connection {
  __typename: "ConferencePeerConnection";
  state: ConferencePeerConnectionState;
  sdp: string | null;
  ice: string[];
}

export interface ConferenceFull_peers {
  __typename: "ConferencePeer";
  id: string;
  user: ConferenceFull_peers_user;
  connection: ConferenceFull_peers_connection | null;
}

export interface ConferenceFull_iceServers {
  __typename: "ICEServer";
  urls: string[];
  username: string | null;
  credential: string | null;
}

export interface ConferenceFull {
  __typename: "Conference";
  id: string;
  peers: ConferenceFull_peers[];
  iceServers: ConferenceFull_iceServers[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TinyMessage
// ====================================================

export interface TinyMessage_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface TinyMessage_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: TinyMessage_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface TinyMessage_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface TinyMessage_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface TinyMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface TinyMessage_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: TinyMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type TinyMessage_GeneralMessage_attachments = TinyMessage_GeneralMessage_attachments_MessageAttachmentPost | TinyMessage_GeneralMessage_attachments_MessageAttachmentFile;

export interface TinyMessage_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface TinyMessage_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: TinyMessage_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: TinyMessage_GeneralMessage_attachments[];
  quotedMessages: TinyMessage_GeneralMessage_quotedMessages[];
}

export type TinyMessage = TinyMessage_ServiceMessage | TinyMessage_GeneralMessage;

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullMessage
// ====================================================

export interface FullMessage_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: FullMessage_GeneralMessage_sender_primaryOrganization | null;
}

export interface FullMessage_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface FullMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface FullMessage_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: FullMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface FullMessage_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface FullMessage_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: FullMessage_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface FullMessage_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface FullMessage_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: FullMessage_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface FullMessage_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: FullMessage_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: FullMessage_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type FullMessage_GeneralMessage_attachments = FullMessage_GeneralMessage_attachments_MessageAttachmentPost | FullMessage_GeneralMessage_attachments_MessageAttachmentFile | FullMessage_GeneralMessage_attachments_MessageRichAttachment;

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: FullMessage_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room = FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans = FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention | FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention | FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention | FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink;

export interface FullMessage_GeneralMessage_quotedMessages_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: FullMessage_GeneralMessage_quotedMessages_ServiceMessage_sender;
  fallback: string;
  spans: FullMessage_GeneralMessage_quotedMessages_ServiceMessage_spans[];
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room = FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans = FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention | FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention | FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention | FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink;

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments = FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost | FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile | FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment;

export interface FullMessage_GeneralMessage_quotedMessages_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_sender;
  fallback: string;
  spans: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_spans[];
  edited: boolean;
  attachments: FullMessage_GeneralMessage_quotedMessages_GeneralMessage_attachments[];
}

export type FullMessage_GeneralMessage_quotedMessages = FullMessage_GeneralMessage_quotedMessages_ServiceMessage | FullMessage_GeneralMessage_quotedMessages_GeneralMessage;

export interface FullMessage_GeneralMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_GeneralMessage_reactions {
  __typename: "ModernMessageReaction";
  user: FullMessage_GeneralMessage_reactions_user;
  reaction: MessageReactionType;
}

export interface FullMessage_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: FullMessage_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface FullMessage_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: FullMessage_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room = FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface FullMessage_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: FullMessage_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface FullMessage_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type FullMessage_GeneralMessage_spans = FullMessage_GeneralMessage_spans_MessageSpanUserMention | FullMessage_GeneralMessage_spans_MessageSpanMultiUserMention | FullMessage_GeneralMessage_spans_MessageSpanRoomMention | FullMessage_GeneralMessage_spans_MessageSpanLink;

export interface FullMessage_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: FullMessage_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  edited: boolean;
  attachments: FullMessage_GeneralMessage_attachments[];
  quotedMessages: FullMessage_GeneralMessage_quotedMessages[];
  reactions: FullMessage_GeneralMessage_reactions[];
  spans: FullMessage_GeneralMessage_spans[];
}

export interface FullMessage_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: FullMessage_ServiceMessage_sender_primaryOrganization | null;
}

export interface FullMessage_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: FullMessage_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface FullMessage_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: FullMessage_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room = FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface FullMessage_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: FullMessage_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface FullMessage_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type FullMessage_ServiceMessage_spans = FullMessage_ServiceMessage_spans_MessageSpanUserMention | FullMessage_ServiceMessage_spans_MessageSpanMultiUserMention | FullMessage_ServiceMessage_spans_MessageSpanRoomMention | FullMessage_ServiceMessage_spans_MessageSpanLink;

export interface FullMessage_ServiceMessage_serviceMetadata_InviteServiceMetadata_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_ServiceMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata";
  users: FullMessage_ServiceMessage_serviceMetadata_InviteServiceMetadata_users[] | null;
  invitedBy: FullMessage_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy;
}

export interface FullMessage_ServiceMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface FullMessage_ServiceMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: FullMessage_ServiceMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: FullMessage_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export interface FullMessage_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata {
  __typename: "TitleChangeServiceMetadata";
  title: string;
}

export interface FullMessage_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata {
  __typename: "PhotoChangeServiceMetadata";
  photo: string | null;
}

export interface FullMessage_ServiceMessage_serviceMetadata_PostRespondServiceMetadata {
  __typename: "PostRespondServiceMetadata";
  respondType: string;
}

export type FullMessage_ServiceMessage_serviceMetadata = FullMessage_ServiceMessage_serviceMetadata_InviteServiceMetadata | FullMessage_ServiceMessage_serviceMetadata_KickServiceMetadata | FullMessage_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata | FullMessage_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata | FullMessage_ServiceMessage_serviceMetadata_PostRespondServiceMetadata;

export interface FullMessage_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: FullMessage_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: FullMessage_ServiceMessage_spans[];
  serviceMetadata: FullMessage_ServiceMessage_serviceMetadata | null;
}

export type FullMessage = FullMessage_GeneralMessage | FullMessage_ServiceMessage;

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationFull
// ====================================================

export interface OrganizationFull_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface OrganizationFull_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: OrganizationFull_members_user_primaryOrganization | null;
}

export interface OrganizationFull_members {
  __typename: "OrganizationJoinedMember";
  role: OrganizationMemberRole;
  user: OrganizationFull_members_user;
}

export interface OrganizationFull_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface OrganizationFull_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: OrganizationFull_requests_user_primaryOrganization | null;
}

export interface OrganizationFull_requests {
  __typename: "OrganizationRequestedMember";
  role: OrganizationMemberRole;
  user: OrganizationFull_requests_user;
}

export interface OrganizationFull_rooms_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface OrganizationFull_rooms {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: OrganizationFull_rooms_organization | null;
}

export interface OrganizationFull {
  __typename: "Organization";
  id: string;
  /**
   * # Refactor?
   */
  superAccountId: string;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  featured: boolean;
  isCommunity: boolean;
  name: string;
  photo: string | null;
  shortname: string | null;
  website: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  members: OrganizationFull_members[];
  requests: OrganizationFull_requests[];
  rooms: OrganizationFull_rooms[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationMedium
// ====================================================

export interface OrganizationMedium {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationProfileFull
// ====================================================

export interface OrganizationProfileFull_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfileFull_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfileFull_photoRef_crop | null;
}

export interface OrganizationProfileFull {
  __typename: "OrganizationProfile";
  id: string;
  name: string;
  photoRef: OrganizationProfileFull_photoRef | null;
  website: string | null;
  websiteTitle: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  shortname: string | null;
  featured: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationSearch
// ====================================================

export interface OrganizationSearch_members_user {
  __typename: "User";
  id: string;
  name: string;
  picture: string | null;
}

export interface OrganizationSearch_members {
  __typename: "OrganizationJoinedMember";
  user: OrganizationSearch_members_user;
}

export interface OrganizationSearch {
  __typename: "Organization";
  id: string;
  /**
   * # Refactor?
   */
  superAccountId: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  about: string | null;
  status: string;
  featured: boolean;
  members: OrganizationSearch_members[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationShort
// ====================================================

export interface OrganizationShort {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoomFull
// ====================================================

export interface RoomFull_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomFull_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomFull_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomFull_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomFull_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomFull_PrivateRoom_user;
  settings: RoomFull_PrivateRoom_settings;
}

export interface RoomFull_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isMine: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCommunity: boolean;
}

export interface RoomFull_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomFull_SharedRoom_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomFull_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomFull_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomFull_SharedRoom_members_user;
  canKick: boolean;
}

export interface RoomFull_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomFull_SharedRoom_requests_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomFull_SharedRoom_requests_user_primaryOrganization | null;
}

export interface RoomFull_SharedRoom_requests {
  __typename: "RoomMember";
  user: RoomFull_SharedRoom_requests_user;
}

export interface RoomFull_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomFull_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomFull_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomFull_SharedRoom_members[];
  requests: RoomFull_SharedRoom_requests[] | null;
  settings: RoomFull_SharedRoom_settings;
  canEdit: boolean;
}

export type RoomFull = RoomFull_PrivateRoom | RoomFull_SharedRoom;

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoomShort
// ====================================================

export interface RoomShort_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomShort_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: RoomShort_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomShort_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomShort_PrivateRoom_user;
}

export interface RoomShort_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomShort_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: RoomShort_SharedRoom_organization | null;
}

export type RoomShort = RoomShort_PrivateRoom | RoomShort_SharedRoom;

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SessionStateFull
// ====================================================

export interface SessionStateFull {
  __typename: "SessionState";
  isLoggedIn: boolean;
  isProfileCreated: boolean;
  isAccountActivated: boolean;
  isAccountExists: boolean;
  /**
   * deprecated
   */
  isAccountPicked: boolean;
  isCompleted: boolean;
  isBlocked: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SettingsFull
// ====================================================

export interface SettingsFull {
  __typename: "Settings";
  id: string;
  primaryEmail: string;
  emailFrequency: EmailFrequency;
  desktopNotifications: NotificationMessages;
  mobileNotifications: NotificationMessages;
  mobileAlert: boolean;
  mobileIncludeText: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserFull
// ====================================================

export interface UserFull_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface UserFull {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
  isBot: boolean;
  isYou: boolean;
  online: boolean;
  lastSeen: string | null;
  linkedin: string | null;
  twitter: string | null;
  shortname: string | null;
  primaryOrganization: UserFull_primaryOrganization | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserShort
// ====================================================

export interface UserShort_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface UserShort {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: UserShort_primaryOrganization | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserTiny
// ====================================================

export interface UserTiny {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChatUpdateFragment
// ====================================================

export interface ChatUpdateFragment_ChatUpdated {
  __typename: "ChatUpdated" | "ChatLostAccess";
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanUserMention | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanMultiUserMention | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanRoomMention | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans_MessageSpanLink;

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink;

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_sender;
  fallback: string;
  spans: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage_spans[];
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink;

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_sender;
  fallback: string;
  spans: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage_attachments[];
}

export type ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_ServiceMessage | ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages_GeneralMessage;

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_reactions {
  __typename: "ModernMessageReaction";
  user: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_reactions_user;
  reaction: MessageReactionType;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_attachments[];
  quotedMessages: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_quotedMessages[];
  reactions: ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage_reactions[];
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room = ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans = ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanUserMention | ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanMultiUserMention | ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanRoomMention | ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans_MessageSpanLink;

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata";
  users: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users[] | null;
  invitedBy: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata {
  __typename: "TitleChangeServiceMetadata";
  title: string;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata {
  __typename: "PhotoChangeServiceMetadata";
  photo: string | null;
}

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata {
  __typename: "PostRespondServiceMetadata";
  respondType: string;
}

export type ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata = ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_InviteServiceMetadata | ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_KickServiceMetadata | ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata | ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata | ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata;

export interface ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_spans[];
  serviceMetadata: ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage_serviceMetadata | null;
}

export type ChatUpdateFragment_ChatMessageReceived_message = ChatUpdateFragment_ChatMessageReceived_message_GeneralMessage | ChatUpdateFragment_ChatMessageReceived_message_ServiceMessage;

export interface ChatUpdateFragment_ChatMessageReceived {
  __typename: "ChatMessageReceived";
  message: ChatUpdateFragment_ChatMessageReceived_message;
  repeatKey: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanUserMention | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanMultiUserMention | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanRoomMention | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans_MessageSpanLink;

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanUserMention | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanMultiUserMention | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanRoomMention | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans_MessageSpanLink;

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_sender;
  fallback: string;
  spans: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage_spans[];
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention_user;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanUserMention | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanMultiUserMention | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanRoomMention | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans_MessageSpanLink;

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost";
  fallback: string;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  fallback: string;
  fileId: string;
  fileMetadata: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon {
  __typename: "Image";
  url: string;
  metadata: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon_metadata | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image {
  __typename: "Image";
  url: string;
  metadata: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image_metadata | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment {
  __typename: "MessageRichAttachment";
  fallback: string;
  title: string | null;
  subTitle: string | null;
  titleLink: string | null;
  titleLinkHostname: string | null;
  text: string | null;
  icon: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_icon | null;
  image: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment_image | null;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentPost | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageAttachmentFile | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments_MessageRichAttachment;

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  /**
   * Content
   */
  message: string | null;
  sender: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_sender;
  fallback: string;
  spans: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage_attachments[];
}

export type ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_ServiceMessage | ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages_GeneralMessage;

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_reactions {
  __typename: "ModernMessageReaction";
  user: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_reactions_user;
  reaction: MessageReactionType;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_spans[];
  edited: boolean;
  attachments: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_attachments[];
  quotedMessages: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_quotedMessages[];
  reactions: ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage_reactions[];
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_sender_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention {
  __typename: "MessageSpanUserMention";
  offset: number;
  length: number;
  user: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention_user;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention {
  __typename: "MessageSpanMultiUserMention";
  offset: number;
  length: number;
  users: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention_users[];
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  isBot: boolean;
  shortname: string | null;
  primaryOrganization: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user_primaryOrganization | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom_user;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
  organization: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom_organization | null;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room = ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_PrivateRoom | ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room_SharedRoom;

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention {
  __typename: "MessageSpanRoomMention";
  offset: number;
  length: number;
  room: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention_room;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanLink {
  __typename: "MessageSpanLink";
  offset: number;
  length: number;
  url: string;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans = ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanUserMention | ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanMultiUserMention | ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanRoomMention | ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans_MessageSpanLink;

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata";
  users: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_users[] | null;
  invitedBy: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata_invitedBy;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata {
  __typename: "TitleChangeServiceMetadata";
  title: string;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata {
  __typename: "PhotoChangeServiceMetadata";
  photo: string | null;
}

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata {
  __typename: "PostRespondServiceMetadata";
  respondType: string;
}

export type ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata = ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_InviteServiceMetadata | ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_KickServiceMetadata | ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_TitleChangeServiceMetadata | ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PhotoChangeServiceMetadata | ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata_PostRespondServiceMetadata;

export interface ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  spans: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_spans[];
  serviceMetadata: ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage_serviceMetadata | null;
}

export type ChatUpdateFragment_ChatMessageUpdated_message = ChatUpdateFragment_ChatMessageUpdated_message_GeneralMessage | ChatUpdateFragment_ChatMessageUpdated_message_ServiceMessage;

export interface ChatUpdateFragment_ChatMessageUpdated {
  __typename: "ChatMessageUpdated";
  message: ChatUpdateFragment_ChatMessageUpdated_message;
}

export interface ChatUpdateFragment_ChatMessageDeleted_message {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface ChatUpdateFragment_ChatMessageDeleted {
  __typename: "ChatMessageDeleted";
  message: ChatUpdateFragment_ChatMessageDeleted_message;
}

export type ChatUpdateFragment = ChatUpdateFragment_ChatUpdated | ChatUpdateFragment_ChatMessageReceived | ChatUpdateFragment_ChatMessageUpdated | ChatUpdateFragment_ChatMessageDeleted;

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DialogUpdateFragment
// ====================================================

export interface DialogUpdateFragment_DialogMessageReceived_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogUpdateFragment_DialogMessageReceived_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogUpdateFragment_DialogMessageReceived_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_attachments = DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentPost | DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_attachments[];
  quotedMessages: DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage_quotedMessages[];
}

export type DialogUpdateFragment_DialogMessageReceived_message = DialogUpdateFragment_DialogMessageReceived_message_ServiceMessage | DialogUpdateFragment_DialogMessageReceived_message_GeneralMessage;

export interface DialogUpdateFragment_DialogMessageReceived {
  __typename: "DialogMessageReceived";
  cid: string;
  unread: number;
  globalUnread: number;
  message: DialogUpdateFragment_DialogMessageReceived_message;
}

export interface DialogUpdateFragment_DialogMessageUpdated_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogUpdateFragment_DialogMessageUpdated_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogUpdateFragment_DialogMessageUpdated_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_attachments = DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentPost | DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_attachments[];
  quotedMessages: DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage_quotedMessages[];
}

export type DialogUpdateFragment_DialogMessageUpdated_message = DialogUpdateFragment_DialogMessageUpdated_message_ServiceMessage | DialogUpdateFragment_DialogMessageUpdated_message_GeneralMessage;

export interface DialogUpdateFragment_DialogMessageUpdated {
  __typename: "DialogMessageUpdated";
  cid: string;
  message: DialogUpdateFragment_DialogMessageUpdated_message;
}

export interface DialogUpdateFragment_DialogMessageDeleted_message_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogUpdateFragment_DialogMessageDeleted_message_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogUpdateFragment_DialogMessageDeleted_message_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_attachments = DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentPost | DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_attachments[];
  quotedMessages: DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage_quotedMessages[];
}

export type DialogUpdateFragment_DialogMessageDeleted_message = DialogUpdateFragment_DialogMessageDeleted_message_ServiceMessage | DialogUpdateFragment_DialogMessageDeleted_message_GeneralMessage;

export interface DialogUpdateFragment_DialogMessageDeleted_prevMessage_ServiceMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogUpdateFragment_DialogMessageDeleted_prevMessage_ServiceMessage {
  __typename: "ServiceMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogUpdateFragment_DialogMessageDeleted_prevMessage_ServiceMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
}

export interface DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  shortname: string | null;
}

export interface DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentPost {
  __typename: "MessageAttachmentPost" | "MessageRichAttachment";
  id: string;
  fallback: string;
}

export interface DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata {
  __typename: "FileMetadata";
  isImage: boolean;
  imageFormat: string | null;
}

export interface DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile {
  __typename: "MessageAttachmentFile";
  id: string;
  fallback: string;
  fileId: string;
  fileMetadata: DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile_fileMetadata;
  filePreview: string | null;
}

export type DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_attachments = DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentPost | DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_attachments_MessageAttachmentFile;

export interface DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_quotedMessages {
  __typename: "GeneralMessage" | "ServiceMessage";
  /**
   * State
   */
  id: string;
}

export interface DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage {
  __typename: "GeneralMessage";
  /**
   * State
   */
  id: string;
  date: any;
  sender: DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_sender;
  /**
   * Content
   */
  message: string | null;
  fallback: string;
  attachments: DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_attachments[];
  quotedMessages: DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage_quotedMessages[];
}

export type DialogUpdateFragment_DialogMessageDeleted_prevMessage = DialogUpdateFragment_DialogMessageDeleted_prevMessage_ServiceMessage | DialogUpdateFragment_DialogMessageDeleted_prevMessage_GeneralMessage;

export interface DialogUpdateFragment_DialogMessageDeleted {
  __typename: "DialogMessageDeleted";
  cid: string;
  message: DialogUpdateFragment_DialogMessageDeleted_message;
  prevMessage: DialogUpdateFragment_DialogMessageDeleted_prevMessage | null;
  unread: number;
  globalUnread: number;
}

export interface DialogUpdateFragment_DialogMessageRead {
  __typename: "DialogMessageRead";
  cid: string;
  unread: number;
  globalUnread: number;
}

export interface DialogUpdateFragment_DialogTitleUpdated {
  __typename: "DialogTitleUpdated";
  cid: string;
  title: string;
}

export interface DialogUpdateFragment_DialogMuteChanged {
  __typename: "DialogMuteChanged";
  cid: string;
  mute: boolean;
}

export interface DialogUpdateFragment_DialogMentionedChanged {
  __typename: "DialogMentionedChanged";
  cid: string;
  haveMention: boolean;
}

export interface DialogUpdateFragment_DialogPhotoUpdated {
  __typename: "DialogPhotoUpdated";
  cid: string;
  photo: string | null;
}

export interface DialogUpdateFragment_DialogDeleted {
  __typename: "DialogDeleted";
  cid: string;
  globalUnread: number;
}

export type DialogUpdateFragment = DialogUpdateFragment_DialogMessageReceived | DialogUpdateFragment_DialogMessageUpdated | DialogUpdateFragment_DialogMessageDeleted | DialogUpdateFragment_DialogMessageRead | DialogUpdateFragment_DialogTitleUpdated | DialogUpdateFragment_DialogMuteChanged | DialogUpdateFragment_DialogMentionedChanged | DialogUpdateFragment_DialogPhotoUpdated | DialogUpdateFragment_DialogDeleted;

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Deprecated
 */
export enum ConferencePeerConnectionState {
  NEED_ANSWER = "NEED_ANSWER",
  NEED_OFFER = "NEED_OFFER",
  READY = "READY",
  WAIT_ANSWER = "WAIT_ANSWER",
  WAIT_OFFER = "WAIT_OFFER",
}

export enum DebugEmailType {
  ACCOUNT_ACTIVATED = "ACCOUNT_ACTIVATED",
  ACCOUNT_DEACTIVATED = "ACCOUNT_DEACTIVATED",
  INVITE = "INVITE",
  MEMBERSHIP_LEVEL_CHANGED = "MEMBERSHIP_LEVEL_CHANGED",
  MEMBER_JOINED = "MEMBER_JOINED",
  MEMBER_REMOVED = "MEMBER_REMOVED",
  PRIVATE_ROOM_INVITE = "PRIVATE_ROOM_INVITE",
  PUBLIC_ROOM_INVITE = "PUBLIC_ROOM_INVITE",
  ROOM_INVITE_ACCEPTED = "ROOM_INVITE_ACCEPTED",
  SIGIN_CODE = "SIGIN_CODE",
  SIGNUP_CODE = "SIGNUP_CODE",
  UNREAD_MESSAGE = "UNREAD_MESSAGE",
  UNREAD_MESSAGES = "UNREAD_MESSAGES",
  WELCOME = "WELCOME",
}

export enum DialogKind {
  GROUP = "GROUP",
  INTERNAL = "INTERNAL",
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export enum EmailFrequency {
  HOUR_1 = "HOUR_1",
  HOUR_24 = "HOUR_24",
  MIN_15 = "MIN_15",
  NEVER = "NEVER",
  WEEK_1 = "WEEK_1",
}

export enum MediaStreamState {
  NEED_ANSWER = "NEED_ANSWER",
  NEED_OFFER = "NEED_OFFER",
  READY = "READY",
  WAIT_ANSWER = "WAIT_ANSWER",
  WAIT_OFFER = "WAIT_OFFER",
}

export enum MessageReactionType {
  ANGRY = "ANGRY",
  CRYING = "CRYING",
  JOY = "JOY",
  LIKE = "LIKE",
  SCREAM = "SCREAM",
  THUMB_UP = "THUMB_UP",
}

export enum NotificationMessages {
  ALL = "ALL",
  DIRECT = "DIRECT",
  NONE = "NONE",
}

export enum NotificationsDelay {
  MIN_1 = "MIN_1",
  MIN_15 = "MIN_15",
  NONE = "NONE",
}

export enum OrganizationMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  OWNER = "OWNER",
}

export enum PostMessageType {
  BLANK = "BLANK",
  JOB_OPPORTUNITY = "JOB_OPPORTUNITY",
  OFFICE_HOURS = "OFFICE_HOURS",
  REQUEST_FOR_STARTUPS = "REQUEST_FOR_STARTUPS",
}

export enum PushType {
  ANDROID = "ANDROID",
  IOS = "IOS",
  SAFARI = "SAFARI",
  WEB_PUSH = "WEB_PUSH",
}

export enum RoomMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  OWNER = "OWNER",
}

export enum SharedRoomKind {
  GROUP = "GROUP",
  INTERNAL = "INTERNAL",
  PUBLIC = "PUBLIC",
}

export enum SharedRoomMembershipStatus {
  KICKED = "KICKED",
  LEFT = "LEFT",
  MEMBER = "MEMBER",
  NONE = "NONE",
  REQUESTED = "REQUESTED",
}

export enum SuperAccountState {
  ACTIVATED = "ACTIVATED",
  DELETED = "DELETED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export enum SuperAdminRole {
  EDITOR = "EDITOR",
  SOFTWARE_DEVELOPER = "SOFTWARE_DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface AppProfileInput {
  name?: string | null;
  shortname?: string | null;
  photoRef?: ImageRefInput | null;
  about?: string | null;
}

export interface ContactPersonInput {
  name: string;
  photoRef?: ImageRefInput | null;
  position?: string | null;
  email?: string | null;
  phone?: string | null;
  link?: string | null;
  twitter?: string | null;
}

export interface CreateOrganizationInput {
  id?: string | null;
  name: string;
  website?: string | null;
  personal: boolean;
  photoRef?: ImageRefInput | null;
  about?: string | null;
  isCommunity?: boolean | null;
}

/**
 * Deprecated
 */
export interface CreateProfileInput {
  firstName: string;
  lastName?: string | null;
  photoRef?: ImageRefInput | null;
  phone?: string | null;
  email?: string | null;
  about?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  primaryOrganization?: string | null;
}

export interface Event {
  id: string;
  event: string;
  params?: string | null;
}

export interface ImageCropInput {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ImageRefInput {
  uuid: string;
  crop?: ImageCropInput | null;
}

export interface InviteRequest {
  email: string;
  emailText?: string | null;
  role: OrganizationMemberRole;
  firstName?: string | null;
  lastName?: string | null;
}

export interface ProfileInput {
  firstName?: string | null;
  lastName?: string | null;
  photoRef?: ImageRefInput | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  about?: string | null;
  location?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  primaryOrganization?: string | null;
}

export interface RangeInput {
  from?: number | null;
  to?: number | null;
}

export interface RoomInviteEmailRequest {
  email: string;
  emailText?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export interface RoomInviteInput {
  userId: string;
  role: RoomMemberRole;
}

export interface RoomUpdateInput {
  title?: string | null;
  photoRef?: ImageRefInput | null;
  description?: string | null;
  socialImageRef?: ImageRefInput | null;
  kind?: SharedRoomKind | null;
}

export interface RoomUserNotificaionSettingsInput {
  mute?: boolean | null;
}

export interface UpdateOrganizationProfileInput {
  name?: string | null;
  photoRef?: ImageRefInput | null;
  website?: string | null;
  websiteTitle?: string | null;
  about?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  location?: string | null;
  contacts?: ContactPersonInput[] | null;
  alphaPublished?: boolean | null;
  alphaEditorial?: boolean | null;
  alphaFeatured?: boolean | null;
  alphaLocations?: string[] | null;
  alphaInterests?: string[] | null;
  alphaOrganizationType?: string[] | null;
  alphaPotentialSites?: (RangeInput | null)[] | null;
  alphaSiteSizes?: (RangeInput | null)[] | null;
  alphaDevelopmentModels?: (string | null)[] | null;
  alphaAvailability?: (string | null)[] | null;
  alphaLandUse?: (string | null)[] | null;
  alphaGoodFor?: (string | null)[] | null;
  alphaSpecialAttributes?: (string | null)[] | null;
  alphaLookingFor?: string[] | null;
  alphaGeographies?: string[] | null;
  alphaDOShapeAndForm?: string[] | null;
  alphaDOCurrentUse?: string[] | null;
  alphaDOGoodFitFor?: string[] | null;
  alphaDOSpecialAttributes?: string[] | null;
  alphaDOAvailability?: string[] | null;
  alphaARGeographies?: string[] | null;
  alphaARAreaRange?: string[] | null;
  alphaARHeightLimit?: string[] | null;
  alphaARActivityStatus?: string[] | null;
  alphaARAquisitionBudget?: string[] | null;
  alphaARAquisitionRate?: string[] | null;
  alphaARClosingTime?: string[] | null;
  alphaARSpecialAttributes?: string[] | null;
  alphaARLandUse?: string[] | null;
}

/**
 * Deprecated
 */
export interface UpdateProfileInput {
  firstName?: string | null;
  lastName?: string | null;
  photoRef?: ImageRefInput | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  about?: string | null;
  location?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  primaryOrganization?: string | null;
  alphaRole?: string | null;
  alphaLocations?: string[] | null;
  alphaLinkedin?: string | null;
  alphaTwitter?: string | null;
  alphaPrimaryOrganizationId?: string | null;
}

export interface UpdateSettingsInput {
  emailFrequency?: EmailFrequency | null;
  desktopNotifications?: NotificationMessages | null;
  mobileNotifications?: NotificationMessages | null;
  mobileAlert?: boolean | null;
  mobileIncludeText?: boolean | null;
  mute?: boolean | null;
  notificationsDelay?: NotificationsDelay | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
