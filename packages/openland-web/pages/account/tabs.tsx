export type tabsT = 'profile' | 'notifications' | 'appearance';

export const tabs: { [K in tabsT]: tabsT } = {
    profile: 'profile',
    notifications: 'notifications',
    appearance: 'appearance',
};
