import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XPopperRender, PopperRendererProps } from './popper/XPopperRender';
import { XPopperArrow } from './popper/XPopperArrow';
import { XPopperContent } from './popper/XPopperContent';

export type Placement = 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';

interface XPopperProps {
    placement?: Placement;

    content: any;
    show?: boolean;
    showOnHover?: boolean;
    showOnHoverContent?: boolean;
    onClickOutside?: () => void;

    padding?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;

    groupId?: string;

    animation?: 'fade' | 'pop' | null;
    animationIn?: 'fade' | 'pop' | null;
    animationOut?: 'fade' | 'pop' | null;
    animationDurationIn?: number;
    animationDurationOut?: number;

    arrow?: any | null;
    contentContainer?: any;
}

interface XPopperState {
    showPopper: boolean;
    willHide: boolean;
    ownMounted: boolean;
}

const PlacementTop = '&[x-placement^="top"]';
const PlacementBottom = '&[x-placement^="bottom"]';
const PlacementRight = '&[x-placement^="right"]';
const PlacementLeft = '&[x-placement^="left"]';

export const XPopperContext = React.createContext<{ invalidate: () => void } | undefined>(undefined);

class XPopperInvalidatorRender extends React.Component<{ invalidate?: () => void }> {
    componentDidUpdate() {
        if (this.props.invalidate) {
            this.props.invalidate();
        }
    }
    render() {
        return null;
    }
}

export const XPopperInvalidator = () => {
    return (
        <XPopperContext.Consumer>
            {(context) => <XPopperInvalidatorRender invalidate={context && context.invalidate} />}
        </XPopperContext.Consumer>
    );
};

export class XPopperGrouped extends React.Component<PopperRendererProps & { parent: XPopper }, { currentPopper: XPopper }> {
    static activePoppers = new Map<string, Set<XPopperGrouped>>();
    static currnetPopper = new Map<string, XPopper>();
    prevAnimation?: string;

    static getGroup(groupId: string) {
        let group = XPopperGrouped.activePoppers[groupId];
        if (group === undefined) {
            group = new Set();
            XPopperGrouped.activePoppers[groupId] = group;
        }
        return group;
    }

    constructor(props: PopperRendererProps & { parent: XPopper }) {
        super(props);
        if (props.groupId) {
            this.state = {
                currentPopper: XPopperGrouped.currnetPopper[props.groupId]
            };
        }

    }

    componentWillUnmount() {
        if (this.props.groupId !== undefined) {
            let group = XPopperGrouped.activePoppers[this.props.groupId];
            if (group === undefined) {
                group = new Set();
                XPopperGrouped.activePoppers[this.props.groupId] = group;
            }
            group.delete(this.props.parent);

        }

    }

    render() {

        let pendingAnimation: 'static' | 'hide' | 'show' = this.props.animation === null ? 'static' : this.props.willHide ? 'hide' : 'show';
        let renderProps = { ...this.props };

        if (renderProps.groupId) {
            let group = XPopperGrouped.getGroup(renderProps.groupId);

            if (!renderProps.willHide) {
                group.add(this);
            } else {
                group.delete(this);
            }

            if (this.props.parent !== this.state.currentPopper) {
                renderProps.show = false;
            }

            if (pendingAnimation === 'show' && (group.size > 1 || renderProps.willHide || renderProps.willHide || this.prevAnimation === 'static')) {
                pendingAnimation = 'static';
            }
        }

        this.prevAnimation = pendingAnimation;

        renderProps.animationClass = pendingAnimation;

        return (
            <XPopperRender {...renderProps} />
        );

    }
}

export class XPopper extends React.Component<XPopperProps, XPopperState> {

    static PlacementTop = PlacementTop;
    static PlacementBottom = PlacementBottom;
    static PlacementRight = PlacementRight;
    static PlacementLeft = PlacementLeft;

    static Invalidator = XPopperInvalidator;

    static Arrow = XPopperArrow;
    static Content = XPopperContent;

    private _popper?: PopperJS;
    private _node?: Element;
    private _targetNode?: Element;
    private _arrowNode?: Element;
    private _contentNode?: Element;

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
            <XPopperArrow />
        ) : props.arrow === null ? null : props.arrow;

        this.contentContainer = props.contentContainer === undefined ? (
            <XPopperContent />
        ) : props.contentContainer;
    }

    caputureTargetNode = (node: any | null) => {
        if (node) {
            let newTargetNode = ReactDOM.findDOMNode(node);
            if (newTargetNode !== this._targetNode) {
                this._targetNode = newTargetNode;
                if (this._targetNode && this.props.showOnHover) {
                    this.dispose();
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
                    computeStyle: {
                        gpuAcceleration: false
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
                    if (this._node) {
                        this._node.setAttribute('x-placement', data.placement);
                    }
                    if (this._contentNode) {
                        this._contentNode.setAttribute('x-placement', data.placement);
                    }
                },
                placement: this.props.placement !== undefined ? this.props.placement : 'auto'
            });
            setTimeout(() => {
                if (this._popper) {
                    this._popper.scheduleUpdate();
                }
            });
        }
    }

    onMouseOverContent = () => {
        if (this.props.showOnHoverContent !== false) {
            this.onMouseOverTarget();
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

        if (this.props.groupId) {
            let group = XPopperGrouped.getGroup(this.props.groupId);
            XPopperGrouped.currnetPopper[this.props.groupId] = this;
            for (let item of group) {
                item.setState({ currentPopper: this });
            }
        }
    }

    onMouseOutContent = () => {
        if (this.props.showOnHoverContent !== false) {
            this.onMouseOutTarget();
        }
    }

    onMouseOutTarget = () => {
        if (this.hideTimeout) { clearTimeout(this.hideTimeout); }
        if (this.willHideTimeout) { clearTimeout(this.willHideTimeout); }
        const animationDurationOut = this.props.animation === null ? 0 : this.props.animationDurationOut !== undefined ? this.props.animationDurationOut : 150;

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
        if (this.props.onClickOutside && this._contentNode && !this._contentNode.contains(e.target) && this._targetNode && !this._targetNode.contains(e.target) && (this.props.arrow === null || (this._arrowNode && !this._arrowNode.contains(e.target)))) {
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

    invalidate = () => {
        if (this._popper) {
            this._popper.scheduleUpdate();
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
            content: this.props.content,
            show: this.props.show,
            showOnHover: this.props.showOnHover,

            width: this.props.width,
            height: this.props.height,
            maxWidth: this.props.maxWidth,
            maxHeight: this.props.maxHeight,
            minWidth: this.props.minWidth,
            minHeight: this.props.minHeight,
            marginLeft: this.props.marginLeft,
            marginRight: this.props.marginRight,
            marginTop: this.props.marginTop,
            marginBotto: this.props.marginBottom,

            groupId: this.props.groupId,
            animation: this.props.animation,
            animationIn: this.props.animationIn,
            animationOut: this.props.animationOut,
            animationDurationIn: this.props.animationDurationIn,
            animationDurationOut: this.props.animationDurationOut,

            willHide: this.state.willHide,

            arrow: this.arrow,
            contentContainer: this.contentContainer,
            caputurePopperNode: this.caputurePopperNode,
            caputurePopperArrowNode: this.caputurePopperArrowNode,
            caputurePopperContentNode: this.caputurePopperContentNode,
            onMouseOverContent: this.onMouseOverContent,
            onMouseOutContent: this.onMouseOutContent,
            onMounted: this.captureMounted,
            onUnmounted: this.captureUnmounted
        };

        return (
            <XPopperContext.Provider value={{ invalidate: this.invalidate }}>
                {target}
                {((this.state.showPopper || this.props.show === true) && canUseDOM && this.state.ownMounted && ReactDOM.createPortal(
                    <XPopperGrouped {...renderProps} parent={this} />,
                    document.body
                ))}
            </XPopperContext.Provider>
        );
    }

}
