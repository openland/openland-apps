import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import ClickOutside from '../ClickOutside';
import { canUseDOM } from '../../../utils/environment';
import { Manager, Target, Popper } from '../XPopper';
import { XCloser } from '../../X/XCloser';

const PopperComponent = Glamorous.div({
    '& .popper[data-placement^="bottom"]': {
        marginTop: '30px !important',
    },
    '& .popper .popper-content': {
        padding: '18px !important'
    }
});

class PopperElement extends React.Component<({ children: any })> {
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

class TargetElement extends React.Component<({ children: any, onClick?: () => void })> {
    static defaultProps = {
        _isTargetElement: true
    };
    render() {
        return (
            <>
                {React.cloneElement(this.props.children as any, { onClick: this.props.onClick })}
            </>
        );
    }
}

const ConfirmWrapper = Glamorous.div({
    display: 'flex',
    alignSelf: 'flex-start'
});

interface ConfirmPopoverProps {
    children: any;
    onConfirm?: Function;
    title?: string;
    inverted?: boolean;
    handler?: Function;
}

export class Filter extends React.Component<ConfirmPopoverProps, { class?: string, popper?: boolean }> {
    static Popper = PopperElement;
    static Target = TargetElement;

    constructor(props: ConfirmPopoverProps) {
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
            if (this.props.handler !== undefined) { this.props.handler(false); }
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
            if (this.props.handler !== undefined) { this.props.handler(true); }
        }
    }

    handleClose = () => {
        this.setState({
            class: 'hide',
        });
        if (this.props.handler !== undefined) { this.props.handler(false); }
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

        let popper: any[] = [];
        let target: any[] = [];

        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (i.props as any)._isPopperElement === true) {
                popper.push(i);
            }
        }

        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (i.props as any)._isTargetElement === true) {
                target.push(React.cloneElement(i as any, { onClick: this.handleShow }));
            }
        }

        let popoverComponent = (
            <ClickOutside onClickOutside={this.handleClose}>
                <PopperComponent>
                    <Popper placement="top" class={this.state.class} autoWidth={true} updated={false}>
                        {popper}
                    </Popper>
                </PopperComponent>
            </ClickOutside>
        );

        return (
            <XCloser handler={this.handleClose}>
                <Manager>
                    <ConfirmWrapper>
                        <Target>
                            {target}
                        </Target>
                        {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popoverComponent, document.body)}
                    </ConfirmWrapper>
                </Manager>
            </XCloser>
        );
    }
}