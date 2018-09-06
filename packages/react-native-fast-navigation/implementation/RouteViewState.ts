import { FastHistoryRecord } from '../FastHistoryRecord';
import { Animated, Easing } from 'react-native';

export class RouteViewState {
    readonly record: FastHistoryRecord;
    readonly progressValue: Animated.Value;
    readonly progress: Animated.AnimatedInterpolation;
    readonly searchProgress: Animated.Value;
    searchStarted: boolean = false;
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
        this.searchProgress = new Animated.Value(0);
        this.record.config.watch((c) => {
            if (c.search) {
                if (c.searchActive) {
                    this.startSearch();
                } else {
                    this.stopSearch();
                }
            } else {
                this.stopSearch();
            }
        });
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

    startSearch() {
        if (!this.searchStarted) {
            this.searchStarted = true;
            Animated.timing(this.searchProgress, {
                toValue: 1,
                duration: 340,
                // easing: Easing.inOut(Easing.ease),
                useNativeDriver: true
            }).start();
        }
    }

    stopSearch() {
        if (this.searchStarted) {
            this.searchStarted = false;
            Animated.timing(this.searchProgress, {
                toValue: 0,
                duration: 340,
                // easing: Easing.inOut(Easing.ease),
                useNativeDriver: true
            }).start();
        }
    }

    stopSwipe() {
        this.useProgress.setValue(1);
        this.useSwipe.setValue(0);
        this.useSwipePrev.setValue(0);
    }
}