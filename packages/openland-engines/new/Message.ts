
export interface MessageUser {
    id: string;
    firstName: string;
    lastName: string | null;
    isBot: boolean;
    username: string | null;
}

export interface Message {

    id: string;
    sender: MessageUser;
    state: 'sending' | 'sent';
    date: number;
    cursor: string;

    text: string | null;
    fallback: string;
}