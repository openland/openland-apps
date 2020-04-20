import * as React from 'react';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { useConfetti } from 'openland-web/pages/onboarding/start.page';
import { debounce } from 'openland-y-utils/timer';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';

export const useEffects = (session?: MediaSessionManager) => {
    let [startConf, resetConf] = useConfetti();

    let hornDebounced = React.useCallback(debounce(() => {
        new Audio('/static/sounds/horn.mp3').play();
        startConf();
        return false;
    }, 10000, false), []);

    React.useEffect(() => {
        let d: (() => void) | undefined;
        if (session) {
            session.dcVM.listen(m => {
                let message: { channel: string, type: string } | undefined;
                try {
                    message = typeof m.data === 'string' ? JSON.parse(m.data) : undefined;
                } catch (e) {
                    console.error('effects cant parse message', m);
                }
                if (message && message.channel === 'effects' && message.type === 'horn') {
                    hornDebounced();
                }

            });
        }
        return d;
    }, [session]);

    useShortcuts([
        {
            keys: ['h'],
            callback: () => {
                hornDebounced();
                session?.sendDcMessage(JSON.stringify({ channel: 'effects', type: 'horn' }));
                return false;
            }
        }
    ], [session]);

    return () => {
        resetConf();
    };
};