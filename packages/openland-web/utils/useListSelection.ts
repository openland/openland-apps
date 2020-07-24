import * as React from 'react';
import { throttle } from 'openland-y-utils/timer';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

export const useListSelection = (props: { maxIndex: number }) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const [selectionMode, setSelectionMode] = React.useState<'keyboard' | 'mouse'>('mouse');
    const prevIndex = React.useRef(0);
    const handleMouseOver = (index: number) => {
        if (selectionMode === 'keyboard') {
            return;
        }
        prevIndex.current = index;
        setSelectedIndex(index);
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

    const handleOptionUp = () => {
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return false;
        }
        setSelectionMode('keyboard');
        setSelectedIndex(Math.min(Math.max(selectedIndex - 1, 0), props.maxIndex));
        return false;
    };

    const handleOptionDown = () => {
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return false;
        }
        setSelectionMode('keyboard');
        setSelectedIndex(Math.min(Math.max(selectedIndex + 1, 0), props.maxIndex));
        return false;
    };

    useShortcuts([
        { keys: ['ArrowUp'], callback: handleOptionUp },
        { keys: ['ArrowDown'], callback: handleOptionDown },
    ]);

    return {
        selectedIndex,
        setSelectedIndex,
        selectionMode,
        setSelectionMode,
        handleMouseOver,
        handleMouseMove: handleMouseOver,
    };
};
