export type tabsT = 'featured' | 'requests' | 'members';

export const tabs: { [K in tabsT]: tabsT } = {
    featured: 'featured',
    requests: 'requests',
    members: 'members',
};
