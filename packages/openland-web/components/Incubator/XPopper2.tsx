import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PopperJS from 'popper.js';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import * as classnames from 'classnames';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

const showAnimation = glamor.keyframes({
    '0%': {
        opacity: 0,
    },
    '100%': {
        opacity: 1,
    }
});

const hideAnimation = glamor.keyframes({
    '0%': {
        opacity: 1,
    },
    '100%': {
        opacity: 0,
    }
});

const PopperDiv = Glamorous.div<{ nonePointerEvents?: boolean, autoWidth?: boolean, arrowStyle?: 'default' | 'none'; margin?: { left?: number | string, top?: number | string, right?: number | string, bottom?: number | string } | number | string, show?: boolean }>((props) => ({
    zIndex: 501,

    display: props.show ? undefined : 'none',

    '& .popper .popper-content *': {
        pointerEvents: props.nonePointerEvents ? 'none' : undefined,
        cursor: props.nonePointerEvents ? 'auto' : undefined,
    },
    '&, & .popper': {
        zIndex: 501,

        '> .popper-content, .popper-content': {
            padding: 10,
            background: '#fff',
            maxWidth: props.autoWidth ? 'auto' : 200,
            borderRadius: 4,
            boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
            color: '#525f7f',
            fontSize: 14,
            lineHeight: 'normal',
            fontWeight: 400,
        },

    },

    '& .popper > .arrow': {
        borderStyle: 'solid',
        position: 'absolute',
    },

    '& .popper.hide': {
        animationDuration: '0.2s',
        animationFillMode: 'forwards',
        animationName: `${hideAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    },

    '& .popper.show': {

        animationDuration: '0.2s',
        animationFillMode: 'forwards',
        animationName: `${showAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    },

    '& .popper.static': {
        opacity: 1
    },

    '& .popper[data-placement^="top"], & .popper[x-placement^="top"] .popper-content': {
        marginBottom: 10
    },

    '& .popper[x-placement^="top"] > .arrow': {
        borderWidth: '5px 5px 0 5px',
        borderColor: '#fff transparent transparent transparent',
        bottom: 5,
    },

    '& .popper[data-placement^="bottom"], & .popper[x-placement^="bottom"] .popper-content': {
        marginTop: 10,
    },

    '& .popper[x-placement^="bottom"] > .arrow': {
        borderWidth: '0 5px 5px 5px',
        borderColor: 'transparent transparent #fff transparent',
        top: 5,
    },

    '& .popper[data-placement^="right"], & .popper[x-placement^="right"] .popper-content': {
        marginLeft: 10,
    },

    '& .popper[x-placement^="right"] > .arrow': {
        borderWidth: '5px 5px 5px 0',
        borderColor: 'transparent #fff transparent transparent',
        left: 5,

    },

    '& .popper[data-placement^="left"], & .popper[x-placement^="left"] .popper-content': {
        marginRight: 10,
    },

    '& .popper[x-placement^="left"] > .arrow': {
        borderWidth: '5px 0 5px 5px',
        borderColor: 'transparent transparent transparent #fff',
        right: 5,
    },

    '& .popper[data-x-out-of-boundaries], &[data-x-out-of-boundaries]': {
        display: 'none'
    },

    '& .popper': {
        margin: (typeof props.margin === 'number' || typeof props.margin === 'string') ? props.margin : undefined,
        marginLeft: (props.margin !== undefined && (typeof props.margin !== 'number') && (typeof props.margin !== 'string')) ? props.margin.left : undefined,
        marginTop: (props.margin !== undefined && (typeof props.margin !== 'number') && (typeof props.margin !== 'string')) ? props.margin.top : undefined,
        marginRight: (props.margin !== undefined && (typeof props.margin !== 'number') && (typeof props.margin !== 'string')) ? props.margin.right : undefined,
        marginBottom: (props.margin !== undefined && (typeof props.margin !== 'number') && (typeof props.margin !== 'string')) ? props.margin.bottom : undefined,
    }
}));

class XPopper2SelfProps {
    content: any;
    show?: boolean | 'hover';
    animated?: boolean;
    margin?: { left?: number | string, top?: number | string, right?: number | string, bottom?: number | string } | number | string;
    animationDuration?: number;
    hoverJumpTimeout?: number;
    renderer?: (props: PopperRendererProps) => JSX.Element;
}

class XPopper2State {
    showPopper: boolean;
    willHide: boolean;
    willHideInstant: boolean;
    caputurePopperArrowNode: (node: any) => void;
    caputurePopperNode: (node: any) => void;
    onMouseOverTarget: () => void;
    onMouseOutTarget: () => void;

}

export interface PopperRendererProps extends XPopper2SelfProps, XPopper2State {
    animationClass?: 'static' | 'hide' | 'show';
}

export const Popper = (props: PopperRendererProps) => {
    return (
        <PopperDiv show={props.show !== false} margin={props.margin}>
            <div className={classnames('popper', props.animationClass ? props.animationClass : props.animated === false ? 'static' : props.willHide ? 'hide' : 'show')} ref={props.caputurePopperNode} onMouseOver={props.show === 'hover' ? props.onMouseOverTarget : undefined} onMouseOut={props.show === 'hover' ? props.onMouseOutTarget : undefined}>
                <div className="popper-content">
                    {props.content}
                </div>
                <div className="arrow" ref={props.caputurePopperArrowNode} />

            </div>
        </PopperDiv>
    );
};

export const PopperDefaultRender = (props: PopperRendererProps) => {
    return (
        <Popper {...props} />
    );
};

export interface XPopper2Props extends XPopper2SelfProps, Popper.PopperOptions {

}

export class XPopper2 extends React.Component<XPopper2Props, XPopper2State> {
    private _popper: PopperJS.default;
    private _node: Element;
    private _targetNode: Element;
    private _arrowNode: Element;

    hideTimeout: any;
    willHideTimeout: any;
    willHideInstantTimeout: any;

    constructor(props: XPopper2Props) {
        super(props);

        this.state = {
            showPopper: typeof this.props.show === 'boolean' ? this.props.show : false,
            willHide: false,
            willHideInstant: false,
            caputurePopperArrowNode: this.caputurePopperArrowNode,
            caputurePopperNode: this.caputurePopperNode,
            onMouseOverTarget: this.onMouseOverTarget,
            onMouseOutTarget: this.onMouseOutTarget,

        };
    }

    caputureTargetNode = (node: any) => {

        this._targetNode = ReactDOM.findDOMNode(node);
        if (this._targetNode && this.props.show === 'hover') {
            this.dispose();
            this._targetNode.addEventListener('mouseover', this.onMouseOverTarget);
            this._targetNode.addEventListener('mouseout', this.onMouseOutTarget);
        }

        this.initPopper();
    }

    caputurePopperNode = (node: any) => {
        this._node = node;

        this.initPopper();
    }

    caputurePopperArrowNode = (node: any) => {
        this._arrowNode = node;
        this.initPopper();
    }

    initPopper = () => {
        if (this._node && this._arrowNode && this._targetNode) {
            let constructor = PopperJS.default;

            let { children, content, show, animated, margin, renderer, animationDuration, hoverJumpTimeout, ...popperProps } = this.props;

            this._popper = new constructor(this._targetNode, this._node, {
                modifiers: {
                    arrow: {
                        enabled: true,
                        element: this._arrowNode,
                    },
                    preventOverflow: {
                        boundariesElement: 'viewport'
                    },
                },
                ...popperProps,

            });
            this._popper.scheduleUpdate();
        }
    }

    onMouseOverTarget = () => {
        clearTimeout(this.hideTimeout);
        clearTimeout(this.willHideTimeout);
        clearTimeout(this.willHideInstantTimeout);
        this.setState({ showPopper: true, willHide: false, willHideInstant: false });
    }

    onMouseOutTarget = () => {
        clearTimeout(this.hideTimeout);
        clearTimeout(this.willHideTimeout);
        const hoverJumpTimeout = this.props.hoverJumpTimeout !== undefined ? this.props.hoverJumpTimeout : 50;
        const animationDuration = this.props.animated === false ? 0 : this.props.animationDuration !== undefined ? this.props.animationDuration : 200;
        this.willHideInstantTimeout = setTimeout(
            () => {
                this.setState({ willHideInstant: true });
            },
            0);
        this.willHideTimeout = setTimeout(
            () => {
                this.setState({ willHide: true });
            },
            hoverJumpTimeout);
        this.hideTimeout = setTimeout(
            () => {
                this.setState({ showPopper: false });
            },
            (animationDuration) + hoverJumpTimeout);
    }

    dispose = () => {
        clearTimeout(this.hideTimeout);
        if (this._targetNode) {
            this._targetNode.removeEventListener('mouseover', this.onMouseOverTarget);
            this._targetNode.removeEventListener('mouseout', this.onMouseOutTarget);
        }

        if (this._popper) {
            this._popper.destroy();
        }
    }

    componentWillUnmount() {
        this.dispose();
    }

    render() {
        let target: any = [];

        for (let c of React.Children.toArray(this.props.children)) {
            target.push(React.cloneElement(c as any, { ref: this.caputureTargetNode }));
        }

        let renderProps = { ...this.props, ...this.state };

        return (
            <>
                {target}
                {(this.state.showPopper && canUseDOM && ReactDOM.createPortal(
                    this.props.renderer === undefined ?
                        (
                            <PopperDefaultRender {...renderProps} />
                        ) :
                        this.props.renderer(renderProps),
                    document.body))}
            </>
        );
    }

}