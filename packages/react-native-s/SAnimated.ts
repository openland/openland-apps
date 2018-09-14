import { SAnimatedView } from './SAnimatedView';
import { NativeModules } from 'react-native';

const RNFastAnimatedViewManager = NativeModules.RNSAnimatedViewManager as { animate: (config: string) => void };

function postAnimations(duration: number, animations: any[], valueSetters: any[]) {
    RNFastAnimatedViewManager.animate(JSON.stringify({
        duration,
        animations,
        valueSetters
    }));
}

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
}

class SAnimatedImpl {
    View = SAnimatedView;

    private _inTransaction = false;
    private _pendingAnimations: any[] = [];
    private _pendingSetters: any[] = [];
    private _transactionDuration = 0.25;

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
            postAnimations(this._transactionDuration, [anim], []);
        }
    }

    spring = (name: string, animation: SAnimatedSpringConfig) => {
        let anim = {
            view: name,
            type: 'spring',
            prop: animation.property,
            from: animation.from,
            to: animation.to,
            optional: animation.optional
        };
        if (this._inTransaction) {
            this._pendingAnimations.push(anim);
        } else {
            postAnimations(this._transactionDuration, [anim], []);
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
            postAnimations(this._transactionDuration, [], [v]);
        }
    }

    commitTransaction = () => {
        if (!this._inTransaction) {
            return;
        }
        this._inTransaction = false;
        this._transactionDuration = 0.25;

        if (this._pendingAnimations.length > 0) {
            postAnimations(this._transactionDuration, this._pendingAnimations, this._pendingSetters);
            this._pendingAnimations = [];
        }
    }
}

export const SAnimated = new SAnimatedImpl();