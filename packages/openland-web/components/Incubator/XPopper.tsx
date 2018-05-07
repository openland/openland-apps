import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PopperJS from 'popper.js';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import * as classnames from 'classnames';

export class Manager extends React.Component {
    static childContextTypes = {
        popperManager: () => {
            return null;
        },
    };

    private _targetNode: Element;

    getChildContext() {
        return {
            popperManager: {
                setTargetNode: this._setTargetNode,
                getTargetNode: this._getTargetNode,
            },
        };
    }

    _setTargetNode = (node: React.ReactNode) => {
        this._targetNode = ReactDOM.findDOMNode(node as any);
    }

    _getTargetNode = () => {
        return this._targetNode;
    }

    render() {
        return this.props.children;
    }
}

interface TargetChildProps {
    ref: React.Ref<any>;
}

interface TargetProps {
    componentFactory: (props: TargetChildProps) => React.ReactNode;
}

class TargetClass extends React.Component<TargetProps> {
    static contextTypes = {
        popperManager: () => {
            return null;
        },
    };

    render() {
        const { popperManager } = this.context;
        const targetRef = (node: React.ReactNode) => {
            if (popperManager != null) {
                popperManager.setTargetNode(node);
            }
        };

        const targetProps = { ref: targetRef };
        return this.props.componentFactory(targetProps);
    }
}

interface PopperChildProps {
    style: any;
    ref: (ref: React.ReactNode) => void;
    'data-placement': string | null;
}

interface PopperProps extends Popper.PopperOptions {
    componentFactory: (popperProps: PopperChildProps) => React.ReactNode;
    updated?: boolean;
}

interface PopperState {
    data: Popper.Data | null;
}

class PopperClass extends React.Component<PopperProps, PopperState> {
    static contextTypes = {
        popperManager: () => {
            return null;
        },
    };

    static childContextTypes = {
        popper: () => {
            return null;
        },
    };

    private _popper: PopperJS.default;
    // private _arrowNode: React.ReactNode;
    private _node: Element;
    private _component: React.ReactNode;

    constructor(props: PopperProps) {
        super(props);

        this.state = {
            data: null,
        };
    }

    // #region Child stuff
    getChildContext() {
        return {
            popper: {
                // setArrowNode: this._setArrowNode,
                getArrowStyle: this._getArrowStyle,
            },
        };
    }

    // _setArrowNode = (node: React.ReactNode) => {
    //     this._arrowNode = node;
    // }

    _getArrowStyle = () => {
        if (!this.state.data || !this.state.data.offsets.arrow) {
            return {};
        } else {
            const { top, left } = this.state.data.offsets.arrow;
            return { top, left };
        }
    }
    // #endregion

    // #region Lifecycle stuff
    shouldComponentUpdate(nextProps: PopperProps, nextState: PopperState) {
        // TODO if some props change, we should re-render
        return true;
    }

    componentDidUpdate(lastProps: PopperProps) {
        // TODO if any of the popper props change, we should destroy and recreate popper
        // {
        //   this._destroyPopper()
        //   this._createPopper()
        // }

        if (this.props.updated === true) {
            this._popper.scheduleUpdate();
        }
    }

    componentWillUnmount() {
        this._destroyPopper();
    }
    // #endregion

    _getTargetNode = () => {
        return this.context.popperManager.getTargetNode();
    }

    _createPopper() {
        const { componentFactory, children, updated, ...popperProps } = this.props;

        let constructor = PopperJS.default;
        // if (constructor == null) {
        //     // Not sure how someone got here but they did... I'm assuming their
        //     // build system isn't using modules, attempting something else
        //     constructor = PopperJSDist;
        // }

        this._popper = new constructor(this._getTargetNode(), this._node, {
            ...popperProps,
            modifiers: {
                ...popperProps.modifiers,
                applyStyle: { enabled: false },
                preventOverflow: {
                    boundariesElement: 'viewport'
                }
                // arrow: {
                //     element: this._arrowNode as any,
                // },
            },
            onUpdate: (data: Popper.Data) => {
                this.setState({ data });
                return data;
            },
        });

        // schedule an update to make sure everything gets positioned correctly
        // after being instantiated
        this._popper.scheduleUpdate();
    }

    _destroyPopper() {
        if (this._popper) {
            this._popper.destroy();
        }
    }

    _setNodeRef = (node: Element) => {
        this._node = node;
        if (this._node) {
            this._createPopper();
        }
    }

    render() {
        const { componentFactory } = this.props;

        this._component = componentFactory({
            style: this.state.data && this.state.data.styles,
            ref: this._setNodeRef,
            'data-placement': this.state.data && this.state.data.placement,
            // ['data-x-out-of-boundaries']: popperHide,
        });

        return this._component;
    }
}

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

export const PopperDiv = Glamorous.div<{ nonePointerEvents?: boolean, autoWidth?: boolean, arrowStyle?: 'default' | 'none'; }>((props) => ({
    zIndex: 501,
    '& .popper .popper-content *': {
        pointerEvents: props.nonePointerEvents ? 'none' : undefined,
        cursor: props.nonePointerEvents ? 'auto' : undefined
    },
    '&, & .popper': {
        display: 'none',
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
        }
    },

    '&, & .popper.hide': {
        display: 'block',

        '> .popper-content, .popper-content.hide': {
            animationDuration: '0.2s',
            animationFillMode: 'forwards',
            animationName: `${hideAnimationTop}`,
            animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
        }
    },

    '&, & .popper.show': {
        display: 'block',

        '> .popper-content, .popper-content.show': {
            animationDuration: '0.2s',
            animationFillMode: 'forwards',
            animationName: `${showAnimationTop}`,
            animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        }
    },

    '&, & .popper.static': {
        display: 'block',

        '> .popper-content, .popper-content.static': {
            animationDuration: '0.000002s',
            animationFillMode: 'forwards',
            animationName: `${showAnimationTop}`,
            animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        }
    },

    '& .popper .popper-content::after, & .popper-content::after': {
        display: 'block',
        content: props.arrowStyle === 'default' ? `''` : undefined,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        position: 'absolute'
    },

    '& .popper[data-placement^="top"], &[x-placement^="top"] .popper-content': {
        marginBottom: 10
    },

    '& .popper[data-placement^="top"] .popper-content::after, &[x-placement^="top"] .popper-content::after': {
        borderWidth: '5px 5px 0 5px',
        borderColor: '#fff transparent transparent transparent',
        bottom: -5,
        left: 'calc(50% - 5px)',
        marginTop: 0,
        marginBottom: 0
    },

    '& .popper[data-placement^="bottom"], &[x-placement^="bottom"] .popper-content': {
        marginTop: 10,
        '&.show > .popper-content, &.show': {
            animationName: `${showAnimationBottom} !important`,
        },
        '&.hide > .popper-content, &.hide': {
            animationName: `${hideAnimationBottom} !important`
        }
    },

    '& .popper[data-placement^="bottom"] .popper-content::after, &[x-placement^="bottom"] .popper-content::after': {
        borderWidth: '0 5px 5px 5px',
        borderColor: 'transparent transparent #fff transparent',
        top: -5,
        left: 'calc(50% - 5px)',
        marginTop: 0,
        marginBottom: 0
    },

    '& .popper[data-placement^="right"], &[x-placement^="right"] .popper-content': {
        marginLeft: 10,
        '&.show > .popper-content, &.show': {
            animationName: `${showAnimationRight} !important`,
        },
        '&.hide > .popper-content, &.hide': {
            animationName: `${hideAnimationRight} !important`
        }
    },

    '& .popper[data-placement^="right"] .popper-content::after, &[x-placement^="right"] .popper-content::after': {
        borderWidth: '5px 5px 5px 0',
        borderColor: 'transparent #fff transparent transparent',
        left: -5,
        top: 'calc(50% - 5px)',
        marginLeft: 0,
        marginRight: 0
    },

    '& .popper[data-placement^="left"], &[x-placement^="left"] .popper-content': {
        marginRight: 10,
        '&.show > .popper-content, &.show': {
            animationName: `${showAnimationLeft} !important`,
        },
        '&.hide > .popper-content, &.hide': {
            animationName: `${hideAnimationLeft} !important`
        }
    },

    '& .popper[data-placement^="left"] .popper-content::after, &[x-placement^="left"] .popper-content::after': {
        borderWidth: '5px 0 5px 5px',
        borderColor: 'transparent transparent transparent #fff',
        right: -5,
        top: 'calc(50% - 5px)',
        marginLeft: 0,
        marginRight: 0
    },

    '& .popper[data-x-out-of-boundaries], &[data-x-out-of-boundaries]': {
        display: 'none'
    }
}));

interface PopperDivProps {
    class?: string;
    children: any;
    onMouseover?: Function;
    onMouseout?: Function;
    nonePointerEvents?: boolean;
    autoWidth?: boolean;
    updated?: boolean;
    arrowStyle?: 'default' | 'none';
    placement: 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';
}

export function Popper(props: PopperDivProps) {
    return (
        <PopperDiv
            nonePointerEvents={props.nonePointerEvents}
            autoWidth={props.autoWidth}
            arrowStyle={props.arrowStyle || 'default'}
        >
            <PopperClass
                updated={props.updated}
                placement={props.placement}
                componentFactory={(popperProps) => (
                    <div {...popperProps} className={classnames('popper', props.class)}>
                        <div className="popper-content" onMouseOver={() => props.onMouseover ? props.onMouseover() : undefined} onMouseOut={() => props.onMouseout ? props.onMouseout() : undefined}>
                            {props.children}
                        </div>
                    </div>
                )}
            />
        </PopperDiv>
    );
}

export function Target(props: { children: any }) {
    return (
        <TargetClass
            componentFactory={(targetProps) => (
                React.Children.map(props.children, child => (
                    React.cloneElement(child as any, { ...targetProps })
                ))
            )}
        />
    );
}