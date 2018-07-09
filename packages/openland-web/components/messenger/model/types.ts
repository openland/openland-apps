import { MessageFullFragment } from 'openland-api/Types';

export interface PendingMessage {
    date: string;
    key: string;
    progress: number;
    message: string | null;
    file: string | null;
    failed?: boolean;
}

export type ModelMessage = PendingMessage | MessageFullFragment;

export function isPendingMessage(src: ModelMessage): src is PendingMessage {
    return !(src as any).__typename;
}

export function isServerMessage(message: MessageFullFragment | PendingMessage): message is MessageFullFragment {
    return !!(message as any).__typename;
}