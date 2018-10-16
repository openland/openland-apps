import { MessageFull } from 'openland-api/Types';

export interface PendingMessage {
    date: string;
    key: string;
    progress: number;
    message: string | null;
    file: string | null;
    uri?: string;
    fileSize?: number;
    failed?: boolean;
}

export type ModelMessage = PendingMessage | MessageFull;

export function isPendingMessage(src: ModelMessage): src is PendingMessage {
    return !(src as any).__typename;
}

export function isServerMessage(message: MessageFull | PendingMessage): message is MessageFull {
    return !!(message as any).__typename;
}

export function extractKey(message: ModelMessage) {
    return isServerMessage(message) ? (message.repeatKey ? message.repeatKey : message.id) : message.key;
}

export interface FileMetadata {
    name?: string;
    uri?: string;
    fileSize?: number;
}

export enum UploadStatus {
    UPLOADING,
    FAILED,
    COMPLETED
}

export interface UploadingFile {
    fetchInfo(): Promise<FileMetadata>;
    watch(handler: (state: { status: UploadStatus, progress?: number, uuid?: string }) => void): void;
}