import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XFlexStyles, applyFlex } from './Flex';
import { XPopper } from '../XPopper';
import { XIcon } from '../XIcon';
import { style } from '../../../node_modules/glamor';

type XInputSize = 'large' | 'medium' | 'default' | 'small' | 'r-default' | 'r-small' | 'r-tiny';
type XInputAttach = 'left' | 'right' | 'both';
type XInputStyle = 'default' | 'primary-sky-blue';

export interface XInputBasicProps extends XFlexStyles {
    type?: string;
    pattern?: string;
    placeholder?: string;
    value?: string;
    icon?: string;
    iconRight?: string;
    required?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    size?: XInputSize;
    attach?: XInputAttach;
    color?: XInputStyle;
    autofocus?: boolean;
    autoSelect?: boolean;
    tooltipContent?: any;
    onChange?: (value: string) => void;
    onEnter?: () => void;
}

let sizeStyles = styleResolver({
    'large': {
        height: 56,
        fontSize: 18,
        letterSpacing: -0.2,
        '> .icon': {
            fontSize: 28,
            left: 12,
            top: 'calc(50% - 14px)'
        },
        '> .icon-right': {
            left: 'auto',
            right: 12,
        },
        '> span': {
            right: 22
        }
    },
    'medium': {
        height: 48,
        fontSize: 16,
        letterSpacing: -0.2,
        '> .icon': {
            fontSize: 24,
            left: 12,
            top: 'calc(50% - 12px)'
        },
        '> .icon-right': {
            left: 'auto',
            right: 12,
        },
        '> span': {
            right: 19
        }
    },
    'default': {
        height: 40,
        fontSize: 15,
        letterSpacing: -0.2,
        '> .icon': {
            fontSize: 16,
            left: 10,
            top: 'calc(50% - 8px)'
        },
        '> .icon-right': {
            left: 'auto',
            right: 10,
        },
        '> span': {
            right: 15
        }
    },
    'small': {
        height: 32,
        fontSize: 14,
        letterSpacing: -0.1,
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
            right: 11
        },
        '> input': {
            paddingBottom: 1
        }
    },
    'r-default': {
        height: 40,
        fontSize: 14,
        letterSpacing: 0.4,
        '> .icon': {
            fontSize: 20,
            left: 16,
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
    'r-small': {
        height: 32,
        fontSize: 14,
        letterSpacing: 0.4,
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
    'r-tiny': {
        height: 28,
        fontSize: 12,
        letterSpacing: 0.4,
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
    },
    'r-default': {
        paddingLeft: 40
    },
    'r-small': {
        paddingLeft: 32
    },
    'r-tiny': {
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
    },
    'r-default': {
        paddingLeft: 20
    },
    'r-small': {
        paddingLeft: 16
    },
    'r-tiny': {
        paddingLeft: 12
    }
});

let IconRightPaddingStyles = styleResolver({
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
    },
    'r-default': {
        paddingRight: 40
    },
    'r-small': {
        paddingRight: 32
    },
    'r-tiny': {
        paddingRight: 28
    }
});

let NonIconRightPaddingStyles = styleResolver({
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
    },
    'r-default': {
        paddingRight: 20
    },
    'r-small': {
        paddingRight: 16
    },
    'r-tiny': {
        paddingRight: 12
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

let borderRadiusStyles = styleResolverWithProps((props: { attach?: XInputAttach }) => ({
    'default': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
    },
    'r-default': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 20,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 20,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 20,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 20,
    },
    'r-small': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 16,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 16,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 16,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 16,
    },
    'r-tiny': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 14,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 14,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 14,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 14,
    }
}));

let colorStyles = styleResolver({
    'default': {
        borderColor: '#d4dae7',
        '> .icon': {
            color: '#d4dae7',
        },
        '&:focus-within': {
            boxShadow: '0 0 0 2px rgba(143, 124, 246, 0.2)',
            borderColor: '#986AFE',
            '> .icon': {
                color: '#986AFE'
            },
        }
    },
    'primary-sky-blue': {
        borderColor: 'rgba(220, 222, 228, 0.6)',
        '> .icon': {
            color: '#d4dae7',
        },
        '&:focus-within': {
            boxShadow: '0 0 0 2px rgba(23, 144, 255, 0.2)',
            borderColor: '#74bcff',
            '> .icon': {
                color: '#74bcff'
            },
        }
    }
});

const RootContainer = Glamorous.div<XInputBasicProps & { inputStyle?: XInputStyle, invalid?: boolean, format?: XInputSize, attach?: XInputAttach }>([
    (props) => ({
        position: 'relative',
        background: '#fff',
        border: '1px solid',
        opacity: props.disabled ? 0.7 : undefined,
        boxSizing: 'border-box',
        color: '#334562',
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
    (props) => borderRadiusStyles({ attach: props.attach }, props.format),
    (props) => applyFlex(props)
]);

const Input = Glamorous.input<XInputBasicProps & { format?: XInputSize }>([
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
    (props) => NonRequiredPaddingStyles(props.format, !props.required),
    (props) => IconRightPaddingStyles(props.format, !!props.iconRight),
    (props) => NonIconRightPaddingStyles(props.format, !props.iconRight),
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

export class XInputBasic extends React.PureComponent<XInputBasicProps> {

    inputRef: any | null = null;

    constructor(props: XInputBasicProps) {
        super(props);
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
            ...other
        } = this.props;
        let v = this.props.value;
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
                {icon && <XIcon icon={icon} className="icon" />}
                {iconRight && <XIcon icon={iconRight} className="icon icon-right" />}
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
                    autoFocus={autofocus}
                    autoSelect={autoSelect}
                    innerRef={this.handleRef}
                    onKeyPress={this.handleKey}
                />
                {required && <RequireElement>*</RequireElement>}
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
            </RootContainer>
        );
    }
}