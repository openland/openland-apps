import * as React from 'react';
import { XPopper, XPopperProps } from './XPopper';

export const XPolitePopper = (props: XPopperProps) => {
    // this is to skip initial render
    const [show, setIsShow] = React.useState(false);
    // then we render but content is hidded, to preload popper stuff
    const [preload, setPreload] = React.useState(true);

    const [showPopper, setShowPopper] = React.useState(true);

    React.useLayoutEffect(() => {
        setTimeout(() => {
            setIsShow(true);
            setTimeout(() => {
                setShowPopper(!!props.show);
                setPreload(false);
            }, 100);
        }, 0);
    }, []);

    React.useLayoutEffect(() => {
        if (showPopper !== show) {
            setShowPopper(!!props.show);
        }
    }, [props.show]);

    const content = !show ? null : (
        <div
            style={{
                visibility: preload ? 'hidden' : 'visible',
            }}
        >
            {props.content}
        </div>
    );

    return <XPopper {...props} content={content} show={showPopper} />;
};
