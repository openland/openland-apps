import * as React from 'react';
import * as C from '../Components';
import * as Router from 'react-router';
import { withDatasetsCreate } from '../../api/';

export default withDatasetsCreate(Router.withRouter((props) => {
    return (
        <C.Page title="New Data Source">
            <C.Header title="Data Source" />
            <C.Background />
            <C.Content>
                <C.Form mutation={props.mutate!!} onComplete={() => props.history.push('/sources')}>
                    <C.Section>
                        <C.PageTitle title="Adding new Data Source" />
                        <C.FormState />
                        <div className="st-page--text">
                            <h2>Link</h2>
                            <C.FormText name="url" placeholder="Url to the Data Source" />
                            <h2>Title</h2>
                            <C.FormText name="name" placeholder="Name of the Data Source" />
                            <h2>Kind</h2>
                            <C.FormSelect name="kind" options={[{value: 'document', title: 'document'}, {value: 'dataset', title: 'dataset'}]} />
                        </div>
                    </C.Section>
                    <C.Section>
                        <C.FormSubmit name="Add" />
                    </C.Section>
                </C.Form>
            </C.Content>
        </C.Page>
    );
}));