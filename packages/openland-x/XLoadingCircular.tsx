import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import Lottie from 'react-lottie';

const data = require('./anim.json');

function Loader(props: { className?: string, inverted?: boolean }) {
    return (
        <div className={props.className}>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: data,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid meet'
                    }
                }}
                width={20}
                height={20}
                isStopped={false}
                isPaused={false}
            />
        </div>
    );
}

export const XLoadingCircular = Glamorous(Loader)({
    display: 'block',
    position: 'absolute',
    width: '20px',
    height: '20px',
    left: 'calc(50% - 10px)',
    top: 'calc(50% - 10px)',
});