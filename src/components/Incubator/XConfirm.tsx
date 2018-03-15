import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classnames from 'classnames';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import ClickOutside from './ClickOutside';
import { canUseDOM } from '../../utils/environment';
import { Manager, Target, Popper, Arrow } from './Popper';
import { XButton } from '../X/XButton';

const showAnimation = glamor.keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '50% calc(100% + 11px)'
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '50% calc(100% + 11px)'
    }
});

const hideAnimation = glamor.keyframes({
    '0%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '50% calc(100% + 11px)'
    },
    '100%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '50% calc(100% + 11px)'
    }
});

const PopperDiv = Glamorous.div({
    '& .popper': {
        display: 'none',
        zIndex: 5,

        '> .popper-content': {
            padding: 10,
            background: '#fff',
            width: 170,
            borderRadius: 4,
            boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
            color: '#525f7f',
            fontSize: 14,
            lineHeight: 'normal',
            fontWeight: '400',
        }
    },

    '& .popper.hide': {
        display: 'block',

        '> .popper-content': {
            animationDuration: '0.2s',
            animationFillMode: 'forwards',
            animationName: `${hideAnimation}`,
            animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
        }
    },

    '& .popper.show': {
        display: 'block',

        '> .popper-content': {
            animationDuration: '0.2s',
            animationFillMode: 'forwards',
            animationName: `${showAnimation}`,
            animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        }
    },

    '& .popper.static': {
        display: 'block',
    },

    '& .popper .popper__arrow': {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        position: 'absolute'
    },

    '& .popper[data-placement^="top"]': {
        marginBottom: 10
    },

    '& .popper[data-placement^="top"] .popper__arrow': {
        borderWidth: '5px 5px 0 5px',
        borderColor: '#fff transparent transparent transparent',
        bottom: -5,
        left: 'calc(50% - 5px)',
        marginTop: 0,
        marginBottom: 0
    },

    '& .popper[data-placement^="bottom"]': {
        marginTop: 10
    },

    '& .popper[data-placement^="bottom"] .popper__arrow': {
        borderWidth: '0 5px 5px 5px',
        borderColor: 'transparent transparent #fff transparent',
        top: -5,
        left: 'calc(50% - 5px)',
        marginTop: 0,
        marginBottom: 0
    },

    '& .popper[data-placement^="right"]': {
        marginLeft: 10
    },

    '& .popper[data-placement^="right"] .popper__arrow': {
        borderWidth: '5px 5px 5px 0',
        borderColor: 'transparent #fff transparent transparent',
        left: -5,
        top: 'calc(50% - 5px)',
        marginLeft: 0,
        marginRight: 0
    },

    '& .popper[data-placement^="left"]': {
        marginRight: 10
    },

    '& .popper[data-placement^="left"] .popper__arrow': {
        borderWidth: '5px 0 5px 5px',
        borderColor: 'transparent transparent transparent #fff',
        right: -5,
        top: 'calc(50% - 5px)',
        marginLeft: 0,
        marginRight: 0
    },

    '& .popper[data-x-out-of-boundaries]': {
        display: 'none'
    }
});

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
            <PopperDiv>
                <Popper
                    placement="top"
                    componentFactory={(popperProps) => (
                        <div {...popperProps} className={classnames('popper', this.state.class)}>
                            <div className="popper-content">
                                <div>
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
                                </div>
                            </div>
                            <Arrow
                                    componentFactory={(arrowProps) => (
                                        <div {...arrowProps} className="popper__arrow" />
                                    )}
                                />
                        </div>
                    )}
                />
            </PopperDiv>
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