import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';

const XFormFieldDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: '#f6f9fc',
});

const XFormFieldTitle = Glamorous.div<{ invalid?: boolean }>((props) => ({
    color: props.invalid ? '#e25950' : '#334562',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.27,
    letterSpacing: -0.1,
    marginBottom: 10,
    marginLeft: 8
}));
const XFormFieldChildren = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
});
const XFormFieldDescription = Glamorous.div<{ invalid?: boolean }>((props) => ({
    marginTop: 5,
    color: props.invalid ? '#e25950' : '#6b7c93',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: 1.6
}));
export function XFormField(props: { title: string, children: any, description?: string, invalid?: boolean }) {
    return (
        <XFormFieldDiv>
            <XFormFieldTitle invalid={props.invalid}>{props.title}</XFormFieldTitle>
            <XFormFieldChildren>
                <XVertical>
                    {props.children}
                </XVertical>
                {props.description && <XFormFieldDescription invalid={props.invalid}>{props.description}</XFormFieldDescription>}
            </XFormFieldChildren>
        </XFormFieldDiv>
    );
}
