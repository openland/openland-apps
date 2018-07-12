/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface CreateOrganizationInput {
  name: string,
  website?: string | null,
  personal: boolean,
  photoRef?: ImageRefInput | null,
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
  about?: string | null,
  twitter?: string | null,
  facebook?: string | null,
  linkedin?: string | null,
  location?: string | null,
  contacts?: Array< ContactPersonInput > | null,
  alphaPublished?: boolean | null,
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
};

export interface MapPointInput {
  ref?: string | null,
  count?: number | null,
  lat: number,
  lon: number,
};

export enum OrganizationMemberRole {
  OWNER = "OWNER",
  MEMBER = "MEMBER",
}


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

export enum OwnerType {
  CITY = "CITY",
  MIXED = "MIXED",
  PRIVATE = "PRIVATE",
  OTHER = "OTHER",
  EXCLUDED = "EXCLUDED",
}


export enum OpportunityPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
}


export enum OpportunityState {
  INCOMING = "INCOMING",
  APPROVED_INITIAL = "APPROVED_INITIAL",
  APPROVED_ZONING = "APPROVED_ZONING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SNOOZED = "SNOOZED",
}


export enum ParcelUse {
  PARKING = "PARKING",
  STORAGE = "STORAGE",
}


export enum PermitStatus {
  FILING = "FILING",
  FILED = "FILED",
  ISSUED = "ISSUED",
  COMPLETED = "COMPLETED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
  DISAPPROVED = "DISAPPROVED",
  APPROVED = "APPROVED",
  ISSUING = "ISSUING",
  REVOKED = "REVOKED",
  WITHDRAWN = "WITHDRAWN",
  PLANCHECK = "PLANCHECK",
  SUSPENDED = "SUSPENDED",
  REINSTATED = "REINSTATED",
  INSPECTING = "INSPECTING",
  UPHELD = "UPHELD",
  INCOMPLETE = "INCOMPLETE",
  GRANTED = "GRANTED",
  APPEAL = "APPEAL",
}


export enum PermitType {
  NEW_CONSTRUCTION = "NEW_CONSTRUCTION",
  ADDITIONS_ALTERATIONS_REPARE = "ADDITIONS_ALTERATIONS_REPARE",
  OTC_ADDITIONS = "OTC_ADDITIONS",
  WALL_OR_PAINTED_SIGN = "WALL_OR_PAINTED_SIGN",
  SIGN_ERRECT = "SIGN_ERRECT",
  DEMOLITIONS = "DEMOLITIONS",
  GRADE_QUARRY_FILL_EXCAVATE = "GRADE_QUARRY_FILL_EXCAVATE",
}


export interface ParcelMetadataInput {
  description?: string | null,
  currentUse?: ParcelUse | null,
  available?: boolean | null,
  isOkForTower?: boolean | null,
};

export enum SuperAdminRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  SOFTWARE_DEVELOPER = "SOFTWARE_DEVELOPER",
  EDITOR = "EDITOR",
}


export enum SuperAccountState {
  PENDING = "PENDING",
  ACTIVATED = "ACTIVATED",
  SUSPENDED = "SUSPENDED",
}


export enum PermitSorting {
  STATUS_CHANGE_TIME = "STATUS_CHANGE_TIME",
  CREATE_TIME = "CREATE_TIME",
  COMPLETE_TIME = "COMPLETE_TIME",
  ISSUED_TIME = "ISSUED_TIME",
  APPROVAL_TIME_ASC = "APPROVAL_TIME_ASC",
  APPROVAL_TIME_DESC = "APPROVAL_TIME_DESC",
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

export enum OpportunitySort {
  DATE_ADDED_ASC = "DATE_ADDED_ASC",
  DATE_ADDED_DESC = "DATE_ADDED_DESC",
  AREA_ASC = "AREA_ASC",
  AREA_DESC = "AREA_DESC",
  CAPACITY_ASC = "CAPACITY_ASC",
  CAPACITY_DESC = "CAPACITY_DESC",
}


export enum TaskStatus {
  IN_PROGRESS = "IN_PROGRESS",
  FAILED = "FAILED",
  COMPLETED = "COMPLETED",
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
    isAccountPicked: boolean,
    isCompleted: boolean,
    isBlocked: boolean,
  },
  permissions:  {
    __typename: "Permissions",
    roles: Array< string >,
  },
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

export interface ChatListQuery {
  chats:  {
    __typename: "ConversationConnection",
    conversations:  Array<( {
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
          },
          date: string,
        } | null,
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
          },
          date: string,
        } | null,
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
          },
          date: string,
        } | null,
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
          },
          date: string,
        } | null,
      }
    ) >,
    seq: number,
    next: string | null,
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
      },
      date: string,
    } >,
  },
};

export interface ChatInfoQueryVariables {
  conversationId: string,
};

export interface ChatInfoQuery {
  chat: ( {
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
      },
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

export interface ChatSearchGroupQueryVariables {
  members: Array< string >,
};

export interface ChatSearchGroupQuery {
  group: ( {
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
    isMine: boolean,
    name: string,
    photo: string | null,
    website: string | null,
    about: string | null,
    twitter: string | null,
    facebook: string | null,
    linkedin: string | null,
    location: string | null,
    contacts:  Array< {
      __typename: "OrganizationContact",
      name: string,
      photo: string | null,
      position: string | null,
      email: string | null,
      phone: string | null,
      link: string | null,
    } >,
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
  myOrganizationProfile:  {
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
    isMine: boolean,
    name: string,
    photo: string | null,
    website: string | null,
    about: string | null,
    twitter: string | null,
    facebook: string | null,
    linkedin: string | null,
    location: string | null,
    contacts:  Array< {
      __typename: "OrganizationContact",
      name: string,
      photo: string | null,
      position: string | null,
      email: string | null,
      phone: string | null,
      link: string | null,
    } >,
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
  page?: number | null,
};

export interface ExploreOrganizationsQuery {
  items:  {
    __typename: "OrganizationsConnection",
    edges:  Array< {
      __typename: "OrganizationsEdge",
      node:  {
        __typename: "Organization",
        id: string,
        name: string,
        photo: string | null,
        location: string | null,
        isMine: boolean,
        organizationType: Array< string > | null,
        interests: Array< string > | null,
        followed: boolean,
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
      __typename: "OrganizationIvitedMember",
      firstName: string | null,
      lastName: string | null,
      inviteId: string,
      email: string,
      role: OrganizationMemberRole,
    } | {
      __typename: "OrganizationJoinedMember",
      user:  {
        __typename: string,
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
      },
      joinedAt: string | null,
      email: string,
      role: OrganizationMemberRole,
    }
  ) >,
};

export interface OrganizationChangeMemberRoleMutationVariables {
  memberId: string,
  newRole: OrganizationMemberRole,
};

export interface OrganizationChangeMemberRoleMutation {
  alphaOrganizationChangeMemberRole: string,
};

export interface OrganizationRemoveMemberMutationVariables {
  memberId: string,
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
  alphaOrganizationActivateByInvite: string,
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
    } >,
    features:  Array< {
      __typename: "FeatureFlag",
      id: string,
      key: string,
      title: string,
    } >,
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
  } | null,
};

export interface ProfileUpdateMutationVariables {
  input: UpdateProfileInput,
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

export interface ChartFullFragment {
  __typename: "Chart",
  labels: Array< string >,
  datasets:  Array< {
    __typename: string,
    label: string,
    values: Array< number >,
  } >,
};

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
    __typename: string,
    name: string,
    mimeType: string | null,
    isImage: boolean,
    imageWidth: number | null,
    imageHeight: number | null,
    imageFormat: string | null,
    size: number,
  } | null,
  sender:  {
    __typename: string,
    id: string,
    name: string,
    firstName: string,
    lastName: string | null,
    picture: string | null,
    email: string | null,
  },
  date: string,
};

export interface OrganizationFullFragment {
  __typename: "Organization",
  id: string,
  isMine: boolean,
  name: string,
  photo: string | null,
  website: string | null,
  about: string | null,
  twitter: string | null,
  facebook: string | null,
  linkedin: string | null,
  location: string | null,
  contacts:  Array< {
    __typename: string,
    name: string,
    photo: string | null,
    position: string | null,
    email: string | null,
    phone: string | null,
    link: string | null,
  } >,
  organizationType: Array< string > | null,
  interests: Array< string > | null,
  locations: Array< string > | null,
  posts:  Array< {
    __typename: string,
    text: string,
    type: string,
    description: string | null,
    date: string,
    image:  {
      __typename: string,
      uuid: string,
      crop:  {
        __typename: string,
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    activity: Array< string > | null,
    links:  Array< {
      __typename: string,
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
    __typename: string,
    from: number | null,
    to: number | null,
  } > | null,
  siteSizes:  Array< {
    __typename: string,
    from: number | null,
    to: number | null,
  } > | null,
  developmentModels: Array< string > | null,
  availability: Array< string > | null,
  landUse: Array< string > | null,
  goodFor: Array< string > | null,
  specialAttributes: Array< string > | null,
  developmentOportunities:  Array< {
    __typename: string,
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: string,
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
      __typename: string,
      text: string,
      url: string,
    } > | null,
  } > | null,
  acquisitionRequests:  Array< {
    __typename: string,
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    photo:  {
      __typename: string,
      uuid: string,
      crop:  {
        __typename: string,
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: string,
      from: number | null,
      to: number | null,
    } | null,
    geographies: Array< string > | null,
    landUse: Array< string > | null,
    unitCapacity: Array< string > | null,
  } > | null,
  listingsAll:  Array< {
    __typename: string,
    id: string,
    name: string,
    type: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: string,
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
      __typename: string,
      text: string,
      url: string,
    } > | null,
    photo:  {
      __typename: string,
      uuid: string,
      crop:  {
        __typename: string,
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: string,
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
    __typename: string,
    uuid: string,
    crop:  {
      __typename: string,
      x: number,
      y: number,
      w: number,
      h: number,
    } | null,
  } | null,
  website: string | null,
  about: string | null,
  twitter: string | null,
  facebook: string | null,
  linkedin: string | null,
  location: string | null,
  contacts:  Array< {
    __typename: string,
    name: string,
    photoRef:  {
      __typename: string,
      uuid: string,
      crop:  {
        __typename: string,
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
  organizationType: Array< string > | null,
  interests: Array< string > | null,
  locations: Array< string > | null,
  posts:  Array< {
    __typename: string,
    text: string,
    type: string,
    description: string | null,
    date: string,
    image:  {
      __typename: string,
      uuid: string,
      crop:  {
        __typename: string,
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    activity: Array< string > | null,
    links:  Array< {
      __typename: string,
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
    __typename: string,
    from: number | null,
    to: number | null,
  } > | null,
  siteSizes:  Array< {
    __typename: string,
    from: number | null,
    to: number | null,
  } > | null,
  developmentModels: Array< string > | null,
  availability: Array< string > | null,
  landUse: Array< string > | null,
  goodFor: Array< string > | null,
  specialAttributes: Array< string > | null,
  developmentOportunities:  Array< {
    __typename: string,
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: string,
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
      __typename: string,
      text: string,
      url: string,
    } > | null,
  } > | null,
  acquisitionRequests:  Array< {
    __typename: string,
    name: string,
    id: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    photo:  {
      __typename: string,
      uuid: string,
      crop:  {
        __typename: string,
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: string,
      from: number | null,
      to: number | null,
    } | null,
    geographies: Array< string > | null,
    landUse: Array< string > | null,
    unitCapacity: Array< string > | null,
  } > | null,
  listingsAll:  Array< {
    __typename: string,
    id: string,
    name: string,
    type: string,
    summary: string | null,
    specialAttributes: Array< string > | null,
    status: string | null,
    updatedAt: string,
    location:  {
      __typename: string,
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
      __typename: string,
      text: string,
      url: string,
    } > | null,
    photo:  {
      __typename: string,
      uuid: string,
      crop:  {
        __typename: string,
        x: number,
        y: number,
        w: number,
        h: number,
      } | null,
    } | null,
    shortDescription: string | null,
    areaRange:  {
      __typename: string,
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
  name: string,
  photo: string | null,
  location: string | null,
  isMine: boolean,
  organizationType: Array< string > | null,
  interests: Array< string > | null,
  followed: boolean,
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
  isAccountPicked: boolean,
  isCompleted: boolean,
  isBlocked: boolean,
};

export interface UserShortFragment {
  __typename: "User",
  id: string,
  name: string,
  firstName: string,
  lastName: string | null,
  picture: string | null,
  email: string | null,
};

export interface ParcelFullFragment {
  __typename: "Parcel",
  id: string,
  number:  {
    __typename: string,
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
    __typename: string,
    latitude: number,
    longitude: number,
  } | null,
  address: string | null,
  compatibleBuildings:  Array< {
    __typename: string,
    key: string,
    title: string,
    width: number,
    height: number,
    center:  {
      __typename: string,
      latitude: number,
      longitude: number,
    } | null,
    angle: number | null,
    shape: string | null,
  } > | null,
  // Addresses
  city:  {
    __typename: string,
    id: string,
    name: string,
    county:  {
      __typename: string,
      id: string,
      name: string,
    },
    state:  {
      __typename: string,
      id: string,
      name: string,
      code: string,
    },
  },
  area:  {
    __typename: string,
    value: number,
  } | null,
  depth:  {
    __typename: string,
    value: number,
  } | null,
  front:  {
    __typename: string,
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
    __typename: string,
    id: string,
    name: string,
  } | null,
  // User Data
  userData:  {
    __typename: string,
    notes: string | null,
  } | null,
  // Linked Data
  opportunity:  {
    __typename: string,
    id: string,
    priority: OpportunityPriority,
    state: OpportunityState,
  } | null,
  metadata:  {
    __typename: string,
    description: string | null,
    available: boolean | null,
    currentUse: ParcelUse | null,
    isOkForTower: boolean | null,
  },
  likes:  {
    __typename: string,
    liked: boolean,
    count: number | null,
  },
  permits:  Array< {
    __typename: string,
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
    __typename: string,
    title: string,
    url: string,
  } >,
};

export interface ParcelShortFragment {
  __typename: "Parcel",
  id: string,
  number:  {
    __typename: string,
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
    __typename: string,
    value: number,
  } | null,
  depth:  {
    __typename: string,
    value: number,
  } | null,
  front:  {
    __typename: string,
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
    __typename: string,
    id: string,
    name: string,
  } | null,
  // Addresses
  city:  {
    __typename: string,
    id: string,
    name: string,
    county:  {
      __typename: string,
      id: string,
      name: string,
    },
    state:  {
      __typename: string,
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
    __typename: string,
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
    __typename: string,
    value: number,
  } | null,
  depth:  {
    __typename: string,
    value: number,
  } | null,
  front:  {
    __typename: string,
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
    __typename: string,
    id: string,
    name: string,
    county:  {
      __typename: string,
      id: string,
      name: string,
    },
    state:  {
      __typename: string,
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
    __typename: string,
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
    __typename: string,
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
    __typename: string,
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
    __typename: string,
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
      __typename: string,
      streetId: string,
      streetName: string,
      streetNameSuffix: string | null,
      streetNumber: number,
      streetNumberSuffix: string | null,
    } >,
  } >,
};
