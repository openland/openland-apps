import * as React from 'react';
import { XPopper2, XPopper2Props, PopperRendererProps, Popper } from './XPopper2';

export class XTooltip2 extends React.Component<XPopper2Props> {

    static activeTooltips = new Set<XTooltip2>();
    static current: XTooltip2;

    prevAnimation?: string;

    TooltipRender = (props: PopperRendererProps) => {

        let pendingAnimation: 'static' | 'hide' | 'show' = props.animated === false ? 'static' : props.willHide ? 'hide' : 'show';

        if (!props.willHide) {
            XTooltip2.activeTooltips.add(this);
            XTooltip2.current = this;
        } else {
            XTooltip2.activeTooltips.delete(this);
        }

        if (pendingAnimation === 'show' && (XTooltip2.activeTooltips.size > 1 || props.willHide || props.willHide || this.prevAnimation === 'static')) {
            pendingAnimation = 'static';
        }

        this.prevAnimation = pendingAnimation;

        props.animationClass = pendingAnimation;

        if (this !== XTooltip2.current) {
            props.show = false;
        }

        return (
            <Popper {...props} />
        );
    }
 
    componentWillUnmount() {
        XTooltip2.activeTooltips.delete(this);
    }

    render() {
        return (
            <XPopper2 {...this.props} show="hover" renderer={this.TooltipRender} />
        );
    }
}