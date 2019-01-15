import { SHeaderAppearance, SHeaderHairline } from './SHeader';

export interface SNavigationViewStyle {
    backgroundColor: string;
    isOpaque: boolean;
    accentColor: string;
    textColor: string;
}

export class SearchContext {
    constructor(onChanged: () => void) {
        this.onChanged = onChanged;
    }
    value: string = '';
    readonly onChanged: () => void;
    headerOnChanged?: () => void;
}

export interface HeaderButtonDescription {
    id: string;
    render: (style: SNavigationViewStyle) => React.ReactElement<{}>;
}

export interface HeaderConfig {
    headerHidden?: boolean;
    title?: string;
    titleView?: any;
    counter?: number;

    buttons?: HeaderButtonDescription[];
    appearance?: SHeaderAppearance;
    hairline?: SHeaderHairline;

    searchContext?: SearchContext;
    search?: boolean;
    searchActive?: boolean;
    searchChanged?: (text: string) => void;
    searchPress?: () => void;
    searchClosed?: () => void;
    searchClosingCompleted?: () => void;
}

export function mergeConfigs(configs: HeaderConfig[]): HeaderConfig {
    let title: string | undefined;
    let buttons: HeaderButtonDescription[] = [];
    let appearance: SHeaderAppearance | undefined;
    let titleView: any | undefined;
    let hairline: SHeaderHairline | undefined;
    let headerHidden: boolean | undefined;
    let search: boolean | undefined;
    let searchActive: boolean | undefined;
    let searchChanged: ((text: string) => void) | undefined;
    let searchPress: (() => void) | undefined;
    let searchClosed: (() => void) | undefined;
    let searchClosingCompleted: (() => void) | undefined;
    let searchContext: SearchContext | undefined;
    for (let c of configs) {
        if (c.title) {
            title = c.title;
        }
        if (c.titleView) {
            titleView = c.titleView;
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
        if (c.buttons) {
            buttons.push(...c.buttons);
        }
        if (c.searchClosingCompleted) {
            searchClosingCompleted = c.searchClosingCompleted;
        }
        if (c.searchChanged) {
            searchChanged = c.searchChanged;
        }
        if (c.searchContext) {
            searchContext = c.searchContext;
        }
    }
    return {
        title,
        buttons,

        appearance,
        titleView,
        hairline,
        search,
        searchActive,
        searchClosed,
        searchPress,
        searchClosingCompleted,
        searchChanged,
        searchContext,
        headerHidden,
    };
}

export function isConfigEquals(a: HeaderConfig, b: HeaderConfig) {
    if (a.searchContext !== b.searchContext) {
        return false;
    }
    if (a.searchClosingCompleted !== b.searchClosingCompleted) {
        return false;
    }
    if (a.searchChanged !== b.searchChanged) {
        return false;
    }
    if (a.title !== b.title) {
        return false;
    }
    if (!!a.buttons !== !!b.buttons) {
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

    if (a.buttons && a.buttons.length > 0) {
        let a2 = new Set(a.buttons.map(v => v.id));
        let b2 = new Set(b.buttons!!.map(v => v.id));
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
