import * as React from 'react';
import { FormContext } from './Form';
import Select from 'react-select';

export class FormSelect extends React.Component<{ name: string, options: Array<{ value: string, label: string }> }, { value: any }> {
    static contextTypes = {
        form: React.PropTypes.object
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

    handleChange = (val: { value: string, label: string }) => {
        var selectedOption = val;

        if (selectedOption === null) {
            selectedOption = { value: '', label: '' };
        }

        var form = (this.context as FormContext).form;
        form.setValue(this.props.name, selectedOption.value);
        this.setState({
            value: selectedOption.value
        });
    }

    render() {
        return (
            <Select
                // className="st-select"
                value={this.state.value}
                options={this.props.options}
                searchable={false}
                onChange={this.handleChange}
            />);
    }
}