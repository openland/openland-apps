import * as React from 'react';
import * as classNames from 'classnames';

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export function XColumn(props: { cols: Cols, mobile?: Cols, children?: any }) {
    let mcols = props.mobile;
    if (!mcols) {
        mcols = props.cols;
    }
    let className = classNames(
        { [`col-xs-${mcols}`]: mcols !== undefined },
        { [`col-md-${props.cols}`]: props.cols !== mcols },
    );
    return <div className={className}>{props.children}</div>
}