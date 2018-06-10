import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';

const XFormFieldDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: '#f6f9fc',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
});
const XFormFieldTitle = Glamorous.div<{ novalid?: boolean }>((props) => ({
    textAlign: 'right',
    flex: '30% 0 0',
    color: props.novalid ? '#e25950' : '#32325d',
    lineHeight: 1.6,
    paddingRight: 10,
    paddingTop: 3
}));
const XFormFieldChildren = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: '0 0 55%',
    maxWidth: 340
});
const XFormFieldDescription = Glamorous.div<{ novalid?: boolean }>((props) => ({
    marginTop: 5,
    color: props.novalid ? '#e25950' : '#6b7c93',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: 1.6
}));
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
    );
}
