import * as React from 'react';
import Glamorous from 'glamorous';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
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

class ScrollArea extends React.PureComponent<{ onScroll?: (top: number) => void, isCustom: boolean }> {
    state = {
        top: 0,
        scrollHeight: 0,
        clientHeight: 0
    };

    renderView = ({ style, ...props }: any) => (
        <div style={{ ...style, width: 'calc(100% + 20px)' }} {...props} />
    )

    trackV = ({ style, ...props }: any) => (
        <div
            style={{
                ...style,
                top: 0,
                right: 0,
                width: 3,
                height: '100%',
                backgroundColor: 'transparent',
                display: 'block'
            }}
            {...props}
        />
    )

    thumbV = ({ style, ...props }: any) => {
        const { top, scrollHeight, clientHeight } = this.state;
        let t = Math.ceil((top * 100) * 100) / 100;
        let h = Math.round(1 / Math.round(scrollHeight / clientHeight) * 100);
        let topPosition = `${t}%`;
        let scrollH = `${h}%`;
        if (t > (h * 2)) {
            if (t > 60) {
                topPosition = `${t - h}%`;
            } else {
                topPosition = `${t - (h / 2)}%`;
            }
        }
        return (
            <div
                style={{
                    ...style,
                    width: 3,
                    height: scrollH,
                    top: topPosition,
                    right: 0,
                    display: 'block',
                    backgroundColor: 'rgba(23, 144, 255, 0.2)',
                    borderRadius: 50,
                }}
                {...props}
            />
        );
    }

    trackH = ({ style, ...props }: any) => (
        <div style={{ ...style }} {...props} />
    )

    thumbH = ({ style, ...props }: any) => (
        <div style={{ ...style }} {...props} />
    )

    handleUpdate(values: PositionValues) {
        if (this.props.onScroll) {
            this.props.onScroll(values.top);
        }
        if (!this.props.isCustom) {
            return;
        }
        if (this.state.top === values.top) {
            return;
        }
        this.setState({
            top: values.top,
            scrollHeight: values.scrollHeight,
            clientHeight: values.clientHeight
        });
    }

    render() {
        let isCustom = this.props.isCustom;

        let scrollProps = undefined;

        if (isCustom) {
            scrollProps = {
                renderView: this.renderView,
                renderTrackHorizontal: this.trackH,
                renderThumbHorizontal: this.thumbH,
                renderThumbVertical: this.thumbV,
                renderTrackVertical: this.trackV
            };
        }
        return (
            <Scrollbars
                {...scrollProps}
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
    display: 'flex'
}, applyFlex]);

const ContentDiv = Glamorous.div<{ isCustom: boolean }>(props => ({
    width: props.isCustom ? 'calc(100% - 20px)' : '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
}));

export class XScrollView2 extends React.PureComponent<XScrollViewProps> {
    state = {
        isCustom: true
    };

    componentDidMount() {
        if (canUseDOM) {
            let isSafari = (window as any).safari !== undefined;
            let isChrome = (window as any).chrome !== undefined;
            if (isSafari || isChrome) {
                this.setState({
                    isCustom: false
                });
            }
        }
    }

    render() {
        return (
            <ScrollDiv
                className={this.props.className}
                {...extractFlexProps(this.props)}
            >
                <ScrollArea onScroll={this.props.onScroll} isCustom={this.state.isCustom}>
                    <ContentDiv isCustom={this.state.isCustom}>
                        {this.props.children}
                    </ContentDiv>
                </ScrollArea>
            </ScrollDiv>
        );
    }
}