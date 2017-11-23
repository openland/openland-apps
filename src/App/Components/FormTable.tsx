import * as React from 'react';
import { FormContext } from './Form';

export class FormTable extends React.Component<{ name: string, columns: Array<{ value: string, type: string }> }, { value: any }> {
    static contextTypes = {
        form: React.PropTypes.object
    };

    constructor(props: any, context: any) {
        super(props, context);

        var form = (this.context as FormContext).form;
        this.state = { value: form };
    }
}