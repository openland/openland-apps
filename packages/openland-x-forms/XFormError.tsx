import * as React from 'react';
import { XFlexStyles } from 'openland-x/basics/Flex';
import { XFormContext } from './XFormContext';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import Glamorous from 'glamorous';

const ErrorText = Glamorous.div({
    fontFamily: 'SFProText-Regular',
    fontSize: '12px',
    color: '#d75454',
    marginLeft: '17px',
    marginTop: '5px',
});

export function XFormError(
    props: XFlexStyles & {
        onlyGeneralErrors?: boolean;
        field?: string;
        fieldErrorComponent?: any;
    },
) {
    return (
        <XFormContext.Consumer>
            {form => {
                if (!form) {
                    throw Error('Unable to find form!');
                }

                if (!!props.field) {
                    const errors = form.validated.filter(
                        ([fieldName]: any) => fieldName === props.field,
                    );

                    const FieldErrorComponent = props.fieldErrorComponent
                        ? props.fieldErrorComponent
                        : ErrorText;
                    return (
                        <>
                            {errors
                                .filter(
                                    ([first]: any) =>
                                        form.touched.indexOf(first) !== -1,
                                )
                                .map(([first, second]: any) => second)
                                .filter((id: any) => id)
                                .map((errorText: string, key: number) => {
                                    return (
                                        <FieldErrorComponent key={key}>
                                            {errorText}
                                        </FieldErrorComponent>
                                    );
                                })}
                        </>
                    );
                }

                let error = form.store.readValue('form.error');
                let errorFields = form.store.readValue('form.error_fields');

                if (
                    error &&
                    ((props.onlyGeneralErrors === true &&
                        (!errorFields || errorFields.length === 0)) ||
                        props.onlyGeneralErrors !== true)
                ) {
                    return <XServiceMessage {...props} title={error} />;
                }
                return null;
            }}
        </XFormContext.Consumer>
    );
}
