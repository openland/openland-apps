import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popper, { Placement } from 'popper.js';

export function usePopper(Contents: string | (() => React.ReactElement<any>), params?: { placement?: Placement }): [any, any] {

    // Node references
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
                placement: params && params.placement ? params.placement : 'auto'
            });
            return () => {
                popper.destroy();
            }
        } else {
            return () => {
                // nothing to do
            };
        }
    }, [node, internalNode]);

    // Handle ref
    let ref = React.useMemo(() => {
        return (src: any) => {
            if (src) {
                setInternalNode(src);
            }
        };
    }, [node]);

    // Target props
    let props = React.useMemo(() => {
        return {
            onClick: (event: React.SyntheticEvent<MouseEvent>) => {
                event.preventDefault();
                if (node) {
                    setInternalNode(undefined);
                    setNode(undefined);
                } else {
                    setInternalNode(undefined);
                    setNode(event.target as HTMLElement);
                }
            }
        }
    }, [node]);

    // Popup render function
    let renderPopup = React.useMemo(() => {
        if (node) {
            if (typeof Contents === 'string') {
                return ReactDOM.createPortal(<div ref={ref}>{Contents}</div>, document.body);
            } else {
                return ReactDOM.createPortal(<div ref={ref}>{Contents()}</div>, document.body);
            }
        }
        return null;
    }, [node]);

    return [props, renderPopup];
}