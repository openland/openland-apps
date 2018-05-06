import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import ClickOutside from './ClickOutside';
import { Manager, Target, Popper } from './XPopper';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XButton } from 'openland-x/XButton';

const ConfirmWrapper = Glamorous.div({
    display: 'flex',
    alignSelf: 'flex-start'
});

interface ConfirmPopoverProps {
    children: any;
    onConfirm: Function;
}

export class XConfirm extends React.Component<ConfirmPopoverProps, { class?: string, popper?: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            class: 'hide',
            popper: false
        };

        this.handleShow = this.handleShow.bind(this);
    }

    handleShow() {
        this.setState({
            class: 'show',
            popper: true
        });
    }

    handleHide() {
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

    handleClose = (e: any) => {
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

        let popover = (
            <Popper placement="top" class={this.state.class}>
                <div style={{ marginBottom: 6 }}>Confirm action</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <XButton
                        text="Cancel"
                        onClick={(e) => {
                            e.preventDefault();
                            this.handleHide();
                        }}
                    />
                    <div style={{ width: 8 }} />
                    <XButton
                        style="primary"
                        text="Comfirm"
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.onConfirm();
                            this.handleHide();
                        }}
                    />
                </div>
            </Popper>
        );

        return (
            <ClickOutside onClickOutside={this.handleClose}>
                <Manager>
                    <ConfirmWrapper>
                        <Target>
                            <div style={{ display: 'flex' }} onClick={this.handleShow}>
                                {this.props.children}
                            </div>
                        </Target>
                        {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popover, document.body)}
                    </ConfirmWrapper>
                </Manager>
            </ClickOutside>
        );
    }
}