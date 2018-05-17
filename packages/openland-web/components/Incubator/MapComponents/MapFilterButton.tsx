import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from 'openland-x/XPopper';
import { XWithRouter } from 'openland-x-routing/withRouter';

const ConfirmWrapper = Glamorous.div({
    display: 'flex',
    alignSelf: 'flex-start'
});

interface ConfirmPopoverProps {
    handler: Function;
    content: any;
    filterTitle?: string;
    fieldName?: string;
    valueTitleMap?: any;
}

export class FilterButton extends React.Component<ConfirmPopoverProps & XWithRouter, { popper?: boolean }> {
    static active = new Set();

    static closeAll = () => {
        for (let filter of FilterButton.active) {
            filter.handleClose(filter);
        }
    }

    constructor(props: ConfirmPopoverProps & XWithRouter) {
        super(props);

        this.state = {
            popper: false
        };
    }

    handleShow = () => {
        const { popper } = this.state;

        if (popper === true) {
            if (this.props.handler !== undefined) { this.props.handler(false, this); }
            this.setState({
                popper: false
            });
        } else if (popper === false) {
            this.setState({
                popper: true
            });
            if (this.props.handler !== undefined) { this.props.handler(true, this); }
        }

        for (let filter of FilterButton.active) {
            if (filter !== this) {
                filter.handleClose();
            }
        }

        FilterButton.active.add(this);

    }

    handleClose = (self?: any) => {
        let target = (self instanceof FilterButton) ? self : this;
        target.setState({
            popper: false
        });
        FilterButton.active.delete(target);
        if (this.props.handler !== undefined) { this.props.handler(false, target); }
    }

    modifyProps = (component: any) => {
        let res: any = {};

        if (this.props.fieldName) {
            if (component.props.text === undefined) {
                let qargs = this.props.router.query!![this.props.fieldName] ? JSON.parse(this.props.router.query!![this.props.fieldName]) : undefined;
                let buttonText = this.props.filterTitle;
                if (qargs) {
                    let valueTitle = this.props.valueTitleMap && this.props.valueTitleMap[qargs[0]] !== undefined ? this.props.valueTitleMap[qargs[0]] : qargs[0];
                    buttonText = qargs.length === 1 ? valueTitle : buttonText + ' · ' + qargs.length;
                }
                res.text = buttonText;
            }

            if (component.props.style === undefined) {
                res.style = this.props.router.query!![this.props.fieldName] !== undefined ? 'primary' : 'ghost';
            }

        }

        return res;
    }

    onMouseDown = () => {
        this.state.popper ? this.handleClose() : this.handleShow();
    }

    render() {

        let children = [];
        for (let c of React.Children.toArray(this.props.children)) {
            children.push(React.cloneElement(c as any, this.modifyProps(c)));
        }

        return (
            <XPopper content={this.props.content}
                onClickOutside={this.handleClose}
                show={this.state.popper}
                padding={30}
                animation={null}
            >
                <ConfirmWrapper onMouseDown={this.onMouseDown}>
                    {children}
                </ConfirmWrapper>
            </XPopper>
        );
    }
}