import * as React from 'react';
import { withFindingsEdit } from '../../api/';
import * as C from '../Components';

export default withFindingsEdit(C.withLoader((props) => {
    return (
        <C.Page>
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
                            <C.FormTextArea name="intro" placeholder="Intro" />
                            <h2>Description</h2>
                            <C.FormTextArea name="description" />
                            <h2>Recomendations</h2>
                            <C.FormTextArea name="recomendations" />
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