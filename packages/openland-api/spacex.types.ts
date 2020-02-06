/* tslint:disable */
/* eslint-disable */
type Maybe<T> = T | null;
type MaybeInput<T> = T | null | undefined;
type Inline<E, V> =  { __typename: E; } | V

// Enums
export enum NotificationMessages {
    ALL = 'ALL',
    DIRECT = 'DIRECT',
    NONE = 'NONE',
}
export enum MessageReactionType {
    LIKE = 'LIKE',
    THUMB_UP = 'THUMB_UP',
    JOY = 'JOY',
    SCREAM = 'SCREAM',
    CRYING = 'CRYING',
    ANGRY = 'ANGRY',
}
export enum FeedChannelSubscriberRole {
    Creator = 'Creator',
    Editor = 'Editor',
    Subscriber = 'Subscriber',
    None = 'None',
}
export enum SlideCoverAlign {
    Top = 'Top',
    Bottom = 'Bottom',
    Cover = 'Cover',
}
export enum SharedRoomKind {
    INTERNAL = 'INTERNAL',
    PUBLIC = 'PUBLIC',
    GROUP = 'GROUP',
}
export enum OrganizationMemberRole {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
}
export enum RoomMemberRole {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
}
export enum SharedRoomMembershipStatus {
    MEMBER = 'MEMBER',
    REQUESTED = 'REQUESTED',
    LEFT = 'LEFT',
    KICKED = 'KICKED',
    NONE = 'NONE',
}
export enum WalletSubscriptionState {
    STARTED = 'STARTED',
    GRACE_PERIOD = 'GRACE_PERIOD',
    RETRYING = 'RETRYING',
    CANCELED = 'CANCELED',
    EXPIRED = 'EXPIRED',
}
export enum WalletSubscriptionInterval {
    MONTH = 'MONTH',
    WEEK = 'WEEK',
}
export enum CommentSubscriptionType {
    ALL = 'ALL',
    DIRECT = 'DIRECT',
}
export enum MessageButtonStyle {
    DEFAULT = 'DEFAULT',
    LIGHT = 'LIGHT',
}
export enum MessageType {
    MESSAGE = 'MESSAGE',
    POST = 'POST',
}
export enum PostMessageType {
    BLANK = 'BLANK',
    JOB_OPPORTUNITY = 'JOB_OPPORTUNITY',
    OFFICE_HOURS = 'OFFICE_HOURS',
    REQUEST_FOR_STARTUPS = 'REQUEST_FOR_STARTUPS',
}
export enum WalletTransactionStatus {
    PENDING = 'PENDING',
    CANCELING = 'CANCELING',
    CANCELED = 'CANCELED',
    SUCCESS = 'SUCCESS',
}
export enum PaymentStatus {
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    FAILING = 'FAILING',
    ACTION_REQUIRED = 'ACTION_REQUIRED',
    SUCCESS = 'SUCCESS',
}
export enum DialogKind {
    PRIVATE = 'PRIVATE',
    INTERNAL = 'INTERNAL',
    PUBLIC = 'PUBLIC',
    GROUP = 'GROUP',
}
export enum EmailFrequency {
    NEVER = 'NEVER',
    MIN_15 = 'MIN_15',
    HOUR_1 = 'HOUR_1',
    HOUR_24 = 'HOUR_24',
    WEEK_1 = 'WEEK_1',
}
export enum NotificationPreview {
    NAME_TEXT = 'NAME_TEXT',
    NAME = 'NAME',
}
export enum NotificationsDelay {
    NONE = 'NONE',
    MIN_1 = 'MIN_1',
    MIN_15 = 'MIN_15',
}
export enum NotificationComments {
    ALL = 'ALL',
    DIRECT = 'DIRECT',
    NONE = 'NONE',
}
export enum CommentsNotificationDelivery {
    ALL = 'ALL',
    NONE = 'NONE',
}
export enum OauthScope {
    All = 'All',
    Zapier = 'Zapier',
}
export enum PermissionAppType {
    POWERUP = 'POWERUP',
}
export enum PermissionScope {
    GLOBAL = 'GLOBAL',
    CHAT = 'CHAT',
}
export enum SuperAccountState {
    PENDING = 'PENDING',
    ACTIVATED = 'ACTIVATED',
    SUSPENDED = 'SUSPENDED',
    DELETED = 'DELETED',
}
export enum SuperAdminRole {
    SUPER_ADMIN = 'SUPER_ADMIN',
    SOFTWARE_DEVELOPER = 'SOFTWARE_DEVELOPER',
    EDITOR = 'EDITOR',
}
export enum ConferencePeerConnectionState {
    WAIT_OFFER = 'WAIT_OFFER',
    NEED_OFFER = 'NEED_OFFER',
    WAIT_ANSWER = 'WAIT_ANSWER',
    NEED_ANSWER = 'NEED_ANSWER',
    READY = 'READY',
}
export enum MediaStreamState {
    WAIT_OFFER = 'WAIT_OFFER',
    NEED_OFFER = 'NEED_OFFER',
    WAIT_ANSWER = 'WAIT_ANSWER',
    NEED_ANSWER = 'NEED_ANSWER',
    READY = 'READY',
}
export enum GlobalSearchEntryKind {
    ORGANIZATION = 'ORGANIZATION',
    USER = 'USER',
    SHAREDROOM = 'SHAREDROOM',
}
export enum SharedMediaType {
    LINK = 'LINK',
    IMAGE = 'IMAGE',
    DOCUMENT = 'DOCUMENT',
    VIDEO = 'VIDEO',
}
export enum DebugEmailType {
    WELCOME = 'WELCOME',
    ACCOUNT_ACTIVATED = 'ACCOUNT_ACTIVATED',
    ACCOUNT_DEACTIVATED = 'ACCOUNT_DEACTIVATED',
    MEMBER_REMOVED = 'MEMBER_REMOVED',
    MEMBERSHIP_LEVEL_CHANGED = 'MEMBERSHIP_LEVEL_CHANGED',
    INVITE = 'INVITE',
    MEMBER_JOINED = 'MEMBER_JOINED',
    SIGNUP_CODE = 'SIGNUP_CODE',
    SIGIN_CODE = 'SIGIN_CODE',
    UNREAD_MESSAGE = 'UNREAD_MESSAGE',
    UNREAD_MESSAGES = 'UNREAD_MESSAGES',
    PUBLIC_ROOM_INVITE = 'PUBLIC_ROOM_INVITE',
    PRIVATE_ROOM_INVITE = 'PRIVATE_ROOM_INVITE',
    ROOM_INVITE_ACCEPTED = 'ROOM_INVITE_ACCEPTED',
    WEEKLY_DIGEST = 'WEEKLY_DIGEST',
}
export enum SuperNotificationType {
    ON_SIGN_UP = 'ON_SIGN_UP',
    ON_USER_PROFILE_CREATED = 'ON_USER_PROFILE_CREATED',
    ON_ORG_ACTIVATED_BY_ADMIN = 'ON_ORG_ACTIVATED_BY_ADMIN',
    ON_ORG_ACTIVATED_VIA_INVITE = 'ON_ORG_ACTIVATED_VIA_INVITE',
    ON_ORG_SUSPEND = 'ON_ORG_SUSPEND',
}
export enum Platform {
    WEB = 'WEB',
    IOS = 'IOS',
    ANDROID = 'ANDROID',
}
export enum EventPlatform {
    Android = 'Android',
    iOS = 'iOS',
    WEB = 'WEB',
    MobileWeb = 'MobileWeb',
}
export enum MessageSpanType {
    Bold = 'Bold',
    Italic = 'Italic',
    Irony = 'Irony',
    InlineCode = 'InlineCode',
    CodeBlock = 'CodeBlock',
    Insane = 'Insane',
    Loud = 'Loud',
    Rotating = 'Rotating',
    Link = 'Link',
}
export enum PushType {
    WEB_PUSH = 'WEB_PUSH',
    IOS = 'IOS',
    ANDROID = 'ANDROID',
    SAFARI = 'SAFARI',
}
export enum MatchmakingQuestionType {
    Text = 'Text',
    Multiselect = 'Multiselect',
}
export enum TypingType {
    TEXT = 'TEXT',
    PHOTO = 'PHOTO',
    FILE = 'FILE',
    STICKER = 'STICKER',
    VIDEO = 'VIDEO',
}
export enum SlideType {
    Text = 'Text',
}
export enum ModernMessageButtonStyle {
    DEFAULT = 'DEFAULT',
    LIGHT = 'LIGHT',
}
export enum TaskStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    FAILED = 'FAILED',
    COMPLETED = 'COMPLETED',
}

// Input Types
export interface ImageRefInput {
    uuid: string;
    crop?: MaybeInput<ImageCropInput>;
}
export interface ImageCropInput {
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface UpdateGroupInput {
    title?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    description?: MaybeInput<string>;
    longDescription?: MaybeInput<string>;
    socialImageRef?: MaybeInput<ImageRefInput>;
}
export interface GroupConversationInvite {
    userId: string;
    role: string;
}
export interface UpdateConversationSettingsInput {
    mobileNotifications?: MaybeInput<NotificationMessages>;
    mute?: MaybeInput<boolean>;
}
export interface ProfileInput {
    firstName?: MaybeInput<string>;
    lastName?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    phone?: MaybeInput<string>;
    email?: MaybeInput<string>;
    website?: MaybeInput<string>;
    about?: MaybeInput<string>;
    location?: MaybeInput<string>;
    linkedin?: MaybeInput<string>;
    instagram?: MaybeInput<string>;
    twitter?: MaybeInput<string>;
    facebook?: MaybeInput<string>;
    primaryOrganization?: MaybeInput<string>;
}
export interface CreateProfileInput {
    firstName: string;
    lastName?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    phone?: MaybeInput<string>;
    email?: MaybeInput<string>;
    about?: MaybeInput<string>;
    location?: MaybeInput<string>;
    website?: MaybeInput<string>;
    linkedin?: MaybeInput<string>;
    twitter?: MaybeInput<string>;
    facebook?: MaybeInput<string>;
    primaryOrganization?: MaybeInput<string>;
}
export interface UpdateProfileInput {
    firstName?: MaybeInput<string>;
    lastName?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    phone?: MaybeInput<string>;
    email?: MaybeInput<string>;
    website?: MaybeInput<string>;
    about?: MaybeInput<string>;
    location?: MaybeInput<string>;
    linkedin?: MaybeInput<string>;
    instagram?: MaybeInput<string>;
    twitter?: MaybeInput<string>;
    facebook?: MaybeInput<string>;
    primaryOrganization?: MaybeInput<string>;
    alphaRole?: MaybeInput<string>;
    alphaLocations?: MaybeInput<(string)[]>;
    alphaLinkedin?: MaybeInput<string>;
    alphaTwitter?: MaybeInput<string>;
    alphaPrimaryOrganizationId?: MaybeInput<string>;
}
export interface CreateOrganizationInput {
    id?: MaybeInput<string>;
    name: string;
    website?: MaybeInput<string>;
    personal: boolean;
    photoRef?: MaybeInput<ImageRefInput>;
    about?: MaybeInput<string>;
    isCommunity?: MaybeInput<boolean>;
    isPrivate?: MaybeInput<boolean>;
}
export interface StickerInput {
    image: ImageRefInput;
    emoji: string;
}
export interface UpdateSettingsInput {
    emailFrequency?: MaybeInput<EmailFrequency>;
    desktop?: MaybeInput<PlatformNotificationSettingsInput>;
    mobile?: MaybeInput<PlatformNotificationSettingsInput>;
    countUnreadChats?: MaybeInput<boolean>;
    excludeMutedChats?: MaybeInput<boolean>;
    notificationsDelay?: MaybeInput<NotificationsDelay>;
    desktopNotifications?: MaybeInput<NotificationMessages>;
    mobileNotifications?: MaybeInput<NotificationMessages>;
    commentNotifications?: MaybeInput<NotificationComments>;
    commentNotificationsDelivery?: MaybeInput<CommentsNotificationDelivery>;
    mobileAlert?: MaybeInput<boolean>;
    mobileIncludeText?: MaybeInput<boolean>;
    mute?: MaybeInput<boolean>;
}
export interface PlatformNotificationSettingsInput {
    direct?: MaybeInput<ChatTypeNotificationSettingsInput>;
    secretChat?: MaybeInput<ChatTypeNotificationSettingsInput>;
    organizationChat?: MaybeInput<ChatTypeNotificationSettingsInput>;
    communityChat?: MaybeInput<ChatTypeNotificationSettingsInput>;
    comments?: MaybeInput<ChatTypeNotificationSettingsInput>;
    notificationPreview?: MaybeInput<NotificationPreview>;
}
export interface ChatTypeNotificationSettingsInput {
    showNotification: boolean;
    sound: boolean;
}
export interface OauthAppInput {
    title?: MaybeInput<string>;
    scopes?: MaybeInput<(OauthScope)[]>;
    redirectUrls?: MaybeInput<(string)[]>;
    image?: MaybeInput<ImageRefInput>;
}
export interface InviteRequest {
    email: string;
    emailText?: MaybeInput<string>;
    role: OrganizationMemberRole;
    firstName?: MaybeInput<string>;
    lastName?: MaybeInput<string>;
}
export interface Event {
    id: string;
    event: string;
    params?: MaybeInput<string>;
    time?: MaybeInput<string>;
    os?: MaybeInput<string>;
    deviceModel?: MaybeInput<string>;
    platform?: MaybeInput<EventPlatform>;
}
export interface PowerupInput {
    name?: MaybeInput<string>;
    description?: MaybeInput<string>;
    image?: MaybeInput<ImageRefInput>;
}
export interface PowerupUserSettingsInput {
    enabled: boolean;
}
export interface AppProfileInput {
    name?: MaybeInput<string>;
    shortname?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    about?: MaybeInput<string>;
}
export interface AppStorageValueInput {
    key: string;
    value?: MaybeInput<string>;
}
export interface MentionInput {
    chatId?: MaybeInput<string>;
    userId?: MaybeInput<string>;
    userIds?: MaybeInput<(string)[]>;
    orgId?: MaybeInput<string>;
    all?: MaybeInput<boolean>;
    offset: number;
    length: number;
}
export interface FileAttachmentInput {
    fileId: string;
}
export interface MessageSpanInput {
    offset: number;
    length: number;
    type: MessageSpanType;
    url?: MaybeInput<string>;
}
export interface GeoLocationInput {
    long: number;
    lat: number;
}
export interface StickerPackInput {
    title?: MaybeInput<string>;
    published?: MaybeInput<boolean>;
}
export interface UpdateOrganizationProfileInput {
    name?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    website?: MaybeInput<string>;
    websiteTitle?: MaybeInput<string>;
    about?: MaybeInput<string>;
    twitter?: MaybeInput<string>;
    facebook?: MaybeInput<string>;
    linkedin?: MaybeInput<string>;
    instagram?: MaybeInput<string>;
    location?: MaybeInput<string>;
    contacts?: MaybeInput<(ContactPersonInput)[]>;
    alphaPublished?: MaybeInput<boolean>;
    alphaEditorial?: MaybeInput<boolean>;
    alphaFeatured?: MaybeInput<boolean>;
    alphaIsPrivate?: MaybeInput<boolean>;
}
export interface ContactPersonInput {
    name: string;
    photoRef?: MaybeInput<ImageRefInput>;
    position?: MaybeInput<string>;
    email?: MaybeInput<string>;
    phone?: MaybeInput<string>;
    link?: MaybeInput<string>;
    twitter?: MaybeInput<string>;
}
export interface MatchmakingRoomInput {
    enabled?: MaybeInput<boolean>;
    questions?: MaybeInput<(MatchmakingQuestionInput)[]>;
}
export interface MatchmakingQuestionInput {
    id?: MaybeInput<string>;
    type: MatchmakingQuestionType;
    title: string;
    subtitle?: MaybeInput<string>;
    tags?: MaybeInput<(string)[]>;
}
export interface MatchmakingProfileFillInput {
    answers: (MatchmakingAnswerInput)[];
}
export interface MatchmakingAnswerInput {
    questionId: string;
    text?: MaybeInput<string>;
    tags?: MaybeInput<(string)[]>;
}
export interface SlideInput {
    type: SlideType;
    text?: MaybeInput<string>;
    spans?: MaybeInput<(MessageSpanInput)[]>;
    mentions?: MaybeInput<(MentionInput)[]>;
    cover?: MaybeInput<ImageRefInput>;
    coverAlign?: MaybeInput<SlideCoverAlign>;
    attachments?: MaybeInput<(string)[]>;
}
export interface RoomUpdateInput {
    title?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    description?: MaybeInput<string>;
    socialImageRef?: MaybeInput<ImageRefInput>;
    kind?: MaybeInput<SharedRoomKind>;
}
export interface RoomInviteInput {
    userId: string;
    role: RoomMemberRole;
}
export interface RoomInviteEmailRequest {
    email: string;
    emailText?: MaybeInput<string>;
    firstName?: MaybeInput<string>;
    lastName?: MaybeInput<string>;
}
export interface RoomUserNotificaionSettingsInput {
    mute?: MaybeInput<boolean>;
}
export interface MessageButtonInput {
    title: string;
    style: MessageButtonStyle;
    id: string;
}
export interface MessageKeyboardInput {
    buttons: (MaybeInput<(ModernMessageButtonInput)[]>)[];
}
export interface ModernMessageButtonInput {
    id: string;
    title: string;
    style: ModernMessageButtonStyle;
}
export interface RangeInput {
    from?: MaybeInput<number>;
    to?: MaybeInput<number>;
}

// Fragments
export type AppChat = (
    & { __typename: 'AppChat' }
    & { chat: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'SharedRoom',(
            & { __typename: 'PrivateRoom' }
            & { id: string}
        )>
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
        )>
    )}
    & { webhook: string}
);
export type AppFull = (
    & { __typename: 'AppProfile' }
    & { about: Maybe<string>}
    & { id: string}
    & { name: string}
    & { photoRef: Maybe<(
        & { __typename: 'ImageRef' }
        & { crop: Maybe<(
            & { __typename: 'ImageCrop' }
            & { h: number}
            & { w: number}
            & { x: number}
            & { y: number}
        )>}
        & { uuid: string}
    )>}
    & { shortname: Maybe<string>}
    & { token: (
        & { __typename: 'AppToken' }
        & { salt: string}
    )}
);
export type OrganizationShort = (
    & { __typename: 'Organization' }
    & { about: Maybe<string>}
    & { isCommunity: boolean}
    & { id: string}
    & { membersCount: number}
    & { name: string}
    & { photo: Maybe<string>}
    & { shortname: Maybe<string>}
);
export type UserShort = (
    & { __typename: 'User' }
    & { email: Maybe<string>}
    & { firstName: string}
    & { id: string}
    & { isBot: boolean}
    & { isYou: boolean}
    & { lastName: Maybe<string>}
    & { lastSeen: Maybe<string>}
    & { name: string}
    & { online: boolean}
    & { photo: Maybe<string>}
    & { primaryOrganization: Maybe<(
        & { __typename: 'Organization' }
        & OrganizationShort
    )>}
    & { shortname: Maybe<string>}
);
export type UserBadge = (
    & { __typename: 'UserBadge' }
    & { id: string}
    & { name: string}
    & { verified: boolean}
);
export type UserForMention = (
    & { __typename: 'User' }
    & { id: string}
    & { isBot: boolean}
    & { isYou: boolean}
    & { name: string}
    & { photo: Maybe<string>}
    & { primaryOrganization: Maybe<(
        & { __typename: 'Organization' }
        & { id: string}
        & { name: string}
    )>}
    & { shortname: Maybe<string>}
);
export type RoomSharedNano = (
    & { __typename: 'SharedRoom' }
    & { id: string}
    & { isChannel: boolean}
    & { kind: SharedRoomKind}
    & { membersCount: number}
    & { roomPhoto: string}
    & { settings: (
        & { __typename: 'RoomUserNotificaionSettings' }
        & { id: string}
        & { mute: Maybe<boolean>}
    )}
    & { title: string}
);
export type RoomNano = (
    & { __typename: 'PrivateRoom' | 'SharedRoom' }
    & Inline<'SharedRoom',(
        & { __typename: 'PrivateRoom' }
        & { id: string}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { user: (
            & { __typename: 'User' }
            & { id: string}
            & { name: string}
            & { photo: Maybe<string>}
        )}
    )>
    & Inline<'PrivateRoom',(
        & { __typename: 'SharedRoom' }
        & RoomSharedNano
    )>
);
export type SpanFragment = (
    & { __typename: 'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention' }
    & { length: number}
    & { offset: number}
    & Inline<'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating',(
        & { __typename: 'MessageSpanUserMention' }
        & { user: (
            & { __typename: 'User' }
            & UserForMention
        )}
    )>
    & Inline<'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention',(
        & { __typename: 'MessageSpanMultiUserMention' }
        & { users: ((
            & { __typename: 'User' }
            & UserForMention
        ))[]}
    )>
    & Inline<'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention',(
        & { __typename: 'MessageSpanOrganizationMention' }
        & { organization: (
            & { __typename: 'Organization' }
            & OrganizationShort
        )}
    )>
    & Inline<'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRotating' | 'MessageSpanUserMention',(
        & { __typename: 'MessageSpanRoomMention' }
        & { room: (
            & { __typename: 'PrivateRoom' | 'SharedRoom' }
            & RoomNano
        )}
    )>
    & Inline<'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention',(
        & { __typename: 'MessageSpanLink' }
        & { url: string}
    )>
    & Inline<'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention',(
        & { __typename: 'MessageSpanDate' }
        & { date: string}
    )>
);
export type QuotedMessage = (
    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
    & { date: string}
    & { fallback: string}
    & { id: string}
    & { message: Maybe<string>}
    & { sender: (
        & { __typename: 'User' }
        & UserShort
    )}
    & { senderBadge: Maybe<(
        & { __typename: 'UserBadge' }
        & UserBadge
    )>}
    & { source: Maybe<(
        & { __typename: 'MessageSourceChat' | 'MessageSourceComment' }
        & Inline<'MessageSourceComment',(
            & { __typename: 'MessageSourceChat' }
            & { chat: (
                & { __typename: 'PrivateRoom' | 'SharedRoom' }
                & Inline<'SharedRoom',(
                    & { __typename: 'PrivateRoom' }
                    & { id: string}
                )>
                & Inline<'PrivateRoom',(
                    & { __typename: 'SharedRoom' }
                    & { id: string}
                )>
            )}
        )>
    )>}
    & { spans: ((
        & { __typename: 'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention' }
        & SpanFragment
    ))[]}
    & Inline<'ServiceMessage' | 'StickerMessage',(
        & { __typename: 'GeneralMessage' }
        & { attachments: ((
            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
            & { fallback: string}
            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                & { __typename: 'MessageAttachmentFile' }
                & { fileId: string}
                & { fileMetadata: (
                    & { __typename: 'FileMetadata' }
                    & { imageFormat: Maybe<string>}
                    & { imageHeight: Maybe<number>}
                    & { imageWidth: Maybe<number>}
                    & { isImage: boolean}
                    & { mimeType: Maybe<string>}
                    & { name: string}
                    & { size: number}
                )}
                & { filePreview: Maybe<string>}
                & { id: string}
            )>
            & Inline<'MessageAttachmentFile' | 'MessageAttachmentPost',(
                & { __typename: 'MessageRichAttachment' }
                & { fallback: string}
                & { icon: Maybe<(
                    & { __typename: 'Image' }
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { imageFormat: Maybe<string>}
                        & { imageHeight: Maybe<number>}
                        & { imageWidth: Maybe<number>}
                        & { isImage: boolean}
                        & { mimeType: Maybe<string>}
                        & { name: string}
                        & { size: number}
                    )>}
                    & { url: string}
                )>}
                & { id: string}
                & { image: Maybe<(
                    & { __typename: 'Image' }
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { imageFormat: Maybe<string>}
                        & { imageHeight: Maybe<number>}
                        & { imageWidth: Maybe<number>}
                        & { isImage: boolean}
                        & { mimeType: Maybe<string>}
                        & { name: string}
                        & { size: number}
                    )>}
                    & { url: string}
                )>}
                & { imageFallback: Maybe<(
                    & { __typename: 'ImageFallback' }
                    & { photo: string}
                    & { text: string}
                )>}
                & { keyboard: Maybe<(
                    & { __typename: 'MessageKeyboard' }
                    & { buttons: (Maybe<((
                        & { __typename: 'ModernMessageButton' }
                        & { id: string}
                        & { style: ModernMessageButtonStyle}
                        & { title: string}
                        & { url: Maybe<string>}
                    ))[]>)[]}
                )>}
                & { subTitle: Maybe<string>}
                & { text: Maybe<string>}
                & { title: Maybe<string>}
                & { titleLink: Maybe<string>}
                & { titleLinkHostname: Maybe<string>}
            )>
        ))[]}
        & { commentsCount: number}
        & { edited: boolean}
        & { id: string}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { overrideName: Maybe<string>}
    )>
    & Inline<'GeneralMessage' | 'ServiceMessage',(
        & { __typename: 'StickerMessage' }
        & { date: string}
        & { id: string}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { overrideName: Maybe<string>}
        & { reactions: ((
            & { __typename: 'ModernMessageReaction' }
            & { reaction: MessageReactionType}
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]}
        & { sender: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { senderBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { source: Maybe<(
            & { __typename: 'MessageSourceChat' | 'MessageSourceComment' }
            & Inline<'MessageSourceComment',(
                & { __typename: 'MessageSourceChat' }
                & { chat: (
                    & { __typename: 'PrivateRoom' | 'SharedRoom' }
                    & Inline<'SharedRoom',(
                        & { __typename: 'PrivateRoom' }
                        & { id: string}
                    )>
                    & Inline<'PrivateRoom',(
                        & { __typename: 'SharedRoom' }
                        & { id: string}
                    )>
                )}
            )>
        )>}
        & { sticker: (
            & { __typename: 'ImageSticker' }
            & Inline<never,(
                & { __typename: 'ImageSticker' }
                & { id: string}
                & { image: (
                    & { __typename: 'ImageRef' }
                    & Inline<never,(
                        & { __typename: 'ImageRef' }
                        & { uuid: string}
                    )>
                )}
                & { pack: (
                    & { __typename: 'StickerPack' }
                    & Inline<never,(
                        & { __typename: 'StickerPack' }
                        & { id: string}
                        & { title: string}
                    )>
                )}
            )>
        )}
    )>
);
export type StickerFragment = (
    & { __typename: 'ImageSticker' }
    & Inline<never,(
        & { __typename: 'ImageSticker' }
        & { id: string}
        & { image: (
            & { __typename: 'ImageRef' }
            & { uuid: string}
        )}
        & { pack: (
            & { __typename: 'StickerPack' }
            & { id: string}
            & { title: string}
        )}
    )>
);
export type UserTiny = (
    & { __typename: 'User' }
    & { firstName: string}
    & { id: string}
    & { isYou: boolean}
    & { lastName: Maybe<string>}
    & { name: string}
    & { photo: Maybe<string>}
    & { primaryOrganization: Maybe<(
        & { __typename: 'Organization' }
        & OrganizationShort
    )>}
    & { shortname: Maybe<string>}
);
export type FullMessage = (
    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
    & { date: string}
    & { fallback: string}
    & { id: string}
    & { message: Maybe<string>}
    & { sender: (
        & { __typename: 'User' }
        & UserShort
    )}
    & { senderBadge: Maybe<(
        & { __typename: 'UserBadge' }
        & UserBadge
    )>}
    & { source: Maybe<(
        & { __typename: 'MessageSourceChat' | 'MessageSourceComment' }
        & Inline<'MessageSourceComment',(
            & { __typename: 'MessageSourceChat' }
            & { chat: (
                & { __typename: 'PrivateRoom' | 'SharedRoom' }
                & Inline<'SharedRoom',(
                    & { __typename: 'PrivateRoom' }
                    & { id: string}
                )>
                & Inline<'PrivateRoom',(
                    & { __typename: 'SharedRoom' }
                    & { id: string}
                    & { isChannel: boolean}
                    & { membersCount: number}
                )>
            )}
        )>
    )>}
    & { spans: ((
        & { __typename: 'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention' }
        & SpanFragment
    ))[]}
    & Inline<'ServiceMessage' | 'StickerMessage',(
        & { __typename: 'GeneralMessage' }
        & { attachments: ((
            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
            & { fallback: string}
            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                & { __typename: 'MessageAttachmentFile' }
                & { fileId: string}
                & { fileMetadata: (
                    & { __typename: 'FileMetadata' }
                    & { imageFormat: Maybe<string>}
                    & { imageHeight: Maybe<number>}
                    & { imageWidth: Maybe<number>}
                    & { isImage: boolean}
                    & { mimeType: Maybe<string>}
                    & { name: string}
                    & { size: number}
                )}
                & { filePreview: Maybe<string>}
                & { id: string}
            )>
            & Inline<'MessageAttachmentFile' | 'MessageAttachmentPost',(
                & { __typename: 'MessageRichAttachment' }
                & { fallback: string}
                & { icon: Maybe<(
                    & { __typename: 'Image' }
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { imageFormat: Maybe<string>}
                        & { imageHeight: Maybe<number>}
                        & { imageWidth: Maybe<number>}
                        & { isImage: boolean}
                        & { mimeType: Maybe<string>}
                        & { name: string}
                        & { size: number}
                    )>}
                    & { url: string}
                )>}
                & { id: string}
                & { image: Maybe<(
                    & { __typename: 'Image' }
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { imageFormat: Maybe<string>}
                        & { imageHeight: Maybe<number>}
                        & { imageWidth: Maybe<number>}
                        & { isImage: boolean}
                        & { mimeType: Maybe<string>}
                        & { name: string}
                        & { size: number}
                    )>}
                    & { url: string}
                )>}
                & { imageFallback: Maybe<(
                    & { __typename: 'ImageFallback' }
                    & { photo: string}
                    & { text: string}
                )>}
                & { keyboard: Maybe<(
                    & { __typename: 'MessageKeyboard' }
                    & { buttons: (Maybe<((
                        & { __typename: 'ModernMessageButton' }
                        & { id: string}
                        & { style: ModernMessageButtonStyle}
                        & { title: string}
                        & { url: Maybe<string>}
                    ))[]>)[]}
                )>}
                & { socialImage: Maybe<(
                    & { __typename: 'Image' }
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { imageFormat: Maybe<string>}
                        & { imageHeight: Maybe<number>}
                        & { imageWidth: Maybe<number>}
                        & { isImage: boolean}
                        & { mimeType: Maybe<string>}
                        & { name: string}
                        & { size: number}
                    )>}
                    & { url: string}
                )>}
                & { subTitle: Maybe<string>}
                & { text: Maybe<string>}
                & { title: Maybe<string>}
                & { titleLink: Maybe<string>}
                & { titleLinkHostname: Maybe<string>}
            )>
        ))[]}
        & { commentsCount: number}
        & { edited: boolean}
        & { id: string}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { overrideName: Maybe<string>}
        & { quotedMessages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & QuotedMessage
        ))[]}
        & { reactions: ((
            & { __typename: 'ModernMessageReaction' }
            & { reaction: MessageReactionType}
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]}
    )>
    & Inline<'GeneralMessage' | 'ServiceMessage',(
        & { __typename: 'StickerMessage' }
        & { commentsCount: number}
        & { date: string}
        & { id: string}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { overrideName: Maybe<string>}
        & { quotedMessages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & QuotedMessage
        ))[]}
        & { reactions: ((
            & { __typename: 'ModernMessageReaction' }
            & { reaction: MessageReactionType}
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]}
        & { sender: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { senderBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { sticker: (
            & { __typename: 'ImageSticker' }
            & StickerFragment
        )}
    )>
    & Inline<'GeneralMessage' | 'StickerMessage',(
        & { __typename: 'ServiceMessage' }
        & { id: string}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { overrideName: Maybe<string>}
        & { serviceMetadata: Maybe<(
            & { __typename: 'InviteServiceMetadata' | 'KickServiceMetadata' | 'TitleChangeServiceMetadata' | 'PhotoChangeServiceMetadata' | 'PostRespondServiceMetadata' }
            & Inline<'KickServiceMetadata' | 'TitleChangeServiceMetadata' | 'PhotoChangeServiceMetadata' | 'PostRespondServiceMetadata',(
                & { __typename: 'InviteServiceMetadata' }
                & { invitedBy: (
                    & { __typename: 'User' }
                    & UserTiny
                )}
                & { users: Maybe<((
                    & { __typename: 'User' }
                    & UserTiny
                ))[]>}
            )>
            & Inline<'InviteServiceMetadata' | 'TitleChangeServiceMetadata' | 'PhotoChangeServiceMetadata' | 'PostRespondServiceMetadata',(
                & { __typename: 'KickServiceMetadata' }
                & { kickedBy: (
                    & { __typename: 'User' }
                    & UserTiny
                )}
                & { user: (
                    & { __typename: 'User' }
                    & UserTiny
                )}
            )>
            & Inline<'InviteServiceMetadata' | 'KickServiceMetadata' | 'PhotoChangeServiceMetadata' | 'PostRespondServiceMetadata',(
                & { __typename: 'TitleChangeServiceMetadata' }
                & { title: string}
            )>
            & Inline<'InviteServiceMetadata' | 'KickServiceMetadata' | 'TitleChangeServiceMetadata' | 'PostRespondServiceMetadata',(
                & { __typename: 'PhotoChangeServiceMetadata' }
                & { photo: Maybe<string>}
            )>
            & Inline<'InviteServiceMetadata' | 'KickServiceMetadata' | 'TitleChangeServiceMetadata' | 'PhotoChangeServiceMetadata',(
                & { __typename: 'PostRespondServiceMetadata' }
                & { respondType: string}
            )>
        )>}
    )>
);
export type MatchmakingProfileFragment = (
    & { __typename: 'MatchmakingProfile' }
    & { answers: ((
        & { __typename: 'TextMatchmakingAnswer' | 'MultiselectMatchmakingAnswer' }
        & Inline<'MultiselectMatchmakingAnswer',(
            & { __typename: 'TextMatchmakingAnswer' }
            & { answer: string}
            & { question: (
                & { __typename: 'TextMatchmakingQuestion' }
                & { id: string}
                & { subtitle: string}
                & { title: string}
            )}
        )>
        & Inline<'TextMatchmakingAnswer',(
            & { __typename: 'MultiselectMatchmakingAnswer' }
            & { question: (
                & { __typename: 'MultiselectMatchmakingQuestion' }
                & { id: string}
                & { subtitle: string}
                & { title: string}
            )}
            & { tags: (string)[]}
        )>
    ))[]}
    & { chatCreated: boolean}
    & { user: (
        & { __typename: 'User' }
        & { id: string}
        & { isBot: boolean}
        & { isYou: boolean}
        & { name: string}
        & { photo: Maybe<string>}
        & { primaryOrganization: Maybe<(
            & { __typename: 'Organization' }
            & { id: string}
            & { name: string}
        )>}
    )}
);
export type MatchmakingRoomFragment = (
    & { __typename: 'MatchmakingRoom' }
    & { enabled: boolean}
    & { myProfile: Maybe<(
        & { __typename: 'MatchmakingProfile' }
        & MatchmakingProfileFragment
    )>}
    & { profiles: Maybe<((
        & { __typename: 'MatchmakingProfile' }
        & MatchmakingProfileFragment
    ))[]>}
    & { questions: Maybe<((
        & { __typename: 'TextMatchmakingQuestion' | 'MultiselectMatchmakingQuestion' }
        & Inline<'MultiselectMatchmakingQuestion',(
            & { __typename: 'TextMatchmakingQuestion' }
            & { id: string}
            & { subtitle: string}
            & { title: string}
        )>
        & Inline<'TextMatchmakingQuestion',(
            & { __typename: 'MultiselectMatchmakingQuestion' }
            & { id: string}
            & { subtitle: string}
            & { tags: (string)[]}
            & { title: string}
        )>
    ))[]>}
);
export type RoomShort = (
    & { __typename: 'PrivateRoom' | 'SharedRoom' }
    & Inline<'SharedRoom',(
        & { __typename: 'PrivateRoom' }
        & { id: string}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    )>
    & Inline<'PrivateRoom',(
        & { __typename: 'SharedRoom' }
        & { canEdit: boolean}
        & { canSendMessage: boolean}
        & { id: string}
        & { isChannel: boolean}
        & { kind: SharedRoomKind}
        & { matchmaking: Maybe<(
            & { __typename: 'MatchmakingRoom' }
            & MatchmakingRoomFragment
        )>}
        & { membersCount: number}
        & { membership: SharedRoomMembershipStatus}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { onlineMembersCount: number}
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & OrganizationShort
        )>}
        & { photo: string}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { previewMembers: ((
            & { __typename: 'User' }
            & { id: string}
            & { photo: Maybe<string>}
        ))[]}
        & { role: RoomMemberRole}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { title: string}
    )>
);
export type ChatUpdateFragment = (
    & { __typename: 'ChatUpdated' | 'ChatMessageReceived' | 'ChatMessageUpdated' | 'ChatMessageDeleted' | 'ChatLostAccess' }
    & Inline<'ChatUpdated' | 'ChatMessageUpdated' | 'ChatMessageDeleted' | 'ChatLostAccess',(
        & { __typename: 'ChatMessageReceived' }
        & { message: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )}
        & { repeatKey: Maybe<string>}
    )>
    & Inline<'ChatUpdated' | 'ChatMessageReceived' | 'ChatMessageDeleted' | 'ChatLostAccess',(
        & { __typename: 'ChatMessageUpdated' }
        & { message: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )}
    )>
    & Inline<'ChatUpdated' | 'ChatMessageReceived' | 'ChatMessageUpdated' | 'ChatLostAccess',(
        & { __typename: 'ChatMessageDeleted' }
        & { message: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & { id: string}
        )}
    )>
    & Inline<'ChatMessageReceived' | 'ChatMessageUpdated' | 'ChatMessageDeleted' | 'ChatLostAccess',(
        & { __typename: 'ChatUpdated' }
        & { chat: (
            & { __typename: 'PrivateRoom' | 'SharedRoom' }
            & RoomShort
        )}
    )>
    & Inline<'ChatUpdated' | 'ChatMessageReceived' | 'ChatMessageUpdated' | 'ChatMessageDeleted',(
        & { __typename: 'ChatLostAccess' }
        & { lostAccess: boolean}
    )>
);
export type CommentEntryFragment = (
    & { __typename: 'CommentEntry' }
    & { comment: (
        & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
        & { id: string}
        & FullMessage
    )}
    & { childComments: ((
        & { __typename: 'CommentEntry' }
        & { id: string}
    ))[]}
    & { deleted: boolean}
    & { id: string}
    & { parentComment: Maybe<(
        & { __typename: 'CommentEntry' }
        & { comment: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & { id: string}
            & { message: Maybe<string>}
        )}
        & { id: string}
    )>}
);
export type CommentUpdateFragment = (
    & { __typename: 'CommentReceived' | 'CommentUpdated' }
    & Inline<'CommentUpdated',(
        & { __typename: 'CommentReceived' }
        & { comment: (
            & { __typename: 'CommentEntry' }
            & CommentEntryFragment
        )}
    )>
    & Inline<'CommentReceived',(
        & { __typename: 'CommentUpdated' }
        & { comment: (
            & { __typename: 'CommentEntry' }
            & CommentEntryFragment
        )}
    )>
);
export type CommunitySearch = (
    & { __typename: 'Organization' }
    & { about: Maybe<string>}
    & { featured: boolean}
    & { roomsCount: number}
    & { id: string}
    & { isMine: boolean}
    & { membersCount: number}
    & { name: string}
    & { photo: Maybe<string>}
    & { status: string}
    & { superAccountId: string}
);
export type ConferenceFull = (
    & { __typename: 'Conference' }
    & { iceServers: ((
        & { __typename: 'ICEServer' }
        & { credential: Maybe<string>}
        & { urls: (string)[]}
        & { username: Maybe<string>}
    ))[]}
    & { id: string}
    & { peers: ((
        & { __typename: 'ConferencePeer' }
        & { connection: Maybe<(
            & { __typename: 'ConferencePeerConnection' }
            & { ice: (string)[]}
            & { sdp: Maybe<string>}
            & { state: ConferencePeerConnectionState}
        )>}
        & { id: string}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    ))[]}
    & { startTime: Maybe<string>}
);
export type ConferenceShort = (
    & { __typename: 'Conference' }
    & { iceServers: ((
        & { __typename: 'ICEServer' }
        & { credential: Maybe<string>}
        & { urls: (string)[]}
        & { username: Maybe<string>}
    ))[]}
    & { id: string}
    & { startTime: Maybe<string>}
);
export type DaialogListMessage = (
    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
    & { date: string}
    & { fallback: string}
    & { id: string}
    & { message: Maybe<string>}
    & { sender: (
        & { __typename: 'User' }
        & { firstName: string}
        & { id: string}
        & { name: string}
    )}
    & { senderBadge: Maybe<(
        & { __typename: 'UserBadge' }
        & UserBadge
    )>}
    & Inline<'ServiceMessage' | 'StickerMessage',(
        & { __typename: 'GeneralMessage' }
        & { attachments: ((
            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
            & { fallback: string}
            & { id: string}
            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                & { __typename: 'MessageAttachmentFile' }
                & { fileId: string}
                & { fileMetadata: (
                    & { __typename: 'FileMetadata' }
                    & { imageFormat: Maybe<string>}
                    & { isImage: boolean}
                )}
                & { id: string}
            )>
        ))[]}
        & { id: string}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { overrideName: Maybe<string>}
        & { quotedMessages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & { id: string}
        ))[]}
    )>
);
export type TinyMessage = (
    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
    & { date: string}
    & { fallback: string}
    & { id: string}
    & { message: Maybe<string>}
    & { sender: (
        & { __typename: 'User' }
        & UserTiny
    )}
    & { senderBadge: Maybe<(
        & { __typename: 'UserBadge' }
        & UserBadge
    )>}
    & Inline<'ServiceMessage' | 'StickerMessage',(
        & { __typename: 'GeneralMessage' }
        & { attachments: ((
            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
            & { fallback: string}
            & { id: string}
            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                & { __typename: 'MessageAttachmentFile' }
                & { fileId: string}
                & { fileMetadata: (
                    & { __typename: 'FileMetadata' }
                    & { imageFormat: Maybe<string>}
                    & { isImage: boolean}
                )}
                & { filePreview: Maybe<string>}
                & { id: string}
            )>
        ))[]}
        & { commentsCount: number}
        & { id: string}
        & { isMentioned: boolean}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { overrideName: Maybe<string>}
        & { quotedMessages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & { id: string}
        ))[]}
    )>
);
export type DialogUpdateFragment = (
    & { __typename: 'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated' }
    & Inline<'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated',(
        & { __typename: 'DialogMessageReceived' }
        & { message: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )}
        & { cid: string}
        & { globalUnread: number}
        & { haveMention: boolean}
        & { showNotification: (
            & { __typename: 'SilentMessageInfo' }
            & { desktop: boolean}
            & { mobile: boolean}
        )}
        & { silent: (
            & { __typename: 'SilentMessageInfo' }
            & { desktop: boolean}
            & { mobile: boolean}
        )}
        & { unread: number}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated',(
        & { __typename: 'DialogMessageUpdated' }
        & { message: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )}
        & { cid: string}
        & { haveMention: boolean}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated',(
        & { __typename: 'DialogMessageDeleted' }
        & { message: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )}
        & { prevMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )>}
        & { cid: string}
        & { globalUnread: number}
        & { haveMention: boolean}
        & { unread: number}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated',(
        & { __typename: 'DialogMessageRead' }
        & { cid: string}
        & { globalUnread: number}
        & { haveMention: boolean}
        & { mid: Maybe<string>}
        & { unread: number}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated',(
        & { __typename: 'DialogMuteChanged' }
        & { cid: string}
        & { mute: boolean}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump',(
        & { __typename: 'DialogPeerUpdated' }
        & { cid: string}
        & { peer: (
            & { __typename: 'PrivateRoom' | 'SharedRoom' }
            & Inline<'SharedRoom',(
                & { __typename: 'PrivateRoom' }
                & { id: string}
                & { user: (
                    & { __typename: 'User' }
                    & { id: string}
                    & { name: string}
                    & { photo: Maybe<string>}
                )}
            )>
            & Inline<'PrivateRoom',(
                & { __typename: 'SharedRoom' }
                & { id: string}
                & { photo: string}
                & { title: string}
            )>
        )}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated',(
        & { __typename: 'DialogDeleted' }
        & { cid: string}
        & { globalUnread: number}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogPeerUpdated',(
        & { __typename: 'DialogBump' }
        & { cid: string}
        & { globalUnread: number}
        & { haveMention: boolean}
        & { topMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )>}
        & { unread: number}
    )>
);
export type FeedChannelFull = (
    & { __typename: 'FeedChannel' }
    & { about: Maybe<string>}
    & { id: string}
    & { isGlobal: boolean}
    & { myRole: FeedChannelSubscriberRole}
    & { photo: Maybe<string>}
    & { postsCount: number}
    & { shortname: Maybe<string>}
    & { socialImage: Maybe<string>}
    & { subscribed: boolean}
    & { subscribersCount: number}
    & { title: string}
);
export type FeedPostAuthorFragment = (
    & { __typename: 'User' }
    & Inline<never,(
        & { __typename: 'User' }
        & UserShort
    )>
);
export type SlideFragment = (
    & { __typename: 'TextSlide' }
    & Inline<never,(
        & { __typename: 'TextSlide' }
        & { attachments: ((
            & { __typename: 'User' | 'SharedRoom' | 'Organization' }
            & Inline<'SharedRoom' | 'Organization',(
                & { __typename: 'User' }
                & UserShort
            )>
            & Inline<'User' | 'Organization',(
                & { __typename: 'SharedRoom' }
                & { canSendMessage: boolean}
                & { id: string}
                & { kind: SharedRoomKind}
                & { membersCount: number}
                & { membership: SharedRoomMembershipStatus}
                & { organization: Maybe<(
                    & { __typename: 'Organization' }
                    & { id: string}
                    & { name: string}
                    & { photo: Maybe<string>}
                )>}
                & { roomPhoto: string}
                & { title: string}
            )>
            & Inline<'User' | 'SharedRoom',(
                & { __typename: 'Organization' }
                & OrganizationShort
            )>
        ))[]}
        & { cover: Maybe<(
            & { __typename: 'Image' }
            & { metadata: Maybe<(
                & { __typename: 'FileMetadata' }
                & { imageFormat: Maybe<string>}
                & { imageHeight: Maybe<number>}
                & { imageWidth: Maybe<number>}
                & { isImage: boolean}
                & { mimeType: Maybe<string>}
                & { name: string}
                & { size: number}
            )>}
            & { url: string}
        )>}
        & { coverAlign: Maybe<SlideCoverAlign>}
        & { id: string}
        & { spans: ((
            & { __typename: 'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention' }
            & SpanFragment
        ))[]}
        & { text: string}
    )>
);
export type FeedPostSourceFragment = (
    & { __typename: 'FeedChannel' }
    & Inline<never,(
        & { __typename: 'FeedChannel' }
        & FeedChannelFull
    )>
);
export type FeedItemFull = (
    & { __typename: 'FeedPost' }
    & Inline<never,(
        & { __typename: 'FeedPost' }
        & { author: (
            & { __typename: 'User' }
            & FeedPostAuthorFragment
        )}
        & { canEdit: boolean}
        & { commentsCount: number}
        & { date: string}
        & { edited: boolean}
        & { fallback: string}
        & { id: string}
        & { message: Maybe<string>}
        & { reactions: ((
            & { __typename: 'ModernMessageReaction' }
            & { reaction: MessageReactionType}
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]}
        & { slides: ((
            & { __typename: 'TextSlide' }
            & SlideFragment
        ))[]}
        & { source: Maybe<(
            & { __typename: 'FeedChannel' }
            & FeedPostSourceFragment
        )>}
    )>
);
export type FeedUpdateFragment = (
    & { __typename: 'FeedItemReceived' | 'FeedItemUpdated' | 'FeedItemDeleted' | 'FeedRebuildNeeded' }
    & Inline<'FeedItemUpdated' | 'FeedItemDeleted' | 'FeedRebuildNeeded',(
        & { __typename: 'FeedItemReceived' }
        & { item: (
            & { __typename: 'FeedPost' }
            & FeedItemFull
        )}
    )>
    & Inline<'FeedItemReceived' | 'FeedItemDeleted' | 'FeedRebuildNeeded',(
        & { __typename: 'FeedItemUpdated' }
        & { item: (
            & { __typename: 'FeedPost' }
            & FeedItemFull
        )}
    )>
    & Inline<'FeedItemReceived' | 'FeedItemUpdated' | 'FeedRebuildNeeded',(
        & { __typename: 'FeedItemDeleted' }
        & { item: (
            & { __typename: 'FeedPost' }
            & FeedItemFull
        )}
    )>
    & Inline<'FeedItemReceived' | 'FeedItemUpdated' | 'FeedItemDeleted',(
        & { __typename: 'FeedRebuildNeeded' }
        & { feed: (
            & { __typename: 'FeedItemConnection' }
            & { cursor: Maybe<string>}
            & { items: ((
                & { __typename: 'FeedPost' }
                & FeedItemFull
            ))[]}
        )}
    )>
);
export type NotificationFragment = (
    & { __typename: 'Notification' }
    & { content: ((
        & { __typename: 'NewCommentNotification' | 'NewMatchmakingProfilesNotification' | 'MentionNotification' }
        & Inline<'NewMatchmakingProfilesNotification' | 'MentionNotification',(
            & { __typename: 'NewCommentNotification' }
            & { comment: (
                & { __typename: 'CommentEntry' }
                & CommentEntryFragment
            )}
            & { peer: (
                & { __typename: 'CommentsPeer' }
                & { id: string}
                & { peerRoot: (
                    & { __typename: 'CommentPeerRootMessage' | 'CommentPeerRootFeedItem' }
                    & Inline<'CommentPeerRootFeedItem',(
                        & { __typename: 'CommentPeerRootMessage' }
                        & { chat: (
                            & { __typename: 'PrivateRoom' | 'SharedRoom' }
                            & RoomNano
                        )}
                        & { message: (
                            & { __typename: 'GeneralMessage' }
                            & Inline<never,(
                                & { __typename: 'GeneralMessage' }
                                & { fallback: string}
                                & { id: string}
                                & { message: Maybe<string>}
                                & { sender: (
                                    & { __typename: 'User' }
                                    & { id: string}
                                    & { name: string}
                                )}
                                & { senderBadge: Maybe<(
                                    & { __typename: 'UserBadge' }
                                    & UserBadge
                                )>}
                            )>
                        )}
                    )>
                    & Inline<'CommentPeerRootMessage',(
                        & { __typename: 'CommentPeerRootFeedItem' }
                        & { item: (
                            & { __typename: 'FeedPost' }
                            & FeedItemFull
                        )}
                    )>
                )}
                & { subscription: Maybe<(
                    & { __typename: 'CommentSubscription' }
                    & { type: Maybe<CommentSubscriptionType>}
                )>}
            )}
        )>
        & Inline<'NewCommentNotification' | 'MentionNotification',(
            & { __typename: 'NewMatchmakingProfilesNotification' }
            & { profiles: ((
                & { __typename: 'MatchmakingProfile' }
                & MatchmakingProfileFragment
            ))[]}
            & { room: (
                & { __typename: 'MatchmakingRoom' }
                & { peer: (
                    & { __typename: 'SharedRoom' }
                    & Inline<never,(
                        & { __typename: 'SharedRoom' }
                        & RoomNano
                    )>
                )}
            )}
        )>
    ))[]}
    & { id: string}
    & { text: Maybe<string>}
);
export type NotificationCenterUpdateFragment = (
    & { __typename: 'NotificationReceived' | 'NotificationRead' | 'NotificationDeleted' | 'NotificationUpdated' | 'NotificationContentUpdated' }
    & Inline<'NotificationRead' | 'NotificationDeleted' | 'NotificationUpdated' | 'NotificationContentUpdated',(
        & { __typename: 'NotificationReceived' }
        & { center: (
            & { __typename: 'NotificationCenter' }
            & { id: string}
            & { unread: number}
        )}
        & { notification: (
            & { __typename: 'Notification' }
            & NotificationFragment
        )}
    )>
    & Inline<'NotificationReceived' | 'NotificationRead' | 'NotificationDeleted' | 'NotificationContentUpdated',(
        & { __typename: 'NotificationUpdated' }
        & { center: (
            & { __typename: 'NotificationCenter' }
            & { id: string}
            & { unread: number}
        )}
        & { notification: (
            & { __typename: 'Notification' }
            & NotificationFragment
        )}
    )>
    & Inline<'NotificationReceived' | 'NotificationRead' | 'NotificationUpdated' | 'NotificationContentUpdated',(
        & { __typename: 'NotificationDeleted' }
        & { center: (
            & { __typename: 'NotificationCenter' }
            & { id: string}
            & { unread: number}
        )}
        & { notification: (
            & { __typename: 'Notification' }
            & { id: string}
        )}
    )>
    & Inline<'NotificationReceived' | 'NotificationDeleted' | 'NotificationUpdated' | 'NotificationContentUpdated',(
        & { __typename: 'NotificationRead' }
        & { center: (
            & { __typename: 'NotificationCenter' }
            & { id: string}
            & { unread: number}
        )}
    )>
    & Inline<'NotificationReceived' | 'NotificationRead' | 'NotificationDeleted' | 'NotificationUpdated',(
        & { __typename: 'NotificationContentUpdated' }
        & { content: (
            & { __typename: 'UpdatedNotificationContentComment' }
            & Inline<never,(
                & { __typename: 'UpdatedNotificationContentComment' }
                & { comment: Maybe<(
                    & { __typename: 'CommentEntry' }
                    & CommentEntryFragment
                )>}
                & { peer: (
                    & { __typename: 'CommentsPeer' }
                    & { id: string}
                    & { peerRoot: (
                        & { __typename: 'CommentPeerRootMessage' | 'CommentPeerRootFeedItem' }
                        & Inline<'CommentPeerRootFeedItem',(
                            & { __typename: 'CommentPeerRootMessage' }
                            & { chat: (
                                & { __typename: 'PrivateRoom' | 'SharedRoom' }
                                & RoomNano
                            )}
                            & { message: (
                                & { __typename: 'GeneralMessage' }
                                & Inline<never,(
                                    & { __typename: 'GeneralMessage' }
                                    & { fallback: string}
                                    & { id: string}
                                    & { message: Maybe<string>}
                                    & { sender: (
                                        & { __typename: 'User' }
                                        & { id: string}
                                        & { name: string}
                                    )}
                                    & { senderBadge: Maybe<(
                                        & { __typename: 'UserBadge' }
                                        & UserBadge
                                    )>}
                                )>
                            )}
                        )>
                        & Inline<'CommentPeerRootMessage',(
                            & { __typename: 'CommentPeerRootFeedItem' }
                            & { item: (
                                & { __typename: 'FeedPost' }
                                & FeedItemFull
                            )}
                        )>
                    )}
                    & { subscription: Maybe<(
                        & { __typename: 'CommentSubscription' }
                        & { type: Maybe<CommentSubscriptionType>}
                    )>}
                )}
            )>
        )}
    )>
);
export type UserFull = (
    & { __typename: 'User' }
    & { about: Maybe<string>}
    & { audienceSize: number}
    & { email: Maybe<string>}
    & { facebook: Maybe<string>}
    & { firstName: string}
    & { id: string}
    & { instagram: Maybe<string>}
    & { isBot: boolean}
    & { isYou: boolean}
    & { lastName: Maybe<string>}
    & { lastSeen: Maybe<string>}
    & { linkedin: Maybe<string>}
    & { location: Maybe<string>}
    & { name: string}
    & { online: boolean}
    & { phone: Maybe<string>}
    & { photo: Maybe<string>}
    & { primaryOrganization: Maybe<(
        & { __typename: 'Organization' }
        & OrganizationShort
    )>}
    & { shortname: Maybe<string>}
    & { twitter: Maybe<string>}
    & { website: Maybe<string>}
);
export type OrganizationFull = (
    & { __typename: 'Organization' }
    & { about: Maybe<string>}
    & { featured: boolean}
    & { isCommunity: boolean}
    & { isPrivate: boolean}
    & { requests: ((
        & { __typename: 'OrganizationRequestedMember' }
        & { role: OrganizationMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserFull
        )}
    ))[]}
    & { members: ((
        & { __typename: 'OrganizationJoinedMember' }
        & { role: OrganizationMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserFull
        )}
    ))[]}
    & { isAdmin: boolean}
    & { isOwner: boolean}
    & { facebook: Maybe<string>}
    & { id: string}
    & { instagram: Maybe<string>}
    & { isMine: boolean}
    & { linkedin: Maybe<string>}
    & { membersCount: number}
    & { name: string}
    & { photo: Maybe<string>}
    & { shortname: Maybe<string>}
    & { superAccountId: string}
    & { twitter: Maybe<string>}
    & { website: Maybe<string>}
);
export type OrganizationMedium = (
    & { __typename: 'Organization' }
    & { about: Maybe<string>}
    & { isCommunity: boolean}
    & { isAdmin: boolean}
    & { isOwner: boolean}
    & { id: string}
    & { isMine: boolean}
    & { membersCount: number}
    & { name: string}
    & { photo: Maybe<string>}
    & { shortname: Maybe<string>}
);
export type OrganizationProfileFull = (
    & { __typename: 'OrganizationProfile' }
    & { about: Maybe<string>}
    & { editorial: boolean}
    & { featured: boolean}
    & { private: boolean}
    & { published: boolean}
    & { facebook: Maybe<string>}
    & { id: string}
    & { instagram: Maybe<string>}
    & { linkedin: Maybe<string>}
    & { name: string}
    & { photoRef: Maybe<(
        & { __typename: 'ImageRef' }
        & { crop: Maybe<(
            & { __typename: 'ImageCrop' }
            & { h: number}
            & { w: number}
            & { x: number}
            & { y: number}
        )>}
        & { uuid: string}
    )>}
    & { shortname: Maybe<string>}
    & { twitter: Maybe<string>}
    & { website: Maybe<string>}
    & { websiteTitle: Maybe<string>}
);
export type OrganizationSearch = (
    & { __typename: 'Organization' }
    & { about: Maybe<string>}
    & { featured: boolean}
    & { members: ((
        & { __typename: 'OrganizationJoinedMember' }
        & { user: (
            & { __typename: 'User' }
            & { id: string}
            & { name: string}
            & { photo: Maybe<string>}
        )}
    ))[]}
    & { id: string}
    & { isMine: boolean}
    & { membersCount: number}
    & { name: string}
    & { photo: Maybe<string>}
    & { status: string}
    & { superAccountId: string}
);
export type OrganizationWithoutMembersFragment = (
    & { __typename: 'Organization' }
    & { about: Maybe<string>}
    & { featured: boolean}
    & { isCommunity: boolean}
    & { isPrivate: boolean}
    & { requests: ((
        & { __typename: 'OrganizationRequestedMember' }
        & { role: OrganizationMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserFull
        )}
    ))[]}
    & { isAdmin: boolean}
    & { isOwner: boolean}
    & { roomsCount: number}
    & { facebook: Maybe<string>}
    & { id: string}
    & { instagram: Maybe<string>}
    & { isMine: boolean}
    & { linkedin: Maybe<string>}
    & { membersCount: number}
    & { name: string}
    & { photo: Maybe<string>}
    & { shortname: Maybe<string>}
    & { superAccountId: string}
    & { twitter: Maybe<string>}
    & { website: Maybe<string>}
);
export type PlatformNotificationSettingsFull = (
    & { __typename: 'PlatformNotificationSettings' }
    & { comments: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
    & { communityChat: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
    & { direct: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
    & { notificationPreview: NotificationPreview}
    & { organizationChat: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
    & { secretChat: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
);
export type RoomFull = (
    & { __typename: 'PrivateRoom' | 'SharedRoom' }
    & Inline<'SharedRoom',(
        & { __typename: 'PrivateRoom' }
        & { id: string}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    )>
    & Inline<'PrivateRoom',(
        & { __typename: 'SharedRoom' }
        & { canEdit: boolean}
        & { canSendMessage: boolean}
        & { description: Maybe<string>}
        & { featuredMembersCount: number}
        & { id: string}
        & { isChannel: boolean}
        & { isPremium: boolean}
        & { kind: SharedRoomKind}
        & { matchmaking: Maybe<(
            & { __typename: 'MatchmakingRoom' }
            & MatchmakingRoomFragment
        )>}
        & { members: ((
            & { __typename: 'RoomMember' }
            & { badge: Maybe<(
                & { __typename: 'UserBadge' }
                & UserBadge
            )>}
            & { canKick: boolean}
            & { membership: SharedRoomMembershipStatus}
            & { role: RoomMemberRole}
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]}
        & { membersCount: number}
        & { membership: SharedRoomMembershipStatus}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { onlineMembersCount: number}
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & OrganizationMedium
        )>}
        & { photo: string}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { premiumPassIsActive: boolean}
        & { premiumSettings: Maybe<(
            & { __typename: 'PremiumChatSettings' }
            & { id: string}
            & { interval: WalletSubscriptionInterval}
            & { price: number}
        )>}
        & { premiumSubscription: Maybe<(
            & { __typename: 'WalletSubscription' }
            & { id: string}
            & { state: WalletSubscriptionState}
        )>}
        & { previewMembers: ((
            & { __typename: 'User' }
            & { id: string}
            & { photo: Maybe<string>}
        ))[]}
        & { requests: Maybe<((
            & { __typename: 'RoomMember' }
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]>}
        & { role: RoomMemberRole}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { socialImage: Maybe<string>}
        & { title: string}
        & { welcomeMessage: Maybe<(
            & { __typename: 'WelcomeMessage' }
            & { isOn: boolean}
            & { message: Maybe<string>}
            & { sender: Maybe<(
                & { __typename: 'User' }
                & { id: string}
                & { name: string}
            )>}
        )>}
    )>
);
export type RoomFullWithoutMembers = (
    & { __typename: 'PrivateRoom' | 'SharedRoom' }
    & Inline<'SharedRoom',(
        & { __typename: 'PrivateRoom' }
        & { id: string}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    )>
    & Inline<'PrivateRoom',(
        & { __typename: 'SharedRoom' }
        & { canEdit: boolean}
        & { canSendMessage: boolean}
        & { description: Maybe<string>}
        & { featuredMembersCount: number}
        & { id: string}
        & { isChannel: boolean}
        & { kind: SharedRoomKind}
        & { matchmaking: Maybe<(
            & { __typename: 'MatchmakingRoom' }
            & MatchmakingRoomFragment
        )>}
        & { membersCount: number}
        & { membership: SharedRoomMembershipStatus}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & OrganizationMedium
        )>}
        & { photo: string}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { role: RoomMemberRole}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { socialImage: Maybe<string>}
        & { title: string}
        & { welcomeMessage: Maybe<(
            & { __typename: 'WelcomeMessage' }
            & { isOn: boolean}
            & { message: Maybe<string>}
            & { sender: Maybe<(
                & { __typename: 'User' }
                & { id: string}
                & { name: string}
            )>}
        )>}
    )>
);
export type SessionStateFull = (
    & { __typename: 'SessionState' }
    & { isAccountActivated: boolean}
    & { isAccountExists: boolean}
    & { isAccountPicked: boolean}
    & { isActivated: boolean}
    & { isBlocked: boolean}
    & { isCompleted: boolean}
    & { isLoggedIn: boolean}
    & { isProfileCreated: boolean}
);
export type SettingsFull = (
    & { __typename: 'Settings' }
    & { countUnreadChats: boolean}
    & { desktop: (
        & { __typename: 'PlatformNotificationSettings' }
        & PlatformNotificationSettingsFull
    )}
    & { emailFrequency: EmailFrequency}
    & { excludeMutedChats: boolean}
    & { id: string}
    & { mobile: (
        & { __typename: 'PlatformNotificationSettings' }
        & PlatformNotificationSettingsFull
    )}
    & { primaryEmail: string}
);
export type SharedRoomView = (
    & { __typename: 'SharedRoom' }
    & { id: string}
    & { membersCount: number}
    & { photo: string}
    & { title: string}
);
export type StickerPackFragment = (
    & { __typename: 'StickerPack' }
    & { id: string}
    & { stickers: ((
        & { __typename: 'ImageSticker' }
        & StickerFragment
    ))[]}
    & { title: string}
);
export type UserNano = (
    & { __typename: 'User' }
    & { firstName: string}
    & { id: string}
    & { lastName: Maybe<string>}
    & { name: string}
    & { online: boolean}
    & { photo: Maybe<string>}
);
export type WalletTransactionFragment = (
    & { __typename: 'WalletTransaction' }
    & { id: string}
    & { operation: (
        & { __typename: 'WalletTransactionDeposit' | 'WalletTransactionSubscription' | 'WalletTransactionTransferOut' | 'WalletTransactionTransferIn' }
        & Inline<'WalletTransactionSubscription' | 'WalletTransactionTransferOut' | 'WalletTransactionTransferIn',(
            & { __typename: 'WalletTransactionDeposit' }
            & { amount: number}
            & { payment: Maybe<(
                & { __typename: 'Payment' }
                & { id: string}
                & { intent: Maybe<(
                    & { __typename: 'PaymentIntent' }
                    & { clientSecret: string}
                    & { id: string}
                )>}
                & { status: PaymentStatus}
            )>}
        )>
        & Inline<'WalletTransactionDeposit' | 'WalletTransactionTransferOut' | 'WalletTransactionTransferIn',(
            & { __typename: 'WalletTransactionSubscription' }
            & { amount: number}
            & { payment: Maybe<(
                & { __typename: 'Payment' }
                & { id: string}
                & { intent: Maybe<(
                    & { __typename: 'PaymentIntent' }
                    & { clientSecret: string}
                    & { id: string}
                )>}
                & { status: PaymentStatus}
            )>}
        )>
        & Inline<'WalletTransactionDeposit' | 'WalletTransactionSubscription' | 'WalletTransactionTransferIn',(
            & { __typename: 'WalletTransactionTransferOut' }
            & { chargeAmount: number}
            & { payment: Maybe<(
                & { __typename: 'Payment' }
                & { id: string}
                & { intent: Maybe<(
                    & { __typename: 'PaymentIntent' }
                    & { clientSecret: string}
                    & { id: string}
                )>}
                & { status: PaymentStatus}
            )>}
            & { toUser: (
                & { __typename: 'User' }
                & UserShort
            )}
            & { walletAmount: number}
        )>
        & Inline<'WalletTransactionDeposit' | 'WalletTransactionSubscription' | 'WalletTransactionTransferOut',(
            & { __typename: 'WalletTransactionTransferIn' }
            & { amount: number}
            & { fromUser: (
                & { __typename: 'User' }
                & UserShort
            )}
        )>
    )}
    & { status: WalletTransactionStatus}
);
export type WalletUpdateFragment = (
    & { __typename: 'WalletUpdateBalance' | 'WalletUpdateTransactionSuccess' | 'WalletUpdateTransactionCanceled' | 'WalletUpdateTransactionPending' | 'WalletUpdatePaymentStatus' }
    & Inline<'WalletUpdateTransactionSuccess' | 'WalletUpdateTransactionCanceled' | 'WalletUpdateTransactionPending' | 'WalletUpdatePaymentStatus',(
        & { __typename: 'WalletUpdateBalance' }
        & { amount: number}
    )>
    & Inline<'WalletUpdateBalance' | 'WalletUpdateTransactionCanceled' | 'WalletUpdateTransactionPending' | 'WalletUpdatePaymentStatus',(
        & { __typename: 'WalletUpdateTransactionSuccess' }
        & { transaction: (
            & { __typename: 'WalletTransaction' }
            & WalletTransactionFragment
        )}
    )>
    & Inline<'WalletUpdateBalance' | 'WalletUpdateTransactionSuccess' | 'WalletUpdateTransactionPending' | 'WalletUpdatePaymentStatus',(
        & { __typename: 'WalletUpdateTransactionCanceled' }
        & { transaction: (
            & { __typename: 'WalletTransaction' }
            & WalletTransactionFragment
        )}
    )>
    & Inline<'WalletUpdateBalance' | 'WalletUpdateTransactionSuccess' | 'WalletUpdateTransactionCanceled' | 'WalletUpdatePaymentStatus',(
        & { __typename: 'WalletUpdateTransactionPending' }
        & { transaction: (
            & { __typename: 'WalletTransaction' }
            & WalletTransactionFragment
        )}
    )>
    & Inline<'WalletUpdateBalance' | 'WalletUpdateTransactionSuccess' | 'WalletUpdateTransactionCanceled' | 'WalletUpdateTransactionPending',(
        & { __typename: 'WalletUpdatePaymentStatus' }
        & { payment: (
            & { __typename: 'Payment' }
            & { id: string}
            & { intent: Maybe<(
                & { __typename: 'PaymentIntent' }
                & { clientSecret: string}
                & { id: string}
            )>}
            & { status: PaymentStatus}
        )}
    )>
);

// Queries
export type Account = (
    & { me: Maybe<(
        & { __typename: 'User' }
        & UserShort
    )>}
    & { myPermissions: (
        & { __typename: 'Permissions' }
        & { roles: (string)[]}
    )}
    & { sessionState: (
        & { __typename: 'SessionState' }
        & SessionStateFull
    )}
);
export type AccountAppInvite = (
    & { invite: string}
);
export interface AccountAppInviteInfoVariables {
    inviteKey: string;
}
export type AccountAppInviteInfo = (
    & { invite: Maybe<(
        & { __typename: 'InviteInfo' }
        & { creator: Maybe<(
            & { __typename: 'User' }
            & UserShort
        )>}
        & { id: string}
    )>}
    & { appInvite: Maybe<(
        & { __typename: 'AppInvite' }
        & { inviter: (
            & { __typename: 'User' }
            & UserShort
        )}
    )>}
);
export interface AccountInviteInfoVariables {
    inviteKey: string;
}
export type AccountInviteInfo = (
    & { invite: Maybe<(
        & { __typename: 'InviteInfo' }
        & { creator: Maybe<(
            & { __typename: 'User' }
            & UserShort
        )>}
        & { forEmail: Maybe<string>}
        & { forName: Maybe<string>}
        & { id: string}
        & { joined: boolean}
        & { key: string}
        & { membersCount: Maybe<number>}
        & { orgId: string}
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & { about: Maybe<string>}
            & { isCommunity: boolean}
            & { id: string}
        )>}
        & { photo: Maybe<string>}
        & { title: string}
    )>}
);
export type AccountSettings = (
    & { me: Maybe<(
        & { __typename: 'User' }
        & { audienceSize: number}
        & UserShort
    )>}
    & { organizations: ((
        & { __typename: 'Organization' }
        & OrganizationShort
    ))[]}
);
export type AvailableRooms = (
    & { communities: (
        & { __typename: 'OrganizationsConnection' }
        & { edges: ((
            & { __typename: 'OrganizationsEdge' }
            & { node: (
                & { __typename: 'Organization' }
                & CommunitySearch
            )}
        ))[]}
    )}
    & { isDiscoverDone: boolean}
    & { suggestedRooms: ((
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { kind: SharedRoomKind}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
            & { photo: string}
            & { title: string}
        )>
    ))[]}
    & { availableChats: ((
        & { __typename: 'SharedRoom' }
        & Inline<never,(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { kind: SharedRoomKind}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
            & { photo: string}
            & { title: string}
        )>
    ))[]}
    & { availableChannels: ((
        & { __typename: 'SharedRoom' }
        & Inline<never,(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { kind: SharedRoomKind}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
            & { photo: string}
            & { title: string}
        )>
    ))[]}
);
export interface ChatInitVariables {
    before?: MaybeInput<string>;
    chatId: string;
    first: number;
}
export type ChatInit = (
    & { state: (
        & { __typename: 'ConversationUpdateState' }
        & { state: Maybe<string>}
    )}
    & { lastReadedMessage: Maybe<(
        & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
        & { id: string}
    )>}
    & { messages: ((
        & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
        & FullMessage
    ))[]}
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomShort
    )>}
);
export interface ChatInitFromUnreadVariables {
    before?: MaybeInput<string>;
    chatId: string;
    first: number;
}
export type ChatInitFromUnread = (
    & { state: (
        & { __typename: 'ConversationUpdateState' }
        & { state: Maybe<string>}
    )}
    & { gammaMessages: Maybe<(
        & { __typename: 'GammaMessagesBatch' }
        & { haveMoreBackward: Maybe<boolean>}
        & { haveMoreForward: Maybe<boolean>}
        & { messages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        ))[]}
    )>}
    & { lastReadedMessage: Maybe<(
        & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
        & { id: string}
    )>}
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomShort
    )>}
);
export interface ChatMembersSearchVariables {
    after?: MaybeInput<string>;
    cid: string;
    first: number;
    query?: MaybeInput<string>;
}
export type ChatMembersSearch = (
    & { members: (
        & { __typename: 'UserConnection' }
        & { edges: ((
            & { __typename: 'UserEdge' }
            & { cursor: string}
            & { user: (
                & { __typename: 'User' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
                & { primaryOrganization: Maybe<(
                    & { __typename: 'Organization' }
                    & { id: string}
                    & { name: string}
                )>}
                & { shortname: Maybe<string>}
            )}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
        )}
    )}
);
export interface ChatMentionSearchVariables {
    after?: MaybeInput<string>;
    cid: string;
    first: number;
    query?: MaybeInput<string>;
}
export type ChatMentionSearch = (
    & { mentions: (
        & { __typename: 'GlobalSearchConnection' }
        & { cursor: Maybe<string>}
        & { globalItems: ((
            & { __typename: 'Organization' | 'User' | 'SharedRoom' }
            & Inline<'User' | 'SharedRoom',(
                & { __typename: 'Organization' }
                & OrganizationShort
            )>
            & Inline<'Organization' | 'SharedRoom',(
                & { __typename: 'User' }
                & UserForMention
            )>
            & Inline<'Organization' | 'User',(
                & { __typename: 'SharedRoom' }
                & RoomSharedNano
            )>
        ))[]}
        & { localItems: ((
            & { __typename: 'User' }
            & UserForMention
        ))[]}
    )}
);
export interface CommentsVariables {
    peerId: string;
}
export type Comments = (
    & { comments: (
        & { __typename: 'CommentsPeer' }
        & { comments: ((
            & { __typename: 'CommentEntry' }
            & CommentEntryFragment
        ))[]}
        & { count: number}
        & { id: string}
        & { state: (
            & { __typename: 'CommentUpdatesState' }
            & { state: Maybe<string>}
        )}
    )}
);
export interface ConferenceVariables {
    id: string;
}
export type Conference = (
    & { conference: (
        & { __typename: 'Conference' }
        & ConferenceFull
    )}
);
export interface ConferenceMediaVariables {
    id: string;
    peerId: string;
}
export type ConferenceMedia = (
    & { conferenceMedia: (
        & { __typename: 'ConferenceMedia' }
        & { iceServers: ((
            & { __typename: 'ICEServer' }
            & { credential: Maybe<string>}
            & { urls: (string)[]}
            & { username: Maybe<string>}
        ))[]}
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { ice: (string)[]}
            & { id: string}
            & { peerId: Maybe<string>}
            & { sdp: Maybe<string>}
            & { state: MediaStreamState}
        ))[]}
    )}
);
export interface DialogsVariables {
    after?: MaybeInput<string>;
}
export type Dialogs = (
    & { counter: (
        & { __typename: 'NotificationCounter' }
        & { id: string}
        & { unreadCount: number}
    )}
    & { dialogs: (
        & { __typename: 'DialogsConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'Dialog' }
            & { topMessage: Maybe<(
                & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                & DaialogListMessage
            )>}
            & { cid: string}
            & { fid: string}
            & { haveMention: boolean}
            & { id: string}
            & { isChannel: boolean}
            & { isMuted: boolean}
            & { kind: DialogKind}
            & { photo: string}
            & { title: string}
            & { unreadCount: number}
        ))[]}
    )}
    & { state: (
        & { __typename: 'DialogUpdateState' }
        & { state: Maybe<string>}
    )}
);
export type DiscoverIsDone = (
    & { betaIsDiscoverDone: boolean}
);
export interface DiscoverNextPageVariables {
    excudedGroupsIds: (string)[];
    selectedTagsIds: (string)[];
}
export type DiscoverNextPage = (
    & { betaNextDiscoverPage: Maybe<(
        & { __typename: 'DiscoverPage' }
        & { chats: Maybe<((
            & { __typename: 'PrivateRoom' | 'SharedRoom' }
            & RoomShort
        ))[]>}
        & { tagGroup: Maybe<(
            & { __typename: 'TagGroup' }
            & { id: string}
            & { subtitle: Maybe<string>}
            & { tags: ((
                & { __typename: 'Tag' }
                & { id: string}
                & { title: string}
            ))[]}
            & { title: Maybe<string>}
        )>}
    )>}
);
export type DiscoverState = (
    & { dialogs: (
        & { __typename: 'DialogsConnection' }
        & { items: ((
            & { __typename: 'Dialog' }
            & { id: string}
        ))[]}
    )}
);
export interface ExploreCommunityVariables {
    after?: MaybeInput<string>;
    featuredIfEmptyQuery?: MaybeInput<boolean>;
    page?: MaybeInput<number>;
    query?: MaybeInput<string>;
    sort?: MaybeInput<string>;
}
export type ExploreCommunity = (
    & { items: (
        & { __typename: 'OrganizationsConnection' }
        & { edges: ((
            & { __typename: 'OrganizationsEdge' }
            & { cursor: string}
            & { node: (
                & { __typename: 'Organization' }
                & CommunitySearch
            )}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { currentPage: number}
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { openEnded: boolean}
            & { pagesCount: number}
        )}
    )}
);
export interface ExplorePeopleVariables {
    after?: MaybeInput<string>;
    page?: MaybeInput<number>;
    query?: MaybeInput<string>;
    sort?: MaybeInput<string>;
}
export type ExplorePeople = (
    & { items: (
        & { __typename: 'UserConnection' }
        & { edges: ((
            & { __typename: 'UserEdge' }
            & { cursor: string}
            & { node: (
                & { __typename: 'User' }
                & { isYou: boolean}
                & UserShort
            )}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { currentPage: number}
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { openEnded: boolean}
            & { pagesCount: number}
        )}
    )}
);
export type FeatureFlags = (
    & { featureFlags: ((
        & { __typename: 'FeatureFlag' }
        & { id: string}
        & { key: string}
        & { title: string}
    ))[]}
);
export interface FeedChannelVariables {
    id: string;
}
export type FeedChannel = (
    & { channel: (
        & { __typename: 'FeedChannel' }
        & FeedChannelFull
    )}
);
export interface FeedChannelContentVariables {
    after?: MaybeInput<string>;
    first: number;
    id: string;
}
export type FeedChannelContent = (
    & { content: (
        & { __typename: 'FeedItemConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'FeedPost' }
            & FeedItemFull
        ))[]}
    )}
);
export interface FeedChannelSubscribersVariables {
    after?: MaybeInput<string>;
    channelId: string;
    first: number;
    query?: MaybeInput<string>;
}
export type FeedChannelSubscribers = (
    & { subscribers: (
        & { __typename: 'FeedChannelSubscriberConnection' }
        & { edges: ((
            & { __typename: 'FeedChannelSubscriberEdge' }
            & { cursor: string}
            & { node: (
                & { __typename: 'FeedChannelSubscriber' }
                & { role: FeedChannelSubscriberRole}
                & { user: (
                    & { __typename: 'User' }
                    & UserShort
                )}
            )}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { currentPage: number}
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { openEnded: boolean}
            & { pagesCount: number}
        )}
    )}
);
export interface FeedChannelWritersVariables {
    after?: MaybeInput<string>;
    first: number;
    id: string;
}
export type FeedChannelWriters = (
    & { writers: (
        & { __typename: 'FeedChannelAdminConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'FeedChannelAdmin' }
            & { role: FeedChannelSubscriberRole}
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]}
    )}
);
export interface FeedChannelsSearchVariables {
    after?: MaybeInput<string>;
    first: number;
    query?: MaybeInput<string>;
    sort?: MaybeInput<string>;
}
export type FeedChannelsSearch = (
    & { search: (
        & { __typename: 'FeedChannelSearchConnection' }
        & { edges: ((
            & { __typename: 'FeedChannelEdge' }
            & { cursor: string}
            & { node: (
                & { __typename: 'FeedChannel' }
                & FeedChannelFull
            )}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { currentPage: number}
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { openEnded: boolean}
            & { pagesCount: number}
        )}
    )}
);
export interface FeedItemVariables {
    id: string;
}
export type FeedItem = (
    & { item: Maybe<(
        & { __typename: 'FeedPost' }
        & FeedItemFull
    )>}
);
export interface FeedLoadMoreVariables {
    after?: MaybeInput<string>;
    first: number;
}
export type FeedLoadMore = (
    & { feed: (
        & { __typename: 'FeedItemConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'FeedPost' }
            & FeedItemFull
        ))[]}
    )}
);
export interface FeedRecommendedChannelsVariables {
    after?: MaybeInput<string>;
    first: number;
}
export type FeedRecommendedChannels = (
    & { search: (
        & { __typename: 'FeedChannelSearchConnection' }
        & { edges: ((
            & { __typename: 'FeedChannelEdge' }
            & { cursor: string}
            & { node: (
                & { __typename: 'FeedChannel' }
                & FeedChannelFull
            )}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { currentPage: number}
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { openEnded: boolean}
            & { pagesCount: number}
        )}
    )}
);
export interface FeedSubscriptionsVariables {
    after?: MaybeInput<string>;
    first: number;
}
export type FeedSubscriptions = (
    & { channels: (
        & { __typename: 'FeedChannelConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'FeedChannel' }
            & FeedChannelFull
        ))[]}
    )}
);
export interface FeedWritableChannelsVariables {
    after?: MaybeInput<string>;
    first: number;
}
export type FeedWritableChannels = (
    & { channels: (
        & { __typename: 'FeedChannelConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'FeedChannel' }
            & FeedChannelFull
        ))[]}
    )}
);
export type FetchPushSettings = (
    & { pushSettings: (
        & { __typename: 'PushSettings' }
        & { webPushKey: Maybe<string>}
    )}
);
export interface GetUserVariables {
    id: string;
}
export type GetUser = (
    & { user: (
        & { __typename: 'User' }
        & UserNano
    )}
);
export type GlobalCounter = (
    & { alphaNotificationCounter: (
        & { __typename: 'NotificationCounter' }
        & { id: string}
        & { unreadCount: number}
    )}
);
export interface GlobalSearchVariables {
    kinds?: MaybeInput<(GlobalSearchEntryKind)[]>;
    query: string;
}
export type GlobalSearch = (
    & { items: ((
        & { __typename: 'Organization' | 'User' | 'SharedRoom' }
        & Inline<'User' | 'SharedRoom',(
            & { __typename: 'Organization' }
            & { about: Maybe<string>}
            & { isCommunity: boolean}
            & { id: string}
            & { name: string}
            & { photo: Maybe<string>}
            & { shortname: Maybe<string>}
        )>
        & Inline<'Organization' | 'SharedRoom',(
            & { __typename: 'User' }
            & UserShort
        )>
        & Inline<'Organization' | 'User',(
            & { __typename: 'SharedRoom' }
            & { canSendMessage: boolean}
            & { id: string}
            & { kind: SharedRoomKind}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
            & { roomPhoto: string}
            & { title: string}
        )>
    ))[]}
);
export interface InitFeedVariables {
    first: number;
}
export type InitFeed = (
    & { drafts: (
        & { __typename: 'FeedChannel' }
        & FeedChannelFull
    )}
    & { feed: (
        & { __typename: 'FeedItemConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'FeedPost' }
            & FeedItemFull
        ))[]}
    )}
);
export interface MatchmakingProfileVariables {
    peerId: string;
    uid: string;
}
export type MatchmakingProfile = (
    & { matchmakingProfile: Maybe<(
        & { __typename: 'MatchmakingProfile' }
        & MatchmakingProfileFragment
    )>}
);
export interface MatchmakingRoomVariables {
    peerId: string;
}
export type MatchmakingRoom = (
    & { matchmakingRoom: Maybe<(
        & { __typename: 'MatchmakingRoom' }
        & MatchmakingRoomFragment
    )>}
);
export interface MessageVariables {
    messageId: string;
}
export type Message = (
    & { message: Maybe<(
        & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
        & FullMessage
    )>}
);
export interface MessagesBatchVariables {
    after?: MaybeInput<string>;
    before?: MaybeInput<string>;
    chatId: string;
    first: number;
}
export type MessagesBatch = (
    & { state: (
        & { __typename: 'ConversationUpdateState' }
        & { state: Maybe<string>}
    )}
    & { gammaMessages: Maybe<(
        & { __typename: 'GammaMessagesBatch' }
        & { haveMoreBackward: Maybe<boolean>}
        & { haveMoreForward: Maybe<boolean>}
        & { messages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        ))[]}
    )>}
);
export interface MessagesSearchVariables {
    after?: MaybeInput<string>;
    first: number;
    query: string;
    sort?: MaybeInput<string>;
}
export type MessagesSearch = (
    & { messagesSearch: (
        & { __typename: 'MessageConnection' }
        & { edges: ((
            & { __typename: 'MessageEdge' }
            & { cursor: string}
            & { node: (
                & { __typename: 'MessageWithChat' }
                & { chat: (
                    & { __typename: 'PrivateRoom' | 'SharedRoom' }
                    & Inline<'SharedRoom',(
                        & { __typename: 'PrivateRoom' }
                        & { id: string}
                        & { settings: (
                            & { __typename: 'RoomUserNotificaionSettings' }
                            & { id: string}
                            & { mute: Maybe<boolean>}
                        )}
                        & { user: (
                            & { __typename: 'User' }
                            & { id: string}
                            & { name: string}
                            & { photo: Maybe<string>}
                        )}
                    )>
                    & Inline<'PrivateRoom',(
                        & { __typename: 'SharedRoom' }
                        & { canEdit: boolean}
                        & { id: string}
                        & { isChannel: boolean}
                        & { kind: SharedRoomKind}
                        & { membership: SharedRoomMembershipStatus}
                        & { photo: string}
                        & { role: RoomMemberRole}
                        & { settings: (
                            & { __typename: 'RoomUserNotificaionSettings' }
                            & { id: string}
                            & { mute: Maybe<boolean>}
                        )}
                        & { title: string}
                    )>
                )}
                & { message: (
                    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                    & { date: string}
                    & { fallback: string}
                    & { id: string}
                    & { message: Maybe<string>}
                    & { sender: (
                        & { __typename: 'User' }
                        & { firstName: string}
                        & { id: string}
                        & { name: string}
                        & { photo: Maybe<string>}
                    )}
                    & { senderBadge: Maybe<(
                        & { __typename: 'UserBadge' }
                        & UserBadge
                    )>}
                    & Inline<'ServiceMessage' | 'StickerMessage',(
                        & { __typename: 'GeneralMessage' }
                        & { attachments: ((
                            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
                            & { fallback: string}
                            & { id: string}
                            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                                & { __typename: 'MessageAttachmentFile' }
                                & { fileId: string}
                                & { fileMetadata: (
                                    & { __typename: 'FileMetadata' }
                                    & { imageFormat: Maybe<string>}
                                    & { isImage: boolean}
                                )}
                                & { id: string}
                            )>
                        ))[]}
                        & { id: string}
                        & { quotedMessages: ((
                            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                            & { id: string}
                        ))[]}
                    )>
                )}
            )}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { currentPage: number}
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { openEnded: boolean}
            & { pagesCount: number}
        )}
    )}
);
export type MyApps = (
    & { apps: ((
        & { __typename: 'AppProfile' }
        & AppFull
    ))[]}
);
export type MyCards = (
    & { myCards: ((
        & { __typename: 'CreditCard' }
        & { brand: string}
        & { deleted: boolean}
        & { expMonth: number}
        & { expYear: number}
        & { id: string}
        & { isDefault: boolean}
        & { last4: string}
        & { pmid: string}
    ))[]}
);
export type MyNotificationCenter = (
    & { myNotificationCenter: (
        & { __typename: 'NotificationCenter' }
        & { id: string}
        & { state: (
            & { __typename: 'NotificationCenterUpdatesState' }
            & { state: Maybe<string>}
        )}
        & { unread: number}
    )}
);
export interface MyNotificationsVariables {
    before?: MaybeInput<string>;
    first: number;
}
export type MyNotifications = (
    & { myNotifications: (
        & { __typename: 'NotificationConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'Notification' }
            & NotificationFragment
        ))[]}
    )}
);
export type MyOrganizations = (
    & { myOrganizations: ((
        & { __typename: 'Organization' }
        & { isPrimary: boolean}
        & OrganizationShort
    ))[]}
);
export type MyStickers = (
    & { stickers: (
        & { __typename: 'UserStickers' }
        & { packs: ((
            & { __typename: 'StickerPack' }
            & { id: string}
            & { stickers: ((
                & { __typename: 'ImageSticker' }
                & StickerFragment
            ))[]}
            & { title: string}
        ))[]}
    )}
);
export type MySuccessfulInvitesCount = (
    & { mySuccessfulInvitesCount: number}
);
export type MyWallet = (
    & { myWallet: (
        & { __typename: 'WalletAccount' }
        & { balance: number}
        & { id: string}
        & { state: string}
    )}
    & { transactionsHistory: (
        & { __typename: 'WalletTransactionConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'WalletTransaction' }
            & WalletTransactionFragment
        ))[]}
    )}
    & { transactionsPending: ((
        & { __typename: 'WalletTransaction' }
        & WalletTransactionFragment
    ))[]}
);
export interface OauthContextVariables {
    code: string;
}
export type OauthContext = (
    & { context: Maybe<(
        & { __typename: 'OauthContext' }
        & { app: (
            & { __typename: 'OauthApp' }
            & { id: string}
            & { image: Maybe<(
                & { __typename: 'ImageRef' }
                & { crop: Maybe<(
                    & { __typename: 'ImageCrop' }
                    & { h: number}
                    & { w: number}
                    & { x: number}
                    & { y: number}
                )>}
                & { uuid: string}
            )>}
            & { scopes: Maybe<(OauthScope)[]>}
            & { title: string}
        )}
        & { code: string}
        & { redirectUrl: string}
        & { state: string}
    )>}
);
export interface OnlineVariables {
    userId: string;
}
export type Online = (
    & { user: (
        & { __typename: 'User' }
        & { id: string}
        & { isBot: boolean}
        & { lastSeen: Maybe<string>}
        & { online: boolean}
    )}
);
export interface OrganizationVariables {
    organizationId: string;
}
export type Organization = (
    & { organization: (
        & { __typename: 'Organization' }
        & OrganizationFull
    )}
);
export interface OrganizationByPrefixVariables {
    query: string;
}
export type OrganizationByPrefix = (
    & { organizationByPrefix: Maybe<(
        & { __typename: 'Organization' }
        & OrganizationSearch
    )>}
);
export interface OrganizationMembersVariables {
    after?: MaybeInput<string>;
    first?: MaybeInput<number>;
    organizationId: string;
}
export type OrganizationMembers = (
    & { organization: (
        & { __typename: 'Organization' }
        & { members: ((
            & { __typename: 'OrganizationJoinedMember' }
            & { role: OrganizationMemberRole}
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]}
        & { id: string}
    )}
);
export interface OrganizationMembersShortVariables {
    organizationId: string;
}
export type OrganizationMembersShort = (
    & { organization: (
        & { __typename: 'Organization' }
        & { members: ((
            & { __typename: 'OrganizationJoinedMember' }
            & { user: (
                & { __typename: 'User' }
                & { id: string}
            )}
        ))[]}
        & OrganizationWithoutMembersFragment
    )}
);
export interface OrganizationProfileVariables {
    organizationId: string;
}
export type OrganizationProfile = (
    & { organizationProfile: (
        & { __typename: 'OrganizationProfile' }
        & OrganizationProfileFull
    )}
);
export interface OrganizationPublicInviteVariables {
    organizationId?: MaybeInput<string>;
}
export type OrganizationPublicInvite = (
    & { publicInvite: Maybe<(
        & { __typename: 'Invite' }
        & { id: string}
        & { key: string}
        & { ttl: Maybe<string>}
    )>}
);
export interface OrganizationPublicRoomsVariables {
    after?: MaybeInput<string>;
    first: number;
    organizationId: string;
}
export type OrganizationPublicRooms = (
    & { organizationPublicRooms: (
        & { __typename: 'SharedRoomConnection' }
        & { cursor: Maybe<string>}
        & { items: ((
            & { __typename: 'SharedRoom' }
            & SharedRoomView
        ))[]}
    )}
);
export interface OrganizationWithoutMembersVariables {
    organizationId: string;
}
export type OrganizationWithoutMembers = (
    & { organization: (
        & { __typename: 'Organization' }
        & OrganizationWithoutMembersFragment
    )}
);
export type Permissions = (
    & { myPermissions: (
        & { __typename: 'Permissions' }
        & { roles: (string)[]}
    )}
);
export type Profile = (
    & { user: Maybe<(
        & { __typename: 'User' }
        & { id: string}
        & { shortname: Maybe<string>}
    )>}
    & { profile: Maybe<(
        & { __typename: 'Profile' }
        & { about: Maybe<string>}
        & { invitedBy: Maybe<(
            & { __typename: 'User' }
            & { id: string}
            & { name: string}
        )>}
        & { joinedAt: Maybe<string>}
        & { role: Maybe<string>}
        & { email: Maybe<string>}
        & { facebook: Maybe<string>}
        & { firstName: Maybe<string>}
        & { id: string}
        & { instagram: Maybe<string>}
        & { lastName: Maybe<string>}
        & { linkedin: Maybe<string>}
        & { location: Maybe<string>}
        & { phone: Maybe<string>}
        & { photoRef: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { primaryOrganization: Maybe<(
            & { __typename: 'Organization' }
            & { id: string}
            & { membersCount: number}
            & { name: string}
        )>}
        & { twitter: Maybe<string>}
        & { website: Maybe<string>}
    )>}
);
export type ProfilePrefill = (
    & { prefill: Maybe<(
        & { __typename: 'ProfilePrefill' }
        & { firstName: Maybe<string>}
        & { lastName: Maybe<string>}
        & { picture: Maybe<string>}
    )>}
);
export interface ResolveShortNameVariables {
    shortname: string;
}
export type ResolveShortName = (
    & { item: Maybe<(
        & { __typename: 'User' | 'Organization' | 'FeedChannel' | 'SharedRoom' }
        & Inline<'Organization' | 'FeedChannel' | 'SharedRoom',(
            & { __typename: 'User' }
            & { id: string}
            & { isDeleted: boolean}
        )>
        & Inline<'User' | 'FeedChannel' | 'SharedRoom',(
            & { __typename: 'Organization' }
            & { id: string}
            & { isDeleted: boolean}
        )>
        & Inline<'User' | 'Organization' | 'SharedRoom',(
            & { __typename: 'FeedChannel' }
            & { id: string}
        )>
    )>}
);
export interface ResolvedInviteVariables {
    key: string;
}
export type ResolvedInvite = (
    & { invite: Maybe<(
        & { __typename: 'InviteInfo' | 'AppInvite' | 'RoomInvite' }
        & Inline<'AppInvite' | 'RoomInvite',(
            & { __typename: 'InviteInfo' }
            & { creator: Maybe<(
                & { __typename: 'User' }
                & UserShort
            )>}
            & { id: string}
            & { orgId: string}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { about: Maybe<string>}
                & { isCommunity: boolean}
                & { id: string}
                & { membersCount: number}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
            & { title: string}
        )>
        & Inline<'InviteInfo' | 'RoomInvite',(
            & { __typename: 'AppInvite' }
            & { inviter: (
                & { __typename: 'User' }
                & UserShort
            )}
        )>
        & Inline<'InviteInfo' | 'AppInvite',(
            & { __typename: 'RoomInvite' }
            & { id: string}
            & { invitedByUser: (
                & { __typename: 'User' }
                & UserShort
            )}
            & { room: (
                & { __typename: 'SharedRoom' }
                & Inline<never,(
                    & { __typename: 'SharedRoom' }
                    & { description: Maybe<string>}
                    & { id: string}
                    & { isChannel: boolean}
                    & { isPremium: boolean}
                    & { kind: SharedRoomKind}
                    & { matchmaking: Maybe<(
                        & { __typename: 'MatchmakingRoom' }
                        & { enabled: boolean}
                    )>}
                    & { membersCount: number}
                    & { membership: SharedRoomMembershipStatus}
                    & { onlineMembersCount: number}
                    & { photo: string}
                    & { premiumPassIsActive: boolean}
                    & { premiumSettings: Maybe<(
                        & { __typename: 'PremiumChatSettings' }
                        & { id: string}
                        & { interval: WalletSubscriptionInterval}
                        & { price: number}
                    )>}
                    & { premiumSubscription: Maybe<(
                        & { __typename: 'WalletSubscription' }
                        & { id: string}
                        & { state: WalletSubscriptionState}
                    )>}
                    & { previewMembers: ((
                        & { __typename: 'User' }
                        & { id: string}
                        & { photo: Maybe<string>}
                    ))[]}
                    & { socialImage: Maybe<string>}
                    & { title: string}
                )>
            )}
        )>
    )>}
);
export interface RoomVariables {
    id: string;
}
export type Room = (
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomFull
    )>}
);
export interface RoomChatVariables {
    id: string;
}
export type RoomChat = (
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'SharedRoom',(
            & { __typename: 'PrivateRoom' }
            & { id: string}
            & { pinnedMessage: Maybe<(
                & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                & FullMessage
            )>}
            & { settings: (
                & { __typename: 'RoomUserNotificaionSettings' }
                & { id: string}
                & { mute: Maybe<boolean>}
            )}
            & { user: (
                & { __typename: 'User' }
                & { id: string}
                & { isBot: boolean}
                & { name: string}
                & { photo: Maybe<string>}
                & { primaryOrganization: Maybe<(
                    & { __typename: 'Organization' }
                    & { id: string}
                    & { name: string}
                )>}
                & { shortname: Maybe<string>}
            )}
        )>
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { canEdit: boolean}
            & { id: string}
            & { isChannel: boolean}
            & { isPremium: boolean}
            & { kind: SharedRoomKind}
            & { matchmaking: Maybe<(
                & { __typename: 'MatchmakingRoom' }
                & MatchmakingRoomFragment
            )>}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & OrganizationMedium
            )>}
            & { photo: string}
            & { pinnedMessage: Maybe<(
                & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                & FullMessage
            )>}
            & { premiumPassIsActive: boolean}
            & { premiumSettings: Maybe<(
                & { __typename: 'PremiumChatSettings' }
                & { id: string}
                & { interval: WalletSubscriptionInterval}
                & { price: number}
            )>}
            & { premiumSubscription: Maybe<(
                & { __typename: 'WalletSubscription' }
                & { id: string}
                & { state: WalletSubscriptionState}
            )>}
            & { role: RoomMemberRole}
            & { settings: (
                & { __typename: 'RoomUserNotificaionSettings' }
                & { id: string}
                & { mute: Maybe<boolean>}
            )}
            & { title: string}
        )>
    )>}
);
export interface RoomFeaturedMembersVariables {
    roomId: string;
}
export type RoomFeaturedMembers = (
    & { roomFeaturedMembers: ((
        & { __typename: 'RoomMember' }
        & { badge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { canKick: boolean}
        & { membership: SharedRoomMembershipStatus}
        & { role: RoomMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    ))[]}
);
export interface RoomInviteInfoVariables {
    invite: string;
}
export type RoomInviteInfo = (
    & { invite: Maybe<(
        & { __typename: 'RoomInvite' }
        & { id: string}
        & { invitedByUser: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { room: (
            & { __typename: 'SharedRoom' }
            & Inline<never,(
                & { __typename: 'SharedRoom' }
                & { description: Maybe<string>}
                & { id: string}
                & { isChannel: boolean}
                & { isPremium: boolean}
                & { kind: SharedRoomKind}
                & { matchmaking: Maybe<(
                    & { __typename: 'MatchmakingRoom' }
                    & { enabled: boolean}
                )>}
                & { membersCount: number}
                & { membership: SharedRoomMembershipStatus}
                & { onlineMembersCount: number}
                & { organization: Maybe<(
                    & { __typename: 'Organization' }
                    & OrganizationShort
                )>}
                & { photo: string}
                & { premiumPassIsActive: boolean}
                & { premiumSettings: Maybe<(
                    & { __typename: 'PremiumChatSettings' }
                    & { id: string}
                    & { interval: WalletSubscriptionInterval}
                    & { price: number}
                )>}
                & { premiumSubscription: Maybe<(
                    & { __typename: 'WalletSubscription' }
                    & { id: string}
                    & { state: WalletSubscriptionState}
                )>}
                & { previewMembers: ((
                    & { __typename: 'User' }
                    & { id: string}
                    & { photo: Maybe<string>}
                ))[]}
                & { socialImage: Maybe<string>}
                & { title: string}
            )>
        )}
    )>}
);
export interface RoomInviteLinkVariables {
    roomId: string;
}
export type RoomInviteLink = (
    & { link: string}
);
export interface RoomMembersVariables {
    roomId: string;
}
export type RoomMembers = (
    & { members: ((
        & { __typename: 'RoomMember' }
        & { canKick: boolean}
        & { membership: SharedRoomMembershipStatus}
        & { role: RoomMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    ))[]}
);
export interface RoomMembersPaginatedVariables {
    after?: MaybeInput<string>;
    first?: MaybeInput<number>;
    roomId: string;
}
export type RoomMembersPaginated = (
    & { members: ((
        & { __typename: 'RoomMember' }
        & { badge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { canKick: boolean}
        & { membership: SharedRoomMembershipStatus}
        & { role: RoomMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    ))[]}
);
export interface RoomMembersShortVariables {
    roomId: string;
}
export type RoomMembersShort = (
    & { members: ((
        & { __typename: 'RoomMember' }
        & { user: (
            & { __typename: 'User' }
            & { id: string}
        )}
    ))[]}
);
export interface RoomMembersTinyVariables {
    roomId: string;
}
export type RoomMembersTiny = (
    & { members: ((
        & { __typename: 'RoomMember' }
        & { user: (
            & { __typename: 'User' }
            & { id: string}
            & { name: string}
            & { photo: Maybe<string>}
            & { primaryOrganization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
            )>}
            & { shortname: Maybe<string>}
        )}
    ))[]}
);
export interface RoomOrganizationAdminMembersVariables {
    id: string;
}
export type RoomOrganizationAdminMembers = (
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { adminMembers: ((
                    & { __typename: 'OrganizationJoinedMember' }
                    & { role: OrganizationMemberRole}
                    & { user: (
                        & { __typename: 'User' }
                        & UserShort
                    )}
                ))[]}
                & { id: string}
            )>}
        )>
    )>}
);
export interface RoomPicoVariables {
    id: string;
}
export type RoomPico = (
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomNano
    )>}
);
export interface RoomSearchVariables {
    page?: MaybeInput<number>;
    query?: MaybeInput<string>;
    sort?: MaybeInput<string>;
}
export type RoomSearch = (
    & { items: (
        & { __typename: 'RoomConnection' }
        & { edges: ((
            & { __typename: 'RoomConnectionEdge' }
            & { cursor: string}
            & { node: (
                & { __typename: 'SharedRoom' }
                & Inline<never,(
                    & { __typename: 'SharedRoom' }
                    & { id: string}
                    & { isChannel: boolean}
                    & { kind: SharedRoomKind}
                    & { membersCount: number}
                    & { membership: SharedRoomMembershipStatus}
                    & { organization: Maybe<(
                        & { __typename: 'Organization' }
                        & { id: string}
                        & { name: string}
                        & { photo: Maybe<string>}
                    )>}
                    & { photo: string}
                    & { title: string}
                )>
            )}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { currentPage: number}
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { openEnded: boolean}
            & { pagesCount: number}
        )}
    )}
);
export interface RoomSuperVariables {
    id: string;
}
export type RoomSuper = (
    & { roomSuper: Maybe<(
        & { __typename: 'RoomSuper' }
        & { featured: boolean}
        & { id: string}
        & { listed: boolean}
    )>}
);
export interface RoomTinyVariables {
    id: string;
}
export type RoomTiny = (
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomShort
    )>}
);
export interface RoomWithoutMembersVariables {
    id: string;
}
export type RoomWithoutMembers = (
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomFullWithoutMembers
    )>}
);
export type Settings = (
    & { settings: (
        & { __typename: 'Settings' }
        & SettingsFull
    )}
);
export interface SharedMediaVariables {
    after?: MaybeInput<string>;
    chatId: string;
    first: number;
    mediaTypes: (SharedMediaType)[];
}
export type SharedMedia = (
    & { sharedMedia: (
        & { __typename: 'MessageConnection' }
        & { edges: ((
            & { __typename: 'MessageEdge' }
            & { cursor: string}
            & { node: (
                & { __typename: 'MessageWithChat' }
                & { message: (
                    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                    & Inline<'ServiceMessage' | 'StickerMessage',(
                        & { __typename: 'GeneralMessage' }
                        & { attachments: ((
                            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
                            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                                & { __typename: 'MessageAttachmentFile' }
                                & { fallback: string}
                                & { fileId: string}
                                & { fileMetadata: (
                                    & { __typename: 'FileMetadata' }
                                    & { imageFormat: Maybe<string>}
                                    & { imageHeight: Maybe<number>}
                                    & { imageWidth: Maybe<number>}
                                    & { isImage: boolean}
                                    & { mimeType: Maybe<string>}
                                    & { name: string}
                                    & { size: number}
                                )}
                                & { filePreview: Maybe<string>}
                                & { id: string}
                            )>
                            & Inline<'MessageAttachmentFile' | 'MessageAttachmentPost',(
                                & { __typename: 'MessageRichAttachment' }
                                & { id: string}
                                & { image: Maybe<(
                                    & { __typename: 'Image' }
                                    & { url: string}
                                )>}
                                & { imageFallback: Maybe<(
                                    & { __typename: 'ImageFallback' }
                                    & { photo: string}
                                )>}
                                & { imagePreview: Maybe<string>}
                                & { keyboard: Maybe<(
                                    & { __typename: 'MessageKeyboard' }
                                    & { buttons: (Maybe<((
                                        & { __typename: 'ModernMessageButton' }
                                        & { id: string}
                                        & { title: string}
                                        & { url: Maybe<string>}
                                    ))[]>)[]}
                                )>}
                                & { text: Maybe<string>}
                                & { title: Maybe<string>}
                                & { titleLink: Maybe<string>}
                            )>
                        ))[]}
                        & { date: string}
                        & { fallback: string}
                        & { id: string}
                        & { sender: (
                            & { __typename: 'User' }
                            & { id: string}
                            & { name: string}
                        )}
                    )>
                )}
            )}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { currentPage: number}
            & { hasNextPage: boolean}
        )}
    )}
);
export interface SharedMediaCountersVariables {
    chatId: string;
}
export type SharedMediaCounters = (
    & { counters: (
        & { __typename: 'SharedMediaCounters' }
        & { documents: number}
        & { images: number}
        & { links: number}
        & { videos: number}
    )}
);
export interface StickerPackVariables {
    id: string;
}
export type StickerPack = (
    & { stickerPack: Maybe<(
        & { __typename: 'StickerPack' }
        & StickerPackFragment
    )>}
);
export type SuggestedRooms = (
    & { isDiscoverDone: boolean}
    & { suggestedRooms: ((
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { kind: SharedRoomKind}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
            & { photo: string}
            & { title: string}
        )>
    ))[]}
);
export interface SuperAccountVariables {
    accountId: string;
    viaOrgId?: MaybeInput<boolean>;
}
export type SuperAccount = (
    & { superAccount: (
        & { __typename: 'SuperAccount' }
        & { published: boolean}
        & { createdAt: Maybe<string>}
        & { createdBy: Maybe<(
            & { __typename: 'User' }
            & { id: string}
            & { name: string}
        )>}
        & { features: ((
            & { __typename: 'FeatureFlag' }
            & { id: string}
            & { key: string}
            & { title: string}
        ))[]}
        & { id: string}
        & { members: ((
            & { __typename: 'User' }
            & UserShort
        ))[]}
        & { orgId: string}
        & { state: SuperAccountState}
        & { title: string}
    )}
);
export type SuperAccounts = (
    & { superAccounts: ((
        & { __typename: 'SuperAccount' }
        & { createdAt: Maybe<string>}
        & { id: string}
        & { orgId: string}
        & { state: SuperAccountState}
        & { title: string}
    ))[]}
);
export type SuperAdmins = (
    & { superAdmins: ((
        & { __typename: 'SuperAdmin' }
        & { email: Maybe<string>}
        & { role: SuperAdminRole}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    ))[]}
);
export interface SuperBadgeInRoomVariables {
    roomId: string;
    userId: string;
}
export type SuperBadgeInRoom = (
    & { superBadgeInRoom: Maybe<(
        & { __typename: 'UserBadge' }
        & UserBadge
    )>}
);
export interface UserVariables {
    userId: string;
}
export type User = (
    & { conversation: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'SharedRoom',(
            & { __typename: 'PrivateRoom' }
            & { id: string}
            & { settings: (
                & { __typename: 'RoomUserNotificaionSettings' }
                & { id: string}
                & { mute: Maybe<boolean>}
            )}
        )>
    )>}
    & { user: (
        & { __typename: 'User' }
        & { chatsWithBadge: ((
            & { __typename: 'UserChatWithBadge' }
            & { badge: (
                & { __typename: 'UserBadge' }
                & UserBadge
            )}
            & { chat: (
                & { __typename: 'PrivateRoom' | 'SharedRoom' }
                & RoomShort
            )}
        ))[]}
        & UserFull
    )}
);
export interface UserAvailableRoomsVariables {
    after?: MaybeInput<string>;
    isChannel?: MaybeInput<boolean>;
    limit: number;
}
export type UserAvailableRooms = (
    & { betaUserAvailableRooms: ((
        & { __typename: 'SharedRoom' }
        & Inline<never,(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { kind: SharedRoomKind}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
            & { photo: string}
            & { title: string}
        )>
    ))[]}
);
export interface UserPicoVariables {
    userId: string;
}
export type UserPico = (
    & { user: (
        & { __typename: 'User' }
        & { firstName: string}
        & { id: string}
        & { name: string}
        & { photo: Maybe<string>}
    )}
);
export interface UserStorageVariables {
    keys: (string)[];
    namespace: string;
}
export type UserStorage = (
    & { userStorage: ((
        & { __typename: 'AppStorageValue' }
        & { id: string}
        & { key: string}
        & { value: Maybe<string>}
    ))[]}
);
export interface UsersVariables {
    query: string;
}
export type Users = (
    & { items: ((
        & { __typename: 'User' }
        & { subtitle: Maybe<string>}
        & { id: string}
        & { title: string}
    ))[]}
);

// Mutations
export interface AccountInviteJoinVariables {
    inviteKey: string;
}
export type AccountInviteJoin = (
    & { alphaJoinInvite: string}
);
export interface AddAppToChatVariables {
    appId: string;
    chatId: string;
}
export type AddAppToChat = (
    & { addAppToChat: (
        & { __typename: 'AppChat' }
        & AppChat
    )}
);
export interface AddCommentVariables {
    fileAttachments?: MaybeInput<(FileAttachmentInput)[]>;
    mentions?: MaybeInput<(MentionInput)[]>;
    message?: MaybeInput<string>;
    peerId: string;
    repeatKey?: MaybeInput<string>;
    replyComment?: MaybeInput<string>;
    spans?: MaybeInput<(MessageSpanInput)[]>;
}
export type AddComment = (
    & { betaAddComment: (
        & { __typename: 'CommentEntry' }
        & { id: string}
    )}
);
export interface AddStickerCommentVariables {
    peerId: string;
    repeatKey?: MaybeInput<string>;
    replyComment?: MaybeInput<string>;
    stickerId: string;
}
export type AddStickerComment = (
    & { addStickerComment: (
        & { __typename: 'CommentEntry' }
        & { id: string}
    )}
);
export interface BetaDiscoverSkipVariables {
    selectedTagsIds: (string)[];
}
export type BetaDiscoverSkip = (
    & { betaDiscoverSkip: Maybe<(
        & { __typename: 'DiscoverPage' }
        & { tagGroup: Maybe<(
            & { __typename: 'TagGroup' }
            & { id: string}
        )>}
    )>}
);
export type BetaNextDiscoverReset = (
    & { betaNextDiscoverReset: boolean}
);
export interface BetaSubmitNextDiscoverVariables {
    excudedGroupsIds: (string)[];
    selectedTagsIds: (string)[];
}
export type BetaSubmitNextDiscover = (
    & { betaSubmitNextDiscover: Maybe<(
        & { __typename: 'DiscoverPage' }
        & { tagGroup: Maybe<(
            & { __typename: 'TagGroup' }
            & { id: string}
        )>}
    )>}
);
export interface BuyPremiumChatSubscriptionVariables {
    chatId: string;
}
export type BuyPremiumChatSubscription = (
    & { betaBuyPremiumChatSubscription: (
        & { __typename: 'SharedRoom' }
        & { id: string}
        & { premiumPassIsActive: boolean}
        & { premiumSubscription: Maybe<(
            & { __typename: 'WalletSubscription' }
            & { id: string}
            & { state: WalletSubscriptionState}
        )>}
    )}
);
export interface CommentSetReactionVariables {
    commentId: string;
    reaction: MessageReactionType;
}
export type CommentSetReaction = (
    & { commentReactionAdd: boolean}
);
export interface CommentUnsetReactionVariables {
    commentId: string;
    reaction: MessageReactionType;
}
export type CommentUnsetReaction = (
    & { commentReactionRemove: boolean}
);
export interface CommitCardSetupIntentVariables {
    id: string;
    pmid: string;
}
export type CommitCardSetupIntent = (
    & { cardCommitSetupIntent: (
        & { __typename: 'CreditCard' }
        & { id: string}
    )}
);
export interface ConferenceAnswerVariables {
    answer: string;
    id: string;
    ownPeerId: string;
    peerId: string;
}
export type ConferenceAnswer = (
    & { peerConnectionAnswer: (
        & { __typename: 'Conference' }
        & ConferenceShort
    )}
);
export interface ConferenceCandidateVariables {
    candidate: string;
    id: string;
    ownPeerId: string;
    peerId: string;
}
export type ConferenceCandidate = (
    & { peerConnectionCandidate: (
        & { __typename: 'Conference' }
        & ConferenceShort
    )}
);
export interface ConferenceJoinVariables {
    id: string;
}
export type ConferenceJoin = (
    & { conferenceJoin: (
        & { __typename: 'ConferenceJoinResult' }
        & { conference: (
            & { __typename: 'Conference' }
            & ConferenceShort
        )}
        & { peerId: string}
    )}
);
export interface ConferenceKeepAliveVariables {
    id: string;
    peerId: string;
}
export type ConferenceKeepAlive = (
    & { conferenceKeepAlive: (
        & { __typename: 'Conference' }
        & ConferenceShort
    )}
);
export interface ConferenceLeaveVariables {
    id: string;
    peerId: string;
}
export type ConferenceLeave = (
    & { conferenceLeave: (
        & { __typename: 'Conference' }
        & ConferenceShort
    )}
);
export interface ConferenceOfferVariables {
    id: string;
    offer: string;
    ownPeerId: string;
    peerId: string;
}
export type ConferenceOffer = (
    & { peerConnectionOffer: (
        & { __typename: 'Conference' }
        & ConferenceShort
    )}
);
export interface CreateAppVariables {
    about?: MaybeInput<string>;
    name: string;
    photoRef?: MaybeInput<ImageRefInput>;
    shortname?: MaybeInput<string>;
}
export type CreateApp = (
    & { createApp: (
        & { __typename: 'AppProfile' }
        & AppFull
    )}
);
export interface CreateCardSetupIntentVariables {
    retryKey: string;
}
export type CreateCardSetupIntent = (
    & { cardCreateSetupIntent: (
        & { __typename: 'CardSetupIntent' }
        & { clientSecret: string}
        & { id: string}
    )}
);
export interface CreateDepositIntentVariables {
    amount: number;
    cardId: string;
    retryKey: string;
}
export type CreateDepositIntent = (
    & { cardDepositIntent: (
        & { __typename: 'PaymentIntent' }
        & { clientSecret: string}
        & { id: string}
    )}
);
export interface CreateOrganizationVariables {
    input: CreateOrganizationInput;
}
export type CreateOrganization = (
    & { organization: (
        & { __typename: 'OrganizationProfile' }
        & { id: string}
        & { name: string}
    )}
);
export interface CreateUserProfileAndOrganizationVariables {
    organization: CreateOrganizationInput;
    user: ProfileInput;
}
export type CreateUserProfileAndOrganization = (
    & { alphaCreateUserProfileAndOrganization: (
        & { __typename: 'AlphaSignupData' }
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & { id: string}
            & { name: string}
        )>}
        & { user: Maybe<(
            & { __typename: 'User' }
            & UserFull
        )>}
    )}
);
export interface DebugMailsVariables {
    type: DebugEmailType;
}
export type DebugMails = (
    & { debugSendEmail: Maybe<boolean>}
);
export interface DeleteCommentVariables {
    id: string;
}
export type DeleteComment = (
    & { deleteComment: boolean}
);
export interface DeleteNotificationVariables {
    notificationId: string;
}
export type DeleteNotification = (
    & { deleteNotification: boolean}
);
export interface DeleteOrganizationVariables {
    organizationId: string;
}
export type DeleteOrganization = (
    & { deleteOrganization: boolean}
);
export interface DeleteUserVariables {
    id: string;
}
export type DeleteUser = (
    & { superDeleteUser: boolean}
);
export interface DonateVariables {
    id: string;
}
export type Donate = (
    & { donateToUser: boolean}
);
export interface EditCommentVariables {
    fileAttachments?: MaybeInput<(FileAttachmentInput)[]>;
    id: string;
    mentions?: MaybeInput<(MentionInput)[]>;
    message?: MaybeInput<string>;
    spans?: MaybeInput<(MessageSpanInput)[]>;
}
export type EditComment = (
    & { editComment: boolean}
);
export interface EditMessageVariables {
    fileAttachments?: MaybeInput<(FileAttachmentInput)[]>;
    mentions?: MaybeInput<(MentionInput)[]>;
    message?: MaybeInput<string>;
    messageId: string;
    replyMessages?: MaybeInput<(string)[]>;
    spans?: MaybeInput<(MessageSpanInput)[]>;
}
export type EditMessage = (
    & { editMessage: boolean}
);
export interface FeatureFlagAddVariables {
    key: string;
    title: string;
}
export type FeatureFlagAdd = (
    & { featureFlagAdd: (
        & { __typename: 'FeatureFlag' }
        & { id: string}
        & { key: string}
        & { title: string}
    )}
);
export interface FeatureFlagDisableVariables {
    accountId: string;
    featureId: string;
}
export type FeatureFlagDisable = (
    & { superAccountFeatureRemove: (
        & { __typename: 'SuperAccount' }
        & { features: ((
            & { __typename: 'FeatureFlag' }
            & { id: string}
            & { key: string}
            & { title: string}
        ))[]}
        & { id: string}
    )}
);
export interface FeatureFlagEnableVariables {
    accountId: string;
    featureId: string;
}
export type FeatureFlagEnable = (
    & { superAccountFeatureAdd: (
        & { __typename: 'SuperAccount' }
        & { features: ((
            & { __typename: 'FeatureFlag' }
            & { id: string}
            & { key: string}
            & { title: string}
        ))[]}
        & { id: string}
    )}
);
export interface FeedChannelAddWriterVariables {
    id: string;
    userId: string;
}
export type FeedChannelAddWriter = (
    & { alphaFeedChannelAddEditor: boolean}
);
export interface FeedChannelCreateVariables {
    about?: MaybeInput<string>;
    global?: MaybeInput<boolean>;
    photoRef?: MaybeInput<ImageRefInput>;
    title: string;
}
export type FeedChannelCreate = (
    & { channel: (
        & { __typename: 'FeedChannel' }
        & FeedChannelFull
    )}
);
export interface FeedChannelRemoveWriterVariables {
    id: string;
    userId: string;
}
export type FeedChannelRemoveWriter = (
    & { alphaFeedChannelRemoveEditor: boolean}
);
export interface FeedChannelSubscribeVariables {
    id: string;
}
export type FeedChannelSubscribe = (
    & { alphaFeedChannelSubscribe: boolean}
);
export interface FeedChannelUnsubscribeVariables {
    id: string;
}
export type FeedChannelUnsubscribe = (
    & { alphaFeedChannelUnsubscribe: boolean}
);
export interface FeedChannelUpdateVariables {
    about?: MaybeInput<string>;
    global?: MaybeInput<boolean>;
    id: string;
    photoRef?: MaybeInput<ImageRefInput>;
    title: string;
}
export type FeedChannelUpdate = (
    & { channel: (
        & { __typename: 'FeedChannel' }
        & { id: string}
    )}
);
export interface FeedCreatePostVariables {
    channel: string;
    repeatKey?: MaybeInput<string>;
    slides: (SlideInput)[];
}
export type FeedCreatePost = (
    & { post: (
        & { __typename: 'FeedPost' }
        & FeedItemFull
    )}
);
export interface FeedDeletePostVariables {
    feedItemId: string;
}
export type FeedDeletePost = (
    & { alphaDeleteFeedPost: boolean}
);
export interface FeedEditPostVariables {
    feedItemId: string;
    slides: (SlideInput)[];
}
export type FeedEditPost = (
    & { editFeedPost: (
        & { __typename: 'FeedPost' }
        & FeedItemFull
    )}
);
export interface FeedReactionAddVariables {
    feedItemId: string;
    reaction: MessageReactionType;
}
export type FeedReactionAdd = (
    & { feedReactionAdd: boolean}
);
export interface FeedReactionRemoveVariables {
    feedItemId: string;
    reaction: MessageReactionType;
}
export type FeedReactionRemove = (
    & { feedReactionRemove: boolean}
);
export interface MakeCardDefaultVariables {
    id: string;
}
export type MakeCardDefault = (
    & { cardMakeDefault: (
        & { __typename: 'CreditCard' }
        & { id: string}
        & { isDefault: boolean}
    )}
);
export interface MarkSequenceReadVariables {
    seq: number;
}
export type MarkSequenceRead = (
    & { alphaGlobalRead: string}
);
export interface MatchmakingConnectVariables {
    peerId: string;
    uid: string;
}
export type MatchmakingConnect = (
    & { matchmakingConnect: boolean}
);
export interface MatchmakingProfileFillVariables {
    input: MatchmakingProfileFillInput;
    peerId: string;
}
export type MatchmakingProfileFill = (
    & { matchmakingProfileFill: (
        & { __typename: 'MatchmakingProfile' }
        & MatchmakingProfileFragment
    )}
);
export interface MatchmakingRoomSaveVariables {
    input: MatchmakingRoomInput;
    peerId: string;
}
export type MatchmakingRoomSave = (
    & { matchmakingRoomSave: (
        & { __typename: 'MatchmakingRoom' }
        & MatchmakingRoomFragment
    )}
);
export interface MediaAnswerVariables {
    answer: string;
    id: string;
    peerId: string;
}
export type MediaAnswer = (
    & { mediaStreamAnswer: (
        & { __typename: 'ConferenceMedia' }
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { ice: (string)[]}
            & { id: string}
            & { peerId: Maybe<string>}
            & { sdp: Maybe<string>}
            & { state: MediaStreamState}
        ))[]}
    )}
);
export interface MediaCandidateVariables {
    candidate: string;
    id: string;
    peerId: string;
}
export type MediaCandidate = (
    & { mediaStreamCandidate: (
        & { __typename: 'ConferenceMedia' }
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { ice: (string)[]}
            & { id: string}
            & { peerId: Maybe<string>}
            & { sdp: Maybe<string>}
            & { state: MediaStreamState}
        ))[]}
    )}
);
export interface MediaFailedVariables {
    id: string;
    peerId: string;
}
export type MediaFailed = (
    & { mediaStreamFailed: (
        & { __typename: 'ConferenceMedia' }
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { ice: (string)[]}
            & { id: string}
            & { peerId: Maybe<string>}
            & { sdp: Maybe<string>}
            & { state: MediaStreamState}
        ))[]}
    )}
);
export interface MediaNegotiationNeededVariables {
    id: string;
    peerId: string;
}
export type MediaNegotiationNeeded = (
    & { mediaStreamNegotiationNeeded: (
        & { __typename: 'ConferenceMedia' }
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { ice: (string)[]}
            & { id: string}
            & { peerId: Maybe<string>}
            & { sdp: Maybe<string>}
            & { state: MediaStreamState}
        ))[]}
    )}
);
export interface MediaOfferVariables {
    id: string;
    offer: string;
    peerId: string;
}
export type MediaOffer = (
    & { mediaStreamOffer: (
        & { __typename: 'ConferenceMedia' }
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { ice: (string)[]}
            & { id: string}
            & { peerId: Maybe<string>}
            & { sdp: Maybe<string>}
            & { state: MediaStreamState}
        ))[]}
    )}
);
export interface MessageSetReactionVariables {
    messageId: string;
    reaction: MessageReactionType;
}
export type MessageSetReaction = (
    & { messageReactionAdd: boolean}
);
export interface MessageUnsetReactionVariables {
    messageId: string;
    reaction: MessageReactionType;
}
export type MessageUnsetReaction = (
    & { messageReactionRemove: boolean}
);
export interface MyNotificationCenterMarkSeqReadVariables {
    seq: number;
}
export type MyNotificationCenterMarkSeqRead = (
    & { notificationCenterMarkSeqRead: boolean}
);
export interface OrganizationActivateByInviteVariables {
    inviteKey: string;
}
export type OrganizationActivateByInvite = (
    & { joinAppInvite: string}
);
export interface OrganizationAddMemberVariables {
    organizationId: string;
    userIds?: MaybeInput<(string)[]>;
}
export type OrganizationAddMember = (
    & { alphaOrganizationMemberAdd: ((
        & { __typename: 'OrganizationJoinedMember' }
        & { role: OrganizationMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    ))[]}
);
export interface OrganizationAlterPublishedVariables {
    organizationId: string;
    published: boolean;
}
export type OrganizationAlterPublished = (
    & { alphaAlterPublished: (
        & { __typename: 'Organization' }
        & OrganizationSearch
    )}
);
export interface OrganizationChangeMemberRoleVariables {
    memberId: string;
    newRole: OrganizationMemberRole;
    organizationId: string;
}
export type OrganizationChangeMemberRole = (
    & { alphaOrganizationChangeMemberRole: string}
);
export interface OrganizationCreatePublicInviteVariables {
    expirationDays?: MaybeInput<number>;
    organizationId?: MaybeInput<string>;
}
export type OrganizationCreatePublicInvite = (
    & { alphaOrganizationRefreshInviteLink: (
        & { __typename: 'Invite' }
        & { id: string}
        & { key: string}
        & { ttl: Maybe<string>}
    )}
);
export interface OrganizationMemberRemoveVariables {
    organizationId: string;
    userId: string;
}
export type OrganizationMemberRemove = (
    & { betaOrganizationMemberRemove: (
        & { __typename: 'Organization' }
        & { id: string}
    )}
);
export interface PaymentIntentCancelVariables {
    id: string;
}
export type PaymentIntentCancel = (
    & { paymentCancel: boolean}
);
export interface PaymentIntentCommitVariables {
    id: string;
}
export type PaymentIntentCommit = (
    & { paymentIntentCommit: boolean}
);
export interface PersistEventsVariables {
    did: string;
    events: (Event)[];
    isProd?: MaybeInput<boolean>;
}
export type PersistEvents = (
    & { track: string}
);
export interface PinMessageVariables {
    chatId: string;
    messageId: string;
}
export type PinMessage = (
    & { pinMessage: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomShort
    )}
);
export interface ProfileCreateVariables {
    input: ProfileInput;
    inviteKey?: MaybeInput<string>;
}
export type ProfileCreate = (
    & { profileCreate: (
        & { __typename: 'Profile' }
        & { about: Maybe<string>}
        & { email: Maybe<string>}
        & { firstName: Maybe<string>}
        & { id: string}
        & { lastName: Maybe<string>}
        & { location: Maybe<string>}
        & { phone: Maybe<string>}
        & { photoRef: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { website: Maybe<string>}
    )}
);
export interface ProfileUpdateVariables {
    input: ProfileInput;
    inviteKey?: MaybeInput<string>;
    uid?: MaybeInput<string>;
}
export type ProfileUpdate = (
    & { profileUpdate: (
        & { __typename: 'Profile' }
        & { about: Maybe<string>}
        & { invitedBy: Maybe<(
            & { __typename: 'User' }
            & { id: string}
            & { name: string}
        )>}
        & { joinedAt: Maybe<string>}
        & { primaryOrganizationId: Maybe<string>}
        & { role: Maybe<string>}
        & { email: Maybe<string>}
        & { facebook: Maybe<string>}
        & { firstName: Maybe<string>}
        & { id: string}
        & { instagram: Maybe<string>}
        & { lastName: Maybe<string>}
        & { linkedin: Maybe<string>}
        & { location: Maybe<string>}
        & { phone: Maybe<string>}
        & { photoRef: Maybe<(
            & { __typename: 'ImageRef' }
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { h: number}
                & { w: number}
                & { x: number}
                & { y: number}
            )>}
            & { uuid: string}
        )>}
        & { twitter: Maybe<string>}
        & { website: Maybe<string>}
    )}
);
export interface ReadNotificationVariables {
    notificationId: string;
}
export type ReadNotification = (
    & { readNotification: (
        & { __typename: 'NotificationCenter' }
        & { id: string}
        & { unread: number}
    )}
);
export interface RefreshAppTokenVariables {
    appId: string;
}
export type RefreshAppToken = (
    & { refreshAppToken: (
        & { __typename: 'AppProfile' }
        & AppFull
    )}
);
export interface RegisterPushVariables {
    endpoint: string;
    type: PushType;
}
export type RegisterPush = (
    & { registerPush: string}
);
export interface RegisterWebPushVariables {
    endpoint: string;
}
export type RegisterWebPush = (
    & { registerWebPush: string}
);
export interface RemoveCardVariables {
    id: string;
}
export type RemoveCard = (
    & { cardRemove: (
        & { __typename: 'CreditCard' }
        & { deleted: boolean}
        & { id: string}
    )}
);
export interface ReportContentVariables {
    contentId: string;
    message?: MaybeInput<string>;
    type: string;
}
export type ReportContent = (
    & { reportContent: Maybe<boolean>}
);
export interface ReportOnlineVariables {
    active?: MaybeInput<boolean>;
    platform?: MaybeInput<string>;
}
export type ReportOnline = (
    & { presenceReportOnline: string}
);
export interface RoomAddMembersVariables {
    invites: (RoomInviteInput)[];
    roomId: string;
}
export type RoomAddMembers = (
    & { alphaRoomInvite: ((
        & { __typename: 'RoomMember' }
        & { badge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { canKick: boolean}
        & { membership: SharedRoomMembershipStatus}
        & { role: RoomMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
    ))[]}
);
export interface RoomAlterFeaturedVariables {
    featured: boolean;
    roomId: string;
}
export type RoomAlterFeatured = (
    & { betaRoomAlterFeatured: (
        & { __typename: 'RoomSuper' }
        & { featured: boolean}
        & { id: string}
        & { listed: boolean}
    )}
);
export interface RoomAlterHiddenVariables {
    listed: boolean;
    roomId: string;
}
export type RoomAlterHidden = (
    & { betaRoomAlterListed: (
        & { __typename: 'RoomSuper' }
        & { featured: boolean}
        & { id: string}
        & { listed: boolean}
    )}
);
export interface RoomChangeRoleVariables {
    newRole: RoomMemberRole;
    roomId: string;
    userId: string;
}
export type RoomChangeRole = (
    & { betaRoomChangeRole: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomFull
    )}
);
export interface RoomCreateVariables {
    channel: boolean;
    description?: MaybeInput<string>;
    interval?: MaybeInput<WalletSubscriptionInterval>;
    kind: SharedRoomKind;
    members: (string)[];
    message?: MaybeInput<string>;
    organizationId?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    price?: MaybeInput<number>;
    title?: MaybeInput<string>;
}
export type RoomCreate = (
    & { room: (
        & { __typename: 'SharedRoom' }
        & { id: string}
    )}
);
export interface RoomDeleteMessageVariables {
    messageId: string;
}
export type RoomDeleteMessage = (
    & { betaMessageDelete: boolean}
);
export interface RoomDeleteMessagesVariables {
    mids: (string)[];
}
export type RoomDeleteMessages = (
    & { betaMessageDelete: boolean}
);
export interface RoomDeleteUrlAugmentationVariables {
    messageId: string;
}
export type RoomDeleteUrlAugmentation = (
    & { betaMessageDeleteAugmentation: boolean}
);
export interface RoomJoinVariables {
    roomId: string;
}
export type RoomJoin = (
    & { join: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'SharedRoom',(
            & { __typename: 'PrivateRoom' }
            & { id: string}
        )>
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
        )>
    )}
);
export interface RoomJoinInviteLinkVariables {
    invite: string;
}
export type RoomJoinInviteLink = (
    & { join: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomShort
    )}
);
export interface RoomKickVariables {
    roomId: string;
    userId: string;
}
export type RoomKick = (
    & { betaRoomKick: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomFull
    )}
);
export interface RoomLeaveVariables {
    roomId: string;
}
export type RoomLeave = (
    & { betaRoomLeave: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomFull
    )}
);
export interface RoomReadVariables {
    id: string;
    mid: string;
}
export type RoomRead = (
    & { roomRead: boolean}
);
export interface RoomRenewInviteLinkVariables {
    roomId: string;
}
export type RoomRenewInviteLink = (
    & { link: string}
);
export interface RoomSettingsUpdateVariables {
    roomId: string;
    settings: RoomUserNotificaionSettingsInput;
}
export type RoomSettingsUpdate = (
    & { betaRoomUpdateUserNotificationSettings: (
        & { __typename: 'RoomUserNotificaionSettings' }
        & { id: string}
        & { mute: Maybe<boolean>}
    )}
);
export interface RoomUpdateVariables {
    input: RoomUpdateInput;
    roomId: string;
}
export type RoomUpdate = (
    & { betaRoomUpdate: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'SharedRoom',(
            & { __typename: 'PrivateRoom' }
            & { id: string}
        )>
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { description: Maybe<string>}
            & { id: string}
            & { photo: string}
            & { socialImage: Maybe<string>}
            & { title: string}
        )>
    )}
);
export interface RoomsInviteUserVariables {
    roomIds: (string)[];
    userId: string;
}
export type RoomsInviteUser = (
    & { rooms: ((
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomShort
    ))[]}
);
export interface RoomsJoinVariables {
    roomsIds: (string)[];
}
export type RoomsJoin = (
    & { join: ((
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'SharedRoom',(
            & { __typename: 'PrivateRoom' }
            & { id: string}
        )>
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
        )>
    ))[]}
);
export interface SendMessageVariables {
    chatId: string;
    fileAttachments?: MaybeInput<(FileAttachmentInput)[]>;
    mentions?: MaybeInput<(MentionInput)[]>;
    message?: MaybeInput<string>;
    repeatKey?: MaybeInput<string>;
    replyMessages?: MaybeInput<(string)[]>;
    spans?: MaybeInput<(MessageSpanInput)[]>;
}
export type SendMessage = (
    & { sentMessage: boolean}
);
export interface SendStickerVariables {
    chatId: string;
    repeatKey?: MaybeInput<string>;
    replyMessages?: MaybeInput<(string)[]>;
    stickerId: string;
}
export type SendSticker = (
    & { sendSticker: boolean}
);
export interface SetFeedChannelShortnameVariables {
    id: string;
    shortname: string;
}
export type SetFeedChannelShortname = (
    & { alphaSetFeedChannelShortName: Maybe<string>}
);
export interface SetOrgShortnameVariables {
    organizationId: string;
    shortname: string;
}
export type SetOrgShortname = (
    & { alphaSetOrgShortName: Maybe<string>}
);
export interface SetTypingVariables {
    conversationId: string;
    type: TypingType;
}
export type SetTyping = (
    & { typingSend: string}
);
export interface SetUserShortnameVariables {
    shortname: string;
}
export type SetUserShortname = (
    & { alphaSetUserShortName: Maybe<string>}
);
export interface SettingsUpdateVariables {
    input?: MaybeInput<UpdateSettingsInput>;
}
export type SettingsUpdate = (
    & { updateSettings: (
        & { __typename: 'Settings' }
        & SettingsFull
    )}
);
export interface StickerPackAddToCollectionVariables {
    id: string;
}
export type StickerPackAddToCollection = (
    & { stickerPackAddToCollection: boolean}
);
export interface StickerPackRemoveFromCollectionVariables {
    id: string;
}
export type StickerPackRemoveFromCollection = (
    & { stickerPackRemoveFromCollection: boolean}
);
export interface SubscribeToCommentsVariables {
    peerId: string;
    type: CommentSubscriptionType;
}
export type SubscribeToComments = (
    & { subscribeToComments: boolean}
);
export interface SuperAccountActivateVariables {
    accountId: string;
}
export type SuperAccountActivate = (
    & { superAccountActivate: (
        & { __typename: 'SuperAccount' }
        & { id: string}
        & { state: SuperAccountState}
    )}
);
export interface SuperAccountAddVariables {
    title: string;
}
export type SuperAccountAdd = (
    & { superAccountAdd: (
        & { __typename: 'SuperAccount' }
        & { id: string}
    )}
);
export interface SuperAccountMemberAddVariables {
    accountId: string;
    userId: string;
}
export type SuperAccountMemberAdd = (
    & { superAccountMemberAdd: (
        & { __typename: 'SuperAccount' }
        & { id: string}
        & { members: ((
            & { __typename: 'User' }
            & UserShort
        ))[]}
    )}
);
export interface SuperAccountMemberRemoveVariables {
    accountId: string;
    userId: string;
}
export type SuperAccountMemberRemove = (
    & { superAccountMemberRemove: (
        & { __typename: 'SuperAccount' }
        & { id: string}
        & { members: ((
            & { __typename: 'User' }
            & UserShort
        ))[]}
    )}
);
export interface SuperAccountPendVariables {
    accountId: string;
}
export type SuperAccountPend = (
    & { superAccountPend: (
        & { __typename: 'SuperAccount' }
        & { id: string}
        & { state: SuperAccountState}
    )}
);
export interface SuperAccountRenameVariables {
    accountId: string;
    title: string;
}
export type SuperAccountRename = (
    & { superAccountRename: (
        & { __typename: 'SuperAccount' }
        & { id: string}
        & { title: string}
    )}
);
export interface SuperAccountSuspendVariables {
    accountId: string;
}
export type SuperAccountSuspend = (
    & { superAccountSuspend: (
        & { __typename: 'SuperAccount' }
        & { id: string}
        & { state: SuperAccountState}
    )}
);
export interface SuperAdminAddVariables {
    role: SuperAdminRole;
    userId: string;
}
export type SuperAdminAdd = (
    & { superAdminAdd: string}
);
export interface SuperAdminRemoveVariables {
    userId: string;
}
export type SuperAdminRemove = (
    & { superAdminRemove: string}
);
export interface SuperBadgeCreateToRoomVariables {
    name: string;
    roomId: string;
    userId: string;
}
export type SuperBadgeCreateToRoom = (
    & { superBadgeCreateToRoom: (
        & { __typename: 'UserBadge' }
        & UserBadge
    )}
);
export interface SuperBadgeUnsetToRoomVariables {
    badgeId: string;
    roomId: string;
    userId: string;
}
export type SuperBadgeUnsetToRoom = (
    & { superBadgeUnsetToRoom: boolean}
);
export interface UnSubscribeFromCommentsVariables {
    peerId: string;
}
export type UnSubscribeFromComments = (
    & { unsubscribeFromComments: boolean}
);
export interface UnpinMessageVariables {
    chatId: string;
}
export type UnpinMessage = (
    & { unpinMessage: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomShort
    )}
);
export interface UnsetTypingVariables {
    conversationId: string;
}
export type UnsetTyping = (
    & { typingCancel: string}
);
export interface UpdateAppVariables {
    appId: string;
    input: AppProfileInput;
}
export type UpdateApp = (
    & { updateAppProfile: (
        & { __typename: 'AppProfile' }
        & AppFull
    )}
);
export interface UpdateOrganizationVariables {
    input: UpdateOrganizationProfileInput;
    organizationId?: MaybeInput<string>;
}
export type UpdateOrganization = (
    & { updateOrganizationProfile: (
        & { __typename: 'OrganizationProfile' }
        & OrganizationProfileFull
    )}
);
export interface UpdateWelcomeMessageVariables {
    roomId: string;
    welcomeMessageIsOn: boolean;
    welcomeMessageSender?: MaybeInput<string>;
    welcomeMessageText?: MaybeInput<string>;
}
export type UpdateWelcomeMessage = (
    & { updateWelcomeMessage: boolean}
);
export interface UserStorageSetVariables {
    data: (AppStorageValueInput)[];
    namespace: string;
}
export type UserStorageSet = (
    & { userStorageSet: ((
        & { __typename: 'AppStorageValue' }
        & { id: string}
        & { key: string}
        & { value: Maybe<string>}
    ))[]}
);

// Subscriptions
export interface ChatOnlinesCountWatchVariables {
    chatId: string;
}
export type ChatOnlinesCountWatch = (
    & { chatOnlinesCount: (
        & { __typename: 'ChatOnlineEvent' }
        & { onlineMembers: number}
    )}
);
export interface ChatWatchVariables {
    chatId: string;
    state?: MaybeInput<string>;
}
export type ChatWatch = (
    & { event: (
        & { __typename: 'ChatUpdateSingle' | 'ChatUpdateBatch' }
        & Inline<'ChatUpdateBatch',(
            & { __typename: 'ChatUpdateSingle' }
            & { seq: number}
            & { state: string}
            & { update: (
                & { __typename: 'ChatUpdated' | 'ChatMessageReceived' | 'ChatMessageUpdated' | 'ChatMessageDeleted' | 'ChatLostAccess' }
                & ChatUpdateFragment
            )}
        )>
        & Inline<'ChatUpdateSingle',(
            & { __typename: 'ChatUpdateBatch' }
            & { fromSeq: number}
            & { seq: number}
            & { state: string}
            & { updates: ((
                & { __typename: 'ChatUpdated' | 'ChatMessageReceived' | 'ChatMessageUpdated' | 'ChatMessageDeleted' | 'ChatLostAccess' }
                & ChatUpdateFragment
            ))[]}
        )>
    )}
);
export interface CommentWatchVariables {
    fromState?: MaybeInput<string>;
    peerId: string;
}
export type CommentWatch = (
    & { event: Maybe<(
        & { __typename: 'CommentUpdateSingle' | 'CommentUpdateBatch' }
        & Inline<'CommentUpdateBatch',(
            & { __typename: 'CommentUpdateSingle' }
            & { seq: number}
            & { state: string}
            & { update: (
                & { __typename: 'CommentReceived' | 'CommentUpdated' }
                & CommentUpdateFragment
            )}
        )>
        & Inline<'CommentUpdateSingle',(
            & { __typename: 'CommentUpdateBatch' }
            & { fromSeq: number}
            & { seq: number}
            & { state: string}
            & { updates: ((
                & { __typename: 'CommentReceived' | 'CommentUpdated' }
                & CommentUpdateFragment
            ))[]}
        )>
    )>}
);
export interface ConferenceMediaWatchVariables {
    id: string;
    peerId: string;
}
export type ConferenceMediaWatch = (
    & { media: (
        & { __typename: 'ConferenceMedia' }
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { ice: (string)[]}
            & { id: string}
            & { peerId: Maybe<string>}
            & { sdp: Maybe<string>}
            & { state: MediaStreamState}
        ))[]}
    )}
);
export interface ConferenceWatchVariables {
    id: string;
}
export type ConferenceWatch = (
    & { alphaConferenceWatch: (
        & { __typename: 'Conference' }
        & ConferenceFull
    )}
);
export interface DebugEventsWatchVariables {
    eventsCount: number;
    fromState?: MaybeInput<string>;
    randomDelays: boolean;
    seed: string;
}
export type DebugEventsWatch = (
    & { debugEvents: (
        & { __typename: 'DebugEvent' }
        & { key: string}
        & { seq: number}
    )}
);
export interface DialogsWatchVariables {
    state?: MaybeInput<string>;
}
export type DialogsWatch = (
    & { event: (
        & { __typename: 'DialogUpdateSingle' | 'DialogUpdateBatch' }
        & Inline<'DialogUpdateBatch',(
            & { __typename: 'DialogUpdateSingle' }
            & { seq: number}
            & { state: string}
            & { update: (
                & { __typename: 'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated' }
                & DialogUpdateFragment
            )}
        )>
        & Inline<'DialogUpdateSingle',(
            & { __typename: 'DialogUpdateBatch' }
            & { fromSeq: number}
            & { seq: number}
            & { state: string}
            & { updates: ((
                & { __typename: 'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated' }
                & DialogUpdateFragment
            ))[]}
        )>
    )}
);
export interface FeedUpdatesVariables {
    state?: MaybeInput<string>;
}
export type FeedUpdates = (
    & { event: (
        & { __typename: 'FeedUpdateContainer' }
        & { state: string}
        & { updates: ((
            & { __typename: 'FeedItemReceived' | 'FeedItemUpdated' | 'FeedItemDeleted' | 'FeedRebuildNeeded' }
            & FeedUpdateFragment
        ))[]}
    )}
);
export interface MyNotificationsCenterVariables {
    state?: MaybeInput<string>;
}
export type MyNotificationsCenter = (
    & { event: Maybe<(
        & { __typename: 'NotificationCenterUpdateSingle' | 'NotificationCenterUpdateBatch' }
        & Inline<'NotificationCenterUpdateBatch',(
            & { __typename: 'NotificationCenterUpdateSingle' }
            & { seq: number}
            & { state: string}
            & { update: (
                & { __typename: 'NotificationReceived' | 'NotificationRead' | 'NotificationDeleted' | 'NotificationUpdated' | 'NotificationContentUpdated' }
                & NotificationCenterUpdateFragment
            )}
        )>
        & Inline<'NotificationCenterUpdateSingle',(
            & { __typename: 'NotificationCenterUpdateBatch' }
            & { fromSeq: number}
            & { seq: number}
            & { state: string}
            & { updates: ((
                & { __typename: 'NotificationReceived' | 'NotificationRead' | 'NotificationDeleted' | 'NotificationUpdated' | 'NotificationContentUpdated' }
                & NotificationCenterUpdateFragment
            ))[]}
        )>
    )>}
);
export interface OnlineWatchVariables {
    users: (string)[];
}
export type OnlineWatch = (
    & { alphaSubscribeOnline: (
        & { __typename: 'OnlineEvent' }
        & { timeout: number}
        & { user: (
            & { __typename: 'User' }
            & { id: string}
            & { lastSeen: Maybe<string>}
            & { online: boolean}
        )}
    )}
);
export type SettingsWatch = (
    & { watchSettings: (
        & { __typename: 'Settings' }
        & SettingsFull
    )}
);
export type TypingsWatch = (
    & { typings: (
        & { __typename: 'TypingEvent' }
        & { cancel: boolean}
        & { conversation: (
            & { __typename: 'PrivateRoom' | 'SharedRoom' }
            & Inline<'SharedRoom',(
                & { __typename: 'PrivateRoom' }
                & { id: string}
            )>
            & Inline<'PrivateRoom',(
                & { __typename: 'SharedRoom' }
                & { id: string}
            )>
        )}
        & { type: TypingType}
        & { user: (
            & { __typename: 'User' }
            & { firstName: string}
            & { id: string}
            & { photo: Maybe<string>}
        )}
    )}
);
export interface WalletUpdatesVariables {
    state: string;
}
export type WalletUpdates = (
    & { event: (
        & { __typename: 'WalletUpdateSingle' | 'WalletUpdateBatch' }
        & Inline<'WalletUpdateBatch',(
            & { __typename: 'WalletUpdateSingle' }
            & { state: string}
            & { update: (
                & { __typename: 'WalletUpdateBalance' | 'WalletUpdateTransactionSuccess' | 'WalletUpdateTransactionCanceled' | 'WalletUpdateTransactionPending' | 'WalletUpdatePaymentStatus' }
                & WalletUpdateFragment
            )}
        )>
        & Inline<'WalletUpdateSingle',(
            & { __typename: 'WalletUpdateBatch' }
            & { state: string}
            & { updates: ((
                & { __typename: 'WalletUpdateBalance' | 'WalletUpdateTransactionSuccess' | 'WalletUpdateTransactionCanceled' | 'WalletUpdateTransactionPending' | 'WalletUpdatePaymentStatus' }
                & WalletUpdateFragment
            ))[]}
        )>
    )}
);