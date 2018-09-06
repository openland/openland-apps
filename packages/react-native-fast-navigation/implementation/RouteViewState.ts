import { FastHistoryRecord } from '../FastHistoryRecord';
import { Animated } from 'react-native';

export class RouteViewState {
    readonly record: FastHistoryRecord;
    readonly progressValue: Animated.Value;
    readonly progress: Animated.AnimatedInterpolation;
    private readonly useProgress: Animated.Value = new Animated.Value(1);
    private readonly useSwipe: Animated.Value = new Animated.Value(0);
    private readonly useSwipePrev: Animated.Value = new Animated.Value(0);

    constructor(record: FastHistoryRecord, progress: Animated.Value, swipe: Animated.AnimatedInterpolation, swipePrev: Animated.AnimatedInterpolation) {
        this.record = record;
        this.progressValue = progress;
        this.progress = Animated.add(
            Animated.add(
                Animated.multiply(this.useProgress, progress),
                Animated.multiply(this.useSwipe, swipe)
            ),
            Animated.multiply(this.useSwipePrev, swipePrev)
        );
    }

    startSwipe() {
        this.useProgress.setValue(0);
        this.useSwipe.setValue(1);
        this.useSwipePrev.setValue(0);
    }

    startSwipePrev() {
        this.useProgress.setValue(0);
        this.useSwipe.setValue(0);
        this.useSwipePrev.setValue(1);
    }

    stopSwipe() {
        this.useProgress.setValue(1);
        this.useSwipe.setValue(0);
        this.useSwipePrev.setValue(0);
    }
}