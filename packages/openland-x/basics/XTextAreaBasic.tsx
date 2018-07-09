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
    format?: 'default' | 'small';
    appearance?: 'default' | 'chat';
}

let appearanceStyles = styleResolver({
    'default': {
        borderRadius: 4,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 6,
    },
    'chat': {
        paddingTop: 8,
        paddingLeft: 0,
        paddingRight: 10,
        paddingBottom: 6,
    }
});

let sizeStyles = styleResolver({
    'default': {
        fontSize: 16,
        letterSpacing: 0.5,
        lineHeight: 1.3
    },
    'small': {
        fontSize: 14,
        letterSpacing: 0.4,
        lineHeight: 1.43
    }
});

const TextAreaStyled = Glamorous.textarea <TextAreaStyledProps & XFlexStyles> ([
    (props: TextAreaStyledProps) => ({
        width: '100%',
        minHeight: props.maxheight ? props.maxheight : '100px',
        opacity: props.disabled ? 0.7 : undefined,
        border: props.bordered === false ? 'none' : `1px solid ${props.invalid ? '#e26363' : '#d4dae7'}`,
        backgroundColor: '#fff',
        outline: 'none',
        appearance: 'none',
        msOverflowStyle: 'none',
        resize: props.resize === false ? 'none' : undefined,
        '&:focus': {
            boxShadow: props.bordered === false ? 'none' : '0 0 0 2px rgba(143, 124, 246, 0.2)',
            border: props.bordered === false ? 'none' : props.invalid ? undefined : '1px solid #986AFE',
        },
        '&::placeholder': {
            color: '#9d9d9d'
        }
    }),
    (props) => applyFlex(props),
    (props) => sizeStyles(props.format),
    (props) => appearanceStyles(props.appearance)
]);

export interface XTextAreaBasicProps extends XFlexStyles {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    invalid?: boolean;
    autofocus?: boolean;
    resize?: boolean;
    bordered?: boolean;
    maxheight?: number | string;
    size?: 'default' | 'small';
    appearance?: 'default' | 'chat';
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
                appearance={this.props.appearance}
                maxheight={this.props.maxheight}
            />
        );
    }
}