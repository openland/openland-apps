import * as React from 'react';
import Glamorous from 'glamorous';
import { XSAnimatedShadowView } from './XSAnimatedShadowView';

const TRANSITION_DURATION = '500ms';

const Container = Glamorous.div({
    transition: 'transform ' + TRANSITION_DURATION + ' cubic-bezier(0.2833, 0.99, 0.31833, 0.99), opacity ' + TRANSITION_DURATION + ' cubic-bezier(0.2833, 0.99, 0.31833, 0.99)', /* iOS Spring Interpolation */
});

export class XSAnimatedView extends React.PureComponent<{ className?: string, shadow: XSAnimatedShadowView }> {

    private element?: HTMLElement;

    private handleInnerRef = (src: any) => {
        if (src) {
            this.element = src;
            this.props.shadow.onPreMount(this.element!!);
        }
    }

    componentDidMount() {
        // For some reason running animations in did mount prevents animations
        requestAnimationFrame(() => { requestAnimationFrame(() => { this.props.shadow.onMount(this.element!!); }); });
    }

    componentWillUnmount() {
        this.props.shadow.onUnmount();
    }

    render() {
        return (<Container innerRef={this.handleInnerRef} className={this.props.className} style={{ opacity: this.props.shadow.opacity }}>{this.props.children}</Container>);
    }
}