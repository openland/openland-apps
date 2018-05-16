import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import * as classnames from 'classnames';
import { PopperRendererProps } from '../XPopper';

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

const PopperRoot = Glamorous.div<{ animationDurationIn: number, animationDurationOut: number, show?: boolean }>((props) => ({
    zIndex: 501,

    '&, & .popper': {
        zIndex: 501,
        display: 'none',
    },

    '&, & .popper[x-placement]': {
        display: props.show ? 'block' : 'none',
    },

    '& .popper.hide': {
        animationDuration: `${props.animationDurationOut}ms`,
        animationFillMode: 'forwards',
        animationName: `${hideAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    },

    '& .popper.show': {
        animationDuration: `${props.animationDurationIn}ms`,
        animationFillMode: 'forwards',
        animationName: `${showAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    },
    '& .popper.static': {
        opacity: 1
    },
    '& .popper[data-x-out-of-boundaries], &[data-x-out-of-boundaries]': {
        display: 'none'
    },
}));

export class XPopperRender extends React.Component<PopperRendererProps> {
    static activePoppers = new Map<string, Set<XPopperRender>>();
    static currentPopper = new Map<string, XPopperRender>();
    prevAnimation?: string;

    componentWillUnmount() {
        if (this.props.groupId !== undefined) {
            let group = XPopperRender.activePoppers[this.props.groupId];
            if (group === undefined) {
                group = new Set();
                XPopperRender.activePoppers[this.props.groupId] = group;
            }
            group.delete(this);

            if (XPopperRender.currentPopper[this.props.groupId] === this) {
                XPopperRender.currentPopper[this.props.groupId] = undefined;
            }
        }

    }

    componentDidMount() {
        this.props.onMounted();
    }

    prepareRef = (element?: any | null, props?: any) => {
        return element ? React.cloneElement(element as any, props) : element;
    }

    render() {
        let pendingAnimation: 'static' | 'hide' | 'show' = this.props.animated === false ? 'static' : this.props.willHide ? 'hide' : 'show';
        let renderProps = { ...this.props };

        if (renderProps.groupId !== undefined) {
            let group = XPopperRender.activePoppers[renderProps.groupId];
            if (group === undefined) {
                group = new Set();
                XPopperRender.activePoppers[renderProps.groupId] = group;
            }
            if (!renderProps.willHide) {
                group.add(this);
                XPopperRender.currentPopper[renderProps.groupId] = this;
            } else {
                group.delete(this);
            }

            if (this !== XPopperRender.currentPopper[renderProps.groupId]) {
                renderProps.show = false;
            }

            if (pendingAnimation === 'show' && (group.size > 1 || renderProps.willHide || renderProps.willHide || this.prevAnimation === 'static')) {
                pendingAnimation = 'static';
            }
        }

        this.prevAnimation = pendingAnimation;

        renderProps.animationClass = pendingAnimation;

        let animationDurationIn = this.props.animationDurationIn !== undefined ? this.props.animationDurationIn : 150;
        let animationDurationOut = this.props.animationDurationOut !== undefined ? this.props.animationDurationOut : 300;

        return (
            <PopperRoot show={renderProps.show !== false} animationDurationIn={animationDurationIn} animationDurationOut={animationDurationOut}>
                <div
                    className={classnames('popper', renderProps.animationClass ? renderProps.animationClass : renderProps.animated === false ? 'static' : renderProps.willHide ? 'hide' : 'show')}
                    ref={renderProps.caputurePopperNode}
                    onMouseOver={renderProps.showOnHover ? renderProps.onMouseOverTarget : undefined}
                    onMouseOut={renderProps.showOnHover ? renderProps.onMouseOutTarget : undefined}
                >

                    {this.prepareRef(this.props.contentContainer, {
                        width: this.props.width,
                        height: this.props.height,
                        maxWidth: this.props.maxWidth,
                        maxHeight: this.props.maxHeight,
                        minWidth: this.props.minWidth,
                        minHeight: this.props.minHeight,
                        children: renderProps.content
                    })}

                    {this.props.arrow}
                </div>
            </PopperRoot>
        );
    }
}