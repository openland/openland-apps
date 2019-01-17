import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
export const useWithWidth = () => {
    if (!canUseDOM) {
        return [null];
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

export const useIsMobile = () => {
    const [width] = useWithWidth();
    return [width ? width <= 700 : null];
};
