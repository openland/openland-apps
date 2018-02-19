import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from './XVertical'

interface XFormProps {
    children: any,
    novalid?: boolean
}

let InputsStyle = {
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(50, 50, 93, .16), 0 0 0 1px rgba(50, 151, 211, 0), 0 0 0 2px rgba(50, 151, 211, 0), 0 1px 1px rgba(0, 0, 0, .08)',
    boxShadowOnFocus: '0 0 0 1px rgba(50, 50, 93, 0), 0 0 0 1px rgba(50, 151, 211, .2), 0 0 0 2px rgba(50, 151, 211, .25), 0 1px 1px rgba(0, 0, 0, .08)',
    boxShadovNovalid: '0 0 0 1px rgba(226, 89, 80, .16), 0 0 0 1px rgba(50, 151, 211, 0), 0 0 0 2px rgba(50, 151, 211, 0), 0 1px 1px rgba(0, 0, 0, .08)',
    color: '#525f7f',
    backgroundColor: '#fff',
    placeholderColor: '#8898aa',
    fontSize: '14px',
    lineHeight: 1.6,
    paddingTop: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
}

export const XFormDiv = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 2,
    '&:last-child': {
        marginBottom: 0
    }
})

export const XFormTitle = Glamorous.div({
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
    color: '#32325d'
})

export const XFormDescription = Glamorous.div({
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    color: '#525f7f'
})

export const XFormHeaderDiv = Glamorous.div({
    position: 'relative',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#f6f9fc',
    '&::after': {
        content: `''`,
        bottom: -1,
        left: 20,
        position: 'absolute',
        right: 20,
        display: 'block',
        height: 1,
        backgroundColor: '#e6ebf1'
    }
})

export const XFormFieldDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f6f9fc',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
})

export const XFormFieldTitle = Glamorous.div<{novalid?: boolean}>((props) => ({
    textAlign: 'right',
    flex: '30% 0 0',
    color: props.novalid ? '#e25950' : '#32325d',
    lineHeight: 1.6,
    paddingRight: 10
}))

export const XFormFieldChildren = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: '0 0 55%',
    maxWidth: 340
})

export const XFormFieldDescription = Glamorous.div<{novalid?: boolean}>((props) => ({
    marginTop: 5,
    color: props.novalid ? '#e25950' : '#6b7c93',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: 1.6
}))

export const XFormInputStyle = Glamorous.input<{ placeholder?: string, novalid?: boolean }>((props) => ({
    height: 28,
    boxSizing: 'border-box',
    border: 'none',
    borderRadius: 4,
    boxShadow: props.novalid ? InputsStyle.boxShadovNovalid : InputsStyle.boxShadow,
    color: props.novalid ? '#e25950' : '#525f7f',
    backgroundColor: '#fff',
    fontSize: '14px',
    lineHeight: 1.6,
    paddingTop: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
    '&:focus': {
        boxShadow: InputsStyle.boxShadowOnFocus
    },
    '&::placeholder': {
        color: props.novalid ? '#e25950' : '#8898aa'
    }
}))

export const XFormTextAreaStyle = Glamorous.textarea<{ placeholder?: string, novalid?: boolean }>((props) => ({
    width: '100%',
    minHeight: '100px',
    border: 'none',
    borderRadius: 4,
    boxShadow: props.novalid ? InputsStyle.boxShadovNovalid : InputsStyle.boxShadow,
    color: props.novalid ? '#e25950' : '#525f7f',
    backgroundColor: '#fff',
    fontSize: '14px',
    lineHeight: 1.6,
    paddingTop: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
    '&:focus': {
        boxShadow: InputsStyle.boxShadowOnFocus
    },
    '&::placeholder': {
        color: props.novalid ? '#e25950' : '#8898aa'
    }
}))

export const XFormSelectStyle = Glamorous.select({
    height: 28,
    boxSizing: 'border-box',
    border: 'none',
    borderRadius: 4,
    boxShadow: InputsStyle.boxShadow,
    color: '#525f7f',
    backgroundColor: '#fff',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.6,
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 23,
    paddingBottom: 2,
    outline: 'none',
    appearance: 'none',
    backgroundImage: 'url(/static/X/arrow_down.svg)',
    backgroundSize: '24px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    '&:focus': {
        boxShadow: InputsStyle.boxShadowOnFocus
    }
})

export function XFormSelect(props: {options: any[]}) {
    return (
        <XFormSelectStyle>
            {props.options.map((item) => (
                <option value={item.value}>{item.title}</option>
            ))}
        </XFormSelectStyle>
    )
}

export function XFormHeader(props: { title?: string, description?: string }) {
    return (
        <XFormHeaderDiv>
            <XFormTitle>{props.title}</XFormTitle>
            {props.description && <XFormDescription>{props.description}</XFormDescription>}
        </XFormHeaderDiv>
    )
}

export function XFormField(props: { title: string, children: any, description?: string, novalid?: boolean }) {
    return (
        <XFormFieldDiv>
            <XFormFieldTitle novalid={props.novalid}>{props.title}</XFormFieldTitle>
            <XFormFieldChildren>
                <XVertical>
                    {props.children}
                </XVertical>
                {props.description && <XFormFieldDescription novalid={props.novalid}>{props.description}</XFormFieldDescription>}
            </XFormFieldChildren>
        </XFormFieldDiv>
    )
}

export class XForm extends React.Component<XFormProps> {

    static Header = XFormHeader
    static Field = XFormField
    static Input = XFormInputStyle
    static Textarea = XFormTextAreaStyle
    static Select = XFormSelect

    render() {
        return (
            <XFormDiv>
                {this.props.children}
            </XFormDiv>
        )
    }
}