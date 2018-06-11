export type DevelopmentModels =
    | 'request_for_proposals'
    | 'joint_venture '
    | 'ground_lease  '
    | 'sale'
    | 'option_to_buy';

export const DevelopmentModelsMap = [
    { value: 'request_for_proposals', label: 'request for proposals' },
    { value: 'joint_venture', label: 'joint venture' },
    { value: 'ground_lease', label: 'ground lease' },
    { value: 'sale', label: 'sale' },
    { value: 'option_to_buy', label: 'option to buy' },
];

export type Availability =
    |'immediate'
    | 'long_term'
    | 'near_future';

export const AvailabilityMap = [
    { value: 'immediate', label: 'immediate' },
    { value: 'long_term', label: 'long term' },
    { value: 'near_future', label: 'near future' },
];

export type LandUse =
    | 'residential'
    | 'commercial'
    | 'public'
    | 'mixed_use'
    | 'industrial';

export const LandUseMap = [
    { value: 'residential', label: 'residential' },
    { value: 'commercial', label: 'commercial' },
    { value: 'public', label: 'public' },
    { value: 'mixed_use', label: 'mixed_use' },
    { value: 'industrial', label: 'industrial' },
];

export type GoodFor =
    | 'large_multi_family'
    | 'small_multi_family'
    | 'mixed_use'
    | 'office'
    | 'industrial'
    | 'non_traditional'
    | 'tower'
    | 'block_sized_development';

export const GoodForMap = [
    { value: 'large_multi_family', label: 'large multi-family' },
    { value: 'small_multi_family', label: 'small multi-family' },
    { value: 'mixed_use', label: 'mixed use' },
    { value: 'office', label: 'office' },
    { value: 'industrial', label: 'industrial' },
    { value: 'non_traditional', label: 'non traditional' },
    { value: 'tower', label: 'tower' },
    { value: 'block_sized_development', label: 'block sized development' },
];

export type SpecialAttributes =
    | 'waterfront'
    | 'downtown'
    | 'parking'
    | 'fully_entitled'
    | 'recently_upzoned'
    | 'industrial'
    | 'mixed_use'
    | 'block_sized_development';

export const SpecialAttributesMap = [
    { value: 'waterfront', label: 'waterfront' },
    { value: 'downtown', label: 'downtown' },
    { value: 'parking', label: 'parking' },
    { value: 'fully_entitled', label: 'fully entitled' },
    { value: 'recently_upzoned', label: 'recently upzoned' },
    { value: 'industrial', label: 'industrial' },
    { value: 'mixed_use', label: 'mixed use' },
    { value: 'block_sized_development', label: 'block sized development' },
];

export interface Range {
    from?: number;
    to?: number;
}

export interface ContactPerson {
    name: string | null;
    avatar?: string | null;
    role?: string | null;
    email?: string | null;
    phone?: string | null;
    link?: string | null;
}

export interface OrganizationExtras {
    potentialSites?: Range[] | null;
    siteSizes?: Range[] | null;
    description?: String | null;
    twitter?: string | null;
    facebook?: string | null;
    developmentModels?: DevelopmentModels[] | null;
    availability?: Availability[] | null;
    contacts?: ContactPerson[] | null;
    landUse?: LandUse[] | null;
    goodFor?: GoodFor[] | null;
    specialAttributes?: SpecialAttributes[] | null;
}