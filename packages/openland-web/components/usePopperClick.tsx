import * as React from 'react';
import { XPoperRef } from './XPopper2';

export function usePopperClick(popper: React.RefObject<XPoperRef>) {
    let visible = React.useRef(false);
    const onClick = React.useCallback((event: React.SyntheticEvent<React.MouseEvent<any>>) => {
        if (visible.current) {
            visible.current = false;
            if (popper.current) {
                popper.current.hide();
            }
        } else {
            if (popper.current) {
                visible.current = true;
                popper.current.show(event.target as HTMLElement);
            }
        }
    }, []);

    return { onClick };
}