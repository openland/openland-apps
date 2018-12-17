import * as React from 'react';
import { XPoperRef } from './XPopper2';

export function usePopperHover(ref: React.RefObject<XPoperRef>) {
    let visible = React.useRef(false);
    const onMouseEnter = React.useCallback((event: React.SyntheticEvent<React.MouseEvent<any>>) => {
        if (!visible.current) {
            if (ref.current) {
                ref.current.show(event.currentTarget as any as HTMLElement);
                visible.current = true;
            }
        }
    }, []);

    const onMouseLeave = React.useCallback((event: React.SyntheticEvent<React.MouseEvent<any>>) => {
        if (visible.current) {
            if (ref.current) {
                ref.current.hide();
                visible.current = false;
            }
        }
    }, []);

    return {
        onMouseEnter,
        onMouseLeave
    }
}