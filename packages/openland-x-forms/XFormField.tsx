import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XFlexStyles } from 'openland-x/basics/Flex';

export const XFormFieldTitle = Glamorous.div<{ invalid?: boolean }>((props) => ({
    color: props.invalid ? '#e25950' : '#334562',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: -0.4,
    height: 32,
    marginTop: 18,
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
    separator?: number;
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
        separator,
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
                        <XVertical className={(props as any).className} {...other} separator={separator !== undefined ? separator : 0}>
                            <XFormFieldTitle invalid={invalided}>{title}{optional && <OptionalLabel> (optional)</OptionalLabel>}</XFormFieldTitle>
                            <XFormFieldChildren>
                                <XVertical>
                                    {children}
                                </XVertical>
                                {!invalided && description && <XFormFieldDescription invalid={false}>{description}</XFormFieldDescription>}
                                {invalided && showErrors !== false && <XFormFieldDescription invalid={true}>{errors.join(', ')}</XFormFieldDescription>}
                            </XFormFieldChildren>
                        </XVertical>
                    );
                }}
            </XStoreContext.Consumer>
        );
    }
    return (
        <XVertical className={(props as any).className} {...other} separator={separator !== undefined ? separator : 0}>
            <XFormFieldTitle invalid={invalid}>{title}{optional && <OptionalLabel> (optional)</OptionalLabel>}</XFormFieldTitle>
            <XFormFieldChildren>
                <XVertical>
                    {children}
                </XVertical>
                {description && <XFormFieldDescription invalid={invalid}>{description}</XFormFieldDescription>}
            </XFormFieldChildren>
        </XVertical>
    );
}
