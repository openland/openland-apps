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

    animated?: boolean;
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

const PopperRoot = Glamorous.div<{ animationDurationIn: number, animationDurationOut: number }>((props) => ({
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
    '.static': {
        opacity: 1
    },
}));

export class XPopperRender extends React.Component<PopperRendererProps> {
    // static activePoppers = new Map<string, Set<XPopperRender>>();
    // static currentPopper = new Map<string, XPopperRender>();
    // prevAnimation?: string;

    // componentWillUnmount() {
    //     if (this.props.groupId !== undefined) {
    //         let group = XPopperRender.activePoppers[this.props.groupId];
    //         if (group === undefined) {
    //             group = new Set();
    //             XPopperRender.activePoppers[this.props.groupId] = group;
    //         }
    //         group.delete(this);

    //         if (XPopperRender.currentPopper[this.props.groupId] === this) {
    //             XPopperRender.currentPopper[this.props.groupId] = undefined;
    //         }
    //     }

    // }

    componentDidMount() {
        this.props.onMounted();
    }

    prepareRef = (element?: any | null, props?: any) => {
        return element ? React.cloneElement(element as any, props) : element;
    }

    render() {
        // let pendingAnimation: 'static' | 'hide' | 'show' = this.props.animated === false ? 'static' : this.props.willHide ? 'hide' : 'show';
        // let renderProps = { ...this.props };

        // if (renderProps.groupId !== undefined) {
        //     let group = XPopperRender.activePoppers[renderProps.groupId];
        //     if (group === undefined) {
        //         group = new Set();
        //         XPopperRender.activePoppers[renderProps.groupId] = group;
        //     }
        //     if (!renderProps.willHide) {
        //         group.add(this);
        //         XPopperRender.currentPopper[renderProps.groupId] = this;
        //     } else {
        //         group.delete(this);
        //     }

        //     if (this !== XPopperRender.currentPopper[renderProps.groupId]) {
        //         renderProps.show = false;
        //     }

        //     if (pendingAnimation === 'show' && (group.size > 1 || renderProps.willHide || renderProps.willHide || this.prevAnimation === 'static')) {
        //         pendingAnimation = 'static';
        //     }
        // }

        // this.prevAnimation = pendingAnimation;

        // renderProps.animationClass = pendingAnimation;

        let animationDurationIn = this.props.animationDurationIn !== undefined ? this.props.animationDurationIn : 150;
        let animationDurationOut = this.props.animationDurationOut !== undefined ? this.props.animationDurationOut : 300;

        return (
            this.props.show !== false ?
                (
                    <PopperRoot
                        className={classnames(this.props.animationClass ? this.props.animationClass : this.props.animated === false ? 'static' : this.props.willHide ? 'hide' : 'show')}
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