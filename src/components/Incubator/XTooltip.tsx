import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import { canUseDOM } from '../../utils/environment';
import { XIcon } from '../X/XIcon';
import { Manager, Target, Poppover } from './Popper';

const XTooltipDiv = Glamorous.div<{ leftMargin?: boolean, margin?: boolean, noMargin?: boolean }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    marginRight: props.noMargin ? 0 : props.margin ? 6 : props.leftMargin ? undefined : 6,
    marginLeft: props.noMargin ? 0 : props.margin ? 6 : props.leftMargin ? 6 : undefined,
}));

const TargetContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    color: '#A7B8C4',
    '> i': {
        fontSize: 18
    }
});

interface XTooltipProps {
    title: string;
    leftMargin?: boolean;
    margin?: boolean;
    noMargin?: boolean;
}

interface XTooltipState {
    class?: string;
    targetHover?: boolean;
    modalHover?: boolean;
    popper?: boolean;
}

export class XTooltip extends React.Component<XTooltipProps, XTooltipState> {
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
            class: 'static',
            targetHover: false,
            modalHover: true,
            popper: true
        });
    }

    modalOut() {
        this.setState({
            class: 'hide'
        });

        this.timeout = setTimeout(() => {
            if (this.state.targetHover === true) {
                this.setState({
                    class: 'static',
                    targetHover: true,
                    modalHover: false,
                    popper: true
                });
                clearTimeout(this.timeout);
            } else {
                this.setState({
                    class: 'hide',
                    modalHover: false
                });
                this.timeout = setTimeout(() => {
                    this.setState({
                        popper: false
                    });
                },                        200);
            }
        },                        200);
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
        this.timeout = setTimeout(() => {
            if (this.state.modalHover === true) {
                return;
            } else {
                this.setState({
                    class: 'hide',
                    targetHover: false,
                    modalHover: false
                });
                this.timeout = setTimeout(() => {
                    this.setState({
                        popper: false
                    });
                },                        200);
            }
        },                        100);
    }

    render() {
        let popover = (
            <Poppover placement="top" onMouseover={this.modalOver} onMouseout={this.modalOut} class={this.state.class}>
                {this.props.title}
            </Poppover>
        );
        return (
            <Manager>
                <XTooltipDiv leftMargin={this.props.leftMargin} margin={this.props.margin} noMargin={this.props.noMargin}>
                    <Target
                        componentFactory={(targetProps) => (
                            <TargetContent
                                {...targetProps}
                                style={{}}
                                onMouseOver={this.targetOver}
                                onMouseOut={this.targetOut}
                            >
                                <XIcon icon="error" />
                            </TargetContent>
                        )}
                    />
                    {this.state.popper === true && canUseDOM && ReactDOM.createPortal(popover, document.body)}
                </XTooltipDiv>
            </Manager>
        );
    }
}