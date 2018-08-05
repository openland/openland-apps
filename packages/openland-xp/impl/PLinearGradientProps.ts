import { XPFlexStyle } from '../XPFlexStyle';

export interface PLinearGradientProps extends XPFlexStyle {
    fallbackColor: string;
    colors: string[];
    start: { x: number, y: number };
    end: { x: number, y: number };
    borderRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    width?: number;
    height?: number;
}