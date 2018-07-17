import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XFlexStyles, applyFlex } from 'openland-x/basics/Flex';

const XFormFieldDiv = Glamorous.div<XFlexStyles>([
    (props) => ({
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: '#f6f9fc',
    }),
    applyFlex
]);

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

interface XFormFieldProps extends XFlexStyles {
    field?: string;
    title: string;
    description?: string;
    invalid?: boolean;
    optional?: boolean;
    showErrors?: boolean;
    children: any;
}

export function XFormField(props: XFormFieldProps) {

    const {
        field,
        title,
        description,
        invalid,
        optional,
        showErrors,
        children,
        ...other
    } = props;

    if (field) {
        return (
            <XStoreContext.Consumer>
                {(store) => {
                    if (!store) {
                        throw Error('No store available');
                    }
                    let errors = store.readValue('errors.' + field);
                    let invalided = errors && errors.length !== 0;
                    return (
                        <XFormFieldDiv className={(props as any).className} {...other}>
                            <XFormFieldTitle invalid={invalided}>{title}{optional && <OptionalLabel> (optional)</OptionalLabel>}</XFormFieldTitle>
                            <XFormFieldChildren>
                                <XVertical>
                                    {children}
                                </XVertical>
                                {!invalided && description && <XFormFieldDescription invalid={false}>{description}</XFormFieldDescription>}
                                {invalided && showErrors !== false && <XFormFieldDescription invalid={true}>{errors.join(', ')}</XFormFieldDescription>}
                            </XFormFieldChildren>
                        </XFormFieldDiv>
                    );
                }}
            </XStoreContext.Consumer>
        );
    }
    return (
        <XFormFieldDiv className={(props as any).className} {...other}>
            <XFormFieldTitle invalid={invalid}>{title}{optional && <OptionalLabel> (optional)</OptionalLabel>}</XFormFieldTitle>
            <XFormFieldChildren>
                <XVertical>
                    {children}
                </XVertical>
                {description && <XFormFieldDescription invalid={invalid}>{description}</XFormFieldDescription>}
            </XFormFieldChildren>
        </XFormFieldDiv>
    );
}
