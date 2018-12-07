import * as React from 'react';
import { XFormContext } from './XFormContext';

export function XFormField2(props: { children: Function; field: string }) {
    return (
        <XFormContext.Consumer>
            {form => {
                if (!form) {
                    throw Error('Unable to find form!');
                }

                const errors = form.validated.filter(
                    ([fieldName]: any) => fieldName === props.field,
                );

                const isValid =
                    errors.filter(([first, second]: any) => second.length)
                        .length === 0;

                const isTouched = form.touched.indexOf(props.field) !== -1;

                const showError = isTouched && !isValid;
                return <>{props.children({ isValid, isTouched, showError })}</>;
            }}
        </XFormContext.Consumer>
    );
}
