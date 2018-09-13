import { FastHistoryRecord } from '../FastHistoryRecord';
import { Animated } from 'react-native';

export class RouteViewState {
    readonly record: FastHistoryRecord;
    readonly searchProgress: Animated.Value;
    searchStarted: boolean = false;

    constructor(record: FastHistoryRecord) {
        this.record = record;
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

    startSearch() {
        if (!this.searchStarted) {
            this.searchStarted = true;
            Animated.spring(this.searchProgress, {
                toValue: 1,
                damping: 500,
                useNativeDriver: true
            }).start();
        }
    }

    stopSearch() {
        if (this.searchStarted) {
            this.searchStarted = false;
            Animated.spring(this.searchProgress, {
                toValue: 0,
                damping: 500,
                useNativeDriver: true
            }).start();
        }
    }

    // stopSwipe() {
    //     this.useProgress.setValue(1);
    //     this.useSwipe.setValue(0);
    //     this.useSwipePrev.setValue(0);
    // }
}