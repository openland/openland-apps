import { Animated } from 'react-native';
import { ZHeaderButtonDescription } from './ZHeaderButtonDescription';
import { ZHeaderAppearance, ZHeaderHairline } from './ZHeaderAppearance';

export class ZHeaderConfig {

    readonly title?: string;
    readonly titleView?: any;
    readonly counter: number;
    readonly contentOffset?: Animated.Value;
    readonly buttons: ZHeaderButtonDescription[];
    readonly appearance?: ZHeaderAppearance;
    readonly hairline?: ZHeaderHairline;

    constructor(args: { title?: string, titleView?: any, counter?: number, contentOffset?: Animated.Value, buttons?: ZHeaderButtonDescription[], appearance?: ZHeaderAppearance, hairline?: ZHeaderHairline }) {
        this.counter = args.counter || 0;
        this.buttons = args.buttons || [];
        this.title = args.title;
        this.titleView = args.titleView;
        this.contentOffset = args.contentOffset;
        this.appearance = args.appearance;
        this.hairline = args.hairline;
    }
}

export function mergeConfigs(configs: ZHeaderConfig[]) {
    let title: string | undefined;
    let buttons: ZHeaderButtonDescription[] = [];
    let contentOffset: Animated.Value | undefined;
    let appearance: ZHeaderAppearance | undefined;
    let titleView: any | undefined;
    let hairline: ZHeaderHairline | undefined;
    for (let c of configs) {
        if (c.title) {
            title = c.title;
        }
        if (c.titleView) {
            titleView = c.titleView;
        }
        if (c.contentOffset) {
            contentOffset = c.contentOffset;
        }
        if (c.appearance) {
            appearance = c.appearance;
        }
        if (c.hairline) {
            hairline = c.hairline;
        }
        buttons.push(...c.buttons);
    }
    return new ZHeaderConfig({ title, buttons, contentOffset, appearance, titleView, hairline });
}

export function isConfigEquals(a: ZHeaderConfig, b: ZHeaderConfig) {
    if (a.title !== b.title) {
        return false;
    }
    if (a.buttons.length !== b.buttons.length) {
        return false;
    }
    if (a.contentOffset !== b.contentOffset) {
        return false;
    }
    if (a.appearance !== b.appearance) {
        return false;
    }
    if (a.titleView !== b.titleView) {
        return false;
    }
    if (a.hairline !== b.hairline) {
        return false;
    }
    if (a.buttons.length > 0) {
        let a2 = new Set(a.buttons.map((v) => v.id));
        let b2 = new Set(b.buttons.map((v) => v.id));
        for (let a3 of a2) {
            if (!b2.has(a3)) {
                return false;
            }
        }
        for (let b3 of b2) {
            if (!a2.has(b3)) {
                return false;
            }
        }
    }
    return true;
}