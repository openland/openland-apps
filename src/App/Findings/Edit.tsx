import * as React from 'react';
import { withFindingsEdit } from '../../api/';
import * as C from '../Components';

export default withFindingsEdit(C.withLoader((props) => {
    return (
        <C.Page title={'Edit Findings'}>
            <C.Background />
            <C.Content>
                <C.Form mutation={props.mutate!!} onComplete={() => props.history.push('/findings')} default={props.data.findings}>
                    <C.Section>
                        <C.PageTitle title="Edit findings" />
                        <C.FormState />
                        <div className="st-page--text">
                            <h2>Title</h2>
                            <C.FormText name="title" placeholder="Title" />
                            <h2>Intro</h2>
                            <C.FormMarkdown name="intro" placeholder="Intro" />
                            <h2>Description</h2>
                            <C.FormMarkdown name="description" />
                            <h2>Recomendations</h2>
                            <C.FormMarkdown name="recomendations" />
                        </div>
                    </C.Section>
                    <C.Section>
                        <C.FormSubmit name="Save" />
                    </C.Section>
                </C.Form>
            </C.Content>
        </C.Page>
    );
}));