import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex, extractFlexProps } from './Flex';

const TextAreaStyled = Glamorous.textarea<XFlexStyles>([
    (props: any) => ({
        width: '100%',
        opacity: props.disabled ? 0.7 : undefined,
        minHeight: '100px',
        border: '1px solid #d4dae7',
        borderRadius: 4,
        color: '#334562',
        backgroundColor: '#fff',
        fontSize: 16,
        letterSpacing: 0.5,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 6,
        outline: 'none',
        '&:focus': {
            boxShadow: '0 0 0 2px rgba(143, 124, 246, 0.2)',
            border: '1px solid #986AFE',
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
    onChange?: (value: string) => void;
}

export class XTextAreaBasic extends React.PureComponent<XTextAreaBasicProps> {
    handleChange = (src: any) => {
        let val = src.target.value as string;
        if (this.props.onChange) {
            this.props.onChange(val);
        }
    }
    render() {
        return (
            <TextAreaStyled
                {...extractFlexProps(this.props)}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.handleChange}
                disabled={this.props.disabled}
            />
        );
    }
}