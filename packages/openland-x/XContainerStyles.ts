export interface XContainerStyles {
    position?: 'relative' | 'absolute' | 'fixed' | null;
    flexGrow?: number | null;
    flexShrink?: number | null;
    flexBasis?: number | null;
    flexWrap?: 'wrap' | 'nowrap' | null;
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | null;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | null;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | null;
    top?: number | null;
    bottom?: number | null;
    left?: number | null;
    right?: number | null;
    margin?: number | null;
    marginVertical?: number | null;
    marginHorizontal?: number | null;
    marginTop?: number | null;
    marginBottom?: number | null;
    marginLeft?: number | null;
    marginRight?: number | null;
    padding?: number | null;
    paddingVertical?: number | null;
    paddingHorizontal?: number | null;
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
}

export function extractContainerStyles(src: XContainerStyles): XContainerStyles {
    return {
        position: src.position,
        flexGrow: src.flexGrow,
        flexShrink: src.flexShrink,
        flexBasis: src.flexBasis,
        flexWrap: src.flexWrap,
        alignSelf: src.alignSelf,
        alignItems: src.alignItems,
        justifyContent: src.justifyContent,
        top: src.top,
        bottom: src.bottom,
        left: src.left,
        right: src.right,
        margin: src.margin,
        marginVertical: src.marginVertical,
        marginHorizontal: src.marginHorizontal,
        marginTop: src.marginTop,
        marginBottom: src.marginBottom,
        marginLeft: src.marginLeft,
        marginRight: src.marginRight,
        padding: src.padding,
        paddingVertical: src.paddingVertical,
        paddingHorizontal: src.paddingHorizontal,
        paddingTop: src.paddingTop,
        paddingBottom: src.paddingBottom,
        paddingLeft: src.paddingLeft,
        paddingRight: src.paddingRight,
        height: src.height,
        width: src.width,
        minHeight: src.minHeight,
        minWidth: src.minWidth,
        maxHeight: src.maxHeight,
        maxWidth: src.maxWidth,
    }
}