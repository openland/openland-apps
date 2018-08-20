import { createASView } from './ASBaseView';
import { Image, processColor } from 'react-native';

export interface ASViewStyle {
    height?: number;
    width?: number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

//
// View
//

export interface ASViewProps extends ASViewStyle {
    direction?: 'row' | 'column';
    spacing?: number;
    justifyContent?: 'flex-start' | 'flex-end' | 'center';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    flexWrap?: string;
}
export const ASView = createASView<ASViewProps>('view');

//
// Text
//

export interface ASTextProps extends ASViewStyle {
    fontSize?: number;
    fontWeight?: string;
    lineHeight?: number;
    color?: string;
    numberOfLines?: number;
}
export const ASText = createASView<ASTextProps>('text', (src) => {
    return { ...src, color: src.color ? processColor(src.color) : undefined };
});

//
// Image
//

export interface ASImageProps extends ASViewStyle {
    source: any;
    borderRadius?: number;
}

export const ASImage = createASView<ASImageProps>('image', (src) => {
    return { ...src, source: Image.resolveAssetSource(src.source).uri };
});

//
// Gradient
//

export interface ASLinearGradientProps extends ASViewStyle {
    colorStart: string;
    colorEnd: string;
    borderRadius?: number;
}
export const ASLinearGradient = createASView<ASLinearGradientProps>('linear_gradient', (src) => {
    return { ...src, colorStart: processColor(src.colorStart), colorEnd: processColor(src.colorEnd) };
});

//
// Insets
//

export interface ASInsetsProps extends ASViewStyle {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}

export const ASInsets = createASView<ASInsetsProps>('insets');