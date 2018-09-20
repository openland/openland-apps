/* tslint:disable */
//  This file was automatically generated and should not be edited.

export enum NotificationMessages {
  ALL = "ALL",
  DIRECT = "DIRECT",
  NONE = "NONE",
}


export enum OrganizationMemberRole {
  MEMBER = "MEMBER",
  OWNER = "OWNER",
}


export enum EmailFrequency {
  HOUR_1 = "HOUR_1",
  HOUR_24 = "HOUR_24",
  MIN_15 = "MIN_15",
  NEVER = "NEVER",
}


export interface CreateOrganizationInput {
  name: string,
  website?: string | null,
  personal: boolean,
  photoRef?: ImageRefInput | null,
  about?: string | null,
  isCommunity?: boolean | null,
};

export interface ImageRefInput {
  uuid: string,
  crop?: ImageCropInput | null,
};

export interface ImageCropInput {
  x: number,
  y: number,
  w: number,
  h: number,
};

export interface CreateProfileInput {
  firstName: string,
  lastName?: string | null,
  photoRef?: ImageRefInput | null,
  phone?: string | null,
  email?: string | null,
  website?: string | null,
  about?: string | null,
  location?: string | null,
};

export enum ChannelMembershipStatus {
  invited = "invited",
  member = "member",
  none = "none",
  requested = "requested",
}


export interface UpdateConversationSettingsInput {
  mobileNotifications?: NotificationMessages | null,
  mute?: boolean | null,
};

export interface ChannelInviteRequest {
  email: string,
  emailText?: string | null,
  firstName?: string | null,
  lastName?: string | null,
};

export interface UpdateGroupInput {
  title?: string | null,
  photoRef?: ImageRefInput | null,
  description?: string | null,
  longDescription?: string | null,
  socialImageRef?: ImageRefInput | null,
};

export enum DealStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  ON_HOLD = "ON_HOLD",
}


export interface DealInput {
  title?: string | null,
  status?: DealStatus | null,
  statusDescription?: string | null,
  statusDate?: string | null,
  location?: string | null,
  address?: string | null,
  price?: number | null,
  extrasArea?: number | null,
  extrasCompany?: string | null,
  extrasAttorney?: string | null,
  extrasReferee?: string | null,
  extrasLotShape?: string | null,
  extrasLotSize?: string | null,
  extrasTaxBill?: number | null,
  parcelId?: string | null,
};

export enum SpecialFolder {
  ALL = "ALL",
  FAVORITES = "FAVORITES",
}


export interface GeoBox {
  east: number,
  north: number,
  west: number,
  south: number,
};

export interface UpdateOrganizationProfileInput {
  name?: string | null,
  photoRef?: ImageRefInput | null,
  website?: string | null,
  websiteTitle?: string | null,
  about?: string | null,
  twitter?: string | null,
  facebook?: string | null,
  linkedin?: string | null,
  location?: string | null,
  contacts?: Array< ContactPersonInput > | null,
  alphaPublished?: boolean | null,
  alphaEditorial?: boolean | null,
  alphaFeatured?: boolean | null,
  alphaLocations?: Array< string > | null,
  alphaInterests?: Array< string > | null,
  alphaOrganizationType?: Array< string > | null,
  alphaDummyPosts?: Array< AlphaDummyPostInput > | null,
  alphaPotentialSites?: Array< RangeInput | null > | null,
  alphaSiteSizes?: Array< RangeInput | null > | null,
  alphaDevelopmentModels?: Array< string | null > | null,
  alphaAvailability?: Array< string | null > | null,
  alphaLandUse?: Array< string | null > | null,
  alphaGoodFor?: Array< string | null > | null,
  alphaSpecialAttributes?: Array< string | null > | null,
  alphaLookingFor?: Array< string > | null,
  alphaGeographies?: Array< string > | null,
  alphaDOShapeAndForm?: Array< string > | null,
  alphaDOCurrentUse?: Array< string > | null,
  alphaDOGoodFitFor?: Array< string > | null,
  alphaDOSpecialAttributes?: Array< string > | null,
  alphaDOAvailability?: Array< string > | null,
  alphaARGeographies?: Array< string > | null,
  alphaARAreaRange?: Array< string > | null,
  alphaARHeightLimit?: Array< string > | null,
  alphaARActivityStatus?: Array< string > | null,
  alphaARAquisitionBudget?: Array< string > | null,
  alphaARAquisitionRate?: Array< string > | null,
  alphaARClosingTime?: Array< string > | null,
  alphaARSpecialAttributes?: Array< string > | null,
  alphaARLandUse?: Array< string > | null,
};

export interface ContactPersonInput {
  name: string,
  photoRef?: ImageRefInput | null,
  position?: string | null,
  email?: string | null,
  phone?: string | null,
  link?: string | null,
  twitter?: string | null,
};

export interface AlphaDummyPostInput {
  text: string,
  type: string,
  description?: string | null,
  date: string,
  image?: ImageRefInput | null,
  activity?: Array< string > | null,
  links?: Array< AlphaOrganizationListingLinkInput > | null,
  pinned?: boolean | null,
};

export interface AlphaOrganizationListingLinkInput {
  text: string,
  url: string,
};

export interface RangeInput {
  from?: number | null,
  to?: number | null,
};

export interface AlphaOrganizationListingInput {
  name?: string | null,
  summary?: string | null,
  specialAttributes?: Array< string > | null,
  status?: string | null,
  photo?: ImageRefInput | null,
  location?: MapPointInput | null,
  locationTitle?: string | null,
  availability?: string | null,
  area?: number | null,
  price?: number | null,
  dealType?: Array< string > | null,
  shapeAndForm?: Array< string > | null,
  currentUse?: Array< string > | null,
  goodFitFor?: Array< string > | null,
  additionalLinks?: Array< AlphaOrganizationListingLinkInput > | null,
  shortDescription?: string | null,
  areaRange?: RangeInput | null,
  geographies?: Array< string > | null,
  landUse?: Array< string > | null,
  unitCapacity?: Array< string > | null,
  channels?: Array< string > | null,
};

export interface MapPointInput {
  ref?: string | null,
  count?: number | null,
  lat: number,
  lon: number,
};

export interface InviteRequest {
  email: string,
  emailText?: string | null,
  role: OrganizationMemberRole,
  firstName?: string | null,
  lastName?: string | null,
};

export interface InviteRequestOrganization {
  email: string,
  emailText?: string | null,
  firstName?: string | null,
  lastName?: string | null,
};

export interface HitInput {
  category: string,
  tags: Array< string >,
};

export enum OwnerType {
  CITY = "CITY",
  EXCLUDED = "EXCLUDED",
  MIXED = "MIXED",
  OTHER = "OTHER",
  PRIVATE = "PRIVATE",
}


export enum OpportunityPriority {
  HIGH = "HIGH",
  LOW = "LOW",
  NORMAL = "NORMAL",
}


export enum OpportunityState {
  APPROVED = "APPROVED",
  APPROVED_INITIAL = "APPROVED_INITIAL",
  APPROVED_ZONING = "APPROVED_ZONING",
  INCOMING = "INCOMING",
  REJECTED = "REJECTED",
  SNOOZED = "SNOOZED",
}


export enum ParcelUse {
  PARKING = "PARKING",
  STORAGE = "STORAGE",
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


export interface ParcelMetadataInput {
  description?: string | null,
  currentUse?: ParcelUse | null,
  available?: boolean | null,
  isOkForTower?: boolean | null,
};

export enum SuperAdminRole {
  EDITOR = "EDITOR",
  SOFTWARE_DEVELOPER = "SOFTWARE_DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
}


export enum SuperAccountState {
  ACTIVATED = "ACTIVATED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}


export enum PermitSorting {
  APPROVAL_TIME_ASC = "APPROVAL_TIME_ASC",
  APPROVAL_TIME_DESC = "APPROVAL_TIME_DESC",
  COMPLETE_TIME = "COMPLETE_TIME",
  CREATE_TIME = "CREATE_TIME",
  ISSUED_TIME = "ISSUED_TIME",
  STATUS_CHANGE_TIME = "STATUS_CHANGE_TIME",
}


export interface UpdateProfileInput {
  firstName?: string | null,
  lastName?: string | null,
  photoRef?: ImageRefInput | null,
  phone?: string | null,
  email?: string | null,
  website?: string | null,
  about?: string | null,
  location?: string | null,
  alphaRole?: string | null,
  alphaLocations?: Array< string > | null,
  alphaLinkedin?: string | null,
  alphaTwitter?: string | null,
  alphaPrimaryOrganizationId?: string | null,
};

export interface UpdateSettingsInput {
  emailFrequency?: EmailFrequency | null,
  desktopNotifications?: NotificationMessages | null,
  mobileNotifications?: NotificationMessages | null,
  mobileAlert?: boolean | null,
  mobileIncludeText?: boolean | null,
  mute?: boolean | null,
  notificationsDelay?: NotificationsDelay | null,
};

export enum NotificationsDelay {
  MIN_1 = "MIN_1",
  MIN_15 = "MIN_15",
  NONE = "NONE",
}


export enum OpportunitySort {
  AREA_ASC = "AREA_ASC",
  AREA_DESC = "AREA_DESC",
  CAPACITY_ASC = "CAPACITY_ASC",
  CAPACITY_DESC = "CAPACITY_DESC",
  DATE_ADDED_ASC = "DATE_ADDED_ASC",
  DATE_ADDED_DESC = "DATE_ADDED_DESC",
}


export enum TaskStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
}


export interface AccountQuery {
  me:  {
    __typename: "User",
    id: string,
    name: string,
    firstName: string,
    lastName: string | null,
    picture: string | null,
    email: string | null,
    primaryOrganization:  {
      __typename: "Organization",
      id: string,
      name: string,
      photo: string | null,
    } | null,
    role: string | null,
    linkedin: string | null,
    twitter: string | null,
  } | null,
  organization:  {
    __typename: "Organization",
    id: string,
    name: string,
    photo: string | null,
  } | null,
  sessionState:  {
    __typename: "SessionState",
    isLoggedIn: boolean,
    isProfileCreated: boolean,
    isAccountActivated: boolean,
    isAccountExists: boolean,
    // depricated
    isAccountPicked: boolean,
    isCompleted: boolean,
    isBlocked: boolean,
  },
  permissions:  {
    __typename: "Permissions",
    roles: Array< string >,
  },
};

export interface AccountSettingsQuery {
  me:  {
    __typename: "User",
    id: string,
    name: string,
    firstName: string,
    lastName: string | null,
    picture: string | null,
    email: string | null,
    primaryOrganization:  {
      __typename: "Organization",
      id: string,
      name: string,
      photo: string | null,
    } | null,
    role: string | null,
    linkedin: string | null,
    twitter: string | null,
  } | null,
  primaryOrganization:  {
    __typename: "Organization",
    id: string,
  } | null,
  organizations:  Array< {
    __typename: "Organization",
    id: string,
    name: string,
    photo: string | null,
  } >,
};

export interface CreateOrganizationMutationVariables {
  input: CreateOrganizationInput,
};

export interface CreateOrganizationMutation {
  createOrganization:  {
    __typename: "OrganizationProfile",
    id: string,
    name: string,
  },
};

export interface AccountInviteInfoQueryVariables {
  inviteKey: string,
};

export interface AccountInviteInfoQuery {
  invite:  {
    __typename: "InviteInfo",
    id: string,
    key: string,
    orgId: string,
    title: string,
    photo: string | null,
    joined: boolean,
    creator:  {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    } | null,
    forEmail: string | null,
    forName: string | null,
  } | null,
};

export interface AccountInviteJoinMutationVariables {
  inviteKey: string,
};

export interface AccountInviteJoinMutation {
  alphaJoinInvite: string,
};

export interface AccountInvitesQuery {
  invites:  Array< {
    __typename: "Invite",
    id: string,
    key: string,
  } > | null,
};

export interface AccountInvitesHistoryQuery {
  invites:  Array< {
    __typename: "InviteHistotyInfo",
    forEmail: string,
    isGlobal: boolean,
    acceptedBy:  {
      __typename: "User",
      name: string,
      picture: string | null,
    } | null,
  } > | null,
};

export interface AccountCreateInviteMutation {
  alphaCreateInvite:  {
    __typename: "Invite",
    id: string,
    key: string,
  },
};

export interface AccountDestroyInviteMutationVariables {
  id: string,
};

export interface AccountDestroyInviteMutation {
  alphaDeleteInvite: string,
};

export interface ProfilePrefillQuery {
  prefill:  {
    __typename: "ProfilePrefill",
    firstName: string | null,
    lastName: string | null,
    picture: string | null,
  } | null,
};

export interface CreateUserProfileAndOrganizationMutationVariables {
  user: CreateProfileInput,
  organization: CreateOrganizationInput,
};

export interface CreateUserProfileAndOrganizationMutation {
  alphaCreateUserProfileAndOrganization:  {
    __typename: "AlphaSignupData",
    user:  {
      __typename: "Profile",
      id: string,
      firstName: string | null,
      lastName: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      email: string | null,
      phone: string | null,
      website: string | null,
      about: string | null,
      location: string | null,
    },
    organization:  {
      __typename: "OrganizationProfile",
      id: string,
      name: string,
    },
  },
};

export interface StateQuery {
  items:  Array< {
    __typename: "State",
    id: string,
    title: string,
    subtitle: string,
  } >,
};

export interface CountyQueryVariables {
  stateId: string,
};

export interface CountyQuery {
  items:  Array< {
    __typename: "County",
    id: string,
    title: string,
  } >,
};

export interface ChatListQueryVariables {
  after?: string | null,
};

export interface ChatListQuery {
  chats:  {
    __typename: "ConversationConnection",
    conversations:  Array<( {
        __typename: "ChannelConversation",
        id: string,
        flexibleId: string,
        title: string,
        photos: Array< string >,
        unreadCount: number,
        settings:  {
          __typename: "ConversationSettings",
          id: string,
          mute: boolean,
        },
        photo: string | null,
        topMessage:  {
          __typename: "ConversationMessage",
          id: string,
          message: string | null,
          file: string | null,
          repeatKey: string | null,
          isService: boolean,
          fileMetadata:  {
            __typename: "FileMetadata",
            name: string,
            mimeType: string | null,
            isImage: boolean,
            imageWidth: number | null,
            imageHeight: number | null,
            imageFormat: string | null,
            size: number,
          } | null,
          sender:  {
            __typename: "User",
            id: string,
            name: string,
            firstName: string,
            lastName: string | null,
            picture: string | null,
            email: string | null,
            primaryOrganization:  {
              __typename: "Organization",
              id: string,
              name: string,
              photo: string | null,
            } | null,
            role: string | null,
            linkedin: string | null,
            twitter: string | null,
          },
          urlAugmentation:  {
            __typename: "UrlAugmentation",
            url: string,
            title: string | null,
            date: string | null,
            subtitle: string | null,
            description: string | null,
            photo:  {
              __typename: "ImageRef",
              uuid: string,
              crop:  {
                __typename: "ImageCrop",
                x: number,
                y: number,
                w: number,
                h: number,
              } | null,
            } | null,
          } | null,
          date: string,
        } | null,
      } | {
        __typename: "AnonymousConversation",
        id: string,
        flexibleId: string,
        title: string,
        photos: Array< string >,
        unreadCount: number,
        settings:  {
          __typename: "ConversationSettings",
          id: string,
          mute: boolean,
        },
        topMessage:  {
          __typename: "ConversationMessage",
          id: string,
          message: string | null,
          file: string | null,
          repeatKey: string | null,
          isService: boolean,
          fileMetadata:  {
            __typename: "FileMetadata",
            name: string,
            mimeType: string | null,
            isImage: boolean,
            imageWidth: number | null,
            imageHeight: number | null,
            imageFormat: string | null,
            size: number,
          } | null,
          sender:  {
            __typename: "User",
            id: string,
            name: string,
            firstName: string,
            lastName: string | null,
            picture: string | null,
            email: string | null,
            primaryOrganization:  {
              __typename: "Organization",
              id: string,
              name: string,
              photo: string | null,
            } | null,
            role: string | null,
            linkedin: string | null,
            twitter: string | null,
          },
          urlAugmentation:  {
            __typename: "UrlAugmentation",
            url: string,
            title: string | null,
            date: string | null,
            subtitle: string | null,
            description: string | null,
            photo:  {
              __typename: "ImageRef",
              uuid: string,
              crop:  {
                __typename: "ImageCrop",
                x: number,
                y: number,
                w: number,
                h: number,
              } | null,
            } | null,
          } | null,
          date: string,
        } | null,
      } | {
        __typename: "SharedConversation",
        id: string,
        flexibleId: string,
        title: string,
        photos: Array< string >,
        unreadCount: number,
        settings:  {
          __typename: "ConversationSettings",
          id: string,
          mute: boolean,
        },
        topMessage:  {
          __typename: "ConversationMessage",
          id: string,
          message: string | null,
          file: string | null,
          repeatKey: string | null,
          isService: boolean,
          fileMetadata:  {
            __typename: "FileMetadata",
            name: string,
            mimeType: string | null,
            isImage: boolean,
            imageWidth: number | null,
            imageHeight: number | null,
            imageFormat: string | null,
            size: number,
          } | null,
          sender:  {
            __typename: "User",
            id: string,
            name: string,
            firstName: string,
            lastName: string | null,
            picture: string | null,
            email: string | null,
            primaryOrganization:  {
              __typename: "Organization",
              id: string,
              name: string,
              photo: string | null,
            } | null,
            role: string | null,
            linkedin: string | null,
            twitter: string | null,
          },
          urlAugmentation:  {
            __typename: "UrlAugmentation",
            url: string,
            title: string | null,
            date: string | null,
            subtitle: string | null,
            description: string | null,
            photo:  {
              __typename: "ImageRef",
              uuid: string,
              crop:  {
                __typename: "ImageCrop",
                x: number,
                y: number,
                w: number,
                h: number,
              } | null,
            } | null,
          } | null,
          date: string,
        } | null,
      } | {
        __typename: "PrivateConversation",
        id: string,
        flexibleId: string,
        title: string,
        photos: Array< string >,
        unreadCount: number,
        settings:  {
          __typename: "ConversationSettings",
          id: string,
          mute: boolean,
        },
        topMessage:  {
          __typename: "ConversationMessage",
          id: string,
          message: string | null,
          file: string | null,
          repeatKey: string | null,
          isService: boolean,
          fileMetadata:  {
            __typename: "FileMetadata",
            name: string,
            mimeType: string | null,
            isImage: boolean,
            imageWidth: number | null,
            imageHeight: number | null,
            imageFormat: string | null,
            size: number,
          } | null,
          sender:  {
            __typename: "User",
            id: string,
            name: string,
            firstName: string,
            lastName: string | null,
            picture: string | null,
            email: string | null,
            primaryOrganization:  {
              __typename: "Organization",
              id: string,
              name: string,
              photo: string | null,
            } | null,
            role: string | null,
            linkedin: string | null,
            twitter: string | null,
          },
          urlAugmentation:  {
            __typename: "UrlAugmentation",
            url: string,
            title: string | null,
            date: string | null,
            subtitle: string | null,
            description: string | null,
            photo:  {
              __typename: "ImageRef",
              uuid: string,
              crop:  {
                __typename: "ImageCrop",
                x: number,
                y: number,
                w: number,
                h: number,
              } | null,
            } | null,
          } | null,
          date: string,
        } | null,
      } | {
        __typename: "GroupConversation",
        id: string,
        flexibleId: string,
        title: string,
        photos: Array< string >,
        unreadCount: number,
        settings:  {
          __typename: "ConversationSettings",
          id: string,
          mute: boolean,
        },
        photo: string | null,
        topMessage:  {
          __typename: "ConversationMessage",
          id: string,
          message: string | null,
          file: string | null,
          repeatKey: string | null,
          isService: boolean,
          fileMetadata:  {
            __typename: "FileMetadata",
            name: string,
            mimeType: string | null,
            isImage: boolean,
            imageWidth: number | null,
            imageHeight: number | null,
            imageFormat: string | null,
            size: number,
          } | null,
          sender:  {
            __typename: "User",
            id: string,
            name: string,
            firstName: string,
            lastName: string | null,
            picture: string | null,
            email: string | null,
            primaryOrganization:  {
              __typename: "Organization",
              id: string,
              name: string,
              photo: string | null,
            } | null,
            role: string | null,
            linkedin: string | null,
            twitter: string | null,
          },
          urlAugmentation:  {
            __typename: "UrlAugmentation",
            url: string,
            title: string | null,
            date: string | null,
            subtitle: string | null,
            description: string | null,
            photo:  {
              __typename: "ImageRef",
              uuid: string,
              crop:  {
                __typename: "ImageCrop",
                x: number,
                y: number,
                w: number,
                h: number,
              } | null,
            } | null,
          } | null,
          date: string,
        } | null,
      }
    ) >,
    seq: number,
    next: string | null,
  },
  counter:  {
    __typename: "NotificationCounter",
    id: string,
    unreadCount: number,
  },
};

export interface GlobalCounterQuery {
  counter:  {
    __typename: "NotificationCounter",
    id: string,
    unreadCount: number,
  },
};

export interface ChatHistoryQueryVariables {
  conversationId: string,
  before?: string | null,
};

export interface ChatHistoryQuery {
  messages:  {
    __typename: "ConversationState",
    seq: number,
    messages:  Array< {
      __typename: "ConversationMessage",
      id: string,
      message: string | null,
      file: string | null,
      repeatKey: string | null,
      isService: boolean,
      fileMetadata:  {
        __typename: "FileMetadata",
        name: string,
        mimeType: string | null,
        isImage: boolean,
        imageWidth: number | null,
        imageHeight: number | null,
        imageFormat: string | null,
        size: number,
      } | null,
      sender:  {
        __typename: "User",
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
      },
      urlAugmentation:  {
        __typename: "UrlAugmentation",
        url: string,
        title: string | null,
        date: string | null,
        subtitle: string | null,
        description: string | null,
        photo:  {
          __typename: "ImageRef",
          uuid: string,
          crop:  {
            __typename: "ImageCrop",
            x: number,
            y: number,
            w: number,
            h: number,
          } | null,
        } | null,
      } | null,
      date: string,
    } >,
  },
};

export interface ChatInfoQueryVariables {
  conversationId: string,
};

export interface ChatInfoQuery {
  chat: ( {
      __typename: "ChannelConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      isRoot: boolean,
      featured: boolean,
      hidden: boolean,
      description: string,
      longDescription: string,
      socialImageRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      socialImage: string | null,
      myStatus: ChannelMembershipStatus,
      membersCount: number,
      memberRequestsCount: number,
      organization:  {
        __typename: "Organization",
        id: string,
        isMine: boolean,
        isOwner: boolean,
        name: string,
      } | null,
    } | {
      __typename: "AnonymousConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "SharedConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      organization:  {
        __typename: "Organization",
        id: string,
      } | null,
    } | {
      __typename: "PrivateConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      blocked: boolean,
      user:  {
        __typename: "User",
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
      },
    } | {
      __typename: "GroupConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      membersCount: number,
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    }
  ),
};

export interface ChatFullInfoQueryVariables {
  conversationId: string,
};

export interface ChatFullInfoQuery {
  chat: ( {
      __typename: "ChannelConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      members:  Array< {
        __typename: "User",
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
      } >,
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    } | {
      __typename: "AnonymousConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "SharedConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      organizations:  Array< {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } >,
    } | {
      __typename: "PrivateConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
      },
    } | {
      __typename: "GroupConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      members:  Array< {
        __typename: "User",
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
      } >,
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    }
  ),
};

export interface GroupChatFullInfoQueryVariables {
  conversationId: string,
};

export interface GroupChatFullInfoQuery {
  chat: ( {
      __typename: "ChannelConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
    } | {
      __typename: "AnonymousConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
    } | {
      __typename: "SharedConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
    } | {
      __typename: "PrivateConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
    } | {
      __typename: "GroupConversation",
      id: string,
      flexibleId: string,
      title: string,
      photos: Array< string >,
    }
  ),
  members:  Array< {
    __typename: "GroupConversationMember",
    user:  {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    },
    role: string,
  } >,
};

export interface SendMessageMutationVariables {
  conversationId: string,
  message?: string | null,
  file?: string | null,
  repeatKey: string,
};

export interface SendMessageMutation {
  sentMessage:  {
    __typename: "ConversationEventMessage",
    seq: number,
    message:  {
      __typename: "ConversationMessage",
      id: string,
      message: string | null,
      file: string | null,
      repeatKey: string | null,
      isService: boolean,
      fileMetadata:  {
        __typename: "FileMetadata",
        name: string,
        mimeType: string | null,
        isImage: boolean,
        imageWidth: number | null,
        imageHeight: number | null,
        imageFormat: string | null,
        size: number,
      } | null,
      sender:  {
        __typename: "User",
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
      },
      urlAugmentation:  {
        __typename: "UrlAugmentation",
        url: string,
        title: string | null,
        date: string | null,
        subtitle: string | null,
        description: string | null,
        photo:  {
          __typename: "ImageRef",
          uuid: string,
          crop:  {
            __typename: "ImageCrop",
            x: number,
            y: number,
            w: number,
            h: number,
          } | null,
        } | null,
      } | null,
      date: string,
    },
  },
};

export interface ChatReadMutationVariables {
  conversationId: string,
  messageId: string,
};

export interface ChatReadMutation {
  alphaReadChat:  {
    __typename: "ChatReadResult",
    counter:  {
      __typename: "NotificationCounter",
      id: string,
      unreadCount: number,
    },
    conversation: ( {
        __typename: "ChannelConversation",
        id: string,
        unreadCount: number,
      } | {
        __typename: "AnonymousConversation",
        id: string,
        unreadCount: number,
      } | {
        __typename: "SharedConversation",
        id: string,
        unreadCount: number,
      } | {
        __typename: "PrivateConversation",
        id: string,
        unreadCount: number,
      } | {
        __typename: "GroupConversation",
        id: string,
        unreadCount: number,
      }
    ),
  },
};

export interface ChatSearchForComposeQueryVariables {
  query: string,
  organizations: boolean,
};

export interface ChatSearchForComposeQuery {
  items:  Array<( {
      __typename: "User",
      id: string,
      title: string,
    } | {
      __typename: "Organization",
      id: string,
      title: string,
    }
  ) >,
};

export interface ChatSearchForComposeMobileQueryVariables {
  query: string,
  organizations: boolean,
  limit?: number | null,
};

export interface ChatSearchForComposeMobileQuery {
  items:  Array<( {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    } | {
      __typename: "Organization",
      id: string,
      name: string,
      photo: string | null,
    }
  ) >,
};

export interface ChatSearchGroupQueryVariables {
  members: Array< string >,
};

export interface ChatSearchGroupQuery {
  group: ( {
      __typename: "ChannelConversation",
      id: string,
      flexibleId: string,
    } | {
      __typename: "AnonymousConversation",
      id: string,
      flexibleId: string,
    } | {
      __typename: "SharedConversation",
      id: string,
      flexibleId: string,
    } | {
      __typename: "PrivateConversation",
      id: string,
      flexibleId: string,
    } | {
      __typename: "GroupConversation",
      id: string,
      flexibleId: string,
    }
  ) | null,
};

export interface ChatCreateGroupMutationVariables {
  members: Array< string >,
  message: string,
};

export interface ChatCreateGroupMutation {
  group: ( {
      __typename: "ChannelConversation",
      id: string,
    } | {
      __typename: "AnonymousConversation",
      id: string,
    } | {
      __typename: "SharedConversation",
      id: string,
    } | {
      __typename: "PrivateConversation",
      id: string,
    } | {
      __typename: "GroupConversation",
      id: string,
    }
  ),
};

export interface SetTypingMutationVariables {
  conversationId: string,
};

export interface SetTypingMutation {
  setTyping: string,
};

export interface ChatChangeGroupTitleMutationVariables {
  conversationId: string,
  name: string,
};

export interface ChatChangeGroupTitleMutation {
  alphaChatChangeGroupTitle:  {
    __typename: "GroupChatUpdateResponse",
    chat: ( {
        __typename: "ChannelConversation",
        id: string,
        flexibleId: string,
        title: string,
      } | {
        __typename: "AnonymousConversation",
        id: string,
        flexibleId: string,
        title: string,
      } | {
        __typename: "SharedConversation",
        id: string,
        flexibleId: string,
        title: string,
      } | {
        __typename: "PrivateConversation",
        id: string,
        flexibleId: string,
        title: string,
      } | {
        __typename: "GroupConversation",
        id: string,
        flexibleId: string,
        title: string,
      }
    ),
  },
};

export interface ChatAddMemberMutationVariables {
  conversationId: string,
  userId: string,
};

export interface ChatAddMemberMutation {
  alphaChatInviteToGroup:  {
    __typename: "GroupChatUpdateResponse",
    chat: ( {
        __typename: "ChannelConversation",
        id: string,
      } | {
        __typename: "AnonymousConversation",
        id: string,
      } | {
        __typename: "SharedConversation",
        id: string,
      } | {
        __typename: "PrivateConversation",
        id: string,
      } | {
        __typename: "GroupConversation",
        id: string,
      }
    ),
  },
};

export interface BlockedListQueryVariables {
  conversationId: string,
};

export interface BlockedListQuery {
  blocked:  Array< {
    __typename: "ConversationBlockedUser",
    user:  {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    },
    blockedBy:  {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    },
  } >,
};

export interface BlockUserMutationVariables {
  userId: string,
};

export interface BlockUserMutation {
  blockUser: string,
};

export interface UnBlockUserMutationVariables {
  userId: string,
  conversationId?: string | null,
};

export interface UnBlockUserMutation {
  blockUser: string,
};

export interface ChatSearchTextQueryVariables {
  query: string,
};

export interface ChatSearchTextQuery {
  items:  Array<( {
      __typename: "ChannelConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      featured: boolean,
      hidden: boolean,
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    } | {
      __typename: "AnonymousConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "SharedConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "PrivateConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "GroupConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    }
  ) >,
};

export interface DocumentFetchPreviewLinkQueryVariables {
  file: string,
};

export interface DocumentFetchPreviewLinkQuery {
  previewLink: string | null,
};

export interface ChatSearchChannelQueryVariables {
  query?: string | null,
  sort?: string | null,
  page?: number | null,
};

export interface ChatSearchChannelQuery {
  channels:  {
    __typename: "ChannelConversationConnection",
    edges:  Array< {
      __typename: "ChannelConversationConnectionEdge",
      node:  {
        __typename: "ChannelConversation",
        id: string,
        title: string,
        flexibleId: string,
        unreadCount: number,
        photos: Array< string >,
        topMessage:  {
          __typename: "ConversationMessage",
          id: string,
          message: string | null,
          file: string | null,
          repeatKey: string | null,
          isService: boolean,
          fileMetadata:  {
            __typename: "FileMetadata",
            name: string,
            mimeType: string | null,
            isImage: boolean,
            imageWidth: number | null,
            imageHeight: number | null,
            imageFormat: string | null,
            size: number,
          } | null,
          sender:  {
            __typename: "User",
            id: string,
            name: string,
            firstName: string,
            lastName: string | null,
            picture: string | null,
            email: string | null,
            primaryOrganization:  {
              __typename: "Organization",
              id: string,
              name: string,
              photo: string | null,
            } | null,
            role: string | null,
            linkedin: string | null,
            twitter: string | null,
          },
          urlAugmentation:  {
            __typename: "UrlAugmentation",
            url: string,
            title: string | null,
            date: string | null,
            subtitle: string | null,
            description: string | null,
            photo:  {
              __typename: "ImageRef",
              uuid: string,
              crop:  {
                __typename: "ImageCrop",
                x: number,
                y: number,
                w: number,
                h: number,
              } | null,
            } | null,
          } | null,
          date: string,
        } | null,
        settings:  {
          __typename: "ConversationSettings",
          id: string,
          mobileNotifications: NotificationMessages,
          mute: boolean,
        },
        featured: boolean,
        hidden: boolean,
        photo: string | null,
        photoRef:  {
          __typename: "ImageRef",
          uuid: string,
          crop:  {
            __typename: "ImageCrop",
            x: number,
            y: number,
            w: number,
            h: number,
          } | null,
        } | null,
        membersCount: number,
        description: string,
        myStatus: ChannelMembershipStatus,
        organization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        isRoot: boolean,
      },
      cursor: string,
    } >,
    pageInfo:  {
      __typename: "PageInfo",
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemsCount: number,
      currentPage: number,
      pagesCount: number,
      openEnded: boolean,
    },
  },
};

export interface CreateChannelMutationVariables {
  title: string,
  message: string,
  description?: string | null,
};

export interface CreateChannelMutation {
  channel: ( {
      __typename: "ChannelConversation",
      id: string,
    } | {
      __typename: "AnonymousConversation",
      id: string,
    } | {
      __typename: "SharedConversation",
      id: string,
    } | {
      __typename: "PrivateConversation",
      id: string,
    } | {
      __typename: "GroupConversation",
      id: string,
    }
  ),
};

export interface ChannelSetFeaturedMutationVariables {
  channelId: string,
  featured: boolean,
};

export interface ChannelSetFeaturedMutation {
  alphaChannelSetFeatured: ( {
      __typename: "ChannelConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      featured: boolean,
      hidden: boolean,
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    } | {
      __typename: "AnonymousConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "SharedConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "PrivateConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "GroupConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    }
  ),
};

export interface ChannelSetHiddenMutationVariables {
  channelId: string,
  hidden: boolean,
};

export interface ChannelSetHiddenMutation {
  alphaChannelHideFromSearch: ( {
      __typename: "ChannelConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      featured: boolean,
      hidden: boolean,
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    } | {
      __typename: "AnonymousConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "SharedConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "PrivateConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "GroupConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    }
  ),
};

export interface UserChannelsQuery {
  channels:  {
    __typename: "ConversationConnection",
    conversations:  Array<( {
        __typename: "ChannelConversation",
        id: string,
        title: string,
      } | {
        __typename: "AnonymousConversation",
        id: string,
        title: string,
      } | {
        __typename: "SharedConversation",
        id: string,
        title: string,
      } | {
        __typename: "PrivateConversation",
        id: string,
        title: string,
      } | {
        __typename: "GroupConversation",
        id: string,
        title: string,
      }
    ) >,
  },
};

export interface ChannelMembersQueryVariables {
  channelId: string,
};

export interface ChannelMembersQuery {
  members:  Array< {
    __typename: "ChannelMember",
    user:  {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    },
    role: string,
    status: string,
  } >,
};

export interface ChannelInviteMutationVariables {
  channelId: string,
  userId: string,
};

export interface ChannelInviteMutation {
  alphaChannelInvite:  {
    __typename: "ConversationUpdateResponse",
    chat: ( {
        __typename: "ChannelConversation",
        id: string,
      } | {
        __typename: "AnonymousConversation",
        id: string,
      } | {
        __typename: "SharedConversation",
        id: string,
      } | {
        __typename: "PrivateConversation",
        id: string,
      } | {
        __typename: "GroupConversation",
        id: string,
      }
    ),
  },
};

export interface ConversationKickMutationVariables {
  conversationId: string,
  userId: string,
};

export interface ConversationKickMutation {
  alphaChatKickFromGroup:  {
    __typename: "GroupChatUpdateResponse",
    chat: ( {
        __typename: "ChannelConversation",
        id: string,
      } | {
        __typename: "AnonymousConversation",
        id: string,
      } | {
        __typename: "SharedConversation",
        id: string,
      } | {
        __typename: "PrivateConversation",
        id: string,
      } | {
        __typename: "GroupConversation",
        id: string,
      }
    ),
  },
};

export interface ConversationSettingsUpdateMutationVariables {
  settings: UpdateConversationSettingsInput,
  conversationId: string,
};

export interface ConversationSettingsUpdateMutation {
  alphaUpdateConversationSettings:  {
    __typename: "ConversationSettings",
    id: string,
    mobileNotifications: NotificationMessages,
    mute: boolean,
  },
};

export interface ChannelJoinMutationVariables {
  channelId: string,
};

export interface ChannelJoinMutation {
  join:  {
    __typename: "ConversationUpdateResponse",
    chat: ( {
        __typename: "ChannelConversation",
        id: string,
      } | {
        __typename: "AnonymousConversation",
        id: string,
      } | {
        __typename: "SharedConversation",
        id: string,
      } | {
        __typename: "PrivateConversation",
        id: string,
      } | {
        __typename: "GroupConversation",
        id: string,
      }
    ),
  },
};

export interface ChannelInviteMembersMutationVariables {
  channelId: string,
  inviteRequests: Array< ChannelInviteRequest >,
};

export interface ChannelInviteMembersMutation {
  alphaChannelInviteMembers: string,
};

export interface ChannelJoinInviteMutationVariables {
  invite: string,
};

export interface ChannelJoinInviteMutation {
  alphaChannelJoinInvite: string,
};

export interface ChannelRenewInviteLinkMutationVariables {
  channelId: string,
};

export interface ChannelRenewInviteLinkMutation {
  link: string,
};

export interface ChannelInviteLinkQueryVariables {
  channelId: string,
};

export interface ChannelInviteLinkQuery {
  link: string,
};

export interface ChannelInviteInfoQueryVariables {
  uuid: string,
};

export interface ChannelInviteInfoQuery {
  invite:  {
    __typename: "ChannelInvite",
    channel:  {
      __typename: "ChannelConversation",
      id: string,
      title: string,
      photos: Array< string >,
      isRoot: boolean,
      featured: boolean,
      description: string,
      myStatus: ChannelMembershipStatus,
      membersCount: number,
      socialImage: string | null,
      organization:  {
        __typename: "Organization",
        id: string,
        isMine: boolean,
        name: string,
      } | null,
    },
    invitedByUser:  {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    },
  } | null,
};

export interface ChannelJoinInviteLinkMutationVariables {
  invite: string,
};

export interface ChannelJoinInviteLinkMutation {
  cannelId: string,
};

export interface ChatUpdateGroupMutationVariables {
  conversationId: string,
  input: UpdateGroupInput,
};

export interface ChatUpdateGroupMutation {
  event:  {
    __typename: "ConversationUpdateResponse",
    chat: ( {
        __typename: "ChannelConversation",
        id: string,
      } | {
        __typename: "AnonymousConversation",
        id: string,
      } | {
        __typename: "SharedConversation",
        id: string,
      } | {
        __typename: "PrivateConversation",
        id: string,
      } | {
        __typename: "GroupConversation",
        id: string,
      }
    ),
    curSeq: number,
  },
};

export interface ChatDeleteMessageMutationVariables {
  messageId: string,
};

export interface ChatDeleteMessageMutation {
  event:  {
    __typename: "ConversationEventDelete",
    seq: number,
    messageId: string,
  },
};

export interface ChatEditMessageMutationVariables {
  messageId: string,
  message?: string | null,
};

export interface ChatEditMessageMutation {
  event:  {
    __typename: "ConversationEventEditMessage",
    seq: number,
    message:  {
      __typename: "ConversationMessage",
      id: string,
    },
  },
};

export interface SuperChannelAddMemberMutationVariables {
  id: string,
  userId: string,
};

export interface SuperChannelAddMemberMutation {
  superAccountChannelMemberAdd: string,
};

export interface AllDealsQuery {
  deals:  Array< {
    __typename: "Deal",
    id: string,
    title: string,
    location: string | null,
    address: string | null,
    status: DealStatus | null,
    statusDescription: string | null,
    statusDate: string | null,
    price: number | null,
    extrasArea: number | null,
    extrasCompany: string | null,
    parcel:  {
      __typename: "Parcel",
      id: string,
      // Deprecated
      title: string,
      // Deprecated geometry
      extrasArea: number | null,
    } | null,
  } >,
};

export interface AllDealsMapQuery {
  deals:  Array< {
    __typename: "Deal",
    id: string,
    status: DealStatus | null,
    parcel:  {
      __typename: "Parcel",
      id: string,
      // Deprecated
      title: string,
      center:  {
        __typename: "Geo",
        latitude: number,
        longitude: number,
      } | null,
    } | null,
  } >,
};

export interface DealQueryVariables {
  dealId: string,
};

export interface DealQuery {
  deal:  {
    __typename: "Deal",
    id: string,
    title: string,
    location: string | null,
    address: string | null,
    status: DealStatus | null,
    statusDescription: string | null,
    statusDate: string | null,
    price: number | null,
    extrasArea: number | null,
    extrasCompany: string | null,
    extrasAttorney: string | null,
    extrasReferee: string | null,
    extrasLotShape: string | null,
    extrasLotSize: string | null,
    extrasTaxBill: number | null,
    parcel:  {
      __typename: "Parcel",
      id: string,
      number:  {
        __typename: "ParcelNumber",
        borough: string | null,
        boroughId: string | null,
        block: string | null,
        blockPadded: string | null,
        lot: string | null,
        lotPadded: string | null,
        title: string,
      },
      // Geometry
      geometry: string | null,
      address: string | null,
      // Bunch of unsorted experimental data
      extrasZoning: Array< string > | null,
      extrasLandValue: number | null,
      // Deprecated geometry
      extrasArea: number | null,
      extrasShapeType: string | null,
      extrasShapeSides: Array< number > | null,
      extrasFitProjects: Array< string > | null,
      extrasAnalyzed: boolean | null,
      extrasVacant: boolean | null,
      compatibleBuildings:  Array< {
        __typename: "BuildingLocation",
        key: string,
        title: string,
        width: number,
        height: number,
        center:  {
          __typename: "Geo",
          latitude: number,
          longitude: number,
        } | null,
        angle: number | null,
        shape: string | null,
      } > | null,
      // Addresses
      city:  {
        __typename: "City",
        id: string,
        name: string,
        county:  {
          __typename: "County",
          id: string,
          name: string,
        },
        state:  {
          __typename: "State",
          id: string,
          name: string,
          code: string,
        },
      },
    } | null,
  },
};

export interface AddDealMutationVariables {
  data: DealInput,
};

export interface AddDealMutation {
  dealAdd:  {
    __typename: "Deal",
    id: string,
    title: string,
    location: string | null,
    address: string | null,
    status: DealStatus | null,
    statusDescription: string | null,
    statusDate: string | null,
    price: number | null,
    extrasArea: number | null,
    extrasCompany: string | null,
    extrasAttorney: string | null,
    extrasReferee: string | null,
    extrasLotShape: string | null,
    extrasLotSize: string | null,
    extrasTaxBill: number | null,
    parcel:  {
      __typename: "Parcel",
      id: string,
      // Deprecated
      title: string,
      // Geometry
      geometry: string | null,
    } | null,
  },
};

export interface AlterDealMutationVariables {
  dealId: string,
  data: DealInput,
};

export interface AlterDealMutation {
  dealAlter:  {
    __typename: "Deal",
    id: string,
    title: string,
    location: string | null,
    address: string | null,
    status: DealStatus | null,
    statusDescription: string | null,
    statusDate: string | null,
    price: number | null,
    extrasArea: number | null,
    extrasCompany: string | null,
    extrasAttorney: string | null,
    extrasReferee: string | null,
    extrasLotShape: string | null,
    extrasLotSize: string | null,
    extrasTaxBill: number | null,
    parcel:  {
      __typename: "Parcel",
      id: string,
      // Deprecated
      title: string,
      // Geometry
      geometry: string | null,
    } | null,
  },
};

export interface RemoveDealMutationVariables {
  dealId: string,
};

export interface RemoveDealMutation {
  dealRemove: string,
};

export interface DebugReadedStatesQuery {
  debugReaderStates:  Array< {
    __typename: "DebugReaderState",
    id: string,
    title: string,
    remaining: number,
  } >,
};

export interface DebugSendWelcomeEmailMutation {
  debugSendWelcomeEmail: string,
};

export interface FeatureFlagsQuery {
  featureFlags:  Array< {
    __typename: "FeatureFlag",
    id: string,
    key: string,
    title: string,
  } >,
};

export interface FeatureFlagAddMutationVariables {
  key: string,
  title: string,
};

export interface FeatureFlagAddMutation {
  featureFlagAdd:  {
    __typename: "FeatureFlag",
    id: string,
    key: string,
    title: string,
  },
};

export interface FeatureFlagEnableMutationVariables {
  accountId: string,
  featureId: string,
};

export interface FeatureFlagEnableMutation {
  superAccountFeatureAdd:  {
    __typename: "SuperAccount",
    id: string,
    features:  Array< {
      __typename: "FeatureFlag",
      id: string,
      key: string,
      title: string,
    } >,
  },
};

export interface FeatureFlagDisableMutationVariables {
  accountId: string,
  featureId: string,
};

export interface FeatureFlagDisableMutation {
  superAccountFeatureRemove:  {
    __typename: "SuperAccount",
    id: string,
    features:  Array< {
      __typename: "FeatureFlag",
      id: string,
      key: string,
      title: string,
    } >,
  },
};

export interface FoldersQuery {
  folders:  Array< {
    __typename: "Folder",
    id: string,
    name: string,
    special: SpecialFolder | null,
    parcelsCount: number,
  } >,
};

export interface FoldersSelectQuery {
  items:  Array< {
    __typename: "Folder",
    id: string,
    title: string,
  } >,
};

export interface FolderQueryVariables {
  folderId: string,
};

export interface FolderQuery {
  folder:  {
    __typename: "Folder",
    id: string,
    name: string,
    special: SpecialFolder | null,
    parcelsCount: number,
  },
};

export interface FolderItemsConnectionQueryVariables {
  folderId: string,
  cursor?: string | null,
  page?: number | null,
};

export interface FolderItemsConnectionQuery {
  items:  {
    __typename: "FolderConnection",
    edges:  Array< {
      __typename: "FolderEdge",
      node:  {
        __typename: "FolderItem",
        id: string,
        parcel:  {
          __typename: "Parcel",
          id: string,
          number:  {
            __typename: "ParcelNumber",
            borough: string | null,
            boroughId: string | null,
            block: string | null,
            blockPadded: string | null,
            lot: string | null,
            lotPadded: string | null,
            title: string,
          },
          address: string | null,
          // Geometry
          geometry: string | null,
          area:  {
            __typename: "DataFloat",
            value: number,
          } | null,
          depth:  {
            __typename: "DataFloat",
            value: number,
          } | null,
          front:  {
            __typename: "DataFloat",
            value: number,
          } | null,
          // Bunch of unsorted experimental data
          extrasZoning: Array< string > | null,
          extrasLandValue: number | null,
          extrasImprovementValue: number | null,
          extrasPropertyValue: number | null,
          extrasFixturesValue: number | null,
          extrasStories: number | null,
          extrasUnits: number | null,
          extrasRooms: number | null,
          extrasBathrooms: number | null,
          extrasBedrooms: number | null,
          extrasYear: number | null,
          extrasVacant: boolean | null,
          extrasNeighborhood: string | null,
          extrasBorough: string | null,
          extrasMetroDistance: number | null,
          extrasMetroStation: string | null,
          extrasTrainDistance: number | null,
          extrasTrainStation: string | null,
          extrasTrainLocalDistance: number | null,
          extrasTrainLocalStation: string | null,
          extrasNearestTransitDistance: number | null,
          extrasNearestTransitType: string | null,
          extrasNearestTransitStation: string | null,
          extrasLandUse: Array< string > | null,
          extrasSalesDate: string | null,
          extrasSalesPriorDate: string | null,
          extrasRecordationDate: string | null,
          extrasShapeType: string | null,
          extrasShapeSides: Array< number > | null,
          extrasFitProjects: Array< string > | null,
          extrasAnalyzed: boolean | null,
          extrasUnitCapacity: number | null,
          extrasUnitCapacityFar: number | null,
          extrasUnitCapacityDencity: number | null,
          folder:  {
            __typename: "Folder",
            id: string,
            name: string,
          } | null,
          // Addresses
          city:  {
            __typename: "City",
            id: string,
            name: string,
            county:  {
              __typename: "County",
              id: string,
              name: string,
            },
            state:  {
              __typename: "State",
              id: string,
              name: string,
              code: string,
            },
          },
        },
      },
      cursor: string,
    } >,
    pageInfo:  {
      __typename: "PageInfo",
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemsCount: number,
      currentPage: number,
      pagesCount: number,
      openEnded: boolean,
    },
  },
};

export interface CreateFolderMutationVariables {
  name: string,
  initialParcels?: Array< string > | null,
};

export interface CreateFolderMutation {
  folder:  {
    __typename: "Folder",
    id: string,
    name: string,
    special: SpecialFolder | null,
    parcelsCount: number,
    parcels:  {
      __typename: "ParcelConnection",
      edges:  Array< {
        __typename: "ParcelEdge",
        node:  {
          __typename: "Parcel",
          id: string,
          folder:  {
            __typename: "Folder",
            id: string,
            name: string,
          } | null,
        },
      } >,
      pageInfo:  {
        __typename: "PageInfo",
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        itemsCount: number,
        pagesCount: number,
        currentPage: number,
        openEnded: boolean,
      },
    },
  },
};

export interface AlterFolderMutationVariables {
  folderId: string,
  name: string,
};

export interface AlterFolderMutation {
  alaterFolder:  {
    __typename: "Folder",
    id: string,
    name: string,
  },
};

export interface DeleteFolderMutationVariables {
  folderId: string,
};

export interface DeleteFolderMutation {
  alphaDeleteFolder: string,
};

export interface AddToFolderMutationVariables {
  parcelId: string,
  folderId: string,
};

export interface AddToFolderMutation {
  addToFolder:  {
    __typename: "Parcel",
    id: string,
    folder:  {
      __typename: "Folder",
      id: string,
      name: string,
      parcelsCount: number,
    } | null,
  },
};

export interface SetParcelFolderMutationVariables {
  parcelId: string,
  folderId?: string | null,
};

export interface SetParcelFolderMutation {
  setFolder:  {
    __typename: "Parcel",
    id: string,
    folder:  {
      __typename: "Folder",
      id: string,
      name: string,
      parcelsCount: number,
    } | null,
  },
};

export interface AddToFolderFromSearchMutationVariables {
  folderId: string,
  query?: string | null,
  state: string,
  county: string,
  city: string,
};

export interface AddToFolderFromSearchMutation {
  alphaAddToFolderFromSearch: number,
};

export interface CreateFolderFromSearchMutationVariables {
  name: string,
  query?: string | null,
  state: string,
  county: string,
  city: string,
};

export interface CreateFolderFromSearchMutation {
  folder:  {
    __typename: "Folder",
    id: string,
    name: string,
    special: SpecialFolder | null,
    parcelsCount: number,
  },
};

export interface FolderItemsTileOverlayQueryVariables {
  box: GeoBox,
  folderId: string,
};

export interface FolderItemsTileOverlayQuery {
  tiles:  Array< {
    __typename: "FolderItem",
    id: string,
    center:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    } | null,
    parcel:  {
      __typename: "Parcel",
      id: string,
    },
  } > | null,
};

export interface MyOrganizationQuery {
  myOrganization:  {
    __typename: "Organization",
    id: string,
    superAccountId: string,
    isMine: boolean,
    isOwner: boolean,
    editorial: boolean,
    featured: boolean,
    isCommunity: boolean,
    name: string,
    photo: string | null,
    website: string | null,
    websiteTitle: string | null,
    about: string | null,
    twitter: string | null,
    facebook: string | null,
    linkedin: string | null,
    location: string | null,
    contacts:  Array< {
      __typename: "Profile",
      firstName: string | null,
      lastName: string | null,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
      } | null,
      phone: string | null,
      email: string | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    } >,
    members:  Array< {
      __typename: "OrganizationJoinedMember",
      role: OrganizationMemberRole,
      user:  {
        __typename: "User",
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
        photoRef:  {
          __typename: "ImageRef",
          uuid: string,
          crop:  {
            __typename: "ImageCrop",
            x: number,
            y: number,
            w: number,
            h: number,
          } | null,
        } | null,
      },
    } >,
    organizationType: Array< string > | null,
    interests: Array< string > | null,
    locations: Array< string > | null,
    channels:  Array< {
      __typename: "ChannelConversation",
      id: string,
      isRoot: boolean,
      title: string,
      photos: Array< string >,
      membersCount: number,
      memberRequestsCount: number,
      hidden: boolean,
      featured: boolean,
    } | null >,
    posts:  Array< {
      __typename: "AlphaDummyPost",
      text: string,
      type: string,
      description: string | null,
      date: string,
      image:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      activity: Array< string > | null,
      links:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      pinned: boolean | null,
    } > | null,
    lookingFor: Array< string > | null,
    geographies: Array< string > | null,
    doShapeAndForm: Array< string > | null,
    doCurrentUse: Array< string > | null,
    doGoodFitFor: Array< string > | null,
    doSpecialAttributes: Array< string > | null,
    doAvailability: Array< string > | null,
    arGeographies: Array< string > | null,
    arAreaRange: Array< string > | null,
    arHeightLimit: Array< string > | null,
    arActivityStatus: Array< string > | null,
    arAquisitionBudget: Array< string > | null,
    arAquisitionRate: Array< string > | null,
    arClosingTime: Array< string > | null,
    arSpecialAttributes: Array< string > | null,
    arLandUse: Array< string > | null,
    followed: boolean,
    potentialSites:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    siteSizes:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    developmentModels: Array< string > | null,
    availability: Array< string > | null,
    landUse: Array< string > | null,
    goodFor: Array< string > | null,
    specialAttributes: Array< string > | null,
    developmentOportunities:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
    } > | null,
    acquisitionRequests:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
    listingsAll:  Array< {
      __typename: "AlphaOrganizationListing",
      id: string,
      name: string,
      type: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
  } | null,
};

export interface MyOrganizationProfileQuery {
  organizationProfile:  {
    __typename: "OrganizationProfile",
    id: string,
    name: string,
    photoRef:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    website: string | null,
    websiteTitle: string | null,
    about: string | null,
    twitter: string | null,
    facebook: string | null,
    linkedin: string | null,
    location: string | null,
    contacts:  Array< {
      __typename: "OrganizationContact",
      name: string,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      position: string | null,
      email: string | null,
      phone: string | null,
      link: string | null,
    } >,
    published: boolean,
    editorial: boolean,
    featured: boolean,
    organizationType: Array< string > | null,
    interests: Array< string > | null,
    locations: Array< string > | null,
    posts:  Array< {
      __typename: "AlphaDummyPost",
      text: string,
      type: string,
      description: string | null,
      date: string,
      image:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      activity: Array< string > | null,
      links:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      pinned: boolean | null,
    } > | null,
    lookingFor: Array< string > | null,
    geographies: Array< string > | null,
    doShapeAndForm: Array< string > | null,
    doCurrentUse: Array< string > | null,
    doGoodFitFor: Array< string > | null,
    doSpecialAttributes: Array< string > | null,
    doAvailability: Array< string > | null,
    arGeographies: Array< string > | null,
    arAreaRange: Array< string > | null,
    arHeightLimit: Array< string > | null,
    arActivityStatus: Array< string > | null,
    arAquisitionBudget: Array< string > | null,
    arAquisitionRate: Array< string > | null,
    arClosingTime: Array< string > | null,
    arSpecialAttributes: Array< string > | null,
    arLandUse: Array< string > | null,
    potentialSites:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    siteSizes:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    developmentModels: Array< string > | null,
    availability: Array< string > | null,
    landUse: Array< string > | null,
    goodFor: Array< string > | null,
    specialAttributes: Array< string > | null,
    developmentOportunities:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
    } > | null,
    acquisitionRequests:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
    listingsAll:  Array< {
      __typename: "AlphaOrganizationListing",
      id: string,
      name: string,
      type: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
  },
};

export interface MyOrganizationsQuery {
  myOrganizations:  Array< {
    __typename: "Organization",
    id: string,
    name: string,
    photo: string | null,
  } >,
};

export interface UpdateOrganizationMutationVariables {
  input: UpdateOrganizationProfileInput,
  organizationId?: string | null,
};

export interface UpdateOrganizationMutation {
  updateOrganizationProfile:  {
    __typename: "OrganizationProfile",
    id: string,
    name: string,
    photoRef:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    website: string | null,
    websiteTitle: string | null,
    about: string | null,
    twitter: string | null,
    facebook: string | null,
    linkedin: string | null,
    location: string | null,
    contacts:  Array< {
      __typename: "OrganizationContact",
      name: string,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      position: string | null,
      email: string | null,
      phone: string | null,
      link: string | null,
    } >,
    published: boolean,
    editorial: boolean,
    featured: boolean,
    organizationType: Array< string > | null,
    interests: Array< string > | null,
    locations: Array< string > | null,
    posts:  Array< {
      __typename: "AlphaDummyPost",
      text: string,
      type: string,
      description: string | null,
      date: string,
      image:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      activity: Array< string > | null,
      links:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      pinned: boolean | null,
    } > | null,
    lookingFor: Array< string > | null,
    geographies: Array< string > | null,
    doShapeAndForm: Array< string > | null,
    doCurrentUse: Array< string > | null,
    doGoodFitFor: Array< string > | null,
    doSpecialAttributes: Array< string > | null,
    doAvailability: Array< string > | null,
    arGeographies: Array< string > | null,
    arAreaRange: Array< string > | null,
    arHeightLimit: Array< string > | null,
    arActivityStatus: Array< string > | null,
    arAquisitionBudget: Array< string > | null,
    arAquisitionRate: Array< string > | null,
    arClosingTime: Array< string > | null,
    arSpecialAttributes: Array< string > | null,
    arLandUse: Array< string > | null,
    potentialSites:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    siteSizes:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    developmentModels: Array< string > | null,
    availability: Array< string > | null,
    landUse: Array< string > | null,
    goodFor: Array< string > | null,
    specialAttributes: Array< string > | null,
    developmentOportunities:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
    } > | null,
    acquisitionRequests:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
    listingsAll:  Array< {
      __typename: "AlphaOrganizationListing",
      id: string,
      name: string,
      type: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
  },
};

export interface OrganizationQueryVariables {
  organizationId: string,
};

export interface OrganizationQuery {
  organization:  {
    __typename: "Organization",
    id: string,
    superAccountId: string,
    isMine: boolean,
    isOwner: boolean,
    editorial: boolean,
    featured: boolean,
    isCommunity: boolean,
    name: string,
    photo: string | null,
    website: string | null,
    websiteTitle: string | null,
    about: string | null,
    twitter: string | null,
    facebook: string | null,
    linkedin: string | null,
    location: string | null,
    contacts:  Array< {
      __typename: "Profile",
      firstName: string | null,
      lastName: string | null,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
      } | null,
      phone: string | null,
      email: string | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    } >,
    members:  Array< {
      __typename: "OrganizationJoinedMember",
      role: OrganizationMemberRole,
      user:  {
        __typename: "User",
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
        photoRef:  {
          __typename: "ImageRef",
          uuid: string,
          crop:  {
            __typename: "ImageCrop",
            x: number,
            y: number,
            w: number,
            h: number,
          } | null,
        } | null,
      },
    } >,
    organizationType: Array< string > | null,
    interests: Array< string > | null,
    locations: Array< string > | null,
    channels:  Array< {
      __typename: "ChannelConversation",
      id: string,
      isRoot: boolean,
      title: string,
      photos: Array< string >,
      photo: string | null,
      membersCount: number,
      memberRequestsCount: number,
      hidden: boolean,
      featured: boolean,
    } | null >,
    posts:  Array< {
      __typename: "AlphaDummyPost",
      text: string,
      type: string,
      description: string | null,
      date: string,
      image:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      activity: Array< string > | null,
      links:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      pinned: boolean | null,
    } > | null,
    lookingFor: Array< string > | null,
    geographies: Array< string > | null,
    doShapeAndForm: Array< string > | null,
    doCurrentUse: Array< string > | null,
    doGoodFitFor: Array< string > | null,
    doSpecialAttributes: Array< string > | null,
    doAvailability: Array< string > | null,
    arGeographies: Array< string > | null,
    arAreaRange: Array< string > | null,
    arHeightLimit: Array< string > | null,
    arActivityStatus: Array< string > | null,
    arAquisitionBudget: Array< string > | null,
    arAquisitionRate: Array< string > | null,
    arClosingTime: Array< string > | null,
    arSpecialAttributes: Array< string > | null,
    arLandUse: Array< string > | null,
    followed: boolean,
    potentialSites:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    siteSizes:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    developmentModels: Array< string > | null,
    availability: Array< string > | null,
    landUse: Array< string > | null,
    goodFor: Array< string > | null,
    specialAttributes: Array< string > | null,
    developmentOportunities:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
    } > | null,
    acquisitionRequests:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
    listingsAll:  Array< {
      __typename: "AlphaOrganizationListing",
      id: string,
      name: string,
      type: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
  },
};

export interface OrganizationProfileQueryVariables {
  organizationId: string,
};

export interface OrganizationProfileQuery {
  organizationProfile:  {
    __typename: "OrganizationProfile",
    id: string,
    name: string,
    photoRef:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    website: string | null,
    websiteTitle: string | null,
    about: string | null,
    twitter: string | null,
    facebook: string | null,
    linkedin: string | null,
    location: string | null,
    contacts:  Array< {
      __typename: "OrganizationContact",
      name: string,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      position: string | null,
      email: string | null,
      phone: string | null,
      link: string | null,
    } >,
    published: boolean,
    editorial: boolean,
    featured: boolean,
    organizationType: Array< string > | null,
    interests: Array< string > | null,
    locations: Array< string > | null,
    posts:  Array< {
      __typename: "AlphaDummyPost",
      text: string,
      type: string,
      description: string | null,
      date: string,
      image:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      activity: Array< string > | null,
      links:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      pinned: boolean | null,
    } > | null,
    lookingFor: Array< string > | null,
    geographies: Array< string > | null,
    doShapeAndForm: Array< string > | null,
    doCurrentUse: Array< string > | null,
    doGoodFitFor: Array< string > | null,
    doSpecialAttributes: Array< string > | null,
    doAvailability: Array< string > | null,
    arGeographies: Array< string > | null,
    arAreaRange: Array< string > | null,
    arHeightLimit: Array< string > | null,
    arActivityStatus: Array< string > | null,
    arAquisitionBudget: Array< string > | null,
    arAquisitionRate: Array< string > | null,
    arClosingTime: Array< string > | null,
    arSpecialAttributes: Array< string > | null,
    arLandUse: Array< string > | null,
    potentialSites:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    siteSizes:  Array< {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } > | null,
    developmentModels: Array< string > | null,
    availability: Array< string > | null,
    landUse: Array< string > | null,
    goodFor: Array< string > | null,
    specialAttributes: Array< string > | null,
    developmentOportunities:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
    } > | null,
    acquisitionRequests:  Array< {
      __typename: "AlphaOrganizationListing",
      name: string,
      id: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
    listingsAll:  Array< {
      __typename: "AlphaOrganizationListing",
      id: string,
      name: string,
      type: string,
      summary: string | null,
      specialAttributes: Array< string > | null,
      status: string | null,
      updatedAt: string,
      location:  {
        __typename: "MapPoint",
        lat: number,
        lon: number,
      } | null,
      locationTitle: string | null,
      availability: string | null,
      area: number | null,
      price: number | null,
      dealType: Array< string > | null,
      shapeAndForm: Array< string > | null,
      currentUse: Array< string > | null,
      goodFitFor: Array< string > | null,
      additionalLinks:  Array< {
        __typename: "AlphaOrganizationListingLink",
        text: string,
        url: string,
      } > | null,
      photo:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
      shortDescription: string | null,
      areaRange:  {
        __typename: "Range",
        from: number | null,
        to: number | null,
      } | null,
      geographies: Array< string > | null,
      landUse: Array< string > | null,
      unitCapacity: Array< string > | null,
    } > | null,
  },
};

export interface FollowOrganizationMutationVariables {
  organizationId: string,
  follow: boolean,
};

export interface FollowOrganizationMutation {
  followOrganization:  {
    __typename: "Organization",
    id: string,
    alphaFollowed: boolean,
  },
};

export interface ExploreOrganizationsQueryVariables {
  query?: string | null,
  sort?: string | null,
  page?: number | null,
  after?: string | null,
};

export interface ExploreOrganizationsQuery {
  items:  {
    __typename: "OrganizationsConnection",
    edges:  Array< {
      __typename: "OrganizationsEdge",
      node:  {
        __typename: "Organization",
        id: string,
        superAccountId: string,
        name: string,
        photo: string | null,
        locations: Array< string > | null,
        isMine: boolean,
        organizationType: Array< string > | null,
        interests: Array< string > | null,
        followed: boolean,
        published: boolean,
        editorial: boolean,
        featured: boolean,
        members:  Array< {
          __typename: "OrganizationJoinedMember",
          user:  {
            __typename: "User",
            id: string,
            name: string,
            picture: string | null,
          },
        } >,
        channels:  Array< {
          __typename: "ChannelConversation",
          id: string,
          hidden: boolean,
        } | null >,
      },
      cursor: string,
    } >,
    pageInfo:  {
      __typename: "PageInfo",
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemsCount: number,
      currentPage: number,
      pagesCount: number,
      openEnded: boolean,
    },
  },
};

export interface ExploreComunityQueryVariables {
  query?: string | null,
  sort?: string | null,
  page?: number | null,
};

export interface ExploreComunityQuery {
  items:  {
    __typename: "OrganizationsConnection",
    edges:  Array< {
      __typename: "OrganizationsEdge",
      node:  {
        __typename: "Organization",
        id: string,
        superAccountId: string,
        name: string,
        photo: string | null,
        locations: Array< string > | null,
        isMine: boolean,
        organizationType: Array< string > | null,
        interests: Array< string > | null,
        followed: boolean,
        published: boolean,
        editorial: boolean,
        featured: boolean,
        members:  Array< {
          __typename: "OrganizationJoinedMember",
          user:  {
            __typename: "User",
            id: string,
            name: string,
            picture: string | null,
          },
        } >,
        channels:  Array< {
          __typename: "ChannelConversation",
          id: string,
          hidden: boolean,
        } | null >,
      },
      cursor: string,
    } >,
    pageInfo:  {
      __typename: "PageInfo",
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemsCount: number,
      currentPage: number,
      pagesCount: number,
      openEnded: boolean,
    },
  },
};

export interface CreateListingMutationVariables {
  type: string,
  input: AlphaOrganizationListingInput,
};

export interface CreateListingMutation {
  createListing:  {
    __typename: "AlphaOrganizationListing",
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: "MapPoint",
      lat: number,
      lon: number,
    } | null,
    locationTitle: string | null,
    availability: string | null,
    area: number | null,
    price: number | null,
    dealType: Array< string > | null,
    shapeAndForm: Array< string > | null,
    currentUse: Array< string > | null,
    goodFitFor: Array< string > | null,
    additionalLinks:  Array< {
      __typename: "AlphaOrganizationListingLink",
      text: string,
      url: string,
    } > | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } | null,
    geographies: Array< string > | null,
    landUse: Array< string > | null,
    unitCapacity: Array< string > | null,
  },
};

export interface EditListingMutationVariables {
  id: string,
  input: AlphaOrganizationListingInput,
};

export interface EditListingMutation {
  editListing:  {
    __typename: "AlphaOrganizationListing",
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: "MapPoint",
      lat: number,
      lon: number,
    } | null,
    locationTitle: string | null,
    availability: string | null,
    area: number | null,
    price: number | null,
    dealType: Array< string > | null,
    shapeAndForm: Array< string > | null,
    currentUse: Array< string > | null,
    goodFitFor: Array< string > | null,
    additionalLinks:  Array< {
      __typename: "AlphaOrganizationListingLink",
      text: string,
      url: string,
    } > | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } | null,
    geographies: Array< string > | null,
    landUse: Array< string > | null,
    unitCapacity: Array< string > | null,
  },
};

export interface DeleteListingMutationVariables {
  id: string,
};

export interface DeleteListingMutation {
  alphaOrganizationDeleteListing: string,
};

export interface OrganizationMembersQueryVariables {
  orgId: string,
};

export interface OrganizationMembersQuery {
  alphaOrganizationMembers:  Array<( {
      __typename: "OrganizationJoinedMember",
      user:  {
        __typename: "User",
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization:  {
          __typename: "Organization",
          id: string,
          name: string,
          photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
      },
      joinedAt: string | null,
      showInContacts: boolean,
      email: string,
      role: OrganizationMemberRole,
    } | {
      __typename: "OrganizationIvitedMember",
      firstName: string | null,
      lastName: string | null,
      inviteId: string,
      email: string,
      role: OrganizationMemberRole,
    }
  ) >,
};

export interface OrganizationChangeMemberRoleMutationVariables {
  memberId: string,
  newRole: OrganizationMemberRole,
  organizationId: string,
};

export interface OrganizationChangeMemberRoleMutation {
  alphaOrganizationChangeMemberRole: string,
};

export interface OrganizationRemoveMemberMutationVariables {
  memberId: string,
  organizationId: string,
};

export interface OrganizationRemoveMemberMutation {
  alphaOrganizationRemoveMember: string,
};

export interface OrganizationInviteMembersMutationVariables {
  inviteRequests: Array< InviteRequest >,
};

export interface OrganizationInviteMembersMutation {
  alphaOrganizationInviteMembers: string,
};

export interface OrganizationPublicInviteQuery {
  publicInvite:  {
    __typename: "Invite",
    id: string,
    key: string,
    ttl: string | null,
  } | null,
};

export interface OrganizationCreatePublicInviteMutationVariables {
  expirationDays?: number | null,
};

export interface OrganizationCreatePublicInviteMutation {
  alphaOrganizationCreatePublicInvite:  {
    __typename: "Invite",
    id: string,
    key: string,
    ttl: string | null,
  },
};

export interface OrganizationDeletePublicInviteMutation {
  alphaOrganizationDeletePublicInvite: string,
};

export interface OrganizationInviteOrganizationMutationVariables {
  inviteRequests: Array< InviteRequestOrganization >,
};

export interface OrganizationInviteOrganizationMutation {
  alphaOrganizationInviteOrganization: string,
};

export interface OrganizationPublicInviteOrganizatonsQuery {
  publicInvite:  {
    __typename: "Invite",
    id: string,
    key: string,
    ttl: string | null,
  } | null,
};

export interface OrganizationCreatePublicInviteOrganizatonsMutationVariables {
  expirationDays?: number | null,
};

export interface OrganizationCreatePublicInviteOrganizatonsMutation {
  alphaOrganizationCreatePublicInviteForOrganizations:  {
    __typename: "Invite",
    id: string,
    key: string,
    ttl: string | null,
  },
};

export interface OrganizationDeletePublicInviteOrganizatonsMutation {
  alphaOrganizationDeletePublicInviteForOrganizations: string,
};

export interface OrganizationActivateByInviteMutationVariables {
  inviteKey: string,
};

export interface OrganizationActivateByInviteMutation {
  alphaJoinGlobalInvite: string,
};

export interface OrganizationAlterPublishedMutationVariables {
  organizationId: string,
  published: boolean,
};

export interface OrganizationAlterPublishedMutation {
  alphaAlterPublished:  {
    __typename: "Organization",
    id: string,
    superAccountId: string,
    name: string,
    photo: string | null,
    locations: Array< string > | null,
    isMine: boolean,
    organizationType: Array< string > | null,
    interests: Array< string > | null,
    followed: boolean,
    published: boolean,
    editorial: boolean,
    featured: boolean,
    members:  Array< {
      __typename: "OrganizationJoinedMember",
      user:  {
        __typename: "User",
        id: string,
        name: string,
        picture: string | null,
      },
    } >,
    channels:  Array< {
      __typename: "ChannelConversation",
      id: string,
      hidden: boolean,
    } | null >,
  },
};

export interface HitsPopularQueryVariables {
  categories: Array< string >,
};

export interface HitsPopularQuery {
  hitsPopular:  Array< {
    __typename: "CategoryHits",
    category: string,
    tags: Array< string >,
  } > | null,
};

export interface HitsAddMutationVariables {
  hits: Array< HitInput >,
};

export interface HitsAddMutation {
  hitsAdd: string | null,
};

export interface AlterMemberAsContactMutationVariables {
  orgId: string,
  memberId: string,
  showInContacts: boolean,
};

export interface AlterMemberAsContactMutation {
  alphaAlterMemberAsContact: string,
};

export interface OrganizationByPrefixQueryVariables {
  query: string,
};

export interface OrganizationByPrefixQuery {
  organizationByPrefix:  {
    __typename: "Organization",
    id: string,
    superAccountId: string,
    name: string,
    photo: string | null,
    locations: Array< string > | null,
    isMine: boolean,
    organizationType: Array< string > | null,
    interests: Array< string > | null,
    followed: boolean,
    published: boolean,
    editorial: boolean,
    featured: boolean,
    members:  Array< {
      __typename: "OrganizationJoinedMember",
      user:  {
        __typename: "User",
        id: string,
        name: string,
        picture: string | null,
      },
    } >,
    channels:  Array< {
      __typename: "ChannelConversation",
      id: string,
      hidden: boolean,
    } | null >,
  } | null,
};

export interface TopCategoriesQuery {
  topCategories: Array< string >,
};

export interface BlocksConnectionQueryVariables {
  cursor?: string | null,
  page?: number | null,
};

export interface BlocksConnectionQuery {
  items:  {
    __typename: "BlockConnection",
    edges:  Array< {
      __typename: "BlockEdge",
      node:  {
        __typename: "Block",
        id: string,
        title: string,
        extrasArea: number | null,
        extrasSupervisorDistrict: string | null,
        extrasZoning: Array< string > | null,
      },
      cursor: string,
    } >,
    pageInfo:  {
      __typename: "PageInfo",
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemsCount: number,
      currentPage: number,
      pagesCount: number,
      openEnded: boolean,
    },
  },
};

export interface BlockQueryVariables {
  blockId: string,
};

export interface BlockQuery {
  item:  {
    __typename: "Block",
    id: string,
    title: string,
    extrasArea: number | null,
    extrasZoning: Array< string > | null,
    extrasSupervisorDistrict: string | null,
    geometry: string | null,
    parcels:  Array< {
      __typename: "Parcel",
      id: string,
      // Deprecated
      title: string,
      // Geometry
      geometry: string | null,
      // Bunch of unsorted experimental data
      extrasZoning: Array< string > | null,
    } >,
  },
};

export interface ParcelsConnectionQueryVariables {
  cursor?: string | null,
  query?: string | null,
  page?: number | null,
  state: string,
  county: string,
  city: string,
};

export interface ParcelsConnectionQuery {
  items:  {
    __typename: "ParcelConnection",
    edges:  Array< {
      __typename: "ParcelEdge",
      node:  {
        __typename: "Parcel",
        id: string,
        number:  {
          __typename: "ParcelNumber",
          borough: string | null,
          boroughId: string | null,
          block: string | null,
          blockPadded: string | null,
          lot: string | null,
          lotPadded: string | null,
          title: string,
        },
        address: string | null,
        // Geometry
        geometry: string | null,
        area:  {
          __typename: "DataFloat",
          value: number,
        } | null,
        depth:  {
          __typename: "DataFloat",
          value: number,
        } | null,
        front:  {
          __typename: "DataFloat",
          value: number,
        } | null,
        // Bunch of unsorted experimental data
        extrasZoning: Array< string > | null,
        extrasLandValue: number | null,
        extrasImprovementValue: number | null,
        extrasPropertyValue: number | null,
        extrasFixturesValue: number | null,
        extrasStories: number | null,
        extrasUnits: number | null,
        extrasRooms: number | null,
        extrasBathrooms: number | null,
        extrasBedrooms: number | null,
        extrasYear: number | null,
        extrasVacant: boolean | null,
        extrasNeighborhood: string | null,
        extrasBorough: string | null,
        extrasMetroDistance: number | null,
        extrasMetroStation: string | null,
        extrasTrainDistance: number | null,
        extrasTrainStation: string | null,
        extrasTrainLocalDistance: number | null,
        extrasTrainLocalStation: string | null,
        extrasNearestTransitDistance: number | null,
        extrasNearestTransitType: string | null,
        extrasNearestTransitStation: string | null,
        extrasLandUse: Array< string > | null,
        extrasSalesDate: string | null,
        extrasSalesPriorDate: string | null,
        extrasRecordationDate: string | null,
        extrasShapeType: string | null,
        extrasShapeSides: Array< number > | null,
        extrasFitProjects: Array< string > | null,
        extrasAnalyzed: boolean | null,
        extrasUnitCapacity: number | null,
        extrasUnitCapacityFar: number | null,
        extrasUnitCapacityDencity: number | null,
        folder:  {
          __typename: "Folder",
          id: string,
          name: string,
        } | null,
        // Addresses
        city:  {
          __typename: "City",
          id: string,
          name: string,
          county:  {
            __typename: "County",
            id: string,
            name: string,
          },
          state:  {
            __typename: "State",
            id: string,
            name: string,
            code: string,
          },
        },
      },
      cursor: string,
    } >,
    pageInfo:  {
      __typename: "PageInfo",
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemsCount: number,
      currentPage: number,
      pagesCount: number,
      openEnded: boolean,
    },
  },
};

export interface ParcelsFavoritesQuery {
  items:  Array< {
    __typename: "Parcel",
    id: string,
    number:  {
      __typename: "ParcelNumber",
      borough: string | null,
      boroughId: string | null,
      block: string | null,
      blockPadded: string | null,
      lot: string | null,
      lotPadded: string | null,
      title: string,
    },
    address: string | null,
    // Geometry
    geometry: string | null,
    area:  {
      __typename: "DataFloat",
      value: number,
    } | null,
    depth:  {
      __typename: "DataFloat",
      value: number,
    } | null,
    front:  {
      __typename: "DataFloat",
      value: number,
    } | null,
    // Bunch of unsorted experimental data
    extrasZoning: Array< string > | null,
    extrasLandValue: number | null,
    extrasImprovementValue: number | null,
    extrasPropertyValue: number | null,
    extrasFixturesValue: number | null,
    extrasStories: number | null,
    extrasUnits: number | null,
    extrasRooms: number | null,
    extrasBathrooms: number | null,
    extrasBedrooms: number | null,
    extrasYear: number | null,
    extrasVacant: boolean | null,
    extrasNeighborhood: string | null,
    extrasBorough: string | null,
    extrasMetroDistance: number | null,
    extrasMetroStation: string | null,
    extrasTrainDistance: number | null,
    extrasTrainStation: string | null,
    extrasTrainLocalDistance: number | null,
    extrasTrainLocalStation: string | null,
    extrasNearestTransitDistance: number | null,
    extrasNearestTransitType: string | null,
    extrasNearestTransitStation: string | null,
    extrasLandUse: Array< string > | null,
    extrasSalesDate: string | null,
    extrasSalesPriorDate: string | null,
    extrasRecordationDate: string | null,
    extrasShapeType: string | null,
    extrasShapeSides: Array< number > | null,
    extrasFitProjects: Array< string > | null,
    extrasAnalyzed: boolean | null,
    extrasUnitCapacity: number | null,
    extrasUnitCapacityFar: number | null,
    extrasUnitCapacityDencity: number | null,
    folder:  {
      __typename: "Folder",
      id: string,
      name: string,
    } | null,
    // Addresses
    city:  {
      __typename: "City",
      id: string,
      name: string,
      county:  {
        __typename: "County",
        id: string,
        name: string,
      },
      state:  {
        __typename: "State",
        id: string,
        name: string,
        code: string,
      },
    },
  } >,
};

export interface ParcelsFavoritesCountQuery {
  parcelFavoritesCount: number,
  dealsCount: number,
};

export interface ParcelQueryVariables {
  parcelId: string,
};

export interface ParcelQuery {
  item:  {
    __typename: "Parcel",
    id: string,
    number:  {
      __typename: "ParcelNumber",
      borough: string | null,
      boroughId: string | null,
      block: string | null,
      blockPadded: string | null,
      lot: string | null,
      lotPadded: string | null,
      title: string,
    },
    // Geometry
    geometry: string | null,
    center:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    } | null,
    address: string | null,
    compatibleBuildings:  Array< {
      __typename: "BuildingLocation",
      key: string,
      title: string,
      width: number,
      height: number,
      center:  {
        __typename: "Geo",
        latitude: number,
        longitude: number,
      } | null,
      angle: number | null,
      shape: string | null,
    } > | null,
    // Addresses
    city:  {
      __typename: "City",
      id: string,
      name: string,
      county:  {
        __typename: "County",
        id: string,
        name: string,
      },
      state:  {
        __typename: "State",
        id: string,
        name: string,
        code: string,
      },
    },
    area:  {
      __typename: "DataFloat",
      value: number,
    } | null,
    depth:  {
      __typename: "DataFloat",
      value: number,
    } | null,
    front:  {
      __typename: "DataFloat",
      value: number,
    } | null,
    extrasSupervisorDistrict: string | null,
    // Bunch of unsorted experimental data
    extrasZoning: Array< string > | null,
    extrasLandValue: number | null,
    extrasImprovementValue: number | null,
    extrasPropertyValue: number | null,
    extrasFixturesValue: number | null,
    extrasStories: number | null,
    extrasUnits: number | null,
    extrasRooms: number | null,
    extrasBathrooms: number | null,
    extrasBedrooms: number | null,
    extrasYear: number | null,
    extrasVacant: boolean | null,
    extrasNeighborhood: string | null,
    extrasBorough: string | null,
    extrasMetroDistance: number | null,
    extrasMetroStation: string | null,
    extrasTrainDistance: number | null,
    extrasTrainStation: string | null,
    extrasTrainLocalDistance: number | null,
    extrasTrainLocalStation: string | null,
    extrasNearestTransitDistance: number | null,
    extrasNearestTransitType: string | null,
    extrasNearestTransitStation: string | null,
    extrasLandUse: Array< string > | null,
    extrasSalesDate: string | null,
    extrasSalesPriorDate: string | null,
    extrasRecordationDate: string | null,
    extrasOwnerName: string | null,
    extrasOwnerType: OwnerType | null,
    extrasOwnerPublic: boolean | null,
    extrasShapeType: string | null,
    extrasShapeSides: Array< number > | null,
    extrasFitProjects: Array< string > | null,
    extrasAnalyzed: boolean | null,
    extrasUnitCapacity: number | null,
    extrasUnitCapacityFar: number | null,
    extrasUnitCapacityDencity: number | null,
    folder:  {
      __typename: "Folder",
      id: string,
      name: string,
    } | null,
    // User Data
    userData:  {
      __typename: "ParcelUserData",
      notes: string | null,
    } | null,
    // Linked Data
    opportunity:  {
      __typename: "Opportunity",
      id: string,
      priority: OpportunityPriority,
      state: OpportunityState,
    } | null,
    metadata:  {
      __typename: "ParcelMetadata",
      description: string | null,
      available: boolean | null,
      currentUse: ParcelUse | null,
      isOkForTower: boolean | null,
    },
    likes:  {
      __typename: "Likes",
      liked: boolean,
      count: number | null,
    },
    permits:  Array< {
      __typename: "Permit",
      id: string,
      createdAt: string | null,
      status: PermitStatus | null,
      statusUpdatedAt: string | null,
      type: PermitType | null,
      typeWood: boolean | null,
      description: string | null,
      approvalTime: number | null,
      proposedUnits: number | null,
      existingUnits: number | null,
      governmentalUrl: string,
    } >,
    // Metadata
    links:  Array< {
      __typename: "Link",
      title: string,
      url: string,
    } >,
  },
};

export interface ParcelsTileOverlayQueryVariables {
  box: GeoBox,
  query?: string | null,
};

export interface ParcelsTileOverlayQuery {
  tiles:  Array< {
    __typename: "Parcel",
    id: string,
    // Geometry
    geometry: string | null,
  } > | null,
};

export interface ParcelsMapSearchQueryVariables {
  box: GeoBox,
  query: string,
  zoom: number,
};

export interface ParcelsMapSearchQuery {
  results:  Array< {
    __typename: "MapPoint",
    ref: string | null,
    count: number | null,
    lat: number,
    lon: number,
  } >,
};

export interface ParcelsPointOverlayQueryVariables {
  box: GeoBox,
  query?: string | null,
};

export interface ParcelsPointOverlayQuery {
  tiles:  Array< {
    __typename: "Parcel",
    id: string,
    center:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    } | null,
  } > | null,
};

export interface BlocksTileOverlayQueryVariables {
  box: GeoBox,
  query?: string | null,
};

export interface BlocksTileOverlayQuery {
  tiles:  Array< {
    __typename: "Block",
    id: string,
    geometry: string | null,
  } > | null,
};

export interface ParcelAlterMutationVariables {
  parcelId: string,
  data: ParcelMetadataInput,
};

export interface ParcelAlterMutation {
  parcelAlterMetadata:  {
    __typename: "Parcel",
    id: string,
    metadata:  {
      __typename: "ParcelMetadata",
      description: string | null,
      available: boolean | null,
      currentUse: ParcelUse | null,
      isOkForTower: boolean | null,
    },
  },
};

export interface ParcelLikeMutationVariables {
  parcelId: string,
};

export interface ParcelLikeMutation {
  likeParcel:  {
    __typename: "Parcel",
    id: string,
    likes:  {
      __typename: "Likes",
      liked: boolean,
      count: number | null,
    },
  },
};

export interface ParcelUnlikeMutationVariables {
  parcelId: string,
};

export interface ParcelUnlikeMutation {
  unlikeParcel:  {
    __typename: "Parcel",
    id: string,
    likes:  {
      __typename: "Likes",
      liked: boolean,
      count: number | null,
    },
  },
};

export interface ParcelsStatsQueryVariables {
  query?: string | null,
  state: string,
  county: string,
  city: string,
};

export interface ParcelsStatsQuery {
  parcelsStats: number,
};

export interface ParcelsSearchQueryVariables {
  query: string,
};

export interface ParcelsSearchQuery {
  items:  Array< {
    __typename: "Parcel",
    id: string,
    // Deprecated
    title: string,
  } >,
};

export interface ParcelNotesMutationVariables {
  parcelId: string,
  notes: string,
};

export interface ParcelNotesMutation {
  alphaSetNote:  {
    __typename: "Parcel",
    id: string,
    // User Data
    userData:  {
      __typename: "ParcelUserData",
      notes: string | null,
    } | null,
  },
};

export interface PermissionsQuery {
  permissions:  {
    __typename: "Permissions",
    roles: Array< string >,
  },
};

export interface SuperAdminsQuery {
  superAdmins:  Array< {
    __typename: "SuperAdmin",
    role: SuperAdminRole,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    },
    email: string | null,
  } >,
};

export interface SuperAccountsQuery {
  superAccounts:  Array< {
    __typename: "SuperAccount",
    id: string,
    orgId: string,
    title: string,
    state: SuperAccountState,
  } >,
};

export interface SuperAccountQueryVariables {
  accountId: string,
  viaOrgId?: boolean | null,
};

export interface SuperAccountQuery {
  superAccount:  {
    __typename: "SuperAccount",
    id: string,
    title: string,
    state: SuperAccountState,
    members:  Array< {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    } >,
    features:  Array< {
      __typename: "FeatureFlag",
      id: string,
      key: string,
      title: string,
    } >,
    orgId: string,
    createdAt: string | null,
    createdBy:  {
      __typename: "User",
      name: string,
    } | null,
    published: boolean,
  },
};

export interface SuperAccountRenameMutationVariables {
  accountId: string,
  title: string,
};

export interface SuperAccountRenameMutation {
  superAccountRename:  {
    __typename: "SuperAccount",
    id: string,
    title: string,
  },
};

export interface SuperAccountActivateMutationVariables {
  accountId: string,
};

export interface SuperAccountActivateMutation {
  superAccountActivate:  {
    __typename: "SuperAccount",
    id: string,
    state: SuperAccountState,
  },
};

export interface SuperAccountSuspendMutationVariables {
  accountId: string,
};

export interface SuperAccountSuspendMutation {
  superAccountSuspend:  {
    __typename: "SuperAccount",
    id: string,
    state: SuperAccountState,
  },
};

export interface SuperAccountPendMutationVariables {
  accountId: string,
};

export interface SuperAccountPendMutation {
  superAccountPend:  {
    __typename: "SuperAccount",
    id: string,
    state: SuperAccountState,
  },
};

export interface SuperAccountAddMutationVariables {
  title: string,
};

export interface SuperAccountAddMutation {
  superAccountAdd:  {
    __typename: "SuperAccount",
    id: string,
  },
};

export interface SuperAccountMemberAddMutationVariables {
  accountId: string,
  userId: string,
};

export interface SuperAccountMemberAddMutation {
  superAccountMemberAdd:  {
    __typename: "SuperAccount",
    id: string,
    members:  Array< {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    } >,
  },
};

export interface SuperAccountMemberRemoveMutationVariables {
  accountId: string,
  userId: string,
};

export interface SuperAccountMemberRemoveMutation {
  superAccountMemberRemove:  {
    __typename: "SuperAccount",
    id: string,
    members:  Array< {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
    } >,
  },
};

export interface SuperAdminAddMutationVariables {
  userId: string,
  role: SuperAdminRole,
};

export interface SuperAdminAddMutation {
  superAdminAdd: string,
};

export interface SuperAdminRemoveMutationVariables {
  userId: string,
};

export interface SuperAdminRemoveMutation {
  superAdminRemove: string,
};

export interface SuperChatsStatsQueryVariables {
  fromDate: string,
  toDate: string,
};

export interface SuperChatsStatsQuery {
  statsChats:  {
    __typename: "ChatStats",
    messagesSent: number,
    usersActive: number,
    usersMutedEmail: number,
    messagesLeaderboard:  Array< {
      __typename: "MessagesLeaderboardItem",
      user:  {
        __typename: "User",
        id: string,
        name: string,
        photo: string | null,
      },
      count: number,
    } >,
    usersMutedOpenlandBeta: number,
  },
};

export interface SuperMessagesSentStatsQueryVariables {
  fromDate: string,
  toDate: string,
  trunc?: string | null,
};

export interface SuperMessagesSentStatsQuery {
  messagesSentStats:  Array< {
    __typename: "MessagesSentEntry",
    date: string,
    count: number,
  } >,
};

export interface PermitQueryVariables {
  permitId: string,
};

export interface PermitQuery {
  permit:  {
    __typename: "Permit",
    id: string,
    issuedAt: string | null,
    createdAt: string | null,
    startedAt: string | null,
    expiresAt: string | null,
    expiredAt: string | null,
    completedAt: string | null,
    filedAt: string | null,
    status: PermitStatus | null,
    statusUpdatedAt: string | null,
    type: PermitType | null,
    typeWood: boolean | null,
    existingStories: number | null,
    proposedStories: number | null,
    existingUnits: number | null,
    proposedUnits: number | null,
    existingAffordableUnits: number | null,
    proposedAffordableUnits: number | null,
    proposedUse: string | null,
    description: string | null,
    governmentalUrl: string,
    approvalTime: number | null,
    streetNumbers:  Array< {
      __typename: "StreetNumber",
      streetId: string,
      streetName: string,
      streetNameSuffix: string | null,
      streetNumber: number,
      streetNumberSuffix: string | null,
    } >,
    events:  Array<( {
        __typename: "PermitEventStatus",
        oldStatus: PermitStatus | null,
        newStatus: PermitStatus | null,
        date: string | null,
      } | {
        __typename: "PermitEventFieldChanged",
        fieldName: string,
        oldValue: string | null,
        newValue: string | null,
        date: string | null,
      }
    ) >,
    relatedPermits:  Array< {
      __typename: "Permit",
      id: string,
      createdAt: string | null,
      status: PermitStatus | null,
      statusUpdatedAt: string | null,
      type: PermitType | null,
      typeWood: boolean | null,
      description: string | null,
      approvalTime: number | null,
      proposedUnits: number | null,
      existingUnits: number | null,
      governmentalUrl: string,
      streetNumbers:  Array< {
        __typename: "StreetNumber",
        streetId: string,
        streetName: string,
        streetNameSuffix: string | null,
        streetNumber: number,
        streetNumberSuffix: string | null,
      } >,
    } >,
  } | null,
};

export interface PermitsConnectionQueryVariables {
  cursor?: string | null,
  filter?: string | null,
  page?: number | null,
  type?: PermitType | null,
  sort?: PermitSorting | null,
  minUnits?: number | null,
  issuedYear?: string | null,
  fromPipeline?: boolean | null,
};

export interface PermitsConnectionQuery {
  items:  {
    __typename: "PermitsConnection",
    edges:  Array< {
      __typename: "PermitEdge",
      node:  {
        __typename: "Permit",
        id: string,
        createdAt: string | null,
        status: PermitStatus | null,
        statusUpdatedAt: string | null,
        type: PermitType | null,
        typeWood: boolean | null,
        description: string | null,
        approvalTime: number | null,
        proposedUnits: number | null,
        existingUnits: number | null,
        governmentalUrl: string,
        streetNumbers:  Array< {
          __typename: "StreetNumber",
          streetId: string,
          streetName: string,
          streetNameSuffix: string | null,
          streetNumber: number,
          streetNumberSuffix: string | null,
        } >,
      },
      cursor: string,
    } >,
    pageInfo:  {
      __typename: "PageInfo",
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemsCount: number,
      currentPage: number,
      pagesCount: number,
      openEnded: boolean,
    },
  },
};

export interface SearchQueryVariables {
  query: string,
};

export interface SearchQuery {
  search:  {
    __typename: "SearchResult",
    parcels:  {
      __typename: "ParcelSearchResult",
      edges:  Array< {
        __typename: "ParcelResult",
        node:  {
          __typename: "Parcel",
          id: string,
          // Deprecated
          title: string,
          // Deprecated geometry
          extrasArea: number | null,
          extrasNeighborhood: string | null,
          metadata:  {
            __typename: "ParcelMetadata",
            available: boolean | null,
            currentUse: ParcelUse | null,
          },
        },
        score: number,
        highlight:  Array< {
          __typename: "SearchHighlight",
          key: string,
          match: string,
        } >,
      } >,
      total: number,
    },
    folders:  {
      __typename: "FolderSearchResult",
      edges:  Array< {
        __typename: "FolderResult",
        node:  {
          __typename: "Folder",
          id: string,
          name: string,
        },
        score: number,
        highlight:  Array< {
          __typename: "SearchHighlight",
          key: string,
          match: string,
        } >,
      } >,
      total: number,
    },
  },
};

export interface ProfileQuery {
  profile:  {
    __typename: "Profile",
    id: string,
    firstName: string | null,
    lastName: string | null,
    photoRef:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    email: string | null,
    phone: string | null,
    website: string | null,
    about: string | null,
    location: string | null,
    role: string | null,
    locations: Array< string > | null,
    linkedin: string | null,
    primaryOrganization:  {
      __typename: "Organization",
      id: string,
      name: string,
    } | null,
    joinedAt: string | null,
    invitedBy:  {
      __typename: "User",
      name: string,
    } | null,
  } | null,
};

export interface ProfileUpdateMutationVariables {
  input: UpdateProfileInput,
  uid?: string | null,
};

export interface ProfileUpdateMutation {
  updateProfile:  {
    __typename: "Profile",
    id: string,
    firstName: string | null,
    lastName: string | null,
    photoRef:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    email: string | null,
    phone: string | null,
    website: string | null,
    about: string | null,
    location: string | null,
    role: string | null,
    locations: Array< string > | null,
    linkedin: string | null,
    primaryOrganizationId: string | null,
    joinedAt: string | null,
    invitedBy:  {
      __typename: "User",
      name: string,
    } | null,
  },
};

export interface ProfileCreateMutationVariables {
  input: CreateProfileInput,
};

export interface ProfileCreateMutation {
  createProfile:  {
    __typename: "Profile",
    id: string,
    firstName: string | null,
    lastName: string | null,
    photoRef:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    email: string | null,
    phone: string | null,
    website: string | null,
    about: string | null,
    location: string | null,
  },
};

export interface SettingsQuery {
  settings:  {
    __typename: "Settings",
    id: string,
    primaryEmail: string,
    emailFrequency: EmailFrequency,
    desktopNotifications: NotificationMessages,
    mobileNotifications: NotificationMessages,
  },
};

export interface SettingsUpdateMutationVariables {
  input?: UpdateSettingsInput | null,
};

export interface SettingsUpdateMutation {
  updateSettings:  {
    __typename: "Settings",
    id: string,
    primaryEmail: string,
    emailFrequency: EmailFrequency,
    desktopNotifications: NotificationMessages,
    mobileNotifications: NotificationMessages,
  },
};

export interface SourcingQueryVariables {
  state?: OpportunityState | null,
  cursor?: string | null,
  page?: number | null,
  sort?: OpportunitySort | null,
  query?: string | null,
};

export interface SourcingQuery {
  alphaOpportunities:  {
    __typename: "OpportunityConnection",
    edges:  Array< {
      __typename: "OpportunityEdge",
      node:  {
        __typename: "Opportunity",
        id: string,
        state: OpportunityState,
        priority: OpportunityPriority,
        updatedAt: string,
        parcel:  {
          __typename: "Parcel",
          id: string,
          number:  {
            __typename: "ParcelNumber",
            borough: string | null,
            boroughId: string | null,
            block: string | null,
            blockPadded: string | null,
            lot: string | null,
            lotPadded: string | null,
            title: string,
          },
          address: string | null,
          // Geometry
          geometry: string | null,
          area:  {
            __typename: "DataFloat",
            value: number,
          } | null,
          depth:  {
            __typename: "DataFloat",
            value: number,
          } | null,
          front:  {
            __typename: "DataFloat",
            value: number,
          } | null,
          // Bunch of unsorted experimental data
          extrasZoning: Array< string > | null,
          extrasLandValue: number | null,
          extrasImprovementValue: number | null,
          extrasPropertyValue: number | null,
          extrasFixturesValue: number | null,
          extrasStories: number | null,
          extrasUnits: number | null,
          extrasRooms: number | null,
          extrasBathrooms: number | null,
          extrasBedrooms: number | null,
          extrasYear: number | null,
          extrasVacant: boolean | null,
          extrasNeighborhood: string | null,
          extrasBorough: string | null,
          extrasMetroDistance: number | null,
          extrasMetroStation: string | null,
          extrasTrainDistance: number | null,
          extrasTrainStation: string | null,
          extrasTrainLocalDistance: number | null,
          extrasTrainLocalStation: string | null,
          extrasNearestTransitDistance: number | null,
          extrasNearestTransitType: string | null,
          extrasNearestTransitStation: string | null,
          extrasLandUse: Array< string > | null,
          extrasSalesDate: string | null,
          extrasSalesPriorDate: string | null,
          extrasRecordationDate: string | null,
          extrasShapeType: string | null,
          extrasShapeSides: Array< number > | null,
          extrasFitProjects: Array< string > | null,
          extrasAnalyzed: boolean | null,
          extrasUnitCapacity: number | null,
          extrasUnitCapacityFar: number | null,
          extrasUnitCapacityDencity: number | null,
          folder:  {
            __typename: "Folder",
            id: string,
            name: string,
          } | null,
          // Addresses
          city:  {
            __typename: "City",
            id: string,
            name: string,
            county:  {
              __typename: "County",
              id: string,
              name: string,
            },
            state:  {
              __typename: "State",
              id: string,
              name: string,
              code: string,
            },
          },
          extrasOwnerName: string | null,
        },
      },
      cursor: string,
    } >,
    pageInfo:  {
      __typename: "PageInfo",
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemsCount: number,
      currentPage: number,
      pagesCount: number,
      openEnded: boolean,
    },
  },
};

export interface SourcingFirstQueryVariables {
  state?: OpportunityState | null,
  cursor?: string | null,
  page?: number | null,
  sort?: OpportunitySort | null,
  query?: string | null,
  first: number,
};

export interface SourcingFirstQuery {
  alphaOpportunities:  {
    __typename: "OpportunityConnection",
    edges:  Array< {
      __typename: "OpportunityEdge",
      node:  {
        __typename: "Opportunity",
        id: string,
        state: OpportunityState,
        priority: OpportunityPriority,
        updatedAt: string,
        parcel:  {
          __typename: "Parcel",
          id: string,
          number:  {
            __typename: "ParcelNumber",
            borough: string | null,
            boroughId: string | null,
            block: string | null,
            blockPadded: string | null,
            lot: string | null,
            lotPadded: string | null,
            title: string,
          },
          address: string | null,
          // Geometry
          geometry: string | null,
          area:  {
            __typename: "DataFloat",
            value: number,
          } | null,
          depth:  {
            __typename: "DataFloat",
            value: number,
          } | null,
          front:  {
            __typename: "DataFloat",
            value: number,
          } | null,
          // Bunch of unsorted experimental data
          extrasZoning: Array< string > | null,
          extrasLandValue: number | null,
          extrasImprovementValue: number | null,
          extrasPropertyValue: number | null,
          extrasFixturesValue: number | null,
          extrasStories: number | null,
          extrasUnits: number | null,
          extrasRooms: number | null,
          extrasBathrooms: number | null,
          extrasBedrooms: number | null,
          extrasYear: number | null,
          extrasVacant: boolean | null,
          extrasNeighborhood: string | null,
          extrasBorough: string | null,
          extrasMetroDistance: number | null,
          extrasMetroStation: string | null,
          extrasTrainDistance: number | null,
          extrasTrainStation: string | null,
          extrasTrainLocalDistance: number | null,
          extrasTrainLocalStation: string | null,
          extrasNearestTransitDistance: number | null,
          extrasNearestTransitType: string | null,
          extrasNearestTransitStation: string | null,
          extrasLandUse: Array< string > | null,
          extrasSalesDate: string | null,
          extrasSalesPriorDate: string | null,
          extrasRecordationDate: string | null,
          extrasShapeType: string | null,
          extrasShapeSides: Array< number > | null,
          extrasFitProjects: Array< string > | null,
          extrasAnalyzed: boolean | null,
          extrasUnitCapacity: number | null,
          extrasUnitCapacityFar: number | null,
          extrasUnitCapacityDencity: number | null,
          folder:  {
            __typename: "Folder",
            id: string,
            name: string,
          } | null,
          // Addresses
          city:  {
            __typename: "City",
            id: string,
            name: string,
            county:  {
              __typename: "County",
              id: string,
              name: string,
            },
            state:  {
              __typename: "State",
              id: string,
              name: string,
              code: string,
            },
          },
          extrasOwnerName: string | null,
        },
      },
      cursor: string,
    } >,
    pageInfo:  {
      __typename: "PageInfo",
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      itemsCount: number,
      currentPage: number,
      pagesCount: number,
      openEnded: boolean,
    },
  },
};

export interface SourcingAllQueryVariables {
  state?: OpportunityState | null,
  query?: string | null,
};

export interface SourcingAllQuery {
  alphaAllOpportunities:  Array< {
    __typename: "Opportunity",
    id: string,
    state: OpportunityState,
    priority: OpportunityPriority,
    updatedAt: string,
    parcel:  {
      __typename: "Parcel",
      id: string,
      number:  {
        __typename: "ParcelNumber",
        borough: string | null,
        boroughId: string | null,
        block: string | null,
        blockPadded: string | null,
        lot: string | null,
        lotPadded: string | null,
        title: string,
      },
      address: string | null,
      // Geometry
      geometry: string | null,
      area:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      depth:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      front:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      // Bunch of unsorted experimental data
      extrasZoning: Array< string > | null,
      extrasLandValue: number | null,
      extrasImprovementValue: number | null,
      extrasPropertyValue: number | null,
      extrasFixturesValue: number | null,
      extrasStories: number | null,
      extrasUnits: number | null,
      extrasRooms: number | null,
      extrasBathrooms: number | null,
      extrasBedrooms: number | null,
      extrasYear: number | null,
      extrasVacant: boolean | null,
      extrasNeighborhood: string | null,
      extrasBorough: string | null,
      extrasMetroDistance: number | null,
      extrasMetroStation: string | null,
      extrasTrainDistance: number | null,
      extrasTrainStation: string | null,
      extrasTrainLocalDistance: number | null,
      extrasTrainLocalStation: string | null,
      extrasNearestTransitDistance: number | null,
      extrasNearestTransitType: string | null,
      extrasNearestTransitStation: string | null,
      extrasLandUse: Array< string > | null,
      extrasSalesDate: string | null,
      extrasSalesPriorDate: string | null,
      extrasRecordationDate: string | null,
      extrasShapeType: string | null,
      extrasShapeSides: Array< number > | null,
      extrasFitProjects: Array< string > | null,
      extrasAnalyzed: boolean | null,
      extrasUnitCapacity: number | null,
      extrasUnitCapacityFar: number | null,
      extrasUnitCapacityDencity: number | null,
      folder:  {
        __typename: "Folder",
        id: string,
        name: string,
      } | null,
      // Addresses
      city:  {
        __typename: "City",
        id: string,
        name: string,
        county:  {
          __typename: "County",
          id: string,
          name: string,
        },
        state:  {
          __typename: "State",
          id: string,
          name: string,
          code: string,
        },
      },
      extrasOwnerName: string | null,
    },
  } > | null,
};

export interface SourcingAllReportQueryVariables {
  state?: OpportunityState | null,
  query?: string | null,
};

export interface SourcingAllReportQuery {
  alphaAllOpportunities:  Array< {
    __typename: "Opportunity",
    id: string,
    state: OpportunityState,
    priority: OpportunityPriority,
    updatedAt: string,
    parcel:  {
      __typename: "Parcel",
      id: string,
      number:  {
        __typename: "ParcelNumber",
        borough: string | null,
        boroughId: string | null,
        block: string | null,
        blockPadded: string | null,
        lot: string | null,
        lotPadded: string | null,
        title: string,
      },
      address: string | null,
      // Geometry
      geometry: string | null,
      area:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      depth:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      front:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      // Bunch of unsorted experimental data
      extrasZoning: Array< string > | null,
      extrasLandValue: number | null,
      extrasImprovementValue: number | null,
      extrasPropertyValue: number | null,
      extrasFixturesValue: number | null,
      extrasStories: number | null,
      extrasUnits: number | null,
      extrasRooms: number | null,
      extrasBathrooms: number | null,
      extrasBedrooms: number | null,
      extrasYear: number | null,
      extrasVacant: boolean | null,
      extrasNeighborhood: string | null,
      extrasBorough: string | null,
      extrasMetroDistance: number | null,
      extrasMetroStation: string | null,
      extrasTrainDistance: number | null,
      extrasTrainStation: string | null,
      extrasTrainLocalDistance: number | null,
      extrasTrainLocalStation: string | null,
      extrasNearestTransitDistance: number | null,
      extrasNearestTransitType: string | null,
      extrasNearestTransitStation: string | null,
      extrasLandUse: Array< string > | null,
      extrasSalesDate: string | null,
      extrasSalesPriorDate: string | null,
      extrasRecordationDate: string | null,
      extrasShapeType: string | null,
      extrasShapeSides: Array< number > | null,
      extrasFitProjects: Array< string > | null,
      extrasAnalyzed: boolean | null,
      extrasUnitCapacity: number | null,
      extrasUnitCapacityFar: number | null,
      extrasUnitCapacityDencity: number | null,
      // Addresses
      city:  {
        __typename: "City",
        id: string,
        name: string,
        county:  {
          __typename: "County",
          id: string,
          name: string,
        },
        state:  {
          __typename: "State",
          id: string,
          name: string,
          code: string,
        },
      },
      extrasOwnerName: string | null,
    },
  } > | null,
};

export interface ProspectingCapacityQueryVariables {
  state?: OpportunityState | null,
  query?: string | null,
};

export interface ProspectingCapacityQuery {
  totalCapacity: number,
};

export interface OpportunityQueryVariables {
  opportunityId: string,
};

export interface OpportunityQuery {
  alphaOpportunity:  {
    __typename: "Opportunity",
    id: string,
    state: OpportunityState,
    priority: OpportunityPriority,
    updatedAt: string,
    parcel:  {
      __typename: "Parcel",
      id: string,
      number:  {
        __typename: "ParcelNumber",
        borough: string | null,
        boroughId: string | null,
        block: string | null,
        blockPadded: string | null,
        lot: string | null,
        lotPadded: string | null,
        title: string,
      },
      // Geometry
      geometry: string | null,
      center:  {
        __typename: "Geo",
        latitude: number,
        longitude: number,
      } | null,
      address: string | null,
      compatibleBuildings:  Array< {
        __typename: "BuildingLocation",
        key: string,
        title: string,
        width: number,
        height: number,
        center:  {
          __typename: "Geo",
          latitude: number,
          longitude: number,
        } | null,
        angle: number | null,
        shape: string | null,
      } > | null,
      // Addresses
      city:  {
        __typename: "City",
        id: string,
        name: string,
        county:  {
          __typename: "County",
          id: string,
          name: string,
        },
        state:  {
          __typename: "State",
          id: string,
          name: string,
          code: string,
        },
      },
      area:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      depth:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      front:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      extrasSupervisorDistrict: string | null,
      // Bunch of unsorted experimental data
      extrasZoning: Array< string > | null,
      extrasLandValue: number | null,
      extrasImprovementValue: number | null,
      extrasPropertyValue: number | null,
      extrasFixturesValue: number | null,
      extrasStories: number | null,
      extrasUnits: number | null,
      extrasRooms: number | null,
      extrasBathrooms: number | null,
      extrasBedrooms: number | null,
      extrasYear: number | null,
      extrasVacant: boolean | null,
      extrasNeighborhood: string | null,
      extrasBorough: string | null,
      extrasMetroDistance: number | null,
      extrasMetroStation: string | null,
      extrasTrainDistance: number | null,
      extrasTrainStation: string | null,
      extrasTrainLocalDistance: number | null,
      extrasTrainLocalStation: string | null,
      extrasNearestTransitDistance: number | null,
      extrasNearestTransitType: string | null,
      extrasNearestTransitStation: string | null,
      extrasLandUse: Array< string > | null,
      extrasSalesDate: string | null,
      extrasSalesPriorDate: string | null,
      extrasRecordationDate: string | null,
      extrasOwnerName: string | null,
      extrasOwnerType: OwnerType | null,
      extrasOwnerPublic: boolean | null,
      extrasShapeType: string | null,
      extrasShapeSides: Array< number > | null,
      extrasFitProjects: Array< string > | null,
      extrasAnalyzed: boolean | null,
      extrasUnitCapacity: number | null,
      extrasUnitCapacityFar: number | null,
      extrasUnitCapacityDencity: number | null,
      folder:  {
        __typename: "Folder",
        id: string,
        name: string,
      } | null,
      // User Data
      userData:  {
        __typename: "ParcelUserData",
        notes: string | null,
      } | null,
      // Linked Data
      opportunity:  {
        __typename: "Opportunity",
        id: string,
        priority: OpportunityPriority,
        state: OpportunityState,
      } | null,
      metadata:  {
        __typename: "ParcelMetadata",
        description: string | null,
        available: boolean | null,
        currentUse: ParcelUse | null,
        isOkForTower: boolean | null,
      },
      likes:  {
        __typename: "Likes",
        liked: boolean,
        count: number | null,
      },
      permits:  Array< {
        __typename: "Permit",
        id: string,
        createdAt: string | null,
        status: PermitStatus | null,
        statusUpdatedAt: string | null,
        type: PermitType | null,
        typeWood: boolean | null,
        description: string | null,
        approvalTime: number | null,
        proposedUnits: number | null,
        existingUnits: number | null,
        governmentalUrl: string,
      } >,
      // Metadata
      links:  Array< {
        __typename: "Link",
        title: string,
        url: string,
      } >,
    },
  } | null,
};

export interface OpportunityTileOverlayQueryVariables {
  box: GeoBox,
  query?: string | null,
};

export interface OpportunityTileOverlayQuery {
  tiles:  Array< {
    __typename: "Opportunity",
    id: string,
    center:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    } | null,
    parcel:  {
      __typename: "Parcel",
      id: string,
    },
  } > | null,
};

export interface AddOpportunityMutationVariables {
  parcelId: string,
};

export interface AddOpportunityMutation {
  aphaAddOpportunity:  {
    __typename: "Opportunity",
    id: string,
    state: OpportunityState,
    priority: OpportunityPriority,
    updatedAt: string,
    parcel:  {
      __typename: "Parcel",
      id: string,
      // Linked Data
      opportunity:  {
        __typename: "Opportunity",
        id: string,
      } | null,
    },
  } | null,
};

export interface ApproveOpportunityMutationVariables {
  opportunityId: string,
  state: OpportunityState,
};

export interface ApproveOpportunityMutation {
  alphaApprove: string,
};

export interface RejectOpportunityMutationVariables {
  opportunityId: string,
  state: OpportunityState,
};

export interface RejectOpportunityMutation {
  alphaReject: string,
};

export interface SnoozeOpportunityMutationVariables {
  opportunityId: string,
  state: OpportunityState,
};

export interface SnoozeOpportunityMutation {
  alphaSnooze: string,
};

export interface ResetOpportunityMutationVariables {
  opportunityId: string,
  state: OpportunityState,
};

export interface ResetOpportunityMutation {
  alphaReset: string,
};

export interface AddOpportunityFromSearchMutationVariables {
  query: string,
};

export interface AddOpportunityFromSearchMutation {
  alphaAddOpportunitiesFromSearch: number,
};

export interface NextOpportunityQueryVariables {
  state: OpportunityState,
  initialId?: string | null,
  sort?: OpportunitySort | null,
  query?: string | null,
};

export interface NextOpportunityQuery {
  alphaNextReviewOpportunity:  {
    __typename: "Opportunity",
    id: string,
    state: OpportunityState,
    priority: OpportunityPriority,
    updatedAt: string,
    parcel:  {
      __typename: "Parcel",
      id: string,
      number:  {
        __typename: "ParcelNumber",
        borough: string | null,
        boroughId: string | null,
        block: string | null,
        blockPadded: string | null,
        lot: string | null,
        lotPadded: string | null,
        title: string,
      },
      // Geometry
      geometry: string | null,
      center:  {
        __typename: "Geo",
        latitude: number,
        longitude: number,
      } | null,
      address: string | null,
      compatibleBuildings:  Array< {
        __typename: "BuildingLocation",
        key: string,
        title: string,
        width: number,
        height: number,
        center:  {
          __typename: "Geo",
          latitude: number,
          longitude: number,
        } | null,
        angle: number | null,
        shape: string | null,
      } > | null,
      // Addresses
      city:  {
        __typename: "City",
        id: string,
        name: string,
        county:  {
          __typename: "County",
          id: string,
          name: string,
        },
        state:  {
          __typename: "State",
          id: string,
          name: string,
          code: string,
        },
      },
      area:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      depth:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      front:  {
        __typename: "DataFloat",
        value: number,
      } | null,
      extrasSupervisorDistrict: string | null,
      // Bunch of unsorted experimental data
      extrasZoning: Array< string > | null,
      extrasLandValue: number | null,
      extrasImprovementValue: number | null,
      extrasPropertyValue: number | null,
      extrasFixturesValue: number | null,
      extrasStories: number | null,
      extrasUnits: number | null,
      extrasRooms: number | null,
      extrasBathrooms: number | null,
      extrasBedrooms: number | null,
      extrasYear: number | null,
      extrasVacant: boolean | null,
      extrasNeighborhood: string | null,
      extrasBorough: string | null,
      extrasMetroDistance: number | null,
      extrasMetroStation: string | null,
      extrasTrainDistance: number | null,
      extrasTrainStation: string | null,
      extrasTrainLocalDistance: number | null,
      extrasTrainLocalStation: string | null,
      extrasNearestTransitDistance: number | null,
      extrasNearestTransitType: string | null,
      extrasNearestTransitStation: string | null,
      extrasLandUse: Array< string > | null,
      extrasSalesDate: string | null,
      extrasSalesPriorDate: string | null,
      extrasRecordationDate: string | null,
      extrasOwnerName: string | null,
      extrasOwnerType: OwnerType | null,
      extrasOwnerPublic: boolean | null,
      extrasShapeType: string | null,
      extrasShapeSides: Array< number > | null,
      extrasFitProjects: Array< string > | null,
      extrasAnalyzed: boolean | null,
      extrasUnitCapacity: number | null,
      extrasUnitCapacityFar: number | null,
      extrasUnitCapacityDencity: number | null,
      folder:  {
        __typename: "Folder",
        id: string,
        name: string,
      } | null,
      // User Data
      userData:  {
        __typename: "ParcelUserData",
        notes: string | null,
      } | null,
      // Linked Data
      opportunity:  {
        __typename: "Opportunity",
        id: string,
        priority: OpportunityPriority,
        state: OpportunityState,
      } | null,
      metadata:  {
        __typename: "ParcelMetadata",
        description: string | null,
        available: boolean | null,
        currentUse: ParcelUse | null,
        isOkForTower: boolean | null,
      },
      likes:  {
        __typename: "Likes",
        liked: boolean,
        count: number | null,
      },
      permits:  Array< {
        __typename: "Permit",
        id: string,
        createdAt: string | null,
        status: PermitStatus | null,
        statusUpdatedAt: string | null,
        type: PermitType | null,
        typeWood: boolean | null,
        description: string | null,
        approvalTime: number | null,
        proposedUnits: number | null,
        existingUnits: number | null,
        governmentalUrl: string,
      } >,
      // Metadata
      links:  Array< {
        __typename: "Link",
        title: string,
        url: string,
      } >,
    },
  } | null,
};

export interface OpportunityStatsQueryVariables {
  query?: string | null,
};

export interface OpportunityStatsQuery {
  incoming: number,
  approved_initial: number,
  approved_zoning: number,
  approved: number,
  rejected: number,
  snoozed: number,
};

export interface OwnersQueryVariables {
  state?: OpportunityState | null,
  query?: string | null,
};

export interface OwnersQuery {
  items: Array< string | null > | null,
};

export interface SuperCitiesQuery {
  superCities:  Array< {
    __typename: "SuperCity",
    id: string,
    key: string,
    name: string,
    enabled: boolean,
    blockSource: string | null,
    blockSourceLayer: string | null,
    parcelSource: string | null,
    parcelSourceLayer: string | null,
  } >,
};

export interface RefreshTaskQueryVariables {
  id: string,
};

export interface RefreshTaskQuery {
  task:  {
    __typename: "Task",
    id: string,
    status: TaskStatus,
    result: string | null,
  },
};

export interface SampleTaskMutationVariables {
  value: number,
};

export interface SampleTaskMutation {
  task:  {
    __typename: "Task",
    id: string,
    status: TaskStatus,
    result: string | null,
  },
};

export interface FolderExportTaskMutationVariables {
  folderId: string,
};

export interface FolderExportTaskMutation {
  task:  {
    __typename: "Task",
    id: string,
    status: TaskStatus,
    result: string | null,
  },
};

export interface UsersQueryVariables {
  query: string,
};

export interface UsersQuery {
  items:  Array< {
    __typename: "User",
    id: string,
    title: string,
    subtitle: string | null,
  } >,
};

export interface UserQueryVariables {
  userId: string,
};

export interface UserQuery {
  user:  {
    __typename: "User",
    id: string,
    name: string,
    firstName: string,
    lastName: string | null,
    photo: string | null,
    phone: string | null,
    email: string | null,
    website: string | null,
    about: string | null,
    location: string | null,
    isBot: boolean,
    isYou: boolean,
    primaryOrganization:  {
      __typename: "Organization",
      id: string,
      name: string,
      photo: string | null,
    } | null,
    linkedin: string | null,
    channels:  Array< {
      __typename: "ChannelConversation",
      id: string,
      title: string,
      hidden: boolean,
      photos: Array< string >,
      photo: string | null,
      organization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
    } >,
  },
};

export interface ChartFullFragment {
  __typename: "Chart",
  labels: Array< string >,
  datasets:  Array< {
    __typename: "ChartDataSet",
    label: string,
    values: Array< number >,
  } >,
};

export type ConversationShortFragment = ( {
      __typename: "ChannelConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      featured: boolean,
      hidden: boolean,
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    } | {
      __typename: "AnonymousConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "SharedConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "PrivateConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
    } | {
      __typename: "GroupConversation",
      id: string,
      title: string,
      flexibleId: string,
      unreadCount: number,
      photos: Array< string >,
      topMessage:  {
        __typename: "ConversationMessage",
        id: string,
        message: string | null,
        file: string | null,
        repeatKey: string | null,
        isService: boolean,
        fileMetadata:  {
          __typename: "FileMetadata",
          name: string,
          mimeType: string | null,
          isImage: boolean,
          imageWidth: number | null,
          imageHeight: number | null,
          imageFormat: string | null,
          size: number,
        } | null,
        sender:  {
          __typename: "User",
          id: string,
          name: string,
          firstName: string,
          lastName: string | null,
          picture: string | null,
          email: string | null,
          primaryOrganization:  {
            __typename: "Organization",
            id: string,
            name: string,
            photo: string | null,
          } | null,
          role: string | null,
          linkedin: string | null,
          twitter: string | null,
        },
        urlAugmentation:  {
          __typename: "UrlAugmentation",
          url: string,
          title: string | null,
          date: string | null,
          subtitle: string | null,
          description: string | null,
          photo:  {
            __typename: "ImageRef",
            uuid: string,
            crop:  {
              __typename: "ImageCrop",
              x: number,
              y: number,
              w: number,
              h: number,
            } | null,
          } | null,
        } | null,
        date: string,
      } | null,
      settings:  {
        __typename: "ConversationSettings",
        id: string,
        mobileNotifications: NotificationMessages,
        mute: boolean,
      },
      photo: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    }
  );

export interface GeoShortFragment {
  __typename: "Geo",
  latitude: number,
  longitude: number,
};

export interface MessageFullFragment {
  __typename: "ConversationMessage",
  id: string,
  message: string | null,
  file: string | null,
  repeatKey: string | null,
  isService: boolean,
  fileMetadata:  {
    __typename: "FileMetadata",
    name: string,
    mimeType: string | null,
    isImage: boolean,
    imageWidth: number | null,
    imageHeight: number | null,
    imageFormat: string | null,
    size: number,
  } | null,
  sender:  {
    __typename: "User",
    id: string,
    name: string,
    firstName: string,
    lastName: string | null,
    picture: string | null,
    email: string | null,
    primaryOrganization:  {
      __typename: "Organization",
      id: string,
      name: string,
      photo: string | null,
    } | null,
    role: string | null,
    linkedin: string | null,
    twitter: string | null,
  },
  urlAugmentation:  {
    __typename: "UrlAugmentation",
    url: string,
    title: string | null,
    date: string | null,
    subtitle: string | null,
    description: string | null,
    photo:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
  } | null,
  date: string,
};

export interface OrganizationFullFragment {
  __typename: "Organization",
  id: string,
  superAccountId: string,
  isMine: boolean,
  isOwner: boolean,
  editorial: boolean,
  featured: boolean,
  isCommunity: boolean,
  name: string,
  photo: string | null,
  website: string | null,
  websiteTitle: string | null,
  about: string | null,
  twitter: string | null,
  facebook: string | null,
  linkedin: string | null,
  location: string | null,
  contacts:  Array< {
    __typename: "Profile",
    firstName: string | null,
    lastName: string | null,
    photo:  {
      __typename: "ImageRef",
      uuid: string,
    } | null,
    phone: string | null,
    email: string | null,
    role: string | null,
    linkedin: string | null,
    twitter: string | null,
  } >,
  members:  Array< {
    __typename: "OrganizationJoinedMember",
    role: OrganizationMemberRole,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      firstName: string,
      lastName: string | null,
      picture: string | null,
      email: string | null,
      primaryOrganization:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
      } | null,
      role: string | null,
      linkedin: string | null,
      twitter: string | null,
      photoRef:  {
        __typename: "ImageRef",
        uuid: string,
        crop:  {
          __typename: "ImageCrop",
          x: number,
          y: number,
          w: number,
          h: number,
        } | null,
      } | null,
    },
  } >,
  organizationType: Array< string > | null,
  interests: Array< string > | null,
  locations: Array< string > | null,
  channels:  Array< {
    __typename: "ChannelConversation",
    id: string,
    isRoot: boolean,
    title: string,
    photos: Array< string >,
    membersCount: number,
    memberRequestsCount: number,
    hidden: boolean,
    featured: boolean,
  } | null >,
  posts:  Array< {
    __typename: "AlphaDummyPost",
    text: string,
    type: string,
    description: string | null,
    date: string,
    image:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    activity: Array< string > | null,
    links:  Array< {
      __typename: "AlphaOrganizationListingLink",
      text: string,
      url: string,
    } > | null,
    pinned: boolean | null,
  } > | null,
  lookingFor: Array< string > | null,
  geographies: Array< string > | null,
  doShapeAndForm: Array< string > | null,
  doCurrentUse: Array< string > | null,
  doGoodFitFor: Array< string > | null,
  doSpecialAttributes: Array< string > | null,
  doAvailability: Array< string > | null,
  arGeographies: Array< string > | null,
  arAreaRange: Array< string > | null,
  arHeightLimit: Array< string > | null,
  arActivityStatus: Array< string > | null,
  arAquisitionBudget: Array< string > | null,
  arAquisitionRate: Array< string > | null,
  arClosingTime: Array< string > | null,
  arSpecialAttributes: Array< string > | null,
  arLandUse: Array< string > | null,
  followed: boolean,
  potentialSites:  Array< {
    __typename: "Range",
    from: number | null,
    to: number | null,
  } > | null,
  siteSizes:  Array< {
    __typename: "Range",
    from: number | null,
    to: number | null,
  } > | null,
  developmentModels: Array< string > | null,
  availability: Array< string > | null,
  landUse: Array< string > | null,
  goodFor: Array< string > | null,
  specialAttributes: Array< string > | null,
  developmentOportunities:  Array< {
    __typename: "AlphaOrganizationListing",
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: "MapPoint",
      lat: number,
      lon: number,
    } | null,
    locationTitle: string | null,
    availability: string | null,
    area: number | null,
    price: number | null,
    dealType: Array< string > | null,
    shapeAndForm: Array< string > | null,
    currentUse: Array< string > | null,
    goodFitFor: Array< string > | null,
    additionalLinks:  Array< {
      __typename: "AlphaOrganizationListingLink",
      text: string,
      url: string,
    } > | null,
  } > | null,
  acquisitionRequests:  Array< {
    __typename: "AlphaOrganizationListing",
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    photo:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } | null,
    geographies: Array< string > | null,
    landUse: Array< string > | null,
    unitCapacity: Array< string > | null,
  } > | null,
  listingsAll:  Array< {
    __typename: "AlphaOrganizationListing",
    id: string,
    name: string,
    type: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: "MapPoint",
      lat: number,
      lon: number,
    } | null,
    locationTitle: string | null,
    availability: string | null,
    area: number | null,
    price: number | null,
    dealType: Array< string > | null,
    shapeAndForm: Array< string > | null,
    currentUse: Array< string > | null,
    goodFitFor: Array< string > | null,
    additionalLinks:  Array< {
      __typename: "AlphaOrganizationListingLink",
      text: string,
      url: string,
    } > | null,
    photo:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } | null,
    geographies: Array< string > | null,
    landUse: Array< string > | null,
    unitCapacity: Array< string > | null,
  } > | null,
};

export interface OrganizationProfileFullFragment {
  __typename: "OrganizationProfile",
  id: string,
  name: string,
  photoRef:  {
    __typename: "ImageRef",
    uuid: string,
    crop:  {
      __typename: "ImageCrop",
      x: number,
      y: number,
      w: number,
      h: number,
    } | null,
  } | null,
  website: string | null,
  websiteTitle: string | null,
  about: string | null,
  twitter: string | null,
  facebook: string | null,
  linkedin: string | null,
  location: string | null,
  contacts:  Array< {
    __typename: "OrganizationContact",
    name: string,
    photoRef:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    position: string | null,
    email: string | null,
    phone: string | null,
    link: string | null,
  } >,
  published: boolean,
  editorial: boolean,
  featured: boolean,
  organizationType: Array< string > | null,
  interests: Array< string > | null,
  locations: Array< string > | null,
  posts:  Array< {
    __typename: "AlphaDummyPost",
    text: string,
    type: string,
    description: string | null,
    date: string,
    image:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    activity: Array< string > | null,
    links:  Array< {
      __typename: "AlphaOrganizationListingLink",
      text: string,
      url: string,
    } > | null,
    pinned: boolean | null,
  } > | null,
  lookingFor: Array< string > | null,
  geographies: Array< string > | null,
  doShapeAndForm: Array< string > | null,
  doCurrentUse: Array< string > | null,
  doGoodFitFor: Array< string > | null,
  doSpecialAttributes: Array< string > | null,
  doAvailability: Array< string > | null,
  arGeographies: Array< string > | null,
  arAreaRange: Array< string > | null,
  arHeightLimit: Array< string > | null,
  arActivityStatus: Array< string > | null,
  arAquisitionBudget: Array< string > | null,
  arAquisitionRate: Array< string > | null,
  arClosingTime: Array< string > | null,
  arSpecialAttributes: Array< string > | null,
  arLandUse: Array< string > | null,
  potentialSites:  Array< {
    __typename: "Range",
    from: number | null,
    to: number | null,
  } > | null,
  siteSizes:  Array< {
    __typename: "Range",
    from: number | null,
    to: number | null,
  } > | null,
  developmentModels: Array< string > | null,
  availability: Array< string > | null,
  landUse: Array< string > | null,
  goodFor: Array< string > | null,
  specialAttributes: Array< string > | null,
  developmentOportunities:  Array< {
    __typename: "AlphaOrganizationListing",
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: "MapPoint",
      lat: number,
      lon: number,
    } | null,
    locationTitle: string | null,
    availability: string | null,
    area: number | null,
    price: number | null,
    dealType: Array< string > | null,
    shapeAndForm: Array< string > | null,
    currentUse: Array< string > | null,
    goodFitFor: Array< string > | null,
    additionalLinks:  Array< {
      __typename: "AlphaOrganizationListingLink",
      text: string,
      url: string,
    } > | null,
  } > | null,
  acquisitionRequests:  Array< {
    __typename: "AlphaOrganizationListing",
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    photo:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } | null,
    geographies: Array< string > | null,
    landUse: Array< string > | null,
    unitCapacity: Array< string > | null,
  } > | null,
  listingsAll:  Array< {
    __typename: "AlphaOrganizationListing",
    id: string,
    name: string,
    type: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: "MapPoint",
      lat: number,
      lon: number,
    } | null,
    locationTitle: string | null,
    availability: string | null,
    area: number | null,
    price: number | null,
    dealType: Array< string > | null,
    shapeAndForm: Array< string > | null,
    currentUse: Array< string > | null,
    goodFitFor: Array< string > | null,
    additionalLinks:  Array< {
      __typename: "AlphaOrganizationListingLink",
      text: string,
      url: string,
    } > | null,
    photo:  {
      __typename: "ImageRef",
      uuid: string,
      crop:  {
        __typename: "ImageCrop",
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: "Range",
      from: number | null,
      to: number | null,
    } | null,
    geographies: Array< string > | null,
    landUse: Array< string > | null,
    unitCapacity: Array< string > | null,
  } > | null,
};

export interface OrganizationSearchFragment {
  __typename: "Organization",
  id: string,
  superAccountId: string,
  name: string,
  photo: string | null,
  locations: Array< string > | null,
  isMine: boolean,
  organizationType: Array< string > | null,
  interests: Array< string > | null,
  followed: boolean,
  published: boolean,
  editorial: boolean,
  featured: boolean,
  members:  Array< {
    __typename: "OrganizationJoinedMember",
    user:  {
      __typename: "User",
      id: string,
      name: string,
      picture: string | null,
    },
  } >,
  channels:  Array< {
    __typename: "ChannelConversation",
    id: string,
    hidden: boolean,
  } | null >,
};

export interface OrganizationShortFragment {
  __typename: "Organization",
  id: string,
  name: string,
  photo: string | null,
};

export interface ParcelIDFragment {
  __typename: "ParcelNumber",
  borough: string | null,
  boroughId: string | null,
  block: string | null,
  blockPadded: string | null,
  lot: string | null,
  lotPadded: string | null,
  title: string,
};

export interface SessionStateFullFragment {
  __typename: "SessionState",
  isLoggedIn: boolean,
  isProfileCreated: boolean,
  isAccountActivated: boolean,
  isAccountExists: boolean,
  // depricated
  isAccountPicked: boolean,
  isCompleted: boolean,
  isBlocked: boolean,
};

export interface SettingsFullFragment {
  __typename: "Settings",
  id: string,
  primaryEmail: string,
  emailFrequency: EmailFrequency,
  desktopNotifications: NotificationMessages,
  mobileNotifications: NotificationMessages,
};

export interface UserShortFragment {
  __typename: "User",
  id: string,
  name: string,
  firstName: string,
  lastName: string | null,
  picture: string | null,
  email: string | null,
  primaryOrganization:  {
    __typename: "Organization",
    id: string,
    name: string,
    photo: string | null,
  } | null,
  role: string | null,
  linkedin: string | null,
  twitter: string | null,
};

export interface ParcelFullFragment {
  __typename: "Parcel",
  id: string,
  number:  {
    __typename: "ParcelNumber",
    borough: string | null,
    boroughId: string | null,
    block: string | null,
    blockPadded: string | null,
    lot: string | null,
    lotPadded: string | null,
    title: string,
  },
  // Geometry
  geometry: string | null,
  center:  {
    __typename: "Geo",
    latitude: number,
    longitude: number,
  } | null,
  address: string | null,
  compatibleBuildings:  Array< {
    __typename: "BuildingLocation",
    key: string,
    title: string,
    width: number,
    height: number,
    center:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    } | null,
    angle: number | null,
    shape: string | null,
  } > | null,
  // Addresses
  city:  {
    __typename: "City",
    id: string,
    name: string,
    county:  {
      __typename: "County",
      id: string,
      name: string,
    },
    state:  {
      __typename: "State",
      id: string,
      name: string,
      code: string,
    },
  },
  area:  {
    __typename: "DataFloat",
    value: number,
  } | null,
  depth:  {
    __typename: "DataFloat",
    value: number,
  } | null,
  front:  {
    __typename: "DataFloat",
    value: number,
  } | null,
  extrasSupervisorDistrict: string | null,
  // Bunch of unsorted experimental data
  extrasZoning: Array< string > | null,
  extrasLandValue: number | null,
  extrasImprovementValue: number | null,
  extrasPropertyValue: number | null,
  extrasFixturesValue: number | null,
  extrasStories: number | null,
  extrasUnits: number | null,
  extrasRooms: number | null,
  extrasBathrooms: number | null,
  extrasBedrooms: number | null,
  extrasYear: number | null,
  extrasVacant: boolean | null,
  extrasNeighborhood: string | null,
  extrasBorough: string | null,
  extrasMetroDistance: number | null,
  extrasMetroStation: string | null,
  extrasTrainDistance: number | null,
  extrasTrainStation: string | null,
  extrasTrainLocalDistance: number | null,
  extrasTrainLocalStation: string | null,
  extrasNearestTransitDistance: number | null,
  extrasNearestTransitType: string | null,
  extrasNearestTransitStation: string | null,
  extrasLandUse: Array< string > | null,
  extrasSalesDate: string | null,
  extrasSalesPriorDate: string | null,
  extrasRecordationDate: string | null,
  extrasOwnerName: string | null,
  extrasOwnerType: OwnerType | null,
  extrasOwnerPublic: boolean | null,
  extrasShapeType: string | null,
  extrasShapeSides: Array< number > | null,
  extrasFitProjects: Array< string > | null,
  extrasAnalyzed: boolean | null,
  extrasUnitCapacity: number | null,
  extrasUnitCapacityFar: number | null,
  extrasUnitCapacityDencity: number | null,
  folder:  {
    __typename: "Folder",
    id: string,
    name: string,
  } | null,
  // User Data
  userData:  {
    __typename: "ParcelUserData",
    notes: string | null,
  } | null,
  // Linked Data
  opportunity:  {
    __typename: "Opportunity",
    id: string,
    priority: OpportunityPriority,
    state: OpportunityState,
  } | null,
  metadata:  {
    __typename: "ParcelMetadata",
    description: string | null,
    available: boolean | null,
    currentUse: ParcelUse | null,
    isOkForTower: boolean | null,
  },
  likes:  {
    __typename: "Likes",
    liked: boolean,
    count: number | null,
  },
  permits:  Array< {
    __typename: "Permit",
    id: string,
    createdAt: string | null,
    status: PermitStatus | null,
    statusUpdatedAt: string | null,
    type: PermitType | null,
    typeWood: boolean | null,
    description: string | null,
    approvalTime: number | null,
    proposedUnits: number | null,
    existingUnits: number | null,
    governmentalUrl: string,
  } >,
  // Metadata
  links:  Array< {
    __typename: "Link",
    title: string,
    url: string,
  } >,
};

export interface ParcelShortFragment {
  __typename: "Parcel",
  id: string,
  number:  {
    __typename: "ParcelNumber",
    borough: string | null,
    boroughId: string | null,
    block: string | null,
    blockPadded: string | null,
    lot: string | null,
    lotPadded: string | null,
    title: string,
  },
  address: string | null,
  // Geometry
  geometry: string | null,
  area:  {
    __typename: "DataFloat",
    value: number,
  } | null,
  depth:  {
    __typename: "DataFloat",
    value: number,
  } | null,
  front:  {
    __typename: "DataFloat",
    value: number,
  } | null,
  // Bunch of unsorted experimental data
  extrasZoning: Array< string > | null,
  extrasLandValue: number | null,
  extrasImprovementValue: number | null,
  extrasPropertyValue: number | null,
  extrasFixturesValue: number | null,
  extrasStories: number | null,
  extrasUnits: number | null,
  extrasRooms: number | null,
  extrasBathrooms: number | null,
  extrasBedrooms: number | null,
  extrasYear: number | null,
  extrasVacant: boolean | null,
  extrasNeighborhood: string | null,
  extrasBorough: string | null,
  extrasMetroDistance: number | null,
  extrasMetroStation: string | null,
  extrasTrainDistance: number | null,
  extrasTrainStation: string | null,
  extrasTrainLocalDistance: number | null,
  extrasTrainLocalStation: string | null,
  extrasNearestTransitDistance: number | null,
  extrasNearestTransitType: string | null,
  extrasNearestTransitStation: string | null,
  extrasLandUse: Array< string > | null,
  extrasSalesDate: string | null,
  extrasSalesPriorDate: string | null,
  extrasRecordationDate: string | null,
  extrasShapeType: string | null,
  extrasShapeSides: Array< number > | null,
  extrasFitProjects: Array< string > | null,
  extrasAnalyzed: boolean | null,
  extrasUnitCapacity: number | null,
  extrasUnitCapacityFar: number | null,
  extrasUnitCapacityDencity: number | null,
  folder:  {
    __typename: "Folder",
    id: string,
    name: string,
  } | null,
  // Addresses
  city:  {
    __typename: "City",
    id: string,
    name: string,
    county:  {
      __typename: "County",
      id: string,
      name: string,
    },
    state:  {
      __typename: "State",
      id: string,
      name: string,
      code: string,
    },
  },
};

export interface ParcelShortNoFolderFragment {
  __typename: "Parcel",
  id: string,
  number:  {
    __typename: "ParcelNumber",
    borough: string | null,
    boroughId: string | null,
    block: string | null,
    blockPadded: string | null,
    lot: string | null,
    lotPadded: string | null,
    title: string,
  },
  address: string | null,
  // Geometry
  geometry: string | null,
  area:  {
    __typename: "DataFloat",
    value: number,
  } | null,
  depth:  {
    __typename: "DataFloat",
    value: number,
  } | null,
  front:  {
    __typename: "DataFloat",
    value: number,
  } | null,
  // Bunch of unsorted experimental data
  extrasZoning: Array< string > | null,
  extrasLandValue: number | null,
  extrasImprovementValue: number | null,
  extrasPropertyValue: number | null,
  extrasFixturesValue: number | null,
  extrasStories: number | null,
  extrasUnits: number | null,
  extrasRooms: number | null,
  extrasBathrooms: number | null,
  extrasBedrooms: number | null,
  extrasYear: number | null,
  extrasVacant: boolean | null,
  extrasNeighborhood: string | null,
  extrasBorough: string | null,
  extrasMetroDistance: number | null,
  extrasMetroStation: string | null,
  extrasTrainDistance: number | null,
  extrasTrainStation: string | null,
  extrasTrainLocalDistance: number | null,
  extrasTrainLocalStation: string | null,
  extrasNearestTransitDistance: number | null,
  extrasNearestTransitType: string | null,
  extrasNearestTransitStation: string | null,
  extrasLandUse: Array< string > | null,
  extrasSalesDate: string | null,
  extrasSalesPriorDate: string | null,
  extrasRecordationDate: string | null,
  extrasShapeType: string | null,
  extrasShapeSides: Array< number > | null,
  extrasFitProjects: Array< string > | null,
  extrasAnalyzed: boolean | null,
  extrasUnitCapacity: number | null,
  extrasUnitCapacityFar: number | null,
  extrasUnitCapacityDencity: number | null,
  // Addresses
  city:  {
    __typename: "City",
    id: string,
    name: string,
    county:  {
      __typename: "County",
      id: string,
      name: string,
    },
    state:  {
      __typename: "State",
      id: string,
      name: string,
      code: string,
    },
  },
};

export interface BlockShortFragment {
  __typename: "Block",
  id: string,
  title: string,
  extrasArea: number | null,
  extrasSupervisorDistrict: string | null,
  extrasZoning: Array< string > | null,
};

export interface BlockFullFragment {
  __typename: "Block",
  id: string,
  title: string,
  extrasArea: number | null,
  extrasZoning: Array< string > | null,
  extrasSupervisorDistrict: string | null,
  geometry: string | null,
  parcels:  Array< {
    __typename: "Parcel",
    id: string,
    // Deprecated
    title: string,
    // Geometry
    geometry: string | null,
    // Bunch of unsorted experimental data
    extrasZoning: Array< string > | null,
  } >,
};

export interface PermitShortFragment {
  __typename: "Permit",
  id: string,
  createdAt: string | null,
  status: PermitStatus | null,
  statusUpdatedAt: string | null,
  type: PermitType | null,
  typeWood: boolean | null,
  description: string | null,
  approvalTime: number | null,
  proposedUnits: number | null,
  existingUnits: number | null,
  governmentalUrl: string,
  streetNumbers:  Array< {
    __typename: "StreetNumber",
    streetId: string,
    streetName: string,
    streetNameSuffix: string | null,
    streetNumber: number,
    streetNumberSuffix: string | null,
  } >,
};

export interface PermitFullFragment {
  __typename: "Permit",
  id: string,
  issuedAt: string | null,
  createdAt: string | null,
  startedAt: string | null,
  expiresAt: string | null,
  expiredAt: string | null,
  completedAt: string | null,
  filedAt: string | null,
  status: PermitStatus | null,
  statusUpdatedAt: string | null,
  type: PermitType | null,
  typeWood: boolean | null,
  existingStories: number | null,
  proposedStories: number | null,
  existingUnits: number | null,
  proposedUnits: number | null,
  existingAffordableUnits: number | null,
  proposedAffordableUnits: number | null,
  proposedUse: string | null,
  description: string | null,
  governmentalUrl: string,
  approvalTime: number | null,
  streetNumbers:  Array< {
    __typename: "StreetNumber",
    streetId: string,
    streetName: string,
    streetNameSuffix: string | null,
    streetNumber: number,
    streetNumberSuffix: string | null,
  } >,
  events:  Array<( {
      __typename: "PermitEventStatus",
      oldStatus: PermitStatus | null,
      newStatus: PermitStatus | null,
      date: string | null,
    } | {
      __typename: "PermitEventFieldChanged",
      fieldName: string,
      oldValue: string | null,
      newValue: string | null,
      date: string | null,
    }
  ) >,
  relatedPermits:  Array< {
    __typename: "Permit",
    id: string,
    createdAt: string | null,
    status: PermitStatus | null,
    statusUpdatedAt: string | null,
    type: PermitType | null,
    typeWood: boolean | null,
    description: string | null,
    approvalTime: number | null,
    proposedUnits: number | null,
    existingUnits: number | null,
    governmentalUrl: string,
    streetNumbers:  Array< {
      __typename: "StreetNumber",
      streetId: string,
      streetName: string,
      streetNameSuffix: string | null,
      streetNumber: number,
      streetNumberSuffix: string | null,
    } >,
  } >,
};
