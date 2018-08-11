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

export function mergeConfigs(configs: ZHeaderConfig[]) {
    let title: string | undefined;
    for (let c of configs) {
        if (c.title) {
            title = c.title;
        }
    }
    return new ZHeaderConfig({ title });
}

export function isConfigEquals(a: ZHeaderConfig, b: ZHeaderConfig) {
    if (a.title !== b.title) {
        return false;
    }
    return true;
}