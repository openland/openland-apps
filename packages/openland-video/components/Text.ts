import { VideoRenderer } from './VideoRenderer';
import * as React from 'react';

export interface TextProps {
    color?: string;
    fontSize?: number;
    lineHeight?: number;
    fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontFamily?: string;
    children?: any;
}

export const Text = React.memo((props: TextProps) => {
    const renderer = React.useContext(VideoRenderer)!;
    return renderer.renderText({
        color: props.color,
        fontSize: props.fontSize,
        lineHeight: props.lineHeight,
        fontWeight: props.fontWeight,
        fontFamily: props.fontFamily,
        children: props.children
    });
});

Text.displayName = 'Text';