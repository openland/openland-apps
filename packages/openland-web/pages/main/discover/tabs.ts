export type tabsT = 'rooms' | 'invite' | 'profile';

export const tabs: { [K in tabsT]: tabsT } = {
    rooms: 'rooms',
    invite: 'invite',
    profile: 'profile',
};
