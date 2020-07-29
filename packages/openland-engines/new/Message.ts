
export interface MessageUser {
    id: string;
    firstName: string;
    lastName: string | null;
    isBot: boolean;
    username: string | null;
}

export type Message = {
    id: string;
    sender: MessageUser;
    date: number;

    text: string | null;
    fallback: string;
} & (
        | {
            state: 'sending',
            seq: null
        }
        | {
            state: 'sent',
            seq: number;
        }
);
