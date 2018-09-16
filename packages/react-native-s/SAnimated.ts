import { SAnimatedView } from './SAnimatedView';
import { NativeModules, NativeEventEmitter, Platform, DeviceEventEmitter } from 'react-native';
import UUID from 'uuid/v4';
import { SAnimatedProperty } from './SAnimatedProperty';

const RNSAnimatedViewManager = NativeModules.RNSAnimatedViewManager as {
    animate: (config: string) => void,
    hasPending: (callback: (v: boolean) => void) => boolean
};
const RNSAnimatedEventEmitter = new NativeEventEmitter(NativeModules.RNSAnimatedEventEmitter);

export type SAnimatedPropertyName = 'translateX' | 'translateY' | 'opacity' | 'ios-width';
export type SAnimatedPropertyAnimator = (name: string, property: SAnimatedPropertyName, from: number, to: number) => void;

//
// Timing
// 

export type SAnimatedEasing = 'linear' | 'material' | { bezier: number[] };

export interface SAnimatedTimingConfig {
    property: SAnimatedPropertyName;
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
    property: SAnimatedPropertyName;
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
    private _propertyAnimator?: SAnimatedPropertyAnimator;
    private _dirtyProperties = new Map<string, Map<SAnimatedPropertyName, { from: number, to: number }>>();

    constructor() {
        if (Platform.OS === 'ios') {
            RNSAnimatedEventEmitter.addListener('onAnimationCompleted', (args: { key: string }) => {
                let clb = this._callbacks.get(args.key);
                if (clb) {
                    this._callbacks.delete(args.key);
                    clb();
                }
            });
        } else if (Platform.OS === 'android') {
            DeviceEventEmitter.addListener('react_s_animation_completed', (args: { key: string }) => {
                let clb = this._callbacks.get(args.key);
                if (clb) {
                    this._callbacks.delete(args.key);
                    clb();
                }
            });
        }
    }

    get isInTransaction() {
        return this._inTransaction;
    }

    beginTransaction = () => {
        if (this._inTransaction) {
            return;
        }
        this._inTransaction = true;
        this._transactionDuration = 0.25;
    }

    onPropertyChanged = (property: SAnimatedProperty, oldValue: number) => {
        if (this._inTransaction) {
            if (!this._dirtyProperties.has(property.name)) {
                this._dirtyProperties.set(property.name, new Map());
            }
            let m = this._dirtyProperties.get(property.name)!;
            if (m.has(property.property)) {
                m.get(property.property)!.to = property.value;
            } else {
                m.set(property.property, { from: oldValue, to: property.value });
            }
        } else {
            this.setValue(property.name, property.property, property.value);
        }
    }

    setDuration = (duration: number) => {
        if (!this._inTransaction) {
            console.warn('You can\'t set global duration outside transaction');
            return;
        }
        this._transactionDuration = duration;
    }

    setPropertyAnimator = (animator: SAnimatedPropertyAnimator) => {
        if (!this._inTransaction) {
            console.warn('You can\'t set property animator duration outside transaction');
            return;
        }
        this._propertyAnimator = animator;
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

    setValue = (name: string, property: SAnimatedPropertyName, value: number) => {
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

        if (this._dirtyProperties.size !== 0) {
            for (let p of this._dirtyProperties.keys()) {
                let pmap = this._dirtyProperties.get(p)!;
                for (let p2 of pmap.keys()) {
                    let p3 = pmap.get(p2)!;
                    if (this._propertyAnimator) {
                        this._propertyAnimator(p, p2, p3.from, p3.to);
                    } else {
                        this.setValue(p, p2, p3.to);
                    }
                }
            }
            this._dirtyProperties.clear();
        }

        if (this._pendingAnimations.length > 0 || this._pendingSetters.length > 0) {
            this._postAnimations(this._transactionDuration, this._pendingAnimations, this._pendingSetters, callback);
            this._pendingAnimations = [];
        } else {
            if (callback) {
                callback();
            }
        }
        this._propertyAnimator = undefined;
    }

    private _postAnimations(duration: number, animations: any[], valueSetters: any[], callback?: () => void) {
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