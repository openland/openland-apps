export type tabsT =
    | 'empty'
    | 'conversation'
    | 'compose'
    | 'rooms'
    | 'roomInvite'
    | 'organizationInvite'
    | 'organization'
    | 'user'
    | 'conference'
    | 'chat'
    | 'roomProfile';

export const tabs: { [K in tabsT]: tabsT } = {
    empty: 'empty',
    conversation: 'conversation',
    compose: 'compose',
    rooms: 'rooms',
    roomInvite: 'roomInvite',
    organizationInvite: 'organizationInvite',
    organization: 'organization',
    user: 'user',
    conference: 'conference',
    chat: 'chat',
    roomProfile: 'roomProfile',
};
