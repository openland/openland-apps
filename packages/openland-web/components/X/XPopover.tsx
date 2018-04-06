import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import { canUseDOM } from '../../utils/environment';
import Popper from 'popper.js';
import * as classnames from 'classnames';

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

const PopperPortal = Glamorous.div({
    '& .popper-content': {
        display: 'none',
        zIndex: 2,
        padding: 10,
        background: '#fff',
        minWidth: 150,
        maxWidth: 200,
        borderRadius: 4,
        boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
        color: '#525f7f',
        fontSize: 14,
        lineHeight: 'normal',
        fontWeight: 400,
    },

    '& .popper-content.hide': {
        display: 'block',
        animationDuration: '0.2s',
        animationFillMode: 'forwards',
        animationName: `${hideAnimationTop}`,
        animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
    },

    '& .popper-content.show': {
        display: 'block',
        animationDuration: '0.2s',
        animationFillMode: 'forwards',
        animationName: `${showAnimationTop}`,
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
    },

    '& .popper-content.static': {
        display: 'block',
    },

    '& .popper-content::after': {
        display: 'block',
        content: `''`,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        position: 'absolute'
    },

    '&[x-placement^="top"] .popper-content': {
        marginBottom: 10
    },

    '&[x-placement^="top"] .popper-content::after': {
        borderWidth: '5px 5px 0 5px',
        borderColor: '#fff transparent transparent transparent',
        bottom: -5,
        left: 'calc(50% - 5px)',
        marginTop: 0,
        marginBottom: 0
    },

    '&[x-placement^="bottom"] .popper-content': {
        marginTop: 10,
        boxShadow: '0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08), 0 0 0 1px rgba(136, 152, 170, .1)',
        '&.show': {
            animationName: `${showAnimationBottom} !important`,
        },
        '&.hide': {
            animationName: `${hideAnimationBottom} !important`
        }
    },

    '&[x-placement^="bottom"] .popper-content::after': {
        borderWidth: '0 5px 5px 5px',
        borderColor: 'transparent transparent #fff transparent',
        top: -5,
        left: 'calc(50% - 5px)',
        marginTop: 0,
        marginBottom: 0
    },

    '&[x-placement^="right"] .popper-content': {
        marginLeft: 10
    },

    '&[x-placement^="right"] .popper-content::after': {
        borderWidth: '5px 5px 5px 0',
        borderColor: 'transparent #fff transparent transparent',
        left: -5,
        top: 'calc(50% - 5px)',
        marginLeft: 0,
        marginRight: 0
    },

    '&[x-placement^="left"] .popper-content': {
        marginRight: 10
    },

    '&[x-placement^="left"] .popper-content::after': {
        borderWidth: '5px 0 5px 5px',
        borderColor: 'transparent transparent transparent #fff',
        right: -5,
        top: 'calc(50% - 5px)',
        marginLeft: 0,
        marginRight: 0
    }
});

export class XPopoverTarget extends React.Component<{ handler?: (target: any) => void }> {
    static defaultProps = {
        _isPopoverTarget: true
    };
    handler = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        this.props.handler!!(e.target);
    }
    render() {
        let child = React.Children.only(this.props.children);
        let cloned = React.cloneElement(child, { onClick: this.handler });
        return cloned;
    }
}

export class XPopoverContent extends React.Component {
    static defaultProps = {
        _isPopoverContent: true
    };
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export type XPopoverPlacement =
    'auto' |
    'top' |
    'bottom' |
    'right' |
    'left' |
    'top-start' |
    'top-end' |
    'bottom-start' |
    'bottom-end' |
    'right-start' |
    'right-end' |
    'left-start' |
    'left-end';

export class XPopover extends React.Component<{ placement?: XPopoverPlacement }, {
    target: any | null, portal: any | null, popper: Popper | null, class?: string
}> {
    static Target = XPopoverTarget;
    static Content = XPopoverContent;

    constructor(props: {}) {
        super(props);
        this.state = {
            target: null,
            portal: null,
            popper: null,
            class: 'hide'
        };
    }

    handler = (target: any) => {
        this.setState((src) => {
            if (src.popper) {
                src.popper.destroy();
            }
            if (src.target === target) {
                return {
                    target: null,
                    popper: null,
                    class: 'hide',
                };
            } else {
                let popper = null;
                if (src.portal) {
                    popper = new Popper(target, src.portal, {
                        placement: this.props.placement || 'auto'
                    });
                }
                return {
                    target: target,
                    popper: popper,
                    class: 'show'
                };
            }
        });
    }

    handlePortal = (e?: any) => {
        this.setState((src) => {
            if (e) {
                let popper = null;
                if (src.target) {
                    popper = new Popper(src.target, e, {
                        placement: this.props.placement || 'auto'
                    });
                }
                return {
                    portal: e,
                    popper: popper,
                    class: 'show'
                };
            } else {
                if (src.popper) {
                    src.popper.destroy();
                }
                return {
                    portal: null,
                    popper: null,
                    class: 'hide'
                };
            }
        });
    }

    handleClick = (e: MouseEvent) => {
        let isInTarget = this.state.target !== undefined && this.state.target !== null && (this.state.target as Node).contains(e.target as Node);
        let isInPortal = this.state.portal !== undefined && this.state.target !== null && (this.state.portal as Node).contains(e.target as Node);
        if (!isInTarget && !isInPortal && this.state.popper) {
            this.setState((src) => {
                if (src.popper) {
                    src.popper.destroy();
                }
                return {
                    popper: null,
                    target: null
                };
            });
        }
    }

    render() {
        let target = React.Children.toArray(this.props.children)
            .find((v) => React.isValidElement(v) && (v.props as any)._isPopoverTarget === true) as React.ReactElement<{ handler?: (target: any) => void }>;
        let content = React.Children.toArray(this.props.children)
            .find((v) => React.isValidElement(v) && (v.props as any)._isPopoverContent === true) as React.ReactElement<{}>;

        if (!target) {
            throw Error('Target must be set!');
        }
        if (!content) {
            throw Error('Content must be set!');
        }

        //
        // Portal's reference callback is expected to be called BEFORE adding to DOM tree and it seems to be true
        // for React.
        //

        let targetClone = React.cloneElement(target as any, { handler: this.handler as any });
        let children = (
            <PopperPortal innerRef={this.handlePortal}>
                <div className={classnames('popper-content', this.state.class)}>
                    {content}
                </div>
            </PopperPortal>
        );

        return (
            <>
                {targetClone}
                {canUseDOM && this.state.target && ReactDOM.createPortal(children, document.body)}
            </>
        );
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, true);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, true);
        if (this.state.popper) {
            this.state.popper.destroy();
        }
    }
}