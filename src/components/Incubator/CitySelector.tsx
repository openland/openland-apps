import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import ClickOutside from './ClickOutside';
import { canUseDOM } from '../../utils/environment';
import { Manager, Target, Poppover } from './Popper';

const CityTitle = Glamorous.div<{dark?: boolean}>((props) => ({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    color: props.dark ? '#182642' : '#f5f6f8',
    fontSize: '20px',
    fontWeight: 600
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
    dark?: boolean;
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

        let popper: any[] = [];
        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (i.props as any)._isPopperElement === true) {
                popper.push(i);
            }
        }

        let popover = (
            <Poppover placement="top" class={this.state.class}>
                    {popper}
            </Poppover>
        );

        return (
            <ClickOutside onClickOutside={this.handleClose}>
                <Manager>
                    <ConfirmWrapper>
                        <Target
                            componentFactory={(targetProps) => (
                                <CityTitle {...targetProps} onClick={this.handleShow} dark={this.props.dark}>
                                    {this.props.title}
                                </CityTitle>
                            )}
                        />
                        {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popover, document.body)}
                    </ConfirmWrapper>
                </Manager>
            </ClickOutside>
        );
    }
}