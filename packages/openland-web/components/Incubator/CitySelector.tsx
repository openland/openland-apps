import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import ClickOutside from './ClickOutside';
import { canUseDOM } from '../../utils/environment';
import { Manager, Target, Popper } from './XPopper';
import { XCloser } from '../X/XCloser';
import XStyles from '../X/XStyles';

const CityTitle = Glamorous.div<{ inverted?: boolean }>((props) => ({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    ...XStyles.text.h600,
    color: props.inverted ? '#f5f6f8' : '#182642',
    borderBottom: props.inverted ? '1px dashed RGBA(245, 246, 248, 0.8)' : '1px dashed RGBA(24, 38, 66, 0.7)',
    '&:hover': {
        color: props.inverted ? 'RGBA(245, 246, 248, 0.7)' : '#6B50FF',
        borderBottom: props.inverted ? '1px dashed RGBA(245, 246, 248, 0.5)' : '1px dashed RGBA(107, 80, 255, 0.8)',
    }
}));

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

const ConfirmWrapper = Glamorous.div({
    display: 'flex',
    alignSelf: 'flex-start'
});

interface ConfirmPopoverProps {
    children: any;
    onConfirm?: Function;
    title?: string;
    inverted?: boolean;
}

export class CitySelector extends React.Component<ConfirmPopoverProps, { class?: string, popper?: boolean }> {
    static Popper = PopperElement;

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

        let popper: any[] = [];
        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (i.props as any)._isPopperElement === true) {
                popper.push(i);
            }
        }

        let popover = (
            <ClickOutside onClickOutside={this.handleClose}>
                <Popper placement="top" class={this.state.class} autoWidth={true}>
                    {popper}
                </Popper>
            </ClickOutside>
        );

        return (
            <XCloser handler={this.handleClose}>
                <Manager>
                    <ConfirmWrapper>
                        <Target>
                            <CityTitle onClick={this.handleShow} inverted={this.props.inverted}>
                                {this.props.title}
                            </CityTitle>
                        </Target>
                        {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popover, document.body)}
                    </ConfirmWrapper>
                </Manager>
            </XCloser>
        );
    }
}