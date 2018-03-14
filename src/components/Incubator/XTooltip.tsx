import * as React from 'react';
import * as classnames from 'classnames';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import { XIcon } from '../X/XIcon';
import { Manager, Target, Popper, Arrow } from './Popper';

const showAnimation = glamor.keyframes({
    '0%': {
        opacity: 0,
        transform: 'rotateX(90deg)',
    },
    '100%': {
        opacity: 1,
        transform: 'rotateX(0deg)',
    }
});

const hideAnimation = glamor.keyframes({
    '0%': { opacity: 1, display: 'block' },
    '100%': { opacity: 0, display: 'none' }
});

const XTooltipDiv = Glamorous.div({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',

    '& .popper': {
        display: 'none',

        '> .popper-content': {
            padding: 20,
            background: '#fff',
            width: 200,
            borderRadius: 4,
            boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
            color: '#525f7f',
            fontSize: 14,
            lineHeight: 'normal',
            fontWeight: '400',
        }
    },

    '& .popper.hide': {
        display: 'none',
        
        '> .popper-content': {
            animationDuration: '0.11s',
            animationFillMode: 'forwards',
            animationName: `${hideAnimation}`,
            animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
        }
    },

    '& .popper.show': {
        display: 'block',
        zIndex: 5,

        '> .popper-content': {
            animationDuration: '0.3s',
            animationFillMode: 'forwards',
            animationName: `${showAnimation}`,
            animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        }
    },

    '& .popper.static': {
        display: 'block',
        zIndex: 5,
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

const TargetContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    color: '#A7B8C4',
    '> i': {
        fontSize: 18
    }
});

interface XTooltipProps {
    title: string;
}

export class XTooltip extends React.Component<XTooltipProps, { class?: string, modalHover?: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            class: 'hide',
            modalHover: false
        };

        this.modalOver = this.modalOver.bind(this);
        this.modalOut = this.modalOut.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
    }

    modalOver() {
        this.setState({
            class: 'static',
            modalHover: true
        });
    }

    modalOut() {
        this.setState({
            class: 'hide',
            modalHover: false
        });
    }

    mouseOver() {
        this.setState({
            class: 'show',
            modalHover: false
        });
    }

    mouseOut() {
        setTimeout(() => {
            if (this.state.modalHover === true) {
                return;
            } else {
                this.setState({
                    class: 'hide'
                });
            }
        },         250);
    }

    render() {
        return (
            <Manager>
                <XTooltipDiv>
                    <Target
                        componentFactory={(targetProps) => (
                            <TargetContent {...targetProps} style={{}} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                                <XIcon icon="error" />
                            </TargetContent>
                        )}
                    />
                    <Popper
                        placement="top"
                        componentFactory={(popperProps) => (
                            <div {...popperProps} className={classnames('popper', this.state.class)} onMouseOver={this.modalOver} onMouseOut={this.modalOut}>
                                <div className="popper-content">
                                    <>{this.props.title}</>
                                    <Arrow
                                        componentFactory={(arrowProps) => (
                                            <div {...arrowProps} className="popper__arrow" />
                                        )}
                                    />
                                </div>
                            </div>
                        )}
                    />
                </XTooltipDiv>
            </Manager>
        );
    }
}