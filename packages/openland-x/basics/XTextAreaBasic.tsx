import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XFlexStyles, applyFlex, extractFlexProps } from './Flex';

interface TextAreaStyledProps {
    invalid?: boolean;
    resize?: boolean;
    bordered?: boolean;
    disabled?: boolean;
    maxheight?: number | string;
    format?: 'large' | 'default';
    rounded?: boolean;
}

let sizeStyles = styleResolver({
    'large': {
        fontSize: 16,
        lineHeight: 1.3,
        paddingTop: 16,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 16,
    },
    'default': {
        fontSize: 14,
        lineHeight: 1.43,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12,
    }
});

const TextAreaStyled = Glamorous.textarea <TextAreaStyledProps & XFlexStyles> ([
    (props: TextAreaStyledProps) => ({
        width: '100%',
        minHeight: props.maxheight ? props.maxheight : 100,
        background: props.disabled ? '#f8f8f8' : '#ffffff',
        border: props.bordered === false ? 'none' : `1px solid ${props.invalid ? '#e26363' : '#ececec'}`,
        borderRadius: props.rounded ? 20 : 10,
        outline: 'none',
        appearance: 'none',
        msOverflowStyle: 'none',
        resize: props.resize === false ? 'none' : undefined,
        color: 'rgba(0, 0, 0, 0.9)',
        letterSpacing: 0,
        '&:focus': {
            boxShadow: props.bordered === false ? 'none' : `0 0 0 2px ${props.invalid ? 'rgba(226, 99, 99, 0.2)' : 'rgba(23, 144, 255, 0.2)'}`,
            border: props.bordered === false ? 'none' : props.invalid ? undefined : '1px solid #74bcff',
        },
        '&::placeholder': {
            color: 'rgba(0, 0, 0, 0.4)'
        }
    }),
    (props) => applyFlex(props),
    (props) => sizeStyles(props.format)
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
    maxheight?: number | string;
    size?: 'large' | 'default';
    onChange?: (value: string) => void;
    onEnter?: () => void;
}

export class XTextAreaBasic extends React.PureComponent<XTextAreaBasicProps> {

    TextAreaRef: any | null = null;

    handleRef = (e: any) => {
        if (e && this.props.autofocus) {
            e.focus();
        }
        if (e) {
            this.TextAreaRef = e;
        }
    }

    handleChange = (src: any) => {
        let val = src.target.value as string;
        if (this.props.onChange) {
            this.props.onChange(val);
        }
    }

    handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            if (this.props.onEnter) {
                this.props.onEnter();
            }
        }
    }

    focus() {
        this.TextAreaRef.focus();
    }

    render() {
        let v = this.props.value;
        if (v === null) {
            v = '';
        }
        return (
            <TextAreaStyled
                {...extractFlexProps(this.props)}
                placeholder={this.props.placeholder}
                value={v}
                disabled={this.props.disabled}
                autoFocus={this.props.autofocus}
                onChange={this.handleChange}
                invalid={this.props.invalid}
                onKeyPress={this.handleKey}
                resize={this.props.resize}
                bordered={this.props.bordered}
                format={this.props.size}
                maxheight={this.props.maxheight}
                rounded={this.props.rounded}
            />
        );
    }
}