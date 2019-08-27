import { Animation } from './Animation';
import * as React from 'react';

export interface VideoRendererInt {
    renderView(props: {
        marginTop?: number;
        marginBottom?: number;
        marginLeft?: number;
        marginRight?: number;
        paddingTop?: number;
        paddingBottom?: number;
        paddingLeft?: number;
        paddingRight?: number;

        width?: number | string;
        height?: number | string;
        background?: string;
        backgroundColor?: string;

        opacity?: number | Animation;
        translateX?: number | Animation;
        translateY?: number | Animation;

        children?: any;

        delay: number;
        duration: number;
    }): any;
}

export const VideoRenderer = React.createContext<VideoRendererInt | undefined>(undefined);