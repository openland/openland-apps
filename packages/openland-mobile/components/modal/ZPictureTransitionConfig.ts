import { View } from 'react-native';

export interface ZPictureTransitionConfig {
    uuid: string;
    width: number;
    height: number;
    animate?: { x: number, y: number, width: number, height: number, view: View };
}