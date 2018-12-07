export interface XStyles {

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
    // Fonts
    //
    fontSize?: number | null;
    fontWeight?: '400' | '600';
    lineHeight?: number | string | null;
    overflow?: 'hidden' | null;
    textOverflow?: 'ellipsis' | null;
    whiteSpace?: 'nowrap' | null;

    //
    // Selection
    //
    selectedColor?: string | null;
    selectedBackgroundColor?: string | null;
    selectedHoverBackgroundColor?: string | null;
}

export const XStyleKeys = [
    'position',

    //
    // Flex
    //
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'flexDirection',
    'alignSelf',
    'alignItems',
    'justifyContent',

    //
    // Sizing
    //
    'top',
    'bottom',
    'left',
    'right',
    'margin',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'padding',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'height',
    'width',
    'minHeight',
    'minWidth',
    'maxHeight',
    'maxWidth',
    'zIndex',

    //
    // Visual
    //
    'borderRadius',
    'level',
    'color',
    'cursor',
    'opacity',

    'backgroundColor',
    'hoverBackgroundColor',

    //
    // Fonts
    //
    'fontSize',
    'fontWeight',
    'lineHeight',
    'overflow',
    'textOverflow',
    'whiteSpace',

    //
    // Selection
    //
    'selectedColor',
    'selectedBackgroundColor',
    'selectedHoverBackgroundColor',
];