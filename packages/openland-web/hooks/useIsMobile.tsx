import { useWithWidth } from './useWithWidth';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

export const useIsMobile = () => {
    const [width] = useWithWidth();

    return width ? width <= 750 : null;
};

export const isMobile = () => {
    if (!canUseDOM) {
        return null;
    }

    const width = window.innerWidth;

    return width ? width <= 750 : null;
};
