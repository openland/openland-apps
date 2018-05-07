import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XLayoutProps, applyFlex } from './Flex';

export default class ClickOutside extends React.Component<{ onClickOutside: Function, onClick: () => void }> {
    private container: any;

    constructor(props: { onClickOutside: Function, onClick: () => void }) {
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
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignSelf: 'stretch'
                }}
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

export interface XInputStyleProps extends XLayoutProps {
    placeholder?: string;
    value?: string;
    title?: string;
    applying?: boolean;
    format?: 'large' | 'medium' | 'default' | 'small';
}

let sizeStyles = styleResolver({
    'large': {
        height: 56,
        fontSize: 16,
        letterSpacing: 0.5,
    },
    'medium': {
        height: 48,
        fontSize: 16,
        letterSpacing: 0.5,
    },
    'default': {
        height: 40,
        fontSize: 16,
        letterSpacing: 0.5,
    },
    'small': {
        height: 32,
        fontSize: 14,
        letterSpacing: 0.4,
    }
});

let paddingStyles = styleResolver({
    'large': {
        paddingRight: 18,
        paddingLeft: 18
    },
    'medium': {
        paddingRight: 16,
        paddingLeft: 16
    },
    'default': {
        paddingRight: 14,
        paddingLeft: 14
    },
    'small': {
        paddingRight: 12,
        paddingLeft: 12
    }
});

const InputWrapperStyle = Glamorous.div<XInputStyleProps & { active?: boolean }>([
    (props) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 4,
        border: props.active ? '1px solid #986AFE' : '1px solid #d4dae7',
        boxShadow: props.active ? '0 0 0 2px rgba(143, 124, 246, 0.2)' : undefined,
        cursor: 'text',
        boxSizing: 'border-box'
    }),
    (props) => sizeStyles(props.format),
    (props) => applyFlex(props)
]);

const InputTitleStyle = Glamorous.div<{ shifted: boolean }>((props) => ({
    fontSize: props.shifted ? 16 : 12,
    letterSpacing: props.shifted ? 0.5 : 0.4,
    paddingLeft: 18,
    color: '#969eb0',
    transition: 'all .2s',
    alignSelf: 'stretch'
}));

const InputStyle = Glamorous.input<XInputStyleProps>([
    (props) => ({
        fontSize: 'inherit',
        alignSelf: 'stretch',
        outline: 'none',
        // height: '100%'
    }),
    (props) => paddingStyles(props.format),
]);

const ApplyBtnStyle = Glamorous.div<XInputStyleProps>([
    (props) => ({
        alignSelf: 'stretch',
        backgroundColor: '#654bfa',
        fontSize: 'inherit',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: -1,
        marginRight: -1,
        height: 'calc(100% + 2px)',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    }),
    (props) => paddingStyles(props.format),
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
        const { placeholder, applying, title, format, ...other } = this.props;
        const shiftedTitle = this.state.value.length === 0 ? true : false;
        return (
            <InputWrapperStyle
                {...other}
                format={format}
                active={this.state.active}
            >
                <ClickOutside onClickOutside={() => this.activeDisabled()} onClick={() => { this.myInp.focus(); this.setState({ active: true }); }}>
                    {(format === 'large' && title) && (
                        <InputTitleStyle shifted={shiftedTitle}>{title}</InputTitleStyle>
                    )}
                    <InputStyle
                        format={format}
                        placeholder={placeholder}
                        value={this.state.value}
                        innerRef={(input: any) => { this.myInp = input; }}
                        onChange={this.handleChange}
                    />
                </ClickOutside>
                {applying && (
                    <ApplyBtnStyle onClick={() => this.activeDisabled()}><span>Apply</span></ApplyBtnStyle>
                )}
            </InputWrapperStyle>
        );
    }
}