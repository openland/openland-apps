export type HybridMessage = {

    key: string;
    date: number;
    sender: string;
    text: string | null;
    fallback: string;

} & (
        | { type: 'pending' }
        | { type: 'sent', id: string, seq: number }
    );