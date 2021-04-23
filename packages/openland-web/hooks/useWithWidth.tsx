import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
export const useWithWidth = (): [number | null, React.Dispatch<React.SetStateAction<number>>] => {
    if (!canUseDOM) {
        return [null, () => { /**/ }];
    }
    const [width, setWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return [width, setWidth];
};

export const useWithHeight = (): [number | null, React.Dispatch<React.SetStateAction<number>>] => {
    if (!canUseDOM) {
        return [null, () => { /**/ }];
    }
    const [height, setHeight] = React.useState(window.innerHeight);
    React.useEffect(() => {
        const handleResize = () => setHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return [height, setHeight];
};
