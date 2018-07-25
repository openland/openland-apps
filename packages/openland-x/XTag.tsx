import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from './XIcon';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XFlexStyles } from './basics/Flex';

interface XTagProps extends XFlexStyles {
    text?: string;
    icon?: string;
    size?: 'large' | 'default';
    color?: 'primary' | 'default' | 'gray' | 'green' | 'gost';
    onIconClick?: () => void;
    onClick?: React.MouseEventHandler<any>;
}

interface StyledXTagProps extends XFlexStyles {
    tagSize?: 'large' | 'default';
    tagColor?: 'primary' | 'default' | 'gray' | 'green' | 'gost';
    pointer?: boolean;
}

let iconsIndentation = styleResolver({
    'large': {
        fontSize: 16,
        lineHeight: '32px',
        marginLeft: 4,
    },
    'default': {
        fontSize: 14,
        lineHeight: '24px',
        marginLeft: 2,
    },
});

let sizeStyles = styleResolver({
    'large': {
        height: 32,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '32px',
        letterSpacing: 0.1,
        padding: '0 10px',
    },
    'default': {
        height: 25,
        fontSize: 13,
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: 0.2,
        padding: '0 8px 1px',
    },
});

let colorStyles = styleResolver({
    'primary': {
        backgroundColor: '#eeecfa',
        color: '#5640d6',
    },
    'default': {
        backgroundColor: '#edf3fe',
        color: '#4285f4',
    },
    'gray': {
        backgroundColor: '#f3f3f5',
        color: '#334562',
    },
    'green': {
        backgroundColor: 'rgba(192, 235, 196, 0.45)',
        color: '#4e8653',
    },
    'gost': {
        backgroundColor: '#fff',
        color: '#334562',
        opacity: 0.5,
        border: '1px solid #dedede'
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
        color: '#4e8653',
        opacity: 0.4
    },
    'gost': {
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
    (props) => colorStyles(props.tagColor)
]);

const XTagDeleteWrapper = Glamorous.div<StyledXTagProps>([
    (props) => ({
        cursor: 'pointer',
        color: '#5641d1',
        opacity: 0.4,

        '&:hover': {
            opacity: 0.7,
        },

        '&:active': {
            opacity: 1,
        }
    }),
    (props) => crossColorStyles(props.tagColor)
]);

const XTagDeleteIcon = Glamorous(XIcon)<StyledXTagProps>([
    (props) => iconsIndentation(props.tagSize)
]);

export class XTag extends React.Component<XTagProps> {
    render() {
        return (
            <XTagWrapper
                tagSize={this.props.size}
                tagColor={this.props.color}
                onClick={this.props.onClick}
                pointer={this.props.onClick !== undefined}
            >
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