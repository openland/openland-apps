import * as React from 'react';
import { formatLastSeen } from 'openland-y-utils/formatTime';

interface User {
    id: string;
    online: boolean;
    lastSeen: string | null;
    isBot: boolean;
}

export const useLastSeen = (user: User | null, nonRenewable?: boolean) => {
    const isBot = user && user.isBot;
    const isOnline = user && user.online;
    const accentColor = isBot || isOnline;

    const [lastSeen, setLastSeen] = React.useState<string | null>(null);

    React.useEffect(() => {
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
            if (!nonRenewable && !isOnline) {
                timer = setInterval(() => {
                    if (user && user.lastSeen) {
                        const newLastSeen = formatLastSeen(user.lastSeen);
                        if (newLastSeen !== lastSeen) {
                            setLastSeen(newLastSeen);
                        }
                    }
                }, 5000);
            }
        }
        return () => clearInterval(timer);
    }, [accentColor]);

    return [lastSeen, accentColor];
};
