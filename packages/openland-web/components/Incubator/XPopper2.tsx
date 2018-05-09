import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PopperJS from 'popper.js';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import * as classnames from 'classnames';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

const showAnimationTop = glamor.keyframes({
    '0%': {
        opacity: 0,
        // transform: 'scale(0)',
        // transformOrigin: '50% 60%'
    },
    '100%': {
        opacity: 1,
        // transform: 'scale(1)',
        // transformOrigin: '50% 60%'
    }
});

const showAnimationBottom = glamor.keyframes({
    '0%': {
        opacity: 0,
        // transform: 'scale(0)',
        // transformOrigin: '50% calc(-10% + 11px)'
    },
    '100%': {
        opacity: 1,
        // transform: 'scale(1)',
        // transformOrigin: '50% calc(-10% + 11px)'
    }
});

const showAnimationRight = glamor.keyframes({
    '0%': {
        opacity: 0,
        // transform: 'scale(0)',
        // transformOrigin: '60% 50%'
    },
    '100%': {
        opacity: 1,
        // transform: 'scale(1)',
        // transformOrigin: '60% 50%'
    }
});

const showAnimationLeft = glamor.keyframes({
    '0%': {
        opacity: 0,
        // transform: 'scale(0)',
        // transformOrigin: '40% 50%'
    },
    '100%': {
        opacity: 1,
        // transform: 'scale(1)',
        // transformOrigin: '40% 50%'
    }
});

const hideAnimationTop = glamor.keyframes({
    '0%': {
        opacity: 1,
        // transform: 'scale(1)',
        // transformOrigin: '50% 60%'
    },
    '100%': {
        opacity: 0,
        // transform: 'scale(0)',
        // transformOrigin: '50% 60%'
    }
});

const hideAnimationBottom = glamor.keyframes({
    '0%': {
        opacity: 1,
        // transform: 'scale(1)',
        // transformOrigin: '50% calc(-10% + 11px)'
    },
    '100%': {
        opacity: 0,
        // transform: 'scale(0)',
        // transformOrigin: '50% calc(-10% + 11px)'
    }
});

const hideAnimationRight = glamor.keyframes({
    '0%': {
        opacity: 1,
        // transform: 'scale(1)',
        // transformOrigin: '60% 50%'
    },
    '100%': {
        opacity: 0,
        // transform: 'scale(0)',
        // transformOrigin: '60% 50%'
    }
});

const hideAnimationLeft = glamor.keyframes({
    '0%': {
        opacity: 1,
        // transform: 'scale(1)',
        // transformOrigin: '40% 50%'
    },
    '100%': {
        opacity: 0,
        // transform: 'scale(0)',
        // transformOrigin: '40% 50%'
    }
});

export const PopperDiv = Glamorous.div<{ nonePointerEvents?: boolean, autoWidth?: boolean, arrowStyle?: 'default' | 'none'; }>((props) => ({
    zIndex: 501,
    '& .popper .popper-content *': {
        pointerEvents: props.nonePointerEvents ? 'none' : undefined,
        cursor: props.nonePointerEvents ? 'auto' : undefined,
    },
    '&, & .popper': {
        zIndex: 501,

        '> .popper-content, .popper-content': {
            padding: 10,
            background: '#fff',
            maxWidth: props.autoWidth ? 'auto' : 200,
            borderRadius: 4,
            boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
            color: '#525f7f',
            fontSize: 14,
            lineHeight: 'normal',
            fontWeight: 400,
        },

    },

    '& .popper > .arrow': {
        borderStyle: 'solid',
        position: 'absolute',
    },

    '& .popper.hide': {
        // display: 'block',

        animationDuration: '0.2s',
        animationFillMode: 'forwards',
        animationName: `${hideAnimationTop}`,
        animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    },

    '& .popper.show': {

        animationDuration: '0.2s',
        animationFillMode: 'forwards',
        animationName: `${showAnimationTop}`,
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    },

    '& .popper.static': {
        animationDuration: '0.0002s',
        animationFillMode: 'forwards',
        animationName: `${showAnimationTop}`,
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
    },

    '& .popper[data-placement^="top"], & .popper[x-placement^="top"] .popper-content': {
        marginBottom: 10
    },

    '& .popper[x-placement^="top"] > .arrow': {
        borderWidth: '5px 5px 0 5px',
        borderColor: '#fff transparent transparent transparent',
        bottom: 5,
    },

    '& .popper[data-placement^="bottom"], & .popper[x-placement^="bottom"] .popper-content': {
        marginTop: 10,
        '&.show > .popper-content, &.show': {
            animationName: `${showAnimationBottom} !important`,
        },
        '&.hide > .popper-content, &.hide': {
            animationName: `${hideAnimationBottom} !important`
        }
    },

    '& .popper[x-placement^="bottom"] > .arrow': {
        borderWidth: '0 5px 5px 5px',
        borderColor: 'transparent transparent #fff transparent',
        top: 5,
    },

    '& .popper[data-placement^="right"], & .popper[x-placement^="right"] .popper-content': {
        marginLeft: 10,
        '&.show > .popper-content, &.show': {
            animationName: `${showAnimationRight} !important`,
        },
        '&.hide > .popper-content, &.hide': {
            animationName: `${hideAnimationRight} !important`
        }
    },

    '& .popper[x-placement^="right"] > .arrow': {
        borderWidth: '5px 5px 5px 0',
        borderColor: 'transparent #fff transparent transparent',
        left: 5,

    },

    '& .popper[data-placement^="left"], & .popper[x-placement^="left"] .popper-content': {
        marginRight: 10,
        '&.show > .popper-content, &.show': {
            animationName: `${showAnimationLeft} !important`,
        },
        '&.hide > .popper-content, &.hide': {
            animationName: `${hideAnimationLeft} !important`
        }
    },

    '& .popper[x-placement^="left"] > .arrow': {
        borderWidth: '5px 0 5px 5px',
        borderColor: 'transparent transparent transparent #fff',
        right: 5,
    },

    '& .popper[data-x-out-of-boundaries], &[data-x-out-of-boundaries]': {
        display: 'none'
    }
}));

class XPopper2Props {
    content: any;
    show: boolean;
    animation?: boolean | 'show' | 'hide' | 'static';
}

export class XPopper2 extends React.Component<XPopper2Props & Popper.PopperOptions> {
    private _popper: PopperJS.default;
    private _node: Element;
    private _targetNode: Element;
    private _arrowNode: Element;

    caputureTargetNode = (node: any) => {
        this._targetNode = node;
        this.initPopper();
    }

    caputurePopperNode = (node: any) => {
        this._node = node;
        this.initPopper();
    }

    caputurePopperArrowNode = (node: any) => {
        this._arrowNode = node;
        this.initPopper();
    }

    initPopper = () => {
        if (this._node && this._arrowNode && this._targetNode) {
            this._createPopper();
        }
    }

    _createPopper = () => {

        let constructor = PopperJS.default;

        let {children, content, show, animation, ...popperProps} = this.props;
        
        this._popper = new constructor(this._targetNode, this._node, {
            modifiers: {
                preventOverflow: {
                    boundariesElement: 'viewport'
                },
                arrow: {
                    enabled: true,
                    element: this._arrowNode,
                },
            },
            placement: this.props.placement,
            ...popperProps,
            
        });
        this._popper.scheduleUpdate();

    }

    render() {

        let popper = (
            <PopperDiv
            // nonePointerEvents={props.nonePointerEvents}
            // autoWidth={props.autoWidth}
            // arrowStyle={props.arrowStyle || 'default'} 
            >
                <div className={classnames('popper', this.props.animation !== false ? (this.props.show ? 'static' : 'hide') : 'static')} ref={this.caputurePopperNode} >
                    <div className="popper-content" >
                        {this.props.content}
                    </div>
                    <div className="arrow" ref={this.caputurePopperArrowNode} />

                </div>
            </PopperDiv>
        );

        return (
            <>
                <div ref={this.caputureTargetNode}>
                    {this.props.children}
                </div>
                {(this.props.show && canUseDOM && ReactDOM.createPortal(popper, document.body))}

            </>
        );
    }
}