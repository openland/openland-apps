import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import Select, { Async, ReactSelectProps, ReactAsyncSelectProps, Creatable } from 'react-select';

const SelectAnimationFadeIn = glamor.keyframes({
    '0%': { opacity: 0 },
    'to': { opacity: 1 }
});

const SelectAnimationSpin = glamor.keyframes({
    'to': { transform: 'rotate(1turn)' }
});

const Styles = ((props: & { large?: boolean, attach?: 'left' | 'right' | 'both' }) => ({
    minWidth: 100,
    '&.Select': {
        position: 'relative'
    },
    '&.Select input::-webkit-contacts-auto-fill-button, &.Select input::-webkit-credentials-auto-fill-button': {
        display: 'none !important'
    },
    '&.Select input::-ms-clear, &.Select input::-ms-reveal': {
        display: 'none !important'
    },
    '&.Select, &.Select div, &.Select input, &.Select span': {
        boxSizing: 'border-box'
    },
    '&.Select.is-disabled .Select-arrow-zone': {
        cursor: 'default',
        pointerEvents: 'none',
        opacity: .35
    },
    '&.Select.is-disabled > .Select-control': {
        backgroundColor: '#f9f9f9'
    },
    '&.Select.is-disabled > .Select-control:hover': {
        boxShadow: 'none'
    },
    '&.Select.is-open > .Select-control': {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        background: '#fff',
        borderColor: 'rgb(116, 188, 255) rgb(116, 188, 255) rgb(116, 188, 255)',
        // boxShadow: '0 0 0 2px rgba(143, 124, 246, 0.2)'
    },
    '&.Select.is-open > .Select-control .Select-arrow': {
        top: -2,
        borderColor: 'transparent transparent #999',
        borderWidth: '0 5px 5px'
    },
    '&.Select.is-searchable.is-focused:not(.is-open) > .Select-control, &.Select.is-searchable.is-open > .Select-control': {
        cursor: 'text'
    },
    '&.Select.is-focused > .Select-control': {
        background: '#fff'
    },
    '&.Select.is-focused:not(.is-open) > .Select-control': {
        borderColor: 'rgb(116, 188, 255)',
        boxShadow: 'rgba(23, 144, 255, 0.2) 0px 0px 0px 2px',
        background: '#fff'
    },
    '&.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
        paddingRight: 42
    },
    '&.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value .Select-value-label, &.Select.has-value.Select--single > .Select-control .Select-value .Select-value-label': {
        fontSize: props.large === true ? 15 : 14,
        color: '#334562',
        fontWeight: 400,
        display: 'block',
        marginTop: 0,
        // verticalAlign: 'middle'
    },
    '&.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label, &.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label': {
        cursor: 'pointer',
        textDecoration: 'none'
    },
    '&.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus, &.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:hover, &.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus, &.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:hover': {
        color: '#007eff',
        outline: 'none',
        textDecoration: 'underline'
    },
    '&.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus, &.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus': {
        background: '#fff'
    },
    '&.Select.has-value.is-pseudo-focused .Select-input': {
        opacity: 0
    },
    '&.Select.is-open .Select-arrow, &.Select .Select-arrow-zone:hover > .Select-arrow': {
        borderTopColor: '#666'
    },
    '&.Select.Select--rtl': {
        direction: 'rtl',
        textAlign: 'right'
    },
    '& .Select-control': {
        backgroundColor: '#fff',
        // borderColor: '#d9d9d9 #ccc #b3b3b3',
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 10,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 10,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 10,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 10,
        border: '1px solid rgba(220, 222, 228, 0.6)',
        color: '#333',
        cursor: 'default',
        display: 'table',
        borderSpacing: 0,
        borderCollapse: 'separate',
        height: props.large === true ? 48 : 40,
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        minHeight: 38
    },
    '& .Select-control:hover': {
        // boxShadow: '0 1px 0 rgba(0, 0, 0, .06)'
    },
    '& .Select-control .Select-input:focus': {
        outline: 'none',
        background: '#fff'
    },
    '&.Select--single > .Select-control .Select-value, .Select-placeholder': {
        bottom: 0,
        // color: 'rgba(51, 69, 98, 0.25)',
        color: 'rgb(157, 157, 157)',
        fontSize: props.large === true ? 15 : 14,
        // color: '#C1CAD2',
        left: 0,
        // lineHeight: '30px',
        lineHeight: 'normal',
        paddingLeft: 16,
        paddingRight: 10,
        position: 'absolute',
        right: 0,
        top: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        // fontWeight: 500,
    },
    '&.Select--single > .Select-control .Select-value': {
        // paddingTop: 'calc(5% - 10px)'
        marginTop: props.large === true ? 11 : 10
    },
    '& .Select-placeholder': {
        // paddingTop: 'calc(5% - 8px)'
        marginTop: props.large === true ? 13 : 9
    },
    '& .Select-input': {
        height: props.large === true ? 32 : 30,
        paddingLeft: 16,
        paddingRight: 16,
        // verticalAlign: 'middle',

        // display: 'flex !important',
        // alignItems: 'center'
    },
    '& .Select-input > input': {
        width: '100%',
        background: 'none transparent',
        border: '0 none',
        boxShadow: 'none',
        cursor: 'default',
        display: 'inline-block',
        fontFamily: 'inherit',
        // fontSize: 'inherit',
        margin: 0,
        outline: 'none',
        // height: '100%',
        // lineHeight: '17px',
        // padding: '8px 0 12px',
        WebkitAppearance: 'none',
        fontSize: props.large === true ? 15 : 14,
        fontWeight: 400,
        alignSelf: 'center',
        verticalAlign: 'middle',
        marginTop: props.large === true ? 8 : 4
    },
    '&.is-focused .Select-input > input': {
        cursor: 'text'
    },
    '&.has-value.is-pseudo-focused .Select-input': {
        opacity: 0
    },
    '& .Select-control:not(.is-searchable) > .Select-input': {
        outline: 'none'
    },
    '& .Select-loading-zone': {
        cursor: 'pointer',
        display: 'table-cell',
        textAlign: 'center'
    },
    '& .Select-loading, .Select-loading-zone': {
        position: 'relative',
        verticalAlign: 'middle',
        width: 16
    },
    '& .Select-loading': {
        animation: `${SelectAnimationSpin} .4s infinite linear`,
        height: 16,
        boxSizing: 'border-box',
        borderRadius: '50%',
        border: '2px solid #ccc',
        borderRightColor: '#333',
        display: 'inline-block'
    },
    '& .Select-clear-zone': {
        animation: `${SelectAnimationFadeIn} .2s`,
        color: '#999',
        cursor: 'pointer',
        display: 'table-cell',
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 17
    },
    '& .Select-clear-zone:hover': {
        color: '#d0021b'
    },
    '& .Select-clear': {
        // display: 'inline-block',
        display: 'table-cell',
        fontSize: '18px',
        lineHeight: 1
    },
    '&.Select--multi .Select-clear-zone': {
        width: 17
    },
    '& .Select-arrow-zone': {
        cursor: 'pointer',
        display: 'table-cell',
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 25,
        paddingRight: 5
    },
    '&.Select--rtl .Select-arrow-zone': {
        paddingRight: 0,
        paddingLeft: 5
    },
    '& .Select-arrow': {
        borderColor: '#999 transparent transparent',
        borderStyle: 'solid',
        borderWidth: '5px 5px 2.5px',
        display: 'inline-block',
        height: 0,
        width: 0,
        position: 'relative',
        verticalAlign: 'middle'
    },
    '& .Select-control > :last-child': {
        paddingRight: 5
    },
    '&.Select--multi .Select-multi-value-wrapper': {
        display: 'inline-block',
        paddingTop: props.large === true ? 7 : 6
    },
    '& .Select-multi-value-wrapper': {
        display: 'inline-block',
        paddingTop: 5
    },
    '&.Select--multi .Select-multi-value-wrapper .Select-placeholder': {
        // paddingTop: 'calc(5% - 10px)'
        marginTop: props.large === true ? 14 : 8
    },
    '&.Select .Select-aria-only': {
        position: 'absolute',
        display: 'inline-block',
        height: 1,
        width: 1,
        margin: -1,
        clip: 'rect(0, 0, 0, 0)',
        overflow: 'hidden',
        float: 'left'
    },
    '& .Select-menu-outer': {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#fff',
        border: '1px solid rgb(116, 188, 255)',
        borderTopColor: '#e6e6e6',
        boxShadow: '0 1px 0 rgba(0, 0, 0, .06)',
        boxSizing: 'border-box',
        marginTop: -1,
        maxHeight: 200,
        position: 'absolute',
        top: '100%',
        width: '100%',
        zIndex: 1,
        WebkitOverflowScrolling: 'touch',
        overflow: 'hidden'
    },
    '& .Select-menu': {
        maxHeight: 198,
        overflowY: 'auto'
    },
    '& .Select-option': {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        color: '#666',
        cursor: 'pointer',
        display: 'block',
        padding: '8px 16px',

        // height: 36,
        lineHeight: '20px',
        fontSize: 14,
        fontWeight: 500
    },
    '& .Select-option:last-child': {
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4
    },
    '& .Select-option.is-selected': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        color: '#1790ff !important'
    },
    '& .Select-option.is-focused': {
        backgroundColor: '#f9fafb !important',
        color: '#1790ff !important'
    },
    // '& .Select-option.is-focused': {
    //     backgroundColor: '#ebf5ff',
    //     color: '#333'
    // },
    '& .Select-option.is-disabled': {
        color: '#ccc',
        cursor: 'default'
    },
    '& .Select-noresults': {
        boxSizing: 'border-box',
        color: '#999',
        cursor: 'default',
        display: 'block',
        padding: '8px 16px'
    },
    '&.Select--multi .Select-input': {
        verticalAlign: 'middle',
        marginLeft: 10,
        padding: 0
    },
    '&.Select--multi.Select--rtl .Select-input': {
        marginLeft: 0,
        marginRight: 10
    },
    '&.Select--multi.has-value .Select-input': {
        marginLeft: 5
    },
    '&.Select--multi .Select-value': {
        backgroundColor: '#edf3fe',
        borderRadius: props.large === true ? 4 : 2,
        border: props.large === true ? 'none' : '1px solid #c2e0ff',
        color: '#4285f4',
        display: props.large === true ? 'inline-flex' : 'inline-block',
        flexDirection: props.large === true ? 'row-reverse' : undefined,
        fontSize: props.large === true ? 14 : '.9em',
        fontWeight: props.large === true ? 500 : undefined,
        letterSpacing: props.large === true ? -0.2 : undefined,
        lineHeight: 1.4,
        height: props.large === true ? 32 : undefined,
        marginLeft: 7,
        // marginTop: 6,
        marginBottom: 6,
        verticalAlign: 'top'
    },
    '&.Select--multi .Select-value-icon, &.Select--multi .Select-value-label': {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    '&.Select--multi .Select-value-label': {
        borderBottomRightRadius: 2,
        borderTopRightRadius: 2,
        cursor: 'default',
        padding: props.large === true ? '6px 5px 6px 10px' : '2px 5px'
    },
    '&.Select--multi a.Select-value-label': {
        color: '#007eff',
        cursor: 'pointer',
        textDecoration: 'none'
    },
    '&.Select--multi a.Select-value-label:hover': {
        textDecoration: 'underline'
    },
    '&.Select--multi .Select-value-icon': {
        cursor: 'pointer',
        borderBottomLeftRadius: 2,
        fontSize: 20,
        fontWeight: 'normal',
        borderTopLeftRadius: 2,
        borderRight: props.large === true ? 'none' : '1px solid #c2e0ff',
        padding: props.large === true ? '1px 10px 1px 0' : '1px 5px 3px'
    },
    '&.Select--multi .Select-value-icon:focus, &.Select--multi .Select-value-icon:hover': {
        backgroundColor: props.large === true ? undefined : '#d8eafd',
        color: '#0071e6'
    },
    '&.Select--multi .Select-value-icon:active': {
        backgroundColor: '#c2e0ff',
    },
    '&.Select--multi.Select--rtl .Select-value': {
        marginLeft: 0,
        marginRight: 5
    },
    '&.Select--multi.Select--rtl .Select-value-icon': {
        borderRight: 'none',
        borderLeft: '1px solid #c2e0ff',
    },
    '&.Select--multi.is-disabled .Select-value': {
        backgroundColor: '#fcfcfc',
        border: '1px solid #e3e3e3',
        color: '#333'
    },
    '&.Select--multi.is-disabled .Select-value-icon': {
        cursor: 'not-allowed',
        borderRight: '1px solid #e3e3e3'
    },
    '&.Select--multi.is-disabled .Select-value-icon:active, &.Select--multi.is-disabled .Select-value-icon:focus, &.Select--multi.is-disabled .Select-value-icon:hover': {
        backgroundColor: '#fcfcfc'
    }
}));

const StyledAsync = Glamorous(Async)(Styles) as React.ComponentType<ReactAsyncSelectProps>; // Some Weird typing problems
const StyledSelect = Glamorous(Select)(Styles);
const StyledSelectCreatable = Glamorous(Creatable)(Styles);

export type XSelectBasicProps = ReactSelectProps & {
    ref?: any;
    attach?: 'left' | 'right' | 'both';
    creatable?: boolean;
    render?: any;
    large?: boolean;
    title?: string;
};

export type XSelectAsyncBasicProps = ReactAsyncSelectProps & {
    attach?: 'left' | 'right' | 'both';
};

const SelectWrapper = Glamorous.div({
    position: 'relative'
});

const Title = Glamorous.div<{ inside?: boolean }>(
    (props) => props.inside ? {
        top: 1,
        left: 17,
        height: 38,
        fontSize: 14,
        lineHeight: '38px',
        position: 'absolute',
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.4)',
        zIndex: 2,
        pointerEvents: 'none'
    } : {
        top: -10,
        left: 13,
        height: 20,
        fontSize: 12,
        lineHeight: '20px',
        position: 'absolute',
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.4)',
        zIndex: 2,
        pointerEvents: 'none'
    }
);

interface XSelectBasicState {
    hasValue?: boolean;
    hasInputValue?: boolean;
    isFocused?: boolean;
}

export class XSelectBasic extends React.PureComponent<XSelectBasicProps, XSelectBasicState> {
    constructor(props: XSelectBasicProps) {
        super(props);

        this.state = {
            hasValue: this.props.value ? true : false,
            hasInputValue: false,
            isFocused: false
        };
    }

    componentWillReceiveProps(props: XSelectBasicProps) {
        this.setState({
            hasValue: props.value ? true : false
        });
    }

    handleInputChange = (value: string) => {
        this.setState({
            hasInputValue: value.length > 0
        });

        return value;
    }

    handleChange = (newValue: any) => {
        this.setState({
            hasValue: newValue ? true : false
        });

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }

    handleFocus = (e: any) => {
        this.setState({
            isFocused: true
        });

        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    handleBlur = (e: any) => {
        this.setState({
            isFocused: false
        });

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    render () {
        if (this.props.render) {
            return React.cloneElement(this.props.render, this.props);
        }

        let { placeholder, title, onChange, onFocus, onBlur, ...other } = this.props;

        return (
            <SelectWrapper>
                {title && (
                    <Title inside={!(this.state.hasValue || this.state.hasInputValue || this.state.isFocused)}>{title}</Title>
                )}
                {this.props.creatable && (
                    <StyledSelectCreatable
                        onInputChange={this.handleInputChange}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        placeholder={title ? '' : placeholder}
                        shouldKeyDownEventCreateNewOption={(event) => event.keyCode === 13}
                        {...other}
                    />
                )}
                {!this.props.creatable && (
                    <StyledSelect
                        onInputChange={this.handleInputChange}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        placeholder={title ? '' : placeholder}
                        {...other}
                    />
                )}
            </SelectWrapper>
        );
    }
}

export function XSelectAsyncBasic(props: XSelectAsyncBasicProps) {
    return (
        <StyledAsync {...props} />
    );
}