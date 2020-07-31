export interface PendingMessage {
    sender: string;
    date: number;
    text: string | null;
    fallback: string;
    repeatKey: string;
}