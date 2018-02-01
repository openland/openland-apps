export interface PermitEvent {
    __typename: string;
}

export interface StreetNumber {
    streetId: string;
    streetName: string;
    streetNameSuffix?: string;
    streetNumber: number;
    streetNumberSuffix?: string;
}

export interface Picture {
    url: string;
    retina: string;
}

export interface Geo {
    latitude: number;
    longitude: number;
}

export interface ListCardProps {
    // default types
    cardData?: any;
    cardType?: string;
    className?: string;

    // permits types
    // permits?: any;

    id?: string; // remove symbol - ?
    issuedAt?: string;
    createdAt?: string;
    startedAt?: string;
    expiresAt?: string;
    expiredAt?: string;
    filedAt?: string;
    completedAt?: string;

    approvalTime?: number;

    status?: string;
    statusUpdatedAt?: string;
    streetNumbers?: [StreetNumber];

    typeWood?: boolean;

    existingStories?: number;
    proposedStories?: number;
    existingUnits?: number;
    proposedUnits?: number;
    existingAffordableUnits?: number;
    proposedAffordableUnits?: number;
    proposedUse?: string;
    description?: string;

    events?: [PermitEvent]; // remove symbol - ?

    relatedPermits?: [ListCardProps]; // remove symbol - ?

    governmentalUrl?: string; // remove symbol - ?

    fasterThan?: number;

    // projects types
    newUnits?: number;
    endYear?: string;
    picture?: { url: string, retina: string };
    verified?: boolean;
    location?: { latitude: number, longitude: number };

    name?: string;
    expectedCompletedAt?: string;

    preview?: Picture;
    extrasDeveloper?: string;
    extrasGeneralConstructor?: string;
    extrasYearEnd?: string;
    extrasAddress?: string;
    extrasAddressSecondary?: string;
    extrasPermit?: string;
    extrasComment?: string;
    extrasUrl?: string;
    extrasLocation?: Geo;

    developers?: ListCardProps[];
    constructors?: ListCardProps[];
    permits?: ListCardProps[];

    // organizations types
    projects?: number;
    logo?: string;
    profile?: string; // remove symbol - ?
    featured?: {
        title: string,
        url: string,
        picture?: { url: string; retina: string; }
    };

    // projects & organizations types
    title?: string; // remove symbol - ?
    subtitle?: string;
    url?: string;
    slug?: string;
}