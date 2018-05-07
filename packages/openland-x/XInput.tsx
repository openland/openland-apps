import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XLayoutProps, applyFlex } from './Flex';
import { XIcon } from './XIcon';

export interface XInputStyleProps extends XLayoutProps {
    placeholder?: string;
    value?: string;
    icon?: string;
    required?: boolean;
    noValid?: boolean;
    format?: 'large' | 'medium' | 'default' | 'small';
}

interface XInputWrapperProps extends XInputStyleProps {
    active?: boolean;
    noValid?: boolean;
    onClickOutside: Function;
    onClick: () => void;
}

class ClickOutside extends React.Component<XInputWrapperProps> {
    private container: any;

    constructor(props: XInputWrapperProps) {
        super(props);
        this.getContainer = this.getContainer.bind(this);
    }

    getContainer(ref: any) {
        this.container = ref;
    }

    render() {
        const { children, onClickOutside, ...props } = this.props;
        return (
            <div
                {...props}
                ref={this.getContainer}
            >
                {children}
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener('click', this.handle, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handle, true);
    }

    handle = (e: any) => {
        const { onClickOutside } = this.props;
        const el = this.container;
        if (!el.contains(e.target)) {
            onClickOutside(e);
        }
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

const InputWrapperStyle = Glamorous<XInputWrapperProps>(ClickOutside)([
    (props) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 4,
        border: `1px solid ${props.noValid ? '#e26363' : props.active ? '#986AFE' : '#d4dae7'}`,
        boxShadow: props.noValid ? undefined : props.active ? '0 0 0 2px rgba(143, 124, 246, 0.2)' : undefined,
        cursor: 'text',
        boxSizing: 'border-box',
        '> .icon': {
            marginRight: 6,
            color: props.noValid ? '#e26363' : props.active ? '#986AFE' : '#d4dae7'
        },
        '> .star': {
            width: 10,
            height: 10,
            fontSize: 23,
            marginLeft: 6
        }
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

export class XInput extends React.PureComponent<XInputStyleProps, { active: boolean, value: string }> {
    private myInp: HTMLInputElement;

    constructor(props: XInputStyleProps) {
        super(props);

        this.state = {
            active: false,
            value: this.props.value || ''
        };
    }

    handleChange = (e: any) => {
        this.setState({
            active: true,
            value: e.target.value
        });
    }

    activeDisabled = () => {
        this.setState({
            active: false
        });
    }

    render() {
        const { placeholder, format, icon, required, noValid, ...other } = this.props;
        return (
            <InputWrapperStyle
                {...other}
                format={format}
                noValid={noValid}
                active={this.state.active}
                onClickOutside={() => this.activeDisabled()}
                onClick={() => { this.myInp.focus(); this.setState({ active: true }); }}
            >
                {icon && <XIcon icon={icon} className="icon" />}
                <InputStyle
                    format={format}
                    placeholder={placeholder}
                    value={this.state.value}
                    innerRef={(input: any) => { this.myInp = input; }}
                    onChange={this.handleChange}
                />
                {required && <span className="star" style={{ color: '#e26363' }}>*</span>}
            </InputWrapperStyle>
        );
    }
}