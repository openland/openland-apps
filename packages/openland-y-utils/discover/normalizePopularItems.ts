import { DiscoverSharedRoom, DiscoverPopularNow_discoverPopularNow_items } from 'openland-api/spacex.types';

export type DiscoverRoom = DiscoverSharedRoom & {newMessages?: number};

export const normalizePopularItems = (items: DiscoverPopularNow_discoverPopularNow_items[]): DiscoverRoom[] => {
    return (items || []).map(item => ({...item.room, newMessages: item.newMessages}));
};
