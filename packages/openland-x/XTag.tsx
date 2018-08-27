import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from './XIcon';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XFlexStyles } from './basics/Flex';

interface XTagProps extends XFlexStyles {
    text?: string;
    icon?: string;
    iconLeft?: string;
    size?: 'large' | 'default' | 'small';
    color?: 'primary' | 'default' | 'gray' | 'green' | 'ghost';
    rounded?: boolean;
    onIconClick?: () => void;
    onClick?: React.MouseEventHandler<any>;
}

interface StyledXTagProps extends XFlexStyles {
    tagSize?: 'large' | 'default' | 'small';
    tagColor?: 'primary' | 'default' | 'gray' | 'green' | 'ghost';
    pointer?: boolean;
    rounded?: boolean;
}

let iconsIndentation = styleResolver({
    'large': {
        fontSize: 16,
        lineHeight: '32px',
        marginLeft: 2,
        marginRight: -2,
    },
    'default': {
        fontSize: 16,
        lineHeight: '26px',
        marginLeft: 2,
        marginRight: -2,
    },
    'small': {
        fontSize: 12,
        lineHeight: '22px',
        marginLeft: 2,
        marginRight: -2,
    },
});

let iconsLeftIndentation = styleResolver({
    'large': {
        fontSize: 16,
        lineHeight: '32px',
        marginRight: 2,
        marginLeft: -2,
    },
    'default': {
        fontSize: 16,
        lineHeight: '26px',
        marginRight: 2,
        marginLeft: -2,
    },
    'small': {
        fontSize: 13,
        lineHeight: '22px',
        marginRight: 4,
        marginLeft: -3,
    },
});

let sizeStyles = styleResolver({
    'large': {
        height: 32,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '30px',
        letterSpacing: 0.1,
        padding: '0 12px',
    },
    'default': {
        height: 26,
        fontSize: 13,
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: 0.2,
        padding: '0 12px',
    },
    'small': {
        height: 22,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: '23px',
        letterSpacing: -0.3,
        padding: '0 11px',
    },
});

let colorStyles = styleResolver({
    'primary': {
        backgroundColor: '#eeecfa',
        color: '#5640d6',
    },
    'default': {
        backgroundColor: 'rgba(23, 144, 255, 0.08)',
        color: '#1790ff',
    },
    'gray': {
        backgroundColor: '#f3f3f5',
        color: '#334562',
    },
    'green': {
        backgroundColor: 'rgba(105, 208, 109, 0.18)',
        color: '#66b969',
    },
    'ghost': {
        backgroundColor: '#fff',
        color: '#334562',
        opacity: 0.5,
        boxShadow: 'inset 0 0 0 1px #dedede'
    },
});

let crossColorStyles = styleResolver({
    'primary': {
        color: '#5641d1',
        opacity: 0.4
    },
    'default': {
        color: '#4285f4',
        opacity: 0.4
    },
    'gray': {
        color: '#334562',
        opacity: 0.4
    },
    'green': {
        color: 'rgba(110, 197, 113, 0.5)',
        opacity: 1
    },
    'ghost': {
        color: '#334562',
        opacity: 0.5
    },
});

const XTagWrapper = Glamorous.div<StyledXTagProps>([
    (props) => ({
        display: 'flex',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        borderRadius: 4,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        // marginRight: 8,
        marginTop: 4,
        marginBottom: 4,
        cursor: props.pointer ? 'pointer' : undefined,
    }),
    (props) => sizeStyles(props.tagSize),
    (props) => colorStyles(props.tagColor),
    (props) => (props.rounded && {
        borderRadius: 16
    } || {}),
]);

const XTagDeleteWrapper = Glamorous.div<StyledXTagProps>([
    {
        cursor: 'pointer',
        color: '#5641d1',
        opacity: 0.4,

        '&:hover': {
            opacity: 0.7,
        },

        '&:active': {
            opacity: 1,
        }
    },
    (props) => crossColorStyles(props.tagColor)
]);

const XTagDeleteIcon = Glamorous(XIcon)<StyledXTagProps>([
    (props) => iconsIndentation(props.tagSize)
]);

const XTagIconWrapper = Glamorous.div<StyledXTagProps>([
    {
        color: '#5641d1',
        opacity: 0.4,
    },
    (props) => crossColorStyles(props.tagColor)
]);

const XTagIconLeft = Glamorous(XIcon)<StyledXTagProps>([
    (props) => iconsLeftIndentation(props.tagSize)
]);

export class XTag extends React.Component<XTagProps> {
    render() {
        return (
            <XTagWrapper
                tagSize={this.props.size}
                tagColor={this.props.color}
                onClick={this.props.onClick}
                pointer={this.props.onClick !== undefined}
                rounded={this.props.rounded}
            >
                {this.props.iconLeft && (
                    <XTagIconWrapper
                        tagColor={this.props.color}
                    >
                        <XTagIconLeft
                            tagSize={this.props.size}
                            icon={this.props.iconLeft}
                        />
                    </XTagIconWrapper>
                )}
                {this.props.text}
                {this.props.icon && (
                    <XTagDeleteWrapper
                        onClick={this.props.onIconClick}
                        tagColor={this.props.color}
                    >
                        <XTagDeleteIcon
                            tagSize={this.props.size}
                            icon={this.props.icon}
                        />
                    </XTagDeleteWrapper>
                )}
            </XTagWrapper>
        );
    }
}