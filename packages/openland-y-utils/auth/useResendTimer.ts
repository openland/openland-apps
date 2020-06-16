import * as React from 'react';

const RESEND_SECONDS = 60;

export const useResendTimer = (props: { onResend: () => void }): [number, () => void] => {
    const [count, setCount] = React.useState(0);
    const [seconds, setSeconds] = React.useState(RESEND_SECONDS);
    const startTime = React.useRef(Date.now());
    React.useEffect(() => {
        let timerId: any;
        startTime.current = Date.now();
        setSeconds(RESEND_SECONDS);
        setTimeout(() => {
            timerId = setInterval(() => {
                setSeconds(x => {
                    let elapsedSeconds = Math.round((Date.now() - startTime.current) / 1000) - 1;
                    if (elapsedSeconds > RESEND_SECONDS) {
                        clearInterval(timerId);
                        return 0;
                    }
                    if (x > 0) {
                        return x > RESEND_SECONDS - elapsedSeconds ? RESEND_SECONDS - elapsedSeconds : x - 1;
                    } else {
                        clearInterval(timerId);
                        return 0;
                    }
                });
            }, 1000);
        }, 500);
        return () => {
            clearInterval(timerId);
        };
    }, [count]);
    const handleResend = () => {
        props.onResend();
        setCount(x => x + 1);
    };

    return [seconds, handleResend];
};
