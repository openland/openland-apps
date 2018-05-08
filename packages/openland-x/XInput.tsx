import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XFlexStyles, applyFlex } from './Flex';
import { XIcon } from './XIcon';

export interface XInputStyleProps extends XFlexStyles {
    placeholder?: string;
    value?: string;
    icon?: string;
    required?: boolean;
    invalid?: boolean;
    format?: 'large' | 'medium' | 'default' | 'small';
    onChange?: (value: string) => void;
}

interface XInputWrapperProps extends XInputStyleProps {
    onClick: () => void;
    invalid?: boolean;
}

class InputWrap extends React.Component<XInputWrapperProps> {

    constructor(props: XInputWrapperProps) {
        super(props);
    }

    render() {
        const { children, onChange, ...props } = this.props;
        return (
            <div
                {...props}
            >
                {children}
            </div>
        );
    }
}

let sizeStyles = styleResolver({
    'large': {
        height: 56,
        fontSize: 18,
        letterSpacing: 0.6,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        '> .icon': {
            fontSize: 28
        }
    },
    'medium': {
        height: 48,
        fontSize: 16,
        letterSpacing: 0.5,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12,
        paddingBottom: 12,
        '> .icon': {
            fontSize: 24
        }
    },
    'default': {
        height: 40,
        fontSize: 16,
        letterSpacing: 0.5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        '> .icon': {
            fontSize: 16
        }
    },
    'small': {
        height: 32,
        fontSize: 14,
        letterSpacing: 0.4,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        '> .icon': {
            fontSize: 14
        },
        '> input': {
            lineHeight: '20px',
        }
    }
});

const InputWrapperStyle = Glamorous<XInputWrapperProps>(InputWrap)([
    (props) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 4,
        border: `1px solid ${props.invalid ? '#e26363' : '#d4dae7'}`,
        cursor: 'text',
        boxSizing: 'border-box',
        '> .icon': {
            marginRight: 6,
            color: props.invalid ? '#e26363' : '#d4dae7'
        },
        '> .star': {
            width: 10,
            height: 10,
            fontSize: 23,
            marginLeft: 6
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

const InputStyle = Glamorous.input<XInputStyleProps>([
    (props) => ({
        flexGrow: 1,
        fontSize: 'inherit',
        alignSelf: 'stretch',
        outline: 'none',
        '&::placeholder': {
            color: '#9d9d9d'
        }
    })
]);

export class XInput extends React.PureComponent<XInputStyleProps, { inputWrapClass?: string, value: string }> {
    private inputElement: HTMLInputElement;
    constructor(props: XInputStyleProps) {
        super(props);

        this.state = {
            value: this.props.value || ''
        };
    }

    handleChange = (e: any) => {
        this.setState({
            value: e.target.value
        });
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    handleClick = () => {
        if (this.inputElement) {
            this.inputElement.focus();
        }
    }

    render() {
        const { placeholder, format, icon, required, invalid, ...other } = this.props;
        return (
            <InputWrapperStyle
                {...other}
                format={format}
                invalid={invalid}
                onClick={this.handleClick}
            >
                {icon && <XIcon icon={icon} className="icon" />}
                <InputStyle
                    format={format}
                    placeholder={placeholder}
                    value={this.state.value}
                    innerRef={(input: any) => { this.inputElement = input; }} 
                    onChange={this.handleChange}
                />
                {required && <span className="star" style={{ color: '#e26363' }}>*</span>}
            </InputWrapperStyle>
        );
    }
}