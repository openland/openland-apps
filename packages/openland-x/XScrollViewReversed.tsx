import * as React from 'react';
import { XScrollView } from './XScrollView';

export class XScrollViewReversed extends React.Component {

    scroller: any | null = null;

    handleRef = (src: any) => {
        if (src !== null) {
            this.scroller = src;
        }
    }

    restoreScroll = () => {
        console.warn(this.scroller);
        this.scroller.scrollTop = this.scroller.scrollHeight;
        // this.scroller.scrollToBottom();
    }

    componentDidMount() {
        this.restoreScroll();
    }

    componentDidUpdate() {
        this.scroller.scrollTop = this.scroller.scrollHeight;
    }

    render() {
        return (
            <XScrollView innerRef={this.handleRef}>
                {this.props.children}
            </XScrollView>
        );
    }
}