import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XPopperRender } from './popper/XPopperRender';
import { XPopperArrow } from './popper/XPopperArrow';
import { XPopperContent } from './popper/XPopperContent';

interface XPopper2SelfProps {
    content: any;
    show?: boolean;
    showOnHover?: boolean;
    onClickOutside?: () => void;

    padding?: number;

    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;

    groupId?: string;

    animated?: boolean;
    arrow?: ((arrowRef: (node: any) => void) => any) | null;
    contentContainer?: (contentRef: (node: any) => void) => any;
}

interface XPopperState {
    showPopper: boolean;
    willHide: boolean;
    ownMounted: boolean;
}

export interface PopperRendererProps extends XPopper2SelfProps, XPopperState {
    animationClass?: 'static' | 'hide' | 'show';
    caputurePopperArrowNode: (node: any) => void;
    caputurePopperContentNode: (node: any) => void;
    caputurePopperNode: (node: any) => void;
    onMouseOverTarget: () => void;
    onMouseOutTarget: () => void;
    onMounted: () => void;
    onUnmounted: () => void;
}

export interface XPopperProps extends XPopper2SelfProps, PopperJS.PopperOptions {

}

const PlacementTop = '&[x-placement^="top"]';
const PlacementBottom = '&[x-placement^="bottom"]';
const PlacementRight = '&[x-placement^="right"]';
const PlacementLeft = '&[x-placement^="left"]';

export class XPopper extends React.Component<XPopperProps, XPopperState> {

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

    private arrow: any | null;
    private contentContainer: any | null;
    constructor(props: XPopperProps) {
        super(props);

        this.state = {
            showPopper: this.props.show === true,
            willHide: false,
            ownMounted: false
        };
        this.arrow = props.arrow === undefined ? (
            <XPopperArrow captureRef={this.caputurePopperArrowNode} />
        ) : props.arrow === null ? null : props.arrow(this.caputurePopperArrowNode);

        this.contentContainer = props.contentContainer === undefined ? (
            <XPopperContent captureRef={this.caputurePopperContentNode} />
        ) : props.contentContainer(this.caputurePopperContentNode);
    }

    caputureTargetNode = (node: any | null) => {
        if (node) {
            let newTargetNode = ReactDOM.findDOMNode(node);
            if (newTargetNode !== this._targetNode) {
                this._targetNode = newTargetNode;
                if (this._targetNode && this.props.showOnHover) {
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

    captureUnmounted = () => {
        this.mounted = false;
        if (this._popper) {
            this._popper.destroy();
            this._popper = undefined;
        }
    }

    initPopperIfNeeded = () => {
        if (this._node && (this.arrow === null || this._arrowNode) && this._targetNode && this._contentNode && this.mounted && !this._popper) {
            let { children, content, show, animated, padding, groupId, showOnHover, width, height, maxWidth, maxHeight, minWidth, minHeight, arrow, contentContainer, onClickOutside, ...popperProps } = this.props;
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
                        enabled: this.arrow !== null,
                        element: this._arrowNode,
                    },
                    preventOverflow: {
                        order: 99,
                        boundariesElement: 'viewport',
                        padding: 10
                    },
                },
                onUpdate: (data: PopperJS.Data) => {
                    if (this._arrowNode) {
                        this._arrowNode.setAttribute('x-placement', data.placement);
                    }
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
        const animationDurationOut = this.props.animated === false ? 0 : 150;

        this.willHideTimeout = window.setTimeout(
            () => {
                this.setState({ willHide: true }, () => {
                    if (this._popper) {
                        this._popper.scheduleUpdate();
                    }
                });
            },
            50);
        this.hideTimeout = window.setTimeout(
            () => {
                this.setState({ showPopper: false }, () => {
                    if (this._popper) {
                        this._popper.scheduleUpdate();
                    }
                });
            },
            (animationDurationOut));
    }

    onMouseDown = (e: any) => {
        if (this.props.onClickOutside && this._contentNode && !this._contentNode.contains(e.target) && this._arrowNode && !this._arrowNode.contains(e.target)) {
            this.props.onClickOutside();
        }
    }

    dispose = () => {
        if (this.hideTimeout) { clearTimeout(this.hideTimeout!); }
        if (this._targetNode) {
            this._targetNode.removeEventListener('mouseover', this.onMouseOverTarget);
            this._targetNode.removeEventListener('mouseout', this.onMouseOutTarget);
        }

        if (this._popper) {
            this._popper.destroy();
            this._popper = undefined;
        }
    }

    componentDidMount() {
        window.setTimeout(() => {
            this.setState({ ownMounted: true });
        });

        if (this.props.onClickOutside) {
            document.addEventListener('mousedown', this.onMouseDown, true);

        }

    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.props.onClickOutside) {
            document.removeEventListener('mousedown', this.onMouseDown, true);
        }
        this.dispose();
    }

    render() {
        let target: any = [];

        for (let c of React.Children.toArray(this.props.children)) {
            target.push(React.cloneElement(c as any, { ref: this.caputureTargetNode }));
        }

        let renderProps = {
            ...this.props, ...this.state,
            arrow: this.arrow,
            contentContainer: this.contentContainer,
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
                {((this.state.showPopper || this.props.show === true) && canUseDOM && this.state.ownMounted && ReactDOM.createPortal(
                    <XPopperRender {...renderProps} />,
                    document.body
                ))}
            </>
        );
    }

}