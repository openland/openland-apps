import { OpenlandClient } from 'openland-api/OpenlandClient';
import { TypingsWatch, TypingType } from 'openland-api/Types';
import { forever } from 'openland-engines/utils/forever';
import { GraphqlActiveSubscription } from '@openland/spacex';
import { reliableWatcher } from 'openland-api/reliableWatcher';

export interface TypingsUser {
    userName: string;
    userPic: string | null;
    userId: string;
    typingType: TypingType;
}

interface Conversation {
    [userId: string]: TypingsUser | undefined;
}

interface Typings {
    [conversationId: string]: Conversation | undefined;
}

interface ConversationTimeouts {
    [userId: string]: number | undefined;
}

interface Timeouts {
    [conversationId: string]: ConversationTimeouts | undefined;
}

interface TypingsData {
    typing: string;
    users: TypingsUser[];
    typingType: TypingType;
}

type TypingsListener = (
    typing: string | undefined,
    users: TypingsUser[] | undefined,
    typingType: TypingType | undefined,
    conversationId: string
) => void;

export class TypingsWatcher {
    private typings: Typings = {};
    private timeouts: Timeouts = {};
    private subscription: () => void;
    private onChange: (conversationId: string, data?: TypingsData) => void;

    constructor(client: OpenlandClient, onChange: (conversationId: string, data?: TypingsData) => void, currentUserId: string) {
        this.onChange = onChange;
        this.subscription = reliableWatcher<TypingsWatch>((handler) => client.subscribeTypingsWatch(handler), (event) => {
            if (event.typings.user.id === currentUserId) {
                return;
            }
            let conversationId: string = event.typings.conversation.id;
            let type: string = event.typings.conversation.__typename;

            console.log(event.typings.type);

            // add new typings
            let existing = this.typings[conversationId] || {};

            if (!event.typings.cancel) {
                existing[event.typings.user.id] = {
                    userName: event.typings.user.firstName,
                    userPic: event.typings.user.photo,
                    userId: event.typings.user.id,
                    typingType: event.typings.type
                };
                this.typings[conversationId] = existing;

                this.onChange(conversationId, this.renderTypings(conversationId, type));
            }

            // clear scehduled typing clear
            let existingTimeouts = this.timeouts[conversationId] || {};
            clearTimeout(existingTimeouts[event.typings.user.id]);
            // schedule typing clear
            existingTimeouts[event.typings.user.id] = window.setTimeout(
                () => {
                    existing[event.typings.user.id] = undefined;
                    this.onChange(conversationId, this.renderTypings(conversationId));
                },
                event.typings.cancel ? 0 : 4000);
            this.timeouts[conversationId] = existingTimeouts;
        });
    }

    clearTyping = (conversationId: string, userId: string) => {
        let existing = this.typings[conversationId] || {};
        let existingTimeouts = this.timeouts[conversationId] || {};
        clearTimeout(existingTimeouts[userId]);
        existingTimeouts[userId] = window.setTimeout(
            () => {
                existing[userId] = undefined;
                this.onChange(conversationId, this.renderTypings(conversationId));
            }, 0);
    }

    renderTypings = (conversationId: string, type?: string) => {
        const typings = this.typings[conversationId];

        if (!typings) {
            return;
        }

        let usersTyping: TypingsUser[] = Object.values(typings).filter(Boolean).map(
            u => ({
                userPic: u!.userPic,
                userId: u!.userId,
                typingType: u!.typingType,
                userName: type === 'PrivateConversation'
                    ? u!.userName.split(' ')[0]
                    : u!.userName
            })
        );

        if (usersTyping.length === 0) {
            return;
        }

        const typingTypes = Object.values(typings).filter(Boolean).map(typingUser => {
            const typingType = typingUser!.typingType;
            return typingType;
        });

        // O(n^2) fml
        const allTypingsAreEqual = typingTypes.every(typing => typing === typingTypes[0]);
        const resultingTypingType = allTypingsAreEqual ? typingTypes[0] : TypingType.TEXT;

        return {
            typing: this.pluralizeTypingUsers(usersTyping, TypingType.TEXT),
            users: usersTyping,
            typingType: resultingTypingType
        };
    }

    pluralizeTypingUsers = (users: TypingsUser[], action: TypingType) => {
        const userNames = users.map(user => user!.userName);

        let actionString;

        // future legacy, to be moved to the view layer
        switch (action) {
            case TypingType.TEXT: actionString = 'typing'; break;
            case TypingType.FILE: actionString = 'sending file'; break;
            case TypingType.PHOTO: actionString = 'sending photo'; break;
            case TypingType.STICKER: actionString = 'picking a sticker'; break;
            case TypingType.VIDEO: actionString = 'uploading video'; break;
            default: actionString = 'typing'; break;
        }

        switch (userNames.length) {
            case 1: return `${userNames[0]} is ${actionString}`;
            case 2: return `${userNames[0]} and ${userNames[1]} are ${actionString}`;
            case 3: return `${userNames[0]}, ${userNames[1]} and ${userNames[2]} are ${actionString}`;
            default: return `${userNames[0]}, ${userNames[1]} and ${userNames.length - 2} more are ${actionString}`;
        }
    }

    destroy = () => {
        this.subscription();
    }
}

export class TypingEngine {
    listeners: TypingsListener[] = [];

    typing?: string;
    users?: TypingsUser[];
    typingType?: TypingType;

    onTyping = (data: TypingsData | undefined, conversationId: string) => {
        this.typing = data !== undefined ? data.typing : undefined;
        this.users = data !== undefined ? data.users : undefined;
        this.typingType = data !== undefined ? data.typingType : undefined;

        for (let listener of this.listeners) {
            listener(this.typing, this.users, this.typingType, conversationId);
        }
    }

    subcribe = (listener: TypingsListener) => {
        this.listeners.push(listener);
        return () => {
            let index = this.listeners.indexOf(listener);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this.listeners.splice(index, 1);
            }
        };
    }
}