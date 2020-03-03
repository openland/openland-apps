export interface HeaderConfig {
    title?: string;
    documentTitle?: string;
    titleView?: any;
    appearance?: 'normal' | 'wide' | 'fullwidth';
    backgroundColor?: string;
    maxWidth?: number;
}

export function mergeConfigs(configs: HeaderConfig[]): HeaderConfig {
    let title: string | undefined;
    let documentTitle: string | undefined;
    let appearance: 'normal' | 'wide' | 'fullwidth' | undefined;
    let titleView: any | undefined;
    let backgroundColor: string | undefined;
    let maxWidth: number | undefined;
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
        if (c.backgroundColor) {
            backgroundColor = c.backgroundColor;
        }
        if (c.maxWidth) {
            maxWidth = c.maxWidth;
        }
    }
    return { title, documentTitle, appearance, titleView, backgroundColor, maxWidth };
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
    if (a.backgroundColor !== b.backgroundColor) {
        return false;
    }
    if (a.maxWidth !== b.maxWidth) {
        return false;
    }
    return true;
}
