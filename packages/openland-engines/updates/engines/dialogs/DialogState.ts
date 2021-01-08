import { FullMessage } from 'openland-api/spacex.types';

export interface DialogState {
    key: string;
    title: string;
    photo: string | null;
    muted: boolean;
    kind: 'private' | 'group-secret' | 'group-shared';

    sortKey: number | null;
    topMessage: FullMessage | null;
    draft: { message: string, date: number } | null;

    counter: number;
    mentions: number;
}
