export type StoredMessage = {
    id: string;
    seq: number;
    date: number;
    sender: string;
    text: string | null;
    fallback: string;
};

export function extractUsers(message: StoredMessage, to: Set<string>) {
    to.add(message.sender);
}