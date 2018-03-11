import * as React from 'react';
import * as classnames from 'classnames';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import { XIcon } from '../X/XIcon';
import { Manager, Target, Popper, Arrow } from './Popper';

const showAnimation = glamor.keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
});

const hideAnimation = glamor.keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 }
});

const XTooltipDiv = Glamorous.div({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',

    '& .popper': {
        display: 'none',
        background: '#F5F6F8',
        width: 150,
        borderRadius: 5,
        boxShadow: '0 0 25px rgba(0, 0, 0, 0.3)',
        padding: 10,
        color: '#182642',
        fontSize: 14,
        lineHeight: 'normal',
        fontWeight: 'normal',
        zIndex: 5,
        animationDuration: '0.2s',
        animationFillMode: 'forwards',
    },

    '& .popper.hide': {
        display: 'block',
        animationName: `${hideAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
    },

    '& .popper.show': {
        display: 'block',
        animationName: `${showAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.55, 0, 0.55, 0.2)'
    },

    '& .popper .popper__arrow': {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        position: 'absolute',
    },

    '& .popper[data-placement^="top"]': {
        marginBottom: 5
    },

    '& .popper[data-placement^="top"] .popper__arrow': {
        borderWidth: '5px 5px 0 5px',
        borderColor: '#F5F6F8 transparent transparent transparent',
        bottom: -5,
        left: 'calc(50% - 5px)',
        marginTop: 0,
        marginBottom: 0
    },

    '& .popper[data-placement^="bottom"]': {
        marginTop: 5
    },

    '& .popper[data-placement^="bottom"] .popper__arrow': {
        borderWidth: '0 5px 5px 5px',
        borderColor: 'transparent transparent #F5F6F8 transparent',
        top: -5,
        left: 'calc(50% - 5px)',
        marginTop: 0,
        marginBottom: 0
    },

    '& .popper[data-placement^="right"]': {
        marginLeft: 5
    },

    '& .popper[data-placement^="right"] .popper__arrow': {
        borderWidth: '5px 5px 5px 0',
        borderColor: 'transparent #F5F6F8 transparent transparent',
        left: -5,
        top: 'calc(50% - 5px)',
        marginLeft: 0,
        marginRight: 0
    },

    '& .popper[data-placement^="left"]': {
        marginRight: 5
    },

    '& .popper[data-placement^="left"] .popper__arrow': {
        borderWidth: '5px 0 5px 5px',
        borderColor: 'transparent transparent transparent #F5F6F8',
        right: -5,
        top: 'calc(50% - 5px)',
        marginLeft: 0,
        marginRight: 0
    },

    '.popper[data-x-out-of-boundaries]': {
        display: 'none'
    }
});

const TargetContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    color: '#525f7f;',
    '> i': {
        fontSize: 20
    }
});

interface XTooltipProps {
    title: string;
    icon: string;
}

export class XTooltip extends React.Component<XTooltipProps, { class?: string }> {
    constructor(props: any) {
        super(props);

        this.state = {
            class: ''
        };
    }

    mouseOver() {
        this.setState({
            class: 'show'
        });
    }

    mouseOut() {
        this.setState({
            class: 'hide'
        });
        setTimeout(() => {
            this.setState({
                class: ''
            });
        }, 150);
    }

    render() {
        return (
            <Manager>
                <XTooltipDiv onMouseOver={() => this.mouseOver()} onMouseOut={() => this.mouseOut()} >
                    <Target
                        componentFactory={(targetProps) => (
                            <TargetContent {...targetProps} style={{}}>
                                <XIcon icon={this.props.icon} />
                            </TargetContent>
                        )}
                    />
                    <Popper
                        placement="top"
                        componentFactory={(popperProps) => (
                            <div {...popperProps} className={classnames('popper', this.state.class)}>
                                <>{this.props.title}</>
                                <Arrow
                                    componentFactory={(arrowProps) => (
                                        <div {...arrowProps} className="popper__arrow" />
                                    )}
                                />
                            </div>
                        )}
                    />
                </XTooltipDiv>
            </Manager>
        );
    }
}