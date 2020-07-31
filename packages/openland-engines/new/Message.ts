
export interface MessageUser {
    id: string;
    firstName: string;
    lastName: string | null;
    isBot: boolean;
    username: string | null;
}

export type Message = {
    key: string;
    date: number;
    sender: MessageUser;
    text: string | null;
    fallback: string;
} & (
        | {
            state: 'sending'
        }
        | {
            state: 'sent',
            id: string;
            seq: number;
        }
    );
