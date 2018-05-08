import * as React from 'react';
import Glamorous from 'glamorous';

interface XCardDivProps {
    shadow?: 'none' | 'normal' | 'medium' | 'large';
    // loading?: boolean;
    bounce?: boolean;
    borderless?: boolean;
}

let XCardDiv = Glamorous.div<XCardDivProps>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
    border: props.borderless ? undefined : (props.shadow === 'none' || props.shadow === undefined) ? '1px solid rgba(38,38,38,0.08)' : (props.shadow === 'medium' ? '1px solid #efecec' : undefined),
    boxShadow: props.shadow === 'normal'
        ? '0 2px 15px rgba(84,96,103,.25)'
        : props.shadow === 'medium'
            ? '0 7px 14px 0 rgba(50,50,93,.1), 0 3px 6px 0 rgba(0,0,0,.07)'
            : props.shadow === 'large'
                ? '0 18px 35px rgba(50, 50, 93, .1), 0 8px 15px rgba(0, 0, 0, .07)'
                : undefined,
    color: '#262626',
    borderRadius: 4,
    position: 'relative',
    transitionDuration: props.bounce ? '.15s' : undefined,
    '&:hover': {
        transform: props.bounce ? 'translateY(-2px)' : undefined
    },
}));

interface XCardProps {
    className?: string;
    shadow?: 'none' | 'normal' | 'medium' | 'large';
    bounce?: boolean;
    borderless?: boolean;
    asRow?: boolean;
}

export class XCard extends React.Component<XCardProps> {
    render() {
        const {
            className,
            shadow,
            bounce,
            borderless
        } = this.props;

        return (
            <XCardDiv className={className} shadow={shadow} bounce={bounce} borderless={borderless}>
                {this.props.children}
            </XCardDiv>
        );
    }
}