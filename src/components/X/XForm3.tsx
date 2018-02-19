import * as React from 'react';
import * as RForm from 'react-form';
import { Form, Button, Message } from 'semantic-ui-react';
import { MutationFunc } from 'react-apollo';
import { FormApi, FieldApi } from 'react-form';
import { Router } from '../../routes';
import { XImageUpload } from './XImageUpload';

export class XForm extends React.Component<{
    mutate: MutationFunc<{}>,
    defaultValues?: any,
    afterPath?: string
}, { progress: boolean, error: string | null }> {
    constructor(props: { mutate: MutationFunc<{}> }) {
        super(props);

        this.state = {progress: false, error: null};
    }

    render() {
        let progress = this.state.progress;
        let children = this.props.children;
        let error = this.state.error;
        return (
            <RForm.Form onSubmit={this.handleSubmit} defaultValues={this.props.defaultValues}>
                {formApi => {
                    return (
                        <Form onSubmit={formApi.submitForm} loading={progress}>
                            {error && (
                                <Message content={error}/>
                            )}
                            {children}
                        </Form>
                    );
                }}
            </RForm.Form>
        );
    }

    private handleSubmit = (values: RForm.FormValues, submissionEvent: React.SyntheticEvent<any>, formApi: FormApi) => {
        if (!this.state.progress) {
            this.setState({progress: true});
            this.props.mutate({variables: values}).then((v) => {
                if (this.props.afterPath) {
                    Router.pushRoute(this.props.afterPath);
                } else {
                    this.setState({progress: false, error: null});
                    formApi.resetAll();
                }
            }).catch((v) => {
                console.warn(v);
                this.setState({progress: false, error: v.toString()});
            });
        }
    };
}

export function XFormField(props: { name: string, title?: string, hint: string }) {
    return (
        <Form.Field>
            {props.title && <label>{props.title}</label>}
            <RForm.Text field={props.name} placeholder={props.hint}/>
        </Form.Field>
    );
}

export function XFormFieldCheck(props: { name: string, title?: string, hint: string }) {
    return (
        <Form.Field>
            {props.title && <label>{props.title}</label>}
            <div><RForm.Checkbox field={props.name}/><label>{props.hint}</label></div>
        </Form.Field>
    );
}

export class FormImageUploadComponent extends React.Component<{ fieldApi: FieldApi }> {

    handleChange = (uuid: string | null) => {
        this.props.fieldApi.setValue(uuid);
    };

    render(): React.ReactNode {
        let uuid = this.props.fieldApi.getValue() as string | undefined;
        console.warn(uuid);
        return (<XImageUpload uuid={uuid} onChanged={this.handleChange}/>);
    }
}

export const FormImageUploadFieldComponent = RForm.FormField(FormImageUploadComponent) as React.ComponentClass<{ field: string }>;

export function XFormImage(props: { name: string, title?: string }) {
    return (
        <Form.Field>
            {props.title && <label>{props.title}</label>}
            <FormImageUploadFieldComponent field={props.name}/>
        </Form.Field>
    );
}

export function XFormSubmit(props: { title: string }) {
    return <Button type="submit" content={props.title}/>;
}

export function XFormGroup(props: { children: any }) {
    return <Form.Group>{props.children}</Form.Group>;
}