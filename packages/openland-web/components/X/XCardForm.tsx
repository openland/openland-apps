import * as React from 'react';
import Glamorous from 'glamorous';

let XFormInput = Glamorous.input<{placeholder?: string}>({
    flex: '0 0 auto',
    padding: '4px 7px 2px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 0 1px rgba(50, 50, 93, .16), 0 0 0 1px rgba(50, 151, 211, 0), 0 0 0 2px rgba(50, 151, 211, 0), 0 1px 1px rgba(0, 0, 0, .08)',
    color: '#525f7f',
    cursor: 'text',
    fontSize: '14px',
    lineHeight: '1.6',
    textAlign: 'left',
    textDecoration: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    wordBreak: 'keep-all',
    transition: 'all .08s ease-in',
    border: 'none'
});

let XFormContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff'
});

let XFormFieldTitle = Glamorous.div({
    width: '400px',
    textAlign: 'right',
    paddingRight: '24px',
    paddingTop: '5px',
    color: '#32325d',
    fontSize: '14px',
    lineHeight: '1.6',
    fontWeight: 400
});

let XFormFieldDescription = Glamorous.div({
    color: '#6b7c93',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: 1.6
});

let XFormFieldValue = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '2px',
    paddingBottom: '2px',
});

let XFormPropertyListDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '16px',
    paddingBottom: '16px'
});

export function XCardFormList(props: { children: any }) {
    return <XFormPropertyListDiv>{props.children}</XFormPropertyListDiv>;
}

export function XCardFormCell(props: { title: string, placeholder?: string, description?: string }) {
    return (
        <XFormContainer>
            <XFormFieldTitle>{props.title}</XFormFieldTitle>
            <XFormFieldValue>
                <XFormInput placeholder={props.placeholder} />
                {props.description && <XFormFieldDescription>{props.description}</XFormFieldDescription>}
            </XFormFieldValue>
        </XFormContainer>
    );
}