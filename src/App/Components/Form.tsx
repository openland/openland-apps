import * as React from 'react';
import { MutationFunc } from 'react-apollo';

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

export class Form extends React.Component<{ mutation: MutationFunc<{}> }> implements React.ChildContextProvider<{}> {
    static childContextTypes = {
        form: React.PropTypes.object
    };

    provider = new FormProvider();

    constructor() {
        super();

        this.provider.callback = (values) => {
            if (!this.provider.inProgress) {
                this.provider.inProgress = true;
                this.provider.error = null;
                this.forceUpdate();
                console.warn(values);
                this.props.mutation({
                    variables: values
                }).then((r) => {
                    this.provider.inProgress = false;
                    this.provider.error = null;
                    this.forceUpdate();
                }).catch((e) => {
                    this.provider.inProgress = false;
                    this.provider.error = e.message;
                    this.forceUpdate();
                });
            }
        };
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
        form: React.PropTypes.object
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