import * as React from 'react';

export const Deferred = React.memo((props: { children?: any }) => {
    let [inited, setInited] = React.useState(false);

    React.useLayoutEffect(() => {
        let active = true;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (active) {
                    setInited(true);
                }
            });
        });

        return () => { active = false; };
    }, []);

    if (inited) {
        return props.children;
    } else {
        return null;
    }
});