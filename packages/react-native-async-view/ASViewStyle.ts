export interface ASViewStyle {
    height?: number;
    width?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    backgroundColor?: string;
    backgroundGradient?: { start: string, end: string };
    backgroundGradientOrientation?: 'left_right' | 'top_bottom' | 'tl_br' | 'tr_bl';
    backgroundPatch?: { top: number, right: number, bottom: number, left: number, source: string, scale: number };
    backgroundPatchTintColor?: string;
    borderRadius?: number;
    borderRadiusTopLeft?: number;
    borderRadiusTopRight?: number;
    borderRadiusBottomLeft?: number;
    borderRadiusBottomRight?: number;
    opacity?: number;
}