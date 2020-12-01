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
