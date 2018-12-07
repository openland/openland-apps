import { XStyles } from "./XStyles";
import * as glamor from 'glamor';

const stylesCache = new Map<string, string>();
// const base = glamor.css({
//     display: 'flex'
// }).toString();

export function calculateStyles(styles: XStyles, selected: boolean = false) {
    let css: string[] = ['x'];

    let position: 'relative' | 'absolute' | 'fixed' | undefined;

    let flexGrow: number | undefined;
    let flexShrink: number | undefined;
    let flexBasis: number | undefined;
    let flexDirection: 'row' | 'column' | undefined;
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
    if (styles.opacity !== undefined && styles.opacity !== null) {
        opacity = styles.opacity;
    }
    if (styles.level !== undefined && styles.level !== null) {
        level = styles.level;
    }
    if (styles.borderRadius !== undefined && styles.borderRadius !== null) {
        borderRadius = styles.borderRadius;
    }
    if (styles.backgroundColor !== undefined && styles.backgroundColor !== null) {
        backgroundColor = styles.backgroundColor;
    }
    if (styles.hoverBackgroundColor !== undefined && styles.hoverBackgroundColor !== null) {
        hoverBackgroundColor = styles.hoverBackgroundColor;
    }
    if (styles.selectedBackgroundColor !== undefined && styles.selectedBackgroundColor !== null) {
        if (selected) {
            backgroundColor = styles.selectedBackgroundColor;
        }
    }
    if (styles.selectedHoverBackgroundColor !== undefined && styles.selectedHoverBackgroundColor !== null) {
        if (selected) {
            hoverBackgroundColor = styles.selectedHoverBackgroundColor;
        }
    }
    if (styles.color !== undefined && styles.color !== null) {
        color = styles.color;
    }
    if (styles.selectedColor !== undefined && styles.selectedColor !== null) {
        if (selected) {
            color = styles.selectedColor;
        }
    }
    if (styles.fontSize !== undefined && styles.fontSize !== null) {
        fontSize = styles.fontSize;
    }
    if (styles.fontWeight !== undefined && styles.fontWeight !== null) {
        fontWeight = styles.fontWeight;
    }
    if (styles.lineHeight !== undefined && styles.lineHeight !== null) {
        lineHeight = styles.lineHeight;
    }
    if (styles.overflow !== undefined && styles.overflow !== null) {
        overflow = styles.overflow;
    }
    if (styles.textOverflow !== undefined && styles.textOverflow !== null) {
        textOverflow = styles.textOverflow;
    }
    if (styles.whiteSpace !== undefined && styles.whiteSpace !== null) {
        whiteSpace = styles.whiteSpace;
    }
    if (styles.cursor !== undefined && styles.cursor !== null) {
        cursor = styles.cursor;
    }

    //
    // Position
    //

    if (styles.position !== undefined && styles.position !== null) {
        position = styles.position;
    }
    if (styles.top !== undefined && styles.top !== null) {
        top = styles.top;
    }
    if (styles.bottom !== undefined && styles.bottom !== null) {
        bottom = styles.bottom;
    }
    if (styles.left !== undefined && styles.left !== null) {
        left = styles.left;
    }
    if (styles.right !== undefined && styles.right !== null) {
        right = styles.right;
    }
    if (styles.zIndex !== undefined && styles.zIndex !== null) {
        zIndex = styles.zIndex;
    }

    //
    // Flex Styles
    //

    if (styles.flexGrow !== undefined && styles.flexGrow !== null) {
        flexGrow = styles.flexGrow;
    }
    if (styles.flexShrink !== undefined && styles.flexShrink !== null) {
        flexShrink = styles.flexShrink;
    }
    if (styles.flexBasis !== undefined && styles.flexBasis !== null) {
        flexBasis = styles.flexBasis;
    }
    if (styles.flexDirection !== undefined && styles.flexDirection !== null) {
        flexDirection = styles.flexDirection;
    }
    if (styles.alignSelf !== undefined && styles.alignSelf !== null) {
        alignSelf = styles.alignSelf;
    }
    if (styles.alignItems !== undefined && styles.alignItems !== null) {
        alignItems = styles.alignItems;
    }
    if (styles.justifyContent !== undefined && styles.justifyContent !== null) {
        justifyContent = styles.justifyContent;
    }

    //
    // Resolve dimensions
    //
    if (styles.width !== undefined && styles.width !== null) {
        width = styles.width;
    }
    if (styles.height !== undefined && styles.height !== null) {
        height = styles.height;
    }
    if (styles.minWidth !== undefined && styles.minWidth !== null) {
        minWidth = styles.minWidth;
    }
    if (styles.maxWidth !== undefined && styles.maxWidth !== null) {
        maxWidth = styles.maxWidth;
    }
    if (styles.minHeight !== undefined && styles.minHeight !== null) {
        minHeight = styles.minHeight;
    }
    if (styles.maxHeight !== undefined && styles.maxHeight !== null) {
        maxHeight = styles.maxHeight;
    }

    //
    // Resolve margins
    //

    if (styles.margin !== undefined && styles.margin !== null) {
        marginTop = styles.margin;
        marginBottom = styles.margin;
        marginLeft = styles.margin;
        marginRight = styles.margin;
    }
    if (styles.marginTop !== undefined && styles.marginTop !== null) {
        marginTop = styles.marginTop;
    }
    if (styles.marginBottom !== undefined && styles.marginBottom !== null) {
        marginBottom = styles.marginBottom;
    }
    if (styles.marginLeft !== undefined && styles.marginLeft !== null) {
        marginLeft = styles.marginLeft;
    }
    if (styles.marginRight !== undefined && styles.marginRight !== null) {
        marginRight = styles.marginRight;
    }

    //
    // Resolve Paddings
    //

    if (styles.padding !== undefined && styles.padding !== null) {
        paddingTop = styles.padding;
        paddingBottom = styles.padding;
        paddingLeft = styles.padding;
        paddingRight = styles.padding;
    }
    if (styles.paddingTop !== undefined && styles.paddingTop !== null) {
        paddingTop = styles.paddingTop;
    }
    if (styles.paddingBottom !== undefined && styles.paddingBottom !== null) {
        paddingBottom = styles.paddingBottom;
    }
    if (styles.paddingLeft !== undefined && styles.paddingLeft !== null) {
        paddingLeft = styles.paddingLeft;
    }
    if (styles.paddingRight !== undefined && styles.paddingRight !== null) {
        paddingRight = styles.paddingRight;
    }

    if (flexGrow !== undefined) {
        let key = 'flex-grow: ' + flexGrow;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ flexGrow: flexGrow }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (flexShrink !== undefined) {
        let key = 'flex-shrink: ' + flexShrink;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ flexShrink: flexShrink }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (flexBasis !== undefined) {
        let key = 'flex-basis: ' + flexBasis;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ flexBasis: flexBasis }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (flexDirection !== undefined) {
        let key = 'flex-direction: ' + flexDirection;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ flexDirection: flexDirection }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (alignSelf !== undefined) {
        let key = 'align-self: ' + alignSelf;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ alignSelf: alignSelf }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (alignItems !== undefined) {
        let key = 'align-items: ' + alignItems;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ alignItems: alignItems }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (justifyContent !== undefined) {
        let key = 'justify-content: ' + justifyContent;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ justifyContent: justifyContent }).toString());
        }
        css.push(stylesCache.get(key)!);
    }

    if (marginTop !== undefined) {
        let key = 'margin-top: ' + marginTop;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ marginTop: marginTop }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (marginBottom !== undefined) {
        let key = 'margin-bottom: ' + marginBottom;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ marginBottom: marginBottom }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (marginLeft !== undefined) {
        let key = 'margin-left: ' + marginLeft;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ marginLeft: marginLeft }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (marginRight !== undefined) {
        let key = 'margin-right: ' + marginRight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ marginRight: marginRight }).toString());
        }
        css.push(stylesCache.get(key)!);
    }

    if (paddingTop !== undefined) {
        let key = 'padding-top: ' + paddingTop;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ paddingTop: paddingTop }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (paddingBottom !== undefined) {
        let key = 'padding-bottom: ' + paddingBottom;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ paddingBottom: paddingBottom }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (paddingLeft !== undefined) {
        let key = 'padding-left: ' + paddingLeft;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ paddingLeft: paddingLeft }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (paddingRight !== undefined) {
        let key = 'padding-right: ' + paddingRight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ paddingRight: paddingRight }).toString());
        }
        css.push(stylesCache.get(key)!);
    }

    if (top !== undefined) {
        let key = 'top: ' + top;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ top: top }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (bottom !== undefined) {
        let key = 'bottom: ' + bottom;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ bottom: bottom }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (left !== undefined) {
        let key = 'left: ' + left;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ left: left }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (right !== undefined) {
        let key = 'right: ' + right;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ right: right }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (zIndex !== undefined) {
        let key = 'zIndex: ' + zIndex;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ zIndex: zIndex }).toString());
        }
        css.push(stylesCache.get(key)!);
    }

    if (width !== undefined) {
        let key = 'width: ' + width;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ width: width }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (height !== undefined) {
        let key = 'height: ' + height;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ height: height }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (minWidth !== undefined) {
        let key = 'min-width: ' + minWidth;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ minWidth: minWidth }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (maxWidth !== undefined) {
        let key = 'max-width: ' + maxWidth;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ maxWidth: maxWidth }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (minHeight !== undefined) {
        let key = 'min-height: ' + minHeight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ minHeight: minHeight }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (maxHeight !== undefined) {
        let key = 'max-height: ' + maxHeight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ maxHeight: maxHeight }).toString());
        }
        css.push(stylesCache.get(key)!);
    }

    if (opacity !== undefined) {
        let key = 'opacity: ' + opacity;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ opacity: opacity }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (borderRadius !== undefined) {
        let key = 'border-radius: ' + borderRadius;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ borderRadius: borderRadius }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (backgroundColor !== undefined) {
        let key = 'background-color: ' + backgroundColor;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ backgroundColor: backgroundColor }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (hoverBackgroundColor !== undefined) {
        let key = 'hover-background-color: ' + hoverBackgroundColor;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({
                '&:hover, &:focus': {
                    backgroundColor: hoverBackgroundColor
                }
            }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (hoverBackgroundColor !== undefined) {
        let key = 'hover-background-color: ' + hoverBackgroundColor;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({
                '&:hover, &:focus': {
                    backgroundColor: hoverBackgroundColor
                }
            }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (color !== undefined) {
        let key = 'color: ' + color;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ color: color }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (fontSize !== undefined) {
        let key = 'font-size: ' + fontSize;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ fontSize: fontSize }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (fontWeight !== undefined) {
        let key = 'font-weight: ' + fontWeight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ fontWeight: fontWeight }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (lineHeight !== undefined) {
        let key = 'line-height: ' + lineHeight;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ lineHeight: lineHeight }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (overflow !== undefined) {
        let key = 'overflow: ' + overflow;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ overflow: overflow }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (textOverflow !== undefined) {
        let key = 'text-overflow: ' + textOverflow;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ textOverflow: textOverflow }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (whiteSpace !== undefined) {
        let key = 'white-space: ' + whiteSpace;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ whiteSpace: whiteSpace }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (position !== undefined) {
        let key = 'position: ' + position;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ position: position }).toString());
        }
        css.push(stylesCache.get(key)!);
    }
    if (level !== undefined) {
        let key = 'level: ' + level;
        if (!stylesCache.has(key)) {
            if (level === '1') {
                stylesCache.set(key, glamor.css({ border: '1px solid #ececec' }).toString());
            }
        }
        css.push(stylesCache.get(key)!);
    }
    if (cursor !== undefined) {
        let key = 'cursor: ' + cursor;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, glamor.css({ cursor: cursor }).toString());
        }
        css.push(stylesCache.get(key)!);
    }

    return css.join(' ');
}