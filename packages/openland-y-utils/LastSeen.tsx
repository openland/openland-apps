import * as React from 'react';
import DateTimeFormatter from 'openland-y-runtime/DateTimeFormatter';

const { formatLastSeen, formatLastSeenShort } = DateTimeFormatter;

export interface LastSeenUser {
    id: string;
    online: boolean;
    lastSeen: string | null;
    isBot?: boolean;
}

class LastSeenManagerImpl {
    private subscriptions: { currentValue: string, lastSeen: string, cb: (value: string) => void, format: (l: string) => string }[] = [];
    private loop: any;

    subscribe(lastSeen: string, cb: (value: string) => void, format: (l: string) => string) {
        this.subscriptions.push({ lastSeen, cb, currentValue: format(lastSeen), format });
        this.tryStart();
        return () => {
            let index = this.subscriptions.findIndex(s => s.cb === cb);
            if (index === -1) {
                throw new Error('Double unsubscribe');
            }
            this.subscriptions.splice(index, 1);
        };
    }

    private tryStart() {
        if (this.loop) {
            return;
        }

        this.loop = setInterval(() => {
            if (this.subscriptions.length === 0) {
                clearInterval(this.loop);
                this.loop = null;
            }

            for (let sub of this.subscriptions) {
                let formatted = sub.format(sub.lastSeen);
                if (sub.currentValue !== formatted) {
                    sub.cb(formatted);
                    sub.currentValue = formatted;
                }
            }
        }, 5000);
    }
}

const LastSeenManager = new LastSeenManagerImpl();

export const useLastSeen = (user: LastSeenUser | null) => {
    const isBot = user && user.isBot;
    const isOnline = user && user.online;
    const accentColor = isBot || isOnline;

    const [lastSeen, setLastSeen] = React.useState<string | null>(null);

    React.useEffect(() => {
        let unsub: (() => void) | null = null;
        if (isBot && lastSeen !== 'bot') {
            return setLastSeen('bot');
        } else if (!isBot) {
            if (isOnline && lastSeen !== 'online') {
                return setLastSeen('online');
            }
            if (!lastSeen && user && user.lastSeen && user.lastSeen !== 'online') {
                setLastSeen(formatLastSeen(user.lastSeen));
            }
            if (!isOnline && user && user.lastSeen) {
                setLastSeen(formatLastSeen(user.lastSeen));
                unsub = LastSeenManager.subscribe(user!.lastSeen, newLastSeen => setLastSeen(newLastSeen), formatLastSeen);
            }
        }
        return () => {
            if (unsub) {
                unsub();
            }
        };
    }, [accentColor]);

    return [lastSeen, accentColor];
};

export const useLastSeenShort = (user: LastSeenUser | null) => {
    const isBot = user && user.isBot;
    const isOnline = user && user.online;
    const accentColor = isBot || isOnline;

    const [lastSeen, setLastSeen] = React.useState<string | null>(null);

    React.useEffect(() => {
        let unsub: (() => void) | null = null;
        if (isBot && lastSeen !== 'bot') {
            return setLastSeen(null);
        } else if (!isBot) {
            if (isOnline && lastSeen !== 'online') {
                return setLastSeen(null);
            }
            if (!lastSeen && user && user.lastSeen && user.lastSeen !== 'online') {
                setLastSeen(formatLastSeenShort(user.lastSeen));
            }
            if (!isOnline && user && user.lastSeen) {
                setLastSeen(formatLastSeenShort(user.lastSeen));
                unsub = LastSeenManager.subscribe(user!.lastSeen, newLastSeen => setLastSeen(newLastSeen), formatLastSeenShort);
            }
        }
        return () => {
            if (unsub) {
                unsub();
            }
        };
    }, [accentColor]);

    return [lastSeen];
};
