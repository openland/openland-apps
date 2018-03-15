import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import ClickOutside from './ClickOutside';
import { canUseDOM } from '../../utils/environment';
import { Manager, Target, Poppover } from './Popper';
import { XButton } from '../X/XButton';

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
        setTimeout(() => {
            this.setState({
                class: 'hide',
                popper: false
            });
        },         200);
    }

    handleClose = (e: any) => {
        this.setState({
            class: 'hide',
        });
        setTimeout(() => {
            this.setState({
                class: 'hide',
                popper: false
            });
        },         200);
    }

    render() {

        let popover = (
            <Poppover placement="top" class={this.state.class}>
                    <div style={{ marginBottom: 6 }}>Confirm action</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <XButton onClick={(e) => {
                            e.preventDefault();
                            this.handleHide();
                        }}>Cancel</XButton>
                        <div style={{ width: 8 }} />
                        <XButton style="important" onClick={(e) => {
                            e.preventDefault();
                            this.props.onConfirm();
                            this.handleHide();
                        }}>Confirm</XButton>
                    </div>
            </Poppover>
        );

        return (
            <ClickOutside onClickOutside={this.handleClose}>
                <Manager>
                    <ConfirmWrapper>
                        <Target
                            componentFactory={(targetProps) => (
                                <div {...targetProps} style={{ display: 'flex' }} onClick={this.handleShow}>
                                    {this.props.children}
                                </div>
                            )}
                        />
                        {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popover, document.body)}
                    </ConfirmWrapper>
                </Manager>
            </ClickOutside>
        );
    }
}