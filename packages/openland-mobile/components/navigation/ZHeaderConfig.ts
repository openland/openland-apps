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
    readonly search?: boolean;
    readonly searchActive?: boolean;
    readonly searchPress?: () => void;
    readonly searchClosed?: () => void;

    constructor(args: { title?: string, titleView?: any, counter?: number, contentOffset?: Animated.Value, buttons?: ZHeaderButtonDescription[], appearance?: ZHeaderAppearance, hairline?: ZHeaderHairline, search?: boolean, searchActive?: boolean, searchPress?: () => void, searchClosed?: () => void }) {
        this.counter = args.counter || 0;
        this.buttons = args.buttons || [];
        this.title = args.title;
        this.titleView = args.titleView;
        this.contentOffset = args.contentOffset;
        this.appearance = args.appearance;
        this.hairline = args.hairline;
        this.search = args.search;
        this.searchActive = args.searchActive;
        this.searchPress = args.searchPress;
        this.searchClosed = args.searchClosed;
    }
}

export function mergeConfigs(configs: ZHeaderConfig[]) {
    let title: string | undefined;
    let buttons: ZHeaderButtonDescription[] = [];
    let contentOffset: Animated.Value | undefined;
    let appearance: ZHeaderAppearance | undefined;
    let titleView: any | undefined;
    let hairline: ZHeaderHairline | undefined;
    let search: boolean | undefined;
    let searchActive: boolean | undefined;
    let searchPress: (() => void) | undefined;
    let searchClosed: (() => void) | undefined;
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
        if (c.search !== undefined) {
            search = c.search;
        }
        if (c.searchActive !== undefined) {
            searchActive = c.searchActive;
        }
        if (c.searchPress !== undefined) {
            searchPress = c.searchPress;
        }
        if (c.searchClosed !== undefined) {
            searchClosed = c.searchClosed;
        }
        buttons.push(...c.buttons);
    }
    return new ZHeaderConfig({ title, buttons, contentOffset, appearance, titleView, hairline, search, searchActive, searchClosed, searchPress });
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
    if (a.search !== b.search) {
        return false;
    }
    if (a.searchActive !== b.searchActive) {
        return false;
    }
    if (a.searchPress !== b.searchPress) {
        return false;
    }
    if (a.searchClosed !== b.searchClosed) {
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