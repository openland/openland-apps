import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import ClickOutside from '../ClickOutside';
import { Manager, Target, Popper } from '../XPopper';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

const PopperComponent = Glamorous.div({
    '& .popper[data-placement^="bottom"]': {
        marginTop: '30px !important',
    },
    '& .popper .popper-content': {
        padding: '18px !important'
    }
});

const ConfirmWrapper = Glamorous.div({
    display: 'flex',
    alignSelf: 'flex-start'
});

interface ConfirmPopoverProps {
    children: any;
    handler: Function;
    content: any;
}

export class Filter extends React.Component<ConfirmPopoverProps, { popper?: boolean }> {
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

        for (let filter of Filter.active) {
            if (filter !== this) {
                filter.handleClose();
            }
        }

        Filter.active.add(this);
    }

    handleClose = (self?: any) => {
        let target = (self instanceof Filter) ? self : this;
        if (this.props.handler !== undefined) { this.props.handler(false, target); }
        target.setState({
            popper: false
        });
        Filter.active.delete(target);
    }

    render() {

        let popoverComponent = (
            <ClickOutside onClickOutside={this.handleClose}>
                <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
                    <PopperComponent>
                        <Popper class="static" autoWidth={true} updated={false}>
                            {this.props.content}
                        </Popper>
                    </PopperComponent>
                </div>
            </ClickOutside>
        );

        let children = [];
        for (let c of React.Children.toArray(this.props.children)) {
            children.push(React.cloneElement(c as any, { onClick: this.handleShow }));
        }

        return (
            <Manager >
                <ConfirmWrapper>
                    <Target>
                        {children}
                    </Target>
                    {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popoverComponent, document.body)}
                </ConfirmWrapper>
            </Manager>
        );
    }
}