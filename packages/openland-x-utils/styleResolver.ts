import { CSSProperties } from 'glamorous';

export class StyleMap {
    private styles: { [key: string]: CSSProperties };
    constructor(styles: { [key: string]: CSSProperties }) {
        this.styles = styles;
    }
    resolve = (key?: string, condition?: boolean) => {
        if (condition === false) {
            return {} as CSSProperties;
        }
        let k = key || 'default';
        return (this.styles[k] || this.styles.default || {}) as CSSProperties;
    }
}

export function styleResolver(styles: { [key: string]: CSSProperties }) {
    return new StyleMap(styles).resolve;
}

export class StyleMapWithProps<T> {
    private styles: ((props: T) => ({ [key: string]: CSSProperties }));
    constructor(styles: ((props: T) => ({ [key: string]: CSSProperties }))) {
        this.styles = styles;
    }
  
    resolveWithProps = (props: T, key?: string, condition?: boolean) => {
        if (condition === false) {
            return {} as CSSProperties;
        }
        let k = key || 'default';
        return (this.styles(props!)[k] || this.styles(props!).default || {}) as CSSProperties;

    }

}

export function styleResolverWithProps<T>(styles: (props: T) => ({ [key: string]: CSSProperties })) {
    return new StyleMapWithProps(styles).resolveWithProps;
}