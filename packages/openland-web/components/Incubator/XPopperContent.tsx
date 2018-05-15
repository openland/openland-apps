import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import * as classnames from 'classnames';
import { PopperRendererProps } from './XPopper2';

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

const ContentHolderArrowMargin = glamor.css({
    display: 'flex',
    alignSelf: 'flex-start',
});

const ContentHolder = Glamorous.div<{ width?: number; }>((props) => ({
    width: props.width !== undefined ? props.width : undefined,
    padding: 10,
    background: '#fff',
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    color: '#525f7f',
    fontSize: 14,
    lineHeight: 'normal',
    fontWeight: 400,
}));

const PopperRoot = Glamorous.div<{ padding?: { left?: number | string, top?: number | string, right?: number | string, bottom?: number | string } | number | string, show?: boolean }>((props) => ({
    zIndex: 501,

    '&, & .popper': {
        zIndex: 501,
        display: 'none',
    },

    '&, & .popper[x-placement]': {
        display: props.show ? 'block' : 'none',
    },

    '& .popper > .arrow': {
        borderStyle: 'solid',
        position: 'absolute',
    },

    '& .popper.hide': {
        animationDuration: '0.2s',
        animationFillMode: 'forwards',
        animationName: `${hideAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    },

    '& .popper.show': {

        animationDuration: '0.2s',
        animationFillMode: 'forwards',
        animationName: `${showAnimation}`,
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    },

    '& .popper.static': {
        opacity: 1
    },

    [`& .popper[data-placement^="top"], & .popper[x-placement^="top"] .${ContentHolderArrowMargin}`]: {
        marginBottom: 10
    },

    '& .popper[x-placement^="top"] > .arrow': {
        borderWidth: '5px 5px 0 5px',
        borderColor: '#fff transparent transparent transparent',
        bottom: 5,
    },

    [`& .popper[data-placement^="bottom"], & .popper[x-placement^="bottom"] .${ContentHolderArrowMargin}`]: {
        marginTop: 10,
    },

    '& .popper[x-placement^="bottom"] > .arrow': {
        borderWidth: '0 5px 5px 5px',
        borderColor: 'transparent transparent #fff transparent',
        top: 5,
    },

    [`& .popper[data-placement^="right"], & .popper[x-placement^="right"] .${ContentHolderArrowMargin}`]: {
        marginLeft: 10,
    },

    '& .popper[x-placement^="right"] > .arrow': {
        borderWidth: '5px 5px 5px 0',
        borderColor: 'transparent #fff transparent transparent',
        left: 5,

    },

    [`& .popper[data-placement^="left"], & .popper[x-placement^="left"] .${ContentHolderArrowMargin}`]: {
        marginRight: 10,
    },

    '& .popper[x-placement^="left"] > .arrow': {
        borderWidth: '5px 0 5px 5px',
        borderColor: 'transparent transparent transparent #fff',
        right: 5,
    },

    '& .popper[data-x-out-of-boundaries], &[data-x-out-of-boundaries]': {
        display: 'none'
    },

    '& .popper': {
        padding: (typeof props.padding === 'number' || typeof props.padding === 'string') ? props.padding : undefined,
        paddingLeft: (props.padding !== undefined && (typeof props.padding !== 'number') && (typeof props.padding !== 'string')) ? props.padding.left : undefined,
        paddingTop: (props.padding !== undefined && (typeof props.padding !== 'number') && (typeof props.padding !== 'string')) ? props.padding.top : undefined,
        paddingRight: (props.padding !== undefined && (typeof props.padding !== 'number') && (typeof props.padding !== 'string')) ? props.padding.right : undefined,
        paddingBottom: (props.padding !== undefined && (typeof props.padding !== 'number') && (typeof props.padding !== 'string')) ? props.padding.bottom : undefined,
    },

    '& .arrow': {
        margin: (typeof props.padding === 'number' || typeof props.padding === 'string') ? props.padding : undefined,
        marginLeft: (props.padding !== undefined && (typeof props.padding !== 'number') && (typeof props.padding !== 'string')) ? props.padding.left : undefined,
        marginTop: (props.padding !== undefined && (typeof props.padding !== 'number') && (typeof props.padding !== 'string')) ? props.padding.top : undefined,
        marginRight: (props.padding !== undefined && (typeof props.padding !== 'number') && (typeof props.padding !== 'string')) ? props.padding.right : undefined,
        marginBottom: (props.padding !== undefined && (typeof props.padding !== 'number') && (typeof props.padding !== 'string')) ? props.padding.bottom : undefined,
    }
}));

export class XPopperContent extends React.Component<PopperRendererProps> {
    static activePoppers = new Map<string, Set<XPopperContent>>();
    static currentPopper = new Map<string, XPopperContent>();
    prevAnimation?: string;

    componentWillUnmount() {
        if (this.props.groupId !== undefined) {
            let group = XPopperContent.activePoppers[this.props.groupId];
            if (group === undefined) {
                group = new Set();
                XPopperContent.activePoppers[this.props.groupId] = group;
            }
            group.delete(this);

            if (XPopperContent.currentPopper[this.props.groupId] === this) {
                XPopperContent.currentPopper[this.props.groupId] = undefined;
            }
        }

    }

    render() {
        let pendingAnimation: 'static' | 'hide' | 'show' = this.props.animated === false ? 'static' : this.props.willHide ? 'hide' : 'show';
        let renderProps = { ...this.props };

        if (renderProps.groupId !== undefined) {
            let group = XPopperContent.activePoppers[renderProps.groupId];
            if (group === undefined) {
                group = new Set();
                XPopperContent.activePoppers[renderProps.groupId] = group;
            }
            if (!renderProps.willHide) {
                group.add(this);
                XPopperContent.currentPopper[renderProps.groupId] = this;
            } else {
                group.delete(this);
            }

            if (this !== XPopperContent.currentPopper[renderProps.groupId]) {
                renderProps.isVisible = false;
            }

            if (pendingAnimation === 'show' && (group.size > 1 || renderProps.willHide || renderProps.willHide || this.prevAnimation === 'static')) {
                pendingAnimation = 'static';
            }
        }

        this.prevAnimation = pendingAnimation;

        renderProps.animationClass = pendingAnimation;

        return (
            <PopperRoot show={renderProps.isVisible !== false} padding={renderProps.padding}>
                <div
                    className={classnames('popper', renderProps.animationClass ? renderProps.animationClass : renderProps.animated === false ? 'static' : renderProps.willHide ? 'hide' : 'show')}
                    ref={renderProps.caputurePopperNode}
                    onMouseOver={renderProps.visibleOnHover ? renderProps.onMouseOverTarget : undefined}
                    onMouseOut={renderProps.visibleOnHover ? renderProps.onMouseOutTarget : undefined}
                >
                    {this.props.contentHolderCss === undefined ? (
                        /// cant use Glamorous div here - selectors stops working (https://github.com/paypal/glamorous/issues/274)
                        <div className={ContentHolderArrowMargin.toString()} >
                            <ContentHolder width={this.props.width}>
                                {renderProps.content}
                            </ContentHolder>
                        </div>
                    ) : this.props.contentHolderCss !== null ? (
                        /// cant use Glamorous div here - selectors stops working (https://github.com/paypal/glamorous/issues/274)
                        <div className={ContentHolderArrowMargin.toString()} style={this.props.contentHolderCss} >
                            {renderProps.content}
                        </div>
                    ) : (
                                /// cant use Glamorous div here - selectors stops working (https://github.com/paypal/glamorous/issues/274)
                                <div className={ContentHolderArrowMargin.toString()} >
                                    {renderProps.content}
                                </div>
                            )}

                    <div className="arrow" ref={renderProps.caputurePopperArrowNode} />
 
                </div>
            </PopperRoot >
        );
    }
}