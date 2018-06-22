import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XStoreContext } from 'openland-x-store/XStoreContext';

const XFormFieldDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: '#f6f9fc',
});

export const XFormFieldTitle = Glamorous.div<{ invalid?: boolean }>((props) => ({
    color: props.invalid ? '#e25950' : '#334562',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: -0.1,
    height: 32,
    paddingTop: 4,
    marginLeft: 0,
}));
const OptionalLabel = Glamorous.span({
    opacity: 0.4,
    fontWeight: 400
});
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
export function XFormField(props: {
    field?: string,
    title: string,
    description?: string,
    invalid?: boolean,
    optional?: boolean,
    children: any,
}) {
    if (props.field) {
        return (
            <XStoreContext.Consumer>
                {(store) => {
                    if (!store) {
                        throw Error('No store available');
                    }
                    let errors = store.readValue('errors.' + props.field);
                    let invalid = errors && errors.length !== 0;
                    return (
                        <XFormFieldDiv className={(props as any).className}>
                            <XFormFieldTitle invalid={invalid}>{props.title}{props.optional && <OptionalLabel> (optional)</OptionalLabel>}</XFormFieldTitle>
                            <XFormFieldChildren>
                                <XVertical>
                                    {props.children}
                                </XVertical>
                                {!invalid && props.description && <XFormFieldDescription invalid={false}>{props.description}</XFormFieldDescription>}
                                {invalid && <XFormFieldDescription invalid={true}>{errors.join(', ')}</XFormFieldDescription>}
                            </XFormFieldChildren>
                        </XFormFieldDiv>
                    );
                }}
            </XStoreContext.Consumer>
        );
    }
    return (
        <XFormFieldDiv className={(props as any).className}>
            <XFormFieldTitle invalid={props.invalid}>{props.title}{props.optional && <OptionalLabel> (optional)</OptionalLabel>}</XFormFieldTitle>
            <XFormFieldChildren>
                <XVertical>
                    {props.children}
                </XVertical>
                {props.description && <XFormFieldDescription invalid={props.invalid}>{props.description}</XFormFieldDescription>}
            </XFormFieldChildren>
        </XFormFieldDiv>
    );
}
