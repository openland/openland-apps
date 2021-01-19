import { UpdateMessage } from './../../../../openland-api/spacex.types';

export interface DialogState {
    key: string;
    title: string;
    photo: string | null;
    muted: boolean;
    kind: 'private' | 'group-secret' | 'group-shared';
    channel: boolean;
    premium: boolean;
    featured: boolean;
    activeCall: boolean;

    sortKey: number | null;
    topMessage: UpdateMessage | null;
    draft: { message: string, date: number } | null;

    counter: number;
    mentions: number;
}