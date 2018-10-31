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
}

export interface Account_me {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: Account_me_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface Account_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface Account_sessionState {
  __typename: "SessionState";
  isLoggedIn: boolean;
  isProfileCreated: boolean;
  isAccountActivated: boolean;
  isAccountExists: boolean;
  /**
   * depricated
   */
  isAccountPicked: boolean;
  isCompleted: boolean;
  isBlocked: boolean;
}

export interface Account_permissions {
  __typename: "Permissions";
  roles: string[];
}

export interface Account {
  me: Account_me | null;
  organization: Account_organization | null;
  sessionState: Account_sessionState;
  permissions: Account_permissions;
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
}

export interface AccountSettings_me {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: AccountSettings_me_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface AccountSettings_primaryOrganization {
  __typename: "Organization";
  id: string;
}

export interface AccountSettings_organizations {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface AccountSettings {
  me: AccountSettings_me | null;
  primaryOrganization: AccountSettings_primaryOrganization | null;
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
}

export interface AccountInviteInfo_invite_creator {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: AccountInviteInfo_invite_creator_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user_photoRef_crop | null;
}

export interface CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user {
  __typename: "Profile";
  id: string;
  firstName: string | null;
  lastName: string | null;
  photoRef: CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user_photoRef | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  about: string | null;
  location: string | null;
}

export interface CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_organization {
  __typename: "OrganizationProfile";
  id: string;
  name: string;
}

export interface CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization {
  __typename: "AlphaSignupData";
  user: CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_user;
  organization: CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization_organization;
}

export interface CreateUserProfileAndOrganization {
  alphaCreateUserProfileAndOrganization: CreateUserProfileAndOrganization_alphaCreateUserProfileAndOrganization;
}

export interface CreateUserProfileAndOrganizationVariables {
  user: CreateProfileInput;
  organization: CreateOrganizationInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatList
// ====================================================

export interface ChatList_chats_conversations_AnonymousConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mute: boolean;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata = ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatList_chats_conversations_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatList_chats_conversations_AnonymousConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChatList_chats_conversations_AnonymousConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChatList_chats_conversations_AnonymousConversation_topMessage_reply_fileMetadata | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChatList_chats_conversations_AnonymousConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_user = ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_user_User;

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_photo | null;
  user: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_user | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChatList_chats_conversations_AnonymousConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChatList_chats_conversations_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ChatList_chats_conversations_AnonymousConversation_topMessage_sender;
  reply: ChatList_chats_conversations_AnonymousConversation_topMessage_reply[] | null;
  reactions: ChatList_chats_conversations_AnonymousConversation_topMessage_reactions[];
  urlAugmentation: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChatList_chats_conversations_AnonymousConversation {
  __typename: "AnonymousConversation" | "SharedConversation" | "PrivateConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  unreadCount: number;
  settings: ChatList_chats_conversations_AnonymousConversation_settings;
  topMessage: ChatList_chats_conversations_AnonymousConversation_topMessage | null;
}

export interface ChatList_chats_conversations_GroupConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mute: boolean;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata = ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChatList_chats_conversations_GroupConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatList_chats_conversations_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatList_chats_conversations_GroupConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChatList_chats_conversations_GroupConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChatList_chats_conversations_GroupConversation_topMessage_reply_fileMetadata | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChatList_chats_conversations_GroupConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_user = ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_user_User;

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_photo | null;
  user: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_user | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChatList_chats_conversations_GroupConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChatList_chats_conversations_GroupConversation_topMessage_fileMetadata | null;
  sender: ChatList_chats_conversations_GroupConversation_topMessage_sender;
  reply: ChatList_chats_conversations_GroupConversation_topMessage_reply[] | null;
  reactions: ChatList_chats_conversations_GroupConversation_topMessage_reactions[];
  urlAugmentation: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChatList_chats_conversations_GroupConversation {
  __typename: "GroupConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  unreadCount: number;
  settings: ChatList_chats_conversations_GroupConversation_settings;
  photo: string | null;
  topMessage: ChatList_chats_conversations_GroupConversation_topMessage | null;
}

export interface ChatList_chats_conversations_ChannelConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mute: boolean;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata = ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChatList_chats_conversations_ChannelConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatList_chats_conversations_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatList_chats_conversations_ChannelConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChatList_chats_conversations_ChannelConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChatList_chats_conversations_ChannelConversation_topMessage_reply_fileMetadata | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChatList_chats_conversations_ChannelConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_user = ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_user_User;

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_photo | null;
  user: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_user | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChatList_chats_conversations_ChannelConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChatList_chats_conversations_ChannelConversation_topMessage_fileMetadata | null;
  sender: ChatList_chats_conversations_ChannelConversation_topMessage_sender;
  reply: ChatList_chats_conversations_ChannelConversation_topMessage_reply[] | null;
  reactions: ChatList_chats_conversations_ChannelConversation_topMessage_reactions[];
  urlAugmentation: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChatList_chats_conversations_ChannelConversation {
  __typename: "ChannelConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  unreadCount: number;
  settings: ChatList_chats_conversations_ChannelConversation_settings;
  photo: string | null;
  myStatus: ChannelMembershipStatus;
  topMessage: ChatList_chats_conversations_ChannelConversation_topMessage | null;
}

export type ChatList_chats_conversations = ChatList_chats_conversations_AnonymousConversation | ChatList_chats_conversations_GroupConversation | ChatList_chats_conversations_ChannelConversation;

export interface ChatList_chats {
  __typename: "ConversationConnection";
  conversations: ChatList_chats_conversations[];
  seq: number;
  next: string | null;
}

export interface ChatList_counter {
  __typename: "NotificationCounter";
  id: string;
  unreadCount: number;
}

export interface ChatList {
  chats: ChatList_chats;
  counter: ChatList_counter;
}

export interface ChatListVariables {
  after?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatLeave
// ====================================================

export interface ChatLeave_alphaChatLeave {
  __typename: "ConversationUpdateResponse";
  curSeq: number;
}

export interface ChatLeave {
  alphaChatLeave: ChatLeave_alphaChatLeave;
}

export interface ChatLeaveVariables {
  conversationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MessageSetReaction
// ====================================================

export interface MessageSetReaction {
  /**
   * Reactions
   */
  alphaChatSetReaction: string;
}

export interface MessageSetReactionVariables {
  messageId: any;
  reaction: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SwitchReaction
// ====================================================

export interface SwitchReaction {
  /**
   * Reactions
   */
  alphaChatSetReaction: string;
  alphaChatUnsetReaction: string;
}

export interface SwitchReactionVariables {
  messageId: any;
  from: string;
  to: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MessageUnsetReaction
// ====================================================

export interface MessageUnsetReaction {
  alphaChatUnsetReaction: string;
}

export interface MessageUnsetReactionVariables {
  messageId: any;
  reaction: string;
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
// GraphQL query operation: ChatHistory
// ====================================================

export interface ChatHistory_messages_messages_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChatHistory_messages_messages_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChatHistory_messages_messages_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChatHistory_messages_messages_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatHistory_messages_messages_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatHistory_messages_messages_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChatHistory_messages_messages_serviceMetadata = ChatHistory_messages_messages_serviceMetadata_InviteServiceMetadata | ChatHistory_messages_messages_serviceMetadata_KickServiceMetadata;

export interface ChatHistory_messages_messages_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatHistory_messages_messages_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatHistory_messages_messages_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatHistory_messages_messages_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatHistory_messages_messages_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatHistory_messages_messages_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatHistory_messages_messages_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatHistory_messages_messages_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatHistory_messages_messages_reply {
  __typename: "ConversationMessage";
  sender: ChatHistory_messages_messages_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChatHistory_messages_messages_reply_fileMetadata | null;
}

export interface ChatHistory_messages_messages_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChatHistory_messages_messages_reactions {
  __typename: "MessageReaction";
  user: ChatHistory_messages_messages_reactions_user;
  reaction: string;
}

export interface ChatHistory_messages_messages_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatHistory_messages_messages_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatHistory_messages_messages_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatHistory_messages_messages_urlAugmentation_iconRef_crop | null;
}

export interface ChatHistory_messages_messages_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatHistory_messages_messages_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatHistory_messages_messages_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatHistory_messages_messages_urlAugmentation_photo_crop | null;
}

export interface ChatHistory_messages_messages_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChatHistory_messages_messages_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChatHistory_messages_messages_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChatHistory_messages_messages_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChatHistory_messages_messages_urlAugmentation_user = ChatHistory_messages_messages_urlAugmentation_user_AlphaOrganizationListing | ChatHistory_messages_messages_urlAugmentation_user_User;

export interface ChatHistory_messages_messages_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChatHistory_messages_messages_urlAugmentation_imageInfo | null;
  iconRef: ChatHistory_messages_messages_urlAugmentation_iconRef | null;
  iconInfo: ChatHistory_messages_messages_urlAugmentation_iconInfo | null;
  photo: ChatHistory_messages_messages_urlAugmentation_photo | null;
  user: ChatHistory_messages_messages_urlAugmentation_user | null;
}

export interface ChatHistory_messages_messages {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChatHistory_messages_messages_serviceMetadata | null;
  fileMetadata: ChatHistory_messages_messages_fileMetadata | null;
  sender: ChatHistory_messages_messages_sender;
  reply: ChatHistory_messages_messages_reply[] | null;
  reactions: ChatHistory_messages_messages_reactions[];
  urlAugmentation: ChatHistory_messages_messages_urlAugmentation | null;
  date: any;
}

export interface ChatHistory_messages {
  __typename: "ConversationState";
  seq: number;
  messages: ChatHistory_messages_messages[];
}

export interface ChatHistory {
  messages: ChatHistory_messages;
}

export interface ChatHistoryVariables {
  conversationId: string;
  before?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatInfo
// ====================================================

export interface ChatInfo_chat_AnonymousConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatInfo_chat_AnonymousConversation {
  __typename: "AnonymousConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatInfo_chat_AnonymousConversation_settings;
}

export interface ChatInfo_chat_SharedConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatInfo_chat_SharedConversation_organization {
  __typename: "Organization";
  id: string;
}

export interface ChatInfo_chat_SharedConversation {
  __typename: "SharedConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatInfo_chat_SharedConversation_settings;
  organization: ChatInfo_chat_SharedConversation_organization | null;
}

export interface ChatInfo_chat_PrivateConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatInfo_chat_PrivateConversation_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatInfo_chat_PrivateConversation_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatInfo_chat_PrivateConversation_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatInfo_chat_PrivateConversation {
  __typename: "PrivateConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatInfo_chat_PrivateConversation_settings;
  blocked: boolean;
  user: ChatInfo_chat_PrivateConversation_user;
}

export interface ChatInfo_chat_GroupConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatInfo_chat_GroupConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatInfo_chat_GroupConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatInfo_chat_GroupConversation_photoRef_crop | null;
}

export interface ChatInfo_chat_GroupConversation {
  __typename: "GroupConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatInfo_chat_GroupConversation_settings;
  membersCount: number;
  photo: string | null;
  longDescription: string;
  photoRef: ChatInfo_chat_GroupConversation_photoRef | null;
}

export interface ChatInfo_chat_ChannelConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatInfo_chat_ChannelConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatInfo_chat_ChannelConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatInfo_chat_ChannelConversation_photoRef_crop | null;
}

export interface ChatInfo_chat_ChannelConversation_socialImageRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatInfo_chat_ChannelConversation_socialImageRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatInfo_chat_ChannelConversation_socialImageRef_crop | null;
}

export interface ChatInfo_chat_ChannelConversation_organization {
  __typename: "Organization";
  id: string;
  isMine: boolean;
  isOwner: boolean;
  name: string;
}

export interface ChatInfo_chat_ChannelConversation {
  __typename: "ChannelConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatInfo_chat_ChannelConversation_settings;
  myStatus: ChannelMembershipStatus;
  photo: string | null;
  photoRef: ChatInfo_chat_ChannelConversation_photoRef | null;
  isRoot: boolean;
  featured: boolean;
  hidden: boolean;
  description: string;
  longDescription: string;
  socialImageRef: ChatInfo_chat_ChannelConversation_socialImageRef | null;
  socialImage: string | null;
  membersCount: number;
  memberRequestsCount: number;
  organization: ChatInfo_chat_ChannelConversation_organization | null;
}

export type ChatInfo_chat = ChatInfo_chat_AnonymousConversation | ChatInfo_chat_SharedConversation | ChatInfo_chat_PrivateConversation | ChatInfo_chat_GroupConversation | ChatInfo_chat_ChannelConversation;

export interface ChatInfo {
  chat: ChatInfo_chat;
}

export interface ChatInfoVariables {
  conversationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatFullInfo
// ====================================================

export interface ChatFullInfo_chat_AnonymousConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatFullInfo_chat_AnonymousConversation {
  __typename: "AnonymousConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatFullInfo_chat_AnonymousConversation_settings;
}

export interface ChatFullInfo_chat_PrivateConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatFullInfo_chat_PrivateConversation_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatFullInfo_chat_PrivateConversation_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatFullInfo_chat_PrivateConversation_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatFullInfo_chat_PrivateConversation {
  __typename: "PrivateConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatFullInfo_chat_PrivateConversation_settings;
  user: ChatFullInfo_chat_PrivateConversation_user;
}

export interface ChatFullInfo_chat_GroupConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatFullInfo_chat_GroupConversation_members_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatFullInfo_chat_GroupConversation_members {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatFullInfo_chat_GroupConversation_members_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatFullInfo_chat_GroupConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatFullInfo_chat_GroupConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatFullInfo_chat_GroupConversation_photoRef_crop | null;
}

export interface ChatFullInfo_chat_GroupConversation {
  __typename: "GroupConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatFullInfo_chat_GroupConversation_settings;
  members: ChatFullInfo_chat_GroupConversation_members[];
  photo: string | null;
  photoRef: ChatFullInfo_chat_GroupConversation_photoRef | null;
}

export interface ChatFullInfo_chat_ChannelConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatFullInfo_chat_ChannelConversation_members_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatFullInfo_chat_ChannelConversation_members {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatFullInfo_chat_ChannelConversation_members_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatFullInfo_chat_ChannelConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatFullInfo_chat_ChannelConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatFullInfo_chat_ChannelConversation_photoRef_crop | null;
}

export interface ChatFullInfo_chat_ChannelConversation {
  __typename: "ChannelConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatFullInfo_chat_ChannelConversation_settings;
  myStatus: ChannelMembershipStatus;
  members: ChatFullInfo_chat_ChannelConversation_members[];
  photo: string | null;
  photoRef: ChatFullInfo_chat_ChannelConversation_photoRef | null;
}

export interface ChatFullInfo_chat_SharedConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatFullInfo_chat_SharedConversation_organizations {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatFullInfo_chat_SharedConversation {
  __typename: "SharedConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: ChatFullInfo_chat_SharedConversation_settings;
  organizations: ChatFullInfo_chat_SharedConversation_organizations[];
}

export type ChatFullInfo_chat = ChatFullInfo_chat_AnonymousConversation | ChatFullInfo_chat_PrivateConversation | ChatFullInfo_chat_GroupConversation | ChatFullInfo_chat_ChannelConversation | ChatFullInfo_chat_SharedConversation;

export interface ChatFullInfo {
  chat: ChatFullInfo_chat;
}

export interface ChatFullInfoVariables {
  conversationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupChatFullInfo
// ====================================================

export interface GroupChatFullInfo_chat_AnonymousConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface GroupChatFullInfo_chat_AnonymousConversation {
  __typename: "AnonymousConversation" | "SharedConversation" | "PrivateConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: GroupChatFullInfo_chat_AnonymousConversation_settings;
}

export interface GroupChatFullInfo_chat_ChannelConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface GroupChatFullInfo_chat_ChannelConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GroupChatFullInfo_chat_ChannelConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: GroupChatFullInfo_chat_ChannelConversation_photoRef_crop | null;
}

export interface GroupChatFullInfo_chat_ChannelConversation_organization {
  __typename: "Organization";
  id: string;
  isMine: boolean;
  isOwner: boolean;
  name: string;
}

export interface GroupChatFullInfo_chat_ChannelConversation {
  __typename: "ChannelConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: GroupChatFullInfo_chat_ChannelConversation_settings;
  photo: string | null;
  photoRef: GroupChatFullInfo_chat_ChannelConversation_photoRef | null;
  organization: GroupChatFullInfo_chat_ChannelConversation_organization | null;
}

export interface GroupChatFullInfo_chat_GroupConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface GroupChatFullInfo_chat_GroupConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GroupChatFullInfo_chat_GroupConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: GroupChatFullInfo_chat_GroupConversation_photoRef_crop | null;
}

export interface GroupChatFullInfo_chat_GroupConversation {
  __typename: "GroupConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
  settings: GroupChatFullInfo_chat_GroupConversation_settings;
  photo: string | null;
  photoRef: GroupChatFullInfo_chat_GroupConversation_photoRef | null;
}

export type GroupChatFullInfo_chat = GroupChatFullInfo_chat_AnonymousConversation | GroupChatFullInfo_chat_ChannelConversation | GroupChatFullInfo_chat_GroupConversation;

export interface GroupChatFullInfo_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface GroupChatFullInfo_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: GroupChatFullInfo_members_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface GroupChatFullInfo_members {
  __typename: "GroupConversationMember";
  user: GroupChatFullInfo_members_user;
  role: string;
}

export interface GroupChatFullInfo {
  chat: GroupChatFullInfo_chat;
  members: GroupChatFullInfo_members[];
}

export interface GroupChatFullInfoVariables {
  conversationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendMessage
// ====================================================

export interface SendMessage_sentMessage {
  __typename: "ConversationEventMessage";
  seq: number;
}

export interface SendMessage {
  sentMessage: SendMessage_sentMessage;
}

export interface SendMessageVariables {
  conversationId: string;
  message?: string | null;
  file?: string | null;
  repeatKey: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReplyMessage
// ====================================================

export interface ReplyMessage_replyMessage {
  __typename: "ConversationEventMessage";
  seq: number;
}

export interface ReplyMessage {
  replyMessage: ReplyMessage_replyMessage;
}

export interface ReplyMessageVariables {
  conversationId: string;
  message?: string | null;
  replyMessages?: any[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatRead
// ====================================================

export interface ChatRead_alphaReadChat_counter {
  __typename: "NotificationCounter";
  id: string;
  unreadCount: number;
}

export interface ChatRead_alphaReadChat_conversation {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
  unreadCount: number;
}

export interface ChatRead_alphaReadChat {
  __typename: "ChatReadResult";
  counter: ChatRead_alphaReadChat_counter;
  conversation: ChatRead_alphaReadChat_conversation;
}

export interface ChatRead {
  alphaReadChat: ChatRead_alphaReadChat;
}

export interface ChatReadVariables {
  conversationId: string;
  messageId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatSearchForCompose
// ====================================================

export interface ChatSearchForCompose_items_User_organization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChatSearchForCompose_items_User {
  __typename: "User";
  id: string;
  title: string;
  photo: string | null;
  organization: ChatSearchForCompose_items_User_organization | null;
}

export interface ChatSearchForCompose_items_Organization {
  __typename: "Organization";
  id: string;
  title: string;
  photo: string | null;
}

export type ChatSearchForCompose_items = ChatSearchForCompose_items_User | ChatSearchForCompose_items_Organization;

export interface ChatSearchForCompose {
  items: ChatSearchForCompose_items[];
}

export interface ChatSearchForComposeVariables {
  query: string;
  organizations: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatSearchForComposeMobile
// ====================================================

export interface ChatSearchForComposeMobile_items_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchForComposeMobile_items_User {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatSearchForComposeMobile_items_User_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchForComposeMobile_items_Organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export type ChatSearchForComposeMobile_items = ChatSearchForComposeMobile_items_User | ChatSearchForComposeMobile_items_Organization;

export interface ChatSearchForComposeMobile {
  items: ChatSearchForComposeMobile_items[];
}

export interface ChatSearchForComposeMobileVariables {
  query: string;
  organizations: boolean;
  limit?: number | null;
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
// GraphQL mutation operation: ChatCreateGroup
// ====================================================

export interface ChatCreateGroup_group {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
}

export interface ChatCreateGroup {
  group: ChatCreateGroup_group;
}

export interface ChatCreateGroupVariables {
  members: string[];
  message?: string | null;
  title?: string | null;
  photoRef?: ImageRefInput | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatCreateIntro
// ====================================================

export interface ChatCreateIntro_intro_message_urlAugmentation_extra_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChatCreateIntro_intro_message_urlAugmentation_extra_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatCreateIntro_intro_message_urlAugmentation_extra_User {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatCreateIntro_intro_message_urlAugmentation_extra_User_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export type ChatCreateIntro_intro_message_urlAugmentation_extra = ChatCreateIntro_intro_message_urlAugmentation_extra_AlphaOrganizationListing | ChatCreateIntro_intro_message_urlAugmentation_extra_User;

export interface ChatCreateIntro_intro_message_urlAugmentation {
  __typename: "UrlAugmentation";
  extra: ChatCreateIntro_intro_message_urlAugmentation_extra | null;
}

export interface ChatCreateIntro_intro_message {
  __typename: "ConversationMessage";
  urlAugmentation: ChatCreateIntro_intro_message_urlAugmentation | null;
}

export interface ChatCreateIntro_intro {
  __typename: "ConversationEventMessage";
  seq: number;
  message: ChatCreateIntro_intro_message;
}

export interface ChatCreateIntro {
  intro: ChatCreateIntro_intro;
}

export interface ChatCreateIntroVariables {
  conversationId: string;
  userId?: any | null;
  about?: string | null;
  file?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatEditIntro
// ====================================================

export interface ChatEditIntro_intro {
  __typename: "ConversationEventMessage";
  seq: number;
}

export interface ChatEditIntro {
  intro: ChatEditIntro_intro;
}

export interface ChatEditIntroVariables {
  messageId: string;
  userId?: any | null;
  about?: string | null;
  file?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetTyping
// ====================================================

export interface SetTyping {
  setTyping: string;
}

export interface SetTypingVariables {
  conversationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatChangeGroupTitle
// ====================================================

export interface ChatChangeGroupTitle_alphaChatChangeGroupTitle_chat {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
  flexibleId: string;
  title: string;
}

export interface ChatChangeGroupTitle_alphaChatChangeGroupTitle {
  __typename: "GroupChatUpdateResponse";
  chat: ChatChangeGroupTitle_alphaChatChangeGroupTitle_chat;
}

export interface ChatChangeGroupTitle {
  alphaChatChangeGroupTitle: ChatChangeGroupTitle_alphaChatChangeGroupTitle;
}

export interface ChatChangeGroupTitleVariables {
  conversationId: string;
  name: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatAddMember
// ====================================================

export interface ChatAddMember_alphaChatInviteToGroup_chat {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
}

export interface ChatAddMember_alphaChatInviteToGroup {
  __typename: "GroupChatUpdateResponse";
  chat: ChatAddMember_alphaChatInviteToGroup_chat;
}

export interface ChatAddMember {
  alphaChatInviteToGroup: ChatAddMember_alphaChatInviteToGroup;
}

export interface ChatAddMemberVariables {
  conversationId: string;
  userId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatAddMembers
// ====================================================

export interface ChatAddMembers_alphaChatInviteToGroup_chat {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
}

export interface ChatAddMembers_alphaChatInviteToGroup {
  __typename: "GroupChatUpdateResponse";
  chat: ChatAddMembers_alphaChatInviteToGroup_chat;
}

export interface ChatAddMembers {
  alphaChatInviteToGroup: ChatAddMembers_alphaChatInviteToGroup;
}

export interface ChatAddMembersVariables {
  conversationId: string;
  invites: GroupConversationInvite[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlockedList
// ====================================================

export interface BlockedList_blocked_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface BlockedList_blocked_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: BlockedList_blocked_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface BlockedList_blocked_blockedBy_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface BlockedList_blocked_blockedBy {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: BlockedList_blocked_blockedBy_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface BlockedList_blocked {
  __typename: "ConversationBlockedUser";
  user: BlockedList_blocked_user;
  blockedBy: BlockedList_blocked_blockedBy;
}

export interface BlockedList {
  blocked: BlockedList_blocked[];
}

export interface BlockedListVariables {
  conversationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BlockUser
// ====================================================

export interface BlockUser {
  blockUser: string;
}

export interface BlockUserVariables {
  userId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnBlockUser
// ====================================================

export interface UnBlockUser {
  blockUser: string;
}

export interface UnBlockUserVariables {
  userId: string;
  conversationId?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatSearchText
// ====================================================

export interface ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata = ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChatSearchText_items_AnonymousConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatSearchText_items_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatSearchText_items_AnonymousConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChatSearchText_items_AnonymousConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChatSearchText_items_AnonymousConversation_topMessage_reply_fileMetadata | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChatSearchText_items_AnonymousConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_user = ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_user_User;

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_photo | null;
  user: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_user | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChatSearchText_items_AnonymousConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChatSearchText_items_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ChatSearchText_items_AnonymousConversation_topMessage_sender;
  reply: ChatSearchText_items_AnonymousConversation_topMessage_reply[] | null;
  reactions: ChatSearchText_items_AnonymousConversation_topMessage_reactions[];
  urlAugmentation: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChatSearchText_items_AnonymousConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatSearchText_items_AnonymousConversation {
  __typename: "AnonymousConversation" | "SharedConversation" | "PrivateConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChatSearchText_items_AnonymousConversation_topMessage | null;
  settings: ChatSearchText_items_AnonymousConversation_settings;
}

export interface ChatSearchText_items_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChatSearchText_items_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChatSearchText_items_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChatSearchText_items_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatSearchText_items_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatSearchText_items_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChatSearchText_items_GroupConversation_topMessage_serviceMetadata = ChatSearchText_items_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChatSearchText_items_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChatSearchText_items_GroupConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatSearchText_items_GroupConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatSearchText_items_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatSearchText_items_GroupConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatSearchText_items_GroupConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChatSearchText_items_GroupConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChatSearchText_items_GroupConversation_topMessage_reply_fileMetadata | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChatSearchText_items_GroupConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChatSearchText_items_GroupConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_user = ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_user_User;

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_photo | null;
  user: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_user | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChatSearchText_items_GroupConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChatSearchText_items_GroupConversation_topMessage_fileMetadata | null;
  sender: ChatSearchText_items_GroupConversation_topMessage_sender;
  reply: ChatSearchText_items_GroupConversation_topMessage_reply[] | null;
  reactions: ChatSearchText_items_GroupConversation_topMessage_reactions[];
  urlAugmentation: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChatSearchText_items_GroupConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatSearchText_items_GroupConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchText_items_GroupConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchText_items_GroupConversation_photoRef_crop | null;
}

export interface ChatSearchText_items_GroupConversation {
  __typename: "GroupConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChatSearchText_items_GroupConversation_topMessage | null;
  settings: ChatSearchText_items_GroupConversation_settings;
  photo: string | null;
  photoRef: ChatSearchText_items_GroupConversation_photoRef | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata = ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChatSearchText_items_ChannelConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatSearchText_items_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatSearchText_items_ChannelConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChatSearchText_items_ChannelConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChatSearchText_items_ChannelConversation_topMessage_reply_fileMetadata | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChatSearchText_items_ChannelConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_user = ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_user_User;

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_photo | null;
  user: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_user | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChatSearchText_items_ChannelConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChatSearchText_items_ChannelConversation_topMessage_fileMetadata | null;
  sender: ChatSearchText_items_ChannelConversation_topMessage_sender;
  reply: ChatSearchText_items_ChannelConversation_topMessage_reply[] | null;
  reactions: ChatSearchText_items_ChannelConversation_topMessage_reactions[];
  urlAugmentation: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChatSearchText_items_ChannelConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatSearchText_items_ChannelConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchText_items_ChannelConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchText_items_ChannelConversation_photoRef_crop | null;
}

export interface ChatSearchText_items_ChannelConversation {
  __typename: "ChannelConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChatSearchText_items_ChannelConversation_topMessage | null;
  settings: ChatSearchText_items_ChannelConversation_settings;
  featured: boolean;
  hidden: boolean;
  photo: string | null;
  myStatus: ChannelMembershipStatus;
  photoRef: ChatSearchText_items_ChannelConversation_photoRef | null;
}

export type ChatSearchText_items = ChatSearchText_items_AnonymousConversation | ChatSearchText_items_GroupConversation | ChatSearchText_items_ChannelConversation;

export interface ChatSearchText {
  items: ChatSearchText_items[];
}

export interface ChatSearchTextVariables {
  query: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatSearchChannel
// ====================================================

export interface ChatSearchChannel_items_edges_node_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChatSearchChannel_items_edges_node_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChatSearchChannel_items_edges_node_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChatSearchChannel_items_edges_node_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChatSearchChannel_items_edges_node_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChatSearchChannel_items_edges_node_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChatSearchChannel_items_edges_node_topMessage_serviceMetadata = ChatSearchChannel_items_edges_node_topMessage_serviceMetadata_InviteServiceMetadata | ChatSearchChannel_items_edges_node_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChatSearchChannel_items_edges_node_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatSearchChannel_items_edges_node_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatSearchChannel_items_edges_node_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChatSearchChannel_items_edges_node_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatSearchChannel_items_edges_node_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChatSearchChannel_items_edges_node_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChatSearchChannel_items_edges_node_topMessage_reply_fileMetadata | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChatSearchChannel_items_edges_node_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChatSearchChannel_items_edges_node_topMessage_reactions_user;
  reaction: string;
}

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_user = ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_user_User;

export interface ChatSearchChannel_items_edges_node_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_iconInfo | null;
  photo: ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_photo | null;
  user: ChatSearchChannel_items_edges_node_topMessage_urlAugmentation_user | null;
}

export interface ChatSearchChannel_items_edges_node_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChatSearchChannel_items_edges_node_topMessage_serviceMetadata | null;
  fileMetadata: ChatSearchChannel_items_edges_node_topMessage_fileMetadata | null;
  sender: ChatSearchChannel_items_edges_node_topMessage_sender;
  reply: ChatSearchChannel_items_edges_node_topMessage_reply[] | null;
  reactions: ChatSearchChannel_items_edges_node_topMessage_reactions[];
  urlAugmentation: ChatSearchChannel_items_edges_node_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChatSearchChannel_items_edges_node_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatSearchChannel_items_edges_node_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchChannel_items_edges_node_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchChannel_items_edges_node_photoRef_crop | null;
}

export interface ChatSearchChannel_items_edges_node_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchChannel_items_edges_node {
  __typename: "ChannelConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChatSearchChannel_items_edges_node_topMessage | null;
  settings: ChatSearchChannel_items_edges_node_settings;
  featured: boolean;
  hidden: boolean;
  photo: string | null;
  myStatus: ChannelMembershipStatus;
  photoRef: ChatSearchChannel_items_edges_node_photoRef | null;
  membersCount: number;
  description: string;
  organization: ChatSearchChannel_items_edges_node_organization | null;
  isRoot: boolean;
}

export interface ChatSearchChannel_items_edges {
  __typename: "ChannelConversationConnectionEdge";
  node: ChatSearchChannel_items_edges_node;
  cursor: string;
}

export interface ChatSearchChannel_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface ChatSearchChannel_items {
  __typename: "ChannelConversationConnection";
  edges: ChatSearchChannel_items_edges[];
  pageInfo: ChatSearchChannel_items_pageInfo;
}

export interface ChatSearchChannel {
  items: ChatSearchChannel_items;
}

export interface ChatSearchChannelVariables {
  query?: string | null;
  sort?: string | null;
  page?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateChannel
// ====================================================

export interface CreateChannel_channel {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
}

export interface CreateChannel {
  channel: CreateChannel_channel;
}

export interface CreateChannelVariables {
  title: string;
  message?: string | null;
  description?: string | null;
  photoRef?: ImageRefInput | null;
  oid?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChannelSetFeatured
// ====================================================

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata = ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reply_fileMetadata | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_user = ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_user_User;

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_photo | null;
  user: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_user | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_sender;
  reply: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reply[] | null;
  reactions: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_reactions[];
  urlAugmentation: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation {
  __typename: "AnonymousConversation" | "SharedConversation" | "PrivateConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage | null;
  settings: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_settings;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata = ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reply_fileMetadata | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_user = ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_user_User;

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_photo | null;
  user: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_user | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_fileMetadata | null;
  sender: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_sender;
  reply: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reply[] | null;
  reactions: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_reactions[];
  urlAugmentation: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_photoRef_crop | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation {
  __typename: "GroupConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage | null;
  settings: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_settings;
  photo: string | null;
  photoRef: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_photoRef | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata = ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reply_fileMetadata | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_user = ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_user_User;

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_photo | null;
  user: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_user | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_fileMetadata | null;
  sender: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_sender;
  reply: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reply[] | null;
  reactions: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_reactions[];
  urlAugmentation: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_photoRef_crop | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation {
  __typename: "ChannelConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage | null;
  settings: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_settings;
  featured: boolean;
  hidden: boolean;
  photo: string | null;
  myStatus: ChannelMembershipStatus;
  photoRef: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_photoRef | null;
}

export type ChannelSetFeatured_alphaChannelSetFeatured = ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation | ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation | ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation;

export interface ChannelSetFeatured {
  alphaChannelSetFeatured: ChannelSetFeatured_alphaChannelSetFeatured;
}

export interface ChannelSetFeaturedVariables {
  channelId: string;
  featured: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChannelSetHidden
// ====================================================

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata = ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reply_fileMetadata | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_user = ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_user_User;

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_photo | null;
  user: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_user | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_sender;
  reply: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reply[] | null;
  reactions: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_reactions[];
  urlAugmentation: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation {
  __typename: "AnonymousConversation" | "SharedConversation" | "PrivateConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage | null;
  settings: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_settings;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata = ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reply_fileMetadata | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_user = ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_user_User;

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_photo | null;
  user: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_user | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_fileMetadata | null;
  sender: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_sender;
  reply: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reply[] | null;
  reactions: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_reactions[];
  urlAugmentation: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_photoRef_crop | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation {
  __typename: "GroupConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage | null;
  settings: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_settings;
  photo: string | null;
  photoRef: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_photoRef | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata {
  __typename: "InviteServiceMetadata" | "TitleChangeServiceMetadata" | "PhotoChangeServiceMetadata";
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user {
  __typename: "User";
  id: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy {
  __typename: "User";
  id: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata {
  __typename: "KickServiceMetadata";
  user: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_user;
  kickedBy: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata_kickedBy;
}

export type ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata = ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata_InviteServiceMetadata | ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata_KickServiceMetadata;

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reply_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reply {
  __typename: "ConversationMessage";
  sender: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reply_sender;
  id: string;
  date: any;
  message: string | null;
  edited: boolean;
  file: string | null;
  fileMetadata: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reply_fileMetadata | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reactions_user;
  reaction: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_imageInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_iconRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_iconRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_iconRef_crop | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_iconInfo {
  __typename: "FileMetadata";
  imageWidth: number | null;
  imageHeight: number | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_user_User {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_user_User_primaryOrganization | null;
}

export type ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_user = ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_user_User;

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  type: string | null;
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  hostname: string | null;
  imageURL: string | null;
  imageInfo: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_imageInfo | null;
  iconRef: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_iconRef | null;
  iconInfo: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_iconInfo | null;
  photo: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_photo | null;
  user: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_user | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_serviceMetadata | null;
  fileMetadata: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_fileMetadata | null;
  sender: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_sender;
  reply: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reply[] | null;
  reactions: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_reactions[];
  urlAugmentation: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_photoRef_crop | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation {
  __typename: "ChannelConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage | null;
  settings: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_settings;
  featured: boolean;
  hidden: boolean;
  photo: string | null;
  myStatus: ChannelMembershipStatus;
  photoRef: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_photoRef | null;
}

export type ChannelSetHidden_alphaChannelHideFromSearch = ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation | ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation | ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation;

export interface ChannelSetHidden {
  alphaChannelHideFromSearch: ChannelSetHidden_alphaChannelHideFromSearch;
}

export interface ChannelSetHiddenVariables {
  channelId: string;
  hidden: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelMembers
// ====================================================

export interface ChannelMembers_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelMembers_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelMembers_members_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelMembers_members {
  __typename: "ChannelMember";
  user: ChannelMembers_members_user;
  role: string;
  status: string;
}

export interface ChannelMembers {
  members: ChannelMembers_members[];
}

export interface ChannelMembersVariables {
  channelId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChannelInvite
// ====================================================

export interface ChannelInvite_alphaChannelInvite_chat {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
}

export interface ChannelInvite_alphaChannelInvite {
  __typename: "ConversationUpdateResponse";
  chat: ChannelInvite_alphaChannelInvite_chat;
}

export interface ChannelInvite {
  alphaChannelInvite: ChannelInvite_alphaChannelInvite;
}

export interface ChannelInviteVariables {
  channelId: string;
  userId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConversationKick
// ====================================================

export interface ConversationKick_alphaChatKickFromGroup_chat {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
}

export interface ConversationKick_alphaChatKickFromGroup {
  __typename: "GroupChatUpdateResponse";
  chat: ConversationKick_alphaChatKickFromGroup_chat;
}

export interface ConversationKick {
  alphaChatKickFromGroup: ConversationKick_alphaChatKickFromGroup;
}

export interface ConversationKickVariables {
  conversationId: string;
  userId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConversationSettingsUpdate
// ====================================================

export interface ConversationSettingsUpdate_alphaUpdateConversationSettings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ConversationSettingsUpdate {
  alphaUpdateConversationSettings: ConversationSettingsUpdate_alphaUpdateConversationSettings;
}

export interface ConversationSettingsUpdateVariables {
  settings: UpdateConversationSettingsInput;
  conversationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChannelJoin
// ====================================================

export interface ChannelJoin_join_chat {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
}

export interface ChannelJoin_join {
  __typename: "ConversationUpdateResponse";
  chat: ChannelJoin_join_chat;
}

export interface ChannelJoin {
  join: ChannelJoin_join;
}

export interface ChannelJoinVariables {
  channelId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChannelInviteMembers
// ====================================================

export interface ChannelInviteMembers {
  alphaChannelInviteMembers: string;
}

export interface ChannelInviteMembersVariables {
  channelId: string;
  inviteRequests: ChannelInviteRequest[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChannelJoinInvite
// ====================================================

export interface ChannelJoinInvite {
  alphaChannelJoinInvite: string;
}

export interface ChannelJoinInviteVariables {
  invite: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChannelRenewInviteLink
// ====================================================

export interface ChannelRenewInviteLink {
  link: string;
}

export interface ChannelRenewInviteLinkVariables {
  channelId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelInviteLink
// ====================================================

export interface ChannelInviteLink {
  link: string;
}

export interface ChannelInviteLinkVariables {
  channelId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelInviteInfo
// ====================================================

export interface ChannelInviteInfo_invite_channel_organization {
  __typename: "Organization";
  id: string;
  isMine: boolean;
  name: string;
}

export interface ChannelInviteInfo_invite_channel {
  __typename: "ChannelConversation";
  id: string;
  title: string;
  photo: string | null;
  photos: string[];
  isRoot: boolean;
  featured: boolean;
  description: string;
  myStatus: ChannelMembershipStatus;
  membersCount: number;
  socialImage: string | null;
  organization: ChannelInviteInfo_invite_channel_organization | null;
}

export interface ChannelInviteInfo_invite_invitedByUser_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChannelInviteInfo_invite_invitedByUser {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ChannelInviteInfo_invite_invitedByUser_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChannelInviteInfo_invite {
  __typename: "ChannelInvite";
  channel: ChannelInviteInfo_invite_channel;
  invitedByUser: ChannelInviteInfo_invite_invitedByUser;
}

export interface ChannelInviteInfo {
  invite: ChannelInviteInfo_invite | null;
}

export interface ChannelInviteInfoVariables {
  uuid: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChannelJoinInviteLink
// ====================================================

export interface ChannelJoinInviteLink {
  cannelId: string;
}

export interface ChannelJoinInviteLinkVariables {
  invite: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatUpdateGroup
// ====================================================

export interface ChatUpdateGroup_event_chat {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
}

export interface ChatUpdateGroup_event {
  __typename: "ConversationUpdateResponse";
  chat: ChatUpdateGroup_event_chat;
  curSeq: number;
}

export interface ChatUpdateGroup {
  event: ChatUpdateGroup_event;
}

export interface ChatUpdateGroupVariables {
  conversationId: string;
  input: UpdateGroupInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatDeleteMessage
// ====================================================

export interface ChatDeleteMessage_event {
  __typename: "ConversationEventDelete";
  seq: number;
  messageId: string;
}

export interface ChatDeleteMessage {
  event: ChatDeleteMessage_event;
}

export interface ChatDeleteMessageVariables {
  messageId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatDeleteUrlAugmentation
// ====================================================

export interface ChatDeleteUrlAugmentation_event {
  __typename: "ConversationEventMessage";
  seq: number;
}

export interface ChatDeleteUrlAugmentation {
  event: ChatDeleteUrlAugmentation_event;
}

export interface ChatDeleteUrlAugmentationVariables {
  messageId: any;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChatEditMessage
// ====================================================

export interface ChatEditMessage_event_message {
  __typename: "ConversationMessage";
  id: string;
}

export interface ChatEditMessage_event {
  __typename: "ConversationEventEditMessage";
  seq: number;
  message: ChatEditMessage_event_message;
}

export interface ChatEditMessage {
  event: ChatEditMessage_event;
}

export interface ChatEditMessageVariables {
  messageId: string;
  message?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SuperChannelAddMember
// ====================================================

export interface SuperChannelAddMember {
  superAccountChannelMemberAdd: string;
}

export interface SuperChannelAddMemberVariables {
  id: string;
  userId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DebugReadedStates
// ====================================================

export interface DebugReadedStates_debugReaderStates {
  __typename: "DebugReaderState";
  id: string;
  title: string;
  remaining: number;
}

export interface DebugReadedStates {
  debugReaderStates: DebugReadedStates_debugReaderStates[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DebugSendWelcomeEmail
// ====================================================

export interface DebugSendWelcomeEmail {
  debugSendWelcomeEmail: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PersonalTokens
// ====================================================

export interface PersonalTokens_devPersonalTokens {
  __typename: "PersonalToken";
  id: string;
  token: string;
  createdAt: string;
}

export interface PersonalTokens {
  devPersonalTokens: PersonalTokens_devPersonalTokens[];
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
// GraphQL query operation: MyOrganization
// ====================================================

export interface MyOrganization_myOrganization_contacts_photo {
  __typename: "ImageRef";
  uuid: string;
}

export interface MyOrganization_myOrganization_contacts {
  __typename: "Profile";
  id: string;
  firstName: string | null;
  lastName: string | null;
  photo: MyOrganization_myOrganization_contacts_photo | null;
  phone: string | null;
  email: string | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface MyOrganization_myOrganization_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface MyOrganization_myOrganization_members_user_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyOrganization_myOrganization_members_user_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: MyOrganization_myOrganization_members_user_photoRef_crop | null;
}

export interface MyOrganization_myOrganization_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: MyOrganization_myOrganization_members_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
  photoRef: MyOrganization_myOrganization_members_user_photoRef | null;
}

export interface MyOrganization_myOrganization_members {
  __typename: "OrganizationJoinedMember";
  role: OrganizationMemberRole;
  user: MyOrganization_myOrganization_members_user;
}

export interface MyOrganization_myOrganization_channels {
  __typename: "ChannelConversation";
  id: string;
  isRoot: boolean;
  title: string;
  photos: string[];
  photo: string | null;
  membersCount: number;
  memberRequestsCount: number;
  hidden: boolean;
  featured: boolean;
}

export interface MyOrganization_myOrganization_posts_image_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyOrganization_myOrganization_posts_image {
  __typename: "ImageRef";
  uuid: string;
  crop: MyOrganization_myOrganization_posts_image_crop | null;
}

export interface MyOrganization_myOrganization_posts_links {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface MyOrganization_myOrganization_posts {
  __typename: "AlphaDummyPost";
  text: string;
  type: string;
  description: string | null;
  date: string;
  image: MyOrganization_myOrganization_posts_image | null;
  activity: string[] | null;
  links: MyOrganization_myOrganization_posts_links[] | null;
  pinned: boolean | null;
}

export interface MyOrganization_myOrganization_potentialSites {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface MyOrganization_myOrganization_siteSizes {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface MyOrganization_myOrganization_developmentOportunities_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface MyOrganization_myOrganization_developmentOportunities_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface MyOrganization_myOrganization_developmentOportunities {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: MyOrganization_myOrganization_developmentOportunities_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: MyOrganization_myOrganization_developmentOportunities_additionalLinks[] | null;
}

export interface MyOrganization_myOrganization_acquisitionRequests_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyOrganization_myOrganization_acquisitionRequests_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: MyOrganization_myOrganization_acquisitionRequests_photo_crop | null;
}

export interface MyOrganization_myOrganization_acquisitionRequests_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface MyOrganization_myOrganization_acquisitionRequests {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  photo: MyOrganization_myOrganization_acquisitionRequests_photo | null;
  shortDescription: string | null;
  areaRange: MyOrganization_myOrganization_acquisitionRequests_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface MyOrganization_myOrganization_listingsAll_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface MyOrganization_myOrganization_listingsAll_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface MyOrganization_myOrganization_listingsAll_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyOrganization_myOrganization_listingsAll_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: MyOrganization_myOrganization_listingsAll_photo_crop | null;
}

export interface MyOrganization_myOrganization_listingsAll_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface MyOrganization_myOrganization_listingsAll {
  __typename: "AlphaOrganizationListing";
  id: string;
  name: string;
  type: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: MyOrganization_myOrganization_listingsAll_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: MyOrganization_myOrganization_listingsAll_additionalLinks[] | null;
  photo: MyOrganization_myOrganization_listingsAll_photo | null;
  shortDescription: string | null;
  areaRange: MyOrganization_myOrganization_listingsAll_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface MyOrganization_myOrganization {
  __typename: "Organization";
  id: string;
  superAccountId: string;
  isMine: boolean;
  isOwner: boolean;
  editorial: boolean;
  featured: boolean;
  isCommunity: boolean;
  name: string;
  photo: string | null;
  website: string | null;
  websiteTitle: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  location: string | null;
  contacts: MyOrganization_myOrganization_contacts[];
  members: MyOrganization_myOrganization_members[];
  organizationType: string[] | null;
  interests: string[] | null;
  locations: string[] | null;
  channels: (MyOrganization_myOrganization_channels | null)[];
  posts: MyOrganization_myOrganization_posts[] | null;
  lookingFor: string[] | null;
  geographies: string[] | null;
  doShapeAndForm: string[] | null;
  doCurrentUse: string[] | null;
  doGoodFitFor: string[] | null;
  doSpecialAttributes: string[] | null;
  doAvailability: string[] | null;
  arGeographies: string[] | null;
  arAreaRange: string[] | null;
  arHeightLimit: string[] | null;
  arActivityStatus: string[] | null;
  arAquisitionBudget: string[] | null;
  arAquisitionRate: string[] | null;
  arClosingTime: string[] | null;
  arSpecialAttributes: string[] | null;
  arLandUse: string[] | null;
  followed: boolean;
  potentialSites: MyOrganization_myOrganization_potentialSites[] | null;
  siteSizes: MyOrganization_myOrganization_siteSizes[] | null;
  developmentModels: string[] | null;
  availability: string[] | null;
  landUse: string[] | null;
  goodFor: string[] | null;
  specialAttributes: string[] | null;
  developmentOportunities: MyOrganization_myOrganization_developmentOportunities[] | null;
  acquisitionRequests: MyOrganization_myOrganization_acquisitionRequests[] | null;
  listingsAll: MyOrganization_myOrganization_listingsAll[] | null;
}

export interface MyOrganization {
  myOrganization: MyOrganization_myOrganization | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyOrganizationProfile
// ====================================================

export interface MyOrganizationProfile_organizationProfile_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyOrganizationProfile_organizationProfile_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: MyOrganizationProfile_organizationProfile_photoRef_crop | null;
}

export interface MyOrganizationProfile_organizationProfile_contacts_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyOrganizationProfile_organizationProfile_contacts_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: MyOrganizationProfile_organizationProfile_contacts_photoRef_crop | null;
}

export interface MyOrganizationProfile_organizationProfile_contacts {
  __typename: "OrganizationContact";
  name: string;
  photoRef: MyOrganizationProfile_organizationProfile_contacts_photoRef | null;
  position: string | null;
  email: string | null;
  phone: string | null;
  link: string | null;
}

export interface MyOrganizationProfile_organizationProfile_posts_image_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyOrganizationProfile_organizationProfile_posts_image {
  __typename: "ImageRef";
  uuid: string;
  crop: MyOrganizationProfile_organizationProfile_posts_image_crop | null;
}

export interface MyOrganizationProfile_organizationProfile_posts_links {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface MyOrganizationProfile_organizationProfile_posts {
  __typename: "AlphaDummyPost";
  text: string;
  type: string;
  description: string | null;
  date: string;
  image: MyOrganizationProfile_organizationProfile_posts_image | null;
  activity: string[] | null;
  links: MyOrganizationProfile_organizationProfile_posts_links[] | null;
  pinned: boolean | null;
}

export interface MyOrganizationProfile_organizationProfile_potentialSites {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface MyOrganizationProfile_organizationProfile_siteSizes {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface MyOrganizationProfile_organizationProfile_developmentOportunities_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface MyOrganizationProfile_organizationProfile_developmentOportunities_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface MyOrganizationProfile_organizationProfile_developmentOportunities {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: MyOrganizationProfile_organizationProfile_developmentOportunities_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: MyOrganizationProfile_organizationProfile_developmentOportunities_additionalLinks[] | null;
}

export interface MyOrganizationProfile_organizationProfile_acquisitionRequests_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyOrganizationProfile_organizationProfile_acquisitionRequests_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: MyOrganizationProfile_organizationProfile_acquisitionRequests_photo_crop | null;
}

export interface MyOrganizationProfile_organizationProfile_acquisitionRequests_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface MyOrganizationProfile_organizationProfile_acquisitionRequests {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  photo: MyOrganizationProfile_organizationProfile_acquisitionRequests_photo | null;
  shortDescription: string | null;
  areaRange: MyOrganizationProfile_organizationProfile_acquisitionRequests_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface MyOrganizationProfile_organizationProfile_listingsAll_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface MyOrganizationProfile_organizationProfile_listingsAll_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface MyOrganizationProfile_organizationProfile_listingsAll_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MyOrganizationProfile_organizationProfile_listingsAll_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: MyOrganizationProfile_organizationProfile_listingsAll_photo_crop | null;
}

export interface MyOrganizationProfile_organizationProfile_listingsAll_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface MyOrganizationProfile_organizationProfile_listingsAll {
  __typename: "AlphaOrganizationListing";
  id: string;
  name: string;
  type: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: MyOrganizationProfile_organizationProfile_listingsAll_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: MyOrganizationProfile_organizationProfile_listingsAll_additionalLinks[] | null;
  photo: MyOrganizationProfile_organizationProfile_listingsAll_photo | null;
  shortDescription: string | null;
  areaRange: MyOrganizationProfile_organizationProfile_listingsAll_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface MyOrganizationProfile_organizationProfile {
  __typename: "OrganizationProfile";
  id: string;
  name: string;
  photoRef: MyOrganizationProfile_organizationProfile_photoRef | null;
  website: string | null;
  websiteTitle: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  location: string | null;
  contacts: MyOrganizationProfile_organizationProfile_contacts[];
  published: boolean;
  editorial: boolean;
  featured: boolean;
  organizationType: string[] | null;
  interests: string[] | null;
  locations: string[] | null;
  posts: MyOrganizationProfile_organizationProfile_posts[] | null;
  lookingFor: string[] | null;
  geographies: string[] | null;
  doShapeAndForm: string[] | null;
  doCurrentUse: string[] | null;
  doGoodFitFor: string[] | null;
  doSpecialAttributes: string[] | null;
  doAvailability: string[] | null;
  arGeographies: string[] | null;
  arAreaRange: string[] | null;
  arHeightLimit: string[] | null;
  arActivityStatus: string[] | null;
  arAquisitionBudget: string[] | null;
  arAquisitionRate: string[] | null;
  arClosingTime: string[] | null;
  arSpecialAttributes: string[] | null;
  arLandUse: string[] | null;
  potentialSites: MyOrganizationProfile_organizationProfile_potentialSites[] | null;
  siteSizes: MyOrganizationProfile_organizationProfile_siteSizes[] | null;
  developmentModels: string[] | null;
  availability: string[] | null;
  landUse: string[] | null;
  goodFor: string[] | null;
  specialAttributes: string[] | null;
  developmentOportunities: MyOrganizationProfile_organizationProfile_developmentOportunities[] | null;
  acquisitionRequests: MyOrganizationProfile_organizationProfile_acquisitionRequests[] | null;
  listingsAll: MyOrganizationProfile_organizationProfile_listingsAll[] | null;
}

export interface MyOrganizationProfile {
  organizationProfile: MyOrganizationProfile_organizationProfile;
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

export interface UpdateOrganization_updateOrganizationProfile_contacts_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface UpdateOrganization_updateOrganizationProfile_contacts_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: UpdateOrganization_updateOrganizationProfile_contacts_photoRef_crop | null;
}

export interface UpdateOrganization_updateOrganizationProfile_contacts {
  __typename: "OrganizationContact";
  name: string;
  photoRef: UpdateOrganization_updateOrganizationProfile_contacts_photoRef | null;
  position: string | null;
  email: string | null;
  phone: string | null;
  link: string | null;
}

export interface UpdateOrganization_updateOrganizationProfile_posts_image_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface UpdateOrganization_updateOrganizationProfile_posts_image {
  __typename: "ImageRef";
  uuid: string;
  crop: UpdateOrganization_updateOrganizationProfile_posts_image_crop | null;
}

export interface UpdateOrganization_updateOrganizationProfile_posts_links {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface UpdateOrganization_updateOrganizationProfile_posts {
  __typename: "AlphaDummyPost";
  text: string;
  type: string;
  description: string | null;
  date: string;
  image: UpdateOrganization_updateOrganizationProfile_posts_image | null;
  activity: string[] | null;
  links: UpdateOrganization_updateOrganizationProfile_posts_links[] | null;
  pinned: boolean | null;
}

export interface UpdateOrganization_updateOrganizationProfile_potentialSites {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface UpdateOrganization_updateOrganizationProfile_siteSizes {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface UpdateOrganization_updateOrganizationProfile_developmentOportunities_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface UpdateOrganization_updateOrganizationProfile_developmentOportunities_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface UpdateOrganization_updateOrganizationProfile_developmentOportunities {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: UpdateOrganization_updateOrganizationProfile_developmentOportunities_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: UpdateOrganization_updateOrganizationProfile_developmentOportunities_additionalLinks[] | null;
}

export interface UpdateOrganization_updateOrganizationProfile_acquisitionRequests_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface UpdateOrganization_updateOrganizationProfile_acquisitionRequests_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: UpdateOrganization_updateOrganizationProfile_acquisitionRequests_photo_crop | null;
}

export interface UpdateOrganization_updateOrganizationProfile_acquisitionRequests_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface UpdateOrganization_updateOrganizationProfile_acquisitionRequests {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  photo: UpdateOrganization_updateOrganizationProfile_acquisitionRequests_photo | null;
  shortDescription: string | null;
  areaRange: UpdateOrganization_updateOrganizationProfile_acquisitionRequests_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface UpdateOrganization_updateOrganizationProfile_listingsAll_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface UpdateOrganization_updateOrganizationProfile_listingsAll_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface UpdateOrganization_updateOrganizationProfile_listingsAll_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface UpdateOrganization_updateOrganizationProfile_listingsAll_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: UpdateOrganization_updateOrganizationProfile_listingsAll_photo_crop | null;
}

export interface UpdateOrganization_updateOrganizationProfile_listingsAll_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface UpdateOrganization_updateOrganizationProfile_listingsAll {
  __typename: "AlphaOrganizationListing";
  id: string;
  name: string;
  type: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: UpdateOrganization_updateOrganizationProfile_listingsAll_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: UpdateOrganization_updateOrganizationProfile_listingsAll_additionalLinks[] | null;
  photo: UpdateOrganization_updateOrganizationProfile_listingsAll_photo | null;
  shortDescription: string | null;
  areaRange: UpdateOrganization_updateOrganizationProfile_listingsAll_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
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
  location: string | null;
  contacts: UpdateOrganization_updateOrganizationProfile_contacts[];
  published: boolean;
  editorial: boolean;
  featured: boolean;
  organizationType: string[] | null;
  interests: string[] | null;
  locations: string[] | null;
  posts: UpdateOrganization_updateOrganizationProfile_posts[] | null;
  lookingFor: string[] | null;
  geographies: string[] | null;
  doShapeAndForm: string[] | null;
  doCurrentUse: string[] | null;
  doGoodFitFor: string[] | null;
  doSpecialAttributes: string[] | null;
  doAvailability: string[] | null;
  arGeographies: string[] | null;
  arAreaRange: string[] | null;
  arHeightLimit: string[] | null;
  arActivityStatus: string[] | null;
  arAquisitionBudget: string[] | null;
  arAquisitionRate: string[] | null;
  arClosingTime: string[] | null;
  arSpecialAttributes: string[] | null;
  arLandUse: string[] | null;
  potentialSites: UpdateOrganization_updateOrganizationProfile_potentialSites[] | null;
  siteSizes: UpdateOrganization_updateOrganizationProfile_siteSizes[] | null;
  developmentModels: string[] | null;
  availability: string[] | null;
  landUse: string[] | null;
  goodFor: string[] | null;
  specialAttributes: string[] | null;
  developmentOportunities: UpdateOrganization_updateOrganizationProfile_developmentOportunities[] | null;
  acquisitionRequests: UpdateOrganization_updateOrganizationProfile_acquisitionRequests[] | null;
  listingsAll: UpdateOrganization_updateOrganizationProfile_listingsAll[] | null;
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

export interface Organization_organization_contacts_photo {
  __typename: "ImageRef";
  uuid: string;
}

export interface Organization_organization_contacts {
  __typename: "Profile";
  id: string;
  firstName: string | null;
  lastName: string | null;
  photo: Organization_organization_contacts_photo | null;
  phone: string | null;
  email: string | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface Organization_organization_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface Organization_organization_members_user_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Organization_organization_members_user_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: Organization_organization_members_user_photoRef_crop | null;
}

export interface Organization_organization_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: Organization_organization_members_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
  photoRef: Organization_organization_members_user_photoRef | null;
}

export interface Organization_organization_members {
  __typename: "OrganizationJoinedMember";
  role: OrganizationMemberRole;
  user: Organization_organization_members_user;
}

export interface Organization_organization_channels {
  __typename: "ChannelConversation";
  id: string;
  isRoot: boolean;
  title: string;
  photos: string[];
  photo: string | null;
  membersCount: number;
  memberRequestsCount: number;
  hidden: boolean;
  featured: boolean;
}

export interface Organization_organization_posts_image_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Organization_organization_posts_image {
  __typename: "ImageRef";
  uuid: string;
  crop: Organization_organization_posts_image_crop | null;
}

export interface Organization_organization_posts_links {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface Organization_organization_posts {
  __typename: "AlphaDummyPost";
  text: string;
  type: string;
  description: string | null;
  date: string;
  image: Organization_organization_posts_image | null;
  activity: string[] | null;
  links: Organization_organization_posts_links[] | null;
  pinned: boolean | null;
}

export interface Organization_organization_potentialSites {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface Organization_organization_siteSizes {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface Organization_organization_developmentOportunities_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface Organization_organization_developmentOportunities_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface Organization_organization_developmentOportunities {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: Organization_organization_developmentOportunities_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: Organization_organization_developmentOportunities_additionalLinks[] | null;
}

export interface Organization_organization_acquisitionRequests_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Organization_organization_acquisitionRequests_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: Organization_organization_acquisitionRequests_photo_crop | null;
}

export interface Organization_organization_acquisitionRequests_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface Organization_organization_acquisitionRequests {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  photo: Organization_organization_acquisitionRequests_photo | null;
  shortDescription: string | null;
  areaRange: Organization_organization_acquisitionRequests_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface Organization_organization_listingsAll_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface Organization_organization_listingsAll_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface Organization_organization_listingsAll_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Organization_organization_listingsAll_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: Organization_organization_listingsAll_photo_crop | null;
}

export interface Organization_organization_listingsAll_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface Organization_organization_listingsAll {
  __typename: "AlphaOrganizationListing";
  id: string;
  name: string;
  type: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: Organization_organization_listingsAll_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: Organization_organization_listingsAll_additionalLinks[] | null;
  photo: Organization_organization_listingsAll_photo | null;
  shortDescription: string | null;
  areaRange: Organization_organization_listingsAll_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface Organization_organization {
  __typename: "Organization";
  id: string;
  superAccountId: string;
  isMine: boolean;
  isOwner: boolean;
  editorial: boolean;
  featured: boolean;
  isCommunity: boolean;
  name: string;
  photo: string | null;
  website: string | null;
  websiteTitle: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  location: string | null;
  contacts: Organization_organization_contacts[];
  members: Organization_organization_members[];
  organizationType: string[] | null;
  interests: string[] | null;
  locations: string[] | null;
  channels: (Organization_organization_channels | null)[];
  posts: Organization_organization_posts[] | null;
  lookingFor: string[] | null;
  geographies: string[] | null;
  doShapeAndForm: string[] | null;
  doCurrentUse: string[] | null;
  doGoodFitFor: string[] | null;
  doSpecialAttributes: string[] | null;
  doAvailability: string[] | null;
  arGeographies: string[] | null;
  arAreaRange: string[] | null;
  arHeightLimit: string[] | null;
  arActivityStatus: string[] | null;
  arAquisitionBudget: string[] | null;
  arAquisitionRate: string[] | null;
  arClosingTime: string[] | null;
  arSpecialAttributes: string[] | null;
  arLandUse: string[] | null;
  followed: boolean;
  potentialSites: Organization_organization_potentialSites[] | null;
  siteSizes: Organization_organization_siteSizes[] | null;
  developmentModels: string[] | null;
  availability: string[] | null;
  landUse: string[] | null;
  goodFor: string[] | null;
  specialAttributes: string[] | null;
  developmentOportunities: Organization_organization_developmentOportunities[] | null;
  acquisitionRequests: Organization_organization_acquisitionRequests[] | null;
  listingsAll: Organization_organization_listingsAll[] | null;
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

export interface OrganizationProfile_organizationProfile_contacts_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfile_organizationProfile_contacts_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfile_organizationProfile_contacts_photoRef_crop | null;
}

export interface OrganizationProfile_organizationProfile_contacts {
  __typename: "OrganizationContact";
  name: string;
  photoRef: OrganizationProfile_organizationProfile_contacts_photoRef | null;
  position: string | null;
  email: string | null;
  phone: string | null;
  link: string | null;
}

export interface OrganizationProfile_organizationProfile_posts_image_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfile_organizationProfile_posts_image {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfile_organizationProfile_posts_image_crop | null;
}

export interface OrganizationProfile_organizationProfile_posts_links {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface OrganizationProfile_organizationProfile_posts {
  __typename: "AlphaDummyPost";
  text: string;
  type: string;
  description: string | null;
  date: string;
  image: OrganizationProfile_organizationProfile_posts_image | null;
  activity: string[] | null;
  links: OrganizationProfile_organizationProfile_posts_links[] | null;
  pinned: boolean | null;
}

export interface OrganizationProfile_organizationProfile_potentialSites {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationProfile_organizationProfile_siteSizes {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationProfile_organizationProfile_developmentOportunities_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface OrganizationProfile_organizationProfile_developmentOportunities_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface OrganizationProfile_organizationProfile_developmentOportunities {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: OrganizationProfile_organizationProfile_developmentOportunities_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: OrganizationProfile_organizationProfile_developmentOportunities_additionalLinks[] | null;
}

export interface OrganizationProfile_organizationProfile_acquisitionRequests_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfile_organizationProfile_acquisitionRequests_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfile_organizationProfile_acquisitionRequests_photo_crop | null;
}

export interface OrganizationProfile_organizationProfile_acquisitionRequests_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationProfile_organizationProfile_acquisitionRequests {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  photo: OrganizationProfile_organizationProfile_acquisitionRequests_photo | null;
  shortDescription: string | null;
  areaRange: OrganizationProfile_organizationProfile_acquisitionRequests_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface OrganizationProfile_organizationProfile_listingsAll_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface OrganizationProfile_organizationProfile_listingsAll_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface OrganizationProfile_organizationProfile_listingsAll_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfile_organizationProfile_listingsAll_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfile_organizationProfile_listingsAll_photo_crop | null;
}

export interface OrganizationProfile_organizationProfile_listingsAll_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationProfile_organizationProfile_listingsAll {
  __typename: "AlphaOrganizationListing";
  id: string;
  name: string;
  type: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: OrganizationProfile_organizationProfile_listingsAll_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: OrganizationProfile_organizationProfile_listingsAll_additionalLinks[] | null;
  photo: OrganizationProfile_organizationProfile_listingsAll_photo | null;
  shortDescription: string | null;
  areaRange: OrganizationProfile_organizationProfile_listingsAll_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
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
  location: string | null;
  contacts: OrganizationProfile_organizationProfile_contacts[];
  published: boolean;
  editorial: boolean;
  featured: boolean;
  organizationType: string[] | null;
  interests: string[] | null;
  locations: string[] | null;
  posts: OrganizationProfile_organizationProfile_posts[] | null;
  lookingFor: string[] | null;
  geographies: string[] | null;
  doShapeAndForm: string[] | null;
  doCurrentUse: string[] | null;
  doGoodFitFor: string[] | null;
  doSpecialAttributes: string[] | null;
  doAvailability: string[] | null;
  arGeographies: string[] | null;
  arAreaRange: string[] | null;
  arHeightLimit: string[] | null;
  arActivityStatus: string[] | null;
  arAquisitionBudget: string[] | null;
  arAquisitionRate: string[] | null;
  arClosingTime: string[] | null;
  arSpecialAttributes: string[] | null;
  arLandUse: string[] | null;
  potentialSites: OrganizationProfile_organizationProfile_potentialSites[] | null;
  siteSizes: OrganizationProfile_organizationProfile_siteSizes[] | null;
  developmentModels: string[] | null;
  availability: string[] | null;
  landUse: string[] | null;
  goodFor: string[] | null;
  specialAttributes: string[] | null;
  developmentOportunities: OrganizationProfile_organizationProfile_developmentOportunities[] | null;
  acquisitionRequests: OrganizationProfile_organizationProfile_acquisitionRequests[] | null;
  listingsAll: OrganizationProfile_organizationProfile_listingsAll[] | null;
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
// GraphQL mutation operation: FollowOrganization
// ====================================================

export interface FollowOrganization_followOrganization {
  __typename: "Organization";
  id: string;
  alphaFollowed: boolean;
}

export interface FollowOrganization {
  followOrganization: FollowOrganization_followOrganization;
}

export interface FollowOrganizationVariables {
  organizationId: string;
  follow: boolean;
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
  superAccountId: string;
  name: string;
  photo: string | null;
  locations: string[] | null;
  isMine: boolean;
  organizationType: string[] | null;
  interests: string[] | null;
  followed: boolean;
  published: boolean;
  editorial: boolean;
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
  superAccountId: string;
  name: string;
  photo: string | null;
  locations: string[] | null;
  isMine: boolean;
  organizationType: string[] | null;
  interests: string[] | null;
  followed: boolean;
  published: boolean;
  editorial: boolean;
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
// GraphQL mutation operation: CreateListing
// ====================================================

export interface CreateListing_createListing_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface CreateListing_createListing_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface CreateListing_createListing_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface CreateListing_createListing {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: CreateListing_createListing_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: CreateListing_createListing_additionalLinks[] | null;
  shortDescription: string | null;
  areaRange: CreateListing_createListing_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface CreateListing {
  createListing: CreateListing_createListing;
}

export interface CreateListingVariables {
  type: string;
  input: AlphaOrganizationListingInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditListing
// ====================================================

export interface EditListing_editListing_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface EditListing_editListing_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface EditListing_editListing_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface EditListing_editListing {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: EditListing_editListing_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: EditListing_editListing_additionalLinks[] | null;
  shortDescription: string | null;
  areaRange: EditListing_editListing_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface EditListing {
  editListing: EditListing_editListing;
}

export interface EditListingVariables {
  id: string;
  input: AlphaOrganizationListingInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteListing
// ====================================================

export interface DeleteListing {
  alphaOrganizationDeleteListing: string;
}

export interface DeleteListingVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationMembers
// ====================================================

export interface OrganizationMembers_alphaOrganizationMembers_OrganizationJoinedMember_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface OrganizationMembers_alphaOrganizationMembers_OrganizationJoinedMember_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: OrganizationMembers_alphaOrganizationMembers_OrganizationJoinedMember_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface OrganizationMembers_alphaOrganizationMembers_OrganizationJoinedMember {
  __typename: "OrganizationJoinedMember";
  user: OrganizationMembers_alphaOrganizationMembers_OrganizationJoinedMember_user;
  joinedAt: string | null;
  showInContacts: boolean;
  email: string;
  role: OrganizationMemberRole;
}

export interface OrganizationMembers_alphaOrganizationMembers_OrganizationIvitedMember {
  __typename: "OrganizationIvitedMember";
  firstName: string | null;
  lastName: string | null;
  inviteId: string;
  email: string;
  role: OrganizationMemberRole;
}

export type OrganizationMembers_alphaOrganizationMembers = OrganizationMembers_alphaOrganizationMembers_OrganizationJoinedMember | OrganizationMembers_alphaOrganizationMembers_OrganizationIvitedMember;

export interface OrganizationMembers {
  alphaOrganizationMembers: OrganizationMembers_alphaOrganizationMembers[];
}

export interface OrganizationMembersVariables {
  orgId: string;
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

export interface OrganizationCreatePublicInvite_alphaOrganizationCreatePublicInvite {
  __typename: "Invite";
  id: string;
  key: string;
  ttl: string | null;
}

export interface OrganizationCreatePublicInvite {
  alphaOrganizationCreatePublicInvite: OrganizationCreatePublicInvite_alphaOrganizationCreatePublicInvite;
}

export interface OrganizationCreatePublicInviteVariables {
  expirationDays?: number | null;
  organizationId?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationDeletePublicInvite
// ====================================================

export interface OrganizationDeletePublicInvite {
  alphaOrganizationDeletePublicInvite: string;
}

export interface OrganizationDeletePublicInviteVariables {
  organizationId?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationInviteOrganization
// ====================================================

export interface OrganizationInviteOrganization {
  alphaOrganizationInviteOrganization: string;
}

export interface OrganizationInviteOrganizationVariables {
  inviteRequests: InviteRequestOrganization[];
  organizationId?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationPublicInviteOrganizatons
// ====================================================

export interface OrganizationPublicInviteOrganizatons_publicInvite {
  __typename: "Invite";
  id: string;
  key: string;
  ttl: string | null;
}

export interface OrganizationPublicInviteOrganizatons {
  publicInvite: OrganizationPublicInviteOrganizatons_publicInvite | null;
}

export interface OrganizationPublicInviteOrganizatonsVariables {
  organizationId?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationCreatePublicInviteOrganizatons
// ====================================================

export interface OrganizationCreatePublicInviteOrganizatons_alphaOrganizationCreatePublicInviteForOrganizations {
  __typename: "Invite";
  id: string;
  key: string;
  ttl: string | null;
}

export interface OrganizationCreatePublicInviteOrganizatons {
  alphaOrganizationCreatePublicInviteForOrganizations: OrganizationCreatePublicInviteOrganizatons_alphaOrganizationCreatePublicInviteForOrganizations;
}

export interface OrganizationCreatePublicInviteOrganizatonsVariables {
  expirationDays?: number | null;
  organizationId?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationDeletePublicInviteOrganizatons
// ====================================================

export interface OrganizationDeletePublicInviteOrganizatons {
  alphaOrganizationDeletePublicInviteForOrganizations: string;
}

export interface OrganizationDeletePublicInviteOrganizatonsVariables {
  organizationId?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationActivateByInvite
// ====================================================

export interface OrganizationActivateByInvite {
  alphaJoinGlobalInvite: string;
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
  superAccountId: string;
  name: string;
  photo: string | null;
  locations: string[] | null;
  isMine: boolean;
  organizationType: string[] | null;
  interests: string[] | null;
  followed: boolean;
  published: boolean;
  editorial: boolean;
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
// GraphQL query operation: HitsPopular
// ====================================================

export interface HitsPopular_hitsPopular {
  __typename: "CategoryHits";
  category: string;
  tags: string[];
}

export interface HitsPopular {
  hitsPopular: HitsPopular_hitsPopular[] | null;
}

export interface HitsPopularVariables {
  categories: string[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: HitsAdd
// ====================================================

export interface HitsAdd {
  hitsAdd: string | null;
}

export interface HitsAddVariables {
  hits: HitInput[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AlterMemberAsContact
// ====================================================

export interface AlterMemberAsContact {
  alphaAlterMemberAsContact: string;
}

export interface AlterMemberAsContactVariables {
  orgId: string;
  memberId: string;
  showInContacts: boolean;
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
  superAccountId: string;
  name: string;
  photo: string | null;
  locations: string[] | null;
  isMine: boolean;
  organizationType: string[] | null;
  interests: string[] | null;
  followed: boolean;
  published: boolean;
  editorial: boolean;
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
// GraphQL query operation: TopCategories
// ====================================================

export interface TopCategories {
  topCategories: string[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Permissions
// ====================================================

export interface Permissions_permissions {
  __typename: "Permissions";
  roles: string[];
}

export interface Permissions {
  permissions: Permissions_permissions;
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
}

export interface SuperAdmins_superAdmins_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: SuperAdmins_superAdmins_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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
}

export interface SuperAccount_superAccount_members {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: SuperAccount_superAccount_members_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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
}

export interface SuperAccountMemberAdd_superAccountMemberAdd_members {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: SuperAccountMemberAdd_superAccountMemberAdd_members_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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
}

export interface SuperAccountMemberRemove_superAccountMemberRemove_members {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: SuperAccountMemberRemove_superAccountMemberRemove_members_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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
// GraphQL query operation: SuperChatsStats
// ====================================================

export interface SuperChatsStats_statsChats_messagesLeaderboard_user {
  __typename: "User";
  id: string;
  name: string;
  photo: string | null;
}

export interface SuperChatsStats_statsChats_messagesLeaderboard {
  __typename: "MessagesLeaderboardItem";
  user: SuperChatsStats_statsChats_messagesLeaderboard_user;
  count: number;
}

export interface SuperChatsStats_statsChats {
  __typename: "ChatStats";
  messagesSent: number;
  usersActive: number;
  usersMutedEmail: number;
  messagesLeaderboard: SuperChatsStats_statsChats_messagesLeaderboard[];
  usersMutedOpenlandBeta: number;
}

export interface SuperChatsStats {
  statsChats: SuperChatsStats_statsChats;
}

export interface SuperChatsStatsVariables {
  fromDate: string;
  toDate: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SuperMessagesSentStats
// ====================================================

export interface SuperMessagesSentStats_messagesSentStats {
  __typename: "MessagesSentEntry";
  date: any;
  count: number;
}

export interface SuperMessagesSentStats {
  messagesSentStats: SuperMessagesSentStats_messagesSentStats[];
}

export interface SuperMessagesSentStatsVariables {
  fromDate: string;
  toDate: string;
  trunc?: string | null;
  excudeTeam?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SuperOnlineUserStats
// ====================================================

export interface SuperOnlineUserStats_onlineUsers_location_coordinates {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface SuperOnlineUserStats_onlineUsers_location {
  __typename: "GeoIPLocation";
  locationCode: string;
  locationName: string;
  coordinates: SuperOnlineUserStats_onlineUsers_location_coordinates | null;
}

export interface SuperOnlineUserStats_onlineUsers_user {
  __typename: "User";
  id: string;
  photo: string | null;
  name: string;
}

export interface SuperOnlineUserStats_onlineUsers {
  __typename: "OnlineUser";
  location: SuperOnlineUserStats_onlineUsers_location | null;
  user: SuperOnlineUserStats_onlineUsers_user;
}

export interface SuperOnlineUserStats {
  onlineUsers: SuperOnlineUserStats_onlineUsers[];
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
  locations: string[] | null;
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
  locations: string[] | null;
  linkedin: string | null;
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
}

export interface SettingsUpdate {
  updateSettings: SettingsUpdate_updateSettings;
}

export interface SettingsUpdateVariables {
  input?: UpdateSettingsInput | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RefreshTask
// ====================================================

export interface RefreshTask_task {
  __typename: "Task";
  id: string;
  status: TaskStatus;
  result: string | null;
}

export interface RefreshTask {
  task: RefreshTask_task;
}

export interface RefreshTaskVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SampleTask
// ====================================================

export interface SampleTask_task {
  __typename: "Task";
  id: string;
  status: TaskStatus;
  result: string | null;
}

export interface SampleTask {
  task: SampleTask_task;
}

export interface SampleTaskVariables {
  value: number;
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
}

export interface User_user_channels_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface User_user_channels {
  __typename: "ChannelConversation";
  id: string;
  title: string;
  hidden: boolean;
  photos: string[];
  photo: string | null;
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
  primaryOrganization: User_user_primaryOrganization | null;
  linkedin: string | null;
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
}

export interface ExplorePeople_items_edges_node {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ExplorePeople_items_edges_node_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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
// GraphQL fragment: ConversationShort
// ====================================================

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
}

export interface ConversationShort_AnonymousConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ConversationShort_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ConversationShort_AnonymousConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ConversationShort_AnonymousConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ConversationShort_AnonymousConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ConversationShort_AnonymousConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ConversationShort_AnonymousConversation_topMessage_reactions_user;
  reaction: string;
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

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
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

export type ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user = ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ConversationShort_AnonymousConversation_topMessage_urlAugmentation_user_User;

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
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ConversationShort_AnonymousConversation_topMessage_serviceMetadata | null;
  fileMetadata: ConversationShort_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ConversationShort_AnonymousConversation_topMessage_sender;
  reply: ConversationShort_AnonymousConversation_topMessage_reply[] | null;
  reactions: ConversationShort_AnonymousConversation_topMessage_reactions[];
  urlAugmentation: ConversationShort_AnonymousConversation_topMessage_urlAugmentation | null;
  date: any;
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
}

export interface ConversationShort_GroupConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ConversationShort_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ConversationShort_GroupConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ConversationShort_GroupConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ConversationShort_GroupConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ConversationShort_GroupConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ConversationShort_GroupConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ConversationShort_GroupConversation_topMessage_reactions_user;
  reaction: string;
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

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
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

export type ConversationShort_GroupConversation_topMessage_urlAugmentation_user = ConversationShort_GroupConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ConversationShort_GroupConversation_topMessage_urlAugmentation_user_User;

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
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ConversationShort_GroupConversation_topMessage_serviceMetadata | null;
  fileMetadata: ConversationShort_GroupConversation_topMessage_fileMetadata | null;
  sender: ConversationShort_GroupConversation_topMessage_sender;
  reply: ConversationShort_GroupConversation_topMessage_reply[] | null;
  reactions: ConversationShort_GroupConversation_topMessage_reactions[];
  urlAugmentation: ConversationShort_GroupConversation_topMessage_urlAugmentation | null;
  date: any;
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
}

export interface ConversationShort_ChannelConversation_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ConversationShort_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ConversationShort_ChannelConversation_topMessage_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ConversationShort_ChannelConversation_topMessage_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: ConversationShort_ChannelConversation_topMessage_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ConversationShort_ChannelConversation_topMessage_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ConversationShort_ChannelConversation_topMessage_reactions {
  __typename: "MessageReaction";
  user: ConversationShort_ChannelConversation_topMessage_reactions_user;
  reaction: string;
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

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
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

export type ConversationShort_ChannelConversation_topMessage_urlAugmentation_user = ConversationShort_ChannelConversation_topMessage_urlAugmentation_user_AlphaOrganizationListing | ConversationShort_ChannelConversation_topMessage_urlAugmentation_user_User;

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
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: ConversationShort_ChannelConversation_topMessage_serviceMetadata | null;
  fileMetadata: ConversationShort_ChannelConversation_topMessage_fileMetadata | null;
  sender: ConversationShort_ChannelConversation_topMessage_sender;
  reply: ConversationShort_ChannelConversation_topMessage_reply[] | null;
  reactions: ConversationShort_ChannelConversation_topMessage_reactions[];
  urlAugmentation: ConversationShort_ChannelConversation_topMessage_urlAugmentation | null;
  date: any;
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
// GraphQL fragment: GeoShort
// ====================================================

export interface GeoShort {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MessageFull
// ====================================================

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
}

export interface MessageFull_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: MessageFull_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface MessageFull_reply_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface MessageFull_reply_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: MessageFull_reply_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface MessageFull_reactions_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface MessageFull_reactions {
  __typename: "MessageReaction";
  user: MessageFull_reactions_user;
  reaction: string;
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

export interface MessageFull_urlAugmentation_user_AlphaOrganizationListing {
  __typename: "AlphaOrganizationListing" | "Organization" | "ChannelConversation";
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

export type MessageFull_urlAugmentation_user = MessageFull_urlAugmentation_user_AlphaOrganizationListing | MessageFull_urlAugmentation_user_User;

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
  message: string | null;
  edited: boolean;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  serviceMetadata: MessageFull_serviceMetadata | null;
  fileMetadata: MessageFull_fileMetadata | null;
  sender: MessageFull_sender;
  reply: MessageFull_reply[] | null;
  reactions: MessageFull_reactions[];
  urlAugmentation: MessageFull_urlAugmentation | null;
  date: any;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationFull
// ====================================================

export interface OrganizationFull_contacts_photo {
  __typename: "ImageRef";
  uuid: string;
}

export interface OrganizationFull_contacts {
  __typename: "Profile";
  id: string;
  firstName: string | null;
  lastName: string | null;
  photo: OrganizationFull_contacts_photo | null;
  phone: string | null;
  email: string | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface OrganizationFull_members_user_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface OrganizationFull_members_user_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationFull_members_user_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationFull_members_user_photoRef_crop | null;
}

export interface OrganizationFull_members_user {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: OrganizationFull_members_user_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
  photoRef: OrganizationFull_members_user_photoRef | null;
}

export interface OrganizationFull_members {
  __typename: "OrganizationJoinedMember";
  role: OrganizationMemberRole;
  user: OrganizationFull_members_user;
}

export interface OrganizationFull_channels {
  __typename: "ChannelConversation";
  id: string;
  isRoot: boolean;
  title: string;
  photos: string[];
  photo: string | null;
  membersCount: number;
  memberRequestsCount: number;
  hidden: boolean;
  featured: boolean;
}

export interface OrganizationFull_posts_image_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationFull_posts_image {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationFull_posts_image_crop | null;
}

export interface OrganizationFull_posts_links {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface OrganizationFull_posts {
  __typename: "AlphaDummyPost";
  text: string;
  type: string;
  description: string | null;
  date: string;
  image: OrganizationFull_posts_image | null;
  activity: string[] | null;
  links: OrganizationFull_posts_links[] | null;
  pinned: boolean | null;
}

export interface OrganizationFull_potentialSites {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationFull_siteSizes {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationFull_developmentOportunities_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface OrganizationFull_developmentOportunities_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface OrganizationFull_developmentOportunities {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: OrganizationFull_developmentOportunities_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: OrganizationFull_developmentOportunities_additionalLinks[] | null;
}

export interface OrganizationFull_acquisitionRequests_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationFull_acquisitionRequests_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationFull_acquisitionRequests_photo_crop | null;
}

export interface OrganizationFull_acquisitionRequests_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationFull_acquisitionRequests {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  photo: OrganizationFull_acquisitionRequests_photo | null;
  shortDescription: string | null;
  areaRange: OrganizationFull_acquisitionRequests_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface OrganizationFull_listingsAll_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface OrganizationFull_listingsAll_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface OrganizationFull_listingsAll_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationFull_listingsAll_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationFull_listingsAll_photo_crop | null;
}

export interface OrganizationFull_listingsAll_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationFull_listingsAll {
  __typename: "AlphaOrganizationListing";
  id: string;
  name: string;
  type: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: OrganizationFull_listingsAll_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: OrganizationFull_listingsAll_additionalLinks[] | null;
  photo: OrganizationFull_listingsAll_photo | null;
  shortDescription: string | null;
  areaRange: OrganizationFull_listingsAll_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface OrganizationFull {
  __typename: "Organization";
  id: string;
  superAccountId: string;
  isMine: boolean;
  isOwner: boolean;
  editorial: boolean;
  featured: boolean;
  isCommunity: boolean;
  name: string;
  photo: string | null;
  website: string | null;
  websiteTitle: string | null;
  about: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  location: string | null;
  contacts: OrganizationFull_contacts[];
  members: OrganizationFull_members[];
  organizationType: string[] | null;
  interests: string[] | null;
  locations: string[] | null;
  channels: (OrganizationFull_channels | null)[];
  posts: OrganizationFull_posts[] | null;
  lookingFor: string[] | null;
  geographies: string[] | null;
  doShapeAndForm: string[] | null;
  doCurrentUse: string[] | null;
  doGoodFitFor: string[] | null;
  doSpecialAttributes: string[] | null;
  doAvailability: string[] | null;
  arGeographies: string[] | null;
  arAreaRange: string[] | null;
  arHeightLimit: string[] | null;
  arActivityStatus: string[] | null;
  arAquisitionBudget: string[] | null;
  arAquisitionRate: string[] | null;
  arClosingTime: string[] | null;
  arSpecialAttributes: string[] | null;
  arLandUse: string[] | null;
  followed: boolean;
  potentialSites: OrganizationFull_potentialSites[] | null;
  siteSizes: OrganizationFull_siteSizes[] | null;
  developmentModels: string[] | null;
  availability: string[] | null;
  landUse: string[] | null;
  goodFor: string[] | null;
  specialAttributes: string[] | null;
  developmentOportunities: OrganizationFull_developmentOportunities[] | null;
  acquisitionRequests: OrganizationFull_acquisitionRequests[] | null;
  listingsAll: OrganizationFull_listingsAll[] | null;
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

export interface OrganizationProfileFull_contacts_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfileFull_contacts_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfileFull_contacts_photoRef_crop | null;
}

export interface OrganizationProfileFull_contacts {
  __typename: "OrganizationContact";
  name: string;
  photoRef: OrganizationProfileFull_contacts_photoRef | null;
  position: string | null;
  email: string | null;
  phone: string | null;
  link: string | null;
}

export interface OrganizationProfileFull_posts_image_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfileFull_posts_image {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfileFull_posts_image_crop | null;
}

export interface OrganizationProfileFull_posts_links {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface OrganizationProfileFull_posts {
  __typename: "AlphaDummyPost";
  text: string;
  type: string;
  description: string | null;
  date: string;
  image: OrganizationProfileFull_posts_image | null;
  activity: string[] | null;
  links: OrganizationProfileFull_posts_links[] | null;
  pinned: boolean | null;
}

export interface OrganizationProfileFull_potentialSites {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationProfileFull_siteSizes {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationProfileFull_developmentOportunities_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface OrganizationProfileFull_developmentOportunities_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface OrganizationProfileFull_developmentOportunities {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: OrganizationProfileFull_developmentOportunities_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: OrganizationProfileFull_developmentOportunities_additionalLinks[] | null;
}

export interface OrganizationProfileFull_acquisitionRequests_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfileFull_acquisitionRequests_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfileFull_acquisitionRequests_photo_crop | null;
}

export interface OrganizationProfileFull_acquisitionRequests_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationProfileFull_acquisitionRequests {
  __typename: "AlphaOrganizationListing";
  name: string;
  id: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  photo: OrganizationProfileFull_acquisitionRequests_photo | null;
  shortDescription: string | null;
  areaRange: OrganizationProfileFull_acquisitionRequests_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
}

export interface OrganizationProfileFull_listingsAll_location {
  __typename: "MapPoint";
  lat: number;
  lon: number;
}

export interface OrganizationProfileFull_listingsAll_additionalLinks {
  __typename: "AlphaOrganizationListingLink";
  text: string;
  url: string;
}

export interface OrganizationProfileFull_listingsAll_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrganizationProfileFull_listingsAll_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: OrganizationProfileFull_listingsAll_photo_crop | null;
}

export interface OrganizationProfileFull_listingsAll_areaRange {
  __typename: "Range";
  from: number | null;
  to: number | null;
}

export interface OrganizationProfileFull_listingsAll {
  __typename: "AlphaOrganizationListing";
  id: string;
  name: string;
  type: string;
  summary: string | null;
  specialAttributes: string[] | null;
  status: string | null;
  updatedAt: string;
  location: OrganizationProfileFull_listingsAll_location | null;
  locationTitle: string | null;
  availability: string | null;
  area: number | null;
  price: number | null;
  dealType: string[] | null;
  shapeAndForm: string[] | null;
  currentUse: string[] | null;
  goodFitFor: string[] | null;
  additionalLinks: OrganizationProfileFull_listingsAll_additionalLinks[] | null;
  photo: OrganizationProfileFull_listingsAll_photo | null;
  shortDescription: string | null;
  areaRange: OrganizationProfileFull_listingsAll_areaRange | null;
  geographies: string[] | null;
  landUse: string[] | null;
  unitCapacity: string[] | null;
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
  location: string | null;
  contacts: OrganizationProfileFull_contacts[];
  published: boolean;
  editorial: boolean;
  featured: boolean;
  organizationType: string[] | null;
  interests: string[] | null;
  locations: string[] | null;
  posts: OrganizationProfileFull_posts[] | null;
  lookingFor: string[] | null;
  geographies: string[] | null;
  doShapeAndForm: string[] | null;
  doCurrentUse: string[] | null;
  doGoodFitFor: string[] | null;
  doSpecialAttributes: string[] | null;
  doAvailability: string[] | null;
  arGeographies: string[] | null;
  arAreaRange: string[] | null;
  arHeightLimit: string[] | null;
  arActivityStatus: string[] | null;
  arAquisitionBudget: string[] | null;
  arAquisitionRate: string[] | null;
  arClosingTime: string[] | null;
  arSpecialAttributes: string[] | null;
  arLandUse: string[] | null;
  potentialSites: OrganizationProfileFull_potentialSites[] | null;
  siteSizes: OrganizationProfileFull_siteSizes[] | null;
  developmentModels: string[] | null;
  availability: string[] | null;
  landUse: string[] | null;
  goodFor: string[] | null;
  specialAttributes: string[] | null;
  developmentOportunities: OrganizationProfileFull_developmentOportunities[] | null;
  acquisitionRequests: OrganizationProfileFull_acquisitionRequests[] | null;
  listingsAll: OrganizationProfileFull_listingsAll[] | null;
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
  superAccountId: string;
  name: string;
  photo: string | null;
  locations: string[] | null;
  isMine: boolean;
  organizationType: string[] | null;
  interests: string[] | null;
  followed: boolean;
  published: boolean;
  editorial: boolean;
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
}

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
   * depricated
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
}

export interface UserShort {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  online: boolean;
  lastSeen: string | null;
  isYou: boolean;
  primaryOrganization: UserShort_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export enum EmailFrequency {
  HOUR_1 = "HOUR_1",
  HOUR_24 = "HOUR_24",
  MIN_15 = "MIN_15",
  NEVER = "NEVER",
  WEEK_1 = "WEEK_1",
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

export enum TaskStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
}

export interface AlphaDummyPostInput {
  text: string;
  type: string;
  description?: string | null;
  date: string;
  image?: ImageRefInput | null;
  activity?: string[] | null;
  links?: AlphaOrganizationListingLinkInput[] | null;
  pinned?: boolean | null;
}

export interface AlphaOrganizationListingInput {
  name?: string | null;
  summary?: string | null;
  specialAttributes?: string[] | null;
  status?: string | null;
  photo?: ImageRefInput | null;
  location?: MapPointInput | null;
  locationTitle?: string | null;
  availability?: string | null;
  area?: number | null;
  price?: number | null;
  dealType?: string[] | null;
  shapeAndForm?: string[] | null;
  currentUse?: string[] | null;
  goodFitFor?: string[] | null;
  additionalLinks?: AlphaOrganizationListingLinkInput[] | null;
  shortDescription?: string | null;
  areaRange?: RangeInput | null;
  geographies?: string[] | null;
  landUse?: string[] | null;
  unitCapacity?: string[] | null;
  channels?: string[] | null;
}

export interface AlphaOrganizationListingLinkInput {
  text: string;
  url: string;
}

export interface ChannelInviteRequest {
  email: string;
  emailText?: string | null;
  firstName?: string | null;
  lastName?: string | null;
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
  name: string;
  website?: string | null;
  personal: boolean;
  photoRef?: ImageRefInput | null;
  about?: string | null;
  isCommunity?: boolean | null;
}

export interface CreateProfileInput {
  firstName: string;
  lastName?: string | null;
  photoRef?: ImageRefInput | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  about?: string | null;
  location?: string | null;
}

export interface GroupConversationInvite {
  userId: string;
  role: string;
}

export interface HitInput {
  category: string;
  tags: string[];
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

export interface InviteRequestOrganization {
  email: string;
  emailText?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export interface MapPointInput {
  ref?: string | null;
  count?: number | null;
  lat: number;
  lon: number;
}

export interface RangeInput {
  from?: number | null;
  to?: number | null;
}

export interface UpdateConversationSettingsInput {
  mobileNotifications?: NotificationMessages | null;
  mute?: boolean | null;
}

export interface UpdateGroupInput {
  title?: string | null;
  photoRef?: ImageRefInput | null;
  description?: string | null;
  longDescription?: string | null;
  socialImageRef?: ImageRefInput | null;
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
  alphaDummyPosts?: AlphaDummyPostInput[] | null;
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

export interface UpdateProfileInput {
  firstName?: string | null;
  lastName?: string | null;
  photoRef?: ImageRefInput | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  about?: string | null;
  location?: string | null;
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
