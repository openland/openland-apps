import * as React from 'react';
import { XScrollView } from './XScrollView';
import { XFlexStyles } from './basics/Flex';
import throttle from 'lodash/throttle';
interface Dimensions {
    scrollTop: number;
    scrollHeight: number;
    offsetHeight: number;
}

interface XScrollViewReversedProps extends XFlexStyles {
    getScrollElement?: Function;
    scrollPosition?: (data: number) => void;
}

export class XScrollViewReversed extends React.PureComponent<
    XScrollViewReversedProps,
    {
        inited: boolean;
    }
> {
    state = {
        inited: false,
    };

    private lastDimensions: Dimensions | null = null;
    private scroller: HTMLDivElement | null = null;
    private handleScroll = throttle(() => {
        this.updateDimensions();
    }, 100);

    private handleRef = (src: any) => {
        if (src !== null) {
            if (this.props.getScrollElement) {
                this.scroller = this.props.getScrollElement(src);
                return;
            }

            this.scroller = src;
        }
    };

    scrollToBottom = () => {
        if (this.scroller) {
            this.lastDimensions = null;
            this.scroller.scrollTop = this.scroller.scrollHeight;
        }
    };

    private restoreScroll = () => {
        if (this.lastDimensions) {
            this.scroller!!.scrollTop = this.lastDimensions.scrollTop;
        } else {
            this.scrollToBottom();
        }
    };

    restorePreviousScroll = () => {
        if (this.lastDimensions) {
            this.scroller!!.scrollTop =
                this.scroller!!.scrollHeight -
                (this.lastDimensions.scrollHeight - this.lastDimensions.scrollTop);
        } else {
            this.scrollToBottom();
        }
    };

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
    };

    updateDimensions = () => {
        let dimensions = this.getDimensions();
        if (this.props.scrollPosition) {
            this.props.scrollPosition(
                dimensions.scrollHeight - (dimensions.scrollTop + dimensions.offsetHeight),
            );
        }
        if (dimensions.scrollHeight === dimensions.scrollTop + dimensions.offsetHeight) {
            // Lock scroll to bottom
            this.lastDimensions = null;
        } else {
            this.lastDimensions = dimensions;
        }
    };

    private getDimensions = () => {
        return {
            scrollTop: this.scroller!.scrollTop,
            scrollHeight: this.scroller!.scrollHeight,
            offsetHeight: this.scroller!.offsetHeight,
        };
    };

    componentWillReceiveProps() {
        this.updateDimensions();
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
        let dimensions = this.getDimensions();
        if (this.lastDimensions && this.lastDimensions.scrollHeight !== dimensions.scrollHeight) {
            this.restorePreviousScroll();
        } else {
            this.restoreScroll();
        }
    }

    render() {
        return (
            <XScrollView
                innerRef={this.handleRef}
                onScroll={this.handleScroll}
                opacity={this.state.inited ? 1 : 0}
                optimize={true}
                {...this.props}
            >
                {this.props.children}
            </XScrollView>
        );
    }
}
