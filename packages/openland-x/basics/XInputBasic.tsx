import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XFlexStyles, applyFlex } from '../basics/Flex';
import { XIcon } from '../XIcon';

export interface XInputBasicProps extends XFlexStyles {
    type?: string;
    pattern?: string;
    placeholder?: string;
    value?: string;
    icon?: string;
    required?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    size?: 'large' | 'medium' | 'default' | 'small';
    attach?: 'left' | 'right' | 'both';
    autofocus?: boolean;
    onChange?: (value: string) => void;
    onEnter?: () => void;
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

const RootContainer = Glamorous.div<XInputBasicProps & { invalid?: boolean, format?: 'large' | 'medium' | 'default' | 'small', attach?: 'left' | 'right' | 'both' }>([
    (props) => ({
        position: 'relative',
        background: '#fff',
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
        border: `1px solid ${props.invalid ? '#e26363' : '#d4dae7'}`,
        opacity: props.disabled ? 0.7 : undefined,
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

const Input = Glamorous.input<XInputBasicProps & { format?: 'large' | 'medium' | 'default' | 'small' }>([
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

export class XInputBasic extends React.PureComponent<XInputBasicProps> {

    constructor(props: XInputBasicProps) {
        super(props);
    }

    handleRef = (e: any) => {
        if (e && this.props.autofocus) {
            e.focus();
        }
    }

    handleChange = (e: any) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (this.props.onEnter) {
                this.props.onEnter();
            }
        }
    }

    render() {
        const {
            type,
            pattern,
            placeholder,
            size,
            icon,
            required,
            invalid,
            value,
            children,
            onChange,
            autofocus,
            disabled,
            ...other
        } = this.props;
        let v = this.props.value;
        if (v === null) {
            v = '';
        }
        return (
            <RootContainer
                {...other}
                format={size}
                invalid={invalid}
                disabled={disabled}
            >
                {icon && <XIcon icon={icon} className="icon" />}
                <Input
                    disabled={disabled}
                    icon={icon}
                    format={size}
                    required={required}
                    placeholder={placeholder}
                    type={type}
                    pattern={pattern}
                    value={v}
                    onChange={this.handleChange}
                    autofocus={autofocus}
                    innerRef={this.handleRef}
                    onKeyPress={this.handleKey}
                />
                {required && <RequireElement>*</RequireElement>}
            </RootContainer>
        );
    }
}