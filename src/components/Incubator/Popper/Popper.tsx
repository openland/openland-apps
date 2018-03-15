import * as React from 'react';
import * as PopperJS from 'popper.js';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import * as classnames from 'classnames';
import { Arrow } from './index';

export interface PopperChildProps {
    style: any;
    ref: (ref: React.ReactNode) => void;
    'data-placement': string | null;
}

export interface PopperProps extends Popper.PopperOptions {
    componentFactory: (popperProps: PopperChildProps) => React.ReactNode;
}

export interface PopperState {
    data: Popper.Data | null;
}

export class Popper extends React.Component<PopperProps, PopperState> {
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
    private _arrowNode: React.ReactNode;
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
                setArrowNode: this._setArrowNode,
                getArrowStyle: this._getArrowStyle,
            },
        };
    }

    _setArrowNode = (node: React.ReactNode) => {
        this._arrowNode = node;
    }

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

        this._popper.scheduleUpdate();
    }

    componentWillUnmount() {
        this._destroyPopper();
    }
    // #endregion

    _getTargetNode = () => {
        return this.context.popperManager.getTargetNode();
    }

    _createPopper() {
        const { componentFactory, children, ...popperProps } = this.props;

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
                arrow: {
                    element: this._arrowNode as any,
                },
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
            minWidth: 150,
            maxWidth: 200,
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

interface PopperDivProps {
    class?: string;
    children?: any;
    onMouseover?: Function;
    onMouseout?: Function;
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

export class Poppover extends React.Component<PopperDivProps> {
    constructor(props: PopperDivProps) {
        super(props);
    }
    render() {
        return (
            <PopperDiv>
                <Popper
                    placement={this.props.placement}
                    componentFactory={(popperProps) => (
                        <div {...popperProps} className={classnames('popper', this.props.class)} onMouseOver={() => this.props.onMouseover ? this.props.onMouseover() : undefined}>
                            <div className="popper-content" onMouseOver={() => this.props.onMouseover ? this.props.onMouseover() : undefined} onMouseOut={() => this.props.onMouseout ? this.props.onMouseout() : undefined}>
                                {this.props.children}
                                <Arrow
                                componentFactory={(arrowProps) => (
                                    <div {...arrowProps} className="popper__arrow" onMouseOver={() => this.props.onMouseover ? this.props.onMouseover() : undefined} />
                                )}
                            />
                            </div>
                        </div>
                    )}
                />
            </PopperDiv>
        );
    }
}