import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import * as classnames from 'classnames';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import ClickOutside from '../../components/Incubator/ClickOutside';
import { XPopperContent } from './XPopperContent';
interface XPopper2SelfProps {
    content: any;
    isVisible?: boolean;
    visibleOnHover?: boolean;
    animated?: boolean;
    padding?: { left?: number | string, top?: number | string, right?: number | string, bottom?: number | string } | number | string;
    width?: number;
    groupId?: string;
    animationDuration?: number;
    contentCardStyle?: boolean;
}

interface XPopper2State {
    showPopper: boolean;
    willHide: boolean;
}

export interface PopperRendererProps extends XPopper2SelfProps, XPopper2State {
    animationClass?: 'static' | 'hide' | 'show';
    caputurePopperArrowNode: (node: any) => void;
    caputurePopperNode: (node: any) => void;
    onMouseOverTarget: () => void;
    onMouseOutTarget: () => void;
}

export interface XPopper2Props extends XPopper2SelfProps, Popper.PopperOptions {

}

export class XPopper2 extends React.Component<XPopper2Props, XPopper2State> {

    private _popper: PopperJS;
    private _node: Element;
    private _targetNode: Element;
    private _arrowNode: Element;

    hideTimeout: any;
    willHideTimeout: any;

    constructor(props: XPopper2Props) {
        super(props);

        this.state = {
            showPopper: this.props.isVisible === true,
            willHide: false,
        };
    }

    caputureTargetNode = (node: any) => { 
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

    caputurePopperNode = (node: any) => {
        this._node = node;

        this.initPopperIfNeeded();
    }

    caputurePopperArrowNode = (node: any) => {
        this._arrowNode = node;
        this.initPopperIfNeeded();
    }

    initPopperIfNeeded = () => {
        if (this._node && this._arrowNode && this._targetNode) {

            let { children, content, isVisible, animated, padding, contentCardStyle, animationDuration, groupId, visibleOnHover, width, ...popperProps } = this.props;

            this._popper = new PopperJS(this._targetNode, this._node, {
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
        this.setState({ showPopper: true, willHide: false });
    }

    onMouseOutTarget = () => {
        clearTimeout(this.hideTimeout);
        clearTimeout(this.willHideTimeout);
        const animationDuration = this.props.animated === false ? 0 : this.props.animationDuration !== undefined ? this.props.animationDuration : 200;

        this.willHideTimeout = setTimeout(
            () => {
                this.setState({ willHide: true });
            },
            0);
        this.hideTimeout = setTimeout(
            () => {
                this.setState({ showPopper: false });
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

        let renderProps = {
            ...this.props, ...this.state,
            caputurePopperArrowNode: this.caputurePopperArrowNode,
            caputurePopperNode: this.caputurePopperNode,
            onMouseOverTarget: this.onMouseOverTarget,
            onMouseOutTarget: this.onMouseOutTarget,
        };

        return (
            <>
                {target}
                {((this.state.showPopper || this.props.isVisible === true) && canUseDOM && ReactDOM.createPortal(
                    (
                        <XPopperContent {...renderProps} />
                    ),
                    document.body))}
            </>
        );
    }

}