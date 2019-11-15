import * as React from 'react';
import { formatLastSeen } from 'openland-y-utils/formatTime';

interface User {
    id: string;
    online: boolean;
    lastSeen: string | null;
    isBot: boolean;
}

class LastSeenManagerImpl {
    private subscriptions: { currentValue: string, lastSeen: string, cb: (str: string) => void }[] = [];
    private loop: any;

    tryStart() {
        if (this.loop) {
            return;
        }

        this.loop = setInterval(() => {
            if (this.subscriptions.length === 0) {
                clearInterval(this.loop);
                this.loop = null;
            }

            for (let sub of this.subscriptions) {
                let formatted = formatLastSeen(sub.lastSeen);
                if (sub.currentValue !== formatted) {
                    sub.cb(formatLastSeen(sub.lastSeen));
                    sub.currentValue = formatted;
                }
            }
        }, 5000);
    }

    subscribe(lastSeen: string, cb: (str: string) => void) {
        this.subscriptions.push({lastSeen, cb, currentValue: formatLastSeen(lastSeen)});
        this.tryStart();
        return () => {
            let index = this.subscriptions.findIndex(s => s.cb === cb);
            if (index === -1) {
                throw new Error('Double unsubscribe');
            }
            this.subscriptions.splice(index, 1);
        };
    }
}

const LastSeenManager = new LastSeenManagerImpl();

export const useLastSeen = (user: User | null) => {
    const isBot = user && user.isBot;
    const isOnline = user && user.online;
    const accentColor = isBot || isOnline;

    const [lastSeen, setLastSeen] = React.useState<string | null>(null);

    React.useEffect(() => {
        let unsub: (() => void) | null = null;
        let timer: any = null;
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
                unsub = LastSeenManager.subscribe(user!.lastSeen, newLastSeen => setLastSeen(newLastSeen));
            }
        }
        return () => {
            clearInterval(timer);
            if (unsub) {
                unsub();
            }
        };
    }, [accentColor]);

    return [lastSeen, accentColor];
};
