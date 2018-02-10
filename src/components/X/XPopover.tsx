import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { canUseDOM } from '../../utils/environment';
import Popper from 'popper.js';

export class XPopoverTarget extends React.Component<{ handler?: (target: any) => void }> {
    static defaultProps = {
        _isPopoverTarget: true
    }
    handler = (e: React.SyntheticEvent<any>) => {
        this.props.handler!!(e.target);
    }
    render() {
        let child = React.Children.only(this.props.children);
        let cloned = React.cloneElement(child, { onClick: this.handler });
        return cloned;
    }
}

export class XPopoverContent extends React.Component {
    static defaultProps = {
        _isPopoverContent: true
    }
    render() {
        return (
            <>
            {this.props.children}
            </>
        )
    }
}

export class XPopover extends React.Component<{}, {
    target: any | null, portal: any | null, popper: Popper | null
}> {
    static Target = XPopoverTarget;
    static Content = XPopoverContent;

    constructor(props: {}) {
        super(props);
        this.state = { target: null, portal: null, popper: null };
    }

    handler = (target: any) => {
        this.setState((src) => {
            if (src.popper) {
                src.popper.destroy();
            }
            if (src.target === target) {
                return {
                    target: null,
                    popper: null
                }
            } else {
                let popper = null;
                if (src.portal) {
                    popper = new Popper(target, src.portal);
                }
                return {
                    target: target,
                    popper: popper
                }
            }
        });
    }

    handlePortal = (e?: any) => {
        this.setState((src) => {
            console.warn('setState(handlePortal)');
            if (e) {
                let popper = null;
                if (src.target) {
                    popper = new Popper(src.target, e);
                }
                return {
                    portal: e,
                    popper: popper
                }
            } else {
                if (src.popper) {
                    src.popper.destroy();
                }
                return {
                    portal: null,
                    popper: null
                }
            }
        })
    }

    render() {
        let target = React.Children.toArray(this.props.children)
            .find((v) => React.isValidElement(v) && (v.props as any)._isPopoverTarget === true) as React.ReactElement<{ handler?: (target: any) => void }>;
        let content = React.Children.toArray(this.props.children)
            .find((v) => React.isValidElement(v) && (v.props as any)._isPopoverContent === true) as React.ReactElement<{}>;

        if (!target) {
            throw Error('Target must be set!');
        }
        if (!content) {
            throw Error('Content must be set!');
        }

        //
        // Portal's reference callback is expected to be called BEFORE adding to DOM tree and it seems to be true
        // for React.
        //

        let targetClone = React.cloneElement(target as any, { handler: this.handler as any });
        let children = (
            <div ref={this.handlePortal}>
                {content}
            </div>
        );

        return (
            <>
            {targetClone}
            {canUseDOM && this.state.target && ReactDOM.createPortal(children, document.body)}
            </>
        );
    }
}