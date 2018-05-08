import * as React from 'react';
import Glamorous from 'glamorous';
import { XSeparated } from './XSeparated';
import { XLink } from 'openland-x/XLink';

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
    // '&::before': {
    //     content: props.loading ? `''` : undefined,
    //     display: 'block',
    //     position: 'absolute',
    //     width: '100%',
    //     height: '100%',
    //     left: 0,
    //     top: 0,
    //     background: '#fff',
    //     zIndex: 1
    // },
    // '&::after': {
    //     content: props.loading ? `''` : undefined,
    //     display: 'block',
    //     position: 'absolute',
    //     width: '20px',
    //     height: '20px',
    //     left: 'calc(50% - 10px)',
    //     top: 'calc(50% - 10px)',
    //     backgroundImage: props.loading ? 'url(/static/X/loading.svg)' : undefined,
    //     backgroundSize: '20px',
    //     animation: props.loading ? `${loading} 2s linear infinite` : undefined,
    //     zIndex: 2
    // }
}));

let XCardSeparator = Glamorous.div({
    height: 1,
    backgroundColor: '#e6ebf1'
});

interface XCardProps {
    className?: string;
    shadow?: 'none' | 'normal' | 'medium' | 'large';
    separators?: boolean;
    // loading?: boolean;
    path?: string | null;
    href?: string | null;
    bounce?: boolean;
    borderless?: boolean;
    asRow?: boolean;
}

export class XCard extends React.Component<XCardProps> {
    render() {

        const {
            className,
            shadow,
            separators,
            path,
            href,
            bounce,
            borderless
        } = this.props;

        return (
            <XCardDiv className={className} shadow={shadow} bounce={bounce} borderless={borderless}>
                {(path || href) ? (
                    <XLink path={path} href={href}>
                        {separators && <XSeparated separator={XCardSeparator}>{this.props.children}</XSeparated>}
                        {!separators && this.props.children}
                    </XLink>
                ) : (
                        (separators)
                            ? (<XSeparated separator={XCardSeparator}>{this.props.children}</XSeparated>)
                            : (<>{this.props.children}</>)
                    )}
            </XCardDiv>
        );
    }
}