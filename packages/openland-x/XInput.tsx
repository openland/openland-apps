import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XFlexStyles, applyFlex } from './Flex';
import { XIcon } from './XIcon';

export interface XInputProps extends XFlexStyles {
    placeholder?: string;
    value?: string;
    icon?: string;
    required?: boolean;
    invalid?: boolean;
    size?: 'large' | 'medium' | 'default' | 'small';
    autofocus?: boolean;
    onChange?: (value: string) => void;
}

let sizeStyles = styleResolver({
    'large': {
        height: 56,
        fontSize: 18,
        letterSpacing: 0.6,
        '> .icon': {
            fontSize: 28,
            left: 12,
            top: 'calc(50% - 14px)'
        },
        '> span': {
            right: 22
        }
    },
    'medium': {
        height: 48,
        fontSize: 16,
        letterSpacing: 0.5,
        '> .icon': {
            fontSize: 24,
            left: 12,
            top: 'calc(50% - 12px)'
        },
        '> span': {
            right: 19
        }
    },
    'default': {
        height: 40,
        fontSize: 16,
        letterSpacing: 0.5,
        '> .icon': {
            fontSize: 16,
            left: 10,
            top: 'calc(50% - 8px)'
        },
        '> span': {
            right: 15
        }
    },
    'small': {
        height: 32,
        fontSize: 14,
        letterSpacing: 0.4,
        '> .icon': {
            fontSize: 14,
            left: 8,
            top: 'calc(50% - 7px)'
        },
        '> span': {
            right: 11
        },
        '> input': {
            paddingBottom: 1
        }
    }
});

let IconPaddingStyles = styleResolver({
    'large': {
        paddingLeft: 50
    },
    'medium': {
        paddingLeft: 46
    },
    'default': {
        paddingLeft: 36
    },
    'small': {
        paddingLeft: 28
    }
});

let NonIconPaddingStyles = styleResolver({
    'large': {
        paddingLeft: 16
    },
    'medium': {
        paddingLeft: 12
    },
    'default': {
        paddingLeft: 10
    },
    'small': {
        paddingLeft: 8
    }
});

let RequiredPaddingStyles = styleResolver({
    'large': {
        paddingRight: 50
    },
    'medium': {
        paddingRight: 46
    },
    'default': {
        paddingRight: 36
    },
    'small': {
        paddingRight: 28
    }
});

let NonRequiredPaddingStyles = styleResolver({
    'large': {
        paddingRight: 16
    },
    'medium': {
        paddingRight: 12
    },
    'default': {
        paddingRight: 10
    },
    'small': {
        paddingRight: 8
    }
});

const RootContainer = Glamorous.div<XInputProps & { invalid?: boolean, format?: 'large' | 'medium' | 'default' | 'small' }>([
    (props) => ({
        position: 'relative',
        background: '#fff',
        borderRadius: 4,
        border: `1px solid ${props.invalid ? '#e26363' : '#d4dae7'}`,
        boxSizing: 'border-box',
        color: '#334562',
        '> .icon': {
            position: 'absolute',
            color: props.invalid ? '#e26363' : '#d4dae7'
        },
        '&:focus-within': {
            boxShadow: '0 0 0 2px rgba(143, 124, 246, 0.2)',
            border: props.invalid ? undefined : '1px solid #986AFE',
            '> .icon': {
                color: '#986AFE'
            }
        },
    }),
    (props) => sizeStyles(props.format),
    (props) => applyFlex(props)
]);

const Input = Glamorous.input<XInputProps & { format?: 'large' | 'medium' | 'default' | 'small' }>([
    (props) => ({
        width: '100%',
        height: '100%',
        fontSize: 'inherit',
        alignSelf: 'stretch',
        outline: 'none',
        '&::placeholder': {
            color: '#9d9d9d'
        }
    }),
    (props) => IconPaddingStyles(props.format, !!props.icon),
    (props) => NonIconPaddingStyles(props.format, !props.icon),
    (props) => RequiredPaddingStyles(props.format, !!props.required),
    (props) => NonRequiredPaddingStyles(props.format, !props.required)
]);

const RequireElement = Glamorous.span({
    width: 10,
    height: 10,
    fontSize: 23,
    marginLeft: 6,
    color: '#e26363',
    position: 'absolute',
    top: 'calc(50% - 5px)'
});

export class XInput extends React.PureComponent<XInputProps, { inputWrapClass?: string, value: string }> {

    constructor(props: XInputProps) {
        super(props);

        this.state = {
            value: this.props.value || ''
        };
    }

    handleRef = (e: any) => {
        if (e && this.props.autofocus) {
            e.focus();
        }
    }

    handleChange = (e: any) => {
        this.setState({
            value: e.target.value
        });
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    render() {
        const {
            placeholder,
            size,
            icon,
            required,
            invalid,
            value,
            children,
            onChange,
            autofocus,
            ...other
        } = this.props;
        return (
            <RootContainer
                {...other}
                format={size}
                invalid={invalid}
            >
                {icon && <XIcon icon={icon} className="icon" />}
                <Input
                    icon={icon}
                    format={size}
                    required={required}
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={this.handleChange}
                    autofocus={autofocus}
                    innerRef={this.handleRef}
                />
                {required && <RequireElement>*</RequireElement>}
            </RootContainer>
        );
    }
}