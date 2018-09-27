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
// GraphQL query operation: State
// ====================================================

export interface State_items {
  __typename: "State";
  id: string;
  title: string;
  subtitle: string;
}

export interface State {
  items: State_items[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: County
// ====================================================

export interface County_items {
  __typename: "County";
  id: string;
  title: string;
}

export interface County {
  items: County_items[];
}

export interface CountyVariables {
  stateId: string;
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
  primaryOrganization: ChatList_chats_conversations_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChatList_chats_conversations_AnonymousConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChatList_chats_conversations_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChatList_chats_conversations_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ChatList_chats_conversations_AnonymousConversation_topMessage_sender;
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
  primaryOrganization: ChatList_chats_conversations_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChatList_chats_conversations_GroupConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChatList_chats_conversations_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChatList_chats_conversations_GroupConversation_topMessage_fileMetadata | null;
  sender: ChatList_chats_conversations_GroupConversation_topMessage_sender;
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
  primaryOrganization: ChatList_chats_conversations_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChatList_chats_conversations_ChannelConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChatList_chats_conversations_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChatList_chats_conversations_ChannelConversation_topMessage_fileMetadata | null;
  sender: ChatList_chats_conversations_ChannelConversation_topMessage_sender;
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
  primaryOrganization: ChatHistory_messages_messages_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChatHistory_messages_messages_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChatHistory_messages_messages_urlAugmentation_photo | null;
}

export interface ChatHistory_messages_messages {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChatHistory_messages_messages_fileMetadata | null;
  sender: ChatHistory_messages_messages_sender;
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
  photo: string | null;
  photoRef: ChatInfo_chat_ChannelConversation_photoRef | null;
  isRoot: boolean;
  featured: boolean;
  hidden: boolean;
  description: string;
  longDescription: string;
  socialImageRef: ChatInfo_chat_ChannelConversation_socialImageRef | null;
  socialImage: string | null;
  myStatus: ChannelMembershipStatus;
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

export interface GroupChatFullInfo_chat {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
  flexibleId: string;
  title: string;
  photos: string[];
}

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

export interface SendMessage_sentMessage_message_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface SendMessage_sentMessage_message_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface SendMessage_sentMessage_message_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  primaryOrganization: SendMessage_sentMessage_message_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface SendMessage_sentMessage_message_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SendMessage_sentMessage_message_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: SendMessage_sentMessage_message_urlAugmentation_photo_crop | null;
}

export interface SendMessage_sentMessage_message_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: SendMessage_sentMessage_message_urlAugmentation_photo | null;
}

export interface SendMessage_sentMessage_message {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: SendMessage_sentMessage_message_fileMetadata | null;
  sender: SendMessage_sentMessage_message_sender;
  urlAugmentation: SendMessage_sentMessage_message_urlAugmentation | null;
  date: any;
}

export interface SendMessage_sentMessage {
  __typename: "ConversationEventMessage";
  seq: number;
  message: SendMessage_sentMessage_message;
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

export interface ChatSearchForCompose_items_User {
  __typename: "User";
  id: string;
  title: string;
}

export interface ChatSearchForCompose_items_Organization {
  __typename: "Organization";
  id: string;
  title: string;
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
  message: string;
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
  primaryOrganization: ChatSearchText_items_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChatSearchText_items_AnonymousConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChatSearchText_items_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChatSearchText_items_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ChatSearchText_items_AnonymousConversation_topMessage_sender;
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
  primaryOrganization: ChatSearchText_items_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChatSearchText_items_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChatSearchText_items_GroupConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChatSearchText_items_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChatSearchText_items_GroupConversation_topMessage_fileMetadata | null;
  sender: ChatSearchText_items_GroupConversation_topMessage_sender;
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
  primaryOrganization: ChatSearchText_items_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChatSearchText_items_ChannelConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChatSearchText_items_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChatSearchText_items_ChannelConversation_topMessage_fileMetadata | null;
  sender: ChatSearchText_items_ChannelConversation_topMessage_sender;
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
// GraphQL query operation: DocumentFetchPreviewLink
// ====================================================

export interface DocumentFetchPreviewLink {
  previewLink: string | null;
}

export interface DocumentFetchPreviewLinkVariables {
  file: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatSearchChannel
// ====================================================

export interface ChatSearchChannel_channels_edges_node_topMessage_fileMetadata {
  __typename: "FileMetadata";
  name: string;
  mimeType: string | null;
  isImage: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  imageFormat: string | null;
  size: number;
}

export interface ChatSearchChannel_channels_edges_node_topMessage_sender_primaryOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchChannel_channels_edges_node_topMessage_sender {
  __typename: "User";
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string | null;
  primaryOrganization: ChatSearchChannel_channels_edges_node_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface ChatSearchChannel_channels_edges_node_topMessage_urlAugmentation_photo_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchChannel_channels_edges_node_topMessage_urlAugmentation_photo {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchChannel_channels_edges_node_topMessage_urlAugmentation_photo_crop | null;
}

export interface ChatSearchChannel_channels_edges_node_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChatSearchChannel_channels_edges_node_topMessage_urlAugmentation_photo | null;
}

export interface ChatSearchChannel_channels_edges_node_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChatSearchChannel_channels_edges_node_topMessage_fileMetadata | null;
  sender: ChatSearchChannel_channels_edges_node_topMessage_sender;
  urlAugmentation: ChatSearchChannel_channels_edges_node_topMessage_urlAugmentation | null;
  date: any;
}

export interface ChatSearchChannel_channels_edges_node_settings {
  __typename: "ConversationSettings";
  id: string;
  mobileNotifications: NotificationMessages;
  mute: boolean;
}

export interface ChatSearchChannel_channels_edges_node_photoRef_crop {
  __typename: "ImageCrop";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChatSearchChannel_channels_edges_node_photoRef {
  __typename: "ImageRef";
  uuid: string;
  crop: ChatSearchChannel_channels_edges_node_photoRef_crop | null;
}

export interface ChatSearchChannel_channels_edges_node_organization {
  __typename: "Organization";
  id: string;
  name: string;
  photo: string | null;
}

export interface ChatSearchChannel_channels_edges_node {
  __typename: "ChannelConversation";
  id: string;
  title: string;
  flexibleId: string;
  unreadCount: number;
  photos: string[];
  topMessage: ChatSearchChannel_channels_edges_node_topMessage | null;
  settings: ChatSearchChannel_channels_edges_node_settings;
  featured: boolean;
  hidden: boolean;
  photo: string | null;
  photoRef: ChatSearchChannel_channels_edges_node_photoRef | null;
  membersCount: number;
  description: string;
  myStatus: ChannelMembershipStatus;
  organization: ChatSearchChannel_channels_edges_node_organization | null;
  isRoot: boolean;
}

export interface ChatSearchChannel_channels_edges {
  __typename: "ChannelConversationConnectionEdge";
  node: ChatSearchChannel_channels_edges_node;
  cursor: string;
}

export interface ChatSearchChannel_channels_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface ChatSearchChannel_channels {
  __typename: "ChannelConversationConnection";
  edges: ChatSearchChannel_channels_edges[];
  pageInfo: ChatSearchChannel_channels_pageInfo;
}

export interface ChatSearchChannel {
  channels: ChatSearchChannel_channels;
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
  message: string;
  description?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChannelSetFeatured
// ====================================================

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
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ChannelSetFeatured_alphaChannelSetFeatured_AnonymousConversation_topMessage_sender;
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
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_fileMetadata | null;
  sender: ChannelSetFeatured_alphaChannelSetFeatured_GroupConversation_topMessage_sender;
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
  primaryOrganization: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_fileMetadata | null;
  sender: ChannelSetFeatured_alphaChannelSetFeatured_ChannelConversation_topMessage_sender;
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
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ChannelSetHidden_alphaChannelHideFromSearch_AnonymousConversation_topMessage_sender;
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
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_fileMetadata | null;
  sender: ChannelSetHidden_alphaChannelHideFromSearch_GroupConversation_topMessage_sender;
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
  primaryOrganization: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_urlAugmentation_photo | null;
}

export interface ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_fileMetadata | null;
  sender: ChannelSetHidden_alphaChannelHideFromSearch_ChannelConversation_topMessage_sender;
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
// GraphQL query operation: UserChannels
// ====================================================

export interface UserChannels_channels_conversations {
  __typename: "ChannelConversation" | "AnonymousConversation" | "SharedConversation" | "PrivateConversation" | "GroupConversation";
  id: string;
  title: string;
}

export interface UserChannels_channels {
  __typename: "ConversationConnection";
  conversations: UserChannels_channels_conversations[];
}

export interface UserChannels {
  channels: UserChannels_channels;
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
// GraphQL query operation: AllDeals
// ====================================================

export interface AllDeals_deals_parcel {
  __typename: "Parcel";
  id: string;
  /**
   * Deprecated
   */
  title: string;
  /**
   * Deprecated geometry
   */
  extrasArea: number | null;
}

export interface AllDeals_deals {
  __typename: "Deal";
  id: string;
  title: string;
  location: string | null;
  address: string | null;
  status: DealStatus | null;
  statusDescription: string | null;
  statusDate: string | null;
  price: number | null;
  extrasArea: number | null;
  extrasCompany: string | null;
  parcel: AllDeals_deals_parcel | null;
}

export interface AllDeals {
  deals: AllDeals_deals[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllDealsMap
// ====================================================

export interface AllDealsMap_deals_parcel_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface AllDealsMap_deals_parcel {
  __typename: "Parcel";
  id: string;
  /**
   * Deprecated
   */
  title: string;
  center: AllDealsMap_deals_parcel_center | null;
}

export interface AllDealsMap_deals {
  __typename: "Deal";
  id: string;
  status: DealStatus | null;
  parcel: AllDealsMap_deals_parcel | null;
}

export interface AllDealsMap {
  deals: AllDealsMap_deals[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Deal
// ====================================================

export interface Deal_deal_parcel_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface Deal_deal_parcel_compatibleBuildings_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface Deal_deal_parcel_compatibleBuildings {
  __typename: "BuildingLocation";
  key: string;
  title: string;
  width: number;
  height: number;
  center: Deal_deal_parcel_compatibleBuildings_center | null;
  angle: number | null;
  shape: string | null;
}

export interface Deal_deal_parcel_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface Deal_deal_parcel_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface Deal_deal_parcel_city {
  __typename: "City";
  id: string;
  name: string;
  county: Deal_deal_parcel_city_county;
  state: Deal_deal_parcel_city_state;
}

export interface Deal_deal_parcel {
  __typename: "Parcel";
  id: string;
  number: Deal_deal_parcel_number;
  /**
   * Geometry
   */
  geometry: string | null;
  address: string | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  /**
   * Deprecated geometry
   */
  extrasArea: number | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasVacant: boolean | null;
  compatibleBuildings: Deal_deal_parcel_compatibleBuildings[] | null;
  /**
   * Addresses
   */
  city: Deal_deal_parcel_city;
}

export interface Deal_deal {
  __typename: "Deal";
  id: string;
  title: string;
  location: string | null;
  address: string | null;
  status: DealStatus | null;
  statusDescription: string | null;
  statusDate: string | null;
  price: number | null;
  extrasArea: number | null;
  extrasCompany: string | null;
  extrasAttorney: string | null;
  extrasReferee: string | null;
  extrasLotShape: string | null;
  extrasLotSize: string | null;
  extrasTaxBill: number | null;
  parcel: Deal_deal_parcel | null;
}

export interface Deal {
  deal: Deal_deal;
}

export interface DealVariables {
  dealId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDeal
// ====================================================

export interface AddDeal_dealAdd_parcel {
  __typename: "Parcel";
  id: string;
  /**
   * Deprecated
   */
  title: string;
  /**
   * Geometry
   */
  geometry: string | null;
}

export interface AddDeal_dealAdd {
  __typename: "Deal";
  id: string;
  title: string;
  location: string | null;
  address: string | null;
  status: DealStatus | null;
  statusDescription: string | null;
  statusDate: string | null;
  price: number | null;
  extrasArea: number | null;
  extrasCompany: string | null;
  extrasAttorney: string | null;
  extrasReferee: string | null;
  extrasLotShape: string | null;
  extrasLotSize: string | null;
  extrasTaxBill: number | null;
  parcel: AddDeal_dealAdd_parcel | null;
}

export interface AddDeal {
  dealAdd: AddDeal_dealAdd;
}

export interface AddDealVariables {
  data: DealInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AlterDeal
// ====================================================

export interface AlterDeal_dealAlter_parcel {
  __typename: "Parcel";
  id: string;
  /**
   * Deprecated
   */
  title: string;
  /**
   * Geometry
   */
  geometry: string | null;
}

export interface AlterDeal_dealAlter {
  __typename: "Deal";
  id: string;
  title: string;
  location: string | null;
  address: string | null;
  status: DealStatus | null;
  statusDescription: string | null;
  statusDate: string | null;
  price: number | null;
  extrasArea: number | null;
  extrasCompany: string | null;
  extrasAttorney: string | null;
  extrasReferee: string | null;
  extrasLotShape: string | null;
  extrasLotSize: string | null;
  extrasTaxBill: number | null;
  parcel: AlterDeal_dealAlter_parcel | null;
}

export interface AlterDeal {
  dealAlter: AlterDeal_dealAlter;
}

export interface AlterDealVariables {
  dealId: string;
  data: DealInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveDeal
// ====================================================

export interface RemoveDeal {
  dealRemove: string;
}

export interface RemoveDealVariables {
  dealId: string;
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
// GraphQL query operation: Folders
// ====================================================

export interface Folders_folders {
  __typename: "Folder";
  id: string;
  name: string;
  special: SpecialFolder | null;
  parcelsCount: number;
}

export interface Folders {
  folders: Folders_folders[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FoldersSelect
// ====================================================

export interface FoldersSelect_items {
  __typename: "Folder";
  id: string;
  title: string;
}

export interface FoldersSelect {
  items: FoldersSelect_items[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Folder
// ====================================================

export interface Folder_folder {
  __typename: "Folder";
  id: string;
  name: string;
  special: SpecialFolder | null;
  parcelsCount: number;
}

export interface Folder {
  folder: Folder_folder;
}

export interface FolderVariables {
  folderId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FolderItemsConnection
// ====================================================

export interface FolderItemsConnection_items_edges_node_parcel_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface FolderItemsConnection_items_edges_node_parcel_area {
  __typename: "DataFloat";
  value: number;
}

export interface FolderItemsConnection_items_edges_node_parcel_depth {
  __typename: "DataFloat";
  value: number;
}

export interface FolderItemsConnection_items_edges_node_parcel_front {
  __typename: "DataFloat";
  value: number;
}

export interface FolderItemsConnection_items_edges_node_parcel_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface FolderItemsConnection_items_edges_node_parcel_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface FolderItemsConnection_items_edges_node_parcel_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface FolderItemsConnection_items_edges_node_parcel_city {
  __typename: "City";
  id: string;
  name: string;
  county: FolderItemsConnection_items_edges_node_parcel_city_county;
  state: FolderItemsConnection_items_edges_node_parcel_city_state;
}

export interface FolderItemsConnection_items_edges_node_parcel {
  __typename: "Parcel";
  id: string;
  number: FolderItemsConnection_items_edges_node_parcel_number;
  address: string | null;
  /**
   * Geometry
   */
  geometry: string | null;
  area: FolderItemsConnection_items_edges_node_parcel_area | null;
  depth: FolderItemsConnection_items_edges_node_parcel_depth | null;
  front: FolderItemsConnection_items_edges_node_parcel_front | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: FolderItemsConnection_items_edges_node_parcel_folder | null;
  /**
   * Addresses
   */
  city: FolderItemsConnection_items_edges_node_parcel_city;
}

export interface FolderItemsConnection_items_edges_node {
  __typename: "FolderItem";
  id: string;
  parcel: FolderItemsConnection_items_edges_node_parcel;
}

export interface FolderItemsConnection_items_edges {
  __typename: "FolderEdge";
  node: FolderItemsConnection_items_edges_node;
  cursor: string;
}

export interface FolderItemsConnection_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface FolderItemsConnection_items {
  __typename: "FolderConnection";
  edges: FolderItemsConnection_items_edges[];
  pageInfo: FolderItemsConnection_items_pageInfo;
}

export interface FolderItemsConnection {
  items: FolderItemsConnection_items;
}

export interface FolderItemsConnectionVariables {
  folderId: string;
  cursor?: string | null;
  page?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateFolder
// ====================================================

export interface CreateFolder_folder_parcels_edges_node_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface CreateFolder_folder_parcels_edges_node {
  __typename: "Parcel";
  id: string;
  folder: CreateFolder_folder_parcels_edges_node_folder | null;
}

export interface CreateFolder_folder_parcels_edges {
  __typename: "ParcelEdge";
  node: CreateFolder_folder_parcels_edges_node;
}

export interface CreateFolder_folder_parcels_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  pagesCount: number;
  currentPage: number;
  openEnded: boolean;
}

export interface CreateFolder_folder_parcels {
  __typename: "ParcelConnection";
  edges: CreateFolder_folder_parcels_edges[];
  pageInfo: CreateFolder_folder_parcels_pageInfo;
}

export interface CreateFolder_folder {
  __typename: "Folder";
  id: string;
  name: string;
  special: SpecialFolder | null;
  parcelsCount: number;
  parcels: CreateFolder_folder_parcels;
}

export interface CreateFolder {
  folder: CreateFolder_folder;
}

export interface CreateFolderVariables {
  name: string;
  initialParcels?: string[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AlterFolder
// ====================================================

export interface AlterFolder_alaterFolder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface AlterFolder {
  alaterFolder: AlterFolder_alaterFolder;
}

export interface AlterFolderVariables {
  folderId: string;
  name: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteFolder
// ====================================================

export interface DeleteFolder {
  alphaDeleteFolder: string;
}

export interface DeleteFolderVariables {
  folderId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToFolder
// ====================================================

export interface AddToFolder_addToFolder_folder {
  __typename: "Folder";
  id: string;
  name: string;
  parcelsCount: number;
}

export interface AddToFolder_addToFolder {
  __typename: "Parcel";
  id: string;
  folder: AddToFolder_addToFolder_folder | null;
}

export interface AddToFolder {
  addToFolder: AddToFolder_addToFolder;
}

export interface AddToFolderVariables {
  parcelId: string;
  folderId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetParcelFolder
// ====================================================

export interface SetParcelFolder_setFolder_folder {
  __typename: "Folder";
  id: string;
  name: string;
  parcelsCount: number;
}

export interface SetParcelFolder_setFolder {
  __typename: "Parcel";
  id: string;
  folder: SetParcelFolder_setFolder_folder | null;
}

export interface SetParcelFolder {
  setFolder: SetParcelFolder_setFolder;
}

export interface SetParcelFolderVariables {
  parcelId: string;
  folderId?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToFolderFromSearch
// ====================================================

export interface AddToFolderFromSearch {
  alphaAddToFolderFromSearch: number;
}

export interface AddToFolderFromSearchVariables {
  folderId: string;
  query?: string | null;
  state: string;
  county: string;
  city: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateFolderFromSearch
// ====================================================

export interface CreateFolderFromSearch_folder {
  __typename: "Folder";
  id: string;
  name: string;
  special: SpecialFolder | null;
  parcelsCount: number;
}

export interface CreateFolderFromSearch {
  folder: CreateFolderFromSearch_folder;
}

export interface CreateFolderFromSearchVariables {
  name: string;
  query?: string | null;
  state: string;
  county: string;
  city: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FolderItemsTileOverlay
// ====================================================

export interface FolderItemsTileOverlay_tiles_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface FolderItemsTileOverlay_tiles_parcel {
  __typename: "Parcel";
  id: string;
}

export interface FolderItemsTileOverlay_tiles {
  __typename: "FolderItem";
  id: string;
  center: FolderItemsTileOverlay_tiles_center | null;
  parcel: FolderItemsTileOverlay_tiles_parcel;
}

export interface FolderItemsTileOverlay {
  tiles: FolderItemsTileOverlay_tiles[] | null;
}

export interface FolderItemsTileOverlayVariables {
  box: GeoBox;
  folderId: string;
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
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationDeletePublicInvite
// ====================================================

export interface OrganizationDeletePublicInvite {
  alphaOrganizationDeletePublicInvite: string;
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
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationDeletePublicInviteOrganizatons
// ====================================================

export interface OrganizationDeletePublicInviteOrganizatons {
  alphaOrganizationDeletePublicInviteForOrganizations: string;
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
// GraphQL query operation: BlocksConnection
// ====================================================

export interface BlocksConnection_items_edges_node {
  __typename: "Block";
  id: string;
  title: string;
  extrasArea: number | null;
  extrasSupervisorDistrict: string | null;
  extrasZoning: string[] | null;
}

export interface BlocksConnection_items_edges {
  __typename: "BlockEdge";
  node: BlocksConnection_items_edges_node;
  cursor: string;
}

export interface BlocksConnection_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface BlocksConnection_items {
  __typename: "BlockConnection";
  edges: BlocksConnection_items_edges[];
  pageInfo: BlocksConnection_items_pageInfo;
}

export interface BlocksConnection {
  items: BlocksConnection_items;
}

export interface BlocksConnectionVariables {
  cursor?: string | null;
  page?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Block
// ====================================================

export interface Block_item_parcels {
  __typename: "Parcel";
  id: string;
  /**
   * Deprecated
   */
  title: string;
  /**
   * Geometry
   */
  geometry: string | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
}

export interface Block_item {
  __typename: "Block";
  id: string;
  title: string;
  extrasArea: number | null;
  extrasZoning: string[] | null;
  extrasSupervisorDistrict: string | null;
  geometry: string | null;
  parcels: Block_item_parcels[];
}

export interface Block {
  item: Block_item;
}

export interface BlockVariables {
  blockId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ParcelsConnection
// ====================================================

export interface ParcelsConnection_items_edges_node_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface ParcelsConnection_items_edges_node_area {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelsConnection_items_edges_node_depth {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelsConnection_items_edges_node_front {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelsConnection_items_edges_node_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface ParcelsConnection_items_edges_node_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface ParcelsConnection_items_edges_node_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface ParcelsConnection_items_edges_node_city {
  __typename: "City";
  id: string;
  name: string;
  county: ParcelsConnection_items_edges_node_city_county;
  state: ParcelsConnection_items_edges_node_city_state;
}

export interface ParcelsConnection_items_edges_node {
  __typename: "Parcel";
  id: string;
  number: ParcelsConnection_items_edges_node_number;
  address: string | null;
  /**
   * Geometry
   */
  geometry: string | null;
  area: ParcelsConnection_items_edges_node_area | null;
  depth: ParcelsConnection_items_edges_node_depth | null;
  front: ParcelsConnection_items_edges_node_front | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: ParcelsConnection_items_edges_node_folder | null;
  /**
   * Addresses
   */
  city: ParcelsConnection_items_edges_node_city;
}

export interface ParcelsConnection_items_edges {
  __typename: "ParcelEdge";
  node: ParcelsConnection_items_edges_node;
  cursor: string;
}

export interface ParcelsConnection_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface ParcelsConnection_items {
  __typename: "ParcelConnection";
  edges: ParcelsConnection_items_edges[];
  pageInfo: ParcelsConnection_items_pageInfo;
}

export interface ParcelsConnection {
  items: ParcelsConnection_items;
}

export interface ParcelsConnectionVariables {
  cursor?: string | null;
  query?: string | null;
  page?: number | null;
  state: string;
  county: string;
  city: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ParcelsFavorites
// ====================================================

export interface ParcelsFavorites_items_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface ParcelsFavorites_items_area {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelsFavorites_items_depth {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelsFavorites_items_front {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelsFavorites_items_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface ParcelsFavorites_items_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface ParcelsFavorites_items_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface ParcelsFavorites_items_city {
  __typename: "City";
  id: string;
  name: string;
  county: ParcelsFavorites_items_city_county;
  state: ParcelsFavorites_items_city_state;
}

export interface ParcelsFavorites_items {
  __typename: "Parcel";
  id: string;
  number: ParcelsFavorites_items_number;
  address: string | null;
  /**
   * Geometry
   */
  geometry: string | null;
  area: ParcelsFavorites_items_area | null;
  depth: ParcelsFavorites_items_depth | null;
  front: ParcelsFavorites_items_front | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: ParcelsFavorites_items_folder | null;
  /**
   * Addresses
   */
  city: ParcelsFavorites_items_city;
}

export interface ParcelsFavorites {
  items: ParcelsFavorites_items[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ParcelsFavoritesCount
// ====================================================

export interface ParcelsFavoritesCount {
  parcelFavoritesCount: number;
  dealsCount: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Parcel
// ====================================================

export interface Parcel_item_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface Parcel_item_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface Parcel_item_compatibleBuildings_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface Parcel_item_compatibleBuildings {
  __typename: "BuildingLocation";
  key: string;
  title: string;
  width: number;
  height: number;
  center: Parcel_item_compatibleBuildings_center | null;
  angle: number | null;
  shape: string | null;
}

export interface Parcel_item_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface Parcel_item_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface Parcel_item_city {
  __typename: "City";
  id: string;
  name: string;
  county: Parcel_item_city_county;
  state: Parcel_item_city_state;
}

export interface Parcel_item_area {
  __typename: "DataFloat";
  value: number;
}

export interface Parcel_item_depth {
  __typename: "DataFloat";
  value: number;
}

export interface Parcel_item_front {
  __typename: "DataFloat";
  value: number;
}

export interface Parcel_item_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface Parcel_item_userData {
  __typename: "ParcelUserData";
  notes: string | null;
}

export interface Parcel_item_opportunity {
  __typename: "Opportunity";
  id: string;
  priority: OpportunityPriority;
  state: OpportunityState;
}

export interface Parcel_item_metadata {
  __typename: "ParcelMetadata";
  description: string | null;
  available: boolean | null;
  currentUse: ParcelUse | null;
  isOkForTower: boolean | null;
}

export interface Parcel_item_likes {
  __typename: "Likes";
  liked: boolean;
  count: number | null;
}

export interface Parcel_item_permits {
  __typename: "Permit";
  id: string;
  createdAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  description: string | null;
  approvalTime: number | null;
  proposedUnits: number | null;
  existingUnits: number | null;
  governmentalUrl: string;
}

export interface Parcel_item_links {
  __typename: "Link";
  title: string;
  url: string;
}

export interface Parcel_item {
  __typename: "Parcel";
  id: string;
  number: Parcel_item_number;
  /**
   * Geometry
   */
  geometry: string | null;
  center: Parcel_item_center | null;
  address: string | null;
  compatibleBuildings: Parcel_item_compatibleBuildings[] | null;
  /**
   * Addresses
   */
  city: Parcel_item_city;
  area: Parcel_item_area | null;
  depth: Parcel_item_depth | null;
  front: Parcel_item_front | null;
  extrasSupervisorDistrict: string | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasOwnerName: string | null;
  extrasOwnerType: OwnerType | null;
  extrasOwnerPublic: boolean | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: Parcel_item_folder | null;
  /**
   * User Data
   */
  userData: Parcel_item_userData | null;
  /**
   * Linked Data
   */
  opportunity: Parcel_item_opportunity | null;
  metadata: Parcel_item_metadata;
  likes: Parcel_item_likes;
  permits: Parcel_item_permits[];
  /**
   * Metadata
   */
  links: Parcel_item_links[];
}

export interface Parcel {
  item: Parcel_item;
}

export interface ParcelVariables {
  parcelId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ParcelsTileOverlay
// ====================================================

export interface ParcelsTileOverlay_tiles {
  __typename: "Parcel";
  id: string;
  /**
   * Geometry
   */
  geometry: string | null;
}

export interface ParcelsTileOverlay {
  tiles: ParcelsTileOverlay_tiles[] | null;
}

export interface ParcelsTileOverlayVariables {
  box: GeoBox;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ParcelsMapSearch
// ====================================================

export interface ParcelsMapSearch_results {
  __typename: "MapPoint";
  ref: string | null;
  count: number | null;
  lat: number;
  lon: number;
}

export interface ParcelsMapSearch {
  results: ParcelsMapSearch_results[];
}

export interface ParcelsMapSearchVariables {
  box: GeoBox;
  query: string;
  zoom: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ParcelsPointOverlay
// ====================================================

export interface ParcelsPointOverlay_tiles_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface ParcelsPointOverlay_tiles {
  __typename: "Parcel";
  id: string;
  center: ParcelsPointOverlay_tiles_center | null;
}

export interface ParcelsPointOverlay {
  tiles: ParcelsPointOverlay_tiles[] | null;
}

export interface ParcelsPointOverlayVariables {
  box: GeoBox;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlocksTileOverlay
// ====================================================

export interface BlocksTileOverlay_tiles {
  __typename: "Block";
  id: string;
  geometry: string | null;
}

export interface BlocksTileOverlay {
  tiles: BlocksTileOverlay_tiles[] | null;
}

export interface BlocksTileOverlayVariables {
  box: GeoBox;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ParcelAlter
// ====================================================

export interface ParcelAlter_parcelAlterMetadata_metadata {
  __typename: "ParcelMetadata";
  description: string | null;
  available: boolean | null;
  currentUse: ParcelUse | null;
  isOkForTower: boolean | null;
}

export interface ParcelAlter_parcelAlterMetadata {
  __typename: "Parcel";
  id: string;
  metadata: ParcelAlter_parcelAlterMetadata_metadata;
}

export interface ParcelAlter {
  parcelAlterMetadata: ParcelAlter_parcelAlterMetadata;
}

export interface ParcelAlterVariables {
  parcelId: string;
  data: ParcelMetadataInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ParcelLike
// ====================================================

export interface ParcelLike_likeParcel_likes {
  __typename: "Likes";
  liked: boolean;
  count: number | null;
}

export interface ParcelLike_likeParcel {
  __typename: "Parcel";
  id: string;
  likes: ParcelLike_likeParcel_likes;
}

export interface ParcelLike {
  likeParcel: ParcelLike_likeParcel;
}

export interface ParcelLikeVariables {
  parcelId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ParcelUnlike
// ====================================================

export interface ParcelUnlike_unlikeParcel_likes {
  __typename: "Likes";
  liked: boolean;
  count: number | null;
}

export interface ParcelUnlike_unlikeParcel {
  __typename: "Parcel";
  id: string;
  likes: ParcelUnlike_unlikeParcel_likes;
}

export interface ParcelUnlike {
  unlikeParcel: ParcelUnlike_unlikeParcel;
}

export interface ParcelUnlikeVariables {
  parcelId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ParcelsStats
// ====================================================

export interface ParcelsStats {
  parcelsStats: number;
}

export interface ParcelsStatsVariables {
  query?: string | null;
  state: string;
  county: string;
  city: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ParcelsSearch
// ====================================================

export interface ParcelsSearch_items {
  __typename: "Parcel";
  id: string;
  /**
   * Deprecated
   */
  title: string;
}

export interface ParcelsSearch {
  items: ParcelsSearch_items[];
}

export interface ParcelsSearchVariables {
  query: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ParcelNotes
// ====================================================

export interface ParcelNotes_alphaSetNote_userData {
  __typename: "ParcelUserData";
  notes: string | null;
}

export interface ParcelNotes_alphaSetNote {
  __typename: "Parcel";
  id: string;
  /**
   * User Data
   */
  userData: ParcelNotes_alphaSetNote_userData | null;
}

export interface ParcelNotes {
  alphaSetNote: ParcelNotes_alphaSetNote;
}

export interface ParcelNotesVariables {
  parcelId: string;
  notes: string;
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
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Permit
// ====================================================

export interface Permit_permit_streetNumbers {
  __typename: "StreetNumber";
  streetId: string;
  streetName: string;
  streetNameSuffix: string | null;
  streetNumber: number;
  streetNumberSuffix: string | null;
}

export interface Permit_permit_events_PermitEventStatus {
  __typename: "PermitEventStatus";
  oldStatus: PermitStatus | null;
  newStatus: PermitStatus | null;
  date: string | null;
}

export interface Permit_permit_events_PermitEventFieldChanged {
  __typename: "PermitEventFieldChanged";
  fieldName: string;
  oldValue: string | null;
  newValue: string | null;
  date: string | null;
}

export type Permit_permit_events = Permit_permit_events_PermitEventStatus | Permit_permit_events_PermitEventFieldChanged;

export interface Permit_permit_relatedPermits_streetNumbers {
  __typename: "StreetNumber";
  streetId: string;
  streetName: string;
  streetNameSuffix: string | null;
  streetNumber: number;
  streetNumberSuffix: string | null;
}

export interface Permit_permit_relatedPermits {
  __typename: "Permit";
  id: string;
  createdAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  description: string | null;
  approvalTime: number | null;
  proposedUnits: number | null;
  existingUnits: number | null;
  governmentalUrl: string;
  streetNumbers: Permit_permit_relatedPermits_streetNumbers[];
}

export interface Permit_permit {
  __typename: "Permit";
  id: string;
  issuedAt: string | null;
  createdAt: string | null;
  startedAt: string | null;
  expiresAt: string | null;
  expiredAt: string | null;
  completedAt: string | null;
  filedAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  existingStories: number | null;
  proposedStories: number | null;
  existingUnits: number | null;
  proposedUnits: number | null;
  existingAffordableUnits: number | null;
  proposedAffordableUnits: number | null;
  proposedUse: string | null;
  description: string | null;
  governmentalUrl: string;
  approvalTime: number | null;
  streetNumbers: Permit_permit_streetNumbers[];
  events: Permit_permit_events[];
  relatedPermits: Permit_permit_relatedPermits[];
}

export interface Permit {
  permit: Permit_permit | null;
}

export interface PermitVariables {
  permitId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PermitsConnection
// ====================================================

export interface PermitsConnection_items_edges_node_streetNumbers {
  __typename: "StreetNumber";
  streetId: string;
  streetName: string;
  streetNameSuffix: string | null;
  streetNumber: number;
  streetNumberSuffix: string | null;
}

export interface PermitsConnection_items_edges_node {
  __typename: "Permit";
  id: string;
  createdAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  description: string | null;
  approvalTime: number | null;
  proposedUnits: number | null;
  existingUnits: number | null;
  governmentalUrl: string;
  streetNumbers: PermitsConnection_items_edges_node_streetNumbers[];
}

export interface PermitsConnection_items_edges {
  __typename: "PermitEdge";
  node: PermitsConnection_items_edges_node;
  cursor: string;
}

export interface PermitsConnection_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface PermitsConnection_items {
  __typename: "PermitsConnection";
  edges: PermitsConnection_items_edges[];
  pageInfo: PermitsConnection_items_pageInfo;
}

export interface PermitsConnection {
  items: PermitsConnection_items;
}

export interface PermitsConnectionVariables {
  cursor?: string | null;
  filter?: string | null;
  page?: number | null;
  type?: PermitType | null;
  sort?: PermitSorting | null;
  minUnits?: number | null;
  issuedYear?: string | null;
  fromPipeline?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_search_parcels_edges_node_metadata {
  __typename: "ParcelMetadata";
  available: boolean | null;
  currentUse: ParcelUse | null;
}

export interface Search_search_parcels_edges_node {
  __typename: "Parcel";
  id: string;
  /**
   * Deprecated
   */
  title: string;
  /**
   * Deprecated geometry
   */
  extrasArea: number | null;
  extrasNeighborhood: string | null;
  metadata: Search_search_parcels_edges_node_metadata;
}

export interface Search_search_parcels_edges_highlight {
  __typename: "SearchHighlight";
  key: string;
  match: string;
}

export interface Search_search_parcels_edges {
  __typename: "ParcelResult";
  node: Search_search_parcels_edges_node;
  score: number;
  highlight: Search_search_parcels_edges_highlight[];
}

export interface Search_search_parcels {
  __typename: "ParcelSearchResult";
  edges: Search_search_parcels_edges[];
  total: number;
}

export interface Search_search_folders_edges_node {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface Search_search_folders_edges_highlight {
  __typename: "SearchHighlight";
  key: string;
  match: string;
}

export interface Search_search_folders_edges {
  __typename: "FolderResult";
  node: Search_search_folders_edges_node;
  score: number;
  highlight: Search_search_folders_edges_highlight[];
}

export interface Search_search_folders {
  __typename: "FolderSearchResult";
  edges: Search_search_folders_edges[];
  total: number;
}

export interface Search_search {
  __typename: "SearchResult";
  parcels: Search_search_parcels;
  folders: Search_search_folders;
}

export interface Search {
  search: Search_search;
}

export interface SearchVariables {
  query: string;
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
// GraphQL query operation: Sourcing
// ====================================================

export interface Sourcing_alphaOpportunities_edges_node_parcel_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface Sourcing_alphaOpportunities_edges_node_parcel_area {
  __typename: "DataFloat";
  value: number;
}

export interface Sourcing_alphaOpportunities_edges_node_parcel_depth {
  __typename: "DataFloat";
  value: number;
}

export interface Sourcing_alphaOpportunities_edges_node_parcel_front {
  __typename: "DataFloat";
  value: number;
}

export interface Sourcing_alphaOpportunities_edges_node_parcel_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface Sourcing_alphaOpportunities_edges_node_parcel_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface Sourcing_alphaOpportunities_edges_node_parcel_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface Sourcing_alphaOpportunities_edges_node_parcel_city {
  __typename: "City";
  id: string;
  name: string;
  county: Sourcing_alphaOpportunities_edges_node_parcel_city_county;
  state: Sourcing_alphaOpportunities_edges_node_parcel_city_state;
}

export interface Sourcing_alphaOpportunities_edges_node_parcel {
  __typename: "Parcel";
  id: string;
  number: Sourcing_alphaOpportunities_edges_node_parcel_number;
  address: string | null;
  /**
   * Geometry
   */
  geometry: string | null;
  area: Sourcing_alphaOpportunities_edges_node_parcel_area | null;
  depth: Sourcing_alphaOpportunities_edges_node_parcel_depth | null;
  front: Sourcing_alphaOpportunities_edges_node_parcel_front | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: Sourcing_alphaOpportunities_edges_node_parcel_folder | null;
  /**
   * Addresses
   */
  city: Sourcing_alphaOpportunities_edges_node_parcel_city;
  extrasOwnerName: string | null;
}

export interface Sourcing_alphaOpportunities_edges_node {
  __typename: "Opportunity";
  id: string;
  state: OpportunityState;
  priority: OpportunityPriority;
  updatedAt: string;
  parcel: Sourcing_alphaOpportunities_edges_node_parcel;
}

export interface Sourcing_alphaOpportunities_edges {
  __typename: "OpportunityEdge";
  node: Sourcing_alphaOpportunities_edges_node;
  cursor: string;
}

export interface Sourcing_alphaOpportunities_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface Sourcing_alphaOpportunities {
  __typename: "OpportunityConnection";
  edges: Sourcing_alphaOpportunities_edges[];
  pageInfo: Sourcing_alphaOpportunities_pageInfo;
}

export interface Sourcing {
  alphaOpportunities: Sourcing_alphaOpportunities;
}

export interface SourcingVariables {
  state?: OpportunityState | null;
  cursor?: string | null;
  page?: number | null;
  sort?: OpportunitySort | null;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SourcingFirst
// ====================================================

export interface SourcingFirst_alphaOpportunities_edges_node_parcel_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface SourcingFirst_alphaOpportunities_edges_node_parcel_area {
  __typename: "DataFloat";
  value: number;
}

export interface SourcingFirst_alphaOpportunities_edges_node_parcel_depth {
  __typename: "DataFloat";
  value: number;
}

export interface SourcingFirst_alphaOpportunities_edges_node_parcel_front {
  __typename: "DataFloat";
  value: number;
}

export interface SourcingFirst_alphaOpportunities_edges_node_parcel_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface SourcingFirst_alphaOpportunities_edges_node_parcel_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface SourcingFirst_alphaOpportunities_edges_node_parcel_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface SourcingFirst_alphaOpportunities_edges_node_parcel_city {
  __typename: "City";
  id: string;
  name: string;
  county: SourcingFirst_alphaOpportunities_edges_node_parcel_city_county;
  state: SourcingFirst_alphaOpportunities_edges_node_parcel_city_state;
}

export interface SourcingFirst_alphaOpportunities_edges_node_parcel {
  __typename: "Parcel";
  id: string;
  number: SourcingFirst_alphaOpportunities_edges_node_parcel_number;
  address: string | null;
  /**
   * Geometry
   */
  geometry: string | null;
  area: SourcingFirst_alphaOpportunities_edges_node_parcel_area | null;
  depth: SourcingFirst_alphaOpportunities_edges_node_parcel_depth | null;
  front: SourcingFirst_alphaOpportunities_edges_node_parcel_front | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: SourcingFirst_alphaOpportunities_edges_node_parcel_folder | null;
  /**
   * Addresses
   */
  city: SourcingFirst_alphaOpportunities_edges_node_parcel_city;
  extrasOwnerName: string | null;
}

export interface SourcingFirst_alphaOpportunities_edges_node {
  __typename: "Opportunity";
  id: string;
  state: OpportunityState;
  priority: OpportunityPriority;
  updatedAt: string;
  parcel: SourcingFirst_alphaOpportunities_edges_node_parcel;
}

export interface SourcingFirst_alphaOpportunities_edges {
  __typename: "OpportunityEdge";
  node: SourcingFirst_alphaOpportunities_edges_node;
  cursor: string;
}

export interface SourcingFirst_alphaOpportunities_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  currentPage: number;
  pagesCount: number;
  openEnded: boolean;
}

export interface SourcingFirst_alphaOpportunities {
  __typename: "OpportunityConnection";
  edges: SourcingFirst_alphaOpportunities_edges[];
  pageInfo: SourcingFirst_alphaOpportunities_pageInfo;
}

export interface SourcingFirst {
  alphaOpportunities: SourcingFirst_alphaOpportunities;
}

export interface SourcingFirstVariables {
  state?: OpportunityState | null;
  cursor?: string | null;
  page?: number | null;
  sort?: OpportunitySort | null;
  query?: string | null;
  first: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SourcingAll
// ====================================================

export interface SourcingAll_alphaAllOpportunities_parcel_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface SourcingAll_alphaAllOpportunities_parcel_area {
  __typename: "DataFloat";
  value: number;
}

export interface SourcingAll_alphaAllOpportunities_parcel_depth {
  __typename: "DataFloat";
  value: number;
}

export interface SourcingAll_alphaAllOpportunities_parcel_front {
  __typename: "DataFloat";
  value: number;
}

export interface SourcingAll_alphaAllOpportunities_parcel_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface SourcingAll_alphaAllOpportunities_parcel_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface SourcingAll_alphaAllOpportunities_parcel_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface SourcingAll_alphaAllOpportunities_parcel_city {
  __typename: "City";
  id: string;
  name: string;
  county: SourcingAll_alphaAllOpportunities_parcel_city_county;
  state: SourcingAll_alphaAllOpportunities_parcel_city_state;
}

export interface SourcingAll_alphaAllOpportunities_parcel {
  __typename: "Parcel";
  id: string;
  number: SourcingAll_alphaAllOpportunities_parcel_number;
  address: string | null;
  /**
   * Geometry
   */
  geometry: string | null;
  area: SourcingAll_alphaAllOpportunities_parcel_area | null;
  depth: SourcingAll_alphaAllOpportunities_parcel_depth | null;
  front: SourcingAll_alphaAllOpportunities_parcel_front | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: SourcingAll_alphaAllOpportunities_parcel_folder | null;
  /**
   * Addresses
   */
  city: SourcingAll_alphaAllOpportunities_parcel_city;
  extrasOwnerName: string | null;
}

export interface SourcingAll_alphaAllOpportunities {
  __typename: "Opportunity";
  id: string;
  state: OpportunityState;
  priority: OpportunityPriority;
  updatedAt: string;
  parcel: SourcingAll_alphaAllOpportunities_parcel;
}

export interface SourcingAll {
  alphaAllOpportunities: SourcingAll_alphaAllOpportunities[] | null;
}

export interface SourcingAllVariables {
  state?: OpportunityState | null;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SourcingAllReport
// ====================================================

export interface SourcingAllReport_alphaAllOpportunities_parcel_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface SourcingAllReport_alphaAllOpportunities_parcel_area {
  __typename: "DataFloat";
  value: number;
}

export interface SourcingAllReport_alphaAllOpportunities_parcel_depth {
  __typename: "DataFloat";
  value: number;
}

export interface SourcingAllReport_alphaAllOpportunities_parcel_front {
  __typename: "DataFloat";
  value: number;
}

export interface SourcingAllReport_alphaAllOpportunities_parcel_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface SourcingAllReport_alphaAllOpportunities_parcel_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface SourcingAllReport_alphaAllOpportunities_parcel_city {
  __typename: "City";
  id: string;
  name: string;
  county: SourcingAllReport_alphaAllOpportunities_parcel_city_county;
  state: SourcingAllReport_alphaAllOpportunities_parcel_city_state;
}

export interface SourcingAllReport_alphaAllOpportunities_parcel {
  __typename: "Parcel";
  id: string;
  number: SourcingAllReport_alphaAllOpportunities_parcel_number;
  address: string | null;
  /**
   * Geometry
   */
  geometry: string | null;
  area: SourcingAllReport_alphaAllOpportunities_parcel_area | null;
  depth: SourcingAllReport_alphaAllOpportunities_parcel_depth | null;
  front: SourcingAllReport_alphaAllOpportunities_parcel_front | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  /**
   * Addresses
   */
  city: SourcingAllReport_alphaAllOpportunities_parcel_city;
  extrasOwnerName: string | null;
}

export interface SourcingAllReport_alphaAllOpportunities {
  __typename: "Opportunity";
  id: string;
  state: OpportunityState;
  priority: OpportunityPriority;
  updatedAt: string;
  parcel: SourcingAllReport_alphaAllOpportunities_parcel;
}

export interface SourcingAllReport {
  alphaAllOpportunities: SourcingAllReport_alphaAllOpportunities[] | null;
}

export interface SourcingAllReportVariables {
  state?: OpportunityState | null;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProspectingCapacity
// ====================================================

export interface ProspectingCapacity {
  totalCapacity: number;
}

export interface ProspectingCapacityVariables {
  state?: OpportunityState | null;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Opportunity
// ====================================================

export interface Opportunity_alphaOpportunity_parcel_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface Opportunity_alphaOpportunity_parcel_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface Opportunity_alphaOpportunity_parcel_compatibleBuildings_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface Opportunity_alphaOpportunity_parcel_compatibleBuildings {
  __typename: "BuildingLocation";
  key: string;
  title: string;
  width: number;
  height: number;
  center: Opportunity_alphaOpportunity_parcel_compatibleBuildings_center | null;
  angle: number | null;
  shape: string | null;
}

export interface Opportunity_alphaOpportunity_parcel_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface Opportunity_alphaOpportunity_parcel_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface Opportunity_alphaOpportunity_parcel_city {
  __typename: "City";
  id: string;
  name: string;
  county: Opportunity_alphaOpportunity_parcel_city_county;
  state: Opportunity_alphaOpportunity_parcel_city_state;
}

export interface Opportunity_alphaOpportunity_parcel_area {
  __typename: "DataFloat";
  value: number;
}

export interface Opportunity_alphaOpportunity_parcel_depth {
  __typename: "DataFloat";
  value: number;
}

export interface Opportunity_alphaOpportunity_parcel_front {
  __typename: "DataFloat";
  value: number;
}

export interface Opportunity_alphaOpportunity_parcel_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface Opportunity_alphaOpportunity_parcel_userData {
  __typename: "ParcelUserData";
  notes: string | null;
}

export interface Opportunity_alphaOpportunity_parcel_opportunity {
  __typename: "Opportunity";
  id: string;
  priority: OpportunityPriority;
  state: OpportunityState;
}

export interface Opportunity_alphaOpportunity_parcel_metadata {
  __typename: "ParcelMetadata";
  description: string | null;
  available: boolean | null;
  currentUse: ParcelUse | null;
  isOkForTower: boolean | null;
}

export interface Opportunity_alphaOpportunity_parcel_likes {
  __typename: "Likes";
  liked: boolean;
  count: number | null;
}

export interface Opportunity_alphaOpportunity_parcel_permits {
  __typename: "Permit";
  id: string;
  createdAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  description: string | null;
  approvalTime: number | null;
  proposedUnits: number | null;
  existingUnits: number | null;
  governmentalUrl: string;
}

export interface Opportunity_alphaOpportunity_parcel_links {
  __typename: "Link";
  title: string;
  url: string;
}

export interface Opportunity_alphaOpportunity_parcel {
  __typename: "Parcel";
  id: string;
  number: Opportunity_alphaOpportunity_parcel_number;
  /**
   * Geometry
   */
  geometry: string | null;
  center: Opportunity_alphaOpportunity_parcel_center | null;
  address: string | null;
  compatibleBuildings: Opportunity_alphaOpportunity_parcel_compatibleBuildings[] | null;
  /**
   * Addresses
   */
  city: Opportunity_alphaOpportunity_parcel_city;
  area: Opportunity_alphaOpportunity_parcel_area | null;
  depth: Opportunity_alphaOpportunity_parcel_depth | null;
  front: Opportunity_alphaOpportunity_parcel_front | null;
  extrasSupervisorDistrict: string | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasOwnerName: string | null;
  extrasOwnerType: OwnerType | null;
  extrasOwnerPublic: boolean | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: Opportunity_alphaOpportunity_parcel_folder | null;
  /**
   * User Data
   */
  userData: Opportunity_alphaOpportunity_parcel_userData | null;
  /**
   * Linked Data
   */
  opportunity: Opportunity_alphaOpportunity_parcel_opportunity | null;
  metadata: Opportunity_alphaOpportunity_parcel_metadata;
  likes: Opportunity_alphaOpportunity_parcel_likes;
  permits: Opportunity_alphaOpportunity_parcel_permits[];
  /**
   * Metadata
   */
  links: Opportunity_alphaOpportunity_parcel_links[];
}

export interface Opportunity_alphaOpportunity {
  __typename: "Opportunity";
  id: string;
  state: OpportunityState;
  priority: OpportunityPriority;
  updatedAt: string;
  parcel: Opportunity_alphaOpportunity_parcel;
}

export interface Opportunity {
  alphaOpportunity: Opportunity_alphaOpportunity | null;
}

export interface OpportunityVariables {
  opportunityId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OpportunityTileOverlay
// ====================================================

export interface OpportunityTileOverlay_tiles_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface OpportunityTileOverlay_tiles_parcel {
  __typename: "Parcel";
  id: string;
}

export interface OpportunityTileOverlay_tiles {
  __typename: "Opportunity";
  id: string;
  center: OpportunityTileOverlay_tiles_center | null;
  parcel: OpportunityTileOverlay_tiles_parcel;
}

export interface OpportunityTileOverlay {
  tiles: OpportunityTileOverlay_tiles[] | null;
}

export interface OpportunityTileOverlayVariables {
  box: GeoBox;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddOpportunity
// ====================================================

export interface AddOpportunity_aphaAddOpportunity_parcel_opportunity {
  __typename: "Opportunity";
  id: string;
}

export interface AddOpportunity_aphaAddOpportunity_parcel {
  __typename: "Parcel";
  id: string;
  /**
   * Linked Data
   */
  opportunity: AddOpportunity_aphaAddOpportunity_parcel_opportunity | null;
}

export interface AddOpportunity_aphaAddOpportunity {
  __typename: "Opportunity";
  id: string;
  state: OpportunityState;
  priority: OpportunityPriority;
  updatedAt: string;
  parcel: AddOpportunity_aphaAddOpportunity_parcel;
}

export interface AddOpportunity {
  aphaAddOpportunity: AddOpportunity_aphaAddOpportunity | null;
}

export interface AddOpportunityVariables {
  parcelId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ApproveOpportunity
// ====================================================

export interface ApproveOpportunity {
  alphaApprove: string;
}

export interface ApproveOpportunityVariables {
  opportunityId: string;
  state: OpportunityState;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RejectOpportunity
// ====================================================

export interface RejectOpportunity {
  alphaReject: string;
}

export interface RejectOpportunityVariables {
  opportunityId: string;
  state: OpportunityState;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SnoozeOpportunity
// ====================================================

export interface SnoozeOpportunity {
  alphaSnooze: string;
}

export interface SnoozeOpportunityVariables {
  opportunityId: string;
  state: OpportunityState;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetOpportunity
// ====================================================

export interface ResetOpportunity {
  alphaReset: string;
}

export interface ResetOpportunityVariables {
  opportunityId: string;
  state: OpportunityState;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddOpportunityFromSearch
// ====================================================

export interface AddOpportunityFromSearch {
  alphaAddOpportunitiesFromSearch: number;
}

export interface AddOpportunityFromSearchVariables {
  query: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NextOpportunity
// ====================================================

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_compatibleBuildings_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_compatibleBuildings {
  __typename: "BuildingLocation";
  key: string;
  title: string;
  width: number;
  height: number;
  center: NextOpportunity_alphaNextReviewOpportunity_parcel_compatibleBuildings_center | null;
  angle: number | null;
  shape: string | null;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_city {
  __typename: "City";
  id: string;
  name: string;
  county: NextOpportunity_alphaNextReviewOpportunity_parcel_city_county;
  state: NextOpportunity_alphaNextReviewOpportunity_parcel_city_state;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_area {
  __typename: "DataFloat";
  value: number;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_depth {
  __typename: "DataFloat";
  value: number;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_front {
  __typename: "DataFloat";
  value: number;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_userData {
  __typename: "ParcelUserData";
  notes: string | null;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_opportunity {
  __typename: "Opportunity";
  id: string;
  priority: OpportunityPriority;
  state: OpportunityState;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_metadata {
  __typename: "ParcelMetadata";
  description: string | null;
  available: boolean | null;
  currentUse: ParcelUse | null;
  isOkForTower: boolean | null;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_likes {
  __typename: "Likes";
  liked: boolean;
  count: number | null;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_permits {
  __typename: "Permit";
  id: string;
  createdAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  description: string | null;
  approvalTime: number | null;
  proposedUnits: number | null;
  existingUnits: number | null;
  governmentalUrl: string;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel_links {
  __typename: "Link";
  title: string;
  url: string;
}

export interface NextOpportunity_alphaNextReviewOpportunity_parcel {
  __typename: "Parcel";
  id: string;
  number: NextOpportunity_alphaNextReviewOpportunity_parcel_number;
  /**
   * Geometry
   */
  geometry: string | null;
  center: NextOpportunity_alphaNextReviewOpportunity_parcel_center | null;
  address: string | null;
  compatibleBuildings: NextOpportunity_alphaNextReviewOpportunity_parcel_compatibleBuildings[] | null;
  /**
   * Addresses
   */
  city: NextOpportunity_alphaNextReviewOpportunity_parcel_city;
  area: NextOpportunity_alphaNextReviewOpportunity_parcel_area | null;
  depth: NextOpportunity_alphaNextReviewOpportunity_parcel_depth | null;
  front: NextOpportunity_alphaNextReviewOpportunity_parcel_front | null;
  extrasSupervisorDistrict: string | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasOwnerName: string | null;
  extrasOwnerType: OwnerType | null;
  extrasOwnerPublic: boolean | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: NextOpportunity_alphaNextReviewOpportunity_parcel_folder | null;
  /**
   * User Data
   */
  userData: NextOpportunity_alphaNextReviewOpportunity_parcel_userData | null;
  /**
   * Linked Data
   */
  opportunity: NextOpportunity_alphaNextReviewOpportunity_parcel_opportunity | null;
  metadata: NextOpportunity_alphaNextReviewOpportunity_parcel_metadata;
  likes: NextOpportunity_alphaNextReviewOpportunity_parcel_likes;
  permits: NextOpportunity_alphaNextReviewOpportunity_parcel_permits[];
  /**
   * Metadata
   */
  links: NextOpportunity_alphaNextReviewOpportunity_parcel_links[];
}

export interface NextOpportunity_alphaNextReviewOpportunity {
  __typename: "Opportunity";
  id: string;
  state: OpportunityState;
  priority: OpportunityPriority;
  updatedAt: string;
  parcel: NextOpportunity_alphaNextReviewOpportunity_parcel;
}

export interface NextOpportunity {
  alphaNextReviewOpportunity: NextOpportunity_alphaNextReviewOpportunity | null;
}

export interface NextOpportunityVariables {
  state: OpportunityState;
  initialId?: string | null;
  sort?: OpportunitySort | null;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OpportunityStats
// ====================================================

export interface OpportunityStats {
  incoming: number;
  approved_initial: number;
  approved_zoning: number;
  approved: number;
  rejected: number;
  snoozed: number;
}

export interface OpportunityStatsVariables {
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Owners
// ====================================================

export interface Owners {
  items: (string | null)[] | null;
}

export interface OwnersVariables {
  state?: OpportunityState | null;
  query?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SuperCities
// ====================================================

export interface SuperCities_superCities {
  __typename: "SuperCity";
  id: string;
  key: string;
  name: string;
  enabled: boolean;
  blockSource: string | null;
  blockSourceLayer: string | null;
  parcelSource: string | null;
  parcelSourceLayer: string | null;
}

export interface SuperCities {
  superCities: SuperCities_superCities[];
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
// GraphQL mutation operation: FolderExportTask
// ====================================================

export interface FolderExportTask_task {
  __typename: "Task";
  id: string;
  status: TaskStatus;
  result: string | null;
}

export interface FolderExportTask {
  task: FolderExportTask_task;
}

export interface FolderExportTaskVariables {
  folderId: string;
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
  primaryOrganization: User_user_primaryOrganization | null;
  linkedin: string | null;
  channels: User_user_channels[];
}

export interface User {
  user: User_user;
}

export interface UserVariables {
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
  primaryOrganization: ExplorePeople_items_edges_node_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
  isYou: boolean;
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
// GraphQL fragment: ChartFull
// ====================================================

export interface ChartFull_datasets {
  __typename: "ChartDataSet";
  label: string;
  values: number[];
}

export interface ChartFull {
  __typename: "Chart";
  labels: string[];
  datasets: ChartFull_datasets[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConversationShort
// ====================================================

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
  primaryOrganization: ConversationShort_AnonymousConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ConversationShort_AnonymousConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ConversationShort_AnonymousConversation_topMessage_urlAugmentation_photo | null;
}

export interface ConversationShort_AnonymousConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ConversationShort_AnonymousConversation_topMessage_fileMetadata | null;
  sender: ConversationShort_AnonymousConversation_topMessage_sender;
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
  primaryOrganization: ConversationShort_GroupConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ConversationShort_GroupConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ConversationShort_GroupConversation_topMessage_urlAugmentation_photo | null;
}

export interface ConversationShort_GroupConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ConversationShort_GroupConversation_topMessage_fileMetadata | null;
  sender: ConversationShort_GroupConversation_topMessage_sender;
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
  primaryOrganization: ConversationShort_ChannelConversation_topMessage_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface ConversationShort_ChannelConversation_topMessage_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: ConversationShort_ChannelConversation_topMessage_urlAugmentation_photo | null;
}

export interface ConversationShort_ChannelConversation_topMessage {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: ConversationShort_ChannelConversation_topMessage_fileMetadata | null;
  sender: ConversationShort_ChannelConversation_topMessage_sender;
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
  primaryOrganization: MessageFull_sender_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
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

export interface MessageFull_urlAugmentation {
  __typename: "UrlAugmentation";
  url: string;
  title: string | null;
  date: string | null;
  subtitle: string | null;
  description: string | null;
  photo: MessageFull_urlAugmentation_photo | null;
}

export interface MessageFull {
  __typename: "ConversationMessage";
  id: string;
  message: string | null;
  file: string | null;
  repeatKey: string | null;
  isService: boolean;
  fileMetadata: MessageFull_fileMetadata | null;
  sender: MessageFull_sender;
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
// GraphQL fragment: ParcelID
// ====================================================

export interface ParcelID {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
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
  primaryOrganization: UserShort_primaryOrganization | null;
  role: string | null;
  linkedin: string | null;
  twitter: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ParcelFull
// ====================================================

export interface ParcelFull_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface ParcelFull_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface ParcelFull_compatibleBuildings_center {
  __typename: "Geo";
  latitude: number;
  longitude: number;
}

export interface ParcelFull_compatibleBuildings {
  __typename: "BuildingLocation";
  key: string;
  title: string;
  width: number;
  height: number;
  center: ParcelFull_compatibleBuildings_center | null;
  angle: number | null;
  shape: string | null;
}

export interface ParcelFull_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface ParcelFull_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface ParcelFull_city {
  __typename: "City";
  id: string;
  name: string;
  county: ParcelFull_city_county;
  state: ParcelFull_city_state;
}

export interface ParcelFull_area {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelFull_depth {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelFull_front {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelFull_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface ParcelFull_userData {
  __typename: "ParcelUserData";
  notes: string | null;
}

export interface ParcelFull_opportunity {
  __typename: "Opportunity";
  id: string;
  priority: OpportunityPriority;
  state: OpportunityState;
}

export interface ParcelFull_metadata {
  __typename: "ParcelMetadata";
  description: string | null;
  available: boolean | null;
  currentUse: ParcelUse | null;
  isOkForTower: boolean | null;
}

export interface ParcelFull_likes {
  __typename: "Likes";
  liked: boolean;
  count: number | null;
}

export interface ParcelFull_permits {
  __typename: "Permit";
  id: string;
  createdAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  description: string | null;
  approvalTime: number | null;
  proposedUnits: number | null;
  existingUnits: number | null;
  governmentalUrl: string;
}

export interface ParcelFull_links {
  __typename: "Link";
  title: string;
  url: string;
}

export interface ParcelFull {
  __typename: "Parcel";
  id: string;
  number: ParcelFull_number;
  /**
   * Geometry
   */
  geometry: string | null;
  center: ParcelFull_center | null;
  address: string | null;
  compatibleBuildings: ParcelFull_compatibleBuildings[] | null;
  /**
   * Addresses
   */
  city: ParcelFull_city;
  area: ParcelFull_area | null;
  depth: ParcelFull_depth | null;
  front: ParcelFull_front | null;
  extrasSupervisorDistrict: string | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasOwnerName: string | null;
  extrasOwnerType: OwnerType | null;
  extrasOwnerPublic: boolean | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: ParcelFull_folder | null;
  /**
   * User Data
   */
  userData: ParcelFull_userData | null;
  /**
   * Linked Data
   */
  opportunity: ParcelFull_opportunity | null;
  metadata: ParcelFull_metadata;
  likes: ParcelFull_likes;
  permits: ParcelFull_permits[];
  /**
   * Metadata
   */
  links: ParcelFull_links[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ParcelShort
// ====================================================

export interface ParcelShort_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface ParcelShort_area {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelShort_depth {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelShort_front {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelShort_folder {
  __typename: "Folder";
  id: string;
  name: string;
}

export interface ParcelShort_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface ParcelShort_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface ParcelShort_city {
  __typename: "City";
  id: string;
  name: string;
  county: ParcelShort_city_county;
  state: ParcelShort_city_state;
}

export interface ParcelShort {
  __typename: "Parcel";
  id: string;
  number: ParcelShort_number;
  address: string | null;
  /**
   * Geometry
   */
  geometry: string | null;
  area: ParcelShort_area | null;
  depth: ParcelShort_depth | null;
  front: ParcelShort_front | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  folder: ParcelShort_folder | null;
  /**
   * Addresses
   */
  city: ParcelShort_city;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ParcelShortNoFolder
// ====================================================

export interface ParcelShortNoFolder_number {
  __typename: "ParcelNumber";
  borough: string | null;
  boroughId: string | null;
  block: string | null;
  blockPadded: string | null;
  lot: string | null;
  lotPadded: string | null;
  title: string;
}

export interface ParcelShortNoFolder_area {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelShortNoFolder_depth {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelShortNoFolder_front {
  __typename: "DataFloat";
  value: number;
}

export interface ParcelShortNoFolder_city_county {
  __typename: "County";
  id: string;
  name: string;
}

export interface ParcelShortNoFolder_city_state {
  __typename: "State";
  id: string;
  name: string;
  code: string;
}

export interface ParcelShortNoFolder_city {
  __typename: "City";
  id: string;
  name: string;
  county: ParcelShortNoFolder_city_county;
  state: ParcelShortNoFolder_city_state;
}

export interface ParcelShortNoFolder {
  __typename: "Parcel";
  id: string;
  number: ParcelShortNoFolder_number;
  address: string | null;
  /**
   * Geometry
   */
  geometry: string | null;
  area: ParcelShortNoFolder_area | null;
  depth: ParcelShortNoFolder_depth | null;
  front: ParcelShortNoFolder_front | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
  extrasLandValue: number | null;
  extrasImprovementValue: number | null;
  extrasPropertyValue: number | null;
  extrasFixturesValue: number | null;
  extrasStories: number | null;
  extrasUnits: number | null;
  extrasRooms: number | null;
  extrasBathrooms: number | null;
  extrasBedrooms: number | null;
  extrasYear: number | null;
  extrasVacant: boolean | null;
  extrasNeighborhood: string | null;
  extrasBorough: string | null;
  extrasMetroDistance: number | null;
  extrasMetroStation: string | null;
  extrasTrainDistance: number | null;
  extrasTrainStation: string | null;
  extrasTrainLocalDistance: number | null;
  extrasTrainLocalStation: string | null;
  extrasNearestTransitDistance: number | null;
  extrasNearestTransitType: string | null;
  extrasNearestTransitStation: string | null;
  extrasLandUse: string[] | null;
  extrasSalesDate: string | null;
  extrasSalesPriorDate: string | null;
  extrasRecordationDate: string | null;
  extrasShapeType: string | null;
  extrasShapeSides: number[] | null;
  extrasFitProjects: string[] | null;
  extrasAnalyzed: boolean | null;
  extrasUnitCapacity: number | null;
  extrasUnitCapacityFar: number | null;
  extrasUnitCapacityDencity: number | null;
  /**
   * Addresses
   */
  city: ParcelShortNoFolder_city;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockShort
// ====================================================

export interface BlockShort {
  __typename: "Block";
  id: string;
  title: string;
  extrasArea: number | null;
  extrasSupervisorDistrict: string | null;
  extrasZoning: string[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockFull
// ====================================================

export interface BlockFull_parcels {
  __typename: "Parcel";
  id: string;
  /**
   * Deprecated
   */
  title: string;
  /**
   * Geometry
   */
  geometry: string | null;
  /**
   * Bunch of unsorted experimental data
   */
  extrasZoning: string[] | null;
}

export interface BlockFull {
  __typename: "Block";
  id: string;
  title: string;
  extrasArea: number | null;
  extrasZoning: string[] | null;
  extrasSupervisorDistrict: string | null;
  geometry: string | null;
  parcels: BlockFull_parcels[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PermitShort
// ====================================================

export interface PermitShort_streetNumbers {
  __typename: "StreetNumber";
  streetId: string;
  streetName: string;
  streetNameSuffix: string | null;
  streetNumber: number;
  streetNumberSuffix: string | null;
}

export interface PermitShort {
  __typename: "Permit";
  id: string;
  createdAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  description: string | null;
  approvalTime: number | null;
  proposedUnits: number | null;
  existingUnits: number | null;
  governmentalUrl: string;
  streetNumbers: PermitShort_streetNumbers[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PermitFull
// ====================================================

export interface PermitFull_streetNumbers {
  __typename: "StreetNumber";
  streetId: string;
  streetName: string;
  streetNameSuffix: string | null;
  streetNumber: number;
  streetNumberSuffix: string | null;
}

export interface PermitFull_events_PermitEventStatus {
  __typename: "PermitEventStatus";
  oldStatus: PermitStatus | null;
  newStatus: PermitStatus | null;
  date: string | null;
}

export interface PermitFull_events_PermitEventFieldChanged {
  __typename: "PermitEventFieldChanged";
  fieldName: string;
  oldValue: string | null;
  newValue: string | null;
  date: string | null;
}

export type PermitFull_events = PermitFull_events_PermitEventStatus | PermitFull_events_PermitEventFieldChanged;

export interface PermitFull_relatedPermits_streetNumbers {
  __typename: "StreetNumber";
  streetId: string;
  streetName: string;
  streetNameSuffix: string | null;
  streetNumber: number;
  streetNumberSuffix: string | null;
}

export interface PermitFull_relatedPermits {
  __typename: "Permit";
  id: string;
  createdAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  description: string | null;
  approvalTime: number | null;
  proposedUnits: number | null;
  existingUnits: number | null;
  governmentalUrl: string;
  streetNumbers: PermitFull_relatedPermits_streetNumbers[];
}

export interface PermitFull {
  __typename: "Permit";
  id: string;
  issuedAt: string | null;
  createdAt: string | null;
  startedAt: string | null;
  expiresAt: string | null;
  expiredAt: string | null;
  completedAt: string | null;
  filedAt: string | null;
  status: PermitStatus | null;
  statusUpdatedAt: string | null;
  type: PermitType | null;
  typeWood: boolean | null;
  existingStories: number | null;
  proposedStories: number | null;
  existingUnits: number | null;
  proposedUnits: number | null;
  existingAffordableUnits: number | null;
  proposedAffordableUnits: number | null;
  proposedUse: string | null;
  description: string | null;
  governmentalUrl: string;
  approvalTime: number | null;
  streetNumbers: PermitFull_streetNumbers[];
  events: PermitFull_events[];
  relatedPermits: PermitFull_relatedPermits[];
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

export enum DealStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  ON_HOLD = "ON_HOLD",
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

export enum OpportunityPriority {
  HIGH = "HIGH",
  LOW = "LOW",
  NORMAL = "NORMAL",
}

export enum OpportunitySort {
  AREA_ASC = "AREA_ASC",
  AREA_DESC = "AREA_DESC",
  CAPACITY_ASC = "CAPACITY_ASC",
  CAPACITY_DESC = "CAPACITY_DESC",
  DATE_ADDED_ASC = "DATE_ADDED_ASC",
  DATE_ADDED_DESC = "DATE_ADDED_DESC",
}

export enum OpportunityState {
  APPROVED = "APPROVED",
  APPROVED_INITIAL = "APPROVED_INITIAL",
  APPROVED_ZONING = "APPROVED_ZONING",
  INCOMING = "INCOMING",
  REJECTED = "REJECTED",
  SNOOZED = "SNOOZED",
}

export enum OrganizationMemberRole {
  MEMBER = "MEMBER",
  OWNER = "OWNER",
}

export enum OwnerType {
  CITY = "CITY",
  EXCLUDED = "EXCLUDED",
  MIXED = "MIXED",
  OTHER = "OTHER",
  PRIVATE = "PRIVATE",
}

export enum ParcelUse {
  PARKING = "PARKING",
  STORAGE = "STORAGE",
}

export enum PermitSorting {
  APPROVAL_TIME_ASC = "APPROVAL_TIME_ASC",
  APPROVAL_TIME_DESC = "APPROVAL_TIME_DESC",
  COMPLETE_TIME = "COMPLETE_TIME",
  CREATE_TIME = "CREATE_TIME",
  ISSUED_TIME = "ISSUED_TIME",
  STATUS_CHANGE_TIME = "STATUS_CHANGE_TIME",
}

export enum PermitStatus {
  APPEAL = "APPEAL",
  APPROVED = "APPROVED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  DISAPPROVED = "DISAPPROVED",
  EXPIRED = "EXPIRED",
  FILED = "FILED",
  FILING = "FILING",
  GRANTED = "GRANTED",
  INCOMPLETE = "INCOMPLETE",
  INSPECTING = "INSPECTING",
  ISSUED = "ISSUED",
  ISSUING = "ISSUING",
  PLANCHECK = "PLANCHECK",
  REINSTATED = "REINSTATED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  UPHELD = "UPHELD",
  WITHDRAWN = "WITHDRAWN",
}

export enum PermitType {
  ADDITIONS_ALTERATIONS_REPARE = "ADDITIONS_ALTERATIONS_REPARE",
  DEMOLITIONS = "DEMOLITIONS",
  GRADE_QUARRY_FILL_EXCAVATE = "GRADE_QUARRY_FILL_EXCAVATE",
  NEW_CONSTRUCTION = "NEW_CONSTRUCTION",
  OTC_ADDITIONS = "OTC_ADDITIONS",
  SIGN_ERRECT = "SIGN_ERRECT",
  WALL_OR_PAINTED_SIGN = "WALL_OR_PAINTED_SIGN",
}

export enum SpecialFolder {
  ALL = "ALL",
  FAVORITES = "FAVORITES",
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

export interface DealInput {
  title?: string | null;
  status?: DealStatus | null;
  statusDescription?: string | null;
  statusDate?: string | null;
  location?: string | null;
  address?: string | null;
  price?: number | null;
  extrasArea?: number | null;
  extrasCompany?: string | null;
  extrasAttorney?: string | null;
  extrasReferee?: string | null;
  extrasLotShape?: string | null;
  extrasLotSize?: string | null;
  extrasTaxBill?: number | null;
  parcelId?: string | null;
}

export interface GeoBox {
  east: number;
  north: number;
  west: number;
  south: number;
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

export interface ParcelMetadataInput {
  description?: string | null;
  currentUse?: ParcelUse | null;
  available?: boolean | null;
  isOkForTower?: boolean | null;
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
