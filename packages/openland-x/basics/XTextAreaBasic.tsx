import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XFlexStyles, applyFlex, extractFlexProps } from './Flex';
import { RequireElement } from './XInputBasic';

type XTextArea = 'large' | 'default';

interface TextAreaStyledProps {
    mode?: 'modern' | null;
    invalid?: boolean;
    resize?: boolean;
    bordered?: boolean;
    disabled?: boolean;
    minHeight?: number | string;
    format?: XTextArea;
    rounded?: boolean;
    padding?: number;
}

let sizeStyles = styleResolver({
    large: {
        fontSize: 16,
        lineHeight: 1.3,
        paddingTop: 16,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 16,
    },
    default: {
        fontSize: 14,
        lineHeight: 1.43,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12,
    },
});

let titleStyles = styleResolver({
    large: {
        top: 0,
        lineHeight: '32px',
        paddingLeft: 19,
        left: 0,
        height: 27,
        width: '100%',
        fontSize: 16,
    },
    default: {
        top: 0,
        lineHeight: '32px',
        paddingLeft: 16,
        left: 0,
        height: 27,
        width: '100%',
        fontSize: 14,
    },
});

export const Title = Glamorous.div<{ format?: XTextArea; invalid?: boolean }>([
    {
        pointerEvents: 'none',
        position: 'absolute',
        paddingRight: 3,
        color: '#1488f3',
        backgroundColor: '#f2f3f4',
        borderRadius: 10,
    },
    props => titleStyles(props.format),
    props => {
        if (props.invalid) {
            return {
                color: '#d75454',
            };
        }
        return {};
    },
]);

const TextAreaStyled = Glamorous.textarea<TextAreaStyledProps & XFlexStyles>([
    (props: TextAreaStyledProps) => ({
        display: 'block',
        width: '100%',
        minHeight: props.minHeight ? props.minHeight : 100,
        background: props.disabled ? '#f8f8f8' : '#ffffff',
        border:
            props.bordered === false
                ? 'none'
                : `1px solid ${props.invalid ? '#e26363' : '#ececec'}`,
        borderRadius: props.bordered === false ? 0 : props.rounded ? 20 : 10,
        outline: 'none',
        appearance: 'none',
        msOverflowStyle: 'none',
        resize: props.resize === false ? 'none' : undefined,
        color: 'rgba(0, 0, 0, 0.9)',
        letterSpacing: 0,
        padding: props.padding !== undefined ? `${props.padding}px !important` : undefined,
        '&:focus': {
            boxShadow:
                props.bordered === false
                    ? 'none'
                    : `0 0 0 2px ${
                          props.invalid ? 'rgba(226, 99, 99, 0.2)' : 'rgba(23, 144, 255, 0.2)'
                      }`,
            border:
                props.bordered === false ? 'none' : props.invalid ? undefined : '1px solid #74bcff',
        },
        '&::placeholder': {
            color:
                props.bordered === false
                    ? props.invalid
                        ? 'rgb(226, 99, 99)'
                        : 'rgba(0, 0, 0, 0.4)'
                    : 'rgba(0, 0, 0, 0.4)',
        },
    }),
    props => applyFlex(props),
    props => sizeStyles(props.format),
    props => {
        if (props.mode && props.mode === 'modern') {
            const invalidStyles = props.invalid
                ? {
                      color: '#d75454',
                      borderBottom: '#d75454 1px solid',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                  }
                : {};
            return {
                color: '#000',
                backgroundColor: '#f2f3f4',
                border: 'none',
                paddingTop: 24,
                '&:focus': {
                    boxShadow: 'none',
                    border: 'none',
                    ...invalidStyles,
                },
                ...invalidStyles,
            };
        }
        return {};
    },
]);

export interface XTextAreaBasicProps extends XFlexStyles {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    invalid?: boolean;
    autofocus?: boolean;
    resize?: boolean;
    bordered?: boolean;
    rounded?: boolean;
    minHeight?: number | string;
    size?: XTextArea;
    title?: string;
    required?: boolean;
    mode?: 'modern' | null;
    padding?: number;
    onChange?: (value: string) => void;
    onEnter?: () => void;
}

interface XTextAreaBasicState {
    value: string;
    titleInside: boolean;
}

export class XTextAreaBasic extends React.PureComponent<XTextAreaBasicProps, XTextAreaBasicState> {
    TextAreaRef: any | null = null;

    constructor(props: XTextAreaBasicProps) {
        super(props);

        if (this.props.value && this.props.value.length > 0) {
            this.state = {
                value: this.props.value,
                titleInside: false,
            };
        } else {
            this.state = {
                value: '',
                titleInside: true,
            };
        }
    }

    handleRef = (e: any) => {
        if (e && this.props.autofocus) {
            e.focus();
        }
        if (e) {
            this.TextAreaRef = e;
        }
    };

    handleChange = (src: any) => {
        let val = src.target.value as string;
        if (this.props.onChange) {
            this.props.onChange(val);
        }
    };

    handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            if (this.props.onEnter) {
                this.props.onEnter();
            }
        }
    };

    focus() {
        this.TextAreaRef.focus();
    }

    render() {
        let v = this.props.value;
        const { title, required, size } = this.props;
        if (v === null) {
            v = '';
        }
        return (
            <div style={{ position: 'relative' }}>
                {title && (
                    <>
                        <Title
                            format={size}
                            invalid={this.props.invalid}
                            className="input-placeholder"
                        >
                            {title}
                            {required && (
                                <RequireElement className="required-star">*</RequireElement>
                            )}
                        </Title>
                    </>
                )}
                <TextAreaStyled
                    {...extractFlexProps(this.props)}
                    placeholder={this.props.placeholder}
                    value={v}
                    mode={this.props.mode}
                    disabled={this.props.disabled}
                    autoFocus={this.props.autofocus}
                    onChange={this.handleChange}
                    invalid={this.props.invalid}
                    onKeyPress={this.handleKey}
                    resize={this.props.resize}
                    bordered={this.props.bordered}
                    format={this.props.size}
                    minHeight={this.props.minHeight}
                    rounded={this.props.rounded}
                    padding={this.props.padding}
                />
            </div>
        );
    }
}
