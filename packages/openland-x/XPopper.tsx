import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XPopperRender } from './popper/XPopperRender';

interface XPopper2SelfProps {
    content: any;
    isVisible?: boolean;
    visibleOnHover?: boolean;
    animated?: boolean;
    padding?: number;
    width?: number;
    groupId?: string;
    animationDuration?: number;
}

interface XPopper2State {
    showPopper: boolean;
    willHide: boolean;
    ownMounted: boolean;
}

export interface PopperRendererProps extends XPopper2SelfProps, XPopper2State {
    animationClass?: 'static' | 'hide' | 'show';
    caputurePopperArrowNode: (node: any) => void;
    caputurePopperContentNode: (node: any) => void;
    caputurePopperNode: (node: any) => void;
    onMouseOverTarget: () => void;
    onMouseOutTarget: () => void;
    onMounted: () => void;
    onUnmounted: () => void;
}

export interface XPopper2Props extends XPopper2SelfProps, Popper.PopperOptions {

}

const PlacementTop = '&[x-placement^="top"]';
const PlacementBottom = '&[x-placement^="bottom"]';
const PlacementRight = '&[x-placement^="right"]';
const PlacementLeft = '&[x-placement^="left"]';

export class XPopper2 extends React.Component<XPopper2Props, XPopper2State> {

    static PlacementTop = PlacementTop;
    static PlacementBottom = PlacementBottom;
    static PlacementRight = PlacementRight;
    static PlacementLeft = PlacementLeft;

    private _popper?: PopperJS;
    private _node: Element;
    private _targetNode: Element;
    private _arrowNode: Element;
    private _contentNode: Element;

    private hideTimeout?: number;
    private willHideTimeout?: number;
    private mounted = false;

    constructor(props: XPopper2Props) {
        super(props);

        this.state = {
            showPopper: this.props.isVisible === true,
            willHide: false,
            ownMounted: false
        };
    }

    caputureTargetNode = (node: any | null) => {
        if (node) {
            let newTargetNode = ReactDOM.findDOMNode(node);
            if (newTargetNode !== this._targetNode) {
                this._targetNode = newTargetNode;
                if (this._targetNode && this.props.visibleOnHover) {
                    this.dispose();
                    // TODO: check if changed
                    this._targetNode.addEventListener('mouseover', this.onMouseOverTarget);
                    this._targetNode.addEventListener('mouseout', this.onMouseOutTarget);
                }
                this.initPopperIfNeeded();
            }
        }
    }
    caputurePopperNode = (node: any | null) => {
        if (node) {
            if (this._node) {
                if (this._popper) {
                    this._popper.destroy();
                    this._popper = undefined;
                }
            }
            this._node = node;
            this.initPopperIfNeeded();
        }
    }

    caputurePopperArrowNode = (node: any | null) => {
        if (node) {
            if (this._arrowNode) {
                if (this._popper) {
                    this._popper.destroy();
                    this._popper = undefined;
                }
            }
            this._arrowNode = node;
            this.initPopperIfNeeded();
        }
    }

    caputurePopperContentNode = (node: any | null) => {
        if (node) {
            if (this._contentNode) {
                if (this._popper) {
                    this._popper.destroy();
                    this._popper = undefined;
                }
            }
            this._contentNode = node;
            this.initPopperIfNeeded();
        }
    }

    captureMounted = () => {
        this.mounted = true;
        this.initPopperIfNeeded();
    }

    componentDidMount() {
        window.setTimeout(() => {
            this.setState({ ownMounted: true });
        });
    }

    captureUnmounted = () => {
        this.mounted = false;
        if (this._popper) {
            this._popper.destroy();
            this._popper = undefined;
        }
    }

    initPopperIfNeeded = () => {
        if (this._node && this._arrowNode && this._targetNode && this._contentNode && this.mounted && !this._popper) {
            let { children, content, isVisible, animated, padding, animationDuration, groupId, visibleOnHover, width, ...popperProps } = this.props;
            this._popper = new PopperJS(this._targetNode, this._node, {
                modifiers: {
                    shift: {
                        order: 100,
                        fn: (data, options: Object) => {
                            if (data.placement === 'top') {
                                data.offsets.popper.top = data.offsets.popper.top - (this.props.padding || 10);
                            } else if (data.placement === 'bottom') {
                                data.offsets.popper.top = data.offsets.popper.top + (this.props.padding || 10);
                            } else if (data.placement === 'left') {
                                data.offsets.popper.left = data.offsets.popper.left - (this.props.padding || 10);
                            } else if (data.placement === 'right') {
                                data.offsets.popper.left = data.offsets.popper.left + (this.props.padding || 10);
                            }
                            return data;
                        }
                    },
                    arrow: {
                        enabled: true,
                        element: this._arrowNode,
                    },
                    preventOverflow: {
                        order: 99,
                        boundariesElement: 'viewport',
                        padding: 10
                    },
                },
                onUpdate: (data: PopperJS.Data) => {
                    this._arrowNode.setAttribute('x-placement', data.placement);
                    this._node.setAttribute('x-placement', data.placement);
                    this._contentNode.setAttribute('x-placement', data.placement);
                },
                ...popperProps,

            });
            setTimeout(() => {
                if (this._popper) {
                    this._popper.scheduleUpdate();
                }
            });
        }
    }

    onMouseOverTarget = () => {
        if (this.hideTimeout) { clearTimeout(this.hideTimeout); }
        if (this.willHideTimeout) { clearTimeout(this.willHideTimeout); }
        this.setState({ showPopper: true, willHide: false }, () => {
            if (this._popper) {
                this._popper.scheduleUpdate();
            }
        });
    }

    onMouseOutTarget = () => {
        if (this.hideTimeout) { clearTimeout(this.hideTimeout); }
        if (this.willHideTimeout) { clearTimeout(this.willHideTimeout); }
        const animationDuration = this.props.animated === false ? 0 : this.props.animationDuration !== undefined ? this.props.animationDuration : 200;

        this.willHideTimeout = window.setTimeout(
            () => {
                this.setState({ willHide: true }, () => {
                    if (this._popper) {
                        this._popper.scheduleUpdate();
                    }
                });
            },
            0);
        this.hideTimeout = window.setTimeout(
            () => {
                this.setState({ showPopper: false }, () => {
                    if (this._popper) {
                        this._popper.scheduleUpdate();
                    }
                });
            },
            (animationDuration));
    }

    dispose = () => {
        clearTimeout(this.hideTimeout);
        if (this._targetNode) {
            this._targetNode.removeEventListener('mouseover', this.onMouseOverTarget);
            this._targetNode.removeEventListener('mouseout', this.onMouseOutTarget);
        }

        if (this._popper) {
            this._popper.destroy();
            this._popper = undefined;
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        this.dispose();
    }

    render() {
        let target: any = [];

        for (let c of React.Children.toArray(this.props.children)) {
            target.push(React.cloneElement(c as any, { ref: this.caputureTargetNode }));
        }

        let renderProps = {
            ...this.props, ...this.state,
            caputurePopperNode: this.caputurePopperNode,
            caputurePopperArrowNode: this.caputurePopperArrowNode,
            caputurePopperContentNode: this.caputurePopperContentNode,
            onMouseOverTarget: this.onMouseOverTarget,
            onMouseOutTarget: this.onMouseOutTarget,
            onMounted: this.captureMounted,
            onUnmounted: this.captureUnmounted
        };

        return (
            <>
                {target}
                {((this.state.showPopper || this.props.isVisible === true) && canUseDOM && this.state.ownMounted && ReactDOM.createPortal(
                    <XPopperRender {...renderProps} />,
                    document.body
                ))}
            </>
        );
    }

}