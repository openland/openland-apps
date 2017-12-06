/// <reference path="../../typings.d.ts" />

import * as React from 'react';
import { FormContext } from './Form';
import SimpleDME from 'react-simplemde-editor';
import * as PropTypes from 'prop-types';

export class FormMarkdown extends React.Component<{ name: string, placeholder?: string }, { value: string }> {
    static contextTypes = {
        form: PropTypes.object
    };

    constructor(props: any, context: any) {
        super(props, context);
        var form = (this.context as FormContext).form;
        var value = form.getValue(props.name);
        if (value === null) {
            value = '';
        }
        this.state = { value: value };
    }

    handleChange = (editorState: string) => {
        var form = (this.context as FormContext).form;
        form.setValue(this.props.name, editorState);
        this.setState({ value: editorState });
    }

    render() {
        return (
            <SimpleDME
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
}