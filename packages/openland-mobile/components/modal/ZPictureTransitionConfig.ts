import { View } from 'react-native';

export interface ZPictureTransitionConfig {
    url: string;
    width: number;
    height: number;
    animate?: { x: number, y: number, width: number, height: number, view: View, borderRadius?: number };
    title?: string;
    onBegin?: () => void;
    onEnd?: () => void;
}