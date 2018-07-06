import * as React from 'react';
import { XScrollView } from './XScrollView';
import throttle from 'lodash/throttle';
interface Dimensions {
    scrollTop: number;
    scrollHeight: number;
    offsetHeight: number;
}

export class XScrollViewReversed extends React.Component<{}, { inited: boolean }> {

    state = {
        inited: false
    };

    private lastDimensions: Dimensions | null = null;
    private scroller: HTMLDivElement | null = null;
    private handleScroll = throttle(() => { this.updateDimensions(this.getDimensions()); }, 100);

    private handleRef = (src: any) => {
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

    private restoreScroll = () => {
        if (this.lastDimensions) {
            this.scroller!!.scrollTop = this.lastDimensions.scrollTop;
        } else {
            this.scrollToBottom();
        }
    }
    private handleWindowResize = () => {
        // let container = this.scroller!!.children.item(0).children.item(0);
        // let total = container.childElementCount;
        // for (let i = 0; i < total; i++) {
        //     let item = container.children.item(i);
        //     console.warn(item);
        //     console.warn(item.scrollTop);
        //     console.warn(item.clientTop);
        //     console.warn((item as any).offsetTop);
        // }
        if (this.lastDimensions) {
            let ratio = this.lastDimensions.scrollTop / this.lastDimensions.scrollHeight;
            let nextDimensions = this.getDimensions();
            this.scroller!!.scrollTop = ratio * nextDimensions.scrollHeight;
        } else {
            this.scrollToBottom();
        }
    }

    private updateDimensions = (dimensions: Dimensions) => {
        if (dimensions.scrollHeight === dimensions.scrollTop + dimensions.offsetHeight) {
            // Lock scroll to bottom
            this.lastDimensions = null;
        } else {
            this.lastDimensions = dimensions;
        }
    }

    private getDimensions = () => {
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
        this.setState({ inited: true });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize, false);
    }

    componentDidUpdate() {
        this.restoreScroll();
    }

    render() {
        return (
            <XScrollView innerRef={this.handleRef} onScroll={this.handleScroll} opacity={this.state.inited ? 1 : 0} optimize={true}>
                {this.props.children}
            </XScrollView>
        );
    }
}