export type tabsT = 'requests' | 'members';

export const tabs: { [K in tabsT]: tabsT } = {
    requests: 'requests',
    members: 'members',
};
