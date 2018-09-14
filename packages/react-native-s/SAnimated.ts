import { SAnimatedView } from './SAnimatedView';
import { NativeModules, NativeEventEmitter } from 'react-native';
import UUID from 'uuid/v4';

const RNSAnimatedViewManager = NativeModules.RNSAnimatedViewManager as {
    animate: (config: string) => void,
};
const RNSAnimatedEventEmitter = new NativeEventEmitter(NativeModules.RNSAnimatedEventEmitter);

export type SAnimatedProperty = 'translateX' | 'translateY' | 'opacity';

//
// Timing
// 

export type SAnimatedEasing = 'linear' | 'material' | { bezier: number[] };

export interface SAnimatedTimingConfig {
    property: SAnimatedProperty;
    from: number;
    to: number;
    duration?: number;
    delay?: number;
    optional?: boolean;
    easing?: SAnimatedEasing;
}

function resolveEasing(easing?: SAnimatedEasing) {
    if (!easing || easing === 'linear') {
        return {
            type: 'linear'
        };
    }
    if (easing === 'material') {
        return {
            type: 'material'
        };
    } else {
        return {
            type: 'bezier',
            bezier: easing.bezier
        };
    }

    return {
        type: 'linear'
    };
}

export interface SAnimatedSpringConfig {
    property: SAnimatedProperty;
    from: number;
    to: number;
    duration?: number;
    delay?: number;
    optional?: boolean;
    velocity?: number;
}

class SAnimatedImpl {
    View = SAnimatedView;

    private _inTransaction = false;
    private _pendingAnimations: any[] = [];
    private _pendingSetters: any[] = [];
    private _transactionDuration = 0.25;
    private _callbacks = new Map<string, () => void>();

    constructor() {
        RNSAnimatedEventEmitter.addListener('onAnimationCompleted', (args: { key: string }) => {
            let clb = this._callbacks.get(args.key);
            if (clb) {
                this._callbacks.delete(args.key);
                clb();
            }
        });
    }

    beginTransaction = () => {
        if (this._inTransaction) {
            return;
        }
        this._inTransaction = true;
        this._transactionDuration = 0.25;
    }

    setDuration = (duration: number) => {
        if (!this._inTransaction) {
            console.warn('You can\'t set global duration outside transaction');
            return;
        }
        this._transactionDuration = duration;
    }

    timing = (name: string, animation: SAnimatedTimingConfig) => {
        let anim = {
            view: name,
            type: 'timing',
            prop: animation.property,
            from: animation.from,
            to: animation.to,
            optional: animation.optional,
            duration: animation.duration,
            delay: animation.delay,
            easing: resolveEasing(animation.easing)
        };
        if (this._inTransaction) {
            this._pendingAnimations.push(anim);
        } else {
            this._postAnimations(this._transactionDuration, [anim], []);
        }
    }

    spring = (name: string, animation: SAnimatedSpringConfig) => {
        let anim = {
            view: name,
            type: 'spring',
            prop: animation.property,
            from: animation.from,
            to: animation.to,
            optional: animation.optional,
            velocity: animation.velocity
        };
        if (this._inTransaction) {
            this._pendingAnimations.push(anim);
        } else {
            this._postAnimations(this._transactionDuration, [anim], []);
        }
    }

    setValue = (name: string, property: SAnimatedProperty, value: number) => {
        let v = {
            view: name,
            prop: property,
            to: value
        };
        if (this._inTransaction) {
            this._pendingSetters.push(v);
        } else {
            this._postAnimations(this._transactionDuration, [], [v]);
        }
    }

    commitTransaction = (callback?: () => void) => {
        if (!this._inTransaction) {
            return;
        }
        this._inTransaction = false;
        this._transactionDuration = 0.25;

        if (this._pendingAnimations.length > 0) {
            this._postAnimations(this._transactionDuration, this._pendingAnimations, this._pendingSetters, callback);
            this._pendingAnimations = [];
        }
    }

    _postAnimations(duration: number, animations: any[], valueSetters: any[], callback?: () => void) {
        let transactionKey: string | undefined = undefined;
        if (callback) {
            transactionKey = UUID();
            this._callbacks.set(transactionKey, callback);
        }
        RNSAnimatedViewManager.animate(
            JSON.stringify({
                duration,
                animations,
                valueSetters,
                transactionKey
            }));
    }
}

export const SAnimated = new SAnimatedImpl();