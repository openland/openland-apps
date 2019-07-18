export interface HeaderConfig {
    title?: string;
    appearance?: 'normal' | 'wide';
}

export function mergeConfigs(configs: HeaderConfig[]): HeaderConfig {
    let title: string | undefined;
    let appearance: 'normal' | 'wide' | undefined;
    for (let c of configs) {
        if (c.title) {
            title = c.title;
        }
        if (c.appearance) {
            appearance = c.appearance;
        }
    }
    return { title, appearance };
}

export function isConfigEquals(a: HeaderConfig, b: HeaderConfig) {
    if (a.title !== b.title) {
        return false;
    }
    if (a.appearance !== b.appearance) {
        return false;
    }
    return true;
}