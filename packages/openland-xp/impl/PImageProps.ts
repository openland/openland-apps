export interface PImageProps {
    source?: { uuid: string, crop?: { x: number, y: number, w: number, h: number } | null } | string | null;
    width: number;
    height: number;
    resize?: 'fill' | 'fit' | 'none';
    borderRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
}