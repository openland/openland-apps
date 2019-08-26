import * as React from 'react';
import { Animation, TimingAnimation, SequenceAnimation } from './Animation';
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
    translateX?: number | Animation;
    translateY?: number | Animation;

    width?: number | string;
    height?: number | string;
    background?: string;
    backgroundColor?: string;

    children?: any;
}

function convertValue(type: 'translateX' | 'translateY' | 'opacity', value: number) {
    if (type === 'translateY') {
        return { transform: `translateY(${value}px)` };
    } else if (type === 'translateX') {
        return { transform: `translateX(${value}px)` };
    } else if (type === 'opacity') {
        return { opacity: value };
    } else {
        throw Error();
    }
}

function addAnimation(type: 'translateX' | 'translateY' | 'opacity', delay: number, duration: number, animation: Animation, append: (anim: string) => void) {
    if (animation instanceof TimingAnimation) {
        const keyframes = glamor.keyframes({
            '0%': convertValue(type, animation._from),
            '100%': convertValue(type, animation._to)
        });
        append(`${keyframes} ${animation._duration / 1000}s ease ${(delay + animation._delay) / 1000}s 1 normal both`);
    } else if (animation instanceof SequenceAnimation) {
        let baseDelay = delay;
        for (let s of animation._animations) {
            addAnimation(type, baseDelay, duration, s, append);
            baseDelay += s._endTime;
        }
    }
}

export const View = React.memo((props: ViewProps) => {
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

    // Building animations
    let animation: string | undefined = undefined;
    function appendAnimation(anim: string) {
        if (animation) {
            animation = `${animation}, ${anim}`;
        } else {
            animation = anim;
        }
    }

    if (typeof props.translateY === 'object') {
        addAnimation('translateY', 0, 8000, props.translateY, appendAnimation);
    }
    if (typeof props.translateX === 'object') {
        addAnimation('translateX', 0, 8000, props.translateX, appendAnimation);
    }
    if (typeof props.opacity === 'object') {
        addAnimation('opacity', 0, 8000, props.opacity, appendAnimation);
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