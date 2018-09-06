import { Animated } from 'react-native';
import { FastHeaderAppearance, FastHeaderHairline } from './FastHeaderAppearance';
import { FastScrollValue } from './FastScrollValue';
import { FastHeaderButtonDescription } from './FastHeaderButton';

export class FastHeaderConfig {

    readonly title?: string;
    readonly titleView?: any;
    readonly counter: number;
    readonly contentOffset?: FastScrollValue;
    readonly buttons: FastHeaderButtonDescription[];
    readonly appearance?: FastHeaderAppearance;
    readonly hairline?: FastHeaderHairline;
    readonly headerHidden?: boolean;
    readonly search?: boolean;
    readonly searchActive?: boolean;
    readonly searchPress?: () => void;
    readonly searchClosed?: () => void;

    constructor(args: { title?: string, titleView?: any, counter?: number, contentOffset?: FastScrollValue, buttons?: FastHeaderButtonDescription[], appearance?: FastHeaderAppearance, hairline?: FastHeaderHairline, search?: boolean, searchActive?: boolean, searchPress?: () => void, searchClosed?: () => void, headerHidden?: boolean }) {
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
        this.headerHidden = args.headerHidden;
    }
}

export function mergeConfigs(configs: FastHeaderConfig[]) {
    let title: string | undefined;
    let buttons: FastHeaderButtonDescription[] = [];
    let contentOffset: FastScrollValue | undefined;
    let appearance: FastHeaderAppearance | undefined;
    let titleView: any | undefined;
    let hairline: FastHeaderHairline | undefined;
    let headerHidden: boolean | undefined;
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
        if (c.headerHidden !== undefined) {
            headerHidden = c.headerHidden;
        }
        buttons.push(...c.buttons);
    }
    return new FastHeaderConfig({ title, buttons, contentOffset, appearance, titleView, hairline, search, searchActive, searchClosed, searchPress });
}

export function isConfigEquals(a: FastHeaderConfig, b: FastHeaderConfig) {
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
    if (a.headerHidden !== b.headerHidden) {
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