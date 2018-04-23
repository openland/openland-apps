/* tslint:disable */
//  This file was automatically generated and should not be edited.

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


export interface GeoBox {
  east: number,
  north: number,
  west: number,
  south: number,
};

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


export enum OpportunitySort {
  DATE_ADDED_DESC = "DATE_ADDED_DESC",
  AREA_ASC = "AREA_ASC",
  AREA_DESC = "AREA_DESC",
}


export interface AccountQuery {
  me:  {
    __typename: "User",
    id: string,
    name: string,
    firstName: string,
    lastName: string,
    picture: string,
    email: string,
  } | null,
  myAccount:  {
    __typename: "MyAccount",
    id: string,
    title: string,
  } | null,
  myProfile:  {
    __typename: "MyProfile",
    isLoggedIn: boolean,
    isProfileCreated: boolean,
    isAccountActivated: boolean,
    isCompleted: boolean,
    isBlocked: boolean,
  },
  permissions:  {
    __typename: "Permissions",
    roles: Array< string >,
  },
};

export interface StateQueryQuery {
  items:  Array< {
    __typename: "State",
    id: string,
    title: string,
    subtitle: string,
  } >,
};

export interface CountyQueryQueryVariables {
  stateId: string,
};

export interface CountyQueryQuery {
  items:  Array< {
    __typename: "County",
    id: string,
    title: string,
  } >,
};

export interface AreaQueryVariables {
  areaId: string,
};

export interface AreaQuery {
  area:  {
    __typename: "Area",
    id: string,
    slug: string,
    writeAccess: boolean,
  },
  me:  {
    __typename: "User",
    id: string,
    name: string,
    firstName: string,
    lastName: string,
    picture: string,
    email: string,
  } | null,
};

export interface AreaStatsQueryVariables {
  areaId: string,
};

export interface AreaStatsQuery {
  area:  {
    __typename: "Area",
    id: string,
    slug: string,
    stats:  {
      __typename: "AreaStats",
      totalProjects: number,
      totalProjectsVerified: number,
      totalDevelopers: number,
      totalConstructors: number,
      totalOrganizations: number,
      totalPermits: number,
      year2017NewUnits: number,
      year2017NewUnitsVerified: number,
      year2018NewUnits: number,
      year2018NewUnitsVerified: number,
      fastestApprovalProject:  {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        approvalTime: number | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      },
      slowestApprovalProject:  {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        approvalTime: number | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      },
    },
  },
  permitsUnitsFiledStats:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
  permitsUnitsIssuedStats:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
  permitsUnitsCompletedStats:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
  permitsUnitsFiledStatsMonthly:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
};

export interface InternalStatsQuery {
  permitsApprovalStats:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
  permitsApprovalUnits:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
  permitsUnitsFiledStats:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
  permitsUnitsIssuedStats:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
  permitsUnitsCompletedStats:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
  permitsUnitsFiledStatsMonthly:  {
    __typename: "Chart",
    labels: Array< string >,
    datasets:  Array< {
      __typename: "ChartDataSet",
      label: string,
      values: Array< number >,
    } >,
  },
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

export interface FeatureFlagOrganizationAddMutationVariables {
  accountId: string,
  featureId: string,
};

export interface FeatureFlagOrganizationAddMutation {
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

export interface FeatureFlagOrganizationRemoveMutationVariables {
  accountId: string,
  featureId: string,
};

export interface FeatureFlagOrganizationRemoveMutation {
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

export interface OrganizationsQuery {
  organizations:  Array< {
    __typename: "Organization",
    id: string,
    slug: string,
    title: string,
    comments: string | null,
    logo: string | null,
    url: string | null,
    isDeveloper: boolean,
    isConstructor: boolean,
    developerIn:  Array< {
      __typename: "BuildingProject",
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: "Picture",
        url: string,
        retina: string,
      } | null,
    } >,
    constructorIn:  Array< {
      __typename: "BuildingProject",
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: "Picture",
        url: string,
        retina: string,
      } | null,
    } >,
  } >,
};

export interface OrganizationQueryVariables {
  orgId: string,
};

export interface OrganizationQuery {
  organization:  {
    __typename: "Organization",
    id: string,
    slug: string,
    title: string,
    comments: string | null,
    logo: string | null,
    cover: string | null,
    url: string | null,
    address: string | null,
    city: string | null,
    twitter: string | null,
    linkedin: string | null,
    facebook: string | null,
    isDeveloper: boolean,
    isConstructor: boolean,
    description: string | null,
    developerIn:  Array< {
      __typename: "BuildingProject",
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: "Picture",
        url: string,
        retina: string,
      } | null,
    } >,
    constructorIn:  Array< {
      __typename: "BuildingProject",
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: "Picture",
        url: string,
        retina: string,
      } | null,
    } >,
    partners:  Array< {
      __typename: "Organization",
      id: string,
      slug: string,
      title: string,
      comments: string | null,
      logo: string | null,
      url: string | null,
      isDeveloper: boolean,
      isConstructor: boolean,
      developerIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
      constructorIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
    } >,
  },
};

export interface OrganizationMutationAddMutationVariables {
  slug: string,
  title: string,
};

export interface OrganizationMutationAddMutation {
  organizationAdd:  {
    __typename: "Organization",
    id: string,
    slug: string,
    title: string,
    comments: string | null,
    logo: string | null,
    url: string | null,
    isDeveloper: boolean,
    isConstructor: boolean,
    developerIn:  Array< {
      __typename: "BuildingProject",
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: "Picture",
        url: string,
        retina: string,
      } | null,
    } >,
    constructorIn:  Array< {
      __typename: "BuildingProject",
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: "Picture",
        url: string,
        retina: string,
      } | null,
    } >,
  },
};

export interface OrganizationMutationRemoveMutationVariables {
  orgId: string,
};

export interface OrganizationMutationRemoveMutation {
  organizationRemove: string,
};

export interface OrganizationAlterMutationVariables {
  orgId: string,
  title?: string | null,
  comments?: string | null,
  logo?: string | null,
  cover?: string | null,
  url?: string | null,
  city?: string | null,
  address?: string | null,
  twitter?: string | null,
  linkedin?: string | null,
  facebook?: string | null,
  isDeveloper?: boolean | null,
  isConstructor?: boolean | null,
  description?: string | null,
};

export interface OrganizationAlterMutation {
  organizationAlter:  {
    __typename: "Organization",
    id: string,
    slug: string,
    title: string,
    comments: string | null,
    logo: string | null,
    cover: string | null,
    url: string | null,
    address: string | null,
    city: string | null,
    twitter: string | null,
    linkedin: string | null,
    facebook: string | null,
    isDeveloper: boolean,
    isConstructor: boolean,
    description: string | null,
    developerIn:  Array< {
      __typename: "BuildingProject",
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: "Picture",
        url: string,
        retina: string,
      } | null,
    } >,
    constructorIn:  Array< {
      __typename: "BuildingProject",
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: "Picture",
        url: string,
        retina: string,
      } | null,
    } >,
    partners:  Array< {
      __typename: "Organization",
      id: string,
      slug: string,
      title: string,
      comments: string | null,
      logo: string | null,
      url: string | null,
      isDeveloper: boolean,
      isConstructor: boolean,
      developerIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
      constructorIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
    } >,
  },
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

export interface ParcelsSearchQueryQueryVariables {
  query: string,
};

export interface ParcelsSearchQueryQuery {
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
      lastName: string,
      picture: string,
      email: string,
    },
  } >,
};

export interface SuperAccountsQuery {
  superAccounts:  Array< {
    __typename: "SuperAccount",
    id: string,
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
      lastName: string,
      picture: string,
      email: string,
    } >,
    features:  Array< {
      __typename: "FeatureFlag",
      id: string,
      key: string,
      title: string,
    } >,
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
      lastName: string,
      picture: string,
      email: string,
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
      lastName: string,
      picture: string,
      email: string,
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

export interface ProjectQueryVariables {
  areaId: string,
  projectId: string,
};

export interface ProjectQuery {
  project:  {
    __typename: "BuildingProject",
    id: string,
    slug: string,
    name: string,
    description: string | null,
    status: string | null,
    startedAt: string | null,
    completedAt: string | null,
    expectedCompletedAt: string | null,
    verified: boolean,
    existingUnits: number | null,
    proposedUnits: number | null,
    existingAffordableUnits: number | null,
    proposedAffordableUnits: number | null,
    preview:  {
      __typename: "Picture",
      url: string,
      retina: string,
    } | null,
    extrasDeveloper: string | null,
    extrasGeneralConstructor: string | null,
    extrasYearEnd: string | null,
    extrasAddress: string | null,
    extrasAddressSecondary: string | null,
    extrasPermit: string | null,
    extrasComment: string | null,
    extrasUrl: string | null,
    extrasLocation:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    } | null,
    developers:  Array< {
      __typename: "Organization",
      id: string,
      slug: string,
      title: string,
      comments: string | null,
      logo: string | null,
      url: string | null,
      isDeveloper: boolean,
      isConstructor: boolean,
      developerIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
      constructorIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
    } >,
    constructors:  Array< {
      __typename: "Organization",
      id: string,
      slug: string,
      title: string,
      comments: string | null,
      logo: string | null,
      url: string | null,
      isDeveloper: boolean,
      isConstructor: boolean,
      developerIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
      constructorIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
    } >,
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
      streetNumbers:  Array< {
        __typename: "StreetNumber",
        streetId: string,
        streetName: string,
        streetNameSuffix: string | null,
        streetNumber: number,
        streetNumberSuffix: string | null,
      } >,
    } >,
  },
};

export interface ProjectsConnectionQueryVariables {
  areaId: string,
  cursor?: string | null,
  page?: number | null,
  minUnits?: number | null,
  year?: string | null,
  filter?: string | null,
};

export interface ProjectsConnectionQuery {
  items:  {
    __typename: "BuildingProjectConnection",
    edges:  Array< {
      __typename: "BuildingProjectEdge",
      node:  {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
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
    stats:  {
      __typename: "BuildingProjectConnectionStats",
      newUnits: number,
      newUnitsVerified: number,
      totalProjects: number,
      totalProjectsVerified: number,
    },
  },
};

export interface ProjectsSFConnectionQueryVariables {
  cursor?: string | null,
  page?: number | null,
  minUnits?: number | null,
  year?: string | null,
  filter?: string | null,
};

export interface ProjectsSFConnectionQuery {
  items:  {
    __typename: "BuildingProjectConnection",
    edges:  Array< {
      __typename: "BuildingProjectEdge",
      node:  {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
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
    stats:  {
      __typename: "BuildingProjectConnectionStats",
      newUnits: number,
      newUnitsVerified: number,
      totalProjects: number,
      totalProjectsVerified: number,
    },
  },
};

export interface ProjectSFQueryVariables {
  projectId: string,
};

export interface ProjectSFQuery {
  project:  {
    __typename: "BuildingProject",
    id: string,
    slug: string,
    name: string,
    description: string | null,
    status: string | null,
    startedAt: string | null,
    completedAt: string | null,
    expectedCompletedAt: string | null,
    verified: boolean,
    existingUnits: number | null,
    proposedUnits: number | null,
    existingAffordableUnits: number | null,
    proposedAffordableUnits: number | null,
    preview:  {
      __typename: "Picture",
      url: string,
      retina: string,
    } | null,
    extrasDeveloper: string | null,
    extrasGeneralConstructor: string | null,
    extrasYearEnd: string | null,
    extrasAddress: string | null,
    extrasAddressSecondary: string | null,
    extrasPermit: string | null,
    extrasComment: string | null,
    extrasUrl: string | null,
    extrasLocation:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    } | null,
    developers:  Array< {
      __typename: "Organization",
      id: string,
      slug: string,
      title: string,
      comments: string | null,
      logo: string | null,
      url: string | null,
      isDeveloper: boolean,
      isConstructor: boolean,
      developerIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
      constructorIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
    } >,
    constructors:  Array< {
      __typename: "Organization",
      id: string,
      slug: string,
      title: string,
      comments: string | null,
      logo: string | null,
      url: string | null,
      isDeveloper: boolean,
      isConstructor: boolean,
      developerIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
      constructorIn:  Array< {
        __typename: "BuildingProject",
        id: string,
        slug: string,
        name: string,
        description: string | null,
        status: string | null,
        extrasYearEnd: string | null,
        extrasAddress: string | null,
        extrasAddressSecondary: string | null,
        existingUnits: number | null,
        proposedUnits: number | null,
        verified: boolean,
        extrasUrl: string | null,
        preview:  {
          __typename: "Picture",
          url: string,
          retina: string,
        } | null,
      } >,
    } >,
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
      streetNumbers:  Array< {
        __typename: "StreetNumber",
        streetId: string,
        streetName: string,
        streetNameSuffix: string | null,
        streetNumber: number,
        streetNumberSuffix: string | null,
      } >,
    } >,
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

export interface AddOpportunityMutationMutationVariables {
  parcelId: string,
};

export interface AddOpportunityMutationMutation {
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

export interface ApproveOpportunityMutationMutationVariables {
  opportunityId: string,
  state: OpportunityState,
};

export interface ApproveOpportunityMutationMutation {
  alphaApprove: string,
};

export interface RejectOpportunityMutationMutationVariables {
  opportunityId: string,
  state: OpportunityState,
};

export interface RejectOpportunityMutationMutation {
  alphaReject: string,
};

export interface SnoozeOpportunityMutationMutationVariables {
  opportunityId: string,
  state: OpportunityState,
};

export interface SnoozeOpportunityMutationMutation {
  alphaSnooze: string,
};

export interface alphaAddOpportunitiesFromSearchMutationVariables {
  query: string,
};

export interface alphaAddOpportunitiesFromSearchMutation {
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

export interface OpportunityStatsQuery {
  incoming: number,
  approved_initial: number,
  approved_zoning: number,
  approved: number,
  rejected: number,
  snoozed: number,
};

export interface UsersQueryQueryVariables {
  query: string,
};

export interface UsersQueryQuery {
  items:  Array< {
    __typename: "User",
    id: string,
    title: string,
    subtitle: string,
  } >,
};

export interface MyProfileFullFragment {
  __typename: "MyProfile",
  isLoggedIn: boolean,
  isProfileCreated: boolean,
  isAccountActivated: boolean,
  isCompleted: boolean,
  isBlocked: boolean,
};

export interface AccountShortFragment {
  __typename: "MyAccount",
  id: string,
  title: string,
};

export interface AreaShortFragment {
  __typename: "Area",
  id: string,
  slug: string,
  writeAccess: boolean,
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

export interface OrganizationShortFragment {
  __typename: "Organization",
  id: string,
  slug: string,
  title: string,
  comments: string | null,
  logo: string | null,
  url: string | null,
  isDeveloper: boolean,
  isConstructor: boolean,
  developerIn:  Array< {
    __typename: string,
    id: string,
    slug: string,
    name: string,
    description: string | null,
    status: string | null,
    extrasYearEnd: string | null,
    extrasAddress: string | null,
    extrasAddressSecondary: string | null,
    existingUnits: number | null,
    proposedUnits: number | null,
    verified: boolean,
    extrasUrl: string | null,
    preview:  {
      __typename: string,
      url: string,
      retina: string,
    } | null,
  } >,
  constructorIn:  Array< {
    __typename: string,
    id: string,
    slug: string,
    name: string,
    description: string | null,
    status: string | null,
    extrasYearEnd: string | null,
    extrasAddress: string | null,
    extrasAddressSecondary: string | null,
    existingUnits: number | null,
    proposedUnits: number | null,
    verified: boolean,
    extrasUrl: string | null,
    preview:  {
      __typename: string,
      url: string,
      retina: string,
    } | null,
  } >,
};

export interface OrganizationFullFragment {
  __typename: "Organization",
  id: string,
  slug: string,
  title: string,
  comments: string | null,
  logo: string | null,
  cover: string | null,
  url: string | null,
  address: string | null,
  city: string | null,
  twitter: string | null,
  linkedin: string | null,
  facebook: string | null,
  isDeveloper: boolean,
  isConstructor: boolean,
  description: string | null,
  developerIn:  Array< {
    __typename: string,
    id: string,
    slug: string,
    name: string,
    description: string | null,
    status: string | null,
    extrasYearEnd: string | null,
    extrasAddress: string | null,
    extrasAddressSecondary: string | null,
    existingUnits: number | null,
    proposedUnits: number | null,
    verified: boolean,
    extrasUrl: string | null,
    preview:  {
      __typename: string,
      url: string,
      retina: string,
    } | null,
  } >,
  constructorIn:  Array< {
    __typename: string,
    id: string,
    slug: string,
    name: string,
    description: string | null,
    status: string | null,
    extrasYearEnd: string | null,
    extrasAddress: string | null,
    extrasAddressSecondary: string | null,
    existingUnits: number | null,
    proposedUnits: number | null,
    verified: boolean,
    extrasUrl: string | null,
    preview:  {
      __typename: string,
      url: string,
      retina: string,
    } | null,
  } >,
  partners:  Array< {
    __typename: string,
    id: string,
    slug: string,
    title: string,
    comments: string | null,
    logo: string | null,
    url: string | null,
    isDeveloper: boolean,
    isConstructor: boolean,
    developerIn:  Array< {
      __typename: string,
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: string,
        url: string,
        retina: string,
      } | null,
    } >,
    constructorIn:  Array< {
      __typename: string,
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: string,
        url: string,
        retina: string,
      } | null,
    } >,
  } >,
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

export interface ProjectShortFragment {
  __typename: "BuildingProject",
  id: string,
  slug: string,
  name: string,
  description: string | null,
  status: string | null,
  extrasYearEnd: string | null,
  extrasAddress: string | null,
  extrasAddressSecondary: string | null,
  existingUnits: number | null,
  proposedUnits: number | null,
  verified: boolean,
  extrasUrl: string | null,
  preview:  {
    __typename: string,
    url: string,
    retina: string,
  } | null,
};

export interface ProjectPreviewFragment {
  __typename: "BuildingProject",
  id: string,
  slug: string,
  name: string,
  approvalTime: number | null,
  preview:  {
    __typename: string,
    url: string,
    retina: string,
  } | null,
};

export interface ProjectFullFragment {
  __typename: "BuildingProject",
  id: string,
  slug: string,
  name: string,
  description: string | null,
  status: string | null,
  startedAt: string | null,
  completedAt: string | null,
  expectedCompletedAt: string | null,
  verified: boolean,
  existingUnits: number | null,
  proposedUnits: number | null,
  existingAffordableUnits: number | null,
  proposedAffordableUnits: number | null,
  preview:  {
    __typename: string,
    url: string,
    retina: string,
  } | null,
  extrasDeveloper: string | null,
  extrasGeneralConstructor: string | null,
  extrasYearEnd: string | null,
  extrasAddress: string | null,
  extrasAddressSecondary: string | null,
  extrasPermit: string | null,
  extrasComment: string | null,
  extrasUrl: string | null,
  extrasLocation:  {
    __typename: string,
    latitude: number,
    longitude: number,
  } | null,
  developers:  Array< {
    __typename: string,
    id: string,
    slug: string,
    title: string,
    comments: string | null,
    logo: string | null,
    url: string | null,
    isDeveloper: boolean,
    isConstructor: boolean,
    developerIn:  Array< {
      __typename: string,
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: string,
        url: string,
        retina: string,
      } | null,
    } >,
    constructorIn:  Array< {
      __typename: string,
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: string,
        url: string,
        retina: string,
      } | null,
    } >,
  } >,
  constructors:  Array< {
    __typename: string,
    id: string,
    slug: string,
    title: string,
    comments: string | null,
    logo: string | null,
    url: string | null,
    isDeveloper: boolean,
    isConstructor: boolean,
    developerIn:  Array< {
      __typename: string,
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: string,
        url: string,
        retina: string,
      } | null,
    } >,
    constructorIn:  Array< {
      __typename: string,
      id: string,
      slug: string,
      name: string,
      description: string | null,
      status: string | null,
      extrasYearEnd: string | null,
      extrasAddress: string | null,
      extrasAddressSecondary: string | null,
      existingUnits: number | null,
      proposedUnits: number | null,
      verified: boolean,
      extrasUrl: string | null,
      preview:  {
        __typename: string,
        url: string,
        retina: string,
      } | null,
    } >,
  } >,
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

export interface UserShortFragment {
  __typename: "User",
  id: string,
  name: string,
  firstName: string,
  lastName: string,
  picture: string,
  email: string,
};
