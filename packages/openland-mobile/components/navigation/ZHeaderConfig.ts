import { Animated } from 'react-native';

export class ZHeaderConfig {

    readonly title?: string;
    readonly titleView?: any;
    readonly counter: number;
    readonly contentOffset?: Animated.Value;

    constructor(args: { title?: string, titleView?: any, counter?: number, contentOffset?: Animated.Value }) {
        this.counter = args.counter || 0;
        this.title = args.title;
        this.titleView = args.titleView;
    }
}