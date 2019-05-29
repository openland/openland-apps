import { useWithWidth } from './useWithWidth';

export const useIsMobile = () => {
    const [width] = useWithWidth();

    return width ? width <= 750 : null;
};
