export type tabsT =
    | 'empty'
    | 'conversation'
    | 'compose'
    | 'rooms'
    | 'invite'
    | 'organization'
    | 'user'
    | 'conference'
    | 'chat';

export const tabs: { [K in tabsT]: tabsT } = {
    empty: 'empty',
    conversation: 'conversation',
    compose: 'compose',
    rooms: 'rooms',
    invite: 'invite',
    organization: 'organization',
    user: 'user',
    conference: 'conference',
    chat: 'chat',
};
