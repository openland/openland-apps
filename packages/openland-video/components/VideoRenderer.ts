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
        backgroundColor?: string;

        opacity?: number | Animation;
        translateX?: number | Animation;
        translateY?: number | Animation;

        children?: any;

        delay: number;
        duration: number;
        time: number;
    }): any;
    renderText(props: {
        color?: string,
        fontSize?: number,
        lineHeight?: number,
        fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
        fontFamily?: string,
        children?: any;
    }): any;
}

export const VideoRenderer = React.createContext<VideoRendererInt | undefined>(undefined);