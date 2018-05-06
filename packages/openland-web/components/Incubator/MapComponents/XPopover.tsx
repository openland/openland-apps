import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ClickOutside from '../ClickOutside';
import { canUseDOM } from '../../../utils/environment';
import { Manager, Target, Popper } from '../XPopper';

export class PopperElement extends React.Component<({ children: any })> {
    static defaultProps = {
        _isPopperElement: true
    };
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export class TargetElement extends React.Component<({ children: any })> {
    static defaultProps = {
        _isTargetElement: true
    };
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

interface ConfirmPopoverProps {
    children: any;
    placement: 'auto-start'
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
}

export class XPopover extends React.Component<ConfirmPopoverProps, { class?: string, popper?: boolean }> {
    static Target = TargetElement;
    static Content = PopperElement;

    constructor(props: any) {
        super(props);

        this.state = {
            class: 'hide',
            popper: false
        };

        this.handleShow = this.handleShow.bind(this);
    }

    handleShow() {
        if (this.state.popper === true) {
            this.setState({
                class: 'hide',
            });
            setTimeout(
                () => {
                    this.setState({
                        class: '',
                        popper: false
                    });
                },
                200);
        } else {
            this.setState({
                class: 'show',
                popper: true
            });
        }
    }

    handleClose = () => {
        this.setState({
            class: 'hide',
        });
        setTimeout(
            () => {
                this.setState({
                    class: 'hide',
                    popper: false
                });
            },
            200);
    }

    render() {

        let target: any[] = [];
        let popper: any[] = [];

        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (i.props as any)._isTargetElement === true) {
                target.push(i);
            } else if (React.isValidElement(i) && (i.props as any)._isPopperElement === true) {
                popper.push(i);
            }
        }

        let popover = (
            <ClickOutside onClickOutside={this.handleClose}>
                <Popper placement={this.props.placement} class={this.state.class} autoWidth={true} arrowStyle="none">
                    {popper}
                </Popper>
            </ClickOutside>
        );

        return (
            <Manager>
                <Target>
                    <div onClick={this.handleShow}>
                        {target}
                    </div>
                </Target>
                {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popover, document.body)}
            </Manager>
        );
    }
}