import * as React from 'react';
import Lottie from 'react-lottie';

export function XAnimation(animationData: any) {
    return (props: { className?: string }) => {
        return (
            <div className={props.className}>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: animationData,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid meet'
                        }
                    }}
                    isStopped={false}
                    isPaused={false}
                    // isClickToPauseDisabled={true}
                />
            </div>
        );
    };
}