import * as React from 'react';
import { XPoperRef } from '../components/XPopper2';

export function usePopperHover(ref: React.RefObject<XPoperRef>) {
    let visible = React.useRef<HTMLElement | null>(null);
    const onMouseEnter = React.useCallback((event: React.SyntheticEvent<React.MouseEvent<any>>) => {
        let element = (event.currentTarget as any) as HTMLElement;
        if (!visible.current || visible.current !== element) {
            if (ref.current) {
                visible.current = element;
                ref.current.hide();
                ref.current.show(element);
            }
        }
    }, []);

    const onMouseLeave = React.useCallback((event: React.SyntheticEvent<React.MouseEvent<any>>) => {
        let element = (event.currentTarget as any) as HTMLElement;
        if (visible.current === element) {
            if (ref.current) {
                visible.current = null;
                ref.current.hide();
            }
        }
    }, []);

    return {
        onMouseEnter,
        onMouseLeave,
    };
}
