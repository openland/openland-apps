import { CSSProperties } from 'glamorous';

export class StyleMap {
    private styles: { [key: string]: CSSProperties };
    constructor(styles: { [key: string]: CSSProperties }) {
        this.styles = styles;
    }
    resolve = (key?: string) => {
        let k = key || 'default';
        return (this.styles[k] || this.styles.default || {}) as CSSProperties;
    }
}

export function styleResolver(styles: { [key: string]: CSSProperties }) {
    return new StyleMap(styles).resolve;
}