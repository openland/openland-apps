import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import { canUseDOM } from '../../utils/environment';
import { Manager, Target, Popper } from './XPopper';
import { XIcon } from '../X/XIcon';

const XTooltipDiv = Glamorous.div<{ marginLeft?: number, marginRight?: number, marginTop?: number, marginBottom?: number, margin?: number, centeredContent?: boolean }>((props) => ({
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    margin: props.margin,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    justifyContent: props.centeredContent ? 'center' : undefined,
    // alignSelf: 'flex-start',
    marginLeft: props.marginLeft !== undefined ? props.marginLeft : 4,
    marginRight: props.marginRight !== undefined ? props.marginRight : 4
    // marginRight: props.noMargin ? 0 : (props.margin ? 4 : (props.leftMargin ? undefined : 6)),
    // marginLeft: props.noMargin ? 0 : (props.margin ? 4 : (props.leftMargin ? 6 : undefined)),
}));

const TargetContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    color: '#A7B8C4',
    '> i': {
        fontSize: 17
    }
});

interface XTooltipProps {
    title?: string;
    marginLeft?: number;
    marginRight?: number;
    margin?: number;
    marginBottom?: number;
    marginTop?: number;
    centeredContent?: boolean;
    placement?: 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';
}

interface XTooltipState {
    class: string;
    showPopover: boolean;
}

class XTooltipContent extends React.Component {
    static defaultProps = {
        _isTooltipContent: true
    };
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

class XTooltipTarget extends React.Component {
    static defaultProps = {
        _isTooltipTarget: true
    };
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export class XTooltip extends React.Component<XTooltipProps, XTooltipState> {
    static Target = XTooltipTarget;
    static Content = XTooltipContent;
    static current?: any;
    static active = new Set();

    timeout: any;
    hovered = false;
    prevClass = 'hide';

    constructor(props: any) {
        super(props);

        this.state = {
            class: 'hide',
            showPopover: false,
        };

        this.modalOver = this.modalOver.bind(this);
        this.out = this.out.bind(this);
        this.targetOver = this.targetOver.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    targetOver() {
        XTooltip.current = this;
        this.hovered = true;
        clearTimeout(this.timeout);
        this.setState({
            class: XTooltip.active.size === 0 ? 'show' : 'static',
            showPopover: true,
        });
        for (let tooltip of XTooltip.active) {
            if (tooltip !== this) {
                tooltip.setState({
                    showPopover: false
                });
            }
        }
        XTooltip.active.add(this);
    }

    modalOver() {
        XTooltip.current = this;
        clearTimeout(this.timeout);
        this.hovered = true;
        XTooltip.active.add(this);
    }

    out() {
        this.hovered = false;
        this.timeout = setTimeout(
            () => {
                if (!this.hovered) {
                    this.setState({
                        class: 'hide'
                    });
                    XTooltip.active.delete(this);

                    this.timeout = setTimeout(
                        () => {
                            this.setState({
                                showPopover: false
                            });
                        },
                        100);
                }
            },
            100);
    }

    render() {

        let target: any[] = [];
        let content: any[] = [];
        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (i.props as any)._isTooltipTarget === true) {
                target.push(i);
            } else if (React.isValidElement(i) && (i.props as any)._isTooltipContent === true) {
                content.push(i);
            }
        }

        let animation = this.state.class === 'static' && this.prevClass === 'show' ? 'show' : this.state.class;
        let popover = (
            <Popper placement={this.props.placement ? this.props.placement : 'top'} class={animation} onMouseover={this.modalOver} onMouseout={this.out} nonePointerEvents={true}>
                {content.length > 0 ? (content) : (this.props.title)}
            </Popper>
        );
        this.prevClass = animation;

        return (
            <Manager>
                <XTooltipDiv marginLeft={this.props.marginLeft} margin={this.props.margin} marginRight={this.props.marginRight} marginTop={this.props.marginTop} marginBottom={this.props.marginBottom} centeredContent={this.props.centeredContent}>
                    <Target>
                        <TargetContent
                            onMouseOver={this.targetOver}
                            onMouseOut={this.out}
                        >
                            {target.length > 0 ? (target) : (<XIcon icon="error" />)}
                        </TargetContent>
                    </Target>
                    {(XTooltip.current === this && this.state.showPopover && canUseDOM && ReactDOM.createPortal(popover, document.body))}
                </XTooltipDiv>
            </Manager>
        );
    }
}