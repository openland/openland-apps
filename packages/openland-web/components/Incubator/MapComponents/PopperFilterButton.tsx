import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import ClickOutside from '../ClickOutside';
import { canUseDOM } from '../../../utils/environment';
import { Manager, Target, Popper } from '../XPopper';

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
    handler: Function;
}

export class Filter extends React.Component<ConfirmPopoverProps, { popper?: boolean }> {
    static Popper = PopperElement;
    static Target = TargetElement;
    static active = new Set();

    static closeAll = () => {
        for (let filter of Filter.active) {
            filter.handleClose(filter);
        }
    }

    constructor(props: ConfirmPopoverProps) {
        super(props);

        this.state = {
            popper: false
        };

        this.handleShow = this.handleShow.bind(this);
    }

    handleShow() {
        if (this.state.popper === true) {
            if (this.props.handler !== undefined) { this.props.handler(false, this); }
            this.setState({
                popper: false
            });
        } else {
            this.setState({
                popper: true
            });
            if (this.props.handler !== undefined) { this.props.handler(true, this); }
        }
        for (let filter of Filter.active) {
            if (filter !== this) {
                filter.handleClose();
            }
        }
        Filter.active.add(this);
    }

    handleClose = (self?: any) => {
        let target = (self instanceof Filter) ? self : this;
        if (target.props.handler !== undefined) { target.props.handler(false, target); }
        target.setState({
            popper: false
        });
        Filter.active.delete(target);
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
                <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
                    <PopperComponent>
                        <Popper placement="top" class="static" autoWidth={true} updated={false}>
                            {popper}
                        </Popper>
                    </PopperComponent>
                </div>
            </ClickOutside>
        );

        return (
            <Manager>
                <ConfirmWrapper>
                    <Target>
                        {target}
                    </Target>
                    {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popoverComponent, document.body)}
                </ConfirmWrapper>
            </Manager>
        );
    }
}