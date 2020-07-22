export type StoredMessage = {
    id: string;
    seq: number;
    sender: string;
    text: string | null;
    fallback: string;
};