import * as React from 'react';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { useConfetti } from 'openland-web/pages/onboarding/start.page';
import { debounce } from 'openland-y-utils/timer';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';

export const useHorn = () => {
    let [startConf, resetConf] = useConfetti(500);

    let hornDebounced = React.useCallback(debounce(() => {
        new Audio('/static/sounds/horn.mp3').play();
        startConf();
        return false;
    }, 10000, false), []);

    return { horn: hornDebounced, resetHorn: resetConf };
};

export const useShowEffects = (session: MediaSessionManager | null) => {
    let { horn, resetHorn } = useHorn();

    React.useEffect(() => {
        if (session) {
            // session.dcVM.listen(m => {
            //     let message: { channel: string, type: string } | undefined;
            //     try {
            //         message = m.dataParsed || (typeof m.data === 'string' ? JSON.parse(m.data) : undefined);
            //     } catch (e) {
            //         console.error('effects cant parse message', m);
            //     }
            //     if (message && message.channel === 'effects' && message.type === 'horn') {
            //         horn();
            //     }

            // });
        }
        return resetHorn;
    }, [session]);

};

export const useTriggerEvents = (session: MediaSessionManager | null) => {
    let { horn, resetHorn } = useHorn();
    useShortcuts([
        {
            keys: ['Control', 'h'],
            callback: () => {
                horn();
                // session?.sendDcMessage({ channel: 'effects', type: 'horn' });
                return false;
            }
        }
    ], [session]);
    return resetHorn;
};