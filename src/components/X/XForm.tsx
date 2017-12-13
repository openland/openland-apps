import * as React from 'react';
import * as RForm from 'react-form';
import { Form, Button, Message } from 'semantic-ui-react';
import { MutationFunc } from 'react-apollo';
import { FormApi } from 'react-form';

export class XForm extends React.Component<{ mutate: MutationFunc<{}> }, { progress: boolean, error: string | null }> {
    constructor(props: { mutate: MutationFunc<{}> }) {
        super(props);

        this.state = { progress: false, error: null };
    }

    render() {
        let progress = this.state.progress;
        let children = this.props.children;
        let error = this.state.error;
        return (
            <RForm.Form onSubmit={this.handleSubmit}>
                {formApi => {
                    return (
                        <Form onSubmit={formApi.submitForm} loading={progress}>
                            {error && (
                                <Message content={error} />
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
            this.setState({ progress: true });
            this.props.mutate({ variables: values }).then((v) => {
                formApi.resetAll();
                this.setState({ progress: false, error: null });
            }).catch((v) => {
                console.warn(v);
                this.setState({ progress: false, error: v.toString() });
            });
        }
    }
}

export function XFormField(props: { name: string, hint: string }) {
    return <Form.Field><RForm.Text field={props.name} placeholder={props.hint} /></Form.Field>;
}

export function XFormSubmit(props: { title: string }) {
    return <Button type="submit" content={props.title} />;
}

export function XFormGroup(props: { children: any }) {
    return <Form.Group>{props.children}</Form.Group>;
}