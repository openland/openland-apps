export type WireMessage = {
    id: string;
    seq: number;
    date: number;
    sender: string;
    text: string | null;
    fallback: string;
};

export function extractUsers(message: WireMessage, to: Set<string>) {
    to.add(message.sender);
}