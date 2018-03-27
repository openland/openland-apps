import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import { canUseDOM } from '../../utils/environment';
import { XIcon } from '../X/XIcon';
import { Manager, Target, Poppover } from './Popper';

const XTooltipDiv = Glamorous.div<{leftMargin?: boolean, margin?: boolean, noMargin?: boolean}>((props) => ({
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

export class XTooltip extends React.Component<XTooltipProps, { class?: string, modalHover?: boolean, popper?: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            class: 'hide',
            modalHover: false,
            popper: false
        };

        this.modalOver = this.modalOver.bind(this);
        this.modalOut = this.modalOut.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
    }

    modalOver() {
        this.setState({
            class: 'static',
            modalHover: true,
            popper: true
        });
    }

    modalOut() {
        this.setState({
            class: 'hide'
        });

        setTimeout(() => {
            this.setState({
                popper: false
            });
        },         200);
    }

    mouseOver() {
        this.setState({
            class: 'show',
            modalHover: false,
            popper: true
        });
    }

    mouseOut() {
        setTimeout(() => {
            if (this.state.modalHover === true) {
                return;
            } else {
                this.setState({
                    class: 'hide',
                    modalHover: false
                });
                setTimeout(() => {
                    this.setState({
                        popper: false
                    });
                },         200);
            }
        },         100);
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
                                onMouseOver={this.mouseOver}
                                onMouseOut={this.mouseOut}
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