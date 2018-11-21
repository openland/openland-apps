import * as React from 'react';
import * as glamor from 'glamor';

export const XViewContext = React.createContext<boolean>(false);

export interface XViewProps {

    //
    // Flex Grow
    //

    flexGrow?: number | null;
    flexShrink?: number | null;
    flexBasis?: number | null;
    flexDirection?: 'row' | 'column' | null;
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | null;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | null;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | null;

    //
    // Sizing
    //

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
    height?: number | null;
    width?: number | null;
    minHeight?: number | null;
    minWidth?: number | null;
    maxHeight?: number | null;
    maxWidth?: number | null;

    //
    // Visual
    //

    borderRadius?: number | string | null;
    backgroundColor?: string | null;
    hoverBackgroundColor?: string | null;
    cursor?: 'pointer';

    //
    // Other
    //

    as?: 'div' | 'a';
    onClick?: React.MouseEventHandler<any>;
    target?: string;
    href?: any;
    children?: any;
}

const base = glamor.css({
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'column'
}).toString();

const styles = new Map<string, string>();

export const XView = (props: XViewProps) => {

    let flexGrow: number | undefined;
    let flexShrink: number | undefined;
    let flexBasis: number | undefined;
    let flexDirection: 'row' | 'column' | undefined;
    let alignSelf: 'flex-start' | 'flex-end' | 'center' | 'stretch' | undefined;
    let alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | undefined;
    let justifyContent: 'flex-start' | 'flex-end' | 'center' | undefined;

    let marginTop: number | undefined;
    let marginBottom: number | undefined;
    let marginRight: number | undefined;
    let marginLeft: number | undefined;

    let paddingTop: number | undefined;
    let paddingBottom: number | undefined;
    let paddingRight: number | undefined;
    let paddingLeft: number | undefined;

    let width: number | undefined;
    let height: number | undefined;
    let minWidth: number | undefined;
    let minHeight: number | undefined;
    let maxWidth: number | undefined;
    let maxHeight: number | undefined;

    let borderRadius: number | string | undefined;
    let backgroundColor: string | undefined;
    let hoverBackgroundColor: string | undefined;

    //
    // Resolve visual styles
    //

    if (props.borderRadius !== undefined && props.borderRadius !== null) {
        borderRadius = props.borderRadius;
    }
    if (props.backgroundColor !== undefined && props.backgroundColor !== null) {
        backgroundColor = props.backgroundColor;
    }
    if (props.hoverBackgroundColor !== undefined && props.hoverBackgroundColor !== null) {
        hoverBackgroundColor = props.hoverBackgroundColor;
    }

    //
    // Flex Styles
    //

    if (props.flexGrow !== undefined && props.flexGrow !== null) {
        flexGrow = props.flexGrow;
    }
    if (props.flexShrink !== undefined && props.flexShrink !== null) {
        flexShrink = props.flexShrink;
    }
    if (props.flexBasis !== undefined && props.flexBasis !== null) {
        flexBasis = props.flexBasis;
    }
    if (props.flexDirection !== undefined && props.flexDirection !== null) {
        flexDirection = props.flexDirection;
    }
    if (props.alignSelf !== undefined && props.alignSelf !== null) {
        alignSelf = props.alignSelf;
    }
    if (props.alignItems !== undefined && props.alignItems !== null) {
        alignItems = props.alignItems;
    }
    if (props.justifyContent !== undefined && props.justifyContent !== null) {
        justifyContent = props.justifyContent;
    }

    //
    // Resolve dimensions
    //
    if (props.width !== undefined && props.width !== null) {
        width = props.width;
    }
    if (props.height !== undefined && props.height !== null) {
        height = props.height;
    }
    if (props.minWidth !== undefined && props.minWidth !== null) {
        minWidth = props.minWidth;
    }
    if (props.maxWidth !== undefined && props.maxWidth !== null) {
        maxWidth = props.maxWidth;
    }
    if (props.minHeight !== undefined && props.minHeight !== null) {
        minHeight = props.minHeight;
    }
    if (props.maxHeight !== undefined && props.maxHeight !== null) {
        maxHeight = props.maxHeight;
    }

    //
    // Resolve margins
    //

    if (props.margin !== undefined && props.margin !== null) {
        marginTop = props.margin;
        marginBottom = props.margin;
        marginLeft = props.margin;
        marginRight = props.margin;
    }
    if (props.marginTop !== undefined && props.marginTop !== null) {
        marginTop = props.marginTop;
    }
    if (props.marginBottom !== undefined && props.marginBottom !== null) {
        marginBottom = props.marginBottom;
    }
    if (props.marginLeft !== undefined && props.marginLeft !== null) {
        marginLeft = props.marginLeft;
    }
    if (props.marginRight !== undefined && props.marginRight !== null) {
        marginRight = props.marginRight;
    }

    //
    // Resolve Paddings
    //

    if (props.padding !== undefined && props.padding !== null) {
        paddingTop = props.padding;
        paddingBottom = props.padding;
        paddingLeft = props.padding;
        paddingRight = props.padding;
    }
    if (props.paddingTop !== undefined && props.paddingTop !== null) {
        paddingTop = props.paddingTop;
    }
    if (props.paddingBottom !== undefined && props.paddingBottom !== null) {
        paddingBottom = props.paddingBottom;
    }
    if (props.paddingLeft !== undefined && props.paddingLeft !== null) {
        paddingLeft = props.paddingLeft;
    }
    if (props.paddingRight !== undefined && props.paddingRight !== null) {
        paddingRight = props.paddingRight;
    }

    //
    // Resolve Class Names
    //

    let css: string[] = [base];

    if (flexGrow !== undefined) {
        let key = 'flex-grow: ' + flexGrow;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ flexGrow: flexGrow }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (flexShrink !== undefined) {
        let key = 'flex-shrink: ' + flexShrink;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ flexShrink: flexShrink }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (flexBasis !== undefined) {
        let key = 'flex-basis: ' + flexBasis;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ flexBasis: flexBasis }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (flexDirection !== undefined) {
        let key = 'flex-direction: ' + flexDirection;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ flexDirection: flexDirection }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (alignSelf !== undefined) {
        let key = 'align-self: ' + alignSelf;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ alignSelf: alignSelf }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (alignItems !== undefined) {
        let key = 'align-items: ' + alignItems;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ alignItems: alignItems }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (justifyContent !== undefined) {
        let key = 'justify-content: ' + justifyContent;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ justifyContent: justifyContent }).toString());
        }
        css.push(styles.get(key)!);
    }

    if (marginTop !== undefined) {
        let key = 'margin-top: ' + marginTop;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ marginTop: marginTop }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (marginBottom !== undefined) {
        let key = 'margin-bottom: ' + marginBottom;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ marginBottom: marginBottom }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (marginLeft !== undefined) {
        let key = 'margin-left: ' + marginLeft;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ marginLeft: marginLeft }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (marginRight !== undefined) {
        let key = 'margin-right: ' + marginRight;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ marginRight: marginRight }).toString());
        }
        css.push(styles.get(key)!);
    }

    if (paddingTop !== undefined) {
        let key = 'padding-top: ' + paddingTop;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ paddingTop: paddingTop }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (paddingBottom !== undefined) {
        let key = 'padding-bottom: ' + paddingBottom;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ paddingBottom: paddingBottom }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (paddingLeft !== undefined) {
        let key = 'padding-left: ' + paddingLeft;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ paddingLeft: paddingLeft }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (paddingRight !== undefined) {
        let key = 'padding-right: ' + paddingRight;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ paddingRight: paddingRight }).toString());
        }
        css.push(styles.get(key)!);
    }

    if (width !== undefined) {
        let key = 'width: ' + width;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ width: width }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (height !== undefined) {
        let key = 'height: ' + height;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ height: height }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (minWidth !== undefined) {
        let key = 'min-width: ' + minWidth;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ minWidth: minWidth }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (maxWidth !== undefined) {
        let key = 'max-width: ' + maxWidth;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ maxWidth: maxWidth }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (minHeight !== undefined) {
        let key = 'min-height: ' + minHeight;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ minHeight: minHeight }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (maxHeight !== undefined) {
        let key = 'max-height: ' + maxHeight;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ maxHeight: maxHeight }).toString());
        }
        css.push(styles.get(key)!);
    }

    if (borderRadius !== undefined) {
        let key = 'border-radius: ' + borderRadius;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ borderRadius: borderRadius }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (backgroundColor !== undefined) {
        let key = 'background-color: ' + backgroundColor;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ backgroundColor: backgroundColor }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (hoverBackgroundColor !== undefined) {
        let key = 'hover-background-color: ' + hoverBackgroundColor;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({
                '&:hover, &:focus': {
                    backgroundColor: hoverBackgroundColor
                }
            }).toString());
        }
        css.push(styles.get(key)!);
    }

    return (
        <XViewContext.Consumer>{active => {
            let className = css.join(' ');
            if (props.as === 'a') {
                return (
                    <a className={className} onClick={props.onClick} target={props.target} href={props.href}>
                        {props.children}
                    </a>
                );
            } else {
                return (
                    <div className={className} onClick={props.onClick}>
                        {props.children}
                    </div>
                );
            }
        }}</XViewContext.Consumer>
    );
};