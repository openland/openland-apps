import * as React from 'react';
import { throttle } from 'openland-y-utils/timer';

export const useListSelection = (props: { selectedIndex: number, onItemHover: (index: number) => void }) => {
    const [selectionMode, setSelectionMode] = React.useState<'keyboard' | 'mouse'>('mouse');
    const prevIndex = React.useRef(0);
    const handleMouseOver = (index: number) => {
        if (selectionMode === 'keyboard') {
            return;
        }
        prevIndex.current = index;
        props.onItemHover(index);
    };

    React.useEffect(() => {
        const onMouseMove = throttle(() => {
            setSelectionMode('mouse');
        }, 200);
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return {
        selectionMode,
        setSelectionMode,
        handleMouseOver,
        handleMouseMove: handleMouseOver,
    };
};
