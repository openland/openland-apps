import { Animated } from 'react-native';
import { Watcher } from 'openland-y-utils/Watcher';

export class FastAnimatedValue {
    readonly animated: Animated.Value;
    readonly value: Watcher<number>;

    constructor(initial: number) {
        this.animated = new Animated.Value(initial);
        this.value = new Watcher<number>();
        this.value.setState(initial);
        this.animated.addListener((state) => {
            this.value.setState(state.value);
        });
    }
}