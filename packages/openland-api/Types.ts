/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateOrganization
// ====================================================

export interface CreateOrganization_createOrganization {
  __typename: "OrganizationProfile";
  id: string;
  name: string;
}

export interface CreateOrganization {
  createOrganization: CreateOrganization_createOrganization;
}

export interface CreateOrganizationVariables {
  input: CreateOrganizationInput;
}

/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountAppInvite
// ====================================================

export interface AccountAppInvite {
  invite: string;
}

/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Dialogs
// ====================================================

export interface Dialogs_dialogs_items_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
}

export interface Dialogs_dialogs_items_topMessage {
  __typename: "Message";
  id: string;
  date: any;
  /**
   * Content
   */
  text: string | null;
  sender: Dialogs_dialogs_items_topMessage_sender;
}

export interface Dialogs_dialogs_items_betaTopMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
}

export interface Dialogs_dialogs_items_betaTopMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
}

export interface Dialogs_dialogs_items_betaTopMessage {
  __typename: "RoomMessage";
  id: string;
  date: any;
  message: string | null;
  file: string | null;
  isService: boolean;
  fileMetadata: Dialogs_dialogs_items_betaTopMessage_fileMetadata | null;
  sender: Dialogs_dialogs_items_betaTopMessage_sender;
}

export interface Dialogs_dialogs_items {
  __typename: "Dialog";
  id: string;
  cid: string;
  fid: string;
  kind: DialogKind;
  title: string;
  photo: string;
  unreadCount: number;
  isMuted: boolean;
  haveMention: boolean;
  topMessage: Dialogs_dialogs_items_topMessage | null;
  betaTopMessage: Dialogs_dialogs_items_betaTopMessage | null;
}

export interface Dialogs_dialogs {
  __typename: "DialogsConnection";
  items: Dialogs_dialogs_items[];
  cursor: string | null;
}

export interface Dialogs_counter {
  __typename: "NotificationCounter";
  id: string;
  unreadCount: number;
}

export interface Dialogs {
  dialogs: Dialogs_dialogs;
  counter: Dialogs_counter;
}

export interface DialogsVariables {
  after?: string | null;
}

/* tslint:disable */
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
  primaryOrganization: Room_room_PrivateRoom_user_primaryOrganization | null;
}

export interface Room_room_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
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
  primaryOrganization: Room_room_SharedRoom_members_user_primaryOrganization | null;
}

export interface Room_room_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: Room_room_SharedRoom_members_user;
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
}

export type Room_room = Room_room_PrivateRoom | Room_room_SharedRoom;

export interface Room {
  room: Room_room | null;
}

export interface RoomVariables {
  id: string;
}

/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomHistory
// ====================================================

export interface RoomHistory_messages_alphaButtons {
  __typename: "MessageButton";
  id: string;
  title: string;
  style: MessageButtonStyle;
}

export interface RoomHistory_messages_alphaAttachments_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface RoomHistory_messages_alphaAttachments {
  __typename: "MessageAttachment";
  fileId: string;
  fileMetadata: RoomHistory_messages_alphaAttachments_fileMetadata | null;
}

export interface RoomHistory_messages_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface RoomHistory_messages_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface RoomHistory_messages_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface RoomHistory_messages_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: RoomHistory_messages_serviceMetadata_KickServiceMetadata_user;
  kickedBy: RoomHistory_messages_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type RoomHistory_messages_serviceMetadata = RoomHistory_messages_serviceMetadata_InviteServiceMetadata | RoomHistory_messages_serviceMetadata_KickServiceMetadata;

export interface RoomHistory_messages_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface RoomHistory_messages_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomHistory_messages_sender {
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
  primaryOrganization: RoomHistory_messages_sender_primaryOrganization | null;
}

export interface RoomHistory_messages_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomHistory_messages_reply_sender {
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
  primaryOrganization: RoomHistory_messages_reply_sender_primaryOrganization | null;
}

export interface RoomHistory_messages_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface RoomHistory_messages_reply {
  __typename: "RoomMessage";
  sender: RoomHistory_messages_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: RoomHistory_messages_reply_fileMetadata | null;
}

export interface RoomHistory_messages_reactions_user_primaryOrganization {
  __typename: "Organization";
  name: string;
  id: string;
}

export interface RoomHistory_messages_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: RoomHistory_messages_reactions_user_primaryOrganization | null;
}

export interface RoomHistory_messages_reactions {
  __typename: "MessageReaction";
  user: RoomHistory_messages_reactions_user;
  reaction: string;
}

export interface RoomHistory_messages_mentions_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomHistory_messages_mentions {
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
  primaryOrganization: RoomHistory_messages_mentions_primaryOrganization | null;
}

export interface RoomHistory_messages_alphaMentions_UserMention_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomHistory_messages_alphaMentions_UserMention_user {
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
  primaryOrganization: RoomHistory_messages_alphaMentions_UserMention_user_primaryOrganization | null;
}

export interface RoomHistory_messages_alphaMentions_UserMention {
  __typename: "UserMention";
  user: RoomHistory_messages_alphaMentions_UserMention_user;
}

export interface RoomHistory_messages_alphaMentions_SharedRoomMention_sharedRoom {
  __typename: "SharedRoom";
  id: string;
}

export interface RoomHistory_messages_alphaMentions_SharedRoomMention {
  __typename: "SharedRoomMention";
  sharedRoom: RoomHistory_messages_alphaMentions_SharedRoomMention_sharedRoom;
}

export type RoomHistory_messages_alphaMentions = RoomHistory_messages_alphaMentions_UserMention | RoomHistory_messages_alphaMentions_SharedRoomMention;

export interface RoomHistory_messages_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface RoomHistory_messages_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RoomHistory_messages_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: RoomHistory_messages_urlAugmentation_iconRef_crop | null;
}

export interface RoomHistory_messages_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface RoomHistory_messages_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RoomHistory_messages_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: RoomHistory_messages_urlAugmentation_photo_crop | null;
}

export interface RoomHistory_messages_urlAugmentation_user_Organization {
  __typename: "Organization" | "ChannelConversation";
}

export interface RoomHistory_messages_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface RoomHistory_messages_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: RoomHistory_messages_urlAugmentation_user_User_primaryOrganization | null;
}

export type RoomHistory_messages_urlAugmentation_user = RoomHistory_messages_urlAugmentation_user_Organization | RoomHistory_messages_urlAugmentation_user_User;

export interface RoomHistory_messages_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: RoomHistory_messages_urlAugmentation_imageInfo | null;
  iconRef: RoomHistory_messages_urlAugmentation_iconRef | null;
  iconInfo: RoomHistory_messages_urlAugmentation_iconInfo | null;
  photo: RoomHistory_messages_urlAugmentation_photo | null;
  user: RoomHistory_messages_urlAugmentation_user | null;
}

export interface RoomHistory_messages {
  __typename: "RoomMessage";
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  alphaType: MessageType;
  alphaTitle: string | null;
  plainText: string | null;
  alphaPostType: PostMessageType | null;
  alphaButtons: (RoomHistory_messages_alphaButtons[] | null)[];
  alphaAttachments: RoomHistory_messages_alphaAttachments[];
  serviceMetadata: RoomHistory_messages_serviceMetadata | null;
  fileMetadata: RoomHistory_messages_fileMetadata | null;
  sender: RoomHistory_messages_sender;
  reply: RoomHistory_messages_reply[] | null;
  reactions: RoomHistory_messages_reactions[];
  mentions: RoomHistory_messages_mentions[] | null;
  alphaMentions: RoomHistory_messages_alphaMentions[] | null;
  urlAugmentation: RoomHistory_messages_urlAugmentation | null;
}

export interface RoomHistory_state {
  __typename: "ConversationUpdateState";
  state: string | null;
}

export interface RoomHistory {
  messages: RoomHistory_messages[];
  state: RoomHistory_state;
}

export interface RoomHistoryVariables {
  roomId: string;
  before?: string | null;
}

/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatSearchGroup
// ====================================================

export interface ChatSearchGroup_group {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
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
  primaryOrganization: RoomAddMember_betaRoomInvite_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomAddMember_betaRoomInvite_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
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
  primaryOrganization: RoomAddMember_betaRoomInvite_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomAddMember_betaRoomInvite_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomAddMember_betaRoomInvite_SharedRoom_members_user;
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
  primaryOrganization: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
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
  primaryOrganization: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomDeclineJoinReuest_betaRoomDeclineJoinRequest_SharedRoom_members_user;
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
  primaryOrganization: RoomAddMembers_betaRoomInvite_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomAddMembers_betaRoomInvite_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
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
  primaryOrganization: RoomAddMembers_betaRoomInvite_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomAddMembers_betaRoomInvite_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomAddMembers_betaRoomInvite_SharedRoom_members_user;
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
  primaryOrganization: RoomKick_betaRoomKick_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomKick_betaRoomKick_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
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
  primaryOrganization: RoomKick_betaRoomKick_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomKick_betaRoomKick_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomKick_betaRoomKick_SharedRoom_members_user;
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
  primaryOrganization: RoomLeave_betaRoomLeave_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomLeave_betaRoomLeave_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
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
  primaryOrganization: RoomLeave_betaRoomLeave_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomLeave_betaRoomLeave_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomLeave_betaRoomLeave_SharedRoom_members_user;
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
}

export type RoomLeave_betaRoomLeave = RoomLeave_betaRoomLeave_PrivateRoom | RoomLeave_betaRoomLeave_SharedRoom;

export interface RoomLeave {
  betaRoomLeave: RoomLeave_betaRoomLeave;
}

export interface RoomLeaveVariables {
  roomId: string;
}

/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomSearch
// ====================================================

export interface RoomSearch_items_edges_node_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
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
  primaryOrganization: RoomSearch_items_edges_node_members_user_primaryOrganization | null;
}

export interface RoomSearch_items_edges_node_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomSearch_items_edges_node_members_user;
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
  primaryOrganization: RoomJoin_join_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomJoin_join_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
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
  primaryOrganization: RoomJoin_join_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomJoin_join_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomJoin_join_SharedRoom_members_user;
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
}

export type RoomJoin_join = RoomJoin_join_PrivateRoom | RoomJoin_join_SharedRoom;

export interface RoomJoin {
  join: RoomJoin_join;
}

export interface RoomJoinVariables {
  roomId: string;
}

/* tslint:disable */
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
  primaryOrganization: RoomJoinInviteLink_join_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomJoinInviteLink_join_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
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
  primaryOrganization: RoomJoinInviteLink_join_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomJoinInviteLink_join_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomJoinInviteLink_join_SharedRoom_members_user;
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
}

export type RoomJoinInviteLink_join = RoomJoinInviteLink_join_PrivateRoom | RoomJoinInviteLink_join_SharedRoom;

export interface RoomJoinInviteLink {
  join: RoomJoinInviteLink_join;
}

export interface RoomJoinInviteLinkVariables {
  invite: string;
}

/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RoomUpdate
// ====================================================

export interface RoomUpdate_betaRoomUpdate_PrivateRoom_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomUpdate_betaRoomUpdate_PrivateRoom_user {
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
  primaryOrganization: RoomUpdate_betaRoomUpdate_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomUpdate_betaRoomUpdate_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  mute: boolean | null;
}

export interface RoomUpdate_betaRoomUpdate_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomUpdate_betaRoomUpdate_PrivateRoom_user;
  settings: RoomUpdate_betaRoomUpdate_PrivateRoom_settings;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom_members_user {
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
  primaryOrganization: RoomUpdate_betaRoomUpdate_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomUpdate_betaRoomUpdate_SharedRoom_members_user;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom_requests_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom_requests_user {
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
  primaryOrganization: RoomUpdate_betaRoomUpdate_SharedRoom_requests_user_primaryOrganization | null;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom_requests {
  __typename: "RoomMember";
  user: RoomUpdate_betaRoomUpdate_SharedRoom_requests_user;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom_settings {
  __typename: "RoomUserNotificaionSettings";
  id: string;
  mute: boolean | null;
}

export interface RoomUpdate_betaRoomUpdate_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  socialImage: string | null;
  description: string | null;
  organization: RoomUpdate_betaRoomUpdate_SharedRoom_organization | null;
  membership: SharedRoomMembershipStatus;
  role: RoomMemberRole;
  membersCount: number | null;
  members: RoomUpdate_betaRoomUpdate_SharedRoom_members[];
  requests: RoomUpdate_betaRoomUpdate_SharedRoom_requests[] | null;
  settings: RoomUpdate_betaRoomUpdate_SharedRoom_settings;
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
}

/* tslint:disable */
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
}

export interface MyOrganizations {
  myOrganizations: MyOrganizations_myOrganizations[];
}

/* tslint:disable */
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
  primaryOrganization: Organization_organization_requests_user_primaryOrganization | null;
}

export interface Organization_organization_requests {
  __typename: "OrganizationRequestedMember";
  role: OrganizationMemberRole;
  user: Organization_organization_requests_user;
}

export interface Organization_organization_rooms {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
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
  featured: boolean;
  isCommunity: boolean;
  name: string;
  photo: string | null;
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
  featured: boolean;
}

export interface OrganizationProfile {
  organizationProfile: OrganizationProfile_organizationProfile;
}

export interface OrganizationProfileVariables {
  organizationId: string;
}

/* tslint:disable */
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

export interface ExploreOrganizations_items_edges_node_channels {
  __typename: "ChannelConversation";
  id: string;
  hidden: boolean;
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
  channels: (ExploreOrganizations_items_edges_node_channels | null)[];
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

export interface ExploreComunity_items_edges_node_channels {
  __typename: "ChannelConversation";
  id: string;
  hidden: boolean;
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
  channels: (ExploreComunity_items_edges_node_channels | null)[];
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

export interface OrganizationAlterPublished_alphaAlterPublished_channels {
  __typename: "ChannelConversation";
  id: string;
  hidden: boolean;
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
  channels: (OrganizationAlterPublished_alphaAlterPublished_channels | null)[];
}

export interface OrganizationAlterPublished {
  alphaAlterPublished: OrganizationAlterPublished_alphaAlterPublished;
}

export interface OrganizationAlterPublishedVariables {
  organizationId: string;
  published: boolean;
}

/* tslint:disable */
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

export interface OrganizationByPrefix_organizationByPrefix_channels {
  __typename: "ChannelConversation";
  id: string;
  hidden: boolean;
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
  channels: (OrganizationByPrefix_organizationByPrefix_channels | null)[];
}

export interface OrganizationByPrefix {
  organizationByPrefix: OrganizationByPrefix_organizationByPrefix | null;
}

export interface OrganizationByPrefixVariables {
  query: string;
}

/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profile
// ====================================================

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
  profile: Profile_profile | null;
}

/* tslint:disable */
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

export interface User_user_channels_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface User_user_channels {
  __typename: "ChannelConversation";
  id: string;
  title: string;
  hidden: boolean;
  photos: string[];
  photo: string | null;
  membersCount: number;
  organization: User_user_channels_organization | null;
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
  primaryOrganization: User_user_primaryOrganization | null;
  /**
   * TODO: Refactor
   */
  channels: User_user_channels[];
}

export interface User_conversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface User_conversation {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
  settings: User_conversation_settings;
}

export interface User {
  user: User_user;
  conversation: User_conversation;
}

export interface UserVariables {
  userId: string;
}

/* tslint:disable */
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
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConversationShort
// ====================================================

export interface ConversationShort_AnonymousConversation_topMessage_alphaButtons {
  __typename: "MessageButton";
  id: string;
  title: string;
  style: MessageButtonStyle;
}

export interface ConversationShort_AnonymousConversation_topMessage_alphaAttachments_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_alphaAttachments {
  __typename: "MessageAttachment";
  fileId: string;
  fileMetadata: ConversationShort_AnonymousConversation_topMessage_alphaAttachments_fileMetadata | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ConversationShort_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ConversationShort_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ConversationShort_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ConversationShort_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ConversationShort_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ConversationShort_AnonymousConversation_topMessage_serviceMetadata = ConversationShort_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata | ConversationShort_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ConversationShort_AnonymousConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ConversationShort_AnonymousConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConversationShort_AnonymousConversation_topMessage_sender {
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
  primaryOrganization: ConversationShort_AnonymousConversation_topMessage_sender_primaryOrganization | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConversationShort_AnonymousConversation_topMessage_reply_sender {
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
  primaryOrganization: ConversationShort_AnonymousConversation_topMessage_reply_sender_primaryOrganization | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ConversationShort_AnonymousConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ConversationShort_AnonymousConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ConversationShort_AnonymousConversation_topMessage_reply_fileMetadata | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_reactions_user_primaryOrganization {
  __typename: "Organization";
  name: string;
  id: string;
}

export interface ConversationShort_AnonymousConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ConversationShort_AnonymousConversation_topMessage_reactions_user_primaryOrganization | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ConversationShort_AnonymousConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ConversationShort_AnonymousConversation_topMessage_mentions_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConversationShort_AnonymousConversation_topMessage_mentions {
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
  primaryOrganization: ConversationShort_AnonymousConversation_topMessage_mentions_primaryOrganization | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ConversationShort_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ConversationShort_AnonymousConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user_Organization {
  __typename: "Organization" | "ChannelConversation";
}

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user = ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user_Organization | ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user_User;

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ConversationShort_AnonymousConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ConversationShort_AnonymousConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ConversationShort_AnonymousConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ConversationShort_AnonymousConversation_topMessage_urlAugmentation_photo | null;
  user: ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user | null;
}

export interface ConversationShort_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  alphaType: MessageType;
  alphaTitle: string | null;
  plainText: string | null;
  alphaButtons: (ConversationShort_AnonymousConversation_topMessage_alphaButtons[] | null)[];
  alphaAttachments: ConversationShort_AnonymousConversation_topMessage_alphaAttachments[];
  serviceMetadata: ConversationShort_AnonymousConversation_topMessage_serviceMetadata | null;
  fileMetadata: ConversationShort_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ConversationShort_AnonymousConversation_topMessage_sender;
  reply: ConversationShort_AnonymousConversation_topMessage_reply[] | null;
  reactions: ConversationShort_AnonymousConversation_topMessage_reactions[];
  mentions: ConversationShort_AnonymousConversation_topMessage_mentions[] | null;
  urlAugmentation: ConversationShort_AnonymousConversation_topMessage_urlAugmentation | null;
}

export interface ConversationShort_AnonymousConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ConversationShort_AnonymousConversation {
  __typename: "AnonymousConversation" | "SharedConversation" | "PrivateConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ConversationShort_AnonymousConversation_topMessage | null;
  settings: ConversationShort_AnonymousConversation_settings;
}

export interface ConversationShort_GroupConversation_topMessage_alphaButtons {
  __typename: "MessageButton";
  id: string;
  title: string;
  style: MessageButtonStyle;
}

export interface ConversationShort_GroupConversation_topMessage_alphaAttachments_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ConversationShort_GroupConversation_topMessage_alphaAttachments {
  __typename: "MessageAttachment";
  fileId: string;
  fileMetadata: ConversationShort_GroupConversation_topMessage_alphaAttachments_fileMetadata | null;
}

export interface ConversationShort_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ConversationShort_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ConversationShort_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ConversationShort_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ConversationShort_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ConversationShort_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ConversationShort_GroupConversation_topMessage_serviceMetadata = ConversationShort_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata | ConversationShort_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ConversationShort_GroupConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ConversationShort_GroupConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConversationShort_GroupConversation_topMessage_sender {
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
  primaryOrganization: ConversationShort_GroupConversation_topMessage_sender_primaryOrganization | null;
}

export interface ConversationShort_GroupConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConversationShort_GroupConversation_topMessage_reply_sender {
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
  primaryOrganization: ConversationShort_GroupConversation_topMessage_reply_sender_primaryOrganization | null;
}

export interface ConversationShort_GroupConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ConversationShort_GroupConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ConversationShort_GroupConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ConversationShort_GroupConversation_topMessage_reply_fileMetadata | null;
}

export interface ConversationShort_GroupConversation_topMessage_reactions_user_primaryOrganization {
  __typename: "Organization";
  name: string;
  id: string;
}

export interface ConversationShort_GroupConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ConversationShort_GroupConversation_topMessage_reactions_user_primaryOrganization | null;
}

export interface ConversationShort_GroupConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ConversationShort_GroupConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ConversationShort_GroupConversation_topMessage_mentions_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConversationShort_GroupConversation_topMessage_mentions {
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
  primaryOrganization: ConversationShort_GroupConversation_topMessage_mentions_primaryOrganization | null;
}

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ConversationShort_GroupConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ConversationShort_GroupConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_user_Organization {
  __typename: "Organization" | "ChannelConversation";
}

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ConversationShort_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ConversationShort_GroupConversation_topMessage_urlAugmentation_user = ConversationShort_GroupConversation_topMessage_urlAugmentation_user_Organization | ConversationShort_GroupConversation_topMessage_urlAugmentation_user_User;

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ConversationShort_GroupConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ConversationShort_GroupConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ConversationShort_GroupConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ConversationShort_GroupConversation_topMessage_urlAugmentation_photo | null;
  user: ConversationShort_GroupConversation_topMessage_urlAugmentation_user | null;
}

export interface ConversationShort_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  alphaType: MessageType;
  alphaTitle: string | null;
  plainText: string | null;
  alphaButtons: (ConversationShort_GroupConversation_topMessage_alphaButtons[] | null)[];
  alphaAttachments: ConversationShort_GroupConversation_topMessage_alphaAttachments[];
  serviceMetadata: ConversationShort_GroupConversation_topMessage_serviceMetadata | null;
  fileMetadata: ConversationShort_GroupConversation_topMessage_fileMetadata | null;
  sender: ConversationShort_GroupConversation_topMessage_sender;
  reply: ConversationShort_GroupConversation_topMessage_reply[] | null;
  reactions: ConversationShort_GroupConversation_topMessage_reactions[];
  mentions: ConversationShort_GroupConversation_topMessage_mentions[] | null;
  urlAugmentation: ConversationShort_GroupConversation_topMessage_urlAugmentation | null;
}

export interface ConversationShort_GroupConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ConversationShort_GroupConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ConversationShort_GroupConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ConversationShort_GroupConversation_photoRef_crop | null;
}

export interface ConversationShort_GroupConversation {
  __typename: "GroupConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ConversationShort_GroupConversation_topMessage | null;
  settings: ConversationShort_GroupConversation_settings;
  photo: string | null;
  photoRef: ConversationShort_GroupConversation_photoRef | null;
}

export interface ConversationShort_ChannelConversation_topMessage_alphaButtons {
  __typename: "MessageButton";
  id: string;
  title: string;
  style: MessageButtonStyle;
}

export interface ConversationShort_ChannelConversation_topMessage_alphaAttachments_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface ConversationShort_ChannelConversation_topMessage_alphaAttachments {
  __typename: "MessageAttachment";
  fileId: string;
  fileMetadata: ConversationShort_ChannelConversation_topMessage_alphaAttachments_fileMetadata | null;
}

export interface ConversationShort_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ConversationShort_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ConversationShort_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ConversationShort_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ConversationShort_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ConversationShort_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ConversationShort_ChannelConversation_topMessage_serviceMetadata = ConversationShort_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata | ConversationShort_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ConversationShort_ChannelConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ConversationShort_ChannelConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConversationShort_ChannelConversation_topMessage_sender {
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
  primaryOrganization: ConversationShort_ChannelConversation_topMessage_sender_primaryOrganization | null;
}

export interface ConversationShort_ChannelConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConversationShort_ChannelConversation_topMessage_reply_sender {
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
  primaryOrganization: ConversationShort_ChannelConversation_topMessage_reply_sender_primaryOrganization | null;
}

export interface ConversationShort_ChannelConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ConversationShort_ChannelConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ConversationShort_ChannelConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ConversationShort_ChannelConversation_topMessage_reply_fileMetadata | null;
}

export interface ConversationShort_ChannelConversation_topMessage_reactions_user_primaryOrganization {
  __typename: "Organization";
  name: string;
  id: string;
}

export interface ConversationShort_ChannelConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ConversationShort_ChannelConversation_topMessage_reactions_user_primaryOrganization | null;
}

export interface ConversationShort_ChannelConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ConversationShort_ChannelConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ConversationShort_ChannelConversation_topMessage_mentions_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface ConversationShort_ChannelConversation_topMessage_mentions {
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
  primaryOrganization: ConversationShort_ChannelConversation_topMessage_mentions_primaryOrganization | null;
}

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ConversationShort_ChannelConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ConversationShort_ChannelConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_user_Organization {
  __typename: "Organization" | "ChannelConversation";
}

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ConversationShort_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ConversationShort_ChannelConversation_topMessage_urlAugmentation_user = ConversationShort_ChannelConversation_topMessage_urlAugmentation_user_Organization | ConversationShort_ChannelConversation_topMessage_urlAugmentation_user_User;

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ConversationShort_ChannelConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ConversationShort_ChannelConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ConversationShort_ChannelConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ConversationShort_ChannelConversation_topMessage_urlAugmentation_photo | null;
  user: ConversationShort_ChannelConversation_topMessage_urlAugmentation_user | null;
}

export interface ConversationShort_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  alphaType: MessageType;
  alphaTitle: string | null;
  plainText: string | null;
  alphaButtons: (ConversationShort_ChannelConversation_topMessage_alphaButtons[] | null)[];
  alphaAttachments: ConversationShort_ChannelConversation_topMessage_alphaAttachments[];
  serviceMetadata: ConversationShort_ChannelConversation_topMessage_serviceMetadata | null;
  fileMetadata: ConversationShort_ChannelConversation_topMessage_fileMetadata | null;
  sender: ConversationShort_ChannelConversation_topMessage_sender;
  reply: ConversationShort_ChannelConversation_topMessage_reply[] | null;
  reactions: ConversationShort_ChannelConversation_topMessage_reactions[];
  mentions: ConversationShort_ChannelConversation_topMessage_mentions[] | null;
  urlAugmentation: ConversationShort_ChannelConversation_topMessage_urlAugmentation | null;
}

export interface ConversationShort_ChannelConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ConversationShort_ChannelConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ConversationShort_ChannelConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ConversationShort_ChannelConversation_photoRef_crop | null;
}

export interface ConversationShort_ChannelConversation {
  __typename: "ChannelConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ConversationShort_ChannelConversation_topMessage | null;
  settings: ConversationShort_ChannelConversation_settings;
  featured: boolean;
  hidden: boolean;
  photo: string | null;
  myStatus: ChannelMembershipStatus;
  photoRef: ConversationShort_ChannelConversation_photoRef | null;
}

export type ConversationShort = ConversationShort_AnonymousConversation | ConversationShort_GroupConversation | ConversationShort_ChannelConversation;

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MessageFull
// ====================================================

export interface MessageFull_alphaButtons {
  __typename: "MessageButton";
  id: string;
  title: string;
  style: MessageButtonStyle;
}

export interface MessageFull_alphaAttachments_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface MessageFull_alphaAttachments {
  __typename: "MessageAttachment";
  fileId: string;
  fileMetadata: MessageFull_alphaAttachments_fileMetadata | null;
}

export interface MessageFull_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface MessageFull_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface MessageFull_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface MessageFull_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: MessageFull_serviceMetadata_KickServiceMetadata_user;
  kickedBy: MessageFull_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type MessageFull_serviceMetadata = MessageFull_serviceMetadata_InviteServiceMetadata | MessageFull_serviceMetadata_KickServiceMetadata;

export interface MessageFull_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface MessageFull_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface MessageFull_sender {
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
  primaryOrganization: MessageFull_sender_primaryOrganization | null;
}

export interface MessageFull_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface MessageFull_reply_sender {
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
  primaryOrganization: MessageFull_reply_sender_primaryOrganization | null;
}

export interface MessageFull_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface MessageFull_reply {
  __typename: "ConversationMessage";
  sender: MessageFull_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: MessageFull_reply_fileMetadata | null;
}

export interface MessageFull_reactions_user_primaryOrganization {
  __typename: "Organization";
  name: string;
  id: string;
}

export interface MessageFull_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: MessageFull_reactions_user_primaryOrganization | null;
}

export interface MessageFull_reactions {
  __typename: "MessageReaction";
  user: MessageFull_reactions_user;
  reaction: string;
}

export interface MessageFull_mentions_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface MessageFull_mentions {
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
  primaryOrganization: MessageFull_mentions_primaryOrganization | null;
}

export interface MessageFull_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface MessageFull_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MessageFull_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: MessageFull_urlAugmentation_iconRef_crop | null;
}

export interface MessageFull_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface MessageFull_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MessageFull_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: MessageFull_urlAugmentation_photo_crop | null;
}

export interface MessageFull_urlAugmentation_user_Organization {
  __typename: "Organization" | "ChannelConversation";
}

export interface MessageFull_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface MessageFull_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: MessageFull_urlAugmentation_user_User_primaryOrganization | null;
}

export type MessageFull_urlAugmentation_user = MessageFull_urlAugmentation_user_Organization | MessageFull_urlAugmentation_user_User;

export interface MessageFull_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: MessageFull_urlAugmentation_imageInfo | null;
  iconRef: MessageFull_urlAugmentation_iconRef | null;
  iconInfo: MessageFull_urlAugmentation_iconInfo | null;
  photo: MessageFull_urlAugmentation_photo | null;
  user: MessageFull_urlAugmentation_user | null;
}

export interface MessageFull {
  __typename: "ConversationMessage";
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  alphaType: MessageType;
  alphaTitle: string | null;
  plainText: string | null;
  alphaButtons: (MessageFull_alphaButtons[] | null)[];
  alphaAttachments: MessageFull_alphaAttachments[];
  serviceMetadata: MessageFull_serviceMetadata | null;
  fileMetadata: MessageFull_fileMetadata | null;
  sender: MessageFull_sender;
  reply: MessageFull_reply[] | null;
  reactions: MessageFull_reactions[];
  mentions: MessageFull_mentions[] | null;
  urlAugmentation: MessageFull_urlAugmentation | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoomMessageFull
// ====================================================

export interface RoomMessageFull_alphaButtons {
  __typename: "MessageButton";
  id: string;
  title: string;
  style: MessageButtonStyle;
}

export interface RoomMessageFull_alphaAttachments_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  size: number;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
}

export interface RoomMessageFull_alphaAttachments {
  __typename: "MessageAttachment";
  fileId: string;
  fileMetadata: RoomMessageFull_alphaAttachments_fileMetadata | null;
}

export interface RoomMessageFull_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface RoomMessageFull_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface RoomMessageFull_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface RoomMessageFull_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: RoomMessageFull_serviceMetadata_KickServiceMetadata_user;
  kickedBy: RoomMessageFull_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type RoomMessageFull_serviceMetadata = RoomMessageFull_serviceMetadata_InviteServiceMetadata | RoomMessageFull_serviceMetadata_KickServiceMetadata;

export interface RoomMessageFull_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface RoomMessageFull_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomMessageFull_sender {
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
  primaryOrganization: RoomMessageFull_sender_primaryOrganization | null;
}

export interface RoomMessageFull_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomMessageFull_reply_sender {
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
  primaryOrganization: RoomMessageFull_reply_sender_primaryOrganization | null;
}

export interface RoomMessageFull_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface RoomMessageFull_reply {
  __typename: "RoomMessage";
  sender: RoomMessageFull_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: RoomMessageFull_reply_fileMetadata | null;
}

export interface RoomMessageFull_reactions_user_primaryOrganization {
  __typename: "Organization";
  name: string;
  id: string;
}

export interface RoomMessageFull_reactions_user {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: RoomMessageFull_reactions_user_primaryOrganization | null;
}

export interface RoomMessageFull_reactions {
  __typename: "MessageReaction";
  user: RoomMessageFull_reactions_user;
  reaction: string;
}

export interface RoomMessageFull_mentions_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomMessageFull_mentions {
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
  primaryOrganization: RoomMessageFull_mentions_primaryOrganization | null;
}

export interface RoomMessageFull_alphaMentions_UserMention_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
  isCommunity: boolean;
}

export interface RoomMessageFull_alphaMentions_UserMention_user {
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
  primaryOrganization: RoomMessageFull_alphaMentions_UserMention_user_primaryOrganization | null;
}

export interface RoomMessageFull_alphaMentions_UserMention {
  __typename: "UserMention";
  user: RoomMessageFull_alphaMentions_UserMention_user;
}

export interface RoomMessageFull_alphaMentions_SharedRoomMention_sharedRoom {
  __typename: "SharedRoom";
  id: string;
}

export interface RoomMessageFull_alphaMentions_SharedRoomMention {
  __typename: "SharedRoomMention";
  sharedRoom: RoomMessageFull_alphaMentions_SharedRoomMention_sharedRoom;
}

export type RoomMessageFull_alphaMentions = RoomMessageFull_alphaMentions_UserMention | RoomMessageFull_alphaMentions_SharedRoomMention;

export interface RoomMessageFull_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface RoomMessageFull_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RoomMessageFull_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: RoomMessageFull_urlAugmentation_iconRef_crop | null;
}

export interface RoomMessageFull_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface RoomMessageFull_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RoomMessageFull_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: RoomMessageFull_urlAugmentation_photo_crop | null;
}

export interface RoomMessageFull_urlAugmentation_user_Organization {
  __typename: "Organization" | "ChannelConversation";
}

export interface RoomMessageFull_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface RoomMessageFull_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: RoomMessageFull_urlAugmentation_user_User_primaryOrganization | null;
}

export type RoomMessageFull_urlAugmentation_user = RoomMessageFull_urlAugmentation_user_Organization | RoomMessageFull_urlAugmentation_user_User;

export interface RoomMessageFull_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: RoomMessageFull_urlAugmentation_imageInfo | null;
  iconRef: RoomMessageFull_urlAugmentation_iconRef | null;
  iconInfo: RoomMessageFull_urlAugmentation_iconInfo | null;
  photo: RoomMessageFull_urlAugmentation_photo | null;
  user: RoomMessageFull_urlAugmentation_user | null;
}

export interface RoomMessageFull {
  __typename: "RoomMessage";
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  alphaType: MessageType;
  alphaTitle: string | null;
  plainText: string | null;
  alphaPostType: PostMessageType | null;
  alphaButtons: (RoomMessageFull_alphaButtons[] | null)[];
  alphaAttachments: RoomMessageFull_alphaAttachments[];
  serviceMetadata: RoomMessageFull_serviceMetadata | null;
  fileMetadata: RoomMessageFull_fileMetadata | null;
  sender: RoomMessageFull_sender;
  reply: RoomMessageFull_reply[] | null;
  reactions: RoomMessageFull_reactions[];
  mentions: RoomMessageFull_mentions[] | null;
  alphaMentions: RoomMessageFull_alphaMentions[] | null;
  urlAugmentation: RoomMessageFull_urlAugmentation | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MessageLightShort
// ====================================================

export interface MessageLightShort_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
}

export interface MessageLightShort {
  __typename: "Message";
  id: string;
  date: any;
  /**
   * Content
   */
  text: string | null;
  sender: MessageLightShort_sender;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MessageShort
// ====================================================

export interface MessageShort_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
}

export interface MessageShort_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
}

export interface MessageShort {
  __typename: "ConversationMessage";
  id: string;
  date: any;
  message: string | null;
  file: string | null;
  isService: boolean;
  fileMetadata: MessageShort_fileMetadata | null;
  sender: MessageShort_sender;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoomMessageShort
// ====================================================

export interface RoomMessageShort_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
}

export interface RoomMessageShort_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
}

export interface RoomMessageShort {
  __typename: "RoomMessage";
  id: string;
  date: any;
  message: string | null;
  file: string | null;
  isService: boolean;
  fileMetadata: RoomMessageShort_fileMetadata | null;
  sender: RoomMessageShort_sender;
}

/* tslint:disable */
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
  primaryOrganization: OrganizationFull_requests_user_primaryOrganization | null;
}

export interface OrganizationFull_requests {
  __typename: "OrganizationRequestedMember";
  role: OrganizationMemberRole;
  user: OrganizationFull_requests_user;
}

export interface OrganizationFull_rooms {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
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
  featured: boolean;
  isCommunity: boolean;
  name: string;
  photo: string | null;
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
  featured: boolean;
}

/* tslint:disable */
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

export interface OrganizationSearch_channels {
  __typename: "ChannelConversation";
  id: string;
  hidden: boolean;
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
  channels: (OrganizationSearch_channels | null)[];
}

/* tslint:disable */
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
  primaryOrganization: RoomFull_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomFull_PrivateRoom_settings {
  __typename: "RoomUserNotificaionSettings";
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
  primaryOrganization: RoomFull_SharedRoom_members_user_primaryOrganization | null;
}

export interface RoomFull_SharedRoom_members {
  __typename: "RoomMember";
  role: RoomMemberRole;
  membership: SharedRoomMembershipStatus;
  user: RoomFull_SharedRoom_members_user;
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
}

export type RoomFull = RoomFull_PrivateRoom | RoomFull_SharedRoom;

/* tslint:disable */
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
  primaryOrganization: RoomShort_PrivateRoom_user_primaryOrganization | null;
}

export interface RoomShort_PrivateRoom {
  __typename: "PrivateRoom";
  id: string;
  user: RoomShort_PrivateRoom_user;
}

export interface RoomShort_SharedRoom {
  __typename: "SharedRoom";
  id: string;
  kind: SharedRoomKind;
  title: string;
  photo: string;
  membership: SharedRoomMembershipStatus;
  membersCount: number | null;
}

export type RoomShort = RoomShort_PrivateRoom | RoomShort_SharedRoom;

/* tslint:disable */
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
  primaryOrganization: UserFull_primaryOrganization | null;
}

/* tslint:disable */
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
  primaryOrganization: UserShort_primaryOrganization | null;
}

/* tslint:disable */
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
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ChannelMembershipStatus {
  invited = "invited",
  member = "member",
  none = "none",
  requested = "requested",
}

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

export enum MessageButtonStyle {
  DEFAULT = "DEFAULT",
  LIGHT = "LIGHT",
}

export enum MessageType {
  MESSAGE = "MESSAGE",
  POST = "POST",
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
  MEMBER = "MEMBER",
  OWNER = "OWNER",
}

export enum PostMessageType {
  BLANK = "BLANK",
  JOB_OPPORTUNITY = "JOB_OPPORTUNITY",
  OFFICE_HOURS = "OFFICE_HOURS",
  REQUEST_FOR_STARTUPS = "REQUEST_FOR_STARTUPS",
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
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export enum SuperAdminRole {
  EDITOR = "EDITOR",
  SOFTWARE_DEVELOPER = "SOFTWARE_DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
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
