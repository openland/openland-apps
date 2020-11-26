import * as React from 'react';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { debounce } from 'openland-y-utils/timer';
import { GlobalEventBus } from 'openland-engines/GlobalEventBus';
import { GQLClientContext } from 'openland-api/useClient';
import confetti from 'canvas-confetti';

export const useConfetti = (confettiDuration: number = 2000) => {
    let end = Date.now() + confettiDuration;
    const colors = ['#CC99FF', '#A9D1F7', '#B4F0A7', '#FFFFBF', '#FFDFBE', '#FFB1B0'];
    let fireworksTimeout: any;
    let snowTimeout: any;
    const reset = () => {
        clearTimeout(fireworksTimeout);
        clearTimeout(snowTimeout);
    };

    const snow = () => {
        colors.forEach(color => {
            confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: 1000,
                origin: {
                    x: Math.random(),
                    y: -0.1
                },
                colors: [color],
            });
        });

        if (Date.now() < end + confettiDuration * 2) {
            snowTimeout = setTimeout(() => requestAnimationFrame(snow), 100);
        }
    };

    const fireworks = () => {
        confetti({
            particleCount: colors.length,
            angle: 60,
            spread: 55,
            origin: {
                x: 0
            },
            ticks: 1000,
            colors,
            zIndex: 1000,
            decay: 0.92,
        });
        confetti({
            particleCount: colors.length,
            angle: 120,
            spread: 55,
            origin: {
                x: 1
            },
            ticks: 1000,
            colors,
            zIndex: 1000,
            decay: 0.92,
        });
        if (Date.now() < end) {
            fireworksTimeout = setTimeout(() => requestAnimationFrame(fireworks), 100);
        }
    };

    const start = () => {
        end = Date.now() + confettiDuration;
        fireworks();

        snowTimeout = setTimeout(() => snow(), confettiDuration);
    };

    return [start, reset];
};

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