import * as React from 'react';
import Glamorous from 'glamorous';
import ClickOutside from '../ClickOutside';
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
    stateLocked = false;

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
        if (!this.stateLocked) {
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

    }

    handleClose = (self?: any) => {
        this.stateLocked = true;
        let target = (self instanceof FilterButton) ? self : this;
        if (this.props.handler !== undefined) { this.props.handler(false, target); }
        target.setState({
            popper: false
        });
        FilterButton.active.delete(target);

        // move to next interpreter cicle  - prevent from chaging state before original click handled (posible double handle via Button/ClickOutside) 
        setTimeout(
            () => {
                this.stateLocked = false;
            },
            0);
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

        res.onClick = this.handleShow;

        return res;
    }

    render() {

        let children = [];
        for (let c of React.Children.toArray(this.props.children)) {
            children.push(React.cloneElement(c as any, this.modifyProps(c)));
        }

        return (
            <XPopper content={
                <ClickOutside onClickOutside={this.handleClose}>
                    {this.props.content}
                </ClickOutside>}
                show={this.state.popper}
                padding={30}
                animated={false}
            >
                <ConfirmWrapper>
                    {children}
                </ConfirmWrapper>
            </XPopper>

        );
    }
}