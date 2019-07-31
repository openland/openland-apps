import * as React from 'react';

export const Deferred = React.memo((props: { children?: any }) => {
    let [inited, setInited] = React.useState(false);

    // React.useLayoutEffect(() => {
    //     let active = true;

    //     requestAnimationFrame(() => {
    //         if (active) {
    //             requestAnimationFrame(() => {
    //                 if (active) {
    //                     setTimeout(() => {
    //                         if (active) {
    //                             setInited(true);
    //                         }
    //                     }, 10);
    //                 }
    //             });
    //         }
    //     });

    //     return () => { active = false; };
    // }, []);

    // if (inited) {
    //     return props.children;
    // } else {
    //     return null;
    // }
    return props.children;
});