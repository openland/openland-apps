export interface PendingMessage {
    sender: string;
    text: string | null;
    fallback: string;
    repeatKey: string;
}