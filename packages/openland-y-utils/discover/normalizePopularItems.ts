import { DiscoverSharedRoom, DiscoverPopularNow_discoverPopularNow_items, DiscoverOrganization as DiscoverOrg, DiscoverPopularOrganizations_discoverPopularNowOrganizations_items, } from 'openland-api/spacex.types';

export type DiscoverRoom = DiscoverSharedRoom & { newMessages?: number };

export const normalizePopularItems = (items: DiscoverPopularNow_discoverPopularNow_items[]): DiscoverRoom[] => {
    return (items || []).map(item => ({ ...item.room, newMessages: item.newMessages }));
};

export type DiscoverOrganization = DiscoverOrg & { newMessages?: number };

export const normalizePopularOrgItems = (items: DiscoverPopularOrganizations_discoverPopularNowOrganizations_items[]): DiscoverOrganization[] => {
    return (items || []).map(item => ({ ...item.organization, newMessages: item.newMessages }));
};