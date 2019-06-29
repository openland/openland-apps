import { FullMessage, FullMessage_GeneralMessage_spans, UserBadge } from 'openland-api/Types';
import { DataSourceMessageItem } from './ConversationEngine';

export interface PendingMessage {
    isService?: false,
    date: string;
    key: string;
    progress: number;
    message: string | null;
    spans: FullMessage_GeneralMessage_spans[];
    file: string | null;
    uri?: string;
    fileSize?: number;
    isImage: boolean;
    imageSize?: { width: number, height: number };
    failed?: boolean;
    quoted?: DataSourceMessageItem[];
    senderBadge?: UserBadge;
}

export type ModelMessage = PendingMessage | FullMessage;

export function isPendingMessage(src: ModelMessage): src is PendingMessage {
    return !(src as any).__typename;
}

export function isServerMessage(message: FullMessage | PendingMessage): message is FullMessage {
    return !!(message as any).__typename;
}

export interface FileMetadata {
    name?: string;
    uri?: string;
    fileSize?: number;
    isImage?: boolean;
    imageSize?: { width: number, height: number }
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