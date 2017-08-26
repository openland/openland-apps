import * as React from 'react';
import * as C from '../Components';
import { withDatasetsCreate } from '../../api/';

export const InputField = C.withForm<{ name: string }>((props) => {
    return <input value={props.form.getValue(props.name)} onChange={(event) => props.form.setValue(props.name, event.target.value.trim())} />;
});

export const SubmitButton = C.withForm((props) => {
    return <button onClick={props.form.complete}>Create</button>;
});

export const FormState = C.withForm((props) => {
    return (
        <div>
            {props.form.inProgress.toString()}: {props.form.error}
        </div>
    );
});

export default withDatasetsCreate((props) => {
    return (
        <C.Page>
            <C.Header title="Data Source" />
            <C.Background />
            <C.Content>
                <C.Form mutation={props.mutate!!}>
                    <C.Section>
                        <C.PageTitle title="Adding new Data Source" />
                        <FormState />
                    </C.Section>
                    <C.Section>
                        <div className="st-page--fields">
                            <div className="st-page--field">
                                <div className="st-page--field-l">Link:</div>
                                <div className="st-page--field-r">
                                    <InputField name="url" />
                                </div>
                            </div>
                            <div className="st-page--field">
                                <div className="st-page--field-l">Title:</div>
                                <div className="st-page--field-r">
                                    <InputField name="name" />
                                </div>
                            </div>
                            <div className="st-page--field">
                                <div className="st-page--field-l">Kind:</div>
                                <div className="st-page--field-r">
                                    <InputField name="kind" />
                                </div>
                            </div>
                        </div>
                    </C.Section>
                    <C.Section>
                        <SubmitButton />
                    </C.Section>
                </C.Form>
            </C.Content>
        </C.Page>
    );
});