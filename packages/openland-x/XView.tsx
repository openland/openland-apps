import * as React from 'react';
import * as glamor from 'glamor';

export interface XViewProps {
    margin?: number | null;
    marginTop?: number | null;
    marginBottom?: number | null;
    marginLeft?: number | null;
    marginRight?: number | null;
    padding?: number | null;
    paddingTop?: number | null;
    paddingBottom?: number | null;
    paddingLeft?: number | null;
    paddingRight?: number | null;
}

const styles = new Map<string, string>();

export class XView extends React.Component<XViewProps> {
    render() {
        let css: string[] = [];
        if (this.props.margin !== undefined && this.props.margin !== null) {
            let key = 'margin: ' + this.props.margin;
            if (!styles.has(key)) {
                styles.set(key, glamor.css({ margin: this.props.margin! }).toString());
            }
            css.push(styles.get(key)!);
        }

        return <div className={css.join(' ')}>{this.props.children}</div>;
    }
}