import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex, extractFlexProps } from './basics/Flex';
import Scrollbars from 'react-custom-scrollbars';

interface PositionValues {
    top: number;
    left: number;
    clientWidth: number;
    clientHeight: number;
    scrollWidth: number;
    scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
}

class ScrollArea extends React.PureComponent<{ onScroll?: (top: number) => void }> {
    state = {
        top: 0,
        scrollHeight: 0
    };

    renderView = ({ style, ...props }: any) => (
        <div className="view custom-scroll-view" style={{ ...style, width: 'calc(100% + 20px)' }} {...props} />
    )

    trackV = ({ style, ...props }: any) => (
        <div
            className="track track-vertical"
            style={{
                ...style,
                top: 0,
                right: 0,
                width: 3,
                height: '100%',
                backgroundColor: '#B8CCEF',
                display: 'block'
            }}
            {...props}
        />
    )

    thumbV = ({ style, ...props }: any) => {
        const {top, scrollHeight} = this.state;
        let topPosition = `${Math.round(top * 100)}%`;
        return (
            <div
                className="thumb thumb-vertical"
                style={{
                    ...style,
                    width: 3,
                    height: 20,
                    top: topPosition,
                    right: 0,
                    display: 'block',
                    backgroundColor: 'red',
                    borderRadius: 50,
                }}
                {...props}
            />
        );
    }

    trackH = ({ style, ...props }: any) => (
        <div className="track track-horizontal" style={{ ...style }} {...props} />
    )

    thumbH = ({ style, ...props }: any) => (
        <div className="thumb thumb-horizontal" style={{ ...style }} {...props} />
    )

    handleUpdate(values: PositionValues) {
        if (this.props.onScroll) {
            this.props.onScroll(values.top);
        }
        if (this.state.top === values.top) {
            return;
        }
        this.setState({
            top: values.top,
            scrollHeight: values.scrollHeight
        });
    }

    render() {
        return (
            <Scrollbars
                renderView={this.renderView}
                renderTrackHorizontal={this.trackH}
                renderThumbHorizontal={this.thumbH}
                renderThumbVertical={this.thumbV}
                renderTrackVertical={this.trackV}
                onUpdate={(values) => this.handleUpdate(values)}
                autoHide={false}
            >
                {this.props.children}
            </Scrollbars>
        );
    }
}

export interface XScrollViewProps extends XFlexStyles {
    flexDirection?: 'row' | 'column';
    className?: string;
    innerRef?: (src: any) => void;
    contentContainerRef?: (ref: any) => void;
    onScroll?: (top: number) => void;
    optimize?: boolean;
}

const ScrollDiv = Glamorous.div<XFlexStyles>([{
    position: 'relative',
    flexDirection: 'column',
    zIndex: 0,
    display: 'flex',
    // '& .thumb-vertical': {
    //     position: 'relative',
    //     display: 'block',
    //     width: '100px',
    //     height: '100%',
    //     cursor: 'pointer',
    //     backgroundColor: '#d9534f'
    // },
    // '& .track-vertical': {
    //     position: 'absolute',
    //     width: 6,
    //     display: 'block !important',
    //     right: 2,
    //     bottom: 2,
    //     top: 2,
    //     borderRadius: 3
    // }
}, applyFlex]);

const ContentDiv = Glamorous.div({
    width: 'calc(100% - 20px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
});

export class XScrollView2 extends React.PureComponent<XScrollViewProps> {
    render() {
        return (
            <ScrollDiv
                className={this.props.className}
                {...extractFlexProps(this.props)}
            >
                <ScrollArea onScroll={this.props.onScroll}>
                    <ContentDiv>
                        {this.props.children}
                    </ContentDiv>
                </ScrollArea>
            </ScrollDiv>
        );
    }
}