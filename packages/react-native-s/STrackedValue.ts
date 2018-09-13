import { Animated } from 'react-native';

export class STrackedValue {
    readonly offset = new Animated.Value(0);
    readonly event = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.offset } } }],
        { useNativeDriver: true }
    );
    private _offsetValue = 0;
    public get offsetValue() {
        return this._offsetValue;
    }

    constructor() {
        this.offset.addListener((v) => {
            this._offsetValue = v.value;
        });
    }
}