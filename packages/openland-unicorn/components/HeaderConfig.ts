export interface HeaderConfig {
    title?: string;
}

export function mergeConfigs(configs: HeaderConfig[]): HeaderConfig {
    let title: string | undefined;
    for (let c of configs) {
        if (c.title) {
            title = c.title;
        }
    }
    return { title };
}

export function isConfigEquals(a: HeaderConfig, b: HeaderConfig) {
    if (a.title !== b.title) {
        return false;
    }
    return true;
}