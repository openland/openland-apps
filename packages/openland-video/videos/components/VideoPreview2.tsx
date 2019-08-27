import * as React from 'react';
import * as glamor from 'glamor';
import { Animation, TimingAnimation, SequenceAnimation, SetValueAnimation } from './Animation';
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

function addAnimation(
    ctx: { first: boolean },
    type: 'translateX' | 'translateY' | 'opacity',
    from: number,
    delay: number,
    duration: number,
    animation: Animation,
    append: (anim: string) => void
) {
    if (animation instanceof TimingAnimation) {
        const keyframes = glamor.keyframes({
            '0%': convertValue(type, from),
            '100%': convertValue(type, animation._to)
        });
        append(`${keyframes} ${animation._duration / 1000}s ease ${(delay + animation._delay) / 1000}s 1 ${ctx.first ? 'backwards' : 'none'}`);
        ctx.first = false;
        return animation._to;
    } else if (animation instanceof SequenceAnimation) {
        let baseDelay = delay;
        let baseFrom = from;
        let to = from;
        for (let s of animation._animations) {
            baseFrom = addAnimation(ctx, type, baseFrom, baseDelay, duration, s, append);
            baseDelay += s._endTime;
            to = s._to;
        }
        return to;
    } else if (animation instanceof SetValueAnimation) {
        return animation._to;
    } else {
        throw Error('Unknown');
    }
}

function appendFinal(type: 'translateX' | 'translateY' | 'opacity', after: number, value: number, append: (anim: string) => void) {
    const keyframes = glamor.keyframes({
        '0%': convertValue(type, value),
        '100%': convertValue(type, value)
    });
    append(`${keyframes} 1s linear ${after / 1000}s 1 normal forwards`);
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
            let to = addAnimation({ first: true }, 'translateY', 0, props.delay, props.duration, props.translateY, appendAnimation);
            appendFinal('translateY', props.translateY._endTime, to, appendAnimation);
        }
        if (typeof props.translateX === 'object') {
            let to = addAnimation({ first: true }, 'translateX', 0, props.delay, props.duration, props.translateX, appendAnimation);
            appendFinal('translateX', props.translateX._endTime, to, appendAnimation);
        }
        if (typeof props.opacity === 'object') {
            let to = addAnimation({ first: true }, 'opacity', 1, props.delay, props.duration, props.opacity, appendAnimation);
            appendFinal('opacity', props.opacity._endTime, to, appendAnimation);
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
    const [iteration, setIteration] = React.useState(0);
    React.useLayoutEffect(() => {
        let r = setInterval(() => {
            setIteration((v) => v + 1);
        }, props.duration);
        return () => clearInterval(r);
    }, []);
    return (
        <XView width={props.width} height={props.height} key={'iter-' + iteration}>
            <VideoRenderer.Provider value={CSSRenderer}>
                {props.children}
            </VideoRenderer.Provider>
        </XView>
    );
});