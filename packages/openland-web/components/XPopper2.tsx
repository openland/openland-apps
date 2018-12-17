import * as React from 'react';
import Popper, { Placement } from 'popper.js';
import * as ReactDOM from 'react-dom';

export interface XPopper2Props {
    placement?: Placement;
    children?: React.ReactNode;
}

export const XPopper2 = React.forwardRef((props: XPopper2Props, ref) => {
    let [node, setNode] = React.useState<HTMLElement | undefined>(undefined);
    let [internalNode, setInternalNode] = React.useState<HTMLElement | undefined>(undefined);

    // Create popper if needed
    React.useLayoutEffect(() => {
        if (node && internalNode) {
            let popper = new Popper(node, internalNode, {
                modifiers: {
                    computeStyle: {
                        gpuAcceleration: false
                    },
                },
                placement: props.placement ? props.placement : 'auto'
            });
            return () => {
                popper.destroy();
            }
        } else {
            return () => {
                // nothing to do
            };
        }
    }, [node, internalNode, props.placement]);

    let popupRef = React.useCallback((src: HTMLElement | null) => {
        if (src) {
            setInternalNode(src);
        }
    }, []);

    React.useImperativeMethods(ref, () => ({
        show: (element: HTMLElement) => {
            setNode(element);
        },
        hide: () => {
            setInternalNode(undefined);
            setNode(undefined);
        }
    }));

    // Render
    if (node) {
        return ReactDOM.createPortal(<div ref={popupRef}>{props.children}</div>, document.body);
    } else {
        return null;
    }
});