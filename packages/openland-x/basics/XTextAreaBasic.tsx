import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex, extractFlexProps } from './Flex';

const TextAreaStyled = Glamorous.textarea <{ invalid?: boolean } & XFlexStyles> ([
    (props: { invalid?: boolean, disabled?: boolean }) => ({
        width: '100%',
        opacity: props.disabled ? 0.7 : undefined,
        minHeight: '100px',
        border: `1px solid ${props.invalid ? '#e26363' : '#d4dae7'}`,
        borderRadius: 4,
        backgroundColor: '#fff',
        fontSize: 16,
        letterSpacing: 0.5,
        lineHeight: 1.3,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 6,
        outline: 'none',
        appearance: 'none',
        msOverflowStyle: 'none',
        '&:focus': {
            boxShadow: '0 0 0 2px rgba(143, 124, 246, 0.2)',
            border: props.invalid ? undefined : '1px solid #986AFE',
        },
        '&::placeholder': {
            color: '#9d9d9d'
        }
    }),
    (props) => applyFlex(props)
]);

export interface XTextAreaBasicProps extends XFlexStyles {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    invalid?: boolean;
    autofocus?: boolean;
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
            />
        );
    }
}