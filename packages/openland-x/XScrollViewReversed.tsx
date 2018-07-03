import * as React from 'react';
import { XScrollView } from './XScrollView';

interface Dimensions {
    scrollTop: number;
    scrollHeight: number;
    offsetHeight: number;
}

export class XScrollViewReversed extends React.Component {

    lastDimensions: Dimensions | null = null;
    scroller: HTMLDivElement | null = null;

    handleRef = (src: any) => {
        if (src !== null) {
            this.scroller = src;
        }
    }

    scrollToBottom = () => {
        if (this.scroller) {
            this.lastDimensions = null;
            this.scroller.scrollTop = this.scroller.scrollHeight;
        }
    }

    restoreScroll = () => {
        if (this.lastDimensions) {
            this.scroller!!.scrollTop = this.lastDimensions.scrollTop;
        } else {
            this.scrollToBottom();
        }
    }

    handleScroll = () => {
        this.updateDimensions(this.getDimensions());
    }

    handleWindowResize = () => {
        if (this.lastDimensions) {
            let ratio = this.lastDimensions.scrollTop / this.lastDimensions.scrollHeight;
            let nextDimensions = this.getDimensions();
            this.scroller!!.scrollTop = ratio * nextDimensions.scrollHeight;
        } else {
            this.scrollToBottom();
        }
    }

    updateDimensions = (dimensions: Dimensions) => {
        if (dimensions.scrollHeight === dimensions.scrollTop + dimensions.offsetHeight) {
            // Lock scroll to bottom
            this.lastDimensions = null;
        } else {
            this.lastDimensions = dimensions;
        }
    }

    getDimensions = () => {
        return {
            scrollTop: this.scroller!.scrollTop,
            scrollHeight: this.scroller!.scrollHeight,
            offsetHeight: this.scroller!.offsetHeight
        };
    }

    componentWillReceiveProps() {
        this.updateDimensions(this.getDimensions());
    }

    componentDidMount() {
        this.restoreScroll();
        window.addEventListener('resize', this.handleWindowResize, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize, false);
    }

    componentDidUpdate() {
        this.restoreScroll();
    }

    render() {
        return (
            <XScrollView innerRef={this.handleRef} onScroll={this.handleScroll}>
                {this.props.children}
            </XScrollView>
        );
    }
}