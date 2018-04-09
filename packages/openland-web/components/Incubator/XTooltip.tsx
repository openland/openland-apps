import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import { canUseDOM } from '../../utils/environment';
import { Manager, Target, Popper } from './XPopper';
import { XIcon } from '../X/XIcon';

const XTooltipDiv = Glamorous.div<{ marginLeft?: number, marginRight?: number, margin?: number }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    margin: props.margin,
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
}

interface XTooltipState {
    class: string;
    targetHover?: boolean;
    modalHover?: boolean;
    popper?: boolean;
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
    timeout: any;

    constructor(props: any) {
        super(props);

        this.state = {
            class: 'hide',
            targetHover: false,
            modalHover: false,
            popper: false
        };

        this.modalOver = this.modalOver.bind(this);
        this.modalOut = this.modalOut.bind(this);
        this.targetOver = this.targetOver.bind(this);
        this.targetOut = this.targetOut.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    modalOver() {
        clearTimeout(this.timeout);

        this.setState({
            targetHover: false,
            modalHover: true,
            popper: true
        });
        if (this.state.class === 'hide') {
            this.setState({
                class: 'show'
            });
        } else {
            this.setState({
                class: 'static'
            });
        }
    }

    modalOut() {
        this.setState({
            class: 'hide'
        });

        this.timeout = setTimeout(
            () => {
                if (this.state.targetHover === true) {
                    return;
                } else {
                    this.setState({
                        class: 'hide',
                        modalHover: false
                    });
                    this.timeout = setTimeout(
                        () => {
                            this.setState({
                                popper: false
                            });
                        },
                        100);
                }
            },
            100);
    }

    targetOver() {
        this.setState({
            class: 'show',
            targetHover: true,
            modalHover: false,
            popper: true
        });
        clearTimeout(this.timeout);
    }

    targetOut() {
        this.timeout = setTimeout(
            () => {
                if (this.state.modalHover === true) {
                    return;
                } else {
                    this.setState({
                        class: 'hide',
                        targetHover: false,
                        modalHover: false
                    });
                    this.timeout = setTimeout(
                        () => {
                            this.setState({
                                popper: false
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

        let popover = (
            <Popper placement="top" class={this.state.class} onMouseover={this.modalOver} onMouseout={this.modalOut}>
                {content.length > 0 ? (content) : (this.props.title)}
            </Popper>
        );
        return (
            <Manager>
                <XTooltipDiv marginLeft={this.props.marginLeft} margin={this.props.margin} marginRight={this.props.marginRight}>
                    <Target>
                        <TargetContent
                            onMouseOver={this.targetOver}
                            onMouseOut={this.targetOut}
                        >
                            {target.length > 0 ? (target) : (<XIcon icon="error" />)}
                        </TargetContent>
                    </Target>
                    {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popover, document.body)}
                </XTooltipDiv>
            </Manager>
        );
    }
}