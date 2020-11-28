export interface HeaderConfig {
    title?: string;
    documentTitle?: string;
    titleView?: any;
    appearance?: 'normal' | 'wide' | 'fullwidth';
    forceShowBack?: boolean;
    forceHideBack?: boolean;
}

export function mergeConfigs(configs: HeaderConfig[]): HeaderConfig {
    let title: string | undefined;
    let documentTitle: string | undefined;
    let appearance: 'normal' | 'wide' | 'fullwidth' | undefined;
    let titleView: any | undefined;
    let forceShowBack: boolean | undefined;
    let forceHideBack: boolean | undefined;
    for (let c of configs) {
        if (c.title) {
            title = c.title;
        }
        if (c.documentTitle) {
            documentTitle = c.documentTitle;
        }
        if (c.titleView) {
            titleView = c.titleView;
        }
        if (c.appearance) {
            appearance = c.appearance;
        }
        if (c.forceShowBack) {
            forceShowBack = c.forceShowBack;
        }
        if (c.forceHideBack) {
            forceHideBack = c.forceHideBack;
        }
    }
    return { title, documentTitle, appearance, titleView, forceShowBack, forceHideBack };
}

export function isConfigEquals(a: HeaderConfig, b: HeaderConfig) {
    if (a.title !== b.title) {
        return false;
    }
    if (a.documentTitle !== b.documentTitle) {
        return false;
    }
    if (a.appearance !== b.appearance) {
        return false;
    }
    if (a.titleView !== b.titleView) {
        return false;
    }
    if (a.forceShowBack !== b.forceShowBack) {
        return false;
    }
    if (a.forceHideBack !== b.forceHideBack) {
        return false;
    }
    return true;
}
