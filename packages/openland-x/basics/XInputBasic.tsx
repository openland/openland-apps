import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XFlexStyles, applyFlex } from './Flex';
import { XPopper } from '../XPopper';
import { XIcon } from '../XIcon';
import ClearIcon from '../icons/ic-close.svg';

type XInputSize = 'large' | 'default' | 'small';
type XInputAttach = 'left' | 'right' | 'both';
type XInputStyle = 'default';

export interface XInputBasicProps extends XFlexStyles {
    title?: string;
    type?: string;
    pattern?: string;
    placeholder?: string;
    value?: string;
    icon?: string | any;
    iconRight?: string | any;
    required?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    size?: XInputSize;
    attach?: XInputAttach;
    color?: XInputStyle;
    rounded?: boolean;
    autofocus?: boolean;
    autoSelect?: boolean;
    tooltipContent?: any;
    onChange?: (value: string) => void;
    onEnter?: () => void;
    cleanable?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}

let sizeStyles = styleResolver({
    'large': {
        height: 40,
        fontSize: 14,
        '> .icon': {
            fontSize: 20,
            left: 14,
            top: 'calc(50% - 10px)'
        },
        '> .icon-right': {
            left: 'auto',
            right: 16,
        },
        '> span': {
            right: 16
        }
    },
    'default': {
        height: 32,
        fontSize: 14,
        '> .icon': {
            fontSize: 16,
            left: 12,
            top: 'calc(50% - 8px)'
        },
        '> .icon-right': {
            left: 'auto',
            right: 12,
        },
        '> span': {
            right: 12
        }
    },
    'small': {
        height: 28,
        fontSize: 12,
        '> .icon': {
            fontSize: 14,
            left: 8,
            top: 'calc(50% - 7px)'
        },
        '> .icon-right': {
            left: 'auto',
            right: 8,
        },
        '> span': {
            right: 8
        }
    },
});

let IconPaddingStyles = styleResolver({
    'large': {
        paddingLeft: 40
    },
    'default': {
        paddingLeft: 32
    },
    'small': {
        paddingLeft: 28
    }
});

let NonIconPaddingStyles = styleResolver({
    'large': {
        paddingLeft: 16
    },
    'default': {
        paddingLeft: 16
    },
    'small': {
        paddingLeft: 12
    }
});

let IconRightPaddingStyles = styleResolver({
    'large': {
        paddingRight: 40
    },
    'default': {
        paddingRight: 32
    },
    'small': {
        paddingRight: 28
    }
});

let NonIconRightPaddingStyles = styleResolver({
    'large': {
        paddingRight: 20
    },
    'default': {
        paddingRight: 16
    },
    'small': {
        paddingRight: 12
    }
});

let RequiredPaddingStyles = styleResolver({
    'large': {
        paddingRight: 50
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
    'default': {
        paddingRight: 10
    },
    'small': {
        paddingRight: 8
    }
});

let borderRadiusStyles = styleResolverWithProps((props: { attach?: XInputAttach, rounded?: boolean }) => ({
    'large': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : (props.rounded ? 20 : 10),
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : (props.rounded ? 20 : 10),
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : (props.rounded ? 20 : 10),
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : (props.rounded ? 20 : 10),
    },
    'default': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : (props.rounded ? 16 : 8),
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : (props.rounded ? 16 : 8),
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : (props.rounded ? 16 : 8),
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : (props.rounded ? 16 : 8),
    },
    'small': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : (props.rounded ? 14 : 6),
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : (props.rounded ? 14 : 6),
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : (props.rounded ? 14 : 6),
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : (props.rounded ? 14 : 6),
    }
}));

let colorStyles = styleResolver({
    'default': {
        borderColor: '#ececec',
        '> .icon': {
            color: 'rgba(0, 0, 0, 0.3)',
        },
        '&:focus-within': {
            boxShadow: '0 0 0 2px rgba(23, 144, 255, 0.2)',
            borderColor: '#74bcff',
            '> .icon': {
                color: 'rgba(23, 144, 255, 0.5)'
            },
        }
    }
});

let titleStyles = styleResolver({
    'large': {
        top: -11,
        left: 13,
        height: 20,
        fontSize: 12,
        lineHeight: '20px',
    },
    'default': {
        top: -11,
        left: 13,
        height: 20,
        fontSize: 12,
        lineHeight: '20px',
    },
    'small': {
        top: -8,
        left: 9,
        height: 14,
        fontSize: 11,
        lineHeight: '14px',
    }
});

const RootContainer = Glamorous.div<XInputBasicProps & { inputStyle?: XInputStyle, invalid?: boolean, format?: XInputSize, attach?: XInputAttach }>([
    (props) => ({
        position: 'relative',
        background: props.disabled ? '#f8f8f8' : '#ffffff',
        border: '1px solid',
        boxSizing: 'border-box',
        color: 'rgba(0, 0, 0, 0.9)',
        letterSpacing: 0,
        '> .icon': {
            position: 'absolute',
        },
        '& .popper': {
            color: '#d4dae7'
        },
        '&:focus-within': {
            '& .popper': {
                color: '#8A80E7'
            }
        },
    }),
    (props) => colorStyles(props.inputStyle),
    (props) => (props.invalid && {
        borderColor: '#e26363',
        '> .icon': {
            color: '#e26363'
        },
        '&:focus-within': {
            boxShadow: '0 0 0 2px rgba(226, 99, 99, 0.2)',
            borderColor: '#e26363',
            '> .icon': {
                color: '#e26363'
            },
        },
    } || {}),
    (props) => sizeStyles(props.format),
    (props) => borderRadiusStyles({ attach: props.attach, rounded: props.rounded }, props.format),
    (props) => applyFlex(props)
]);

const Input = Glamorous.input<XInputBasicProps & { format?: XInputSize }>([
    {
        width: '100%',
        height: '100%',
        fontSize: 'inherit',
        alignSelf: 'stretch',
        outline: 'none',
        '&::placeholder': {
            color: '#9d9d9d'
        }
    },
    (props) => IconPaddingStyles(props.format, !!props.icon),
    (props) => NonIconPaddingStyles(props.format, !props.icon),
    (props) => RequiredPaddingStyles(props.format, !!props.required),
    (props) => NonRequiredPaddingStyles(props.format, !props.required),
    (props) => IconRightPaddingStyles(props.format, !!props.iconRight),
    (props) => NonIconRightPaddingStyles(props.format, !props.iconRight),
]);

const InputPlaceholder = Glamorous.div<XInputBasicProps & { format?: XInputSize }>([
    () => ({
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        color: 'rgba(0, 0, 0, 0.4)',
        pointerEvents: 'none'
    }),
    (props) => IconPaddingStyles(props.format, !!props.icon),
    (props) => NonIconPaddingStyles(props.format, !props.icon),
]);

const Title = Glamorous.div<{ format?: XInputSize }>([
    {
        position: 'absolute',
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.4)'
    },
    (props) => titleStyles(props.format),
]);

const PopperPlaceholder = Glamorous.div({
    position: 'absolute',
    right: 15,
    top: 'calc(50% - 9px)',
    cursor: 'pointer',
    '& > i': {
        fontSize: 18,
        // color: '#8A80E7'
    }
});

const RequireElement = Glamorous.span({
    width: 10,
    height: 10,
    fontSize: 14,
    marginLeft: 1,
    marginTop: -10,
    color: '#1790ff'
});

const ClearButton = Glamorous.a({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 'calc(50% - 8px)',
    width: 16,
    height: 16,
    cursor: 'pointer'
});

interface XInputBasicState {
    value: string;
    titleInside: boolean;
    isFocused: boolean;
}

export class XInputBasic extends React.PureComponent<XInputBasicProps, XInputBasicState> {
    inputRef: any | null = null;

    constructor(props: XInputBasicProps) {
        super(props);

        if (this.props.value && this.props.value.length > 0) {
            this.state = {
                value: this.props.value,
                titleInside: false,
                isFocused: false
            };
        } else {
            this.state = {
                value: '',
                titleInside: true,
                isFocused: false
            };
        }
    }

    componentWillReceiveProps(props: XInputBasicProps) {
        if (props.value && props.value.length > 0) {
            this.setState({
                value: props.value,
                titleInside: false
            });
        } else {
            this.setState({
                value: '',
                titleInside: !this.state.isFocused
            });
        }
    }

    handleRef = (e: any) => {
        if (e && this.props.autofocus) {
            e.focus();
        }
        if (e && this.props.autoSelect) {
            e.select();
        }
        if (e) {
            this.inputRef = e;
        }
    }

    handleChange = (e: any) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }

        this.setState({
            value: e.target.value
        });
    }

    handleClear = () => {
        if (this.props.onChange) {
            this.props.onChange('');
        }

        this.setState({
            value: ''
        });
    }

    handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (this.props.onEnter) {
                this.props.onEnter();
            }
        }
    }

    focus() {
        this.inputRef.focus();
    }

    handleFocus = () => {
        this.setState({
            titleInside: false,
            isFocused: true
        });

        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    handleBlur = () => {
        this.setState({
            titleInside: this.state.value.length <= 0,
            isFocused: false
        });

        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    render() {
        const {
            type,
            pattern,
            placeholder,
            size,
            icon,
            iconRight,
            required,
            invalid,
            value,
            children,
            onChange,
            autofocus,
            autoSelect,
            disabled,
            tooltipContent,
            color,
            cleanable,
            onFocus,
            onBlur,
            title,
            ...other
        } = this.props;

        let v = this.state.value;
        if (v === null) {
            v = '';
        }

        return (
            <RootContainer
                {...other}
                inputStyle={color}
                format={size}
                invalid={invalid}
                disabled={disabled}
            >
                {title && (
                    <>
                        {!this.state.titleInside && (
                            <Title format={size}>
                                {title}
                                {required && <RequireElement className="required-star">*</RequireElement>}
                            </Title>
                        )}
                        {this.state.titleInside && (
                            <InputPlaceholder
                                className="input-placeholder"
                                icon={icon}
                                format={size}
                            >
                                <span>{title}</span>
                                {required && <RequireElement className="required-star">*</RequireElement>}
                            </InputPlaceholder>
                        )}
                    </>
                )}
                {icon && (
                    typeof (icon) === 'string'
                        ? <XIcon icon={icon} className="icon" />
                        : <i className="icon">{icon}</i>
                )}
                {iconRight && (
                    typeof (iconRight) === 'string'
                        ? <XIcon icon={iconRight} className="icon icon-right" />
                        : <i className="icon icon-right">iconRight</i>
                )}
                <Input
                    disabled={disabled}
                    icon={icon}
                    format={size}
                    required={required}
                    type={type}
                    pattern={pattern}
                    value={v}
                    onChange={this.handleChange}
                    autoFocus={autofocus}
                    autoSelect={autoSelect}
                    innerRef={this.handleRef}
                    onKeyPress={this.handleKey}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                {(placeholder && (!v || v === '')) && (
                    <InputPlaceholder
                        className="input-placeholder"
                        icon={icon}
                        format={size}
                    >
                        <span>{placeholder}</span>
                        {required && <RequireElement className="required-star">*</RequireElement>}
                    </InputPlaceholder>
                )}
                {tooltipContent && (
                    <XPopper
                        placement="bottom"
                        content={tooltipContent}
                        showOnHover={true}
                    >
                        <PopperPlaceholder>
                            <XIcon icon="error" className="popper" />
                        </PopperPlaceholder>
                    </XPopper>
                )}
                {(cleanable && v !== '') && (
                    <ClearButton
                        onClick={() => {
                            this.handleClear();
                        }}
                    >
                        <ClearIcon />
                    </ClearButton>
                )}
            </RootContainer>
        );
    }
}