import * as React from 'react';
import * as glamor from 'glamor';
import { Animation, TimingAnimation, SequenceAnimation } from './Animation';
import { VideoRendererInt, VideoRenderer } from "./renderers";
import { XView } from 'react-mental';

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

const CSSRenderer: VideoRendererInt = {
    renderView: (props) => {

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
            addAnimation('translateY', props.delay, props.duration, props.translateY, appendAnimation);
        }
        if (typeof props.translateX === 'object') {
            addAnimation('translateX', props.delay, props.duration, props.translateX, appendAnimation);
        }
        if (typeof props.opacity === 'object') {
            addAnimation('opacity', props.delay, props.duration, props.opacity, appendAnimation);
        }

        return (
            <div
                style={{
                    display: 'flex',
                    marginTop: props.marginTop,
                    marginBottom: props.marginBottom,
                    marginLeft: props.marginLeft,
                    marginRight: props.marginRight,
                    paddingTop: props.paddingTop,
                    paddingBottom: props.paddingBottom,
                    paddingRight: props.paddingRight,
                    paddingLeft: props.paddingLeft,
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
    }
};

export const VideoPreview2 = React.memo((props: { duration: number, width: number, height: number, children?: any }) => {
    return (
        <XView width={props.width} height={props.height}>
            <VideoRenderer.Provider value={CSSRenderer}>
                {props.children}
            </VideoRenderer.Provider>
        </XView>
    );
});