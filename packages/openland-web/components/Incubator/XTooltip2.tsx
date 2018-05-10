import * as React from 'react';
import { XPopper2, XPopper2Props, PopperRendererProps, Popper } from './XPopper2';

export class XTooltip2 extends React.Component<XPopper2Props> {

    static activeTooltips = new Set<XTooltip2>();
    static current: XTooltip2;

    prevAnimation?: string;

    constructor(props: XPopper2Props) {
        super(props);
    }

    TooltipRender = (props: PopperRendererProps) => {

        let pendingAnimation: 'static' | 'hide' | 'show' = props.animated === false ? 'static' : props.willHideInstant ? 'hide' : 'show';

        if (!props.willHideInstant) {
            XTooltip2.activeTooltips.add(this);
        } else {
            XTooltip2.activeTooltips.delete(this);
        }

        if (pendingAnimation === 'show' && (XTooltip2.activeTooltips.size > 1 || props.willHide || props.willHideInstant || this.prevAnimation === 'static') ) {
            pendingAnimation = 'static';
        }

        if (pendingAnimation === 'hide' && XTooltip2.activeTooltips.size > 0) {
            props.show = false;
            pendingAnimation = 'static';

        }

        this.prevAnimation = pendingAnimation;

        props.animationClass = pendingAnimation;

        return (
            <Popper {...props} />
        );
    }

    componentWillUnmount() {
        XTooltip2.activeTooltips.delete(this);
    }

    render() {
        return (
            <XPopper2 {...this.props} renderer={this.TooltipRender} />
        );
    }
}