import { RoomChat_room, RoomTiny_room } from 'openland-api/spacex.types';

export const shouldShowInviteButton = (chat: RoomChat_room | RoomTiny_room) => chat.__typename === 'SharedRoom' && (!chat.organization || (
                                                                   (chat.organization.isAdmin || chat.organization.membersCanInvite) &&
                                                                   !(chat.organization.private && chat.isPremium && chat.role === 'MEMBER')
                                                               ));