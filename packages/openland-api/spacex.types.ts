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
    & { id: string}
    & { name: string}
    & { shortname: Maybe<string>}
    & { photoRef: Maybe<(
        & { __typename: 'ImageRef' }
        & { uuid: string}
        & { crop: Maybe<(
            & { __typename: 'ImageCrop' }
            & { x: number}
            & { y: number}
            & { w: number}
            & { h: number}
        )>}
    )>}
    & { about: Maybe<string>}
    & { token: (
        & { __typename: 'AppToken' }
        & { salt: string}
    )}
);
export type OrganizationShort = (
    & { __typename: 'Organization' }
    & { id: string}
    & { name: string}
    & { photo: Maybe<string>}
    & { shortname: Maybe<string>}
    & { about: Maybe<string>}
    & { isCommunity: boolean}
    & { membersCount: number}
);
export type UserShort = (
    & { __typename: 'User' }
    & { id: string}
    & { name: string}
    & { firstName: string}
    & { lastName: Maybe<string>}
    & { photo: Maybe<string>}
    & { email: Maybe<string>}
    & { online: boolean}
    & { lastSeen: Maybe<string>}
    & { isYou: boolean}
    & { isBot: boolean}
    & { shortname: Maybe<string>}
    & { primaryOrganization: Maybe<(
        & { __typename: 'Organization' }
        & OrganizationShort
    )>}
);
export type UserBadge = (
    & { __typename: 'UserBadge' }
    & { id: string}
    & { name: string}
    & { verified: boolean}
);
export type UserForMention = (
    & { __typename: 'User' }
    & { isYou: boolean}
    & { id: string}
    & { name: string}
    & { photo: Maybe<string>}
    & { shortname: Maybe<string>}
    & { isBot: boolean}
    & { primaryOrganization: Maybe<(
        & { __typename: 'Organization' }
        & { id: string}
        & { name: string}
    )>}
);
export type RoomSharedNano = (
    & { __typename: 'SharedRoom' }
    & { id: string}
    & { kind: SharedRoomKind}
    & { isChannel: boolean}
    & { title: string}
    & { roomPhoto: string}
    & { membersCount: number}
    & { settings: (
        & { __typename: 'RoomUserNotificaionSettings' }
        & { id: string}
        & { mute: Maybe<boolean>}
    )}
);
export type RoomNano = (
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
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
    )>
    & Inline<'PrivateRoom',(
        & { __typename: 'SharedRoom' }
        & RoomSharedNano
    )>
);
export type SpanFragment = (
    & { __typename: 'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention' }
    & { offset: number}
    & { length: number}
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
    & { id: string}
    & { date: string}
    & { message: Maybe<string>}
    & { sender: (
        & { __typename: 'User' }
        & UserShort
    )}
    & { senderBadge: Maybe<(
        & { __typename: 'UserBadge' }
        & UserBadge
    )>}
    & { fallback: string}
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
        & { id: string}
        & { overrideName: Maybe<string>}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
        & { commentsCount: number}
        & { edited: boolean}
        & { attachments: ((
            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
            & { fallback: string}
            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                & { __typename: 'MessageAttachmentFile' }
                & { id: string}
                & { fileId: string}
                & { fileMetadata: (
                    & { __typename: 'FileMetadata' }
                    & { name: string}
                    & { mimeType: Maybe<string>}
                    & { size: number}
                    & { isImage: boolean}
                    & { imageWidth: Maybe<number>}
                    & { imageHeight: Maybe<number>}
                    & { imageFormat: Maybe<string>}
                )}
                & { filePreview: Maybe<string>}
            )>
            & Inline<'MessageAttachmentFile' | 'MessageAttachmentPost',(
                & { __typename: 'MessageRichAttachment' }
                & { id: string}
                & { title: Maybe<string>}
                & { subTitle: Maybe<string>}
                & { titleLink: Maybe<string>}
                & { titleLinkHostname: Maybe<string>}
                & { text: Maybe<string>}
                & { icon: Maybe<(
                    & { __typename: 'Image' }
                    & { url: string}
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { name: string}
                        & { mimeType: Maybe<string>}
                        & { size: number}
                        & { isImage: boolean}
                        & { imageWidth: Maybe<number>}
                        & { imageHeight: Maybe<number>}
                        & { imageFormat: Maybe<string>}
                    )>}
                )>}
                & { image: Maybe<(
                    & { __typename: 'Image' }
                    & { url: string}
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { name: string}
                        & { mimeType: Maybe<string>}
                        & { size: number}
                        & { isImage: boolean}
                        & { imageWidth: Maybe<number>}
                        & { imageHeight: Maybe<number>}
                        & { imageFormat: Maybe<string>}
                    )>}
                )>}
                & { keyboard: Maybe<(
                    & { __typename: 'MessageKeyboard' }
                    & { buttons: (Maybe<((
                        & { __typename: 'ModernMessageButton' }
                        & { id: string}
                        & { title: string}
                        & { style: ModernMessageButtonStyle}
                        & { url: Maybe<string>}
                    ))[]>)[]}
                )>}
                & { imageFallback: Maybe<(
                    & { __typename: 'ImageFallback' }
                    & { photo: string}
                    & { text: string}
                )>}
                & { fallback: string}
            )>
        ))[]}
    )>
    & Inline<'GeneralMessage' | 'ServiceMessage',(
        & { __typename: 'StickerMessage' }
        & { id: string}
        & { date: string}
        & { overrideName: Maybe<string>}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
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
        & { reactions: ((
            & { __typename: 'ModernMessageReaction' }
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
            & { reaction: MessageReactionType}
        ))[]}
        & { sticker: (
            & { __typename: 'ImageSticker' }
            & Inline<never,(
                & { __typename: 'ImageSticker' }
                & { id: string}
                & { pack: (
                    & { __typename: 'StickerPack' }
                    & Inline<never,(
                        & { __typename: 'StickerPack' }
                        & { id: string}
                        & { title: string}
                    )>
                )}
                & { image: (
                    & { __typename: 'ImageRef' }
                    & Inline<never,(
                        & { __typename: 'ImageRef' }
                        & { uuid: string}
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
        & { pack: (
            & { __typename: 'StickerPack' }
            & { id: string}
            & { title: string}
        )}
        & { image: (
            & { __typename: 'ImageRef' }
            & { uuid: string}
        )}
    )>
);
export type UserTiny = (
    & { __typename: 'User' }
    & { id: string}
    & { isYou: boolean}
    & { name: string}
    & { firstName: string}
    & { lastName: Maybe<string>}
    & { photo: Maybe<string>}
    & { shortname: Maybe<string>}
    & { primaryOrganization: Maybe<(
        & { __typename: 'Organization' }
        & OrganizationShort
    )>}
);
export type FullMessage = (
    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
    & { id: string}
    & { date: string}
    & { sender: (
        & { __typename: 'User' }
        & UserShort
    )}
    & { senderBadge: Maybe<(
        & { __typename: 'UserBadge' }
        & UserBadge
    )>}
    & { message: Maybe<string>}
    & { fallback: string}
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
        & { id: string}
        & { overrideName: Maybe<string>}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
        & { edited: boolean}
        & { commentsCount: number}
        & { attachments: ((
            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
            & { fallback: string}
            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                & { __typename: 'MessageAttachmentFile' }
                & { id: string}
                & { fileId: string}
                & { fileMetadata: (
                    & { __typename: 'FileMetadata' }
                    & { name: string}
                    & { mimeType: Maybe<string>}
                    & { size: number}
                    & { isImage: boolean}
                    & { imageWidth: Maybe<number>}
                    & { imageHeight: Maybe<number>}
                    & { imageFormat: Maybe<string>}
                )}
                & { filePreview: Maybe<string>}
            )>
            & Inline<'MessageAttachmentFile' | 'MessageAttachmentPost',(
                & { __typename: 'MessageRichAttachment' }
                & { id: string}
                & { title: Maybe<string>}
                & { subTitle: Maybe<string>}
                & { titleLink: Maybe<string>}
                & { titleLinkHostname: Maybe<string>}
                & { text: Maybe<string>}
                & { icon: Maybe<(
                    & { __typename: 'Image' }
                    & { url: string}
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { name: string}
                        & { mimeType: Maybe<string>}
                        & { size: number}
                        & { isImage: boolean}
                        & { imageWidth: Maybe<number>}
                        & { imageHeight: Maybe<number>}
                        & { imageFormat: Maybe<string>}
                    )>}
                )>}
                & { image: Maybe<(
                    & { __typename: 'Image' }
                    & { url: string}
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { name: string}
                        & { mimeType: Maybe<string>}
                        & { size: number}
                        & { isImage: boolean}
                        & { imageWidth: Maybe<number>}
                        & { imageHeight: Maybe<number>}
                        & { imageFormat: Maybe<string>}
                    )>}
                )>}
                & { socialImage: Maybe<(
                    & { __typename: 'Image' }
                    & { url: string}
                    & { metadata: Maybe<(
                        & { __typename: 'FileMetadata' }
                        & { name: string}
                        & { mimeType: Maybe<string>}
                        & { size: number}
                        & { isImage: boolean}
                        & { imageWidth: Maybe<number>}
                        & { imageHeight: Maybe<number>}
                        & { imageFormat: Maybe<string>}
                    )>}
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
                        & { title: string}
                        & { style: ModernMessageButtonStyle}
                        & { url: Maybe<string>}
                    ))[]>)[]}
                )>}
                & { fallback: string}
            )>
        ))[]}
        & { quotedMessages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & QuotedMessage
        ))[]}
        & { reactions: ((
            & { __typename: 'ModernMessageReaction' }
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
            & { reaction: MessageReactionType}
        ))[]}
    )>
    & Inline<'GeneralMessage' | 'ServiceMessage',(
        & { __typename: 'StickerMessage' }
        & { id: string}
        & { overrideName: Maybe<string>}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
        & { date: string}
        & { commentsCount: number}
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
        & { quotedMessages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & QuotedMessage
        ))[]}
        & { reactions: ((
            & { __typename: 'ModernMessageReaction' }
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
            & { reaction: MessageReactionType}
        ))[]}
        & { sticker: (
            & { __typename: 'ImageSticker' }
            & StickerFragment
        )}
    )>
    & Inline<'GeneralMessage' | 'StickerMessage',(
        & { __typename: 'ServiceMessage' }
        & { id: string}
        & { overrideName: Maybe<string>}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
        & { serviceMetadata: Maybe<(
            & { __typename: 'InviteServiceMetadata' | 'KickServiceMetadata' | 'TitleChangeServiceMetadata' | 'PhotoChangeServiceMetadata' | 'PostRespondServiceMetadata' }
            & Inline<'KickServiceMetadata' | 'TitleChangeServiceMetadata' | 'PhotoChangeServiceMetadata' | 'PostRespondServiceMetadata',(
                & { __typename: 'InviteServiceMetadata' }
                & { users: Maybe<((
                    & { __typename: 'User' }
                    & UserTiny
                ))[]>}
                & { invitedBy: (
                    & { __typename: 'User' }
                    & UserTiny
                )}
            )>
            & Inline<'InviteServiceMetadata' | 'TitleChangeServiceMetadata' | 'PhotoChangeServiceMetadata' | 'PostRespondServiceMetadata',(
                & { __typename: 'KickServiceMetadata' }
                & { user: (
                    & { __typename: 'User' }
                    & UserTiny
                )}
                & { kickedBy: (
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
    & { chatCreated: boolean}
    & { user: (
        & { __typename: 'User' }
        & { id: string}
        & { isYou: boolean}
        & { name: string}
        & { photo: Maybe<string>}
        & { isBot: boolean}
        & { primaryOrganization: Maybe<(
            & { __typename: 'Organization' }
            & { id: string}
            & { name: string}
        )>}
    )}
    & { answers: ((
        & { __typename: 'TextMatchmakingAnswer' | 'MultiselectMatchmakingAnswer' }
        & Inline<'MultiselectMatchmakingAnswer',(
            & { __typename: 'TextMatchmakingAnswer' }
            & { question: (
                & { __typename: 'TextMatchmakingQuestion' }
                & { id: string}
                & { title: string}
                & { subtitle: string}
            )}
            & { answer: string}
        )>
        & Inline<'TextMatchmakingAnswer',(
            & { __typename: 'MultiselectMatchmakingAnswer' }
            & { question: (
                & { __typename: 'MultiselectMatchmakingQuestion' }
                & { id: string}
                & { title: string}
                & { subtitle: string}
            )}
            & { tags: (string)[]}
        )>
    ))[]}
);
export type MatchmakingRoomFragment = (
    & { __typename: 'MatchmakingRoom' }
    & { enabled: boolean}
    & { questions: Maybe<((
        & { __typename: 'TextMatchmakingQuestion' | 'MultiselectMatchmakingQuestion' }
        & Inline<'MultiselectMatchmakingQuestion',(
            & { __typename: 'TextMatchmakingQuestion' }
            & { id: string}
            & { title: string}
            & { subtitle: string}
        )>
        & Inline<'TextMatchmakingQuestion',(
            & { __typename: 'MultiselectMatchmakingQuestion' }
            & { id: string}
            & { title: string}
            & { subtitle: string}
            & { tags: (string)[]}
        )>
    ))[]>}
    & { myProfile: Maybe<(
        & { __typename: 'MatchmakingProfile' }
        & MatchmakingProfileFragment
    )>}
    & { profiles: Maybe<((
        & { __typename: 'MatchmakingProfile' }
        & MatchmakingProfileFragment
    ))[]>}
);
export type RoomShort = (
    & { __typename: 'PrivateRoom' | 'SharedRoom' }
    & Inline<'SharedRoom',(
        & { __typename: 'PrivateRoom' }
        & { id: string}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
    )>
    & Inline<'PrivateRoom',(
        & { __typename: 'SharedRoom' }
        & { id: string}
        & { kind: SharedRoomKind}
        & { isChannel: boolean}
        & { title: string}
        & { photo: string}
        & { membership: SharedRoomMembershipStatus}
        & { role: RoomMemberRole}
        & { canEdit: boolean}
        & { canSendMessage: boolean}
        & { membersCount: number}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { matchmaking: Maybe<(
            & { __typename: 'MatchmakingRoom' }
            & MatchmakingRoomFragment
        )>}
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & OrganizationShort
        )>}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
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
    & { id: string}
    & { deleted: boolean}
    & { comment: (
        & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
        & { id: string}
        & FullMessage
    )}
    & { parentComment: Maybe<(
        & { __typename: 'CommentEntry' }
        & { comment: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & { id: string}
            & { message: Maybe<string>}
        )}
        & { id: string}
    )>}
    & { childComments: ((
        & { __typename: 'CommentEntry' }
        & { id: string}
    ))[]}
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
    & { id: string}
    & { superAccountId: string}
    & { name: string}
    & { photo: Maybe<string>}
    & { isMine: boolean}
    & { about: Maybe<string>}
    & { status: string}
    & { featured: boolean}
    & { membersCount: number}
    & { roomsCount: number}
);
export type ConferenceFull = (
    & { __typename: 'Conference' }
    & { id: string}
    & { startTime: Maybe<string>}
    & { peers: ((
        & { __typename: 'ConferencePeer' }
        & { id: string}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { connection: Maybe<(
            & { __typename: 'ConferencePeerConnection' }
            & { state: ConferencePeerConnectionState}
            & { sdp: Maybe<string>}
            & { ice: (string)[]}
        )>}
    ))[]}
    & { iceServers: ((
        & { __typename: 'ICEServer' }
        & { urls: (string)[]}
        & { username: Maybe<string>}
        & { credential: Maybe<string>}
    ))[]}
);
export type ConferenceShort = (
    & { __typename: 'Conference' }
    & { id: string}
    & { startTime: Maybe<string>}
    & { iceServers: ((
        & { __typename: 'ICEServer' }
        & { urls: (string)[]}
        & { username: Maybe<string>}
        & { credential: Maybe<string>}
    ))[]}
);
export type DaialogListMessage = (
    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
    & { id: string}
    & { date: string}
    & { sender: (
        & { __typename: 'User' }
        & { id: string}
        & { name: string}
        & { firstName: string}
    )}
    & { senderBadge: Maybe<(
        & { __typename: 'UserBadge' }
        & UserBadge
    )>}
    & { message: Maybe<string>}
    & { fallback: string}
    & Inline<'ServiceMessage' | 'StickerMessage',(
        & { __typename: 'GeneralMessage' }
        & { id: string}
        & { overrideName: Maybe<string>}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
        & { attachments: ((
            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
            & { id: string}
            & { fallback: string}
            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                & { __typename: 'MessageAttachmentFile' }
                & { id: string}
                & { fileId: string}
                & { fileMetadata: (
                    & { __typename: 'FileMetadata' }
                    & { isImage: boolean}
                    & { imageFormat: Maybe<string>}
                )}
            )>
        ))[]}
        & { quotedMessages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & { id: string}
        ))[]}
    )>
);
export type TinyMessage = (
    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
    & { id: string}
    & { date: string}
    & { sender: (
        & { __typename: 'User' }
        & UserTiny
    )}
    & { senderBadge: Maybe<(
        & { __typename: 'UserBadge' }
        & UserBadge
    )>}
    & { message: Maybe<string>}
    & { fallback: string}
    & Inline<'ServiceMessage' | 'StickerMessage',(
        & { __typename: 'GeneralMessage' }
        & { id: string}
        & { overrideName: Maybe<string>}
        & { overrideAvatar: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
        & { isMentioned: boolean}
        & { commentsCount: number}
        & { attachments: ((
            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
            & { id: string}
            & { fallback: string}
            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                & { __typename: 'MessageAttachmentFile' }
                & { id: string}
                & { fileId: string}
                & { fileMetadata: (
                    & { __typename: 'FileMetadata' }
                    & { isImage: boolean}
                    & { imageFormat: Maybe<string>}
                )}
                & { filePreview: Maybe<string>}
            )>
        ))[]}
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
        & { cid: string}
        & { unread: number}
        & { globalUnread: number}
        & { message: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )}
        & { haveMention: boolean}
        & { silent: (
            & { __typename: 'SilentMessageInfo' }
            & { mobile: boolean}
            & { desktop: boolean}
        )}
        & { showNotification: (
            & { __typename: 'SilentMessageInfo' }
            & { mobile: boolean}
            & { desktop: boolean}
        )}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageDeleted' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated',(
        & { __typename: 'DialogMessageUpdated' }
        & { cid: string}
        & { message: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )}
        & { haveMention: boolean}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageRead' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated',(
        & { __typename: 'DialogMessageDeleted' }
        & { cid: string}
        & { message: (
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )}
        & { prevMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )>}
        & { unread: number}
        & { globalUnread: number}
        & { haveMention: boolean}
    )>
    & Inline<'DialogMessageReceived' | 'DialogMessageUpdated' | 'DialogMessageDeleted' | 'DialogTitleUpdated' | 'DialogDeleted' | 'DialogPhotoUpdated' | 'DialogMuteChanged' | 'DialogMentionedChanged' | 'DialogBump' | 'DialogPeerUpdated',(
        & { __typename: 'DialogMessageRead' }
        & { cid: string}
        & { mid: Maybe<string>}
        & { unread: number}
        & { globalUnread: number}
        & { haveMention: boolean}
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
                & { title: string}
                & { photo: string}
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
        & { unread: number}
        & { topMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & TinyMessage
        )>}
        & { haveMention: boolean}
    )>
);
export type FeedChannelFull = (
    & { __typename: 'FeedChannel' }
    & { id: string}
    & { title: string}
    & { about: Maybe<string>}
    & { photo: Maybe<string>}
    & { subscribed: boolean}
    & { myRole: FeedChannelSubscriberRole}
    & { subscribersCount: number}
    & { shortname: Maybe<string>}
    & { isGlobal: boolean}
    & { socialImage: Maybe<string>}
    & { postsCount: number}
);
export type FeedPostAuthorFragment = (
    & { __typename: 'User' }
    & Inline<never,(
        & { __typename: 'User' }
        & UserShort
    )>
);
export type FeedPostSourceFragment = (
    & { __typename: 'FeedChannel' }
    & Inline<never,(
        & { __typename: 'FeedChannel' }
        & FeedChannelFull
    )>
);
export type SlideFragment = (
    & { __typename: 'TextSlide' }
    & Inline<never,(
        & { __typename: 'TextSlide' }
        & { id: string}
        & { text: string}
        & { spans: ((
            & { __typename: 'MessageSpanAllMention' | 'MessageSpanBold' | 'MessageSpanCodeBlock' | 'MessageSpanDate' | 'MessageSpanInlineCode' | 'MessageSpanInsane' | 'MessageSpanIrony' | 'MessageSpanItalic' | 'MessageSpanLink' | 'MessageSpanLoud' | 'MessageSpanMultiUserMention' | 'MessageSpanOrganizationMention' | 'MessageSpanRoomMention' | 'MessageSpanRotating' | 'MessageSpanUserMention' }
            & SpanFragment
        ))[]}
        & { cover: Maybe<(
            & { __typename: 'Image' }
            & { url: string}
            & { metadata: Maybe<(
                & { __typename: 'FileMetadata' }
                & { name: string}
                & { mimeType: Maybe<string>}
                & { size: number}
                & { isImage: boolean}
                & { imageWidth: Maybe<number>}
                & { imageHeight: Maybe<number>}
                & { imageFormat: Maybe<string>}
            )>}
        )>}
        & { coverAlign: Maybe<SlideCoverAlign>}
        & { attachments: ((
            & { __typename: 'User' | 'SharedRoom' | 'Organization' }
            & Inline<'SharedRoom' | 'Organization',(
                & { __typename: 'User' }
                & UserShort
            )>
            & Inline<'User' | 'Organization',(
                & { __typename: 'SharedRoom' }
                & { id: string}
                & { kind: SharedRoomKind}
                & { title: string}
                & { roomPhoto: string}
                & { membersCount: number}
                & { membership: SharedRoomMembershipStatus}
                & { canSendMessage: boolean}
                & { organization: Maybe<(
                    & { __typename: 'Organization' }
                    & { id: string}
                    & { name: string}
                    & { photo: Maybe<string>}
                )>}
            )>
            & Inline<'User' | 'SharedRoom',(
                & { __typename: 'Organization' }
                & OrganizationShort
            )>
        ))[]}
    )>
);
export type FeedItemFull = (
    & { __typename: 'FeedPost' }
    & Inline<never,(
        & { __typename: 'FeedPost' }
        & { id: string}
        & { date: string}
        & { author: (
            & { __typename: 'User' }
            & FeedPostAuthorFragment
        )}
        & { source: Maybe<(
            & { __typename: 'FeedChannel' }
            & FeedPostSourceFragment
        )>}
        & { edited: boolean}
        & { canEdit: boolean}
        & { commentsCount: number}
        & { message: Maybe<string>}
        & { fallback: string}
        & { reactions: ((
            & { __typename: 'ModernMessageReaction' }
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
            & { reaction: MessageReactionType}
        ))[]}
        & { slides: ((
            & { __typename: 'TextSlide' }
            & SlideFragment
        ))[]}
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
            & { items: ((
                & { __typename: 'FeedPost' }
                & FeedItemFull
            ))[]}
            & { cursor: Maybe<string>}
        )}
    )>
);
export type NotificationFragment = (
    & { __typename: 'Notification' }
    & { id: string}
    & { text: Maybe<string>}
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
                        & { message: (
                            & { __typename: 'GeneralMessage' }
                            & Inline<never,(
                                & { __typename: 'GeneralMessage' }
                                & { id: string}
                                & { fallback: string}
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
                        & { chat: (
                            & { __typename: 'PrivateRoom' | 'SharedRoom' }
                            & RoomNano
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
            & { profiles: ((
                & { __typename: 'MatchmakingProfile' }
                & MatchmakingProfileFragment
            ))[]}
        )>
    ))[]}
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
                & { peer: (
                    & { __typename: 'CommentsPeer' }
                    & { peerRoot: (
                        & { __typename: 'CommentPeerRootMessage' | 'CommentPeerRootFeedItem' }
                        & Inline<'CommentPeerRootFeedItem',(
                            & { __typename: 'CommentPeerRootMessage' }
                            & { message: (
                                & { __typename: 'GeneralMessage' }
                                & Inline<never,(
                                    & { __typename: 'GeneralMessage' }
                                    & { id: string}
                                    & { fallback: string}
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
                            & { chat: (
                                & { __typename: 'PrivateRoom' | 'SharedRoom' }
                                & RoomNano
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
                    & { id: string}
                    & { subscription: Maybe<(
                        & { __typename: 'CommentSubscription' }
                        & { type: Maybe<CommentSubscriptionType>}
                    )>}
                )}
                & { comment: Maybe<(
                    & { __typename: 'CommentEntry' }
                    & CommentEntryFragment
                )>}
            )>
        )}
    )>
);
export type UserFull = (
    & { __typename: 'User' }
    & { id: string}
    & { name: string}
    & { firstName: string}
    & { lastName: Maybe<string>}
    & { photo: Maybe<string>}
    & { phone: Maybe<string>}
    & { email: Maybe<string>}
    & { website: Maybe<string>}
    & { about: Maybe<string>}
    & { location: Maybe<string>}
    & { isBot: boolean}
    & { isYou: boolean}
    & { online: boolean}
    & { lastSeen: Maybe<string>}
    & { linkedin: Maybe<string>}
    & { instagram: Maybe<string>}
    & { twitter: Maybe<string>}
    & { facebook: Maybe<string>}
    & { shortname: Maybe<string>}
    & { audienceSize: number}
    & { primaryOrganization: Maybe<(
        & { __typename: 'Organization' }
        & OrganizationShort
    )>}
);
export type OrganizationFull = (
    & { __typename: 'Organization' }
    & { id: string}
    & { superAccountId: string}
    & { isMine: boolean}
    & { isPrivate: boolean}
    & { isOwner: boolean}
    & { isAdmin: boolean}
    & { featured: boolean}
    & { isCommunity: boolean}
    & { name: string}
    & { photo: Maybe<string>}
    & { shortname: Maybe<string>}
    & { website: Maybe<string>}
    & { about: Maybe<string>}
    & { twitter: Maybe<string>}
    & { facebook: Maybe<string>}
    & { linkedin: Maybe<string>}
    & { instagram: Maybe<string>}
    & { membersCount: number}
    & { members: ((
        & { __typename: 'OrganizationJoinedMember' }
        & { role: OrganizationMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserFull
        )}
    ))[]}
    & { requests: ((
        & { __typename: 'OrganizationRequestedMember' }
        & { role: OrganizationMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserFull
        )}
    ))[]}
);
export type OrganizationMedium = (
    & { __typename: 'Organization' }
    & { id: string}
    & { name: string}
    & { photo: Maybe<string>}
    & { isMine: boolean}
    & { membersCount: number}
    & { shortname: Maybe<string>}
    & { about: Maybe<string>}
    & { isOwner: boolean}
    & { isAdmin: boolean}
    & { isCommunity: boolean}
);
export type OrganizationProfileFull = (
    & { __typename: 'OrganizationProfile' }
    & { id: string}
    & { name: string}
    & { photoRef: Maybe<(
        & { __typename: 'ImageRef' }
        & { uuid: string}
        & { crop: Maybe<(
            & { __typename: 'ImageCrop' }
            & { x: number}
            & { y: number}
            & { w: number}
            & { h: number}
        )>}
    )>}
    & { website: Maybe<string>}
    & { websiteTitle: Maybe<string>}
    & { about: Maybe<string>}
    & { twitter: Maybe<string>}
    & { facebook: Maybe<string>}
    & { linkedin: Maybe<string>}
    & { instagram: Maybe<string>}
    & { shortname: Maybe<string>}
    & { private: boolean}
    & { featured: boolean}
    & { published: boolean}
    & { editorial: boolean}
);
export type OrganizationSearch = (
    & { __typename: 'Organization' }
    & { id: string}
    & { superAccountId: string}
    & { name: string}
    & { photo: Maybe<string>}
    & { isMine: boolean}
    & { about: Maybe<string>}
    & { status: string}
    & { membersCount: number}
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
);
export type OrganizationWithoutMembersFragment = (
    & { __typename: 'Organization' }
    & { id: string}
    & { superAccountId: string}
    & { isMine: boolean}
    & { isPrivate: boolean}
    & { isOwner: boolean}
    & { isAdmin: boolean}
    & { featured: boolean}
    & { isCommunity: boolean}
    & { name: string}
    & { photo: Maybe<string>}
    & { shortname: Maybe<string>}
    & { website: Maybe<string>}
    & { about: Maybe<string>}
    & { twitter: Maybe<string>}
    & { facebook: Maybe<string>}
    & { linkedin: Maybe<string>}
    & { instagram: Maybe<string>}
    & { membersCount: number}
    & { requests: ((
        & { __typename: 'OrganizationRequestedMember' }
        & { role: OrganizationMemberRole}
        & { user: (
            & { __typename: 'User' }
            & UserFull
        )}
    ))[]}
    & { roomsCount: number}
);
export type PlatformNotificationSettingsFull = (
    & { __typename: 'PlatformNotificationSettings' }
    & { direct: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
    & { secretChat: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
    & { organizationChat: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
    & { communityChat: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
    & { comments: (
        & { __typename: 'ChatTypeNotificationSettings' }
        & { showNotification: boolean}
        & { sound: boolean}
    )}
    & { notificationPreview: NotificationPreview}
);
export type RoomFull = (
    & { __typename: 'PrivateRoom' | 'SharedRoom' }
    & Inline<'SharedRoom',(
        & { __typename: 'PrivateRoom' }
        & { id: string}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
    )>
    & Inline<'PrivateRoom',(
        & { __typename: 'SharedRoom' }
        & { id: string}
        & { kind: SharedRoomKind}
        & { isChannel: boolean}
        & { title: string}
        & { photo: string}
        & { socialImage: Maybe<string>}
        & { description: Maybe<string>}
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & OrganizationMedium
        )>}
        & { membership: SharedRoomMembershipStatus}
        & { role: RoomMemberRole}
        & { membersCount: number}
        & { featuredMembersCount: number}
        & { onlineMembersCount: number}
        & { previewMembers: ((
            & { __typename: 'User' }
            & { id: string}
            & { photo: Maybe<string>}
            & { name: string}
        ))[]}
        & { members: ((
            & { __typename: 'RoomMember' }
            & { role: RoomMemberRole}
            & { membership: SharedRoomMembershipStatus}
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
            & { canKick: boolean}
            & { badge: Maybe<(
                & { __typename: 'UserBadge' }
                & UserBadge
            )>}
        ))[]}
        & { requests: Maybe<((
            & { __typename: 'RoomMember' }
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]>}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { canEdit: boolean}
        & { canSendMessage: boolean}
        & { welcomeMessage: Maybe<(
            & { __typename: 'WelcomeMessage' }
            & { isOn: boolean}
            & { sender: Maybe<(
                & { __typename: 'User' }
                & { id: string}
                & { name: string}
            )>}
            & { message: Maybe<string>}
        )>}
        & { matchmaking: Maybe<(
            & { __typename: 'MatchmakingRoom' }
            & MatchmakingRoomFragment
        )>}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
        & { isPremium: boolean}
        & { premiumPassIsActive: boolean}
        & { premiumSubscription: Maybe<(
            & { __typename: 'WalletSubscription' }
            & { id: string}
            & { state: WalletSubscriptionState}
        )>}
        & { premiumSettings: Maybe<(
            & { __typename: 'PremiumChatSettings' }
            & { id: string}
            & { price: number}
            & { interval: WalletSubscriptionInterval}
        )>}
    )>
);
export type RoomFullWithoutMembers = (
    & { __typename: 'PrivateRoom' | 'SharedRoom' }
    & Inline<'SharedRoom',(
        & { __typename: 'PrivateRoom' }
        & { id: string}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
    )>
    & Inline<'PrivateRoom',(
        & { __typename: 'SharedRoom' }
        & { id: string}
        & { kind: SharedRoomKind}
        & { isChannel: boolean}
        & { title: string}
        & { photo: string}
        & { socialImage: Maybe<string>}
        & { description: Maybe<string>}
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & OrganizationMedium
        )>}
        & { membership: SharedRoomMembershipStatus}
        & { role: RoomMemberRole}
        & { membersCount: number}
        & { featuredMembersCount: number}
        & { settings: (
            & { __typename: 'RoomUserNotificaionSettings' }
            & { id: string}
            & { mute: Maybe<boolean>}
        )}
        & { matchmaking: Maybe<(
            & { __typename: 'MatchmakingRoom' }
            & MatchmakingRoomFragment
        )>}
        & { canEdit: boolean}
        & { canSendMessage: boolean}
        & { welcomeMessage: Maybe<(
            & { __typename: 'WelcomeMessage' }
            & { isOn: boolean}
            & { sender: Maybe<(
                & { __typename: 'User' }
                & { id: string}
                & { name: string}
            )>}
            & { message: Maybe<string>}
        )>}
        & { pinnedMessage: Maybe<(
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        )>}
        & { myBadge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
    )>
);
export type SessionStateFull = (
    & { __typename: 'SessionState' }
    & { isLoggedIn: boolean}
    & { isActivated: boolean}
    & { isProfileCreated: boolean}
    & { isAccountActivated: boolean}
    & { isAccountExists: boolean}
    & { isAccountPicked: boolean}
    & { isCompleted: boolean}
    & { isBlocked: boolean}
);
export type SettingsFull = (
    & { __typename: 'Settings' }
    & { id: string}
    & { primaryEmail: string}
    & { emailFrequency: EmailFrequency}
    & { excludeMutedChats: boolean}
    & { countUnreadChats: boolean}
    & { desktop: (
        & { __typename: 'PlatformNotificationSettings' }
        & PlatformNotificationSettingsFull
    )}
    & { mobile: (
        & { __typename: 'PlatformNotificationSettings' }
        & PlatformNotificationSettingsFull
    )}
);
export type SharedRoomView = (
    & { __typename: 'SharedRoom' }
    & { id: string}
    & { title: string}
    & { photo: string}
    & { membersCount: number}
);
export type StickerPackFragment = (
    & { __typename: 'StickerPack' }
    & { id: string}
    & { title: string}
    & { stickers: ((
        & { __typename: 'ImageSticker' }
        & StickerFragment
    ))[]}
);
export type UserNano = (
    & { __typename: 'User' }
    & { id: string}
    & { name: string}
    & { firstName: string}
    & { lastName: Maybe<string>}
    & { photo: Maybe<string>}
    & { online: boolean}
);
export type WalletTransactionFragment = (
    & { __typename: 'WalletTransaction' }
    & { id: string}
    & { status: WalletTransactionStatus}
    & { operation: (
        & { __typename: 'WalletTransactionDeposit' | 'WalletTransactionSubscription' | 'WalletTransactionTransferOut' | 'WalletTransactionTransferIn' }
        & Inline<'WalletTransactionSubscription' | 'WalletTransactionTransferOut' | 'WalletTransactionTransferIn',(
            & { __typename: 'WalletTransactionDeposit' }
            & { amount: number}
            & { payment: Maybe<(
                & { __typename: 'Payment' }
                & { id: string}
                & { status: PaymentStatus}
                & { intent: Maybe<(
                    & { __typename: 'PaymentIntent' }
                    & { id: string}
                    & { clientSecret: string}
                )>}
            )>}
        )>
        & Inline<'WalletTransactionDeposit' | 'WalletTransactionTransferOut' | 'WalletTransactionTransferIn',(
            & { __typename: 'WalletTransactionSubscription' }
            & { amount: number}
            & { payment: Maybe<(
                & { __typename: 'Payment' }
                & { id: string}
                & { status: PaymentStatus}
                & { intent: Maybe<(
                    & { __typename: 'PaymentIntent' }
                    & { id: string}
                    & { clientSecret: string}
                )>}
            )>}
        )>
        & Inline<'WalletTransactionDeposit' | 'WalletTransactionSubscription' | 'WalletTransactionTransferIn',(
            & { __typename: 'WalletTransactionTransferOut' }
            & { walletAmount: number}
            & { chargeAmount: number}
            & { payment: Maybe<(
                & { __typename: 'Payment' }
                & { id: string}
                & { status: PaymentStatus}
                & { intent: Maybe<(
                    & { __typename: 'PaymentIntent' }
                    & { id: string}
                    & { clientSecret: string}
                )>}
            )>}
            & { toUser: (
                & { __typename: 'User' }
                & UserShort
            )}
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
            & { status: PaymentStatus}
            & { intent: Maybe<(
                & { __typename: 'PaymentIntent' }
                & { id: string}
                & { clientSecret: string}
            )>}
        )}
    )>
);

// Queries
export type Account = (
    & { me: Maybe<(
        & { __typename: 'User' }
        & UserShort
    )>}
    & { sessionState: (
        & { __typename: 'SessionState' }
        & SessionStateFull
    )}
    & { myPermissions: (
        & { __typename: 'Permissions' }
        & { roles: (string)[]}
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
        & { id: string}
        & { creator: Maybe<(
            & { __typename: 'User' }
            & UserShort
        )>}
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
        & { id: string}
        & { key: string}
        & { orgId: string}
        & { title: string}
        & { photo: Maybe<string>}
        & { joined: boolean}
        & { creator: Maybe<(
            & { __typename: 'User' }
            & UserShort
        )>}
        & { forEmail: Maybe<string>}
        & { forName: Maybe<string>}
        & { membersCount: Maybe<number>}
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & { id: string}
            & { isCommunity: boolean}
            & { about: Maybe<string>}
        )>}
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
export interface AvailableRoomsVariables {
    chatsQuery?: MaybeInput<string>;
    channelsQuery?: MaybeInput<string>;
}
export type AvailableRooms = (
    & { availableChats: (
        & { __typename: 'RoomConnection' }
        & { edges: ((
            & { __typename: 'RoomConnectionEdge' }
            & { node: (
                & { __typename: 'SharedRoom' }
                & Inline<never,(
                    & { __typename: 'SharedRoom' }
                    & { id: string}
                    & { kind: SharedRoomKind}
                    & { title: string}
                    & { photo: string}
                    & { membersCount: number}
                    & { membership: SharedRoomMembershipStatus}
                    & { organization: Maybe<(
                        & { __typename: 'Organization' }
                        & { id: string}
                        & { name: string}
                        & { photo: Maybe<string>}
                    )>}
                )>
            )}
            & { cursor: string}
        ))[]}
    )}
    & { availableChannels: (
        & { __typename: 'RoomConnection' }
        & { edges: ((
            & { __typename: 'RoomConnectionEdge' }
            & { node: (
                & { __typename: 'SharedRoom' }
                & Inline<never,(
                    & { __typename: 'SharedRoom' }
                    & { id: string}
                    & { kind: SharedRoomKind}
                    & { title: string}
                    & { photo: string}
                    & { membersCount: number}
                    & { membership: SharedRoomMembershipStatus}
                    & { organization: Maybe<(
                        & { __typename: 'Organization' }
                        & { id: string}
                        & { name: string}
                        & { photo: Maybe<string>}
                    )>}
                )>
            )}
            & { cursor: string}
        ))[]}
    )}
    & { suggestedRooms: ((
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { kind: SharedRoomKind}
            & { title: string}
            & { photo: string}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
        )>
    ))[]}
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
);
export interface ChatInitVariables {
    chatId: string;
    before?: MaybeInput<string>;
    first: number;
}
export type ChatInit = (
    & { messages: ((
        & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
        & FullMessage
    ))[]}
    & { state: (
        & { __typename: 'ConversationUpdateState' }
        & { state: Maybe<string>}
    )}
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomShort
    )>}
    & { lastReadedMessage: Maybe<(
        & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
        & { id: string}
    )>}
);
export interface ChatInitFromUnreadVariables {
    chatId: string;
    before?: MaybeInput<string>;
    first: number;
}
export type ChatInitFromUnread = (
    & { gammaMessages: Maybe<(
        & { __typename: 'GammaMessagesBatch' }
        & { messages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        ))[]}
        & { haveMoreForward: Maybe<boolean>}
        & { haveMoreBackward: Maybe<boolean>}
    )>}
    & { state: (
        & { __typename: 'ConversationUpdateState' }
        & { state: Maybe<string>}
    )}
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomShort
    )>}
    & { lastReadedMessage: Maybe<(
        & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
        & { id: string}
    )>}
);
export interface ChatJoinVariables {
    id: string;
}
export type ChatJoin = (
    & { room: Maybe<(
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { title: string}
            & { description: Maybe<string>}
            & { photo: string}
            & { membersCount: number}
            & { onlineMembersCount: number}
            & { previewMembers: ((
                & { __typename: 'User' }
                & { id: string}
                & { photo: Maybe<string>}
                & { name: string}
            ))[]}
            & { isChannel: boolean}
        )>
    )>}
);
export interface ChatMembersSearchVariables {
    cid: string;
    query?: MaybeInput<string>;
    first: number;
    after?: MaybeInput<string>;
}
export type ChatMembersSearch = (
    & { members: (
        & { __typename: 'UserConnection' }
        & { edges: ((
            & { __typename: 'UserEdge' }
            & { user: (
                & { __typename: 'User' }
                & { id: string}
                & { name: string}
                & { shortname: Maybe<string>}
                & { photo: Maybe<string>}
                & { primaryOrganization: Maybe<(
                    & { __typename: 'Organization' }
                    & { id: string}
                    & { name: string}
                )>}
            )}
            & { cursor: string}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
        )}
    )}
);
export interface ChatMentionSearchVariables {
    cid: string;
    query?: MaybeInput<string>;
    first: number;
    after?: MaybeInput<string>;
}
export type ChatMentionSearch = (
    & { mentions: (
        & { __typename: 'GlobalSearchConnection' }
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
        & { cursor: Maybe<string>}
    )}
);
export interface CommentsVariables {
    peerId: string;
}
export type Comments = (
    & { comments: (
        & { __typename: 'CommentsPeer' }
        & { id: string}
        & { state: (
            & { __typename: 'CommentUpdatesState' }
            & { state: Maybe<string>}
        )}
        & { count: number}
        & { comments: ((
            & { __typename: 'CommentEntry' }
            & CommentEntryFragment
        ))[]}
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
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { id: string}
            & { peerId: Maybe<string>}
            & { state: MediaStreamState}
            & { sdp: Maybe<string>}
            & { ice: (string)[]}
        ))[]}
        & { iceServers: ((
            & { __typename: 'ICEServer' }
            & { urls: (string)[]}
            & { username: Maybe<string>}
            & { credential: Maybe<string>}
        ))[]}
    )}
);
export interface DialogsVariables {
    after?: MaybeInput<string>;
}
export type Dialogs = (
    & { dialogs: (
        & { __typename: 'DialogsConnection' }
        & { items: ((
            & { __typename: 'Dialog' }
            & { id: string}
            & { cid: string}
            & { fid: string}
            & { kind: DialogKind}
            & { isChannel: boolean}
            & { title: string}
            & { photo: string}
            & { unreadCount: number}
            & { isMuted: boolean}
            & { haveMention: boolean}
            & { topMessage: Maybe<(
                & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                & DaialogListMessage
            )>}
        ))[]}
        & { cursor: Maybe<string>}
    )}
    & { state: (
        & { __typename: 'DialogUpdateState' }
        & { state: Maybe<string>}
    )}
    & { counter: (
        & { __typename: 'NotificationCounter' }
        & { id: string}
        & { unreadCount: number}
    )}
);
export type DiscoverIsDone = (
    & { betaIsDiscoverDone: boolean}
);
export interface DiscoverNextPageVariables {
    selectedTagsIds: (string)[];
    excudedGroupsIds: (string)[];
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
            & { title: Maybe<string>}
            & { subtitle: Maybe<string>}
            & { tags: ((
                & { __typename: 'Tag' }
                & { id: string}
                & { title: string}
            ))[]}
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
    query?: MaybeInput<string>;
    sort?: MaybeInput<string>;
    page?: MaybeInput<number>;
    after?: MaybeInput<string>;
    featuredIfEmptyQuery?: MaybeInput<boolean>;
}
export type ExploreCommunity = (
    & { items: (
        & { __typename: 'OrganizationsConnection' }
        & { edges: ((
            & { __typename: 'OrganizationsEdge' }
            & { node: (
                & { __typename: 'Organization' }
                & CommunitySearch
            )}
            & { cursor: string}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { currentPage: number}
            & { pagesCount: number}
            & { openEnded: boolean}
        )}
    )}
);
export interface ExplorePeopleVariables {
    query?: MaybeInput<string>;
    sort?: MaybeInput<string>;
    page?: MaybeInput<number>;
    after?: MaybeInput<string>;
}
export type ExplorePeople = (
    & { items: (
        & { __typename: 'UserConnection' }
        & { edges: ((
            & { __typename: 'UserEdge' }
            & { node: (
                & { __typename: 'User' }
                & { isYou: boolean}
                & UserShort
            )}
            & { cursor: string}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { currentPage: number}
            & { pagesCount: number}
            & { openEnded: boolean}
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
    id: string;
    first: number;
    after?: MaybeInput<string>;
}
export type FeedChannelContent = (
    & { content: (
        & { __typename: 'FeedItemConnection' }
        & { items: ((
            & { __typename: 'FeedPost' }
            & FeedItemFull
        ))[]}
        & { cursor: Maybe<string>}
    )}
);
export interface FeedChannelSubscribersVariables {
    channelId: string;
    query?: MaybeInput<string>;
    first: number;
    after?: MaybeInput<string>;
}
export type FeedChannelSubscribers = (
    & { subscribers: (
        & { __typename: 'FeedChannelSubscriberConnection' }
        & { edges: ((
            & { __typename: 'FeedChannelSubscriberEdge' }
            & { node: (
                & { __typename: 'FeedChannelSubscriber' }
                & { user: (
                    & { __typename: 'User' }
                    & UserShort
                )}
                & { role: FeedChannelSubscriberRole}
            )}
            & { cursor: string}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { pagesCount: number}
            & { currentPage: number}
            & { openEnded: boolean}
        )}
    )}
);
export interface FeedChannelWritersVariables {
    id: string;
    first: number;
    after?: MaybeInput<string>;
}
export type FeedChannelWriters = (
    & { writers: (
        & { __typename: 'FeedChannelAdminConnection' }
        & { items: ((
            & { __typename: 'FeedChannelAdmin' }
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
            & { role: FeedChannelSubscriberRole}
        ))[]}
        & { cursor: Maybe<string>}
    )}
);
export interface FeedChannelsSearchVariables {
    query?: MaybeInput<string>;
    sort?: MaybeInput<string>;
    first: number;
    after?: MaybeInput<string>;
}
export type FeedChannelsSearch = (
    & { search: (
        & { __typename: 'FeedChannelSearchConnection' }
        & { edges: ((
            & { __typename: 'FeedChannelEdge' }
            & { node: (
                & { __typename: 'FeedChannel' }
                & FeedChannelFull
            )}
            & { cursor: string}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { pagesCount: number}
            & { currentPage: number}
            & { openEnded: boolean}
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
    first: number;
    after?: MaybeInput<string>;
}
export type FeedLoadMore = (
    & { feed: (
        & { __typename: 'FeedItemConnection' }
        & { items: ((
            & { __typename: 'FeedPost' }
            & FeedItemFull
        ))[]}
        & { cursor: Maybe<string>}
    )}
);
export interface FeedRecommendedChannelsVariables {
    first: number;
    after?: MaybeInput<string>;
}
export type FeedRecommendedChannels = (
    & { search: (
        & { __typename: 'FeedChannelSearchConnection' }
        & { edges: ((
            & { __typename: 'FeedChannelEdge' }
            & { node: (
                & { __typename: 'FeedChannel' }
                & FeedChannelFull
            )}
            & { cursor: string}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { pagesCount: number}
            & { currentPage: number}
            & { openEnded: boolean}
        )}
    )}
);
export interface FeedSubscriptionsVariables {
    first: number;
    after?: MaybeInput<string>;
}
export type FeedSubscriptions = (
    & { channels: (
        & { __typename: 'FeedChannelConnection' }
        & { items: ((
            & { __typename: 'FeedChannel' }
            & FeedChannelFull
        ))[]}
        & { cursor: Maybe<string>}
    )}
);
export interface FeedWritableChannelsVariables {
    first: number;
    after?: MaybeInput<string>;
}
export type FeedWritableChannels = (
    & { channels: (
        & { __typename: 'FeedChannelConnection' }
        & { items: ((
            & { __typename: 'FeedChannel' }
            & FeedChannelFull
        ))[]}
        & { cursor: Maybe<string>}
    )}
);
export type FetchPushSettings = (
    & { pushSettings: (
        & { __typename: 'PushSettings' }
        & { webPushKey: Maybe<string>}
    )}
);
export interface GetUserVariables {
    shortname: string;
}
export type GetUser = (
    & { user: Maybe<(
        & { __typename: 'User' | 'Organization' | 'FeedChannel' | 'SharedRoom' }
        & Inline<'Organization' | 'FeedChannel' | 'SharedRoom',(
            & { __typename: 'User' }
            & UserNano
        )>
    )>}
);
export type GlobalCounter = (
    & { alphaNotificationCounter: (
        & { __typename: 'NotificationCounter' }
        & { id: string}
        & { unreadCount: number}
    )}
);
export interface GlobalSearchVariables {
    query: string;
    kinds?: MaybeInput<(GlobalSearchEntryKind)[]>;
}
export type GlobalSearch = (
    & { items: ((
        & { __typename: 'Organization' | 'User' | 'SharedRoom' }
        & Inline<'User' | 'SharedRoom',(
            & { __typename: 'Organization' }
            & { id: string}
            & { name: string}
            & { about: Maybe<string>}
            & { photo: Maybe<string>}
            & { shortname: Maybe<string>}
            & { isCommunity: boolean}
        )>
        & Inline<'Organization' | 'SharedRoom',(
            & { __typename: 'User' }
            & UserShort
        )>
        & Inline<'Organization' | 'User',(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { kind: SharedRoomKind}
            & { title: string}
            & { canSendMessage: boolean}
            & { roomPhoto: string}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
        )>
    ))[]}
);
export interface InitFeedVariables {
    first: number;
}
export type InitFeed = (
    & { feed: (
        & { __typename: 'FeedItemConnection' }
        & { items: ((
            & { __typename: 'FeedPost' }
            & FeedItemFull
        ))[]}
        & { cursor: Maybe<string>}
    )}
    & { drafts: (
        & { __typename: 'FeedChannel' }
        & FeedChannelFull
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
    chatId: string;
    first: number;
    before?: MaybeInput<string>;
    after?: MaybeInput<string>;
}
export type MessagesBatch = (
    & { gammaMessages: Maybe<(
        & { __typename: 'GammaMessagesBatch' }
        & { messages: ((
            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
            & FullMessage
        ))[]}
        & { haveMoreForward: Maybe<boolean>}
        & { haveMoreBackward: Maybe<boolean>}
    )>}
    & { state: (
        & { __typename: 'ConversationUpdateState' }
        & { state: Maybe<string>}
    )}
);
export interface MessagesSearchVariables {
    query: string;
    sort?: MaybeInput<string>;
    first: number;
    after?: MaybeInput<string>;
}
export type MessagesSearch = (
    & { messagesSearch: (
        & { __typename: 'MessageConnection' }
        & { edges: ((
            & { __typename: 'MessageEdge' }
            & { node: (
                & { __typename: 'MessageWithChat' }
                & { chat: (
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
                        & { settings: (
                            & { __typename: 'RoomUserNotificaionSettings' }
                            & { id: string}
                            & { mute: Maybe<boolean>}
                        )}
                    )>
                    & Inline<'PrivateRoom',(
                        & { __typename: 'SharedRoom' }
                        & { id: string}
                        & { kind: SharedRoomKind}
                        & { title: string}
                        & { membership: SharedRoomMembershipStatus}
                        & { isChannel: boolean}
                        & { role: RoomMemberRole}
                        & { canEdit: boolean}
                        & { photo: string}
                        & { settings: (
                            & { __typename: 'RoomUserNotificaionSettings' }
                            & { id: string}
                            & { mute: Maybe<boolean>}
                        )}
                    )>
                )}
                & { message: (
                    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                    & { id: string}
                    & { date: string}
                    & { sender: (
                        & { __typename: 'User' }
                        & { id: string}
                        & { name: string}
                        & { firstName: string}
                        & { photo: Maybe<string>}
                    )}
                    & { senderBadge: Maybe<(
                        & { __typename: 'UserBadge' }
                        & UserBadge
                    )>}
                    & { message: Maybe<string>}
                    & { fallback: string}
                    & Inline<'ServiceMessage' | 'StickerMessage',(
                        & { __typename: 'GeneralMessage' }
                        & { id: string}
                        & { attachments: ((
                            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
                            & { id: string}
                            & { fallback: string}
                            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                                & { __typename: 'MessageAttachmentFile' }
                                & { id: string}
                                & { fileId: string}
                                & { fileMetadata: (
                                    & { __typename: 'FileMetadata' }
                                    & { isImage: boolean}
                                    & { imageFormat: Maybe<string>}
                                )}
                            )>
                        ))[]}
                        & { quotedMessages: ((
                            & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                            & { id: string}
                        ))[]}
                    )>
                )}
            )}
            & { cursor: string}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { currentPage: number}
            & { pagesCount: number}
            & { openEnded: boolean}
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
        & { id: string}
        & { pmid: string}
        & { last4: string}
        & { brand: string}
        & { expYear: number}
        & { expMonth: number}
        & { isDefault: boolean}
        & { deleted: boolean}
    ))[]}
);
export type MyNotificationCenter = (
    & { myNotificationCenter: (
        & { __typename: 'NotificationCenter' }
        & { id: string}
        & { unread: number}
        & { state: (
            & { __typename: 'NotificationCenterUpdatesState' }
            & { state: Maybe<string>}
        )}
    )}
);
export interface MyNotificationsVariables {
    first: number;
    before?: MaybeInput<string>;
}
export type MyNotifications = (
    & { myNotifications: (
        & { __typename: 'NotificationConnection' }
        & { items: ((
            & { __typename: 'Notification' }
            & NotificationFragment
        ))[]}
        & { cursor: Maybe<string>}
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
            & { title: string}
            & { stickers: ((
                & { __typename: 'ImageSticker' }
                & StickerFragment
            ))[]}
        ))[]}
    )}
);
export type MySuccessfulInvitesCount = (
    & { mySuccessfulInvitesCount: number}
);
export type MyWallet = (
    & { myWallet: (
        & { __typename: 'WalletAccount' }
        & { id: string}
        & { balance: number}
        & { state: string}
    )}
    & { transactionsPending: ((
        & { __typename: 'WalletTransaction' }
        & WalletTransactionFragment
    ))[]}
    & { transactionsHistory: (
        & { __typename: 'WalletTransactionConnection' }
        & { items: ((
            & { __typename: 'WalletTransaction' }
            & WalletTransactionFragment
        ))[]}
        & { cursor: Maybe<string>}
    )}
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
            & { title: string}
            & { scopes: Maybe<(OauthScope)[]>}
            & { image: Maybe<(
                & { __typename: 'ImageRef' }
                & { uuid: string}
                & { crop: Maybe<(
                    & { __typename: 'ImageCrop' }
                    & { x: number}
                    & { y: number}
                    & { w: number}
                    & { h: number}
                )>}
            )>}
        )}
        & { state: string}
        & { redirectUrl: string}
        & { code: string}
    )>}
);
export interface OnlineVariables {
    userId: string;
}
export type Online = (
    & { user: (
        & { __typename: 'User' }
        & { id: string}
        & { online: boolean}
        & { lastSeen: Maybe<string>}
        & { isBot: boolean}
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
    organizationId: string;
    first?: MaybeInput<number>;
    after?: MaybeInput<string>;
}
export type OrganizationMembers = (
    & { organization: (
        & { __typename: 'Organization' }
        & { id: string}
        & { members: ((
            & { __typename: 'OrganizationJoinedMember' }
            & { role: OrganizationMemberRole}
            & { user: (
                & { __typename: 'User' }
                & UserShort
            )}
        ))[]}
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
    organizationId: string;
    first: number;
    after?: MaybeInput<string>;
}
export type OrganizationPublicRooms = (
    & { organizationPublicRooms: (
        & { __typename: 'SharedRoomConnection' }
        & { items: ((
            & { __typename: 'SharedRoom' }
            & SharedRoomView
        ))[]}
        & { cursor: Maybe<string>}
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
        & { id: string}
        & { firstName: Maybe<string>}
        & { lastName: Maybe<string>}
        & { photoRef: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
        & { email: Maybe<string>}
        & { phone: Maybe<string>}
        & { website: Maybe<string>}
        & { about: Maybe<string>}
        & { location: Maybe<string>}
        & { role: Maybe<string>}
        & { linkedin: Maybe<string>}
        & { instagram: Maybe<string>}
        & { facebook: Maybe<string>}
        & { twitter: Maybe<string>}
        & { primaryOrganization: Maybe<(
            & { __typename: 'Organization' }
            & { id: string}
            & { name: string}
            & { membersCount: number}
        )>}
        & { joinedAt: Maybe<string>}
        & { invitedBy: Maybe<(
            & { __typename: 'User' }
            & { id: string}
            & { name: string}
        )>}
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
            & { id: string}
            & { orgId: string}
            & { title: string}
            & { creator: Maybe<(
                & { __typename: 'User' }
                & UserShort
            )>}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { photo: Maybe<string>}
                & { name: string}
                & { membersCount: number}
                & { about: Maybe<string>}
                & { isCommunity: boolean}
            )>}
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
                    & { id: string}
                    & { kind: SharedRoomKind}
                    & { isChannel: boolean}
                    & { title: string}
                    & { photo: string}
                    & { socialImage: Maybe<string>}
                    & { description: Maybe<string>}
                    & { membership: SharedRoomMembershipStatus}
                    & { membersCount: number}
                    & { onlineMembersCount: number}
                    & { previewMembers: ((
                        & { __typename: 'User' }
                        & { id: string}
                        & { photo: Maybe<string>}
                        & { name: string}
                    ))[]}
                    & { matchmaking: Maybe<(
                        & { __typename: 'MatchmakingRoom' }
                        & { enabled: boolean}
                    )>}
                    & { isPremium: boolean}
                    & { premiumPassIsActive: boolean}
                    & { premiumSubscription: Maybe<(
                        & { __typename: 'WalletSubscription' }
                        & { id: string}
                        & { state: WalletSubscriptionState}
                    )>}
                    & { premiumSettings: Maybe<(
                        & { __typename: 'PremiumChatSettings' }
                        & { id: string}
                        & { price: number}
                        & { interval: WalletSubscriptionInterval}
                    )>}
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
            & { user: (
                & { __typename: 'User' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
                & { shortname: Maybe<string>}
                & { primaryOrganization: Maybe<(
                    & { __typename: 'Organization' }
                    & { id: string}
                    & { name: string}
                )>}
                & { isBot: boolean}
            )}
            & { pinnedMessage: Maybe<(
                & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                & FullMessage
            )>}
            & { settings: (
                & { __typename: 'RoomUserNotificaionSettings' }
                & { id: string}
                & { mute: Maybe<boolean>}
            )}
        )>
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { kind: SharedRoomKind}
            & { title: string}
            & { membership: SharedRoomMembershipStatus}
            & { isChannel: boolean}
            & { role: RoomMemberRole}
            & { canEdit: boolean}
            & { photo: string}
            & { membersCount: number}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & OrganizationMedium
            )>}
            & { matchmaking: Maybe<(
                & { __typename: 'MatchmakingRoom' }
                & MatchmakingRoomFragment
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
            & { description: Maybe<string>}
            & { onlineMembersCount: number}
            & { previewMembers: ((
                & { __typename: 'User' }
                & { id: string}
                & { photo: Maybe<string>}
                & { name: string}
            ))[]}
            & { isPremium: boolean}
            & { premiumPassIsActive: boolean}
            & { premiumSubscription: Maybe<(
                & { __typename: 'WalletSubscription' }
                & { id: string}
                & { state: WalletSubscriptionState}
            )>}
            & { premiumSettings: Maybe<(
                & { __typename: 'PremiumChatSettings' }
                & { id: string}
                & { price: number}
                & { interval: WalletSubscriptionInterval}
            )>}
        )>
    )>}
);
export interface RoomFeaturedMembersVariables {
    roomId: string;
}
export type RoomFeaturedMembers = (
    & { roomFeaturedMembers: ((
        & { __typename: 'RoomMember' }
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { role: RoomMemberRole}
        & { membership: SharedRoomMembershipStatus}
        & { canKick: boolean}
        & { badge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
    ))[]}
);
export interface RoomInviteInfoVariables {
    invite: string;
}
export type RoomInviteInfo = (
    & { invite: Maybe<(
        & { __typename: 'RoomInvite' }
        & { id: string}
        & { room: (
            & { __typename: 'SharedRoom' }
            & Inline<never,(
                & { __typename: 'SharedRoom' }
                & { id: string}
                & { kind: SharedRoomKind}
                & { isChannel: boolean}
                & { title: string}
                & { photo: string}
                & { socialImage: Maybe<string>}
                & { description: Maybe<string>}
                & { organization: Maybe<(
                    & { __typename: 'Organization' }
                    & OrganizationShort
                )>}
                & { membership: SharedRoomMembershipStatus}
                & { membersCount: number}
                & { onlineMembersCount: number}
                & { previewMembers: ((
                    & { __typename: 'User' }
                    & { id: string}
                    & { photo: Maybe<string>}
                    & { name: string}
                ))[]}
                & { matchmaking: Maybe<(
                    & { __typename: 'MatchmakingRoom' }
                    & { enabled: boolean}
                )>}
                & { isPremium: boolean}
                & { premiumPassIsActive: boolean}
                & { premiumSubscription: Maybe<(
                    & { __typename: 'WalletSubscription' }
                    & { id: string}
                    & { state: WalletSubscriptionState}
                )>}
                & { premiumSettings: Maybe<(
                    & { __typename: 'PremiumChatSettings' }
                    & { id: string}
                    & { price: number}
                    & { interval: WalletSubscriptionInterval}
                )>}
            )>
        )}
        & { invitedByUser: (
            & { __typename: 'User' }
            & UserShort
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
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { role: RoomMemberRole}
        & { membership: SharedRoomMembershipStatus}
        & { canKick: boolean}
    ))[]}
);
export interface RoomMembersPaginatedVariables {
    roomId: string;
    first?: MaybeInput<number>;
    after?: MaybeInput<string>;
}
export type RoomMembersPaginated = (
    & { members: ((
        & { __typename: 'RoomMember' }
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { role: RoomMemberRole}
        & { membership: SharedRoomMembershipStatus}
        & { canKick: boolean}
        & { badge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
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
            & { shortname: Maybe<string>}
            & { photo: Maybe<string>}
            & { primaryOrganization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
            )>}
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
                & { id: string}
                & { adminMembers: ((
                    & { __typename: 'OrganizationJoinedMember' }
                    & { role: OrganizationMemberRole}
                    & { user: (
                        & { __typename: 'User' }
                        & UserShort
                    )}
                ))[]}
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
    query?: MaybeInput<string>;
    sort?: MaybeInput<string>;
    page?: MaybeInput<number>;
}
export type RoomSearch = (
    & { items: (
        & { __typename: 'RoomConnection' }
        & { edges: ((
            & { __typename: 'RoomConnectionEdge' }
            & { node: (
                & { __typename: 'SharedRoom' }
                & Inline<never,(
                    & { __typename: 'SharedRoom' }
                    & { id: string}
                    & { kind: SharedRoomKind}
                    & { isChannel: boolean}
                    & { title: string}
                    & { photo: string}
                    & { membership: SharedRoomMembershipStatus}
                    & { membersCount: number}
                    & { organization: Maybe<(
                        & { __typename: 'Organization' }
                        & { id: string}
                        & { photo: Maybe<string>}
                        & { name: string}
                    )>}
                )>
            )}
            & { cursor: string}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
            & { hasPreviousPage: boolean}
            & { itemsCount: number}
            & { currentPage: number}
            & { pagesCount: number}
            & { openEnded: boolean}
        )}
    )}
);
export interface RoomSuperVariables {
    id: string;
}
export type RoomSuper = (
    & { roomSuper: Maybe<(
        & { __typename: 'RoomSuper' }
        & { id: string}
        & { featured: boolean}
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
    chatId: string;
    mediaTypes: (SharedMediaType)[];
    first: number;
    after?: MaybeInput<string>;
}
export type SharedMedia = (
    & { sharedMedia: (
        & { __typename: 'MessageConnection' }
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
            & { currentPage: number}
        )}
        & { edges: ((
            & { __typename: 'MessageEdge' }
            & { node: (
                & { __typename: 'MessageWithChat' }
                & { message: (
                    & { __typename: 'GeneralMessage' | 'ServiceMessage' | 'StickerMessage' }
                    & Inline<'ServiceMessage' | 'StickerMessage',(
                        & { __typename: 'GeneralMessage' }
                        & { id: string}
                        & { fallback: string}
                        & { date: string}
                        & { sender: (
                            & { __typename: 'User' }
                            & { id: string}
                            & { name: string}
                        )}
                        & { attachments: ((
                            & { __typename: 'MessageAttachmentFile' | 'MessageAttachmentPost' | 'MessageRichAttachment' }
                            & Inline<'MessageAttachmentPost' | 'MessageRichAttachment',(
                                & { __typename: 'MessageAttachmentFile' }
                                & { id: string}
                                & { fileMetadata: (
                                    & { __typename: 'FileMetadata' }
                                    & { name: string}
                                    & { isImage: boolean}
                                    & { imageFormat: Maybe<string>}
                                    & { mimeType: Maybe<string>}
                                    & { imageWidth: Maybe<number>}
                                    & { imageHeight: Maybe<number>}
                                    & { size: number}
                                )}
                                & { filePreview: Maybe<string>}
                                & { fileId: string}
                                & { fallback: string}
                            )>
                            & Inline<'MessageAttachmentFile' | 'MessageAttachmentPost',(
                                & { __typename: 'MessageRichAttachment' }
                                & { id: string}
                                & { title: Maybe<string>}
                                & { text: Maybe<string>}
                                & { titleLink: Maybe<string>}
                                & { imagePreview: Maybe<string>}
                                & { image: Maybe<(
                                    & { __typename: 'Image' }
                                    & { url: string}
                                )>}
                                & { imageFallback: Maybe<(
                                    & { __typename: 'ImageFallback' }
                                    & { photo: string}
                                )>}
                                & { keyboard: Maybe<(
                                    & { __typename: 'MessageKeyboard' }
                                    & { buttons: (Maybe<((
                                        & { __typename: 'ModernMessageButton' }
                                        & { id: string}
                                        & { title: string}
                                        & { url: Maybe<string>}
                                    ))[]>)[]}
                                )>}
                            )>
                        ))[]}
                    )>
                )}
            )}
            & { cursor: string}
        ))[]}
    )}
);
export interface SharedMediaCountersVariables {
    chatId: string;
}
export type SharedMediaCounters = (
    & { counters: (
        & { __typename: 'SharedMediaCounters' }
        & { links: number}
        & { images: number}
        & { documents: number}
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
    & { suggestedRooms: ((
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & Inline<'PrivateRoom',(
            & { __typename: 'SharedRoom' }
            & { id: string}
            & { kind: SharedRoomKind}
            & { title: string}
            & { photo: string}
            & { membersCount: number}
            & { membership: SharedRoomMembershipStatus}
            & { organization: Maybe<(
                & { __typename: 'Organization' }
                & { id: string}
                & { name: string}
                & { photo: Maybe<string>}
            )>}
        )>
    ))[]}
    & { isDiscoverDone: boolean}
);
export interface SuperAccountVariables {
    accountId: string;
    viaOrgId?: MaybeInput<boolean>;
}
export type SuperAccount = (
    & { superAccount: (
        & { __typename: 'SuperAccount' }
        & { id: string}
        & { title: string}
        & { state: SuperAccountState}
        & { members: ((
            & { __typename: 'User' }
            & UserShort
        ))[]}
        & { features: ((
            & { __typename: 'FeatureFlag' }
            & { id: string}
            & { key: string}
            & { title: string}
        ))[]}
        & { orgId: string}
        & { createdAt: Maybe<string>}
        & { createdBy: Maybe<(
            & { __typename: 'User' }
            & { id: string}
            & { name: string}
        )>}
        & { published: boolean}
    )}
);
export type SuperAccounts = (
    & { superAccounts: ((
        & { __typename: 'SuperAccount' }
        & { id: string}
        & { orgId: string}
        & { title: string}
        & { state: SuperAccountState}
        & { createdAt: Maybe<string>}
    ))[]}
);
export type SuperAdmins = (
    & { superAdmins: ((
        & { __typename: 'SuperAdmin' }
        & { role: SuperAdminRole}
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { email: Maybe<string>}
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
    & { user: (
        & { __typename: 'User' }
        & { chatsWithBadge: ((
            & { __typename: 'UserChatWithBadge' }
            & { chat: (
                & { __typename: 'PrivateRoom' | 'SharedRoom' }
                & RoomShort
            )}
            & { badge: (
                & { __typename: 'UserBadge' }
                & UserBadge
            )}
        ))[]}
        & UserFull
    )}
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
);
export interface UserAvailableRoomsVariables {
    first: number;
    after?: MaybeInput<string>;
    query?: MaybeInput<string>;
}
export type UserAvailableRooms = (
    & { alphaUserAvailableRooms: (
        & { __typename: 'RoomConnection' }
        & { edges: ((
            & { __typename: 'RoomConnectionEdge' }
            & { node: (
                & { __typename: 'SharedRoom' }
                & Inline<never,(
                    & { __typename: 'SharedRoom' }
                    & { id: string}
                    & { kind: SharedRoomKind}
                    & { title: string}
                    & { photo: string}
                    & { membersCount: number}
                    & { membership: SharedRoomMembershipStatus}
                    & { organization: Maybe<(
                        & { __typename: 'Organization' }
                        & { id: string}
                        & { name: string}
                        & { photo: Maybe<string>}
                    )>}
                )>
            )}
            & { cursor: string}
        ))[]}
        & { pageInfo: (
            & { __typename: 'PageInfo' }
            & { hasNextPage: boolean}
        )}
    )}
);
export interface UserPicoVariables {
    userId: string;
}
export type UserPico = (
    & { user: (
        & { __typename: 'User' }
        & { id: string}
        & { name: string}
        & { firstName: string}
        & { photo: Maybe<string>}
    )}
);
export interface UserStorageVariables {
    namespace: string;
    keys: (string)[];
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
        & { id: string}
        & { title: string}
        & { subtitle: Maybe<string>}
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
    repeatKey?: MaybeInput<string>;
    peerId: string;
    message?: MaybeInput<string>;
    replyComment?: MaybeInput<string>;
    mentions?: MaybeInput<(MentionInput)[]>;
    fileAttachments?: MaybeInput<(FileAttachmentInput)[]>;
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
    stickerId: string;
    replyComment?: MaybeInput<string>;
    repeatKey?: MaybeInput<string>;
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
    selectedTagsIds: (string)[];
    excudedGroupsIds: (string)[];
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
    id: string;
    ownPeerId: string;
    peerId: string;
    answer: string;
}
export type ConferenceAnswer = (
    & { peerConnectionAnswer: (
        & { __typename: 'Conference' }
        & ConferenceShort
    )}
);
export interface ConferenceCandidateVariables {
    id: string;
    ownPeerId: string;
    peerId: string;
    candidate: string;
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
        & { peerId: string}
        & { conference: (
            & { __typename: 'Conference' }
            & ConferenceShort
        )}
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
    ownPeerId: string;
    peerId: string;
    offer: string;
}
export type ConferenceOffer = (
    & { peerConnectionOffer: (
        & { __typename: 'Conference' }
        & ConferenceShort
    )}
);
export interface CreateAppVariables {
    name: string;
    shortname?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    about?: MaybeInput<string>;
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
        & { id: string}
        & { clientSecret: string}
    )}
);
export interface CreateDepositIntentVariables {
    cardId: string;
    amount: number;
    retryKey: string;
}
export type CreateDepositIntent = (
    & { cardDepositIntent: (
        & { __typename: 'PaymentIntent' }
        & { id: string}
        & { clientSecret: string}
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
    user: ProfileInput;
    organization: CreateOrganizationInput;
}
export type CreateUserProfileAndOrganization = (
    & { alphaCreateUserProfileAndOrganization: (
        & { __typename: 'AlphaSignupData' }
        & { user: Maybe<(
            & { __typename: 'User' }
            & UserFull
        )>}
        & { organization: Maybe<(
            & { __typename: 'Organization' }
            & { id: string}
            & { name: string}
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
    id: string;
    message?: MaybeInput<string>;
    mentions?: MaybeInput<(MentionInput)[]>;
    fileAttachments?: MaybeInput<(FileAttachmentInput)[]>;
    spans?: MaybeInput<(MessageSpanInput)[]>;
}
export type EditComment = (
    & { editComment: boolean}
);
export interface EditMessageVariables {
    messageId: string;
    message?: MaybeInput<string>;
    replyMessages?: MaybeInput<(string)[]>;
    mentions?: MaybeInput<(MentionInput)[]>;
    fileAttachments?: MaybeInput<(FileAttachmentInput)[]>;
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
        & { id: string}
        & { features: ((
            & { __typename: 'FeatureFlag' }
            & { id: string}
            & { key: string}
            & { title: string}
        ))[]}
    )}
);
export interface FeatureFlagEnableVariables {
    accountId: string;
    featureId: string;
}
export type FeatureFlagEnable = (
    & { superAccountFeatureAdd: (
        & { __typename: 'SuperAccount' }
        & { id: string}
        & { features: ((
            & { __typename: 'FeatureFlag' }
            & { id: string}
            & { key: string}
            & { title: string}
        ))[]}
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
    title: string;
    about?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    global?: MaybeInput<boolean>;
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
    id: string;
    title: string;
    about?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    global?: MaybeInput<boolean>;
}
export type FeedChannelUpdate = (
    & { channel: (
        & { __typename: 'FeedChannel' }
        & { id: string}
    )}
);
export interface FeedCreatePostVariables {
    channel: string;
    slides: (SlideInput)[];
    repeatKey?: MaybeInput<string>;
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
    peerId: string;
    input: MatchmakingProfileFillInput;
}
export type MatchmakingProfileFill = (
    & { matchmakingProfileFill: (
        & { __typename: 'MatchmakingProfile' }
        & MatchmakingProfileFragment
    )}
);
export interface MatchmakingRoomSaveVariables {
    peerId: string;
    input: MatchmakingRoomInput;
}
export type MatchmakingRoomSave = (
    & { matchmakingRoomSave: (
        & { __typename: 'MatchmakingRoom' }
        & MatchmakingRoomFragment
    )}
);
export interface MediaAnswerVariables {
    id: string;
    peerId: string;
    answer: string;
}
export type MediaAnswer = (
    & { mediaStreamAnswer: (
        & { __typename: 'ConferenceMedia' }
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { id: string}
            & { peerId: Maybe<string>}
            & { state: MediaStreamState}
            & { sdp: Maybe<string>}
            & { ice: (string)[]}
        ))[]}
    )}
);
export interface MediaCandidateVariables {
    id: string;
    peerId: string;
    candidate: string;
}
export type MediaCandidate = (
    & { mediaStreamCandidate: (
        & { __typename: 'ConferenceMedia' }
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { id: string}
            & { peerId: Maybe<string>}
            & { state: MediaStreamState}
            & { sdp: Maybe<string>}
            & { ice: (string)[]}
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
            & { id: string}
            & { peerId: Maybe<string>}
            & { state: MediaStreamState}
            & { sdp: Maybe<string>}
            & { ice: (string)[]}
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
            & { id: string}
            & { peerId: Maybe<string>}
            & { state: MediaStreamState}
            & { sdp: Maybe<string>}
            & { ice: (string)[]}
        ))[]}
    )}
);
export interface MediaOfferVariables {
    id: string;
    peerId: string;
    offer: string;
}
export type MediaOffer = (
    & { mediaStreamOffer: (
        & { __typename: 'ConferenceMedia' }
        & { id: string}
        & { streams: ((
            & { __typename: 'MediaStream' }
            & { id: string}
            & { peerId: Maybe<string>}
            & { state: MediaStreamState}
            & { sdp: Maybe<string>}
            & { ice: (string)[]}
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
    userIds?: MaybeInput<(string)[]>;
    organizationId: string;
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
    userId: string;
    organizationId: string;
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
        & { id: string}
        & { firstName: Maybe<string>}
        & { lastName: Maybe<string>}
        & { photoRef: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
        & { email: Maybe<string>}
        & { phone: Maybe<string>}
        & { website: Maybe<string>}
        & { about: Maybe<string>}
        & { location: Maybe<string>}
    )}
);
export interface ProfileUpdateVariables {
    input: ProfileInput;
    uid?: MaybeInput<string>;
    inviteKey?: MaybeInput<string>;
}
export type ProfileUpdate = (
    & { profileUpdate: (
        & { __typename: 'Profile' }
        & { id: string}
        & { firstName: Maybe<string>}
        & { lastName: Maybe<string>}
        & { photoRef: Maybe<(
            & { __typename: 'ImageRef' }
            & { uuid: string}
            & { crop: Maybe<(
                & { __typename: 'ImageCrop' }
                & { x: number}
                & { y: number}
                & { w: number}
                & { h: number}
            )>}
        )>}
        & { email: Maybe<string>}
        & { phone: Maybe<string>}
        & { website: Maybe<string>}
        & { about: Maybe<string>}
        & { location: Maybe<string>}
        & { role: Maybe<string>}
        & { linkedin: Maybe<string>}
        & { instagram: Maybe<string>}
        & { facebook: Maybe<string>}
        & { twitter: Maybe<string>}
        & { primaryOrganizationId: Maybe<string>}
        & { joinedAt: Maybe<string>}
        & { invitedBy: Maybe<(
            & { __typename: 'User' }
            & { id: string}
            & { name: string}
        )>}
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
        & { id: string}
        & { deleted: boolean}
    )}
);
export interface ReportContentVariables {
    contentId: string;
    type: string;
    message?: MaybeInput<string>;
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
    roomId: string;
    invites: (RoomInviteInput)[];
}
export type RoomAddMembers = (
    & { alphaRoomInvite: ((
        & { __typename: 'RoomMember' }
        & { user: (
            & { __typename: 'User' }
            & UserShort
        )}
        & { role: RoomMemberRole}
        & { membership: SharedRoomMembershipStatus}
        & { canKick: boolean}
        & { badge: Maybe<(
            & { __typename: 'UserBadge' }
            & UserBadge
        )>}
    ))[]}
);
export interface RoomAlterFeaturedVariables {
    roomId: string;
    featured: boolean;
}
export type RoomAlterFeatured = (
    & { betaRoomAlterFeatured: (
        & { __typename: 'RoomSuper' }
        & { id: string}
        & { listed: boolean}
        & { featured: boolean}
    )}
);
export interface RoomAlterHiddenVariables {
    roomId: string;
    listed: boolean;
}
export type RoomAlterHidden = (
    & { betaRoomAlterListed: (
        & { __typename: 'RoomSuper' }
        & { id: string}
        & { listed: boolean}
        & { featured: boolean}
    )}
);
export interface RoomChangeRoleVariables {
    roomId: string;
    userId: string;
    newRole: RoomMemberRole;
}
export type RoomChangeRole = (
    & { betaRoomChangeRole: (
        & { __typename: 'PrivateRoom' | 'SharedRoom' }
        & RoomFull
    )}
);
export interface RoomCreateVariables {
    kind: SharedRoomKind;
    members: (string)[];
    message?: MaybeInput<string>;
    title?: MaybeInput<string>;
    description?: MaybeInput<string>;
    photoRef?: MaybeInput<ImageRefInput>;
    organizationId?: MaybeInput<string>;
    channel: boolean;
    price?: MaybeInput<number>;
    interval?: MaybeInput<WalletSubscriptionInterval>;
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
    settings: RoomUserNotificaionSettingsInput;
    roomId: string;
}
export type RoomSettingsUpdate = (
    & { betaRoomUpdateUserNotificationSettings: (
        & { __typename: 'RoomUserNotificaionSettings' }
        & { id: string}
        & { mute: Maybe<boolean>}
    )}
);
export interface RoomUpdateVariables {
    roomId: string;
    input: RoomUpdateInput;
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
            & { id: string}
            & { title: string}
            & { photo: string}
            & { description: Maybe<string>}
            & { socialImage: Maybe<string>}
        )>
    )}
);
export interface RoomsInviteUserVariables {
    userId: string;
    roomIds: (string)[];
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
    message?: MaybeInput<string>;
    replyMessages?: MaybeInput<(string)[]>;
    mentions?: MaybeInput<(MentionInput)[]>;
    fileAttachments?: MaybeInput<(FileAttachmentInput)[]>;
    spans?: MaybeInput<(MessageSpanInput)[]>;
    repeatKey?: MaybeInput<string>;
}
export type SendMessage = (
    & { sentMessage: boolean}
);
export interface SendStickerVariables {
    chatId: string;
    stickerId: string;
    replyMessages?: MaybeInput<(string)[]>;
    repeatKey?: MaybeInput<string>;
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
    userId: string;
    role: SuperAdminRole;
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
    roomId: string;
    userId: string;
    name: string;
}
export type SuperBadgeCreateToRoom = (
    & { superBadgeCreateToRoom: (
        & { __typename: 'UserBadge' }
        & UserBadge
    )}
);
export interface SuperBadgeUnsetToRoomVariables {
    roomId: string;
    userId: string;
    badgeId: string;
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
    namespace: string;
    data: (AppStorageValueInput)[];
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
    peerId: string;
    fromState?: MaybeInput<string>;
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
            & { id: string}
            & { peerId: Maybe<string>}
            & { state: MediaStreamState}
            & { sdp: Maybe<string>}
            & { ice: (string)[]}
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
    fromState?: MaybeInput<string>;
    eventsCount: number;
    randomDelays: boolean;
    seed: string;
}
export type DebugEventsWatch = (
    & { debugEvents: (
        & { __typename: 'DebugEvent' }
        & { seq: number}
        & { key: string}
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
        & { updates: ((
            & { __typename: 'FeedItemReceived' | 'FeedItemUpdated' | 'FeedItemDeleted' | 'FeedRebuildNeeded' }
            & FeedUpdateFragment
        ))[]}
        & { state: string}
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
        & { user: (
            & { __typename: 'User' }
            & { id: string}
            & { online: boolean}
            & { lastSeen: Maybe<string>}
        )}
        & { timeout: number}
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
        & { user: (
            & { __typename: 'User' }
            & { id: string}
            & { photo: Maybe<string>}
            & { firstName: string}
        )}
        & { cancel: boolean}
        & { type: TypingType}
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