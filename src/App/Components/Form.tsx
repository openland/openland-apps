/// <reference path="../../typings.d.ts" />

import * as React from 'react';
import { MutationFunc } from 'react-apollo';
import { LinksEdit } from './LinksEdit';
import { Link } from '../../api/';
import * as PropTypes from 'prop-types';

export interface FormContext {
    form: FormProvider;
}

export class FormProvider {
    values: any = {};
    inProgress: boolean = false;
    error: string | null = null;

    callback: (values: any) => void = () => {
        //
    }

    getValue = (name: string) => {
        return this.values[name];
    }
    setValue = (name: string, value: any) => {
        this.values[name] = value;
    }

    complete = () => {
        this.callback(this.values);
    }
}

export interface FormProps {
    mutation: MutationFunc<{}>;
    onComplete?: () => void;
    default?: {
        [key: string]: any;
    };
}

export class Form extends React.Component<FormProps> implements React.ChildContextProvider<{}> {
    static childContextTypes = {
        form: PropTypes.object
    };

    provider = new FormProvider();

    constructor(props: FormProps) {
        super(props);
        if (this.props.default != null) {
            for (let key in this.props.default) {
                if (this.provider.getValue(key) === undefined) {
                    console.warn(key);
                    console.warn(this.props.default[key]);
                    this.provider.setValue(key, this.props.default[key]);
                }
            }
        }

        this.provider.callback = (values) => {
            if (!this.provider.inProgress) {
                this.provider.inProgress = true;
                this.provider.error = null;
                this.forceUpdate();
                this.props.mutation({
                    variables: values
                }).then((r) => {
                    this.provider.inProgress = false;
                    this.provider.error = null;
                    this.forceUpdate();
                    if (this.props.onComplete != null) {
                        this.props.onComplete!!();
                    }
                }).catch((e) => {
                    this.provider.inProgress = false;
                    this.provider.error = e.message;
                    this.forceUpdate();
                });
            }
        };
    }

    componentWillReceiveProps(nextProps: Readonly<FormProps>, nextContext: any): void {
        if (nextProps.default != null) {
            for (let key in nextProps.default) {
                if (this.provider.getValue(key) === undefined) {
                    this.provider.setValue(key, nextProps.default[key]);
                }
            }
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

    getChildContext(): FormContext {
        return {
            form: this.provider
        };
    }
}

class FormReceiver extends React.Component<{ render: React.ComponentType<{ form: FormProvider }> }> {
    static contextTypes = {
        form: PropTypes.object
    };

    render() {
        var res = (this.context as FormContext).form;
        var Wrapped = this.props.render;
        return <Wrapped form={res} {...this.props} />;
    }
}

export function withForm<P>(WrappedComponent: React.ComponentType<P & { form: FormProvider }>): React.ComponentType<P> {
    return function (props: P) {
        return <FormReceiver render={WrappedComponent} {...props} />;
    };
}

export class FormText extends React.Component<{ name: string, placeholder?: string }, { value: any }> {
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

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var form = (this.context as FormContext).form;
        form.setValue(this.props.name, event.target.value.trim());
        this.setState({
            value: event.target.value
        });
    }
    render() {
        return (
            <input
                className="st-input"
                type="text"
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.handleChange}
            />);
    }
}

export const FormLinks = withForm<{ name: string }>((props) => {

    //     var form = (this.context as FormContext).form;
    //     var value = form.getValue(props.name);
    //     if (value === null) {
    //         value = '';
    //     }
    //     this.state = { value: value };
    // }
    var value = props.form.getValue(props.name);
    return (
        <div>
            <LinksEdit links={value as Link[]} />
        </div>
    );
});

export const FormSubmit = withForm<{ name: string }>((props) => {
    return <button className="st-btn is-lg is-block" onClick={props.form.complete}>{props.name}</button>;
});

export const FormState = withForm((props) => {
    if (!props.form.inProgress && props.form.error == null) {
        return null;
    }
    return (
        <div>
            {props.form.inProgress.toString()}: {props.form.error}
        </div>
    );
});