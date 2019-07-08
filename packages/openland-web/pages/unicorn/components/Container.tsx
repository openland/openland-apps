import * as React from 'react';
import { css } from 'linaria';

const body = css`
    width: 100vw;
    height: 100vh;
    background-color: #F0F2F5;
`;

const inner = css`
    overflow-y: scroll;
    display: flex;
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
`;

export const InnerContainer = (props: { children?: any }) => {
    return (
        <div className={inner}>
            {props.children}
        </div>
    );
}

export const Container = (props: { children?: any }) => {
    // React.useLayoutEffect(() => {
    //     let callback = (e: any) => {
    //         console.log(e.target);
    //         if (e.target === document.body) {
    //             e.preventDefault();
    //         }
    //         if (e.target === window) {
    //             e.preventDefault();
    //         }
    //     };
    //     document.body.addEventListener('touchstart', callback, { passive: false });
    //     document.body.addEventListener('touchmove', callback, { passive: false });
    //     window.addEventListener('touchstart', callback, { passive: false });
    //     window.addEventListener('touchmove', callback, { passive: false });

    //     return () => {
    //         document.body.removeEventListener('touchstart', callback);
    //         document.body.removeEventListener('touchmove', callback);
    //         window.removeEventListener('touchstart', callback);
    //         window.removeEventListener('touchmove', callback);
    //     }
    // }, []);
    return (
        <div className={body}>
            <div className={inner}>
                {props.children}
            </div>
        </div>
    );
}