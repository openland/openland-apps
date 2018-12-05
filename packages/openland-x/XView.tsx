import * as React from 'react';
import * as glamor from 'glamor';

export const XViewSelectedContext = React.createContext<boolean>(false);

export interface XViewProps {

    //
    // Position
    //

    position?: 'relative' | 'absolute' | 'fixed' | null;

    //
    // Flex
    //

    flexGrow?: number | null;
    flexShrink?: number | null;
    flexBasis?: number | null;
    flexDirection?: 'row' | 'column' | null;
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | null;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | null;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | null;

    //
    // Sizing
    //
    top?: number | null;
    bottom?: number | null;
    left?: number | null;
    right?: number | null;
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
    height?: number | string | null;
    width?: number | string | null;
    minHeight?: number | string | null;
    minWidth?: number | string | null;
    maxHeight?: number | string | null;
    maxWidth?: number | string | null;
    zIndex?: number | null;

    //
    // Visual
    //

    borderRadius?: number | string | null;
    level?: '1' | null;
    color?: string | null;
    cursor?: 'pointer';
    opacity?: number;

    backgroundColor?: string | null;
    hoverBackgroundColor?: string | null;

    //
    // Selection
    //
    selectedColor?: string | null;
    selectedBackgroundColor?: string | null;
    selectedHoverBackgroundColor?: string | null;

    //
    // Fonts
    //

    fontSize?: number | null;
    fontWeight?: '400' | '600';
    lineHeight?: number | string | null;
    overflow?: 'hidden' | null;
    textOverflow?: 'ellipsis' | null;
    whiteSpace?: 'nowrap' | null;

    //
    // Other
    //

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

const styles = new Map<string, string>();

const base = glamor.css({
    display: 'flex'
}).toString();

const XViewContainer = (props: XViewProps) => {

    let position: 'relative' | 'absolute' | 'fixed' | undefined = 'relative';

    let flexGrow: number | undefined = 0;
    let flexShrink: number | undefined = 0;
    let flexBasis: number | undefined;
    let flexDirection: 'row' | 'column' | undefined = 'column';
    let alignSelf: 'flex-start' | 'flex-end' | 'center' | 'stretch' | undefined;
    let alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | undefined;
    let justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | undefined;

    let top: number | undefined;
    let left: number | undefined;
    let right: number | undefined;
    let bottom: number | undefined;

    let marginTop: number | 'auto' | undefined;
    let marginBottom: number | 'auto' | undefined;
    let marginRight: number | 'auto' | undefined;
    let marginLeft: number | 'auto' | undefined;

    let paddingTop: number | undefined;
    let paddingBottom: number | undefined;
    let paddingRight: number | undefined;
    let paddingLeft: number | undefined;

    let width: number | string | undefined;
    let height: number | string | undefined;
    let minWidth: number | string | undefined;
    let minHeight: number | string | undefined;
    let maxWidth: number | string | undefined;
    let maxHeight: number | string | undefined;

    let zIndex: number | undefined;

    let opacity: number | undefined;
    let borderRadius: number | string | undefined;
    let level: '1' | undefined;
    let backgroundColor: string | undefined;
    let hoverBackgroundColor: string | undefined;
    let color: string | undefined;
    let cursor: 'pointer' | undefined;

    let fontSize: number | undefined;
    let fontWeight: '400' | '600' | 'normal' | undefined;
    let lineHeight: number | string | undefined;
    let overflow: 'hidden' | undefined;
    let textOverflow: 'ellipsis' | undefined;
    let whiteSpace: 'nowrap' | undefined;

    //
    // Resolve visual styles
    //
    if (props.opacity !== undefined && props.opacity !== null) {
        opacity = props.opacity;
    }
    if (props.level !== undefined && props.level !== null) {
        level = props.level;
    }
    if (props.borderRadius !== undefined && props.borderRadius !== null) {
        borderRadius = props.borderRadius;
    }
    if (props.backgroundColor !== undefined && props.backgroundColor !== null) {
        backgroundColor = props.backgroundColor;
    }
    if (props.hoverBackgroundColor !== undefined && props.hoverBackgroundColor !== null) {
        hoverBackgroundColor = props.hoverBackgroundColor;
    }
    if (props.selectedBackgroundColor !== undefined && props.selectedBackgroundColor !== null) {
        if (props.selected) {
            backgroundColor = props.selectedBackgroundColor;
        }
    }
    if (props.selectedHoverBackgroundColor !== undefined && props.selectedHoverBackgroundColor !== null) {
        if (props.selected) {
            hoverBackgroundColor = props.selectedHoverBackgroundColor;
        }
    }
    if (props.color !== undefined && props.color !== null) {
        color = props.color;
    }
    if (props.selectedColor !== undefined && props.selectedColor !== null) {
        if (props.selected) {
            color = props.selectedColor;
        }
    }
    if (props.fontSize !== undefined && props.fontSize !== null) {
        fontSize = props.fontSize;
    }
    if (props.fontWeight !== undefined && props.fontWeight !== null) {
        fontWeight = props.fontWeight;
    }
    if (props.lineHeight !== undefined && props.lineHeight !== null) {
        lineHeight = props.lineHeight;
    }
    if (props.overflow !== undefined && props.overflow !== null) {
        overflow = props.overflow;
    }
    if (props.textOverflow !== undefined && props.textOverflow !== null) {
        textOverflow = props.textOverflow;
    }
    if (props.whiteSpace !== undefined && props.whiteSpace !== null) {
        whiteSpace = props.whiteSpace;
    }
    if (props.cursor !== undefined && props.cursor !== null) {
        cursor = props.cursor;
    }

    //
    // Position
    //

    if (props.position !== undefined && props.position !== null) {
        position = props.position;
    }
    if (props.top !== undefined && props.top !== null) {
        top = props.top;
    }
    if (props.bottom !== undefined && props.bottom !== null) {
        bottom = props.bottom;
    }
    if (props.left !== undefined && props.left !== null) {
        left = props.left;
    }
    if (props.right !== undefined && props.right !== null) {
        right = props.right;
    }
    if (props.zIndex !== undefined && props.zIndex !== null) {
        zIndex = props.zIndex;
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

    if (top !== undefined) {
        let key = 'top: ' + top;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ top: top }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (bottom !== undefined) {
        let key = 'bottom: ' + bottom;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ bottom: bottom }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (left !== undefined) {
        let key = 'left: ' + left;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ left: left }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (right !== undefined) {
        let key = 'right: ' + right;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ right: right }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (zIndex !== undefined) {
        let key = 'zIndex: ' + zIndex;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ zIndex: zIndex }).toString());
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

    if (opacity !== undefined) {
        let key = 'opacity: ' + opacity;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ opacity: opacity }).toString());
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
    if (color !== undefined) {
        let key = 'color: ' + color;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ color: color }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (fontSize !== undefined) {
        let key = 'font-size: ' + fontSize;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ fontSize: fontSize }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (fontWeight !== undefined) {
        let key = 'font-weight: ' + fontWeight;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ fontWeight: fontWeight }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (lineHeight !== undefined) {
        let key = 'line-height: ' + lineHeight;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ lineHeight: lineHeight }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (overflow !== undefined) {
        let key = 'overflow: ' + overflow;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ overflow: overflow }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (textOverflow !== undefined) {
        let key = 'text-overflow: ' + textOverflow;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ textOverflow: textOverflow }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (whiteSpace !== undefined) {
        let key = 'white-space: ' + whiteSpace;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ whiteSpace: whiteSpace }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (position !== undefined) {
        let key = 'position: ' + position;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ position: position }).toString());
        }
        css.push(styles.get(key)!);
    }
    if (level !== undefined) {
        let key = 'level: ' + level;
        if (!styles.has(key)) {
            if (level === '1') {
                styles.set(key, glamor.css({ border: '1px solid #ececec' }).toString());
            }
        }
        css.push(styles.get(key)!);
    }
    if (cursor !== undefined) {
        let key = 'cursor: ' + cursor;
        if (!styles.has(key)) {
            styles.set(key, glamor.css({ cursor: cursor }).toString());
        }
        css.push(styles.get(key)!);
    }

    let className = css.join(' ');
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