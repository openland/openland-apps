import * as React from 'react';
import { Animation, TimingAnimation } from './Animation';
import * as glamor from 'glamor';

export interface ViewProps {
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    marginVertical?: number;
    marginHorizontal?: number;

    padding?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;

    opacity?: number | Animation;
    transformX?: number | Animation;
    transformY?: number | Animation;

    width?: number | string;
    height?: number | string;
    background?: string;
    backgroundColor?: string;

    children?: any;
}

export const View = React.memo((props: ViewProps) => {

    const duration = 8000;

    let marginTop: number | undefined;
    let marginBottom: number | undefined;
    let marginLeft: number | undefined;
    let marginRight: number | undefined;
    let paddingTop: number | undefined;
    let paddingBottom: number | undefined;
    let paddingLeft: number | undefined;
    let paddingRight: number | undefined;

    if (props.margin !== undefined) {
        marginTop = props.margin;
        marginBottom = props.margin;
        marginLeft = props.margin;
        marginRight = props.margin;
    }
    if (props.marginHorizontal !== undefined) {
        marginLeft = props.marginHorizontal;
        marginRight = props.marginHorizontal;
    }
    if (props.marginVertical !== undefined) {
        marginTop = props.marginVertical;
        marginBottom = props.marginVertical;
    }
    if (props.marginLeft !== undefined) {
        marginLeft = props.marginLeft;
    }
    if (props.marginRight !== undefined) {
        marginRight = props.marginRight;
    }
    if (props.marginBottom !== undefined) {
        marginBottom = props.marginBottom;
    }
    if (props.marginTop !== undefined) {
        marginTop = props.marginTop;
    }

    if (props.padding !== undefined) {
        paddingTop = props.padding;
        paddingBottom = props.padding;
        paddingLeft = props.padding;
        paddingRight = props.padding;
    }
    if (props.paddingHorizontal !== undefined) {
        paddingLeft = props.paddingHorizontal;
        paddingRight = props.paddingHorizontal;
    }
    if (props.paddingVertical !== undefined) {
        paddingTop = props.paddingVertical;
        paddingBottom = props.paddingVertical;
    }
    if (props.paddingLeft !== undefined) {
        paddingLeft = props.paddingLeft;
    }
    if (props.paddingRight !== undefined) {
        paddingRight = props.paddingRight;
    }
    if (props.paddingBottom !== undefined) {
        paddingBottom = props.paddingBottom;
    }
    if (props.paddingTop !== undefined) {
        paddingTop = props.paddingTop;
    }

    let animation: string | undefined = undefined;
    if (typeof props.transformY === 'object') {
        let tr = props.transformY;
        if (tr instanceof TimingAnimation) {
            const delay = tr._delay;
            const keyframes = glamor.keyframes({
                '0%': { transform: `translateY(${tr._from}px)` },
                '100%': { transform: `translateY(${tr._to}px)` }
            });
            if (animation) {
                animation = `${animation},${keyframes} ${tr._duration / 1000}s ease ${delay / 1000}s infinite`;
            } else {
                animation = `${keyframes} ${tr._duration / 1000}s ease ${delay / 1000}s infinite`;
            }
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                marginTop,
                marginBottom,
                marginLeft,
                marginRight,
                paddingTop,
                paddingBottom,
                paddingRight,
                paddingLeft,
                width: props.width,
                height: props.height,
                background: props.background,
                backgroundColor: props.backgroundColor,
                animation
            }}
        >
            {props.children}
        </div>
    );
});