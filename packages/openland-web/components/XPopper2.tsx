import * as React from 'react';
import Popper, { Placement } from 'popper.js';
import * as ReactDOM from 'react-dom';
import { css } from 'linaria';
import ReactResizeDetector from 'react-resize-detector';

const contentStyle = css`
    position: relative;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 0 1px rgba(136, 152, 170, 0.1), 0 15px 35px 0 rgba(49, 49, 93, 0.1),
        0 5px 15px 0 rgba(0, 0, 0, 0.08);
`;

const arrowStyle = css`
    position: absolute;
    border-style: solid;
    &[x-placement^='top'] {
        border-width: 5px 5px 0 5px;
        border-color: rgba(0, 0, 0, 0.04) transparent transparent transparent;
        bottom: -6px;
    }
    &[x-placement^='top'] > * {
        border-style: solid;
        position: absolute;
        border-width: 5px 5px 0 5px;
        border-color: #fff transparent transparent transparent;
        top: -6px;
        left: -5px;
    }
    &[x-placement^='bottom'] {
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent rgba(0, 0, 0, 0.06) transparent;
        top: -6px;
    }
    &[x-placement^='bottom'] > * {
        border-style: solid;
        position: absolute;
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent #fff transparent;
        bottom: -6px;
        left: -5px;
    }
    &[x-placement^='right'] {
        border-width: 6px 6px 6px 0;
        border-color: transparent rgba(0, 0, 0, 0.04) transparent transparent;
        left: -6px;
    }
    &[x-placement^='right'] > * {
        border-tyle: solid;
        position: absolute;
        border-width: 5px 5px 5px 0px;
        border-color: transparent #fff transparent transparent;
        top: -5px;
        right: -6px;
    }
    &[x-placement^='left'] {
        border-width: 5px 0 5px 5px;
        border-color: transparent transparent transparent rgba(0, 0, 0, 0.04);
        right: -6px;
    }
    &[x-placement^='left'] > * {
        border-style: solid;
        position: absolute;
        border-width: 5px 0 5px 5px;
        border-color: transparent transparent transparent #fff;
        top: -5px;
        left: -6px;
    }
`;

export interface XPopper2Props {
    placement?: Placement;
    className?: string;
    children?: React.ReactNode;
}

export interface XPoperRef {
    show: (element: HTMLElement) => void;
    hide: () => void;
}

export const XPopper2 = React.forwardRef<XPoperRef, XPopper2Props>((props: XPopper2Props, ref) => {
    let [index, setIndex] = React.useState<number>(0);
    let [node, setNode] = React.useState<HTMLElement | undefined>(undefined);
    let [internalNode, setInternalNode] = React.useState<HTMLElement | undefined>(undefined);
    let [arrowNode, setArrowNode] = React.useState<HTMLElement | undefined>(undefined);
    let currentPopper = React.useRef<Popper | undefined>(undefined);

    // Create popper if needed
    React.useLayoutEffect(() => {
        if (node && internalNode && arrowNode) {
            let popper = new Popper(node, internalNode, {
                eventsEnabled: true,
                modifiers: {
                    arrow: {
                        enabled: true,
                        element: arrowNode,
                    },
                    // computeStyle: {
                    //     gpuAcceleration: false
                    // },
                    preventOverflow: {
                        order: 99,
                        boundariesElement: 'viewport',
                        padding: 16,
                    },
                },
                onCreate: (data: Popper.Data) => {
                    console.log(data);
                    if (arrowNode) {
                        arrowNode.setAttribute('x-placement', data.placement);
                    }
                    if (internalNode) {
                        internalNode.setAttribute('x-placement', data.placement);
                    }
                    if (node) {
                        node.setAttribute('x-placement', data.placement);
                    }
                },
                onUpdate: (data: Popper.Data) => {
                    console.log(data);
                    if (arrowNode) {
                        arrowNode.setAttribute('x-placement', data.placement);
                    }
                    if (internalNode) {
                        internalNode.setAttribute('x-placement', data.placement);
                    }
                    if (node) {
                        node.setAttribute('x-placement', data.placement);
                    }
                },
                placement: props.placement ? props.placement : 'auto',
            });
            currentPopper.current = popper;
            return () => {
                currentPopper.current = undefined;
                popper.destroy();
            };
        } else {
            return () => {
                // nothing to do
            };
        }
    }, [node, internalNode, arrowNode, props.placement]);

    let popupRef = React.useCallback((src: HTMLElement | null) => {
        if (src) {
            setInternalNode(src);
        }
    }, []);

    let popupArrowRef = React.useCallback((src: HTMLElement | null) => {
        if (src) {
            setArrowNode(src);
        }
    }, []);

    React.useImperativeHandle(ref, () => ({
        show: (element: HTMLElement) => {
            setNode(element);
            setIndex(index + 1);
        },
        hide: () => {
            setIndex(index + 1);
            setInternalNode(undefined);
            setArrowNode(undefined);
            setNode(undefined);
        },
    }));

    let Component = React.useMemo(() => {
        return () => {
            React.useLayoutEffect(() => {
                if (currentPopper.current) {
                    currentPopper.current.update();
                }
            });
            return (
                <div key={'pop-' + index} ref={popupRef}>
                    <div className={'popper ' + (props.className ? props.className : contentStyle)}>
                        {props.children}
                        {/* <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={() => currentPopper.current && currentPopper.current.scheduleUpdate()} /> */}
                    </div>
                    <div
                        className={arrowStyle}
                        ref={popupArrowRef}
                        style={{ width: 12, height: 6 }}
                    >
                        <div />
                    </div>
                </div>
            );
        };
    }, [props.children]);

    // Render
    if (node) {
        return ReactDOM.createPortal(<Component />, document.body);
    } else {
        return null;
    }
});
