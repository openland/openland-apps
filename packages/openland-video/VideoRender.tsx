import './all';
import * as React from 'react';
import { VideoRegistry } from './VideoRegistry';
import { css } from 'linaria';
import { TimingDurationContext, TimingShiftContext } from './components/TimingContext';
import { VideoRenderer, VideoRendererInt } from './components/VideoRenderer';
import { Animation, TimingAnimation, SetValueAnimation, SequenceAnimation } from './components/Animation';

const classname = css`
    overflow: hidden;
    display: flex;
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    height: 100%;
`;

function resolveValue(animation: Animation, from: number, time: number): number {
    if (animation instanceof TimingAnimation) {
        if (time <= animation._delay) {
            return from;
        } else if (time >= animation._delay + animation._duration) {
            return animation._to;
        }

        const valueDelta = animation._to - from;
        const progress = animation._easing.interpolate((time - animation._delay) / animation._duration);
        return from + progress * valueDelta;
    } else if (animation instanceof SetValueAnimation) {
        return animation._to;
    } else if (animation instanceof SequenceAnimation) {
        if (animation._animations.length === 0) {
            return from;
        }
        let baseTime = time;
        let baseFrom = from;
        for (let i = 0; i < animation._animations.length; i++) {
            let a = animation._animations[i];
            if (a instanceof TimingAnimation) {
                if (baseTime < a._delay + a._duration) {
                    if (time < a._delay) {
                        return baseFrom;
                    } else {
                        return resolveValue(a, baseFrom, baseTime);
                    }
                }
                baseFrom = a._to;
                baseTime -= a._delay + a._duration;
            } else if (a instanceof SetValueAnimation) {
                baseFrom = a._to;
            } else {
                throw Error('!');
            }
        }
        return animation._to;
    }
    return from;
}

const offlineRenderer: VideoRendererInt = {
    renderView: (props) => {

        let translateX: number | undefined;
        let translateY: number | undefined;
        let opacity: number | undefined;
        if (typeof props.translateY === 'object') {
            translateY = resolveValue(props.translateY, 0, props.time);
        }
        if (typeof props.translateX === 'object') {
            translateX = resolveValue(props.translateX, 0, props.time);
        }
        if (typeof props.opacity === 'object') {
            opacity = resolveValue(props.opacity, 1, props.time);
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
                    opacity: opacity,
                    transform: [
                        translateY !== undefined ? `translateY(${translateY}px)` : undefined,
                        translateX !== undefined ? `translateX(${translateX}px)` : undefined
                    ].filter((v) => !!v).join(',')
                }}
            >
                {props.children}
            </div>
        );
    },
    renderText: (props) => {
        return (
            <span
                style={{
                    color: props.color,
                    fontSize: props.fontSize,
                    lineHeight: props.lineHeight ? `${props.lineHeight}px` : undefined,
                    fontWeight: props.fontWeight as any,
                    fontFamily: props.fontFamily
                }}
            >
                {props.children}
            </span>
        );
    }
};

export const VideoRender = React.memo((props: { name: string }) => {
    const video = React.useMemo(() => VideoRegistry.resolve(props.name), []);
    return (
        <div className={classname}>
            <TimingDurationContext.Provider value={video.duration}>
                <TimingShiftContext.Provider value={0}>
                    <VideoRenderer.Provider value={offlineRenderer}>
                        {video.el}
                    </VideoRenderer.Provider>
                </TimingShiftContext.Provider>
            </TimingDurationContext.Provider>
        </div>
    );
});