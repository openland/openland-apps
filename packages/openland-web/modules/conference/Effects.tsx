import * as React from 'react';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { useConfetti } from 'openland-web/pages/onboarding/start.page';
import { debounce } from 'openland-y-utils/timer';
import { GlobalEventBus } from 'openland-engines/GlobalEventBus';
import { GQLClientContext } from 'openland-api/useClient';

export const useHorn = () => {
    let [startConf, resetConf] = useConfetti(500);

    let hornDebounced = React.useCallback(debounce(() => {
        new Audio('/static/sounds/horn.mp3').play();
        startConf();
        return false;
    }, 10000, false), []);

    React.useEffect(() => resetConf, []);

    return hornDebounced;
};

export const useEffects = (conversationId: string) => {
    let horn = useHorn();
    let client = React.useContext(GQLClientContext);
    React.useEffect(() => {
        let bus = new GlobalEventBus(`call_effects_${conversationId}`, client!);
        let d1 = bus.subscribe(m => {
            if (m === 'horn') {
                horn();
            }
        });
        return () => {
            d1();
            bus.dispose();
        };
    }, []);

    useShortcuts([{
        keys: ['Control', 'h'],
        callback: () => {
            client?.mutateGlobalEventBusPublish({ topic: `call_effects_${conversationId}`, message: 'horn' });
            return false;
        }
    }], []);

};