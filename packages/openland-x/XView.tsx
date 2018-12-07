import * as React from 'react';
import { XStyles } from 'openland-x-styles/XStyles';
import { calculateStyles } from 'openland-x-styles/calculateStyles';

export const XViewSelectedContext = React.createContext<boolean>(false);

export interface XViewProps extends XStyles {
    selected?: boolean;
    as?: 'div' | 'a';
    onClick?: React.MouseEventHandler<any>;
    onMouseDown?: React.MouseEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onMouseUp?: React.MouseEventHandler<any>;
    target?: string;
    href?: any;
    children?: any;
    ref?: any;
}

const XViewContainer = (props: XViewProps) => {
    let className = calculateStyles(props, props.selected || false, !!(props as any).className);
    if ((props as any).className) {
        className = (props as any).className + ' ' + className;
    }
    if (props.as === 'a') {
        return (
            <a className={className} onClick={props.onClick} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onMouseUp={props.onMouseUp} target={props.target} href={props.href} ref={props.ref}>
                {props.children}
            </a>
        );
    } else {
        return (
            <div className={className} onClick={props.onClick} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onMouseUp={props.onMouseUp} ref={props.ref}>
                {props.children}
            </div>
        );
    }
};

export const XView = (props: XViewProps) => {
    let shouldTrackSelected = props.selected === undefined && (
        props.selectedBackgroundColor || props.selectedHoverBackgroundColor || props.selectedColor);
    if (shouldTrackSelected) {
        return (
            <XViewSelectedContext.Consumer>
                {selected => (<XViewContainer selected={selected} {...props} />)}
            </XViewSelectedContext.Consumer>
        );
    } else {
        return (<XViewContainer {...props} />);
    }
};