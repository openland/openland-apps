export interface PendingMessage {
    key: string;
    progress: number;
    message: string | null;
    file: string | null;
    failed?: boolean;
}