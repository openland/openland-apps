import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import * as classnames from 'classnames';

export interface PopperRendererProps {
    content: any;
    show?: boolean;
    showOnHover?: boolean;

    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;

    groupId?: string;

    animation?: 'fade' | 'pop' | null;
    animationIn?: 'fade' | 'pop' | null;
    animationOut?: 'fade' | 'pop' | null;
    animationDurationIn?: number;
    animationDurationOut?: number;

    arrow?: any | null;
    contentContainer?: any;

    willHide: boolean;

    animationClass?: 'static' | 'hide' | 'show';
    caputurePopperArrowNode: (node: any) => void;
    caputurePopperContentNode: (node: any) => void;
    caputurePopperNode: (node: any) => void;
    onMouseOverContent: () => void;
    onMouseOutContent: () => void;
    onMounted: () => void;
    onUnmounted: () => void;
}

const showAnimation = glamor.keyframes({
    '0%': {
        opacity: 0,
    },
    '100%': {
        opacity: 1,
    }
});

const hideAnimation = glamor.keyframes({
    '0%': {
        opacity: 1,
    },
    '100%': {
        opacity: 0,
    }
});

const showAnimationTop = glamor.keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '50% 60%'
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '50% 60%'
    }
});

const showAnimationBottom = glamor.keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '50% calc(-10% + 11px)'
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '50% calc(-10% + 11px)'
    }
});

const showAnimationRight = glamor.keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '60% 50%'
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '60% 50%'
    }
});

const showAnimationLeft = glamor.keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '40% 50%'
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '40% 50%'
    }
});

const hideAnimationTop = glamor.keyframes({
    '0%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '50% 60%'
    },
    '100%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '50% 60%'
    }
});

const hideAnimationBottom = glamor.keyframes({
    '0%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '50% calc(-10% + 11px)'
    },
    '100%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '50% calc(-10% + 11px)'
    }
});

const hideAnimationRight = glamor.keyframes({
    '0%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '60% 50%'
    },
    '100%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '60% 50%'
    }
});

const hideAnimationLeft = glamor.keyframes({
    '0%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '40% 50%'
    },
    '100%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '40% 50%'
    }
});

const PopperRoot = Glamorous.div<{ animationDurationIn: number, animationDurationOut: number, animationIn: 'fade' | 'pop',  animationOut: 'fade' | 'pop'}>((props) => ({
    '.hide': {
        animationDuration: `${props.animationDurationOut}ms`,
        animationFillMode: 'forwards',
        animationName: `${hideAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    },

    '.show': {
        animationDuration: `${props.animationDurationIn}ms`,
        animationFillMode: 'forwards',
        animationName: `${showAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    },

    '[x-placement^="right"]': {
        '.show': {
            animationName: `${props.animationIn === 'pop' ? showAnimationRight : showAnimation } !important`,
        },
        '.hide': {
            animationName: `${props.animationOut === 'pop' ? hideAnimationRight : hideAnimation } !important`
        }
    },

    '[x-placement^="left"]': {
        '.show': {
            animationName: `${props.animationIn === 'pop' ? showAnimationLeft : showAnimation } !important`,
        },
        '.hide': {
            animationName: `${props.animationOut === 'pop' ? hideAnimationLeft : hideAnimation } !important`
        }
    },

    '[x-placement^="top"]': {
        '.show': {
            animationName: `${props.animationIn === 'pop' ? showAnimationTop : showAnimation } !important`,
        },
        '.hide': {
            animationName: `${props.animationOut === 'pop' ? hideAnimationTop : hideAnimation } !important`
        }
    },

    '[x-placement^="bottom"]': {
        '.show': {
            animationName: `${props.animationIn === 'pop' ? showAnimationBottom : showAnimation } !important`,
        },
        '.hide': {
            animationName: `${props.animationOut === 'pop' ? hideAnimationBottom : hideAnimation } !important`
        }
    },

    '.static': {
        opacity: 1
    },
}));

export class XPopperRender extends React.Component<PopperRendererProps> {

    componentDidMount() {
        this.props.onMounted();
    }

    prepareRef = (element?: any | null, props?: any) => {
        return element ? React.cloneElement(element as any, props) : element;
    }

    render() {

        let animationDurationIn = this.props.animationDurationIn !== undefined ? this.props.animationDurationIn : 150;
        let animationDurationOut = this.props.animationDurationOut !== undefined ? this.props.animationDurationOut : 300;

        return (
            this.props.show !== false ?
                (
                    <PopperRoot
                        className={classnames('popper', this.props.animationClass ? this.props.animationClass : this.props.animation === null ? 'static' : this.props.willHide ? 'hide' : 'show')}
                        animationIn={this.props.animationIn ? this.props.animationIn : this.props.animation ? this.props.animation : 'fade'}
                        animationOut={this.props.animationOut  ? this.props.animationOut : this.props.animation ? this.props.animation : 'fade'}
                        innerRef={this.props.caputurePopperNode}
                        onMouseOver={this.props.showOnHover ? this.props.onMouseOverContent : undefined}
                        onMouseOut={this.props.showOnHover ? this.props.onMouseOutContent : undefined}
                        animationDurationIn={animationDurationIn} animationDurationOut={animationDurationOut}
                    >

                        {this.prepareRef(this.props.contentContainer, {
                            width: this.props.width,
                            height: this.props.height,
                            maxWidth: this.props.maxWidth,
                            maxHeight: this.props.maxHeight,
                            minWidth: this.props.minWidth,
                            minHeight: this.props.minHeight,

                            children: this.props.content,

                            captureContent: this.props.caputurePopperContentNode
                        })}

                        {this.prepareRef(this.props.arrow, {
                            captureArrow: this.props.caputurePopperArrowNode
                        })}
                    </PopperRoot>
                ) : null
        );
    }
}