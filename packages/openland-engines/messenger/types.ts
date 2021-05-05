import {
    FullMessage,
    FullMessage_GeneralMessage_spans,
    MyStickers_stickers_packs_stickers,
} from 'openland-api/spacex.types';
import { DataSourceMessageItem } from './ConversationEngine';

export interface PendingMessage {
    isService?: false;
    date: string;
    key: string;
    filesMeta?: {
        key: string;
        fileSize?: number;
        filePreview?: string;
        imageSize?: { width: number; height: number };
        progress: number;
        file: string | null;
        uri?: string;
        duration?: number;
        isImage: boolean;
    }[];
    message: string | null;
    spans: FullMessage_GeneralMessage_spans[];
    failed?: boolean;
    quoted?: DataSourceMessageItem[];
    sticker: MyStickers_stickers_packs_stickers | null;
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
    imageSize?: { width: number; height: number };
    duration?: number | undefined;
}

export enum UploadStatus {
    UPLOADING,
    FAILED,
    COMPLETED,
}

export interface UploadingFile {
    fetchInfo(): Promise<FileMetadata>;
    watch(
        handler: (state: { status: UploadStatus; progress?: number; uuid?: string }) => void,
    ): void;
}

export interface LocalImage {
    src: string | null;
    width: number;
    height: number;
    file?: UploadingFile;
}
